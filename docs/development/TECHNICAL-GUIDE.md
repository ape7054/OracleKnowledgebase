# MarketPulse 技术实现指南

## 🏗️ 系统架构

### 整体架构图
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   前端 (React)   │    │   后端 (Go)     │    │  数据库 (MySQL) │
│                 │    │                 │    │                 │
│ • Material UI   │◄──►│ • Gin Framework │◄──►│ • 用户数据      │
│ • Recharts      │    │ • JWT Auth      │    │ • 交易记录      │
│ • WebSocket     │    │ • WebSocket     │    │ • 市场数据      │
│ • State Mgmt    │    │ • API Gateway   │    │ • 配置信息      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │  外部API服务    │
                    │                 │
                    │ • CoinGecko     │
                    │ • Binance       │
                    │ • 新闻API       │
                    └─────────────────┘
```

## 🔧 技术栈详解

### 前端技术栈
```javascript
{
  "核心框架": "React 18.3.1",
  "UI库": "Material UI 5.15.21",
  "图表库": "Recharts 2.6.2",
  "路由": "React Router DOM 6.24.1",
  "HTTP客户端": "Axios 1.4.0",
  "构建工具": "Vite 4.3.8",
  "状态管理": "React Context + Hooks",
  "样式方案": "Emotion + Material UI theming"
}
```

### 后端技术栈
```go
// 核心依赖
module market-pulse/backend

require (
    github.com/gin-gonic/gin v1.9.1        // Web框架
    github.com/go-sql-driver/mysql v1.9.3  // MySQL驱动
    github.com/gorilla/websocket v1.5.3    // WebSocket支持
    github.com/gin-contrib/cors v1.5.0     // CORS中间件
    github.com/joho/godotenv v1.5.1        // 环境变量管理
)
```

## 📁 项目结构详解

### 前端目录结构
```
src/
├── api/                 # API服务层
│   └── mockApi.js      # 模拟数据API
├── assets/             # 静态资源
├── components/         # 可复用组件
│   ├── common/         # 通用组件
│   ├── charts/         # 图表组件
│   └── forms/          # 表单组件
├── context/            # React Context
│   └── ThemeContext.jsx
├── hooks/              # 自定义Hooks
├── pages/              # 页面组件
│   ├── Dashboard.jsx
│   ├── Trade.jsx
│   ├── Account.jsx
│   └── Home.jsx
├── utils/              # 工具函数
├── constants/          # 常量定义
└── styles/             # 样式文件
```

### 后端目录结构
```
backend/
├── cmd/                    # 应用入口
│   └── market-pulse-backend/
│       └── main.go
├── internal/               # 内部包
│   ├── api/               # API层
│   │   ├── handlers.go    # 请求处理器
│   │   └── router.go      # 路由配置
│   ├── database/          # 数据库层
│   │   ├── connection.go  # 数据库连接
│   │   └── migrations/    # 数据库迁移
│   ├── models/            # 数据模型
│   │   ├── user.go
│   │   └── trade.go
│   ├── services/          # 业务逻辑层
│   │   ├── auth.go
│   │   ├── trading.go
│   │   └── market.go
│   ├── middleware/        # 中间件
│   │   ├── auth.go
│   │   ├── cors.go
│   │   └── logging.go
│   └── websocket/         # WebSocket处理
│       ├── hub.go
│       └── client.go
├── pkg/                   # 公共包
│   ├── config/           # 配置管理
│   ├── logger/           # 日志工具
│   └── utils/            # 工具函数
└── scripts/              # 脚本文件
    ├── setup-db.sql
    └── migrations/
```

## 🔐 安全实现方案

### JWT认证流程
```go
// JWT Token结构
type Claims struct {
    UserID   uint   `json:"user_id"`
    Username string `json:"username"`
    Role     string `json:"role"`
    jwt.StandardClaims
}

// 认证中间件
func AuthMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        token := c.GetHeader("Authorization")
        if token == "" {
            c.JSON(401, gin.H{"error": "未授权访问"})
            c.Abort()
            return
        }
        
        claims, err := ValidateToken(token)
        if err != nil {
            c.JSON(401, gin.H{"error": "无效token"})
            c.Abort()
            return
        }
        
        c.Set("user_id", claims.UserID)
        c.Next()
    }
}
```

### 密码安全
```go
import "golang.org/x/crypto/bcrypt"

// 密码加密
func HashPassword(password string) (string, error) {
    bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
    return string(bytes), err
}

// 密码验证
func CheckPasswordHash(password, hash string) bool {
    err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
    return err == nil
}
```

## 📊 数据库设计

### 核心表结构
```sql
-- 用户表
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    balance DECIMAL(20,8) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- 交易记录表
CREATE TABLE trades (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    side ENUM('buy', 'sell') NOT NULL,
    quantity DECIMAL(20,8) NOT NULL,
    price DECIMAL(20,8) NOT NULL,
    total DECIMAL(20,8) NOT NULL,
    status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_symbol (symbol),
    INDEX idx_created_at (created_at)
);

-- 市场数据表
CREATE TABLE market_data (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    symbol VARCHAR(20) NOT NULL,
    price DECIMAL(20,8) NOT NULL,
    volume_24h DECIMAL(20,8),
    change_24h DECIMAL(10,4),
    market_cap DECIMAL(30,2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_symbol_timestamp (symbol, timestamp)
);
```

## 🌐 API设计规范

### RESTful API设计
```go
// API路由设计
func SetupRouter(api *API) *gin.Engine {
    router := gin.Default()
    
    // 公开接口
    public := router.Group("/api/v1")
    {
        public.POST("/auth/register", api.Register)
        public.POST("/auth/login", api.Login)
        public.GET("/market/prices", api.GetMarketPrices)
        public.GET("/market/symbols", api.GetSymbols)
    }
    
    // 需要认证的接口
    protected := router.Group("/api/v1")
    protected.Use(AuthMiddleware())
    {
        protected.GET("/user/profile", api.GetProfile)
        protected.PUT("/user/profile", api.UpdateProfile)
        protected.GET("/trades", api.GetTrades)
        protected.POST("/trades", api.CreateTrade)
        protected.GET("/portfolio", api.GetPortfolio)
    }
    
    // WebSocket接口
    router.GET("/ws/market", api.HandleWebSocket)
    
    return router
}
```

### API响应格式
```go
// 统一响应格式
type APIResponse struct {
    Success bool        `json:"success"`
    Data    interface{} `json:"data,omitempty"`
    Error   string      `json:"error,omitempty"`
    Code    int         `json:"code"`
}

// 成功响应
func SuccessResponse(c *gin.Context, data interface{}) {
    c.JSON(200, APIResponse{
        Success: true,
        Data:    data,
        Code:    200,
    })
}

// 错误响应
func ErrorResponse(c *gin.Context, code int, message string) {
    c.JSON(code, APIResponse{
        Success: false,
        Error:   message,
        Code:    code,
    })
}
```

## 🔄 WebSocket实时数据

### WebSocket Hub设计
```go
type Hub struct {
    clients    map[*Client]bool
    broadcast  chan []byte
    register   chan *Client
    unregister chan *Client
}

type Client struct {
    hub  *Hub
    conn *websocket.Conn
    send chan []byte
}

// 广播市场数据
func (h *Hub) BroadcastMarketData(data MarketData) {
    message, _ := json.Marshal(data)
    h.broadcast <- message
}
```

## 🧪 测试策略

### 前端测试
```javascript
// 组件测试示例
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard';

test('renders dashboard with market data', () => {
  render(<Dashboard />);
  expect(screen.getByText('Market Overview')).toBeInTheDocument();
});
```

### 后端测试
```go
// API测试示例
func TestGetTrades(t *testing.T) {
    router := setupTestRouter()
    w := httptest.NewRecorder()
    req, _ := http.NewRequest("GET", "/api/v1/trades", nil)
    req.Header.Set("Authorization", "Bearer "+testToken)
    
    router.ServeHTTP(w, req)
    
    assert.Equal(t, 200, w.Code)
}
```

## 🚀 部署配置

### Docker配置
```dockerfile
# 后端Dockerfile
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o main cmd/market-pulse-backend/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=builder /app/main .
CMD ["./main"]
```

### Nginx配置
```nginx
server {
    listen 80;
    server_name localhost;
    
    # 前端静态文件
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    
    # API代理
    location /api/ {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
    
    # WebSocket代理
    location /ws/ {
        proxy_pass http://backend:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

---

这个技术指南提供了项目的核心技术实现方案。接下来我们可以按照开发路线图逐步实现这些功能。
