import type { Metadata } from 'next';
import ClientProviders from '@/components/providers/ClientProviders';

export const metadata: Metadata = {
  title: 'LearningStack - 加密货币学习交易平台',
  description: '现代化的加密货币学习和模拟交易平台，提供实时数据、技术文章和交易体验',
  keywords: '加密货币, 区块链, 交易, 学习, Bitcoin, Ethereum',
  authors: [{ name: 'LearningStack Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#00ff88',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="dark" />
      </head>
      <body suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
} 