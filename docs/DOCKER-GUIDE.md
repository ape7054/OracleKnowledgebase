# Docker开发指南

本文档简要介绍如何使用Docker进行MarketPulse项目的开发。完整文档请参考[Docker开发环境指南](/AI-Protocol-Lab/project-docs/development/DOCKER-SETUP-GUIDE.md)。

## 快速启动开发环境

```bash
# 启动后端和数据库容器
docker-compose up -d

# 安装依赖并启动前端
npm install
npm run dev
```

## 服务访问

- 前端: http://localhost:5173
- 后端API: http://localhost:8080
- 数据库: MySQL on localhost:3307 (用户: market_pulse_user, 密码: wBYXZkiLTExiEAHF)

## 开发过程

1. **前端开发**
   - 修改`src/`目录下的React代码
   - 浏览器自动热重载

2. **后端开发**
   - 修改`backend/`目录下的Go代码
   - 重建容器: `docker-compose up -d --build backend`

3. **停止环境**
   - `docker-compose down`

## 常见问题

- **端口冲突**
  ```bash
  lsof -i :8080    # 检查后端端口
  kill <PID>       # 停止占用进程
  ```

- **容器错误**
  ```bash
  docker-compose logs        # 查看日志
  docker-compose ps          # 查看容器状态
  ```
