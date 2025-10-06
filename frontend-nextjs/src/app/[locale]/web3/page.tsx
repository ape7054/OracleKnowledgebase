import { SiteHeader } from '@/components/SiteHeader'
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { web3Projects, projectCategories } from '@/config/web3-projects'
import { Web3ProjectCard } from '@/components/Web3ProjectCard'
import { Web3Timeline } from '@/components/Web3Timeline'
import { getTranslations } from 'next-intl/server'
import web3UpdatesData from '@/data/web3-updates.json'

interface Web3PageProps {
  params: Promise<{ locale: string }>
}

export default async function Web3Page({ params }: Web3PageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  // 获取每个项目的最新更新
  const getLatestUpdate = (projectId: string) => {
    const projectUpdates = web3UpdatesData
      .filter((update: any) => update.projectId === projectId)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
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
      <section className="py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-4xl">
              ⛓️
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('web3.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('web3.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{t('web3.totalProjects', { count: web3Projects.length })}</span>
            </div>
          </div>
        </div>
      </section>

      <Separator />

      {/* 主内容区域 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full justify-start mb-8 flex-wrap h-auto gap-2">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {web3Projects.map(project => (
                  <Web3ProjectCard
                    key={project.id}
                    project={project}
                    latestUpdate={getLatestUpdate(project.id)}
                  />
                ))}
              </div>
            </TabsContent>

            {/* 按分类展示 */}
            {projectCategories.map(category => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {web3Projects
                    .filter(project => project.category === category)
                    .map(project => (
                      <Web3ProjectCard
                        key={project.id}
                        project={project}
                        latestUpdate={getLatestUpdate(project.id)}
                      />
                    ))}
                </div>
              </TabsContent>
            ))}

            {/* 时间线视图 */}
            <TabsContent value="timeline" className="mt-0">
              <div className="max-w-3xl mx-auto pl-8">
                <Web3Timeline updates={web3UpdatesData as any} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}
