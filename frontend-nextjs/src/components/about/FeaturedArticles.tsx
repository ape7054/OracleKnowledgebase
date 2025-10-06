'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, listItem } from '@/lib/motion'
import { ArrowRight, Clock } from 'lucide-react'

// 精选文章数据（可以从实际的文章数据中获取）
const featuredArticles = [
  {
    id: 'ramanujan-manifesto',
    title: 'featuredArticles.manifesto.title',
    description: 'featuredArticles.manifesto.description',
    category: 'featuredArticles.manifesto.category',
    readTime: 'featuredArticles.manifesto.readTime',
    slug: 'the-ramanujan-manifesto',
    icon: '🔥'
  },
  {
    id: 'web-architecture',
    title: 'featuredArticles.webArchitecture.title',
    description: 'featuredArticles.webArchitecture.description',
    category: 'featuredArticles.webArchitecture.category',
    readTime: 'featuredArticles.webArchitecture.readTime',
    slug: 'web-architecture-evolution',
    icon: '⚡'
  },
  {
    id: 'dao-guide',
    title: 'featuredArticles.daoGuide.title',
    description: 'featuredArticles.daoGuide.description',
    category: 'featuredArticles.daoGuide.category',
    readTime: 'featuredArticles.daoGuide.readTime',
    slug: 'dao-beginner-guide',
    icon: '⛓️'
  }
]

export function FeaturedArticles() {
  const t = useTranslations('about')

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 flex items-center gap-3">
            <span>📝</span>
            {t('featuredArticles.title')}
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {featuredArticles.map((article) => (
            <motion.div key={article.id} variants={listItem}>
              <Card className="h-full border border-border/50 hover:shadow-xl transition-all hover:-translate-y-2 group">
                <CardContent className="p-6 space-y-4 flex flex-col h-full">
                  {/* 图标和分类 */}
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{article.icon}</span>
                    <Badge variant="secondary" className="text-xs">
                      {t(article.category)}
                    </Badge>
                  </div>

                  {/* 标题 */}
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {t(article.title)}
                  </h3>

                  {/* 描述 */}
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                    {t(article.description)}
                  </p>

                  {/* 底部信息 */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{t(article.readTime)}</span>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/articles/${article.slug}`} className="gap-1">
                        {t('featuredArticles.readMore')}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* 查看更多链接 */}
        <motion.div
          className="mt-12 text-center"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Button size="lg" variant="outline" asChild>
            <Link href="/articles" className="gap-2">
              {t('featuredArticles.viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

