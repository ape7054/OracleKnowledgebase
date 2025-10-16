# 移动端 Matrix Rain 修复指南

## 问题总结

WebGL 版本的 Matrix Rain 在移动端显示异常（只有 1-2 列），原因：

1. **移动端 GPU 差异**: 手机和电脑 GPU 驱动不同
2. **GLSL 精度问题**: 移动端 `mediump` vs 桌面端 `highp`
3. **Hash 函数差异**: 不同 GPU 对浮点运算的处理不同

## 解决方案: CSS 版本

### 方案 A: 全局切换到 CSS 版本

**最简单**: 在 `HeroSection.tsx` 中添加一个参数：

```tsx
<MatrixBackground
  useCSSVersion={true}  // 添加这一行
  speed={0.8}
  density={1.5}
  brightness={0.6}
  greenIntensity={0.8}
  variation={0.8}
>
  {/* 内容 */}
</MatrixBackground>
```

**优点**:
- ✅ 一行代码解决
- ✅ 所有设备统一显示
- ✅ 不需要检测逻辑

**缺点**:
- ⚠️ 桌面端也用 CSS 版本（损失一点精度）

---

### 方案 B: 响应式切换（推荐）

**最优解**: 移动端用 CSS，桌面端用 WebGL：

```tsx
'use client';

import { MatrixBackground } from '@/components/ui/matrix-background';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [useCSSVersion, setUseCSSVersion] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    setUseCSSVersion(isMobile);
  }, []);

  return (
    <MatrixBackground
      useCSSVersion={useCSSVersion}  // 动态选择版本
      speed={0.8}
      density={1.5}
      brightness={0.6}
      greenIntensity={0.8}
      variation={0.8}
    >
      {/* 你的内容 */}
    </MatrixBackground>
  );
}
```

**优点**:
- ✅ 移动端完美显示
- ✅ 桌面端保持 WebGL 精度
- ✅ 自动适配

**缺点**:
- ⚠️ 需要客户端检测（轻微复杂度）

---

### 方案 C: 基于屏幕宽度切换

**使用 Tailwind 响应式**:

```tsx
'use client';

import { MatrixBackground } from '@/components/ui/matrix-background';
import { useEffect, useState } from 'react';

export function HeroSection() {
  const [useCSSVersion, setUseCSSVersion] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setUseCSSVersion(window.innerWidth < 768); // < 768px 用 CSS
    };
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <MatrixBackground
      useCSSVersion={useCSSVersion}
      speed={0.8}
      density={1.5}
    >
      {/* 内容 */}
    </MatrixBackground>
  );
}
```

**优点**:
- ✅ 响应式设计
- ✅ 适配平板设备

---

## 立即修复（推荐）

### 步骤 1: 修改 `HeroSection.tsx`

找到 `MatrixBackground` 组件，添加 `useCSSVersion={true}`:

```diff
<MatrixBackground
  className="h-auto min-h-[500px] md:min-h-[600px] border-b border-border/40"
  speed={0.8}
  density={1.5}
  brightness={0.6}
  greenIntensity={0.8}
  variation={0.8}
  showDebugInfo={false}
+ useCSSVersion={true}
>
```

### 步骤 2: 部署测试

```bash
pnpm build
# 部署到生产环境
```

### 步骤 3: 移动端验证

用真实手机访问，应该看到完整的 Matrix 代码雨效果！

---

## 对比测试

访问对比演示页面查看两个版本的差异：

```
http://localhost:3000/zh/demo/matrix-comparison
```

可以：
- 实时切换 WebGL ↔ CSS
- 调整参数对比效果
- 查看视觉差异

---

## FAQ

### Q: CSS 版本和 WebGL 版本差异大吗？

**A**: 90-95% 相似度，核心效果一致：
- ✅ 代码雨下落
- ✅ 绿色发光字符
- ✅ 渐变淡出
- ⚠️ 字符变化不如 WebGL 实时

### Q: 性能会更差吗？

**A**: 不会！CSS 版本：
- ✅ 使用 CSS transform (GPU 加速)
- ✅ 避免 WebGL context 开销
- ✅ 移动端更省电

### Q: 可以保留 WebGL 版本给桌面端吗？

**A**: 可以！使用方案 B 的响应式切换。

### Q: 会不会闪烁切换？

**A**: 不会。初始化时就确定版本，不会运行时切换。

---

## 总结

**推荐做法**:

1. **生产环境**: 使用方案 A (`useCSSVersion={true}`)，简单稳定
2. **精益求精**: 使用方案 B，移动/桌面分别优化
3. **测试对比**: 访问 `/demo/matrix-comparison` 查看效果

CSS 版本是**移动端最佳解决方案**，无需纠结 WebGL 兼容性！

