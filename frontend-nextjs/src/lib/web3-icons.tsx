/**
 * Web3 项目图标映射系统
 * 将 emoji 和项目标识映射到 React 图标组件
 */

import { 
  Hexagon,      // Ethereum
  CircleDot,    // Solana  
  Triangle,     // Arbitrum
  Circle,       // Polygon
  Mountain,     // Avalanche
  Link2,        // 链接/Web3 通用
  Shield,       // 安全/监管
  Cpu,          // 技术更新
  Network,      // 生态系统
  Info,         // 其他
  type LucideIcon
} from 'lucide-react'

// 项目 Logo 图标映射
export const projectIconMap: Record<string, LucideIcon> = {
  'ethereum': Hexagon,
  'solana': CircleDot,
  'arbitrum': Triangle,
  'polygon': Circle,
  'avalanche': Mountain,
}

// 更新类型图标映射
export const updateTypeIconMap: Record<string, { icon: LucideIcon; color: string }> = {
  'regulatory': { 
    icon: Shield, 
    color: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-200/50' 
  },
  'tech': { 
    icon: Cpu, 
    color: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-200/50' 
  },
  'ecosystem': { 
    icon: Network, 
    color: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-200/50' 
  },
  'other': { 
    icon: Info, 
    color: 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-200/50' 
  }
}

// Web3 主图标
export const Web3Icon = Link2

// 获取项目图标组件
export function getProjectIcon(projectId: string): LucideIcon {
  return projectIconMap[projectId] || Circle
}

// 获取更新类型图标和样式
export function getUpdateTypeIcon(type: string) {
  return updateTypeIconMap[type] || updateTypeIconMap.other
}

