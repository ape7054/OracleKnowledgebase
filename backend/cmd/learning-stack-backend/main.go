package main

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"learning-stack/backend/internal/api"
	"learning-stack/backend/internal/database"
	"learning-stack/backend/internal/websocket"
)

func main() {
	// Load .env file (try different names)
	envFiles := []string{".env", ".env.local", ".env.docker"}
	for _, envFile := range envFiles {
		if err := godotenv.Load(envFile); err == nil {
			log.Printf("已加载环境配置: %s", envFile)
			break
		}
	}

	// Initialize database
	database.Init()

	// Initialize WebSocket hub
	hub := websocket.NewHub()
	go hub.Run()

	// Initialize Gin router
	router := gin.Default()

	// Setup CORS policy
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		c.Header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	})

	// Setup routes
	apiV1 := router.Group("/api")
	{
		// --- Public Routes ---
		// Market data routes are public
		marketHandler := api.NewMarketHandler()
		marketHandler.RegisterRoutes(apiV1.Group("/market"))

		// Authentication routes are public
		jwtSecret := os.Getenv("JWT_SECRET")
		if jwtSecret == "" {
			log.Fatal("JWT_SECRET environment variable not set")
		}
		jwtExpiresHours, err := strconv.Atoi(os.Getenv("JWT_EXPIRATION_HOURS"))
		if err != nil {
			jwtExpiresHours = 72 // Default to 72 hours
		}
		authHandler := api.NewAuthHandler(database.DB, jwtSecret, time.Hour*time.Duration(jwtExpiresHours))
		authHandler.RegisterRoutes(apiV1.Group("/auth"))

		// Trade data routes - separate public and protected
		tradeHandler := api.NewTradeHandler(database.DB, hub)

		// Public route for getting trades
		apiV1.GET("/trades", tradeHandler.GetTrades)

		// Protected route for creating trades (requires authentication)
		protectedTrades := apiV1.Group("/trades")
		protectedTrades.Use(api.AuthMiddleware(jwtSecret))
		protectedTrades.POST("", tradeHandler.CreateTrade)

		// Health check route is public
		api.RegisterHealthCheck(apiV1)

		// --- Protected Routes ---
		// All routes in this group require authentication
		protected := apiV1.Group("/account")
		protected.Use(api.AuthMiddleware(jwtSecret))
		{
			// Example protected route
			protected.GET("/profile", func(c *gin.Context) {
				userID, _ := c.Get("userID")
				c.JSON(http.StatusOK, gin.H{
					"message": "This is a protected route",
					"user_id": userID,
				})
			})
		}
	}

	// WebSocket routes
	wsGroup := router.Group("/ws")
	{
		wsGroup.GET("/trades", hub.HandleWebSocket)
	}

	// 启动服务器
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("🚀 后端服务器启动 -> http://localhost:%s", port)
	log.Printf("🔌 WebSocket服务 -> ws://localhost:%s/ws/trades", port)
	log.Printf("📊 API文档 -> http://localhost:%s/api/health", port)

	if err := router.Run(":" + port); err != nil {
		log.Fatalf("❌ 服务器启动失败: %v", err)
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
