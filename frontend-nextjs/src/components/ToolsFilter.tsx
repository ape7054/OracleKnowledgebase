'use client'

import { useState, useMemo } from 'react'
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { type Tool, type ToolCategory } from '@/config/tools'
import { ToolsGridOptimized } from './ToolsGridOptimized'

type SortOption = 'default' | 'name' | 'category'

interface ToolsFilterProps {
  tools: Tool[]
  categories: ToolCategory[]
}

export function ToolsFilter({ tools, categories }: ToolsFilterProps) {
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
  }, [searchQuery, selectedCategory, sortBy, t, tools])

  return (
    <>
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
                {categories.map((category) => (
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

      {/* 工具网格 */}
      <ToolsGridOptimized tools={filteredTools} />
    </>
  )
}
