import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero 区块 */}
      <section className="relative overflow-hidden isolate min-h-[72vh] flex items-center">
        {/* 背景渐变 */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            background:
              "radial-gradient(1200px 600px at 70% 30%, hsl(var(--primary)/0.15), transparent 60%), radial-gradient(800px 400px at 20% 70%, hsl(var(--accent)/0.18), transparent 60%)",
            filter: "blur(20px)",
          }}
        />

        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground">
              ✨ 现代化着陆页
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              欢迎来到未来
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              基于 Next.js 15 + React 19 + Tailwind CSS v4 + shadcn/ui 构建的现代化应用
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="lg">开始体验</Button>
              <Button size="lg" variant="outline">
                了解更多
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features 区块 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              强大功能
            </h2>
            <p className="text-muted-foreground">
              为性能、安全性和扩展性而构建
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">🚀 高性能</CardTitle>
                <CardDescription>基于最新技术栈的极速体验</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  使用 Next.js 15 和 Turbopack 实现毫秒级的热重载和构建速度
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">🎨 现代设计</CardTitle>
                <CardDescription>精美的用户界面和体验</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  采用 shadcn/ui 组件库和 Tailwind CSS v4 最新设计系统
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardHeader>
                <CardTitle className="text-lg">⚡ 开发效率</CardTitle>
                <CardDescription>提升开发体验和生产力</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  TypeScript + ESLint + 完整的开发工具链支持
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 区块 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            准备开始了吗？
          </h2>
          <p className="text-lg text-muted-foreground">
            立即体验现代化的开发和用户体验
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="lg">立即开始</Button>
            <Button size="lg" variant="ghost">
              查看文档
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center text-sm text-muted-foreground">
            <p>© 2024 现代化着陆页. 基于 Next.js 15 + shadcn/ui 构建</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
