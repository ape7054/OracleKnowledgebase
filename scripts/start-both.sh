#!/bin/bash

echo "🚀 启动LearningStack双版本对比环境"
echo "=================================="

# 启动Go后端
echo "📡 启动Go后端服务 (端口8080)..."
cd backend
go run cmd/learning-stack-backend/main.go &
BACKEND_PID=$!
echo "后端PID: $BACKEND_PID"

# 等待后端启动
echo "⏳ 等待后端服务启动..."
sleep 5

# 启动React版本
echo "⚛️ 启动React版本 (端口5175)..."
cd ..
npm run dev &
REACT_PID=$!
echo "React PID: $REACT_PID"

# 启动Next.js版本
echo "🔥 启动Next.js版本 (端口3000)..."
cd frontend-nextjs
npm run dev &
NEXTJS_PID=$!
echo "Next.js PID: $NEXTJS_PID"

echo ""
echo "🎉 所有服务已启动！"
echo "=================================="
echo "📊 Go后端API: http://localhost:8080"
echo "⚛️ React版本:  http://localhost:5175"  
echo "🔥 Next.js版本: http://localhost:3000"
echo "=================================="
echo ""

# 性能对比提示
echo "🔍 性能对比测试："
echo "1. 打开两个浏览器标签页"
echo "2. 同时访问两个版本"  
echo "3. 对比首屏加载速度"
echo "4. 测试页面切换体验"
echo "5. 检查SEO和网络面板"
echo ""

# 等待用户停止
echo "按 Enter 键停止所有服务..."
read

# 清理进程
echo "🛑 正在停止所有服务..."
kill $BACKEND_PID 2>/dev/null || true
kill $REACT_PID 2>/dev/null || true  
kill $NEXTJS_PID 2>/dev/null || true

echo "✅ 所有服务已停止" 