import { keyframes } from '@mui/material/styles';

// 增强的动画定义
export const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

export const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

export const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
    border-color: rgba(16, 185, 129, 0.5);
  }
  50% { 
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
    border-color: rgba(16, 185, 129, 0.8);
  }
`;

export const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const slideInFromRight = keyframes`
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`; 