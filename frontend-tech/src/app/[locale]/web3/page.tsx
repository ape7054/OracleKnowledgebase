import { SiteHeader } from '@/components/SiteHeader'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BlurFade } from "@/components/ui/blur-fade"
import { Boxes } from '@/components/ui/background-boxes'
import { web3Projects, projectCategories } from '@/config/web3-projects'
import { Web3ProjectCard } from '@/components/Web3ProjectCard'
import { Web3Timeline } from '@/components/Web3Timeline'
import { getTranslations } from 'next-intl/server'
import web3UpdatesData from '@/data/web3-updates.json'
import { Blocks } from 'lucide-react'
import { DevelopmentBadge } from '@/components/DevelopmentBadge'

interface Web3PageProps {
  params: Promise<{ locale: string }>
}

interface ProjectUpdate {
  id: string
  projectId: string
  date: string
  type: 'regulatory' | 'tech' | 'ecosystem' | 'other'
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

export default async function Web3Page({ params }: Web3PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  // 获取每个项目的最新更新
  const getLatestUpdate = (projectId: string) => {
    const projectUpdates = (web3UpdatesData as ProjectUpdate[])
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
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl pointer-events-auto">
                <Blocks className="h-8 w-8 md:h-10 md:w-10 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text pointer-events-auto px-4 flex items-center justify-center gap-3 flex-wrap">
                <span>{t('web3.title')}</span>
                <DevelopmentBadge size="md" text={t('web3.status.inDevelopment')} />
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto pointer-events-auto px-4">
                {t('web3.subtitle')}
              </p>
              <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground pointer-events-auto">
                <span>{t('web3.totalProjects', { count: web3Projects.length })}</span>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>

      <Separator />

      {/* 主内容区域 */}
      <section className="py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-6 md:mb-8 flex-nowrap overflow-x-auto h-auto gap-2 md:flex-wrap">
              <TabsTrigger value="all" className="flex-shrink-0">
                {t('web3.allCategories')}
              </TabsTrigger>
              {projectCategories.map(category => (
                <TabsTrigger key={category} value={category} className="flex-shrink-0">
                  {t(`web3.categories.${category}`)}
                </TabsTrigger>
              ))}
              <TabsTrigger value="timeline" className="flex-shrink-0">
                {t('web3.timeline')}
              </TabsTrigger>
            </TabsList>

            {/* 所有项目 */}
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {web3Projects.map((project, index) => (
                  <BlurFade key={project.id} delay={0.1 + index * 0.05} inView>
                    <Web3ProjectCard
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
                  {web3Projects
                    .filter(project => project.category === category)
                    .map((project, index) => (
                      <BlurFade key={project.id} delay={0.1 + index * 0.05} inView>
                        <Web3ProjectCard
                          project={project}
                          latestUpdate={getLatestUpdate(project.id)}
                        />
                      </BlurFade>
                    ))}
                </div>
              </TabsContent>
            ))}

            {/* 时间线视图 */}
            <TabsContent value="timeline" className="mt-0">
              <div className="max-w-3xl mx-auto pl-4 md:pl-8">
                <Web3Timeline updates={web3UpdatesData as ProjectUpdate[]} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
