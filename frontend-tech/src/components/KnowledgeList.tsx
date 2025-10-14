'use client'

import React, { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Calendar, FileText, BookOpen, Dna, Link2, Code2, Scale, Atom, Microscope, Smartphone, Eye } from 'lucide-react'
import { type Article } from '#site/content'
import { ArticleDialog } from './ArticleDialog'

// 图标映射：将 emoji 映射到 React 图标组件
const emojiIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  '🧬': Dna,
  '⛓️': Link2,
  '🔗': Link2,
  '💻': Code2,
  '⚖️': Scale,
  '⚛️': Atom,
  '📖': BookOpen,
  '📄': FileText,
}

// 字符串名称映射到图标组件
const iconComponentMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Link2': Link2,
  'Code2': Code2,
  'Microscope': Microscope,
  'Scale': Scale,
  'Smartphone': Smartphone,
  'Atom': Atom,
  'FileText': FileText,
  'BookOpen': BookOpen,
  'Dna': Dna,
}

interface KnowledgeListProps {
  articlesByCategory: Record<string, Article[]>
  categoryConfig: Record<string, { icon: string; color: string; desc: string }>
  selectedCategory: string | null
  onCategorySelect: (category: string) => void
}

export function KnowledgeList({ 
  articlesByCategory, 
  categoryConfig, 
  selectedCategory,
  onCategorySelect
}: KnowledgeListProps) {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article)
    setDialogOpen(true)
  }

  return (
    <section className="space-y-12">
      {Object.entries(articlesByCategory).map(([category, categoryArticles]) => {
        const iconName = categoryConfig[category]?.icon || 'FileText'
        const CategoryIcon = iconComponentMap[iconName] || FileText
        return (
          <div key={category} className="space-y-6">
            {/* 分类标题 */}
            <div className="flex items-center gap-3 pb-4 border-b border-border/40">
              <div className="text-primary">
                <CategoryIcon className="h-8 w-8" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {categoryConfig[category]?.desc || '相关知识'} · {categoryArticles.length} 条
                </p>
              </div>
              <Badge variant="outline" className="hidden sm:inline-flex">
                {categoryArticles.length} 条
              </Badge>
            </div>
          
          {/* 知识条目网格 - 带动画效果 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryArticles.slice(0, selectedCategory ? undefined : 6).map((article, index) => (
              <BlurFade key={article.slug} delay={0.1 + index * 0.05} inView>
                <Card 
                  className="border border-border/50 hover:shadow-xl hover:border-primary/20 hover:scale-[1.02] transition-all duration-300 group cursor-pointer h-full"
                  onClick={() => handleArticleClick(article)}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="group-hover:border-primary/50 transition-colors">
                        {article.category}
                      </Badge>
                      {article.icon && emojiIconMap[article.icon] && (
                        <div className="text-primary opacity-70 group-hover:opacity-100 transition-opacity">
                          {React.createElement(emojiIconMap[article.icon], { className: "h-6 w-6" })}
                        </div>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 min-h-[3.5rem]">
                      {article.title}
                    </h3>
                    
                    {article.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3 min-h-[4rem]">
                        {article.description}
                      </p>
                    )}
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(article.date).toLocaleDateString('zh-CN')}
                      </span>
                      {article.readTime && (
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      )}
                    </div>
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {article.tags.slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                        {article.tags.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{article.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* 悬浮时显示的查看详情按钮 */}
                    <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="h-4 w-4" />
                      <span>点击查看详情</span>
                    </div>
                  </CardContent>
                </Card>
              </BlurFade>
            ))}
          </div>
          
          {/* 查看更多按钮 - 仅在未筛选且知识条目数量超过6条时显示 */}
          {!selectedCategory && categoryArticles.length > 6 && (
            <div className="text-center pt-4">
              <button 
                onClick={() => onCategorySelect(category)}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline font-medium"
              >
                查看 {category} 的全部 {categoryArticles.length} 条知识
                <span>→</span>
              </button>
            </div>
          )}
          </div>
        )
      })}

      {/* 文章详情弹窗 */}
      <ArticleDialog 
        article={selectedArticle}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </section>
  )
}

