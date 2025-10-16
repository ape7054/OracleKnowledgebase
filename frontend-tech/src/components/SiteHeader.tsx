'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { MainNavigationOptimized } from './MainNavigationOptimized'
import { MobileNav } from './MobileNav'
import { ThemeToggle } from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'

interface SiteHeaderProps {
  showCTA?: boolean
}

export function SiteHeader({ showCTA = false }: SiteHeaderProps) {
  const locale = useLocale()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative flex h-14 md:h-16 items-center justify-between">
          {/* 左侧：移动端汉堡菜单 + Logo */}
          <div className="flex items-center gap-2 md:gap-3 z-10">
            <MobileNav />
            <Link href={`/${locale}`}>
              <div className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent cursor-pointer hover:opacity-80 transition-opacity">
                CodeX
              </div>
            </Link>
          </div>
          
          {/* 中间：导航菜单（桌面端）- 绝对定位居中 */}
          <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
            <MainNavigationOptimized />
          </div>
          
          {/* 右侧：主题切换器、语言切换器 */}
          <div className="flex items-center gap-1.5 md:gap-2 z-10">
            {showCTA && (
              <Link 
                href={`/${locale}/knowledge`}
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