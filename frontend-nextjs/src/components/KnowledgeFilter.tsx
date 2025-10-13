'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Folder, X, BookOpen, Library, FileText, Link2, Code2, Microscope, Scale, Smartphone, Atom, SortAsc, Tag as TagIcon } from 'lucide-react'
import { type Article } from '#site/content'
import { KnowledgeList } from './KnowledgeList'

// 图标映射：将字符串映射到 React 图标组件
const iconComponentMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Link2': Link2,
  'Code2': Code2,
  'Microscope': Microscope,
  'Scale': Scale,
  'Smartphone': Smartphone,
  'Atom': Atom,
  'FileText': FileText,
  'BookOpen': BookOpen,
  'Library': Library,
}

interface KnowledgeFilterProps {
  articles: Article[]
  articlesByCategory: Record<string, Article[]>
  categoryConfig: Record<string, { icon: string; color: string; desc: string }>
}

type SortOption = 'latest' | 'oldest' | 'title'

export function KnowledgeFilter({ articles, articlesByCategory, categoryConfig }: KnowledgeFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('latest')

  // 获取所有标签
  const allTags = Array.from(
    new Set(articles.flatMap(article => article.tags || []))
  ).sort()

  // 筛选文章
  let filteredArticles = articles

  // 搜索过滤
  if (searchQuery) {
    filteredArticles = filteredArticles.filter(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }

  // 标签过滤
  if (selectedTags.length > 0) {
    filteredArticles = filteredArticles.filter(article =>
      selectedTags.every(tag => article.tags?.includes(tag))
    )
  }

  // 排序
  filteredArticles = [...filteredArticles].sort((a, b) => {
    switch (sortBy) {
      case 'latest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'title':
        return a.title.localeCompare(b.title, 'zh-CN')
      default:
        return 0
    }
  })

  // 按分类组织筛选后的文章
  const filteredByCategory = filteredArticles.reduce((acc, article) => {
    if (!selectedCategory || article.category === selectedCategory) {
      const category = article.category || '其他'
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(article)
    }
    return acc
  }, {} as Record<string, Article[]>)

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }

  return (
    <div className="flex gap-8">
      {/* 左侧边栏 - 优化版 */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 space-y-4">
          {/* 搜索 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Search className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">搜索知识</h3>
              </div>
              <Input
                type="text"
                placeholder="搜索标题、内容或标签..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </CardContent>
          </Card>

          {/* 排序 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <SortAsc className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">排序方式</h3>
              </div>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">最新发布</SelectItem>
                  <SelectItem value="oldest">最早发布</SelectItem>
                  <SelectItem value="title">标题排序</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* 分类筛选 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Folder className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">知识分类 ({Object.keys(articlesByCategory).length})</h3>
              </div>
              <ScrollArea className="h-[200px] pr-4">
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
                      <Library className="h-4 w-4" />
                      <span className="font-medium">全部</span>
                    </div>
                    <Badge variant={selectedCategory === null ? "default" : "secondary"} className="text-xs">
                      {articles.length}
                    </Badge>
                  </button>
                  
                  {Object.entries(articlesByCategory).map(([category, categoryArticles]) => {
                    const iconName = categoryConfig[category]?.icon || 'FileText'
                    const IconComponent = iconComponentMap[iconName] || FileText
                    return (
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
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium">{category}</span>
                        </div>
                        <Badge variant={selectedCategory === category ? "default" : "secondary"} className="text-xs">
                          {categoryArticles.length}
                        </Badge>
                      </button>
                    )
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* 标签筛选 */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <TagIcon className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-semibold">标签筛选</h3>
              </div>
              <ScrollArea className="h-[200px] pr-4">
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer hover:bg-primary/90 transition-colors"
                      onClick={() => toggleTag(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </aside>

      {/* 右侧主内容区 */}
      <main className="flex-1 min-w-0">
        {/* 头部介绍区 */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              知识库
            </h1>
          </div>
          <p className="text-muted-foreground">
            系统化记录学习与思考，构建个人知识体系 · 共 {articles.length} 条知识
          </p>
          
          {/* 筛选状态显示 */}
          {(selectedCategory || selectedTags.length > 0 || searchQuery) && (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                {selectedCategory && (
                  <Badge variant="outline" className="text-sm py-1.5 px-3 flex items-center gap-2">
                    {(() => {
                      const iconName = categoryConfig[selectedCategory]?.icon
                      const IconComp = (iconName && iconComponentMap[iconName]) || FileText
                      return <IconComp className="h-4 w-4" />
                    })()}
                    分类: {selectedCategory}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                      onClick={() => setSelectedCategory(null)}
                    />
                  </Badge>
                )}
                
                {searchQuery && (
                  <Badge variant="outline" className="text-sm py-1.5 px-3 flex items-center gap-2">
                    <Search className="h-3 w-3" />
                    搜索: {searchQuery}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                      onClick={() => setSearchQuery('')}
                    />
                  </Badge>
                )}

                {selectedTags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-sm py-1.5 px-3 flex items-center gap-2">
                    <TagIcon className="h-3 w-3" />
                    #{tag}
                    <X 
                      className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
                      onClick={() => toggleTag(tag)}
                    />
                  </Badge>
                ))}

                <button
                  onClick={() => {
                    setSelectedCategory(null)
                    setSearchQuery('')
                    setSelectedTags([])
                  }}
                  className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors ml-2"
                >
                  <X className="h-3 w-3" />
                  清除所有筛选
                </button>
              </div>

              <p className="text-sm text-muted-foreground">
                找到 {filteredArticles.length} 条匹配的知识
              </p>
            </div>
          )}
        </section>

        {/* 知识列表 */}
        <KnowledgeList 
          articlesByCategory={filteredByCategory}
          categoryConfig={categoryConfig}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        {/* 空状态 */}
        {articles.length === 0 && (
          <div className="text-center py-24">
            <div className="flex justify-center mb-4">
              <Library className="h-24 w-24 text-muted-foreground/50" />
            </div>
            <p className="text-xl font-semibold mb-2">暂无知识</p>
            <p className="text-muted-foreground">持续学习，不断积累</p>
          </div>
        )}
      </main>
    </div>
  )
}

