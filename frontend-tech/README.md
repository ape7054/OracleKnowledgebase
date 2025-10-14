# Tech Stack Showcase - 全栈技术展示平台

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![React](https://img.shields.io/badge/React-19.1.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Go](https://img.shields.io/badge/Go-1.22-00ADD8)
![License](https://img.shields.io/badge/license-MIT-green)

> 🚀 现代化全栈技术能力展示平台 - Next.js 15 + Go 微服务 + WebSocket + Docker

## ✨ 项目概述

这是一个专门用于展示全栈开发能力的技术平台，涵盖前端、后端、DevOps、架构设计等完整技术栈。项目不仅实现了功能，更注重代码质量、性能优化和工程化实践。

### 技术亮点

- 🎨 **现代化前端** - Next.js 15 (App Router) + React 19 + TypeScript
- ⚡ **高性能后端** - Go 1.22 + Gin 框架 + GORM
- 🔄 **实时通信** - WebSocket 实时数据推送
- 🐳 **容器化部署** - Docker + Docker Compose 一键部署
- 🌍 **国际化支持** - 中英文双语切换
- 🎯 **组件化开发** - shadcn/ui + Radix UI
- 📱 **响应式设计** - 完美适配桌面端和移动端
- 🔐 **安全认证** - JWT + bcrypt 密码加密

## 🛠️ 技术栈

### 前端技术
- **框架**: Next.js 15 (App Router)
- **UI库**: React 19 + TypeScript 5
- **样式**: Tailwind CSS 4 + shadcn/ui
- **动画**: Framer Motion
- **国际化**: next-intl
- **构建工具**: Turbopack + Velite

### 后端技术
- **语言**: Go 1.22
- **框架**: Gin Web Framework
- **数据库**: MySQL 8.0 / SQLite
- **ORM**: GORM
- **认证**: JWT (golang-jwt/jwt)
- **实时通信**: Gorilla WebSocket

### DevOps
- **容器化**: Docker + Docker Compose
- **反向代理**: Nginx
- **版本控制**: Git

## 📦 快速开始

### 环境要求
- Node.js 18+
- Go 1.22+
- Docker & Docker Compose (可选)

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/yourusername/tech-showcase.git
cd tech-showcase/frontend-tech
```

2. **安装依赖**
```bash
npm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问应用**
```
http://localhost:3000
```

### Docker 部署

如需完整的前后端部署，请参考项目根目录的 `docker-compose.yml` 文件：

```bash
# 回到项目根目录
cd ..

# 启动所有服务（前端 + 后端 + 数据库）
docker-compose up -d
```

## 🏗️ 项目结构

```
frontend-tech/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [locale]/     # 国际化路由
│   │   │   ├── page.tsx  # 首页
│   │   │   ├── about/    # 技术栈详解
│   │   │   └── knowledge/ # 技术文档
│   │   ├── layout.tsx    # 根布局
│   │   └── globals.css   # 全局样式
│   ├── components/       # 可复用组件
│   │   ├── ui/          # UI 基础组件
│   │   └── ...          # 业务组件
│   ├── config/          # 配置文件
│   ├── hooks/           # 自定义 Hooks
│   ├── lib/             # 工具函数
│   └── messages/        # 国际化文案
├── content/             # Markdown 技术文档
│   └── articles/
│       ├── zh/          # 中文文档
│       │   ├── frontend/
│       │   ├── backend/
│       │   ├── devops/
│       │   └── architecture/
│       └── en/          # 英文文档
├── public/              # 静态资源
└── package.json
```

## 📚 技术文档

项目包含以下技术文档：

### 前端开发
- [Next.js App Router 完全指南](content/articles/zh/frontend/nextjs-app-router-guide.mdx)
- TypeScript 最佳实践
- React 性能优化

### 后端开发
- [Go 微服务架构实践](content/articles/zh/backend/go-microservices-architecture.mdx)
- RESTful API 设计规范
- WebSocket 实时通信

### DevOps
- [Docker 容器化部署指南](content/articles/zh/devops/docker-deployment-guide.mdx)
- CI/CD 自动化部署
- Nginx 配置优化

### 架构设计
- [全栈应用架构设计](content/articles/zh/architecture/full-stack-architecture.mdx)
- 数据库设计原则
- 性能优化策略

## 🎯 核心功能

### 技术能力展示
- ✅ 前端开发 - React 19、Next.js 15、TypeScript
- ✅ 后端开发 - Go、Gin、GORM、WebSocket
- ✅ DevOps - Docker、Nginx、CI/CD
- ✅ 架构设计 - 微服务、API设计、数据库设计

### 工程化实践
- ✅ TypeScript 类型安全
- ✅ ESLint 代码规范
- ✅ Git 版本控制
- ✅ 组件化开发

### 性能优化
- ✅ SSR/SSG 混合渲染
- ✅ 代码分割和懒加载
- ✅ 图片优化
- ✅ Lighthouse 95+ 评分

## 📈 性能指标

- ⚡ **首屏加载**: < 1.5s
- 🎯 **Lighthouse评分**: Performance 95+
- 📱 **移动端适配**: 完全响应式
- 🔄 **实时性**: WebSocket 毫秒级同步

## 🔧 可用脚本

```bash
# 开发模式
npm run dev

# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

## 📝 主要依赖

### 核心依赖
- `next`: ^15.5.3
- `react`: 19.1.0
- `typescript`: ^5
- `tailwindcss`: ^4

### UI组件
- `@radix-ui/*`: UI基础组件
- `framer-motion`: 动画库
- `lucide-react`: 图标库

### 工具库
- `next-intl`: 国际化
- `next-themes`: 主题切换
- `velite`: Markdown处理

## 🎨 特色功能

### 1. 国际化支持
- 支持中英文切换
- URL路由国际化
- SEO友好

### 2. 主题系统
- 明暗主题切换
- 响应系统主题
- 持久化保存

### 3. 技术文档系统
- Markdown/MDX支持
- 代码高亮
- 目录导航
- 搜索过滤

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- **GitHub**: [ape7054](https://github.com/ape7054)
- **Email**: 1469041017@qq.com
- **Twitter**: [@ency_146904](https://x.com/ency_146904)

## 📄 许可证

MIT License

---

## 💡 技术特点

### 为什么选择这个技术栈？

#### Next.js 15 + React 19
- 最新的 App Router 架构
- 服务端组件提升性能
- 内置优化（图片、字体等）
- 出色的开发体验

#### Go + Gin
- 高性能的并发处理
- 类型安全和编译检查
- 简洁的代码风格
- 丰富的标准库

#### Docker 容器化
- 环境一致性
- 快速部署
- 易于扩展
- 资源隔离

## 🎓 学习资源

这个项目适合作为学习材料，涵盖：

- 现代前端开发
- Go语言后端开发
- Docker容器化
- 全栈架构设计
- 性能优化技巧

---

*这个项目展示了完整的现代化全栈开发能力，从前端到后端，从开发到部署，每一个环节都体现了对技术的深入理解和工程化实践。*
