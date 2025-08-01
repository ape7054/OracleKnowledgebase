package api

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"time"

	"market-pulse/backend/internal/database"
	"market-pulse/backend/internal/models"

	"github.com/gin-gonic/gin"
)

type MarketHandler struct{}

// NewMarketHandler creates a new MarketHandler
func NewMarketHandler() *MarketHandler {
	return &MarketHandler{}
}

// RegisterRoutes registers the market data routes
func (h *MarketHandler) RegisterRoutes(router *gin.RouterGroup) {
	router.GET("/all", GetAllMarketData)
	router.GET("/data", GetMarketData)
	router.GET("/coins", GetCoinsData)
}

// createHTTPClient creates a HTTP client with relaxed TLS settings
func createHTTPClient() *http.Client {
	tr := &http.Transport{
		TLSClientConfig: &tls.Config{
			InsecureSkipVerify: true, // 跳过证书验证
		},
	}
	return &http.Client{
		Transport: tr,
		Timeout:   30 * time.Second,
	}
}

// GetAllMarketData fetches all market data.
func GetAllMarketData(c *gin.Context) {
	var results []models.MarketData
	if err := database.DB.Find(&results).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch market data"})
		return
	}
	c.JSON(http.StatusOK, results)
}

// GetMarketData fetches market data from CoinGecko API
func GetMarketData(c *gin.Context) {
	limit := c.DefaultQuery("limit", "20")

	// 调用真实的CoinGecko API
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=%s&page=1&sparkline=true&price_change_percentage=24h", limit)

	client := createHTTPClient()

	// 添加重试机制
	var resp *http.Response
	var err error
	maxRetries := 3

	for i := 0; i < maxRetries; i++ {
		resp, err = client.Get(url)
		if err == nil {
			break
		}
		if i < maxRetries-1 {
			time.Sleep(time.Duration(i+1) * time.Second) // 递增延迟
		}
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch market data from CoinGecko API",
			"message": err.Error(),
		})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to read API response",
			"message": err.Error(),
		})
		return
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to parse API response",
			"message": err.Error(),
		})
		return
	}

	// 返回前端期望的格式
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
	})
}

// GetCoinsData fetches specific coins data from CoinGecko API
func GetCoinsData(c *gin.Context) {
	ids := c.Query("ids")
	sparkline := c.DefaultQuery("sparkline", "false")

	if ids == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"success": false,
			"error":   "Missing 'ids' parameter",
		})
		return
	}

	// 调用真实的CoinGecko API
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%s&sparkline=%s&price_change_percentage=24h", ids, sparkline)

	client := createHTTPClient()

	// 添加重试机制
	var resp *http.Response
	var err error
	maxRetries := 3

	for i := 0; i < maxRetries; i++ {
		resp, err = client.Get(url)
		if err == nil {
			break
		}
		if i < maxRetries-1 {
			time.Sleep(time.Duration(i+1) * time.Second) // 递增延迟
		}
	}

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to fetch coins data from CoinGecko API",
			"message": err.Error(),
		})
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to read API response",
			"message": err.Error(),
		})
		return
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"success": false,
			"error":   "Failed to parse API response",
			"message": err.Error(),
		})
		return
	}

	// 返回前端期望的格式
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
	})
}

// RegisterHealthCheck registers the health check route.
func RegisterHealthCheck(router *gin.RouterGroup) {
	router.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "UP"})
	})
}
