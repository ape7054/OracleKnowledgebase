#!/bin/bash

# AI Protocol Lab - 通用项目上下文获取脚本
# 自动收集项目信息，为AI助手提供完整的项目上下文
#
# 使用方法：
# 1. 直接运行：./get-ai-context.sh
# 2. 自定义配置：PROJECT_NAME="我的项目" PROJECT_TYPE="Web应用" ./get-ai-context.sh
# 3. 环境变量配置：export PROJECT_NAME="我的项目" && ./get-ai-context.sh

# ============================================================================
# 配置区域 - 可通过环境变量自定义
# ============================================================================
PROJECT_NAME="${PROJECT_NAME:-$(basename $(pwd))}"
PROJECT_TYPE="${PROJECT_TYPE:-软件开发项目}"
DEPLOY_URL="${DEPLOY_URL:-}"

# 如果是MarketPulse项目，使用特定配置
if [[ "$(basename $(pwd))" == "market-pulse" ]]; then
    PROJECT_NAME="${PROJECT_NAME:-MarketPulse}"
    PROJECT_TYPE="${PROJECT_TYPE:-加密货币市场分析平台}"
    DEPLOY_URL="${DEPLOY_URL:-https://www.ency.asia/dashboard}"
fi

echo "# 🤖 ${PROJECT_NAME} 项目上下文"
echo "_自动生成于: $(date '+%Y-%m-%d %H:%M:%S')_"
echo ""
echo "---"
echo ""

# 项目基本信息
echo "## 📋 项目基本信息"
echo ""
echo "**项目名称**: ${PROJECT_NAME}"
echo "**项目类型**: ${PROJECT_TYPE}"
echo "**工作目录**: $(pwd)"
if [ "$DEPLOY_URL" != "未配置" ]; then
    echo "**部署地址**: ${DEPLOY_URL}"
fi
echo ""

# 技术栈信息 - 自动检测
echo "## 🛠️ 技术栈"
echo ""

# 检测前端技术栈
if [ -f "package.json" ]; then
    echo "### 前端技术栈"

    # 检测构建工具
    if grep -q '"vite"' package.json; then
        echo "- **构建工具**: Vite"
    elif grep -q '"webpack"' package.json; then
        echo "- **构建工具**: Webpack"
    elif grep -q '"create-react-app"' package.json; then
        echo "- **构建工具**: Create React App"
    fi

    # 检测框架
    if grep -q '"react"' package.json; then
        react_version=$(grep -o '"react"[^,]*' package.json | cut -d'"' -f4 | head -1)
        echo "- **框架**: React ${react_version:-'(版本未知)'}"
    elif grep -q '"vue"' package.json; then
        vue_version=$(grep -o '"vue"[^,]*' package.json | cut -d'"' -f4 | head -1)
        echo "- **框架**: Vue ${vue_version:-'(版本未知)'}"
    elif grep -q '"angular"' package.json; then
        echo "- **框架**: Angular"
    fi

    # 检测UI库
    if grep -q '"@mui/material"' package.json; then
        echo "- **UI库**: Material-UI"
    elif grep -q '"antd"' package.json; then
        echo "- **UI库**: Ant Design"
    elif grep -q '"element-ui"' package.json; then
        echo "- **UI库**: Element UI"
    fi

    # 检测其他常用库
    if grep -q '"recharts"' package.json; then
        echo "- **图表**: Recharts"
    elif grep -q '"chart.js"' package.json; then
        echo "- **图表**: Chart.js"
    fi

    if grep -q '"react-router"' package.json; then
        echo "- **路由**: React Router"
    elif grep -q '"vue-router"' package.json; then
        echo "- **路由**: Vue Router"
    fi

    echo ""
fi

# 检测后端技术栈
if [ -f "go.mod" ]; then
    echo "### 后端技术栈"
    echo "- **语言**: Go"
    go_version=$(go version 2>/dev/null | cut -d' ' -f3 2>/dev/null || echo '(版本未知)')
    echo "- **版本**: ${go_version}"
    echo ""
elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    echo "### 后端技术栈"
    echo "- **语言**: Python"
    python_version=$(python3 --version 2>/dev/null | cut -d' ' -f2 2>/dev/null || echo '(版本未知)')
    echo "- **版本**: ${python_version}"
    echo ""
elif [ -f "Cargo.toml" ]; then
    echo "### 后端技术栈"
    echo "- **语言**: Rust"
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

# 项目结构 - 自动检测
echo "## 📁 项目结构"
echo ""
echo "\`\`\`"
echo "${PROJECT_NAME}/"

# 前端相关目录
if [ -d "src" ]; then
    echo "├── src/                    # 源代码"
    if [ -d "src/pages" ]; then
        echo "│   ├── pages/             # 页面组件"
    fi
    if [ -d "src/components" ]; then
        echo "│   ├── components/        # 通用组件"
    fi
    if [ -d "src/context" ]; then
        echo "│   └── context/           # 上下文管理"
    fi
fi

if [ -d "public" ]; then
    echo "├── public/                 # 静态资源"
fi

# 后端相关目录
if [ -d "backend" ]; then
    echo "├── backend/                # 后端代码"
fi

if [ -d "api" ]; then
    echo "├── api/                    # API接口"
fi

# 文档目录
if [ -d "docs" ]; then
    echo "├── docs/                   # 项目文档"
fi

if [ -d "AI-Protocol-Lab" ]; then
    echo "├── AI-Protocol-Lab/        # AI协作工具箱"
fi

# 配置文件
if [ -f "package.json" ]; then
    echo "├── package.json            # 依赖管理"
fi

if [ -f "go.mod" ]; then
    echo "├── go.mod                  # Go模块"
fi

if [ -f "Cargo.toml" ]; then
    echo "├── Cargo.toml              # Rust配置"
fi

if [ -f "requirements.txt" ]; then
    echo "├── requirements.txt        # Python依赖"
fi

# 构建配置
if [ -f "vite.config.js" ]; then
    echo "├── vite.config.js          # Vite配置"
elif [ -f "webpack.config.js" ]; then
    echo "├── webpack.config.js       # Webpack配置"
elif [ -f "next.config.js" ]; then
    echo "├── next.config.js          # Next.js配置"
fi

if [ -f "Dockerfile" ]; then
    echo "├── Dockerfile              # Docker配置"
fi

if [ -f "docker-compose.yml" ]; then
    echo "└── docker-compose.yml      # Docker Compose"
fi

echo "\`\`\`"
echo ""

# 重要文件状态 - 自动检测
echo "## 📄 重要文件状态"
echo ""

# 检测主要源文件
main_files_found=false

if [ -f "src/App.jsx" ]; then
    lines=$(wc -l < "src/App.jsx")
    echo "- **App.jsx**: $lines 行 (主应用组件)"
    main_files_found=true
elif [ -f "src/App.js" ]; then
    lines=$(wc -l < "src/App.js")
    echo "- **App.js**: $lines 行 (主应用组件)"
    main_files_found=true
fi

if [ -f "src/main.jsx" ]; then
    lines=$(wc -l < "src/main.jsx")
    echo "- **main.jsx**: $lines 行 (应用入口)"
    main_files_found=true
elif [ -f "src/index.js" ]; then
    lines=$(wc -l < "src/index.js")
    echo "- **index.js**: $lines 行 (应用入口)"
    main_files_found=true
fi

# 检测主要页面文件
if [ -d "src/pages" ]; then
    page_count=$(find src/pages -name "*.jsx" -o -name "*.js" -o -name "*.vue" | wc -l)
    if [ $page_count -gt 0 ]; then
        echo "- **页面组件**: $page_count 个文件"
        main_files_found=true
    fi
fi

# 检测配置文件
if [ -f "package.json" ]; then
    echo "- **package.json**: 存在 (依赖配置)"
fi

if [ -f "go.mod" ]; then
    echo "- **go.mod**: 存在 (Go模块配置)"
fi

# 检测AI协作工具
if [ -f "AI-Protocol-Lab/docs/README.md" ]; then
    echo "- **AI-Protocol-Lab**: 存在 (AI协作工具箱)"
fi

if [ "$main_files_found" = false ]; then
    echo "- 未检测到主要源文件"
fi

echo ""

# 最新状态 - 基于Git历史
echo "## 🚀 最新项目状态"
echo ""

if [ -d ".git" ]; then
    echo "### 最近的提交记录"
    git log --oneline -5 2>/dev/null | while read line; do
        echo "- $line"
    done
    echo ""

    # 检测最近修改的文件
    echo "### 最近修改的文件"
    git diff --name-only HEAD~3..HEAD 2>/dev/null | head -5 | while read file; do
        if [ -f "$file" ]; then
            echo "- $file"
        fi
    done 2>/dev/null
    echo ""
else
    echo "### 项目状态"
    echo "- Git仓库未初始化或不可访问"
    echo "- 建议初始化Git进行版本控制"
    echo ""
fi

# 快速命令 - 基于项目类型自动生成
echo "## ⚡ 快速命令"
echo ""
echo "\`\`\`bash"

# 前端项目命令
if [ -f "package.json" ]; then
    if grep -q '"dev"' package.json; then
        echo "# 开发模式"
        echo "npm run dev"
        echo ""
    fi

    if grep -q '"build"' package.json; then
        echo "# 构建生产版本"
        echo "npm run build"
        echo ""
    fi

    if grep -q '"test"' package.json; then
        echo "# 运行测试"
        echo "npm test"
        echo ""
    fi
fi

# Go项目命令
if [ -f "go.mod" ]; then
    echo "# 运行Go程序"
    echo "go run ."
    echo ""
    echo "# 构建Go程序"
    echo "go build"
    echo ""
    echo "# 运行测试"
    echo "go test ./..."
    echo ""
fi

# Python项目命令
if [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    echo "# 安装依赖"
    echo "pip install -r requirements.txt"
    echo ""
    echo "# 运行Python程序"
    echo "python main.py"
    echo ""
fi

# Docker命令
if [ -f "Dockerfile" ]; then
    echo "# 构建Docker镜像"
    echo "docker build -t ${PROJECT_NAME,,} ."
    echo ""
fi

if [ -f "docker-compose.yml" ]; then
    echo "# 启动Docker Compose"
    echo "docker-compose up -d"
    echo ""
fi

# AI协作工具命令
if [ -d "AI-Protocol-Lab" ]; then
    echo "# 查看AI协作指南"
    echo "cat AI-Protocol-Lab/docs/README.md"
fi

echo "\`\`\`"
echo ""

# AI助手建议 - 基于项目类型自动推荐
echo "## 🤖 AI助手建议"
echo ""
echo "基于当前项目技术栈，建议AI助手扮演以下角色之一："
echo ""

# 基于技术栈推荐角色
if [ -f "package.json" ]; then
    if grep -q '"react"' package.json; then
        echo "1. **React开发专家** - 组件开发和状态管理"
        echo "2. **前端性能专家** - 代码分割和优化"
    elif grep -q '"vue"' package.json; then
        echo "1. **Vue开发专家** - 组件开发和Vuex管理"
        echo "2. **前端架构师** - 项目结构优化"
    else
        echo "1. **前端开发专家** - UI/UX开发"
        echo "2. **JavaScript专家** - 代码质量提升"
    fi

    if grep -q '"@mui/material"' package.json || grep -q '"antd"' package.json; then
        echo "3. **UI/UX设计专家** - 界面设计优化"
    fi

    if grep -q '"recharts"' package.json || grep -q '"chart.js"' package.json; then
        echo "4. **数据可视化专家** - 图表和分析功能"
    fi
fi

if [ -f "go.mod" ]; then
    echo "1. **Go开发专家** - 后端服务开发"
    echo "2. **API设计专家** - RESTful接口设计"
    echo "3. **性能优化专家** - 并发和性能调优"
fi

if [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
    echo "1. **Python开发专家** - 后端逻辑开发"
    echo "2. **数据分析专家** - 数据处理和分析"
    echo "3. **机器学习专家** - AI模型开发"
fi

if [ -f "Dockerfile" ]; then
    echo "5. **DevOps专家** - 容器化和部署"
fi

echo ""

echo "---"
echo ""
echo "_此上下文由 AI-Protocol-Lab 自动生成_"
