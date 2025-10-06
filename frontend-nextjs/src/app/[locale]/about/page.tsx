'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SiteHeader } from '@/components/SiteHeader'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, listItem } from '@/lib/motion'
import Script from 'next/script'

// Import new components
import { HeroSection } from '@/components/about/HeroSection'
import { StatsPanel } from '@/components/about/StatsPanel'
import { ProjectCarousel } from '@/components/about/ProjectCarousel'
import { CareerTimeline } from '@/components/about/CareerTimeline'
import { SkillMatrix } from '@/components/about/SkillMatrix'
import { SkillRadarChart } from '@/components/about/SkillRadarChart'
import { FeaturedArticles } from '@/components/about/FeaturedArticles'
import { ContactSection } from '@/components/about/ContactSection'

export default function AboutPage() {
  const t = useTranslations('about')

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
      
      <div className="min-h-screen bg-background">
        {/* 顶部导航条 */}
        <SiteHeader />

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
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span>🎯</span>
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

      {/* 价值主张 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span>💡</span>
            {t('value.title')}
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {[0, 1, 2, 3].map((index) => (
              <motion.div key={index} variants={listItem}>
                <Card className="h-full border border-border/50 hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6 space-y-3">
                    <div className="text-3xl">
                      {index === 0 && '🎓'}
                      {index === 1 && '🔗'}
                      {index === 2 && '🚀'}
                      {index === 3 && '🌟'}
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

      {/* 内容方向 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl space-y-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <span>📚</span>
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

      {/* Contact Section - 新组件 */}
      <ContactSection />

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
          >
            <Card className="border border-border/50 bg-gradient-to-br from-primary/10 to-primary/5">
              <CardContent className="p-12 text-center space-y-6">
                <h2 className="text-3xl font-bold">{t('cta.title')}</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('cta.description')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/articles">
                    {t('cta.articles')}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
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
      </div>
    </>
  )
}
