/**
 * AI 项目图标映射系统
 * 使用 Lucide 图标 + 自定义品牌图标
 */

import { 
  Bot,              // AI 通用
  Brain,            // OpenAI, Anthropic
  Sparkles,         // Claude
  Search,           // Google/Gemini
  Code2,            // Cursor, GitHub Copilot
  Image,            // Midjourney, DALL-E
  Layers,           // Stable Diffusion
  Wand2,            // Leonardo AI, Magic
  Film,             // Runway
  Database,         // Pinecone
  Link2,            // LangChain
  Cloud,            // Replicate
  Users,            // Hugging Face
  Zap,              // Meta/Llama
  FlaskConical,     // Research
  Rocket,           // Vercel
  Terminal,         // Replit
  type LucideIcon,
  // 更新类型图标
  Lightbulb,        // 技术更新
  TrendingUp,       // 行业动态
  DollarSign,       // 融资消息
  CheckCircle2,     // 应用案例
  Info,             // 其他
} from 'lucide-react'

import { ComponentType, SVGProps } from 'react'

// 项目图标类型定义
type ProjectIcon = ComponentType<SVGProps<SVGSVGElement>> | LucideIcon

// 项目 Logo 图标映射
export const projectIconMap: Record<string, ProjectIcon> = {
  // 开发工具
  'openai': Brain,
  'anthropic': Sparkles,
  'cursor': Code2,
  'github': Code2,
  'github-copilot': Code2,
  'v0': Wand2,
  'vercel': Rocket,
  'replit': Terminal,
  
  // 图像生成
  'midjourney': Image,
  'stable-diffusion': Layers,
  'stability': Layers,
  'dalle': Image,
  'leonardo': Wand2,
  'runway': Film,
  
  // 大语言模型
  'gpt4': Brain,
  'claude-sonnet': Sparkles,
  'claude-35-sonnet': Sparkles,
  'gemini': Search,
  'google': Search,
  'llama': Zap,
  'meta': Zap,
  'deepseek': Brain,
  'qwen': Brain,
  'alibaba': Brain,
  'mistral': Brain,
  'command-r-plus': Brain,
  
  // AI 基础设施
  'huggingface': Users,
  'pinecone': Database,
  'langchain': Link2,
  'replicate': Cloud,
  
  // 前沿研究
  'openai-research': FlaskConical,
  'deepmind': FlaskConical,
  'anthropic-research': FlaskConical,
}

// 更新类型图标映射
export const updateTypeIconMap: Record<string, { icon: LucideIcon; color: string }> = {
  'tech': { 
    icon: Lightbulb, 
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50' 
  },
  'industry': { 
    icon: TrendingUp, 
    color: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-200/50' 
  },
  'funding': { 
    icon: DollarSign, 
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50' 
  },
  'application': { 
    icon: CheckCircle2, 
    color: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-200/50' 
  },
  'ecosystem': { 
    icon: Users, 
    color: 'bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-200/50' 
  },
  'other': { 
    icon: Info, 
    color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200/50' 
  }
}

// AI 主图标
export const AIIcon = Bot

// 获取项目图标组件
export function getProjectIcon(projectId: string): ProjectIcon {
  return projectIconMap[projectId] || Bot
}

// 获取更新类型图标和样式
export function getUpdateTypeIcon(type: string) {
  return updateTypeIconMap[type] || updateTypeIconMap.other
}

