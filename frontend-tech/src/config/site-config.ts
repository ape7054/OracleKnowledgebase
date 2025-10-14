/**
 * 技术展示平台配置文件
 * 集中管理站点的基础信息、技术栈、项目演示等配置
 */

export const siteConfig = {
  name: "Tech Stack Showcase",
  url: "https://tech-showcase-demo.com", // 技术展示平台域名
  description: "全栈技术能力展示平台 - Next.js 15 + Go 微服务架构 + 实时通信 + 容器化部署",
  
  // 社交媒体链接
  social: {
    github: "https://github.com/ape7054",
    twitter: "https://x.com/ency_146904",
    email: "1469041017@qq.com",
  },
  
  // 精选技术文档配置
  articles: {
    featured: {
      nextjs: {
        slug: "/zh/knowledge/nextjs-app-router-guide", // Next.js App Router 完全指南
        category: "frontend",
      },
      go: {
        slug: "/zh/knowledge/go-microservices-architecture", // Go 微服务架构实践
        category: "backend",
      },
      docker: {
        slug: "/zh/knowledge/docker-deployment-guide", // Docker 容器化部署指南
        category: "devops",
      },
    },
  },
  
  // 技术领域分类映射
  knowledgeDomains: {
    frontend: "frontend",
    backend: "backend",
    devops: "devops",
    architecture: "architecture",
    performance: "performance",
  },
} as const

export type SiteConfig = typeof siteConfig

