# MarketPulse API 接口规范

## 📋 概述

MarketPulse API 提供了完整的加密货币交易平台后端服务，包括用户认证、市场数据、交易管理等功能。

### 基础信息
- **Base URL**: `http://localhost:8080/api/v1`
- **认证方式**: JWT Bearer Token
- **数据格式**: JSON
- **字符编码**: UTF-8

### 通用响应格式
```json
{
  "success": true,
  "data": {},
  "error": "",
  "code": 200
}
```

## 🔐 认证接口

### 用户注册
```http
POST /auth/register
Content-Type: application/json

{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "code": 201
}
```

### 用户登录
```http
POST /auth/login
Content-Type: application/json

{
  "username": "string",
  "password": "string"
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "user_id": 1,
    "username": "john_doe",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expires_at": "2024-01-01T12:00:00Z"
  },
  "code": 200
}
```

### 刷新Token
```http
POST /auth/refresh
Authorization: Bearer {token}
```

## 👤 用户管理接口

### 获取用户信息
```http
GET /user/profile
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "balance": "10000.00000000",
    "role": "user",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "code": 200
}
```

### 更新用户信息
```http
PUT /user/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "email": "newemail@example.com",
  "password": "newpassword"
}
```

## 📊 市场数据接口

### 获取市场价格
```http
GET /market/prices?symbols=BTC,ETH,SOL&limit=10
```

**查询参数**:
- `symbols`: 交易对符号，逗号分隔 (可选)
- `limit`: 返回数量限制 (默认: 50)
- `sort`: 排序字段 (market_cap, price, volume)
- `order`: 排序方向 (asc, desc)

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "price": "45000.00000000",
      "change_24h": "2.5",
      "volume_24h": "1234567890.00000000",
      "market_cap": "850000000000.00",
      "last_updated": "2024-01-01T12:00:00Z"
    }
  ],
  "code": 200
}
```

### 获取历史价格数据
```http
GET /market/history/{symbol}?interval=1h&limit=100
```

**路径参数**:
- `symbol`: 交易对符号 (如: BTC, ETH)

**查询参数**:
- `interval`: 时间间隔 (1m, 5m, 15m, 1h, 4h, 1d)
- `limit`: 数据点数量 (默认: 100, 最大: 1000)
- `start_time`: 开始时间 (Unix时间戳)
- `end_time`: 结束时间 (Unix时间戳)

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "timestamp": 1704067200,
      "open": "44500.00000000",
      "high": "45200.00000000",
      "low": "44300.00000000",
      "close": "45000.00000000",
      "volume": "123.45678900"
    }
  ],
  "code": 200
}
```

### 获取交易对列表
```http
GET /market/symbols
```

**响应示例**:
```json
{
  "success": true,
  "data": [
    {
      "symbol": "BTC",
      "name": "Bitcoin",
      "base_asset": "BTC",
      "quote_asset": "USDT",
      "status": "active",
      "min_quantity": "0.00001000",
      "max_quantity": "1000.00000000",
      "tick_size": "0.01000000"
    }
  ],
  "code": 200
}
```

## 💰 交易接口

### 创建交易订单
```http
POST /trades
Authorization: Bearer {token}
Content-Type: application/json

{
  "symbol": "BTC",
  "side": "buy",
  "type": "market",
  "quantity": "0.01000000",
  "price": "45000.00000000"
}
```

**请求参数**:
- `symbol`: 交易对符号
- `side`: 交易方向 (buy, sell)
- `type`: 订单类型 (market, limit, stop_loss)
- `quantity`: 交易数量
- `price`: 价格 (限价单必填)

**响应示例**:
```json
{
  "success": true,
  "data": {
    "order_id": "12345",
    "symbol": "BTC",
    "side": "buy",
    "type": "market",
    "quantity": "0.01000000",
    "price": "45000.00000000",
    "total": "450.00000000",
    "status": "completed",
    "created_at": "2024-01-01T12:00:00Z"
  },
  "code": 201
}
```

### 获取交易历史
```http
GET /trades?symbol=BTC&limit=20&offset=0
Authorization: Bearer {token}
```

**查询参数**:
- `symbol`: 交易对符号 (可选)
- `side`: 交易方向 (可选)
- `status`: 订单状态 (可选)
- `limit`: 返回数量 (默认: 20)
- `offset`: 偏移量 (默认: 0)

**响应示例**:
```json
{
  "success": true,
  "data": {
    "trades": [
      {
        "id": 1,
        "symbol": "BTC",
        "side": "buy",
        "quantity": "0.01000000",
        "price": "45000.00000000",
        "total": "450.00000000",
        "status": "completed",
        "created_at": "2024-01-01T12:00:00Z"
      }
    ],
    "total": 1,
    "limit": 20,
    "offset": 0
  },
  "code": 200
}
```

### 取消订单
```http
DELETE /trades/{order_id}
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "order_id": "12345",
    "status": "cancelled"
  },
  "code": 200
}
```

## 📈 投资组合接口

### 获取投资组合
```http
GET /portfolio
Authorization: Bearer {token}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "total_value": "10500.00000000",
    "total_pnl": "500.00000000",
    "total_pnl_percentage": "5.00",
    "assets": [
      {
        "symbol": "BTC",
        "quantity": "0.01000000",
        "avg_price": "44000.00000000",
        "current_price": "45000.00000000",
        "value": "450.00000000",
        "pnl": "10.00000000",
        "pnl_percentage": "2.27"
      }
    ]
  },
  "code": 200
}
```

## 🔔 通知接口

### 获取通知列表
```http
GET /notifications?limit=20&unread_only=true
Authorization: Bearer {token}
```

### 标记通知已读
```http
PUT /notifications/{notification_id}/read
Authorization: Bearer {token}
```

## 🌐 WebSocket 接口

### 连接WebSocket
```
ws://localhost:8080/ws/market
```

### 订阅市场数据
```json
{
  "action": "subscribe",
  "channel": "ticker",
  "symbols": ["BTC", "ETH", "SOL"]
}
```

### 实时价格推送
```json
{
  "channel": "ticker",
  "data": {
    "symbol": "BTC",
    "price": "45000.00000000",
    "change_24h": "2.5",
    "timestamp": 1704067200
  }
}
```

## ❌ 错误代码

| 状态码 | 错误类型 | 描述 |
|--------|----------|------|
| 400 | Bad Request | 请求参数错误 |
| 401 | Unauthorized | 未授权或token无效 |
| 403 | Forbidden | 权限不足 |
| 404 | Not Found | 资源不存在 |
| 409 | Conflict | 资源冲突 |
| 422 | Unprocessable Entity | 数据验证失败 |
| 429 | Too Many Requests | 请求频率限制 |
| 500 | Internal Server Error | 服务器内部错误 |

### 错误响应格式
```json
{
  "success": false,
  "error": "Invalid username or password",
  "code": 401,
  "details": {
    "field": "password",
    "message": "Password must be at least 8 characters"
  }
}
```

## 🔒 安全说明

### 认证
- 所有需要认证的接口都需要在请求头中包含 `Authorization: Bearer {token}`
- Token有效期为24小时，过期后需要重新登录或刷新token

### 限流
- 公开接口: 100次/分钟
- 认证接口: 1000次/分钟
- WebSocket连接: 每个用户最多5个并发连接

### 数据验证
- 所有输入数据都会进行严格验证
- 价格和数量字段支持最多8位小数
- 用户名长度: 3-50字符
- 密码长度: 8-128字符

---

这个API规范文档定义了MarketPulse平台的完整接口设计。在实际开发中，我们会按照这个规范逐步实现各个接口。
