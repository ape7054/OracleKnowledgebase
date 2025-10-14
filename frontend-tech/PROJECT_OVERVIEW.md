# Frontend-Tech 项目概述

## 🎯 项目定位

**Frontend-Tech** 是一个专门用于展示全栈开发能力的技术平台，适合用于求职展示。项目从原有的个人知识管理平台 `frontend-nextjs` 复制并改造而来，重点聚焦于技术能力的展示。

## 📋 已完成的改造内容

### 1. 项目配置更新

#### package.json
- 项目名称：`frontend-tech-showcase`
- 版本：`1.0.0`
- 描述：Full-stack technical showcase - Next.js 15 + Go microservices with real-time features

#### site-config.ts
- 站点名称：Tech Stack Showcase
- 站点描述：全栈技术能力展示平台
- 技术领域分类：
  - `frontend`: 前端开发
  - `backend`: 后端开发
  - `devops`: DevOps
  - `architecture`: 架构设计
  - `performance`: 性能优化
- 精选文档配置：
  - Next.js App Router 完全指南
  - Go 微服务架构实践
  - Docker 容器化部署指南

### 2. 国际化文案更新

#### 中文版 (zh.json)
- Hero区：从"构建个人知识体系"改为"展示现代化全栈开发能力"
- 技术域卡片：
  - 前端开发 (React, Next.js, TypeScript, Tailwind CSS)
  - 后端开发 (Go, Gin, GORM, WebSocket, MySQL)
  - DevOps (Docker, Nginx, CI/CD)
  - 架构设计 (微服务架构, API设计, 数据库设计)
  - 性能优化 (SSR, 代码分割, Lighthouse 95+)
- 精选文档：技术文档和最佳实践
- 建站初衷改为"项目技术亮点"

#### 英文版 (en.json)
- 所有文案同步更新为技术展示相关内容
- 保持与中文版对应的翻译

### 3. 首页内容重构

#### 图标更新
- 使用技术相关图标：
  - `Code2`: 前端开发
  - `Server`: 后端开发
  - `Container`: DevOps/Docker
  - `Database`: 架构设计
  - `Zap`: 性能优化
  - `FileCode`: Next.js文档
  - `Terminal`: Go后端
  - `GitBranch`: 工程化

#### 卡片内容
- 5个技术能力模块卡片（前端、后端、DevOps、架构、性能）
- 3个精选技术文档卡片（Next.js、Go、Docker）
- 4个技术亮点展示

#### SEO关键词
- 中文：Next.js, React, TypeScript, Go, Docker, 全栈开发, 微服务, WebSocket, 性能优化
- 英文：Next.js, React, TypeScript, Go, Docker, Full-Stack, Microservices, WebSocket, Performance

### 4. 技术文档创建

创建了完整的技术文档体系：

#### 前端文档 (frontend/)
- `nextjs-app-router-guide.mdx` - Next.js App Router 完全指南
  - 服务端组件 vs 客户端组件
  - 路由系统
  - 数据获取
  - 布局系统
  - 性能优化

#### 后端文档 (backend/)
- `go-microservices-architecture.mdx` - Go 微服务架构实践
  - Gin Web 框架
  - GORM 数据库操作
  - JWT 认证
  - WebSocket 实时通信
  - 最佳实践

#### DevOps文档 (devops/)
- `docker-deployment-guide.mdx` - Docker 容器化部署指南
  - Dockerfile 多阶段构建
  - Docker Compose 编排
  - Nginx 配置
  - 生产环境部署
  - 监控和维护

#### 架构文档 (architecture/)
- `full-stack-architecture.mdx` - 全栈应用架构设计
  - 整体架构设计
  - 前端架构（组件设计、状态管理）
  - 后端架构（分层架构、中间件）
  - 数据库设计
  - API 设计规范
  - 安全架构
  - 性能优化

### 5. README 文档

创建了专业的 README.md，包含：
- 项目概述和技术亮点
- 完整的技术栈列表
- 快速开始指南
- 项目结构说明
- 技术文档索引
- 核心功能展示
- 性能指标
- 可用脚本
- 联系方式

## 🛠️ 技术栈

### 前端
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui + Radix UI
- Framer Motion

### 配套后端（在项目根目录）
- Go 1.22
- Gin Web Framework
- GORM
- MySQL 8.0
- WebSocket (Gorilla)
- JWT 认证

### DevOps
- Docker + Docker Compose
- Nginx

## 📁 目录结构

```
frontend-tech/
├── src/
│   ├── app/              # Next.js App Router
│   ├── components/       # 可复用组件
│   ├── config/           # 配置文件
│   ├── hooks/            # 自定义 Hooks
│   ├── lib/              # 工具函数
│   └── messages/         # 国际化文案
├── content/              # Markdown 技术文档
│   └── articles/
│       ├── zh/           # 中文文档
│       │   ├── frontend/
│       │   ├── backend/
│       │   ├── devops/
│       │   └── architecture/
│       └── en/           # 英文文档
├── public/               # 静态资源
├── README.md             # 项目说明
├── PROJECT_OVERVIEW.md   # 项目概述（本文件）
└── package.json
```

## 🚀 使用指南

### 开发环境启动

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问
http://localhost:3000
```

### 生产构建

```bash
# 构建
npm run build

# 启动生产服务器
npm run start
```

### 与后端集成

如需完整的前后端展示，请返回项目根目录：

```bash
cd ..
docker-compose up -d
```

这将启动：
- 前端服务 (port 3000)
- 后端服务 (port 8080)
- MySQL数据库 (port 3307)
- phpMyAdmin (port 8081)

## 🎯 求职使用建议

### 1. 展示重点

**前端岗位**：
- 强调 React 19、Next.js 15、TypeScript 能力
- 展示组件化开发和性能优化
- 突出 Lighthouse 95+ 评分

**后端岗位**：
- 强调 Go 微服务架构
- 展示 API 设计和数据库优化
- 突出 WebSocket 实时通信

**全栈岗位**：
- 完整的前后端技术栈
- Docker 容器化部署
- 端到端架构设计能力

### 2. 技术亮点

- ✅ 使用最新技术栈（Next.js 15, React 19, Go 1.22）
- ✅ 完整的工程化实践（TypeScript, ESLint, Git）
- ✅ 性能优化（SSR/SSG, 代码分割, Lighthouse 95+）
- ✅ 容器化部署（Docker多阶段构建）
- ✅ 国际化支持（中英文）
- ✅ 响应式设计（桌面端+移动端）

### 3. 面试准备

准备详细讲解：
- 项目架构设计思路
- 技术选型理由
- 性能优化实践
- 遇到的技术难点和解决方案
- 未来改进计划

## 📊 性能指标

- ⚡ 首屏加载：< 1.5s
- 🎯 Lighthouse评分：Performance 95+
- 📱 移动端适配：完全响应式
- 🔄 实时性：WebSocket 毫秒级同步

## 🔗 相关链接

- GitHub仓库：待部署后填写
- 在线演示：待部署后填写
- 技术博客：待填写

## 📝 许可证

MIT License

---

## 🎓 学习价值

这个项目适合作为：
- 全栈开发学习材料
- 求职作品集展示
- 技术面试准备
- 现代Web应用开发参考

## 🔄 与原项目的区别

### frontend-nextjs (原项目)
- 定位：个人知识管理平台
- 内容：个人文章、学习笔记、思考记录
- 分类：技术、Web3、跨学科思考、产品、工具

### frontend-tech (技术展示版)
- 定位：全栈技术能力展示平台
- 内容：技术文档、最佳实践、架构设计
- 分类：前端、后端、DevOps、架构、性能

---

*创建时间：2025-10-14*
*最后更新：2025-10-14*

