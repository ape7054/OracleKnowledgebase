import { useState, useContext } from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Divider, Card, useMediaQuery } from '@mui/material';
import { styled, useTheme, alpha } from '@mui/system';
import { ArrowUpward, ArrowDownward, Wallet, History, Settings as SettingsIcon, TrendingUp, CreditCard, Visibility } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Area, AreaChart, XAxis, YAxis } from 'recharts';
import { ThemeContext } from '../context/ThemeContext';
import React from 'react';

// Import icons from the new library
import BtcIcon from 'cryptocurrency-icons/svg/color/btc.svg?react';
import EthIcon from 'cryptocurrency-icons/svg/color/eth.svg?react';
import SolIcon from 'cryptocurrency-icons/svg/color/sol.svg?react';
import UsdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg?react';
import BnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg?react';

// Enhanced glassmorphic paper with more premium effects
const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '24px',
    borderRadius: '16px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s ease',

    ...(theme.palette.mode === 'dark'
      ? {
          backgroundColor: 'rgba(22, 27, 34, 0.7)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.37)',
        }
      : {
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: '0 10px 40px rgba(145, 158, 171, 0.2)',
        }),
  
    color: theme.palette.text.primary,

    '&:hover': {
        transform: 'translateY(-4px)',
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: 'rgba(22, 27, 34, 0.9)',
            boxShadow: '0 0 40px 0 rgba(0, 0, 0, 0.5)',
        }),
    },
}));

// Enhanced table styling
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    '& .MuiTableCell-root': {
        borderBottom: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
        padding: '16px',
    },
    '& .MuiTableRow-root:hover': {
        backgroundColor: alpha(theme.palette.action.hover, 0.1),
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
        color: theme.palette.text.secondary,
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontWeight: 600,
    },
}));

// Improved tab container
const TabContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(33, 43, 54, 0.5)' : 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(20px)',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: theme.palette.mode === 'dark' 
        ? '0 8px 32px 0 rgba(0, 0, 0, 0.4)' 
        : '0 8px 32px 0 rgba(145, 158, 171, 0.2)',
    marginBottom: '24px',
    border: theme.palette.mode === 'dark' 
        ? '1px solid rgba(255, 255, 255, 0.1)' 
        : `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
}));

// More premium button style for tabs
const TabButton = styled(Button)(({ theme, active }) => ({
    borderRadius: 0,
    padding: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: active 
        ? theme.palette.mode === 'dark' 
            ? alpha(theme.palette.primary.main, 0.2)
            : alpha(theme.palette.primary.main, 0.1)
        : 'transparent',
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    fontWeight: active ? 700 : 500,
    fontSize: '0.875rem',
    letterSpacing: '0.05em',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',

    [theme.breakpoints.down('sm')]: {
        padding: '12px 8px',
        fontSize: '0.75rem',
        minWidth: 'auto',
    },

    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' 
            ? alpha(theme.palette.primary.main, 0.15)
            : alpha(theme.palette.primary.main, 0.05),
    },
    flex: 1,
    textAlign: 'center',
    '.MuiButton-startIcon': {
        marginRight: '8px',
        transition: 'transform 0.3s ease',
        color: active ? theme.palette.primary.main : theme.palette.text.secondary,
        [theme.breakpoints.down('sm')]: {
            marginRight: '4px',
        },
    },
    '&:hover .MuiButton-startIcon': {
        transform: 'scale(1.1)',
    },
    '&::after': active ? {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '60%',
        height: '3px',
        background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        borderRadius: '3px 3px 0 0',
        boxShadow: `0 -2px 10px ${alpha(theme.palette.primary.main, 0.4)}`,
    } : {},
}));

// Stylish action button
const ActionButton = styled(Button)(({ theme, color = 'primary' }) => ({
    borderRadius: '8px',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 600,
    padding: '6px 16px',
    boxShadow: `0 4px 12px ${alpha(theme.palette[color].main, 0.3)}`,
    '&:hover': {
        boxShadow: `0 6px 16px ${alpha(theme.palette[color].main, 0.4)}`,
    },
    transition: 'all 0.3s ease',
}));

// Asset icon container
const AssetIconWrapper = styled(Box)(({ theme }) => ({
    width: 40,
    height: 40,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.8),
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, theme.palette.mode === 'dark' ? 0.3 : 0.1)}`,
    padding: 6,
    border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div 
            role="tabpanel" 
            hidden={value !== index} 
            style={{ display: value === index ? 'block' : 'none', width: '100%' }} 
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
};

// Portfolio distribution data
const portfolioData = [
    { name: 'Bitcoin', value: 36.2, color: '#F7931A' },
    { name: 'Ethereum', value: 36.4, color: '#627EEA' },
    { name: 'Solana', value: 11.5, color: '#14F195' },
    { name: 'Tether', value: 7.0, color: '#26A17B' },
    { name: 'BNB', value: 8.9, color: '#F3BA2F' }
];

// Portfolio performance data
const performanceData = [
    { name: 'Jan', value: 132000 },
    { name: 'Feb', value: 135000 },
    { name: 'Mar', value: 138000 },
    { name: 'Apr', value: 136000 },
    { name: 'May', value: 142000 },
    { name: 'Jun', value: 149263 },
];

const assets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.85, value: 53975, icon: BtcIcon, change: '+2.5%', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', balance: 12.5, value: 54375, icon: EthIcon, change: '+3.2%', color: '#627EEA' },
    { name: 'Solana', symbol: 'SOL', balance: 145.8, value: 17205.24, icon: SolIcon, change: '+5.1%', color: '#14F195' },
    { name: 'Tether', symbol: 'USDT', balance: 10500, value: 10500, icon: UsdtIcon, change: '+0.0%', color: '#26A17B' },
    { name: 'Binance Coin', symbol: 'BNB', balance: 25.4, value: 13208, icon: BnbIcon, change: '-1.2%', color: '#F3BA2F' },
];

// Mock transaction history data
const transactions = [
    { type: 'Deposit', asset: 'Bitcoin', amount: '+0.25 BTC', value: '+$15,875.00', date: '2023-06-15 14:30' },
    { type: 'Withdrawal', asset: 'Ethereum', amount: '-5.0 ETH', value: '-$21,750.00', date: '2023-06-10 09:15' },
    { type: 'Trade', asset: 'BTC/USDT', amount: '+0.15 BTC', value: '+$9,525.00', date: '2023-06-05 11:45' },
    { type: 'Trade', asset: 'ETH/BTC', amount: '-2.5 ETH', value: '-0.08 BTC', date: '2023-05-28 16:20' },
    { type: 'Deposit', asset: 'USDT', amount: '+5000 USDT', value: '+$5,000.00', date: '2023-05-20 10:30' },
];

function Account() {
    const [tabValue, setTabValue] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    // Custom PieChart for portfolio breakdown
    const renderPieChart = () => {
        return (
            <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                    <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {portfolioData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip 
                        formatter={(value) => [`${value}%`, 'Allocation']}
                        contentStyle={{
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(22, 27, 34, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                        }}
                    />
                    <Legend 
                        verticalAlign="bottom" 
                        height={36} 
                        iconSize={10}
                        iconType="circle"
                        formatter={(value) => (
                            <span style={{ color: theme.palette.text.primary, fontSize: '0.875rem' }}>{value}</span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        );
    };

    const renderPerformanceChart = () => {
        return (
            <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={performanceData} margin={{ top: 10, right: 20, left: 20, bottom: 10 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
                            <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: theme.palette.text.secondary, fontSize: 10 }} 
                    />
                    <YAxis 
                        hide={true} 
                        domain={['dataMin - 10000', 'dataMax + 5000']} 
                    />
                    <Tooltip 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Portfolio Value']}
                        contentStyle={{
                            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(22, 27, 34, 0.9)' : 'rgba(255, 255, 255, 0.95)',
                            borderRadius: '8px',
                            border: 'none',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.2)'
                        }}
                        labelStyle={{ color: theme.palette.text.primary }}
                    />
                    <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke={theme.palette.primary.main} 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
        );
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Add global style to remove focus outlines */}
            <style jsx global>{`
                button:focus, [role="button"]:focus, .MuiButtonBase-root:focus, .MuiButton-root:focus {
                    outline: none !important;
                    box-shadow: none !important;
                }
                .MuiSwitch-root:focus, .MuiSwitch-switchBase:focus {
                    outline: none !important;
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
            `}</style>
            
            <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{ 
                fontWeight: 700, 
                mb: 3,
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(to right, #9C96FF, #76C4FF)'
                  : 'linear-gradient(to right, #3366FF, #00CCFF)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }}>
                Account
            </Typography>
            
            {/* Custom Tab Navigation */}
            <TabContainer>
                <Grid container>
                    <Grid item xs={4}>
                        <TabButton 
                            active={tabValue === 0} 
                            onClick={() => handleTabChange(0)}
                            startIcon={<Wallet />}
                            fullWidth
                        >
                            ASSETS
                        </TabButton>
                    </Grid>
                    <Grid item xs={4}>
                        <TabButton 
                            active={tabValue === 1} 
                            onClick={() => handleTabChange(1)}
                            startIcon={<History />}
                            fullWidth
                        >
                            HISTORY
                        </TabButton>
                    </Grid>
                    <Grid item xs={4}>
                        <TabButton 
                            active={tabValue === 2} 
                            onClick={() => handleTabChange(2)}
                            startIcon={<SettingsIcon />}
                            fullWidth
                        >
                            SETTINGS
                        </TabButton>
                    </Grid>
                </Grid>
            </TabContainer>

            {/* ASSETS Tab */}
            <TabPanel value={tabValue} index={0}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                    {/* Top section with balance and charts */}
                    <Grid container spacing={3}>
                        {/* Balance Card */}
                        <Grid item xs={12} md={6}>
                            <GlassmorphicPaper sx={{ height: '100%' }}>
                                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', mb: 2 }}>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">Total Estimated Balance</Typography>
                                        <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, fontSize: { xs: '2.5rem', md: '3rem' } }}>$149,263.24</Typography>
                                        <Box sx={{ 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            mt: 1,
                                            px: 1.5,
                                            py: 0.5,
                                            borderRadius: 1.5,
                                            width: 'fit-content',
                                            backgroundColor: alpha(theme.palette.success.main, 0.1)
                                        }}>
                                            <TrendingUp sx={{ color: theme.palette.success.main, fontSize: '1rem', mr: 0.5 }} />
                                            <Typography variant="body2" sx={{ fontWeight: 600, color: theme.palette.success.main }}>
                                                +8.2% this month
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ 
                                        display: 'grid', 
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: 1.5,
                                        width: { xs: '100%', sm: 'auto' },
                                        mt: { xs: 3, sm: 0 },
                                    }}>
                                        <ActionButton 
                                            variant="contained" 
                                            startIcon={<ArrowUpward />} 
                                            color="success"
                                        >
                                            Deposit
                                        </ActionButton>
                                        <ActionButton 
                                            variant="contained" 
                                            startIcon={<ArrowDownward />} 
                                            color="error"
                                        >
                                            Withdraw
                                        </ActionButton>
                                    </Box>
                                </Box>
                                
                                {/* Performance Chart */}
                                <Box sx={{ mt: 3 }}>
                                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>6-Month Performance</Typography>
                                    {renderPerformanceChart()}
                                </Box>
                            </GlassmorphicPaper>
                        </Grid>
                        
                        {/* Portfolio Distribution */}
                        <Grid item xs={12} md={6}>
                            <GlassmorphicPaper>
                                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>Portfolio Allocation</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {renderPieChart()}
                                </Box>
                            </GlassmorphicPaper>
                        </Grid>
                    </Grid>
                    
                    {/* Assets Table / Cards */}
                    <GlassmorphicPaper>
                        <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Your Assets</Typography>
                        {isMobile ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {assets.map((asset) => (
                                    <Card key={asset.symbol} sx={{ p: 2, borderRadius: '12px', bgcolor: 'transparent', border: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <AssetIconWrapper sx={{ mr: 1.5, width: 36, height: 36 }}>
                                                    {React.createElement(asset.icon, { width: 24, height: 24 })}
                                                </AssetIconWrapper>
                                                <Box>
                                                    <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{asset.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">{asset.symbol}</Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{ 
                                                display: 'inline-flex', 
                                                alignItems: 'center',
                                                px: 1, py: 0.5, borderRadius: 1,
                                                backgroundColor: asset.change.startsWith('+') && asset.change !== '+0.0%' ? alpha(theme.palette.success.main, 0.1) : asset.change === '+0.0%' ? alpha(theme.palette.grey[500], 0.1) : alpha(theme.palette.error.main, 0.1)
                                            }}>
                                                <Typography variant="caption" sx={{ fontWeight: 600, color: asset.change.startsWith('+') && asset.change !== '+0.0%' ? theme.palette.success.main : asset.change === '+0.0%' ? theme.palette.grey[500] : theme.palette.error.main }}>
                                                    {asset.change}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Divider sx={{ my: 1.5, borderColor: alpha(theme.palette.divider, 0.1) }}/>
                                        <Grid container spacing={1} sx={{ mb: 2, textAlign: 'left' }}>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="text.secondary">Balance</Typography>
                                                <Typography sx={{ fontFamily: 'monospace', fontWeight: 500, fontSize: '0.875rem' }}>{asset.balance}</Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography variant="caption" color="text.secondary">Value (USD)</Typography>
                                                <Typography sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.875rem' }}>${asset.value.toLocaleString()}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                                            <ActionButton size="small" variant="outlined" startIcon={<ArrowUpward />} color="success">Deposit</ActionButton>
                                            <ActionButton size="small" variant="outlined" startIcon={<ArrowDownward />} color="error">Withdraw</ActionButton>
                                        </Box>
                                    </Card>
                                ))}
                            </Box>
                        ) : (
                            <StyledTableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ border: 0 }}>Asset</TableCell>
                                            <TableCell sx={{ border: 0 }}>Balance</TableCell>
                                            <TableCell sx={{ border: 0 }}>Value (USD)</TableCell>
                                            <TableCell sx={{ border: 0 }}>24h Change</TableCell>
                                            <TableCell sx={{ border: 0 }} align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {assets.map((asset) => (
                                            <TableRow key={asset.symbol} sx={{ '& td, & th': { border: 0 }}}>
                                                <TableCell>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <AssetIconWrapper sx={{ mr: 2 }}>
                                                            {React.createElement(asset.icon, { width: 28, height: 28 })}
                                                        </AssetIconWrapper>
                                                        <Box>
                                                            <Typography sx={{ fontWeight: 600 }}>{asset.name}</Typography>
                                                            <Typography variant="body2" color="text.secondary">{asset.symbol}</Typography>
                                                        </Box>
                                                    </Box>
                                                </TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 500 }}>{asset.balance}</TableCell>
                                                <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>${asset.value.toLocaleString()}</TableCell>
                                                <TableCell>
                                                    <Box sx={{ 
                                                        display: 'inline-flex', 
                                                        alignItems: 'center',
                                                        px: 1.5,
                                                        py: 0.5,
                                                        borderRadius: 1,
                                                        backgroundColor: asset.change.startsWith('+') && asset.change !== '+0.0%' 
                                                            ? alpha(theme.palette.success.main, 0.1) 
                                                            : asset.change === '+0.0%' 
                                                                ? alpha(theme.palette.grey[500], 0.1)
                                                                : alpha(theme.palette.error.main, 0.1)
                                                    }}>
                                                        {asset.change.startsWith('+') && asset.change !== '+0.0%' ? (
                                                            <TrendingUp sx={{ fontSize: '0.875rem', color: theme.palette.success.main, mr: 0.5 }} />
                                                        ) : asset.change === '+0.0%' ? null : (
                                                            <ArrowDownward sx={{ fontSize: '0.875rem', color: theme.palette.error.main, mr: 0.5 }} />
                                                        )}
                                                        <Typography 
                                                            variant="body2" 
                                                            sx={{ 
                                                                fontWeight: 600, 
                                                                color: asset.change.startsWith('+') && asset.change !== '+0.0%' 
                                                                    ? theme.palette.success.main 
                                                                    : asset.change === '+0.0%' 
                                                                        ? theme.palette.grey[500] 
                                                                        : theme.palette.error.main 
                                                            }}
                                                        >
                                                            {asset.change}
                                                        </Typography>
                                                    </Box>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <ActionButton
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<ArrowUpward />}
                                                        color="success"
                                                        sx={{ mr: 1 }}
                                                    >
                                                        Deposit
                                                    </ActionButton>
                                                    <ActionButton
                                                        size="small"
                                                        variant="outlined"
                                                        startIcon={<ArrowDownward />}
                                                        color="error"
                                                    >
                                                        Withdraw
                                                    </ActionButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </StyledTableContainer>
                        )}
                    </GlassmorphicPaper>
                </Box>
            </TabPanel>

            {/* HISTORY Tab */}
            <TabPanel value={tabValue} index={1}>
                <GlassmorphicPaper>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>Transaction History</Typography>
                        <Button variant="outlined" size="small" startIcon={<CreditCard />}>Export CSV</Button>
                    </Box>
                    
                    {isMobile ? (
                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {transactions.map((tx, index) => (
                                <Card key={index} sx={{ p: 2, borderRadius: '12px', bgcolor: 'transparent', border: `1px solid ${alpha(theme.palette.divider, 0.2)}` }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
                                        <Box>
                                            <Typography sx={{ fontWeight: 600 }}>{tx.asset}</Typography>
                                            <Typography variant="caption" color="text.secondary">{tx.date}</Typography>
                                        </Box>
                                         <Box sx={{ 
                                            display: 'inline-flex',
                                            px: 1.5, py: 0.5, borderRadius: 1,
                                            backgroundColor: tx.type === 'Deposit' ? alpha(theme.palette.success.main, 0.1) : tx.type === 'Withdrawal' ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.info.main, 0.1),
                                            color: tx.type === 'Deposit' ? theme.palette.success.main : tx.type === 'Withdrawal' ? theme.palette.error.main : theme.palette.info.main,
                                            fontWeight: 600, fontSize: '0.7rem'
                                        }}>
                                            {tx.type}
                                        </Box>
                                    </Box>
                                    <Divider sx={{ my: 1, borderColor: alpha(theme.palette.divider, 0.1) }}/>
                                    <Grid container spacing={1} sx={{ mt: 1 }}>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary">Amount</Typography>
                                            <Typography sx={{ color: tx.amount.startsWith('+') ? theme.palette.success.main : theme.palette.error.main, fontWeight: 500, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                                                {tx.amount}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="caption" color="text.secondary">Value</Typography>
                                            <Typography sx={{ color: tx.value.startsWith('+') ? theme.palette.success.main : theme.palette.error.main, fontWeight: 600, fontFamily: 'monospace', fontSize: '0.875rem' }}>
                                                {tx.value}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Card>
                            ))}
                         </Box>
                    ) : (
                        <StyledTableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>Type</TableCell>
                                        <TableCell sx={{ border: 0 }}>Asset</TableCell>
                                        <TableCell sx={{ border: 0 }}>Amount</TableCell>
                                        <TableCell sx={{ border: 0 }}>Value</TableCell>
                                        <TableCell sx={{ border: 0 }}>Date</TableCell>
                                        <TableCell sx={{ border: 0 }} align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {transactions.map((tx, index) => (
                                        <TableRow key={index} sx={{ '& td, & th': { border: 0 }}}>
                                            <TableCell>
                                                <Box sx={{ 
                                                    display: 'inline-flex',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    backgroundColor: tx.type === 'Deposit' 
                                                        ? alpha(theme.palette.success.main, 0.1)
                                                        : tx.type === 'Withdrawal'
                                                            ? alpha(theme.palette.error.main, 0.1)
                                                            : alpha(theme.palette.info.main, 0.1),
                                                    color: tx.type === 'Deposit' 
                                                        ? theme.palette.success.main
                                                        : tx.type === 'Withdrawal'
                                                            ? theme.palette.error.main
                                                            : theme.palette.info.main,
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem'
                                                }}>
                                                    {tx.type}
                                                </Box>
                                            </TableCell>
                                            <TableCell>{tx.asset}</TableCell>
                                            <TableCell sx={{ 
                                                color: tx.amount.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                                                fontWeight: 500,
                                                fontFamily: 'monospace'
                                            }}>
                                                {tx.amount}
                                            </TableCell>
                                            <TableCell sx={{ 
                                                color: tx.value.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
                                                fontWeight: 600,
                                                fontFamily: 'monospace'
                                            }}>
                                                {tx.value}
                                            </TableCell>
                                            <TableCell>{tx.date}</TableCell>
                                            <TableCell align="right">
                                                <Box sx={{ 
                                                    display: 'inline-flex',
                                                    px: 1.5,
                                                    py: 0.5,
                                                    borderRadius: 1,
                                                    backgroundColor: alpha(theme.palette.success.main, 0.1),
                                                    color: theme.palette.success.main,
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem'
                                                }}>
                                                    Completed
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </StyledTableContainer>
                    )}
                </GlassmorphicPaper>
            </TabPanel>

            {/* SETTINGS Tab */}
            <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                    <GlassmorphicPaper>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Notification Settings</Typography>
                            <List sx={{ 
                                '& .MuiListItem-root': {
                                    borderRadius: 2,
                                    mb: 1,
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.action.hover, 0.1),
                                    }
                                }
                            }}>
                                <ListItem sx={{ py: 1.5 }}>
                                    <ListItemText 
                                        primary="Email Notifications" 
                                        secondary="Receive updates via email" 
                                        primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.5, fontSize: isMobile ? '0.875rem' : '1rem' } }} 
                                    />
                                <ListItemSecondaryAction><Switch defaultChecked /></ListItemSecondaryAction>
                            </ListItem>
                                <Divider variant="fullWidth" sx={{ opacity: 0.6 }} />
                                <ListItem sx={{ py: 1.5 }}>
                                    <ListItemText 
                                        primary="Push Notifications" 
                                        secondary="Get real-time alerts on your devices" 
                                        primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.5, fontSize: isMobile ? '0.875rem' : '1rem' } }} 
                                    />
                                <ListItemSecondaryAction><Switch /></ListItemSecondaryAction>
                            </ListItem>
                                <Divider variant="fullWidth" sx={{ opacity: 0.6 }} />
                                <ListItem sx={{ py: 1.5 }}>
                                    <ListItemText 
                                        primary="Price Alerts" 
                                        secondary="Be notified of significant price movements" 
                                        primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.5, fontSize: isMobile ? '0.875rem' : '1rem' } }} 
                                    />
                                <ListItemSecondaryAction><Switch defaultChecked /></ListItemSecondaryAction>
                            </ListItem>
                                <Divider variant="fullWidth" sx={{ opacity: 0.6 }} />
                                <ListItem sx={{ py: 1.5 }}>
                                    <ListItemText 
                                        primary="Login Notifications" 
                                        secondary="Get alerted when your account is accessed" 
                                        primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.5, fontSize: isMobile ? '0.875rem' : '1rem' } }} 
                                    />
                                <ListItemSecondaryAction><Switch defaultChecked /></ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </GlassmorphicPaper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <GlassmorphicPaper>
                            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>Security Settings</Typography>
                        <List>
                                <ListItem sx={{ 
                                    py: 2.5,
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                    borderRadius: 2,
                                    mb: 2
                                }}>
                                    <ListItemText 
                                        primary="Two-Factor Authentication" 
                                        secondary="Add an extra layer of security" 
                                        primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.5, fontSize: isMobile ? '0.875rem' : '1rem' } }} 
                                        sx={{ pr: 8 }} 
                                    />
                                    <ListItemSecondaryAction>
                                        <ActionButton 
                                            variant="contained" 
                                            color="primary" 
                                            size="small"
                                            startIcon={<Visibility />}
                                        >
                                            Enable
                                        </ActionButton>
                                    </ListItemSecondaryAction>
                            </ListItem>
                                <ListItem sx={{ 
                                    py: 2.5, 
                                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                                    borderRadius: 2
                                }}>
                                    <ListItemText 
                                        primary="API Access" 
                                        secondary="Manage API keys for automated trading" 
                                        primaryTypographyProps={{ sx: { fontWeight: 600, mb: 0.5, fontSize: isMobile ? '0.875rem' : '1rem' } }} 
                                        sx={{ pr: 8 }} 
                                    />
                                    <ListItemSecondaryAction>
                                        <ActionButton 
                                            variant="contained" 
                                            color="primary"
                                            size="small"
                                            startIcon={<SettingsIcon />}
                                        >
                                            Manage
                                        </ActionButton>
                                    </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </GlassmorphicPaper>
                    </Grid>
                </Grid>
            </TabPanel>
        </Box>
    );
}

export default Account; 