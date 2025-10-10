'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { timeline } from "@/config/about-data"
import { useTranslations } from 'next-intl'
import { Briefcase, GraduationCap, Sparkles } from 'lucide-react'
import { Rocket } from '@/lib/icons'
import { motion } from 'framer-motion'
import { fadeInUp, slideInLeft, slideInRight } from '@/lib/motion'

const iconMap = {
  exploration: GraduationCap,
  work: Briefcase,
  transformation: Sparkles
}

const colorMap = {
  exploration: 'border-blue-500/50 bg-blue-500/5',
  work: 'border-primary/50 bg-primary/5',
  transformation: 'border-purple-500/50 bg-purple-500/5'
}

export function CareerTimeline() {
  const t = useTranslations('about')

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8 max-w-4xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold tracking-tight mb-12 flex items-center gap-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Rocket className="w-6 h-6" />
          </div>
          {t('journey.title')}
        </motion.h2>

        <div className="relative space-y-8">
          {/* 时间线连接线 - 仅在桌面端显示 */}
          <div className="hidden md:block absolute left-8 top-8 bottom-8 w-0.5 bg-border" />

          {timeline.map((item, index) => {
            const Icon = iconMap[item.type]
            const colorClass = colorMap[item.type]

            return (
              <motion.div 
                key={item.id} 
                className="relative"
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, margin: "-50px" }}
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
              >
                {/* 时间线节点 - 仅在桌面端显示 */}
                <div className="hidden md:flex absolute left-8 top-8 w-4 h-4 -translate-x-[7px] rounded-full bg-background border-2 border-primary z-10" />

                <Card className={`md:ml-20 ${colorClass} border-2 hover:shadow-xl transition-all hover:-translate-y-1`}>
                  <CardContent className="p-6 space-y-4">
                    {/* 头部 */}
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="space-y-2 flex-1 min-w-[200px]">
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant={item.type === 'work' ? 'default' : 'outline'}>
                            {t(item.period)}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <Icon className="w-5 h-5" />
                            <h4 className="text-xl font-semibold">{t(item.title)}</h4>
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {t(item.description)}
                        </p>
                      </div>
                    </div>

                    {/* 技能标签 */}
                    {item.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* 项目列表 */}
                    {item.projects && item.projects.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <Separator />
                        <div className="space-y-3">
                          {item.projects.map((project, i) => (
                            <div key={i} className="space-y-2">
                              <h5 className="font-medium text-sm flex items-center gap-2">
                                <span className="text-primary">▸</span>
                                {t(project.name)}
                              </h5>
                              <p className="text-sm text-muted-foreground pl-4">
                                {t(project.description)}
                              </p>
                              <div className="flex flex-wrap gap-1.5 pl-4">
                                {project.tech.map((tech, j) => (
                                  <Badge key={j} variant="outline" className="text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 亮点 */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="space-y-2 pt-2">
                        <Separator />
                        <ul className="space-y-1 text-sm text-muted-foreground">
                          {item.highlights.map((highlight, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{t(highlight)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

