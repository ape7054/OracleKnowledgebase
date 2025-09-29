import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import type React from "react"

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  // 获取异步的 params
  const {locale} = await params;
  
  // 获取当前语言的消息，传递 locale 参数
  const messages = await getMessages({locale});
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      {children}
    </NextIntlClientProvider>
  );
} 