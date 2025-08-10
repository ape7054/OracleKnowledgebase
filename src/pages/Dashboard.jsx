import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
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
  Container,
  Skeleton,
  LinearProgress
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

// Removed colored cryptocurrency icon imports; neutral icons are rendered in-code
// 从@web3icons/react导入动态组件和常用图标
import { TokenIcon, TokenARB, TokenOP, TokenAPT, TokenSUI } from '@web3icons/react';
// 本地图标
import HypeIcon from '../assets/icons/HypeIcon.jsx';

// Import API services
import { cachedMarketApi, dataTransformers, cacheManager } from '../api/marketApi';
// import CryptoNews from '../components/CryptoNews';

// Import the new chart component
import { TradingViewChart } from '../components/TradingViewChart';
import LoadingScreen from '../components/LoadingScreen';
import { Assessment } from '@mui/icons-material';

// 创建一个图片图标组件 - 移到外部避免重新创建
const CoinImageIcon = ({ imageUrl, symbol, fallbackIcon }) => {
  const [hasError, setHasError] = useState(false);
  
  if (hasError || !imageUrl) {
    return fallbackIcon;
  }
  
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={imageUrl}
        alt={symbol}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onError={() => setHasError(true)}
      />
    </Box>
  );
};

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
// 模拟数据已删除 - 完全依赖API数据

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

// 移除静态数据 - 完全依赖API

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
  const [initialLoading, setInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  // 仅保留去抖与单次加载指示，避免重复闪烁
  const fetchTimeoutRef = useRef(null);
  const requestIdRef = useRef(0);
  const [ohlcLoading, setOhlcLoading] = useState(false);

  // 币种主题色（必须在任何条件 return 之前定义，避免 hooks 次序不一致）
  const coinAccent = useMemo(() => ({
    BTC: '#f7931a',
    ETH: '#627eea',
    SOL: '#14f195'
  }[selectedCoin] || theme.palette.primary.main), [selectedCoin, theme.palette.primary.main]);

  // 统一的图标容器组件，确保所有图标尺寸一致
  const IconWrapper = ({ children }) => (
    <Box
      sx={{
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        filter: 'grayscale(100%) contrast(0.8)',
        '& > *': {
          width: '28px !important',
          height: '28px !important',
          color: 'inherit !important',
          fill: 'currentColor !important'
        },
        '& svg': {
          color: 'inherit !important',
          fill: 'currentColor !important'
        }
      }}
    >
      {children}
    </Box>
  );

  // 图标映射：使用已有的React组件图标 + 合理的回退策略
  const iconMap = useMemo(() => ({
    // 统一使用简单的文字占位符，彻底避免颜色问题
    BTC: <IconWrapper><Box sx={{fontSize: '12px', fontWeight: 800, color: 'inherit'}}>₿</Box></IconWrapper>,
    ETH: <IconWrapper><Box sx={{fontSize: '12px', fontWeight: 800, color: 'inherit'}}>Ξ</Box></IconWrapper>,
    BNB: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>BNB</Box></IconWrapper>,
    SOL: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>SOL</Box></IconWrapper>,
    XRP: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>XRP</Box></IconWrapper>,
    USDT: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>USDT</Box></IconWrapper>,
    USDC: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>USDC</Box></IconWrapper>,
    ADA: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>ADA</Box></IconWrapper>,
    DOGE: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>DOGE</Box></IconWrapper>,
    TRX: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>TRX</Box></IconWrapper>,
    AVAX: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>AVAX</Box></IconWrapper>,
    LINK: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>LINK</Box></IconWrapper>,
    // 其他币种用简单的圆形+字母
    DEFAULT: (symbol) => <IconWrapper><Box sx={{fontSize: '8px', fontWeight: 800, color: 'inherit', textAlign: 'center'}}>{symbol.slice(0,4)}</Box></IconWrapper>
  }), []);

  // 通用占位符图标组件（用于没有官方图标的币种）
  const PlaceholderIcon = ({ symbol }) => (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha('#fff', 0.95),
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: 'monospace'
      }}
    >
      {symbol ? symbol.slice(0, 2).toUpperCase() : '?'}
    </Box>
  );

  /**
   * 获取币种图标的优先级规则（从高到低）：
   * 1) 本地手动映射的矢量图标（最清晰）
   * 2) API 返回的 image URL（CoinGecko 提供的官方 logo）
   * 3) @web3icons/react 动态图标；如果仍找不到，再回退到占位符
   * 这样可以尽量补齐缺失图标（你截图里的 BGB、SUSDE 等会走 2/3）。
   */


  // 静态图标URL映射（CoinGecko官方图标）
  const staticIconUrls = useMemo(() => ({
    BTC: 'https://coin-images.coingecko.com/coins/images/1/large/bitcoin.png',
    ETH: 'https://coin-images.coingecko.com/coins/images/279/large/ethereum.png',
    BNB: 'https://coin-images.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
    SOL: 'https://coin-images.coingecko.com/coins/images/4128/large/solana.png',
    XRP: 'https://coin-images.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
    USDT: 'https://coin-images.coingecko.com/coins/images/325/large/Tether.png',
    USDC: 'https://coin-images.coingecko.com/coins/images/6319/large/USD_Coin_icon.png',
    ADA: 'https://coin-images.coingecko.com/coins/images/975/large/cardano.png',
    DOGE: 'https://coin-images.coingecko.com/coins/images/5/large/dogecoin.png',
    TRX: 'https://coin-images.coingecko.com/coins/images/1094/large/tron-logo.png',
    AVAX: 'https://coin-images.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png',
    LINK: 'https://coin-images.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
    MATIC: 'https://coin-images.coingecko.com/coins/images/4713/large/matic-token-icon.png',
    DOT: 'https://coin-images.coingecko.com/coins/images/12171/large/polkadot.png',
    LTC: 'https://coin-images.coingecko.com/coins/images/2/large/litecoin.png',
    ICP: 'https://coin-images.coingecko.com/coins/images/14495/large/Internet_Computer_logo.png',
    UNI: 'https://coin-images.coingecko.com/coins/images/12504/large/uniswap-uni.png'
  }), []);

  // 智能图标获取：优先使用静态映射，然后API，最后回退
  const getIcon = useCallback((symbol, imageUrl) => {
    const upperSymbol = (symbol || '').toUpperCase();
    
    // 获取回退图标
    const fallbackIcon = iconMap[upperSymbol] || iconMap.DEFAULT(upperSymbol);
    
    // 1. 优先使用静态映射的官方图标
    const staticUrl = staticIconUrls[upperSymbol];
    if (staticUrl) {
      return <CoinImageIcon imageUrl={staticUrl} symbol={symbol} fallbackIcon={fallbackIcon} />;
    }
    
    // 2. 使用 API 返回的官方图标 URL（如果有）
    if (imageUrl) {
      return <CoinImageIcon imageUrl={imageUrl} symbol={symbol} fallbackIcon={fallbackIcon} />;
    }
    
    // 3. 使用手动映射的简单文字图标或默认占位符
    return fallbackIcon;
  }, [iconMap, staticIconUrls]);

  // 渲染纯中性图标（完全移除任何库自带的彩色背景）
  const renderNeutralIcon = (symbol) => (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: theme.palette.mode === 'dark'
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha('#fff', 0.95),
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        fontSize: '10px',
        fontWeight: 800,
        fontFamily: 'monospace'
      }}
    >
      {String(symbol || '?').slice(0, 4).toUpperCase()}
    </Box>
  );

  /**
   * 将后端标准化的币种数据转换为列表所需结构。
   * - 输入：dataTransformers.transformCoinData 的结果（含 price/change/marketCap/rank/volume/image）
   * - 输出：{ name, symbol, price(字符串), change(字符串), icon(ReactNode), sparkline(数组), marketCap, rank, volume }
   * - sparkline：用正弦波 + 少量噪声模拟 24h 走势（仅用于小图展示），不影响真实价格
   * 这些字段随后用于稳定排序与展示。
   */
  const transformApiDataForDashboard = (apiData) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    const hourBucket = lastUpdated ? Math.floor(lastUpdated.getTime() / 3600000) : Math.floor(Date.now() / 3600000);
    const makeSeededRandom = (seedPrefix) => (i) => {
      let hash = 0;
      const str = `${seedPrefix}-${i}`;
      for (let j = 0; j < str.length; j++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(j);
        hash |= 0;
      }
      const x = Math.sin(hash) * 10000;
      return x - Math.floor(x);
    };
    
    return apiData.map(coin => {
      const basePrice = Number(coin.price) || 1;
      const changePercent = Number(coin.change) || 0; // 来自 CoinGecko 的 24h 变化百分比
      const rand = makeSeededRandom(`${coin.symbol}-${hourBucket}`);

      // 生成 24h sparkline：围绕当前价，按变化幅度生成平滑曲线（种子随机，稳定同一小时内的噪声）
      const points = 24;
      const amplitude = Math.max(Math.abs(changePercent) / 100, 0.02);
      const sparklineData = Array.from({ length: points }, (_, i) => {
        const t = i / (points - 1);
        const wave = Math.sin(Math.PI * 2 * t) * amplitude * basePrice * 1.2;
        const trend = (changePercent / 100) * basePrice * 1.5 * (t - 0.5);
        const noise = (rand(i) - 0.5) * amplitude * basePrice * 0.35;
        const price = Math.max(0, basePrice + wave + trend + noise);
        return Number(price.toFixed(6));
      });

      return {
        name: coin.name || 'Unknown',
        symbol: (coin.symbol || 'UNKNOWN').toUpperCase(),
        price: `$${basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
        change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}%`,
        icon: getIcon(coin.symbol, coin.image),
        image: coin.image, // 添加官方图标URL
        sparkline: sparklineData,
        marketCap: Number(coin.marketCap) || 0,
        rank: Number(coin.rank) || Infinity,
        volume: Number(coin.volume) || 0,
      };
    });
  };

    // 获取市场数据（优化真实数据获取）
  const fetchMarketData = async (forceRefresh = false) => {
    let doingInitial = initialLoading;
    try {
      setError(null);
      if (forceRefresh) {
        try { cacheManager.clear(); } catch {}
      }
      if (doingInitial) {
        setInitialLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const response = await cachedMarketApi.getMarketData(50); // 拉多一点，方便排序与筛选
      if (response.success && response.data && response.data.length > 0) {
        const standardData = response.data.map(dataTransformers.transformCoinData);
        
        
        /**
         * 重要：稳定榜单顺序（解决"之前和现在不一样"的问题）
         * - 有些接口项可能缺少 marketCap，旧逻辑只按市值排会退化成"接口返回顺序"
         * - 这里先统一结构，再强制保证关键币种存在（BTC/ETH/USDT/USDC）
         * - 排序优先级：marketCap 降序 -> rank 升序 -> volume 降序
         */
        const all = transformApiDataForDashboard(standardData);
        const bySymbol = new Map(all.map(c => [c.symbol, c]));
        const ensureSymbols = ['BTC', 'ETH', 'USDT', 'USDC']; // 确保这4个一定在榜单
        const ensured = [...all];
        ensureSymbols.forEach(sym => {
          const found = bySymbol.get(sym);
          if (!ensured.find(c => c.symbol === sym) && found) {
            ensured.push(found);
          }
        });

        const safeCap = (v) => {
          const n = Number(v);
          return Number.isFinite(n) && n > 0 ? n : -1; // 缺失/无效的市值被视为最低
        };
        // 严格按市值排序：BTC > ETH > 其他，确保数值有效性
        const sorted = ensured.sort((a, b) => {
          const aVal = safeCap(a.marketCap);
          const bVal = safeCap(b.marketCap);
          
          // 优先级：有效市值 > 无效市值
          if (aVal > 0 && bVal <= 0) return -1;
          if (bVal > 0 && aVal <= 0) return 1;
          
          // 都有效：按市值降序
          if (aVal > 0 && bVal > 0) return bVal - aVal;
          
          // 都无效：按rank升序
          return (a.rank || Infinity) - (b.rank || Infinity);
        });

        const dashboardData = sorted.slice(0, 40);
        setMarketData(dashboardData);

        const summary = dataTransformers.transformMarketSummary(response.data);
        setMarketSummary(summary);
      } else {
        // API返回但无数据
        setError('市场数据暂时不可用，请稍后重试');
        setMarketData([]);
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Market data fetch error:', err);
      // 使用模拟数据作为回退
      const mockData = [
        { symbol: 'BTC', name: 'Bitcoin', price: '$118,584.15', change: '+1.7%', marketCap: 2340000000000, rank: 1, volume: 45000000000, icon: getIcon('BTC'), sparkline: Array.from({length: 24}, (_, i) => 118000 + Math.sin(i/4) * 2000 + Math.random() * 1000) },
        { symbol: 'ETH', name: 'Ethereum', price: '$4,244.97', change: '+0.1%', marketCap: 510000000000, rank: 2, volume: 23000000000, icon: getIcon('ETH'), sparkline: Array.from({length: 24}, (_, i) => 4200 + Math.sin(i/4) * 100 + Math.random() * 50) },
        { symbol: 'BNB', name: 'BNB', price: '$803.56', change: '-0.8%', marketCap: 117000000000, rank: 3, volume: 2100000000, icon: getIcon('BNB'), sparkline: Array.from({length: 24}, (_, i) => 800 + Math.sin(i/4) * 20 + Math.random() * 10) },
        { symbol: 'SOL', name: 'Solana', price: '$182.80', change: '+0.3%', marketCap: 85000000000, rank: 4, volume: 3400000000, icon: getIcon('SOL'), sparkline: Array.from({length: 24}, (_, i) => 180 + Math.sin(i/4) * 8 + Math.random() * 4) },
        { symbol: 'XRP', name: 'XRP', price: '$3.21', change: '-2.4%', marketCap: 183000000000, rank: 5, volume: 4200000000, icon: getIcon('XRP'), sparkline: Array.from({length: 24}, (_, i) => 3.2 + Math.sin(i/4) * 0.1 + Math.random() * 0.05) },
        { symbol: 'USDC', name: 'USD Coin', price: '$0.9998', change: '+0.0%', marketCap: 42000000000, rank: 6, volume: 8900000000, icon: getIcon('USDC'), sparkline: Array.from({length: 24}, () => 1.0) },
        { symbol: 'USDT', name: 'Tether', price: '$0.999982', change: '-0.0%', marketCap: 140000000000, rank: 7, volume: 89000000000, icon: getIcon('USDT'), sparkline: Array.from({length: 24}, () => 1.0) }
      ];
      
      setError(`API连接失败，显示演示数据: ${err.message || '网络连接失败'}`);
      setMarketData(mockData);
    } finally {
      if (doingInitial) {
        setInitialLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  };

  // useEffect hook - 在组件挂载时获取数据（只执行一次）
  useEffect(() => {
    let isMounted = true; // 防止组件卸载后setState
    
    const loadInitialData = async () => {
      if (isMounted) {
        console.log('Dashboard初次加载，获取市场数据...');
        await fetchMarketData();
      }
    };

    loadInitialData();

    return () => {
      isMounted = false; // 组件卸载时设置标志
    };
  }, []); // 确保依赖数组为空，只在组件首次挂载时执行



  // 获取K线图数据（仅在用户主动切换时获取）
  useEffect(() => {
    let isMounted = true;
    
    const fetchOhlcData = async () => {
      if (!isMounted) return;
      
      const currentId = ++requestIdRef.current;
      const startAt = Date.now();
      setOhlcLoading(true);
        
      try {
        // 币种ID映射
        const coinIdMap = { BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana' };
        const coinId = coinIdMap[selectedCoin.toUpperCase()] || 'bitcoin';
        const days = timeframe.replace('d', '');

        const response = await cachedMarketApi.getOhlcData(coinId, 'usd', days);
        if (!isMounted || currentId !== requestIdRef.current) return; // 忽略旧响应

        const data = response.success && response.data
          ? dataTransformers.transformOhlcData(response.data)
          : [];

        setOhlcData(data);
      } catch (err) {
        if (!isMounted || currentId !== requestIdRef.current) return;
        console.error('OHLC数据获取失败:', err);
        setOhlcData([]);
      } finally {
        if (!isMounted || currentId !== requestIdRef.current) return;
        const elapsed = Date.now() - startAt;
        const remain = Math.max(0, 300 - elapsed); // 至少显示300ms，避免闪烁
        setTimeout(() => isMounted && setOhlcLoading(false), remain);
      }
    };

    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(fetchOhlcData, 150);
    
    return () => {
      isMounted = false;
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    };
  }, [selectedCoin, timeframe]);

  const stats = [
    { title: "Total Market Cap", value: marketSummary.totalMarketCap, icon: <AccountBalanceWalletOutlinedIcon sx={{ color: theme.palette.primary.main }} />, color: theme.palette.primary.main },
    { title: "24h Volume", value: marketSummary.dailyVolume, icon: <TrendingUpIcon sx={{ color: theme.palette.success.main }} />, color: theme.palette.success.main },
    { title: "BTC Dominance", value: marketSummary.btcDominance, icon: <ShowChartOutlinedIcon sx={{ color: theme.palette.info.main }} />, color: theme.palette.info.main },
    { title: "ETH Dominance", value: marketSummary.ethDominance, icon: <BarChartOutlinedIcon sx={{ color: theme.palette.warning.main }} />, color: theme.palette.warning.main },
  ];

  // 优化移动视图卡片
  const MarketCardView = () => {
    if (marketData.length === 0) {
    return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无市场数据
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            请检查网络连接或稍后重试
          </Typography>
          <Button variant="contained" onClick={() => fetchMarketData(true)}>
            重新加载
          </Button>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {marketData.map((coin, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={coin.symbol}>
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
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.8)
                  : alpha('#fff', 0.95),
                border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                padding: 1,
                mr: 2,
                color: theme.palette.text.secondary,
                '& svg': {
                  color: 'inherit !important',
                  fill: 'currentColor !important'
                }
              }}
              className="asset-icon">
                {coin.image ? (
                  <img 
                    src={coin.image} 
                    alt={coin.symbol}
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      filter: 'grayscale(0) !important'
                    }}
                  />
                ) : (
                  <Box sx={{ fontSize: '10px', fontWeight: 800, fontFamily: 'monospace' }}>
                    {String(coin.symbol || '?').slice(0, 4).toUpperCase()}
                  </Box>
                )}
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
          </Grid>
      ))}
      </Grid>
    );
  };

  // 高级市场概览卡片组件
  const PremiumMarketCard = ({ coin, index }) => {
    const theme = useTheme();
    const isPositive = coin.change.startsWith('+') && coin.change !== '+0.0%';
    const isNegative = coin.change.startsWith('-');
    const isNeutral = coin.change === '+0.0%';

    const neutralColor = theme.palette.text.secondary; // 使用中性颜色替代trendColor

    return (
      <Fade in timeout={800 + index * 100}>
        <Box
          sx={{
            position: 'relative',
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
            borderRadius: '16px',
            p: 3,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
            '&:hover': {
              transform: 'translateY(-4px) scale(1.02)',
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              boxShadow: `0 20px 40px ${alpha(theme.palette.divider, 0.2)}`
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
              background: `radial-gradient(circle, ${alpha(neutralColor, 0.1)} 0%, transparent 70%)`,
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
                    ? alpha(theme.palette.background.paper, 0.8)
                    : alpha('#fff', 0.95),
                  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                  mr: 2,
                  position: 'relative',
                  color: theme.palette.text.secondary,
                  '& svg': {
                    color: 'inherit !important',
                    fill: 'currentColor !important',
                    filter: 'grayscale(100%) contrast(0.8) !important'
                  }
                }}
                className="asset-icon"
              >
                {coin.image ? (
                  <img 
                    src={coin.image} 
                    alt={coin.symbol}
                    style={{ 
                      width: '32px', 
                      height: '32px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      filter: 'grayscale(0) !important'
                    }}
                  />
                ) : (
                  <Box sx={{ fontSize: '12px', fontWeight: 800, fontFamily: 'monospace' }}>
                    {String(coin.symbol || '?').slice(0, 4).toUpperCase()}
                  </Box>
                )}
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
                background: `radial-gradient(circle, ${neutralColor}, ${alpha(neutralColor, 0.7)})`,
                boxShadow: `0 0 12px ${alpha(neutralColor, 0.5)}`,
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
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${neutralColor})`,
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
                background: `linear-gradient(135deg, ${alpha(neutralColor, 0.1)}, ${alpha(neutralColor, 0.05)})`,
                border: `1px solid ${alpha(neutralColor, 0.2)}`
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: neutralColor,
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
              strokeColor={neutralColor}
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
              background: `linear-gradient(90deg, transparent, ${neutralColor}, transparent)`,
              opacity: 0.6
            }}
          />
        </Box>
      </Fade>
    );
  };

  // 高级表格视图
  const PremiumMarketTableView = () => {
    // 显示错误状态
    if (error) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error" gutterBottom>
            API连接失败
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button variant="contained" onClick={() => fetchMarketData(true)}>
            重新连接
          </Button>
        </Box>
      );
    }

    if (marketData.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无市场数据
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            请检查网络连接或稍后重试
          </Typography>
          <Button variant="contained" onClick={() => fetchMarketData(true)}>
            重新加载
          </Button>
        </Box>
      );
    }

    const displayData = marketData;
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
              ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.55), rgba(15, 23, 42, 0.35))'
              : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9), rgba(241, 245, 249, 0.7))',
            borderRadius: '16px 16px 0 0',
            border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
            backdropFilter: 'blur(12px)',
            boxShadow: theme.palette.mode === 'dark'
              ? `0 6px 24px ${alpha('#000', 0.35)}`
              : `0 6px 24px ${alpha('#000', 0.12)}`
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
            const isNeutral = coin.change === '+0.0%';
            const neutralColor = theme.palette.text.secondary; // 使用中性颜色

            return (
              <Slide direction="up" in timeout={600 + index * 100} key={coin.symbol}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
                    gap: 2,
                    p: 2.5,
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.35), rgba(15, 23, 42, 0.22))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.7))',
                    backdropFilter: 'blur(12px)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                    borderTop: index === 0 ? `1px solid ${alpha(theme.palette.divider, 0.12)}` : 'none',
                    borderRadius: index === displayData.length - 1 ? '0 0 16px 16px' : '0',
                    transition: 'all 0.35s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.45), rgba(15, 23, 42, 0.32))'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.8))',
                      border: `1px solid ${alpha(theme.palette.divider, 0.25)}`,
                      transform: 'translateX(6px) scale(1.01)',
                      boxShadow: `0 14px 36px ${alpha(theme.palette.divider, 0.18)}`
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 4,
                      background: `linear-gradient(180deg, ${neutralColor}, ${alpha(neutralColor, 0.5)})`,
                      opacity: 0,
                      transition: 'opacity 0.3s ease'
                    },
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      right: -40,
                      top: -40,
                      width: 120,
                      height: 120,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${alpha(neutralColor, 0.14)}, transparent 60%)`,
                      pointerEvents: 'none'
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
                        background: theme.palette.mode === 'dark' 
                          ? alpha(theme.palette.background.paper, 0.8)
                          : alpha('#fff', 0.95),
                        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                        mr: 2,
                        position: 'relative',
                        color: theme.palette.text.secondary,
                        '& svg': {
                          color: 'inherit !important', 
                          fill: 'currentColor !important',
                          filter: 'none !important'
                        }
                      }}
                      className="asset-icon"
                    >
                                              {coin.image ? (
                          <img 
                            src={coin.image} 
                            alt={coin.symbol}
                            style={{ 
                              width: '28px', 
                              height: '28px',
                              borderRadius: '50%',
                              objectFit: 'cover',
                              filter: 'grayscale(0) !important'
                            }}
                          />
                        ) : (
                          <Box sx={{ fontSize: '11px', fontWeight: 800, fontFamily: 'monospace' }}>
                            {String(coin.symbol || '?').slice(0, 4).toUpperCase()}
                          </Box>
                        )}
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 800, mb: 0.25 }}>
                        {coin.name}
                      </Typography>
                      <Typography variant="caption" sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 700,
                        px: 1,
                        py: 0.25,
                        borderRadius: 1,
                        backgroundColor: alpha(theme.palette.divider, 0.08),
                        border: `1px solid ${alpha(theme.palette.divider, 0.18)}`
                      }}>
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
                        fontWeight: 800,
                        fontSize: '1.15rem',
                        color: theme.palette.text.primary
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
                        borderRadius: '999px',
                        background: alpha(theme.palette.divider, 0.1),
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 700, color: isPositive ? theme.palette.success.main : isNegative ? theme.palette.error.main : theme.palette.text.secondary }}>
                        {coin.change}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 24h Chart */}
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Box sx={{ width: 140, height: 54, p: 0.5, borderRadius: 1.5, background: theme.palette.mode === 'dark' ? alpha('#fff', 0.03) : alpha('#000', 0.03), border: `1px solid ${alpha(theme.palette.divider, 0.12)}` }}>
                      <PremiumSparkLine
                        data={coin.sparkline}
                        strokeColor={isPositive ? theme.palette.success.main : isNegative ? theme.palette.error.main : theme.palette.text.secondary}
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
    // 显示错误状态
    if (error) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="error" gutterBottom>
            API连接失败
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={() => fetchMarketData(true)}
            disabled={isLoading}
          >
            重新连接
          </Button>
        </Box>
      );
    }

    // 移除静态数据回退 - 完全依赖API
    if (marketData.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            暂无市场数据
          </Typography>
          <Button 
            variant="outlined" 
            onClick={() => fetchMarketData(true)}
            disabled={isLoading}
          >
            重新加载
          </Button>
        </Box>
      );
    }

    return (
      <Grid container spacing={3}>
        {marketData.map((coin, index) => (
          <Grid item xs={12} sm={6} lg={4} key={coin.symbol}>
            <PremiumMarketCard coin={coin} index={index} />
          </Grid>
        ))}
      </Grid>
    );
  };

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
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          /* 确保图标容器背景中性，但保留官方图标颜色 */
          .asset-icon {
            background: transparent !important;
          }
          .asset-icon img {
            /* 保留官方图标的原始颜色，强制圆形 */
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
                <Button onClick={() => setSelectedCoin('BTC')} variant={selectedCoin === 'BTC' ? 'contained' : 'text'} className={selectedCoin === 'BTC' ? 'Mui-selected' : ''} disableElevation startIcon={<Box sx={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={staticIconUrls.BTC} alt="BTC" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} /></Box>}>BTC</Button>
                <Button onClick={() => setSelectedCoin('ETH')} variant={selectedCoin === 'ETH' ? 'contained' : 'text'} className={selectedCoin === 'ETH' ? 'Mui-selected' : ''} disableElevation startIcon={<Box sx={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={staticIconUrls.ETH} alt="ETH" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} /></Box>}>ETH</Button>
                <Button onClick={() => setSelectedCoin('SOL')} variant={selectedCoin === 'SOL' ? 'contained' : 'text'} className={selectedCoin === 'SOL' ? 'Mui-selected' : ''} disableElevation startIcon={<Box sx={{ width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img src={staticIconUrls.SOL} alt="SOL" style={{ width: '18px', height: '18px', borderRadius: '50%', objectFit: 'cover' }} /></Box>}>SOL</Button>
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
                    '&:active': { transform: 'translateY(1px)' }
                  },
                  '& .MuiButton-root:hover': {
                    backgroundColor: alpha(coinAccent, 0.12),
                    borderColor: coinAccent,
                    boxShadow: `0 4px 10px ${alpha(coinAccent, 0.25)}`,
                    transform: 'translateY(-1px)'
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
                  variant={timeframe === '1d' ? 'contained' : 'outlined'}
                  className={timeframe === '1d' ? 'Mui-selected' : ''}
                  disableElevation
                  disabled={ohlcLoading}
                >
                  24H
                </Button>
                <Button 
                  onClick={() => setTimeframe('7d')}
                  variant={timeframe === '7d' ? 'contained' : 'outlined'}
                  className={timeframe === '7d' ? 'Mui-selected' : ''}
                  disableElevation
                  disabled={ohlcLoading}
                >
                  7D
                </Button>
                <Button 
                  onClick={() => setTimeframe('30d')}
                  variant={timeframe === '30d' ? 'contained' : 'outlined'}
                  className={timeframe === '30d' ? 'Mui-selected' : ''}
                  disableElevation
                  disabled={ohlcLoading}
                >
                  30D
                </Button>
              </ButtonGroup>
            </Box>
            {/* 图表区域：保持常驻 + 顶部细进度条 */}
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
                <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, borderRadius: 0, zIndex: 2, '& .MuiLinearProgress-bar': { backgroundColor: coinAccent } }} />
              )}
              <TradingViewChart data={ohlcData} colors={{
                backgroundColor: 'transparent',
                textColor: theme.palette.text.primary,
                lineColor: coinAccent,
                areaTopColor: alpha(coinAccent, 0.85),
                areaBottomColor: alpha(coinAccent, 0.12),
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