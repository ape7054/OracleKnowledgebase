'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { skills, skillCategories } from "@/config/about-data"
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, listItem } from '@/lib/motion'
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts"
import { DynamicIcon, BarChart3 } from '@/lib/icons'
import { useState, useEffect } from 'react'

export function SkillRadarChart() {
  const t = useTranslations('about')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 计算每个分类的平均熟练度和技能数量
  const radarData = skillCategories.map(category => {
    const categorySkills = skills.filter(skill => skill.category === category.id)
    const avgProficiency = categorySkills.length > 0
      ? categorySkills.reduce((sum, skill) => sum + skill.proficiency, 0) / categorySkills.length
      : 0

    return {
      category: t(category.label),
      proficiency: Math.round(avgProficiency),
      skillCount: categorySkills.length,
      icon: category.icon,
      fullMark: 100
    }
  })

  // 计算总体统计
  const totalSkills = skills.length
  const avgProficiency = Math.round(
    skills.reduce((sum, skill) => sum + skill.proficiency, 0) / totalSkills
  )
  const maxProficiency = Math.max(...skills.map(s => s.proficiency))

  const chartConfig = {
    proficiency: {
      label: t('skills.proficiency'),
      color: "hsl(var(--primary))",
    },
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
    >
      <Card className="border border-border/50 bg-card/50 backdrop-blur shadow-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {t('skills.radarChart.title')}
          </CardTitle>
          <CardDescription>
            {t('skills.radarChart.description')}
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          {mounted ? (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[400px] w-full"
            >
              <RadarChart data={radarData}>
                {/* 渐变定义 */}
                <defs>
                  <radialGradient id="radarGradient">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                    <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.1} />
                  </radialGradient>
                  <linearGradient id="strokeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                  </linearGradient>
                </defs>

                <ChartTooltip
                  cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 2, strokeDasharray: "5 5" }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border-2 border-primary/50 bg-background/95 backdrop-blur-sm px-4 py-3 shadow-2xl">
                        <div className="flex items-center gap-2 mb-2">
                          <DynamicIcon name={data.icon} size={24} />
                          <span className="font-bold text-base">{data.category}</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center justify-between gap-6">
                            <span className="text-muted-foreground">{t('skills.proficiency') || 'Average'}:</span>
                            <span className="font-bold text-primary">
                              {data.proficiency}%
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-6">
                            <span className="text-muted-foreground">技能数量:</span>
                            <span className="font-semibold">
                              {data.skillCount} 项
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  }}
                />
                
                <PolarGrid 
                  className="stroke-border/30"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                  gridType="circle"
                />
                
                <PolarAngleAxis 
                  dataKey="category" 
                  tick={{ 
                    fill: 'hsl(var(--foreground))', 
                    fontSize: 14,
                    fontWeight: 600
                  }}
                  tickLine={false}
                />
                
                <PolarRadiusAxis 
                  angle={45}
                  domain={[0, 100]}
                  tick={{ 
                    fill: 'hsl(var(--muted-foreground))', 
                    fontSize: 11,
                    opacity: 0.7
                  }}
                  axisLine={false}
                  tickCount={5}
                />
                
                <Radar
                  dataKey="proficiency"
                  fill="url(#radarGradient)"
                  fillOpacity={0.8}
                  stroke="url(#strokeGradient)"
                  strokeWidth={3}
                  dot={{
                    r: 6,
                    fill: "hsl(var(--primary))",
                    strokeWidth: 3,
                    stroke: 'hsl(var(--background))',
                  }}
                  activeDot={{
                    r: 8,
                    fill: "hsl(var(--primary))",
                    strokeWidth: 4,
                    stroke: 'hsl(var(--background))',
                  }}
                />
              </RadarChart>
            </ChartContainer>
          ) : (
            <div className="mx-auto aspect-square max-h-[400px] w-full flex items-center justify-center">
              <div className="text-muted-foreground">Loading chart...</div>
            </div>
          )}

          {/* 统计信息面板 */}
          <motion.div 
            className="mt-6 pt-6 border-t border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.div 
                className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20"
                variants={listItem}
              >
                <div className="text-2xl font-bold text-primary">{totalSkills}</div>
                <div className="text-xs text-muted-foreground mt-1">总技能数</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20"
                variants={listItem}
              >
                <div className="text-2xl font-bold text-primary">{avgProficiency}%</div>
                <div className="text-xs text-muted-foreground mt-1">平均熟练度</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20"
                variants={listItem}
              >
                <div className="text-2xl font-bold text-primary">{maxProficiency}%</div>
                <div className="text-xs text-muted-foreground mt-1">最高熟练度</div>
              </motion.div>
              
              <motion.div 
                className="text-center p-3 rounded-lg bg-primary/5 border border-primary/20"
                variants={listItem}
              >
                <div className="text-2xl font-bold text-primary">{skillCategories.length}</div>
                <div className="text-xs text-muted-foreground mt-1">技术领域</div>
              </motion.div>
            </div>
          </motion.div>

          {/* 分类详情列表 */}
          <motion.div
            className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {radarData.map((item) => (
              <motion.div
                key={item.category}
                className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                variants={listItem}
              >
                <DynamicIcon name={item.icon} size={28} />
                <div className="text-center">
                  <div className="text-sm font-medium truncate max-w-full">{item.category}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.skillCount} 项技能</div>
                  <div className="text-lg font-bold text-primary mt-1">{item.proficiency}%</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
