'use client'

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