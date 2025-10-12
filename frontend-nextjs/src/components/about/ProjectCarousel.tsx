'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { BorderBeam } from "@/components/ui/border-beam"
import { WarpBackground } from "@/components/ui/warp-background"
import { projects } from "@/config/projects-data"
import { useTranslations } from 'next-intl'
import { ExternalLink, Github } from 'lucide-react'
import { Rocket } from '@/lib/icons'
import { motion } from 'framer-motion'
import { fadeInUp } from '@/lib/motion'
import { useState, useEffect } from 'react'
import { getTopRepos } from '@/lib/github'

export function ProjectCarousel() {
  const t = useTranslations('about')
  const [mounted, setMounted] = useState(false)
  const [githubRepos, setGithubRepos] = useState<Array<{
    name: string
    description: string
    stars: number
    language: string
    url: string
  }>>([])

  useEffect(() => {
    setMounted(true)
    // 获取 GitHub 热门仓库
    getTopRepos('ape7054', 6)
      .then(repos => {
        setGithubRepos(repos)
      })
      .catch(error => {
        console.error('Failed to fetch GitHub repos:', error)
        // 组件会继续显示其他项目，所以即使失败也不影响整体显示
      })
  }, [])

  const featuredProjects = projects.filter(p => p.featured)

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Rocket className="w-6 h-6" />
            </div>
            {t('projects.title')}
          </h2>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {/* 精选项目 */}
            {featuredProjects.map((project, index) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="h-full"
                >
                  <Card className="h-full border border-border/50 hover:shadow-xl transition-all hover:-translate-y-2 relative overflow-hidden bg-card/98">
                    <WarpBackground 
                      className="absolute inset-0 z-0" 
                      perspective={100}
                      beamsPerSide={3}
                      beamSize={8}
                      beamDelayMin={0}
                      beamDelayMax={20}
                      beamDuration={4}
                      gridColor="hsl(var(--primary) / 0.3)"
                    />
                    <BorderBeam size={250} duration={12} delay={0} />
                    <CardContent className="relative z-10 p-6 space-y-4 flex flex-col h-full">
                      {/* 项目标题 */}
                      <div className="space-y-2 p-3 rounded-lg bg-background/80 backdrop-blur-sm">
                        <h3 className="text-xl font-bold line-clamp-1 text-foreground">
                          {t(project.title)}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 font-medium">
                          {t(project.description)}
                        </p>
                      </div>

                      {/* 技术栈 */}
                      <div className="flex flex-wrap gap-1.5 p-2 rounded-md bg-background/60 backdrop-blur-sm">
                        {project.tech.map((tech, i) => (
                          <Badge key={i} variant="secondary" className="text-xs font-semibold bg-background/90">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex items-center gap-2 mt-auto pt-2 p-2 rounded-md bg-background/60 backdrop-blur-sm">
                        {project.links.github && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.links.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <Github className="w-3 h-3" />
                              <span className="hidden sm:inline">GitHub</span>
                            </a>
                          </Button>
                        )}
                        {project.links.demo && (
                          <Button variant="outline" size="sm" asChild>
                            <a
                              href={project.links.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span className="hidden sm:inline">Demo</span>
                            </a>
                          </Button>
                        )}
                        {project.details && mounted && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="default" size="sm" className="ml-auto">
                                {t('projects.viewDetails')}
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="text-2xl">
                                  {t(project.title)}
                                </DialogTitle>
                                <DialogDescription>
                                  {t(project.description)}
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-6 pt-4">
                                {/* 技术栈 */}
                                <div className="space-y-2">
                                  <h4 className="font-semibold">{t('projects.techStack')}</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech, i) => (
                                      <Badge key={i} variant="secondary">
                                        {tech}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>

                                {/* 项目背景 */}
                                {project.details.background && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">{t('projects.background')}</h4>
                                    <p className="text-sm text-muted-foreground">
                                      {t(project.details.background)}
                                    </p>
                                  </div>
                                )}

                                {/* 成就 */}
                                {project.achievements && project.achievements.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">{t('projects.achievements')}</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      {project.achievements.map((achievement, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-primary mt-1">•</span>
                                          <span>{t(achievement)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* 挑战与解决方案 */}
                                {project.details.challenges && project.details.challenges.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">{t('projects.challenges')}</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      {project.details.challenges.map((challenge, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-orange-500 mt-1">▸</span>
                                          <span>{t(challenge)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {project.details.solutions && project.details.solutions.length > 0 && (
                                  <div className="space-y-2">
                                    <h4 className="font-semibold">{t('projects.solutions')}</h4>
                                    <ul className="space-y-1 text-sm text-muted-foreground">
                                      {project.details.solutions.map((solution, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                          <span className="text-green-500 mt-1">✓</span>
                                          <span>{t(solution)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* 链接 */}
                                <div className="flex items-center gap-3 pt-4 border-t">
                                  {project.links.github && (
                                    <Button variant="outline" asChild>
                                      <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <Github className="w-4 h-4 mr-2" />
                                        GitHub
                                      </a>
                                    </Button>
                                  )}
                                  {project.links.demo && (
                                    <Button asChild>
                                      <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <ExternalLink className="w-4 h-4 mr-2" />
                                        {t('projects.viewDemo')}
                                      </a>
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
            
            {/* GitHub 真实仓库 */}
            {githubRepos.map((repo, index) => (
              <CarouselItem key={`github-${repo.name}`} className="md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  className="h-full"
                >
                  <Card className="h-full border border-border/50 hover:shadow-xl transition-all hover:-translate-y-2 relative overflow-hidden bg-card/98">
                    <WarpBackground 
                      className="absolute inset-0 z-0" 
                      perspective={200}
                      beamsPerSide={2}
                      beamSize={12}
                      beamDuration={4}
                      gridColor="hsl(var(--primary) / 0.3)"
                    />
                    <CardContent className="relative z-10 p-6 space-y-4 flex flex-col h-full">
                      {/* 项目标题 */}
                      <div className="space-y-2 p-3 rounded-lg bg-background/80 backdrop-blur-sm">
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold line-clamp-1 text-foreground">
                            {repo.name}
                          </h3>
                          <Badge variant="outline" className="text-xs font-semibold bg-background/90">
                            <Github className="w-3 h-3 mr-1" />
                            Live
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 font-medium">
                          {repo.description}
                        </p>
                      </div>

                      {/* 语言和 Stars */}
                      <div className="flex flex-wrap gap-1.5 p-2 rounded-md bg-background/60 backdrop-blur-sm">
                        {repo.language && (
                          <Badge variant="secondary" className="text-xs font-semibold bg-background/90">
                            {repo.language}
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs font-semibold bg-background/90">
                          ⭐ {repo.stars}
                        </Badge>
                      </div>

                      {/* 操作按钮 */}
                      <div className="flex items-center gap-2 mt-auto pt-2 p-2 rounded-md bg-background/60 backdrop-blur-sm">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 justify-center"
                          >
                            <Github className="w-3 h-3" />
                            <span>View on GitHub</span>
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12" />
          <CarouselNext className="-right-4 md:-right-12" />
        </Carousel>
      </div>
    </section>
  )
}

