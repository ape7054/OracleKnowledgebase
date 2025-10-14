'use client'

import { AIProject } from '@/config/ai-projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Globe, Twitter, BookOpen } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { getProjectIcon, getUpdateTypeIcon } from '@/lib/ai-icons'

interface AIProjectCardProps {
  project: AIProject
  latestUpdate?: {
    date: string
    type: string
  }
  onClick?: () => void
}

export function AIProjectCard({ project, latestUpdate, onClick }: AIProjectCardProps) {
  const t = useTranslations('ai')
  const locale = useLocale()

  // 计算距离今天的天数
  const getDaysAgo = (dateString: string) => {
    const updateDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - updateDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // 获取项目图标组件
  const ProjectIcon = getProjectIcon(project.id)

  return (
    <Card className="group cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300 hover:border-primary/50 overflow-hidden" onClick={onClick}>
      <CardHeader className="pb-3 p-4 md:p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            {/* 项目图标 */}
            <div className="flex items-center justify-center flex-shrink-0">
              <ProjectIcon className="h-10 w-10 md:h-12 md:w-12 transition-transform group-hover:scale-110" />
            </div>
            <div className="min-w-0">
              <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                {project.name}
              </CardTitle>
              <Badge variant="secondary" className="mt-1 text-xs">
                {t(`categories.${project.category}`)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 md:space-y-4 p-4 pt-0 md:p-6 md:pt-0">
        <CardDescription className="line-clamp-2 text-sm">
          {locale === 'zh' ? project.description.zh : project.description.en}
        </CardDescription>

        {/* 最新动态标识 */}
        {latestUpdate && (() => {
          const updateIcon = getUpdateTypeIcon(latestUpdate.type)
          const UpdateIcon = updateIcon.icon
          return (
            <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm">
              <span className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${updateIcon.color}`}>
                <UpdateIcon className="h-3 w-3 flex-shrink-0" />
                {t(`updateTypes.${latestUpdate.type}`)}
              </span>
              <span className="text-muted-foreground text-xs">
                {t('daysAgo', { days: getDaysAgo(latestUpdate.date) })}
              </span>
            </div>
          )
        })()}

        {/* 链接 */}
        <div className="flex items-center gap-2 pt-2">
          {project.links.website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 min-h-[44px] text-xs md:text-sm"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.links.website, '_blank')
              }}
            >
              <Globe className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              {t('visitWebsite')}
            </Button>
          )}
          {project.links.twitter && (
            <Button
              variant="ghost"
              size="sm"
              className="min-w-[44px] min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.links.twitter, '_blank')
              }}
            >
              <Twitter className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          )}
          {project.links.docs && (
            <Button
              variant="ghost"
              size="sm"
              className="min-w-[44px] min-h-[44px]"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.links.docs, '_blank')
              }}
            >
              <BookOpen className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

