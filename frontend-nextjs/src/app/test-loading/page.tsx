'use client';
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import LoadingPage from '@/components/common/LoadingPage';

export default function TestLoadingPage() {
  const [showLoading, setShowLoading] = useState(false);
  const [variant, setVariant] = useState<'default' | 'fast' | 'slow'>('default');

  if (showLoading) {
    return <LoadingPage variant={variant} onClick={() => setShowLoading(false)} />;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#1a1a1a',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        LoadingPage 测试
      </Typography>
      
      <Typography variant="h6" color="rgba(255,255,255,0.7)">
        选择动画变体:
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button 
          variant={variant === 'default' ? 'contained' : 'outlined'}
          onClick={() => setVariant('default')}
          sx={{ color: variant === 'default' ? 'black' : 'white' }}
        >
          默认速度
        </Button>
        <Button 
          variant={variant === 'fast' ? 'contained' : 'outlined'}
          onClick={() => setVariant('fast')}
          sx={{ color: variant === 'fast' ? 'black' : 'white' }}
        >
          快速动画
        </Button>
        <Button 
          variant={variant === 'slow' ? 'contained' : 'outlined'}
          onClick={() => setVariant('slow')}
          sx={{ color: variant === 'slow' ? 'black' : 'white' }}
        >
          慢速动画
        </Button>
      </Box>

      <Button 
        variant="contained" 
        size="large"
        onClick={() => setShowLoading(true)}
        sx={{ 
          mt: 2,
          bgcolor: '#00ffff',
          color: 'black',
          '&:hover': { bgcolor: '#00cccc' }
        }}
      >
        🎬 查看 LoadingPage 动画
      </Button>
      
      <Typography variant="body2" color="rgba(255,255,255,0.5)" sx={{ mt: 2 }}>
        点击动画区域或按 ESC 键返回
      </Typography>
    </Box>
  );
} 