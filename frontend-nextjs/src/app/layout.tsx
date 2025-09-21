import type { Metadata } from 'next';
import { ClientProviders } from '@/components/providers/ClientProviders';
import './globals.css';
import '../styles/learning-blog-components.css';

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
      <body style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
} 