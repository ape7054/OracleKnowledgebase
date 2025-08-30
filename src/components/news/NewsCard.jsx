import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Paper,
  Fade,
  Avatar
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  Visibility,
  Share,
  OpenInNew,
  Star,
  Source,
  FiberManualRecord,
  TrendingFlat
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { gradientShift, slideInFromLeft } from './animations';
import { getSentimentColor, getImpactColor } from './utils';

const NewsCard = ({ item, index, newArticleId, onOpenDialog }) => {
  const theme = useTheme();
  const isNew = item.id === newArticleId;

  return (
    <Fade in timeout={1000 + index * 200}>
      <Paper
        onClick={() => onOpenDialog(item)}
        elevation={0}
        sx={{
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, 
                ${alpha('#1e293b', 0.9)} 0%, 
                ${alpha('#334155', 0.8)} 50%, 
                ${alpha('#475569', 0.7)} 100%)`
            : `linear-gradient(135deg, 
                ${alpha('#ffffff', 0.95)} 0%, 
                ${alpha('#f8fafc', 0.9)} 50%, 
                ${alpha('#e2e8f0', 0.85)} 100%)`,
          border: isNew 
            ? `2px solid ${theme.palette.success.main}` 
            : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderRadius: 4,
          overflow: 'hidden',
          cursor: 'pointer',
          backdropFilter: 'blur(20px)',
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: `${slideInFromLeft} 0.8s ease-out ${index * 0.1}s both`,
          boxShadow: isNew 
            ? `0 0 30px ${alpha(theme.palette.success.main, 0.3)}` 
            : `0 4px 20px ${alpha('#000', theme.palette.mode === 'dark' ? 0.3 : 0.1)}`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: `linear-gradient(90deg, 
              ${theme.palette.primary.main}, 
              ${theme.palette.secondary.main}, 
              ${theme.palette.success.main})`,
            backgroundSize: '200% 100%',
            animation: `${gradientShift} 3s ease infinite`,
            opacity: 0,
            transition: 'opacity 0.3s ease'
          },
          '&:hover': {
            transform: 'translateY(-12px) scale(1.02)',
            boxShadow: `0 25px 50px ${alpha(theme.palette.primary.main, 0.2)}`,
            border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
            '&::before': {
              opacity: 1
            }
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* 增强的新闻头部 */}
          <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            {/* 新闻图片 */}
            <Box
              component="img"
              src={item.image || `https://via.placeholder.com/120x80/667eea/ffffff?text=${encodeURIComponent(item.title.substring(0, 10))}`}
              onError={(e) => {
                // 图片加载失败时使用占位符
                e.target.src = `https://via.placeholder.com/120x80/667eea/ffffff?text=${encodeURIComponent(item.title.substring(0, 10))}`;
              }}
              sx={{
                width: 120,
                height: 80,
                borderRadius: 2,
                objectFit: 'cover',
                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  border: `2px solid ${theme.palette.primary.main}`
                }
              }}
            />

            {/* 新闻内容 */}
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{
                fontWeight: 700,
                lineHeight: 1.3,
                mb: 2,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontSize: { xs: '1.1rem', md: '1.3rem' },
                color: 'text.primary'
              }}>
                {item.title}
              </Typography>

              {/* 增强的元数据 */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  avatar={<Avatar sx={{ bgcolor: theme.palette.primary.main, width: 24, height: 24 }}>
                    <Source sx={{ fontSize: 14 }} />
                  </Avatar>}
                  label={item.source}
                  size="small"
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                  }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {item.time}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                    {item.views}
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* 右侧操作区 */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                sx={{
                  bgcolor: alpha(theme.palette.warning.main, 0.1),
                  color: theme.palette.warning.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.warning.main, 0.2),
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Star sx={{ fontSize: 18 }} />
              </IconButton>
              
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  if (item.link) window.open(item.link, '_blank');
                }}
                sx={{
                  bgcolor: alpha(theme.palette.info.main, 0.1),
                  color: theme.palette.info.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.info.main, 0.2),
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <OpenInNew sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>

          {/* 新闻摘要 */}
          <Typography variant="body2" color="text.secondary" sx={{
            mb: 3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
            fontSize: '0.95rem'
          }}>
            {item.summary}
          </Typography>

          {/* 增强的底部标签区 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Chip
                label={item.category}
                size="small"
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.15),
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                }}
              />
              
              <Chip
                icon={<FiberManualRecord sx={{ fontSize: 8 }} />}
                label={item.impact.toUpperCase()}
                size="small"
                sx={{
                  bgcolor: alpha(getImpactColor(item.impact, theme), 0.15),
                  color: getImpactColor(item.impact, theme),
                  fontWeight: 600,
                  border: `1px solid ${alpha(getImpactColor(item.impact, theme), 0.3)}`
                }}
              />

              <Chip
                icon={item.sentiment === 'positive' ? <TrendingUp sx={{ fontSize: 14 }} /> : 
                      item.sentiment === 'negative' ? <TrendingDown sx={{ fontSize: 14 }} /> :
                      <TrendingFlat sx={{ fontSize: 14 }} />}
                label={item.sentiment === 'positive' ? 'Bullish' : 
                      item.sentiment === 'negative' ? 'Bearish' : 'Neutral'}
                size="small"
                sx={{
                  bgcolor: alpha(getSentimentColor(item.sentiment), 0.15),
                  color: getSentimentColor(item.sentiment),
                  fontWeight: 600,
                  border: `1px solid ${alpha(getSentimentColor(item.sentiment), 0.3)}`
                }}
              />
            </Box>

            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                if (navigator.share && item.link) {
                  navigator.share({
                    title: item.title,
                    url: item.link
                  });
                }
              }}
              sx={{
                bgcolor: alpha(theme.palette.success.main, 0.1),
                color: theme.palette.success.main,
                '&:hover': {
                  bgcolor: alpha(theme.palette.success.main, 0.2),
                  transform: 'scale(1.1)'
                }
              }}
            >
              <Share sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        </CardContent>
      </Paper>
    </Fade>
  );
};

export default NewsCard; 