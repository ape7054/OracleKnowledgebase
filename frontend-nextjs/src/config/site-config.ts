/**
 * 站点配置文件
 * 集中管理站点的基础信息、社交链接、文章链接等配置
 */

export const siteConfig = {
  name: "Oracle Knowledge Base",
  url: "https://your-domain.com", // 替换为实际域名
  description: "构建个人知识体系，记录认知进化之路",
  
  // 社交媒体链接
  social: {
    github: "", // 留空待后续配置
    twitter: "", // 留空待后续配置
    email: "", // 留空待后续配置
  },
  
  // 精选文章配置
  articles: {
    featured: {
      manifesto: {
        slug: "", // 拉马努金宣言文章slug（待配置）
        category: "thinking",
      },
      web: {
        slug: "", // Web架构演进史文章slug（待配置）
        category: "tech",
      },
      labor: {
        slug: "", // 劳动维权文章slug（待配置）
        category: "tools",
      },
    },
  },
  
  // 知识域分类映射
  knowledgeDomains: {
    tech: "tech",
    web3: "web3",
    thinking: "thinking",
    product: "product",
    tools: "tools",
  },
} as const

export type SiteConfig = typeof siteConfig

