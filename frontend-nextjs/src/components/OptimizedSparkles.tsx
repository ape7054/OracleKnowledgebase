'use client';

import { SparklesCore } from '@/components/ui/sparkles';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface OptimizedSparklesProps {
  id: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  speed?: number;
  particleColor?: string;
  className?: string;
}

/**
 * 优化的粒子效果组件
 * 当用户偏好减少动画时不渲染
 */
export function OptimizedSparkles({
  id,
  minSize = 1,
  maxSize = 3,
  particleDensity = 30,
  speed = 2,
  particleColor = '#888888',
  className = 'w-full h-full',
}: OptimizedSparklesProps) {
  const prefersReducedMotion = useReducedMotion();

  // 如果用户偏好减少动画，返回一个简单的静态背景
  if (prefersReducedMotion) {
    return <div className={`${className} bg-gradient-radial from-muted/10 to-transparent`} />;
  }

  return (
    <SparklesCore
      id={id}
      background="transparent"
      minSize={minSize}
      maxSize={maxSize}
      speed={speed}
      particleDensity={particleDensity}
      className={className}
      particleColor={particleColor}
    />
  );
}

