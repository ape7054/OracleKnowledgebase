"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { MatrixRain } from "./matrix-rain";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";

interface MatrixBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  /**
   * Digital rain speed
   * @default 1.0
   */
  speed?: number;
  /**
   * Rain density and column count
   * @default 1.0
   */
  density?: number;
  /**
   * Character brightness and contrast
   * @default 1.0
   */
  brightness?: number;
  /**
   * Green color intensity
   * @default 1.0
   */
  greenIntensity?: number;
  /**
   * Character variation and randomness
   * @default 1.0
   */
  variation?: number;
  /**
   * Enable mobile optimization
   * @default true
   */
  enableMobileOptimization?: boolean;
  /**
   * Force low power mode
   * @default false
   */
  forceLowPowerMode?: boolean;
}

export const MatrixBackground = ({
  className,
  children,
  speed = 1.0,
  density = 1.0,
  brightness = 1.0,
  greenIntensity = 1.0,
  variation = 1.0,
  enableMobileOptimization = true,
  forceLowPowerMode = false,
  ...props
}: MatrixBackgroundProps) => {
  const [isDark, setIsDark] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const mobileOpt = useMobileOptimization();

  useEffect(() => {
    // 检测当前主题
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // 监听主题变化
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);

  // 页面可见性和电池优化
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isHidden = document.hidden;
      // 如果启用了移动优化且在移动设备上，或者强制低功耗模式，则在页面隐藏时暂停
      if ((enableMobileOptimization && mobileOpt.isMobile) || forceLowPowerMode) {
        setIsPaused(isHidden);
      }
    };

    const handleFocusChange = () => {
      const hasFocus = document.hasFocus();
      if ((enableMobileOptimization && mobileOpt.isMobile) || forceLowPowerMode) {
        setIsPaused(!hasFocus);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocusChange);
      window.removeEventListener('blur', handleFocusChange);
    };
  }, [enableMobileOptimization, mobileOpt.isMobile, forceLowPowerMode]);

  // 计算最终使用的参数
  const finalParams = (() => {
    // 如果强制低功耗模式或启用移动优化且需要优化
    const shouldUseOptimization = forceLowPowerMode || 
      (enableMobileOptimization && mobileOpt.shouldOptimize);
    
    if (shouldUseOptimization) {
      // 使用优化参数，但允许用户覆盖
      const optimized = mobileOpt.optimizedParams;
      return {
        speed: speed === 1.0 ? optimized.speed : speed,
        density: density === 1.0 ? optimized.density : density,
        brightness: brightness === 1.0 ? optimized.brightness : brightness,
        greenIntensity: greenIntensity === 1.0 ? optimized.greenIntensity : greenIntensity,
        variation: variation === 1.0 ? optimized.variation : variation,
      };
    }
    
    // 使用原始参数
    return { speed, density, brightness, greenIntensity, variation };
  })();

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        isDark 
          ? "bg-black text-slate-50" 
          : "bg-white text-slate-900",
        "transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {/* Matrix Rain Background */}
      <div className="absolute inset-0 overflow-hidden">
        <MatrixRain
          speed={finalParams.speed}
          density={finalParams.density}
          brightness={finalParams.brightness}
          greenIntensity={finalParams.greenIntensity}
          variation={finalParams.variation}
          isDarkMode={isDark}
          isPaused={isPaused}
          className="w-full h-full"
        />
      </div>
      
      {/* Mobile optimization indicator (development only) */}
      {enableMobileOptimization && mobileOpt.shouldOptimize && process.env.NODE_ENV === 'development' && (
        <div className="absolute top-4 right-4 z-20 bg-black/80 text-green-400 text-xs px-2 py-1 rounded">
          {mobileOpt.isMobile ? '📱' : '⚡'} {mobileOpt.performanceLevel.toUpperCase()}
        </div>
      )}
      
      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

