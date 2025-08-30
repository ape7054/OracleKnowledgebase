import { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  useTheme,
  Chip,
  useMediaQuery,
  Divider,
  ButtonGroup,
  Button,
  Container,
  LinearProgress,
  IconButton,
  Stack,
  Fade
} from '@mui/material';
import {
  AccountBalanceWalletOutlined as AccountBalanceWalletOutlinedIcon,
  TrendingUp as TrendingUpIcon,
  ShowChartOutlined as ShowChartOutlinedIcon,
  BarChartOutlined as BarChartOutlinedIcon,
  Insights as InsightsIcon,
  Verified,
  Speed,
  Refresh,
  Settings,
  Assessment
} from '@mui/icons-material';
import { styled, alpha, keyframes } from '@mui/system';

// Import refactored components
import {
  PremiumCard,
  GlassmorphicPaper,
  SentimentGauge,
  SocialMentions,
  TrendIndicator,
  MarketTableView,
  MarketCardView,
  CoinIcon
} from '../components/dashboard';

// Import custom hooks
import { useMarketData, useOhlcData } from '../hooks';

// Import existing components
import { TradingViewChart } from '../components/TradingViewChart';
import LoadingScreen from '../components/LoadingScreen';

// 动画定义
const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
  50% { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

function Dashboard() {
  const theme = useTheme();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [timeframe, setTimeframe] = useState('7d');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 使用自定义hooks
  const {
    marketData,
    marketSummary,
    initialLoading,
    isRefreshing,
    error,
    lastUpdated,
    fetchMarketData
  } = useMarketData();

  const { ohlcData, ohlcLoading } = useOhlcData(selectedCoin, timeframe);

  // 币种主题色
  const coinAccent = useMemo(() => ({
    BTC: '#f7931a',
    ETH: '#627eea',
    SOL: '#14f195'
  }[selectedCoin] || theme.palette.primary.main), [selectedCoin, theme.palette.primary.main]);

  // 统计数据配置
  const stats = [
    { 
      title: "Total Market Cap", 
      value: marketSummary.totalMarketCap, 
      icon: <AccountBalanceWalletOutlinedIcon sx={{ color: theme.palette.primary.main }} />, 
      color: theme.palette.primary.main 
    },
    { 
      title: "24h Volume", 
      value: marketSummary.dailyVolume, 
      icon: <TrendingUpIcon sx={{ color: theme.palette.success.main }} />, 
      color: theme.palette.success.main 
    },
    { 
      title: "BTC Dominance", 
      value: marketSummary.btcDominance, 
      icon: <ShowChartOutlinedIcon sx={{ color: theme.palette.info.main }} />, 
      color: theme.palette.info.main 
    },
    { 
      title: "ETH Dominance", 
      value: marketSummary.ethDominance, 
      icon: <BarChartOutlinedIcon sx={{ color: theme.palette.warning.main }} />, 
      color: theme.palette.warning.main 
    },
  ];

  // 显示加载状态
  if (initialLoading) {
    return (
      <LoadingScreen 
        title="正在加载市场数据"
        subtitle="连接全球交易所，获取实时价格信息"
        icon={Assessment}
      />
    );
  }

  // 显示错误状态
  if (error && marketData.length === 0) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Typography variant="h6" color="error.main">
          {error}
        </Typography>
        <Button
          variant="contained"
          onClick={() => fetchMarketData(true)}
          sx={{ mt: 2 }}
        >
          Retry
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'radial-gradient(ellipse at top, rgba(102, 126, 234, 0.1) 0%, rgba(15, 23, 42, 0.9) 50%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.08) 0%, rgba(255, 255, 255, 0.9) 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* 动态背景元素 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.palette.primary.main.slice(1)}' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        animation: `${float} 20s ease-in-out infinite`
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* 全局样式 */}
        <style jsx global>{`
          button:focus, [role="button"]:focus, .MuiButtonBase-root:focus {
            outline: none !important;
            box-shadow: none !important;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .asset-icon {
            background: transparent !important;
          }
          .asset-icon img {
            filter: none !important;
            border-radius: 50% !important;
            object-fit: cover !important;
          }
        `}</style>

        {/* 高级头部区域 */}
        <Fade in timeout={1000}>
          <Box sx={{ mb: 6 }}>
            {/* 主标题区域 */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              mb: 4
            }}>
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 1,
                    letterSpacing: '-0.02em'
                  }}
                >
                  Trading Command Center
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 400,
                    mb: 2
                  }}
                >
                  Real-time market intelligence • Advanced analytics • Professional insights
                </Typography>

                {/* 状态指示器 */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Chip
                    icon={<Verified sx={{ fontSize: 16 }} />}
                    label="Live Data"
                    sx={{
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      fontWeight: 600,
                      animation: `${pulse} 2s ease-in-out infinite`
                    }}
                  />
                  <Chip
                    icon={<Speed sx={{ fontSize: 16 }} />}
                    label="Ultra-Low Latency"
                    variant="outlined"
                    sx={{
                      borderColor: theme.palette.primary.main,
                      color: theme.palette.primary.main
                    }}
                  />
                  {lastUpdated && (
                    <Chip
                      label={`Updated: ${lastUpdated.toLocaleTimeString()}`}
                      size="small"
                      variant="outlined"
                      sx={{
                        borderColor: alpha(theme.palette.text.secondary, 0.3),
                        color: theme.palette.text.secondary,
                        fontSize: '0.75rem'
                      }}
                    />
                  )}
                </Stack>
              </Box>

              {/* 右侧操作按钮 */}
              <Stack direction="row" spacing={2}>
                <IconButton
                  onClick={() => fetchMarketData(true)}
                  disabled={isRefreshing || initialLoading}
                  sx={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                    },
                    '&:disabled': {
                      opacity: 0.5
                    }
                  }}
                  title="强制刷新数据（清除缓存）"
                >
                  <Refresh sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />
                </IconButton>
                <IconButton
                  sx={{
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(102, 126, 234, 0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                    }
                  }}
                >
                  <Settings />
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Fade>
      
        {/* 高级统计卡片网格 */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <PremiumCard
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                color={stat.color}
                trend={index === 1 ? '+12.5%' : index === 2 ? '+8.3%' : undefined}
                subtitle={index === 0 ? 'Last 24h' : index === 3 ? 'vs competitors' : undefined}
              />
            </Grid>
          ))}
        </Grid>

        {/* 主要内容网格 */}
        <Grid container spacing={4}>
          {/* Market Sentiment Indicators Row */}
          <Grid item xs={12}>
          <Box sx={{ 
            mt: 3, 
            mb: 2, 
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            py: 1.5,
            px: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}>
            <Box
              sx={{
                width: 4,
                height: 24,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
                mr: 1.5,
              }}
            />
            <InsightsIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Market Sentiment Indicators
          </Typography>
          </Box>
        </Grid>
        
        {/* Fear & Greed Index */}
        <Grid item xs={12} md={4}>
          <GlassmorphicPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box 
                  sx={{ 
                    width: 10, 
                    height: 10, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #FF4842, #FF847C)',
                    boxShadow: '0 0 8px rgba(255,72,66,0.5)' 
                  }}
                />
                Fear & Greed Index
              </Typography>
              <Chip 
                label="LIVE" 
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.mode === 'dark' ? alpha('#4caf50', 0.15) : alpha('#4caf50', 0.1),
                  color: theme.palette.success.main,
                  height: '24px',
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <SentimentGauge value={72} size={240} />
            </Box>
          </GlassmorphicPaper>
        </Grid>
        
        {/* Social Media Sentiment */}
        <Grid item xs={12} md={4}>
          <GlassmorphicPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box 
                  sx={{ 
                    width: 10, 
                    height: 10, 
                    borderRadius: '50%', 
                    background: 'linear-gradient(135deg, #1DA1F2, #76C4FF)',
                    boxShadow: '0 0 8px rgba(29,161,242,0.5)' 
                  }}
                />
                BTC Social Media Mentions
              </Typography>
              <TrendIndicator direction="up" strength="Moderate" />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <SocialMentions />
          </GlassmorphicPaper>
        </Grid>
        
        {/* On-Chain Activity */}
        <Grid item xs={12} md={4}>
          <GlassmorphicPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                On-Chain Activity
              </Typography>
              <Chip 
                label="Last updated: 10 min ago"
                size="small"
                sx={{ 
                  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                  height: '24px'
                }}
              />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Network Hashrate</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: '1rem' }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>347 EH/s</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Exchange Outflows</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: '1rem' }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>+2,450 BTC</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Active Addresses</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                    <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: '1rem' }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>1.2M</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">Miner Revenue</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                  <TrendingUpIcon sx={{ color: theme.palette.success.main, mr: 0.5, fontSize: '1rem' }} />
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>$28.5M</Typography>
                </Box>
              </Grid>
            </Grid>
          </GlassmorphicPaper>
        </Grid>
        
        {/* Price Chart */}
        <Grid item xs={12}>
          <Box sx={{ 
            mt: 3, 
            mb: 2, 
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            background: theme.palette.mode === 'dark' 
              ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.4)})`
              : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.6)})`,
            backdropFilter: 'blur(20px)',
            borderRadius: 3,
            py: 2,
            px: 3,
            border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
            boxShadow: theme.palette.mode === 'dark'
              ? `0 8px 32px ${alpha(theme.palette.common.black, 0.3)}`
              : `0 8px 32px ${alpha(theme.palette.common.black, 0.1)}`,
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              background: `linear-gradient(90deg, 
                ${alpha(theme.palette.primary.main, 0.2)}, 
                ${theme.palette.primary.main}, 
                ${alpha(theme.palette.secondary.main, 0.6)}, 
                ${alpha(theme.palette.primary.main, 0.2)}
              )`,
            }
          }}>
            <Box
              sx={{
                width: 5,
                height: 32,
                background: `linear-gradient(145deg, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main}, 
                  ${alpha(theme.palette.primary.light, 0.8)}
                )`,
                borderRadius: '4px',
                mr: 2,
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            />
            <Box
              sx={{
                p: 1,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.05)})`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                mr: 2,
              }}
            >
              <BarChartOutlinedIcon sx={{ 
                color: theme.palette.primary.main,
                fontSize: '1.2rem',
              }} />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, 
                  ${theme.palette.text.primary}, 
                  ${theme.palette.primary.main}, 
                  ${theme.palette.secondary.main}
                )`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                textShadow: 'none',
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
            }}>
              Price Trends
          </Typography>
              <Typography variant="caption" sx={{
                color: alpha(theme.palette.text.secondary, 0.8),
                fontWeight: 500,
                mt: 0.5,
                display: 'block',
              }}>
                Real-time market analysis
          </Typography>
            </Box>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <GlassmorphicPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <ButtonGroup 
                variant="outlined" 
                size="small" 
                aria-label="coin selector"
                sx={{
                  borderRadius: '999px',
                  overflow: 'hidden',
                  p: 0.25,
                  background: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.6) : alpha('#ffffff', 0.8),
                  '& .MuiButton-root': {
                    border: 'none',
                    borderRadius: '999px',
                    px: 1.5,
                    py: 0.75,
                    textTransform: 'none',
                    fontWeight: 700,
                    color: theme.palette.text.secondary,
                    backgroundColor: 'transparent',
                    transition: 'all .2s ease',
                    '&:hover': { backgroundColor: alpha(coinAccent, 0.08) }
                  },
                  '& .MuiButton-root.Mui-selected': {
                    color: '#0e1116',
                    background: `linear-gradient(135deg, ${alpha(coinAccent, 0.95)}, ${alpha(coinAccent, 0.75)})`,
                    boxShadow: `0 4px 16px ${alpha(coinAccent, 0.35)}`,
                  }
                }}
              >
                  <Button 
                    onClick={() => setSelectedCoin('BTC')} 
                    className={selectedCoin === 'BTC' ? 'Mui-selected' : ''} 
                    startIcon={<Box sx={{ width: 18, height: 18 }}><CoinIcon symbol="BTC" /></Box>}
                  >
                    BTC
                  </Button>
                  <Button 
                    onClick={() => setSelectedCoin('ETH')} 
                    className={selectedCoin === 'ETH' ? 'Mui-selected' : ''} 
                    startIcon={<Box sx={{ width: 18, height: 18 }}><CoinIcon symbol="ETH" /></Box>}
                  >
                    ETH
                  </Button>
                  <Button 
                    onClick={() => setSelectedCoin('SOL')} 
                    className={selectedCoin === 'SOL' ? 'Mui-selected' : ''} 
                    startIcon={<Box sx={{ width: 18, height: 18 }}><CoinIcon symbol="SOL" /></Box>}
                  >
                    SOL
                  </Button>
                </ButtonGroup>
              
              <Box sx={{ flex: 1 }} />
              
              <ButtonGroup 
                variant="outlined" 
                size="small" 
                aria-label="timeframe selector"
                sx={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  '& .MuiButton-root': {
                    borderRadius: 0,
                    py: 1,
                    borderColor: theme.palette.mode === 'dark' 
                      ? alpha(theme.palette.primary.main, 0.5)
                      : alpha(theme.palette.grey[400], 0.5),
                    fontWeight: 600,
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.text.primary
                      : theme.palette.text.secondary,
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.background.paper, 0.6)
                      : alpha(theme.palette.background.paper, 0.8),
                    transition: 'all .2s ease',
                  },
                  '& .MuiButton-root.Mui-selected': {
                    background: `linear-gradient(135deg, ${alpha(coinAccent, 0.9)}, ${alpha(coinAccent, 0.7)})`,
                    color: '#0e1116',
                    fontWeight: 800,
                    borderColor: 'transparent',
                    boxShadow: `0 6px 14px ${alpha(coinAccent, 0.35)}`,
                  }
                }}
              >
                <Button 
                  onClick={() => setTimeframe('1d')}
                  className={timeframe === '1d' ? 'Mui-selected' : ''}
                  disabled={ohlcLoading}
                >
                  24H
                </Button>
                <Button 
                  onClick={() => setTimeframe('7d')}
                  className={timeframe === '7d' ? 'Mui-selected' : ''}
                  disabled={ohlcLoading}
                >
                  7D
                </Button>
                <Button 
                  onClick={() => setTimeframe('30d')}
                  className={timeframe === '30d' ? 'Mui-selected' : ''}
                  disabled={ohlcLoading}
                >
                  30D
                </Button>
              </ButtonGroup>
            </Box>
              
              {/* 图表区域 */}
            <Box 
              height={isMobile ? 350 : 450}
              sx={{
                position: 'relative',
                borderRadius: 3,
                overflow: 'hidden',
                background: `linear-gradient(135deg, ${alpha(coinAccent, 0.05)}, ${alpha(theme.palette.background.paper, 0.06)})`,
                border: `1px solid ${alpha(coinAccent, 0.15)}`,
                boxShadow: `inset 0 0 0 1px ${alpha('#ffffff', 0.02)}, 0 10px 30px ${alpha(coinAccent, 0.12)}`,
              }}
            >
              {ohlcLoading && (
                  <LinearProgress sx={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    height: 3, 
                    borderRadius: 0, 
                    zIndex: 2, 
                    '& .MuiLinearProgress-bar': { backgroundColor: coinAccent } 
                  }} />
                )}
                <TradingViewChart 
                  data={ohlcData} 
                  colors={{
                backgroundColor: 'transparent',
                textColor: theme.palette.text.primary,
                lineColor: coinAccent,
                areaTopColor: alpha(coinAccent, 0.85),
                areaBottomColor: alpha(coinAccent, 0.12),
                  }}
                />
            </Box>
          </GlassmorphicPaper>
        </Grid>
        
        {/* Market Overview */}
        <Grid item xs={12}>
          <Box sx={{ 
            mt: 3, 
            mb: 2, 
            display: 'flex',
            alignItems: 'center',
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            py: 1.5,
            px: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}>
            <Box
              sx={{
                width: 4,
                height: 24,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
                mr: 1.5,
              }}
            />
            <BarChartOutlinedIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Market Overview
          </Typography>
          </Box>
        </Grid>
        
        <Grid item xs={12}>
          <GlassmorphicPaper>
              {isMobile ? 
                <MarketCardView 
                  marketData={marketData}
                  error={error}
                  fetchMarketData={fetchMarketData}
                  isRefreshing={isRefreshing}
                /> : 
                <MarketTableView 
                  marketData={marketData}
                  error={error}
                  fetchMarketData={fetchMarketData}
                  isRefreshing={isRefreshing}
                  initialLoading={initialLoading}
                />
              }
          </GlassmorphicPaper>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 