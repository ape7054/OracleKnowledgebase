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
  Slide
} from '@mui/material';
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
  Source
} from '@mui/icons-material';
import { useTheme, alpha, keyframes } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// 动画定义
const pulseAnimation = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const slideInAnimation = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

// 新闻API配置
const NEWS_API_CONFIG = {
  // 使用免费的CryptoNews API
  cryptoNews: 'https://cryptonews-api.com/api/v1/category',
  // 备用API - CoinDesk RSS转JSON
  coinDesk: 'https://api.rss2json.com/v1/api.json?rss_url=https://feeds.feedburner.com/CoinDesk',
  // 备用API - CoinTelegraph
  coinTelegraph: 'https://api.rss2json.com/v1/api.json?rss_url=https://cointelegraph.com/rss'
};

// 获取真实新闻数据
const fetchCryptoNews = async () => {
  try {
    // 首先尝试CoinDesk RSS API（免费且稳定）
    const response = await fetch(NEWS_API_CONFIG.coinDesk);
    const data = await response.json();

    if (data.status === 'ok' && data.items) {
      return data.items.slice(0, 20).map((item, index) => ({
        id: item.guid || index + 1,
        title: item.title,
        summary: item.description?.replace(/<[^>]*>/g, '').substring(0, 400) + '...' || 'No summary available',
        source: 'CoinDesk',
        time: formatTimeAgo(new Date(item.pubDate)),
        category: getCategoryFromContent(item.title + ' ' + item.description),
        sentiment: getSentimentFromContent(item.title + ' ' + item.description),
        impact: getImpactFromContent(item.title),
        views: Math.floor(Math.random() * 50000) + 1000 + '',
        image: item.thumbnail || item.enclosure?.link || `https://via.placeholder.com/300x200/1976d2/ffffff?text=${encodeURIComponent(item.title.substring(0, 20))}`,
        link: item.link,
        pubDate: item.pubDate
      }));
    }

    // 如果CoinDesk失败，返回备用数据
    return getFallbackNews();

  } catch (error) {
    console.error('获取新闻失败:', error);
    return getFallbackNews();
  }
};

// 时间格式化函数
const formatTimeAgo = (date) => {
  const now = new Date();
  const diffInMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}分钟前`;
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}小时前`;
  } else {
    return `${Math.floor(diffInMinutes / 1440)}天前`;
  }
};

// 从内容判断分类
const getCategoryFromContent = (content) => {
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('regulation') || lowerContent.includes('sec') || lowerContent.includes('government')) return '监管';
  if (lowerContent.includes('defi') || lowerContent.includes('protocol') || lowerContent.includes('smart contract')) return 'DeFi';
  if (lowerContent.includes('bitcoin') || lowerContent.includes('btc')) return 'Bitcoin';
  if (lowerContent.includes('ethereum') || lowerContent.includes('eth')) return 'Ethereum';
  if (lowerContent.includes('nft') || lowerContent.includes('collectible')) return 'NFT';
  if (lowerContent.includes('hack') || lowerContent.includes('attack') || lowerContent.includes('security')) return '安全';
  return '市场';
};

// 从内容判断情绪
const getSentimentFromContent = (content) => {
  const lowerContent = content.toLowerCase();
  const positiveWords = ['surge', 'rise', 'gain', 'bull', 'high', 'breakthrough', 'success', 'approve'];
  const negativeWords = ['fall', 'drop', 'crash', 'bear', 'low', 'hack', 'attack', 'decline', 'loss'];

  const positiveCount = positiveWords.filter(word => lowerContent.includes(word)).length;
  const negativeCount = negativeWords.filter(word => lowerContent.includes(word)).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

// 从标题判断影响力
const getImpactFromContent = (title) => {
  const lowerTitle = title.toLowerCase();
  const highImpactWords = ['bitcoin', 'ethereum', 'sec', 'regulation', 'etf', 'hack', 'billion'];
  const mediumImpactWords = ['defi', 'nft', 'altcoin', 'trading', 'market'];

  if (highImpactWords.some(word => lowerTitle.includes(word))) return 'high';
  if (mediumImpactWords.some(word => lowerTitle.includes(word))) return 'medium';
  return 'low';
};

// 弹窗过渡动画
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Fallback news data (used when API fails)
const getFallbackNews = () => [
  {
    id: 1,
    title: "Bitcoin Price Breaks All-Time High as Institutional Investors Continue Buying",
    summary: "Bitcoin price reaches new highs driven by continued institutional investor purchases, market sentiment remains optimistic...",
    source: "CoinDesk",
    time: "1 hour ago",
    category: "Bitcoin",
    sentiment: "positive",
    impact: "high",
    views: "25.3K",
    image: "https://via.placeholder.com/300x200/f7931e/ffffff?text=Bitcoin"
  },
  {
    id: 2,
    title: "Ethereum Network Upgrade Successfully Reduces Transaction Fees",
    summary: "Ethereum's latest network upgrade successfully implemented, significantly reducing user transaction costs and boosting developer activity...",
    source: "Ethereum Foundation",
    time: "3 hours ago",
    category: "Ethereum",
    sentiment: "positive",
    impact: "medium",
    views: "18.7K",
    image: "https://via.placeholder.com/300x200/627eea/ffffff?text=Ethereum"
  },
  {
    id: 3,
    title: "DeFi Protocol Total Value Locked Reaches New Record",
    summary: "Decentralized finance protocols' total value locked reaches new highs, demonstrating strong growth in the DeFi ecosystem...",
    source: "DeFiPulse",
    time: "5 hours ago",
    category: "DeFi",
    sentiment: "positive",
    impact: "medium",
    views: "12.1K",
    image: "https://via.placeholder.com/300x200/9c27b0/ffffff?text=DeFi"
  }
];

// 市场情绪数据
const sentimentData = [
  { time: '00:00', sentiment: 65, volume: 120 },
  { time: '04:00', sentiment: 70, volume: 150 },
  { time: '08:00', sentiment: 75, volume: 180 },
  { time: '12:00', sentiment: 80, volume: 200 },
  { time: '16:00', sentiment: 85, volume: 220 },
  { time: '20:00', sentiment: 90, volume: 250 },
  { time: '24:00', sentiment: 88, volume: 240 }
];

// 热门标签
const trendingTags = [
  { name: 'Bitcoin ETF', count: 156, trend: 'up' },
  { name: 'Ethereum 2.0', count: 134, trend: 'up' },
  { name: 'DeFi Security', count: 98, trend: 'down' },
  { name: 'NFT Market', count: 87, trend: 'up' },
  { name: 'Regulation', count: 76, trend: 'neutral' }
];

const NewsProfessional = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newArticleId, setNewArticleId] = useState(null); // 用于高亮新文章
  const ws = useRef(null);
  const [selectedArticle, setSelectedArticle] = useState(null); // 用于弹窗显示的文章

  const handleOpenDialog = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDialog = () => {
    setSelectedArticle(null);
  };

  // 手动刷新新闻
  const handleRefreshNews = async () => {
    setRefreshing(true);
    try {
      const newsData = await fetchCryptoNews();
      setNews(newsData);
    } catch (error) {
      console.error('刷新新闻失败:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // 1. 先通过HTTP加载初始新闻列表
    const loadNews = async () => {
      setLoading(true);
      try {
        const newsData = await fetchCryptoNews();
        setNews(newsData);
      } catch (error) {
        console.error('加载新闻失败:', error);
        // 使用备用数据
        setNews(getFallbackNews());
      } finally {
        setLoading(false);
      }
    };

    loadNews();

    // 2. 建立WebSocket连接以接收实时更新
    const connect = () => {
      // 假设后端在 /ws/news 提供新闻的WebSocket服务
      const wsUrl = `ws://localhost:8080/ws/news`;
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        console.log('新闻WebSocket已连接');
      };

      ws.current.onmessage = (event) => {
        try {
          const newArticle = JSON.parse(event.data);
          // 将新文章添加到列表顶部
          setNews(prevNews => [newArticle, ...prevNews]);
          // 设置新文章ID用于高亮
          setNewArticleId(newArticle.id);
          // 几秒后移除高亮
          setTimeout(() => setNewArticleId(null), 5000);
        } catch (error) {
          console.error('解析WebSocket消息失败:', error);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket 错误:', error);
      };

      ws.current.onclose = () => {
        console.log('新闻WebSocket已断开. 5秒后尝试重连...');
        // 简单的重连逻辑
        setTimeout(connect, 5000);
      };
    };

    connect();

    // 组件卸载时关闭WebSocket连接
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
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
          ? 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 1) 100%)'
          : 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.1) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(248, 250, 252, 1) 100%)'
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            animation: `${pulseAnimation} 2s infinite`
          }}>
            <Notifications sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
            正在获取最新新闻...
          </Typography>
          <Typography variant="body2" color="text.secondary">
            连接全球加密货币新闻源
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, rgba(15, 23, 42, 0.8) 50%, rgba(15, 23, 42, 1) 100%)'
        : 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.1) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(248, 250, 252, 1) 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 背景装饰 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.03,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.palette.primary.main.slice(1)}' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* 页面头部 - 高级样式 */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 6 }}>
            {/* 主标题区域 */}
            <Box sx={{
              textAlign: 'center',
              mb: 4,
              position: 'relative'
            }}>
              {/* 背景装饰 */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 200,
                height: 200,
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 70%)`,
                borderRadius: '50%',
                zIndex: 0
              }} />

              {/* 主标题 */}
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <Typography variant="h2" sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  letterSpacing: '-0.02em'
                }}>
                  Crypto News Hub
                </Typography>

                <Typography variant="h6" sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  mb: 3,
                  maxWidth: 600,
                  mx: 'auto',
                  lineHeight: 1.6
                }}>
                  Real-time tracking of global cryptocurrency market dynamics, latest industry news and in-depth analysis
                </Typography>

                {/* Statistics */}
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 4,
                  flexWrap: 'wrap'
                }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                      mb: 0.5
                    }}>
                      {news.length}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Live News
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{
                      fontWeight: 700,
                      color: theme.palette.success.main,
                      mb: 0.5
                    }}>
                      24/7
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Real-time Updates
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h4" sx={{
                      fontWeight: 700,
                      color: theme.palette.warning.main,
                      mb: 0.5
                    }}>
                      AI
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Smart Analysis
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>

            {/* 操作按钮区域 */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              gap: 2
            }}>
              <IconButton
                onClick={handleRefreshNews}
                disabled={refreshing}
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  width: 56,
                  height: 56,
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                    transform: 'scale(1.05)'
                  },
                  '&:disabled': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.2)}`
                }}
              >
                <Refresh sx={{
                  animation: refreshing ? `${pulseAnimation} 1s infinite` : 'none',
                  fontSize: 28
                }} />
              </IconButton>

              <Badge badgeContent={3} color="error">
                <IconButton
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    color: theme.palette.warning.main,
                    width: 56,
                    height: 56,
                    '&:hover': {
                      bgcolor: alpha(theme.palette.warning.main, 0.2),
                      transform: 'scale(1.05)'
                    },
                    transition: 'all 0.3s ease',
                    boxShadow: `0 4px 20px ${alpha(theme.palette.warning.main, 0.2)}`
                  }}
                >
                  <Notifications sx={{ fontSize: 28 }} />
                </IconButton>
              </Badge>
            </Box>
          </Box>
        </Fade>

        {/* 主要内容区域 */}
        <Grid container spacing={3}>
          {/* 左侧新闻列表 */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              {news.map((item, index) => {
                const isNew = item.id === newArticleId;
                return (
                <Fade in timeout={1000 + index * 200} key={item.id}>
                  <Card
                    onClick={() => handleOpenDialog(item)}
                    sx={{
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.98) 100%)',
                      border: isNew ? `2px solid ${theme.palette.success.main}` : `1px solid ${alpha(theme.palette.primary.main, 0.08)}`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      backdropFilter: 'blur(20px)',
                      position: 'relative',
                      boxShadow: isNew ? `0 0 25px ${alpha(theme.palette.success.main, 0.5)}` : 'none',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        opacity: 0,
                        transition: 'opacity 0.3s ease'
                      },
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: isNew ? `0 0 25px ${alpha(theme.palette.success.main, 0.7)}` : `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                        '&::before': {
                          opacity: 1
                        }
                      },
                      animation: `${slideInAnimation} 0.6s ease-out ${index * 0.1}s both`
                    }}>
                    <CardContent sx={{ p: 4 }}>
                      {/* 新闻头部 */}
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ flex: 1, mr: 3 }}>
                          <Typography variant="h5" sx={{
                            fontWeight: 700,
                            lineHeight: 1.4,
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            fontSize: { xs: '1.1rem', md: '1.25rem' }
                          }}>
                            {item.title}
                          </Typography>

                          {/* 来源和时间 */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                            <Chip
                              label={item.source}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                height: 28,
                                '& .MuiChip-label': {
                                  px: 1.5
                                }
                              }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                                {item.time}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>

                          {/* 右侧操作按钮 */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // 书签功能
                              }}
                            >
                              <BookmarkBorder sx={{ fontSize: 18 }} />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (item.link) {
                                  window.open(item.link, '_blank');
                                }
                              }}
                            >
                              <OpenInNew sx={{ fontSize: 18 }} />
                            </IconButton>
                          </Box>
                        </Box>

                        {/* 新闻摘要 */}
                        <Typography variant="body2" color="text.secondary" sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          lineHeight: 1.5
                        }}>
                          {item.summary}
                        </Typography>

                        {/* 底部标签和统计 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Chip
                              label={item.category}
                              size="small"
                              sx={{
                                bgcolor: alpha(theme.palette.primary.main, 0.1),
                                color: theme.palette.primary.main,
                                fontSize: '0.75rem'
                              }}
                            />
                            <Chip
                              icon={<FiberManualRecord sx={{ fontSize: 6 }} />}
                              label={item.impact}
                              size="small"
                              sx={{
                                bgcolor: alpha(getImpactColor(item.impact), 0.1),
                                color: getImpactColor(item.impact),
                                fontSize: '0.75rem'
                              }}
                            />
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                              <Visibility sx={{ fontSize: 14, color: 'text.secondary' }} />
                              <Typography variant="caption" color="text.secondary">
                                {item.views}
                              </Typography>
                            </Box>
                            <IconButton
                              size="small"
                              onClick={(e) => {
                                e.stopPropagation();
                                // 分享功能
                                if (navigator.share && item.link) {
                                  navigator.share({
                                    title: item.title,
                                    url: item.link
                                  });
                                }
                              }}
                            >
                              <Share sx={{ fontSize: 14 }} />
                            </IconButton>
                          </Box>
                        </Box>
                    </CardContent>
                  </Card>
                </Fade>
              )})}
            </Stack>
          </Grid>

          {/* Right Sidebar */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Market Sentiment */}
              <Fade in timeout={1200}>
                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Assessment sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Market Sentiment
                      </Typography>
                    </Box>

                    <Box sx={{ textAlign: 'center', mb: 3 }}>
                      <Typography variant="h2" sx={{
                        fontWeight: 700,
                        color: '#00ff88',
                        mb: 1
                      }}>
                        85
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Extremely Bullish
                      </Typography>
                    </Box>

                    <Box sx={{ height: 200, mb: 2 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={sentimentData}>
                          <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                          <XAxis dataKey="time" stroke={theme.palette.text.secondary} fontSize={12} />
                          <YAxis stroke={theme.palette.text.secondary} fontSize={12} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: theme.palette.background.paper,
                              border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                              borderRadius: 8
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="sentiment"
                            stroke="#00ff88"
                            fill={alpha('#00ff88', 0.2)}
                            strokeWidth={2}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>

                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#00ff88' }}>24</Typography>
                          <Typography variant="caption" color="text.secondary">Bullish</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#ff4757' }}>3</Typography>
                          <Typography variant="caption" color="text.secondary">Bearish</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#a4b0be' }}>8</Typography>
                          <Typography variant="caption" color="text.secondary">Neutral</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>

              {/* Trending Topics */}
              <Fade in timeout={1400}>
                <Card sx={{
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  borderRadius: 3
                }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUp sx={{ mr: 1, color: theme.palette.primary.main }} />
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Trending Topics
                      </Typography>
                    </Box>

                    <Stack spacing={2}>
                      {trendingTags.map((tag, index) => (
                        <Box key={tag.name} sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: alpha(theme.palette.background.paper, 0.3),
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          transition: 'all 0.2s ease',
                          '&:hover': {
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                            cursor: 'pointer'
                          }
                        }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h6" sx={{ 
                              color: theme.palette.primary.main,
                              fontWeight: 600,
                              minWidth: 24
                            }}>
                              #{index + 1}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {tag.name}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {tag.count}
                            </Typography>
                            {tag.trend === 'up' && <TrendingUp sx={{ fontSize: 16, color: '#00ff88' }} />}
                            {tag.trend === 'down' && <TrendingDown sx={{ fontSize: 16, color: '#ff4757' }} />}
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Fade>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* 新闻详情弹窗 */}
      <Dialog
        open={Boolean(selectedArticle)}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 4,
            background: alpha(theme.palette.background.paper, 0.85),
            backdropFilter: 'blur(20px)',
          }
        }}
      >
        {selectedArticle && (
          <>
            <DialogTitle sx={{ p: 3, pb: 2 }}>
              <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                {selectedArticle.title}
              </Typography>
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers sx={{ p: 3, borderColor: alpha(theme.palette.divider, 0.2) }}>
              <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 2, mb: 2, color: 'text.secondary' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Source fontSize="small" />
                    <Typography variant="body2">{selectedArticle.source}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">{selectedArticle.time}</Typography>
                  </Box>
              </Box>
              <Box
                component="img"
                src={selectedArticle.image}
                alt={selectedArticle.title}
                sx={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'cover',
                  borderRadius: 2,
                  my: 2,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
              <Typography gutterBottom sx={{ lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                {selectedArticle.summary.replace(/...$/, '')}
              </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog}>关闭</Button>
              <Button 
                variant="contained" 
                onClick={() => window.open(selectedArticle.link, '_blank')}
                endIcon={<OpenInNew />}
              >
                阅读原文
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default NewsProfessional;
