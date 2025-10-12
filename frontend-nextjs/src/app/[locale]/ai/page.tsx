import { SiteHeader } from '@/components/SiteHeader'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlurFade } from "@/components/ui/blur-fade"
import { Boxes } from '@/components/ui/background-boxes'
import { aiProjects, projectCategories } from '@/config/ai-projects'
import { AIProjectCard } from '@/components/AIProjectCard'
import { AITimeline } from '@/components/AITimeline'
import { LLMRankingTable } from '@/components/LLMRankingTable'
import { getTranslations } from 'next-intl/server'
import aiUpdatesData from '@/data/ai-updates.json'
import { Bot, Construction } from 'lucide-react'

interface AIPageProps {
  params: Promise<{ locale: string }>
}

interface ProjectUpdate {
  id: string
  projectId: string
  date: string
  type: 'tech' | 'industry' | 'funding' | 'application' | 'other'
  title: {
    en: string
    zh: string
  }
  summary: {
    en: string
    zh: string
  }
  sourceUrl?: string
}

export default async function AIPage({ params }: AIPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  // 获取每个项目的最新更新
  const getLatestUpdate = (projectId: string) => {
    const projectUpdates = (aiUpdatesData as ProjectUpdate[])
      .filter((update) => update.projectId === projectId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    return projectUpdates.length > 0 ? {
      date: projectUpdates[0].date,
      type: projectUpdates[0].type
    } : undefined
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航条 */}
      <SiteHeader />

      {/* 头部区域 */}
      <section className="py-12 md:py-16 lg:py-20 border-b border-border/40 relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
        {/* Background Boxes 动态背景 - 放在底层 */}
        <Boxes className="absolute inset-0 z-0" />
        
        {/* 渐变遮罩 - 保护内容可读性 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/70 pointer-events-none z-10" />
        
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl relative z-20 pointer-events-none">
          <BlurFade delay={0.1} inView>
            <div className="text-center space-y-4 md:space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-xl pointer-events-auto">
                <Bot className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text pointer-events-auto px-4 flex items-center justify-center gap-3 flex-wrap">
                <span>{t('ai.title')}</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold rounded-lg shadow-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white dark:bg-gradient-to-r dark:from-green-400 dark:via-teal-500 dark:to-cyan-500 dark:text-white animate-pulse [animation-duration:2s]">
                  <Construction className="w-4 h-4" />
                  {t('ai.status.inDevelopment')}
                </span>
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto pointer-events-auto px-4">
                {t('ai.subtitle')}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground pointer-events-auto">
                <span>{t('ai.totalProjects', { count: aiProjects.length })}</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Separator />

      {/* 主内容区域 */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <Tabs defaultValue="ranking" className="w-full">
            <TabsList className="w-full justify-start mb-6 md:mb-8 flex-nowrap overflow-x-auto h-auto gap-2 md:flex-wrap">
              <TabsTrigger value="all" className="flex-shrink-0">
                {t('ai.allCategories')}
              </TabsTrigger>
              {projectCategories.map(category => (
                <TabsTrigger key={category} value={category} className="flex-shrink-0">
                  {t(`ai.categories.${category}`)}
                </TabsTrigger>
              ))}
              <TabsTrigger value="ranking" className="flex-shrink-0 bg-gradient-to-r from-primary/10 to-primary/5">
                🏆 {t('ai.ranking.title')}
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex-shrink-0">
                {t('ai.timeline')}
              </TabsTrigger>
            </TabsList>

            {/* 所有项目 */}
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {aiProjects.map((project, index) => (
                  <BlurFade key={project.id} delay={0.1 + index * 0.05} inView>
                    <AIProjectCard
                      project={project}
                      latestUpdate={getLatestUpdate(project.id)}
                    />
                  </BlurFade>
                ))}
              </div>
            </TabsContent>

            {/* 按分类展示 */}
            {projectCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {aiProjects
                    .filter(project => project.category === category)
                    .map((project, index) => (
                      <BlurFade key={project.id} delay={0.1 + index * 0.05} inView>
                        <AIProjectCard
                          project={project}
                          latestUpdate={getLatestUpdate(project.id)}
                        />
                      </BlurFade>
                    ))}
                </div>
              </TabsContent>
            ))}

            {/* 🔥 LLM 排行榜 */}
            <TabsContent value="ranking" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <div className="mb-6 text-center space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {t('ai.ranking.title')}
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground">
                    {t('ai.ranking.subtitle')}
                  </p>
                </div>
                <LLMRankingTable />
              </div>
            </TabsContent>

            {/* 时间线视图 */}
            <TabsContent value="timeline" className="mt-0">
              <div className="max-w-3xl mx-auto pl-4 md:pl-8">
                <AITimeline updates={aiUpdatesData as ProjectUpdate[]} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}

