'use client'

import { AuroraBackground } from "@/components/ui/aurora-background"
import { Boxes } from "@/components/ui/background-boxes"
import { GlowingStarsBackgroundCard, GlowingStarsTitle, GlowingStarsDescription } from "@/components/ui/glowing-stars"
import { Card, CardContent } from "@/components/ui/card"

export default function TestBackgroundsPage() {
  return (
    <div className="min-h-screen">
      {/* Test 1: Aurora Background */}
      <section className="relative overflow-hidden border-b-4 border-primary">
        <AuroraBackground className="!h-auto !min-h-0">
          <div className="relative z-10 py-24">
            <div className="container mx-auto px-6 text-center">
              <h1 className="text-5xl font-bold mb-4">1. Aurora Background</h1>
              <p className="text-xl text-muted-foreground">流动的极光效果背景 - 60秒动画循环</p>
            </div>
          </div>
        </AuroraBackground>
      </section>

      {/* Test 2: Background Boxes */}
      <section className="py-24 relative overflow-hidden border-b-4 border-primary">
        <div className="absolute inset-0 w-full h-full opacity-[0.15] dark:opacity-[0.2]">
          <Boxes />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-4">2. Background Boxes</h2>
          <p className="text-xl text-muted-foreground mb-8">
            3D 网格背景 - 鼠标悬停在这个区域看效果
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 hover:shadow-xl transition-shadow">
                <CardContent className="p-0">
                  <div className="text-4xl font-bold text-primary">{i}</div>
                  <p className="text-sm text-muted-foreground">示例卡片</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Test 3: Glowing Stars */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold mb-4 text-white text-center">3. Glowing Stars Effect</h2>
          <p className="text-xl text-gray-400 mb-12 text-center">
            鼠标悬停在卡片上看星星闪烁效果
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>卡片 1</GlowingStarsTitle>
              <GlowingStarsDescription>
                这是一个使用 Glowing Stars 效果的卡片。鼠标移到卡片上方，星星会闪烁。
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>

            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>卡片 2</GlowingStarsTitle>
              <GlowingStarsDescription>
                108个星星组成的网格，悬停时会产生动画效果。
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>

            <GlowingStarsBackgroundCard>
              <GlowingStarsTitle>卡片 3</GlowingStarsTitle>
              <GlowingStarsDescription>
                适合用于展示项目、特色功能或统计数据。
              </GlowingStarsDescription>
            </GlowingStarsBackgroundCard>
          </div>
        </div>
      </section>

      {/* 说明 */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <Card>
            <CardContent className="p-8 space-y-4">
              <h3 className="text-2xl font-bold">测试说明</h3>
              <div className="space-y-2 text-muted-foreground">
                <p><strong>Aurora Background:</strong> 自动播放的极光动画，无需交互</p>
                <p><strong>Background Boxes:</strong> 鼠标悬停在区域内，网格会变色</p>
                <p><strong>Glowing Stars:</strong> 鼠标悬停在黑色卡片上，星星会闪烁发光</p>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm">
                  <strong>访问:</strong> <code>/zh/test-backgrounds</code> 或 <code>/en/test-backgrounds</code>
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  测试完成后可以删除 <code>src/app/[locale]/test-backgrounds/</code> 目录
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

