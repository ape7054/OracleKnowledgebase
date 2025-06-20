import { Box, Grid, Card, Typography, Paper, Avatar } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';
import { BitcoinIcon, EthereumIcon, SolanaIcon, BinanceCoinIcon, CardanoIcon } from '../components/CryptoIcons';

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
    { name: 'Bitcoin', symbol: 'BTC', price: '$63,500', change: '+2.5%', icon: <BitcoinIcon /> },
    { name: 'Ethereum', symbol: 'ETH', price: '$4,350', change: '+3.2%', icon: <EthereumIcon /> },
    { name: 'Solana', symbol: 'SOL', price: '$118', change: '+5.1%', icon: <SolanaIcon /> },
    { name: 'BNB', symbol: 'BNB', price: '$520', change: '-1.2%', icon: <BinanceCoinIcon /> },
    { name: 'Cardano', symbol: 'ADA', price: '$1.2', change: '-0.5%', icon: <CardanoIcon /> },
];

const StatCard = ({ title, value }) => (
    <GlassmorphicPaper sx={{ textAlign: 'center' }}>
      <Typography variant="body2" color="text.secondary">{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </GlassmorphicPaper>
  );

function Dashboard() {
  const theme = useTheme();

  return (
      <Box sx={{ width: '100%', maxWidth: '100%', minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Market Overview
        </Typography>
        <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Total Market Cap" value="$2.1T" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="BTC Dominance" value="42%" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="ETH Dominance" value="18%" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="24h Volume" value="$120B" /></Grid>
        
          <Grid item xs={12}>
            <GlassmorphicPaper sx={{ height: 350, p: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ ml: 2 }}>Price Trends</Typography>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f7931a" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#f7931a" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorEth" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorSol" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00FFA3" stopOpacity={0.6}/>
                                <stop offset="95%" stopColor="#00FFA3" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke={theme.palette.text.secondary} tick={{ fontSize: 12 }} />
                        <YAxis stroke={theme.palette.text.secondary} tick={{ fontSize: 12 }} />
                        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                        <Tooltip content={<CustomTooltip theme={theme} />} />
                        <Legend wrapperStyle={{ color: theme.palette.text.secondary, paddingTop: '10px' }}/>
                        <Area type="monotone" dataKey="BTC" stroke="#f7931a" strokeWidth={2} fill="url(#colorBtc)" activeDot={{ r: 6 }} />
                        <Area type="monotone" dataKey="ETH" stroke="#8884d8" strokeWidth={2} fill="url(#colorEth)" activeDot={{ r: 6 }} />
                        <Area type="monotone" dataKey="SOL" stroke="#00FFA3" strokeWidth={2} fill="url(#colorSol)" activeDot={{ r: 6 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </GlassmorphicPaper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Hot Coins</Typography>
            <Grid container spacing={3}>
                {hotCoins.map(coin => (
                    <Grid item xs={12} sm={6} md={2.4} key={coin.symbol}>
                        <GlassmorphicPaper sx={{ p: 2, justifyContent: 'center' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                <Box sx={{ width: 40, height: 40, mr: 1.5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {coin.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ lineHeight: 1.2, fontWeight: 600 }}>{coin.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">{coin.symbol}</Typography>
                                </Box>
                            </Box>
                            <Box sx={{ pl: '54px' }}>
                                <Typography variant="h5" sx={{ my: 0.5, fontWeight: 'bold' }}>{coin.price}</Typography>
                                <Typography sx={{ color: coin.change.startsWith('+') ? 'success.main' : 'error.main', fontWeight: 500 }}>
                                    {coin.change}
                                </Typography>
                            </Box>
                        </GlassmorphicPaper>
                    </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
}

export default Dashboard; 