# 🚀 Vercel 部署指南

## 方法一：网页版部署（推荐）

### 步骤 1：访问 Vercel
1. 打开 https://vercel.com
2. 点击 "Sign Up" 或 "Login"
3. 选择 "Continue with GitHub"

### 步骤 2：导入项目
1. 登录后点击 "Add New..." → "Project"
2. 找到你的仓库：`ape7054/learning-stack`
3. 点击 "Import"

### 步骤 3：配置项目
Vercel 会自动检测到 Next.js，使用以下配置：

```
Framework Preset: Next.js
Root Directory: ./frontend-nextjs
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

**重要配置项：**
- ✅ Root Directory 设置为 `frontend-nextjs`（因为你的项目在子目录）
- ✅ Node.js Version: 20.x（推荐）
- ✅ 其他保持默认即可

### 步骤 4：部署
1. 点击 "Deploy" 按钮
2. 等待 2-3 分钟（首次部署会慢一点）
3. 看到 🎉 "Congratulations!" 表示成功

### 步骤 5：访问网站
部署成功后会得到一个域名：
```
https://your-project-name.vercel.app
```

---

## 方法二：命令行部署

### 1. 安装 Vercel CLI
```bash
npm i -g vercel
```

### 2. 登录
```bash
vercel login
```

### 3. 部署
```bash
# 在项目根目录执行
cd frontend-nextjs
vercel

# 生产环境部署
vercel --prod
```

---

## 🔧 常见问题排查

### 问题 1：构建失败 - Velite 错误
**解决方案：** 确保 `package.json` 中的构建命令正确
```json
"build": "velite && next build"
```

### 问题 2：找不到模块
**解决方案：** 在 Vercel 设置中添加环境变量
```
NODE_VERSION=20
```

### 问题 3：Turbopack 构建问题
**临时方案：** 修改 `package.json`
```json
"build": "velite && next build"  // 去掉 --turbopack
```

### 问题 4：国际化路由问题
**解决方案：** 确保 `next.config.ts` 中配置正确
```typescript
// 你的配置已经正确，无需修改
```

---

## 🎯 部署后优化

### 1. 自定义域名（可选）
```
Vercel 项目设置 → Domains → Add Domain
输入你的域名，按照提示配置 DNS
```

### 2. 环境变量（如有需要）
```
Project Settings → Environment Variables
添加必要的环境变量
```

### 3. 性能监控
```
启用 Vercel Analytics：
Project Settings → Analytics → Enable
```

### 4. 自动部署
✅ 已配置！每次推送到 master 分支会自动部署

---

## 📊 部署状态检查

部署完成后，检查以下页面是否正常：
- [ ] 首页：`/`
- [ ] About 页面：`/en/about` 和 `/zh/about`
- [ ] Knowledge 页面：`/en/knowledge` 和 `/zh/knowledge`
- [ ] Icon Cloud 动画是否正常
- [ ] 移动端适配
- [ ] 深色模式切换

---

## 🆘 需要帮助？

遇到问题可以：
1. 查看 Vercel 部署日志
2. 检查浏览器控制台错误
3. 查看 Next.js 文档：https://nextjs.org/docs/deployment

---

**部署时间：** 约 2-5 分钟  
**更新时间：** 推送代码后自动部署（约 1-2 分钟）  
**费用：** 免费（Hobby 计划）


