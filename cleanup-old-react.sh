#!/bin/bash

# 清理原React项目脚本
# 保留重要文件，删除过时的React代码

echo "🧹 开始清理原React项目..."

# 备份重要文件到 backup 目录
echo "📦 创建备份..."
mkdir -p backup
cp README.md backup/ 2>/dev/null || true
cp docker-compose.yml backup/ 2>/dev/null || true
cp -r backend backup/ 2>/dev/null || true

# 删除React相关文件和目录
echo "🗑️  删除React前端文件..."
rm -rf src/
rm -rf public/
rm -rf node_modules/
rm -f package.json
rm -f package-lock.json
rm -f vite.config.js
rm -f eslint.config.js
rm -f index.html
rm -f .gitignore

# 删除构建文件
rm -rf dist/
rm -rf .vite/

# 保留的文件
echo "📁 保留的重要文件:"
echo "  ✅ backend/ (Go后端)"
echo "  ✅ learning-stack-nextjs/ (新Next.js项目)"
echo "  ✅ docker-compose.yml"
echo "  ✅ README.md"
echo "  ✅ backup/ (备份文件)"

# 更新README指向新项目
echo "📝 更新README..."
cat > README.md << 'EOF'
# LearningStack - Next.js Version

现代化的加密货币学习交易平台，采用Next.js + Go架构。

## 🚀 快速启动

### 前端 (Next.js)
```bash
cd learning-stack-nextjs
npm install
npm run dev
```
访问: http://localhost:3000

### 后端 (Go)
```bash
cd backend
go run cmd/learning-stack-backend/main.go
```
访问: http://localhost:8080

## 🏗️ 项目结构

```
learning-stack/
├── learning-stack-nextjs/    # Next.js前端项目
├── backend/                  # Go后端项目
├── docker-compose.yml       # Docker配置
└── README.md                # 项目说明
```

## 🎯 主要功能

- 🔐 JWT用户认证
- 📊 加密货币数据展示
- 💱 模拟交易功能
- 📰 实时新闻资讯
- 📱 响应式设计
- 🌙 暗色主题

## 🛠️ 技术栈

### 前端
- Next.js 14 (App Router)
- TypeScript
- Material-UI
- Emotion (CSS-in-JS)

### 后端
- Go + Gin
- GORM + MySQL
- JWT认证
- WebSocket实时通信

---

**注**: 项目已从React迁移到Next.js，获得更好的性能和SEO支持。
EOF

echo "✅ 清理完成！"
echo ""
echo "🎉 现在你有一个干净的项目结构："
echo "   📂 learning-stack-nextjs/  (主项目)"
echo "   📂 backend/               (Go后端)"
echo "   📂 backup/                (备份文件)"
echo ""
echo "🚀 启动Next.js项目: cd learning-stack-nextjs && npm run dev" 