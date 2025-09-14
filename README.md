# LearningStack - 现代化加密货币学习交易平台

> 🚀 **全栈学习项目** - 采用 Next.js 14 + Go 架构的现代化加密货币学习和模拟交易平台

[![Next.js](https://img.shields.io/badge/Next.js-14.2.32-black?style=flat&logo=next.js)](https://nextjs.org/)
[![Go](https://img.shields.io/badge/Go-1.21+-00ADD8?style=flat&logo=go)](https://golang.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat&logo=docker)](https://www.docker.com/)

## 🎯 项目概述

**LearningStack** 是一个功能丰富的加密货币学习和模拟交易平台，旨在帮助用户：
- 📚 **学习加密货币知识** - 技术文章、新闻资讯
- 💱 **模拟交易体验** - 无风险的交易练习环境  
- 📊 **实时数据展示** - 集成CoinGecko API
- 👥 **用户管理系统** - 完整的认证和账户管理

## 🏗️ 项目架构

```
learning-stack/
├── learning-stack-nextjs/    # 🎯 Next.js 前端主项目
│   ├── src/app/             # App Router 页面
│   ├── src/components/      # React 组件
│   ├── src/lib/            # 工具库和配置
│   └── package.json        # 前端依赖
├── backend/                 # 🔧 Go 后端服务
│   ├── cmd/                # 应用入口
│   ├── internal/           # 业务逻辑
│   └── go.mod             # Go 依赖
├── docker-compose.yml      # 🐳 Docker 编排
└── README.md              # 📖 项目说明
```

## 🚀 快速启动

### 📋 环境要求

- ✅ **Node.js** 18.0+
- ✅ **Go** 1.21+
- ✅ **Docker & Docker Compose** (可选)
- ✅ **Git**

### 🖥️ 开发环境启动

#### 1️⃣ 启动前端 (Next.js)

```bash
# 进入前端项目目录
cd learning-stack-nextjs

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

**🌐 前端访问地址**: http://localhost:3000

#### 2️⃣ 启动后端 (Go)

```bash
# 进入后端目录
cd backend

# 启动 Go 服务器
go run cmd/learning-stack-backend/main.go
```

**🔗 后端API地址**: http://localhost:8080

### 🐳 Docker 一键启动

```bash
# 启动完整环境
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

## 🎨 核心功能

### 🏠 **主要页面**

| 页面 | 路径 | 功能描述 |
|------|------|----------|
| 🏠 主页 | `/` | 项目介绍和导航 |
| 🔐 登录 | `/login` | 用户认证登录 |
| 📝 注册 | `/register` | 新用户注册 |
| 📊 仪表板 | `/dashboard` | 用户主控制台 |
| 💱 交易 | `/trade` | 模拟交易界面 |
| 📰 新闻 | `/news` | 加密货币资讯 |
| 📖 文章 | `/articles` | 技术文章分享 |
| ⚙️ 账户 | `/account` | 个人设置管理 |

### 🔧 **技术特性**

- ⚡ **服务端渲染 (SSR)** - Next.js App Router
- 🎯 **类型安全** - 全面 TypeScript 支持
- 🎨 **现代 UI** - Material-UI + Emotion
- 🔐 **安全认证** - JWT + 路由保护
- 📱 **响应式设计** - 移动端适配
- 🌙 **主题切换** - 深色/浅色模式
- 🔄 **实时数据** - WebSocket 支持
- 📡 **API 集成** - CoinGecko 数据源

## 🛠️ 技术栈

### 🎨 **前端技术**

- **🚀 框架**: Next.js 14 (App Router)
- **💙 语言**: TypeScript 5.0+
- **🎨 UI库**: Material-UI (MUI) v5
- **🎭 样式**: Emotion (CSS-in-JS)
- **🔄 状态**: React Context API
- **📡 请求**: Axios
- **🔗 路由**: Next.js App Router
- **📦 构建**: Next.js 内置

### 🔧 **后端技术**

- **⚡ 语言**: Go 1.21+
- **🌐 框架**: Gin Web Framework
- **🗄️ 数据库**: GORM + MySQL/SQLite
- **🔐 认证**: JWT (JSON Web Tokens)
- **📡 实时**: WebSocket
- **🌐 API**: RESTful + CoinGecko 集成
- **🐳 部署**: Docker + Docker Compose

## 📖 API 文档

### 🔐 **认证接口**

```bash
# 用户注册
POST /api/auth/register
Content-Type: application/json
{
  "username": "string",
  "email": "string", 
  "password": "string"
}

# 用户登录
POST /api/auth/login
Content-Type: application/json
{
  "username": "string",
  "password": "string"
}
```

### 📊 **市场数据**

```bash
# 获取市场数据
GET /api/market/coins?limit=10&page=1

# 获取特定币种信息
GET /api/market/coins/{coin_id}

# 获取K线数据
GET /api/market/ohlc/{coin_id}?days=7
```

### 📰 **新闻资讯**

```bash
# 获取新闻列表
GET /api/news?category=crypto&limit=20

# 获取文章列表
GET /api/articles?page=1&limit=10
```

## 🔧 开发指南

### 📦 **依赖管理**

```bash
# 前端依赖
cd learning-stack-nextjs
npm install              # 安装依赖
npm run build           # 构建生产版本
npm run type-check      # TypeScript 类型检查
npm run lint           # ESLint 代码检查

# 后端依赖
cd backend
go mod tidy            # 整理依赖
go mod download        # 下载依赖
go test ./...          # 运行测试
```

### 🐛 **调试与测试**

```bash
# 前端开发调试
npm run dev            # 开发模式 (热重载)

# 后端开发调试
go run cmd/learning-stack-backend/main.go

# 健康检查
curl http://localhost:8080/api/health
# 预期响应: {"status":"healthy"}
```

## 🔧 常见问题

### ❓ **端口冲突**

- **前端**: 默认端口 3000，如被占用会自动切换到 3001
- **后端**: 默认端口 8080
- **解决方案**: 检查并释放占用的端口

```bash
# Windows 检查端口占用
netstat -ano | findstr :3000
netstat -ano | findstr :8080

# 终止进程
taskkill /PID <进程ID> /F
```

### ❓ **数据库连接**

```bash
# 启动 MySQL (Docker)
docker-compose up db -d

# 检查连接
docker-compose logs db
```

### ❓ **前后端通信**

确保 `learning-stack-nextjs/next.config.js` 中的 API 代理配置正确：

```javascript
rewrites: async () => [
  {
    source: '/api/:path*',
    destination: 'http://localhost:8080/api/:path*'
  }
]
```

## 🎯 路线图

- [ ] 🔄 **实时交易** - WebSocket 实时价格推送
- [ ] 📊 **高级图表** - TradingView 集成
- [ ] 🤖 **智能提醒** - 价格警报系统
- [ ] 📱 **移动应用** - React Native 版本
- [ ] 🌐 **多语言** - 国际化支持
- [ ] 📈 **数据分析** - 用户行为分析

## 🤝 贡献指南

1. Fork 此仓库
2. 创建特性分支: `git checkout -b feature/新功能`
3. 提交更改: `git commit -m '添加新功能'`
4. 推送分支: `git push origin feature/新功能`  
5. 提交 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 📞 联系方式

- 📧 **Email**: your-email@example.com
- 🐙 **GitHub**: https://github.com/your-username/learning-stack
- 💬 **Issues**: https://github.com/your-username/learning-stack/issues

---

<div align="center">

**⭐ 如果此项目对你有帮助，请给个星标支持！**

Made with ❤️ by [Your Name]

</div>
