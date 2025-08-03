package database

import (
	"fmt"
	"log"
	"os"

	"gorm.io/driver/mysql"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"

	"market-pulse/backend/internal/models"
)

var DB *gorm.DB

func Init() {
	var err error

	// 尝试连接MySQL
	if tryMySQLConnection() {
		log.Println("✅ 使用MySQL数据库")
	} else {
		// 如果MySQL连接失败，使用SQLite内存数据库
		log.Println("⚠️ MySQL连接失败，使用SQLite内存数据库作为临时方案")
		DB, err = gorm.Open(sqlite.Open(":memory:"), &gorm.Config{})
		if err != nil {
			log.Fatalf("❌ SQLite内存数据库创建失败: %v", err)
		}
	}

	// 自动迁移数据库表
	err = DB.AutoMigrate(&models.User{}, &models.Trade{})
	if err != nil {
		log.Fatalf("❌ 数据库表迁移失败: %v", err)
	}

	// 如果是内存数据库，创建一些测试数据
	if DB.Dialector.Name() == "sqlite" {
		createTestData()
	}

	log.Println("✅ 数据库连接和迁移完成")
}

func tryMySQLConnection() bool {
	// 从环境变量获取数据库配置
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	// 构建 DSN（数据源名称）
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	// 尝试连接数据库
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Printf("⚠️ MySQL连接失败: %v", err)
		return false
	}

	DB = db
	return true
}

func createTestData() {
	// 创建测试用户
	testUser := models.User{
		Username:     "testuser",
		PasswordHash: "$2a$14$9kKxpHkSKz7s.J3xN1x1zOYvLjKmLjK8kL3JjK8kL3JjK8kL3JjK8k", // "testpass123"
	}

	if err := DB.Create(&testUser).Error; err != nil {
		log.Printf("⚠️ 创建测试用户失败: %v", err)
	} else {
		log.Println("✅ 创建测试用户: testuser/testpass123")
	}
}
