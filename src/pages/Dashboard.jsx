import { useState } from 'react';
import { Box, Grid, Typography, Paper, useTheme } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { styled } from '@mui/system';

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
  transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out, background-color 0.3s ease',
  display: 'flex',
  flexDirection: 'column',

  ...(theme.palette.mode === 'dark'
    ? {
        backgroundColor: 'rgba(22, 27, 34, 0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    : {
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[5],
      }),

  color: theme.palette.text.primary,

  '&:hover': {
    ...(theme.palette.mode === 'dark' 
      ? { 
          backgroundColor: 'rgba(22, 27, 34, 0.9)',
          boxShadow: '0 0 40px 0 rgba(0, 0, 0, 0.5)',
        }
      : {
          boxShadow: theme.shadows[7],
          transform: 'translateY(-5px)',
        }
    ),
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
                        backgroundColor: 'rgba(33, 43, 54, 0.85)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
                    } : {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        border: `1px solid ${theme.palette.divider}`,
                        boxShadow: theme.shadows[3],
                    }
                )
            }}>
                <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>{label}</Typography>
                {payload.map((pld) => (
                    <Box key={pld.dataKey} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <Box sx={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: pld.stroke, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: theme.palette.text.primary, fontWeight: 500, minWidth: 40 }}>
                            {`${pld.dataKey}: `}
                        </Typography>
                        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, ml: 0.5 }}>
                            {pld.value.toLocaleString()}
                        </Typography>
                    </Box>
                ))}
            </Paper>
        );
    }
    return null;
};

const data = [
  { name: '00:00', BTC: 62000, ETH: 3100, SOL: 150 },
  { name: '04:00', BTC: 63500, ETH: 3200, SOL: 155 },
  { name: '08:00', BTC: 61000, ETH: 3150, SOL: 148 },
  { name: '12:00', BTC: 64000, ETH: 3250, SOL: 160 },
  { name: '16:00', BTC: 65000, ETH: 3300, SOL: 165 },
  { name: '20:00', BTC: 64500, ETH: 3280, SOL: 162 },
  { name: '24:00', BTC: 66000, ETH: 3350, SOL: 170 },
];

const hotCoins = [
  { name: 'Bitcoin', symbol: 'BTC', price: '$63,500', change: '+2.5%', icon: BtcIcon },
  { name: 'Ethereum', symbol: 'ETH', price: '$4,350', change: '+3.2%', icon: EthIcon },
  { name: 'Solana', symbol: 'SOL', price: '$118', change: '+5.1%', icon: SolIcon },
  { name: 'BNB', symbol: 'BNB', price: '$520', change: '-1.2%', icon: BnbIcon },
  { name: 'Cardano', symbol: 'ADA', price: '$1.2', change: '-0.5%', icon: AdaIcon },
  { name: 'Tether', symbol: 'USDT', price: '$1.00', change: '+0.0%', icon: UsdtIcon },
];

const StatCard = ({ title, value }) => (
    <GlassmorphicPaper sx={{ textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </GlassmorphicPaper>
  );

const HotCoinCard = ({ name, symbol, price, change, icon: Icon }) => {
  const theme = useTheme();
  const isPositive = change.startsWith('+');

  return (
    <GlassmorphicPaper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon style={{ width: 40, height: 40, marginRight: 12 }} />
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{name}</Typography>
          <Typography variant="body2" color="text.secondary">{symbol}</Typography>
        </Box>
      </Box>
      <Box sx={{ pl: '52px' }}>
        <Typography variant="h5" sx={{ my: 0.5, fontWeight: 'bold' }}>{price}</Typography>
        <Typography sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 500 }}>
          {change}
        </Typography>
      </Box>
    </GlassmorphicPaper>
  );
};

function Dashboard() {
  const theme = useTheme();
  const [chartData, setChartData] = useState([]);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Hot Coins</Typography>
        <Grid container spacing={2}>
          {hotCoins.map(coin => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={coin.symbol}>
              <HotCoinCard {...coin} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={9}>
          <GlassmorphicPaper sx={{ height: 400 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Price Trends</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f7931a" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f7931a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSol" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#14f195" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#9945FF" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                <YAxis stroke={theme.palette.text.secondary} />
                <Tooltip content={<CustomTooltip theme={theme} />} />
                <Legend />
                <Area type="monotone" dataKey="BTC" stroke="#f7931a" fillOpacity={1} fill="url(#colorBtc)" />
                <Area type="monotone" dataKey="ETH" stroke="#8884d8" fillOpacity={1} fill="url(#colorEth)" />
                <Area type="monotone" dataKey="SOL" stroke="#14f195" fillOpacity={1} fill="url(#colorSol)" />
              </AreaChart>
            </ResponsiveContainer>
          </GlassmorphicPaper>
        </Grid>
        <Grid item xs={12} lg={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <StatCard title="Portfolio Value" value="$12,450.80" />
            <StatCard title="24h Change" value="+$320.50 (+2.6%)" />
            <StatCard title="Total P&L" value="+$1,890.20" />
            <StatCard title="Open Positions" value="3" />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard; 