'use client';
import React, { useState, useEffect } from 'react';

// CSS椭圆容器的接口
interface EllipseProps {
  left: number;
  top: number;
  width: number;
  height: number;
  color: string;
  delay: number;
  animationType?: 'squeeze' | 'wave';
}

// CSS椭圆容器 - 支持Firefox JavaScript动画后备
const CSSEllipse: React.FC<EllipseProps & { isFirefox: boolean }> = ({ 
  left, top, width, height, color, delay, animationType = 'squeeze', isFirefox 
}) => {
  const animationName = animationType === 'squeeze' ? 'ellipseSqueezeSimple' : 'ellipseWaveSimple';
  
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
        // 只在非Firefox中使用CSS动画
        ...(isFirefox ? {} : {
          animation: `${animationName} 1.2s ease-in-out infinite`,
          WebkitAnimation: `${animationName} 1.2s ease-in-out infinite`,
          MozAnimation: `${animationName} 1.2s ease-in-out infinite`,
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
    
    const animateEllipse = (element: Element, delay: number, type: 'squeeze' | 'wave') => {
      let startTime: number;
      
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime - delay * 1000;
        
        const elapsed = currentTime - startTime;
        const duration = 1200; // 1.2s
        const progress = ((elapsed % duration) / duration);
        
        let scaleX;
        if (type === 'squeeze') {
          // 0% -> 50% -> 100%
          if (progress <= 0.5) {
            scaleX = 1 - (progress * 2) * 0.98; // 1 -> 0.02
          } else {
            scaleX = 0.02 + ((progress - 0.5) * 2) * 0.98; // 0.02 -> 1
          }
        } else {
          // wave: 0% -> 35% -> 70% -> 100%
          if (progress <= 0.35) {
            scaleX = 1 - (progress / 0.35) * 0.98;
          } else if (progress <= 0.7) {
            scaleX = 0.02 + ((progress - 0.35) / 0.35) * 0.98;
          } else {
            scaleX = 1;
          }
        }
        
        (element as HTMLElement).style.transform = `scaleX(${scaleX})`;
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    };

    ellipses.forEach((el, index) => {
      const isLeftSide = index < 7;
      const delay = isLeftSide ? index * 0.1 : (index - 7) * 0.1 + 0.7;
      const type = isLeftSide ? 'squeeze' : 'wave';
      animateEllipse(el, delay, type);
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

  // Figma精确的椭圆配置 - 使用CSS绘制，包含尺寸和颜色
  // Component 1 基础位置: left: 290px, top: 152px
  const leftEllipses = [
    { width: 104, height: 114, left: 290 + 116, top: 152 + 14, color: '#A32D2D', delay: getAnimationDelay(0) },
    { width: 68, height: 114, left: 290 + 85, top: 152 + 14, color: '#FF1010', delay: getAnimationDelay(0.1) },
    { width: 42, height: 114, left: 290 + 57, top: 152 + 14, color: '#FF4910', delay: getAnimationDelay(0.2) },
    { width: 28, height: 114, left: 290 + 41, top: 152 + 14, color: '#FF8310', delay: getAnimationDelay(0.3) },
    { width: 15, height: 114, left: 290 + 31, top: 152 + 14, color: '#FFBC10', delay: getAnimationDelay(0.4) },
    { width: 6, height: 114, left: 290 + 23, top: 152 + 14, color: '#109BFF', delay: getAnimationDelay(0.5) },
    { width: 1, height: 114, left: 290 + 19, top: 152 + 14, color: '#BEE4FF', delay: getAnimationDelay(0.6) },
  ];

  // Component 2 基础位置: left: 106px, top: 159px
  const rightEllipses = [
    { width: 104, height: 114, left: 106 + 3, top: 159 + 8, color: '#A32D2D', delay: getAnimationDelay(0.7) },
    { width: 68, height: 114, left: 106 + 70, top: 159 + 8, color: '#FF1010', delay: getAnimationDelay(0.8) },
    { width: 42, height: 114, left: 106 + 124, top: 159 + 8, color: '#FF4910', delay: getAnimationDelay(0.9) },
    { width: 28, height: 114, left: 106 + 154, top: 159 + 8, color: '#FF8310', delay: getAnimationDelay(1.0) },
    { width: 15, height: 114, left: 106 + 177, top: 159 + 8, color: '#FFBC10', delay: getAnimationDelay(1.1) },
    { width: 6, height: 114, left: 106 + 194, top: 159 + 8, color: '#109BFF', delay: getAnimationDelay(1.2) },
    { width: 1, height: 114, left: 106 + 203, top: 159 + 8, color: '#BEE4FF', delay: getAnimationDelay(1.3) },
  ];

  return (
    <>
      {/* 内联CSS关键帧 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes ellipseSqueezeSimple {
            0%, 100% {
              transform: scaleX(1);
              -webkit-transform: scaleX(1);
              -moz-transform: scaleX(1);
            }
            50% {
              transform: scaleX(0.02);
              -webkit-transform: scaleX(0.02);
              -moz-transform: scaleX(0.02);
            }
          }
          
          @keyframes ellipseWaveSimple {
            0%, 70%, 100% {
              transform: scaleX(1);
              -webkit-transform: scaleX(1);
              -moz-transform: scaleX(1);
            }
            35% {
              transform: scaleX(0.02);
              -webkit-transform: scaleX(0.02);
              -moz-transform: scaleX(0.02);
            }
          }

          /* Firefox特殊处理 */
          @-moz-keyframes ellipseSqueezeSimple {
            0%, 100% {
              -moz-transform: scaleX(1);
            }
            50% {
              -moz-transform: scaleX(0.02);
            }
          }
          
          @-moz-keyframes ellipseWaveSimple {
            0%, 70%, 100% {
              -moz-transform: scaleX(1);
            }
            35% {
              -moz-transform: scaleX(0.02);
            }
          }

          /* Webkit特殊处理 */
          @-webkit-keyframes ellipseSqueezeSimple {
            0%, 100% {
              -webkit-transform: scaleX(1);
            }
            50% {
              -webkit-transform: scaleX(0.02);
            }
          }
          
          @-webkit-keyframes ellipseWaveSimple {
            0%, 70%, 100% {
              -webkit-transform: scaleX(1);
            }
            35% {
              -webkit-transform: scaleX(0.02);
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
        <div style={{
          position: 'relative',
          width: '669px',
          height: '453px',
          maxWidth: '90vw',
          maxHeight: '80vh',
          transform: 'scale(min(90vw/669px, 80vh/453px))',
          transformOrigin: 'center center',
        }}>
          {/* 左侧椭圆组 - Component 1 */}
          {leftEllipses.map((ellipse, index) => (
            <CSSEllipse
              key={`left-${index}`}
              left={ellipse.left}
              top={ellipse.top}
              width={ellipse.width}
              height={ellipse.height}
              color={ellipse.color}
              delay={ellipse.delay}
              animationType="squeeze"
              isFirefox={isFirefox}
            />
          ))}

          {/* 右侧椭圆组 - Component 2 */}
          {rightEllipses.map((ellipse, index) => (
            <CSSEllipse
              key={`right-${index}`}
              left={ellipse.left}
              top={ellipse.top}
              width={ellipse.width}
              height={ellipse.height}
              color={ellipse.color}
              delay={ellipse.delay}
              animationType="wave"
              isFirefox={isFirefox}
            />
          ))}

          {/* Loading文字 - 固定大小文字 */}
          <div style={{
            position: 'absolute',
            left: '280px',
            top: '304px',
            color: 'white',
            fontSize: '18px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            textAlign: 'center',
            minWidth: '100px',
          }}>
            {loadingText}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingPage; 