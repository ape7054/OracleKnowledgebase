# 🎓 LearningStack

> 边学边做的全栈项目，从前端到后端，未来还要搞区块链

## 这是啥？

就是一个用来学习和实践的项目，想学啥技术就往里加啥。现在有 Next.js 前端 + Go 后端 + MySQL 数据库，以后还会加 Rust 和区块链相关的东西。

**目标很简单**：
- 📚 边做边学，学以致用
- 🏗️ 架构慢慢演进，不着急
- 🔄 持续迭代，每天进步一点点
- 🌐 前端后端数据库都要会
- ⛓️ 未来要玩 Rust 和 Web3

---

## 🛠️ 技术栈

### 前端
- **Next.js 15** - React 框架，SSR/SSG 都支持
- **React 19** - 最新版的 React
- **TypeScript** - 写 JS 更安心
- **Tailwind CSS** - 写样式贼快
- **Framer Motion** - 动画效果
- **Radix UI** - 现成的 UI 组件
- **next-intl** - 中英文切换
- **Recharts** - 画图表用的

### 后端
- **Go 1.22** - 简单高效的后端语言
- **Gin** - Go 的 Web 框架
- **GORM** - 操作数据库
- **WebSocket** - 实时推送
- **JWT** - 用户登录认证
- **MySQL 8.0** - 数据库

### 其他工具
- **Docker** - 一键启动所有服务
- **Nginx** - 静态文件服务器
- **phpMyAdmin** - 数据库管理界面（懒得用命令行的时候很方便）

---

## ✨ 都有啥功能

### 前端
- 🌍 中英文切换
- 🎨 响应式设计，手机电脑都好看
- 🌓 深色/浅色主题
- 📊 数据图表展示
- 📝 文章系统（支持 Markdown）
- 🎭 各种动画效果

### 后端
- 🔐 用户注册登录（JWT）
- 👤 个人资料管理
- 📈 交易记录的增删改查
- 🔄 WebSocket 实时推送
- 🌐 加密货币价格查询
- 🛡️ 密码加密、安全防护

### 其他
- 🐳 Docker 一键启动
- 🔌 前后端分离
- 🚀 Go 的高并发处理
- 📝 TypeScript 类型检查
- 🔄 代码改了自动刷新

---

## 📁 项目结构

```
learning-stack/
├── frontend-nextjs/              # Next.js 前端应用
│   ├── src/
│   │   ├── app/                 # App Router 页面
│   │   │   ├── [locale]/       # 国际化路由
│   │   │   ├── globals.css     # 全局样式
│   │   │   └── layout.tsx      # 根布局
│   │   ├── components/          # React 组件
│   │   │   ├── ui/             # Radix UI 组件
│   │   │   ├── about/          # 关于页面组件
│   │   │   └── ...             # 其他功能组件
│   │   ├── config/             # 配置文件
│   │   ├── lib/                # 工具函数
│   │   ├── hooks/              # 自定义 Hooks
│   │   └── messages/           # 国际化翻译
│   ├── content/                # MDX 内容
│   │   └── articles/           # 文章目录
│   ├── public/                 # 静态资源
│   ├── docs/                   # 项目文档
│   ├── package.json
│   └── next.config.ts
│
├── backend-go/                  # Go 后端服务
│   ├── cmd/
│   │   └── learning-stack-backend/
│   │       └── main.go         # 入口文件
│   ├── internal/
│   │   ├── api/                # API 处理器
│   │   │   ├── auth_handler.go
│   │   │   ├── trade_handler.go
│   │   │   ├── handlers.go
│   │   │   └── middleware.go
│   │   ├── database/           # 数据库配置
│   │   │   └── database.go
│   │   ├── models/             # 数据模型
│   │   │   ├── user.go
│   │   │   ├── trade.go
│   │   │   └── market.go
│   │   ├── services/           # 业务逻辑
│   │   │   └── coingecko.go
│   │   └── websocket/          # WebSocket
│   │       ├── hub.go
│   │       └── client.go
│   ├── scripts/                # 数据库脚本
│   │   ├── setup-db.sql
│   │   └── upgrade-db.sql
│   ├── go.mod
│   ├── go.sum
│   └── Dockerfile
│
├── nginx/                       # Nginx 配置
│   └── nginx.conf
│
├── docker-compose.yml          # Docker 编排配置
├── FUTURE_ARCHITECTURE.md      # 未来架构规划
└── README.md                   # 项目文档
```

---

## 🚀 怎么跑起来

### 需要先装这些
- Node.js (18+)
- Go (1.22+)
- Docker（推荐用这个，省事）

### 方法一：用 Docker（推荐，最简单）

```bash
# 1. 克隆项目
git clone https://github.com/your-username/learning-stack.git
cd learning-stack

# 2. 直接启动（第一次会慢一点，要下载镜像）
docker-compose up -d

# 3. 打开浏览器访问
# 前端: http://localhost:3000
# 后端: http://localhost:8080
# 数据库管理: http://localhost:8081
```

搞定！就这么简单。

### 方法二：本地开发

**前端：**
```bash
cd frontend-nextjs
npm install
npm run dev
# 访问 http://localhost:3000
```

**后端：**
```bash
cd backend-go

# 设置环境变量（改成你自己的）
export DB_HOST=localhost
export DB_PORT=3307
export DB_USER=market_pulse_user
export DB_PASSWORD=wBYXZkiLTExiEAHF
export DB_NAME=market_pulse_db
export JWT_SECRET=your_secret_key

# 跑起来
go run cmd/learning-stack-backend/main.go
# 访问 http://localhost:8080
```

**数据库：**
```bash
# 先用 Docker 启动数据库
docker-compose up -d db

# 初始化数据库
mysql -h 127.0.0.1 -P 3307 -u market_pulse_user -p market_pulse_db < backend-go/scripts/setup-db.sql
```

---

## 🔧 开发笔记

### 前端怎么加新页面

```typescript
// src/app/[locale]/new-page/page.tsx
import { useTranslations } from 'next-intl';

export default function NewPage() {
  const t = useTranslations('NewPage');
  return <div>{t('title')}</div>;
}
```

记得在 `src/messages/zh.json` 和 `en.json` 里加翻译。

### 后端怎么加新接口

```go
// internal/api/new_handler.go
func (h *Handler) GetSomething(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
        "message": "成功",
        "data": "你的数据",
    })
}

// 然后在 main.go 里注册路由
apiV1.GET("/something", handler.GetSomething)
```

### 数据库改表结构

直接写 SQL 脚本放到 `backend-go/scripts/` 目录，然后手动执行：

```bash
mysql -h 127.0.0.1 -P 3307 -u market_pulse_user -p market_pulse_db < your-script.sql
```

---

## 📚 API 接口

Base URL: `http://localhost:8080/api`

### 主要接口

**用户注册**
```bash
POST /api/auth/register
{
  "email": "test@test.com",
  "password": "123456",
  "username": "testuser"
}
```

**用户登录**
```bash
POST /api/auth/login
{
  "email": "test@test.com",
  "password": "123456"
}
# 返回 token，后面的请求带上这个 token
```

**获取市场数据**
```bash
GET /api/market/prices?symbols=BTC,ETH,SOL
```

**创建交易记录**（需要登录）
```bash
POST /api/trades
Authorization: Bearer <你的token>
{
  "symbol": "BTC",
  "type": "buy",
  "amount": 0.5,
  "price": 45000.00
}
```

**WebSocket 实时推送**
```javascript
const ws = new WebSocket('ws://localhost:8080/ws/trades');
ws.onmessage = (event) => {
  console.log('收到数据:', JSON.parse(event.data));
};
```

---

## 🐳 部署

生产环境直接用 Docker 就行：

```bash
# 改下环境变量（可选）
cp .env.example .env
# 编辑 .env，改密码啥的

# 启动
docker-compose up -d --build

# 看日志
docker-compose logs -f

# 停止
docker-compose down
```

主要环境变量：
- `DB_PASSWORD` - 数据库密码
- `JWT_SECRET` - JWT 密钥（重要！）
- `SERVER_PORT` - 后端端口（默认 8080）

---

## 🔮 接下来要干啥

详细计划看 [FUTURE_ARCHITECTURE.md](./FUTURE_ARCHITECTURE.md)

### 下一步：加个 Rust 后端

准备用 Rust 写个高性能的交易引擎，处理实时数据和复杂计算。Go 处理业务逻辑，Rust 处理高性能场景。

### 再下一步：搞区块链

学 Solana 和 Ethereum，写智能合约，做 DeFi 应用。这个是长期目标，慢慢来。

**学习路线**：
- **1-3个月**: 学 Rust 基础，写点 Web 服务
- **3-6个月**: 学区块链基础，Solana 和 Solidity
- **6个月+**: 做完整的 Web3 应用

就是边学边做，不着急。

---

## 📝 当前进度

- ✅ Next.js 15 前端
- ✅ Go 后端 API
- ✅ MySQL 数据库
- ✅ JWT 登录认证
- ✅ WebSocket 实时推送
- ✅ Docker 一键部署
- ✅ 中英文切换
- 🔄 Rust 后端（计划中）
- 🔄 区块链集成（计划中）

---

## 💬 有问题？

- 发现 Bug：提个 Issue
- 想加功能：提个 Issue
- 想贡献代码：Fork 后提 PR

标准流程就是 Fork → 改代码 → 提 PR，没啥特别的规矩。

---

## 📄 开源协议

MIT License - 随便用，记得标注来源就行

---

**觉得项目不错的话，给个 ⭐ 吧！**
