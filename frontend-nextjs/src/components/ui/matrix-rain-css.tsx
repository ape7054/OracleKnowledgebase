'use client';

import React, { useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MatrixRainCSSProps extends React.HTMLAttributes<HTMLDivElement> {
  speed?: number;
  density?: number;
  brightness?: number;
  greenIntensity?: number;
  variation?: number;
  isDarkMode?: boolean;
  showDebugInfo?: boolean;
}

// 生成随机 0 或 1
const randomChar = () => Math.random() > 0.5 ? '0' : '1';

// 生成一列的字符
const generateColumn = (charCount: number) => {
  return Array.from({ length: charCount }, () => randomChar());
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
      showDebugInfo = false,
      ...props
    },
    ref
  ) => {
    // 计算列数（移动端限制在 20-40 列）
    const columnCount = useMemo(() => {
      const baseColumns = Math.floor(density * 25);
      return Math.max(20, Math.min(40, baseColumns));
    }, [density]);

    // 每列的字符数
    const charsPerColumn = 25;

    // 生成列数据（使用 useMemo 避免重复生成）
    const columns = useMemo(() => {
      return Array.from({ length: columnCount }, (_, i) => ({
        id: i,
        chars: generateColumn(charsPerColumn),
        // 随机延迟 0-5s
        delay: Math.random() * 5,
        // 基础时长 8-15s，受 speed 影响
        duration: (8 + Math.random() * 7) / speed,
        // 随机起始位置
        offset: Math.random() * 100,
      }));
    }, [columnCount, speed]);

    // 颜色配置
    const colorStyle = useMemo(() => {
      if (isDarkMode) {
        const intensity = Math.floor(greenIntensity * 255);
        return {
          color: `rgb(0, ${intensity}, 0)`,
          textShadow: `0 0 ${5 * greenIntensity}px rgb(0, ${intensity}, 0)`,
        };
      } else {
        return {
          color: '#1a1a1a',
          textShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
        };
      }
    }, [isDarkMode, greenIntensity]);

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full overflow-hidden', className)}
        {...props}
      >
        {/* 调试信息 */}
        {showDebugInfo && (
          <div className="absolute top-2 right-2 bg-black/80 text-green-400 p-3 rounded-lg text-xs font-mono z-50 border border-green-500/30">
            <div className="font-bold text-green-300 mb-2">CSS Version</div>
            <div className="space-y-1">
              <div>Columns: {columnCount}</div>
              <div>Speed: {speed.toFixed(1)}x</div>
              <div>Density: {density.toFixed(1)}</div>
            </div>
          </div>
        )}

        {/* Matrix 列 - Dynamic inline styles required for animation */}
        {columns.map((column) => (
          <div
            key={column.id}
            className="matrix-column absolute top-0 font-mono text-sm md:text-base leading-tight"
            style={{
              left: `${(column.id / columnCount) * 100}%`,
              width: `${100 / columnCount}%`,
              animation: `matrixFall ${column.duration}s linear ${column.delay}s infinite`,
              willChange: 'transform',
              transform: `translateY(-${column.offset}%)`,
            }}
          >
            {column.chars.map((char, charIndex) => (
              <div
                key={charIndex}
                className="matrix-char text-center"
                style={{
                  ...colorStyle,
                  opacity: brightness * (1 - (charIndex / charsPerColumn) * 0.7),
                }}
              >
                {char}
              </div>
            ))}
          </div>
        ))}

        {/* CSS 动画定义 */}
        <style jsx>{`
          @keyframes matrixFall {
            0% {
              transform: translateY(-100%);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(100vh);
              opacity: 0;
            }
          }

          .matrix-column {
            pointer-events: none;
          }

          .matrix-char {
            user-select: none;
          }
        `}</style>
      </div>
    );
  }
);

MatrixRainCSS.displayName = 'MatrixRainCSS';

export default MatrixRainCSS;

