'use client';
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import InfinityLoadingPage from '@/components/common/InfinityLoadingPage';

export default function TestInfinityLoadingPage() {
  const [showLoading, setShowLoading] = useState(false);
  const [variant, setVariant] = useState<'default' | 'fast' | 'slow'>('default');
  const [theme, setTheme] = useState<'pink' | 'blue' | 'green' | 'purple' | 'orange'>('pink');

  if (showLoading) {
    return (
      <InfinityLoadingPage 
        variant={variant} 
        theme={theme}
        onClick={() => setShowLoading(false)} 
      />
    );
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
        padding: 3,
      }}
    >
      <Typography variant="h3" gutterBottom>
        🎆 Infinity Loading 测试
      </Typography>
      
      <Typography variant="body1" color="rgba(255,255,255,0.8)" sx={{ textAlign: 'center', maxWidth: '600px' }}>
        基于 loading.io 原版 SVG 路径描边动画的完美复刻版本
      </Typography>

      <Typography variant="h6" color="rgba(255,255,255,0.7)">
        选择动画速度:
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Button 
          variant={variant === 'default' ? 'contained' : 'outlined'}
          onClick={() => setVariant('default')}
          sx={{ color: variant === 'default' ? 'black' : 'white' }}
        >
          默认速度 (1秒)
        </Button>
        <Button 
          variant={variant === 'fast' ? 'contained' : 'outlined'}
          onClick={() => setVariant('fast')}
          sx={{ color: variant === 'fast' ? 'black' : 'white' }}
        >
          快速动画 (0.6秒)
        </Button>
        <Button 
          variant={variant === 'slow' ? 'contained' : 'outlined'}
          onClick={() => setVariant('slow')}
          sx={{ color: variant === 'slow' ? 'black' : 'white' }}
        >
          慢速动画 (1.5秒)
        </Button>
      </Box>

      <Typography variant="h6" color="rgba(255,255,255,0.7)" sx={{ mt: 2 }}>
        选择主题颜色:
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { key: 'pink', label: '原版粉色', color: '#e90c59' },
          { key: 'blue', label: '蓝色主题', color: '#4facfe' },
          { key: 'green', label: '绿色主题', color: '#43e97b' },
          { key: 'purple', label: '紫色主题', color: '#a855f7' },
          { key: 'orange', label: '橙色主题', color: '#fb923c' },
        ].map((item) => (
          <Button 
            key={item.key}
            variant={theme === item.key ? 'contained' : 'outlined'}
            onClick={() => setTheme(item.key as any)}
            sx={{ 
              color: theme === item.key ? 'white' : item.color,
              borderColor: item.color,
              bgcolor: theme === item.key ? item.color : 'transparent',
              '&:hover': {
                bgcolor: theme === item.key ? item.color : `${item.color}20`,
                borderColor: item.color,
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      <Button 
        variant="contained" 
        size="large"
        onClick={() => setShowLoading(true)}
        sx={{ 
          mt: 3,
          bgcolor: '#e90c59',
          color: 'white',
          fontSize: '18px',
          padding: '12px 30px',
          '&:hover': { bgcolor: '#d1084d' }
        }}
      >
        🎬 查看 Infinity 动画效果
      </Button>
      
      <Typography variant="body2" color="rgba(255,255,255,0.5)" sx={{ mt: 2, textAlign: 'center' }}>
        点击动画区域或按 ESC 键返回<br/>
        真正的无限符号路径描边动画
      </Typography>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="rgba(255,255,255,0.7)">
          ✨ 特性亮点:
        </Typography>
        <Box component="ul" sx={{ color: 'rgba(255,255,255,0.6)', textAlign: 'left', maxWidth: '500px' }}>
          <li><strong>原版复刻</strong>: 100% 复刻 loading.io 的 SVG 路径动画</li>
          <li><strong>流畅描边</strong>: 使用 stroke-dashoffset 实现真正的无限符号轨迹</li>
          <li><strong>多主题支持</strong>: 5种精美配色方案</li>
          <li><strong>响应式设计</strong>: 完美适配各种屏幕尺寸</li>
          <li><strong>高性能</strong>: 纯 SVG 动画，60fps 流畅运行</li>
        </Box>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="rgba(255,255,255,0.6)">
          💡 <strong>使用方法</strong>: 导入 <code style={{color: '#e90c59'}}>InfinityLoadingPage</code> 组件即可使用
        </Typography>
      </Box>
    </Box>
  );
} 