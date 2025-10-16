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
    github: "https://github.com/ape7054",
    twitter: "https://x.com/ency_146904",
    email: "1469041017@qq.com",
  },
  
  // 精选文章配置
  articles: {
    featured: {
      smartContract: {
        slug: "/zh/knowledge/smart-contract-beginner-guide", // 智能合约入门指南
        category: "web3",
      },
      web: {
        slug: "/zh/knowledge/web-architecture-evolution", // Web架构演进史
        category: "tech",
      },
      dao: {
        slug: "/zh/knowledge/dao-complete-guide", // DAO完全指南
        category: "web3",
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

