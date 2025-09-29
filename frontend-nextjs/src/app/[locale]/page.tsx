import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getTranslations } from 'next-intl/server';



export default async function Home() {

  const t = await getTranslations();
  
  return (
    <div className="min-h-screen bg-background">
      {/* 语言切换器 */}
      <div className="absolute top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>

      {/* Hero 内容 */}
      <section className="relative overflow-hidden isolate min-h-[72vh] flex items-center">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              {t('hero.title')}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {t('hero.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Button size="lg">
                {t('hero.cta.primary')}
              </Button>
              <Button size="lg" variant="outline">
                {t('hero.cta.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 功能区块 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t('features.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          {/* 功能卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 性能卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">
                  {t('features.performance.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('features.performance.description')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('features.performance.details')}
                </p>
              </CardContent>
            </Card>

            {/* 设计卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">
                  {t('features.design.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('features.design.description')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('features.design.details')}
                </p>
              </CardContent>
            </Card>

            {/* 效率卡片 */}
            <Card className="border border-border/50 bg-card/50 backdrop-blur">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">
                  {t('features.efficiency.title')}
                </h3>
                <p className="text-muted-foreground">
                  {t('features.efficiency.description')}
                </p>
                <p className="text-sm text-muted-foreground">
                  {t('features.efficiency.details')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA 区块 */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {t('cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Button size="lg" className="px-8">
                {t('cta.primary')}
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                {t('cta.secondary')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center text-sm text-muted-foreground">
            {t('footer.copyright')}
          </div>
        </div>
      </footer>
    </div>
  );
} 