package api

import (
	"crypto/tls"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"learning-stack/backend/internal/database"
	"learning-stack/backend/internal/models"
	"learning-stack/backend/internal/services"

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
	router.GET("/coins/:id/ohlc", GetOhlcData)
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
		Timeout:   30 * time.Second, // 增加超时时间到30秒以适应CoinGecko API
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

// GetMarketData fetches market data only from CoinGecko
func GetMarketData(c *gin.Context) {
	limit := c.DefaultQuery("limit", "20")

	log.Printf("🚀 从 CoinGecko 获取市场数据 (limit: %s)", limit)

	data, err := fetchFromCoinGecko(limit)
	if err != nil {
		log.Printf("❌ CoinGecko 获取失败: %v", err)
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "无法连接到外部市场数据API",
			"message": err.Error(),
		})
		return
	}

	// 直接返回真实数据
	log.Printf("✅ 成功获取%d条市场数据 (CoinGecko)", len(data))
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
		"source":  "coingecko",
	})
}

// fetchFromCoinGecko 从CoinGecko API获取数据
func fetchFromCoinGecko(limit string) ([]map[string]interface{}, error) {
	// 简化URL，移除可能干扰的参数，确保获取基本的image字段
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=%s&page=1&sparkline=false", limit)

	client := createHTTPClient()

	// 创建请求并添加HTTP头部
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("创建请求失败: %v", err)
	}

	req.Header.Set("User-Agent", "market-pulse/1.0")
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Accept-Encoding", "gzip, deflate")
	req.Header.Set("Connection", "keep-alive")

	log.Printf("🔄 尝试CoinGecko API")
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("API调用失败: %v", err)
	}

	// 安全的defer - 只在resp不为nil时执行
	if resp != nil {
		defer resp.Body.Close()
	}

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("API返回状态码: %d", resp.StatusCode)
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("读取响应失败: %v", err)
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, fmt.Errorf("解析JSON失败: %v", err)
	}

	// 调试信息：检查第一个币种的原始数据
	if len(data) > 0 {
		log.Printf("🔍 CoinGecko API 原始数据 (第一个币种): %+v", data[0])
		if imageUrl, exists := data[0]["image"]; exists {
			log.Printf("📸 找到图片字段: %s", imageUrl)
		} else {
			log.Printf("❌ 图片字段不存在于原始数据中")
		}
	}

	return data, nil
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
	// 对 ids 进行规范化，避免因客户端传入的加号/空格导致上游 503
	normalized := strings.ReplaceAll(ids, "+", " ")
	escaped := strings.ReplaceAll(normalized, " ", "%20")
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=%s&sparkline=%s&price_change_percentage=24h", escaped, sparkline)

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
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "CoinGecko API temporarily unavailable",
			"message": "请稍后重试",
		})
		return
	}

	// 安全的defer - 只在resp不为nil时执行
	if resp != nil {
		defer resp.Body.Close()
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "Failed to read API response",
			"message": "请稍后重试",
		})
		return
	}

	var data []map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"error":   "Failed to parse API response",
			"message": "请稍后重试",
		})
		return
	}

	// 返回前端期望的格式
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"data":    data,
	})
}

// GetOhlcData fetches OHLC data for a specific coin from CoinGecko API
func GetOhlcData(c *gin.Context) {
	coinId := c.Param("id")
	vsCurrency := c.DefaultQuery("vs_currency", "usd")
	days := c.DefaultQuery("days", "7")

	data, err := services.GetCoinOhlcData(coinId, vsCurrency, days)
	if err != nil {
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"success": false,
			"data":    nil,
			"error":   err.Error(),
			"message": "无法获取OHLC数据，外部API连接失败",
		})
		return
	}

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
