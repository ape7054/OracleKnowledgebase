'use client';

import React, { useMemo, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface MatrixRainMobileProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Digital rain speed (affects animation duration)
   * @default 1.0
   */
  speed?: number;

  /**
   * Rain density (number of columns)
   * @default 1.0
   */
  density?: number;

  /**
   * Character brightness
   * @default 1.0
   */
  brightness?: number;

  /**
   * Green color intensity
   * @default 1.0
   */
  greenIntensity?: number;

  /**
   * Whether to use dark mode colors
   * @default true
   */
  isDarkMode?: boolean;
}

// Generate random binary string for a column
function generateBinaryString(length: number): string {
  return Array.from({ length }, () => Math.random() > 0.5 ? '1' : '0').join(' ');
}

export const MatrixRainMobile = forwardRef<HTMLDivElement, MatrixRainMobileProps>(
  (
    {
      className,
      speed = 1.0,
      density = 1.0,
      brightness = 1.0,
      greenIntensity = 1.0,
      ...props
    },
    ref
  ) => {
    // Calculate number of columns based on density
    // density 1.0 = ~20 columns on mobile
    const columnCount = useMemo(() => Math.floor(20 * density), [density]);

    // Calculate animation duration based on speed
    // speed 1.0 = 4s duration
    const baseDuration = 4 / speed;

    // Generate columns with random binary strings
    const columns = useMemo(
      () =>
        Array.from({ length: columnCount }, (_, i) => ({
          id: i,
          text: generateBinaryString(50), // 50 characters per column
          delay: Math.random() * 2, // Random delay 0-2s
          duration: baseDuration + Math.random() * 2 - 1, // ±1s variation
        })),
      [columnCount, baseDuration]
    );

    // Calculate color based on greenIntensity and brightness
    const greenColor = useMemo(() => {
      const intensity = Math.floor(greenIntensity * 255);
      const bright = brightness;
      return `rgba(0, ${intensity}, 0, ${bright})`;
    }, [greenIntensity, brightness]);

    const trailColor = useMemo(() => {
      const intensity = Math.floor(greenIntensity * 180);
      const bright = brightness * 0.6;
      return `rgba(0, ${intensity}, 0, ${bright})`;
    }, [greenIntensity, brightness]);

    return (
      <div
        ref={ref}
        className={cn('relative w-full h-full overflow-hidden', className)}
        {...props}
      >
        <style jsx>{`
          @keyframes matrixFall {
            0% {
              transform: translateY(-100%);
            }
            100% {
              transform: translateY(100vh);
            }
          }

          .matrix-column {
            position: absolute;
            top: 0;
            white-space: pre;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.2;
            writing-mode: vertical-rl;
            text-orientation: upright;
            letter-spacing: 0.1em;
            pointer-events: none;
            animation: matrixFall linear infinite;
            opacity: 0.9;
          }

          .matrix-column::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 20%;
            background: linear-gradient(
              to bottom,
              ${greenColor},
              transparent
            );
            pointer-events: none;
          }

          .matrix-column::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 60%;
            background: linear-gradient(
              to top,
              transparent,
              ${trailColor}
            );
            opacity: 0.5;
            pointer-events: none;
          }
        `}</style>

        {columns.map((column) => (
          <div
            key={column.id}
            className="matrix-column"
            style={{
              left: `${(column.id / columnCount) * 100}%`,
              animationDelay: `${column.delay}s`,
              animationDuration: `${column.duration}s`,
              color: greenColor,
            }}
          >
            {column.text}
          </div>
        ))}
      </div>
    );
  }
);

MatrixRainMobile.displayName = 'MatrixRainMobile';

export default MatrixRainMobile;

