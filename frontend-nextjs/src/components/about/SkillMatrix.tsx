'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { skills, skillCategories } from "@/config/about-data"
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer, listItem } from '@/lib/motion'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { useState } from 'react'

// 为不同技能类别定义主题色
const categoryColors = {
  frontend: {
    primary: "hsl(217, 91%, 60%)", // 蓝色
    gradient: ["hsl(217, 91%, 60%)", "hsl(217, 91%, 70%)"],
  },
  backend: {
    primary: "hsl(142, 71%, 45%)", // 绿色
    gradient: ["hsl(142, 71%, 45%)", "hsl(142, 71%, 55%)"],
  },
  blockchain: {
    primary: "hsl(271, 76%, 53%)", // 紫色
    gradient: ["hsl(271, 76%, 53%)", "hsl(271, 76%, 63%)"],
  },
  devops: {
    primary: "hsl(24, 95%, 53%)", // 橙色
    gradient: ["hsl(24, 95%, 53%)", "hsl(24, 95%, 63%)"],
  },
} as const

export function SkillMatrix() {
  const t = useTranslations('about')
  const [activeTab, setActiveTab] = useState<string>("frontend")

  // 雷达图进入动画
  const radarAnimation = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1] as const // easeOut
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3
      }
    }
  }

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
          <span>⚙️</span>
          {t('techStack.title')}
        </motion.h2>

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          <Tabs defaultValue="frontend" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
              {skillCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="gap-2">
                  <span>{category.icon}</span>
                  <span className="hidden sm:inline">{t(category.label)}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            <AnimatePresence mode="wait">
              {skillCategories.map((category) => {
                const categorySkills = skills.filter(
                  (skill) => skill.category === category.id
                )

                // 转换为雷达图数据格式
                const radarData = categorySkills.map((skill) => ({
                  skill: skill.name,
                  proficiency: skill.proficiency,
                  experience: skill.yearsOfExperience,
                  icon: skill.icon,
                }))

                const categoryColor = categoryColors[category.id as keyof typeof categoryColors]

                // 图表配置
                const chartConfig = {
                  proficiency: {
                    label: t('skills.proficiency') || 'Proficiency',
                    color: categoryColor.primary,
                  },
                }

                return (
                  <TabsContent 
                    key={category.id} 
                    value={category.id}
                    className="mt-0"
                  >
                    {activeTab === category.id && (
                      <motion.div 
                        variants={radarAnimation}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {categorySkills.length > 0 ? (
                          <Card className="border border-border/50 bg-card/50 backdrop-blur shadow-lg overflow-hidden">
                            <CardContent className="p-6 md:p-10">
                              <ChartContainer
                                config={chartConfig}
                                className="mx-auto aspect-square max-h-[500px] w-full"
                              >
                                <RadarChart data={radarData}>
                                  {/* 渐变定义 */}
                                  <defs>
                                    <radialGradient id={`gradient-${category.id}`}>
                                      <stop offset="0%" stopColor={categoryColor.gradient[0]} stopOpacity={0.8} />
                                      <stop offset="100%" stopColor={categoryColor.gradient[1]} stopOpacity={0.2} />
                                    </radialGradient>
                                  </defs>

                                  <ChartTooltip
                                    cursor={{ stroke: categoryColor.primary, strokeWidth: 2 }}
                                    content={({ active, payload }) => {
                                      if (!active || !payload?.length) return null
                                      const data = payload[0].payload
                                      return (
                                        <div className="rounded-lg border-2 border-border/80 bg-background/95 backdrop-blur-sm px-4 py-3 shadow-2xl">
                                          <div className="flex items-center gap-2 mb-2">
                                            {data.icon && <span className="text-xl">{data.icon}</span>}
                                            <span className="font-bold text-base">{data.skill}</span>
                                          </div>
                                          <div className="text-sm space-y-1">
                                            <div className="flex items-center justify-between gap-6">
                                              <span className="text-muted-foreground">{t('skills.proficiency') || 'Proficiency'}:</span>
                                              <span 
                                                className="font-semibold" 
                                                style={{ color: categoryColor.primary } as React.CSSProperties}
                                              >
                                                {data.proficiency}%
                                              </span>
                                            </div>
                                            <div className="flex items-center justify-between gap-6">
                                              <span className="text-muted-foreground">{t('skills.experience') || 'Experience'}:</span>
                                              <span className="font-semibold">
                                                {data.experience} {t('skills.years') || 'years'}
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    }}
                                  />
                                  <PolarGrid 
                                    className="stroke-border/40"
                                    strokeDasharray="4 4"
                                    strokeWidth={1}
                                    gridType="circle"
                                  />
                                  <PolarAngleAxis 
                                    dataKey="skill"
                                    tick={{ 
                                      fill: 'hsl(var(--foreground))', 
                                      fontSize: 13,
                                      fontWeight: 500
                                    }}
                                    tickLine={false}
                                  />
                                  <PolarRadiusAxis 
                                    angle={90}
                                    domain={[0, 100]}
                                    tick={{ 
                                      fill: 'hsl(var(--muted-foreground))', 
                                      fontSize: 11,
                                      opacity: 0.7
                                    }}
                                    axisLine={false}
                                    tickCount={6}
                                  />
                                  <Radar
                                    dataKey="proficiency"
                                    fill={`url(#gradient-${category.id})`}
                                    fillOpacity={0.7}
                                    stroke={categoryColor.primary}
                                    strokeWidth={2.5}
                                    dot={{
                                      r: 5,
                                      fill: categoryColor.primary,
                                      strokeWidth: 2,
                                      stroke: 'hsl(var(--background))',
                                    }}
                                    activeDot={{
                                      r: 7,
                                      fill: categoryColor.primary,
                                      strokeWidth: 3,
                                      stroke: 'hsl(var(--background))',
                                    }}
                                  />
                                </RadarChart>
                              </ChartContainer>
                              
                              {/* 技能列表摘要 */}
                              <motion.div 
                                className="mt-8 pt-6 border-t border-border/50"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                              >
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  {categorySkills.map((skill, index) => (
                                    <motion.div 
                                      key={skill.id}
                                      className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted/50 transition-colors"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                                    >
                                      {skill.icon && <span className="text-base">{skill.icon}</span>}
                                      <span className="font-medium truncate flex-1">{skill.name}</span>
                                      <span 
                                        className="font-semibold text-xs px-2 py-0.5 rounded-full"
                                        style={{ 
                                          backgroundColor: `${categoryColor.primary}20`,
                                          color: categoryColor.primary 
                                        } as React.CSSProperties}
                                      >
                                        {skill.proficiency}%
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            </CardContent>
                          </Card>
                        ) : (
                          <Card className="border border-border/50 bg-card/50 backdrop-blur">
                            <CardContent className="p-12">
                              <div className="text-center text-muted-foreground">
                                {t('skills.noSkills')}
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </motion.div>
                    )}
                  </TabsContent>
                )
              })}
            </AnimatePresence>
          </Tabs>

          <motion.div 
            className="mt-8 p-6 border border-primary/50 bg-primary/5 rounded-lg"
            variants={listItem}
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
