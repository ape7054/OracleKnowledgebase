import { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  useMediaQuery,
  Divider,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
  Fade,
  Slide,
  Container
} from '@mui/material';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
  ComposedChart,
  Bar
} from 'recharts';
import { styled, alpha, keyframes } from '@mui/system';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import InsightsIcon from '@mui/icons-material/Insights';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import TimelineIcon from '@mui/icons-material/Timeline';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import {
  AutoGraph,
  CandlestickChart,
  Analytics,
  Speed,
  Security,
  Bolt,
  Rocket,
  Star,
  Verified,
  PlayArrow,
  Refresh,
  MoreVert,
  Fullscreen,
  FilterList,
  Search,
  Notifications,
  Settings
} from '@mui/icons-material';

// Import icons from the new library
import BtcIcon from 'cryptocurrency-icons/svg/color/btc.svg?react';
import EthIcon from 'cryptocurrency-icons/svg/color/eth.svg?react';
import SolIcon from 'cryptocurrency-icons/svg/color/sol.svg?react';
import UsdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg?react';
import BnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg?react';
import AdaIcon from 'cryptocurrency-icons/svg/color/ada.svg?react';
import TrxIcon from 'cryptocurrency-icons/svg/color/trx.svg?react';
import XlmIcon from 'cryptocurrency-icons/svg/color/xlm.svg?react';
import LinkIcon from 'cryptocurrency-icons/svg/color/link.svg?react';
import BchIcon from 'cryptocurrency-icons/svg/color/bch.svg?react';
import AvaxIcon from 'cryptocurrency-icons/svg/color/avax.svg?react';
import XrpIcon from 'cryptocurrency-icons/svg/color/xrp.svg?react';
import WbtcIcon from 'cryptocurrency-icons/svg/color/wbtc.svg?react';
import UsdcIcon from 'cryptocurrency-icons/svg/color/usdc.svg?react';
import DogeIcon from 'cryptocurrency-icons/svg/color/doge.svg?react';

// Import API services
import { cachedMarketApi, dataTransformers } from '../api/marketApi';

// Import custom icons
import HypeIcon from '../assets/icons/HypeIcon';
// import CryptoNews from '../components/CryptoNews';

// Import the new chart component
import { TradingViewChart } from '../components/TradingViewChart';
import LoadingScreen from '../components/LoadingScreen';
import { Assessment } from '@mui/icons-material';

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

// 高级卡片组件
const PremiumCard = styled(Paper)(({ theme, variant = 'default' }) => ({
  padding: '32px',
  borderRadius: '24px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',

  // 基础样式
  ...(theme.palette.mode === 'dark'
    ? {
        background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(148, 163, 184, 0.1)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)',
      }
    : {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(226, 232, 240, 0.8)',
        boxShadow: '0 20px 60px rgba(148, 163, 184, 0.15)',
      }),

  // 变体样式
  ...(variant === 'premium' && {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 50%, rgba(240, 147, 251, 0.1) 100%)'
      : 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 50%, rgba(240, 147, 251, 0.05) 100%)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
  }),

  ...(variant === 'highlight' && {
    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.1) 100%)',
    border: '1px solid rgba(16, 185, 129, 0.3)',
  }),

  // 悬停效果
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    ...(theme.palette.mode === 'dark'
      ? {
          boxShadow: '0 32px 80px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(148, 163, 184, 0.3)',
        }
      : {
          boxShadow: '0 32px 80px rgba(148, 163, 184, 0.25)',
          border: '1px solid rgba(102, 126, 234, 0.3)',
        }),
  },

  // 内部光效
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.8), transparent)',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },

  '&:hover::before': {
    opacity: 1,
  },
}));

// 保留原有的GlassmorphicPaper组件以兼容现有代码
const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: '16px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',

  ...(theme.palette.mode === 'dark'
    ? {
        backgroundColor: 'rgba(22, 27, 34, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.35)',
      }
    : {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 8px 32px rgba(145, 158, 171, 0.24)',
      }),

  color: theme.palette.text.primary,

  '&:hover': {
      transform: 'translateY(-4px)',
      ...(theme.palette.mode === 'dark' && {
          backgroundColor: 'rgba(22, 27, 34, 0.85)',
          boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.45)',
      }),
  },
}));

const CustomTooltip = ({ active, payload, label, theme }) => {
    if (active && payload && payload.length) {
        return (
            <Paper sx={{
                padding: '12px',
                borderRadius: '12px',
                ...(theme.palette.mode === 'dark'
                    ? {
                        backgroundColor: 'rgba(33, 43, 54, 0.9)',
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    } : {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[4],
                    }
                )
            }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>{`Time: ${label}`}</Typography>
                {payload.map((pld) => (
                    <Box key={pld.dataKey} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: pld.stroke, mr: 1.5 }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 600, minWidth: 40 }}>
                            {`${pld.dataKey}: `}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontFamily: 'monospace', ml: 0.5 }}>
                            {`$${pld.value.toLocaleString()}`}
                        </Typography>
                    </Box>
                ))}
            </Paper>
        );
    }
    return null;
};

// 生成更真实的加密货币价格数据，包含更大的波动
const generateRealisticPriceData = (basePrice, volatility = 0.15) => {
  const data = [];
  let currentPrice = basePrice;

  for (let i = 0; i < 24; i++) {
    // 模拟真实的价格波动
    const randomChange = (Math.random() - 0.5) * 2 * volatility;
    const trendFactor = Math.sin(i * 0.3) * 0.05; // 添加趋势因子
    const marketSentiment = Math.sin(i * 0.1) * 0.03; // 市场情绪波动

    currentPrice = currentPrice * (1 + randomChange + trendFactor + marketSentiment);

    data.push({
      name: `${String(i).padStart(2, '0')}:00`,
      value: Math.round(currentPrice * 100) / 100,
      volume: Math.random() * 1000000 + 500000, // 添加交易量数据
      timestamp: Date.now() - (24 - i) * 3600000
    });
  }

  return data;
};

const chartData = {
  BTC: generateRealisticPriceData(95000, 0.08), // BTC波动相对较小但绝对值大
  ETH: generateRealisticPriceData(3400, 0.12), // ETH波动中等
  SOL: generateRealisticPriceData(180, 0.18), // SOL波动较大
};

// 生成模拟K线数据的函数（简化版，用于面积图）
const generateMockOhlcData = (basePrice, days = 30) => {
  const data = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // 生成随机的价格变动
    const volatility = 0.03; // 3%的波动
    const change = (Math.random() - 0.5) * 2 * volatility;
    const newPrice = currentPrice * (1 + change);
    
    data.push({
      time: Math.floor(date.getTime() / 1000), // Unix时间戳（秒）
      close: newPrice, // 收盘价（用于面积图）
      value: newPrice, // 也添加value字段作为备用
    });
    
    currentPrice = newPrice;
  }
  
  return data;
};

// 为每个币种生成模拟K线数据
const mockOhlcData = {
  BTC: generateMockOhlcData(95000),
  ETH: generateMockOhlcData(3400),
  SOL: generateMockOhlcData(180),
};

const chartMeta = {
  BTC: {
    stroke: '#f7931a',
    id: 'colorBtc',
    gradient: ['#f7931a', '#ff6b35'],
    name: 'Bitcoin',
    symbol: '₿'
  },
  ETH: {
    stroke: '#627eea',
    id: 'colorEth',
    gradient: ['#627eea', '#9c88ff'],
    name: 'Ethereum',
    symbol: 'Ξ'
  },
  SOL: {
    stroke: '#14f195',
    id: 'colorSol',
    gradient: ['#14f195', '#00d4aa'],
    name: 'Solana',
    symbol: '◎'
  },
}

const staticMarketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$118,400.00', change: '+0.3%', icon: BtcIcon, sparkline: chartData.BTC.map(d => d.value) },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,762.84', change: '+2.0%', icon: EthIcon, sparkline: chartData.ETH.map(d => d.value) },
  { name: 'XRP', symbol: 'XRP', price: '$3.50', change: '+2.4%', icon: XrpIcon, sparkline: [3.20, 3.35, 3.60, 3.45, 3.50] },
  { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '-0.0%', icon: UsdtIcon, sparkline: [1.002, 0.999, 1.001, 0.998, 1.000] },
  { name: 'BNB', symbol: 'BNB', price: '$701.38', change: '+2.6%', icon: BnbIcon, sparkline: [650, 675, 720, 690, 701] },
  { name: 'Solana', symbol: 'SOL', price: '$186.36', change: '+4.7%', icon: SolIcon, sparkline: chartData.SOL.map(d => d.value) },
  { name: 'USDC', symbol: 'USDC', price: '$1.00', change: '-0.0%', icon: UsdcIcon, sparkline: [1.003, 0.997, 1.002, 0.999, 1.000] },
  { name: 'Dogecoin', symbol: 'DOGE', price: '$0.37', change: '+7.2%', icon: DogeIcon, sparkline: [0.30, 0.34, 0.39, 0.35, 0.37] },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '-0.5%', icon: AdaIcon, sparkline: [0.48, 0.44, 0.47, 0.43, 0.45] },
  { name: 'TRON', symbol: 'TRX', price: '$0.28', change: '+1.8%', icon: TrxIcon, sparkline: [0.26, 0.29, 0.27, 0.30, 0.28] },
  { name: 'Avalanche', symbol: 'AVAX', price: '$42.15', change: '+3.4%', icon: AvaxIcon, sparkline: [38.5, 43.2, 40.8, 44.3, 42.15] },
  { name: 'Chainlink', symbol: 'LINK', price: '$25.67', change: '+5.2%', icon: LinkIcon, sparkline: [24.2, 24.8, 25.1, 25.9, 25.67] },
  { name: 'Bitcoin Cash', symbol: 'BCH', price: '$512.34', change: '-2.1%', icon: BchIcon, sparkline: [525, 520, 515, 510, 512] },
  { name: 'Wrapped Bitcoin', symbol: 'WBTC', price: '$118,350.00', change: '+0.2%', icon: WbtcIcon, sparkline: [118100, 118200, 118300, 118400, 118350] },
  { name: 'Stellar', symbol: 'XLM', price: '$0.48', change: '+6.3%', icon: XlmIcon, sparkline: [0.44, 0.45, 0.46, 0.49, 0.48] }
];

// 专业金融Dashboard统计卡片
const PremiumStatCard = ({ title, value, icon, color, trend, subtitle }) => {
  const theme = useTheme();

  return (
    <Card sx={{
      position: 'relative',
      height: '160px',
      minHeight: '160px',
      borderRadius: '12px',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
      border: theme.palette.mode === 'dark'
        ? '1px solid rgba(148, 163, 184, 0.1)'
        : '1px solid rgba(226, 232, 240, 0.8)',
      boxShadow: theme.palette.mode === 'dark'
        ? '0 1px 3px rgba(0, 0, 0, 0.3)'
        : '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: theme.palette.mode === 'dark'
          ? '0 10px 25px rgba(0, 0, 0, 0.4)'
          : '0 10px 25px rgba(0, 0, 0, 0.15)',
        border: theme.palette.mode === 'dark'
          ? '1px solid rgba(148, 163, 184, 0.2)'
          : '1px solid rgba(226, 232, 240, 1)',
      }
    }}>
      {/* 顶部装饰条 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.6)} 100%)`
      }} />

      <CardContent sx={{
        p: 2,
        height: 'calc(100% - 3px)', // 减去顶部装饰条的高度
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        '&:last-child': { pb: 2 }
      }}>
        {/* 头部区域 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          {/* 图标 */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 3px 8px ${alpha(color, 0.3)}`,
              '& svg': {
                color: '#fff',
                fontSize: '1.3rem'
              }
            }}
          >
            {icon}
          </Box>

          {/* 趋势标签 */}
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                height: '22px',
                fontSize: '0.7rem',
                fontWeight: 600,
                background: trend.startsWith('+')
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#fff',
                border: 'none',
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          )}
        </Box>

        {/* 标题 */}
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            mb: 0.5,
            lineHeight: 1.2
          }}
        >
          {title}
        </Typography>

        {/* 主要数值 */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            lineHeight: 1.1,
            color: theme.palette.text.primary,
            mb: subtitle ? 0.25 : 0
          }}
        >
          {value}
        </Typography>

        {/* 副标题 */}
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: '0.7rem',
              fontWeight: 400,
              opacity: 0.8,
              lineHeight: 1.2
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
  
// 高级SparkLine组件
const PremiumSparkLine = ({ data, strokeColor, trend = 'up' }) => {
  const theme = useTheme();
  
  // 防御性编程：如果data不是数组，则返回null，防止崩溃
  if (!Array.isArray(data)) {
    return null; 
  }

  const chartData = data.map((price, index) => ({
    x: index,
    y: price,
    index: index
  }));
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);
  const range = maxValue - minValue;

  // 动态颜色基于趋势 - 增强颜色饱和度和亮度
  const colors = {
    up: {
      primary: '#00ff88',      // 更亮的绿色
      secondary: '#00cc66',    // 更鲜艳的绿色
      glow: 'rgba(0, 255, 136, 0.6)',    // 增强发光效果
      area: 'rgba(0, 255, 136, 0.2)'     // 增强区域填充
    },
    down: {
      primary: '#ff4757',      // 更亮的红色
      secondary: '#ff3742',    // 更鲜艳的红色
      glow: 'rgba(255, 71, 87, 0.6)',    // 增强发光效果
      area: 'rgba(255, 71, 87, 0.2)'     // 增强区域填充
    },
    neutral: {
      primary: '#a4b0be',      // 更亮的灰色
      secondary: '#8395a7',    // 更有对比度的灰色
      glow: 'rgba(164, 176, 190, 0.6)',  // 增强发光效果
      area: 'rgba(164, 176, 190, 0.2)'   // 增强区域填充
    }
  };

  const colorScheme = colors[trend] || colors.neutral;
  const gradientId = `premium-spark-${strokeColor.replace('#', '')}-${trend}`;
  const areaGradientId = `premium-area-${strokeColor.replace('#', '')}-${trend}`;

  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: 60,
      overflow: 'hidden',
      borderRadius: '8px',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.6))'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.6))',
      border: `1px solid ${alpha(colorScheme.primary, 0.2)}`,
      '&:hover': {
        border: `1px solid ${alpha(colorScheme.primary, 0.4)}`,
        boxShadow: `0 4px 20px ${colorScheme.glow}`,
        '& .spark-line': {
          filter: `drop-shadow(0 0 8px ${colorScheme.glow})`,
        }
      }
    }}>
      {/* 背景网格 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `linear-gradient(90deg, transparent 0%, ${colorScheme.primary} 50%, transparent 100%)`,
        backgroundSize: '20px 100%',
        animation: `${float} 3s ease-in-out infinite`
      }} />

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
          <defs>
            {/* 主线渐变 */}
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={alpha(colorScheme.primary, 0.3)} />
              <stop offset="50%" stopColor={colorScheme.primary} />
              <stop offset="100%" stopColor={colorScheme.secondary} />
            </linearGradient>

            {/* 区域填充渐变 */}
            <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={alpha(colorScheme.primary, 0.3)} />
              <stop offset="100%" stopColor={alpha(colorScheme.primary, 0.05)} />
            </linearGradient>

            {/* 发光效果 - 增强 */}
            <filter id={`glow-${gradientId}`} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            {/* 动态光点 */}
            <filter id={`sparkle-${gradientId}`}>
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feColorMatrix values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
            </filter>
          </defs>

          {/* 区域填充 */}
          <Area
            type="monotone"
            dataKey="y"
            stroke="none"
            fill={`url(#${areaGradientId})`}
            fillOpacity={0.6}
            animationDuration={2000}
          />

          {/* 主线条 */}
          <Line
            type="monotone"
            dataKey="y"
            stroke={`url(#${gradientId})`}
            strokeWidth={4}
            dot={false}
            className="spark-line"
            style={{
              filter: `url(#glow-${gradientId})`,
            }}
            animationDuration={2000}
            animationBegin={200}
          />

          {/* 高亮点 */}
          <Line
            type="monotone"
            dataKey="y"
            stroke={colorScheme.primary}
            strokeWidth={1}
            dot={{
              fill: colorScheme.primary,
              strokeWidth: 0,
              r: 0,
              className: 'spark-dot'
            }}
            activeDot={{
              r: 4,
              fill: colorScheme.primary,
              stroke: '#fff',
              strokeWidth: 2,
              style: {
                filter: `drop-shadow(0 0 6px ${colorScheme.glow})`,
              }
            }}
            animationDuration={2000}
            animationBegin={400}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* 趋势指示器 */}
      <Box sx={{
        position: 'absolute',
        top: 4,
        right: 4,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${colorScheme.primary}, ${colorScheme.secondary})`,
        boxShadow: `0 0 8px ${colorScheme.glow}`,
        animation: `${pulse} 2s ease-in-out infinite`
      }} />
    </Box>
  );
};

// 增强市场表格样式
const StyledTableContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  '& .MuiTableCell-root': {
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
    padding: '16px 8px',
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.1),
    transition: 'background-color 0.3s ease',
  },
  '& .MuiTableHead-root .MuiTableCell-root': {
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 600,
  },
}));

// 升级后的市场情绪仪表组件
const SentimentGauge = ({ value, size = 180 }) => {
  const theme = useTheme();
  const data = [{ value: 100, fill: 'url(#sentimentGradient)' }];
  const startAngle = 180;
  const endAngle = 0;
  
  // 获取情绪描述和颜色
  const getSentimentInfo = (value) => {
    if (value <= 20) return { 
      text: 'Extreme Fear', 
      color: theme.palette.error.main, 
      gradient: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
      icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.error.main }} /> 
    };
    if (value <= 40) return { 
      text: 'Fear', 
      color: theme.palette.error.light, 
      gradient: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
      icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.error.light }} /> 
    };
    if (value <= 60) return { 
      text: 'Neutral', 
      color: theme.palette.warning.main, 
      gradient: `linear-gradient(135deg, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
      icon: <SentimentNeutralIcon sx={{ fontSize: '1.75rem', color: theme.palette.warning.main }} /> 
    };
    if (value <= 80) return { 
      text: 'Greed', 
      color: theme.palette.success.light, 
      gradient: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
      icon: <SentimentVerySatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.success.light }} /> 
    };
    return { 
      text: 'Extreme Greed', 
      color: theme.palette.success.main, 
      gradient: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
      icon: <SentimentVerySatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.success.main }} /> 
    };
  };
  
  const sentimentInfo = getSentimentInfo(value);
  const angle = startAngle - (value / 100) * (startAngle - endAngle);

  // 生成细小刻度线数据
  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i <= 100; i += 5) {
      const tickAngle = startAngle - (i / 100) * (startAngle - endAngle);
      const isMainTick = i % 25 === 0;
      const tickLength = isMainTick ? 10 : 5;
      const tickWidth = isMainTick ? 2 : 1;
      const tickOpacity = isMainTick ? 0.8 : 0.4;
      const x1 = 50 - Math.cos(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22));
      const y1 = 100 - Math.sin(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22));
      const x2 = 50 - Math.cos(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22) + tickLength);
      const y2 = 100 - Math.sin(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22) + tickLength);
      
      ticks.push({ x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%`, width: tickWidth, opacity: tickOpacity });
    }
    return ticks;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 仪表盘容器 */}
      <Box sx={{ 
        position: 'relative', 
        width: size, 
        height: size/1.8, 
        mb: 1 
      }}>
        {/* 渐变背景层 */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50% 50% 0 0',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(22, 28, 36, 0.8), rgba(10, 14, 25, 0.8))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 245, 250, 0.6))',
          boxShadow: theme.palette.mode === 'dark'
            ? 'inset 0 -10px 20px -10px rgba(255, 255, 255, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3)'
            : 'inset 0 -10px 20px -10px rgba(145, 158, 171, 0.2), 0 8px 16px rgba(145, 158, 171, 0.12)',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 'calc(100% - 10px)',
            height: 'calc(100% - 5px)',
            top: '5px',
            left: '5px',
            borderRadius: '50% 50% 0 0',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(180deg, rgba(30, 40, 50, 0.7), rgba(20, 25, 40, 0.7))'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(250, 252, 255, 0.9))',
            backdropFilter: 'blur(8px)',
          }
        }} />
        
        {/* 仪表盘图表 */}
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="100%" 
            innerRadius={size/2 - 20} 
            outerRadius={size/2}
            startAngle={startAngle} 
            endAngle={endAngle}
            barSize={12}
            data={data}
          >
            <defs>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={theme.palette.error.main} />
                <stop offset="25%" stopColor={theme.palette.error.main} />
                <stop offset="50%" stopColor={theme.palette.warning.main} />
                <stop offset="75%" stopColor={theme.palette.success.light} />
                <stop offset="100%" stopColor={theme.palette.success.main} />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
              </filter>
              <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={alpha(sentimentInfo.color, 0.8)} />
                <stop offset="100%" stopColor={alpha(sentimentInfo.color, 1)} />
              </linearGradient>
            </defs>
            
            {/* 背景轨道 - 半透明效果 */}
            <RadialBar 
              dataKey="value"
              cornerRadius={6}
              fill="rgba(255,255,255,0.08)"
              background={{ 
                fill: theme.palette.mode === 'dark' ? 
                  'rgba(255,255,255,0.06)' : 
                  'rgba(0,0,0,0.03)'
              }}
            />
            
            {/* 彩色渐变轨道 */}
            <RadialBar 
              dataKey="value"
              cornerRadius={6}
              fill="url(#sentimentGradient)"
              style={{ filter: 'url(#glow)' }}
            />
            
            {/* 刻度线 */}
            {generateTicks().map((tick, i) => (
              <line 
                key={`tick-${i}`}
                x1={tick.x1} 
                y1={tick.y1} 
                x2={tick.x2} 
                y2={tick.y2} 
                stroke={theme.palette.mode === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}
                strokeWidth={tick.width}
                strokeOpacity={tick.opacity}
              />
            ))}
            
            {/* 主刻度线标记 - 只显示线条，不显示数字 */}
            {[25, 50, 75].map((position, i) => {
              const posAngle = startAngle - (position / 100) * (startAngle - endAngle);
              return (
                <g key={`mark-${position}`}>
                  <line 
                    x1={`${50 - Math.cos(posAngle * Math.PI / 180) * (size/2 - 18)}%`} 
                    y1={`${100 - Math.sin(posAngle * Math.PI / 180) * (size/2 - 18)}%`} 
                    x2={`${50 - Math.cos(posAngle * Math.PI / 180) * (size/2 - 10)}%`} 
                    y2={`${100 - Math.sin(posAngle * Math.PI / 180) * (size/2 - 10)}%`} 
                    stroke={theme.palette.mode === 'dark' ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)"}
                    strokeWidth={3}
                    strokeOpacity={0.7}
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
            
            {/* 指针 - 高级渐变设计 */}
            <g filter="url(#shadow)">
              {/* 指针底座 */}
              <circle 
                cx="50%" 
                cy="100%" 
                r={8} 
                fill={theme.palette.mode === 'dark' ? '#2a2f3a' : '#e0e4e9'}
                stroke={sentimentInfo.color}
                strokeWidth={2}
              />
              <circle 
                cx="50%" 
                cy="100%" 
                r={4}
                fill="url(#needleGradient)"
              />
              
              {/* 指针 */}
              <path
                d={`
                  M ${50 - 3} 100 
                  L ${50 - Math.cos(angle * Math.PI / 180) * 48} ${100 - Math.sin(angle * Math.PI / 180) * 48} 
                  L ${50 + 3} 100
                  Z
                `}
                fill="url(#needleGradient)"
                style={{ transformOrigin: '50% 100%', transformBox: 'fill-box' }}
              />
              
              {/* 指针顶端圆点 */}
              <circle 
                cx={50 - Math.cos(angle * Math.PI / 180) * 48} 
                cy={100 - Math.sin(angle * Math.PI / 180) * 48} 
                r={3}
                fill="url(#needleGradient)"
              />
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
      
      {/* 情绪指标值和状态 */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
          background: alpha(sentimentInfo.color, theme.palette.mode === 'dark' ? 0.15 : 0.08),
          px: 4,
          py: 1.5,
          borderRadius: 2,
          backdropFilter: 'blur(4px)',
          boxShadow: `0 4px 12px ${alpha(sentimentInfo.color, 0.15)}`
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            mb: 0.5,
            background: sentimentInfo.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.15))'
          }}
        >
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {sentimentInfo.icon}
          <Typography 
            variant="button" 
            sx={{ 
              fontSize: '1rem', 
              color: sentimentInfo.color, 
              fontWeight: 600,
              letterSpacing: '0.03em'
            }}
          >
            {sentimentInfo.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

// 价格趋势方向指标
const TrendIndicator = ({ direction, strength }) => {
  const theme = useTheme();
  const getColor = () => {
    if (direction === 'up') {
      return theme.palette.success.main;
    } else if (direction === 'down') {
      return theme.palette.error.main;
    }
    return theme.palette.text.secondary;
  };
  
  const getIcon = () => {
    if (direction === 'up') {
      return <TrendingUpIcon sx={{ fontSize: '1.2rem' }} />;
    } else if (direction === 'down') {
      return <TrendingDownIcon sx={{ fontSize: '1.2rem' }} />;
    }
    return <TimelineIcon sx={{ fontSize: '1.2rem' }} />;
  };

  return (
    <Chip 
      icon={getIcon()}
      label={`${direction === 'neutral' ? 'Neutral' : direction === 'up' ? 'Bullish' : 'Bearish'} ${strength}`}
      sx={{
        backgroundColor: alpha(getColor(), 0.1),
        color: getColor(),
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: getColor()
        }
      }}
    />
  );
};

// 社交媒体提及度组件 - 全新设计
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

function Dashboard() {
  const theme = useTheme();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [timeframe, setTimeframe] = useState('7d'); // 默认7天
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 新增状态管理
  const [marketData, setMarketData] = useState([]);
  const [ohlcData, setOhlcData] = useState([]); // K线图数据
  const [marketSummary, setMarketSummary] = useState({
    totalMarketCap: '0',
    btcDominance: '0%',
    ethDominance: '0%',
    dailyVolume: '0'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // 图标映射
  const iconMap = {
    'BTC': <BtcIcon />,
    'ETH': <EthIcon />,
    'BNB': <BnbIcon />,
    'SOL': <SolIcon />,
    'XRP': <XrpIcon />,
    'USDT': <UsdtIcon />,
    'USDC': <UsdcIcon />,
    'ADA': <AdaIcon />,
    'DOGE': <DogeIcon />,
    'TRX': <TrxIcon />,
    'AVAX': <AvaxIcon />,
    'LINK': <LinkIcon />,
    'BCH': <BchIcon />,
    'WBTC': <WbtcIcon />,
    'XLM': <XlmIcon />,
    'DEFAULT': <BtcIcon />
  };

  // 转换API数据为Dashboard组件期望的格式
  const transformApiDataForDashboard = (apiData) => {
    // 简单安全的版本，绝对不会出错
    if (!apiData || !Array.isArray(apiData)) return [];
    
    return apiData.map(coin => {
      // 生成更真实的sparkline数据
      const basePrice = coin.price || 1000;
      const changePercent = (coin.change || 0) / 100;
      const sparklineData = [];
      
      for (let i = 0; i < 24; i++) {
        // 基于变化百分比生成波动数据
        const variation = (Math.random() - 0.5) * Math.abs(changePercent) * 2;
        const progress = i / 23; // 0 to 1
        const trendedPrice = basePrice * (1 + changePercent * progress + variation * 0.3);
        sparklineData.push(Math.max(0, trendedPrice));
      }

      return {
        name: coin.name || 'Unknown',
        symbol: (coin.symbol || 'UNKNOWN').toUpperCase(),
        price: `$${basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
        change: `${changePercent >= 0 ? '+' : ''}${(changePercent * 100).toFixed(1)}%`,
        icon: iconMap[(coin.symbol || '').toUpperCase()] || iconMap['DEFAULT'],
        sparkline: sparklineData
      };
    });
  };

    // 获取市场数据（优化真实数据获取）
  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      // console.log('🔄 开始获取真实市场数据...');
      // console.log('⏳ CoinGecko API通常需要20-30秒响应，请耐心等待...');
      const response = await cachedMarketApi.getMarketData(20);

      if (response.success && response.data && response.data.length > 0) {
        // console.log('✅ 成功获取真实数据:', response.data.length, '个币种');
        
        // 先转换为标准格式
        const standardData = response.data.map(dataTransformers.transformCoinData);

        // 再转换为Dashboard组件期望的格式
        const dashboardData = transformApiDataForDashboard(standardData);
        setMarketData(dashboardData);

        // 计算市场概览数据
        const summary = dataTransformers.transformMarketSummary(response.data);
        setMarketSummary(summary);

        setLastUpdated(new Date());
        console.log('✅ 市场数据更新完成');
      } else {
        // console.log('⚠️ API返回空数据，使用备用数据');
        setMarketData(staticMarketData);
        const mockSummary = {
          totalMarketCap: 2547890123456,
          marketCapChange24h: 2.34,
          totalVolume: 98765432109,
          volumeChange24h: -5.67,
          btcDominance: 52.18,
          ethDominance: 17.25,
          activeCryptocurrencies: 22000,
          markets: 44500
        };
        setMarketSummary(mockSummary);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error('❌ API调用失败:', err.message);
      
      // 根据错误类型显示不同消息
      if (err.message.includes('timeout') || err.message.includes('超时')) {
        setError('数据加载中，CoinGecko API响应较慢，请耐心等待...');
      } else {
        setError('网络连接问题，显示备用数据');
      }
      
      // 失败时使用备用数据
      setMarketData(staticMarketData);
      const mockSummary = {
        totalMarketCap: 2547890123456,
        marketCapChange24h: 2.34,
        totalVolume: 98765432109,
        volumeChange24h: -5.67,
        btcDominance: 52.18,
        ethDominance: 17.25,
        activeCryptocurrencies: 22000,
        markets: 44500
      };
      setMarketSummary(mockSummary);
      setLastUpdated(new Date());
    } finally {
      setLoading(false);
    }
  };



  // useEffect hook - 在组件挂载时获取数据
  useEffect(() => {
    // console.log('Dashboard mounting, fetching data...');
    fetchMarketData();

    // 完全禁用自动刷新，只在用户主动操作时更新数据
    // const interval = setInterval(fetchMarketData, 300000); // 5分钟

    return () => {
      // clearInterval(interval);
    };
  }, []); // 确保依赖数组为空，只在组件首次挂载时执行



  // 获取K线图数据（获取真实数据）
  useEffect(() => {
    const fetchOhlcData = async () => {
      try {
        // console.log(`开始获取${selectedCoin}的K线数据...`);
        
        // 币种ID映射
        const coinIdMap = {
          'BTC': 'bitcoin',
          'ETH': 'ethereum',
          'SOL': 'solana',
        };
        const coinId = coinIdMap[selectedCoin.toUpperCase()] || 'bitcoin';
        
        // 将时间范围转换为天数
        const days = timeframe.replace('d', '');

        const response = await cachedMarketApi.getOhlcData(coinId, 'usd', days);
        
        if (response.success && response.data) {
          console.log(`✅ 成功获取${selectedCoin}的K线数据`);
          const transformedData = dataTransformers.transformOhlcData(response.data);
          setOhlcData(transformedData);
        } else {
          // console.log(`⚠️ K线API返回空数据，使用${selectedCoin}的备用数据`);
          const mockData = mockOhlcData[selectedCoin] || mockOhlcData.BTC;
          setOhlcData(mockData);
        }
      } catch (err) {
        console.error(`❌ 获取${selectedCoin}K线数据失败:`, err.message);
        // 使用模拟数据作为后备方案
        const mockData = mockOhlcData[selectedCoin] || mockOhlcData.BTC;
        setOhlcData(mockData);
      }
    };

    fetchOhlcData();
  }, [selectedCoin, timeframe]);

  const stats = [
    { title: "Total Market Cap", value: marketSummary.totalMarketCap, icon: <AccountBalanceWalletOutlinedIcon sx={{ color: theme.palette.primary.main }} />, color: theme.palette.primary.main },
    { title: "24h Volume", value: marketSummary.dailyVolume, icon: <TrendingUpIcon sx={{ color: theme.palette.success.main }} />, color: theme.palette.success.main },
    { title: "BTC Dominance", value: marketSummary.btcDominance, icon: <ShowChartOutlinedIcon sx={{ color: theme.palette.info.main }} />, color: theme.palette.info.main },
    { title: "ETH Dominance", value: marketSummary.ethDominance, icon: <BarChartOutlinedIcon sx={{ color: theme.palette.warning.main }} />, color: theme.palette.warning.main },
  ];

  // 优化移动视图卡片
  const MarketCardView = () => {
    const displayData = marketData.length > 0 ? marketData : staticMarketData;
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {displayData.map((coin) => (
        <GlassmorphicPaper key={coin.symbol} sx={{ p: 3, mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{
                width: 40,
                height: 40,
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.8),
                boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.3 : 0.1)}`,
                padding: 1,
                mr: 2,
                color: coin.change.startsWith('+') && coin.change !== '+0.0%' ? theme.palette.success.main : coin.change.startsWith('-') ? theme.palette.error.main : theme.palette.grey[500],
                '& svg': {
                  color: 'currentColor',
                  fill: 'currentColor'
                }
              }}>
                {iconMap[coin.symbol] || iconMap['DEFAULT']}
              </Box>
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{coin.name}</Typography>
                <Typography variant="body2" color="text.secondary">{coin.symbol}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ 
              fontFamily: 'monospace', 
              fontWeight: 600,
              color: coin.change.startsWith('+') ? 'success.main' : 
                    coin.change === '+0.0%' ? 'text.secondary' : 'error.main'
            }}>
              {coin.price}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              backgroundColor: coin.change.startsWith('+') && coin.change !== '+0.0%' 
                ? alpha(theme.palette.success.main, 0.1) 
                : coin.change === '+0.0%' 
                  ? alpha(theme.palette.grey[500], 0.1)
                  : alpha(theme.palette.error.main, 0.1)
            }}>
              {coin.change.startsWith('+') && coin.change !== '+0.0%' ? (
                <TrendingUpIcon sx={{ fontSize: '0.875rem', color: theme.palette.success.main, mr: 0.5 }} />
              ) : coin.change === '+0.0%' ? null : (
                <TrendingDownIcon sx={{ fontSize: '0.875rem', color: theme.palette.error.main, mr: 0.5 }} />
              )}
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600, 
                  color: coin.change.startsWith('+') && coin.change !== '+0.0%' 
                    ? theme.palette.success.main 
                    : coin.change === '+0.0%' 
                      ? theme.palette.grey[500] 
                      : theme.palette.error.main 
                }}
              >
              {coin.change}
            </Typography>
            </Box>
            <Box sx={{ width: '60%', height: 50 }}>
              <PremiumSparkLine
                data={coin.sparkline}
                strokeColor={coin.change.startsWith('+') ? theme.palette.success.main :
                             coin.change === '+0.0%' ? theme.palette.grey[500] : theme.palette.error.main}
                trend={coin.change.startsWith('+') && coin.change !== '+0.0%' ? 'up' :
                       coin.change.startsWith('-') ? 'down' : 'neutral'}
              />
            </Box>
          </Box>
        </GlassmorphicPaper>
      ))}
    </Box>
    );
  };

  // 高级市场概览卡片组件
  const PremiumMarketCard = ({ coin, index }) => {
    const theme = useTheme();
    const isPositive = coin.change.startsWith('+') && coin.change !== '+0.0%';
    const isNegative = coin.change.startsWith('-');
    const isNeutral = coin.change === '+0.0%';

    const trendColor = isPositive ? theme.palette.success.main :
                      isNegative ? theme.palette.error.main :
                      theme.palette.grey[500];

    return (
      <Fade in timeout={800 + index * 100}>
        <Box
          sx={{
            position: 'relative',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(trendColor, 0.2)}`,
            borderRadius: '16px',
            p: 3,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              border: `1px solid ${alpha(trendColor, 0.4)}`,
              boxShadow: `0 20px 40px ${alpha(trendColor, 0.2)}, 0 0 0 1px ${alpha(trendColor, 0.1)}`,
              '& .trend-indicator': {
                transform: 'scale(1.1)',
                boxShadow: `0 0 20px ${alpha(trendColor, 0.6)}`
              },
              '& .price-text': {
                transform: 'scale(1.05)'
              }
            }
          }}
        >
          {/* 背景装饰 */}
          <Box
            sx={{
              position: 'absolute',
              top: -50,
              right: -50,
              width: 100,
              height: 100,
              background: `radial-gradient(circle, ${alpha(trendColor, 0.1)} 0%, transparent 70%)`,
              borderRadius: '50%',
              animation: `${pulse} 4s ease-in-out infinite`
            }}
          />

          {/* 头部区域 */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.05)',
                  border: `1px solid ${alpha(trendColor, 0.3)}`,
                  mr: 2,
                  position: 'relative',
                  '& svg': {
                    // Keep original icon colors - don't override with trendColor
                    filter: 'none'
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: -2,
                    borderRadius: '18px',
                    background: `linear-gradient(135deg, ${trendColor}, transparent)`,
                    mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                    maskComposite: 'xor',
                    WebkitMaskComposite: 'xor',
                    padding: '2px'
                  }
                }}
              >
                {iconMap[coin.symbol] || iconMap['DEFAULT']}
              </Box>

              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    mb: 0.5
                  }}
                >
                  {coin.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontWeight: 500,
                    fontSize: '0.85rem'
                  }}
                >
                  {coin.symbol}
                </Typography>
              </Box>
            </Box>

            {/* 趋势指示器 */}
            <Box
              className="trend-indicator"
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${trendColor}, ${alpha(trendColor, 0.7)})`,
                boxShadow: `0 0 12px ${alpha(trendColor, 0.5)}`,
                animation: `${pulse} 2s ease-in-out infinite`,
                transition: 'all 0.3s ease'
              }}
            />
          </Box>

          {/* 价格区域 */}
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="h4"
              className="price-text"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 800,
                fontSize: '1.8rem',
                mb: 1,
                transition: 'transform 0.3s ease',
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${trendColor})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {coin.price}
            </Typography>

            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                px: 2,
                py: 1,
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`,
                border: `1px solid ${alpha(trendColor, 0.2)}`
              }}
            >
              {isPositive ? (
                <TrendingUpIcon sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
              ) : isNegative ? (
                <TrendingDownIcon sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
              ) : null}
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: trendColor,
                  fontSize: '0.9rem'
                }}
              >
                {coin.change}
              </Typography>
            </Box>
          </Box>

          {/* 图表区域 */}
          <Box sx={{ height: 80, mb: 2 }}>
            <PremiumSparkLine
              data={coin.sparkline}
              strokeColor={trendColor}
              trend={isPositive ? 'up' : isNegative ? 'down' : 'neutral'}
            />
          </Box>

          {/* 底部装饰线 */}
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${trendColor}, transparent)`,
              opacity: 0.6
            }}
          />
        </Box>
      </Fade>
    );
  };

  // 高级表格视图
  const PremiumMarketTableView = () => {
    const displayData = marketData.length > 0 ? marketData : staticMarketData;
    return (
      <Box sx={{ overflow: 'hidden' }}>
        {/* 表格头部 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
            gap: 2,
            p: 2,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.3))'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.6))',
            borderRadius: '12px 12px 0 0',
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            borderBottom: 'none'
          }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Asset
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
            Price
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
            24h Change
          </Typography>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
            24h Chart
          </Typography>
        </Box>

        {/* 表格内容 */}
        <Box>
          {displayData.map((coin, index) => {
            const isPositive = coin.change.startsWith('+') && coin.change !== '+0.0%';
            const isNegative = coin.change.startsWith('-');
            const trendColor = isPositive ? theme.palette.success.main :
                              isNegative ? theme.palette.error.main :
                              theme.palette.grey[500];

            return (
              <Slide direction="up" in timeout={600 + index * 100} key={coin.symbol}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
                    gap: 2,
                    p: 2,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.3), rgba(15, 23, 42, 0.2))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6))',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    borderTop: index === 0 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
                    borderRadius: index === displayData.length - 1 ? '0 0 12px 12px' : '0',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`
                        : `linear-gradient(135deg, ${alpha(trendColor, 0.05)}, ${alpha(trendColor, 0.02)})`,
                      border: `1px solid ${alpha(trendColor, 0.3)}`,
                      transform: 'translateX(4px)',
                      '&::before': {
                        opacity: 1
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: `linear-gradient(180deg, ${trendColor}, ${alpha(trendColor, 0.5)})`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    }
                  }}
                >
                  {/* Asset */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`,
                        border: `2px solid ${alpha(trendColor, 0.2)}`,
                        mr: 2,
                        color: trendColor,
                        '& svg': {
                          color: trendColor,
                          fill: 'currentColor'
                        }
                      }}
                    >
                      {iconMap[coin.symbol] || iconMap['DEFAULT']}
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                        {coin.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                        {coin.symbol}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 700,
                        fontSize: '1.1rem'
                      }}
                    >
                      {coin.price}
                    </Typography>
                  </Box>

                  {/* 24h Change */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.8,
                        borderRadius: '10px',
                        background: `linear-gradient(135deg, ${alpha(trendColor, 0.15)}, ${alpha(trendColor, 0.08)})`,
                        border: `1px solid ${alpha(trendColor, 0.25)}`
                      }}
                    >
                      {isPositive ? (
                        <TrendingUpIcon sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
                      ) : isNegative ? (
                        <TrendingDownIcon sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
                      ) : null}
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: trendColor
                        }}
                      >
                        {coin.change}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 24h Chart */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: 120, height: 50 }}>
                      <PremiumSparkLine
                        data={coin.sparkline}
                        strokeColor={trendColor}
                        trend={isPositive ? 'up' : isNegative ? 'down' : 'neutral'}
                      />
                    </Box>
                  </Box>
                </Box>
              </Slide>
            );
          })}
        </Box>
      </Box>
    );
  };

  // 高级卡片视图
  const PremiumMarketCardView = () => {
    const displayData = marketData.length > 0 ? marketData : staticMarketData;
    return (
      <Grid container spacing={3}>
        {displayData.map((coin, index) => (
          <Grid item xs={12} sm={6} lg={4} key={coin.symbol}>
            <PremiumMarketCard coin={coin} index={index} />
          </Grid>
        ))}
      </Grid>
    );
  };

  // 显示加载状态
  if (loading) {
    return (
      <LoadingScreen 
        title="正在加载市场数据"
        subtitle="连接全球交易所，获取实时价格信息"
        icon={Assessment}
      />
    );
  }

  // 显示错误状态
  if (error) {
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
          onClick={fetchMarketData}
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
                </Stack>
              </Box>

              {/* 右侧操作按钮 */}
              <Stack direction="row" spacing={2}>
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
                  <Refresh />
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
              <PremiumStatCard
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
                  '&::before': {
                    content: '""',
                    display: 'block',
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: theme.palette.success.main,
                    marginRight: '4px',
                    animation: 'pulse 1.5s infinite ease-in-out'
                  },
                  '@keyframes pulse': {
                    '0%': {
                      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0.5)'
                    },
                    '70%': {
                      boxShadow: '0 0 0 6px rgba(76, 175, 80, 0)'
                    },
                    '100%': {
                      boxShadow: '0 0 0 0 rgba(76, 175, 80, 0)'
                    }
                  }
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
                  <TrendingDownIcon sx={{ color: theme.palette.error.main, mr: 0.5, fontSize: '1rem' }} />
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
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              top: -20,
              right: -20,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.08)}, transparent)`,
              pointerEvents: 'none',
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
              <SignalCellularAltIcon sx={{ 
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
            
            {/* 装饰性元素 */}
            <Box sx={{
              display: 'flex',
              gap: 0.5,
              alignItems: 'center',
            }}>
              {[1, 2, 3].map((i) => (
                <Box
                  key={i}
                  sx={{
                    width: 3,
                    height: 3 + i * 2,
                    borderRadius: '50%',
                    background: `linear-gradient(45deg, ${alpha(theme.palette.primary.main, 0.6)}, ${alpha(theme.palette.secondary.main, 0.4)})`,
                    animation: `pulse 2s ease-in-out ${i * 0.2}s infinite`,
                    '@keyframes pulse': {
                      '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
                      '50%': { opacity: 1, transform: 'scale(1.2)' },
                    },
                  }}
                />
              ))}
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
                  borderRadius: '12px',
                  overflow: 'hidden',
                  '& .MuiButton-root': {
                    borderRadius: 0,
                    px: 2,
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
                  },
                  '& .MuiButton-root:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.primary.main, 0.08),
                    borderColor: theme.palette.primary.main,
                  },
                  '& .MuiButton-root.Mui-selected': {
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.primary.main, 0.6)})`
                      : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    color: '#fff',
                    fontWeight: 700,
                    borderColor: 'transparent',
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
                      : `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                  }
                }}
              >
                  <Button 
                    onClick={() => setSelectedCoin('BTC')}
                    variant={selectedCoin === 'BTC' ? 'contained' : 'outlined'}
                  className={selectedCoin === 'BTC' ? 'Mui-selected' : ''}
                  >
                    BTC
                  </Button>
                  <Button 
                    onClick={() => setSelectedCoin('ETH')}
                    variant={selectedCoin === 'ETH' ? 'contained' : 'outlined'}
                  className={selectedCoin === 'ETH' ? 'Mui-selected' : ''}
                  >
                    ETH
                  </Button>
                  <Button 
                    onClick={() => setSelectedCoin('SOL')}
                    variant={selectedCoin === 'SOL' ? 'contained' : 'outlined'}
                  className={selectedCoin === 'SOL' ? 'Mui-selected' : ''}
                  >
                    SOL
                  </Button>
                </ButtonGroup>
              
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
                  },
                  '& .MuiButton-root:hover': {
                    backgroundColor: theme.palette.mode === 'dark'
                      ? alpha(theme.palette.primary.main, 0.2)
                      : alpha(theme.palette.primary.main, 0.08),
                    borderColor: theme.palette.primary.main,
                  },
                  '& .MuiButton-root.Mui-selected': {
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.8)}, ${alpha(theme.palette.primary.main, 0.6)})`
                      : `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                    color: '#fff',
                    fontWeight: 700,
                    borderColor: 'transparent',
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 0 10px ${alpha(theme.palette.primary.main, 0.5)}`
                      : `0 4px 10px ${alpha(theme.palette.primary.main, 0.4)}`,
                  }
                }}
              >
                <Button 
                  onClick={() => setTimeframe('1d')}
                  variant={timeframe === '1d' ? 'contained' : 'outlined'}
                  className={timeframe === '1d' ? 'Mui-selected' : ''}
                >
                  24H
                </Button>
                <Button 
                  onClick={() => setTimeframe('7d')}
                  variant={timeframe === '7d' ? 'contained' : 'outlined'}
                  className={timeframe === '7d' ? 'Mui-selected' : ''}
                >
                  7D
                </Button>
                <Button 
                  onClick={() => setTimeframe('30d')}
                  variant={timeframe === '30d' ? 'contained' : 'outlined'}
                  className={timeframe === '30d' ? 'Mui-selected' : ''}
                >
                  30D
                </Button>
              </ButtonGroup>
            </Box>
            <Box 
              height={isMobile ? 350 : 450}
              sx={{
                position: 'relative',
                borderRadius: 2,
                overflow: 'hidden',
                background: `linear-gradient(135deg, 
                  ${alpha(theme.palette.background.paper, 0.1)}, 
                  ${alpha(theme.palette.primary.main, 0.02)}
                )`,
              }}
            >
              <TradingViewChart data={ohlcData} colors={{
                backgroundColor: 'transparent',
                textColor: theme.palette.text.primary,
                lineColor: theme.palette.primary.main,
                areaTopColor: alpha(theme.palette.primary.main, 0.8),
                areaBottomColor: alpha(theme.palette.primary.main, 0.1),
              }}/>
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
            {isMobile ? <PremiumMarketCardView /> : <PremiumMarketTableView />}
          </GlassmorphicPaper>
        </Grid>




      </Grid>
      </Container>
    </Box>
  );
}

export default Dashboard; 