'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { LLMRanking, getBadgeInfo } from '@/config/llm-rankings'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { NumberTicker } from '@/components/ui/number-ticker'
import { BorderBeam } from '@/components/ui/border-beam'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { useTranslations, useLocale } from 'next-intl'
import { Brain, Code2, Calculator, Lightbulb, BookOpen, DollarSign, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useIsMobile } from '@/hooks/use-mobile'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useIntersectionObserver } from '@/hooks/use-intersection-observer'

const SparklesCore = dynamic(
  () => import('@/components/ui/sparkles').then((mod) => mod.SparklesCore),
  { ssr: false, loading: () => null }
)

interface LLMRankingCardProps {
  model: LLMRanking
  rank: number
  isTopRanked?: boolean
}

export function LLMRankingCard({ model, rank, isTopRanked = false }: LLMRankingCardProps) {
  const t = useTranslations('ai.ranking')
  const locale = useLocale()
  
  // 性能优化：检测设备类型、用户偏好和视口状态
  const isMobile = useIsMobile()
  const prefersReducedMotion = useReducedMotion()
  const { ref, isInView } = useIntersectionObserver({ threshold: 0.1 })
  
  // 仅在桌面端、用户未禁用动画、且卡片在视口内时启用重型动画
  const shouldShowParticles = isTopRanked && !prefersReducedMotion && isInView

  const sparkleProps = useMemo(() => {
    if (!shouldShowParticles) {
      return null
    }

    if (isMobile) {
      return {
        particleDensity: 60,
        speed: 0.45,
        minSize: 0.75,
        maxSize: 2.2,
        className: 'opacity-45',
      }
    }

    return {
      particleDensity: 80,
      speed: 0.8,
      minSize: 1,
      maxSize: 3,
      className: 'opacity-50',
    }
  }, [isMobile, shouldShowParticles])

  return (
    <Card 
      ref={ref}
      className={cn(
        "relative group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] overflow-hidden",
        isTopRanked && "border-primary/50 bg-gradient-to-br from-primary/5 to-transparent"
      )}
    >
      {/* 榜首特效 - 边框动画（性能影响较小，保留） */}
      {isTopRanked && <BorderBeam size={250} duration={12} delay={9} />}
      
      {/* 粒子特效 - 桌面端为高密度版本，移动端启用轻量版 */}
      {sparkleProps && (
        <div className="absolute inset-0 pointer-events-none">
          <SparklesCore
            background="transparent"
            particleColor="#FFD700"
            {...sparkleProps}
          />
        </div>
      )}

      <CardContent className="p-4 md:p-6 space-y-4 relative z-10">
        {/* 头部：排名 + 模型名称 + 提供商 */}
        <div className="flex items-start gap-4">
          {/* 排名 */}
          <div className="flex-shrink-0">
            {isTopRanked ? (
              <AnimatedGradientText className="text-4xl md:text-5xl font-bold">
                #{rank}
              </AnimatedGradientText>
            ) : (
              <div className="text-3xl md:text-4xl font-bold text-muted-foreground">
                #{rank}
              </div>
            )}
          </div>

          {/* 模型信息 */}
          <div className="flex-1 min-w-0 space-y-2">
            <div>
              <h3 className={cn(
                "text-lg md:text-xl font-bold truncate",
                isTopRanked && "text-primary"
              )}>
                {model.modelName}
              </h3>
              <p className="text-sm text-muted-foreground">{model.provider}</p>
            </div>

            {/* 徽章标签 */}
            <div className="flex flex-wrap gap-1.5">
              {model.highlights.map((highlight) => {
                const badgeInfo = getBadgeInfo(highlight)
                return (
                  <Badge 
                    key={highlight} 
                    variant={badgeInfo.variant as "default" | "secondary" | "destructive" | "outline"}
                    className="text-xs"
                  >
                    {locale === 'zh' ? badgeInfo.label.zh : badgeInfo.label.en}
                  </Badge>
                )
              })}
            </div>
          </div>

          {/* 综合评分 */}
          <div className="flex-shrink-0 text-right">
            <div className="text-xs text-muted-foreground mb-1">
              {t('overallScore')}
            </div>
            <div className="text-2xl md:text-3xl font-bold text-primary">
              <NumberTicker value={model.scores.overall} />
            </div>
          </div>
        </div>

        {/* 性能指标条 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Code2 className="h-3 w-3" />
                {t('coding')}
              </span>
              <span className="font-medium">{model.scores.coding}%</span>
            </div>
            <Progress value={model.scores.coding} className="h-1.5" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Calculator className="h-3 w-3" />
                {t('math')}
              </span>
              <span className="font-medium">{model.scores.math}%</span>
            </div>
            <Progress value={model.scores.math} className="h-1.5" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Lightbulb className="h-3 w-3" />
                {t('reasoning')}
              </span>
              <span className="font-medium">{model.scores.reasoning}%</span>
            </div>
            <Progress value={model.scores.reasoning} className="h-1.5" />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpen className="h-3 w-3" />
                {t('mmlu')}
              </span>
              <span className="font-medium">{model.scores.mmlu}%</span>
            </div>
            <Progress value={model.scores.mmlu} className="h-1.5" />
          </div>
        </div>

        {/* 底部信息：上下文长度、价格、发布日期 */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1.5">
            <Brain className="h-3 w-3" />
            <span>{model.contextLength}K {t('tokens')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3 w-3" />
            {model.isOpenSource ? (
              <span className="text-green-600 dark:text-green-400 font-medium">
                {t('openSource')}
              </span>
            ) : (
              <span>
                ${model.pricing.input}/{model.pricing.output} {t('perMillion')}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            <span>{new Date(model.releaseDate).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

