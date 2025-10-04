'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNavigation() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // 在客户端挂载前，显示简单的导航链接
  if (!mounted) {
    return (
      <nav className="flex items-center space-x-4">
        <Link href={`/${locale}`} className="text-sm font-medium">
          {t('home')}
        </Link>
        <Link href={`/${locale}/articles`} className="text-sm font-medium">
          {t('articles')}
        </Link>
        <Link href={`/${locale}/tools`} className="text-sm font-medium">
          {t('tools')}
        </Link>
        <Link href={`/${locale}/about`} className="text-sm font-medium">
          {t('about')}
        </Link>
      </nav>
    )
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}`} className={navigationMenuTriggerStyle()}>
              {t('home')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Articles */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/articles`} className={navigationMenuTriggerStyle()}>
              {t('articles')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Tools */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/tools`} className={navigationMenuTriggerStyle()}>
              {t('tools')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/about`} className={navigationMenuTriggerStyle()}>
              {t('about')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
} 