import { Box, Grid, Card, Typography, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#fff',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-5px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
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
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{title}</Typography>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{value}</Typography>
    </GlassmorphicPaper>
  );

function Dashboard() {
  return (
      <Box>
        <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
            Market Overview
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}><StatCard title="Total Market Cap" value="$2.1T" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="BTC Dominance" value="42%" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="ETH Dominance" value="18%" /></Grid>
          <Grid item xs={12} sm={6} md={3}><StatCard title="24h Volume" value="$120B" /></Grid>
        
          <Grid item xs={12}>
            <GlassmorphicPaper sx={{ height: 300 }}>
                <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Price Trends</Typography>
                <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={data}>
                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.7)" />
                        <YAxis stroke="rgba(255,255,255,0.7)" />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(30,30,30,0.8)', border: 'none' }}/>
                        <Legend />
                        <Line type="monotone" dataKey="BTC" stroke="#f7931a" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="ETH" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="SOL" stroke="#00FFA3" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            </GlassmorphicPaper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>Hot Coins</Typography>
            <Grid container spacing={3}>
                {hotCoins.map(coin => (
                    <Grid item xs={12} sm={6} md={2.4} key={coin.symbol}>
                        <GlassmorphicPaper>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Typography variant="h6">{coin.name}</Typography>
                                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{coin.symbol}</Typography>
                            </Box>
                            <Typography variant="h5" sx={{ my: 1, fontWeight: 'bold' }}>{coin.price}</Typography>
                            <Typography sx={{ color: coin.change.startsWith('+') ? '#4caf50' : '#f44336' }}>
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