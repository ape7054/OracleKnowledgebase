import { IconType } from "react-icons"
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiVuedotjs,
  SiRust,
  SiNodedotjs,
  SiGo,
  SiSolidity,
  SiEthereum,
  SiSolana,
  SiDocker,
  SiGit,
  SiLinux,
  SiGithubactions,
  SiPostgresql,
  SiShadcnui,
  SiVite,
  SiRedis,
  SiVercel,
  SiWeb3Dotjs,
} from "react-icons/si"
import { RiBnbFill } from "react-icons/ri"
import { TbBrandReactNative, TbApi } from "react-icons/tb"

export interface TechStackItem {
  id: string
  name: string
  icon: IconType
  colorClass: string // Tailwind 类名，用于 DOM 渲染
  colorValue: string // 十六进制颜色值，用于 Canvas 渲染
  category?: 'frontend' | 'backend' | 'blockchain' | 'devops'
}

export const techStack: TechStackItem[] = [
  // Frontend
  {
    id: 'react',
    name: 'React',
    icon: SiReact,
    colorClass: 'text-[#61DAFB]',
    colorValue: '#61DAFB',
    category: 'frontend'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: SiNextdotjs,
    colorClass: 'text-black dark:text-white',
    colorValue: '#666666',
    category: 'frontend'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: SiTypescript,
    colorClass: 'text-[#3178C6]',
    colorValue: '#3178C6',
    category: 'frontend'
  },
  {
    id: 'tailwindcss',
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    colorClass: 'text-[#06B6D4]',
    colorValue: '#06B6D4',
    category: 'frontend'
  },
  {
    id: 'vue',
    name: 'Vue.js',
    icon: SiVuedotjs,
    colorClass: 'text-[#4FC08D]',
    colorValue: '#4FC08D',
    category: 'frontend'
  },
  {
    id: 'uniapp',
    name: 'UniApp',
    icon: TbBrandReactNative,
    colorClass: 'text-[#2DD4BF]',
    colorValue: '#2DD4BF',
    category: 'frontend'
  },
  {
    id: 'shadcnui',
    name: 'Shadcn UI',
    icon: SiShadcnui,
    colorClass: 'text-black dark:text-white',
    colorValue: '#666666',
    category: 'frontend'
  },
  {
    id: 'vite',
    name: 'Vite',
    icon: SiVite,
    colorClass: 'text-[#646CFF]',
    colorValue: '#646CFF',
    category: 'frontend'
  },
  
  // Backend
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: SiNodedotjs,
    colorClass: 'text-[#339933]',
    colorValue: '#339933',
    category: 'backend'
  },
  {
    id: 'go',
    name: 'Go',
    icon: SiGo,
    colorClass: 'text-[#00ADD8]',
    colorValue: '#00ADD8',
    category: 'backend'
  },
  {
    id: 'rust',
    name: 'Rust',
    icon: SiRust,
    colorClass: 'text-[#CE422B]',
    colorValue: '#CE422B',
    category: 'backend'
  },
  {
    id: 'grpc',
    name: 'gRPC',
    icon: TbApi,
    colorClass: 'text-[#00ADD8]',
    colorValue: '#00ADD8',
    category: 'backend'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: SiPostgresql,
    colorClass: 'text-[#4169E1]',
    colorValue: '#4169E1',
    category: 'backend'
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: SiRedis,
    colorClass: 'text-[#DC382D]',
    colorValue: '#DC382D',
    category: 'backend'
  },
  
  // Blockchain
  {
    id: 'solidity',
    name: 'Solidity',
    icon: SiSolidity,
    colorClass: 'text-[#A8B3CD]',
    colorValue: '#A8B3CD',
    category: 'blockchain'
  },
  {
    id: 'solana',
    name: 'Solana',
    icon: SiSolana,
    colorClass: 'text-[#14F195]',
    colorValue: '#14F195',
    category: 'blockchain'
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    icon: SiEthereum,
    colorClass: 'text-[#627EEA]',
    colorValue: '#627EEA',
    category: 'blockchain'
  },
  {
    id: 'web3js',
    name: 'Web3.js',
    icon: SiWeb3Dotjs,
    colorClass: 'text-[#F16822]',
    colorValue: '#F16822',
    category: 'blockchain'
  },
  {
    id: 'bsc',
    name: 'BSC',
    icon: RiBnbFill,
    colorClass: 'text-[#F3BA2F]',
    colorValue: '#F3BA2F',
    category: 'blockchain'
  },
  
  // DevOps
  {
    id: 'docker',
    name: 'Docker',
    icon: SiDocker,
    colorClass: 'text-[#2496ED]',
    colorValue: '#2496ED',
    category: 'devops'
  },
  {
    id: 'git',
    name: 'Git',
    icon: SiGit,
    colorClass: 'text-[#F05032]',
    colorValue: '#F05032',
    category: 'devops'
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: SiLinux,
    colorClass: 'text-[#FCC624]',
    colorValue: '#FCC624',
    category: 'devops'
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    icon: SiGithubactions,
    colorClass: 'text-[#2088FF]',
    colorValue: '#2088FF',
    category: 'devops'
  },
  {
    id: 'vercel',
    name: 'Vercel',
    icon: SiVercel,
    colorClass: 'text-black dark:text-white',
    colorValue: '#666666',
    category: 'devops'
  },
]

