'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { MainNavigation } from './MainNavigation'
import { ThemeToggle } from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { Button } from './ui/button'

interface SiteHeaderProps {
  showCTA?: boolean
}

export function SiteHeader({ showCTA = false }: SiteHeaderProps) {
  const locale = useLocale()
  const t = useTranslations('navigation')

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* 左侧：Logo */}
          <div className="flex items-center">
            <Link href={`/${locale}`}>
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                CodexDAO
              </div>
            </Link>
          </div>
          
          {/* 中间：导航菜单（桌面端） */}
          <div className="hidden md:flex">
            <MainNavigation />
          </div>
          
          {/* 右侧：主题切换器、语言切换器和可选的 CTA 按钮 */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageSwitcher />
            {showCTA && (
              <Button size="sm" className="ml-2">
                {t('getStarted')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 