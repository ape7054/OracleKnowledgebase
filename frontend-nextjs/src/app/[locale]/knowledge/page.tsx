import { articles } from '#site/content'
import { SiteHeader } from '@/components/SiteHeader'
import { KnowledgeFilter } from '@/components/KnowledgeFilter'
import { Breadcrumbs } from '@/components/Breadcrumbs'

interface KnowledgePageProps {
  params: Promise<{ locale: string }>
}

export default async function KnowledgePage({ params }: KnowledgePageProps) {
  const { locale } = await params
  
  // 筛选当前语言和已发布的文章
  const publishedArticles = articles
    .filter(article => article.published && article.locale === locale)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // 按分类组织文章
  const articlesByCategory = publishedArticles.reduce((acc, article) => {
    const category = article.category || '其他'
    if (!acc[category]) {
      acc[category] = []
    }
    acc[category].push(article)
    return acc
  }, {} as Record<string, typeof publishedArticles>)

  // 分类图标和颜色配置
  const categoryConfig: Record<string, { icon: string; color: string; desc: string }> = {
    'Web3': { icon: 'Link2', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50', desc: '区块链与去中心化' },
    '技术': { icon: 'Code2', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200/50', desc: '编程与开发' },
    '科学': { icon: 'Microscope', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200/50', desc: '科学知识与研究' },
    '法律': { icon: 'Scale', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50', desc: '法律与权益' },
    '产品': { icon: 'Smartphone', color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50', desc: '产品设计与开发' },
    '量子': { icon: 'Atom', color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200/50', desc: '量子科学' },
    'Web3 & 区块链': { icon: 'Link2', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50', desc: 'Web3 与区块链技术' },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 全局导航 */}
      <SiteHeader />

      {/* 页面容器 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* 面包屑导航 */}
        <Breadcrumbs locale={locale} />
        
        <KnowledgeFilter 
          articles={publishedArticles}
          articlesByCategory={articlesByCategory}
          categoryConfig={categoryConfig}
        />
      </div>
    </div>
  )
} 

