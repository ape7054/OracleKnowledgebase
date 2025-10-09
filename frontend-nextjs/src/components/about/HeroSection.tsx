'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { socialLinks } from "@/config/about-data"
import { Github, Mail, Twitter, Linkedin } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { fadeInUp, fadeIn, staggerContainer } from '@/lib/motion'
import { AnimatedAvatarFallback } from './AnimatedAvatarFallback'
import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import { AuroraBackground } from '@/components/ui/aurora-background'

const iconMap = {
  Github,
  Mail,
  Twitter,
  Linkedin
} as const

export function HeroSection() {
  const t = useTranslations('about')

  return (
    <section className="relative overflow-hidden border-b border-border/40">
      <AuroraBackground className="!h-auto !min-h-0">
        <motion.div 
          className="relative z-10 py-16 md:py-24"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          <div className="container mx-auto px-6 md:px-8 max-w-4xl">
            <div className="text-center space-y-6">
              {/* 头像 */}
              <motion.div variants={fadeIn} className="flex justify-center">
                <AnimatedAvatarFallback 
                  src="/avatar_nft.png" 
                  alt="Avatar"
                  size={160}
                />
              </motion.div>

              {/* 标题 */}
              <motion.div className="space-y-3" variants={fadeInUp}>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  <AnimatedGradientText>
                    {t('title')}
                  </AnimatedGradientText>
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {t('subtitle')}
                </p>
              </motion.div>

              {/* 当前状态标签 */}
              <motion.div 
                className="flex items-center justify-center gap-2 flex-wrap"
                variants={fadeInUp}
              >
                <Badge variant="outline" className="text-sm backdrop-blur-sm bg-background/50">
                  <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
                  {t('hero.status')}
                </Badge>
                <Badge variant="secondary" className="text-sm backdrop-blur-sm bg-secondary/50">
                  {t('hero.location')}
                </Badge>
              </motion.div>

              {/* 社交媒体链接 */}
              <motion.div 
                className="flex items-center justify-center gap-3 pt-4"
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
                        className="rounded-full backdrop-blur-sm bg-background/50"
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
      </AuroraBackground>
    </section>
  )
}

