package main

import (
	"log"
	"os"

	"market-pulse/backend/internal/api"
	"market-pulse/backend/internal/database"
	"market-pulse/backend/internal/websocket"

	"github.com/joho/godotenv"
)

func main() {
	// 加载 .env 文件
	if err := godotenv.Load(); err != nil {
		log.Println("警告: 未找到 .env 文件或无法加载. 将使用系统环境变量.")
	}

	// 初始化数据库
	if err := database.Init(); err != nil {
		log.Fatalf("数据库初始化失败: %v", err)
	}

	// 初始化 WebSocket Hub
	hub := websocket.NewHub()
	go hub.Run()

	// 创建 API 实例并注入依赖
	apiInstance := api.NewAPI(database.GetDB(), hub)

	// 设置路由
	router := api.SetupRouter(apiInstance)

	// 启动服务器
	serverPort := getEnv("SERVER_PORT", "8080")
	log.Printf("后端服务器启动在 http://localhost:%s", serverPort)
	if err := router.Run(":" + serverPort); err != nil {
		log.Fatalf("无法启动服务器: %v", err)
	}
}

// getEnv 从环境变量中获取值，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
