'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, listItem } from '@/lib/motion'
import { Target, Lightbulb, GraduationCap, Network, Rocket, Sparkles, BookOpen } from '@/lib/icons'
import Script from 'next/script'
import { BlurFade } from '@/components/ui/blur-fade'
import dynamic from 'next/dynamic'

// Import new components
import { HeroSection } from '@/components/about/HeroSection'
import { StatsPanel } from '@/components/about/StatsPanel'
import { CareerTimeline } from '@/components/about/CareerTimeline'
import { SkillMatrix } from '@/components/about/SkillMatrix'
import { FeaturedArticles } from '@/components/about/FeaturedArticles'
import { ContactSection } from '@/components/about/ContactSection'

// Loading skeletons
import { SkillRadarLoadingSkeleton } from '@/components/about/SkillRadarLoadingSkeleton'
import { ProjectCarouselLoadingSkeleton } from '@/components/about/ProjectCarouselLoadingSkeleton'

// Warp background for CTA
import { WarpBackground } from '@/components/ui/warp-background'

// Dynamic imports for heavy components below the fold
const ProjectCarousel = dynamic(
  () => import('@/components/about/ProjectCarousel').then(mod => ({ default: mod.ProjectCarousel })).catch(() => {
    console.error('Failed to load ProjectCarousel component')
    return { default: () => <ProjectCarouselLoadingSkeleton /> }
  }),
  { 
    loading: () => <ProjectCarouselLoadingSkeleton />,
    ssr: false 
  }
)

const SkillRadarChart = dynamic(
  () => import('@/components/about/SkillRadarChart').then(mod => ({ default: mod.SkillRadarChart })).catch(() => {
    console.error('Failed to load SkillRadarChart component')
    return { default: () => <SkillRadarLoadingSkeleton /> }
  }),
  { 
    loading: () => <SkillRadarLoadingSkeleton />,
    ssr: false 
  }
)

export default function AboutPage() {
  const t = useTranslations('about')
  const locale = useLocale()

  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <Script
        id="about-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Oracle",
            "jobTitle": "Full-Stack Developer & Web3 Explorer",
            "description": t('intro.description'),
            "url": "https://your-domain.com/about",
            "knowsAbout": ["Full-Stack Development", "Web3", "Blockchain", "DeFi", "Solana", "Rust", "Next.js"],
          })
        }}
      />
      
      <div className="min-h-screen bg-background overflow-x-hidden">
        {/* 面包屑导航 */}
        <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-8">
          <Breadcrumbs locale={locale} />
        </div>

      {/* Hero Section - 新组件 */}
      <HeroSection />

      {/* Stats Panel - 新组件 */}
      <StatsPanel />

      {/* Project Carousel - 新组件 */}
      <ProjectCarousel />

      {/* Career Timeline - 新组件 */}
      <CareerTimeline />

      {/* Skill Matrix - 新组件 */}
      <SkillMatrix />

      {/* Skill Radar Chart - 新组件 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <SkillRadarChart />
        </div>
      </section>

      {/* Featured Articles - 新组件 */}
      <FeaturedArticles />

      {/* 项目目的 */}
      <BlurFade delay={0.2}>
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Target className="w-6 h-6" />
              </div>
              {t('purpose.title')}
            </motion.h2>
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-8 space-y-4">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {t('purpose.description')}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </BlurFade>

      {/* 价值主张 */}
      <BlurFade delay={0.3}>
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Lightbulb className="w-6 h-6" />
              </div>
              {t('value.title')}
            </motion.h2>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {[
                { index: 0, Icon: GraduationCap },
                { index: 1, Icon: Network },
                { index: 2, Icon: Rocket },
                { index: 3, Icon: Sparkles }
              ].map(({ index, Icon }) => (
                <motion.div key={index} variants={listItem}>
                  <Card className="h-full border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                    <CardContent className="p-6 space-y-3">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-semibold">
                        {t(`value.points.${index}.title`)}
                      </h3>
                      <p className="text-muted-foreground">
                        {t(`value.points.${index}.description`)}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </BlurFade>

      {/* 内容方向 */}
      <BlurFade delay={0.4}>
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              {t('content.title')}
            </motion.h2>
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              {t('content.topics').split(', ').map((topic: string, i: number) => (
                <motion.div key={i} variants={listItem}>
                  <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow cursor-pointer hover:-translate-y-1">
                    <CardContent className="p-4 text-center">
                      <p className="font-medium">{topic}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </BlurFade>

      {/* Contact Section - 新组件 */}
      <ContactSection />

      {/* CTA */}
      <BlurFade delay={0.5}>
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
            >
              <Card className="border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                {/* Warp Background - 动态光束动画，强化行动号召 */}
                <WarpBackground 
                  className="absolute inset-0 opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                  perspective={300}
                  beamsPerSide={12}
                  beamSize={3}
                  beamDelayMin={0}
                  beamDelayMax={9}
                  beamDuration={4}
                  gridColor="hsl(var(--primary) / 0.4)"
                />
                
                <CardContent className="p-12 text-center space-y-6 relative z-10">
                  <h2 className="text-3xl font-bold group-hover:scale-105 transition-transform duration-300">{t('cta.title')}</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {t('cta.description')}
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button size="lg" asChild className="hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl">
                    <Link href={`/${locale}/knowledge`}>
                      {t('cta.articles')}
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform duration-300">
                    <Link href="/">
                      {t('cta.home')}
                    </Link>
                  </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </BlurFade>
      </div>
    </>
  )
}
