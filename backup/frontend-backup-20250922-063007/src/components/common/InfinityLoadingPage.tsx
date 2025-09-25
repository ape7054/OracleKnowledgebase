'use client';
import React, { useState, useEffect } from 'react';

interface InfinityLoadingPageProps {
  /** 自定义消息 */
  message?: string;
  /** 动画变体 */
  variant?: 'default' | 'fast' | 'slow';
  /** 主题色彩 */
  theme?: 'pink' | 'blue' | 'green' | 'purple' | 'orange';
  /** 点击回调函数 - 用于测试模式 */
  onClick?: () => void;
}

export const InfinityLoadingPage: React.FC<InfinityLoadingPageProps> = ({ 
  message = 'Loading',
  variant = 'default',
  theme = 'pink',
  onClick 
}) => {
  const [loadingText, setLoadingText] = useState(message);
  
  // 主题颜色配置
  const themeColors = {
    pink: {
      primary: '#e90c59',
      secondary: '#ff8fab',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    blue: {
      primary: '#4facfe',
      secondary: '#00f2fe',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    green: {
      primary: '#43e97b',
      secondary: '#38f9d7',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    purple: {
      primary: '#a855f7',
      secondary: '#c084fc',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    orange: {
      primary: '#fb923c',
      secondary: '#fdba74',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }
  };

  const currentTheme = themeColors[theme];

  // 根据变体调整动画速度和尺寸
  const getAnimationDuration = () => {
    switch (variant) {
      case 'slow': return '1.5s';
      case 'fast': return '0.6s';
      default: return '1s';
    }
  };

  const getLoaderSize = () => {
    switch (variant) {
      case 'fast': return 48;
      case 'slow': return 80;
      default: return 64;
    }
  };

  // 计算stroke-dasharray和stroke-dashoffset的值
  const getDashValues = () => {
    const baseValue = 42.76482137044271;
    const offsetValue = 256.58892822265625;
    return { dashArray: baseValue, dashOffset: offsetValue };
  };

  const { dashArray, dashOffset } = getDashValues();

  // 循环显示加载点数
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        const baseMessage = message || 'Loading';
        if (prev === baseMessage) return `${baseMessage}.`;
        if (prev === `${baseMessage}.`) return `${baseMessage}..`;
        if (prev === `${baseMessage}..`) return `${baseMessage}...`;
        return baseMessage;
      });
    }, 600);

    return () => clearInterval(interval);
  }, [message]);

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

  return (
    <>
      {/* 内联CSS样式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes backgroundShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }
          
          @keyframes textGlow {
            0%, 100% {
              opacity: 0.8;
              text-shadow: 0 0 20px ${currentTheme.primary}40;
            }
            50% {
              opacity: 1;
              text-shadow: 0 0 30px ${currentTheme.primary}80;
            }
          }

          @keyframes infinityStroke {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: ${dashOffset};
            }
          }
          
          .infinity-loading-bg {
            background: ${currentTheme.background};
            background-size: 200% 200%;
            animation: backgroundShift 8s ease-in-out infinite;
          }
          
          .infinity-loading-text {
            color: white;
            font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
            font-size: 24px;
            font-weight: 300;
            letter-spacing: 3px;
            text-align: center;
            margin-top: 30px;
            animation: textGlow 3s ease-in-out infinite;
          }

          .infinity-svg {
            width: ${getLoaderSize()}px;
            height: ${getLoaderSize()}px;
          }
          
          .infinity-path {
            stroke: ${currentTheme.primary};
            stroke-width: 8;
            stroke-linecap: round;
            stroke-dasharray: ${dashArray} ${dashArray};
            fill: none;
            animation: infinityStroke ${getAnimationDuration()} linear infinite;
          }
        `
      }} />
      
      <div 
        onClick={onClick} 
        className="infinity-loading-bg"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          overflow: 'hidden',
          cursor: onClick ? 'pointer' : 'default'
        }}
      >
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '40px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}>
          {/* 原版 Infinity SVG 动画 */}
          <svg 
            className="infinity-svg"
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="xMidYMid"
            style={{ 
              display: 'block',
              shapeRendering: 'auto'
            }}
          >
            <g>
              <path 
                className="infinity-path"
                style={{
                  transform: 'scale(0.8)',
                  transformOrigin: '50px 50px'
                }}
                d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z"
              />
            </g>
          </svg>
          
          <div className="infinity-loading-text">
            {loadingText}
          </div>
          
          {onClick && (
            <div style={{
              marginTop: '20px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Press ESC or click to close
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default InfinityLoadingPage; 