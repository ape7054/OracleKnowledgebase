package database

import (
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql" // _ import for side-effect: registering mysql driver

	"gorm.io/driver/mysql"
	"gorm.io/gorm"

	"market-pulse/backend/internal/models"
)

var DB *gorm.DB

// Init initializes the database connection and auto-migrates schemas.
func Init() {
	// 从环境变量中读取数据库连接信息
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	fmt.Println("Database connection established successfully.")

	// Auto-migrate the schemas
	fmt.Println("Running database migrations...")
	err = DB.AutoMigrate(&models.MarketData{}, &models.User{})
	if err != nil {
		log.Fatalf("Failed to migrate database: %v", err)
	}
	fmt.Println("Database migration completed.")
}

// getEnv 从环境变量中获取值，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
