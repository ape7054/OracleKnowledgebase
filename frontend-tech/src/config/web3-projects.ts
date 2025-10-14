/**
 * Web3 项目研究配置文件
 * 用于管理追踪的区块链项目信息
 */

export interface Web3Project {
  id: string
  name: string
  logo: string // 项目 ID 用于图标映射，或图片 URL
  category: ProjectCategory
  description: {
    en: string
    zh: string
  }
  links: {
    website?: string
    twitter?: string
    docs?: string
  }
  color?: string // 项目主题色
}

export type ProjectCategory = 'layer1' | 'layer2' | 'defi' | 'infrastructure'

export const projectCategories: ProjectCategory[] = [
  'layer1',
  'layer2',
  'defi',
  'infrastructure'
]

/**
 * 项目列表
 */
export const web3Projects: Web3Project[] = [
  {
    id: 'ethereum',
    name: 'Ethereum',
    logo: 'ethereum',
    category: 'layer1',
    color: 'from-[#627EEA] to-[#8A92B2]', // Ethereum 官方品牌色
    description: {
      en: 'The world\'s programmable blockchain, pioneering smart contracts and decentralized applications.',
      zh: '全球可编程区块链，智能合约和去中心化应用的先驱。'
    },
    links: {
      website: 'https://ethereum.org',
      twitter: 'https://twitter.com/ethereum',
      docs: 'https://ethereum.org/en/developers/docs/'
    }
  },
  {
    id: 'solana',
    name: 'Solana',
    logo: 'solana',
    category: 'layer1',
    color: 'from-[#9945FF] to-[#14F195]', // Solana 官方渐变色
    description: {
      en: 'High-performance blockchain supporting fast transactions and low fees through innovative Proof of History.',
      zh: '高性能区块链，通过创新的历史证明机制支持快速交易和低费用。'
    },
    links: {
      website: 'https://solana.com',
      twitter: 'https://twitter.com/solana',
      docs: 'https://docs.solana.com'
    }
  },
  {
    id: 'arbitrum',
    name: 'Arbitrum',
    logo: 'arbitrum',
    category: 'layer2',
    color: 'from-[#28A0F0] to-[#96BEDC]', // Arbitrum 官方蓝色
    description: {
      en: 'Leading Ethereum Layer 2 scaling solution using Optimistic Rollups for faster and cheaper transactions.',
      zh: '领先的以太坊 Layer 2 扩容方案，使用 Optimistic Rollups 实现更快更便宜的交易。'
    },
    links: {
      website: 'https://arbitrum.io',
      twitter: 'https://twitter.com/arbitrum',
      docs: 'https://docs.arbitrum.io'
    }
  },
  {
    id: 'polygon',
    name: 'Polygon',
    logo: 'polygon',
    category: 'layer2',
    color: 'from-[#8247E5] to-[#A882DD]', // Polygon 官方紫色
    description: {
      en: 'Multi-chain scaling solution for Ethereum, providing faster and more affordable transactions.',
      zh: '以太坊的多链扩容解决方案，提供更快速和更实惠的交易。'
    },
    links: {
      website: 'https://polygon.technology',
      twitter: 'https://twitter.com/0xPolygon',
      docs: 'https://docs.polygon.technology'
    }
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    logo: 'avalanche',
    category: 'layer1',
    color: 'from-[#E84142] to-[#F5A5A5]', // Avalanche 官方红色
    description: {
      en: 'Open, programmable smart contracts platform for decentralized applications with sub-second finality.',
      zh: '开放的可编程智能合约平台，为去中心化应用提供亚秒级最终性。'
    },
    links: {
      website: 'https://www.avax.network',
      twitter: 'https://twitter.com/avalancheavax',
      docs: 'https://docs.avax.network'
    }
  }
]

/**
 * 根据分类获取项目列表
 */
export function getProjectsByCategory(category: ProjectCategory): Web3Project[] {
  return web3Projects.filter(project => project.category === category)
}

/**
 * 根据 ID 获取项目
 */
export function getProjectById(id: string): Web3Project | undefined {
  return web3Projects.find(project => project.id === id)
}
