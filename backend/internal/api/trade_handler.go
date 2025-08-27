package api

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"learning-stack/backend/internal/models"
	"learning-stack/backend/internal/websocket"
)

type TradeHandler struct {
	db  *gorm.DB
	hub *websocket.Hub
}

func NewTradeHandler(db *gorm.DB, hub *websocket.Hub) *TradeHandler {
	return &TradeHandler{
		db:  db,
		hub: hub,
	}
}

// GetTrades 获取交易历史（分页）
func (h *TradeHandler) GetTrades(c *gin.Context) {
	// 获取分页参数
	page, _ := strconv.Atoi(c.DefaultQuery("page", "1"))
	limit, _ := strconv.Atoi(c.DefaultQuery("limit", "20"))

	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}

	offset := (page - 1) * limit

	var trades []models.Trade
	var totalRecords int64

	// 计算总记录数
	if err := h.db.Model(&models.Trade{}).Count(&totalRecords).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to count trades",
		})
		return
	}

	// 获取交易数据，按创建时间倒序
	query := h.db.Order("created_at DESC").
		Offset(offset).
		Limit(limit)

	if err := query.Find(&trades).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch trades",
		})
		return
	}

	// 格式化响应数据
	for i := range trades {
		// 获取用户名
		var user models.User
		if err := h.db.First(&user, trades[i].UserID).Error; err == nil {
			trades[i].UserName = user.Username
		} else {
			trades[i].UserName = "Anonymous"
		}

		// 格式化时间
		trades[i].Time = trades[i].CreatedAt.Format("15:04:05")
	}

	c.JSON(http.StatusOK, gin.H{
		"success":       true,
		"data":          trades,
		"page":          page,
		"limit":         limit,
		"total_records": totalRecords,
		"total_pages":   (totalRecords + int64(limit) - 1) / int64(limit),
	})
}

// CreateTrade 创建新交易
func (h *TradeHandler) CreateTrade(c *gin.Context) {
	var req struct {
		Price  string `json:"price" binding:"required"`
		Amount string `json:"amount" binding:"required"`
		Type   string `json:"type" binding:"required,oneof=buy sell"`
		Symbol string `json:"symbol"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   fmt.Sprintf("Invalid request: %v", err),
		})
		return
	}

	// 验证价格和数量
	if _, err := strconv.ParseFloat(req.Price, 64); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid price format",
		})
		return
	}

	if _, err := strconv.ParseFloat(req.Amount, 64); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Invalid amount format",
		})
		return
	}

	// 获取用户ID（从JWT中间件获取）
	userID, exists := c.Get("userID")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{
			"success": false,
			"error":   "User not authenticated",
		})
		return
	}

	// 设置默认symbol
	if req.Symbol == "" {
		req.Symbol = "BTC/USDT"
	}

	// 创建交易记录
	trade := models.Trade{
		UserID: userID.(uint),
		Price:  req.Price,
		Amount: req.Amount,
		Type:   req.Type,
		Symbol: req.Symbol,
		Status: "completed",
	}

	if err := h.db.Create(&trade).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to create trade",
		})
		return
	}

	// 获取用户名用于响应
	var user models.User
	if err := h.db.First(&user, trade.UserID).Error; err == nil {
		trade.UserName = user.Username
	} else {
		trade.UserName = "Anonymous"
	}

	// 格式化时间
	trade.Time = trade.CreatedAt.Format("15:04:05")

	// 通过WebSocket广播新交易
	if h.hub != nil {
		wsMessage := websocket.TradeMessage{
			ID:       trade.ID,
			Price:    trade.Price,
			Amount:   trade.Amount,
			Type:     trade.Type,
			Symbol:   trade.Symbol,
			UserName: trade.UserName,
			Time:     trade.Time,
		}
		h.hub.BroadcastTrade(wsMessage)
	}

	c.JSON(http.StatusCreated, gin.H{
		"success": true,
		"data":    trade,
		"message": "Trade created successfully",
	})
}

// RegisterRoutes 注册交易相关的路由
func (h *TradeHandler) RegisterRoutes(rg *gin.RouterGroup) {
	rg.GET("", h.GetTrades)    // GET /api/trades
	rg.POST("", h.CreateTrade) // POST /api/trades
}
