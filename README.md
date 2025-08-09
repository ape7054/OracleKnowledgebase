# MarketPulse

MarketPulse 是一个现代化的加密货币市场智能平台，采用全栈架构开发。项目使用 React + Material UI 构建前端，Go + Gin 框架构建后端，MySQL 作为数据库，全部容器化部署，为开发者提供完整的加密货币交易平台解决方案。

![项目状态](https://img.shields.io/badge/状态-活跃开发-green)
![完成度](https://img.shields.io/badge/完成度-85%25-brightgreen)
![前端](https://img.shields.io/badge/前端-React%2018%20%2B%20MUI%205-blue)
![图表](https://img.shields.io/badge/图表-Recharts-purple)
![构建](https://img.shields.io/badge/构建-Vite-yellow)

## 🎯 项目愿景

打造一个专业的加密货币交易平台，为用户提供：
- 实时市场数据和深度分析
- 安全可靠的交易功能
- 智能投资组合管理
- 用户友好的交互体验

## 📊 项目状态

**总体完成度: 90%** | **最新更新**: 2025年8月8日 | **状态**: 开发环境已完善

| 模块 | 完成度 | 状态 | 说明 |
|------|--------|------|------|
| 🎨 前端UI/UX | 95% | ✅ 专业级 | React + MUI 5 + Recharts，专业级Dashboard |
| 📊 数据可视化 | 90% | ✅ 优秀 | 高级图表组件，动画效果完善 |
| 🌐 API集成 | 85% | ✅ 优秀 | 实时市场数据，完整API服务 |
| 📱 响应式设计 | 95% | ✅ 优秀 | 完美适配所有设备尺寸 |
| 🎭 动画系统 | 90% | ✅ 优秀 | 流畅的交互动画和视觉效果 |
| 🚀 构建部署 | 95% | ✅ 优秀 | Vite构建，Nginx部署 |
| 📚 文档系统 | 95% | ✅ 优秀 | 完整的开发文档 + AI协作工具 |
| 🤖 AI协作 | 90% | ✅ 创新 | Oracle工具箱 |

## ✨ 核心功能

### ✅ 已完成功能
- **🎨 现代化UI界面**: 基于Material UI的专业设计
- **📊 交互式仪表板**: 完整的市场数据展示和图表可视化
- **💹 交易界面**: 模拟交易功能，支持买入/卖出操作
- **👤 账户管理**: 用户资料和设置管理页面
- **🌓 主题系统**: 深色/浅色模式无缝切换
- **📱 响应式设计**: 完美适配桌面、平板和移动设备
- **🎭 玻璃态效果**: 现代化的视觉设计语言
- **🚀 开发环境**: 一键启动的Docker化开发环境
- **🌐 真实API集成**: CoinGecko API完全集成，实时市场数据
- **🔧 完整后端服务**: Go + Gin框架，RESTful API设计
- **📊 数据模型**: 完整的市场数据、用户、交易模型设计

### 🔄 开发中功能
- **🔐 用户认证系统**: JWT token认证和权限管理
- **💰 交易系统**: 完整的订单管理和执行逻辑
- **📈 实时数据推送**: WebSocket实时价格更新
- **🎯 前端数据集成**: Dashboard组件真实数据显示

### ⏳ 规划中功能
- **🧪 测试覆盖**: 单元测试、集成测试和E2E测试
- **📊 高级分析**: 技术指标和市场情绪分析
- **🔔 通知系统**: 价格预警和交易通知
- **📱 移动端优化**: PWA支持和移动端专属功能

## 🛠️ 技术栈

### 前端技术
- **⚛️ React 18.3.1**: 现代化前端框架
- **🎨 Material UI 5.15**: 专业UI组件库
- **📊 Recharts 2.6**: 响应式图表库
- **🧭 React Router 6.24**: 单页应用路由
- **⚡ Vite 4.3**: 下一代构建工具
- **💎 Emotion**: CSS-in-JS样式方案
- **🪙 Cryptocurrency Icons**: 加密货币图标库

### 后端技术
- **🐹 Go 1.22**: 高性能后端语言
- **🌐 Gin**: 轻量级Web框架
- **🗄️ MySQL 8.0**: 关系型数据库
- **🔌 WebSocket**: 实时通信
- **🔐 JWT**: 用户认证
- **🐳 Docker**: 容器化部署

### 开发工具
- **🐳 Docker Compose**: 开发环境编排
- **📝 ESLint**: 代码质量检查
- **🎯 Nginx**: 反向代理服务器

## 🚀 快速开始

### ⚡ 一键启动 (推荐新手)

```bash
# 1. 克隆项目
git clone https://github.com/ape7054/trading-dashboard.git
cd market-pulse

# 2. 启动完整环境
npm install && npm run build && docker-compose up -d

# 3. 访问应用
# 生产版: http://localhost:9088
# 数据库管理: http://localhost:8081
```

### 📋 环境要求
确保您的系统已安装以下软件：
- ✅ **Node.js** (v18+)
- ✅ **Go** (v1.22+ 推荐 v1.22.4)
- ✅ **Docker & Docker Compose** (推荐方式)
- ✅ **Git**

> ⚠️ **重要提示**: 如果您的Go版本是1.22.x，项目已优化兼容。如果遇到版本问题，推荐使用Docker启动方式。

### ⚡ Docker方式启动 (强烈推荐)
这是启动本地开发环境最可靠的方式，能自动解决网络环境和依赖问题。

```bash
# 1. 克隆项目
git clone https://github.com/ape7054/trading-dashboard.git
cd market-pulse

# 2. 构建前端资源
npm install
npm run build

# 3. 启动 Docker 服务（数据库、后端、前端生产版）
docker-compose up -d

# 4. 检查服务状态
docker-compose ps

# 5. 验证服务运行
curl http://localhost:8080/api/health
curl "http://localhost:8080/api/market/data?limit=2"
```

🎉 **Docker环境访问地址**:
- 🌐 **前端应用(生产版)**: `http://localhost:9088`
- 🔧 **后端API**: `http://localhost:8080/api`
- 🗄️ **数据库管理(phpMyAdmin)**: `http://localhost:8081`
  - 主机: `db`
  - 用户: `market_pulse_user`
  - 密码: `wBYXZkiLTExiEAHF`
- 🗄️ **MySQL数据库**: `localhost:3307`

### 🖥️ 混合开发模式启动 (推荐开发使用)
Docker 后端 + 本地前端开发服务器，支持热重载且网络连接稳定：

```bash
# 1. 启动 Docker 后端服务（数据库 + 后端API）
docker-compose up -d db phpmyadmin backend

# 2. 安装前端依赖
npm install

# 3. 启动前端开发服务器（解决 IPv6/IPv4 绑定问题）
npx vite --host 127.0.0.1 --port 5175
# 或者使用 npm 脚本
npm run dev -- --host 127.0.0.1 --port 5175

# 4. 验证服务状态
curl http://127.0.0.1:5175      # 前端开发服务器
curl http://localhost:8080/api/health  # 后端API
```

🎉 **混合开发环境访问地址**:
- 🔥 **前端应用(开发版-热重载)**: `http://127.0.0.1:5175`
- 🔧 **后端API**: `http://localhost:8080/api`
- 🗄️ **数据库管理**: `http://localhost:8081`

> ⚠️ **重要提示**: 
> - 如果访问 `http://localhost:5175` 出现连接失败，请使用 `http://127.0.0.1:5175`
> - 这是因为 Vite 可能只绑定 IPv6 地址，使用 `--host 127.0.0.1` 强制 IPv4 绑定

### 🔧 手动启动 (高级用户)
如果您不想使用 Docker，也可以在本地手动运行所有服务。

```bash
# 1. 确保Go版本兼容
go version  # 需要Go 1.22+

# 2. 处理Go模块兼容性（如果需要）
cd backend
go mod tidy

# 3. 启动后端服务 (新终端)
cd backend
go run cmd/market-pulse-backend/main.go

# 4. 启动前端开发服务器 (新终端)
# 返回根目录
cd ..
npm install
npm run dev
```

### 🆘 故障排除指南

基于实际部署经验，以下是常见问题的解决方案：

#### 🌐 前端开发服务器连接失败
**症状**: 浏览器访问 `http://localhost:5175` 显示"连接失败"或"404 Not Found"

**原因**: Vite 开发服务器可能只绑定了 IPv6 地址（`::1`），而浏览器尝试访问 IPv4 地址

**解决方案**:
```bash
# 方案1: 使用正确的 IPv4 地址访问
# 浏览器访问: http://127.0.0.1:5175

# 方案2: 启动时强制绑定 IPv4 地址
npx vite --host 127.0.0.1 --port 5175

# 方案3: 使用 npm 脚本并指定主机
npm run dev -- --host 127.0.0.1 --port 5175

# 验证端口绑定状态 (Windows)
netstat -ano | findstr :5175
```

#### 🔥 端口冲突问题
**症状**: `bind: Only one usage of each socket address is normally permitted`

**解决方案**:
```bash
# Windows PowerShell - 查找并终止占用进程
netstat -ano | findstr :8080
taskkill /PID <进程ID> /F

# 终止所有 Node.js 进程（包括 Vite）
taskkill /F /IM node.exe

# 或者使用Docker重启
docker-compose down
docker-compose up -d
```

#### 🐹 Go版本兼容性问题
**症状**: `module golang.org/x/crypto@v0.x.x requires go >= 1.23.0`

**解决方案**:
```bash
# 选项1: 使用Docker启动 (推荐)
docker-compose up -d

# 选项2: 降级依赖 (手动方式)
cd backend
# 已自动适配Go 1.22，执行go mod tidy即可
go mod tidy
```

#### 🌐 外部API连接问题
**症状**: API返回503错误，`context deadline exceeded`

**原因**: 网络环境限制访问外部加密货币API

**解决方案**: 
✅ **Docker启动自动解决** - Docker容器网络环境能绕过大部分网络限制
```bash
docker-compose up -d  # Docker网络环境通常能成功连接外部API
```

#### 🗄️ 数据库连接问题
**症状**: `MySQL连接失败`，自动降级到SQLite

**Docker环境** (推荐):
- ✅ 自动创建MySQL容器和数据库
- ✅ 自动配置连接参数
- ✅ 包含phpMyAdmin管理界面

**手动环境**:
```bash
# 确保MySQL运行在3307端口，或修改.env配置文件
```

#### 🏗️ Docker构建失败
**症状**: 无法下载golang镜像

**解决方案**:
```bash
# 使用国内镜像源或本地镜像
# 项目已配置使用本地可用镜像 golang:1.22-alpine
docker-compose build --no-cache backend
```

### 💡 启动建议

1. **首次启动**: 推荐Docker方式，最稳定可靠
2. **开发调试**: 混合模式（Docker后端 + 本地前端开发服务器）
3. **生产部署**: 完整Docker Compose栈

### 🎯 验证启动成功

访问以下地址确认服务正常：

1. **后端健康检查**: http://localhost:8080/api/health
   - 期望返回: `{"status":"UP"}`

2. **市场数据API**: http://localhost:8080/api/market/data?limit=2
   - 期望返回: 包含比特币、以太坊等加密货币数据

3. **前端应用**: 
   - **生产版(Docker)**: http://localhost:9088
   - **开发版(热重载)**: http://127.0.0.1:5175 ⭐ 注意使用 127.0.0.1
   - 期望看到: 完整的加密货币仪表板界面

4. **数据库管理**: http://localhost:8081
   - 主机: `db`
   - 用户: `market_pulse_user`  
   - 密码: `wBYXZkiLTExiEAHF`

> 📚 **遇到其他问题?** 查看 [开发环境指南](Oracle/project-docs/development/setup-guide.md) 的详细故障排除，或提交 [Issue](https://github.com/ape7054/trading-dashboard/issues)

## 📁 项目架构

```
market-pulse/
├── 📁 src/                    # 前端源代码 (React + Vite)
│   ├── 📁 api/               # API服务层
│   ├── 📁 assets/            # 静态资源
│   ├── 📁 components/        # 可复用组件
│   ├── 📁 context/           # React Context
│   ├── 📁 pages/             # 页面组件
│   │   ├── 🏠 Home.jsx       # 着陆页
│   │   ├──  dashboard/      # 仪表板
│   │   ├── 💹 Trade.jsx      # 交易界面
│   │   └── 👤 Account.jsx    # 账户管理
│   ├── ⚛️ App.jsx            # 主应用组件
│   └── 🎯 main.jsx           # 应用入口
├── 📁 backend/               # 后端源代码 (Go + Gin)
│   ├── 📁 cmd/               # 应用入口
│   ├── 📁 internal/          # 内部包
│   │   ├── 📁 api/           # API处理器
│   │   ├── 📁 database/      # 数据库层
│   │   ├── 📁 models/        # 数据模型
│   │   └── 📁 websocket/     # WebSocket处理
│   └── 📄 go.mod             # Go模块定义
├── 📁 Oracle/               # AI协作与项目文档
│   ├── 📁 project-docs/      # 核心项目文档
│   └── 📁 prompts/           # AI Prompt库
├── 🐳 docker-compose.yml     # Docker编排
├── 🚀 start-dev.bat          # 启动脚本
└── ⚙️ vite.config.js         # Vite配置
```

> 🔍 **详细架构**: 查看 [AI协作与项目文档](Oracle/) 了解完整的系统架构设计与文档

## 📚 完整文档

我们提供了详细的文档来帮助您快速上手和深入了解项目。所有文档和AI协作资源均通过`Oracle`工具箱进行统一管理。

| 📖 文档 | 📝 描述 |
|---------|---------|
| [🤖 AI协作工具箱](Oracle/README.md) | 完整功能介绍和导航 |
| [🚀 开发环境指南](Oracle/project-docs/development/README.md) | 环境搭建和快速启动 |
| [🗺️ 开发路线图](Oracle/project-docs/development/DEVELOPMENT-ROADMAP.md) | 项目规划和开发优先级 |
| [🌐 API规范](Oracle/project-docs/development/API-SPECIFICATION.md) | 接口文档和使用说明 |
| [💡 AI上下文指南](Oracle/project-docs/ai-collaboration/AI-CONTEXT-GUIDE.md) | 30秒了解项目状态 |

### 📖 推荐阅读顺序
1.  **新手开发者**: 开发环境指南 → 开发路线图
2.  **有经验开发者**: 开发环境指南 → API规范 → 开发路线图
3.  **项目管理者**: 开发路线图 → AI上下文指南

## 🎯 开发路线图

### 🔥 阶段一：核心功能完善 (80%完成)
**目标**: 建立稳定的核心功能基础

- ✅ **前端UI框架** - React + Material UI 完整界面
- ✅ **真实API集成** - CoinGecko API完全集成，实时数据获取
- 🔄 **用户认证系统** - JWT认证和权限管理 (下一步)
- ⏳ **基础交易功能** - 订单管理和执行逻辑

### 🔶 阶段二：质量保证 (下一阶段)
**目标**: 提升代码质量和用户体验

- ⏳ **测试覆盖** - 单元测试、集成测试、E2E测试
- ⏳ **性能优化** - 前端优化、API缓存、数据库优化
- ⏳ **错误处理** - 完善的错误边界和用户友好提示
- ⏳ **安全加固** - 输入验证、SQL注入防护、XSS防护

### 🔷 阶段三：功能扩展 (未来规划)
**目标**: 增强平台竞争力和用户粘性

- ⏳ **高级分析** - 技术指标、市场情绪分析
- ⏳ **移动端优化** - PWA支持、移动端专属功能
- ⏳ **社交功能** - 用户互动、分享、评论
- ⏳ **AI驱动** - 智能推荐、价格预测

> 📊 **详细计划**: 查看 [完整开发路线图](docs/DEVELOPMENT-ROADMAP.md) 了解具体的时间安排和技术方案

## 🤝 参与贡献

我们热烈欢迎社区贡献！无论是代码、文档、设计还是想法，都是宝贵的贡献。

### 🔄 贡献流程
1. **🍴 Fork** 项目到您的GitHub账户
2. **🌿 创建** 功能分支 (`git checkout -b feature/amazing-feature`)
3. **💾 提交** 您的更改 (`git commit -m 'feat: add amazing feature'`)
4. **📤 推送** 到分支 (`git push origin feature/amazing-feature`)
5. **🔀 创建** Pull Request

### 📋 贡献类型
- **🐛 Bug修复** - 发现并修复问题
- **✨ 新功能** - 添加有用的新特性
- **📚 文档改进** - 完善文档和注释
- **🎨 UI/UX优化** - 改进用户界面和体验
- **🧪 测试补充** - 增加测试覆盖率
- **⚡ 性能优化** - 提升应用性能

### 📝 开发规范
- 遵循现有的代码风格和架构
- 提供清晰的commit信息
- 添加必要的测试用例
- 更新相关文档

## 📄 开源许可

本项目采用 **MIT 许可证** 开源，您可以自由使用、修改和分发。查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 获取支持

遇到问题或需要帮助？我们提供多种支持渠道：

- 🐛 **Bug报告**: [GitHub Issues](https://github.com/ape7054/trading-dashboard/issues)
- 💬 **功能讨论**: [GitHub Discussions](https://github.com/ape7054/trading-dashboard/discussions)
- 📖 **文档问题**: 查看 [AI协作与项目文档](Oracle/)
- 🤖 **AI协作**: 使用 [Oracle](Oracle/) 完整工具箱
- 📧 **直接联系**: 项目维护者

### 📁 文档结构

项目采用Oracle统一管理所有文档和AI协作资源：

#### `/Oracle/` - 完整AI协作工具箱 🤖
- 📖 [工具箱总览](Oracle/README.md) - 完整功能介绍
- 🚀 [快速上下文指南](Oracle/project-docs/ai-collaboration/AI-CONTEXT-GUIDE.md) - 30秒了解项目状态
- 🎯 [Prompt库](Oracle/prompts/) - 专业AI助手提示词
- 💬 [AI对话记录](Oracle/conversations/) - AI开发对话历史
- 🔧 [工具脚本](Oracle/scripts/) - 自动化工具

#### 项目技术文档 (`/Oracle/project-docs/`)
- 📖 [文档导航](Oracle/project-docs/README.md) - 完整的文档索引
- 🛠️ [开发环境指南](Oracle/project-docs/development/README.md) - 环境搭建和开发流程
- 📋 [API规范](Oracle/project-docs/development/API-SPECIFICATION.md) - 接口文档
- 🗺️ [开发路线图](Oracle/project-docs/development/DEVELOPMENT-ROADMAP.md) - 完整的开发计划
- 💬 [所有对话记录](Oracle/conversations/) - AI对话和项目讨论统一管理

### 🆘 常见问题
- **启动失败？** 查看 [开发环境指南](Oracle/project-docs/development/README.md) 的故障排除部分
- **API错误？** 参考 [API规范](Oracle/project-docs/development/API-SPECIFICATION.md)
- **架构疑问？** 查看 [AI协作与项目文档](Oracle/)
- **AI协作？** 查看 [Oracle](Oracle/) 快速上手

---

<div align="center">

**⭐ 觉得项目有用？请给我们一个 Star 支持！**

**🚀 准备开始开发？查看 [开发环境指南](Oracle/project-docs/development/README.md)**

**💡 有想法或建议？欢迎提交 [Issue](https://github.com/ape7054/trading-dashboard/issues) 或 [Discussion](https://github.com/ape7054/trading-dashboard/discussions)**

---

*MarketPulse - 让加密货币交易更智能* 🚀

</div>
