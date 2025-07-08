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
	router.GET("/api/health", api.HealthCheck)
	router.GET("/api/trades", api.GetTrades)
	router.POST("/api/trades", api.CreateTrade)
	router.GET("/ws/trades", api.ServeWsUpgrade)

	return router
}
