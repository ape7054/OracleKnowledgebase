# 全栈开发指南

## 🚀 快速开始

### 启动完整开发环境
```bash
# Windows - 启动前端+后端
start-dev.bat
```

### 停止开发环境
```bash
# Windows - 停止所有服务
stop-dev.bat
```

## 📋 开发环境架构

### 🏗️ 完整技术栈
```
前端 (Vite + React)     ←→     后端 (Go + Gin)     ←→     数据库 (MySQL)
http://localhost:5173          http://localhost:8080          localhost:3306
```

### 🔄 数据流
```
浏览器 → Vite代理 → Go后端 → MySQL数据库
```

## 🛠️ 环境要求

### 必需软件
- ✅ **Node.js** (v18+) - 前端开发
- ✅ **Go** (v1.22+) - 后端开发
- ✅ **MySQL** (v8.0+) - 本地开发数据库
- ✅ **Docker Desktop** - 仅用于生产部署，开发时不需要

### 检查安装
```bash
node --version    # 应该显示 v18+
go version        # 应该显示 go1.22+
mysql --version   # 应该显示 MySQL v8.0+
```

## 🚀 开发工作流

### 1. 启动开发环境
```bash
# 运行启动脚本
start-dev.bat

# 会自动：
# 1. 检查环境依赖
# 2. 安装前端依赖
# 3. 启动Go后端服务器
# 4. 启动Vite前端服务器
```

### 2. 开发过程
```bash
# 前端开发
- 修改 src/ 下的React代码
- 浏览器自动热重载 (http://localhost:5173)

# 后端开发
- 修改 backend/ 下的Go代码
- 手动重启后端服务器 (Ctrl+C 然后重新运行)

# 数据库
- 确保本地MySQL服务已启动 (默认端口3306)
- 创建名为 market_pulse_db 的数据库
- 使用以下凭据连接:
  - 用户名: market_pulse_user
  - 密码: wBYXZkiLTExiEAHF
```

### 3. 测试API
```bash
# 健康检查
curl http://localhost:8080/api/health

# 获取交易数据
curl http://localhost:8080/api/trades

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
├── docs/                  # 项目文档
├── docker-compose.yml     # 生产部署配置
├── start-dev.bat         # 启动脚本
├── stop-dev.bat          # 停止脚本
├── .env.development      # 开发环境变量
└── vite.config.js        # Vite配置
```

> 💡 **提示**: 详细的项目架构和代码结构请参考 [技术实现指南](TECHNICAL-GUIDE.md)

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
# 检查端口占用
netstat -ano | find "5173"  # 前端端口
netstat -ano | find "8080"  # 后端端口
netstat -ano | find "3306"  # 数据库端口

# 停止占用进程
taskkill /f /pid <进程ID>
```

### 数据库连接失败
```bash
# 检查MySQL服务状态
sc query mysql

# 启动MySQL服务
net start mysql

# 检查MySQL连接
mysql -u market_pulse_user -p -h localhost
```

### 后端启动失败
```bash
# 检查Go环境
go version

# 检查依赖
cd backend
go mod tidy

# 手动启动后端
cd backend
go run cmd/market-pulse-backend/main.go
```

## 💡 开发技巧

### 1. 热重载
- **前端**: 自动热重载，修改即生效
- **后端**: 需要手动重启，建议使用 `air` 工具实现热重载

### 2. 调试
- **前端**: 浏览器开发者工具
- **后端**: VS Code Go调试器
- **API**: Postman 或 curl

### 3. 数据库管理
- 使用 MySQL Workbench 连接 localhost:3306
- 或使用 phpMyAdmin (可选)

## 🎯 部署测试

### 构建生产版本
```bash
# 前端构建
npm run build

# 后端构建
cd backend
go build -o market-pulse-backend cmd/market-pulse-backend/main.go
```

### 本地预览生产版本
```bash
npm run preview
```

## 🚀 生产部署

### 使用Docker部署（推荐）
```bash
# 构建并启动所有服务
docker-compose up -d

# 这将启动:
# - MySQL数据库容器
# - 后端API服务容器
# - Nginx代理服务器
```

### 停止部署
```bash
# 停止所有服务
docker-compose down

# 停止并删除数据卷（慎用，会删除数据库数据）
docker-compose down -v
```

## 📋 开发环境说明

### 🎯 当前配置
- **前端**: Vite开发服务器 (http://localhost:5173)
- **API代理**: 自动代理到生产服务器 (https://www.ency.asia/api/)
- **WebSocket**: 自动代理到生产服务器 (wss://www.ency.asia/ws/)

### 🔧 API代理配置

#### 使用生产API（默认，推荐）
```bash
# .env.development 文件中：
VITE_API_TARGET=https://www.ency.asia
VITE_WS_TARGET=wss://www.ency.asia
```

#### 使用本地后端（如果需要）
```bash
# .env.development 文件中：
VITE_API_TARGET=http://localhost:8080
VITE_WS_TARGET=ws://localhost:8080

# 然后需要单独启动Go后端：
cd backend
go run cmd/market-pulse-backend/main.go
```

## 🛠️ 开发工作流

### 1. 日常开发
```bash
1. 运行 start-dev.bat
2. 浏览器自动打开 http://localhost:5173
3. 修改 src/ 下的代码
4. 浏览器自动热重载
5. 完成后运行 stop-dev.bat
```

### 2. 测试API
- 所有 `/api/*` 请求自动代理到生产服务器
- 可以直接测试真实数据
- 无需本地数据库和后端

### 3. 部署测试
```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 🔍 故障排除

### 端口被占用
```bash
# 查看5173端口占用
netstat -ano | find "5173"

# 手动停止进程
taskkill /f /pid <进程ID>
```

### API请求失败
1. 检查网络连接
2. 确认生产服务器状态
3. 查看浏览器控制台错误信息

### 热重载不工作
1. 重启开发服务器
2. 清除浏览器缓存
3. 检查文件保存是否成功

## 💡 开发技巧

### 1. 环境变量
- 修改 `.env.development` 文件配置API目标
- 重启开发服务器生效

### 2. 调试
- 使用浏览器开发者工具
- 查看Network面板的API请求
- 使用React Developer Tools

### 3. 性能优化
- 使用 `npm run build` 检查构建大小
- 使用 `npm run preview` 测试生产版本性能
