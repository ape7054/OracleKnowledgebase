'use client'

import * as React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet'
import { ThemeToggle } from './ThemeToggle'
import LanguageSwitcher from './LanguageSwitcher'
import { Separator } from '@/components/ui/separator'

export function MobileNav() {
  const t = useTranslations('navigation')
  const locale = useLocale()
  const [open, setOpen] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)

  // 解决 hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/knowledge`, label: t('knowledge') },
    { href: `/${locale}/frontend`, label: t('demo') },
    { href: `/${locale}/web3`, label: t('web3') },
    { href: `/${locale}/ai`, label: t('ai') },
    { href: `/${locale}/tools`, label: t('tools') },
    { href: `/${locale}/about`, label: t('about') },
  ]

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        aria-label="Toggle menu"
        disabled
      >
        <Menu className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="text-left">
            <Link href={`/${locale}`} onClick={() => setOpen(false)}>
              <div className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                CodeX
              </div>
            </Link>
          </SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation menu
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col gap-4 mt-8">
          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          <Separator className="my-4" />

          {/* Settings */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-medium text-muted-foreground">
                {t('theme') || '主题'}
              </span>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between px-4">
              <span className="text-sm font-medium text-muted-foreground">
                {t('language') || '语言'}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

