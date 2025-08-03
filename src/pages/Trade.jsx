import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Grid, Typography, TextField, MenuItem, Button, Slider, Paper, Divider, Chip, Container, Card, CardContent, Avatar, IconButton, Tooltip, LinearProgress } from '@mui/material';
import { styled, useTheme, alpha, keyframes } from '@mui/system';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Timeline, ShowChart, Bolt, AutoGraph, CandlestickChart, Assessment, MonetizationOn, Speed, Security, FlashOn } from '@mui/icons-material';

// 🌟 震撼动画定义
const particleFloat = keyframes`
  0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0.7; }
  25% { transform: translateY(-20px) translateX(10px) rotate(90deg); opacity: 1; }
  50% { transform: translateY(-10px) translateX(-15px) rotate(180deg); opacity: 0.8; }
  75% { transform: translateY(-30px) translateX(5px) rotate(270deg); opacity: 0.9; }
`;

const neonGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 136, 0.3), 0 0 40px rgba(0, 255, 136, 0.1), inset 0 0 20px rgba(0, 255, 136, 0.1); }
  50% { box-shadow: 0 0 30px rgba(0, 255, 136, 0.6), 0 0 60px rgba(0, 255, 136, 0.2), inset 0 0 30px rgba(0, 255, 136, 0.2); }
`;

const priceFlicker = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const digitalPulse = keyframes`
  0%, 100% { border-color: rgba(0, 255, 136, 0.3); }
  50% { border-color: rgba(0, 255, 136, 0.8); }
`;

// 🎨 专业级背景容器
const TradingBackground = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: theme.palette.mode === 'dark' 
    ? `
      radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 60%, rgba(13, 110, 253, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(255, 193, 7, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f3460 100%)
    `
    : `
      radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 60%, rgba(13, 110, 253, 0.08) 0%, transparent 50%),
      linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #dee2e6 100%)
    `,
  backgroundSize: '400% 400%',
  animation: `${gradientShift} 20s ease infinite`,
  zIndex: -2,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: theme.palette.mode === 'dark'
      ? `radial-gradient(circle, rgba(0, 255, 136, 0.1) 1px, transparent 1px)`
      : `radial-gradient(circle, rgba(13, 110, 253, 0.05) 1px, transparent 1px)`,
    backgroundSize: '100px 100px',
    animation: `${particleFloat} 15s linear infinite`,
    opacity: 0.3,
  }
}));

// 💎 顶级玻璃态卡片
const TradingCard = styled(Card)(({ theme, variant = 'default' }) => ({
  position: 'relative',
  background: theme.palette.mode === 'dark' 
    ? `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.05) 0%, 
        rgba(255, 255, 255, 0.02) 50%, 
        rgba(0, 0, 0, 0.1) 100%)`
    : `linear-gradient(135deg, 
        rgba(255, 255, 255, 0.9) 0%, 
        rgba(255, 255, 255, 0.7) 50%, 
        rgba(255, 255, 255, 0.5) 100%)`,
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  boxShadow: theme.palette.mode === 'dark'
    ? `0 20px 40px rgba(0, 0, 0, 0.3), 
       0 10px 20px rgba(0, 0, 0, 0.2), 
       inset 0 1px 0 rgba(255, 255, 255, 0.1)`
    : `0 20px 40px rgba(0, 0, 0, 0.1), 
       0 10px 20px rgba(0, 0, 0, 0.05)`,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  
  // 变体样式
  ...(variant === 'buy' && {
    border: `1px solid ${alpha(theme.palette.success.main, 0.4)}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${theme.palette.success.main}, #00ff88)`,
      animation: `${neonGlow} 2s ease-in-out infinite`,
    }
  }),
  
  ...(variant === 'sell' && {
    border: `1px solid ${alpha(theme.palette.error.main, 0.4)}`,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: `linear-gradient(90deg, ${theme.palette.error.main}, #ff4757)`,
      animation: `${neonGlow} 2s ease-in-out infinite`,
    }
  }),
  
  ...(variant === 'orderbook' && {
    border: `1px solid ${alpha(theme.palette.info.main, 0.4)}`,
    animation: `${digitalPulse} 3s ease-in-out infinite`,
  }),
  
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: theme.palette.mode === 'dark'
      ? `0 25px 50px rgba(0, 0, 0, 0.4), 
         0 15px 30px rgba(0, 0, 0, 0.3), 
         inset 0 1px 0 rgba(255, 255, 255, 0.2)`
      : `0 25px 50px rgba(0, 0, 0, 0.15), 
         0 15px 30px rgba(0, 0, 0, 0.1)`,
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, 
      transparent 0%, 
      ${alpha(theme.palette.primary.main, 0.05)} 50%, 
      transparent 100%)`,
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  
  '&:hover::after': {
    opacity: 1,
  }
}));

// 🔥 专业交易按钮
const TradingButton = styled(Button)(({ theme, variant, tradetype }) => ({
  position: 'relative',
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '1.1rem',
  fontWeight: 700,
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  
  ...(tradetype === 'buy' && {
    background: `linear-gradient(135deg, #00ff88 0%, #00d26a 100%)`,
    color: '#000',
    boxShadow: `0 8px 32px rgba(0, 255, 136, 0.4)`,
    '&:hover': {
      background: `linear-gradient(135deg, #00d26a 0%, #00ff88 100%)`,
      boxShadow: `0 12px 40px rgba(0, 255, 136, 0.6)`,
      transform: 'translateY(-2px) scale(1.05)',
    }
  }),
  
  ...(tradetype === 'sell' && {
    background: `linear-gradient(135deg, #ff4757 0%, #ff3742 100%)`,
    color: '#fff',
    boxShadow: `0 8px 32px rgba(255, 71, 87, 0.4)`,
    '&:hover': {
      background: `linear-gradient(135deg, #ff3742 0%, #ff4757 100%)`,
      boxShadow: `0 12px 40px rgba(255, 71, 87, 0.6)`,
      transform: 'translateY(-2px) scale(1.05)',
    }
  }),
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
    transition: 'left 0.5s ease',
  },
  
  '&:hover::before': {
    left: '100%',
  }
}));

// 💰 专业价格显示
const PriceDisplay = styled(Typography)(({ theme, pricetype }) => ({
  fontFamily: '"JetBrains Mono", "Roboto Mono", monospace',
  fontWeight: 700,
  fontSize: '1.2rem',
  padding: '8px 16px',
  borderRadius: '12px',
  display: 'inline-block',
  position: 'relative',
  
  ...(pricetype === 'buy' && {
    color: theme.palette.success.main,
    background: `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)} 0%, ${alpha(theme.palette.success.main, 0.05)} 100%)`,
    animation: `${priceFlicker} 2s ease-in-out infinite`,
  }),
  
  ...(pricetype === 'sell' && {
    color: theme.palette.error.main,
    background: `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)} 0%, ${alpha(theme.palette.error.main, 0.05)} 100%)`,
    animation: `${priceFlicker} 2s ease-in-out infinite`,
  }),
  
  '&::before': {
    content: '"$"',
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontSize: '0.9em',
    opacity: 0.7,
  }
}));

// 📊 专业数据行
const DataRow = styled(Box)(({ theme, side }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  padding: '8px 16px',
  borderRadius: '8px',
  position: 'relative',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.1),
    transform: 'scale(1.02)',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '4px',
    background: side === 'buy' ? theme.palette.success.main : theme.palette.error.main,
    opacity: 0.7,
    borderRadius: '0 4px 4px 0',
  }
}));

// Mock数据生成 - 更真实的交易数据
const generateMockTrades = () => {
  const basePrice = 63500;
  const traders = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  
  return Array.from({ length: 20 }, (_, i) => {
    const priceVariation = (Math.random() - 0.5) * 1000; // ±500价格变动
    const isBuy = Math.random() > 0.5;
    const amount = (Math.random() * 2 + 0.1).toFixed(4);
    const price = (basePrice + priceVariation).toFixed(2);
    
    return {
      id: `trade-${i}`,
      type: isBuy ? 'BUY' : 'SELL',
      symbol: 'BTC/USDT',
      price: price,
      amount: amount,
      total: (parseFloat(price) * parseFloat(amount)).toFixed(2),
      time: new Date(Date.now() - Math.random() * 3600000).toLocaleTimeString(),
      trader: traders[Math.floor(Math.random() * traders.length)],
      status: 'completed'
    };
  });
};

// Mock订单簿数据
const generateOrderBookData = () => {
  const basePrice = 63500;
  const bids = Array.from({ length: 10 }, (_, i) => ({
    price: (basePrice - (i + 1) * Math.random() * 50).toFixed(2),
    amount: (Math.random() * 5 + 0.1).toFixed(4),
    total: 0
  }));
  
  const asks = Array.from({ length: 10 }, (_, i) => ({
    price: (basePrice + (i + 1) * Math.random() * 50).toFixed(2),
    amount: (Math.random() * 5 + 0.1).toFixed(4),
    total: 0
  }));
  
  // 计算累计总额
  bids.forEach((bid, i) => {
    bid.total = bids.slice(0, i + 1).reduce((sum, b) => sum + parseFloat(b.amount), 0).toFixed(4);
  });
  
  asks.forEach((ask, i) => {
    ask.total = asks.slice(0, i + 1).reduce((sum, a) => sum + parseFloat(a.amount), 0).toFixed(4);
  });
  
  return { bids, asks };
};

// 主要组件开始
const Trade = () => {
  const theme = useTheme();
  const [tradeType, setTradeType] = useState('buy');
  const [price, setPrice] = useState('');
  const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState(0);
  const [trades, setTrades] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [currentPrice, setCurrentPrice] = useState(63500.50);
  const [priceChange, setPriceChange] = useState(2.4);
  const [loading, setLoading] = useState(false);

  // 初始化数据
  useEffect(() => {
    const mockTrades = generateMockTrades();
    const mockOrderBook = generateOrderBookData();
    setTrades(mockTrades);
    setOrderBook(mockOrderBook);
  }, []);

  // 计算总价
  const total = price && amount ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : '0.00';

  // 处理交易提交
  const handleCreateTrade = async () => {
    if (!price || !amount) return;
    
    setLoading(true);
    
    // 模拟API调用
    setTimeout(() => {
      const newTrade = {
        id: `trade-${Date.now()}`,
        type: tradeType.toUpperCase(),
        symbol: 'BTC/USDT',
        price: price,
        amount: amount,
        total: total,
        time: new Date().toLocaleTimeString(),
        trader: 'You',
        status: 'completed'
      };
      
      setTrades(prev => [newTrade, ...prev.slice(0, 19)]);
      setPrice('');
      setAmount('');
      setPercentage(0);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <TradingBackground />
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* 🔥 超炫酷顶部价格横幅 */}
        <TradingCard variant="orderbook" sx={{ mb: 4, overflow: 'visible' }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              {/* 主要价格显示 */}
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: alpha(theme.palette.warning.main, 0.2), 
                    color: theme.palette.warning.main,
                    width: 56, 
                    height: 56 
                  }}>
                    <MonetizationOn fontSize="large" />
                  </Avatar>
                  <Box>
                    <Typography variant="h3" sx={{ 
                      fontFamily: '"JetBrains Mono", monospace',
                      fontWeight: 900,
                      background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.primary.main})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 0.5
                    }}>
                      ${currentPrice.toLocaleString()}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} />
                      <Typography variant="h6" sx={{ 
                        color: theme.palette.success.main, 
                        fontWeight: 700 
                      }}>
                        +{priceChange}%
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              
              {/* 交易对信息 */}
              <Grid item xs={12} md={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Chip
                    label="BTC/USDT"
                    size="large"
                    sx={{
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      padding: '12px 24px',
                      background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      color: '#fff',
                      boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`,
                      animation: `${neonGlow} 2s ease-in-out infinite`,
                    }}
                    icon={<CandlestickChart />}
                  />
                </Box>
              </Grid>
              
              {/* 市场统计 */}
              <Grid item xs={12} md={4}>
                <Grid container spacing={2}>
                  {[
                    { label: '24h Vol', value: '2.4B', icon: <Assessment />, color: 'info' },
                    { label: '24h High', value: '65,250', icon: <TrendingUpIcon />, color: 'success' },
                    { label: '24h Low', value: '62,180', icon: <TrendingDownIcon />, color: 'error' }
                  ].map((stat, index) => (
                    <Grid item xs={4} key={index}>
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ 
                          color: theme.palette[stat.color].main, 
                          mb: 0.5,
                          display: 'flex',
                          justifyContent: 'center'
                        }}>
                          {stat.icon}
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                          {stat.label}
                        </Typography>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </TradingCard>

        {/* 主要交易界面 */}
        <Grid container spacing={4}>
          {/* 左侧：交易操作面板 */}
          <Grid item xs={12} lg={4}>
            <TradingCard variant={tradeType} sx={{ height: 'fit-content' }}>
              <CardContent sx={{ p: 4 }}>
                {/* 买卖切换标签 */}
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ 
                    display: 'flex', 
                    p: 1, 
                    borderRadius: '16px',
                    background: alpha(theme.palette.background.paper, 0.5),
                    border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                  }}>
                    {['buy', 'sell'].map((type) => (
                      <Button
                        key={type}
                        fullWidth
                        variant={tradeType === type ? 'contained' : 'text'}
                        onClick={() => setTradeType(type)}
                        sx={{
                          borderRadius: '12px',
                          py: 1.5,
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          textTransform: 'capitalize',
                          ...(tradeType === type && {
                            background: type === 'buy' 
                              ? `linear-gradient(135deg, #00ff88, #00d26a)`
                              : `linear-gradient(135deg, #ff4757, #ff3742)`,
                            color: type === 'buy' ? '#000' : '#fff',
                            boxShadow: `0 8px 24px ${alpha(
                              type === 'buy' ? theme.palette.success.main : theme.palette.error.main, 
                              0.4
                            )}`,
                          })
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {type === 'buy' ? <TrendingUpIcon /> : <TrendingDownIcon />}
                          {type}
                        </Box>
                      </Button>
                    ))}
                  </Box>
                </Box>

                {/* 价格输入 */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Price (USDT)
                  </Typography>
                  <TextField
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Market Price"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontFamily: 'monospace',
                        background: alpha(theme.palette.background.paper, 0.5),
                        '&:hover': {
                          boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }
                      }
                    }}
                  />
                </Box>

                {/* 数量输入 */}
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Amount (BTC)
                  </Typography>
                  <TextField
                    fullWidth
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00000000"
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        fontFamily: 'monospace',
                        background: alpha(theme.palette.background.paper, 0.5),
                        '&:hover': {
                          boxShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.2)}`,
                        },
                        '&.Mui-focused': {
                          boxShadow: `0 0 30px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }
                      }
                    }}
                  />
                </Box>

                {/* 百分比滑块 */}
                <Box sx={{ mb: 4 }}>
                  <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                    Percentage
                  </Typography>
                  <Slider
                    value={percentage}
                    onChange={(e, value) => setPercentage(value)}
                    min={0}
                    max={100}
                    step={25}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 25, label: '25%' },
                      { value: 50, label: '50%' },
                      { value: 75, label: '75%' },
                      { value: 100, label: '100%' }
                    ]}
                    sx={{
                      color: tradeType === 'buy' ? theme.palette.success.main : theme.palette.error.main,
                      height: 8,
                      '& .MuiSlider-thumb': {
                        width: 24,
                        height: 24,
                        boxShadow: `0 0 20px ${alpha(
                          tradeType === 'buy' ? theme.palette.success.main : theme.palette.error.main, 
                          0.5
                        )}`,
                      },
                      '& .MuiSlider-track': {
                        height: 8,
                        borderRadius: 4,
                      },
                      '& .MuiSlider-rail': {
                        height: 8,
                        borderRadius: 4,
                        opacity: 0.3,
                      }
                    }}
                  />
                </Box>

                {/* 总计显示 */}
                <Box sx={{ 
                  mb: 4, 
                  p: 3, 
                  borderRadius: '16px',
                  background: alpha(theme.palette.background.paper, 0.3),
                  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Total
                  </Typography>
                  <Typography variant="h5" sx={{ 
                    fontFamily: 'monospace', 
                    fontWeight: 700,
                    color: tradeType === 'buy' ? theme.palette.success.main : theme.palette.error.main
                  }}>
                    {total} USDT
                  </Typography>
                </Box>

                {/* 交易按钮 */}
                <TradingButton
                  fullWidth
                  tradetype={tradeType}
                  onClick={handleCreateTrade}
                  disabled={loading || !price || !amount}
                  sx={{ py: 2 }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <LinearProgress sx={{ width: 100, borderRadius: 2 }} />
                      Processing...
                    </Box>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Bolt />
                      {tradeType === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                    </Box>
                  )}
                </TradingButton>
              </CardContent>
            </TradingCard>
          </Grid>

          {/* 中间：订单簿 */}
          <Grid item xs={12} lg={4}>
            <TradingCard variant="orderbook">
              <CardContent sx={{ p: 4, height: '700px', display: 'flex', flexDirection: 'column' }}>
                {/* 标题 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(theme.palette.info.main, 0.2), 
                      color: theme.palette.info.main 
                    }}>
                      <ShowChart />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Order Book
                    </Typography>
                  </Box>
                  <Chip label="BTC/USDT" size="small" variant="outlined" />
                </Box>

                {/* 表头 */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: 2,
                  mb: 2,
                  p: 2,
                  borderRadius: '8px',
                  background: alpha(theme.palette.background.paper, 0.3)
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'left' }}>
                    Price (USDT)
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'center' }}>
                    Amount (BTC)
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, textAlign: 'right' }}>
                    Total
                  </Typography>
                </Box>

                {/* 卖单 (红色) */}
                <Box sx={{ flex: 1, overflowY: 'auto', mb: 2 }}>
                  {orderBook.asks.slice(0, 8).reverse().map((ask, index) => (
                    <DataRow key={`ask-${index}`} side="sell">
                      <PriceDisplay pricetype="sell" variant="body2">
                        {parseFloat(ask.price).toFixed(2)}
                      </PriceDisplay>
                      <Typography variant="body2" sx={{ 
                        textAlign: 'center', 
                        fontFamily: 'monospace',
                        fontWeight: 600 
                      }}>
                        {ask.amount}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        textAlign: 'right', 
                        fontFamily: 'monospace',
                        color: 'text.secondary' 
                      }}>
                        {ask.total}
                      </Typography>
                    </DataRow>
                  ))}
                </Box>

                {/* 中间价格 */}
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 2, 
                  mb: 2,
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
                }}>
                  <Typography variant="h5" sx={{ 
                    fontFamily: 'monospace', 
                    fontWeight: 900,
                    color: theme.palette.primary.main,
                    animation: `${priceFlicker} 2s ease-in-out infinite`
                  }}>
                    {currentPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Last Price
                  </Typography>
                </Box>

                {/* 买单 (绿色) */}
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                  {orderBook.bids.slice(0, 8).map((bid, index) => (
                    <DataRow key={`bid-${index}`} side="buy">
                      <PriceDisplay pricetype="buy" variant="body2">
                        {parseFloat(bid.price).toFixed(2)}
                      </PriceDisplay>
                      <Typography variant="body2" sx={{ 
                        textAlign: 'center', 
                        fontFamily: 'monospace',
                        fontWeight: 600 
                      }}>
                        {bid.amount}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        textAlign: 'right', 
                        fontFamily: 'monospace',
                        color: 'text.secondary' 
                      }}>
                        {bid.total}
                      </Typography>
                    </DataRow>
                  ))}
                </Box>
              </CardContent>
            </TradingCard>
          </Grid>

          {/* 右侧：最近交易 */}
          <Grid item xs={12} lg={4}>
            <TradingCard>
              <CardContent sx={{ p: 4, height: '700px', display: 'flex', flexDirection: 'column' }}>
                {/* 标题 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: alpha(theme.palette.warning.main, 0.2), 
                      color: theme.palette.warning.main 
                    }}>
                      <Timeline />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Recent Trades
                    </Typography>
                  </Box>
                  <Chip 
                    label={`${trades.length} trades`} 
                    size="small" 
                    variant="outlined"
                    sx={{ fontFamily: 'monospace' }}
                  />
                </Box>

                {/* 表头 */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '80px 1fr 80px 60px',
                  gap: 1,
                  mb: 2,
                  p: 2,
                  borderRadius: '8px',
                  background: alpha(theme.palette.background.paper, 0.3)
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Price</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Amount</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Time</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>Type</Typography>
                </Box>

                {/* 交易列表 */}
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                  {trades.map((trade) => (
                    <Box
                      key={trade.id}
                      sx={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr 80px 60px',
                        gap: 1,
                        p: 2,
                        mb: 1,
                        borderRadius: '8px',
                        background: alpha(
                          trade.type === 'BUY' ? theme.palette.success.main : theme.palette.error.main, 
                          0.05
                        ),
                        border: `1px solid ${alpha(
                          trade.type === 'BUY' ? theme.palette.success.main : theme.palette.error.main, 
                          0.1
                        )}`,
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          background: alpha(
                            trade.type === 'BUY' ? theme.palette.success.main : theme.palette.error.main, 
                            0.1
                          ),
                          transform: 'scale(1.02)',
                        }
                      }}
                    >
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontWeight: 600,
                          color: trade.type === 'BUY' ? theme.palette.success.main : theme.palette.error.main
                        }}
                      >
                        {parseFloat(trade.price).toFixed(2)}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontFamily: 'monospace',
                          fontSize: '0.85rem'
                        }}
                      >
                        {trade.amount}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ fontFamily: 'monospace' }}
                      >
                        {trade.time}
                      </Typography>
                      <Chip
                        label={trade.type}
                        size="small"
                        sx={{
                          fontSize: '0.7rem',
                          height: 20,
                          background: trade.type === 'BUY' 
                            ? alpha(theme.palette.success.main, 0.2)
                            : alpha(theme.palette.error.main, 0.2),
                          color: trade.type === 'BUY' ? theme.palette.success.main : theme.palette.error.main,
                          fontWeight: 700
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </TradingCard>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Trade;