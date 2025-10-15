# 🚀 Frontend-Tech Showcase

> 全栈技术能力展示平台 - 展示现代化 Web 开发的最佳实践

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Go](https://img.shields.io/badge/Go-1.22-00add8?style=flat-square&logo=go)](https://go.dev/)

## 📋 项目简介

**Frontend-Tech Showcase** 是一个专业的全栈技术能力展示平台，旨在展示现代化 Web 应用开发的完整技术栈和最佳实践。项目采用 Next.js 15 App Router + Go 微服务架构，集成了实时通信、容器化部署等核心技术能力。

### ✨ 核心亮点

- 🎯 **前沿技术栈**：Next.js 15 + React 19 + TypeScript 5 + Tailwind CSS 4
- 🌐 **国际化支持**：完整的中英文双语支持（next-intl）
- 🎨 **现代 UI 设计**：基于 shadcn/ui + Radix UI 的组件库
- ⚡ **性能优化**：SSR/SSG、代码分割、Lighthouse 95+ 评分
- 🔄 **实时通信**：WebSocket 集成（配套 Go 后端）
- 🐳 **容器化部署**：Docker 多阶段构建 + Docker Compose
- 📱 **响应式设计**：完美适配桌面端和移动端
- 📚 **技术文档体系**：完整的技术文档和最佳实践

## 🛠️ 技术栈

### 前端技术

| 分类 | 技术 |
|------|------|
| **框架** | Next.js 15 (App Router), React 19 |
| **语言** | TypeScript 5 |
| **样式** | Tailwind CSS 4, CSS-in-JS |
| **UI 组件** | shadcn/ui, Radix UI |
| **动画** | Framer Motion |
| **图表** | Recharts |
| **国际化** | next-intl |
| **主题** | next-themes (深色/浅色模式) |
| **内容管理** | Velite (MDX) |

### 配套后端技术（在项目根目录）

| 分类 | 技术 |
|------|------|
| **语言** | Go 1.22+ |
| **框架** | Gin Web Framework |
| **ORM** | GORM |
| **数据库** | MySQL 8.0 |
| **实时通信** | WebSocket (Gorilla) |
| **认证** | JWT |

### DevOps

| 分类 | 技术 |
|------|------|
| **容器化** | Docker, Docker Compose |
| **Web 服务器** | Nginx |
| **部署平台** | Vercel (前端) |

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm / pnpm / yarn
- （可选）Go 1.22+ - 如需运行后端服务
- （可选）Docker - 如需容器化部署

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐）
pnpm install

# 或使用 yarn
yarn install
```

### 开发环境启动

```bash
# 启动开发服务器
npm run dev

# 访问
# http://localhost:3000
```

开发服务器将在 `http://localhost:3000` 启动。页面会在编辑文件时自动热更新。

### 生产构建

```bash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

### 配置 GitHub Token（可选）

为了避免 GitHub API 速率限制，建议配置 GitHub Token：

1. 创建 `.env.local` 文件（已在 `.gitignore` 中）
2. 访问 [GitHub Settings - Tokens](https://github.com/settings/tokens)
3. 生成新的 Personal Access Token（需要 `public_repo` 权限）
4. 在 `.env.local` 中添加：

```env
GITHUB_TOKEN=your_github_token_here
```

详细步骤请参考 `env.example` 文件。

## 📁 项目结构

```
frontend-tech/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── [locale]/          # 国际化路由
│   │   │   ├── about/         # 关于页面
│   │   │   ├── ai/            # AI 项目展示
│   │   │   ├── frontend/      # 前端组件展示
│   │   │   ├── knowledge/     # 知识库文档
│   │   │   ├── tools/         # 工具推荐
│   │   │   └── web3/          # Web3 项目展示
│   │   ├── globals.css        # 全局样式
│   │   └── layout.tsx         # 根布局
│   │
│   ├── components/             # 可复用组件
│   │   ├── about/             # 关于页面专用组件
│   │   ├── ui/                # UI 基础组件 (shadcn/ui)
│   │   └── ...                # 其他业务组件
│   │
│   ├── config/                 # 配置文件
│   │   ├── site-config.ts     # 站点配置
│   │   ├── about-data.ts      # 关于页面数据
│   │   ├── ai-projects.ts     # AI 项目数据
│   │   ├── web3-projects.ts   # Web3 项目数据
│   │   └── ...                # 其他配置
│   │
│   ├── hooks/                  # 自定义 React Hooks
│   │   ├── use-mobile.ts      # 移动端检测
│   │   ├── use-toast.ts       # Toast 通知
│   │   └── ...
│   │
│   ├── lib/                    # 工具函数库
│   │   ├── utils.ts           # 通用工具函数
│   │   ├── motion.ts          # 动画配置
│   │   └── ...
│   │
│   ├── messages/               # 国际化文案
│   │   ├── zh.json            # 中文
│   │   └── en.json            # 英文
│   │
│   └── middleware.ts           # Next.js 中间件（i18n）
│
├── content/                    # Markdown/MDX 技术文档
│   └── articles/
│       ├── zh/                # 中文文档
│       │   ├── frontend/      # 前端技术文档
│       │   ├── backend/       # 后端技术文档
│       │   ├── devops/        # DevOps 文档
│       │   └── architecture/  # 架构设计文档
│       └── en/                # 英文文档
│
├── public/                     # 静态资源
│   └── static/                # 图片等静态文件
│
├── docs/                       # 项目文档
│   ├── QUICK_START.md         # 快速开始
│   ├── DEPLOYMENT_GUIDE.md    # 部署指南
│   └── ...
│
├── scripts/                    # 脚本工具
│   └── pre-deploy-check.js    # 部署前检查
│
├── components.json             # shadcn/ui 配置
├── next.config.ts             # Next.js 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── tsconfig.json              # TypeScript 配置
├── velite.config.ts           # Velite (MDX) 配置
└── package.json               # 项目依赖
```

## 📚 技术文档

项目包含完整的技术文档体系，涵盖以下领域：

### 前端开发
- **Next.js App Router 完全指南** - 服务端组件、路由系统、数据获取、性能优化

### 后端开发
- **Go 微服务架构实践** - Gin 框架、GORM、JWT 认证、WebSocket 实时通信

### DevOps
- **Docker 容器化部署指南** - 多阶段构建、Docker Compose、Nginx 配置、生产部署

### 架构设计
- **全栈应用架构设计** - 整体架构、前后端架构、数据库设计、API 规范、安全架构

所有文档位于 `content/articles/` 目录，支持中英文双语。

## 🎨 核心功能模块

### 1. 关于页面 (`/about`)
- 个人简介与技能展示
- 技能雷达图（Recharts）
- 职业时间线
- 项目轮播展示
- Matrix 代码雨特效（WebGL + CSS 双版本）

### 2. 知识库 (`/knowledge`)
- 技术文章分类浏览
- MDX 渲染支持
- 代码高亮（Shiki）
- 文章目录导航
- 搜索和筛选功能

### 3. 前端组件展示 (`/frontend`)
- 100+ UI 组件展示
- 实时预览和代码示例
- 组件分类和搜索
- 响应式设计展示

### 4. AI 项目展示 (`/ai`)
- AI 项目时间线
- LLM 排行榜
- 技术栈标签
- 项目详情弹窗

### 5. Web3 项目展示 (`/web3`)
- Web3 项目时间线
- 区块链技术栈
- 智能合约展示

### 6. 工具推荐 (`/tools`)
- 开发工具推荐
- 分类筛选
- 工具评分

## ⚡ 性能优化

### 已实现的优化策略

- ✅ **SSR/SSG**：服务端渲染和静态生成
- ✅ **代码分割**：动态导入和路由级别分割
- ✅ **图片优化**：Next.js Image 组件
- ✅ **字体优化**：本地字体优化
- ✅ **虚拟滚动**：长列表性能优化（@tanstack/react-virtual）
- ✅ **懒加载**：组件和路由懒加载
- ✅ **移动端优化**：设备检测和适配
- ✅ **WebGL 降级**：移动端自动切换为 CSS 版本

### 性能指标

- 🎯 **Lighthouse Performance**: 95+
- ⚡ **首屏加载时间**: < 1.5s
- 📱 **移动端适配**: 完全响应式
- 🔄 **实时性**: WebSocket 毫秒级同步（需后端）

## 🐳 Docker 部署

### 前端独立部署

```bash
# 构建 Docker 镜像
docker build -t frontend-tech .

# 运行容器
docker run -p 3000:3000 frontend-tech
```

### 前后端完整部署

如需完整的前后端展示，返回项目根目录：

```bash
# 返回根目录
cd ..

# 使用 Docker Compose 启动所有服务
docker-compose up -d
```

这将启动：
- 前端服务：`http://localhost:3000`
- 后端服务：`http://localhost:8080`
- MySQL 数据库：端口 `3307`
- phpMyAdmin：`http://localhost:8081`

## 📜 可用脚本

```bash
# 开发
npm run dev          # 启动开发服务器（支持 Turbopack）

# 构建
npm run build        # 构建生产版本
npm run start        # 启动生产服务器

# 代码质量
npm run lint         # ESLint 代码检查

# 部署
npm run deploy-check # 部署前检查
```

## 🌐 部署

### Vercel 部署（推荐）

1. 推送代码到 GitHub
2. 在 [Vercel](https://vercel.com) 导入项目
3. Vercel 会自动检测 Next.js 并配置构建
4. 点击 Deploy

详细部署指南请参考：
- [VERCEL_DEPLOYMENT_GUIDE.md](./docs/VERCEL_DEPLOYMENT_GUIDE.md)
- [DEPLOYMENT_CHECKLIST.md](./docs/DEPLOYMENT_CHECKLIST.md)

### 其他平台

- **Netlify**: 支持 Next.js
- **自建服务器**: 使用 Docker 部署

## 🎯 使用建议

### 作为求职作品集

**前端岗位**：
- ✅ 展示 React 19、Next.js 15、TypeScript 能力
- ✅ 突出组件化开发和性能优化
- ✅ 强调 Lighthouse 95+ 评分

**后端岗位**：
- ✅ 展示 Go 微服务架构
- ✅ 突出 API 设计和数据库优化
- ✅ 强调 WebSocket 实时通信

**全栈岗位**：
- ✅ 完整的前后端技术栈
- ✅ Docker 容器化部署经验
- ✅ 端到端架构设计能力

### 作为学习资源

- 📖 现代 Web 开发最佳实践
- 📖 Next.js 15 App Router 实战
- 📖 TypeScript 项目架构
- 📖 组件库开发和复用
- 📖 性能优化技巧

## 🔗 相关链接

- 📦 [GitHub 仓库](https://github.com/ape7054/OracleKnowledgebase)
- 🌐 在线演示：待部署后填写
- 📧 联系邮箱：1469041017@qq.com
- 🐦 Twitter：[@ency_146904](https://x.com/ency_146904)

## 📝 许可证

MIT License

## 🙏 致谢

感谢以下开源项目：

- [Next.js](https://nextjs.org/) - React 框架
- [shadcn/ui](https://ui.shadcn.com/) - UI 组件库
- [Radix UI](https://www.radix-ui.com/) - 无障碍组件基础
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Framer Motion](https://www.framer.com/motion/) - 动画库
- [Velite](https://velite.js.org/) - 内容管理

## 📊 项目统计

- ⭐ 100+ 可复用组件
- 📄 20+ 技术文档
- 🎨 双主题支持（深色/浅色）
- 🌍 双语言支持（中英文）
- 📱 完全响应式设计

---

**打造于 2024 - 2025** ｜ 使用 ❤️ 和 ☕ 构建

