import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SparklesCore } from "@/components/ui/sparkles"
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text"
import { SiteHeader } from '@/components/SiteHeader';
import { TechStackMarquee } from '@/components/TechStackMarquee';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

interface HomeProps {
  params: Promise<{ locale: string }>
}

export default async function Home({ params }: HomeProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale });
  
  return (
    <div className="min-h-screen bg-background">
      {/* 导航栏 */}
      <SiteHeader showCTA={true} />

      {/* 第1部分：英雄区 (Hero Section) - "我是谁，这是什么？" */}
      <section className="relative overflow-hidden isolate min-h-screen flex flex-col">
        {/* Sparkles 背景效果 */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            minSize={1}
            maxSize={5}
            speed={2}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#888888"
          />
        </div>
        
        {/* 渐变叠加层 */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background"></div>
        
        {/* 主要内容区域 */}
        <div className="flex-1 flex items-center pt-12 md:pt-16">
          <div className="container mx-auto px-6 md:px-8 max-w-6xl relative z-10 w-full">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
                {t('hero.badge')}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                <AnimatedGradientText>
                  {t('hero.title')}
                </AnimatedGradientText>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Link href={`/${locale}/articles`}>
                  <Button size="lg">
                    {t('hero.cta.primary')}
                  </Button>
                </Link>
                <a href="#site-origin">
                  <Button size="lg" variant="ghost">
                    {t('hero.cta.tertiary')}
                  </Button>
                </a>
              </div>
              <p className="text-sm text-muted-foreground pt-2">
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
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {t('domains.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('domains.subtitle')}
            </p>
          </div>
          
          {/* 知识域卡片 - 5个卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 技术开发卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{t('domains.cards.tech.icon')}</div>
                  <Badge variant="outline" className="text-xs">
                    {t('domains.cards.tech.articleCount')}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">
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

            {/* Web3 & 区块链卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{t('domains.cards.web3.icon')}</div>
                  <Badge variant="outline" className="text-xs">
                    {t('domains.cards.web3.articleCount')}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">
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

            {/* 跨学科思考卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{t('domains.cards.thinking.icon')}</div>
                  <Badge variant="outline" className="text-xs">
                    {t('domains.cards.thinking.articleCount')}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">
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

            {/* 产品与流程卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{t('domains.cards.product.icon')}</div>
                  <Badge variant="outline" className="text-xs">
                    {t('domains.cards.product.articleCount')}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">
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

            {/* 实用工具箱卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur hover:shadow-lg transition-shadow md:col-span-2 lg:col-span-1">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-4xl">{t('domains.cards.tools.icon')}</div>
                  <Badge variant="outline" className="text-xs">
                    {t('domains.cards.tools.articleCount')}
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold">
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
          </div>
        </div>
      </section>

      {/* 第3部分：核心内容 (Core Content) - "从哪里开始读？" */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
              {t('featured.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('featured.subtitle')}
            </p>
          </div>
          
          {/* 精选文章卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 思想代表作 */}
            <Card className="border border-border/50 hover:shadow-lg transition-shadow group cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {t('featured.articles.manifesto.tag')}
                  </Badge>
                  <span className="text-2xl">{t('featured.articles.manifesto.icon')}</span>
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

            {/* 技术代表作 */}
            <Card className="border border-border/50 hover:shadow-lg transition-shadow group cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {t('featured.articles.web.tag')}
                  </Badge>
                  <span className="text-2xl">{t('featured.articles.web.icon')}</span>
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

            {/* 实用代表作 */}
            <Card className="border border-border/50 hover:shadow-lg transition-shadow group cursor-pointer">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {t('featured.articles.labor.tag')}
                  </Badge>
                  <span className="text-2xl">{t('featured.articles.labor.icon')}</span>
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
      <section id="site-origin" className="py-16 md:py-24 bg-muted/30 scroll-mt-20">
        <div className="container mx-auto px-6 md:px-8 max-w-5xl">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
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
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="text-4xl mb-3">
                    {index === 0 && '📝'}
                    {index === 1 && '🧠'}
                    {index === 2 && '🔗'}
                    {index === 3 && '📚'}
                  </div>
                  <h3 className="font-semibold">
                    {t(`siteOrigin.principles.${index}.title`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`siteOrigin.principles.${index}.description`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 第5部分：学习交流 (Learn Together) - "下一步做什么？" */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Sparkles 背景效果 - 更柔和的版本 */}
        <div className="absolute inset-0 w-full h-full">
          <SparklesCore
            id="tsparticles-cta"
            background="transparent"
            minSize={1}
            maxSize={3}
            particleDensity={60}
            className="w-full h-full"
            particleColor="#666666"
            speed={3}
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
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="px-8">
                {t('finalCta.primary')}
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                {t('finalCta.secondary')}
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 pt-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('finalCta.links.github')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('finalCta.links.resume')}
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                {t('finalCta.links.contact')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-12">
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
              <h4 className="font-semibold text-sm">快速链接</h4>
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
              <h4 className="font-semibold text-sm">社交媒体</h4>
              <div className="flex flex-col space-y-2 text-sm text-muted-foreground">
                <a href="#" className="hover:text-primary transition-colors">
                  {t('footer.social.github')}
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  {t('footer.social.twitter')}
                </a>
                <a href="#" className="hover:text-primary transition-colors">
                  {t('footer.social.email')}
                </a>
              </div>
            </div>
          </div>
          
          {/* 底部版权 */}
          <div className="border-t border-border/40 pt-8 text-center text-sm text-muted-foreground">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
} 