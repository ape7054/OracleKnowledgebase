import { useState, useMemo, useEffect } from 'react';
import { Box, Grid, Typography, Paper, useTheme, Table, TableBody, TableCell, TableHead, TableRow, Chip, useMediaQuery, Divider, Button, ButtonGroup } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line, PieChart, Pie, Cell, RadialBarChart, RadialBar } from 'recharts';
import { styled, alpha } from '@mui/system';

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

// Import API services
import { cachedMarketApi, dataTransformers } from '../api/marketApi';

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

const chartData = {
  BTC: [
    { name: '00:00', value: 62000 }, { name: '02:00', value: 62500 }, { name: '04:00', value: 63500 }, { name: '06:00', value: 63200 },
    { name: '08:00', value: 61000 }, { name: '10:00', value: 61500 }, { name: '12:00', value: 64000 }, { name: '14:00', value: 64200 },
    { name: '16:00', value: 65000 }, { name: '18:00', value: 64800 }, { name: '20:00', value: 64500 }, { name: '22:00', value: 65800 },
    { name: '24:00', value: 66000 },
  ],
  ETH: [
    { name: '00:00', value: 3100 }, { name: '02:00', value: 3120 }, { name: '04:00', value: 3200 }, { name: '06:00', value: 3180 },
    { name: '08:00', value: 3150 }, { name: '10:00', value: 3170 }, { name: '12:00', value: 3250 }, { name: '14:00', value: 3260 },
    { name: '16:00', value: 3300 }, { name: '18:00', value: 3290 }, { name: '20:00', value: 3280 }, { name: '22:00', value: 3340 },
    { name: '24:00', value: 3350 },
  ],
  SOL: [
    { name: '00:00', value: 150 }, { name: '02:00', value: 152 }, { name: '04:00', value: 155 }, { name: '06:00', value: 154 },
    { name: '08:00', value: 148 }, { name: '10:00', value: 151 }, { name: '12:00', value: 160 }, { name: '14:00', value: 162 },
    { name: '16:00', value: 165 }, { name: '18:00', value: 163 }, { name: '20:00', value: 162 }, { name: '22:00', value: 168 },
    { name: '24:00', value: 170 },
  ]
};

const chartMeta = {
  BTC: { stroke: '#f7931a', id: 'colorBtc' },
  ETH: { stroke: '#627eea', id: 'colorEth' },
  SOL: { stroke: '#14f195', id: 'colorSol' },
}

const staticMarketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$63,500', change: '+2.5%', icon: BtcIcon, sparkline: chartData.BTC.map(d => d.value) },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,250', change: '+3.2%', icon: EthIcon, sparkline: chartData.ETH.map(d => d.value) },
  { name: 'Solana', symbol: 'SOL', price: '$162', change: '+5.1%', icon: SolIcon, sparkline: chartData.SOL.map(d => d.value) },
  { name: 'BNB', symbol: 'BNB', price: '$580', change: '-1.2%', icon: BnbIcon, sparkline: [590, 585, 583, 588, 580] },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '-0.5%', icon: AdaIcon, sparkline: [0.46, 0.455, 0.452, 0.458, 0.45] },
  { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '+0.0%', icon: UsdtIcon, sparkline: [1.00, 1.00, 1.00, 1.00, 1.00] },
];

const StatCard = ({ title, value, icon, color }) => (
    <GlassmorphicPaper sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        p: 3,
        position: 'relative',
        overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${alpha(color, 0.1)}, transparent 70%)`,
        zIndex: 0
      }} />
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <Box sx={{
          width: 56, 
          height: 56, 
          borderRadius: '12px',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
        backgroundColor: alpha(color, 0.15),
          boxShadow: `0 4px 12px ${alpha(color, 0.35)}`,
        mr: 2,
      }}>
        {icon}
      </Box>
      <Box>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 0.5 }}>{title}</Typography>
          <Typography variant="h5" sx={{ fontWeight: 'bold', background: `linear-gradient(45deg, ${color}, ${color}CC)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{value}</Typography>
        </Box>
      </Box>
    </GlassmorphicPaper>
);
  
const SparkLine = ({ data, strokeColor }) => (
  <ResponsiveContainer width="100%" height={60}>
    <LineChart data={data.map(v => ({ value: v }))}>
      <defs>
        <linearGradient id={`spark-${strokeColor}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={alpha(strokeColor, 0.1)} />
          <stop offset="40%" stopColor={alpha(strokeColor, 0.8)} />
          <stop offset="100%" stopColor={strokeColor} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <Tooltip content={() => null} />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke={`url(#spark-${strokeColor})`} 
        strokeWidth={3} 
        dot={false} 
        style={{ filter: 'url(#glow)' }}
        animationDuration={1500}
      />
    </LineChart>
  </ResponsiveContainer>
);

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
  const [timeframe, setTimeframe] = useState('24h');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 新增状态管理
  const [marketData, setMarketData] = useState([]);
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
    'BTC': BtcIcon,
    'ETH': EthIcon,
    'SOL': SolIcon,
    'BNB': BnbIcon,
    'ADA': AdaIcon,
    'USDT': UsdtIcon,
    'TRX': TrxIcon,
    'WSTETH': EthIcon,  // Wrapped stETH 使用 ETH 图标
    'WBTC': WbtcIcon,   // Wrapped Bitcoin
    'HYPE': BtcIcon,    // Hyperliquid 暂时使用 BTC 图标 (没有专用图标)
    'XLM': XlmIcon,     // Stellar
    'SUI': SolIcon,     // Sui 暂时使用 SOL 图标 (没有专用图标)
    'LINK': LinkIcon,   // Chainlink
    'HBAR': AdaIcon,    // Hedera 暂时使用 ADA 图标 (没有专用图标)
    'BCH': BchIcon,     // Bitcoin Cash
    'AVAX': AvaxIcon,   // Avalanche
    'XRP': XrpIcon,     // Ripple
  };

  // 转换API数据为Dashboard组件期望的格式
  const transformApiDataForDashboard = (apiData) => {
    return apiData.map(coin => {
      const symbol = coin.symbol.toUpperCase();
      const changePercent = coin.change || 0;
      const changeStr = changePercent >= 0 ? `+${changePercent.toFixed(1)}%` : `${changePercent.toFixed(1)}%`;

      // 生成模拟的sparkline数据
      const basePrice = coin.price || 0;
      const sparkline = Array.from({ length: 24 }, (_, i) => {
        const variation = (Math.random() - 0.5) * 0.1; // ±5% 变化
        return basePrice * (1 + variation);
      });

      return {
        name: coin.name,
        symbol: symbol,
        price: `$${coin.price?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}`,
        change: changeStr,
        icon: iconMap[symbol] || BtcIcon, // 默认使用BTC图标
        sparkline: sparkline
      };
    });
  };

  // 获取市场数据
  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await cachedMarketApi.getMarketData(20); // 获取前20名

      if (response.success && response.data) {
        // 先转换为标准格式
        const standardData = response.data.map(dataTransformers.transformCoinData);

        // 再转换为Dashboard组件期望的格式
        const dashboardData = transformApiDataForDashboard(standardData);
        setMarketData(dashboardData);

        // 计算市场概览数据
        const summary = dataTransformers.transformMarketSummary(response.data);
        setMarketSummary(summary);

        setLastUpdated(new Date());
        console.log('Market data updated:', dashboardData.length, 'coins');
      }
    } catch (err) {
      console.error('Failed to fetch market data:', err);
      setError('Failed to load market data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取数据
  useEffect(() => {
    fetchMarketData();

    // 设置定时刷新（每30秒）
    const interval = setInterval(fetchMarketData, 30000);

    return () => clearInterval(interval);
  }, []);

  const stats = [
    { title: "Total Market Cap", value: marketSummary.totalMarketCap, icon: <AccountBalanceWalletOutlinedIcon sx={{ color: theme.palette.primary.main }} />, color: theme.palette.primary.main },
    { title: "24h Volume", value: marketSummary.dailyVolume, icon: <TrendingUpIcon sx={{ color: theme.palette.success.main }} />, color: theme.palette.success.main },
    { title: "BTC Dominance", value: marketSummary.btcDominance, icon: <ShowChartOutlinedIcon sx={{ color: theme.palette.info.main }} />, color: theme.palette.info.main },
    { title: "ETH Dominance", value: marketSummary.ethDominance, icon: <BarChartOutlinedIcon sx={{ color: theme.palette.warning.main }} />, color: theme.palette.warning.main },
  ];

  const MemoizedAreaChart = useMemo(() => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData[selectedCoin]} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
        <defs>
            <linearGradient id={chartMeta[selectedCoin].id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartMeta[selectedCoin].stroke} stopOpacity={0.7}/>
                <stop offset="95%" stopColor={chartMeta[selectedCoin].stroke} stopOpacity={0}/>
            </linearGradient>
            <filter id="shadow" height="200%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor={`${chartMeta[selectedCoin].stroke}66`}/>
            </filter>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.5)} vertical={false} />
        <XAxis 
          dataKey="name" 
          stroke={theme.palette.text.secondary} 
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
          tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
        />
        <YAxis 
          stroke={theme.palette.text.secondary} 
          tick={{ fontSize: 12 }} 
          tickFormatter={(value) => `$${(value/1000)}k`}
          axisLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
          tickLine={{ stroke: alpha(theme.palette.text.secondary, 0.2) }}
        />
        <Tooltip content={<CustomTooltip theme={theme} />} />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke={chartMeta[selectedCoin].stroke} 
          strokeWidth={3} 
          fillOpacity={1} 
          fill={`url(#${chartMeta[selectedCoin].id})`}
          style={{ filter: 'url(#shadow)' }}
          animationDuration={1500}
        />
      </AreaChart>
    </ResponsiveContainer>
  ), [selectedCoin, theme]);

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
                mr: 2
              }}>
                <coin.icon style={{ width: 28, height: 28 }} />
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
            <Box sx={{ width: '60%', height: 40 }}>
              <SparkLine 
                data={coin.sparkline} 
                strokeColor={coin.change.startsWith('+') ? theme.palette.success.main : 
                             coin.change === '+0.0%' ? theme.palette.grey[500] : theme.palette.error.main} 
              />
            </Box>
          </Box>
        </GlassmorphicPaper>
      ))}
    </Box>
    );
  };

  // 美化表格视图
  const MarketTableView = () => {
    const displayData = marketData.length > 0 ? marketData : staticMarketData;
    return (
      <StyledTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">24h Change</TableCell>
            <TableCell align="right" sx={{ width: '150px' }}>24h Chart</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayData.map((coin) => (
          <TableRow key={coin.symbol} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
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
                    mr: 2
                  }}>
                    <coin.icon style={{ width: 28, height: 28 }} />
                  </Box>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{coin.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{coin.symbol}</Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell align="right">
                <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{coin.price}</Typography>
            </TableCell>
            <TableCell align="right">
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
                      : alpha(theme.palette.error.main, 0.1),
                  ml: 'auto',
                  width: 'fit-content'
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
            </TableCell>
            <TableCell align="right">
              <SparkLine 
                data={coin.sparkline} 
                strokeColor={coin.change.startsWith('+') ? theme.palette.success.main : 
                             coin.change === '+0.0%' ? theme.palette.grey[500] : theme.palette.error.main} 
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </StyledTableContainer>
    );
  };

  // 显示加载状态
  if (loading) {
    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: 2
      }}>
        <Box sx={{
          width: 60,
          height: 60,
          border: `4px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderTop: `4px solid ${theme.palette.primary.main}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' }
          }
        }} />
        <Typography variant="h6" color="text.secondary">
          Loading Market Data...
        </Typography>
      </Box>
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
    <Box sx={{ pb: 4 }}>
      {/* Add global style to remove focus outlines */}
      <style jsx global>{`
        button:focus, [role="button"]:focus, .MuiButtonBase-root:focus, .MuiButtonBase-root.MuiButton-root:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        .MuiButtonGroup-root .MuiButton-root:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        .MuiOutlinedInput-root:focus, .MuiOutlinedInput-root:focus-within,
        .MuiInputBase-root:focus, .MuiInputBase-root:focus-within,
        .MuiSelect-select:focus, .MuiMenuItem-root:focus,
        .MuiListItemButton-root:focus, .MuiChip-root:focus,
        .MuiTab-root:focus, .MuiTabs-root:focus,
        .MuiPaginationItem-root:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        .MuiIconButton-root:focus {
          outline: none !important;
          box-shadow: none !important;
        }
        .MuiInputLabel-root:focus {
          outline: none !important;
        }
        .MuiSelect-select.MuiSelect-outlined:focus {
          background-color: transparent !important;
        }
        a:focus, a:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
        input:focus {
          outline: none !important;
        }
        .MuiSlider-thumb:focus, .MuiSlider-thumb:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }
      `}</style>
      
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 6,
              height: 32,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '3px',
            }}
          />
          <Typography variant="h4" sx={{
            fontWeight: 700,
            mb: 1,
            background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Market Pulse Dashboard
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary">
          Comprehensive market sentiment analysis and real-time cryptocurrency insights
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Stats Cards Row */}
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard title={stat.title} value={stat.value} icon={stat.icon} color={stat.color} />
          </Grid>
        ))}
        
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
            <SignalCellularAltIcon sx={{ mr: 1.5, color: theme.palette.primary.main }} />
            <Typography variant="h6" sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Price Trends
          </Typography>
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
                  onClick={() => setTimeframe('24h')}
                  variant={timeframe === '24h' ? 'contained' : 'outlined'}
                  className={timeframe === '24h' ? 'Mui-selected' : ''}
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
            <Box height={isMobile ? 300 : 400}>
              {MemoizedAreaChart}
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
            {isMobile ? <MarketCardView /> : <MarketTableView />}
          </GlassmorphicPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 