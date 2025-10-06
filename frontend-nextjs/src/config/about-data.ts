// 关于页面的数据配置文件

export interface Stat {
  id: string
  icon: string
  number: string
  label: string
  description: string
}

export interface TimelineItem {
  id: string
  period: string
  title: string
  description: string
  type: 'exploration' | 'work' | 'transformation'
  skills: string[]
  projects?: {
    name: string
    description: string
    tech: string[]
  }[]
  highlights?: string[]
}

export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'blockchain' | 'devops'
  proficiency: number // 0-100
  yearsOfExperience: number
  icon?: string
  relatedProjects?: string[]
}

export interface SocialLink {
  id: string
  name: string
  icon: string
  href: string
  description?: string
}

// 统计数据
export const stats: Stat[] = [
  {
    id: 'articles',
    icon: '📝',
    number: '30+',
    label: 'stats.articles.label',
    description: 'stats.articles.description'
  },
  {
    id: 'domains',
    icon: '💻',
    number: '5',
    label: 'stats.domains.label',
    description: 'stats.domains.description'
  },
  {
    id: 'github',
    icon: '⭐',
    number: '200+',
    label: 'stats.github.label',
    description: 'stats.github.description'
  },
  {
    id: 'experience',
    icon: '📅',
    number: '2+',
    label: 'stats.experience.label',
    description: 'stats.experience.description'
  }
]

// 职业历程时间线
export const timeline: TimelineItem[] = [
  {
    id: 'transformation',
    period: 'timeline.transformation.period',
    title: 'timeline.transformation.title',
    description: 'timeline.transformation.description',
    type: 'transformation',
    skills: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'AI辅助开发'],
    highlights: [
      'timeline.transformation.highlight1',
      'timeline.transformation.highlight2'
    ]
  },
  {
    id: 'defi',
    period: 'timeline.defi.period',
    title: 'timeline.defi.title',
    description: 'timeline.defi.description',
    type: 'work',
    skills: ['Rust', 'gRPC', 'Solana', 'TypeScript', 'Node.js'],
    projects: [
      {
        name: 'timeline.defi.project1.name',
        description: 'timeline.defi.project1.description',
        tech: ['Rust', 'gRPC', 'Solana']
      },
      {
        name: 'timeline.defi.project2.name',
        description: 'timeline.defi.project2.description',
        tech: ['TypeScript', 'Node.js', 'Telegram Bot API']
      }
    ]
  },
  {
    id: 'exploration',
    period: 'timeline.exploration.period',
    title: 'timeline.exploration.title',
    description: 'timeline.exploration.description',
    type: 'exploration',
    skills: ['Rust', 'Blockchain', 'Web3', '加密货币'],
    highlights: [
      'timeline.exploration.highlight1',
      'timeline.exploration.highlight2'
    ]
  }
]

// 技能列表
export const skills: Skill[] = [
  // 前端
  {
    id: 'react',
    name: 'React',
    category: 'frontend',
    proficiency: 85,
    yearsOfExperience: 2,
    icon: '⚛️'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    proficiency: 80,
    yearsOfExperience: 1.5
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    proficiency: 90,
    yearsOfExperience: 2.5
  },
  {
    id: 'tailwindcss',
    name: 'TailwindCSS',
    category: 'frontend',
    proficiency: 85,
    yearsOfExperience: 2
  },
  {
    id: 'vue',
    name: 'Vue.js',
    category: 'frontend',
    proficiency: 70,
    yearsOfExperience: 1.5
  },
  {
    id: 'uniapp',
    name: 'UniApp',
    category: 'frontend',
    proficiency: 65,
    yearsOfExperience: 1
  },
  // 后端
  {
    id: 'rust',
    name: 'Rust',
    category: 'backend',
    proficiency: 80,
    yearsOfExperience: 2,
    icon: '🦀'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    proficiency: 85,
    yearsOfExperience: 2.5
  },
  {
    id: 'go',
    name: 'Go',
    category: 'backend',
    proficiency: 60,
    yearsOfExperience: 1
  },
  {
    id: 'grpc',
    name: 'gRPC',
    category: 'backend',
    proficiency: 75,
    yearsOfExperience: 1.5
  },
  // 区块链
  {
    id: 'solidity',
    name: 'Solidity',
    category: 'blockchain',
    proficiency: 70,
    yearsOfExperience: 2,
    icon: '⛓️'
  },
  {
    id: 'solana',
    name: 'Solana',
    category: 'blockchain',
    proficiency: 80,
    yearsOfExperience: 1.5
  },
  {
    id: 'web3js',
    name: 'Web3.js',
    category: 'blockchain',
    proficiency: 75,
    yearsOfExperience: 2
  },
  {
    id: 'ethersjs',
    name: 'Ethers.js',
    category: 'blockchain',
    proficiency: 75,
    yearsOfExperience: 2
  },
  {
    id: 'bsc',
    name: 'BSC',
    category: 'blockchain',
    proficiency: 70,
    yearsOfExperience: 1.5
  },
  // DevOps
  {
    id: 'docker',
    name: 'Docker',
    category: 'devops',
    proficiency: 75,
    yearsOfExperience: 2,
    icon: '🐳'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'devops',
    proficiency: 90,
    yearsOfExperience: 3
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    category: 'devops',
    proficiency: 70,
    yearsOfExperience: 1.5
  },
  {
    id: 'linux',
    name: 'Linux',
    category: 'devops',
    proficiency: 80,
    yearsOfExperience: 3
  }
]

// 社交媒体链接
export const socialLinks: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    icon: 'Github',
    href: 'https://github.com/yourusername',
    description: 'socialLinks.github.description'
  },
  {
    id: 'email',
    name: 'Email',
    icon: 'Mail',
    href: 'mailto:your.email@example.com',
    description: 'socialLinks.email.description'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'Twitter',
    href: 'https://twitter.com/yourusername',
    description: 'socialLinks.twitter.description'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: 'Linkedin',
    href: 'https://linkedin.com/in/yourusername',
    description: 'socialLinks.linkedin.description'
  }
]

// 技能分类
export const skillCategories = [
  { id: 'frontend', label: 'skills.categories.frontend', icon: '💻' },
  { id: 'backend', label: 'skills.categories.backend', icon: '🔧' },
  { id: 'blockchain', label: 'skills.categories.blockchain', icon: '⛓️' },
  { id: 'devops', label: 'skills.categories.devops', icon: '🛠️' }
] as const

