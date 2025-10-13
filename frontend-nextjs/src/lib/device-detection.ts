/**
 * 设备检测工具函数
 * 用于判断当前设备类型，决定使用哪个版本的 Matrix Rain 组件
 */

/**
 * 检测是否为移动设备
 * @returns {boolean} true 表示移动设备，false 表示桌面设备
 */
export function isMobileDevice(): boolean {
  // 服务端渲染时返回 false
  if (typeof window === 'undefined') {
    return false;
  }

  // 检测 User Agent
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  
  // 检测触摸支持
  const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // 检测屏幕宽度（小于 768px 视为移动设备）
  const isSmallScreen = window.innerWidth < 768;
  
  return mobileKeywords.test(userAgent) || (hasTouchScreen && isSmallScreen);
}

/**
 * 获取设备信息（用于调试）
 */
export function getDeviceInfo() {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      screenWidth: 0,
      userAgent: '',
    };
  }

  return {
    isMobile: isMobileDevice(),
    screenWidth: window.innerWidth,
    userAgent: navigator.userAgent,
    hasTouchScreen: 'ontouchstart' in window,
  };
}

