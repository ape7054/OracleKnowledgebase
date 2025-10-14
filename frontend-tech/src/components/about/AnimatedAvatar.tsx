'use client'

import Image from 'next/image'
import { BorderBeam } from '@/components/ui/border-beam'

interface AnimatedAvatarProps {
  src: string
  alt: string
  size?: number
}

export function AnimatedAvatar({ src, alt, size = 160 }: AnimatedAvatarProps) {
  return (
    <div className="relative inline-block group">
      {/* 发光背景 */}
      <div className="absolute -inset-8 bg-gradient-radial from-orange-500/20 via-yellow-500/10 to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* 头像容器 - 这里需要圆角，让 BorderBeam 继承 */}
      <div className="relative rounded-full" style={{ width: size, height: size }}>
        <div className="overflow-hidden rounded-full w-full h-full">
          <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        
        {/* 动态边框 - 增加尺寸和边框宽度让效果更明显 */}
        <BorderBeam 
          size={size}
          duration={5}
          colorFrom="#f97316"
          colorTo="#fbbf24"
          borderWidth={6}
          delay={0}
        />
      </div>
    </div>
  )
}
