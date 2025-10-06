// 项目数据配置文件

export interface Project {
  id: string
  title: string
  description: string
  cover?: string
  tech: string[]
  links: {
    github?: string
    demo?: string
    article?: string
  }
  category: 'web3' | 'frontend' | 'backend' | 'tools'
  featured: boolean
  achievements?: string[]
  details?: {
    background?: string
    challenges?: string[]
    solutions?: string[]
    results?: string[]
  }
}

export const projects: Project[] = [
  {
    id: 'solana-arbitrage-bot',
    title: 'projects.solanaBot.title',
    description: 'projects.solanaBot.description',
    tech: ['Rust', 'gRPC', 'Solana', 'WebSocket'],
    links: {
      github: 'https://github.com/yourusername/solana-bot'
    },
    category: 'web3',
    featured: true,
    achievements: [
      'projects.solanaBot.achievement1',
      'projects.solanaBot.achievement2',
      'projects.solanaBot.achievement3'
    ],
    details: {
      background: 'projects.solanaBot.details.background',
      challenges: [
        'projects.solanaBot.details.challenge1',
        'projects.solanaBot.details.challenge2'
      ],
      solutions: [
        'projects.solanaBot.details.solution1',
        'projects.solanaBot.details.solution2'
      ],
      results: [
        'projects.solanaBot.details.result1',
        'projects.solanaBot.details.result2'
      ]
    }
  },
  {
    id: 'telegram-trading-bot',
    title: 'projects.telegramBot.title',
    description: 'projects.telegramBot.description',
    tech: ['TypeScript', 'Node.js', 'Telegram Bot API', 'Web3'],
    links: {
      github: 'https://github.com/yourusername/telegram-bot'
    },
    category: 'web3',
    featured: true,
    achievements: [
      'projects.telegramBot.achievement1',
      'projects.telegramBot.achievement2'
    ]
  },
  {
    id: 'learning-stack',
    title: 'projects.learningStack.title',
    description: 'projects.learningStack.description',
    tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'MDX'],
    links: {
      demo: 'https://your-site.vercel.app',
      github: 'https://github.com/yourusername/learning-stack'
    },
    category: 'frontend',
    featured: true,
    achievements: [
      'projects.learningStack.achievement1',
      'projects.learningStack.achievement2'
    ]
  }
]

export const projectCategories = [
  { id: 'all', label: 'projects.categories.all', icon: '📦' },
  { id: 'web3', label: 'projects.categories.web3', icon: '⛓️' },
  { id: 'frontend', label: 'projects.categories.frontend', icon: '💻' },
  { id: 'backend', label: 'projects.categories.backend', icon: '🔧' },
  { id: 'tools', label: 'projects.categories.tools', icon: '🛠️' }
] as const

