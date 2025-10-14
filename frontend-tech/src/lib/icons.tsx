import {
  Monitor,
  Server,
  Layers,
  Settings,
  AtomIcon,
  Zap,
  Link,
  Container,
  Cog,
  BarChart3,
  FileText,
  Code2,
  Star,
  Calendar,
  Target,
  Lightbulb,
  GraduationCap,
  Network,
  Rocket,
  Sparkles,
  BookOpen,
  Mail,
  Flame,
  type LucideIcon
} from 'lucide-react'

// 图标映射表
const iconMap: Record<string, LucideIcon> = {
  Monitor,
  Server,
  Layers,
  Settings,
  AtomIcon,
  Zap,
  Link,
  Container,
  Cog,
  BarChart3,
  FileText,
  Code2,
  Star,
  Calendar,
  Target,
  Lightbulb,
  GraduationCap,
  Network,
  Rocket,
  Sparkles,
  BookOpen,
  Mail,
  Flame,
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

// 动态图标组件
export function DynamicIcon({ name, className, size = 16 }: IconProps) {
  const IconComponent = iconMap[name]
  
  if (!IconComponent) {
    return null
  }
  
  return <IconComponent className={className} size={size} />
}

// 导出图标组件供直接使用
export {
  Monitor,
  Server,
  Layers,
  Settings,
  AtomIcon,
  Zap,
  Link,
  Container,
  Cog,
  BarChart3,
  FileText,
  Code2,
  Star,
  Calendar,
  Target,
  Lightbulb,
  GraduationCap,
  Network,
  Rocket,
  Sparkles,
  BookOpen,
  Mail,
  Flame,
}


