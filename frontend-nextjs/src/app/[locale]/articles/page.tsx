'use client'

import { articles } from '#site/content'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { SiteHeader } from '@/components/SiteHeader'
import { Calendar, Search, Folder, X } from 'lucide-react'
import { useState, use } from 'react'

interface ArticlesPageProps {
  params: Promise<{ locale: string }>
}

export default function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = use(params)
  const t = useTranslations()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  
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
    'Web3': { icon: '🔗', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50', desc: '区块链与去中心化' },
    '技术': { icon: '💻', color: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-200/50', desc: '编程与开发' },
    '科学': { icon: '🔬', color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200/50', desc: '科学知识与研究' },
    '法律': { icon: '⚖️', color: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-200/50', desc: '法律与权益' },
    '产品': { icon: '📱', color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50', desc: '产品设计与开发' },
    '量子': { icon: '⚛️', color: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border-indigo-200/50', desc: '量子科学' },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 全局导航 */}
      <SiteHeader />

      {/* 页面容器 */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* 左侧边栏 - 简单固定宽度 */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* 搜索 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Search className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">搜索</h3>
                  </div>
                  <input
                    type="text"
                    placeholder="搜索文章..."
                    className="w-full px-3 py-2 text-sm border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </CardContent>
              </Card>

              {/* 分类筛选 */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Folder className="h-4 w-4" />
                    <h3 className="text-sm font-semibold">分类 ({Object.keys(articlesByCategory).length})</h3>
                  </div>
                  <div className="space-y-1">
                    {/* 全部分类选项 */}
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className={`flex items-center justify-between w-full text-left text-sm rounded-md px-3 py-2 transition-colors ${
                        selectedCategory === null 
                          ? 'bg-primary text-primary-foreground' 
                          : 'hover:bg-accent'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">📚</span>
                        <span className="font-medium">全部分类</span>
                      </div>
                      <Badge variant={selectedCategory === null ? "default" : "secondary"} className="text-xs">
                        {publishedArticles.length}
                      </Badge>
                    </button>
                    
                    {Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`flex items-center justify-between w-full text-left text-sm rounded-md px-3 py-2 transition-colors ${
                          selectedCategory === category 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-accent'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{categoryConfig[category]?.icon || '📄'}</span>
                          <span className="font-medium">{category}</span>
                        </div>
                        <Badge variant={selectedCategory === category ? "default" : "secondary"} className="text-xs">
                          {categoryArticles.length}
                        </Badge>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* 右侧主内容区 */}
          <main className="flex-1 min-w-0">
            {/* 头部介绍区 */}
            <section className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                {t('articles.title')}
              </h1>
              <p className="text-muted-foreground">
                涵盖技术、科学、社会等多个领域的知识分享，共 {publishedArticles.length} 篇文章
              </p>
              
              {/* 筛选状态显示 */}
              {selectedCategory && (
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="outline" className="text-sm py-1.5 px-3">
                    <span className="mr-2">{categoryConfig[selectedCategory]?.icon || '📄'}</span>
                    当前筛选: {selectedCategory}
                  </Badge>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <X className="h-3 w-3" />
                    清除筛选
                  </button>
                </div>
              )}
            </section>

            {/* 按分类展示文章 */}
            <section className="space-y-12">
              {Object.entries(articlesByCategory)
                .filter(([category]) => !selectedCategory || category === selectedCategory)
                .map(([category, categoryArticles]) => (
                <div key={category} className="space-y-6">
                  {/* 分类标题 */}
                  <div className="flex items-center gap-3 pb-4 border-b border-border/40">
                    <span className="text-3xl">{categoryConfig[category]?.icon || '📄'}</span>
                    <div className="flex-1">
                      <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                      <p className="text-sm text-muted-foreground mt-1">
                        {categoryConfig[category]?.desc || '相关文章'} · {categoryArticles.length} 篇文章
                      </p>
                    </div>
                    <Badge variant="outline" className="hidden sm:inline-flex">
                      {categoryArticles.length} 篇
                    </Badge>
                  </div>
                  
                  {/* 文章网格 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categoryArticles.slice(0, selectedCategory ? undefined : 6).map((article) => (
                      <Link 
                        key={article.slug} 
                        href={`/${locale}/articles/${article.slugAsParams}`}
                      >
                        <Card className="border border-border/50 hover:shadow-lg hover:border-primary/20 transition-all group cursor-pointer h-full">
                          <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <Badge variant="outline" className="group-hover:border-primary/50 transition-colors">
                                {article.category}
                              </Badge>
                              {article.icon && (
                                <span className="text-2xl">{article.icon}</span>
                              )}
                            </div>
                            
                            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            
                            {article.description && (
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {article.description}
                              </p>
                            )}
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {new Date(article.date).toLocaleDateString(locale)}
                              </span>
                              {article.readTime && <span>📖 {article.readTime}</span>}
                            </div>
                            
                            {article.tags && article.tags.length > 0 && (
                              <div className="flex flex-wrap gap-1.5">
                                {article.tags.slice(0, 3).map((tag, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  
                  {/* 查看更多按钮 - 仅在未筛选且文章数量超过6篇时显示 */}
                  {!selectedCategory && categoryArticles.length > 6 && (
                    <div className="text-center pt-4">
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
                      >
                        查看 {category} 的全部 {categoryArticles.length} 篇文章
                        <span>→</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </section>

            {/* 空状态 */}
            {publishedArticles.length === 0 && (
              <div className="text-center py-24">
                <div className="text-6xl mb-4">📚</div>
                <p className="text-xl font-semibold mb-2">暂无文章</p>
                <p className="text-muted-foreground">敬请期待更多精彩内容</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
} 