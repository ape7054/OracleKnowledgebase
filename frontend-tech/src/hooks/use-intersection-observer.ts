'use client'

import { useEffect, useRef, useState } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  root?: Element | null
}

interface UseIntersectionObserverResult {
  ref: React.RefObject<HTMLDivElement | null>
  isInView: boolean
}

/**
 * 检测元素是否在视口内的自定义Hook
 * 使用Intersection Observer API实现高性能的视口检测
 * 
 * @param options - Intersection Observer配置选项
 * @returns ref和isInView状态
 */
export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverResult {
  const { threshold = 0.1, rootMargin = '0px', root = null } = options
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      {
        threshold,
        rootMargin,
        root,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, root])

  return { ref, isInView }
}

