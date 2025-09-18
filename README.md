# Learning Stack - 学习平台

现代化的全栈学习平台，基于Next.js + Go构建。

## 🎨 **最新更新：World Peas 有机食品着陆页**

已成功实现基于UI设计师提供的Figma设计稿的World Peas着陆页，包含：

### ✨ **设计特色**
- **现代玻璃风格**：渐变背景 + 毛玻璃效果
- **渐变色彩系统**：#18C8FF → #933FFE 主题渐变
- **Inter字体系统**：支持400-900字重
- **响应式设计**：完美适配桌面端和移动端

### 🏗️ **技术实现**
- **组件化架构**：模块化CSS类名系统
- **设计令牌**：CSS变量统一管理颜色、间距、字体
- **动画系统**：平滑过渡和悬浮效果
- **可访问性**：支持键盘导航和屏幕阅读器

### 📱 **响应式断点**
- **桌面端**：>1024px (完整体验)
- **平板端**：768px-1024px (自动适配)
- **移动端**：<768px (优化布局)
- **小屏幕**：<480px (紧凑模式)

### 🎯 **页面功能**
1. **导航栏**：固定顶部，毛玻璃效果
2. **主题区域**：大标题展示 + CTA按钮 + 邮箱订阅
3. **特色功能**：三栏卡片展示核心优势
4. **产品展示**：表格式产品列表
5. **页脚信息**：联系方式和快速链接

### 🚀 **启动项目**

```bash
# 进入前端目录
cd frontend-nextjs

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 📂 **项目结构**

```
frontend-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 全局布局，导入CSS和字体
│   │   └── page.tsx            # 主页，渲染World Peas组件
│   ├── components/
│   │   └── WorldPeasLanding.tsx # World Peas着陆页组件
│   └── styles/
│       └── world-peas-components.css # 完整样式系统
└── public/
    └── assets/                 # 静态资源（图标、图片）
```

### 🎨 **设计系统**

#### 颜色变量
```css
--primary-gradient: linear-gradient(225deg, #18C8FF 14.89%, #933FFE 85.85%);
--primary-purple: #B982FF;
--primary-cyan: #18C8FF;
--background-dark: #0B0B0F;
--background-card: #1A1B23;
```

#### 组件类名
```html
<!-- 按钮 -->
<button class="btn-primary">主要按钮</button>
<button class="btn-secondary">次要按钮</button>

<!-- 标题 -->
<h1 class="heading-primary">主标题</h1>
<h2 class="heading-secondary">副标题</h2>
<h3 class="heading-tertiary">三级标题</h3>

<!-- 文本 -->
<p class="body-text">正文内容</p>
<p class="body-text-small">小号文字</p>

<!-- 表单 -->
<input class="input-glass" placeholder="输入内容">

<!-- 卡片 -->
<div class="info-card">卡片内容</div>

<!-- 表格 -->
<div class="data-table">
  <div class="table-row">
    <div class="table-cell">单元格</div>
  </div>
</div>
```

### 📊 **性能优化**
- **字体优化**：Google Fonts预连接
- **CSS优化**：使用CSS变量和clamp()函数
- **动画优化**：GPU加速和will-change属性
- **响应式图片**：Next.js Image组件优化
- **减少重绘**：合理使用transform和opacity

### 🔧 **技术栈**

#### 前端
- **Next.js 14**：React框架，App Router
- **TypeScript**：类型安全
- **CSS3**：现代CSS特性
- **Inter字体**：Google Fonts

#### 原有功能
- **React 18**：用户界面
- **Material-UI**：组件库  
- **Axios**：HTTP客户端
- **WebSocket**：实时通信

#### 后端
- **Go + Gin**：后端API
- **MySQL**：数据库
- **JWT**：身份验证
- **CoinGecko API**：加密货币数据

#### 部署
- **Docker**：容器化
- **Nginx**：反向代理

---

## 📝 原项目说明

这是一个全栈学习平台，包含加密货币交易模拟、技术文章分享、实时市场数据等功能。

### 主要功能
- 🏠 **首页展示**：平台介绍和功能概览
- 📊 **仪表板**：数据可视化和统计信息  
- 💰 **交易模拟**：虚拟加密货币交易体验
- 📰 **新闻资讯**：加密货币和技术资讯
- 📚 **文章系统**：技术文章分享和管理
- 👤 **用户系统**：注册、登录、个人中心

### 启动说明

#### 后端服务
```bash
cd backend-go
go mod tidy
go run cmd/learning-stack-backend/main.go
```

#### Docker部署
```bash
docker-compose up -d
```

### API文档
- 后端API：http://localhost:8080
- 前端界面：http://localhost:3000

---

## �� 许可证

MIT License
