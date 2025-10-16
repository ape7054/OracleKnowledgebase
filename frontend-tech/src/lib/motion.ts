// Framer Motion 动画配置

import type { Variants } from 'framer-motion'

// 淡入上浮动画
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

// 淡入动画
export const fadeIn: Variants = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

// 缩放进入动画
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

// 从左滑入
export const slideInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -50
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

// 从右滑入
export const slideInRight: Variants = {
  initial: {
    opacity: 0,
    x: 50
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
}

// 容器延迟动画
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

// 列表项动画
export const listItem: Variants = {
  initial: {
    opacity: 0,
    y: 20
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut'
    }
  }
}

// 悬停提升效果
export const hoverLift = {
  whileHover: {
    y: -4,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  whileTap: {
    scale: 0.98
  }
}

// 悬停放大效果
export const hoverScale = {
  whileHover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: 'easeOut'
    }
  },
  whileTap: {
    scale: 0.95
  }
}

