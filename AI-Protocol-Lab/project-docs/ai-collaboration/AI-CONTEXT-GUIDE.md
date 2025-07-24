# AI助手快速上下文指南
_MarketPulse项目 - 2025年7月24日更新_

---

## 🚀 **30秒快速了解**

**项目**: MarketPulse加密货币分析平台  
**状态**: Dashboard专业级升级刚完成 ✅  
**技术**: React + MUI + Recharts + Vite + Go + MySQL  
**地址**: https://www.ency.asia/dashboard  
**工作目录**: `/www/wwwroot/market-pulse/`  

---

## 📋 **立即可用的命令**

```bash
# 进入项目目录
cd /www/wwwroot/market-pulse

# 开发模式（前端+后端，使用本地MySQL）
./start-dev.bat

# 构建和部署（使用Docker容器）
npm run build && docker-compose up -d

# 查看主要文件
code src/pages/Dashboard.jsx
code backend/cmd/market-pulse-backend/main.go
```

---

## 🎯 **当前项目状态**

### **刚完成的工作 (2025-07-24)**
- ✅ 开发环境优化 - 现在使用本地MySQL而非Docker容器
- ✅ 部署流程简化 - 使用Docker Compose一键部署
- ✅ Dashboard完全重新设计 - 从"廉价"升级为专业级
- ✅ 新增4个高级组件: PremiumStatCard, PremiumSparkLine, PremiumMarketCard, PremiumMarketTableView
- ✅ 修复图标颜色问题 - 现在根据涨跌显示绿色/红色
- ✅ 实现深空背景 + 浮动动画 + 玻璃态效果
- ✅ 完美响应式设计

### **核心文件**
- `src/pages/Dashboard.jsx` - 主要升级文件 (2360行)
- `src/context/ThemeContext.jsx` - 主题管理
- `src/App.jsx` - 路由配置
- `backend/cmd/market-pulse-backend/main.go` - 后端入口
- `docker-compose.yml` - 生产部署配置

---

## 🔧 **技术架构速览**

### **环境配置**
```
开发环境:
- 前端: Vite开发服务器 (localhost:5173)
- 后端: Go直接运行 (localhost:8080)
- 数据库: 本地MySQL (localhost:3306)

生产环境:
- 前端: Nginx静态文件服务
- 后端: Docker容器
- 数据库: Docker MySQL容器
```

### **组件层次**
```
Dashboard
├── 头部区域 (Trading Command Center)
├── 统计卡片区 (PremiumStatCard × 4)
├── Market Overview
│   ├── 卡片视图 (PremiumMarketCard)
│   └── 表格视图 (PremiumMarketTableView)
├── 情绪分析 (SentimentGauge)
└── 社交媒体 (SocialMentions)
```

### **关键技术点**
- **动画**: keyframes + MUI Fade/Slide
- **颜色**: 智能趋势颜色系统
- **图表**: Recharts + 自定义渐变
- **响应式**: MUI Grid + 自定义断点
- **后端**: Go + Gin + MySQL
- **部署**: Docker + Nginx

---

## 🎨 **设计系统**

### **颜色方案**
```jsx
// 趋势颜色
上涨: #10b981 (绿色)
下跌: #ef4444 (红色)  
平盘: #6b7280 (灰色)

// 主题色
主色: 紫色到粉色渐变
背景: 深空径向渐变
卡片: 玻璃态毛玻璃效果
```

### **动画效果**
- `float`: 浮动动画 (背景元素)
- `pulse`: 脉动动画 (状态指示器)
- `glow`: 发光动画 (悬停效果)

---

## 🚧 **可能的下一步工作**

### **性能优化**
- [ ] 代码分割 (React.lazy)
- [ ] 图片懒加载
- [ ] Bundle分析优化

### **功能增强**
- [ ] 更多图表类型
- [ ] 实时数据推送
- [ ] 用户个性化设置
- [ ] 高级筛选功能

### **用户体验**
- [ ] 页面切换动画
- [ ] 加载状态优化
- [ ] 错误处理改进
- [ ] 移动端手势支持

### **后端开发**
- [ ] 用户认证系统 (优先级高)
- [ ] WebSocket实时数据推送
- [ ] 交易功能完善

---

## 🔍 **常见问题解决**

### **图标颜色问题**
```jsx
// 已修复 - 使用这个模式
sx={{
  color: trendColor,
  '& svg': {
    color: trendColor,
    fill: 'currentColor'
  }
}}
```

### **响应式问题**
```jsx
// 使用MUI断点系统
sx={{
  display: { xs: 'none', md: 'block' },
  fontSize: { xs: '1rem', md: '1.2rem' }
}}
```

### **动画性能**
```jsx
// 使用transform而不是改变layout属性
transform: 'translateY(-10px)',  // ✅ 好
top: '-10px',                    // ❌ 避免
```

### **数据库连接问题**
```go
// 开发环境 - 连接本地MySQL
dsn := "market_pulse_user:wBYXZkiLTExiEAHF@tcp(localhost:3306)/market_pulse_db"

// 生产环境 - 连接Docker容器
dsn := "market_pulse_user:wBYXZkiLTExiEAHF@tcp(db:3306)/market_pulse_db"
```

---

## 📁 **重要文件位置**

```
/www/wwwroot/market-pulse/
├── src/pages/Dashboard.jsx           # 🔥 主要前端工作文件
├── src/context/ThemeContext.jsx      # 主题管理
├── backend/                          # 后端代码
│   ├── cmd/market-pulse-backend/    # 后端入口
│   └── internal/                    # 内部包
├── AI-Protocol-Lab/                  # 📚 AI协作工具
│   ├── ai-conversations/            # 对话记录
│   ├── docs/                        # 项目文档
│   └── prompts/                     # AI提示词
├── package.json                     # 依赖管理
├── docker-compose.yml               # 生产部署配置
├── start-dev.bat                    # 开发环境启动脚本
└── vite.config.js                   # 构建配置
```

---

## 💡 **AI助手角色建议**

根据需要选择合适的角色：

1. **前端开发专家** - 继续UI/UX优化
2. **性能优化专家** - 代码分割和性能提升  
3. **移动端专家** - 移动体验优化
4. **数据可视化专家** - 图表和分析功能
5. **全栈开发专家** - 后端API集成
6. **后端开发专家** - Go服务和MySQL优化
7. **DevOps专家** - Docker部署和CI/CD

---

## 🔄 **快速启动模板**

### **给新AI助手的开场白**
```
你好！我需要继续开发MarketPulse项目。

项目状态：
- 加密货币分析平台，Dashboard刚完成专业级升级
- 前端技术栈：React + MUI + Recharts
- 后端技术栈：Go + Gin + MySQL
- 开发环境：本地MySQL，不使用Docker
- 生产部署：Docker Compose (前端、后端、数据库)
- 工作目录：/www/wwwroot/market-pulse/
- 主要文件：src/pages/Dashboard.jsx, backend/cmd/market-pulse-backend/main.go
- 部署地址：https://www.ency.asia/dashboard

请查看 /www/wwwroot/market-pulse/AI-Protocol-Lab/docs/AI-CONTEXT-GUIDE.md 
了解详细的项目状态和技术细节。

我希望你扮演[前端开发专家/后端开发专家/DevOps专家/其他角色]，
帮我[具体需求]。
```

---

## 📞 **紧急联系信息**

**构建失败**: 检查package.json依赖  
**部署问题**: 检查docker-compose.yml配置  
**数据库问题**: 确认MySQL连接参数  
**样式问题**: 检查MUI主题设置  
**性能问题**: 使用React DevTools分析  

---

_本指南确保任何AI助手都能在5分钟内完全理解项目状态并开始高效工作。_
_最后更新: 2025-07-24_
