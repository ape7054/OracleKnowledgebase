import { Box, Typography, Chip, useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TimelineIcon,
} from '@mui/icons-material';

const SocialMentions = () => {
  const theme = useTheme();
  
  // 社交媒体数据
  const data = [
    { 
      name: 'Twitter', 
      value: 65, 
      color: '#1DA1F2',
      trend: 'up',  
      change: '+12%',
      sentiment: 'Positive'
    },
    { 
      name: 'Reddit', 
      value: 25, 
      color: '#FF4500',
      trend: 'down',
      change: '-5%',
      sentiment: 'Mixed'
    },
    { 
      name: 'Telegram', 
      value: 10, 
      color: '#0088cc',
      trend: 'stable',
      change: '+0.5%',
      sentiment: 'Neutral'
    },
  ];
  
  // 获取趋势图标和颜色
  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return <TrendingUpIcon sx={{ fontSize: '0.9rem', color: theme.palette.success.main }} />;
    }
    if (trend === 'down') {
      return <TrendingDownIcon sx={{ fontSize: '0.9rem', color: theme.palette.error.main }} />;
    }
    return <TimelineIcon sx={{ fontSize: '0.9rem', color: theme.palette.warning.main }} />;
  };
  
  // 获取情绪标签颜色
  const getSentimentColor = (sentiment) => {
    if (sentiment === 'Positive') return theme.palette.success.main;
    if (sentiment === 'Negative') return theme.palette.error.main;
    if (sentiment === 'Mixed') return theme.palette.warning.main;
    return theme.palette.info.main;
  };
  
  // 总提及量
  const totalMentions = 45873;
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 总数和趋势摘要 */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 2.5 
      }}>
        <Box>
          <Typography variant="body2" color="text.secondary">Total Mentions (24h)</Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 0.5 }}>
            {totalMentions.toLocaleString()}
          </Typography>
        </Box>
        <Box sx={{ 
          px: 2, 
          py: 0.75, 
          borderRadius: 1.5, 
          background: alpha(theme.palette.success.main, 0.12),
          display: 'flex',
          alignItems: 'center'
        }}>
          <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: '1rem' }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
            +8.3% vs yesterday
          </Typography>
        </Box>
      </Box>
      
      {/* 平台明细 */}
      <Box sx={{ flexGrow: 1 }}>
        {data.map((platform) => (
          <Box key={platform.name} sx={{ mb: 2.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box 
                  sx={{ 
                    width: 28, 
                    height: 28, 
                    borderRadius: '50%', 
                    backgroundColor: alpha(platform.color, 0.15),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 1.5
                  }}
                >
                  <Box 
                    sx={{ 
                      width: 16, 
                      height: 16, 
                      borderRadius: '50%', 
                      backgroundColor: platform.color
                    }}
                  />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {platform.name}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  px: 1, 
                  height: 24, 
                  borderRadius: 1,
                  backgroundColor: alpha(getSentimentColor(platform.sentiment), 0.12),
                  mr: 2
                }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: getSentimentColor(platform.sentiment)
                    }}
                  >
                    {platform.sentiment}
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 700, 
                    minWidth: 32, 
                    textAlign: 'right'
                  }}
                >
                  {platform.value}%
                </Typography>
              </Box>
            </Box>
            
            {/* 进度条 */}
            <Box sx={{ position: 'relative', height: 8, borderRadius: 4, overflow: 'hidden', bgcolor: alpha(platform.color, 0.15) }}>
              <Box 
                sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${platform.value}%`,
                  background: `linear-gradient(90deg, ${alpha(platform.color, 0.7)}, ${platform.color})`,
                  boxShadow: `0 0 8px ${alpha(platform.color, 0.5)}`,
                  borderRadius: 4
                }}
              />
            </Box>
            
            {/* 变化率 */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mt: 0.5 }}>
              {getTrendIcon(platform.trend)}
              <Typography 
                variant="caption" 
                sx={{ 
                  ml: 0.5,
                  color: platform.trend === 'up' 
                    ? theme.palette.success.main 
                    : platform.trend === 'down' 
                      ? theme.palette.error.main 
                      : theme.palette.warning.main 
                }}
              >
                {platform.change} this week
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
      
      {/* 热度词 */}
      <Box sx={{ mt: 1 }}>
        <Typography variant="caption" sx={{ color: theme.palette.text.secondary, display: 'block', mb: 1 }}>
          Trending Topics
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
          {['ETF Approval', 'Bitcoin', 'Regulation', 'Price Action', 'Mining'].map((topic) => (
            <Chip
              key={topic}
              label={topic}
              size="small"
              variant="outlined"
              sx={{ 
                height: 22, 
                fontSize: '0.7rem',
                background: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default SocialMentions; 