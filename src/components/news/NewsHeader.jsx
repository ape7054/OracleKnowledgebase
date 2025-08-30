import React from 'react';
import {
  Box,
  Typography,
  Grid,
  IconButton,
  Badge,
  Tooltip,
  Paper,
  Fade
} from '@mui/material';
import {
  Refresh,
  Notifications,
  FilterList,
  FlashOn,
  Language,
  Assessment,
  TrendingUp
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { gradientShift, pulseGlow, rotateAnimation, slideInFromLeft } from './animations';

const NewsHeader = ({ news, refreshing, onRefreshNews }) => {
  const theme = useTheme();

  return (
    <Fade in timeout={800}>
      <Box sx={{ mb: 6 }}>
        {/* 超现代化标题区域 */}
        <Box sx={{
          textAlign: 'center',
          mb: 6,
          position: 'relative'
        }}>
          {/* 3D 标题效果 */}
          <Typography 
            variant="h1" 
            sx={{
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main}, ${theme.palette.success.main})`,
              backgroundSize: '200% 200%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: `${gradientShift} 3s ease infinite`,
              mb: 2,
              letterSpacing: '-0.03em',
              textShadow: `
                0 0 20px ${alpha(theme.palette.primary.main, 0.5)},
                0 0 40px ${alpha(theme.palette.secondary.main, 0.3)}
              `,
              position: 'relative',
              '&::before': {
                content: '"CRYPTO NEWS HUB"',
                position: 'absolute',
                top: 0,
                left: 0,
                background: alpha(theme.palette.text.primary, 0.1),
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                transform: 'translate(2px, 2px)',
                zIndex: -1
              }
            }}
          >
            CRYPTO NEWS HUB
          </Typography>

          <Typography 
            variant="h5" 
            sx={{
              color: 'text.secondary',
              fontWeight: 300,
              mb: 4,
              maxWidth: 800,
              mx: 'auto',
              lineHeight: 1.8,
              fontSize: { xs: '1.1rem', md: '1.4rem' },
              letterSpacing: '0.02em'
            }}
          >
            Real-time Market Intelligence & Insights
          </Typography>

          {/* 增强的统计仪表板 */}
          <Grid container spacing={3} sx={{ mb: 4, maxWidth: 900, mx: 'auto' }}>
            {[
              { label: 'Breaking News', value: news.length, icon: FlashOn, color: theme.palette.primary.main, suffix: '' },
              { label: 'Active Sources', value: '24/7', icon: Language, color: theme.palette.success.main, suffix: '' },
              { label: 'Market Updates', value: '98', icon: Assessment, color: theme.palette.warning.main, suffix: '%' },
              { label: 'Analysis Reports', value: '150', icon: TrendingUp, color: theme.palette.info.main, suffix: '+' }
            ].map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    background: `linear-gradient(135deg, ${alpha(stat.color, 0.1)}, ${alpha(stat.color, 0.05)})`,
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                    borderRadius: 3,
                    backdropFilter: 'blur(20px)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    animation: `${slideInFromLeft} 0.6s ease-out ${index * 0.1}s both`,
                    '&:hover': {
                      transform: 'translateY(-8px) scale(1.02)',
                      boxShadow: `0 20px 40px ${alpha(stat.color, 0.2)}`,
                      border: `2px solid ${alpha(stat.color, 0.4)}`
                    }
                  }}
                >
                  <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2
                  }}>
                    <Box sx={{
                      p: 1.5,
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${stat.color}, ${alpha(stat.color, 0.7)})`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <stat.icon sx={{ fontSize: 24, color: 'white' }} />
                    </Box>
                  </Box>
                  <Typography variant="h4" sx={{
                    fontWeight: 800,
                    color: stat.color,
                    mb: 0.5,
                    fontSize: { xs: '1.8rem', md: '2.2rem' }
                  }}>
                    {stat.value}{stat.suffix}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* 高级操作中心 */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 3,
            flexWrap: 'wrap'
          }}>
            <Tooltip title="Refresh Global News" arrow>
              <IconButton
                onClick={onRefreshNews}
                disabled={refreshing}
                sx={{
                  width: 70,
                  height: 70,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                  color: 'white',
                  boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                  border: `2px solid ${alpha(theme.palette.primary.light, 0.3)}`,
                  animation: refreshing ? `${rotateAnimation} 1s linear infinite` : 'none',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 12px 48px ${alpha(theme.palette.primary.main, 0.6)}`,
                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`
                  },
                  '&:disabled': {
                    background: alpha(theme.palette.primary.main, 0.3),
                    color: alpha('#fff', 0.5)
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <Refresh sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>

            <Badge badgeContent={5} color="error" sx={{
              '& .MuiBadge-badge': {
                animation: `${pulseGlow} 2s ease-in-out infinite`,
                fontSize: '0.75rem',
                minWidth: 22,
                height: 22
              }
            }}>
              <Tooltip title="Important News Alerts" arrow>
                <IconButton
                  sx={{
                    width: 70,
                    height: 70,
                    background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
                    color: 'white',
                    boxShadow: `0 8px 32px ${alpha(theme.palette.warning.main, 0.4)}`,
                    border: `2px solid ${alpha(theme.palette.warning.light, 0.3)}`,
                    '&:hover': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 12px 48px ${alpha(theme.palette.warning.main, 0.6)}`,
                      background: `linear-gradient(135deg, ${theme.palette.warning.dark}, ${theme.palette.warning.main})`
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  <Notifications sx={{ fontSize: 32 }} />
                </IconButton>
              </Tooltip>
            </Badge>

            <Tooltip title="Smart Filter" arrow>
              <IconButton
                sx={{
                  width: 70,
                  height: 70,
                  background: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
                  color: 'white',
                  boxShadow: `0 8px 32px ${alpha(theme.palette.info.main, 0.4)}`,
                  border: `2px solid ${alpha(theme.palette.info.light, 0.3)}`,
                  '&:hover': {
                    transform: 'scale(1.1)',
                    boxShadow: `0 12px 48px ${alpha(theme.palette.info.main, 0.6)}`,
                    background: `linear-gradient(135deg, ${theme.palette.info.dark}, ${theme.palette.info.main})`
                  },
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <FilterList sx={{ fontSize: 32 }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default NewsHeader; 