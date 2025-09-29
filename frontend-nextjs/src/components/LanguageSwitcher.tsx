'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from 'next/navigation';
import {Button} from '@/components/ui/button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const switchLanguage = (newLocale: string) => {
    // 移除当前locale前缀，添加新的locale前缀
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant={locale === 'zh' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLanguage('zh')}
      >
        {t('chinese')}
      </Button>
      <Button 
        variant={locale === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => switchLanguage('en')}
      >
        {t('english')}
      </Button>
    </div>
  );
} 