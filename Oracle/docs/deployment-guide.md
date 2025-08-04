# MarketPulse 部署和使用指南

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 9+ 或 yarn 1.22+
- 现代浏览器（Chrome 90+, Firefox 88+, Safari 14+）

### 安装步骤
```bash
# 1. 克隆项目
git clone <repository-url>
cd market-pulse

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问应用
# 浏览器打开 http://localhost:5174
```

## 📦 项目脚本

### 开发命令
```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format
```

### 依赖管理
```bash
# 安装新依赖
npm install <package-name>

# 安装开发依赖
npm install -D <package-name>

# 更新依赖
npm update

# 检查过时依赖
npm outdated
```

## 🔧 配置说明

### 环境变量
创建 `.env` 文件：
```env
# API配置
VITE_API_BASE_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000

# 功能开关
VITE_ENABLE_MOCK_DATA=true
VITE_ENABLE_ANALYTICS=false

# 第三方服务
VITE_COINGECKO_API_KEY=your_api_key_here
```

### Vite配置
```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg?react",
    })
  ],
  server: {
    port: 5174,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

## 🌐 部署选项

### 1. Vercel 部署（推荐）
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel

# 生产部署
vercel --prod
```

### 2. Netlify 部署
```bash
# 构建项目
npm run build

# 上传 dist/ 目录到 Netlify
# 或使用 Netlify CLI
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

### 3. Docker 部署
```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# 构建和运行
docker build -t market-pulse .
docker run -p 80:80 market-pulse
```

### 4. 静态文件服务器
```bash
# 构建项目
npm run build

# 使用任何静态文件服务器
# 例如：serve, http-server, nginx
npx serve dist
```

## 🔍 功能使用指南

### 主要功能
1. **首页 (Home)**
   - 平台介绍和功能概览
   - 快速导航到各个功能模块

2. **仪表板 (Dashboard)**
   - 实时加密货币价格数据
   - 市场统计和图表分析
   - 自动数据刷新（30秒间隔）

3. **新闻中心 (News)**
   - 新闻搜索和筛选
   - 影响力分析
   - 实时新闻推送
   - 个性化推荐

4. **交易 (Trade)**
   - 模拟交易界面
   - 订单簿和价格图表
   - 交易历史记录

5. **账户 (Account)**
   - 用户信息管理
   - 资产概览
   - 交易历史

### 界面操作
- **主题切换**: 点击右上角的主题切换按钮
- **导航**: 使用左侧边栏进行页面切换
- **移动端**: 点击菜单按钮打开导航抽屉
- **数据刷新**: Dashboard页面自动刷新，也可手动刷新

## 🛠️ 开发指南

### 添加新页面
1. 在 `src/pages/` 创建新组件
2. 在 `src/App.jsx` 添加路由
3. 在导航菜单中添加链接

```javascript
// 1. 创建页面组件
// src/pages/NewPage.jsx
const NewPage = () => {
  return (
    <Box>
      <Typography variant="h4">新页面</Typography>
    </Box>
  );
};

// 2. 添加路由
// src/App.jsx
<Route path="/new-page" element={<NewPage />} />

// 3. 添加导航
// src/App.jsx - drawerContent
{ text: 'New Page', icon: <NewIcon />, path: '/new-page' }
```

### 添加新组件
```javascript
// src/components/NewComponent.jsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const NewComponent = ({ title, children }) => {
  const theme = useTheme();
  
  return (
    <Box sx={{
      p: 2,
      borderRadius: 2,
      backgroundColor: theme.palette.background.paper
    }}>
      <Typography variant="h6">{title}</Typography>
      {children}
    </Box>
  );
};

export default NewComponent;
```

### API集成
```javascript
// src/api/newApi.js
import { apiClient } from './marketApi';

export const newApi = {
  async getData() {
    try {
      const response = await apiClient.get('/new-endpoint');
      return response.data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
```

## 🐛 故障排除

### 常见问题

1. **页面空白**
   - 检查浏览器控制台错误
   - 确认所有依赖已正确安装
   - 重启开发服务器

2. **API请求失败**
   - 检查后端服务是否运行
   - 确认API URL配置正确
   - 查看网络请求状态

3. **样式问题**
   - 清除浏览器缓存
   - 检查主题配置
   - 确认Material-UI版本兼容性

4. **构建失败**
   - 删除 `node_modules` 和 `package-lock.json`
   - 重新安装依赖：`npm install`
   - 检查Node.js版本兼容性

### 调试技巧
```javascript
// 开启详细日志
localStorage.setItem('debug', 'market-pulse:*');

// 检查API响应
console.log('API Response:', response);

// 组件状态调试
console.log('Component State:', { loading, error, data });
```

## 📊 性能监控

### 性能指标
- 首屏加载时间 < 2秒
- 页面切换 < 500ms
- API响应时间 < 1秒
- 内存使用 < 100MB

### 监控工具
- Chrome DevTools
- React DevTools
- Lighthouse
- Web Vitals

## 🔒 安全考虑

### 前端安全
- 输入验证和清理
- XSS防护
- CSRF保护
- 安全的API密钥管理

### 部署安全
- HTTPS强制
- 安全头设置
- 内容安全策略(CSP)
- 定期依赖更新

---

**支持**: 如有问题，请查看项目文档或提交Issue。项目遵循MIT许可证。
