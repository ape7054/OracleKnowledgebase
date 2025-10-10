# 移动端响应式设计规范

本文档提供了项目中移动端响应式设计的标准规范和最佳实践。遵循这些规范，新页面将自动适配移动端，无需额外的适配工作。

## 📱 断点系统

项目使用 Tailwind CSS 的默认断点系统：

```
sm: 640px   // 小型设备
md: 768px   // 中型设备（平板）
lg: 1024px  // 大型设备（桌面）
xl: 1280px  // 超大设备
2xl: 1536px // 超超大设备
```

**主要断点：** `md:` (768px) 是移动端和桌面端的分界线

## 🎨 标准样式模式

### 1. Container 容器

```tsx
// ✅ 正确示例
<div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
  {/* 内容 */}
</div>
```

**规则：**
- 移动端：`px-4` (16px)
- 平板：`px-6` (24px)  
- 桌面：`px-8` (32px)

### 2. Section 间距

```tsx
// ✅ 正确示例
<section className="py-12 md:py-16 lg:py-24">
  {/* 内容 */}
</section>
```

**规则：**
- 移动端：`py-12` (48px)
- 平板：`py-16` (64px)
- 桌面：`py-24` (96px)

### 3. 标题字体大小

```tsx
// H1 标题
<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">

// H2 标题  
<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">

// H3 标题
<h3 className="text-xl md:text-2xl font-semibold">

// H4 标题
<h4 className="text-lg md:text-xl font-semibold">

// 正文
<p className="text-sm md:text-base">
```

### 4. 网格布局

```tsx
// ✅ 单列到多列的响应式网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
  {/* 卡片 */}
</div>
```

**规则：**
- 移动端：单列布局 (`grid-cols-1`)
- 平板：2 列 (`md:grid-cols-2`)
- 桌面：3 列 (`lg:grid-cols-3`)
- 间距：移动端 `gap-4`，桌面端 `gap-6`

### 5. Flexbox 布局

```tsx
// ✅ 响应式 Flex 方向
<div className="flex flex-col sm:flex-row items-center gap-3">
  {/* 内容 */}
</div>
```

**规则：**
- 移动端：纵向排列 (`flex-col`)
- 小屏幕以上：横向排列 (`sm:flex-row`)

### 6. 按钮和链接

```tsx
// ✅ 响应式按钮
<Button className="w-full sm:w-auto min-h-[44px]">
  {/* 按钮文字 */}
</Button>

// ✅ 触摸目标
<Link className="min-h-[44px] flex items-center">
  {/* 链接文字 */}
</Link>
```

**规则：**
- **最小触摸目标：** 44x44px（Apple HIG 和 Material Design 标准）
- 移动端：按钮全宽 (`w-full`)
- 桌面端：按钮自适应宽度 (`sm:w-auto`)

### 7. 卡片内边距

```tsx
// ✅ 响应式卡片
<Card>
  <CardContent className="p-4 md:p-6 space-y-3 md:space-y-4">
    {/* 内容 */}
  </CardContent>
</Card>
```

**规则：**
- 移动端：`p-4` (16px)
- 桌面端：`p-6` (24px)
- 内部间距：移动端 `space-y-3`，桌面端 `space-y-4`

### 8. 图标大小

```tsx
// ✅ 响应式图标
<Icon className="h-4 w-4 md:h-5 md:w-5" />

// ✅ 大图标
<Icon className="h-8 w-8 md:h-10 md:w-10" />
```

**规则：**
- 小图标：移动端 4x4，桌面端 5x5
- 中图标：移动端 6x6，桌面端 8x8
- 大图标：移动端 8x8，桌面端 10x10

## 📦 常用组件模板

### 页面头部

```tsx
<section className="py-12 md:py-16 lg:py-20 border-b border-border/40">
  <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
    <div className="text-center space-y-4 md:space-y-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold px-4">
        {/* 标题 */}
      </h1>
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground px-4">
        {/* 副标题 */}
      </p>
    </div>
  </div>
</section>
```

### 内容区域

```tsx
<section className="py-12 md:py-16 lg:py-24">
  <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 md:mb-12">
      {/* 区域标题 */}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* 卡片内容 */}
    </div>
  </div>
</section>
```

### 卡片组件

```tsx
<Card className="hover:shadow-lg transition-all">
  <CardHeader className="p-4 md:p-6">
    <CardTitle className="text-lg md:text-xl">
      {/* 标题 */}
    </CardTitle>
  </CardHeader>
  <CardContent className="p-4 pt-0 md:p-6 md:pt-0 space-y-3 md:space-y-4">
    <CardDescription className="text-sm">
      {/* 描述 */}
    </CardDescription>
    <Button className="w-full sm:w-auto min-h-[44px]">
      {/* 按钮 */}
    </Button>
  </CardContent>
</Card>
```

## 🎯 触摸优化规则

1. **最小触摸目标：** 所有可点击元素最小 44x44px
2. **按钮内边距：** 移动端增加内边距确保触摸区域
3. **间距：** 相邻可点击元素之间至少 8px 间距
4. **表单元素：** 输入框高度至少 44px

## 🖼️ 图片优化

```tsx
// ✅ 使用 Next.js Image 组件
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="描述"
  width={800}
  height={600}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="w-full h-auto"
/>
```

## 📝 文字处理

### 文字截断

```tsx
// 单行截断
<p className="truncate max-w-[200px] md:max-w-none">

// 多行截断
<p className="line-clamp-2">
```

### 响应式字体

```tsx
// 减小移动端字体
<p className="text-xs md:text-sm lg:text-base">
```

## 🎬 动画优化

### 尊重用户偏好

```tsx
// 检测用户是否偏好减少动画
const prefersReducedMotion = useReducedMotion()

{!prefersReducedMotion && (
  <motion.div animate={{ ... }}>
    {/* 动画内容 */}
  </motion.div>
)}
```

### 移动端简化动画

```tsx
// 移动端禁用复杂动画，桌面端启用
<div className="transition-transform md:hover:scale-105">
```

## 🔍 导航优化

### 汉堡菜单（已实现）

移动端使用 `MobileNav` 组件（汉堡菜单 + 侧边抽屉）：

```tsx
import { MobileNav } from '@/components/MobileNav'

<MobileNav /> {/* 仅在 md 以下显示 */}
```

### 导航栏

```tsx
<nav className="sticky top-0 z-50">
  <div className="container mx-auto px-4 md:px-6 lg:px-8">
    <div className="flex h-14 md:h-16 items-center justify-between">
      {/* Logo + MobileNav */}
      {/* Desktop Nav */}
      {/* Actions */}
    </div>
  </div>
</nav>
```

## ✅ 检查清单

新页面上线前，请确认：

- [ ] 在 320px、375px、425px、768px、1024px 宽度下测试
- [ ] 所有可点击元素至少 44x44px
- [ ] 文字在移动端可读（最小 12px）
- [ ] 图片使用 Next.js Image 组件并设置 sizes
- [ ] 按钮在移动端全宽或有足够的触摸区域
- [ ] 长文本正确截断或换行
- [ ] 导航在移动端可访问
- [ ] 表单在移动端易于填写
- [ ] 动画不会影响性能
- [ ] 横屏模式正常工作

## 🚀 快速开始模板

```tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <SiteHeader />

      {/* Hero Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="text-center space-y-4 md:space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              页面标题
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
              页面描述
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Cards */}
          </div>
        </div>
      </section>

      {/* Back to Top */}
      <BackToTop />
    </div>
  )
}
```

## 📚 参考资源

- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Apple Human Interface Guidelines - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Material Design - Touch Targets](https://m3.material.io/foundations/accessible-design/accessibility-basics)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)

---

**最后更新：** 2025-10-10
**维护者：** AI Assistant

