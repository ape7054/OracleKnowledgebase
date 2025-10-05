'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Folder, X } from 'lucide-react'
import { type Article } from '#site/content'
import { ArticlesList } from './ArticlesList'

interface ArticlesFilterProps {
  articles: Article[]
  articlesByCategory: Record<string, Article[]>
  categoryConfig: Record<string, { icon: string; color: string; desc: string }>
}

export function ArticlesFilter({ articles, articlesByCategory, categoryConfig }: ArticlesFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // 筛选文章
  const filteredArticles = searchQuery
    ? articles.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : articles

  const filteredByCategory = selectedCategory
    ? { [selectedCategory]: articlesByCategory[selectedCategory] || [] }
    : articlesByCategory

  return (
    <div className="flex gap-8">
      {/* 左侧边栏 */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 space-y-6">
          {/* 搜索 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-4 w-4" />
                <h3 className="text-sm font-semibold">搜索</h3>
              </div>
              <Input
                type="text"
                placeholder="搜索文章..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                    {articles.length}
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
            文章列表
          </h1>
          <p className="text-muted-foreground">
            涵盖技术、科学、社会等多个领域的知识分享，共 {articles.length} 篇文章
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

        {/* 文章列表 */}
        <ArticlesList 
          articlesByCategory={filteredByCategory}
          categoryConfig={categoryConfig}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* 空状态 */}
        {articles.length === 0 && (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">📚</div>
            <p className="text-xl font-semibold mb-2">暂无文章</p>
            <p className="text-muted-foreground">敬请期待更多精彩内容</p>
          </div>
        )}
      </main>
    </div>
  )
}
