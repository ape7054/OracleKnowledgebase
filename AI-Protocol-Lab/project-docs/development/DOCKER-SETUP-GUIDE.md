# Docker开发环境指南

## 🚀 快速开始

### 启动Docker开发环境
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

### 🏗️ Docker技术栈
```
前端 (Vite + React)     ←→     后端 (Go + Gin)     ←→     数据库 (MySQL)
http://localhost:5173          http://localhost:8080          Docker容器 (3307:3306)
```

### 🔄 数据流
```
浏览器 → Vite代理 → Go后端容器 → MySQL数据库容器
```

## 🛠️ 环境要求

### 必需软件
- ✅ **Docker** 和 **Docker Compose** - 容器化环境
- ✅ **Node.js** (v18+) - 前端开发

### 检查安装
```bash
docker --version       # 应该显示 Docker version
docker-compose version # 应该显示 docker-compose version
node --version         # 应该显示 v18+
```

## 🚀 开发工作流

### 1. 启动Docker服务
```bash
# 启动数据库和后端容器
docker-compose up -d
```

### 2. 前端开发
```bash
# 安装依赖（如果需要）
npm install

# 启动前端开发服务器
npm run dev
```

### 3. 开发过程
```bash
# 前端开发
- 修改 src/ 下的React代码
- 浏览器自动热重载 (http://localhost:5173)

# 后端开发
- 修改 backend/ 下的Go代码
- 重建并重启Docker容器: docker-compose up -d --build backend

# 数据库
- 通过端口映射访问: localhost:3307
- 用户名: market_pulse_user
- 密码: wBYXZkiLTExiEAHF
```

## 📊 服务访问

| 服务 | 地址 | 说明 |
|------|------|------|
| 前端 | http://localhost:5173 | Vite开发服务器 |
| 后端API | http://localhost:8080/api/* | Go API端点 |
| 数据库 | localhost:3307 | MySQL (映射自容器3306端口) |

## 🔍 Docker容器管理

### 查看容器状态
```bash
docker-compose ps
```

### 查看容器日志
```bash
# 查看所有日志
docker-compose logs

# 查看后端日志
docker-compose logs backend

# 查看数据库日志
docker-compose logs db

# 实时查看日志
docker-compose logs -f backend
```

### 重启服务
```bash
# 重启所有服务
docker-compose restart

# 仅重启后端
docker-compose restart backend
```

## 🔧 故障排除

### 容器启动问题
```bash
# 检查错误
docker-compose logs

# 强制重建
docker-compose up -d --build --force-recreate
```

### 端口冲突
```bash
# 检查端口占用 (Linux)
lsof -i :8080    # 后端端口
lsof -i :5173    # 前端端口
lsof -i :3307    # 数据库端口

# 停止占用进程
kill <PID>
```

### 数据库连接问题
```bash
# 确认数据库容器运行状态
docker-compose ps db

# 检查数据库日志
docker-compose logs db
```

## 💡 Docker开发优势

1. **环境一致性**: 所有开发者使用相同环境，避免"在我机器上能运行"问题
2. **隔离性**: 不会污染本地环境
3. **接近生产**: 开发和生产环境保持一致
4. **简化依赖**: 无需在本地安装MySQL等服务
5. **团队协作**: 确保团队成员使用相同配置

## 🚀 推荐工作流

1. 启动Docker服务: `docker-compose up -d`
2. 启动前端开发: `npm run dev`
3. 在浏览器中访问: http://localhost:5173
4. 编辑代码（前端自动热重载，后端需重建容器）
5. 完成后停止服务: `docker-compose down`
