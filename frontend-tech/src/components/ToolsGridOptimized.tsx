'use client'

import { lazy, Suspense } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from 'next-intl'
import { 
  ExternalLink, 
  Info,
  Github,
  MessageCircleQuestion,
  Triangle,
  Package,
  Bot,
  Brain,
  Palette,
  Sparkles,
  Search,
  Waves,
  Wallet,
  Ship,
  Zap,
  TrendingUp,
  DollarSign,
  Figma,
  Dribbble,
  Paintbrush,
  BookOpen,
  Flame,
  Code2,
  FileText,
  BarChart3,
  type LucideIcon
} from 'lucide-react'
import { type Tool } from '@/config/tools'

// 图标映射
const iconMap: Record<string, LucideIcon> = {
  Github,
  MessageCircleQuestion,
  Triangle,
  Package,
  Bot,
  Brain,
  Palette,
  Sparkles,
  Search,
  Waves,
  Wallet,
  Ship,
  Zap,
  TrendingUp,
  DollarSign,
  Figma,
  Dribbble,
  Paintbrush,
  BookOpen,
  Flame,
  Code2,
  FileText,
  BarChart3,
}

// 获取图标组件
const getIcon = (iconName: string) => {
  return iconMap[iconName] || Package
}

// 懒加载重型组件
const Dialog = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.Dialog })))
const DialogContent = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogContent })))
const DialogDescription = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogDescription })))
const DialogHeader = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogHeader })))
const DialogTitle = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogTitle })))
const DialogTrigger = lazy(() => import("@/components/ui/dialog").then(mod => ({ default: mod.DialogTrigger })))
const Tooltip = lazy(() => import("@/components/ui/tooltip").then(mod => ({ default: mod.Tooltip })))
const TooltipContent = lazy(() => import("@/components/ui/tooltip").then(mod => ({ default: mod.TooltipContent })))
const TooltipProvider = lazy(() => import("@/components/ui/tooltip").then(mod => ({ default: mod.TooltipProvider })))
const TooltipTrigger = lazy(() => import("@/components/ui/tooltip").then(mod => ({ default: mod.TooltipTrigger })))
const Separator = lazy(() => import("@/components/ui/separator").then(mod => ({ default: mod.Separator })))

interface ToolsGridOptimizedProps {
  tools: Tool[]
}

function TooltipWrapper({ children, content }: { children: React.ReactNode; content: string }) {
  return (
    <Suspense fallback={children}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {children}
          </TooltipTrigger>
          <TooltipContent>
            <p>{content}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Suspense>
  )
}

function DialogWrapper({ tool, t }: { tool: Tool; t: ReturnType<typeof useTranslations> }) {
  return (
    <Suspense fallback={<Skeleton className="h-9 w-9" />}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Info className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                {(() => {
                  const Icon = getIcon(tool.icon)
                  return <Icon className="h-6 w-6 text-primary" />
                })()}
              </div>
              {tool.name}
            </DialogTitle>
            <DialogDescription className="pt-4 space-y-4">
              <div>
                <p className="text-base text-foreground leading-relaxed">
                  {t(tool.descriptionKey)}
                </p>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  {t('tools.dialog.category')}
                </p>
                <Badge variant="secondary">
                  {t(`tools.categories.${tool.category}`)}
                </Badge>
              </div>

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
    </Suspense>
  )
}

export function ToolsGridOptimized({ tools }: ToolsGridOptimizedProps) {
  const t = useTranslations()

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Card 
                key={tool.id} 
                className="group border border-border/50 hover:shadow-lg hover:border-primary/50 transition-all duration-300"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <TooltipWrapper content={tool.name}>
                        <div className="p-2 rounded-lg bg-primary/10 cursor-help">
                          {(() => {
                            const Icon = getIcon(tool.icon)
                            return <Icon className="h-6 w-6 text-primary" />
                          })()}
                        </div>
                      </TooltipWrapper>
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

                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {t(tool.descriptionKey)}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {tool.tags.slice(0, 3).map((tag) => (
                      <TooltipWrapper key={tag} content={`#${tag}`}>
                        <Badge 
                          variant="outline" 
                          className="text-xs cursor-help"
                        >
                          {tag}
                        </Badge>
                      </TooltipWrapper>
                    ))}
                  </div>

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

                    <DialogWrapper tool={tool} t={t} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
            <p className="text-lg text-muted-foreground">
              暂无相关工具
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
