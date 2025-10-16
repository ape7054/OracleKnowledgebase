# DNS 配置指南

将 `tech.ency.asia` 域名指向 Vercel 部署的详细配置指南。

---

## 📋 前提条件

- ✅ 已在 Vercel 完成项目部署
- ✅ 拥有域名 `ency.asia` 的管理权限
- ✅ 能够访问域名的 DNS 管理面板

---

## 🌐 DNS 配置方案

### 方案 A：使用 A 记录（推荐）

**优点：** 更快的解析速度，更好的性能

#### 1. 登录 DNS 管理面板

根据你的域名注册商，访问对应的管理面板：
- **阿里云：** https://dns.console.aliyun.com
- **腾讯云：** https://console.cloud.tencent.com/cns
- **Cloudflare：** https://dash.cloudflare.com
- **GoDaddy：** https://dcc.godaddy.com/manage/dns
- **Namecheap：** https://ap.www.namecheap.com/domains/list

#### 2. 找到 `ency.asia` 域名

在域名列表中找到 `ency.asia`，点击 "解析设置" 或 "DNS 管理"。

#### 3. 添加 A 记录

点击 "添加记录" 或 "Add Record"，填写以下信息：

```
记录类型 (Type):     A
主机记录 (Name):     tech
记录值 (Value):      76.76.21.21
TTL:                 3600 (或选择"自动")
```

**不同 DNS 提供商的界面：**

##### 阿里云
```
记录类型：A
主机记录：tech
解析线路：默认
记录值：76.76.21.21
TTL：10 分钟
```

##### 腾讯云
```
主机记录：tech
记录类型：A
线路类型：默认
记录值：76.76.21.21
TTL：600
```

##### Cloudflare
```
Type：A
Name：tech
IPv4 address：76.76.21.21
Proxy status：DNS only（灰色云朵）
TTL：Auto
```

#### 4. 保存配置

点击 "确定" 或 "Save" 保存配置。

---

### 方案 B：使用 CNAME 记录

**优点：** 如果 Vercel 更改 IP 地址，不需要手动更新

#### 1. 添加 CNAME 记录

```
记录类型 (Type):     CNAME
主机记录 (Name):     tech
记录值 (Value):      cname.vercel-dns.com
TTL:                 3600
```

**注意：** CNAME 记录不能用于根域名（如 `ency.asia`），只能用于子域名（如 `tech.ency.asia`）。

---

## 🔍 验证 DNS 配置

### 方法 1：在线工具

访问 https://www.whatsmydns.net/

1. 输入 `tech.ency.asia`
2. 选择记录类型：A 或 CNAME
3. 点击 "Search"
4. 查看全球 DNS 传播情况

### 方法 2：命令行工具

#### Windows (PowerShell)

```powershell
# 查询 A 记录
nslookup tech.ency.asia

# 或使用 Resolve-DnsName
Resolve-DnsName tech.ency.asia -Type A
```

#### macOS / Linux

```bash
# 查询 A 记录
dig tech.ency.asia A

# 或使用 nslookup
nslookup tech.ency.asia

# 查询 CNAME 记录
dig tech.ency.asia CNAME
```

### 期望的结果

**使用 A 记录：**
```
tech.ency.asia.    3600    IN    A    76.76.21.21
```

**使用 CNAME 记录：**
```
tech.ency.asia.    3600    IN    CNAME    cname.vercel-dns.com.
```

---

## ⏱️ DNS 生效时间

| 阶段 | 预计时间 | 说明 |
|------|----------|------|
| DNS 提供商更新 | 1-5 分钟 | 记录保存后立即生效 |
| 本地 DNS 缓存 | 5-30 分钟 | 取决于 TTL 设置 |
| 全球 DNS 传播 | 30 分钟 - 2 小时 | 大部分地区生效 |
| 完全传播 | 2-48 小时 | 极少数地区可能需要更长时间 |

**加速生效的方法：**

1. **降低 TTL 值：** 在修改记录前，先将 TTL 降低到 300（5 分钟）
2. **清除本地 DNS 缓存：**
   ```bash
   # Windows
   ipconfig /flushdns
   
   # macOS
   sudo dscacheutil -flushcache
   sudo killall -HUP mDNSResponder
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```
3. **使用无痕模式：** 浏览器无痕模式访问，避免浏览器缓存

---

## 🔐 SSL 证书配置

### Vercel 自动 SSL

Vercel 会自动为你的域名配置 SSL 证书：

1. **DNS 验证成功后：** 5-10 分钟内自动颁发证书
2. **证书类型：** Let's Encrypt 免费证书
3. **自动续期：** 到期前自动续期
4. **强制 HTTPS：** 自动将 HTTP 重定向到 HTTPS

### 验证 SSL 状态

#### 在 Vercel 控制台

1. 进入项目 → **Settings** → **Domains**
2. 找到 `tech.ency.asia`
3. 查看状态：
   - ✅ **Valid Configuration** - DNS 配置正确
   - ✅ **SSL Active** - 证书已生效
   - ⏳ **Pending** - 等待 DNS 生效
   - ❌ **Invalid Configuration** - DNS 配置错误

#### 浏览器测试

访问 `https://tech.ency.asia`：
- ✅ 地址栏显示绿色锁图标
- ✅ 点击锁图标，显示 "连接是安全的"
- ✅ 证书信息显示 "Let's Encrypt"

#### SSL 检测工具

使用 SSL Labs 测试：
https://www.ssllabs.com/ssltest/analyze.html?d=tech.ency.asia

---

## 🌍 可选：配置 www 子域名

如果需要 `www.tech.ency.asia` 也能访问：

### 1. 添加 DNS 记录

**使用 A 记录：**
```
记录类型：A
主机记录：www.tech
记录值：76.76.21.21
TTL：3600
```

**使用 CNAME 记录（推荐）：**
```
记录类型：CNAME
主机记录：www.tech
记录值：tech.ency.asia
TTL：3600
```

### 2. 在 Vercel 添加域名

1. 进入项目 → **Settings** → **Domains**
2. 点击 **Add**
3. 输入 `www.tech.ency.asia`
4. 选择 "Redirect to tech.ency.asia" （可选）

---

## 📊 常见 DNS 记录说明

| 记录类型 | 用途 | 示例 |
|----------|------|------|
| A | 将域名指向 IPv4 地址 | `76.76.21.21` |
| AAAA | 将域名指向 IPv6 地址 | `2606:4700:...` |
| CNAME | 将域名指向另一个域名 | `cname.vercel-dns.com` |
| TXT | 文本记录，用于域名验证 | `vercel-verify=...` |
| MX | 邮件服务器记录 | `10 mail.example.com` |

---

## 🐛 常见问题

### 1. DNS 解析正确但网站无法访问

**可能原因：**
- DNS 缓存未清除
- Vercel 项目未正确配置域名
- SSL 证书尚未生效

**解决方法：**
```bash
# 清除 DNS 缓存
ipconfig /flushdns  # Windows

# 使用无痕模式访问
# 等待 10-15 分钟让 SSL 证书生效
```

### 2. SSL 证书一直显示 "Pending"

**可能原因：**
- DNS 记录配置错误
- DNS 尚未完全传播

**解决方法：**
1. 验证 DNS 记录是否正确：`nslookup tech.ency.asia`
2. 确认返回的 IP 是 `76.76.21.21`
3. 在 Vercel 点击 "Refresh" 重新验证
4. 等待 30 分钟后重试

### 3. 使用 Cloudflare 代理导致问题

**如果使用 Cloudflare：**

**选项 1：关闭代理（推荐）**
- 点击橙色云朵变成灰色（DNS only）
- 让 Vercel 直接管理 SSL

**选项 2：使用 Cloudflare 代理**
- 在 Cloudflare 将 SSL 模式设为 "Full (strict)"
- 确保 Vercel 和 Cloudflare 的 SSL 都正常

### 4. 多个 A 记录冲突

**问题：** 如果已存在 `tech` 的 A 记录

**解决方法：**
1. 删除旧的 `tech` A 记录
2. 只保留一条指向 Vercel 的记录
3. 保存并等待生效

---

## ✅ 配置完成检查清单

部署完成后，确认以下项目：

- [ ] DNS 记录已添加（A 或 CNAME）
- [ ] DNS 解析正确：`nslookup tech.ency.asia` 返回正确 IP
- [ ] Vercel 域名状态显示 "Valid Configuration"
- [ ] SSL 证书状态显示 "Active"
- [ ] `https://tech.ency.asia` 可以访问
- [ ] HTTPS 连接显示绿色锁图标
- [ ] HTTP 自动重定向到 HTTPS
- [ ] 中文页面正常：`https://tech.ency.asia/zh`
- [ ] 英文页面正常：`https://tech.ency.asia/en`

---

## 🎉 完成！

恭喜！你的域名 `tech.ency.asia` 已成功配置并指向 Vercel 部署！

现在你可以：
- ✅ 通过自定义域名访问网站
- ✅ 享受免费的 SSL 证书和 CDN 加速
- ✅ 自动部署：每次推送代码后自动更新

---

## 📚 相关资源

- [Vercel 域名配置文档](https://vercel.com/docs/concepts/projects/domains)
- [DNS 记录类型说明](https://www.cloudflare.com/learning/dns/dns-records/)
- [SSL/TLS 最佳实践](https://www.ssllabs.com/projects/best-practices/)
- [DNS 传播检查工具](https://www.whatsmydns.net/)

