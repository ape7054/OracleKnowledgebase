package main

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"market-pulse/backend/internal/api"
	"market-pulse/backend/internal/database"
)

func main() {
	// Load .env file
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using environment variables")
	}

	// Initialize database
	database.Init()

	// Initialize Gin router
	router := gin.Default()

	// Setup CORS policy
	router.Use(func(c *gin.Context) {
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

	// 启动服务器
	port := os.Getenv("SERVER_PORT")
	log.Printf("后端服务器启动在 http://localhost:%s", port)
	if err := router.Run(":" + port); err != nil {
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
