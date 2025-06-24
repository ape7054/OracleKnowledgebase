package main

import (
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// 定义交易数据结构体
type Trade struct {
	ID     int       `json:"id"`
	Price  string    `json:"price"`
	Amount string    `json:"amount"`
	Time   string    `json:"time"`
	Type   string    `json:"type"` // "buy" or "sell"
}

func main() {
	// 创建一个默认的 Gin 引擎
	router := gin.Default()

	// 配置CORS中间件 - Default()允许所有跨域请求，适合开发环境
	router.Use(cors.Default())

	// 定义一个 GET 请求的路由用于健康检查
	router.GET("/api/health", func(c *gin.Context) {
		// 使用 c.JSON() 来返回一个 JSON 响应
		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "market-pulse-backend (using Gin!)",
		})
	})

	// 定义一个新的 GET 路由，用于获取最近的交易数据
	router.GET("/api/trades", func(c *gin.Context) {
		// 创建一些模拟的交易数据
		trades := []Trade{
			{ID: 1, Price: "63466.92", Amount: "0.5183", Time: time.Now().Format("20:06:07"), Type: "buy"},
			{ID: 2, Price: "63456.64", Amount: "0.1784", Time: time.Now().Add(-2 * time.Minute).Format("20:06:07"), Type: "sell"},
			{ID: 3, Price: "63460.12", Amount: "0.8211", Time: time.Now().Add(-3 * time.Minute).Format("20:06:07"), Type: "buy"},
			{ID: 4, Price: "63455.88", Amount: "0.3456", Time: time.Now().Add(-5 * time.Minute).Format("20:06:07"), Type: "sell"},
			{ID: 5, Price: "63457.30", Amount: "1.1234", Time: time.Now().Add(-6 * time.Minute).Format("20:06:07"), Type: "buy"},
		}

		c.JSON(http.StatusOK, trades)
	})

	// 启动服务器，监听在 8080 端口
	router.Run(":8080")
}
