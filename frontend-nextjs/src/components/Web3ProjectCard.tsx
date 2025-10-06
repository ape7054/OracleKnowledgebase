'use client'

import { Web3Project } from '@/config/web3-projects'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Globe, Twitter, BookOpen } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'

interface Web3ProjectCardProps {
  project: Web3Project
  latestUpdate?: {
    date: string
    type: string
  }
  onClick?: () => void
}

export function Web3ProjectCard({ project, latestUpdate, onClick }: Web3ProjectCardProps) {
  const t = useTranslations('web3')
  const locale = useLocale()

  // 计算距离今天的天数
  const getDaysAgo = (dateString: string) => {
    const updateDate = new Date(dateString)
    const today = new Date()
    const diffTime = Math.abs(today.getTime() - updateDate.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  // 获取更新类型的图标和颜色
  const getUpdateTypeStyle = (type: string) => {
    const styles = {
      regulatory: { icon: '🔴', color: 'bg-red-500/10 text-red-700 dark:text-red-400' },
      tech: { icon: '🔵', color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400' },
      ecosystem: { icon: '🟢', color: 'bg-green-500/10 text-green-700 dark:text-green-400' },
      other: { icon: '⚪', color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400' }
    }
    return styles[type as keyof typeof styles] || styles.other
  }

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-primary/50" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">{project.logo}</div>
            <div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {project.name}
              </CardTitle>
              <Badge variant="secondary" className="mt-1">
                {t(`categories.${project.category}`)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="line-clamp-2">
          {locale === 'zh' ? project.description.zh : project.description.en}
        </CardDescription>

        {/* 最新动态标识 */}
        {latestUpdate && (
          <div className="flex items-center gap-2 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUpdateTypeStyle(latestUpdate.type).color}`}>
              {getUpdateTypeStyle(latestUpdate.type).icon} {t(`updateTypes.${latestUpdate.type}`)}
            </span>
            <span className="text-muted-foreground">
              {t('daysAgo', { days: getDaysAgo(latestUpdate.date) })}
            </span>
          </div>
        )}

        {/* 链接 */}
        <div className="flex items-center gap-2 pt-2">
          {project.links.website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.links.website, '_blank')
              }}
            >
              <Globe className="w-4 h-4 mr-1" />
              {t('visitWebsite')}
            </Button>
          )}
          {project.links.twitter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.links.twitter, '_blank')
              }}
            >
              <Twitter className="w-4 h-4" />
            </Button>
          )}
          {project.links.docs && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                window.open(project.links.docs, '_blank')
              }}
            >
              <BookOpen className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
