'use client'

import Image from 'next/image'

interface AnimatedAvatarProps {
  src: string
  alt: string
  size?: number
  className?: string
}

export function AnimatedAvatarFallback({ src, alt, size = 160, className }: AnimatedAvatarProps) {
  return (
    <div className={`relative inline-block group ${className || ''}`}>
      {/* 发光背景 */}
      <div className="absolute -inset-4 md:-inset-8 bg-gradient-radial from-orange-500/20 via-yellow-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 旋转光环容器 */}
      <div className="relative w-full h-full">
        {/* 旋转彩虹边框 - 使用圆锥渐变实现真正的彩虹效果 */}
        <div className="absolute inset-0 rounded-full animate-spin-slow" 
             style={{
               background: 'conic-gradient(from 0deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000)',
               padding: '3px'
             }}>
          <div className="w-full h-full rounded-full bg-background" />
        </div>
        
        {/* 头像 */}
        <div className="absolute inset-[3px] rounded-full overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            priority
          />
        </div>
      </div>
    </div>
  )
}
