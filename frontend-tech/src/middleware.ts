import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'en',
  
  // 自动检测用户浏览器语言
  localeDetection: true
});

export const config = {
  // 匹配所有路径除了 api、_next、静态资源文件
  matcher: ['/((?!api|_next|.*\\..*).*)']
}; 