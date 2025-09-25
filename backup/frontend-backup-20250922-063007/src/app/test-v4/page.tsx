'use client';

export default function TestV4() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-primary-500">
          🎉 Tailwind CSS v4 测试页面
        </h1>
        
        {/* 测试 @theme 配置的颜色 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">OKLCH 颜色测试</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="h-20 bg-primary-50 rounded-lg flex items-center justify-center text-xs">
              primary-50
            </div>
            <div className="h-20 bg-primary-500 rounded-lg flex items-center justify-center text-white text-xs">
              primary-500
            </div>
            <div className="h-20 bg-primary-600 rounded-lg flex items-center justify-center text-white text-xs">
              primary-600
            </div>
            <div className="h-20 bg-primary-900 rounded-lg flex items-center justify-center text-white text-xs">
              primary-900
            </div>
          </div>
        </div>

        {/* 测试自定义间距 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">自定义间距测试</h2>
          <div className="space-y-4">
            <div className="w-18 h-18 bg-primary-500 rounded-lg flex items-center justify-center text-white">
              w-18 h-18
            </div>
            <div className="w-72 h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white">
              w-72 (18rem width)
            </div>
          </div>
        </div>

        {/* 测试 Tailwind v4 的新特性 */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">现代 CSS 特性</h2>
          <div className="p-6 bg-primary-50 rounded-xl">
            <p className="text-balance leading-relaxed">
              这段文字使用了 text-balance 类，这是 Tailwind v4 支持的现代 CSS 特性。
              它可以让文本在多行时保持更好的平衡排版效果。
            </p>
          </div>
        </div>

        {/* 版本信息 */}
        <div className="mt-12 p-6 border border-primary-500/20 rounded-xl bg-primary-50/50">
          <h3 className="text-lg font-semibold mb-2">✅ Tailwind CSS v4.0 特性</h3>
          <ul className="space-y-2 text-sm">
            <li>🎨 OKLCH 颜色空间 - 更鲜艳的颜色</li>
            <li>⚡ Oxide 引擎 - 3-180倍性能提升</li>
            <li>🔧 CSS-first 配置 - @theme 指令</li>
            <li>📐 自定义间距 - w-18, w-72</li>
            <li>🆕 现代 CSS - text-balance</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 