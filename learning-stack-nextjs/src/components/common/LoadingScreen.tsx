'use client';
import React from 'react';
import { Box, CircularProgress, Typography, LinearProgress } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';

// 创建脉冲动画
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0.8;
  }
`;

// 创建旋转动画
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

// 样式化的容器
const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(135deg, 
    rgba(10, 14, 23, 0.95) 0%, 
    rgba(26, 31, 46, 0.9) 50%,
    rgba(10, 14, 23, 0.95) 100%)`,
  backdropFilter: 'blur(10px)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
}));

// 样式化的Logo
const LoadingLogo = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #00ffff, #0099cc)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  animation: `${pulse} 2s ease-in-out infinite`,
  '&::before': {
    content: '"LS"',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#000',
  },
}));

// 样式化的进度条
const StyledLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: 300,
  height: 6,
  borderRadius: 3,
  marginTop: theme.spacing(2),
  backgroundColor: 'rgba(0, 255, 255, 0.2)',
  '& .MuiLinearProgress-bar': {
    borderRadius: 3,
    background: 'linear-gradient(45deg, #00ffff, #0099cc)',
  },
}));

// 样式化的圆形进度条
const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  animation: `${rotate} 1.5s linear infinite`,
  color: '#00ffff',
}));

interface LoadingScreenProps {
  /** 加载文本 */
  message?: string;
  /** 是否显示进度条 */
  showProgress?: boolean;
  /** 进度值 (0-100) */
  progress?: number;
  /** 是否使用圆形进度指示器 */
  variant?: 'circular' | 'linear';
  /** 是否显示Logo */
  showLogo?: boolean;
  /** 自定义样式 */
  sx?: any;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = '加载中...',
  showProgress = true,
  progress = 0,
  variant = 'circular',
  showLogo = true,
  sx,
}) => {
  return (
    <LoadingContainer sx={sx}>
      {showLogo && <LoadingLogo />}
      
      {variant === 'circular' ? (
        <StyledCircularProgress size={60} thickness={4} />
      ) : (
        <StyledLinearProgress
          variant={progress > 0 ? 'determinate' : 'indeterminate'}
          value={progress}
        />
      )}
      
      <Typography
        variant="h6"
        sx={{
          mt: 3,
          color: '#fff',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        {message}
      </Typography>
      
      {progress > 0 && variant === 'linear' && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            color: 'text.secondary',
            textAlign: 'center',
          }}
        >
          {Math.round(progress)}%
        </Typography>
      )}
      
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          alignItems: 'center',
          opacity: 0.7,
        }}
      >
        <Typography variant="caption" color="text.secondary">
          LearningStack - 加密货币学习平台
        </Typography>
      </Box>
    </LoadingContainer>
  );
};

// 简化版本的加载指示器
export const SimpleLoading: React.FC<{ size?: number }> = ({ size = 40 }) => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={2}
    >
      <StyledCircularProgress size={size} />
    </Box>
  );
};

// 内联加载指示器
export const InlineLoading: React.FC<{
  message?: string;
  size?: number;
}> = ({ message = '加载中...', size = 20 }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      justifyContent="center"
      p={1}
    >
      <CircularProgress size={size} sx={{ color: '#00ffff' }} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen; 