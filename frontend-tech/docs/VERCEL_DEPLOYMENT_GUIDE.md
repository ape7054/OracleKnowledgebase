# Vercel 部署指南

本指南将帮助你将项目部署到 Vercel 并配置自定义域名 `tech.ency.asia`。

## 📋 部署前准备

### 1. 确保代码已推送到 GitHub

```bash
# 查看当前状态
git status

# 添加所有更改
git add .

# 提交更改
git commit -m "feat: 完善 demo 页面双语支持"

# 推送到 GitHub
git push origin master
```

### 2. 准备必要的账号
- ✅ GitHub 账号（已有）
- ✅ Vercel 账号（使用 GitHub 登录）
- ✅ 域名 tech.ency.asia 的 DNS 管理权限

---

## 🚀 部署步骤

### 步骤 1：导入项目到 Vercel

#### 方式 1：通过 Vercel 网站（推荐）

1. **访问 Vercel 并登录**
   - 打开 https://vercel.com
   - 点击 "Sign Up" 或 "Log In"
   - 选择 "Continue with GitHub" 使用 GitHub 账号登录

2. **导入项目**
   - 登录后，点击 "Add New..."
   - 选择 "Project"
   - 在 "Import Git Repository" 页面，找到你的 `frontend-tech` 仓库
   - 点击 "Import"

3. **配置项目设置**
   
   **基本设置：**
   - **Project Name:** `frontend-tech` 或 `oracle-knowledgebase`
   - **Framework Preset:** Next.js（自动检测）
   - **Root Directory:** `./` （保持默认）
   
   **Build & Output Settings：**
   - **Build Command:** `npm run build`（已自动配置）
   - **Output Directory:** `.next`（已自动配置）
   - **Install Command:** `npm install`（已自动配置）

#### 方式 2：通过 Vercel CLI（可选）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录 Vercel
vercel login

# 在项目目录下部署
cd frontend-tech
vercel

# 按照提示操作：
# ? Set up and deploy "~/frontend-tech"? [Y/n] y
# ? Which scope do you want to deploy to? 选择你的账号
# ? Link to existing project? [y/N] n
# ? What's your project's name? frontend-tech
# ? In which directory is your code located? ./
```

### 步骤 2：配置环境变量（可选）

如果你使用了 GitHub API，需要配置环境变量：

1. 在 Vercel 项目页面，点击 "Settings"
2. 选择 "Environment Variables"
3. 添加以下变量：

```
GITHUB_TOKEN=your_github_token_here
```

**如何获取 GitHub Token：**
1. 访问 https://github.com/settings/tokens
2. 点击 "Generate new token (classic)"
3. 名称：`Oracle Knowledge Base - Vercel`
4. 权限：只需选择 `public_repo`
5. 点击 "Generate token" 并复制

### 步骤 3：部署

点击 "Deploy" 按钮，Vercel 会自动：
- ✅ 克隆代码
- ✅ 安装依赖
- ✅ 构建项目
- ✅ 部署到 CDN

部署通常需要 2-5 分钟。

---

## 🌐 配置自定义域名

### 步骤 1：在 Vercel 添加域名

1. 部署成功后，进入项目仪表板
2. 点击 "Settings" → "Domains"
3. 在 "Add Domain" 输入框中输入：`tech.ency.asia`
4. 点击 "Add"

Vercel 会检测域名并提供 DNS 配置信息。

### 步骤 2：配置 DNS 记录

#### 选项 A：使用 A 记录（推荐）

在你的域名 DNS 管理面板（阿里云/腾讯云/Cloudflare 等）添加：

```
类型: A
名称: tech (或 @，取决于你的 DNS 提供商)
值: 76.76.21.21
TTL: 自动或 3600
```

#### 选项 B：使用 CNAME 记录

```
类型: CNAME
名称: tech
值: cname.vercel-dns.com
TTL: 自动或 3600
```

### 步骤 3：等待 DNS 生效

- DNS 传播通常需要 5-30 分钟
- 最长可能需要 48 小时（极少情况）
- 可以使用工具检查：https://www.whatsmydns.net/

### 步骤 4：配置 SSL 证书

Vercel 会自动配置 SSL 证书：
- ✅ 免费的 Let's Encrypt 证书
- ✅ 自动续期
- ✅ 强制 HTTPS 重定向

在 "Settings" → "Domains" 页面确认：
- ✅ SSL 状态显示为 "Active"
- ✅ HTTPS 可用

---

## 🔧 高级配置

### 1. 配置多语言路由

项目已支持 `/zh` 和 `/en` 路由，无需额外配置。

访问地址：
- 中文：`https://tech.ency.asia/zh`
- 英文：`https://tech.ency.asia/en`
- 默认：`https://tech.ency.asia` （自动重定向到浏览器语言）

### 2. 配置子域名（可选）

如果需要添加 `www.tech.ency.asia`：

1. 在 Vercel "Domains" 页面添加 `www.tech.ency.asia`
2. 在 DNS 中添加：
```
类型: CNAME
名称: www.tech
值: cname.vercel-dns.com
```

### 3. 配置重定向规则

项目的 `vercel.json` 已配置了安全头：
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

如需添加重定向，可以添加：
```json
{
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

---

## 🔄 自动部署

配置完成后，每次推送到 GitHub 都会自动部署：

```bash
# 1. 修改代码
# 2. 提交并推送
git add .
git commit -m "feat: 添加新功能"
git push origin master

# 3. Vercel 自动检测并部署（2-5 分钟）
```

### 部署预览

- **生产环境：** `master` 分支推送 → 自动部署到 `tech.ency.asia`
- **预览环境：** 其他分支推送 → 生成唯一预览 URL

---

## 📊 监控和分析

### 1. Vercel Analytics（可选）

启用 Vercel Analytics 获取访问数据：

1. 进入项目 "Analytics" 页面
2. 点击 "Enable Analytics"
3. 安装包（如果需要）：
```bash
npm install @vercel/analytics
```

4. 在 `src/app/layout.tsx` 添加：
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### 2. Speed Insights（可选）

监控页面性能：

```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

## 🐛 常见问题

### 1. 构建失败

**问题：** Build Command failed

**解决：**
```bash
# 本地测试构建
npm run build

# 检查是否有 TypeScript 错误
npm run lint

# 确保所有依赖已安装
npm install
```

### 2. 404 错误

**问题：** 页面显示 404

**解决：**
- 检查路由是否正确：`/zh/demo` 而不是 `/demo`
- 确保 `middleware.ts` 正确配置
- 检查 `vercel.json` 是否有重定向配置冲突

### 3. 环境变量未生效

**问题：** GitHub API 限制

**解决：**
1. 确保环境变量名称正确：`GITHUB_TOKEN`
2. 重新部署项目使环境变量生效
3. 检查 Token 权限是否正确

### 4. DNS 未生效

**问题：** 域名无法访问

**解决：**
1. 检查 DNS 记录是否正确配置
2. 使用 `dig` 或 `nslookup` 检查：
```bash
dig tech.ency.asia
nslookup tech.ency.asia
```
3. 等待 DNS 传播（最长 48 小时）
4. 清除浏览器缓存

### 5. SSL 证书问题

**问题：** HTTPS 不可用

**解决：**
- 等待 Vercel 自动配置 SSL（通常 5-10 分钟）
- 确保 DNS 记录正确指向 Vercel
- 在 Vercel 控制台检查 SSL 状态

---

## 📚 相关资源

- [Vercel 官方文档](https://vercel.com/docs)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [自定义域名配置](https://vercel.com/docs/concepts/projects/domains)
- [环境变量配置](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ 部署检查清单

部署完成后，确保以下项目都正常：

- [ ] ✅ 网站可以访问：`https://tech.ency.asia`
- [ ] ✅ HTTPS 正常工作（绿色锁图标）
- [ ] ✅ 中文页面正常：`https://tech.ency.asia/zh`
- [ ] ✅ 英文页面正常：`https://tech.ency.asia/en`
- [ ] ✅ Demo 页面正常：`https://tech.ency.asia/zh/demo`
- [ ] ✅ 所有静态资源加载正常（图片、CSS、JS）
- [ ] ✅ Matrix 动画效果正常
- [ ] ✅ 移动端适配正常
- [ ] ✅ 自动部署工作正常（推送后自动部署）

---

## 🎉 完成！

恭喜！你的项目已成功部署到 Vercel！

现在可以访问：
- **生产环境：** https://tech.ency.asia
- **Vercel 仪表板：** https://vercel.com/dashboard

如有问题，请查看 Vercel 控制台的构建日志或联系支持。

