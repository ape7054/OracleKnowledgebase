import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ClientProviders } from '@/components/providers/ClientProviders';
import '../styles/learning-blog-components.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LearningStack',
  description: '探索技术',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
} 