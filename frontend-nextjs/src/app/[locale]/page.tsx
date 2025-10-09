import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { SiteHeader } from '@/components/SiteHeader';
import { TechStackMarquee } from '@/components/TechStackMarquee';
import { BackToTop } from '@/components/BackToTop';
import { OptimizedSparkles } from '@/components/OptimizedSparkles';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { siteConfig } from '@/config/site-config';
import type { Metadata } from 'next';
import { 
  Code2, 
  Network, 
  Brain, 
  ClipboardList, 
  Wrench, 
  Flame, 
  Zap, 
  Scale,
  FileText,
  Link2,
  BookOpen,
  Rocket
} from 'lucide-react';

interface HomeProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: HomeProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  return {
    title: t('hero.title'),
    description: t('hero.subtitle'),
    keywords: locale === 'zh' 
      ? ['知识管理', '技术博客', 'Web3', '区块链', 'Next.js', 'React', '个人成长', '系统化学习', 'DAO', '智能合约']
      : ['Knowledge Management', 'Tech Blog', 'Web3', 'Blockchain', 'Next.js', 'React', 'Personal Growth', 'Systematic Learning', 'DAO', 'Smart Contracts'],
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: t('hero.title'),
      description: t('hero.subtitle'),
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('hero.title'),
      description: t('hero.subtitle'),
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        'zh': `${siteConfig.url}/zh`,
        'en': `${siteConfig.url}/en`,
      },
    },
  };
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  // 结构化数据 (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: t('hero.subtitle'),
    url: `${siteConfig.url}/${locale}`,
    inLanguage: locale === 'zh' ? 'zh-CN' : 'en-US',
    author: {
      '@type': 'Person',
      name: siteConfig.name,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
  
  return (
    <>
      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-background">
        {/* 导航栏 */}
        <SiteHeader showCTA={true} />

      {/* 第1部分：英雄区 (Hero Section) - "我是谁，这是什么？" */}
      <section 
        className="relative overflow-hidden isolate min-h-screen flex flex-col"
        aria-label="Hero section"
      >
        {/* Sparkles 背景效果 */}
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          <OptimizedSparkles
            id="tsparticles"
            minSize={1}
            maxSize={5}
            speed={2}
            particleDensity={30}
            particleColor="#888888"
          />
        </div>
        
        {/* 渐变叠加层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 flex items-center pt-16 md:pt-20 lg:pt-24">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-6xl relative z-10 w-full">
            <div className="mx-auto max-w-3xl text-center space-y-4 md:space-y-6">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                {t('hero.badge')}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight px-4">
                <AnimatedGradientText>
                  {t('hero.title')}
                </AnimatedGradientText>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 px-4">
                <Link href={`/${locale}/articles`} className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Rocket className="mr-2 h-4 w-4" />
                    {t('hero.cta.primary')}
                  </Button>
                </Link>
                <a href="#site-origin" className="w-full sm:w-auto">
                  <Button size="lg" variant="ghost" className="w-full sm:w-auto">
                    {t('hero.cta.tertiary')}
                  </Button>
                </a>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground pt-2 px-4">
                {t('hero.maintainedBy')}
              </p>
            </div>
          </div>
        </div>

        {/* 技术栈跑马灯 - 在 Hero Section 底部 */}
        <div className="relative z-10 pb-12 pt-16 md:pt-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
              {t('techStack.title')}
            </h2>
            <p className="text-sm md:text-base font-medium text-muted-foreground">
              {t('techStack.subtitle')}
            </p>
          </div>
          <TechStackMarquee />
        </div>
      </section>

      {/* 第2部分：知识体系架构 (Knowledge Architecture) - "这里有什么？" */}
      <section 
        className="py-16 md:py-24 bg-muted/30"
        aria-labelledby="knowledge-domains-title"
      >
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 id="knowledge-domains-title" className="text-3xl md:text-5xl font-bold tracking-tight">
              {t('domains.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('domains.subtitle')}
            </p>
          </div>
          
          {/* 知识域卡片 - 5个卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 技术开发卡片 */}
            <Link 
              href={`/${locale}/articles?category=${siteConfig.knowledgeDomains.tech}`}
              className="block group"
              aria-label={t('domains.cards.tech.title')}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Code2 className="h-10 w-10 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {t('domains.cards.tech.articleCount')}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t('domains.cards.tech.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('domains.cards.tech.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {t('domains.cards.tech.keywords').split(', ').map((keyword: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Web3 & 区块链卡片 */}
            <Link 
              href={`/${locale}/articles?category=${siteConfig.knowledgeDomains.web3}`}
              className="block group"
              aria-label={t('domains.cards.web3.title')}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Network className="h-10 w-10 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {t('domains.cards.web3.articleCount')}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t('domains.cards.web3.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('domains.cards.web3.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {t('domains.cards.web3.keywords').split(', ').map((keyword: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 跨学科思考卡片 */}
            <Link 
              href={`/${locale}/articles?category=${siteConfig.knowledgeDomains.thinking}`}
              className="block group"
              aria-label={t('domains.cards.thinking.title')}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Brain className="h-10 w-10 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {t('domains.cards.thinking.articleCount')}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t('domains.cards.thinking.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('domains.cards.thinking.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {t('domains.cards.thinking.keywords').split(', ').map((keyword: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 产品与流程卡片 */}
            <Link 
              href={`/${locale}/articles?category=${siteConfig.knowledgeDomains.product}`}
              className="block group"
              aria-label={t('domains.cards.product.title')}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <ClipboardList className="h-10 w-10 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {t('domains.cards.product.articleCount')}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t('domains.cards.product.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('domains.cards.product.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {t('domains.cards.product.keywords').split(', ').map((keyword: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 实用工具箱卡片 */}
            <Link 
              href={`/${locale}/articles?category=${siteConfig.knowledgeDomains.tools}`}
              className="block group md:col-span-2 lg:col-span-1"
              aria-label={t('domains.cards.tools.title')}
            >
              <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Wrench className="h-10 w-10 text-primary" />
                    <Badge variant="outline" className="text-xs">
                      {t('domains.cards.tools.articleCount')}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t('domains.cards.tools.title')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('domains.cards.tools.description')}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {t('domains.cards.tools.keywords').split(', ').map((keyword: string, i: number) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* 第3部分：核心内容 (Core Content) - "从哪里开始读？" */}
      <section 
        className="py-16 md:py-24"
        aria-labelledby="featured-content-title"
      >
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 id="featured-content-title" className="text-3xl md:text-5xl font-bold tracking-tight">
              {t('featured.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>
          
          {/* 精选文章卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 思想代表作 */}
            <Link 
              href={siteConfig.articles.featured.manifesto.slug || `/${locale}/articles?category=${siteConfig.articles.featured.manifesto.category}`}
              className="block group"
              aria-label={t('featured.articles.manifesto.title')}
            >
              <Card className="border border-border/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {t('featured.articles.manifesto.tag')}
                    </Badge>
                    <Flame className="h-6 w-6 text-orange-500" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {t('featured.articles.manifesto.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {t('featured.articles.manifesto.description')}
                  </p>
                  <div className="text-xs text-muted-foreground pt-2">
                    {t('featured.articles.manifesto.readTime')}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 技术代表作 */}
            <Link 
              href={siteConfig.articles.featured.web.slug || `/${locale}/articles?category=${siteConfig.articles.featured.web.category}`}
              className="block group"
              aria-label={t('featured.articles.web.title')}
            >
              <Card className="border border-border/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {t('featured.articles.web.tag')}
                    </Badge>
                    <Zap className="h-6 w-6 text-yellow-500" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {t('featured.articles.web.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {t('featured.articles.web.description')}
                  </p>
                  <div className="text-xs text-muted-foreground pt-2">
                    {t('featured.articles.web.readTime')}
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* 实用代表作 */}
            <Link 
              href={siteConfig.articles.featured.labor.slug || `/${locale}/articles?category=${siteConfig.articles.featured.labor.category}`}
              className="block group"
              aria-label={t('featured.articles.labor.title')}
            >
              <Card className="border border-border/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 h-full group-hover:border-primary/50">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      {t('featured.articles.labor.tag')}
                    </Badge>
                    <Scale className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {t('featured.articles.labor.title')}
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    {t('featured.articles.labor.description')}
                  </p>
                  <div className="text-xs text-muted-foreground pt-2">
                    {t('featured.articles.labor.readTime')}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          {/* 查看更多链接 */}
          <div className="text-center mt-12">
            <Link href={`/${locale}/articles`} className="text-primary hover:underline inline-flex items-center gap-2">
              {t('featured.moreLink')}
            </Link>
          </div>
        </div>
      </section>

      {/* 第4部分：建站初衷 (Site Origin) - "我为什么做这个？" */}
      <section 
        id="site-origin" 
        className="py-16 md:py-24 bg-muted/30 scroll-mt-20"
        aria-labelledby="site-origin-title"
      >
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 id="site-origin-title" className="text-3xl md:text-5xl font-bold tracking-tight">
                {t('siteOrigin.title')}
              </h2>
              <p className="text-muted-foreground text-sm uppercase tracking-wider">
                {t('siteOrigin.subtitle')}
              </p>
            </div>
            
            <blockquote className="text-base md:text-lg text-muted-foreground leading-relaxed border-l-4 border-primary pl-6 text-left max-w-3xl mx-auto whitespace-pre-line">
              {t('siteOrigin.quote')}
            </blockquote>
            
            {/* 四个目标 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
              {[
                { icon: FileText, color: 'text-blue-500' },
                { icon: Brain, color: 'text-purple-500' },
                { icon: Link2, color: 'text-green-500' },
                { icon: BookOpen, color: 'text-orange-500' }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="text-center space-y-2">
                    <div className="flex justify-center mb-3">
                      <IconComponent className={`h-12 w-12 ${item.color}`} />
                    </div>
                    <h3 className="font-semibold">
                      {t(`siteOrigin.principles.${index}.title`)}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t(`siteOrigin.principles.${index}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 第5部分：学习交流 (Learn Together) - "下一步做什么？" */}
      <section 
        className="relative py-16 md:py-24 overflow-hidden"
        aria-label="Call to action"
      >
        {/* Sparkles 背景效果 - 更柔和的版本 */}
        <div className="absolute inset-0 w-full h-full" aria-hidden="true">
          <OptimizedSparkles
            id="tsparticles-cta"
            minSize={1}
            maxSize={3}
            particleDensity={50}
            particleColor="#666666"
            speed={2}
          />
        </div>
        
        {/* 渐变叠加层 */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
        
        {/* 内容 */}
        <div className="container mx-auto px-6 md:px-8 max-w-4xl relative z-10">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              <AnimatedGradientText colorFrom="#3b82f6" colorTo="#8b5cf6">
                {t('finalCta.title')}
              </AnimatedGradientText>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('finalCta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 px-4">
              <Link href={`/${locale}/articles`} className="w-full sm:w-auto">
                <Button size="lg" className="px-8 w-full sm:w-auto">
                  {t('finalCta.primary')}
                </Button>
              </Link>
              <Link href={`/${locale}/about`} className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="px-8 w-full sm:w-auto">
                  {t('finalCta.secondary')}
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 text-sm">
              <Link 
                href={siteConfig.social.github || `/${locale}/articles`} 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={t('finalCta.links.github')}
              >
                {t('finalCta.links.github')}
              </Link>
              <Link 
                href={`/${locale}/articles`}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={t('finalCta.links.resume')}
              >
                {t('finalCta.links.resume')}
              </Link>
              <Link 
                href={`/${locale}/about#contact`}
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={t('finalCta.links.contact')}
              >
                {t('finalCta.links.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        className="border-t border-border/40 py-12"
        role="contentinfo"
        aria-label="Site footer"
      >
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* 左侧：品牌信息 */}
            <div className="space-y-3">
              <div className="text-lg font-bold">
                <AnimatedGradientText colorFrom="#10b981" colorTo="#3b82f6" speed={0.8}>
                  Oracle Knowledge Base
                </AnimatedGradientText>
              </div>
              <p className="text-sm text-muted-foreground">
                {t('footer.builtWith')}
              </p>
              <p className="text-xs text-muted-foreground">
                {t('footer.license')}
              </p>
            </div>
            
            {/* 中间：快速链接 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{t('footer.sections.quickLinks')}</h4>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link href={`/${locale}/articles`} className="hover:text-primary transition-colors">
                  {t('navigation.articles')}
                </Link>
                <Link href={`/${locale}/about`} className="hover:text-primary transition-colors">
                  {t('navigation.about')}
                </Link>
              </div>
            </div>
            
            {/* 右侧：社交链接 */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">{t('footer.sections.social')}</h4>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <Link 
                  href={siteConfig.social.github || '#'} 
                  className="hover:text-primary transition-colors"
                  aria-label={t('footer.social.github')}
                >
                  {t('footer.social.github')}
                </Link>
                <Link 
                  href={siteConfig.social.twitter || '#'} 
                  className="hover:text-primary transition-colors"
                  aria-label={t('footer.social.twitter')}
                >
                  {t('footer.social.twitter')}
                </Link>
                <Link 
                  href={siteConfig.social.email ? `mailto:${siteConfig.social.email}` : '#'} 
                  className="hover:text-primary transition-colors"
                  aria-label={t('footer.social.email')}
                >
                  {t('footer.social.email')}
                </Link>
              </div>
            </div>
          </div>
          
          {/* 底部版权 */}
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
      
      {/* 回到顶部按钮 */}
      <BackToTop />
      </div>
    </>
  );
} 