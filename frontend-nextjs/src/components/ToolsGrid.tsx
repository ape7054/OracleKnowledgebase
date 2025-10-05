'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { useTranslations } from 'next-intl'
import { ExternalLink, Info } from 'lucide-react'
import { type Tool } from '@/config/tools'

interface ToolsGridProps {
  tools: Tool[]
}

export function ToolsGrid({ tools }: ToolsGridProps) {
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
  )
}
