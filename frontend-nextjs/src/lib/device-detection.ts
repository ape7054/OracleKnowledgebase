/**
 * Device detection utilities
 * Detects if the user is on a mobile device
 */

export function isMobileDevice(): boolean {
  // Server-side rendering check
  if (typeof window === 'undefined') {
    return false;
  }

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i;
  const isMobileUA = mobileRegex.test(userAgent.toLowerCase());

  // Check for touch support
  const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check screen width (mobile typically < 768px)
  const isSmallScreen = window.innerWidth < 768;

  // Consider it mobile if it matches UA pattern OR (has touch AND small screen)
  return isMobileUA || (hasTouch && isSmallScreen);
}

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function getScreenWidth(): number {
  if (typeof window === 'undefined') {
    return 1920; // Default desktop width for SSR
  }
  
  return window.innerWidth;
}

