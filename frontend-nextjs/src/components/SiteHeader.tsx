'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { MainNavigationOptimized } from './MainNavigationOptimized'
import { ThemeToggle } from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

interface SiteHeaderProps {
  showCTA?: boolean
}

export function SiteHeader({ showCTA = false }: SiteHeaderProps) {
  const locale = useLocale()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 md:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* 左侧：Logo */}
          <div className="flex items-center z-10">
            <Link href={`/${locale}`}>
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                CodeX
              </div>
            </Link>
          </div>
          
          {/* 中间：导航菜单（桌面端）- 绝对定位居中 */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
            <MainNavigationOptimized />
          </div>
          
          {/* 右侧：主题切换器、语言切换器 */}
          <div className="flex items-center gap-2 z-10">
            {showCTA && (
              <Link 
                href={`/${locale}/articles`}
                className="hidden sm:inline-flex items-center px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors mr-2"
              >
                开始探索
              </Link>
            )}
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  )
} 