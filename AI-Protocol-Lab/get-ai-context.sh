#!/bin/bash

# Universal AI Context Generator
# 用于快速获取项目上下文信息，供AI助手使用

echo "🤖 Universal AI Context Generator"
echo "================================"
echo ""

# 检查是否在项目根目录
if [ ! -d "AI-Protocol-Lab" ]; then
    echo "❌ 错误: 请在包含AI-Protocol-Lab目录的项目根目录运行此脚本"
    echo "   当前目录: $(pwd)"
    echo "   提示: 确保AI-Protocol-Lab文件夹存在于当前目录"
    exit 1
fi

# 尝试检测项目类型
PROJECT_TYPE="Unknown"
if [ -f "package.json" ]; then
    PROJECT_TYPE="Node.js/JavaScript"
elif [ -f "go.mod" ]; then
    PROJECT_TYPE="Go"
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    PROJECT_TYPE="Python"
elif [ -f "Cargo.toml" ]; then
    PROJECT_TYPE="Rust"
elif [ -f "pom.xml" ]; then
    PROJECT_TYPE="Java/Maven"
elif [ -f "*.csproj" ]; then
    PROJECT_TYPE=".NET/C#"
fi

echo "📍 项目目录: $(pwd)"
echo "📅 生成时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 创建临时文件
CONTEXT_FILE="/tmp/marketpulse-ai-context.md"

cat > "$CONTEXT_FILE" << EOF
# Universal AI Assistant Context

## 🚀 快速启动信息

**项目名称**: $(basename "$(pwd)")
**项目类型**: $PROJECT_TYPE
**项目路径**: $(pwd)
**生成时间**:
EOF

echo "$(date '+%Y-%m-%d %H:%M:%S')" >> "$CONTEXT_FILE"

cat >> "$CONTEXT_FILE" << 'EOF'

## 📊 当前项目状态

EOF

# 添加最新的项目状态
if [ -f "docs/development/DEVELOPMENT-ROADMAP.md" ]; then
    echo "### 开发进度概览" >> "$CONTEXT_FILE"
    echo '```' >> "$CONTEXT_FILE"
    grep -A 10 "已完成模块" docs/development/DEVELOPMENT-ROADMAP.md | head -15 >> "$CONTEXT_FILE"
    echo '```' >> "$CONTEXT_FILE"
    echo "" >> "$CONTEXT_FILE"
fi

# 添加最近的Git提交
echo "### 最近的开发活动" >> "$CONTEXT_FILE"
echo '```' >> "$CONTEXT_FILE"
echo "最近5次提交:" >> "$CONTEXT_FILE"
git log --oneline -5 >> "$CONTEXT_FILE" 2>/dev/null || echo "无法获取Git历史" >> "$CONTEXT_FILE"
echo '```' >> "$CONTEXT_FILE"
echo "" >> "$CONTEXT_FILE"

# 添加项目结构
echo "### 项目结构" >> "$CONTEXT_FILE"
echo '```' >> "$CONTEXT_FILE"
echo "主要目录:" >> "$CONTEXT_FILE"
ls -la | grep "^d" | awk '{print $9}' | grep -v "^\.$\|^\.\.$" | head -10 >> "$CONTEXT_FILE"
echo "" >> "$CONTEXT_FILE"
echo "重要文件:" >> "$CONTEXT_FILE"
find . -maxdepth 2 -name "*.json" -o -name "*.md" -o -name "*.go" -o -name "*.jsx" | grep -E "(package\.json|README|main\.go|Dashboard\.jsx)" | head -10 >> "$CONTEXT_FILE"
echo '```' >> "$CONTEXT_FILE"
echo "" >> "$CONTEXT_FILE"

# 添加服务状态
echo "### 服务状态检查" >> "$CONTEXT_FILE"
echo '```' >> "$CONTEXT_FILE"
echo "端口占用情况:" >> "$CONTEXT_FILE"
netstat -tlnp 2>/dev/null | grep -E ":5173|:8080|:3307" || echo "无法检查端口状态" >> "$CONTEXT_FILE"
echo '```' >> "$CONTEXT_FILE"
echo "" >> "$CONTEXT_FILE"

# 添加AI使用指南链接
cat >> "$CONTEXT_FILE" << 'EOF'
## 🤖 AI助手使用指南

### 完整上下文文档
- **详细指南**: `docs/conversations/AI-CONTEXT-GUIDE.md`
- **开发路线图**: `docs/development/DEVELOPMENT-ROADMAP.md`
- **最新对话**: `docs/conversations/development/`

### 快速启动命令
```bash
# 启动开发环境
cd /www/wwwroot/market-pulse
docker-compose up -d
npm run dev

# 检查服务状态
curl http://localhost:8080/api/health
curl http://localhost:5173
```

### 常见任务
1. **修复UI问题**: 检查浏览器控制台 (F12)
2. **API问题**: 检查后端日志和数据库连接
3. **添加新功能**: 参考现有代码结构和API设计
4. **更新进度**: 使用 "update progress" 命令

## 📝 重要提醒

1. **项目当前完成度**: 82%
2. **下一步优先级**: 用户认证系统开发
3. **技术栈**: React + Material UI + Go + Gin + MySQL
4. **API集成**: CoinGecko API已完全集成

---

**使用方法**: 将此文档内容复制给AI助手，然后说明您的具体需求。
EOF

# 显示生成的上下文
echo "✅ AI上下文信息已生成"
echo ""
echo "📄 生成的文件: $CONTEXT_FILE"
echo ""
echo "🔍 内容预览:"
echo "----------------------------------------"
head -30 "$CONTEXT_FILE"
echo "..."
echo "----------------------------------------"
echo ""

# 提供使用选项
echo "📋 使用选项:"
echo ""
echo "1️⃣  查看完整内容:"
echo "   cat $CONTEXT_FILE"
echo ""
echo "2️⃣  复制到剪贴板 (如果支持):"
if command -v xclip &> /dev/null; then
    echo "   cat $CONTEXT_FILE | xclip -selection clipboard"
elif command -v pbcopy &> /dev/null; then
    echo "   cat $CONTEXT_FILE | pbcopy"
else
    echo "   手动复制文件内容"
fi
echo ""
echo "3️⃣  获取详细AI指南:"
echo "   cat docs/conversations/AI-CONTEXT-GUIDE.md"
echo ""
echo "4️⃣  获取完整项目Prompt:"
echo "   cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md"
echo ""

# 提供快速复制选项
read -p "🤖 是否现在显示完整内容供复制? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📋 完整AI上下文内容 (复制以下所有内容给AI助手):"
    echo "========================================================"
    cat "$CONTEXT_FILE"
    echo "========================================================"
    echo ""
    echo "✅ 请复制上述内容给AI助手，然后说明您的具体需求。"
fi

echo ""
echo "🎯 提示: 如果需要更详细的项目背景，请使用:"
echo "   cat docs/conversations/AI-CONTEXT-GUIDE.md"
echo ""
echo "🚀 准备就绪! 您现在可以开始与AI助手对话了。"
