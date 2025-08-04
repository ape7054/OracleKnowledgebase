import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Box, Grid, Typography, Button, Slider, Container, Card, CardContent, Avatar, Chip, InputBase, CircularProgress } from '@mui/material';
import { styled, useTheme, alpha, keyframes } from '@mui/system';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { Timeline, ShowChart, Bolt, AutoGraph, CandlestickChart, Assessment, MonetizationOn, Speed, Security, FlashOn } from '@mui/icons-material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { toast } from 'react-hot-toast';
import { createTrade, getRecentTrades } from '../services/tradeService';
import { useAuth } from '../context/AuthContext';


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
    // 为交易表单区域允许滚动，其他区域保持隐藏
    overflow: variant === 'default' ? 'visible' : 'hidden',
    ...(variant === 'buy' && {
        border: `1px solid ${alpha(theme.palette.success.main, 0.4)}`,
        '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${theme.palette.success.main}, #00ff88)`, animation: `${neonGlow} 2s ease-in-out infinite` }
    }),
    ...(variant === 'sell' && {
        border: `1px solid ${alpha(theme.palette.error.main, 0.4)}`,
        '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: `linear-gradient(90deg, ${theme.palette.error.main}, #ff4757)`, animation: `${neonGlow} 2s ease-in-out infinite` }
    }),
    ...(variant === 'orderbook' && {
        border: `1px solid ${alpha(theme.palette.info.main, 0.4)}`,
        animation: `${digitalPulse} 3s ease-in-out infinite`,
    }),
    '&:hover': {
        transform: 'translateY(-4px) scale(1.02)',
        boxShadow: theme.palette.mode === 'dark'
            ? `0 25px 50px rgba(0, 0, 0, 0.4), 0 15px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`
            : `0 25px 50px rgba(0, 0, 0, 0.15), 0 15px 30px rgba(0, 0, 0, 0.1)`,
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        background: `linear-gradient(135deg, transparent 0%, ${alpha(theme.palette.primary.main, 0.05)} 50%, transparent 100%)`,
        opacity: 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: 'none',
    },
    '&:hover::after': {
    opacity: 1,
    }
}));


// --- 新的、干净的交易界面组件 ---

const TabButton = styled(Button)(({ theme, selected, type }) => ({
  flex: 1,
  padding: '12px 0',
  borderRadius: '12px',
  transition: 'all 0.3s ease-in-out',
  fontWeight: 700,
  fontSize: '1rem',
  border: '2px solid transparent',
  color: theme.palette.text.secondary,
  background: 'transparent',
        position: 'relative',
  overflow: 'hidden',
  zIndex: 1,
  
  ...(selected && type === 'buy' && {
    color: '#fff',
    background: `linear-gradient(135deg, ${alpha('#00ff88', 0.9)} 0%, ${alpha('#00d26a', 0.9)} 100%)`,
    boxShadow: `0 4px 20px ${alpha('#00ff88', 0.4)}`,
    border: `2px solid ${alpha('#00ff88', 0.7)}`,
  }),

  ...(selected && type === 'sell' && {
            color: '#fff',
    background: `linear-gradient(135deg, ${alpha('#ff4d6d', 0.9)} 0%, ${alpha('#d90429', 0.9)} 100%)`,
    boxShadow: `0 4px 20px ${alpha('#ff4d6d', 0.4)}`,
    border: `2px solid ${alpha('#ff4d6d', 0.7)}`,
  }),
  
  ...(!selected && {
    background: alpha(theme.palette.grey[800], 0.3),
    border: `2px solid ${alpha(theme.palette.grey[700], 0.5)}`,
    '&:hover': {
      background: alpha(theme.palette.grey[800], 0.7),
      borderColor: alpha(theme.palette.grey[500], 0.8),
        color: theme.palette.text.primary,
    },
  }),
}));

const SliderBar = styled(Slider)(({ theme, tradetype }) => ({
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    background: tradetype === 'buy' 
      ? 'linear-gradient(90deg, #00ff88, #00d26a)'
      : 'linear-gradient(90deg, #ff4d6d, #d90429)',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: `3px solid ${tradetype === 'buy' ? '#00d26a' : '#d90429'}`,
    boxShadow: `0 0 12px 0 ${tradetype === 'buy' ? alpha('#00ff88', 0.7) : alpha('#ff4d6d', 0.7)}`,
  },
  '& .MuiSlider-rail': {
    opacity: 0.3,
    backgroundColor: '#bfbfbf',
  },
}));

const TradingButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'tradetype',
})(({ theme, tradetype }) => ({
  position: 'relative',
  borderRadius: '16px',
  padding: '16px 32px',
  fontSize: '1.1rem',
  textTransform: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  
  ...(tradetype === 'buy' && {
    background: `linear-gradient(135deg, #00c766 0%, #00a656 100%)`,
    color: '#ffffff !important',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
    fontWeight: 800,
    boxShadow: `0 8px 32px rgba(0, 199, 102, 0.4)`,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    '& .MuiButton-startIcon': {
      color: '#ffffff !important',
    },
    '& *': {
      color: '#ffffff !important',
    },
          '&:hover': {
      background: `linear-gradient(135deg, #00a656 0%, #00c766 100%)`,
      boxShadow: `0 12px 40px rgba(0, 199, 102, 0.6)`,
      transform: 'translateY(-2px) scale(1.05)',
      textShadow: '0 3px 8px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 1)',
      border: '2px solid rgba(255, 255, 255, 0.4)',
      color: '#ffffff !important',
      '& *': {
        color: '#ffffff !important',
      },
    }
  }),
  
  ...(tradetype === 'sell' && {
    background: `linear-gradient(135deg, #ff4d6d 0%, #d90429 100%)`,
    color: '#ffffff !important',
    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8), 0 1px 2px rgba(0, 0, 0, 0.9)',
    fontWeight: 800,
    boxShadow: `0 8px 32px rgba(255, 77, 109, 0.4)`,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    '& .MuiButton-startIcon': {
      color: '#ffffff !important',
    },
    '& *': {
      color: '#ffffff !important',
    },
          '&:hover': {
      background: `linear-gradient(135deg, #d90429 0%, #ff4d6d 100%)`,
      boxShadow: `0 12px 40px rgba(255, 77, 109, 0.6)`,
      transform: 'translateY(-2px) scale(1.05)',
      textShadow: '0 3px 8px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 1)',
      border: '2px solid rgba(255, 255, 255, 0.4)',
      color: '#ffffff !important',
      '& *': {
        color: '#ffffff !important',
      },
    }
  }),
}));

const TotalDisplay = styled(Box)(({ theme, tradetype }) => ({
  padding: theme.spacing(3), 
  borderRadius: '16px',
  background: alpha(theme.palette.background.paper, 0.3),
  border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
              textAlign: 'center',
  '& .total-label': {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
  },
  '& .total-value': {
    fontFamily: '"JetBrains Mono", "Roboto Mono", monospace',
                      fontWeight: 700,
    color: tradetype === 'buy' ? theme.palette.success.main : theme.palette.error.main,
  }
}));

const TradingInterface = ({ onTradeSuccess }) => {
  const theme = useTheme();
  const { isAuthenticated } = useAuth();
    const [tradeType, setTradeType] = useState('buy');
    const [amount, setAmount] = useState('');
  const [percentage, setPercentage] = useState(0);
    const [loading, setLoading] = useState(false);
  const getSymbol = () => 'BTC';
  const currentPrice = 63500; // Mock price for calculation

  const handleAmountChange = (e) => {
    const val = e.target.value;
    if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
        setAmount(val);
    }
    setPercentage(0);
  };

  const handleSliderChange = (e, value) => {
    setPercentage(value);
    const mockBalance = 1; // Example balance
    setAmount(((mockBalance * value) / 100).toFixed(8));
    };

    const handleCreateTrade = async () => {
    if (!isAuthenticated) {
      toast.error('Please log in to trade.');
      return;
    }

    const tradeAmount = parseFloat(amount);
    if (isNaN(tradeAmount) || tradeAmount <= 0) {
      toast.error('Please enter a valid amount.');
            return;
        }

        setLoading(true);
    const tradeData = {
      symbol: `${getSymbol()}/USDT`,
      amount: tradeAmount,
      price: currentPrice, // In a real app, this would be a live price
            type: tradeType,
        };

        try {
      const result = await createTrade(tradeData);
      if (result.success) {
        toast.success(`Successfully placed ${tradeType} order!`);
        onTradeSuccess(result.data); // Callback to update parent component's trade list
        setAmount('');
        setPercentage(0);
      } else {
        toast.error(result.message || 'Trade failed. Please try again.');
      }
        } catch (error) {
      console.error('Trade execution failed:', error);
      toast.error(error.message || 'An error occurred during the trade.');
        } finally {
            setLoading(false);
        }
    };

  const total = (currentPrice * parseFloat(amount || 0)).toFixed(2);

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mb: 3, p: 1, background: alpha(theme.palette.grey[900], 0.2), borderRadius: '16px' }}>
        <TabButton selected={tradeType === 'buy'} onClick={() => setTradeType('buy')} type="buy">
          <ShowChartIcon sx={{ mr: 1 }} /> Buy
        </TabButton>
        <TabButton selected={tradeType === 'sell'} onClick={() => setTradeType('sell')} type="sell">
          <TrendingDownIcon sx={{ mr: 1 }} /> Sell
        </TabButton>
      </Box>
      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 'medium' }}>Price (USDT)</Typography>
      <InputBase readOnly value="Market Price" sx={{ width: '100%', p: '12px 16px', borderRadius: '12px', background: alpha(theme.palette.grey[500], 0.1), color: 'text.secondary', fontFamily: 'monospace', fontSize: '1.1rem', border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`, mb: 3 }} />
      <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary', fontWeight: 'medium' }}>Amount ({getSymbol()})</Typography>
      <InputBase 
        type="number" 
        placeholder="0.00000000" 
        value={amount} 
        onChange={handleAmountChange} 
        sx={{ 
          width: '100%', 
          p: '12px 16px', 
          borderRadius: '12px', 
          background: alpha(theme.palette.grey[500], 0.1), 
          color: 'text.primary', 
          fontFamily: 'monospace', 
          fontSize: '1.1rem', 
          border: `1px solid ${alpha(theme.palette.grey[500], 0.2)}`, 
          '&:hover': { 
            borderColor: alpha(theme.palette.primary.main, 0.5) 
          }, 
          '&.Mui-focused': { 
            borderColor: theme.palette.primary.main, 
            boxShadow: `0 0 0 3px ${alpha(theme.palette.primary.main, 0.25)}` 
          },
          // 修复数字输入框的spinner按钮在不同主题下的样式
          '& input[type=number]': {
            '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            '-moz-appearance': 'textfield',
          },
          '& input': {
            color: theme.palette.text.primary,
            backgroundColor: 'transparent',
            '&::placeholder': {
              color: alpha(theme.palette.text.secondary, 0.7),
            }
          }
        }} 
      />
      <Box sx={{ mt: 3, mb: 2 }}>
        <SliderBar value={percentage} onChange={handleSliderChange} tradetype={tradeType} marks={[{ value: 0, label: '0%' }, { value: 25, label: '25%' }, { value: 50, label: '50%' }, { value: 75, label: '75%' }, { value: 100, label: '100%' }]} />
      </Box>
      <TotalDisplay sx={{ mt: 4, mb: 3 }} tradetype={tradeType}>
        <Typography variant="subtitle2" className="total-label">Total</Typography>
        <Typography variant="h5" className="total-value">{total} USDT</Typography>
      </TotalDisplay>
      <TradingButton fullWidth tradetype={tradeType} onClick={handleCreateTrade} disabled={loading || !amount}>
        {loading ? <CircularProgress size={24} color="inherit" /> : <><FlashOn sx={{ mr: 1 }} />{tradeType === 'buy' ? `Buy ${getSymbol()}` : `Sell ${getSymbol()}`}</>}
      </TradingButton>
      </Box>
  );
};


// 🎯 滚动交易数据动画
const slideInFromTop = keyframes`
  0% { 
    transform: translateY(-100%);
    opacity: 0;
  }
  100% { 
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  0% { 
    transform: translateY(0);
    opacity: 1;
  }
  100% { 
    transform: translateY(20px);
    opacity: 0;
  }
`;

// 💰 专业价格显示 - 简化版本
const PriceDisplay = styled(Typography, { shouldForwardProp: (prop) => prop !== 'pricetype' })(({ theme, pricetype }) => ({ 
  fontFamily: '"JetBrains Mono", "Roboto Mono", monospace', 
  fontWeight: 700, 
  fontSize: '0.9rem', 
  padding: '4px 8px', 
  borderRadius: '4px', 
  display: 'inline-block', 
  
  ...(pricetype === 'buy' && { 
    color: theme.palette.success.main, 
    backgroundColor: alpha(theme.palette.success.main, 0.1),
  }), 
  
  ...(pricetype === 'sell' && { 
    color: theme.palette.error.main, 
    backgroundColor: alpha(theme.palette.error.main, 0.1),
  }), 
}));

// 📊 带动画的数据行组件 - 性能优化版本
const AnimatedDataRow = React.memo(({ side, isNew, depth = 0, children, ...props }) => {
  const [currentDepth, setCurrentDepth] = useState(depth);
  const animationFrameRef = useRef(null);
  const lastDepthRef = useRef(depth);
  
  useEffect(() => {
    // 🚀 性能优化：只在深度实际变化时更新动画
    if (Math.abs(depth - lastDepthRef.current) < 0.1) {
      return; // 忽略微小变化，减少动画
    }
    
    // 取消之前的动画帧
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // 使用节流的方式更新深度
    animationFrameRef.current = requestAnimationFrame(() => {
      setCurrentDepth(depth);
      lastDepthRef.current = depth;
      animationFrameRef.current = null;
    });
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [depth]);

  return (
    <DataRowStyled side={side} isNew={isNew} depth={currentDepth} {...props}>
      {children}
    </DataRowStyled>
  );
});

// 📊 交易数据行样式 - 重命名为避免冲突
const DataRowStyled = styled(Box, { shouldForwardProp: (prop) => prop !== 'side' && prop !== 'isNew' && prop !== 'depth' })(({ theme, side, isNew, depth }) => ({ 
  display: 'grid', 
  gridTemplateColumns: '1fr 1fr 1fr', 
  padding: '6px 16px', 
  borderRadius: '4px', 
  position: 'relative', 
  transition: 'all 0.3s ease', 
  cursor: 'pointer',
  overflow: 'hidden',
  minHeight: '32px',
  alignItems: 'center',

  // 背景深度条 - 买单从右向左，卖单从左向右，避免视觉重叠
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: side === 'buy' ? 'auto' : 0,
    right: side === 'buy' ? 0 : 'auto',
    height: '100%',
    width: '100%',
    backgroundColor: alpha(side === 'buy' ? theme.palette.success.main : theme.palette.error.main, 0.08),
    transform: `scaleX(${Math.max(0, Math.min(1, depth / 100))})`,
    transformOrigin: side === 'buy' ? 'right center' : 'left center',
    transition: 'transform 1.0s cubic-bezier(0.4, 0.0, 0.2, 1)',
    zIndex: 0,
  },
  
  // 新交易的滚入动画
  ...(isNew && {
    animation: `${slideInFromTop} 0.5s ease-out`,
    backgroundColor: alpha(side === 'buy' ? theme.palette.success.main : theme.palette.error.main, 0.15),
  }),
  
  '&:hover': { 
    backgroundColor: alpha(side === 'buy' ? theme.palette.success.main : theme.palette.error.main, 0.12),
    transform: side === 'buy' ? 'translateX(-2px)' : 'translateX(2px)',
    '&::before': {
      backgroundColor: alpha(side === 'buy' ? theme.palette.success.main : theme.palette.error.main, 0.15),
    }
  }, 
  
  // 确保文字内容在背景之上，并添加文字阴影提高可读性
  '& > *': {
    position: 'relative',
    zIndex: 2,
    textShadow: theme.palette.mode === 'dark' 
      ? '0 1px 2px rgba(0, 0, 0, 0.8)' 
      : '0 1px 2px rgba(255, 255, 255, 0.8)',
  }
}));
// 🚀 性能优化：保存之前的订单簿数据用于平滑过渡
let previousOrderBookData = null;
let orderBookUpdateCount = 0;

const generateOrderBookData = () => { 
  const basePrice = 63500; 
  orderBookUpdateCount++;
  
  // 如果有之前的数据，基于它们进行微调，否则生成新数据
  if (previousOrderBookData && orderBookUpdateCount % 2 === 0) {
    // 🚀 每隔一次更新才进行数据变化，减少计算量
    const { bids: prevBids, asks: prevAsks } = previousOrderBookData;
    
    // 对现有数据进行微调（减少变化幅度）
    const bids = prevBids.map((bid, i) => {
      const priceVariation = (Math.random() - 0.5) * 8; // 减少价格变化幅度
      const amountVariation = (Math.random() - 0.5) * 0.5; // 减少数量变化幅度
      return {
        price: Math.max(basePrice - 100, parseFloat(bid.price) + priceVariation).toFixed(2),
        amount: Math.max(0.1, parseFloat(bid.amount) + amountVariation).toFixed(4),
        total: 0
      };
    });
    
    const asks = prevAsks.map((ask, i) => {
      const priceVariation = (Math.random() - 0.5) * 8; // 减少价格变化幅度
      const amountVariation = (Math.random() - 0.5) * 0.5; // 减少数量变化幅度
      return {
        price: Math.max(basePrice + 10, parseFloat(ask.price) + priceVariation).toFixed(2),
        amount: Math.max(0.1, parseFloat(ask.amount) + amountVariation).toFixed(4),
        total: 0
      };
    });
    
    // 重新计算累计总量
    let cumulativeBid = 0;
    bids.forEach(bid => {
      cumulativeBid += parseFloat(bid.amount);
      bid.total = cumulativeBid.toFixed(4);
    });
    
    let cumulativeAsk = 0;
    asks.forEach(ask => {
      cumulativeAsk += parseFloat(ask.amount);
      ask.total = cumulativeAsk.toFixed(4);
    });
    
    const result = { bids, asks };
    previousOrderBookData = result;
    return result;
  } else if (previousOrderBookData) {
    // 🚀 返回之前的数据，不进行更新，节省计算
    return previousOrderBookData;
  } else {
    // 首次生成数据 - 减少到15条，提高性能
    const bids = Array.from({ length: 15 }, (_, i) => ({ 
      price: (basePrice - (i + 1) * Math.random() * 40).toFixed(2), 
      amount: (Math.random() * 3 + 0.1).toFixed(4), 
      total: 0 
    })); 
    
    const asks = Array.from({ length: 15 }, (_, i) => ({ 
      price: (basePrice + (i + 1) * Math.random() * 40).toFixed(2), 
      amount: (Math.random() * 3 + 0.1).toFixed(4), 
      total: 0 
    })); 
    
    let cumulativeBid = 0; 
    bids.forEach(bid => { 
      cumulativeBid += parseFloat(bid.amount); 
      bid.total = cumulativeBid.toFixed(4); 
    }); 
    
    let cumulativeAsk = 0; 
    asks.forEach(ask => { 
      cumulativeAsk += parseFloat(ask.amount); 
      ask.total = cumulativeAsk.toFixed(4); 
    }); 
    
    const result = { bids, asks };
    previousOrderBookData = result;
    return result;
  }
};


const Trade = () => {
  const theme = useTheme();
  const [trades, setTrades] = useState([]);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [currentPrice, setCurrentPrice] = useState(63500.50);
  const [priceChange, setPriceChange] = useState(2.4);
  const [loadingInitialTrades, setLoadingInitialTrades] = useState(true);
  const [newTradeIds, setNewTradeIds] = useState(new Set()); // 追踪新交易

  // 使用useRef来存储定时器，避免不必要的重新创建
  const tradeIntervalRef = useRef(null);
  const orderBookIntervalRef = useRef(null);
  const newTradeTimeoutRef = useRef(new Map());

  // 🚀 性能优化：使用useCallback缓存函数
  const generateNewTrade = useCallback(() => {
    const isUptrend = Math.random() > 0.5;
    const priceVariation = (Math.random() - 0.5) * 50; // 减少价格变动幅度
    const isBuy = Math.random() > 0.4; // 稍微倾向于买单
    const amount = (Math.random() * 0.5 + 0.01).toFixed(4); // 减少数量范围
    const newPrice = (currentPrice + priceVariation);
    
    return {
      ID: Date.now() + Math.random(), // 确保唯一ID
      Type: isBuy ? 'buy' : 'sell',
      Symbol: 'BTC/USDT',
      Price: newPrice.toFixed(2),
      Amount: amount,
      Total: (newPrice * parseFloat(amount)).toFixed(2),
      CreatedAt: new Date().toISOString(),
      UserID: Math.floor(Math.random() * 100),
      Status: 'completed'
    };
  }, [currentPrice]);

  // 🚀 性能优化：使用useCallback缓存订单簿更新函数
  const updateOrderBook = useCallback(() => {
    const newOrderBook = generateOrderBookData();
    setOrderBook(newOrderBook);
  }, []);

  // 🚀 性能优化：防抖的新交易处理函数
  const handleNewTrade = useCallback((newTrade) => {
    const tradeId = newTrade.ID || newTrade.id;
    
    setNewTradeIds(prev => new Set([...prev, tradeId]));
    setTrades(prevTrades => [newTrade, ...prevTrades.slice(0, 24)]); // 减少到25条记录
    
    // 清理之前的timeout
    if (newTradeTimeoutRef.current.has(tradeId)) {
      clearTimeout(newTradeTimeoutRef.current.get(tradeId));
    }
    
    // 设置新的timeout
    const timeoutId = setTimeout(() => {
      setNewTradeIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(tradeId);
        return newSet;
      });
      newTradeTimeoutRef.current.delete(tradeId);
    }, 2000);
    
    newTradeTimeoutRef.current.set(tradeId, timeoutId);
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingInitialTrades(true);
      try {
      const initialTrades = await getRecentTrades('BTC/USDT');
      setTrades(initialTrades);
      setOrderBook(generateOrderBookData());
      } catch (error) {
        console.warn('初始数据加载失败，使用模拟数据', error);
        // 使用模拟数据
        setTrades([]);
        setOrderBook(generateOrderBookData());
      } finally {
      setLoadingInitialTrades(false);
      }
    };
    fetchInitialData();

    // 🚀 性能优化：减少更新频率，提高性能
    tradeIntervalRef.current = setInterval(() => {
      const newTrade = generateNewTrade();
      setNewTradeIds(prev => new Set([...prev, newTrade.ID]));
      
      setTrades(prevTrades => {
        const updatedTrades = [newTrade, ...prevTrades.slice(0, 24)]; // 减少到25条记录
        return updatedTrades;
      });

      // 更新当前价格
      setCurrentPrice(parseFloat(newTrade.Price));
      
      // 清除新交易标记
      const timeoutId = setTimeout(() => {
        setNewTradeIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(newTrade.ID);
          return newSet;
        });
      }, 2000);
      
      newTradeTimeoutRef.current.set(newTrade.ID, timeoutId);
    }, 3000 + Math.random() * 2000); // 增加到3-5秒间隔，减少CPU负担

    // 🚀 性能优化：减少订单簿更新频率
    orderBookIntervalRef.current = setInterval(() => {
      updateOrderBook();
    }, 4000 + Math.random() * 2000); // 增加到4-6秒间隔

    return () => {
      // 清理所有定时器
      if (tradeIntervalRef.current) {
        clearInterval(tradeIntervalRef.current);
      }
      if (orderBookIntervalRef.current) {
        clearInterval(orderBookIntervalRef.current);
      }
      
      // 清理所有timeout
      newTradeTimeoutRef.current.forEach(timeoutId => {
        clearTimeout(timeoutId);
      });
      newTradeTimeoutRef.current.clear();
    };
  }, [generateNewTrade, updateOrderBook]);

  // 🚀 性能优化：使用useMemo缓存重量级计算
  const { maxBidTotal, maxAskTotal, displayBids, displayAsks } = useMemo(() => {
    const displayBids = orderBook.bids.slice(0, 15);
    const displayAsks = orderBook.asks.slice(0, 15);
    
    const maxBidTotal = displayBids.length > 0 ? Math.max(...displayBids.map(b => parseFloat(b.total))) : 1;
    const maxAskTotal = displayAsks.length > 0 ? Math.max(...displayAsks.map(a => parseFloat(a.total))) : 1;
    
    return { maxBidTotal, maxAskTotal, displayBids, displayAsks };
  }, [orderBook.bids, orderBook.asks]);

  // 🚀 性能优化：缓存交易列表显示数据
  const displayTrades = useMemo(() => {
    return trades.slice(0, 20); // 只显示前20条，减少DOM元素
  }, [trades]);

  return (
    <>
      <TradingBackground />
      <Container maxWidth="xl" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Top Price Banner */}
        <TradingCard variant="orderbook" sx={{ mb: 4, overflow: 'visible' }}>
          <CardContent sx={{ p: 3 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={4}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.2), color: theme.palette.warning.main, width: 56, height: 56 }}><MonetizationOn fontSize="large" /></Avatar><Box><Typography variant="h3" sx={{ fontFamily: '"JetBrains Mono", monospace', fontWeight: 900, background: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.primary.main})`, backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', mb: 0.5 }}>${currentPrice.toLocaleString()}</Typography><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><TrendingUpIcon sx={{ color: theme.palette.success.main, fontSize: 20 }} /><Typography variant="h6" sx={{ color: theme.palette.success.main, fontWeight: 700 }}>+{priceChange}%</Typography></Box></Box></Box></Grid>
              <Grid item xs={12} md={4}><Box sx={{ textAlign: 'center' }}><Chip label="BTC/USDT" size="large" sx={{ fontSize: '1.2rem', fontWeight: 700, padding: '12px 24px', background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`, color: '#fff', boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.4)}`, animation: `${neonGlow} 2s ease-in-out infinite`, }} icon={<CandlestickChart />} /></Box></Grid>
              <Grid item xs={12} md={4}><Grid container spacing={2}>{[{ label: '24h Vol', value: '2.4B', icon: <Assessment />, color: 'info' }, { label: '24h High', value: '65,250', icon: <TrendingUpIcon />, color: 'success' }, { label: '24h Low', value: '62,180', icon: <TrendingDownIcon />, color: 'error' }].map((stat, index) => (<Grid item xs={4} key={index}><Box sx={{ textAlign: 'center' }}><Box sx={{ color: theme.palette[stat.color].main, mb: 0.5, display: 'flex', justifyContent: 'center' }}>{stat.icon}</Box><Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>{stat.label}</Typography><Typography variant="subtitle2" sx={{ fontWeight: 700, fontFamily: 'monospace' }}>{stat.value}</Typography></Box></Grid>))}</Grid></Grid>
            </Grid>
          </CardContent>
        </TradingCard>

        {/* Main Trading Area */}
        <Grid container spacing={4}>
          {/* Left: Trading Panel */}
          <Grid item xs={12} lg={4}>
            <TradingCard variant="default" sx={{ height: 'fit-content' }}>
              <CardContent sx={{ 
                p: { xs: 2, md: 3 }, 
                maxHeight: '850px', 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                  background: alpha(theme.palette.grey[500], 0.1),
                  borderRadius: '4px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: alpha(theme.palette.primary.main, 0.3),
                  borderRadius: '4px',
                  '&:hover': {
                    background: alpha(theme.palette.primary.main, 0.5),
                  }
                }
              }}>
                <TradingInterface onTradeSuccess={handleNewTrade} />
              </CardContent>
            </TradingCard>
          </Grid>

          {/* Center: Order Book */}
          <Grid item xs={12} lg={4}>
            <TradingCard variant="orderbook">
              <CardContent sx={{ p: 4, height: '850px', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.info.main, 0.2), color: theme.palette.info.main }}>
                      <ShowChart />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Order Book</Typography>
                  </Box>
                  <Chip label="BTC/USDT" size="small" variant="outlined" />
                </Box>
                
                {/* 表头 */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr', 
                  gap: 2, 
                  mb: 2, 
                  p: '12px 16px', 
                  borderRadius: '8px', 
                  background: alpha(theme.palette.background.paper, 0.5),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`
                }}>
                  <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'left', color: 'text.primary' }}>
                    Price (USDT)
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'center', color: 'text.primary' }}>
                    Amount (BTC)
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 700, textAlign: 'right', color: 'text.primary' }}>
                    Total
                  </Typography>
                </Box>
                
                {/* 卖单区域 */}
                <Box sx={{ flex: 1, overflowY: 'auto', mb: 3 }}>
                  {displayAsks.slice().reverse().map((ask, index) => {
                const depth = (parseFloat(ask.total) / maxAskTotal) * 100;
                return (
                      <AnimatedDataRow 
                        key={`ask-${displayAsks.length-1-index}`} 
                        side="sell" 
                        depth={depth}
                      >
                        <PriceDisplay pricetype="sell" variant="body2">
                          {parseFloat(ask.price).toFixed(2)}
                        </PriceDisplay>
                        <Typography variant="body2" sx={{ 
                          textAlign: 'center', 
                          fontFamily: 'monospace', 
                          fontWeight: 600,
                          color: 'text.primary'
                        }}>
                          {ask.amount}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          textAlign: 'right', 
                          fontFamily: 'monospace', 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}>
                          {ask.total}
                        </Typography>
                      </AnimatedDataRow>
                );
                  })}
                </Box>
                
                {/* 当前价格分隔线 */}
                <Box sx={{ 
                  my: 3, 
                  py: 3, 
                  px: 2,
                  borderRadius: '12px',
                  background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.main, 0.03)} 0%,
                    ${alpha(theme.palette.primary.main, 0.08)} 50%,
                    ${alpha(theme.palette.primary.main, 0.03)} 100%)`,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.12)}`,
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      ${alpha(theme.palette.error.main, 0.3)} 50%, 
                      transparent 100%)`,
                  },
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: `linear-gradient(90deg, 
                      transparent 0%, 
                      ${alpha(theme.palette.success.main, 0.3)} 50%, 
                      transparent 100%)`,
                  }
                }}>
                  <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        fontFamily: 'monospace',
                        color: theme.palette.primary.main,
                        textShadow: `0 0 10px ${alpha(theme.palette.primary.main, 0.3)}`,
                        mb: 0.5
                      }}
                    >
                      {currentPrice.toFixed(2)}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: theme.palette.text.secondary,
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px'
                      }}
                    >
                      LAST PRICE
                    </Typography>
                  </Box>
                </Box>
                
                {/* 买单区域 */}
                <Box sx={{ flex: 1, overflowY: 'auto' }}>
                  {displayBids.map((bid, index) => {
                const depth = (parseFloat(bid.total) / maxBidTotal) * 100;
                return (
                      <AnimatedDataRow 
                        key={`bid-${index}`} 
                        side="buy" 
                        depth={depth}
                      >
                        <PriceDisplay pricetype="buy" variant="body2">
                          {parseFloat(bid.price).toFixed(2)}
                        </PriceDisplay>
                        <Typography variant="body2" sx={{ 
                          textAlign: 'center', 
                          fontFamily: 'monospace', 
                          fontWeight: 600,
                          color: 'text.primary'
                        }}>
                          {bid.amount}
                        </Typography>
                        <Typography variant="body2" sx={{ 
                          textAlign: 'right', 
                          fontFamily: 'monospace', 
                          color: 'text.secondary',
                          fontWeight: 500
                        }}>
                          {bid.total}
                        </Typography>
                      </AnimatedDataRow>
                );
                  })}
                </Box>
              </CardContent>
            </TradingCard>
          </Grid>

          {/* Right: Recent Trades */}
          <Grid item xs={12} lg={4}>
            <TradingCard>
              <CardContent sx={{ p: 4, height: '850px', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: alpha(theme.palette.warning.main, 0.2), color: theme.palette.warning.main }}>
                      <Timeline />
                    </Avatar>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Trades</Typography>
          </Box>
                <Chip label={`${trades.length} trades`} size="small" variant="outlined" sx={{ fontFamily: 'monospace' }} />
          </Box>
              <Box sx={{ display: 'grid', gridTemplateColumns: '80px 1fr 80px 60px', gap: 1, mb: 2, p: 2, borderRadius: '8px', background: alpha(theme.palette.background.paper, 0.3) }}>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Price</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Amount</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Time</Typography>
                <Typography variant="caption" sx={{ fontWeight: 600 }}>Type</Typography>
        </Box>
              <Box sx={{ flex: 1, overflowY: 'auto' }}>
                {loadingInitialTrades ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                    </Box>
                ) : displayTrades.map((trade, index) => (
                    <AnimatedDataRow 
                    key={trade.ID || trade.id} 
                    side={trade.Type === 'buy' ? 'buy' : 'sell'} 
                    isNew={newTradeIds.has(trade.ID || trade.id)} // 使用 newTradeIds 追踪新交易
                  >
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontWeight: 600, color: trade.Type === 'buy' ? theme.palette.success.main : theme.palette.error.main }}>{parseFloat(trade.Price).toFixed(2)}</Typography>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{trade.Amount}</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>{new Date(trade.CreatedAt).toLocaleTimeString()}</Typography>
                    <Chip label={trade.Type} size="small" sx={{ textTransform: 'uppercase', fontSize: '0.7rem', height: 20, background: trade.Type === 'buy' ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.error.main, 0.2), color: trade.Type === 'buy' ? theme.palette.success.main : theme.palette.error.main, fontWeight: 700 }} />
                    </AnimatedDataRow>
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