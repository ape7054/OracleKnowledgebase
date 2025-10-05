import { SiteHeader } from '@/components/SiteHeader'
import { ToolsFilter } from '@/components/ToolsFilter'
import { Separator } from "@/components/ui/separator"
import { tools, toolCategories } from '@/config/tools'
import { getTranslations } from 'next-intl/server'

interface ToolsPageProps {
  params: Promise<{ locale: string }>
}

export default async function ToolsPage({ params }: ToolsPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航条 */}
      <SiteHeader />

      {/* 头部区域 */}
      <section className="py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-4xl">
              🛠️
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('tools.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('tools.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{t('tools.totalTools', { count: tools.length })}</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 搜索、筛选和工具网格 - 客户端组件 */}
      <ToolsFilter tools={tools} categories={toolCategories} />
    </div>
  )
}