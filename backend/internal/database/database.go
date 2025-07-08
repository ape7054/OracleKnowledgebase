package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql" // _ import for side-effect: registering mysql driver
)

var db *sql.DB

// Init 初始化数据库连接
func Init() error {
	// 从环境变量中读取数据库连接信息
	dbUser := getEnv("DB_USER", "market_pulse_user")
	dbPassword := getEnv("DB_PASSWORD", "wBYXZkiLTExiEAHF")
	dbHost := getEnv("DB_HOST", "db") // 在 Docker Compose 网络中，主机名就是服务名
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "market_pulse_db")

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		dbUser, dbPassword, dbHost, dbPort, dbName)

	var err error
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		return fmt.Errorf("无法打开数据库: %v", err)
	}

	if err = db.Ping(); err != nil {
		return fmt.Errorf("无法连接到数据库: %v", err)
	}

	log.Println("成功连接到数据库!")
	return createTable()
}

// GetDB 返回数据库连接实例
func GetDB() *sql.DB {
	return db
}

func createTable() error {
	query := `
	CREATE TABLE IF NOT EXISTS trades (
		id INT AUTO_INCREMENT PRIMARY KEY,
		price VARCHAR(50) NOT NULL,
		amount VARCHAR(50) NOT NULL,
		trade_time TIMESTAMP NOT NULL,
		trade_type VARCHAR(10) NOT NULL
	);`

	if _, err := db.Exec(query); err != nil {
		return fmt.Errorf("无法创建 'trades' 表: %v", err)
	}
	log.Println("'trades' 表已准备就绪.")
	return nil
}

// getEnv 从环境变量中获取值，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
