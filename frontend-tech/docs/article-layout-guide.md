# 文章三栏布局使用指南

## 📦 已安装的组件

我已经为你创建了完整的文章页面三栏布局方案，包含以下组件：

### 1. `ArticleLayout` - 主布局组件
- **位置**: `src/components/ArticleLayout.tsx`
- **功能**: 提供响应式的三栏布局（桌面端）/两栏（平板端）/单栏（移动端）
- **特点**: 
  - 基于 shadcn 的 `Resizable` 组件，用户可以调整面板大小
  - 自动响应式布局
  - 左侧目录和右侧边栏可选显示

### 2. `TableOfContents` - 交互式目录组件
- **位置**: `src/components/TableOfContents.tsx`
- **功能**: 自动高亮当前阅读章节，支持平滑滚动
- **特点**:
  - 使用 IntersectionObserver 自动追踪阅读位置
  - 多级标题缩进显示
  - 点击跳转到对应章节

### 3. `ArticleSidebar` - 右侧边栏组件
- **位置**: `src/components/ArticleSidebar.tsx`
- **功能**: 展示文章元信息、相关文章、标签等
- **包含内容**:
  - 文章信息（发布时间、阅读时长、浏览量）
  - 作者信息卡片
  - 分类和标签
  - 相关文章推荐
  - 分享按钮（复制链接、Twitter）

## 🚀 快速开始

### 基本用法

```tsx
import { ArticleLayout } from '@/components/ArticleLayout';
import { TableOfContents } from '@/components/TableOfContents';
import { ArticleSidebar } from '@/components/ArticleSidebar';

export default function ArticlePage() {
  // 定义目录项
  const tocItems = [
    { id: 'introduction', title: '介绍', level: 2 },
    { id: 'features', title: '特性', level: 2 },
    { id: 'auto-execute', title: '自动执行', level: 3 },
  ];

  // 定义文章元数据
  const metadata = {
    publishDate: '2025-01-15',
    readTime: 12,
    tags: ['Web3', '智能合约'],
    category: 'Web3 & 区块链',
  };

  return (
    <ArticleLayout
      tableOfContents={<TableOfContents items={tocItems} />}
      sidebar={<ArticleSidebar metadata={metadata} />}
    >
      <h1 id="title">文章标题</h1>
      <h2 id="introduction">介绍</h2>
      <p>文章内容...</p>
      {/* 更多内容 */}
    </ArticleLayout>
  );
}
```

## 📋 详细配置

### ArticleLayout Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tableOfContents` | `ReactNode` | - | 左侧目录内容 |
| `children` | `ReactNode` | - | 中间主内容（必需） |
| `sidebar` | `ReactNode` | - | 右侧边栏内容 |
| `showToc` | `boolean` | `true` | 是否显示左侧目录 |
| `showSidebar` | `boolean` | `true` | 是否显示右侧边栏 |

### TableOfContents Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `items` | `TocItem[]` | 目录项数组 |

**TocItem 结构**：
```typescript
interface TocItem {
  id: string;        // 对应的 heading ID
  title: string;     // 显示的标题文本
  level: number;     // 标题级别 (1-6)
}
```

### ArticleSidebar Props

| 属性 | 类型 | 说明 |
|------|------|------|
| `metadata` | `ArticleMetadata` | 文章元信息 |
| `relatedArticles` | `RelatedArticle[]` | 相关文章列表（可选）|

**ArticleMetadata 结构**：
```typescript
interface ArticleMetadata {
  publishDate?: string;
  updateDate?: string;
  readTime?: number;        // 分钟
  views?: number;
  author?: {
    name: string;
    email?: string;
    avatar?: string;
  };
  tags?: string[];
  category?: string;
}
```

## 🎯 实际使用场景

### 场景 1: 与 Velite 配合使用

```tsx
import { posts } from '#site/content';
import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/ArticleLayout';
import { TableOfContents } from '@/components/TableOfContents';
import { ArticleSidebar } from '@/components/ArticleSidebar';

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug.join('/');
  const post = posts.find((p) => p.slug === slug);
  
  if (!post) notFound();

  // 从 post.headings 提取目录
  const tocItems = post.headings.map(h => ({
    id: h.slug,
    title: h.text,
    level: h.level,
  }));

  // 构建元数据
  const metadata = {
    publishDate: post.date,
    readTime: post.readingTime,
    tags: post.tags,
    category: post.category,
  };

  return (
    <ArticleLayout
      tableOfContents={<TableOfContents items={tocItems} />}
      sidebar={<ArticleSidebar metadata={metadata} />}
    >
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </ArticleLayout>
  );
}
```

### 场景 2: 仅显示目录（隐藏右侧边栏）

```tsx
<ArticleLayout
  tableOfContents={<TableOfContents items={tocItems} />}
  showSidebar={false}
>
  {children}
</ArticleLayout>
```

### 场景 3: 简单文章（无目录无边栏）

```tsx
<ArticleLayout
  showToc={false}
  showSidebar={false}
>
  {children}
</ArticleLayout>
```

## 🎨 响应式布局说明

### 桌面端（≥ 1024px）
```
┌──────────┬──────────────────┬──────────┐
│ 目录(20%)│  主内容(55%)     │ 边栏(25%)│
│          │                  │          │
│ • 可调整 │  • 最大宽度 800px│ • 固定   │
│ • 粘性   │  • prose 样式    │ • 粘性   │
│ • 滚动   │                  │ • 滚动   │
└──────────┴──────────────────┴──────────┘
```

### 平板端（768px - 1023px）
```
┌──────────┬──────────────────┐
│ 目录(25%)│  主内容(75%)     │
│          │                  │
│          │  边栏移到文章底部  │
└──────────┴──────────────────┘
```

### 移动端（< 768px）
```
┌──────────────────────┐
│  可折叠目录          │
├──────────────────────┤
│                      │
│  主内容（全宽）      │
│                      │
├──────────────────────┤
│  边栏（底部）        │
└──────────────────────┘
```

## 🛠️ 自定义样式

### 修改目录样式

```tsx
// 在 TableOfContents 外层包裹自定义样式
<div className="border-l-2 border-muted pl-4">
  <TableOfContents items={tocItems} />
</div>
```

### 修改主内容样式

```tsx
// ArticleLayout 已经应用了 prose 样式，可以覆盖
<ArticleLayout>
  <article className="prose-lg prose-headings:text-primary">
    {children}
  </article>
</ArticleLayout>
```

### 添加进度条

可以结合 `react-scroll-progress-bar` 等库：

```tsx
import ScrollProgressBar from 'react-scroll-progress-bar';

<div>
  <ScrollProgressBar bgcolor="#6366f1" />
  <ArticleLayout>
    {children}
  </ArticleLayout>
</div>
```

## 📝 注意事项

1. **标题 ID**: 确保文章中的标题都有对应的 ID，与 `TocItem` 中的 `id` 匹配
   ```tsx
   <h2 id="introduction">介绍</h2>
   ```

2. **Prose 样式**: 组件已应用 `@tailwindcss/typography` 插件的 prose 样式
   - 如需自定义，修改 `tailwind.config.js` 中的 prose 配置

3. **性能优化**: 
   - 目录项超过 50 个时，考虑只显示 h2 级别
   - 长文章（>10000字）考虑分页或懒加载

4. **SEO**: 记得为文章页面添加正确的 meta 标签
   ```tsx
   export const metadata: Metadata = {
     title: post.title,
     description: post.description,
   };
   ```

## 🔧 需要的依赖

以下依赖已通过 shadcn 安装：
- ✅ `resizable` - 可调整大小的面板
- ✅ `scroll-area` - 滚动区域
- ✅ `card` - 卡片组件
- ✅ `badge` - 徽章组件

## 🎯 下一步

1. **代码高亮**: 集成 `rehype-prism-plus` 或 `shiki`
2. **复制代码按钮**: 添加代码块工具栏
3. **评论系统**: 集成 Giscus 或 Disqus
4. **阅读进度**: 添加顶部进度条
5. **打印样式**: 优化打印版本布局
6. **暗色模式**: 已支持，通过 ThemeToggle 切换

## 📚 参考资料

- [shadcn/ui Resizable](https://ui.shadcn.com/docs/components/resizable)
- [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin)
- [MDX Documentation](https://mdxjs.com/) 