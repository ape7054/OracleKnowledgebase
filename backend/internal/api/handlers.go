package api

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"market-pulse/backend/internal/database"
	"market-pulse/backend/internal/models"
	"market-pulse/backend/internal/services"
	"market-pulse/backend/internal/websocket"

	"github.com/gin-gonic/gin"
)

// API struct holds dependencies for the database and WebSocket hub
type API struct {
	DB               *sql.DB
	Hub              *websocket.Hub
	CoinGeckoService *services.CoinGeckoService
}

// NewAPI creates a new API instance
func NewAPI(db *sql.DB, hub *websocket.Hub) *API {
	return &API{
		DB:               db,
		Hub:              hub,
		CoinGeckoService: services.NewCoinGeckoService(),
	}
}

// HealthCheck provides a health check endpoint
func (a *API) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"version": "2.0.0", // Version bump because we refactored!
	})
}

// GetTrades fetches a paginated list of trades
func (a *API) GetTrades(c *gin.Context) {
	pageStr := c.DefaultQuery("page", "1")
	limitStr := c.DefaultQuery("limit", "20")

	page, err := strconv.Atoi(pageStr)
	if err != nil || page < 1 {
		page = 1
	}

	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 {
		limit = 20
	}
	// Add a max limit to prevent clients from requesting too much data at once
	if limit > 100 {
		limit = 100
	}

	offset := (page - 1) * limit
	db := database.GetDB()

	// First, get the total count of records
	var totalRecords int64
	err = db.QueryRow("SELECT COUNT(*) FROM trades").Scan(&totalRecords)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not query total trades count"})
		return
	}

	// Then, get the paginated data
	query := "SELECT id, price, amount, trade_time, trade_type FROM trades ORDER BY trade_time DESC LIMIT ? OFFSET ?"
	rows, err := db.Query(query, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not query trades: " + err.Error()})
		return
	}
	defer rows.Close()

	var trades []models.Trade
	for rows.Next() {
		var t models.Trade
		var tradeTime time.Time
		if err := rows.Scan(&t.ID, &t.Price, &t.Amount, &tradeTime, &t.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not scan trade row: " + err.Error()})
			return
		}
		t.Time = tradeTime.Format("15:04:05")
		// 设置默认用户信息
		t.UserName = "Anonymous"
		trades = append(trades, t)
	}

	c.JSON(http.StatusOK, gin.H{
		"total_records": totalRecords,
		"page":          page,
		"limit":         limit,
		"data":          trades,
	})
}

// CreateTrade creates a new trade
func (a *API) CreateTrade(c *gin.Context) {
	var newTrade models.Trade

	if err := c.ShouldBindJSON(&newTrade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request data: " + err.Error()})
		return
	}

	if newTrade.Price == "" || newTrade.Amount == "" || newTrade.Type == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Price, amount, and type cannot be empty"})
		return
	}

	db := database.GetDB()
	// 简单版本：使用默认用户（编程小白友好）
	query := "INSERT INTO trades (price, amount, trade_time, trade_type) VALUES (?, ?, ?, ?)"
	result, err := db.Exec(query, newTrade.Price, newTrade.Amount, time.Now(), newTrade.Type)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create trade: " + err.Error()})
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		log.Println("Could not get ID for new trade:", err)
	}

	fullTrade := models.Trade{
		ID:       int(id),
		Price:    newTrade.Price,
		Amount:   newTrade.Amount,
		Time:     time.Now().Format("15:04:05"),
		Type:     newTrade.Type,
		UserName: "Anonymous",
	}

	a.Hub.BroadcastTrade(fullTrade)

	c.JSON(http.StatusCreated, gin.H{"status": "trade created"})
}

// ServeWsUpgrade upgrades the HTTP connection to a WebSocket
func (a *API) ServeWsUpgrade(c *gin.Context) {
	websocket.ServeWs(a.Hub, c.Writer, c.Request)
}

// GetMarketData 获取市场数据
func (a *API) GetMarketData(c *gin.Context) {
	limitStr := c.DefaultQuery("limit", "50")
	limit, err := strconv.Atoi(limitStr)
	if err != nil || limit < 1 {
		limit = 50
	}
	if limit > 250 { // CoinGecko API限制
		limit = 250
	}

	coins, err := a.CoinGeckoService.GetTopCoins(limit)
	if err != nil {
		log.Printf("Error fetching market data: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch market data",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    coins,
		"count":   len(coins),
	})
}

// GetCoinDetails 获取特定加密货币的详细信息
func (a *API) GetCoinDetails(c *gin.Context) {
	coinID := c.Param("id")
	if coinID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Coin ID is required",
		})
		return
	}

	coin, err := a.CoinGeckoService.GetCoinByID(coinID)
	if err != nil {
		log.Printf("Error fetching coin details for %s: %v", coinID, err)
		c.JSON(http.StatusNotFound, gin.H{
			"error":   "Coin not found",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    coin,
	})
}

// GetHistoricalData 获取历史价格数据
func (a *API) GetHistoricalData(c *gin.Context) {
	coinID := c.Param("id")
	if coinID == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Coin ID is required",
		})
		return
	}

	daysStr := c.DefaultQuery("days", "7")
	days, err := strconv.Atoi(daysStr)
	if err != nil || days < 1 {
		days = 7
	}
	if days > 365 { // 限制最大天数
		days = 365
	}

	prices, err := a.CoinGeckoService.GetHistoricalPrices(coinID, days)
	if err != nil {
		log.Printf("Error fetching historical data for %s: %v", coinID, err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch historical data",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    prices,
		"count":   len(prices),
	})
}

// GetMultipleCoins 获取多个指定加密货币的数据
func (a *API) GetMultipleCoins(c *gin.Context) {
	idsParam := c.Query("ids")
	if idsParam == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Coin IDs parameter is required",
		})
		return
	}

	sparklineStr := c.DefaultQuery("sparkline", "false")
	sparkline, _ := strconv.ParseBool(sparklineStr)

	// 解析逗号分隔的ID列表
	coinIDs := []string{}
	for _, id := range strings.Split(idsParam, ",") {
		trimmedID := strings.TrimSpace(id)
		if trimmedID != "" {
			coinIDs = append(coinIDs, trimmedID)
		}
	}

	if len(coinIDs) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "No valid coin IDs provided",
		})
		return
	}

	coins, err := a.CoinGeckoService.GetMultipleCoins(coinIDs, sparkline)
	if err != nil {
		log.Printf("Error fetching multiple coins data: %v", err)
		c.JSON(http.StatusInternalServerError, gin.H{
			"error":   "Failed to fetch coins data",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    coins,
		"count":   len(coins),
	})
}

// PingCoinGecko 检查CoinGecko API连接状态
func (a *API) PingCoinGecko(c *gin.Context) {
	err := a.CoinGeckoService.Ping()
	if err != nil {
		log.Printf("CoinGecko API ping failed: %v", err)
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "CoinGecko API is not available",
			"details": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "CoinGecko API is available",
	})
}
