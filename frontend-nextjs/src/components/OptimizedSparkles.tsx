'use client';

import { SparklesCore } from '@/components/ui/sparkles';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useEffect, useState } from 'react';

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
 * 根据屏幕尺寸自动调整粒子密度以优化性能
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
  const [isMounted, setIsMounted] = useState(false);
  const [adjustedDensity, setAdjustedDensity] = useState(particleDensity);

  useEffect(() => {
    setIsMounted(true);
    
    const updateDensity = () => {
      const width = window.innerWidth;
      
      // 根据屏幕宽度调整粒子密度
      // 移动端 (< 768px): 100% 密度
      // 平板 (768px - 1024px): 60% 密度
      // 桌面端 (> 1024px): 35% 密度
      let densityMultiplier = 1;
      
      if (width >= 1024) {
        densityMultiplier = 0.35; // 桌面端大幅降低
      } else if (width >= 768) {
        densityMultiplier = 0.6; // 平板降低一些
      }
      
      setAdjustedDensity(Math.round(particleDensity * densityMultiplier));
    };

    updateDensity();
    window.addEventListener('resize', updateDensity);
    
    return () => window.removeEventListener('resize', updateDensity);
  }, [particleDensity]);

  // 如果用户偏好减少动画，返回一个简单的静态背景
  if (prefersReducedMotion) {
    return <div className={`${className} bg-gradient-radial from-muted/10 to-transparent`} />;
  }

  // 客户端挂载前不渲染粒子效果，避免 SSR 不一致
  if (!isMounted) {
    return <div className={className} />;
  }

  return (
    <SparklesCore
      id={id}
      background="transparent"
      minSize={minSize}
      maxSize={maxSize}
      speed={speed}
      particleDensity={adjustedDensity}
      className={className}
      particleColor={particleColor}
    />
  );
}

