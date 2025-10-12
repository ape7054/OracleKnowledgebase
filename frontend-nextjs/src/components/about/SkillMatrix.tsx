'use client'

import { Card, CardContent } from "@/components/ui/card"
import { IconCloud } from "@/components/ui/icon-cloud"
import { NumberTicker } from "@/components/ui/number-ticker"
import { BlurFade } from "@/components/ui/blur-fade"
import { skills, skillCategories } from "@/config/about-data"
import { techStack } from "@/config/tech-stack"
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { Cog, Monitor, Server, Layers, Settings } from '@/lib/icons'
import type { LucideIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useMemo } from 'react'

// 技能分类的图标和渐变色配置
const categoryConfig: Record<string, {
  icon: LucideIcon
  gradientFrom: string
  gradientTo: string
  bgGradient: string
  iconColor: string
}> = {
  frontend: {
    icon: Monitor,
    gradientFrom: 'from-blue-500',
    gradientTo: 'to-cyan-500',
    bgGradient: 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10',
    iconColor: 'text-cyan-500'
  },
  backend: {
    icon: Server,
    gradientFrom: 'from-green-500',
    gradientTo: 'to-emerald-500',
    bgGradient: 'bg-gradient-to-br from-green-500/10 to-emerald-500/10',
    iconColor: 'text-emerald-500'
  },
  blockchain: {
    icon: Layers,
    gradientFrom: 'from-purple-500',
    gradientTo: 'to-pink-500',
    bgGradient: 'bg-gradient-to-br from-purple-500/10 to-pink-500/10',
    iconColor: 'text-pink-500'
  },
  devops: {
    icon: Settings,
    gradientFrom: 'from-orange-500',
    gradientTo: 'to-red-500',
    bgGradient: 'bg-gradient-to-br from-orange-500/10 to-red-500/10',
    iconColor: 'text-red-500'
  }
}

// 技能类别的颜色配置（用于进度条和圆点）
const skillCategoryColors: Record<string, {
  dot: string
  progress: string
  progressBg: string
}> = {
  frontend: {
    dot: 'bg-cyan-500',
    progress: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    progressBg: 'bg-blue-500/10'
  },
  backend: {
    dot: 'bg-emerald-500',
    progress: 'bg-gradient-to-r from-green-500 to-emerald-500',
    progressBg: 'bg-green-500/10'
  },
  blockchain: {
    dot: 'bg-pink-500',
    progress: 'bg-gradient-to-r from-purple-500 to-pink-500',
    progressBg: 'bg-purple-500/10'
  },
  devops: {
    dot: 'bg-red-500',
    progress: 'bg-gradient-to-r from-orange-500 to-red-500',
    progressBg: 'bg-orange-500/10'
  }
}

export function SkillMatrix() {
  const t = useTranslations('about')
  const { theme, systemTheme } = useTheme()
  
  // 根据主题动态确定需要变色的图标颜色
  const currentTheme = theme === 'system' ? systemTheme : theme
  const isDark = currentTheme === 'dark'
  
  // 创建图标映射 - 使用 colorValue 用于 Canvas 渲染
  const iconMap: Record<string, React.ReactNode> = useMemo(() => {
    // 需要根据主题变色的图标ID
    const themeAwareIcons = ['nextjs', 'shadcnui', 'vercel']
    
    return Object.fromEntries(
      techStack.map(tech => {
        // 对于需要变色的图标，根据主题使用不同颜色
        const color = themeAwareIcons.includes(tech.id)
          ? (isDark ? '#FFFFFF' : '#000000')
          : tech.colorValue
        
        return [
          tech.id,
          <tech.icon key={tech.id} size={60} color={color} />
        ]
      })
    )
  }, [isDark])

  // 获取所有技能的图标
  const allIcons = skills
    .filter(skill => iconMap[skill.id])
    .map(skill => iconMap[skill.id])
  
  // 创建技能图标映射表（用于技能列表显示）
  const skillIconMap = useMemo(() => {
    return Object.fromEntries(
      techStack.map(tech => [tech.id, { icon: tech.icon, colorClass: tech.colorClass }])
    )
  }, [])

  // 按类别统计技能
  const categoryStats = skillCategories.map(category => {
    const categorySkills = skills.filter(skill => skill.category === category.id)
    const avgProficiency = Math.round(
      categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length
    )
    return {
      ...category,
      count: categorySkills.length,
      avgProficiency
    }
  })

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8 max-w-6xl">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold tracking-tight mb-12 flex items-center gap-3"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Cog className="w-8 h-8" />
          {t('techStack.title')}
        </motion.h2>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="space-y-8"
        >
          {/* Icon Cloud 展示 */}
          <Card className="border border-border/50 bg-card/50 backdrop-blur shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="flex justify-center items-center min-h-[700px] md:min-h-[1000px]">
                <div className="w-full h-full flex items-center justify-center">
                  <IconCloud icons={allIcons} />
                </div>
              </div>

              {/* 技能分类统计 */}
              <div className="mt-8 pt-6 px-6 md:px-10 border-t border-border/50">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {categoryStats.map((category, index) => {
                    const config = categoryConfig[category.id as keyof typeof categoryConfig]
                    const Icon = config.icon
                    
                    return (
                      <BlurFade 
                        key={category.id}
                        delay={0.3 + index * 0.1}
                        direction="up"
                        inView
                      >
                        <div className="group relative text-center p-6 rounded-xl bg-card border border-border/50 hover:border-border hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
                          {/* 背景渐变装饰 */}
                          <div className={`absolute inset-0 ${config.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                          
                          {/* 内容 */}
                          <div className="relative z-10">
                            {/* 图标 */}
                            <div className="flex justify-center mb-4">
                              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo} p-0.5 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                                  <Icon className={`w-7 h-7 ${config.iconColor}`} />
                                </div>
                              </div>
                            </div>
                            
                            {/* 技能数量 */}
                            <div className="text-3xl font-bold text-primary mb-2">
                              <NumberTicker value={category.count} delay={0.5 + index * 0.1} />
                            </div>
                            
                            {/* 类别名称 */}
                            <div className="text-sm font-semibold mb-2 text-foreground">
                              {t(category.label)}
                            </div>
                            
                            {/* 平均熟练度 */}
                            <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                              <span>{t('skills.average')}</span>
                              <NumberTicker 
                                value={category.avgProficiency} 
                                delay={0.7 + index * 0.1}
                                className="text-xs"
                              />
                              <span>%</span>
                            </div>
                          </div>
                        </div>
                      </BlurFade>
                    )
                  })}
                </div>
              </div>

              {/* 技能列表 */}
              <div className="mt-8 pt-6 px-6 md:px-10 pb-6 md:pb-10 border-t border-border/50">
                <h3 className="text-lg font-semibold mb-6">{t('skills.allSkills')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => {
                    const colors = skillCategoryColors[skill.category]
                    const skillIcon = skillIconMap[skill.id]
                    const SkillIcon = skillIcon?.icon
                    
                    return (
                      <BlurFade
                        key={skill.id}
                        delay={0.5 + index * 0.03}
                        direction="up"
                        inView
                      >
                        <div className="group p-4 rounded-lg border border-border/50 bg-card hover:border-border hover:shadow-md transition-all duration-300">
                          {/* 标题行：圆点 + 图标 + 名称 + 百分比 */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                              {/* 类别颜色圆点 */}
                              <div className={`w-2 h-2 rounded-full ${colors.dot} flex-shrink-0`} />
                              {/* 技能图标 */}
                              {SkillIcon && (
                                <SkillIcon 
                                  className={`w-6 h-6 flex-shrink-0 ${skillIcon.colorClass}`}
                                />
                              )}
                              {/* 技能名称 */}
                              <span className="font-medium text-sm truncate">{skill.name}</span>
                            </div>
                            {/* 百分比数字 */}
                            <span className="text-xs font-bold text-foreground ml-2 flex-shrink-0">
                              {skill.proficiency}%
                            </span>
                          </div>
                          
                          {/* 进度条 */}
                          <div 
                            className={`relative h-2 w-full overflow-hidden rounded-full ${colors.progressBg}`}
                            style={{
                              '--skill-progress': `${skill.proficiency}%`,
                              '--skill-delay': `${0.5 + index * 0.03 + 0.2}s`
                            } as React.CSSProperties}
                          >
                            <div 
                              className={`h-full ${colors.progress} rounded-full`}
                              style={{
                                width: 'var(--skill-progress)',
                                transitionDelay: 'var(--skill-delay)',
                                transitionProperty: 'width',
                                transitionDuration: '1000ms',
                                transitionTimingFunction: 'ease-out'
                              }}
                            />
                          </div>
                        </div>
                      </BlurFade>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <motion.div 
            className="p-6 border border-primary/50 bg-primary/5 rounded-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4 }}
          >
            <p className="text-sm text-muted-foreground italic">
              {t('techStack.note')}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
