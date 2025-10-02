import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { SiteHeader } from '@/components/SiteHeader'
import { Mail, Github, Twitter, Linkedin } from 'lucide-react'

interface AboutPageProps {
  params: Promise<{ locale: string }>
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航条 */}
      <SiteHeader />

      {/* 头部 */}
      <section className="py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-4xl">
              👨‍💻
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('about.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* 个人介绍 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-12">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
              <span>👤</span>
              {t('about.intro.title')}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {t('about.intro.description')}
              </p>
            </div>
          </div>

          {/* 职业历程时间线 */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">{t('about.journey.title')}</h3>
            <div className="space-y-6">
              {/* 探索期 */}
              <Card className="border border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{t('about.journey.exploration.period')}</Badge>
                        <h4 className="text-xl font-semibold">{t('about.journey.exploration.title')}</h4>
                      </div>
                      <p className="text-muted-foreground">
                        {t('about.journey.exploration.description')}
                      </p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {t('about.journey.exploration.skills').split(', ').map((skill: string, i: number) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 第一份工作 */}
              <Card className="border border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge>{t('about.journey.defi.period')}</Badge>
                        <h4 className="text-xl font-semibold">{t('about.journey.defi.title')}</h4>
                      </div>
                      <p className="text-muted-foreground">
                        {t('about.journey.defi.description')}
                      </p>
                      <div className="space-y-3 pt-2">
                        <div>
                          <h5 className="font-medium mb-2">{t('about.journey.defi.project1.name')}</h5>
                          <p className="text-sm text-muted-foreground">{t('about.journey.defi.project1.description')}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {t('about.journey.defi.project1.tech').split(', ').map((tech: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-medium mb-2">{t('about.journey.defi.project2.name')}</h5>
                          <p className="text-sm text-muted-foreground">{t('about.journey.defi.project2.description')}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {t('about.journey.defi.project2.tech').split(', ').map((tech: string, i: number) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI时代的转变 */}
              <Card className="border border-border/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <Badge variant="outline">{t('about.journey.transformation.period')}</Badge>
                        <h4 className="text-xl font-semibold">{t('about.journey.transformation.title')}</h4>
                      </div>
                      <p className="text-muted-foreground">
                        {t('about.journey.transformation.description')}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 项目目的 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <span>🎯</span>
            {t('about.purpose.title')}
          </h2>
          <Card className="border border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8 space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('about.purpose.description')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 价值主张 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <span>💡</span>
            {t('about.value.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[0, 1, 2, 3].map((index) => (
              <Card key={index} className="border border-border/50">
                <CardContent className="p-6 space-y-3">
                  <div className="text-3xl">
                    {index === 0 && '🎓'}
                    {index === 1 && '🔗'}
                    {index === 2 && '🚀'}
                    {index === 3 && '🌟'}
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t(`about.value.points.${index}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`about.value.points.${index}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 内容方向 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <span>📚</span>
            {t('about.content.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {t('about.content.topics').split(', ').map((topic: string, i: number) => (
              <Card key={i} className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <p className="font-medium">{topic}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 技术栈 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <span>⚙️</span>
            {t('about.techStack.title')}
          </h2>
          <div className="space-y-6">
            {/* 前端 */}
            <Card className="border border-border/50">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span>💻</span>
                  {t('about.techStack.frontend.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t('about.techStack.frontend.items').split(', ').map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 后端 */}
            <Card className="border border-border/50">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span>🔧</span>
                  {t('about.techStack.backend.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t('about.techStack.backend.items').split(', ').map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 区块链 */}
            <Card className="border border-border/50">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span>⛓️</span>
                  {t('about.techStack.blockchain.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t('about.techStack.blockchain.items').split(', ').map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* DevOps */}
            <Card className="border border-border/50">
              <CardContent className="p-6 space-y-3">
                <h3 className="text-xl font-semibold flex items-center gap-2">
                  <span>🛠️</span>
                  {t('about.techStack.devops.title')}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {t('about.techStack.devops.items').split(', ').map((tech: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border border-primary/50 bg-primary/5">
            <CardContent className="p-6">
              <p className="text-muted-foreground italic">
                {t('about.techStack.note')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 联系方式 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3">
            <span>📧</span>
            {t('about.contact.title')}
          </h2>
          <Card className="border border-border/50 bg-card/50 backdrop-blur">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg text-muted-foreground">
                {t('about.contact.description')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start" asChild>
                  <a href="mailto:your.email@example.com">
                    <Mail className="w-4 h-4 mr-2" />
                    {t('about.contact.email')}
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                    <Twitter className="w-4 h-4 mr-2" />
                    Twitter
                  </a>
                </Button>
                <Button variant="outline" className="justify-start" asChild>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <Card className="border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-3xl font-bold">{t('about.cta.title')}</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {t('about.cta.description')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href={`/${locale}/articles`}>
                    {t('about.cta.articles')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={`/${locale}`}>
                    {t('about.cta.home')}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
} 