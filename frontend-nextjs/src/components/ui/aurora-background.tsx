"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode, useEffect, useState } from "react";

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
  
  return (
    <div
      className={cn(
        "transition-bg relative flex flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
        {/* 主动画层 */}
        <div
          className={cn(
            "pointer-events-none absolute will-change-transform",
            isDark ? "aurora-layer-dark" : "aurora-layer-light"
          )}
          style={{
            inset: "-10px",
            opacity: isDark ? 0.7 : 0.5,
            filter: isDark ? "blur(80px)" : "blur(40px) invert(1)",
            animation: "aurora 60s linear infinite",
            ...(showRadialGradient && {
              maskImage: "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse at 100% 0%, black 10%, transparent 70%)",
            }),
          }}
        ></div>
        
        {/* 混合层 */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            isDark ? "aurora-overlay-dark" : "aurora-overlay-light"
          )}
          style={{
            opacity: isDark ? 0.6 : 0.4,
            mixBlendMode: isDark ? "soft-light" : "difference",
          }}
        ></div>
      </div>
      {children}
    </div>
  );
};
