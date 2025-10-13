'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MatrixBackground } from "@/components/ui/matrix-background"
import { socialLinks } from "@/config/about-data"
import { Github, Mail, Twitter, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/motion'
import { AnimatedAvatarFallback } from './AnimatedAvatarFallback'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { ContainerTextFlip } from '@/components/ui/container-text-flip'
import { useTheme } from 'next-themes'

const iconMap = {
  Github,
  Mail,
  Twitter,
  Linkedin
} as const

export function HeroSection() {
  const t = useTranslations('about')
  const { theme } = useTheme()
  
  // 根据主题选择头像
  const avatarSrc = theme === 'light' ? '/avatar_hack_light.png' : '/avatar_hack.png'

  return (
    <MatrixBackground 
      className="h-auto min-h-[500px] md:min-h-[600px] border-b border-border/40"
      speed={0.8}
      density={1.5}
      brightness={0.6}
      greenIntensity={0.8}
      variation={0.8}
      showDebugInfo={false}
      testMode={true}
    >
      <motion.div 
        className="relative z-10 py-12 md:py-16 lg:py-24 w-full"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-4 md:space-y-6">
            {/* 头像 */}
            <motion.div variants={fadeIn} className="flex justify-center">
              <AnimatedAvatarFallback 
                src={avatarSrc} 
                alt="Avatar"
                size={160}
                className="w-[120px] h-[120px] md:w-40 md:h-40"
              />
            </motion.div>

            {/* 标题 */}
            <motion.div className="space-y-2 md:space-y-3" variants={fadeInUp}>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight px-4">
                <AnimatedGradientText>
                  {t('title')}
                </AnimatedGradientText>
              </h1>
              <div className="flex flex-row flex-nowrap items-center justify-center gap-1 md:gap-2 mx-auto px-2 md:px-4 whitespace-nowrap overflow-x-auto">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/80">{t('flipWords.prefix')}</span>
                <ContainerTextFlip 
                  words={t.raw('flipWords.words')}
                  interval={2500}
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl py-1 px-2 md:px-4 flex-shrink-0"
                  textClassName="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
                  animationDuration={500}
                />
                <span className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground/80">{t('flipWords.suffix')}</span>
              </div>
            </motion.div>

            {/* 当前状态标签 */}
            <motion.div 
              className="flex items-center justify-center gap-2 flex-wrap px-4"
              variants={fadeInUp}
            >
              <Badge variant="outline" className="text-xs md:text-sm backdrop-blur-sm bg-background/50">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                {t('hero.status')}
              </Badge>
              <Badge variant="secondary" className="text-xs md:text-sm backdrop-blur-sm bg-secondary/50">
                {t('hero.location')}
              </Badge>
            </motion.div>

            {/* 社交媒体链接 */}
            <motion.div 
              className="flex items-center justify-center gap-2 md:gap-3 pt-4"
              variants={fadeInUp}
            >
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon as keyof typeof iconMap]
                return (
                  <motion.div
                    key={link.id}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full backdrop-blur-sm bg-white/10 hover:bg-white/20 dark:bg-white/5 dark:hover:bg-white/10 border-white/20 dark:border-white/10 text-foreground hover:text-primary transition-all min-w-[44px] min-h-[44px]"
                      asChild
                    >
                      <a
                        href={link.href}
                        target={link.id !== 'email' ? '_blank' : undefined}
                        rel={link.id !== 'email' ? 'noopener noreferrer' : undefined}
                        aria-label={link.name}
                      >
                        <Icon className="w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </MatrixBackground>
  )
}

