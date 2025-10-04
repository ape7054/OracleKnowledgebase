'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from '@/components/SiteHeader'
import { tools, toolCategories, type ToolCategory } from '@/config/tools'
import { useTranslations } from 'next-intl'
import { ExternalLink, Search, Info } from 'lucide-react'

type SortOption = 'default' | 'name' | 'category'

export default function ToolsPage() {
  const t = useTranslations()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all')
  const [sortBy, setSortBy] = useState<SortOption>('default')

  // 筛选和排序工具
  const filteredTools = useMemo(() => {
    let result = tools

    // 按分类筛选
    if (selectedCategory !== 'all') {
      result = result.filter(tool => tool.category === selectedCategory)
    }

    // 按搜索词筛选
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query)) ||
        t(tool.descriptionKey).toLowerCase().includes(query)
      )
    }

    // 排序
    const sorted = [...result]
    switch (sortBy) {
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'category':
        sorted.sort((a, b) => a.category.localeCompare(b.category))
        break
      default:
        // 保持默认顺序
        break
    }

    return sorted
  }, [searchQuery, selectedCategory, sortBy, t])

  return (
    <div className="min-h-screen bg-background">
      {/* 顶部导航条 */}
      <SiteHeader />

      {/* 头部区域 */}
      <section className="py-16 md:py-20 border-b border-border/40">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-4xl">
              🛠️
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t('tools.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('tools.subtitle')}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>{t('tools.totalTools', { count: tools.length })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 搜索和筛选区域 */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          <div className="space-y-6">
            {/* 搜索框和排序 */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* 搜索框 */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t('tools.searchPlaceholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* 排序选择器 */}
              <div className="w-full md:w-auto">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger className="w-full md:w-[180px]">
                    <SelectValue placeholder={t('tools.sort.label')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">{t('tools.sort.default')}</SelectItem>
                    <SelectItem value="name">{t('tools.sort.name')}</SelectItem>
                    <SelectItem value="category">{t('tools.sort.category')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 分类标签页 */}
            <Tabs 
              value={selectedCategory} 
              onValueChange={(value) => setSelectedCategory(value as ToolCategory | 'all')}
              className="w-full"
            >
              <TabsList className="w-full justify-start h-auto flex-wrap gap-2 bg-transparent p-0">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  {t('tools.allCategories')}
                </TabsTrigger>
                {toolCategories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {t(`tools.categories.${category}`)}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      <Separator />

      {/* 工具卡片网格 */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-6xl">
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card 
                  key={tool.id} 
                  className="group border border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-4">
                    {/* 图标和名称 */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className="text-3xl cursor-help">{tool.icon}</div>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{tool.name}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <div>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                            {tool.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {t(`tools.categories.${tool.category}`)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {t(tool.descriptionKey)}
                    </p>

                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1.5">
                      <TooltipProvider>
                        {tool.tags.slice(0, 3).map((tag) => (
                          <Tooltip key={tag}>
                            <TooltipTrigger asChild>
                              <Badge 
                                variant="outline" 
                                className="text-xs cursor-help"
                              >
                                {tag}
                              </Badge>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>#{tag}</p>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </TooltipProvider>
                    </div>

                    {/* 按钮组 */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                        asChild
                      >
                        <a 
                          href={tool.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2"
                        >
                          {t('tools.visitWebsite')}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </Button>

                      {/* 详情弹窗 */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-3">
                              <span className="text-3xl">{tool.icon}</span>
                              {tool.name}
                            </DialogTitle>
                            <DialogDescription className="pt-4 space-y-4">
                              {/* 描述 */}
                              <div>
                                <p className="text-base text-foreground leading-relaxed">
                                  {t(tool.descriptionKey)}
                                </p>
                              </div>

                              <Separator />

                              {/* 分类 */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">
                                  {t('tools.dialog.category')}
                                </p>
                                <Badge variant="secondary">
                                  {t(`tools.categories.${tool.category}`)}
                                </Badge>
                              </div>

                              {/* 标签 */}
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-foreground">
                                  {t('tools.dialog.tags')}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {tool.tags.map((tag) => (
                                    <Badge key={tag} variant="outline">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                              </div>

                              <Separator />

                              {/* 访问按钮 */}
                              <div className="pt-2">
                                <Button className="w-full" asChild>
                                  <a 
                                    href={tool.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2"
                                  >
                                    {t('tools.dialog.officialSite')}
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg text-muted-foreground">
                {t('tools.noResults')}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
