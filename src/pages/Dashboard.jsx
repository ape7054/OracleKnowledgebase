import { useState, useMemo } from 'react';
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
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
                    } : {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
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

const marketData = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$63,500', change: '+2.5%', icon: BtcIcon, sparkline: chartData.BTC.map(d => d.value) },
  { name: 'Ethereum', symbol: 'ETH', price: '$3,250', change: '+3.2%', icon: EthIcon, sparkline: chartData.ETH.map(d => d.value) },
  { name: 'Solana', symbol: 'SOL', price: '$162', change: '+5.1%', icon: SolIcon, sparkline: chartData.SOL.map(d => d.value) },
  { name: 'BNB', symbol: 'BNB', price: '$580', change: '-1.2%', icon: BnbIcon, sparkline: [590, 585, 583, 588, 580] },
  { name: 'Cardano', symbol: 'ADA', price: '$0.45', change: '-0.5%', icon: AdaIcon, sparkline: [0.46, 0.455, 0.452, 0.458, 0.45] },
  { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '+0.0%', icon: UsdtIcon, sparkline: [1.00, 1.00, 1.00, 1.00, 1.00] },
];

const StatCard = ({ title, value, icon, color }) => (
    <GlassmorphicPaper sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', p: 3 }}>
      <Box sx={{
        width: 52, height: 52, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: alpha(color, 0.15),
        mr: 2,
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body1" color="text.secondary">{title}</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
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
      </defs>
      <Tooltip content={() => null} />
      <Line type="monotone" dataKey="value" stroke={`url(#spark-${strokeColor})`} strokeWidth={2.5} dot={false} />
    </LineChart>
  </ResponsiveContainer>
);

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

// 社交媒体提及度组件
const SocialMentions = () => {
  const theme = useTheme();
  const data = [
    { name: 'Twitter', value: 65, color: '#1DA1F2' },
    { name: 'Reddit', value: 25, color: '#FF4500' },
    { name: 'Telegram', value: 10, color: '#0088cc' },
  ];
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <Box sx={{ width: '50%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => [`${value}%`, 'Mentions']}
              contentStyle={{
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(33, 43, 54, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                borderRadius: '8px',
                border: 'none',
                boxShadow: theme.shadows[3],
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Box>
      <Box sx={{ width: '45%' }}>
        {data.map((platform) => (
          <Box key={platform.name} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {platform.name}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: platform.color, mr: 1 }} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {platform.value}%
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

function Dashboard() {
  const theme = useTheme();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [timeframe, setTimeframe] = useState('24h');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const stats = [
    { title: "Portfolio Value", value: "$12,450.80", icon: <AccountBalanceWalletOutlinedIcon sx={{ color: theme.palette.primary.main }} />, color: theme.palette.primary.main },
    { title: "24h Change", value: "+$320.50", icon: <TrendingUpIcon sx={{ color: theme.palette.success.main }} />, color: theme.palette.success.main },
    { title: "Total P&L", value: "$1,890.20", icon: <ShowChartOutlinedIcon sx={{ color: theme.palette.info.main }} />, color: theme.palette.info.main },
    { title: "Open Positions", value: "3", icon: <BarChartOutlinedIcon sx={{ color: theme.palette.warning.main }} />, color: theme.palette.warning.main },
  ];

  const MemoizedAreaChart = useMemo(() => (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={chartData[selectedCoin]} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <defs>
            <linearGradient id={chartMeta[selectedCoin].id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartMeta[selectedCoin].stroke} stopOpacity={0.7}/>
                <stop offset="95%" stopColor={chartMeta[selectedCoin].stroke} stopOpacity={0}/>
            </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} vertical={false} />
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} tick={{ fontSize: 12 }} />
        <YAxis stroke={theme.palette.text.secondary} tick={{ fontSize: 12 }} tickFormatter={(value) => `$${(value/1000)}k`} />
        <Tooltip content={<CustomTooltip theme={theme} />} />
        <Area type="monotone" dataKey="value" stroke={chartMeta[selectedCoin].stroke} strokeWidth={2} fillOpacity={1} fill={`url(#${chartMeta[selectedCoin].id})`} />
      </AreaChart>
    </ResponsiveContainer>
  ), [selectedCoin, theme]);

  // Mobile card view for market data
  const MarketCardView = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {marketData.map((coin) => (
        <GlassmorphicPaper key={coin.symbol} sx={{ p: 2, mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <coin.icon style={{ width: 32, height: 32, marginRight: 12 }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 600 }}>{coin.name}</Typography>
                <Typography variant="body2" color="text.secondary">{coin.symbol}</Typography>
              </Box>
            </Box>
            <Typography variant="body1" sx={{ 
              fontFamily: 'monospace', 
              fontWeight: 500,
              color: coin.change.startsWith('+') ? 'success.main' : 
                    coin.change === '+0.0%' ? 'text.secondary' : 'error.main'
            }}>
              {coin.price}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" sx={{ 
              color: coin.change.startsWith('+') ? 'success.main' : 
                    coin.change === '+0.0%' ? 'text.secondary' : 'error.main',
              fontWeight: 500 
            }}>
              {coin.change}
            </Typography>
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

  // Desktop table view for market data
  const MarketTableView = () => (
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
        {marketData.map((coin) => (
          <TableRow key={coin.symbol} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <coin.icon style={{ width: 32, height: 32, marginRight: 16 }} />
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{coin.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{coin.symbol}</Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{coin.price}</Typography>
            </TableCell>
            <TableCell align="right">
              <Typography variant="body1" sx={{ 
                color: coin.change.startsWith('+') ? 'success.main' : 
                      coin.change === '+0.0%' ? 'text.secondary' : 'error.main',
                fontWeight: 500 
              }}>
                {coin.change}
              </Typography>
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
  );

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ 
          fontWeight: 700,
          mb: 1,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(to right, #9C96FF, #76C4FF)'
            : 'linear-gradient(to right, #3366FF, #00CCFF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Market Pulse Dashboard
        </Typography>
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
          <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <InsightsIcon sx={{ mr: 1 }} /> Market Sentiment Indicators
          </Typography>
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
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
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
          <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <SignalCellularAltIcon sx={{ mr: 1 }} /> Price Trends
          </Typography>
        </Grid>
        
        <Grid item xs={12}>
          <GlassmorphicPaper>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ButtonGroup variant="outlined" size="small" aria-label="coin selector">
                  <Button 
                    onClick={() => setSelectedCoin('BTC')}
                    variant={selectedCoin === 'BTC' ? 'contained' : 'outlined'}
                    sx={{ px: 2 }}
                  >
                    BTC
                  </Button>
                  <Button 
                    onClick={() => setSelectedCoin('ETH')}
                    variant={selectedCoin === 'ETH' ? 'contained' : 'outlined'}
                    sx={{ px: 2 }}
                  >
                    ETH
                  </Button>
                  <Button 
                    onClick={() => setSelectedCoin('SOL')}
                    variant={selectedCoin === 'SOL' ? 'contained' : 'outlined'}
                    sx={{ px: 2 }}
                  >
                    SOL
                  </Button>
                </ButtonGroup>
              </Box>
              
              <ButtonGroup variant="outlined" size="small" aria-label="timeframe selector">
                <Button 
                  onClick={() => setTimeframe('24h')}
                  variant={timeframe === '24h' ? 'contained' : 'outlined'}
                >
                  24H
                </Button>
                <Button 
                  onClick={() => setTimeframe('7d')}
                  variant={timeframe === '7d' ? 'contained' : 'outlined'}
                >
                  7D
                </Button>
                <Button 
                  onClick={() => setTimeframe('30d')}
                  variant={timeframe === '30d' ? 'contained' : 'outlined'}
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
          <Typography variant="h6" sx={{ mt: 2, mb: 2, fontWeight: 600, display: 'flex', alignItems: 'center' }}>
            <BarChartOutlinedIcon sx={{ mr: 1 }} /> Market Overview
          </Typography>
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