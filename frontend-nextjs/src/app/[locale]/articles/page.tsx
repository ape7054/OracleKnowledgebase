import { articles } from '#site/content'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { SiteHeader } from '@/components/SiteHeader'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale })
  
  // 筛选当前语言和已发布的文章
  const publishedArticles = articles
    .filter(article => article.published && article.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航条 */}
      <SiteHeader />

      {/* 头部 */}
      <section className="py-16 md:py-24 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              {t('articles.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('articles.subtitle', { count: publishedArticles.length })}
            </p>
          </div>
        </div>
      </section>

      {/* 文章列表 */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publishedArticles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/${locale}/articles/${article.slugAsParams}`}
              >
                <Card className="border border-border/50 hover:shadow-lg transition-all group cursor-pointer h-full">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">
                        {article.category}
                      </Badge>
                      {article.icon && (
                        <span className="text-2xl">{article.icon}</span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    
                    {article.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {article.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                      <span>{new Date(article.date).toLocaleDateString(locale)}</span>
                      {article.readTime && <span>{article.readTime}</span>}
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {publishedArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">暂无文章</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 