import { articles } from '#site/content'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/SiteHeader'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { getTranslations } from 'next-intl/server'
import { ArticleLayout } from '@/components/ArticleLayout'
import { TableOfContents } from '@/components/TableOfContents'
import { ArticleSidebar } from '@/components/ArticleSidebar'
import { ArticleNavigation } from '@/components/ArticleNavigation'

interface ArticlePageProps {
  params: Promise<{
    slug: string[]
    locale: string
  }>
}

async function getArticleFromParams(params: { slug: string[]; locale: string }) {
  const slug = params.slug.join('/')
  const article = articles.find(
    (article) => article.slugAsParams === slug && article.locale === params.locale
  )

  if (!article) {
    return null
  }

  return article
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slugAsParams.split('/'),
    locale: article.locale,
  }))
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params
  const article = await getArticleFromParams(resolvedParams)
  const t = await getTranslations({ locale: resolvedParams.locale })

  if (!article || !article.published) {
    notFound()
  }

  // 获取上一篇和下一篇文章（同一语言）
  const sortedArticles = articles
    .filter((a) => a.published && a.locale === resolvedParams.locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const currentIndex = sortedArticles.findIndex((a) => a.slugAsParams === article.slugAsParams)
  const prevArticle = currentIndex > 0 ? sortedArticles[currentIndex - 1] : undefined
  const nextArticle = currentIndex < sortedArticles.length - 1 ? sortedArticles[currentIndex + 1] : undefined

  // 构建侧边栏元数据
  const metadata = {
    publishDate: new Date(article.date).toLocaleDateString(resolvedParams.locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    readTime: article.readTime ? parseInt(article.readTime) : undefined,
    author: {
      name: article.author || 'Oracle',
    },
    tags: article.tags,
    category: article.category,
  };

  // 相关文章（同类别的其他文章）
  const relatedArticles = articles
    .filter(a => 
      a.published && 
      a.locale === resolvedParams.locale && 
      a.category === article.category && 
      a.slug !== article.slug
    )
    .slice(0, 3)
    .map(a => ({
      title: a.title,
      href: `/${resolvedParams.locale}/articles/${a.slugAsParams}`,
      category: a.category,
    }));

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航条 */}
      <SiteHeader />

      {/* 面包屑导航 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 pt-8">
        <Breadcrumbs 
          locale={resolvedParams.locale}
          customItems={[
            { label: t('navigation.articles'), href: `/${resolvedParams.locale}/articles` },
            { label: article.category || t('articles.uncategorized'), href: `/${resolvedParams.locale}/articles?category=${article.category}` },
            { label: article.title }
          ]}
        />
      </div>

      {/* 三栏布局 */}
      <ArticleLayout
        tableOfContents={<TableOfContents />}
        sidebar={
          <ArticleSidebar 
            metadata={metadata}
            relatedArticles={relatedArticles.length > 0 ? relatedArticles : undefined}
          />
        }
        showToc={true}
      >
        {/* 文章头部 */}
        <header className="mb-12 space-y-6 border-b border-border/40 pb-8">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="text-sm">
              {article.category}
            </Badge>
            {article.icon && (
              <span className="text-3xl">{article.icon}</span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-xl text-muted-foreground">
              {article.description}
            </p>
          )}

          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-4">
              {article.tags.map((tag, i) => (
                <Badge key={i} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* 文章内容 */}
        <div 
          className="prose prose-neutral dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:scroll-mt-20
            prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-border/40 prose-h2:pb-2
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-base prose-p:leading-7 prose-p:my-4
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-blockquote:border-l-primary prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:bg-muted/30 prose-blockquote:py-2
            prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-pre:overflow-x-auto
            prose-img:rounded-lg prose-img:shadow-lg prose-img:my-8
            prose-ul:list-disc prose-ul:my-4
            prose-ol:list-decimal prose-ol:my-4
            prose-li:my-1
            prose-table:border-collapse prose-table:border prose-table:border-border
            prose-th:border prose-th:border-border prose-th:bg-muted prose-th:p-2
            prose-td:border prose-td:border-border prose-td:p-2
            prose-strong:font-bold prose-strong:text-foreground"
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        {/* 上一篇/下一篇导航 */}
        <ArticleNavigation
          prev={prevArticle ? {
            slug: prevArticle.slugAsParams,
            title: prevArticle.title,
            description: prevArticle.description,
          } : undefined}
          next={nextArticle ? {
            slug: nextArticle.slugAsParams,
            title: nextArticle.title,
            description: nextArticle.description,
          } : undefined}
          locale={resolvedParams.locale}
          prevLabel={t('articles.prevArticle')}
          nextLabel={t('articles.nextArticle')}
        />

        {/* 文章底部 */}
        <footer className="mt-8 pt-8 border-t border-border/40">
          <div className="flex items-center justify-between">
            <Link 
              href={`/${resolvedParams.locale}/articles`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('articles.backToList')}
            </Link>

            <Link 
              href={`/${resolvedParams.locale}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {t('navigation.home')}
            </Link>
          </div>
        </footer>
      </ArticleLayout>
    </div>
  )
} 