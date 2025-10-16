# Oracle Knowledge Base - 个人知识管理平台

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![Go](https://img.shields.io/badge/Go-1.22-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![React](https://img.shields.io/badge/React-19.1.0-blue)

> 🚀 一个现代化的全栈知识管理平台，集成个人博客、工具集、Web3内容和AI功能

## ✨ 项目亮点

- 🎨 **现代化设计** - 采用 Next.js 15 + TypeScript + Tailwind CSS，响应式设计，支持深色模式
- 🌍 **国际化支持** - 内置中英文双语切换，SEO友好
- 🔐 **完整用户系统** - JWT认证，用户注册/登录，权限管理
- 📊 **实时数据** - WebSocket实时通信，交易数据展示
- 🐳 **容器化部署** - Docker + Docker Compose 一键部署
- ⚡ **高性能后端** - Go + Gin框架，支持MySQL/SQLite双数据库
- 🎯 **组件化开发** - shadcn/ui组件库，可复用组件设计
- 📱 **移动端优化** - 完全响应式，完美适配移动设备

## 🛠️ 技术栈

### 前端技术
- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript 5.x
- **UI**: React 19 + Tailwind CSS 4
- **组件库**: shadcn/ui + Radix UI
- **动画**: Framer Motion + 自定义动画组件
- **国际化**: next-intl
- **状态管理**: React Hooks + Context
- **构建工具**: Turbopack + Velite

### 后端技术
- **语言**: Go 1.22
- **框架**: Gin Web Framework
- **数据库**: MySQL 8.0 / SQLite (开发环境)
- **ORM**: GORM
- **认证**: JWT (golang-jwt/jwt)
- **WebSocket**: Gorilla WebSocket
- **加密**: bcrypt密码加密

### 基础设施
- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx
- **数据库管理**: phpMyAdmin
- **版本控制**: Git
- **部署**: 支持云服务器部署

## 🏗️ 项目架构

```
OracleKnowledgebase/
├── frontend-nextjs/           # Next.js 前端应用
│   ├── src/
│   │   ├── app/              # App Router页面
│   │   ├── components/       # 可复用组件
│   │   ├── config/           # 配置文件
│   │   ├── hooks/            # 自定义Hooks
│   │   └── lib/              # 工具库
│   ├── content/              # Markdown文章内容
│   └── public/               # 静态资源
├── backend-go/               # Go 后端服务
│   ├── cmd/                  # 应用入口
│   ├── internal/
│   │   ├── api/              # API路由和处理器
│   │   ├── database/         # 数据库配置
│   │   ├── models/           # 数据模型
│   │   ├── services/         # 业务逻辑
│   │   └── websocket/        # WebSocket服务
│   └── scripts/              # 数据库脚本
└── docker-compose.yml        # 容器编排配置
```

## 🚀 核心功能

### 📚 知识管理系统
- **文章系统**: 支持Markdown文章，代码高亮，目录导航
- **分类管理**: 技术开发、Web3、产品思考、工具等多个分类
- **搜索过滤**: 按分类、标签筛选文章
- **阅读体验**: 优化的阅读界面，移动端适配

### 👥 用户认证系统
- **安全认证**: bcrypt密码加密 + JWT Token
- **用户管理**: 注册、登录、个人资料管理
- **权限控制**: 基于角色的访问控制

### 📈 交易数据系统
- **实时数据**: WebSocket实时推送交易数据
- **数据管理**: 交易记录的增删改查
- **用户关联**: 每个交易记录关联到具体用户

### 🌐 多语言支持
- **双语界面**: 中文/英文无缝切换
- **SEO优化**: 多语言URL结构，搜索引擎友好
- **内容管理**: 支持多语言文章内容

### 🎨 现代化UI
- **响应式设计**: 完美适配桌面端和移动端
- **深色模式**: 用户可切换明暗主题
- **动画效果**: 流畅的页面转场和交互动画
- **组件化**: 高度可复用的UI组件

## 📦 快速开始

### 环境要求
- Node.js 18+
- Go 1.22+
- Docker & Docker Compose
- MySQL 8.0+ (可选，支持SQLite)

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/yourusername/OracleKnowledgebase.git
cd OracleKnowledgebase
```

2. **安装依赖**
```bash
# 前端依赖
cd frontend-nextjs
npm install

# 后端依赖
cd ../backend-go
go mod download
```

3. **配置环境变量**
```bash
# 在 backend-go 目录下创建 .env 文件
cp .env.example .env
# 编辑数据库连接等配置
```

4. **启动开发服务**
```bash
# 启动后端服务 (端口: 8080)
cd backend-go
go run cmd/learning-stack-backend/main.go

# 启动前端服务 (端口: 3000)
cd ../frontend-nextjs
npm run dev
```

### Docker 部署

```bash
# 一键启动所有服务
docker-compose up -d

# 服务访问地址:
# 前端: http://localhost:3000
# 后端API: http://localhost:8080
# 数据库管理: http://localhost:8081
```

## 📱 功能演示

### 主要页面
- **首页**: 个人介绍 + 技术栈展示 + 知识域导航
- **知识库**: 文章列表 + 分类筛选 + 搜索功能
- **关于页面**: 个人履历 + 技能雷达图 + 项目展示
- **工具页面**: 实用工具集合
- **AI页面**: AI相关项目和工具
- **Web3页面**: 区块链项目和学习资源

### 核心特性
- 🔍 **智能搜索**: 支持文章标题、内容、标签搜索
- 📊 **数据可视化**: 技能雷达图、项目时间线
- 🎯 **实时通信**: WebSocket实时数据推送
- 📚 **内容管理**: Markdown文章编辑和发布
- 🔐 **安全认证**: 完整的用户认证和授权系统

## 🔧 技术实现亮点

### 前端架构
- **App Router**: 使用Next.js 15最新的App Router架构
- **服务端渲染**: SSR/SSG混合渲染策略，优化首屏加载
- **组件设计**: 基于Compound Pattern的可复用组件
- **性能优化**: 代码分割、懒加载、图片优化

### 后端架构
- **分层架构**: Controller -> Service -> Repository 清晰分层
- **中间件**: CORS、认证、日志等中间件支持
- **数据库**: 支持MySQL和SQLite双数据库，GORM自动迁移
- **WebSocket**: 实时数据推送，支持房间管理

### DevOps
- **容器化**: 多阶段Docker构建，优化镜像大小
- **服务编排**: Docker Compose管理多服务依赖
- **反向代理**: Nginx配置静态资源和API代理

## 📈 性能特点

- ⚡ **首屏加载**: < 1.5s (优化后)
- 🎯 **Lighthouse评分**: Performance 95+
- 📱 **移动端适配**: 完全响应式，PWA支持
- 🔄 **实时性**: WebSocket毫秒级数据同步
- 🛡️ **安全性**: HTTPS、JWT、CORS完整防护

## 🎯 项目价值

### 对前端开发者
- 展示现代React生态系统的深度应用
- 体现组件化、工程化开发能力
- 证明UI/UX设计和实现能力
- 国际化和无障碍访问实践经验

### 对后端开发者
- 展示Go语言微服务架构设计
- 数据库设计和API接口设计能力
- WebSocket实时通信技术应用
- Docker容器化和部署实践

### 对全栈开发者
- 完整的全栈项目开发经验
- 前后端分离架构设计
- 现代化开发工具链运用
- 项目管理和技术选型能力

## 📞 联系方式

- **GitHub**: [ape7054](https://github.com/ape7054)
- **邮箱**: 1469041017@qq.com
- **Twitter**: [@ency_146904](https://x.com/ency_146904)

## 📝 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情

---

*这个项目展示了我在全栈开发、现代前端技术、后端架构设计、DevOps实践等方面的综合能力。欢迎查看代码细节和在线演示！*
