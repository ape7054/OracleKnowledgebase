'use client'

import * as React from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('language')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const switchLanguage = (newLocale: string) => {
    const segments = pathname.split('/')
    segments[1] = newLocale
    router.push(segments.join('/'))
  }

  // 在客户端挂载前，显示一个占位按钮
  if (!mounted) {
    return (
      <Button variant="outline" size="sm" disabled>
        <span className="mr-2 text-base">
          {locale === 'zh' ? '🇨🇳' : '🇺🇸'}
        </span>
        {locale === 'zh' ? '中文' : 'English'}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <span className="mr-2 text-base">
            {locale === 'zh' ? '🇨🇳' : '🇺🇸'}
          </span>
          {locale === 'zh' ? '中文' : 'English'}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => switchLanguage('zh')}
          className="cursor-pointer"
        >
          <span className="mr-2">🇨🇳</span>
          {t('chinese')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchLanguage('en')}
          className="cursor-pointer"
        >
          <span className="mr-2">🇺🇸</span>
          {t('english')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 