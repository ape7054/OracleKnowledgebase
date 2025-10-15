'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MatrixBackground } from '@/components/ui/matrix-background';
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text';
import { SiteHeader } from '@/components/SiteHeader';
import { DevelopmentBadge } from '@/components/DevelopmentBadge';
import { useIsMobile } from '@/hooks/use-mobile';
import { BorderBeam } from '@/components/ui/border-beam';
import { SparklesCore } from '@/components/ui/sparkles';
import CountUp from 'react-countup';
import {
  Code2,
  Sparkles,
  Zap,
  Smartphone,
  FileCode,
  Grid3x3,
  ArrowRight,
  Github,
  ExternalLink
} from 'lucide-react';
import { siteConfig } from '@/config/site-config';

export default function DemoPage() {
  const locale = useLocale();
  const t = useTranslations();
  const isMobile = useIsMobile();

  const demoCards = [
    {
      id: 'showcase',
      icon: Grid3x3,
      color: 'text-orange-500',
      gradient: 'from-orange-500/10 to-orange-600/10',
      href: `/${locale}/frontend/showcase`,
      featured: true,
    },
    {
      id: 'animations',
      icon: Sparkles,
      color: 'text-purple-500',
      gradient: 'from-purple-500/10 to-purple-600/10',
      href: `/${locale}/frontend/animations`,
    },
    {
      id: 'performance',
      icon: Zap,
      color: 'text-yellow-500',
      gradient: 'from-yellow-500/10 to-yellow-600/10',
      href: `/${locale}/frontend/performance`,
    },
    {
      id: 'matrix',
      icon: Code2,
      color: 'text-green-500',
      gradient: 'from-green-500/10 to-green-600/10',
      href: `/${locale}/frontend/matrix-comparison`,
    },
    {
      id: 'responsive',
      icon: Smartphone,
      color: 'text-pink-500',
      gradient: 'from-pink-500/10 to-pink-600/10',
      href: `/${locale}/frontend/responsive`,
    },
    {
      id: 'typescript',
      icon: FileCode,
      color: 'text-cyan-500',
      gradient: 'from-cyan-500/10 to-cyan-600/10',
      href: `/${locale}/frontend/typescript`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <SiteHeader />
      
      {/* Hero Section with Matrix Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <MatrixBackground
          speed={0.8}
          density={1.5}
          brightness={0.4}
          useCSSVersion={isMobile}
          className="absolute inset-0"
        >
          <div className="relative z-10 container mx-auto px-4 py-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Badge 
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 dark:from-pink-500 dark:via-purple-500 dark:to-blue-500 text-white border-0 font-bold shadow-lg animate-pulse-strong"
              >
                {t('demo.subtitle')}
              </Badge>
              <DevelopmentBadge size="sm" text="开发中" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg">
              {/* 亮色模式：深灰到深青色 */}
              <span className="dark:hidden">
                <AnimatedGradientText colorFrom="#1f2937" colorTo="#0891b2">
                  {t('demo.hero.title')}
                </AnimatedGradientText>
              </span>
              {/* 暗色模式：白色到青色 */}
              <span className="hidden dark:inline">
                <AnimatedGradientText colorFrom="#ffffff" colorTo="#00ffff">
                  {t('demo.hero.title')}
                </AnimatedGradientText>
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-900 dark:text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
              {t('demo.description')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-12">
              {[
                { key: 'showcase', value: 70, suffix: '+' },
                { key: 'animations', value: 15, suffix: '+' },
                { key: 'performance', value: 95, suffix: '+' },
                { key: 'typescript', value: 100, suffix: '%' },
              ].map((stat) => (
                <div key={stat.key} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white drop-shadow-lg mb-2">
                    <CountUp
                      end={stat.value}
                      duration={2.5}
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <div className="text-sm text-gray-700 dark:text-white font-medium drop-shadow-sm">
                    {t(`demo.cards.${stat.key}.count`)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MatrixBackground>
      </section>

      {/* Demo Cards Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('demo.title')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('demo.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {demoCards.map((card) => {
              const Icon = card.icon;
              const isShowcase = card.id === 'showcase';
              
              return (
                <Link key={card.id} href={card.href} className="block group">
                  <Card className={`h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 ${
                    isShowcase ? 'relative overflow-hidden' : ''
                  }`}>
                    {/* Sparkles 特效 - 仅用于 showcase 卡片 */}
                    {isShowcase && (
                      <div className="absolute inset-0 pointer-events-none">
                        <SparklesCore
                          id="showcase-sparkles"
                          background="transparent"
                          minSize={1.2}
                          maxSize={5.6}
                          particleDensity={80}
                          className="w-full h-full"
                          particleColor="#ff8c00"
                          speed={0.5}
                        />
                      </div>
                    )}
                    
                    {/* BorderBeam 特效 - 仅用于 showcase 卡片 */}
                    {isShowcase && (
                      <BorderBeam
                        size={300}
                        duration={8}
                        delay={0}
                        colorFrom="#ff8c00"
                        colorTo="#ff6b00"
                        borderWidth={2}
                      />
                    )}
                    
                    <CardContent className="p-6 space-y-4 relative z-10">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${card.gradient}`}>
                        <Icon className={`h-8 w-8 ${card.color}`} />
                      </div>
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {t(`demo.cards.${card.id}.title`)}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t(`demo.cards.${card.id}.description`)}
                      </p>
                      <div className="flex items-center justify-between pt-4">
                        <Badge variant="secondary">
                          {t(`demo.cards.${card.id}.count`)}
                        </Badge>
                        <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {t(`demo.cards.${card.id}.highlights`)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">{t('demo.techStack.title')}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: t('demo.techStack.react.name'), desc: t('demo.techStack.react.desc') },
                { name: t('demo.techStack.nextjs.name'), desc: t('demo.techStack.nextjs.desc') },
                { name: t('demo.techStack.typescript.name'), desc: t('demo.techStack.typescript.desc') },
                { name: t('demo.techStack.tailwind.name'), desc: t('demo.techStack.tailwind.desc') },
                { name: t('demo.techStack.framerMotion.name'), desc: t('demo.techStack.framerMotion.desc') },
                { name: t('demo.techStack.shadcn.name'), desc: t('demo.techStack.shadcn.desc') },
                { name: t('demo.techStack.radix.name'), desc: t('demo.techStack.radix.desc') },
                { name: t('demo.techStack.recharts.name'), desc: t('demo.techStack.recharts.desc') },
              ].map((tech) => (
                <Card key={tech.name} className="p-4 text-center">
                  <div className="font-semibold text-sm">{tech.name}</div>
                  <div className="text-xs text-muted-foreground">{tech.desc}</div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">
              {t('demo.cta.readyToExplore')}
            </h2>
            <p className="text-muted-foreground">
              {t('demo.cta.checkoutDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={siteConfig.social.github} target="_blank">
                <Button size="lg" className="gap-2">
                  <Github className="h-5 w-5" />
                  {t('demo.cta.viewCode')}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/${locale}/knowledge`}>
                <Button size="lg" variant="outline" className="gap-2">
                  {t('demo.cta.explore')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <div className="pt-4">
              <Link href={`/${locale}`} className="text-sm text-muted-foreground hover:text-primary">
                {t('demo.cta.backToHome')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

