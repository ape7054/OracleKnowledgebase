# AI助手使用指南 - MarketPulse项目

## 📋 项目基本信息

### 项目概述
- **项目名称**: MarketPulse
- **类型**: 加密货币市场智能平台
- **技术栈**: React + Go + MySQL + Docker
- **当前完成度**: 82%

### 项目结构
```
/www/wwwroot/market-pulse/
├── src/                    # React前端代码
│   ├── pages/             # 页面组件
│   ├── components/        # 通用组件
│   └── api/              # API服务层
├── backend/               # Go后端代码
│   ├── cmd/              # 主程序入口
│   ├── internal/         # 内部包
│   └── pkg/              # 公共包
├── docs/                 # 项目文档
└── docker-compose.yml    # Docker配置
```

### 关键服务
- **前端**: http://localhost:5173 (Vite开发服务器)
- **后端**: http://localhost:8080 (Go API服务)
- **数据库**: localhost:3307 (MySQL)

## 🎯 当前项目状态

### ✅ 已完成功能
1. **前端UI/UX** (95%) - React + Material UI，响应式设计
2. **后端架构** (90%) - Go + Gin，完整API服务
3. **数据库设计** (80%) - MySQL，完整数据模型
4. **API功能** (90%) - CoinGecko API集成，实时数据
5. **Dashboard集成** (95%) - 市场数据展示，图标系统
6. **交易界面** (85%) - UI布局，数据展示

### ⚠️ 待开发功能
1. **用户认证系统** (20%) - JWT认证，权限管理
2. **WebSocket推送** (0%) - 实时数据更新
3. **测试覆盖** (15%) - 单元测试，集成测试

## 🔧 常见问题和解决方案

### 1. Dashboard页面问题
**症状**: 页面空白或加载失败
**解决步骤**:
```bash
# 1. 检查后端服务
curl -s http://localhost:8080/api/health

# 2. 检查API数据
curl -s "http://localhost:8080/api/market/data?limit=5"

# 3. 检查浏览器控制台错误 (F12)
```

**常见原因**:
- 缺少loading/error状态处理
- API数据格式与组件期望不匹配
- 图标映射不完整

### 2. 代币图标问题
**症状**: 所有代币显示相同图标
**解决方案**: 检查并更新 `src/pages/Dashboard.jsx` 中的 `iconMap`

### 3. 表格布局问题
**症状**: 列间距不合理
**解决方案**: 调整Grid组件的列宽分配 (xs/sm/md属性)

## 📚 重要文件位置

### 前端关键文件
- `src/pages/Dashboard.jsx` - 主仪表板页面
- `src/pages/Trade.jsx` - 交易页面
- `src/api/marketApi.js` - API服务层

### 后端关键文件
- `backend/cmd/market-pulse-backend/main.go` - 主程序入口
- `backend/internal/handlers/` - API处理器
- `backend/internal/services/` - 业务逻辑

### 文档文件
- `docs/development/DEVELOPMENT-ROADMAP.md` - 开发路线图
- `docs/conversations/` - 对话记录
- `docs/development/API-SPECIFICATION.md` - API文档

## 🚀 快速启动命令

### 启动开发环境
```bash
# 1. 启动数据库和后端
cd /www/wwwroot/market-pulse
docker-compose up -d

# 2. 启动前端开发服务器
npm run dev

# 3. 检查服务状态
curl http://localhost:8080/api/health
curl http://localhost:5173
```

### 常用Git命令
```bash
# 查看状态
git status

# 提交更改
git add .
git commit -m "描述: 具体修改内容"
git push origin master

# 查看日志
git log --oneline -10
```

## 💡 AI助手使用技巧

### 1. 问题描述最佳实践
- 提供具体的错误信息或截图
- 说明期望的行为和实际行为
- 包含相关的文件路径或代码片段

### 2. 常用请求模板
```
# UI问题
"这个[组件名]的[具体问题]，期望[期望效果]"

# 功能开发
"需要实现[功能描述]，技术要求[具体要求]"

# 错误修复
"遇到[错误信息]，在[操作步骤]时发生"

# 代码优化
"这段代码[具体位置]需要优化[优化目标]"
```

### 3. 上下文信息
- 项目使用React + Material UI + Go + MySQL
- 已集成CoinGecko API获取实时数据
- 使用Docker进行环境管理
- 遵循RESTful API设计规范

## 📈 最近更新 (2025-01-20)

### 完成的重要修复
1. **Dashboard页面修复** - 解决空白加载问题
2. **代币图标系统** - 支持20+种代币图标
3. **UI布局优化** - 表格间距和响应式设计
4. **错误处理完善** - loading/error状态管理

### 技术债务清理
- 修复API数据格式不匹配
- 解决变量命名冲突
- 完善错误处理机制
- 优化数据转换逻辑

## 🤖 AI助手快速启动

### 方法1: 一键获取上下文 (推荐)
```bash
cd /www/wwwroot/market-pulse
./AI-Protocol-Lab/get-ai-context.sh
```
**说明**: 自动生成包含实时状态的完整上下文信息

### 方法2: 使用专业Prompt
```bash
cat AI-Protocol-Lab/prompts/project_progress_manager.prompt.md
```
**说明**: 让AI具备项目管理和进度跟踪能力

### 方法3: 使用本指南
```bash
cat docs/conversations/AI-CONTEXT-GUIDE.md
```
**说明**: 提供完整的项目背景和使用技巧

## 🎯 下次对话建议

### 优先开发任务
1. **用户认证系统** - JWT认证，登录注册
2. **WebSocket实时推送** - 价格数据实时更新
3. **交易功能完善** - 模拟交易，订单管理

### 可以直接询问的问题
- "帮我实现用户登录注册功能"
- "添加WebSocket实时数据推送"
- "优化[具体页面]的性能"
- "添加[具体功能]的测试用例"

### 进度管理命令
- "update progress" - 更新项目进度
- "save conversation" - 保存当前对话记录

---

**使用提示**:
1. **新AI会话**: 运行 `./AI-Protocol-Lab/get-ai-context.sh` 获取上下文
2. **项目管理**: 使用 `project_progress_manager.prompt.md`
3. **快速开发**: 直接使用本文档内容作为上下文
