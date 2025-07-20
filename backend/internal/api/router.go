package api

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRouter 配置并返回一个 Gin 引擎
func SetupRouter(api *API) *gin.Engine {
	router := gin.Default()

	// 使用 CORS 中间件
	router.Use(cors.Default())

	// 设置路由
	// 健康检查
	router.GET("/api/health", api.HealthCheck)

	// 市场数据API
	router.GET("/api/market/data", api.GetMarketData)
	router.GET("/api/market/coins/:id", api.GetCoinDetails)
	router.GET("/api/market/coins/:id/history", api.GetHistoricalData)
	router.GET("/api/market/coins", api.GetMultipleCoins)
	router.GET("/api/market/ping", api.PingCoinGecko)

	// 交易API
	router.GET("/api/trades", api.GetTrades)
	router.POST("/api/trades", api.CreateTrade)

	// WebSocket
	router.GET("/ws/trades", api.ServeWsUpgrade)

	return router
}
