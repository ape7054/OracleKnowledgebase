'use client'

import { useState } from 'react'
import { llmRankings, sortRankings, SortBy } from '@/config/llm-rankings'
import { LLMRankingCard } from '@/components/LLMRankingCard'
import { BlurFade } from '@/components/ui/blur-fade'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useTranslations } from 'next-intl'

export function LLMRankingTable() {
  const t = useTranslations('ai.ranking')
  const [sortBy, setSortBy] = useState<SortBy>('overall')
  
  const sortedRankings = sortRankings(llmRankings, sortBy)

  return (
    <div className="space-y-6">
      {/* 排序选择器 */}
      <div className="flex justify-center">
        <Tabs value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
          <TabsList className="grid w-full max-w-2xl grid-cols-5 gap-2">
            <TabsTrigger value="overall" className="text-xs md:text-sm">
              {t('sortOverall')}
            </TabsTrigger>
            <TabsTrigger value="coding" className="text-xs md:text-sm">
              {t('sortCoding')}
            </TabsTrigger>
            <TabsTrigger value="math" className="text-xs md:text-sm">
              {t('sortMath')}
            </TabsTrigger>
            <TabsTrigger value="reasoning" className="text-xs md:text-sm">
              {t('sortReasoning')}
            </TabsTrigger>
            <TabsTrigger value="value" className="text-xs md:text-sm">
              {t('sortValue')}
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* 排行榜列表 */}
      <div className="space-y-4">
        {sortedRankings.map((model, index) => (
          <BlurFade 
            key={`${model.id}-${sortBy}`} 
            delay={0.05 + index * 0.02}
            inView
          >
            <LLMRankingCard
              model={model}
              rank={index + 1}
              isTopRanked={index === 0}
            />
          </BlurFade>
        ))}
      </div>

      {/* 说明文字 */}
      <div className="text-center text-xs text-muted-foreground pt-4 border-t">
        <p>{t('dataSource')}</p>
        <p className="mt-1">{t('lastUpdated')}: 2024-10-11</p>
      </div>
    </div>
  )
}

