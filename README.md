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

### 📋 环境要求
确保您的系统已安装以下软件：
- ✅ **Node.js** (v18+)
- ✅ **Go** (v1.22+, 仅Windows环境需要用于交叉编译)
- ✅ **Docker & Docker Compose** (必需)
- ✅ **Git**

### 🐳 Docker完整启动 (推荐)

这是项目的标准启动方式，所有服务完全容器化运行，提供最稳定的开发和生产环境。

```bash
# 1. 克隆项目
git clone https://github.com/ape7054/trading-dashboard.git
cd market-pulse

# 2. 构建前端资源
npm install
npm run build

# 3. Windows环境特殊步骤：交叉编译后端
# (Linux/Mac用户可跳过此步)
cd backend
# 设置环境变量并构建Linux版本
$env:GOOS = "linux"
$env:GOARCH = "amd64" 
$env:CGO_ENABLED = "0"
go build -o market-pulse-backend ./cmd/market-pulse-backend
cd ..

# 4. 启动完整Docker环境
docker-compose up -d

# 5. 验证服务状态
docker-compose ps
docker logs market-pulse-backend --tail 10
```

### 🎉 访问应用

启动成功后，您可以通过以下地址访问各项服务：

| 服务 | 访问地址 | 说明 |
|------|----------|------|
| 🚀 **前端应用** | `http://localhost:9088` | 完整的加密货币仪表板 |
| 🔧 **后端API** | `http://localhost:8080/api` | RESTful API服务 |
| 🗄️ **数据库管理** | `http://localhost:8081` | phpMyAdmin界面 |

#### 数据库连接信息
- **主机**: `db`
- **用户**: `market_pulse_user`
- **密码**: `wBYXZkiLTExiEAHF`
- **端口**: `3307` (外部访问)

### ✅ 验证启动成功

运行以下命令确认所有服务正常：

```bash
# 检查后端健康状态
curl http://localhost:8080/api/health
# 期望返回: {"status":"UP"}

# 测试市场数据API  
curl "http://localhost:8080/api/market/data?limit=2"
# 期望返回: 真实的加密货币市场数据

# 检查前端应用
curl http://localhost:9088
# 期望返回: HTML页面内容
```

### 🔧 管理Docker服务

```bash
# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f backend    # 后端日志
docker-compose logs -f nginx      # 前端日志
docker-compose logs -f db         # 数据库日志

# 重启特定服务
docker-compose restart backend

# 停止所有服务
docker-compose down

# 完全清理并重启
docker-compose down -v
docker-compose up -d
```

### 🆘 故障排除

#### Windows环境交叉编译问题
**症状**: Docker后端容器无法启动，提示 "not found" 或 "permission denied"

**原因**: Windows编译的二进制文件无法在Linux Docker容器中运行

**解决方案**:
```bash
# 进入backend目录
cd backend

# 删除现有二进制文件
del market-pulse-backend

# 重新交叉编译为Linux版本
$env:GOOS = "linux"
$env:GOARCH = "amd64"
$env:CGO_ENABLED = "0"
go build -o market-pulse-backend ./cmd/market-pulse-backend

# 重新构建Docker镜像
docker build -t market-pulse-backend . --no-cache

# 重启后端服务
cd ..
docker-compose restart backend
```

#### 端口冲突问题
**症状**: 启动失败，提示端口被占用

**解决方案**:
```bash
# 检查端口占用 (Windows)
netstat -ano | findstr :8080
netstat -ano | findstr :9088
netstat -ano | findstr :3307

# 终止占用进程
taskkill /PID <进程ID> /F

# 或者停止并重启Docker服务
docker-compose down
docker-compose up -d
```

#### API连接失败
**症状**: 前端显示 "API连接失败" 错误

**解决方案**: Docker环境通常能绕过网络限制，如果仍然失败：
```bash
# 检查后端服务状态
docker logs market-pulse-backend --tail 20

# 确认API可访问性
curl http://localhost:8080/api/health
```

> 📚 **需要更多帮助？** 查看 [完整文档](Oracle/) 或提交 [Issue](https://github.com/ape7054/trading-dashboard/issues)

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
