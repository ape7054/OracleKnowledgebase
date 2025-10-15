/**
 * 后端项目图标映射系统
 * 使用 Lucide 图标 + 自定义品牌图标
 */

import { 
  Server,           // Go, 微服务通用
  Box,              // gRPC, Go Kit
  Boxes,            // Go Micro
  Database,         // 数据库通用
  Cloud,            // API 通用
  FileJson,         // RESTful API
  Network,          // GraphQL
  FileCode,         // Swagger
  Send,             // Postman
  Cog,              // Rust 通用
  Zap,              // Actix Web, Tokio
  Rocket as RocketIcon, // Rocket framework
  Cylinder,         // MySQL
  Archive,          // PostgreSQL
  Layers,           // Redis
  Database as MongoIcon, // MongoDB
  type LucideIcon,
  // 更新类型图标
  Package,          // 技术更新
  TrendingUp,       // 性能优化
  Shield,           // 安全更新
  CheckCircle2,     // 新特性
  Info,             // 其他
} from 'lucide-react'

import { ComponentType, SVGProps } from 'react'

// 项目图标类型定义
type ProjectIcon = ComponentType<SVGProps<SVGSVGElement>> | LucideIcon

// 项目 Logo 图标映射
export const projectIconMap: Record<string, ProjectIcon> = {
  // Go 微服务
  'go': Server,
  'go-gin': Server,
  'go-grpc': Box,
  'grpc': Box,
  'go-kit': Boxes,
  'go-micro': Boxes,
  
  // API 设计
  'api': Cloud,
  'restful-api': FileJson,
  'graphql': Network,
  'swagger': FileCode,
  'postman': Send,
  
  // Rust
  'rust': Cog,
  'rust-lang': Cog,
  'actix-web': Zap,
  'tokio': Zap,
  'rocket': RocketIcon,
  
  // 数据库
  'mysql': Cylinder,
  'postgresql': Archive,
  'redis': Layers,
  'mongodb': MongoIcon,
  
  // 默认
  'default': Server,
}

/**
 * 获取项目图标组件
 */
export function getProjectIcon(iconKey: string): ProjectIcon {
  return projectIconMap[iconKey] || projectIconMap['default']
}

// 更新类型图标映射
export const updateTypeIconMap: Record<string, LucideIcon> = {
  'tech': Package,
  'performance': TrendingUp,
  'security': Shield,
  'feature': CheckCircle2,
  'other': Info,
}

/**
 * 获取更新类型图标
 */
export function getUpdateTypeIcon(type: string): LucideIcon {
  return updateTypeIconMap[type] || Info
}

