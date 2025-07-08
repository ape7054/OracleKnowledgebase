package api

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"
	"time"

	"market-pulse/backend/internal/database"
	"market-pulse/backend/internal/models"
	"market-pulse/backend/internal/websocket"

	"github.com/gin-gonic/gin"
)

// API 结构体持有对数据库和 WebSocket Hub 的依赖
type API struct {
	DB  *sql.DB
	Hub *websocket.Hub
}

// NewAPI 创建一个新的 API 实例
func NewAPI(db *sql.DB, hub *websocket.Hub) *API {
	return &API{DB: db, Hub: hub}
}

// HealthCheck 提供一个健康的检查端点
func (a *API) HealthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status":  "ok",
		"version": "2.0.0", // 版本升级，因为我们重构了！
	})
}

// GetTrades 获取交易列表
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法查询交易总数"})
		return
	}

	// Then, get the paginated data
	query := "SELECT id, price, amount, trade_time, trade_type FROM trades ORDER BY trade_time DESC LIMIT ? OFFSET ?"
	rows, err := db.Query(query, limit, offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法查询交易记录"})
		return
	}
	defer rows.Close()

	var trades []models.Trade
	for rows.Next() {
		var t models.Trade
		var tradeTime time.Time
		if err := rows.Scan(&t.ID, &t.Price, &t.Amount, &tradeTime, &t.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "无法扫描交易记录行"})
			return
		}
		t.Time = tradeTime.Format("15:04:05")
		trades = append(trades, t)
	}

	c.JSON(http.StatusOK, gin.H{
		"total_records": totalRecords,
		"page":          page,
		"limit":         limit,
		"data":          trades,
	})
}

// CreateTrade 创建一个新的交易
func (a *API) CreateTrade(c *gin.Context) {
	var newTrade models.Trade

	if err := c.ShouldBindJSON(&newTrade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据: " + err.Error()})
		return
	}

	if newTrade.Price == "" || newTrade.Amount == "" || newTrade.Type == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "价格, 数量和类型不能为空"})
		return
	}

	db := database.GetDB()
	query := "INSERT INTO trades (price, amount, trade_time, trade_type) VALUES (?, ?, ?, ?)"
	result, err := db.Exec(query, newTrade.Price, newTrade.Amount, time.Now(), newTrade.Type)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法创建交易记录: " + err.Error()})
		return
	}

	id, err := result.LastInsertId()
	if err != nil {
		log.Println("无法获取新交易的ID:", err)
	}

	fullTrade := models.Trade{
		ID:     int(id),
		Price:  newTrade.Price,
		Amount: newTrade.Amount,
		Time:   time.Now().Format("15:04:05"),
		Type:   newTrade.Type,
	}

	a.Hub.BroadcastTrade(fullTrade)

	c.JSON(http.StatusCreated, gin.H{"status": "交易记录已创建"})
}

// ServeWsUpgrade 升级 HTTP 连接到 WebSocket
func (a *API) ServeWsUpgrade(c *gin.Context) {
	websocket.ServeWs(a.Hub, c.Writer, c.Request)
}
