# 📂 MarketPulse 开发文档中心

欢迎来到 `MarketPulse` 项目的技术开发文档中心。本目录 (`/development`) 储存了项目从规划到实现的所有核心技术文档，是团队成员的技术"真理来源 (Source of Truth)"。

## 📚 文档索引

为了方便查阅，所有核心文档都链接如下：

| 📄 文档链接 | 📝 核心内容 | 🎯 适用场景 |
| :--- | :--- | :--- |
| **[🗺️ 开发路线图 (ROADMAP)](./DEVELOPMENT-ROADMAP.md)** | 项目的阶段规划、功能排期、里程碑和未来方向。 | 了解项目**要做什么**以及**何时做**。 |
| **[🏗️ 技术架构 (ARCHITECTURE)](./TECHNICAL-ARCHITECTURE.md)** | 系统的整体架构、技术选型、数据流和核心组件设计。 | 了解项目**如何构建**以及**技术决策**。 |
| **[🌐 API接口规范 (API-SPEC)](./API-SPECIFICATION.md)** | 所有后端API的详细定义、请求/响应格式和使用示例。 | **前后端对接**和API功能查询。 |
| **[🐳 Docker开发指南](./DOCKER-SETUP-GUIDE.md)** | 详细的Docker开发环境设置和工作流。 | **使用Docker**进行开发和部署。 |
| **[🛠️ 开发与部署指南](./setup-guide.md)** | 详细的环境搭建步骤和生产部署方法。 | 其他**开发方式**和**部署选项**。 |

---

## 🚀 快速开始：Docker开发 (推荐)

### 1. 环境要求
- **Docker** 和 **Docker Compose**
- **Node.js** (v18+)

### 2. 启动开发环境
```bash
# 启动后端和数据库
docker-compose up -d

# 启动前端开发服务器
npm install
npm run dev
```

### 3. 访问地址
- **前端服务**: `http://localhost:5173`
- **后端服务**: `http://localhost:8080`
- **数据库**: `localhost:3307` (MySQL)

> 💡 **需要更详细的步骤？**
> 请参考完整的 [Docker开发指南](./DOCKER-SETUP-GUIDE.md)。

---

## 📊 进度与总结

- **[🗂️ 历史存档 (Archives)](./archives/)**: 包含所有历史性的开发进度报告和项目总结。

**维护提示**: 请在本文档和相应子文档中保持信息的同步更新，以确保其作为项目蓝图的准确性。
