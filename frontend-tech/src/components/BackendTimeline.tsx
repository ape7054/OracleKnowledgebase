'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { useTranslations, useLocale } from 'next-intl'
import { backendProjects } from '@/config/backend-projects'
import { getProjectIcon } from '@/lib/backend-icons'

interface ProjectUpdate {
  id: string
  projectId: string
  date: string
  type: 'tech' | 'performance' | 'security' | 'feature' | 'other'
  title: {
    en: string
    zh: string
  }
  summary: {
    en: string
    zh: string
  }
  sourceUrl?: string
}

interface BackendTimelineProps {
  updates: ProjectUpdate[]
  filterProjectId?: string
}

export function BackendTimeline({ updates, filterProjectId }: BackendTimelineProps) {
  const t = useTranslations('backend')
  const locale = useLocale()
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  // 过滤更新
  const filteredUpdates = filterProjectId
    ? updates.filter(update => update.projectId === filterProjectId)
    : updates

  // 按日期降序排序
  const sortedUpdates = [...filteredUpdates].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  // 获取项目信息
  const getProject = (projectId: string) => {
    return backendProjects.find(p => p.id === projectId)
  }

  // 获取更新类型的样式
  const getUpdateTypeStyle = (type: string) => {
    const styles = {
      tech: { 
        icon: '🔵', 
        color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/20',
        dot: 'bg-blue-500'
      },
      performance: { 
        icon: '⚡', 
        color: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20',
        dot: 'bg-yellow-500'
      },
      security: { 
        icon: '🔒', 
        color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
        dot: 'bg-red-500'
      },
      feature: { 
        icon: '✨', 
        color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
        dot: 'bg-green-500'
      },
      other: { 
        icon: '⚪', 
        color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20',
        dot: 'bg-gray-500'
      }
    }
    return styles[type as keyof typeof styles] || styles.other
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(locale, { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  // 切换展开/折叠
  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  if (sortedUpdates.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        {locale === 'zh' ? '暂无更新' : 'No updates'}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {sortedUpdates.map((update, index) => {
        const project = getProject(update.projectId)
        const ProjectIcon = project ? getProjectIcon(project.logo) : null
        const typeStyle = getUpdateTypeStyle(update.type)
        const isExpanded = expandedIds.has(update.id)
        const title = locale === 'zh' ? update.title.zh : update.title.en
        const summary = locale === 'zh' ? update.summary.zh : update.summary.en

        return (
          <div key={update.id} className="relative">
            {/* 时间线连接线 */}
            {index !== sortedUpdates.length - 1 && (
              <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-border" />
            )}

            <Card className="relative hover:shadow-md transition-shadow">
              {/* 时间线圆点 */}
              <div className={`absolute -left-6 top-6 w-4 h-4 rounded-full border-4 border-background ${typeStyle.dot}`} />

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-mono text-muted-foreground">
                        {formatDate(update.date)}
                      </span>
                      {project && (
                        <>
                          <span className="text-muted-foreground">|</span>
                          <div className="flex items-center gap-1.5">
                            {ProjectIcon && <ProjectIcon className="h-4 w-4" />}
                            <span className="font-medium">{project.name}</span>
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className={typeStyle.color}>
                        {typeStyle.icon} {t(`updateTypes.${update.type}`)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <h3 className="font-semibold text-lg leading-tight">
                  {title}
                </h3>
                
                <p className={`text-muted-foreground leading-relaxed ${!isExpanded && 'line-clamp-2'}`}>
                  {summary}
                </p>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpand(update.id)}
                    className="text-xs"
                  >
                    {isExpanded ? (
                      <>
                        <ChevronUp className="w-3 h-3 mr-1" />
                        {locale === 'zh' ? '收起' : 'Show less'}
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-3 h-3 mr-1" />
                        {locale === 'zh' ? '展开' : 'Show more'}
                      </>
                    )}
                  </Button>
                  
                  {update.sourceUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(update.sourceUrl, '_blank')}
                      className="text-xs"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {locale === 'zh' ? '查看来源' : 'View source'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </div>
  )
}

