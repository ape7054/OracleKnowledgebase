import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Chip,
  Avatar,
  IconButton,
  Button,
  TextField,
  InputAdornment,
  Divider,
  Stack,
  Badge,
  Fade,
  ButtonGroup,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  TrendingUp,
  TrendingDown,
  AccessTime,
  Visibility,
  BookmarkBorder,
  Share,
  FilterList,
  Notifications,
  Star,
  Timeline,
  Assessment,
  FiberManualRecord,
  OpenInNew,
  Refresh,
  ArrowUpward
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

// 模拟新闻数据
const mockNewsData = [
  {
    id: 1,
    title: "Bitcoin ETF获批推动价格突破新高",
    summary: "美国SEC正式批准多个比特币现货ETF，机构资金大量涌入推动价格创历史新高...",
    source: "CoinDesk",
    time: "2小时前",
    category: "监管",
    sentiment: "positive",
    impact: "high",
    views: "12.5K",
    image: "https://via.placeholder.com/300x200/1976d2/ffffff?text=Bitcoin+ETF"
  },
  {
    id: 2,
    title: "以太坊2.0升级完成，网络性能大幅提升",
    summary: "以太坊成功完成Dencun升级，交易费用降低90%，为DeFi生态发展奠定基础...",
    source: "Ethereum Foundation",
    time: "4小时前",
    category: "技术",
    sentiment: "positive",
    impact: "medium",
    views: "8.3K",
    image: "https://via.placeholder.com/300x200/9c27b0/ffffff?text=Ethereum+2.0"
  },
  {
    id: 3,
    title: "DeFi协议遭受闪电贷攻击，损失超1000万美元",
    summary: "某知名DeFi协议因智能合约漏洞遭受攻击，团队正在紧急修复并制定补偿方案...",
    source: "DeFiPulse",
    time: "6小时前",
    category: "安全",
    sentiment: "negative",
    impact: "medium",
    views: "15.2K",
    image: "https://via.placeholder.com/300x200/f44336/ffffff?text=DeFi+Attack"
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

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setNews(mockNewsData);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
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
        {/* 页面头部 */}
        <Fade in timeout={800}>
          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Notifications sx={{ color: 'white', fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Crypto News Hub
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    实时追踪全球加密货币市场动态
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Badge badgeContent={3} color="error">
                  <IconButton 
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                    }}
                  >
                    <Notifications />
                  </IconButton>
                </Badge>
                <IconButton 
                  sx={{ 
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.2) }
                  }}
                >
                  <Refresh />
                </IconButton>
              </Box>
            </Box>

            {/* 搜索和筛选栏 */}
            <Paper sx={{
              p: 3,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
              border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              borderRadius: 3,
              backdropFilter: 'blur(10px)'
            }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="搜索新闻、代币或话题..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: theme.palette.primary.main }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: alpha(theme.palette.background.paper, 0.5),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.background.paper, 0.7),
                        },
                        '&.Mui-focused': {
                          backgroundColor: alpha(theme.palette.background.paper, 0.8),
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ButtonGroup variant="outlined" sx={{ width: '100%' }}>
                    {['全部', '监管', '技术', '市场', '安全'].map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category.toLowerCase() ? 'contained' : 'outlined'}
                        onClick={() => setSelectedCategory(category.toLowerCase())}
                        sx={{ flex: 1 }}
                      >
                        {category}
                      </Button>
                    ))}
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        </Fade>

        {/* 主要内容区域 */}
        <Grid container spacing={3}>
          {/* 左侧新闻列表 */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={3}>
              {news.map((item, index) => (
                <Fade in timeout={1000 + index * 200} key={item.id}>
                  <Card sx={{
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                      border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`
                    },
                    animation: `${slideInAnimation} 0.6s ease-out ${index * 0.1}s both`
                  }}>
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', gap: 3 }}>
                        {/* 新闻图片 */}
                        <Box sx={{
                          width: 120,
                          height: 80,
                          borderRadius: 2,
                          background: `linear-gradient(45deg, ${getSentimentColor(item.sentiment)}, ${alpha(getSentimentColor(item.sentiment), 0.7)})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
                            {item.source.slice(0, 2).toUpperCase()}
                          </Typography>
                        </Box>

                        {/* 新闻内容 */}
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="h6" sx={{ 
                              fontWeight: 600, 
                              lineHeight: 1.3,
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {item.title}
                            </Typography>
                            <IconButton size="small">
                              <BookmarkBorder />
                            </IconButton>
                          </Box>

                          <Typography variant="body2" color="text.secondary" sx={{ 
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>
                            {item.summary}
                          </Typography>

                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Chip
                                label={item.category}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                                  color: theme.palette.primary.main
                                }}
                              />
                              <Chip
                                icon={<FiberManualRecord sx={{ fontSize: 8 }} />}
                                label={item.impact}
                                size="small"
                                sx={{ 
                                  bgcolor: alpha(getImpactColor(item.impact), 0.1),
                                  color: getImpactColor(item.impact)
                                }}
                              />
                            </Box>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <AccessTime sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {item.time}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <Visibility sx={{ fontSize: 16, color: 'text.secondary' }} />
                                <Typography variant="caption" color="text.secondary">
                                  {item.views}
                                </Typography>
                              </Box>
                              <IconButton size="small">
                                <Share sx={{ fontSize: 16 }} />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Stack>
          </Grid>

          {/* 右侧边栏 */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* 市场情绪 */}
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
                        市场情绪
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
                        极度乐观
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
                          <Typography variant="caption" color="text.secondary">利好</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#ff4757' }}>3</Typography>
                          <Typography variant="caption" color="text.secondary">利空</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={4}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography variant="h6" sx={{ color: '#a4b0be' }}>8</Typography>
                          <Typography variant="caption" color="text.secondary">中性</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Fade>

              {/* 热门标签 */}
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
                        热门话题
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
    </Box>
  );
};

export default NewsProfessional;
