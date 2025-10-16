import { Construction } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DevelopmentBadgeProps {
  /**
   * 徽章尺寸
   * - sm: 小尺寸（用于页面底部、侧边栏等次要位置）
   * - md: 中等尺寸（用于页面标题等主要位置）
   */
  size?: 'sm' | 'md'
  /**
   * 显示的文本内容
   */
  text: string
  /**
   * 额外的 CSS 类名
   */
  className?: string
}

export function DevelopmentBadge({ 
  size = 'md', 
  text,
  className 
}: DevelopmentBadgeProps) {
  return (
    <span
      className={cn(
        // 基础布局
        'inline-flex items-center gap-1.5',
        // 渐变背景 - 亮色模式：黄->橙->红
        'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500',
        'text-white shadow-lg',
        // 渐变背景 - 暗色模式：绿->青->蓝
        'dark:bg-gradient-to-r dark:from-green-400 dark:via-teal-500 dark:to-cyan-500',
        'dark:text-white',
        // 增强版呼吸灯动画 - 透明度变化更明显（100% → 70% → 100%）
        'animate-pulse-strong',
        // 字体加粗
        'font-bold',
        // 根据尺寸设置不同的样式
        size === 'sm' && [
          'px-2 py-1',
          'text-xs',
          'rounded-md',
          'shadow-md'
        ],
        size === 'md' && [
          'px-3 py-1.5',
          'text-sm',
          'rounded-lg',
          'shadow-lg'
        ],
        className
      )}
    >
      <Construction className={cn(
        size === 'sm' && 'w-3 h-3',
        size === 'md' && 'w-4 h-4'
      )} />
      {text}
    </span>
  )
}

