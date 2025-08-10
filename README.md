# MarketPulse - 快速启动指南

## 🚀 快速启动

### 📋 环境要求
- ✅ **Node.js** (v18+)
- ✅ **Docker & Docker Compose** (必需)
- ✅ **Git**

### 🐳 启动步骤

```bash
# 1. 克隆项目
git clone https://github.com/ape7054/trading-dashboard.git
cd market-pulse

# 2. 构建前端资源
npm install
npm run build

# 3. Windows环境特殊步骤：交叉编译后端
cd backend
$env:GOOS = "linux"
$env:GOARCH = "amd64" 
$env:CGO_ENABLED = "0"
go build -o market-pulse-backend ./cmd/market-pulse-backend
cd ..

# 4. 启动完整Docker环境
docker-compose up -d

# 5. 验证服务状态
docker-compose ps
```

### 🎉 访问应用

| 服务 | 访问地址 | 说明 |
|------|----------|------|
| 🚀 **前端应用** | `http://localhost:9088` | 完整应用界面 |
| 🔧 **前端开发** | `http://localhost:5175` | 开发模式 (需要 `npm run dev`) |
| 🔧 **后端API** | `http://localhost:8080/api` | RESTful API服务 |
| 🗄️ **数据库管理** | `http://localhost:8081` | phpMyAdmin界面 |

### ✅ 验证启动成功

```bash
# 检查后端健康状态
curl http://localhost:8080/api/health
# 期望返回: {"status":"UP"}

# 测试市场数据API  
curl "http://localhost:8080/api/market/data?limit=2"
# 期望返回: 真实的加密货币市场数据
```

## 🆘 故障排除

### ❌ 问题1：Windows交叉编译问题
**症状**: Docker后端容器无法启动，提示 "not found" 或 "permission denied"

**解决方案**:
```bash
cd backend
del market-pulse-backend
$env:GOOS = "linux"
$env:GOARCH = "amd64"
$env:CGO_ENABLED = "0"
go build -o market-pulse-backend ./cmd/market-pulse-backend
docker build -t market-pulse-backend . --no-cache
cd ..
docker-compose restart backend
```

### ❌ 问题2：端口冲突
**症状**: 启动失败，提示端口被占用

**解决方案**:
```bash
# 检查端口占用 (Windows)
netstat -ano | findstr :8080
netstat -ano | findstr :9088
netstat -ano | findstr :3307

# 终止占用进程
taskkill /PID <进程ID> /F

# 或者重启Docker服务
docker-compose down
docker-compose up -d
```

### ❌ 问题3：API连接失败 (Windows网络限制)
**症状**: 前端显示 "API连接失败" 或模拟数据

**原因**: Windows环境网络限制，必须使用Docker才能访问外部API

**解决方案**:
```bash
# 确保使用Docker启动后端
docker-compose restart backend
docker logs market-pulse-backend --tail 20

# 检查API可访问性
curl http://localhost:8080/api/health
```

### ❌ 问题4：数据库连接失败
**症状**: 后端日志显示数据库连接失败

**解决方案**:
```bash
# 重启数据库和后端服务
docker-compose restart db
sleep 10
docker-compose restart backend
```

### ❌ 问题5：前端开发模式启动
**症状**: 需要前端热重载开发

**解决方案**:
```bash
# 启动前端开发服务器 (端口5175)
npm run dev

# 同时保持Docker后端运行
docker-compose up backend db -d
```

## 🔧 常用管理命令

```bash
# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f backend
docker-compose logs -f db

# 重启特定服务
docker-compose restart backend

# 停止所有服务
docker-compose down

# 完全清理并重启
docker-compose down -v
docker-compose up -d
```

## 💡 重要提示

- **Windows用户必须使用Docker**: 直接运行Go程序无法访问外部API
- **数据库连接**: 后端启动可能比数据库慢，如连接失败请重启后端服务
- **端口映射**: 确保8080、9088、3307、8081端口未被占用
- **静态资源**: 生产环境使用9088端口，开发模式使用5175端口
