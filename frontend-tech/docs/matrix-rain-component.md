# Matrix Rain Component

一个兼容 React 19 的 Matrix 风格数字雨背景组件，使用原生 WebGL 实现，无需额外依赖。

## 特性

✅ **React 19 兼容** - 完全支持最新版本的 React  
✅ **高性能 WebGL** - 使用原生 WebGL 和 GLSL shader 实现流畅动画  
✅ **零额外依赖** - 不依赖 `react-shaders` 或其他第三方库  
✅ **完全可配置** - 支持速度、密度、亮度、颜色等参数调整  
✅ **响应式设计** - 自动适配不同屏幕尺寸  
✅ **TypeScript 支持** - 完整的类型定义  

## 组件说明

### MatrixRain

核心组件，直接渲染 Matrix 数字雨效果。

```tsx
import { MatrixRain } from '@/components/ui/matrix-rain';

<MatrixRain 
  speed={1.0}
  density={1.0}
  brightness={1.0}
  greenIntensity={1.0}
  variation={1.0}
  className="w-full h-full"
/>
```

### MatrixBackground

包装组件，提供背景容器和内容层，使用更简单。

```tsx
import { MatrixBackground } from '@/components/ui/matrix-background';

<MatrixBackground className="h-screen">
  <h1>Your Content Here</h1>
</MatrixBackground>
```

## 快速开始

### 基础用法

```tsx
import { MatrixBackground } from '@/components/ui/matrix-background';

export function MyComponent() {
  return (
    <MatrixBackground className="h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-white">
          Welcome to the Matrix
        </h1>
      </div>
    </MatrixBackground>
  );
}
```

### 自定义参数

```tsx
<MatrixBackground 
  speed={1.5}           // 动画速度
  density={1.2}         // 列密度
  brightness={0.8}      // 亮度
  greenIntensity={1.2}  // 绿色强度
  variation={1.5}       // 字符变化频率
>
  <YourContent />
</MatrixBackground>
```

### 在 HeroSection 中使用

替换 `AuroraBackground` 为 `MatrixBackground`：

```tsx
import { MatrixBackground } from '@/components/ui/matrix-background';

export function HeroSection() {
  return (
    <MatrixBackground className="h-auto min-h-[500px] md:min-h-[600px]">
      {/* Your hero content */}
    </MatrixBackground>
  );
}
```

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `speed` | number | 1.0 | 数字雨下落速度 (0.1-3.0 推荐) |
| `density` | number | 1.0 | 列的密度和数量 (0.5-2.0 推荐) |
| `brightness` | number | 1.0 | 字符亮度和对比度 (0.5-1.5 推荐) |
| `greenIntensity` | number | 1.0 | 绿色强度 (0.5-1.5 推荐) |
| `variation` | number | 1.0 | 字符变化随机性 (0.5-2.0 推荐) |
| `className` | string | - | 自定义 CSS 类名 |

## 预设效果

### 经典 Matrix
```tsx
<MatrixBackground speed={1.0} density={1.0} />
```

### 慢动作
```tsx
<MatrixBackground speed={0.5} density={2.0} brightness={1.2} />
```

### 快速密集
```tsx
<MatrixBackground speed={2.0} density={1.5} variation={2.0} />
```

### 低调简约
```tsx
<MatrixBackground speed={0.8} density={0.7} brightness={0.6} />
```

## 技术实现

- **WebGL**: 原生 WebGL API 渲染
- **GLSL Shader**: 自定义片段着色器实现视觉效果
- **Canvas**: HTML5 Canvas 元素作为渲染目标
- **React Hooks**: 使用 useEffect 和 useRef 管理生命周期
- **性能优化**: 
  - 防抖的 resize 处理
  - requestAnimationFrame 动画循环
  - 组件卸载时自动清理资源

## 浏览器兼容性

支持所有现代浏览器（需要 WebGL 支持）：
- Chrome/Edge 9+
- Firefox 4+
- Safari 5.1+
- Opera 12+

## 示例

更多使用示例请参考：`src/components/ui/matrix-usage-example.tsx`

## 与 shadcn matrix-shaders 的区别

原 shadcn `matrix-shaders` 组件依赖 `react-shaders@0.0.4`，仅支持 React 18。

本组件：
- ✅ 支持 React 19
- ✅ 无第三方依赖冲突
- ✅ 相同的视觉效果
- ✅ 更好的性能控制
- ✅ 完整的 TypeScript 支持

## 故障排除

### WebGL 不支持
如果浏览器不支持 WebGL，组件将显示空白背景。可以添加降级方案：

```tsx
<MatrixBackground className="bg-black">
  {/* 在不支持 WebGL 的浏览器中会显示纯黑背景 */}
</MatrixBackground>
```

### 性能问题
如果遇到性能问题，可以尝试：
- 降低 `density` 参数（减少列数）
- 降低 `variation` 参数（减少字符变化）
- 减小容器尺寸

