import { Metadata } from 'next'

interface AboutLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const title = locale === 'zh' 
    ? '关于我 | Oracle Knowledge Base - 全栈开发者 & Web3探索者'
    : 'About Me | Oracle Knowledge Base - Full-Stack Developer & Web3 Explorer'
  
  const description = locale === 'zh'
    ? '我是一名全栈开发者，对区块链技术和去中心化应用有着深厚的热情。从DeFi量化交易系统开发到AI时代的技术转型，这是我的技术旅程与知识分享。'
    : "I'm a full-stack developer with a deep passion for blockchain technology and decentralized applications. From DeFi quantitative trading to AI-era transformation, this is my tech journey and knowledge sharing."
  
  const keywords = locale === 'zh'
    ? 'Web3开发者, 全栈开发, DeFi, Solana, Rust, Next.js, TypeScript, 区块链, 智能合约, 技术博客'
    : 'Web3 Developer, Full-Stack Development, DeFi, Solana, Rust, Next.js, TypeScript, Blockchain, Smart Contracts, Tech Blog'

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Oracle' }],
    openGraph: {
      title,
      description,
      type: 'profile',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      siteName: 'Oracle Knowledge Base',
      images: [
        {
          url: '/og-about.png',
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og-about.png'],
      creator: '@yourusername',
    },
    alternates: {
      canonical: `/${locale}/about`,
      languages: {
        'zh-CN': '/zh/about',
        'en-US': '/en/about',
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default function AboutLayout({ children }: AboutLayoutProps) {
  return <>{children}</>
}

