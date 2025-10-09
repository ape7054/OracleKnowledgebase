'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Tag, ExternalLink } from 'lucide-react'
import { type Article } from '#site/content'
import Link from 'next/link'
import { useLocale } from 'next-intl'

interface ArticleDialogProps {
  article: Article | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ArticleDialog({ article, open, onOpenChange }: ArticleDialogProps) {
  const locale = useLocale()
  
  if (!article) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{article.title}</DialogTitle>
              {article.description && (
                <DialogDescription className="text-base">
                  {article.description}
                </DialogDescription>
              )}
            </div>
            <Badge variant="outline" className="shrink-0">
              {article.category}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* 元信息 */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            {article.date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <span>{new Date(article.date).toLocaleDateString(locale)}</span>
              </div>
            )}
            {article.readTime && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{article.readTime}</span>
              </div>
            )}
            {article.author && (
              <div className="flex items-center gap-1.5">
                <span>作者: {article.author}</span>
              </div>
            )}
          </div>

          {/* 标签 */}
          {article.tags && article.tags.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Tag className="h-4 w-4" />
                <span>标签</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, i) => (
                  <Badge key={i} variant="secondary">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 文章摘要或简介 */}
          {article.description && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {article.description}
              </p>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-3 pt-4 border-t">
            <Button asChild className="flex-1">
              <Link href={`/${locale}/knowledge/${article.slugAsParams}`}>
                <ExternalLink className="h-4 w-4 mr-2" />
                阅读全文
              </Link>
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              关闭
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

