import "./globals.css"
import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Oracle Knowledge Base - 系统化知识管理平台",
  description: "构建个人知识体系，记录认知进化之路。涵盖技术开发、Web3区块链、跨学科思考、产品流程和实用工具。使用 Next.js 15 + React 19 + Tailwind CSS v4 构建。",
  keywords: ["知识管理", "技术博客", "Web3", "区块链", "Next.js", "React", "个人成长", "系统化学习"],
  authors: [{ name: "Oracle Knowledge Base" }],
  creator: "Oracle Knowledge Base",
  publisher: "Oracle Knowledge Base",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://your-domain.com",
    siteName: "Oracle Knowledge Base",
    title: "Oracle Knowledge Base - 系统化知识管理平台",
    description: "构建个人知识体系，记录认知进化之路",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Oracle Knowledge Base",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Oracle Knowledge Base - 系统化知识管理平台",
    description: "构建个人知识体系，记录认知进化之路",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
