'use client';

import React, { useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MatrixRainCSSProps extends React.HTMLAttributes<HTMLDivElement> {
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
   * Whether to use dark mode colors
   * @default true
   */
  isDarkMode?: boolean;
}

// Matrix 字符池：0, 1 和日文片假名
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

// 生成随机字符串
const generateRandomString = (length: number): string => {
  return Array.from({ length }, () => 
    MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)]
  ).join('');
};

export const MatrixRainCSS = forwardRef<HTMLDivElement, MatrixRainCSSProps>(
  (
    {
      className,
      speed = 1.0,
      density = 1.0,
      brightness = 1.0,
      greenIntensity = 1.0,
      variation = 1.0,
      isDarkMode = true,
      ...props
    },
    ref
  ) => {
    // 计算列数（基于 density）
    const columnCount = useMemo(() => {
      // 基础列数 × density，限制在合理范围
      const baseColumns = 20;
      const count = Math.floor(baseColumns * density);
      return Math.min(Math.max(count, 10), 50); // 10-50 列
    }, [density]);

    // 生成列数据
    const columns = useMemo(() => {
      return Array.from({ length: columnCount }, (_, i) => {
        const charCount = 15 + Math.floor(Math.random() * 15); // 15-30 字符
        const chars = generateRandomString(charCount);
        const animationDelay = Math.random() * 5; // 0-5s 延迟
        const animationDuration = (8 + Math.random() * 12) / speed; // 基础 8-20s ÷ speed
        
        return {
          id: i,
          chars,
          animationDelay,
          animationDuration,
          left: (i / columnCount) * 100, // 百分比位置
        };
      });
    }, [columnCount, speed]);

    // 颜色计算
    const getColors = () => {
      if (isDarkMode) {
        const greenValue = Math.round(255 * greenIntensity);
        return {
          bright: `rgb(200, ${greenValue}, 200)`,      // 亮绿色（leading）
          normal: `rgb(0, ${Math.round(greenValue * 0.8)}, 0)`,  // 正常绿色
          dim: `rgb(0, ${Math.round(greenValue * 0.65)}, 0)`,     // 暗绿色（尾部）- 提高亮度
        };
      } else {
        // 浅色模式：深色字符
        return {
          bright: 'rgb(40, 40, 40)',
          normal: 'rgb(80, 80, 80)',
          dim: 'rgb(130, 130, 130)',  // 提高亮度
        };
      }
    };

    const colors = getColors();

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full overflow-hidden', className)}
        style={{
          backgroundColor: isDarkMode ? '#000' : '#fff',
        }}
        {...props}
      >
        {columns.map((column) => (
          <div
            key={column.id}
            className="absolute top-0 font-mono text-sm leading-tight"
            style={{
              left: `${column.left}%`,
              animation: `matrixFall ${column.animationDuration}s linear infinite`,
              animationDelay: `${column.animationDelay}s`,
              willChange: 'transform',
              opacity: brightness,
            }}
          >
             {column.chars.split('').map((char, idx) => {
               // 渐变效果：顶部字符亮，底部字符暗
               const isLeading = idx < 3;
               const isTrailing = idx > column.chars.length - 5;
               const color = isLeading ? colors.bright : isTrailing ? colors.dim : colors.normal;
               const opacity = isLeading ? 1.0 : isTrailing ? 0.55 : 0.8;  // 提高尾部透明度
              
              return (
                 <div
                   key={idx}
                   style={{
                     color,
                     opacity,
                     textShadow: isLeading 
                       ? `0 0 ${5 * brightness}px ${color}, 0 0 ${10 * brightness}px ${color}`
                       : isTrailing
                         ? `0 0 ${4 * brightness}px ${color}`  // 尾部也增加发光
                         : `0 0 ${3 * brightness}px ${color}`,
                   }}
                 >
                   {char}
                 </div>
              );
            })}
          </div>
        ))}

        <style jsx>{`
          @keyframes matrixFall {
            from {
              transform: translateY(-100%);
              opacity: 0;
            }
            5% {
              opacity: 1;
            }
            95% {
              opacity: 1;
            }
            to {
              transform: translateY(100vh);
              opacity: 0;
            }
          }
        `}</style>
      </div>
    );
  }
);

MatrixRainCSS.displayName = 'MatrixRainCSS';

export default MatrixRainCSS;

