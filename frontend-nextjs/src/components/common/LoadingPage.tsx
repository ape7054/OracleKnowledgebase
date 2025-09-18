'use client';
import React, { useState, useEffect } from 'react';

// 优雅椭圆组件接口
interface EllipseProps {
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  delay: number;
  index: number;
}

// 优雅椭圆组件 - 脉冲呼吸效果
const ElegantEllipse: React.FC<EllipseProps & { isFirefox: boolean }> = ({ 
  left, top, width, height, color, delay, index, isFirefox 
}) => {
  return (
    <div
      className={isFirefox ? 'firefox-ellipse' : ''}
      style={{
        position: 'absolute',
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        borderRadius: '50%',
        transformOrigin: 'center center',
        WebkitTransformOrigin: 'center center',
        MozTransformOrigin: 'center center',
        // 添加美丽的阴影和发光效果
        filter: `drop-shadow(0 0 ${width * 0.1}px ${color}40)`,
        WebkitFilter: `drop-shadow(0 0 ${width * 0.1}px ${color}40)`,
        // 只在非Firefox中使用CSS动画
        ...(isFirefox ? {} : {
          animation: `elegantPulse 2.5s ease-in-out infinite`,
          WebkitAnimation: `elegantPulse 2.5s ease-in-out infinite`,
          MozAnimation: `elegantPulse 2.5s ease-in-out infinite`,
          animationDelay: `${delay}s`,
          WebkitAnimationDelay: `${delay}s`,
          MozAnimationDelay: `${delay}s`,
        })
      }}
    />
  );
};

interface LoadingPageProps {
  /** 自定义消息 - 但主要使用SVG文字 */
  message?: string;
  /** 动画变体 */
  variant?: 'default' | 'fast' | 'slow';
  /** 点击回调函数 - 用于测试模式 */
  onClick?: () => void;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ 
  variant = 'default',
  onClick 
}) => {
  const [loadingText, setLoadingText] = useState('Loading');
  const [isFirefox, setIsFirefox] = useState(false);

  // 检测浏览器
  useEffect(() => {
    const userAgent = navigator.userAgent;
    const firefoxDetected = userAgent.toLowerCase().includes('firefox');
    setIsFirefox(firefoxDetected);
    console.log('浏览器检测:', firefoxDetected ? 'Firefox' : 'Other');
  }, []);

  // 循环显示加载点数
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === 'Loading') return 'Loading.';
        if (prev === 'Loading.') return 'Loading..';
        if (prev === 'Loading..') return 'Loading...';
        return 'Loading';
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Firefox专用：JavaScript动画
  useEffect(() => {
    if (!isFirefox) return;

    const ellipses = document.querySelectorAll('.firefox-ellipse');
    
        const animateEllipse = (element: Element, delay: number) => {
      let startTime: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime - delay * 1000;
        
        const elapsed = currentTime - startTime;
        const duration = 2500; // 2.5s
        const progress = ((elapsed % duration) / duration);
        
        // 优雅脉冲效果：缩放 + 上下移动 + 亮度变化
        let scale, translateY, opacity, brightness;
        if (progress <= 0.5) {
          // 前半段：变大变亮向上
          scale = 1 + (progress * 2) * 0.2; // 1 -> 1.2
          translateY = -(progress * 2) * 8; // 0 -> -8px
          opacity = 0.8 + (progress * 2) * 0.2; // 0.8 -> 1
          brightness = 1 + (progress * 2) * 0.3; // 1 -> 1.3
        } else {
          // 后半段：变小变暗向下
          const p = (progress - 0.5) * 2;
          scale = 1.2 - p * 0.2; // 1.2 -> 1
          translateY = -8 + p * 8; // -8px -> 0
          opacity = 1 - p * 0.2; // 1 -> 0.8
          brightness = 1.3 - p * 0.3; // 1.3 -> 1
        }
        
                 (element as HTMLElement).style.transform = `scale(${scale}) translateY(${translateY}px)`;
         (element as HTMLElement).style.opacity = `${opacity}`;
         (element as HTMLElement).style.filter = `brightness(${brightness})`;
         (element as HTMLElement).style.webkitFilter = `brightness(${brightness})`;
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    };

    ellipses.forEach((el, index) => {
      // 根据元素在数组中的位置确定延迟
      const delay = index * 0.2;
      
      // Firefox设置中心变换原点
      (el as HTMLElement).style.transformOrigin = 'center center';
      
      animateEllipse(el, delay);
    });
  }, [isFirefox]);

  // ESC键返回功能
  useEffect(() => {
    if (!onClick) return;
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClick]);

  // 根据变体调整动画速度
  const getAnimationDelay = (baseDelay: number) => {
    const multiplier = variant === 'fast' ? 0.7 : variant === 'slow' ? 1.5 : 1;
    return baseDelay * multiplier;
  };

  // 优雅椭圆配置 - 从外到内的美丽排列
  const elegantEllipses = [
    // 左侧组 - 从大到小
    { width: 104, height: 114, left: 290 + 116, top: 152 + 14, color: '#A32D2D', delay: getAnimationDelay(0), index: 0 },
    { width: 68, height: 114, left: 290 + 85, top: 152 + 14, color: '#FF1010', delay: getAnimationDelay(0.2), index: 1 },
    { width: 42, height: 114, left: 290 + 57, top: 152 + 14, color: '#FF4910', delay: getAnimationDelay(0.4), index: 2 },
    { width: 28, height: 114, left: 290 + 41, top: 152 + 14, color: '#FF8310', delay: getAnimationDelay(0.6), index: 3 },
    { width: 15, height: 114, left: 290 + 31, top: 152 + 14, color: '#FFBC10', delay: getAnimationDelay(0.8), index: 4 },
    { width: 6, height: 114, left: 290 + 23, top: 152 + 14, color: '#109BFF', delay: getAnimationDelay(1.0), index: 5 },
    { width: 1, height: 114, left: 290 + 19, top: 152 + 14, color: '#BEE4FF', delay: getAnimationDelay(1.2), index: 6 },
    
    // 右侧组 - 从中心向外
    { width: 1, height: 114, left: 106 + 203, top: 159 + 8, color: '#BEE4FF', delay: getAnimationDelay(1.4), index: 7 },
    { width: 6, height: 114, left: 106 + 194, top: 159 + 8, color: '#109BFF', delay: getAnimationDelay(1.6), index: 8 },
    { width: 15, height: 114, left: 106 + 177, top: 159 + 8, color: '#FFBC10', delay: getAnimationDelay(1.8), index: 9 },
    { width: 28, height: 114, left: 106 + 154, top: 159 + 8, color: '#FF8310', delay: getAnimationDelay(2.0), index: 10 },
    { width: 42, height: 114, left: 106 + 124, top: 159 + 8, color: '#FF4910', delay: getAnimationDelay(2.2), index: 11 },
    { width: 68, height: 114, left: 106 + 70, top: 159 + 8, color: '#FF1010', delay: getAnimationDelay(2.4), index: 12 },
    { width: 104, height: 114, left: 106 + 3, top: 159 + 8, color: '#A32D2D', delay: getAnimationDelay(2.6), index: 13 },
  ];

  return (
    <>
      {/* 内联CSS关键帧 */}
      <style dangerouslySetInnerHTML={{
                       __html: `
                 @keyframes elegantPulse {
                   0%, 100% {
                     transform: scale(1) translateY(0px);
                     -webkit-transform: scale(1) translateY(0px);
                     -moz-transform: scale(1) translateY(0px);
                     opacity: 0.8;
                     filter: brightness(1);
                   }
                   50% {
                     transform: scale(1.2) translateY(-8px);
                     -webkit-transform: scale(1.2) translateY(-8px);
                     -moz-transform: scale(1.2) translateY(-8px);
                     opacity: 1;
                     filter: brightness(1.3);
                   }
                 }

                           /* Firefox特殊处理 */
                 @-moz-keyframes elegantPulse {
                   0%, 100% {
                     -moz-transform: scale(1) translateY(0px);
                     opacity: 0.8;
                     filter: brightness(1);
                   }
                   50% {
                     -moz-transform: scale(1.2) translateY(-8px);
                     opacity: 1;
                     filter: brightness(1.3);
                   }
                 }
                 
                 @-moz-keyframes textGlow {
                   0%, 100% {
                     opacity: 0.7;
                     text-shadow: 0 0 20px rgba(255,255,255,0.3);
                   }
                   50% {
                     opacity: 1;
                     text-shadow: 0 0 30px rgba(255,255,255,0.6);
                   }
                 }

                 /* Webkit特殊处理 */
                 @-webkit-keyframes elegantPulse {
                   0%, 100% {
                     -webkit-transform: scale(1) translateY(0px);
                     opacity: 0.8;
                     -webkit-filter: brightness(1);
                   }
                   50% {
                     -webkit-transform: scale(1.2) translateY(-8px);
                     opacity: 1;
                     -webkit-filter: brightness(1.3);
                   }
                 }
        `
      }} />
      
      <div 
        onClick={onClick} 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: '#000000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : 'default'
        }}
      >
                     <div 
               className="loading-container"
               style={{
                 position: 'relative',
                 width: '669px',
                 height: '453px',
                 maxWidth: '90vw',
                 maxHeight: '80vh',
                 transform: 'scale(min(90vw/669px, 80vh/453px))',
                 transformOrigin: 'center center',
               }}>
          {/* 优雅椭圆组 - 从左到右的波浪脉冲 */}
          {elegantEllipses.map((ellipse, index) => (
            <ElegantEllipse
              key={`elegant-${index}`}
              left={ellipse.left}
              top={ellipse.top}
              width={ellipse.width}
              height={ellipse.height}
              color={ellipse.color}
              delay={ellipse.delay}
              index={ellipse.index}
              isFirefox={isFirefox}
            />
          ))}

          {          /* 优雅Loading文字 */}
          <div style={{
            position: 'absolute',
            left: '260px',
            top: '320px',
            color: '#ffffff',
            fontSize: '20px',
            fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
            fontWeight: 300,
            letterSpacing: '3px',
            textAlign: 'center',
            minWidth: '140px',
            textShadow: '0 0 20px rgba(255,255,255,0.3)',
            animation: 'textGlow 3s ease-in-out infinite',
            WebkitAnimation: 'textGlow 3s ease-in-out infinite',
          }}>
            {loadingText}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPage; 