'use client';

import { useState, useEffect, useRef } from 'react';

interface MobileOptimization {
  isMobile: boolean;
  isLowPowerMode: boolean;
  shouldOptimize: boolean;
  optimizedParams: {
    speed: number;
    density: number;
    brightness: number;
    greenIntensity: number;
    variation: number;
  };
  performanceLevel: 'high' | 'medium' | 'low';
  toggleLowPowerMode: () => void;
  updatePerformanceLevel: (level: 'high' | 'medium' | 'low') => void;
}

// 检测移动设备的函数
function detectMobile(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    'android', 'iphone', 'ipad', 'ipod', 'blackberry', 
    'windows phone', 'mobile', 'tablet'
  ];
  
  // 检查 User Agent
  const hasMobileKeyword = mobileKeywords.some(keyword => 
    userAgent.includes(keyword)
  );
  
  // 检查屏幕尺寸
  const hasSmallScreen = window.innerWidth <= 768;
  
  // 检查触摸支持
  const hasTouchSupport = 'ontouchstart' in window || 
    navigator.maxTouchPoints > 0;
  
  return hasMobileKeyword || (hasSmallScreen && hasTouchSupport);
}

// 检测低电量模式（仅限支持的浏览器）
function detectLowPowerMode(): boolean {
  if (typeof window === 'undefined') return false;
  
  // 检查电池 API（实验性功能）
  if ('getBattery' in navigator) {
    // 注意：这是异步的，这里只能做基础检测
    return false; // 后续可以通过异步方式改进
  }
  
  // 基于连接速度推测
  const connection = (navigator as any).connection;
  if (connection) {
    const slowConnections = ['slow-2g', '2g', '3g'];
    return slowConnections.includes(connection.effectiveType);
  }
  
  return false;
}

// 性能参数预设
const PERFORMANCE_PRESETS = {
  high: {
    speed: 1.0,
    density: 1.0,
    brightness: 1.0,
    greenIntensity: 1.0,
    variation: 1.0,
  },
  medium: {
    speed: 0.8,
    density: 0.7,
    brightness: 0.8,
    greenIntensity: 0.8,
    variation: 0.6,
  },
  low: {
    speed: 0.5,
    density: 0.4,
    brightness: 0.6,
    greenIntensity: 0.6,
    variation: 0.3,
  },
};

export function useMobileOptimization(): MobileOptimization {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);
  const [performanceLevel, setPerformanceLevel] = useState<'high' | 'medium' | 'low'>('high');
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const fpsRef = useRef(60);

  // 初始化检测
  useEffect(() => {
    const mobile = detectMobile();
    const lowPower = detectLowPowerMode();
    
    setIsMobile(mobile);
    setIsLowPowerMode(lowPower);
    
    // 移动设备默认使用中等性能
    if (mobile || lowPower) {
      setPerformanceLevel('medium');
    }
  }, []);

  // 监听屏幕方向和尺寸变化
  useEffect(() => {
    const handleResize = () => {
      const mobile = detectMobile();
      setIsMobile(mobile);
    };

    const handleVisibilityChange = () => {
      // 当页面不可见时，可以考虑暂停动画
      if (document.hidden) {
        setPerformanceLevel(prev => prev === 'high' ? 'medium' : 'low');
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // FPS 监控（简化版）
  useEffect(() => {
    let animationFrameId: number;
    
    const measureFPS = () => {
      const now = performance.now();
      frameCountRef.current++;
      
      // 每秒计算一次 FPS
      if (now - lastTimeRef.current >= 1000) {
        fpsRef.current = frameCountRef.current;
        frameCountRef.current = 0;
        lastTimeRef.current = now;
        
        // 根据 FPS 自动调整性能等级
        if (isMobile && fpsRef.current < 30 && performanceLevel === 'high') {
          setPerformanceLevel('medium');
        } else if (isMobile && fpsRef.current < 20 && performanceLevel === 'medium') {
          setPerformanceLevel('low');
        }
      }
      
      animationFrameId = requestAnimationFrame(measureFPS);
    };

    if (isMobile) {
      measureFPS();
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isMobile, performanceLevel]);

  const toggleLowPowerMode = () => {
    setIsLowPowerMode(prev => !prev);
    if (!isLowPowerMode) {
      setPerformanceLevel('low');
    } else {
      setPerformanceLevel(isMobile ? 'medium' : 'high');
    }
  };

  const updatePerformanceLevel = (level: 'high' | 'medium' | 'low') => {
    setPerformanceLevel(level);
  };

  const shouldOptimize = isMobile || isLowPowerMode || performanceLevel !== 'high';
  const optimizedParams = PERFORMANCE_PRESETS[performanceLevel];

  return {
    isMobile,
    isLowPowerMode,
    shouldOptimize,
    optimizedParams,
    performanceLevel,
    toggleLowPowerMode,
    updatePerformanceLevel,
  };
}

export default useMobileOptimization;
