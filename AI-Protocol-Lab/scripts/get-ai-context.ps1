# AI Protocol Lab - 通用项目上下文获取脚本 (PowerShell版)
# 自动收集项目信息，为AI助手提供完整的项目上下文
#
# 使用方法：
# 1. 设置执行策略 (如果需要): Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
# 2. 直接运行：.\get-ai-context.ps1
# 3. 自定义配置：.\get-ai-context.ps1 -ProjectName "我的项目" -ProjectType "Web应用"

param(
    [string]$ProjectName = ($env:PROJECT_NAME -split ' ')[0],
    [string]$ProjectType = ($env:PROJECT_TYPE -split ' ')[0],
    [string]$DeployUrl = ($env:DEPLOY_URL -split ' ')[0]
)

# ============================================================================
# 配置区域
# ============================================================================
if ([string]::IsNullOrEmpty($ProjectName)) {
    $ProjectName = (Get-Location).Path | Split-Path -Leaf
}
if ([string]::IsNullOrEmpty($ProjectType)) {
    $ProjectType = "软件开发项目"
}

# 如果是MarketPulse项目，使用特定配置
if (((Get-Location).Path | Split-Path -Leaf) -eq "market-pulse") {
    if ([string]::IsNullOrEmpty($env:PROJECT_NAME)) { $ProjectName = "MarketPulse" }
    if ([string]::IsNullOrEmpty($env:PROJECT_TYPE)) { $ProjectType = "加密货币市场分析平台" }
    if ([string]::IsNullOrEmpty($env:DEPLOY_URL)) { $DeployUrl = "https://www.ency.asia/dashboard" }
}

Write-Output "# 🤖 $ProjectName 项目上下文"
Write-Output "_自动生成于: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')_"
Write-Output ""
Write-Output "---"
Write-Output ""

# 项目基本信息
Write-Output "## 📋 项目基本信息"
Write-Output ""
Write-Output "**项目名称**: $ProjectName"
Write-Output "**项目类型**: $ProjectType"
Write-Output "**工作目录**: $((Get-Location).Path)"
if (-not [string]::IsNullOrEmpty($DeployUrl)) {
    Write-Output "**部署地址**: $DeployUrl"
}
Write-Output ""

# 技术栈信息 - 自动检测
Write-Output "## 🛠️ 技术栈"
Write-Output ""

# 检测前端技术栈
if (Test-Path "package.json") {
    Write-Output "### 前端技术栈"
    $packageJsonContent = Get-Content "package.json" -Raw | ConvertFrom-Json
    $dependencies = $packageJsonContent.dependencies.PSObject.Properties.Name + $packageJsonContent.devDependencies.PSObject.Properties.Name

    # 检测构建工具
    if ($dependencies -contains "vite") { Write-Output "- **构建工具**: Vite" }
    elseif ($dependencies -contains "webpack") { Write-Output "- **构建工具**: Webpack" }
    elseif ($dependencies -contains "create-react-app") { Write-Output "- **构建工具**: Create React App" }

    # 检测框架
    if ($dependencies -contains "react") {
        $reactVersion = ($packageJsonContent.dependencies.react, $packageJsonContent.devDependencies.react) | Where-Object { $_ } | Select-Object -First 1
        Write-Output "- **框架**: React $reactVersion"
    }
    elseif ($dependencies -contains "vue") {
        $vueVersion = ($packageJsonContent.dependencies.vue, $packageJsonContent.devDependencies.vue) | Where-Object { $_ } | Select-Object -First 1
        Write-Output "- **框架**: Vue $vueVersion"
    }
    elseif ($dependencies -contains "angular") { Write-Output "- **框架**: Angular" }

    # 检测UI库
    if ($dependencies -contains "@mui/material") { Write-Output "- **UI库**: Material-UI" }
    elseif ($dependencies -contains "antd") { Write-Output "- **UI库**: Ant Design" }
    elseif ($dependencies -contains "element-ui") { Write-Output "- **UI库**: Element UI" }

    # 检测其他常用库
    if ($dependencies -contains "recharts") { Write-Output "- **图表**: Recharts" }
    elseif ($dependencies -contains "chart.js") { Write-Output "- **图表**: Chart.js" }
    if ($dependencies -contains "react-router") { Write-Output "- **路由**: React Router" }
    elseif ($dependencies -contains "vue-router") { Write-Output "- **路由**: Vue Router" }
    Write-Output ""
}

# 检测后端技术栈
if (Test-Path "go.mod") {
    Write-Output "### 后端技术栈"
    Write-Output "- **语言**: Go"
    $goVersion = (go version 2>$null) -replace 'go version go', '' -replace ' .*', ''
    if ($goVersion) { Write-Output "- **版本**: $goVersion" }
    Write-Output ""
}
elseif (Test-Path "requirements.txt" -or (Test-Path "pyproject.toml")) {
    Write-Output "### 后端技术栈"
    Write-Output "- **语言**: Python"
    $pythonVersion = (python3 --version 2>$null) -replace 'Python ', ''
    if (-not $pythonVersion) { $pythonVersion = (python --version 2>$null) -replace 'Python ', '' }
    if ($pythonVersion) { Write-Output "- **版本**: $pythonVersion" }
    Write-Output ""
}
elseif (Test-Path "Cargo.toml") {
    Write-Output "### 后端技术栈"
    Write-Output "- **语言**: Rust"
    Write-Output ""
}

# Git信息
Write-Output "## 📝 最新提交信息"
Write-Output ""
if (Test-Path ".git") {
    $branch = (git branch --show-current 2>$null)
    if (-not $branch) { $branch = 'unknown' }
    $latestCommit = (git log -1 --pretty=format:'%h - %s (%cr)' 2>$null)
    if (-not $latestCommit) { $latestCommit = 'No git history' }
    Write-Output "**分支**: $branch"
    Write-Output "**最新提交**: $latestCommit"
    Write-Output ""
}
else {
    Write-Output "未找到Git仓库"
    Write-Output ""
}

# 项目结构
Write-Output "## 📁 项目结构"
Write-Output ""
Write-Output "````"
Write-Output "$ProjectName/"

# 目录检测
$structure = @{
    "src" = "├── src/                    # 源代码";
    "src/pages" = "│   ├── pages/             # 页面组件";
    "src/components" = "│   ├── components/        # 通用组件";
    "src/context" = "│   └── context/           # 上下文管理";
    "public" = "├── public/                 # 静态资源";
    "backend" = "├── backend/                # 后端代码";
    "api" = "├── api/                    # API接口";
    "docs" = "├── docs/                   # 项目文档";
    "AI-Protocol-Lab" = "├── AI-Protocol-Lab/        # AI协作工具箱";
}
foreach ($dir in $structure.Keys) {
    if (Test-Path $dir) { Write-Output $structure[$dir] }
}

# 文件检测
$files = @{
    "package.json" = "├── package.json            # 依赖管理";
    "go.mod" = "├── go.mod                  # Go模块";
    "Cargo.toml" = "├── Cargo.toml              # Rust配置";
    "requirements.txt" = "├── requirements.txt        # Python依赖";
    "vite.config.js" = "├── vite.config.js          # Vite配置";
    "webpack.config.js" = "├── webpack.config.js       # Webpack配置";
    "next.config.js" = "├── next.config.js          # Next.js配置";
    "Dockerfile" = "├── Dockerfile              # Docker配置";
    "docker-compose.yml" = "└── docker-compose.yml      # Docker Compose";
}
foreach ($file in $files.Keys) {
    if (Test-Path $file) { Write-Output $files[$file] }
}
Write-Output "````"
Write-Output ""

# 重要文件状态
Write-Output "## 📄 重要文件状态"
Write-Output ""
$mainFilesFound = $false

$fileChecks = @(
    @{ Path = "src/App.jsx"; Description = "主应用组件" },
    @{ Path = "src/App.js"; Description = "主应用组件" },
    @{ Path = "src/main.jsx"; Description = "应用入口" },
    @{ Path = "src/index.js"; Description = "应用入口" }
)

foreach ($file in $fileChecks) {
    if (Test-Path $file.Path) {
        $lines = (Get-Content $file.Path).Count
        Write-Output "- **$($file.Path | Split-Path -Leaf)**: $lines 行 ($($file.Description))"
        $mainFilesFound = $true
    }
}

if (Test-Path "src/pages") {
    $pageCount = (Get-ChildItem "src/pages" -Recurse -Include "*.jsx", "*.js", "*.vue").Count
    if ($pageCount -gt 0) {
        Write-Output "- **页面组件**: $pageCount 个文件"
        $mainFilesFound = $true
    }
}

if (Test-Path "package.json") { Write-Output "- **package.json**: 存在 (依赖配置)"; $mainFilesFound = $true }
if (Test-Path "go.mod") { Write-Output "- **go.mod**: 存在 (Go模块配置)"; $mainFilesFound = $true }
if (Test-Path "AI-Protocol-Lab/docs/README.md") { Write-Output "- **AI-Protocol-Lab**: 存在 (AI协作工具箱)"; $mainFilesFound = $true }

if (-not $mainFilesFound) {
    Write-Output "- 未检测到主要源文件"
}
Write-Output ""

# 最新状态
Write-Output "## 🚀 最新项目状态"
Write-Output ""
if (Test-Path ".git") {
    Write-Output "### 最近的提交记录"
    git log --oneline -5 2>$null | ForEach-Object { Write-Output "- $_" }
    Write-Output ""

    Write-Output "### 最近修改的文件"
    git diff --name-only HEAD~3..HEAD 2>$null | Select-Object -First 5 | ForEach-Object {
        if (Test-Path $_) { Write-Output "- $_" }
    }
    Write-Output ""
}
else {
    Write-Output "### 项目状态"
    Write-Output "- Git仓库未初始化或不可访问"
    Write-Output "- 建议初始化Git进行版本控制"
    Write-Output ""
}

# 快速命令
Write-Output "## ⚡ 快速命令"
Write-Output ""
Write-Output "````bash"

if (Test-Path "package.json") {
    $pkg = Get-Content "package.json" -Raw | ConvertFrom-Json
    if ($pkg.scripts.dev) {
        Write-Output "# 开发模式"
        Write-Output "npm run dev"
        Write-Output ""
    }
    if ($pkg.scripts.build) {
        Write-Output "# 构建生产版本"
        Write-Output "npm run build"
        Write-Output ""
    }
    if ($pkg.scripts.test) {
        Write-Output "# 运行测试"
        Write-Output "npm test"
        Write-Output ""
    }
}

if (Test-Path "go.mod") {
    Write-Output "# 运行Go程序"
    Write-Output "go run ."
    Write-Output ""
    Write-Output "# 构建Go程序"
    Write-Output "go build"
    Write-Output ""
    Write-Output "# 运行测试"
    Write-Output "go test ./..."
    Write-Output ""
}

if (Test-Path "requirements.txt" -or (Test-Path "pyproject.toml")) {
    Write-Output "# 安装依赖"
    Write-Output "pip install -r requirements.txt"
    Write-Output ""
    Write-Output "# 运行Python程序"
    Write-Output "python main.py"
    Write-Output ""
}

if (Test-Path "Dockerfile") {
    Write-Output "# 构建Docker镜像"
    Write-Output "docker build -t $($ProjectName.ToLower()) ."
    Write-Output ""
}

if (Test-Path "docker-compose.yml") {
    Write-Output "# 启动Docker Compose"
    Write-Output "docker-compose up -d"
    Write-Output ""
}

if (Test-Path "AI-Protocol-Lab") {
    Write-Output "# 查看AI协作指南"
    Write-Output "cat AI-Protocol-Lab/docs/README.md"
}

Write-Output "````"
Write-Output ""

# AI助手建议
Write-Output "## 🤖 AI助手建议"
Write-Output ""
Write-Output "基于当前项目技术栈，建议AI助手扮演以下角色之一："
Write-Output ""

if (Test-Path "package.json") {
    $pkgContent = Get-Content "package.json" -Raw | ConvertFrom-Json
    $allDeps = $pkgContent.dependencies.PSObject.Properties.Name + $pkgContent.devDependencies.PSObject.Properties.Name
    
    if ($allDeps -contains "react") {
        Write-Output "1. **React开发专家** - 组件开发和状态管理"
        Write-Output "2. **前端性能专家** - 代码分割和优化"
    }
    elseif ($allDeps -contains "vue") {
        Write-Output "1. **Vue开发专家** - 组件开发和Vuex管理"
        Write-Output "2. **前端架构师** - 项目结构优化"
    }
    else {
        Write-Output "1. **前端开发专家** - UI/UX开发"
        Write-Output "2. **JavaScript专家** - 代码质量提升"
    }
    if (($allDeps -contains "@mui/material") -or ($allDeps -contains "antd")) {
        Write-Output "3. **UI/UX设计专家** - 界面设计优化"
    }
    if (($allDeps -contains "recharts") -or ($allDeps -contains "chart.js")) {
        Write-Output "4. **数据可视化专家** - 图表和分析功能"
    }
}

if (Test-Path "go.mod") {
    Write-Output "1. **Go开发专家** - 后端服务开发"
    Write-Output "2. **API设计专家** - RESTful接口设计"
    Write-Output "3. **性能优化专家** - 并发和性能调优"
}

if (Test-Path "requirements.txt" -or (Test-Path "pyproject.toml")) {
    Write-Output "1. **Python开发专家** - 后端逻辑开发"
    Write-Output "2. **数据分析专家** - 数据处理和分析"
    Write-Output "3. **机器学习专家** - AI模型开发"
}

if (Test-Path "Dockerfile") {
    Write-Output "5. **DevOps专家** - 容器化和部署"
}

Write-Output ""
Write-Output "---"
Write-Output ""
Write-Output "_此上下文由 AI-Protocol-Lab 自动生成_" 