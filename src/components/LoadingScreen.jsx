import React from 'react';
import { Box, Typography, LinearProgress, useTheme, alpha, keyframes } from '@mui/material';
import { TrendingUp, AccountBalance, Assessment } from '@mui/icons-material';

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoadingScreen = ({ 
  title = "加载中...", 
  subtitle = "正在获取最新数据",
  icon: IconComponent = TrendingUp 
}) => {
  const theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 动态背景元素 */}
      {[...Array(5)].map((_, i) => {
        // 使用固定的位置值避免无限重渲染
        const positions = [
          { top: '10%', left: '20%' },
          { top: '60%', left: '70%' },
          { top: '30%', left: '10%' },
          { top: '80%', left: '40%' },
          { top: '20%', left: '80%' }
        ];
        
        return (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
              animation: `${floatingAnimation} ${3 + i}s ease-in-out infinite`,
              top: positions[i].top,
              left: positions[i].left,
            }}
          />
        );
      })}
      
      <Box sx={{ textAlign: 'center', zIndex: 10, position: 'relative' }}>
        <Box sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          animation: `${rotateAnimation} 2s linear infinite`,
          boxShadow: `0 0 50px ${alpha(theme.palette.primary.main, 0.3)}`
        }}>
          <IconComponent sx={{ fontSize: 60, color: 'white' }} />
        </Box>
        <Typography variant="h4" sx={{ 
          mb: 2, 
          fontWeight: 800,
          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          {subtitle}
        </Typography>
        <LinearProgress 
          sx={{ 
            width: 300, 
            height: 8, 
            borderRadius: 4,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            '& .MuiLinearProgress-bar': {
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: 4
            }
          }} 
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen; 