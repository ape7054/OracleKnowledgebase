import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Divider, Card, useMediaQuery, Fade, Slide, Tabs, Tab, TextField, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled, useTheme, alpha, keyframes } from '@mui/system';
import { ArrowUpward, ArrowDownward, Wallet, History, Settings as SettingsIcon, TrendingUp, CreditCard, Visibility, TrendingDown, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Search, Clear, Sort, Refresh } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Area, AreaChart, XAxis, YAxis, LineChart, Line } from 'recharts';
import React from 'react';
import { cachedMarketApi } from '../api/marketApi';

// Import icons from the cryptocurrency-icons library
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

// Animation definitions
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;

const slideInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Enhanced glassmorphic paper with premium effects
const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '24px',
    borderRadius: '16px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',
    animation: `${slideInUp} 0.6s ease-out`,

    ...(theme.palette.mode === 'dark'
      ? {
          backgroundColor: 'rgba(22, 27, 34, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }
      : {
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(145, 158, 171, 0.24)',
        }),

    '&:hover': {
        transform: 'translateY(-5px)',
        ...(theme.palette.mode === 'dark'
          ? {
              boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
            }
          : {
              boxShadow: '0 12px 40px 0 rgba(145, 158, 171, 0.3)',
            }),
    },
}));

// Premium styled button
const ActionButton = styled(Button)(({ theme }) => ({
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 600,
    padding: '8px 16px',
    background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))'
        : 'linear-gradient(135deg, rgba(99, 102, 241, 0.9), rgba(168, 85, 247, 0.9))',
    color: '#fff',
    border: 'none',
    boxShadow: theme.palette.mode === 'dark'
        ? '0 4px 15px 0 rgba(99, 102, 241, 0.3)'
        : '0 4px 15px 0 rgba(99, 102, 241, 0.4)',
    transition: 'all 0.3s ease',
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: theme.palette.mode === 'dark'
            ? '0 6px 20px 0 rgba(99, 102, 241, 0.4)'
            : '0 6px 20px 0 rgba(99, 102, 241, 0.5)',
    },
}));

// 高级SparkLine组件 - 从Dashboard复制
const PremiumSparkLine = ({ data, strokeColor, trend = 'up' }) => {
  const theme = useTheme();
  const chartData = data.map((v, i) => ({ value: v, index: i }));
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

  const colorScheme = colors[trend];
  const gradientId = `sparkline-gradient-${Math.random().toString(36).substr(2, 9)}`;
  const areaGradientId = `sparkline-area-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <Box sx={{
      width: '100%',
      height: '100%',
      position: 'relative',
      '& .spark-line': {
        filter: `drop-shadow(0 0 4px ${colorScheme.glow})`,
      },
      '& .spark-dot:hover': {
        r: 3,
        transition: 'r 0.2s ease'
      }
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
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
            <filter id={`glow-${gradientId}`} height="400%" width="400%" x="-150%" y="-150%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* 主线条 */}
          <Line
            type="monotone"
            dataKey="value"
            stroke={`url(#${gradientId})`}
            strokeWidth={3}
            dot={false}
            className="spark-line"
            style={{
              filter: `url(#glow-${gradientId})`,
            }}
            animationDuration={1500}
            animationBegin={200}
          />

          {/* 高亮点 */}
          <Line
            type="monotone"
            dataKey="value"
            stroke={colorScheme.primary}
            strokeWidth={1}
            dot={{
              fill: colorScheme.primary,
              strokeWidth: 0,
              r: 0,
              className: 'spark-dot'
            }}
            activeDot={{
              r: 3,
              fill: colorScheme.primary,
              stroke: '#fff',
              strokeWidth: 1,
              style: {
                filter: `drop-shadow(0 0 4px ${colorScheme.glow})`,
              }
            }}
            animationDuration={1500}
            animationBegin={400}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

// Static assets data with default values - formatted like Dashboard
const staticAssets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 1.26, price: '$118,424.38', value: 149244, icon: BtcIcon, change: '+0.3%', apiId: 'bitcoin' },
    { name: 'Ethereum', symbol: 'ETH', balance: 14.5, price: '$3,762.69', value: 54561, icon: EthIcon, change: '+2.0%', apiId: 'ethereum' },
    { name: 'XRP', symbol: 'XRP', balance: 8500, price: '$3.50', value: 29750, icon: XrpIcon, change: '+2.4%', apiId: 'ripple' },
    { name: 'Tether', symbol: 'USDT', balance: 25000, price: '$1.00', value: 25000, icon: UsdtIcon, change: '-0.0%', apiId: 'tether' },
    { name: 'BNB', symbol: 'BNB', balance: 32.1, price: '$701.38', value: 22514, icon: BnbIcon, change: '+2.6%', apiId: 'binancecoin' },
    { name: 'Solana', symbol: 'SOL', balance: 95.3, price: '$186.49', value: 17765, icon: SolIcon, change: '+4.7%', apiId: 'solana' },
    { name: 'USDC', symbol: 'USDC', balance: 15000, price: '$1.00', value: 15000, icon: UsdcIcon, change: '-0.0%', apiId: 'usd-coin' },
    { name: 'Dogecoin', symbol: 'DOGE', balance: 28500, price: '$0.37', value: 10545, icon: DogeIcon, change: '+7.2%', apiId: 'dogecoin' },
    { name: 'Cardano', symbol: 'ADA', balance: 18750, price: '$0.45', value: 8438, icon: AdaIcon, change: '-0.5%', apiId: 'cardano' },
    { name: 'TRON', symbol: 'TRX', balance: 25000, price: '$0.28', value: 7000, icon: TrxIcon, change: '+1.8%', apiId: 'tron' },
    { name: 'Avalanche', symbol: 'AVAX', balance: 145.2, price: '$42.15', value: 6120, icon: AvaxIcon, change: '+3.4%', apiId: 'avalanche-2' },
    { name: 'Chainlink', symbol: 'LINK', balance: 185.4, price: '$25.68', value: 4760, icon: LinkIcon, change: '+5.2%', apiId: 'chainlink' },
    { name: 'Bitcoin Cash', symbol: 'BCH', balance: 8.5, price: '$512.35', value: 4355, icon: BchIcon, change: '-2.1%', apiId: 'bitcoin-cash' },
    { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.035, price: '$118,342.86', value: 4142, icon: WbtcIcon, change: '+0.2%', apiId: 'wrapped-bitcoin' },
    { name: 'Stellar', symbol: 'XLM', balance: 7500, price: '$0.48', value: 3600, icon: XlmIcon, change: '+6.3%', apiId: 'stellar' }
];

// Portfolio performance data (static for demo)
const performanceData = [
    { name: 'Jan', value: 285000 },
    { name: 'Feb', value: 298000 },
    { name: 'Mar', value: 315000 },
    { name: 'Apr', value: 328000 },
    { name: 'May', value: 345000 },
    { name: 'Jun', value: 362834 },
];

// Transaction history data (static for demo)
const transactionHistory = [
    { type: 'Buy', asset: 'BTC', amount: '+0.05 BTC', value: '+$4,850.00', date: '2023-05-25 14:30' },
    { type: 'Sell', asset: 'ETH', amount: '-2.5 ETH', value: '-$9,250.00', date: '2023-05-24 09:15' },
    { type: 'Buy', asset: 'SOL', amount: '+50 SOL', value: '+$2,150.00', date: '2023-05-23 16:45' },
    { type: 'Deposit', asset: 'USDT', amount: '+5000 USDT', value: '+$5,000.00', date: '2023-05-20 10:30' },
];

// Premium Asset Card Component - Dashboard Style
const PremiumAssetCard = ({ asset, index }) => {
  const theme = useTheme();
  const isPositive = asset.change.startsWith('+') && asset.change !== '+0.0%';
  const isNegative = asset.change.startsWith('-');
  const isNeutral = asset.change === '+0.0%';

  const trendColor = isPositive ? theme.palette.success.main :
                    isNegative ? theme.palette.error.main :
                    theme.palette.grey[500];

  return (
    <Fade in timeout={800 + index * 100}>
      <Box
        sx={{
          backgroundColor: '#ffffff',
          border: '1px solid #e0e0e0',
          borderRadius: '12px',
          p: 3,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
          }
        }}
      >
        {/* Background decoration - removed for debugging */}

        {/* Header area */}
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
                mr: 2,
                '& svg': {
                  color: trendColor + ' !important',
                  fontSize: '1.5rem !important'
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
              <asset.icon style={{ width: 32, height: 32 }} />
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
                {asset.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  fontWeight: 500,
                  fontSize: '0.85rem'
                }}
              >
                {asset.symbol}
              </Typography>
            </Box>
          </Box>

          {/* Trend indicator */}
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

        {/* Price area */}
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
            {asset.price}
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
              {asset.change}
            </Typography>
          </Box>
        </Box>

        {/* Balance and Value info */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Balance
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              {asset.balance}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>
              Value
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
              ${asset.value.toLocaleString()}
            </Typography>
          </Box>
        </Box>

        {/* Bottom decoration line - removed for debugging */}
      </Box>
    </Fade>
  );
};

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

// 生成sparkline数据的函数 - 增强波动幅度
const generateSparklineData = (basePrice, changePercent, symbol) => {
    const numericPrice = typeof basePrice === 'string' ?
        parseFloat(basePrice.replace(/[$,]/g, '')) : basePrice;

    // 大幅增加波动幅度，让图表更加动态
    const volatility = Math.abs(changePercent) > 5 ? 0.35 :  // 从0.15增加到0.35
                      Math.abs(changePercent) > 2 ? 0.25 :   // 从0.08增加到0.25
                      0.15;                                   // 从0.04增加到0.15

    // 生成带趋势的价格数据
    return Array.from({ length: 12 }, (_, i) => {
        const progress = i / 11; // 0 to 1

        // 基础趋势（根据24h变化）- 增强趋势影响
        const trendComponent = numericPrice * (changePercent / 100) * progress * 1.5; // 增加1.5倍

        // 大幅增强随机波动
        const randomWalk = Math.sin(i * 0.8 + Math.random() * 3) * volatility * numericPrice; // 增加频率和幅度
        const microFluctuation = (Math.random() - 0.5) * 0.08 * numericPrice; // 从0.02增加到0.08

        // 添加更强烈的价格模式
        let patternComponent = 0;
        if (symbol === 'BTC' || symbol === 'WBTC') {
            // BTC通常有较大的波动 - 大幅增强
            patternComponent = Math.sin(i * 0.6) * 0.12 * numericPrice + // 从0.03增加到0.12
                              Math.cos(i * 0.4) * 0.08 * numericPrice;   // 添加额外波动
        } else if (symbol === 'ETH' || symbol === 'STETH') {
            // ETH可能有不同的波动模式 - 增强
            patternComponent = Math.cos(i * 0.7) * 0.10 * numericPrice + // 从0.025增加到0.10
                              Math.sin(i * 0.9) * 0.06 * numericPrice;   // 添加额外波动
        } else if (symbol === 'SOL') {
            // Solana通常波动较大
            patternComponent = Math.sin(i * 1.2) * 0.15 * numericPrice +
                              Math.cos(i * 0.8) * 0.10 * numericPrice;
        } else if (symbol === 'DOGE') {
            // Dogecoin波动更加剧烈
            patternComponent = Math.sin(i * 1.5) * 0.20 * numericPrice +
                              (Math.random() - 0.5) * 0.15 * numericPrice;
        } else if (symbol === 'USDT' || symbol === 'USDC') {
            // 稳定币保持微小波动
            return numericPrice + (Math.random() - 0.5) * 0.003 * numericPrice; // 稍微增加一点
        } else {
            // 其他币种也增加波动
            patternComponent = Math.sin(i * 0.5 + Math.random()) * 0.08 * numericPrice +
                              Math.cos(i * 0.3 + Math.random()) * 0.05 * numericPrice;
        }

        // 添加一些随机的价格跳跃，模拟真实市场
        const priceJump = Math.random() < 0.3 ? (Math.random() - 0.5) * 0.06 * numericPrice : 0;

        const finalPrice = numericPrice + trendComponent + randomWalk + microFluctuation + patternComponent + priceJump;

        // 确保价格不会变成负数，但允许更大的波动范围
        return Math.max(numericPrice * 0.7, finalPrice); // 允许最多30%的下跌
    });
};

function AccountFixed() {
    const [marketData, setMarketData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('value'); // 'value', 'change', 'name', 'price'
    const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'
    const theme = useTheme();

    // 完整的15个代币数据，sparkline将在useEffect中动态生成
    const staticAssets = [
        { symbol: 'BTC', name: 'Bitcoin', balance: 0.5, price: '$118,684.00', value: 59342, change: '+6.0%', icon: BtcIcon },
        { symbol: 'ETH', name: 'Ethereum', balance: 10, price: '$1,818.24', value: 18182, change: '+2.9%', icon: EthIcon },
        { symbol: 'XRP', name: 'XRP', balance: 1000, price: '$3.55', value: 3550, change: '+1.3%', icon: XrpIcon },
        { symbol: 'USDT', name: 'Tether', balance: 5000, price: '$1.00', value: 5000, change: '-0.0%', icon: UsdtIcon },
        { symbol: 'BNB', name: 'BNB', balance: 20, price: '$773.14', value: 15463, change: '+3.0%', icon: BnbIcon },
        { symbol: 'SOL', name: 'Solana', balance: 100, price: '$191.13', value: 19113, change: '+8.3%', icon: SolIcon },
        { symbol: 'USDC', name: 'USD Coin', balance: 2000, price: '$1.00', value: 2000, change: '+0.0%', icon: UsdcIcon },
        { symbol: 'DOGE', name: 'Dogecoin', balance: 10000, price: '$0.27', value: 2700, change: '+7.0%', icon: DogeIcon },
        { symbol: 'STETH', name: 'Lido Staked Ether', balance: 5, price: '$3,796.88', value: 18984, change: '+2.8%', icon: EthIcon },
        { symbol: 'ADA', name: 'Cardano', balance: 2000, price: '$0.89', value: 1780, change: '+5.2%', icon: AdaIcon },
        { symbol: 'TRX', name: 'TRON', balance: 5000, price: '$0.32', value: 1600, change: '-1.3%', icon: TrxIcon },
        { symbol: 'AVAX', name: 'Avalanche', balance: 50, price: '$45.20', value: 2260, change: '+4.1%', icon: AvaxIcon },
        { symbol: 'LINK', name: 'Chainlink', balance: 100, price: '$28.50', value: 2850, change: '+2.7%', icon: LinkIcon },
        { symbol: 'BCH', name: 'Bitcoin Cash', balance: 10, price: '$520.30', value: 5203, change: '+1.9%', icon: BchIcon },
        { symbol: 'WBTC', name: 'Wrapped Bitcoin', balance: 0.2, price: '$118,500.00', value: 23700, change: '+5.8%', icon: WbtcIcon }
    ];

    useEffect(() => {
        // 模拟加载，每次都重新生成sparkline数据以获得不同的波动
        setTimeout(() => {
            const assetsWithFreshSparklines = staticAssets.map(asset => ({
                ...asset,
                sparkline: generateSparklineData(
                    parseFloat(asset.price.replace(/[$,]/g, '')),
                    parseFloat(asset.change.replace(/[+%]/g, '')),
                    asset.symbol
                )
            }));
            setMarketData(assetsWithFreshSparklines);
            setLoading(false);
        }, 1000);
    }, []);

    // 过滤和排序资产数据
    const filteredAndSortedAssets = marketData
        .filter(asset =>
            asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            let aValue, bValue;

            switch (sortBy) {
                case 'name':
                    aValue = a.name.toLowerCase();
                    bValue = b.name.toLowerCase();
                    break;
                case 'price':
                    aValue = parseFloat(a.price.replace(/[$,]/g, ''));
                    bValue = parseFloat(b.price.replace(/[$,]/g, ''));
                    break;
                case 'change':
                    aValue = parseFloat(a.change.replace(/[+%]/g, ''));
                    bValue = parseFloat(b.change.replace(/[+%]/g, ''));
                    break;
                case 'value':
                default:
                    aValue = a.value;
                    bValue = b.value;
                    break;
            }

            if (sortBy === 'name') {
                // 字符串排序
                if (sortOrder === 'asc') {
                    return aValue.localeCompare(bValue);
                } else {
                    return bValue.localeCompare(aValue);
                }
            } else {
                // 数字排序
                if (sortOrder === 'asc') {
                    return aValue - bValue;
                } else {
                    return bValue - aValue;
                }
            }
        });

    const totalValue = marketData.reduce((sum, asset) => sum + asset.value, 0);

    // 清除搜索
    const handleClearSearch = () => {
        setSearchTerm('');
    };

    // 处理排序变化
    const handleSortChange = (newSortBy) => {
        if (sortBy === newSortBy) {
            // 如果点击相同的排序字段，切换排序顺序
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            // 如果点击不同的排序字段，设置新字段并默认降序
            setSortBy(newSortBy);
            setSortOrder('desc');
        }
    };

    // 刷新趋势图数据
    const handleRefreshCharts = () => {
        const assetsWithFreshSparklines = marketData.map(asset => ({
            ...asset,
            sparkline: generateSparklineData(
                parseFloat(asset.price.replace(/[$,]/g, '')),
                parseFloat(asset.change.replace(/[+%]/g, '')),
                asset.symbol
            )
        }));
        setMarketData(assetsWithFreshSparklines);
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
                Account Overview
            </Typography>

            {/* 总价值显示 */}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: '16px',
                p: 4,
                mb: 3,
                boxShadow: `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`,
                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.background.paper, 0.95)})`,
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${alpha(theme.palette.primary.main, 0.5)})`
                }
            }}>
                <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                    Total Portfolio Value
                </Typography>
                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        textShadow: `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}`
                    }}
                >
                    ${totalValue.toLocaleString()}
                </Typography>
            </Box>

            {/* 搜索和排序控制区域 */}
            <Box sx={{
                mb: 3,
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexDirection: { xs: 'column', sm: 'row' }
            }}>
                {/* 搜索框 */}
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search assets by name or symbol..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search sx={{ color: theme.palette.text.secondary }} />
                            </InputAdornment>
                        ),
                        endAdornment: searchTerm && (
                            <InputAdornment position="end">
                                <Button
                                    onClick={handleClearSearch}
                                    sx={{
                                        minWidth: 'auto',
                                        p: 0.5,
                                        color: theme.palette.text.secondary,
                                        '&:hover': {
                                            backgroundColor: alpha(theme.palette.text.secondary, 0.1)
                                        }
                                    }}
                                >
                                    <Clear fontSize="small" />
                                </Button>
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: theme.palette.background.paper,
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            borderRadius: '12px',
                            '&:hover': {
                                borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            '&.Mui-focused': {
                                borderColor: theme.palette.primary.main,
                                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                            }
                        },
                        '& .MuiOutlinedInput-notchedOutline': {
                            border: 'none'
                        }
                    }}
                />

                {/* 排序选择器 */}
                <FormControl sx={{
                    minWidth: { xs: '100%', sm: 200 },
                    width: { xs: '100%', sm: 'auto' }
                }}>
                    <Select
                        value={`${sortBy}-${sortOrder}`}
                        onChange={(e) => {
                            const [newSortBy, newSortOrder] = e.target.value.split('-');
                            setSortBy(newSortBy);
                            setSortOrder(newSortOrder);
                        }}
                        displayEmpty
                        startAdornment={
                            <InputAdornment position="start">
                                <Sort sx={{ color: theme.palette.text.secondary, mr: 1 }} />
                            </InputAdornment>
                        }
                        sx={{
                            backgroundColor: theme.palette.background.paper,
                            backdropFilter: 'blur(20px)',
                            border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                            borderRadius: '12px',
                            '&:hover': {
                                borderColor: alpha(theme.palette.primary.main, 0.3),
                            },
                            '&.Mui-focused': {
                                borderColor: theme.palette.primary.main,
                                boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                border: 'none'
                            }
                        }}
                    >
                        <MenuItem value="value-desc">Value (High to Low)</MenuItem>
                        <MenuItem value="value-asc">Value (Low to High)</MenuItem>
                        <MenuItem value="change-desc">Change (High to Low)</MenuItem>
                        <MenuItem value="change-asc">Change (Low to High)</MenuItem>
                        <MenuItem value="price-desc">Price (High to Low)</MenuItem>
                        <MenuItem value="price-asc">Price (Low to High)</MenuItem>
                        <MenuItem value="name-asc">Name (A to Z)</MenuItem>
                        <MenuItem value="name-desc">Name (Z to A)</MenuItem>
                    </Select>
                </FormControl>

                {/* 刷新趋势图按钮 */}
                <Button
                    onClick={handleRefreshCharts}
                    variant="outlined"
                    startIcon={<Refresh />}
                    sx={{
                        minWidth: { xs: '100%', sm: 'auto' },
                        backgroundColor: theme.palette.background.paper,
                        backdropFilter: 'blur(20px)',
                        border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                        borderRadius: '12px',
                        '&:hover': {
                            borderColor: alpha(theme.palette.primary.main, 0.3),
                            backgroundColor: alpha(theme.palette.primary.main, 0.05),
                        }
                    }}
                >
                    Refresh Charts
                </Button>
            </Box>

            {/* 资产列表 */}
            <Box sx={{
                backgroundColor: theme.palette.background.paper,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${alpha(theme.palette.divider, 0.2)}`,
                borderRadius: '16px',
                overflow: 'hidden'
            }}>
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <Typography>Loading assets...</Typography>
                    </Box>
                ) : filteredAndSortedAssets.length === 0 ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4 }}>
                        <Search sx={{ fontSize: 48, color: theme.palette.text.secondary, mb: 2 }} />
                        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
                            No assets found
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, textAlign: 'center' }}>
                            {searchTerm ? `No assets match "${searchTerm}"` : 'No assets available'}
                        </Typography>
                        {searchTerm && (
                            <Button
                                onClick={handleClearSearch}
                                sx={{ mt: 2 }}
                                variant="outlined"
                            >
                                Clear Search
                            </Button>
                        )}
                    </Box>
                ) : (
                    filteredAndSortedAssets.map((asset, index) => (
                        <AssetListItem
                            key={asset.symbol}
                            asset={asset}
                            isLast={index === filteredAndSortedAssets.length - 1}
                        />
                    ))
                )}
            </Box>
        </Box>
    );
}

// 资产列表项组件，参考Dashboard样式，响应式优化
const AssetListItem = ({ asset, isLast }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isPositive = asset.change.startsWith('+');
    const trendColor = isPositive ? '#4caf50' : '#f44336';

    if (isMobile) {
        // 移动端布局：垂直堆叠
        return (
            <Box
                sx={{
                    p: 2,
                    borderBottom: isLast ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    }
                }}
            >
                {/* 顶部行：图标、名称和价格 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <Box
                            sx={{
                                width: 28,
                                height: 28,
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mr: 1.5,
                                backgroundColor: alpha(trendColor, 0.1),
                                border: `1px solid ${alpha(trendColor, 0.2)}`
                            }}
                        >
                            <asset.icon style={{ width: 16, height: 16, color: trendColor }} />
                        </Box>
                        <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                                {asset.name}
                            </Typography>
                            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                                {asset.symbol}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {asset.price}
                    </Typography>
                </Box>

                {/* 底部行：变化百分比和趋势图 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1,
                            py: 0.5,
                            borderRadius: '4px',
                            backgroundColor: alpha(trendColor, 0.1),
                            border: `1px solid ${alpha(trendColor, 0.2)}`
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: trendColor,
                                fontWeight: 600,
                            }}
                        >
                            {asset.change}
                        </Typography>
                    </Box>

                    <Box sx={{ width: 80, height: 30 }}>
                        {asset.sparkline && asset.sparkline.length > 0 ? (
                            <PremiumSparkLine
                                data={asset.sparkline}
                                strokeColor={trendColor}
                                trend={isPositive ? 'up' : asset.change.startsWith('-') ? 'down' : 'neutral'}
                            />
                        ) : (
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    background: `linear-gradient(90deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`,
                                    borderRadius: '4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: `1px solid ${alpha(trendColor, 0.1)}`
                                }}
                            >
                                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: '0.6rem' }}>
                                    Chart
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Box>
        );
    }

    // 桌面端布局：水平排列
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                borderBottom: isLast ? 'none' : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'all 0.2s ease',
                '&:hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateX(4px)'
                }
            }}
        >
            {/* 左侧：图标和名称 */}
            <Box sx={{ display: 'flex', alignItems: 'center', minWidth: { xs: 150, sm: 200 } }}>
                <Box
                    sx={{
                        width: 32,
                        height: 32,
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mr: 2,
                        backgroundColor: alpha(trendColor, 0.1),
                        border: `1px solid ${alpha(trendColor, 0.2)}`
                    }}
                >
                    <asset.icon style={{ width: 20, height: 20, color: trendColor }} />
                </Box>
                <Box>
                    <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
                        {asset.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
                        {asset.symbol}
                    </Typography>
                </Box>
            </Box>

            {/* 中间：价格 */}
            <Box sx={{ minWidth: { xs: 80, sm: 120 }, textAlign: 'right' }}>
                <Typography variant="body1" sx={{ fontWeight: 600, color: theme.palette.text.primary, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                    {asset.price}
                </Typography>
            </Box>

            {/* 变化百分比 */}
            <Box sx={{ minWidth: { xs: 60, sm: 80 }, textAlign: 'center', mx: { xs: 1, sm: 2 } }}>
                <Box
                    sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: '6px',
                        backgroundColor: alpha(trendColor, 0.1),
                        border: `1px solid ${alpha(trendColor, 0.2)}`
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{
                            color: trendColor,
                            fontWeight: 600,
                            fontSize: '0.875rem'
                        }}
                    >
                        {asset.change}
                    </Typography>
                </Box>
            </Box>

            {/* 右侧：真实趋势图 */}
            <Box sx={{ minWidth: { xs: 80, sm: 100 }, height: { xs: 30, sm: 40 }, ml: 'auto' }}>
                {asset.sparkline && asset.sparkline.length > 0 ? (
                    <PremiumSparkLine
                        data={asset.sparkline}
                        strokeColor={trendColor}
                        trend={isPositive ? 'up' : asset.change.startsWith('-') ? 'down' : 'neutral'}
                    />
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            background: `linear-gradient(90deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`,
                            borderRadius: '6px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: `1px solid ${alpha(trendColor, 0.1)}`
                        }}
                    >
                        <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            No Data
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default AccountFixed;
