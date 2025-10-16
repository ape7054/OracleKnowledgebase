/**
 * 工具导航配置文件
 * 用于管理技术、开发、AI、Web3 等领域的常用网站
 */

export interface Tool {
  id: string
  name: string
  url: string
  icon: string // emoji 图标
  category: ToolCategory
  tags: string[]
  descriptionKey: string // 国际化描述的 key
}

export type ToolCategory = 
  | 'development' 
  | 'ai' 
  | 'web3' 
  | 'blockchain'
  | 'design' 
  | 'learning'
  | 'productivity'

export const toolCategories: ToolCategory[] = [
  'development',
  'ai',
  'web3',
  'blockchain',
  'design',
  'learning',
  'productivity'
]

/**
 * 工具列表
 * 注意：描述文本存储在国际化文件中 (tools.items.[id].description)
 */
export const tools: Tool[] = [
  // 开发工具
  {
    id: 'github',
    name: 'GitHub',
    url: 'https://github.com',
    icon: '🐙',
    category: 'development',
    tags: ['git', 'version-control', 'collaboration'],
    descriptionKey: 'tools.items.github.description'
  },
  {
    id: 'stackoverflow',
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    icon: '📚',
    category: 'development',
    tags: ['qa', 'community', 'programming'],
    descriptionKey: 'tools.items.stackoverflow.description'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    url: 'https://vercel.com',
    icon: '▲',
    category: 'development',
    tags: ['hosting', 'deployment', 'nextjs'],
    descriptionKey: 'tools.items.vercel.description'
  },
  {
    id: 'npm',
    name: 'npm',
    url: 'https://www.npmjs.com',
    icon: '📦',
    category: 'development',
    tags: ['packages', 'nodejs', 'javascript'],
    descriptionKey: 'tools.items.npm.description'
  },

  // AI 工具
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    url: 'https://chat.openai.com',
    icon: '🤖',
    category: 'ai',
    tags: ['ai', 'chatbot', 'llm'],
    descriptionKey: 'tools.items.chatgpt.description'
  },
  {
    id: 'claude',
    name: 'Claude',
    url: 'https://claude.ai',
    icon: '🧠',
    category: 'ai',
    tags: ['ai', 'chatbot', 'llm'],
    descriptionKey: 'tools.items.claude.description'
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    url: 'https://www.midjourney.com',
    icon: '🎨',
    category: 'ai',
    tags: ['ai', 'image-generation', 'design'],
    descriptionKey: 'tools.items.midjourney.description'
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    url: 'https://huggingface.co',
    icon: '🤗',
    category: 'ai',
    tags: ['ai', 'models', 'ml'],
    descriptionKey: 'tools.items.huggingface.description'
  },

  // Web3 & Crypto
  {
    id: 'etherscan',
    name: 'Etherscan',
    url: 'https://etherscan.io',
    icon: '🔍',
    category: 'web3',
    tags: ['ethereum', 'blockchain', 'explorer'],
    descriptionKey: 'tools.items.etherscan.description'
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    url: 'https://uniswap.org',
    icon: '🦄',
    category: 'web3',
    tags: ['defi', 'dex', 'ethereum'],
    descriptionKey: 'tools.items.uniswap.description'
  },
  {
    id: 'metamask',
    name: 'MetaMask',
    url: 'https://metamask.io',
    icon: '🦊',
    category: 'web3',
    tags: ['wallet', 'ethereum', 'web3'],
    descriptionKey: 'tools.items.metamask.description'
  },
  {
    id: 'opensea',
    name: 'OpenSea',
    url: 'https://opensea.io',
    icon: '🌊',
    category: 'web3',
    tags: ['nft', 'marketplace', 'ethereum'],
    descriptionKey: 'tools.items.opensea.description'
  },

  // 区块链
  {
    id: 'solana',
    name: 'Solana',
    url: 'https://solana.com',
    icon: '⚡',
    category: 'blockchain',
    tags: ['blockchain', 'solana', 'defi'],
    descriptionKey: 'tools.items.solana.description'
  },
  {
    id: 'binance',
    name: 'Binance',
    url: 'https://www.binance.com',
    icon: '🔶',
    category: 'blockchain',
    tags: ['exchange', 'crypto', 'trading'],
    descriptionKey: 'tools.items.binance.description'
  },
  {
    id: 'coinmarketcap',
    name: 'CoinMarketCap',
    url: 'https://coinmarketcap.com',
    icon: '💰',
    category: 'blockchain',
    tags: ['crypto', 'market', 'data'],
    descriptionKey: 'tools.items.coinmarketcap.description'
  },

  // 设计工具
  {
    id: 'figma',
    name: 'Figma',
    url: 'https://www.figma.com',
    icon: '🎨',
    category: 'design',
    tags: ['design', 'ui', 'collaboration'],
    descriptionKey: 'tools.items.figma.description'
  },
  {
    id: 'dribbble',
    name: 'Dribbble',
    url: 'https://dribbble.com',
    icon: '🏀',
    category: 'design',
    tags: ['design', 'inspiration', 'community'],
    descriptionKey: 'tools.items.dribbble.description'
  },
  {
    id: 'behance',
    name: 'Behance',
    url: 'https://www.behance.net',
    icon: '🎭',
    category: 'design',
    tags: ['design', 'portfolio', 'adobe'],
    descriptionKey: 'tools.items.behance.description'
  },

  // 学习平台
  {
    id: 'mdn',
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    icon: '📖',
    category: 'learning',
    tags: ['documentation', 'web', 'javascript'],
    descriptionKey: 'tools.items.mdn.description'
  },
  {
    id: 'freecodecamp',
    name: 'freeCodeCamp',
    url: 'https://www.freecodecamp.org',
    icon: '🔥',
    category: 'learning',
    tags: ['learning', 'coding', 'free'],
    descriptionKey: 'tools.items.freecodecamp.description'
  },
  {
    id: 'leetcode',
    name: 'LeetCode',
    url: 'https://leetcode.com',
    icon: '💻',
    category: 'learning',
    tags: ['algorithm', 'interview', 'practice'],
    descriptionKey: 'tools.items.leetcode.description'
  },

  // 生产力工具
  {
    id: 'notion',
    name: 'Notion',
    url: 'https://www.notion.so',
    icon: '📝',
    category: 'productivity',
    tags: ['notes', 'productivity', 'organization'],
    descriptionKey: 'tools.items.notion.description'
  },
  {
    id: 'linear',
    name: 'Linear',
    url: 'https://linear.app',
    icon: '📊',
    category: 'productivity',
    tags: ['project-management', 'issue-tracking', 'agile'],
    descriptionKey: 'tools.items.linear.description'
  }
]

/**
 * 根据分类获取工具列表
 */
export function getToolsByCategory(category: ToolCategory): Tool[] {
  return tools.filter(tool => tool.category === category)
}

/**
 * 搜索工具
 */
export function searchTools(query: string): Tool[] {
  const lowerQuery = query.toLowerCase()
  return tools.filter(tool => 
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

