import { Box, Grid, Card, Typography, Paper } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(33, 43, 54, 0.7)'
    : 'rgba(255, 255, 255, 0.7)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: `1px solid ${theme.palette.divider}`,
  color: theme.palette.text.primary,
  transition: 'all 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

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
    { name: 'Bitcoin', symbol: 'BTC', price: '$63,500', change: '+2.5%' },
    { name: 'Ethereum', symbol: 'ETH', price: '$4,350', change: '+3.2%' },
    { name: 'Solana', symbol: 'SOL', price: '$118', change: '+5.1%' },
    { name: 'Binance Coin', symbol: 'BNB', price: '$520', change: '-1.2%' },
    { name: 'Cardano', symbol: 'ADA', price: '$1.2', change: '-0.5%' },
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
            <GlassmorphicPaper sx={{ height: 300 }}>
                <Typography variant="h6" gutterBottom>Price Trends</Typography>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                        <YAxis stroke={theme.palette.text.secondary} />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: theme.palette.background.paper, 
                                border: 'none' 
                            }}
                        />
                        <Legend wrapperStyle={{ color: theme.palette.text.secondary, paddingTop: '10px' }}/>
                        <Line type="monotone" dataKey="BTC" stroke="#f7931a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="ETH" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="SOL" stroke="#00FFA3" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </GlassmorphicPaper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>Hot Coins</Typography>
            <Grid container spacing={3}>
                {hotCoins.map(coin => (
                    <Grid item xs={12} sm={6} md={2.4} key={coin.symbol}>
                        <GlassmorphicPaper>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">{coin.name}</Typography>
                                <Typography variant="body2" color="text.secondary">{coin.symbol}</Typography>
                            </Box>
                            <Typography variant="h5" sx={{ my: 1, fontWeight: 'bold' }}>{coin.price}</Typography>
                            <Typography sx={{ color: coin.change.startsWith('+') ? 'success.main' : 'error.main' }}>
                                {coin.change}
                            </Typography>
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