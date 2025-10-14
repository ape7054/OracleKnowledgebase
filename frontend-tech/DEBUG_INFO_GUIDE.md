# Matrix Rain 调试信息面板使用指南

## 📱 已启用调试信息

调试信息面板已在关于页面的 Hero 区域启用。

## 🔍 如何查看

### 在手机上
1. 打开你的网站：`https://your-site.com/zh/about`
2. 在页面右上角会看到一个黑色半透明的调试面板
3. 面板显示实时的 WebGL 状态信息

### 调试面板内容

```
Matrix Rain Debug
━━━━━━━━━━━━━━━
Canvas:    390x300     ← Canvas 实际尺寸
WebGL:     SUCCESS     ← WebGL 初始化状态
GPU:       Apple GPU   ← GPU 供应商
Renderer:  ...         ← 渲染器详情
```

## 📊 状态说明

### Canvas 尺寸
- ✅ **正常值**: `390x300` 或其他非零值
- ❌ **异常值**: `0x0` (红色显示)
  - 说明: Canvas 尺寸为 0，可能导致渲染失败

### WebGL 状态
- ✅ **SUCCESS** (绿色) - WebGL 初始化成功
- ⚠️ **Initializing...** (黄色) - 正在初始化
- ⚠️ **Checking dimensions...** (黄色) - 检查尺寸中
- ⚠️ **Zero dimensions, retrying...** (黄色) - 尺寸为 0，重试中
- ❌ **WebGL NOT SUPPORTED** (黄色) - WebGL 不支持

### GPU 信息
- 显示 GPU 供应商名称 (如 Apple, Google, Qualcomm)
- 显示渲染器详细信息

### 错误信息
如果有错误，会在底部显示红色错误消息

## 🐛 常见问题诊断

### 问题 1: Canvas 尺寸显示 0x0
**可能原因**:
- 父容器没有设置高度
- CSS 导致 canvas 不可见

**解决方案**:
- 检查父容器的 CSS
- 等待几秒看是否自动重试成功

### 问题 2: WebGL 状态一直显示 "Initializing..."
**可能原因**:
- Canvas 一直无法获得正确尺寸
- WebGL 上下文创建延迟

**解决方案**:
- 刷新页面重试
- 检查浏览器是否支持 WebGL

### 问题 3: WebGL 显示 "NOT SUPPORTED"
**可能原因**:
- 浏览器不支持 WebGL
- WebGL 被禁用
- 设备 GPU 不支持

**解决方案**:
- 更新浏览器到最新版本
- 检查浏览器设置中的硬件加速

### 问题 4: 成功初始化但只显示一条线
**如果看到**:
```
Canvas:    390x300     ✅
WebGL:     SUCCESS     ✅
GPU:       Apple GPU   ✅
```

**但效果仍不正常**，可能原因：
- `density` 参数过低
- Shader 编译问题
- 移动设备性能限制

**下一步**:
1. 截图调试面板
2. 打开浏览器控制台（需要 Chrome Remote Debugging）
3. 查找 `[Matrix Rain]` 开头的日志

## 🔧 如何关闭调试信息

编辑 `src/components/about/HeroSection.tsx`:

```tsx
<MatrixBackground 
  // ...其他参数
  showDebugInfo={false}  // ← 改为 false 或删除这行
>
```

## 📸 请提供的信息

如果 Matrix 效果仍然不正常，请提供：

1. **调试面板截图** - 显示所有信息
2. **设备信息**:
   - 手机型号
   - 浏览器名称和版本
   - 操作系统版本
3. **现象描述** - 看到什么效果（一条线、黑屏、等等）

## 🎯 预期的正常状态

```
Matrix Rain Debug
━━━━━━━━━━━━━━━
Canvas:    390x844        ✅ 非零尺寸
WebGL:     SUCCESS        ✅ 初始化成功
GPU:       Apple GPU      ✅ 有 GPU 信息
Renderer:  Apple A15 GPU  ✅ 有渲染器信息
```

如果所有指标都正常但效果不对，问题可能在参数配置或移动设备的 WebGL 具体实现上。

---

**修复版本**: v1.2.0 (调试信息面板)
**更新日期**: 2025-10-13

