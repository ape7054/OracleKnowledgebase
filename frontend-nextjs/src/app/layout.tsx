import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import ClientProviders from '@/components/providers/ClientProviders';
import "../styles/learning-blog-components.css";

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Learning Stack - 技术学习博客",
  description: "专注于前端开发、全栈技术的现代化博客平台，记录学习历程，分享技术心得",
  keywords: "前端开发, React, Next.js, TypeScript, 全栈开发, 技术博客, 学习笔记",
  authors: [{ name: 'Learning Stack' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0 }} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
} 