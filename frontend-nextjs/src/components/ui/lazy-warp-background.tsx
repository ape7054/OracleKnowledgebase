"use client"

import { useEffect, useRef, useState } from "react"
import { WarpBackground } from "./warp-background"

interface LazyWarpBackgroundProps {
  className?: string
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

export const LazyWarpBackground = (props: LazyWarpBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 进入视口时激活
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          // 离开视口后延迟500ms停用，避免频繁切换
          const timeout = setTimeout(() => setIsVisible(false), 500)
          return () => clearTimeout(timeout)
        }
      },
      { 
        rootMargin: "100px", // 提前100px激活，确保流畅过渡
        threshold: 0.1       // 10%可见即触发
      }
    )
    
    if (ref.current) {
      observer.observe(ref.current)
    }
    
    return () => {
      observer.disconnect()
    }
  }, [])
  
  return (
    <div ref={ref} className={props.className}>
      {isVisible && <WarpBackground {...props} />}
    </div>
  )
}

