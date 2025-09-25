"use client";
import React, { useCallback, useEffect, useRef } from "react";

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleDensity?: number;
  particleColor?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fadeDirection: number;
}

export const SparklesCore: React.FC<SparklesCoreProps> = ({
  id = "sparkles",
  className = "",
  background = "transparent",
  minSize = 0.6,
  maxSize = 1.4,
  particleDensity = 100,
  particleColor = "#FFFFFF",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const lastFrameTimeRef = useRef<number>(0);

  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speedX: (Math.random() - 0.5) * 2.5,
      speedY: (Math.random() - 0.5) * 2.5,
      opacity: Math.random() * 0.3 + 0.7,
      fadeDirection: Math.random() > 0.5 ? 1 : -1,
    };
  }, [minSize, maxSize]);

  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const area = canvas.width * canvas.height;
    // 控制粒子密度，并设置最大数量限制
    const numParticles = Math.min(Math.floor((area / 25000) * particleDensity), 60);
    particlesRef.current = Array.from({ length: numParticles }, () => createParticle(canvas));
  }, [createParticle, particleDensity]);

  const updateParticle = useCallback((particle: Particle, canvas: HTMLCanvasElement) => {
    particle.x += particle.speedX;
    particle.y += particle.speedY;
    
    // 边界检测
    if (particle.x < 0 || particle.x > canvas.width) {
      particle.speedX = -particle.speedX;
    }
    if (particle.y < 0 || particle.y > canvas.height) {
      particle.speedY = -particle.speedY;
    }

    // 透明度动画
    particle.opacity += particle.fadeDirection * 0.008;
    if (particle.opacity <= 0.6 || particle.opacity >= 1.0) {
      particle.fadeDirection = -particle.fadeDirection;
    }
  }, []);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    ctx.save();
    ctx.globalAlpha = particle.opacity;
    ctx.fillStyle = particleColor;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }, [particleColor]);

  const animate = useCallback((currentTime: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 限制帧率到30fps，减少性能消耗
    if (currentTime - lastFrameTimeRef.current < 33) {
      animationFrameRef.current = requestAnimationFrame(animate);
      return;
    }
    lastFrameTimeRef.current = currentTime;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 更新和绘制粒子
    particlesRef.current.forEach(particle => {
      updateParticle(particle, canvas);
      drawParticle(ctx, particle);
    });

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticle, drawParticle]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    initParticles(canvas);
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();
    animate(0);

    // 监听窗口大小变化
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [resizeCanvas, animate]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background,
        pointerEvents: "none",
      }}
    />
  );
}; 