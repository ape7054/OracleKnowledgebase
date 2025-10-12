"use client"

import React, { HTMLAttributes, useCallback, useEffect, useState } from "react"
import { motion } from "motion/react"

import { cn } from "@/lib/utils"

// Note: Inline styles are required for dynamic CSS custom properties

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

const Beam = React.memo(({
  width,
  x,
  delay,
  duration,
  hue,
  aspectRatio,
}: {
  width: string | number
  x: string | number
  delay: number
  duration: number
  hue: number
  aspectRatio: number
}) => {
  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${aspectRatio}`,
          "--background": `linear-gradient(hsl(${hue} 90% 65%), hsl(${hue} 85% 55% / 0.6), transparent)`,
        } as React.CSSProperties
      }
      className={`absolute top-0 left-[var(--x)] [aspect-ratio:1/var(--aspect-ratio)] [width:var(--width)] [background:var(--background)]`}
      initial={{ y: "150cqmax", x: "-50%" }}
      animate={{ y: "-150%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
})

Beam.displayName = "Beam"

const WarpBackgroundCore: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  ...props
}) => {
  // 确保只在客户端渲染，避免 SSR hydration 错误
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      beams.push({ 
        x, 
        delay,
        hue: Math.floor(Math.random() * 360),          // 预计算随机色相
        aspectRatio: Math.floor(Math.random() * 20) + 35 // 适中光束：35-55 的长宽比
      })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  // 使用 useState 确保只在客户端初始化一次，避免 SSR/CSR 不匹配
  const [topBeams] = useState(() => generateBeams())
  const [rightBeams] = useState(() => generateBeams())
  const [bottomBeams] = useState(() => generateBeams())
  const [leftBeams] = useState(() => generateBeams())

  // 在客户端挂载前返回占位 div
  if (!isMounted) {
    return <div className={cn("relative will-change-transform", className)} {...props} />
  }

  return (
    <div className={cn("relative will-change-transform", className)} {...props}>
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className={
          "[container-type:size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)] [perspective:var(--perspective)] [transform-style:preserve-3d] will-change-transform"
        }
      >
        {/* top side */}
        <div className="[container-type:inline-size] absolute z-20 [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {topBeams.map((beam, index) => (
            <Beam
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              hue={beam.hue}
              aspectRatio={beam.aspectRatio}
            />
          ))}
        </div>
        {/* bottom side */}
        <div className="[container-type:inline-size] absolute top-full [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {bottomBeams.map((beam, index) => (
            <Beam
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              hue={beam.hue}
              aspectRatio={beam.aspectRatio}
            />
          ))}
        </div>
        {/* left side */}
        <div className="[container-type:inline-size] absolute top-0 left-0 [height:100cqmax] [width:100cqh] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {leftBeams.map((beam, index) => (
            <Beam
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              hue={beam.hue}
              aspectRatio={beam.aspectRatio}
            />
          ))}
        </div>
        {/* right side */}
        <div className="[container-type:inline-size] absolute top-0 right-0 [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [background-size:var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,_var(--grid-color)_0_1px,_transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)] [transform-style:preserve-3d]">
          {rightBeams.map((beam, index) => (
            <Beam
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
              delay={beam.delay}
              duration={beamDuration}
              hue={beam.hue}
              aspectRatio={beam.aspectRatio}
            />
          ))}
        </div>
      </div>
      {children && <div className="relative">{children}</div>}
    </div>
  )
}

// 使用 React.memo 优化性能，防止不必要的重渲染
export const WarpBackground = React.memo(WarpBackgroundCore)
