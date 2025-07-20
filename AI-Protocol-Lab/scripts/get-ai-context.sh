#!/bin/bash

# AI Protocol Lab - 项目上下文获取脚本
# 自动收集项目信息，为AI助手提供完整的项目上下文

echo "# 🤖 MarketPulse 项目上下文"
echo "_自动生成于: $(date '+%Y-%m-%d %H:%M:%S')_"
echo ""
echo "---"
echo ""

# 项目基本信息
echo "## 📋 项目基本信息"
echo ""
echo "**项目名称**: MarketPulse"
echo "**项目类型**: 加密货币市场分析平台"
echo "**工作目录**: $(pwd)"
echo "**部署地址**: https://www.ency.asia/dashboard"
echo ""

# 技术栈信息
echo "## 🛠️ 技术栈"
echo ""
if [ -f "package.json" ]; then
    echo "### 前端技术栈"
    echo "- **构建工具**: $(grep -o '"vite"[^,]*' package.json | cut -d'"' -f4 | head -1 || echo 'Vite')"
    echo "- **框架**: React 18"
    echo "- **UI库**: Material-UI 5"
    echo "- **图表**: Recharts"
    echo "- **路由**: React Router"
    echo ""
fi

# Git信息
echo "## 📝 最新提交信息"
echo ""
if [ -d ".git" ]; then
    echo "**分支**: $(git branch --show-current 2>/dev/null || echo 'unknown')"
    echo "**最新提交**: $(git log -1 --pretty=format:'%h - %s (%cr)' 2>/dev/null || echo 'No git history')"
    echo ""
else
    echo "未找到Git仓库"
    echo ""
fi

# 项目结构
echo "## 📁 项目结构"
echo ""
echo "\`\`\`"
echo "market-pulse/"
if [ -d "src" ]; then
    echo "├── src/                    # React前端代码"
    echo "│   ├── pages/             # 页面组件"
    echo "│   ├── components/        # 通用组件"
    echo "│   └── context/           # 上下文管理"
fi
if [ -d "docs" ]; then
    echo "├── docs/                  # 项目文档"
fi
if [ -d "AI-Protocol-Lab" ]; then
    echo "├── AI-Protocol-Lab/       # AI协作工具箱"
fi
if [ -f "package.json" ]; then
    echo "├── package.json           # 依赖管理"
fi
if [ -f "vite.config.js" ]; then
    echo "├── vite.config.js         # 构建配置"
fi
echo "\`\`\`"
echo ""

# 重要文件状态
echo "## 📄 重要文件状态"
echo ""
if [ -f "src/pages/Dashboard.jsx" ]; then
    lines=$(wc -l < "src/pages/Dashboard.jsx")
    echo "- **Dashboard.jsx**: $lines 行 (主要工作文件)"
fi
if [ -f "package.json" ]; then
    echo "- **package.json**: 存在"
fi
if [ -f "AI-Protocol-Lab/docs/AI-CONTEXT-GUIDE.md" ]; then
    echo "- **AI-CONTEXT-GUIDE.md**: 存在 (快速上下文指南)"
fi
echo ""

# 最新状态
echo "## 🚀 最新项目状态"
echo ""
echo "### Dashboard专业级升级 (2025-07-20)"
echo "- ✅ 完全重新设计Dashboard界面"
echo "- ✅ 新增高级组件 (PremiumStatCard, PremiumSparkLine等)"
echo "- ✅ 修复图标颜色问题"
echo "- ✅ 实现深空背景和动画效果"
echo "- ✅ 完善响应式设计"
echo ""

# 快速命令
echo "## ⚡ 快速命令"
echo ""
echo "\`\`\`bash"
echo "# 开发模式"
echo "npm run dev"
echo ""
echo "# 构建生产版本"
echo "npm run build"
echo ""
echo "# 重载nginx"
echo "systemctl reload nginx"
echo ""
echo "# 查看AI协作指南"
echo "cat AI-Protocol-Lab/docs/AI-CONTEXT-GUIDE.md"
echo "\`\`\`"
echo ""

# AI助手建议
echo "## 🤖 AI助手建议"
echo ""
echo "基于当前项目状态，建议AI助手扮演以下角色之一："
echo ""
echo "1. **前端开发专家** - 继续UI/UX优化"
echo "2. **性能优化专家** - 代码分割和性能提升"
echo "3. **移动端专家** - 移动体验优化"
echo "4. **数据可视化专家** - 图表和分析功能"
echo ""

echo "---"
echo ""
echo "_此上下文由 AI-Protocol-Lab 自动生成_"
