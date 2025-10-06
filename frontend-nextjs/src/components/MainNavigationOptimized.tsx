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

export function MainNavigationOptimized() {
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
        <Link href={`/${locale}`} className="text-sm font-medium" prefetch={true}>
          {t('home')}
        </Link>
        <Link href={`/${locale}/articles`} className="text-sm font-medium" prefetch={true}>
          {t('articles')}
        </Link>
        <Link href={`/${locale}/web3`} className="text-sm font-medium" prefetch={true}>
          {t('web3')}
        </Link>
        <Link href={`/${locale}/tools`} className="text-sm font-medium" prefetch={true}>
          {t('tools')}
        </Link>
        <Link href={`/${locale}/about`} className="text-sm font-medium" prefetch={true}>
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
            <Link href={`/${locale}`} className={navigationMenuTriggerStyle()} prefetch={true}>
              {t('home')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Articles */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/articles`} className={navigationMenuTriggerStyle()} prefetch={true}>
              {t('articles')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Web3 Research */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/web3`} className={navigationMenuTriggerStyle()} prefetch={true}>
              {t('web3')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* Tools */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/tools`} className={navigationMenuTriggerStyle()} prefetch={true}>
              {t('tools')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {/* About */}
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link href={`/${locale}/about`} className={navigationMenuTriggerStyle()} prefetch={true}>
              {t('about')}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
