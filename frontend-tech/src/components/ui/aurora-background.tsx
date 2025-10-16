"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState, useRef } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const [isDark, setIsDark] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  
  useEffect(() => {
    // 检测当前主题
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // ✅ 使用防抖优化主题切换检测，减少频繁更新
    const debouncedCheckTheme = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(checkTheme, 100);
    };
    
    // 监听主题变化
    const observer = new MutationObserver(debouncedCheckTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      observer.disconnect();
    };
  }, []);
  
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center",
        "bg-zinc-50 text-slate-950 dark:bg-zinc-900",
        "transition-colors duration-300",
        className,
      )}
      {...props}
    >
      {/* ✅ 添加过渡效果到容器 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 主动画层 - 优化版 */}
        <div
          className={cn(
            "pointer-events-none absolute aurora-layer-base",
            isDark ? "aurora-layer-dark" : "aurora-layer-light",
            showRadialGradient && "aurora-layer-masked"
          )}
        ></div>
        
        {/* 混合层 - 优化版 */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            isDark ? "aurora-overlay-dark" : "aurora-overlay-light"
          )}
        ></div>
      </div>
      
      {/* 内容层 */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );
};
