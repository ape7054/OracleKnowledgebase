# 全栈开发指南

## 🚀 快速开始

### 启动Docker开发环境 (推荐)
```bash
# 启动后端和数据库服务
docker-compose up -d

# 启动前端开发服务器
npm install
npm run dev
```

### 停止开发环境
```bash
# 停止所有Docker容器
docker-compose down

# 在前端开发服务器终端按 Ctrl+C
```

## 📋 开发环境架构

### 🏗️ 完整技术栈
```
前端 (Vite + React)     ←→     后端 (Go + Gin)     ←→     数据库 (MySQL)
http://localhost:5173          http://localhost:8080          Docker容器 (3307:3306)
```

### 🔄 数据流
```
浏览器 → Vite代理 → Go后端 → MySQL数据库
```

## 🛠️ 环境要求

### 必需软件
- ✅ **Docker** 和 **Docker Compose** - 容器化环境
- ✅ **Node.js** (v18+) - 前端开发

### 可选软件
- **Go** (v1.22+) - 如果需要本地运行后端而不是Docker

### 检查安装
```bash
docker --version    # 应该显示 Docker version
node --version      # 应该显示 v18+
```

## 🚀 开发工作流

### 1. 启动开发环境
```bash
# 启动后端和数据库容器
docker-compose up -d

# 启动前端开发服务器
npm install
npm run dev
```

### 2. 开发过程
```bash
# 前端开发
- 修改 src/ 下的React代码
- 浏览器自动热重载 (http://localhost:5173)

# 后端开发
- 修改 backend/ 下的Go代码
- 重建并重启容器: docker-compose up -d --build backend

# 数据库
- 使用 localhost:3307 连接MySQL
- 用户名: market_pulse_user
- 密码: wBYXZkiLTExiEAHF
```

### 3. 测试API
```bash
# 健康检查
curl http://localhost:8080/api/health

# 获取交易数据
curl http://localhost:8080/api/market/data?limit=20

# 前端会自动代理API请求到后端
```

## 📁 项目结构

```
market-pulse/
├── src/                    # 前端源代码 (React + Vite)
│   ├── components/         # React组件
│   ├── pages/             # 页面组件
│   ├── hooks/             # 自定义Hooks
│   └── utils/             # 工具函数
├── backend/               # 后端源代码 (Go + Gin)
├── dist/                  # 构建输出（自动生成）
├── AI-Protocol-Lab/       # 项目文档和AI协作工具
├── docker-compose.yml     # Docker配置
└── vite.config.js        # Vite配置
```

> 💡 **提示**: 详细的Docker开发环境指南请参考 [Docker开发指南](DOCKER-SETUP-GUIDE.md)

## 🔧 配置说明

### API代理配置
```javascript
// vite.config.js
proxy: {
  '/api': 'http://localhost:8080',  // 代理到本地后端
  '/ws': 'ws://localhost:8080'      // WebSocket代理
}
```

### 环境变量
```bash
# .env.development
VITE_API_TARGET=http://localhost:8080    # 本地后端
VITE_WS_TARGET=ws://localhost:8080       # 本地WebSocket
```

## 🔍 故障排除

### 端口冲突
```bash
# 检查端口占用 (Linux)
lsof -i :5173  # 前端端口
lsof -i :8080  # 后端端口
lsof -i :3307  # 数据库端口

# 停止占用进程
kill <进程ID>
```

### Docker问题
```bash
# 检查Docker状态
docker ps

# 查看容器日志
docker-compose logs backend
docker-compose logs db

# 重启容器
docker-compose restart

# 强制重建
docker-compose up -d --build --force-recreate
```

### 后端启动失败
```bash
# 查看后端容器日志
docker-compose logs backend

# 检查数据库连接
docker-compose logs db
```

## 💡 开发技巧

### 1. 热重载
- **前端**: 自动热重载，修改即生效
- **后端**: 需要重建容器或使用本地Go开发

### 2. 调试
- **前端**: 浏览器开发者工具
- **后端**: 查看Docker日志
- **API**: Postman 或 curl

### 3. 数据库管理
- 使用 MySQL Workbench 连接 localhost:3307
- 或使用 phpMyAdmin (可选)

## 🎯 部署测试

### 构建生产版本
```bash
# 前端构建
npm run build

# 完整部署（前端+后端+数据库）
docker-compose -f docker-compose.yml up -d
```

### 本地预览生产版本
```bash
npm run preview
```

## 📋 环境配置选项

### 🎯 Docker开发 (推荐)
- **优势**: 环境一致性、隔离性、接近生产
- **适用**: 团队开发、全栈开发
- **启动**: `docker-compose up -d`

### 🎯 混合开发
- **前端**: 本地运行 `npm run dev`
- **后端+数据库**: Docker容器
- **适用**: 前端重点开发

### 🎯 完全本地开发
- **适用**: Go后端开发
- **说明**: 需要本地安装Go和MySQL
- **后端启动**: `cd backend && go run cmd/market-pulse-backend/main.go`
