# 🚀 快速部署到 Vercel

## 最快部署方式（5 分钟）

### 1️⃣ 推送代码到 GitHub

```bash
git add .
git commit -m "准备部署到 Vercel"
git push origin master
```

### 2️⃣ 在 Vercel 导入项目

1. 打开 https://vercel.com 并用 GitHub 登录
2. 点击 **"Add New..." → "Project"**
3. 选择你的 `frontend-tech` 仓库
4. 点击 **"Import"**
5. 保持所有默认设置
6. 点击 **"Deploy"**

等待 2-5 分钟，部署完成！

### 3️⃣ 配置域名 tech.ency.asia

**在 Vercel：**
1. 进入项目 → **Settings** → **Domains**
2. 输入 `tech.ency.asia`，点击 **Add**

**在你的 DNS 提供商（阿里云/腾讯云等）：**

添加 A 记录：
```
类型: A
名称: tech
值: 76.76.21.21
TTL: 3600
```

或添加 CNAME 记录：
```
类型: CNAME
名称: tech
值: cname.vercel-dns.com
TTL: 3600
```

### 4️⃣ 等待生效

- DNS 生效：5-30 分钟
- SSL 证书：自动配置（5 分钟内）

---

## 🔍 验证部署

访问以下地址确认：

```
✅ https://tech.ency.asia
✅ https://tech.ency.asia/zh
✅ https://tech.ency.asia/en
✅ https://tech.ency.asia/zh/demo
```

---

## 🔄 后续更新

以后只需要：

```bash
git add .
git commit -m "更新内容"
git push
```

Vercel 会自动检测并部署！

---

完整文档请查看：[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

