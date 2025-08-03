import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  Divider,
  Stack,
  Badge,
  Fade,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
  Avatar,
  LinearProgress,
  Tooltip,
  Paper
} from '@mui/material';
import { fetchCryptoNews } from '../services/newsService';
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  Visibility,
  BookmarkBorder,
  Share,
  Notifications,
  Assessment,
  FiberManualRecord,
  OpenInNew,
  Refresh,
  Close,
  Source,
  FlashOn,
  Language,
  FilterList,
  Search,
  Star,
  AttachMoney,
  Security,
  TrendingFlat
} from '@mui/icons-material';
import { useTheme, alpha, keyframes } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';

// 增强的动画定义
const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatingAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const rotateAnimation = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
    border-color: rgba(16, 185, 129, 0.5);
  }
  50% { 
    box-shadow: 0 0 40px rgba(16, 185, 129, 0.6);
    border-color: rgba(16, 185, 129, 0.8);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(100px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

// 本地新闻获取函数 - 使用真实API
const loadCryptoNews = async () => {
  try {
    // 使用真实API获取新闻数据
    const newsData = await fetchCryptoNews({ 
      maxItems: 20, 
      useRealAPI: true 
    });
    
         // 转换数据格式以适配UI
     return newsData.map(item => ({
       id: item.id,
       title: item.title,
       summary: item.summary,
       source: item.source,
       time: item.time,
       category: item.category || '市场',
       sentiment: item.sentiment,
       impact: item.impact,
       views: item.views || Math.floor(Math.random() * 50000) + 1000 + '',
       image: item.imageUrl || `https://via.placeholder.com/400x250/1976d2/ffffff?text=${encodeURIComponent(item.title.substring(0, 20))}`,
       link: item.sourceUrl,
       coins: item.coins || ['CRYPTO'],
       tags: item.tags || []
     }));
  } catch (error) {
    console.error('获取真实新闻失败:', error);
    return getFallbackNews();
  }
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getFallbackNews = () => [
  {
    id: 1,
    title: "Why Michael Saylor Calls Strategy's STRC Preferred Stock His Firm's 'iPhone Moment'",
    summary: "Michael Saylor likens Strategy's latest Bitcoin-backed preferred stock to Apple's iPhone, calling STRC a breakthrough in corporate finance with massive market potential...",
    source: "CoinDesk",
    time: "10 hours ago",
    category: "Bitcoin",
    sentiment: "positive",
    impact: "high",
    views: "28.7K",
    image: "https://via.placeholder.com/400x250/f7931e/ffffff?text=Bitcoin+Strategy"
  },
  {
    id: 2,
    title: "Arthur Hayes Dumps Millions in Crypto Amid Bearish Bet on U.S. Tariff Impact",
    summary: "Hayes suggested that markets will be impacted by President Trump's tariffs and a weaker-than-expected US jobs report, predicting a bearish scenario for crypto...",
    source: "CoinDesk",
    time: "13 hours ago",
    category: "市场",
    sentiment: "negative",
    impact: "medium",
    views: "48.4K",
    image: "https://via.placeholder.com/400x250/e74c3c/ffffff?text=Market+Analysis"
  }
];

// 增强的市场情绪数据
const sentimentData = [
  { time: '00:00', sentiment: 65, volume: 120, fear: 25, greed: 75 },
  { time: '04:00', sentiment: 70, volume: 150, fear: 20, greed: 80 },
  { time: '08:00', sentiment: 75, volume: 180, fear: 15, greed: 85 },
  { time: '12:00', sentiment: 80, volume: 200, fear: 12, greed: 88 },
  { time: '16:00', sentiment: 85, volume: 220, fear: 10, greed: 90 },
  { time: '20:00', sentiment: 90, volume: 250, fear: 8, greed: 92 },
  { time: '24:00', sentiment: 88, volume: 240, fear: 10, greed: 90 }
];

// 恐惧贪婪指数数据
const fearGreedData = [
  { name: 'Extreme Fear', value: 10, fill: '#e74c3c' },
  { name: 'Fear', value: 15, fill: '#f39c12' },
  { name: 'Neutral', value: 10, fill: '#95a5a6' },
  { name: 'Greed', value: 25, fill: '#3498db' },
  { name: 'Extreme Greed', value: 40, fill: '#27ae60' }
];

// 新闻分类数据
const newsCategories = [
  { name: 'Bitcoin', count: 156, color: '#f7931e', trend: 12 },
  { name: 'Ethereum', count: 134, color: '#627eea', trend: 8 },
  { name: 'DeFi', count: 98, color: '#9c27b0', trend: -3 },
  { name: 'NFT', count: 87, color: '#ff5722', trend: 15 },
  { name: '监管', count: 76, color: '#795548', trend: -5 },
  { name: '安全', count: 65, color: '#f44336', trend: 7 }
];

const NewsProfessional = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newArticleId, setNewArticleId] = useState(null);
  const ws = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleOpenDialog = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDialog = () => {
    setSelectedArticle(null);
  };

  const handleRefreshNews = async () => {
    setRefreshing(true);
    try {
      const newsData = await loadCryptoNews();
      setNews(newsData);
    } catch (error) {
      console.error('刷新新闻失败:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const newsData = await loadCryptoNews();
        setNews(newsData);
      } catch (error) {
        console.error('加载新闻失败:', error);
        setNews(getFallbackNews());
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return '#00ff88';
      case 'negative': return '#ff4757';
      default: return '#a4b0be';
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return theme.palette.error.main;
      case 'medium': return theme.palette.warning.main;
      default: return theme.palette.info.main;
    }
  };

  if (loading) {
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
        {[...Array(5)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: `${100 + i * 50}px`,
              height: `${100 + i * 50}px`,
              borderRadius: '50%',
              background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
              animation: `${floatingAnimation} ${3 + i}s ease-in-out infinite`,
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
            }}
          />
        ))}
        
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
            <FlashOn sx={{ fontSize: 60, color: 'white' }} />
          </Box>
          <Typography variant="h4" sx={{ 
            mb: 2, 
            fontWeight: 800,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            正在加载全球加密新闻
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            连接最新资讯源，获取实时市场动态
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
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
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

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* 顶级头部设计 */}
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
                onClick={handleRefreshNews}
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

        {/* 主要内容区域 */}
        <Grid container spacing={4}>
          {/* 左侧新闻列表 - 升级版 */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={4}>
              {news.map((item, index) => {
                const isNew = item.id === newArticleId;
                return (
                <Fade in timeout={1000 + index * 200} key={item.id}>
                    <Paper
                    onClick={() => handleOpenDialog(item)}
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
                                bgcolor: alpha(getImpactColor(item.impact), 0.15),
                                color: getImpactColor(item.impact),
                                fontWeight: 600,
                                border: `1px solid ${alpha(getImpactColor(item.impact), 0.3)}`
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
              })}
            </Stack>
          </Grid>

          {/* 右侧边栏 - 超级升级版 */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={4}>
              {/* 市场情绪分析 - 3D效果 */}
              <Fade in timeout={1200}>
                <Paper
                  elevation={0}
                  sx={{
                  background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, 
                          ${alpha('#1e293b', 0.95)} 0%, 
                          ${alpha('#334155', 0.9)} 50%, 
                          ${alpha('#475569', 0.85)} 100%)`
                      : `linear-gradient(135deg, 
                          ${alpha('#ffffff', 0.95)} 0%, 
                          ${alpha('#f8fafc', 0.9)} 50%, 
                          ${alpha('#e2e8f0', 0.85)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                    borderRadius: 4,
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                    position: 'relative',
                    animation: `${slideInFromRight} 0.8s ease-out`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, #00ff88, #10b981, #059669)`,
                      backgroundSize: '200% 100%',
                      animation: `${gradientShift} 2s ease infinite`
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{
                        p: 1.5,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, #00ff88, #10b981)`,
                        mr: 2
                      }}>
                        <Assessment sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Market Sentiment Index
                      </Typography>
                    </Box>

                    {/* 大型情绪指数显示 */}
                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Typography variant="h1" sx={{
                          fontWeight: 900,
                          fontSize: '4rem',
                          background: 'linear-gradient(135deg, #00ff88, #10b981)',
                          backgroundClip: 'text',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          mb: 1,
                          textShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
                      }}>
                        85
                      </Typography>
                        <Typography variant="h6" sx={{
                          color: '#00ff88',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase'
                        }}>
                          Extremely Positive
                      </Typography>
                      </Box>
                    </Box>

                    {/* 增强的情绪图表 */}
                    <Box sx={{ height: 200, mb: 3 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sentimentData}>
                          <defs>
                            <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                          <XAxis 
                            dataKey="time" 
                            stroke={theme.palette.text.secondary} 
                            fontSize={11}
                            tick={{ fill: theme.palette.text.secondary }}
                          />
                          <YAxis 
                            stroke={theme.palette.text.secondary} 
                            fontSize={11}
                            tick={{ fill: theme.palette.text.secondary }}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: alpha(theme.palette.background.paper, 0.9),
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                              borderRadius: 8,
                              backdropFilter: 'blur(10px)'
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="sentiment"
                            stroke="#00ff88"
                            strokeWidth={3}
                            fill="url(#sentimentGradient)"
                            dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2 }}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>

                    {/* 情绪分析指标 */}
                    <Grid container spacing={2}>
                      {[
                        { label: 'Bullish', value: 24, color: '#00ff88', icon: TrendingUp },
                        { label: 'Bearish', value: 3, color: '#ff4757', icon: TrendingDown },
                        { label: 'Neutral', value: 8, color: '#a4b0be', icon: TrendingFlat }
                      ].map((item, index) => (
                        <Grid item xs={4} key={index}>
                          <Box sx={{ 
                            textAlign: 'center',
                            p: 2,
                            borderRadius: 2,
                            background: alpha(item.color, 0.1),
                            border: `1px solid ${alpha(item.color, 0.2)}`,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: `0 8px 25px ${alpha(item.color, 0.2)}`
                            }
                          }}>
                            <item.icon sx={{ fontSize: 20, color: item.color, mb: 1 }} />
                            <Typography variant="h6" sx={{ color: item.color, fontWeight: 700 }}>
                              {item.value}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                              {item.label}
                            </Typography>
                        </Box>
                      </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Paper>
              </Fade>

              {/* 新闻分类分析 */}
              <Fade in timeout={1400}>
                <Paper
                  elevation={0}
                  sx={{
                  background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, 
                          ${alpha('#1e293b', 0.95)} 0%, 
                          ${alpha('#334155', 0.9)} 50%, 
                          ${alpha('#475569', 0.85)} 100%)`
                      : `linear-gradient(135deg, 
                          ${alpha('#ffffff', 0.95)} 0%, 
                          ${alpha('#f8fafc', 0.9)} 50%, 
                          ${alpha('#e2e8f0', 0.85)} 100%)`,
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
                    borderRadius: 4,
                    backdropFilter: 'blur(20px)',
                    overflow: 'hidden',
                    position: 'relative',
                    animation: `${slideInFromRight} 0.8s ease-out 0.2s both`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                      backgroundSize: '200% 100%',
                      animation: `${gradientShift} 2s ease infinite`
                    }
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <Box sx={{
                        p: 1.5,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                        mr: 2
                      }}>
                        <TrendingUp sx={{ color: 'white', fontSize: 24 }} />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Popular Categories
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      {newsCategories.map((category, index) => (
                        <Box key={category.name} sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 3,
                          borderRadius: 3,
                          background: alpha(category.color, 0.1),
                          border: `1px solid ${alpha(category.color, 0.2)}`,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          animation: `${slideInFromRight} 0.6s ease-out ${index * 0.1}s both`,
                          cursor: 'pointer',
                          '&:hover': {
                            transform: 'translateX(8px) scale(1.02)',
                            boxShadow: `0 8px 25px ${alpha(category.color, 0.3)}`,
                            border: `2px solid ${alpha(category.color, 0.4)}`
                          }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{
                              width: 40,
                              height: 40,
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${category.color}, ${alpha(category.color, 0.7)})`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 800,
                              color: 'white',
                              fontSize: '0.9rem'
                            }}>
                              #{index + 1}
                            </Box>
                            <Box>
                              <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                                {category.name}
                            </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                                {category.count} news
                            </Typography>
                          </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={`${category.trend > 0 ? '+' : ''}${category.trend}%`}
                              size="small"
                              icon={category.trend > 0 ? 
                                <TrendingUp sx={{ fontSize: 14 }} /> : 
                                category.trend < 0 ? 
                                <TrendingDown sx={{ fontSize: 14 }} /> :
                                <TrendingFlat sx={{ fontSize: 14 }} />
                              }
                              sx={{
                                bgcolor: alpha(
                                  category.trend > 0 ? '#00ff88' : 
                                  category.trend < 0 ? '#ff4757' : '#a4b0be', 
                                  0.15
                                ),
                                color: category.trend > 0 ? '#00ff88' : 
                                       category.trend < 0 ? '#ff4757' : '#a4b0be',
                                fontWeight: 600,
                                border: `1px solid ${alpha(
                                  category.trend > 0 ? '#00ff88' : 
                                  category.trend < 0 ? '#ff4757' : '#a4b0be', 
                                  0.3
                                )}`
                              }}
                            />
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Paper>
              </Fade>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* 增强的新闻详情弹窗 */}
      <Dialog
        open={Boolean(selectedArticle)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            background: alpha(theme.palette.background.paper, 0.9),
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            boxShadow: `0 25px 50px ${alpha('#000', 0.3)}`
          }
        }}
      >
        {selectedArticle && (
          <>
            <DialogTitle sx={{ p: 4, pb: 2 }}>
              <Typography variant="h4" component="div" sx={{ 
                fontWeight: 800,
                lineHeight: 1.3,
                pr: 6
              }}>
                {selectedArticle.title}
              </Typography>
              <IconButton
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 16,
                  top: 16,
                  bgcolor: alpha(theme.palette.error.main, 0.1),
                  color: theme.palette.error.main,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.error.main, 0.2),
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent dividers sx={{ 
              p: 4, 
              borderColor: alpha(theme.palette.divider, 0.2),
              maxHeight: '60vh',
              overflowY: 'auto'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                <Chip
                  icon={<Source sx={{ fontSize: 16 }} />}
                  label={selectedArticle.source}
                  sx={{
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    fontWeight: 600
                  }}
                />
                <Chip
                  icon={<AccessTime sx={{ fontSize: 16 }} />}
                  label={selectedArticle.time}
                  variant="outlined"
                />
                <Chip
                  icon={<Visibility sx={{ fontSize: 16 }} />}
                  label={`${selectedArticle.views} views`}
                  variant="outlined"
                />
                  </Box>
              
              <Box
                component="img"
                src={selectedArticle.image}
                alt={selectedArticle.title}
                sx={{
                  width: '100%',
                  maxHeight: '300px',
                  objectFit: 'cover',
                  borderRadius: 3,
                  my: 3,
                  border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  boxShadow: `0 8px 32px ${alpha('#000', 0.1)}`
                }}
              />
              
              <Typography sx={{ 
                lineHeight: 1.8, 
                whiteSpace: 'pre-wrap',
                fontSize: '1.1rem',
                color: 'text.primary'
              }}>
                {selectedArticle.summary.replace(/...$/, '')}
              </Typography>
            </DialogContent>
            
            <DialogActions sx={{ p: 3, gap: 2 }}>
              <Button 
                onClick={handleCloseDialog}
                variant="outlined"
                sx={{ minWidth: 100 }}
              >
                Close
              </Button>
              <Button 
                variant="contained" 
                onClick={() => window.open(selectedArticle.link, '_blank')}
                endIcon={<OpenInNew />}
                sx={{
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  minWidth: 140
                }}
              >
                Read Full Article
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default NewsProfessional;
