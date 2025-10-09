'use client'

import { Card, CardContent } from "@/components/ui/card"
import { IconCloud } from "@/components/ui/icon-cloud"
import { skills, skillCategories } from "@/config/about-data"
import { techStack } from "@/config/tech-stack"
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '@/lib/motion'
import { Cog } from '@/lib/icons'

// 创建图标映射 - 使用 colorValue 用于 Canvas 渲染
const iconMap: Record<string, React.ReactNode> = Object.fromEntries(
  techStack.map(tech => [
    tech.id,
    <tech.icon key={tech.id} size={60} color={tech.colorValue} />
  ])
)

export function SkillMatrix() {
  const t = useTranslations('about')

  // 获取所有技能的图标
  const allIcons = skills
    .filter(skill => iconMap[skill.id])
    .map(skill => iconMap[skill.id])

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
            <CardContent className="p-6 md:p-10">
              <div className="flex justify-center items-center">
                <div className="w-full max-w-[700px] aspect-square flex items-center justify-center">
                  <IconCloud icons={allIcons} />
                </div>
              </div>

              {/* 技能分类统计 */}
              <motion.div 
                className="mt-8 pt-6 border-t border-border/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {categoryStats.map((category) => (
                    <motion.div 
                      key={category.id}
                      className="text-center p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.3 }}
                    >
                      <div className="text-2xl font-bold text-primary mb-1">
                        {category.count}
                      </div>
                      <div className="text-sm font-medium mb-1">
                        {t(category.label)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {t('skills.avgProficiency', { value: category.avgProficiency })}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 技能列表 */}
              <motion.div 
                className="mt-8 pt-6 border-t border-border/50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <h3 className="text-lg font-semibold mb-4">{t('skills.allSkills')}</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {skills.map((skill, index) => (
                    <motion.div 
                      key={skill.id}
                      className="flex items-center justify-between gap-2 text-sm p-2 rounded-md bg-muted/30 hover:bg-muted/50 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.02, duration: 0.3 }}
                    >
                      <span className="font-medium truncate flex-1">{skill.name}</span>
                      <span className="text-xs font-semibold text-primary px-2 py-0.5 rounded-full bg-primary/10">
                        {skill.proficiency}%
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
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
