import {getRequestConfig} from 'next-intl/server';

// 支持的语言列表
export const locales = ['en', 'zh'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // 确保使用有效的 locale，无效时使用默认值
  const validLocale = locales.includes(locale as Locale) ? locale as Locale : 'en';
  
  console.log('i18n config - 请求的locale:', locale, '有效的locale:', validLocale);
  
  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
}); 