"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";
import { MatrixRain } from "./matrix-rain";
import { MatrixRainMobile } from "./matrix-rain-mobile";
import { isMobileDevice } from "@/lib/device-detection";

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
   * Show debug information overlay
   * @default false
   */
  showDebugInfo?: boolean;
}

export const MatrixBackground = ({
  className,
  children,
  speed = 1.0,
  density = 1.0,
  brightness = 1.0,
  greenIntensity = 1.0,
  variation = 1.0,
  showDebugInfo = false,
  ...props
}: MatrixBackgroundProps) => {
  const [isDark, setIsDark] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    // 检测是否为移动设备
    setIsMobile(isMobileDevice());
  }, []);

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
      {/* Matrix Rain Background - Auto switch between WebGL and CSS version */}
      <div className="absolute inset-0 overflow-hidden">
        {isMobile ? (
          <MatrixRainMobile
            speed={speed}
            density={density}
            brightness={brightness}
            greenIntensity={greenIntensity}
            isDarkMode={isDark}
            className="w-full h-full"
          />
        ) : (
          <MatrixRain
            speed={speed}
            density={density}
            brightness={brightness}
            greenIntensity={greenIntensity}
            variation={variation}
            isDarkMode={isDark}
            showDebugInfo={showDebugInfo}
            className="w-full h-full"
          />
        )}
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};

