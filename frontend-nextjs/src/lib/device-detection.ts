/**
 * Device Detection Utilities
 * Lightweight functions to detect device type and optimize rendering
 */

/**
 * Detect if the current device is mobile
 * Uses multiple heuristics for accurate detection
 */
export function isMobileDevice(): boolean {
  // Server-side rendering guard
  if (typeof window === 'undefined') return false;

  // Check 1: User Agent detection
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'windows phone'];
  const hasMobileUA = mobileKeywords.some(keyword => userAgent.includes(keyword));

  // Check 2: Touch support
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Check 3: Screen width (mobile typically < 768px)
  const hasSmallScreen = window.innerWidth < 768;

  // Device is mobile if it has mobile UA OR (touch support AND small screen)
  return hasMobileUA || (hasTouchSupport && hasSmallScreen);
}

/**
 * Get optimal pixel ratio for Canvas rendering
 * Limits pixel ratio on mobile devices to improve performance
 */
export function getOptimalPixelRatio(): number {
  // Server-side rendering guard
  if (typeof window === 'undefined') return 1;

  const devicePixelRatio = window.devicePixelRatio || 1;
  const isMobile = isMobileDevice();

  if (isMobile) {
    // Mobile: Limit to 1.5x to reduce Canvas size and improve performance
    // This prevents excessive memory usage on high-DPI mobile screens (2x-3x)
    return Math.min(devicePixelRatio, 1.5);
  }

  // Desktop: Use native pixel ratio for crisp rendering
  // But cap at 2x to avoid extreme cases
  return Math.min(devicePixelRatio, 2);
}

/**
 * Get optimal Matrix Rain parameters for the current device
 */
export function getOptimalMatrixParams() {
  const isMobile = isMobileDevice();

  if (isMobile) {
    return {
      // Increase density for small screens to make effect more visible
      density: 1.5,
      // Reduce variation to decrease computation
      variation: 0.8,
      // Keep other params at default
      speed: 1.0,
      brightness: 1.0,
      greenIntensity: 1.0,
    };
  }

  // Desktop: use default values
  return {
    density: 1.0,
    variation: 1.0,
    speed: 1.0,
    brightness: 1.0,
    greenIntensity: 1.0,
  };
}

