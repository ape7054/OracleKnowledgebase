package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql" // _ import for side-effect: registering mysql driver
	"github.com/joho/godotenv"
)

// DB 是全局数据库连接池
var db *sql.DB
var hub *Hub // 添加全局 Hub 实例

// Trade 定义了交易数据结构
type Trade struct {
	ID     int       `json:"id"`
	Price  string    `json:"price"`
	Amount string    `json:"amount"`
	Time   string    `json:"time"`
	Type   string    `json:"type"` // "buy" or "sell"
}

func main() {
	// 加载 .env 文件中的环境变量
	if err := godotenv.Load(); err != nil {
		log.Println("警告: 未找到 .env 文件或无法加载. 将使用系统环境变量.")
	}

	// --- 数据库初始化 ---
	var err error
	// 从环境变量中读取数据库连接信息
	dbUser := getEnv("DB_USER", "market_pulse_user")
	dbPassword := getEnv("DB_PASSWORD", "wBYXZkiLTExiEAHF") // 默认值仅作为备用，实际应从环境变量获取
	dbHost := getEnv("DB_HOST", "127.0.0.1")
	dbPort := getEnv("DB_PORT", "3306")
	dbName := getEnv("DB_NAME", "market_pulse_db")

	// 构建 DSN (Data Source Name)
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true", 
		dbUser, dbPassword, dbHost, dbPort, dbName)
	
	db, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("无法打开数据库: %v", err)
	}

	// 检查数据库连接
	if err = db.Ping(); err != nil {
		log.Fatalf("无法连接到数据库: %v", err)
	}
	fmt.Println("成功连接到数据库!")

	// 自动创建数据表 (数据库迁移)
	createTable()

	// --- WebSocket Hub 初始化 ---
	hub = newHub()
	go hub.run()

	// --- Gin 引擎设置 ---
	router := gin.Default()
	router.Use(cors.Default())

	// --- API 路由定义 ---
	setupRoutes(router)

	// --- 启动服务器 ---
	serverPort := getEnv("SERVER_PORT", "8080")
	log.Printf("后端服务器启动在 http://localhost:%s", serverPort)
	router.Run(":" + serverPort)
}

// getEnv 从环境变量中获取值，如果不存在则返回默认值
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func createTable() {
	query := `
	CREATE TABLE IF NOT EXISTS trades (
		id INT AUTO_INCREMENT PRIMARY KEY,
		price VARCHAR(50) NOT NULL,
		amount VARCHAR(50) NOT NULL,
		trade_time TIMESTAMP NOT NULL,
		trade_type VARCHAR(10) NOT NULL
	);`

	if _, err := db.Exec(query); err != nil {
		log.Fatalf("无法创建 'trades' 表: %v", err)
	}
	fmt.Println("'trades' 表已准备就绪.")
}

func setupRoutes(router *gin.Engine) {
	// 健康检查接口
	router.GET("/api/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// WebSocket 连接端点
	router.GET("/ws/trades", func(c *gin.Context) {
		serveWs(hub, c.Writer, c.Request)
	})

	// 获取所有交易记录
	router.GET("/api/trades", getTrades)

	// 创建一条新的交易记录
	router.POST("/api/trades", createTrade)
}

func getTrades(c *gin.Context) {
	rows, err := db.Query("SELECT id, price, amount, trade_time, trade_type FROM trades ORDER BY trade_time DESC LIMIT 20")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法查询交易记录"})
		return
	}
	defer rows.Close()

	trades := []Trade{}
	for rows.Next() {
		var t Trade
		var tradeTime time.Time
		if err := rows.Scan(&t.ID, &t.Price, &t.Amount, &tradeTime, &t.Type); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "无法扫描交易记录行"})
			return
		}
		t.Time = tradeTime.Format("20:06:07")
		trades = append(trades, t)
	}
	c.JSON(http.StatusOK, trades)
}

func createTrade(c *gin.Context) {
	var newTrade Trade

	// 将请求的 JSON 绑定到 newTrade 结构体
	if err := c.ShouldBindJSON(&newTrade); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "无效的请求数据: " + err.Error()})
		return
	}

	// 验证数据
	if newTrade.Price == "" || newTrade.Amount == "" || newTrade.Type == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "价格, 数量和类型不能为空"})
		return
	}

	query := "INSERT INTO trades (price, amount, trade_time, trade_type) VALUES (?, ?, ?, ?)"
	result, err := db.Exec(query, newTrade.Price, newTrade.Amount, time.Now(), newTrade.Type)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "无法创建交易记录: " + err.Error()})
		return
	}

	// 获取新插入记录的 ID
	id, err := result.LastInsertId()
	if err != nil {
		log.Println("无法获取新交易的ID:", err)
		// 即使无法获取ID，仍然可以继续，但广播的数据会不完整
	}
	
	// 准备要广播的完整交易数据
	fullTrade := Trade{
		ID:     int(id),
		Price:  newTrade.Price,
		Amount: newTrade.Amount,
		Time:   time.Now().Format("20:06:07"),
		Type:   newTrade.Type,
	}

	// 广播新的交易记录
	hub.broadcastTrade(fullTrade)

	c.JSON(http.StatusCreated, gin.H{"status": "交易记录已创建"})
}
