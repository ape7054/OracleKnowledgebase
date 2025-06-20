import { useState, useMemo } from 'react';
import { Box, Grid, Typography, Paper, useTheme, Table, TableBody, TableCell, TableHead, TableRow, Chip, useMediaQuery } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend, LineChart, Line } from 'recharts';
import { styled, alpha } from '@mui/system';

import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

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
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',

    ...(theme.palette.mode === 'dark'
      ? {
          backgroundColor: 'rgba(22, 27, 34, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.45)',
        }
      : {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[8],
        }),
  
    color: theme.palette.text.primary,

    '&:hover': {
        transform: 'translateY(-4px)',
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.55)',
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
    <GlassmorphicPaper sx={{ 
      display: 'flex', 
      flexDirection: 'row', 
      alignItems: 'center', 
      p: { xs: 2, md: 3 } // 响应式内边距
    }}>
      <Box sx={{
        width: { xs: 40, md: 52 }, 
        height: { xs: 40, md: 52 }, 
        borderRadius: '50%',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: alpha(color, 0.15),
        mr: 2,
      }}>
        {icon}
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h5" sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '1.2rem', md: '1.5rem' } // 响应式字体大小
        }}>{value}</Typography>
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

function Dashboard() {
  const theme = useTheme();
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isExtraSmall = useMediaQuery('(max-width:600px)');

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
    <Box>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 'bold', 
        mb: 4,
        fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } // 响应式字体大小
      }}>
        Dashboard
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map(stat => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <GlassmorphicPaper sx={{ 
            height: { xs: 350, sm: 400, md: 450 }, // 响应式高度
            p: { xs: 2, sm: 3 } // 响应式内边距
          }}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, // 在小屏幕上垂直排列
              justifyContent: 'space-between', 
              alignItems: { xs: 'flex-start', sm: 'center' },
              gap: { xs: 2, sm: 0 },
              mb: 2 
            }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Price Trends</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {Object.keys(chartData).map(coin => (
                  <Chip
                    key={coin}
                    label={coin}
                    clickable
                    onClick={() => setSelectedCoin(coin)}
                    sx={{
                      transition: 'all 0.3s',
                      backgroundColor: selectedCoin === coin ? chartMeta[coin].stroke : (theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.6) : alpha(theme.palette.grey[400], 0.3)),
                      color: selectedCoin === coin ? '#fff' : theme.palette.text.secondary,
                      fontWeight: 600,
                      '&:hover': {
                        backgroundColor: selectedCoin !== coin && (theme.palette.mode === 'dark' ? alpha(theme.palette.background.default, 0.9) : alpha(theme.palette.grey[400], 0.5)),
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
            {MemoizedAreaChart}
          </GlassmorphicPaper>
        </Grid>
        
        <Grid item xs={12}>
          <GlassmorphicPaper sx={{ overflow: 'hidden' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Market Overview</Typography>
            
            {/* 使用更精确的宽度检测来决定布局 */}
            <Box sx={{ 
              display: { xs: 'block', lg: 'none' } 
            }}>
              <MarketCardView />
            </Box>
            
            <Box sx={{ 
              display: { xs: 'none', lg: 'block' } 
            }}>
              <MarketTableView />
            </Box>
          </GlassmorphicPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 