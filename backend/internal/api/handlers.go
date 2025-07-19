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

// API struct holds dependencies for the database and WebSocket hub
type API struct {
	DB  *sql.DB
	Hub *websocket.Hub
}

// NewAPI creates a new API instance
func NewAPI(db *sql.DB, hub *websocket.Hub) *API {
	return &API{DB: db, Hub: hub}
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

	// Then, get the paginated data (包含用户信息，处理NULL值)
	query := "SELECT id, price, amount, trade_time, trade_type, COALESCE(user_id, 0), COALESCE(user_name, 'Anonymous') FROM trades ORDER BY trade_time DESC LIMIT ? OFFSET ?"
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
		var userID int
		if err := rows.Scan(&t.ID, &t.Price, &t.Amount, &tradeTime, &t.Type, &userID, &t.UserName); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not scan trade row: " + err.Error()})
			return
		}
		t.Time = tradeTime.Format("15:04:05")
		if userID > 0 {
			t.UserID = &userID
		}
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
	defaultUserID := 1
	defaultUserName := "testuser"

	query := "INSERT INTO trades (price, amount, trade_time, trade_type, user_id, user_name) VALUES (?, ?, ?, ?, ?, ?)"
	result, err := db.Exec(query, newTrade.Price, newTrade.Amount, time.Now(), newTrade.Type, defaultUserID, defaultUserName)
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
		UserID:   &defaultUserID,
		UserName: defaultUserName,
	}

	a.Hub.BroadcastTrade(fullTrade)

	c.JSON(http.StatusCreated, gin.H{"status": "trade created"})
}

// ServeWsUpgrade upgrades the HTTP connection to a WebSocket
func (a *API) ServeWsUpgrade(c *gin.Context) {
	websocket.ServeWs(a.Hub, c.Writer, c.Request)
}
