import React from 'react';
import { Box } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { floatingAnimation } from './animations';

const BackgroundElements = () => {
  const theme = useTheme();

  return (
    <>
      {/* 高级背景装饰 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, ${alpha(theme.palette.primary.main, 0.15)} 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, ${alpha(theme.palette.secondary.main, 0.15)} 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, ${alpha(theme.palette.success.main, 0.1)} 0%, transparent 50%)
        `,
      }} />

      {/* 动态粒子效果 */}
      {[...Array(20)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: '50%',
            background: theme.palette.primary.main,
            opacity: 0.3,
            animation: `${floatingAnimation} ${5 + Math.random() * 10}s ease-in-out infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </>
  );
};

export default BackgroundElements; 