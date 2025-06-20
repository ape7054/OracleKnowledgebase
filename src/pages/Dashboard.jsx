import { Box, Grid, Card, Typography, Paper, Avatar } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

// --- SVG Icons as React Components ---

const BtcIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Bitcoin</title><path d="M11.333 21.933v-3.36l5.44-1.787c.334-.107.56-.427.56-.774v-9.332c0-.347-.227-.667-.56-.774L11.333 4.12v-3.36c0-.4-.4-.667-.774-.56L3.333 2.1c-.347.106-.56.426-.56.773v17.947c0 .347.227.667.56.774l7.227 1.892c.226.054.453.054.667 0zm-5.893-9.52c.427-.4.987-.64 1.627-.64h2.027v3.333H7.067c-.64 0-1.2-.24-1.627-.64a2.138 2.138 0 0 1-.64-1.573c0-.613.24-1.173.64-1.48zm5.12 6.08h-2.027v-3.333h2.027c.72 0 1.333.24 1.76.72.4.453.64 1.04.64 1.68 0 .64-.24 1.227-.64 1.653-.427.427-1.04.28-1.76-.72z" fill="#F7931A"/></svg>;
const EthIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Ethereum</title><path d="M12 0L2 9.414l10 14.586L22 9.414 12 0zm0 2.828l7.172 6.586-7.172 3.414-7.172-3.414L12 2.828zM12 14.172l-7.172-3.414 7.172 9.414 7.172-9.414-7.172 3.414z" fill="#627EEA"/></svg>;
const SolIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Solana</title><path d="M3.385 2.923a.462.462 0 00-.462.462v4.846c0 .256.206.462.462.462h4.846a.462.462 0 00.462-.462V3.385a.462.462 0 00-.462-.462H3.385zm12.308 0a.462.462 0 00-.462.462v4.846c0 .256.206.462.462.462h4.846a.462.462 0 00.462-.462V3.385a.462.462 0 00-.462-.462h-4.846zM3.385 15.692a.462.462 0 00-.462.462v4.846c0 .256.206.462.462.462h4.846a.462.462 0 00.462-.462v-4.846a.462.462 0 00-.462-.462H3.385z" fill="#00FFA3"/></svg>;
const BnbIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>BNB</title><path d="M16.037 3.932l-4.032 4.032-4.032-4.032-6.009 6.01 4.032 4.031-4.032 4.032 6.01 6.009 4.031-4.032 4.032 4.032 6.009-6.01-4.032-4.031 4.032-4.032-6.01-6.009z" fill="#F0B90B"/></svg>;
const AdaIcon = () => <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Cardano</title><path d="M20.978 11.537c.015.029.027.059.042.088l-4.49 4.25a.31.31 0 01-.252.128h-3.34a.172.172 0 01-.171-.171v-3.34a.345.345 0 01.128-.253l4.22-4.49a.31.31 0 01.445 0l3.418 3.418a.313.313 0 010 .445zm-10.42 5.034a.31.31 0 01-.252.128H7.034a.172.172 0 01-.171-.171v-3.34a.345.345 0 01.128-.253l4.22-4.49a.31.31 0 01.445 0l3.418 3.418a.313.313 0 010 .445l-4.25 4.25a.31.31 0 01-.253.128z" fill="#0033AD"/></svg>;

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
    { name: 'Bitcoin', symbol: 'BTC', price: '$63,500', change: '+2.5%', icon: <BtcIcon /> },
    { name: 'Ethereum', symbol: 'ETH', price: '$4,350', change: '+3.2%', icon: <EthIcon /> },
    { name: 'Solana', symbol: 'SOL', price: '$118', change: '+5.1%', icon: <SolIcon /> },
    { name: 'BNB', symbol: 'BNB', price: '$520', change: '-1.2%', icon: <BnbIcon /> },
    { name: 'Cardano', symbol: 'ADA', price: '$1.2', change: '-0.5%', icon: <AdaIcon /> },
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
                                <Box sx={{ width: 40, height: 40, mr: 1.5 }}>
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