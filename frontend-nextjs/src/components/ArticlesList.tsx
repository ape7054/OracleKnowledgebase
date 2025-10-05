'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Calendar } from 'lucide-react'
import { type Article } from '#site/content'

interface ArticlesListProps {
  articlesByCategory: Record<string, Article[]>
  categoryConfig: Record<string, { icon: string; color: string; desc: string }>
  selectedCategory: string | null
  onCategorySelect: (category: string) => void
}

export function ArticlesList({ 
  articlesByCategory, 
  categoryConfig, 
  selectedCategory,
  onCategorySelect
}: ArticlesListProps) {
  const locale = useLocale()

  return (
    <section className="space-y-12">
      {Object.entries(articlesByCategory).map(([category, categoryArticles]) => (
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
                onClick={() => onCategorySelect(category)}
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
  )
}
