import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // 支持的语言列表
  locales: ['en', 'zh'],
  
  // 默认语言
  defaultLocale: 'zh',
  
  // 自动检测用户浏览器语言
  localeDetection: true
});

export const config = {
  // 匹配所有路径除了 api、_next/static、_next/image、favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}; 