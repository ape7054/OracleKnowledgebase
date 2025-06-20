import { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { ArrowUpward, ArrowDownward, Wallet, History, Settings as SettingsIcon } from '@mui/icons-material';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '24px',
    borderRadius: '16px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',

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
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: 'rgba(22, 27, 34, 0.9)',
            boxShadow: '0 0 40px 0 rgba(0, 0, 0, 0.5)',
        }),
    },
}));

const TabContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(33, 43, 54, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: theme.palette.mode === 'dark' 
        ? '0 8px 16px 0 rgba(0, 0, 0, 0.3)' 
        : '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
    marginBottom: '24px',
    border: `1px solid ${theme.palette.divider}`,
}));

const TabButton = styled(Button)(({ theme, active }) => ({
    borderRadius: 0,
    padding: '16px',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: active 
        ? theme.palette.mode === 'dark' 
            ? 'rgba(0, 171, 85, 0.16)'
            : 'rgba(0, 171, 85, 0.08)'
        : 'transparent',
    color: active ? theme.palette.primary.main : theme.palette.text.secondary,
    fontWeight: active ? 600 : 400,
    transition: 'all 0.2s ease-in-out',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
        backgroundColor: theme.palette.mode === 'dark' 
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.04)',
    },
    flex: 1,
    textAlign: 'center',
    '.MuiButton-startIcon': {
        marginRight: '8px',
        transition: 'transform 0.2s ease',
        color: active ? theme.palette.primary.main : theme.palette.text.secondary,
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
        width: '40%',
        height: '3px',
        background: `linear-gradient(90deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
        borderRadius: '3px 3px 0 0',
    } : {},
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

const assets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.85, value: 53975, icon: 'B' },
    { name: 'Ethereum', symbol: 'ETH', balance: 12.5, value: 54375, icon: 'Ξ' },
    { name: 'Solana', symbol: 'SOL', balance: 145.8, value: 17205.24, icon: 'S' },
    { name: 'Tether', symbol: 'USDT', balance: 10500, value: 10500, icon: '$' },
    { name: 'Binance Coin', symbol: 'BNB', balance: 25.4, value: 13208, icon: 'B' },
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

    const handleTabChange = (newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
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
                    <GlassmorphicPaper sx={{ height: 'auto' }}>
                        <Typography variant="h6" color="text.secondary">Total Estimated Balance</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>$149,263.24</Typography>
                    </GlassmorphicPaper>
                    <GlassmorphicPaper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ border: 0 }}>Asset</TableCell>
                                        <TableCell sx={{ border: 0 }}>Balance</TableCell>
                                        <TableCell sx={{ border: 0 }}>Value (USD)</TableCell>
                                        <TableCell sx={{ border: 0 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assets.map((asset) => (
                                        <TableRow key={asset.symbol} sx={{ '& td, & th': { border: 0 }}}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>{asset.icon}</Avatar>
                                                    <Box>
                                                        <Typography>{asset.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">{asset.symbol}</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{asset.balance}</TableCell>
                                            <TableCell>${asset.value.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Button startIcon={<ArrowUpward />} color="success">Deposit</Button>
                                                <Button startIcon={<ArrowDownward />} color="error">Withdraw</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GlassmorphicPaper>
                </Box>
            </TabPanel>

            {/* HISTORY Tab */}
            <TabPanel value={tabValue} index={1}>
                <GlassmorphicPaper>
                    <Typography variant="h6" gutterBottom>Transaction History</Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ border: 0 }}>Type</TableCell>
                                    <TableCell sx={{ border: 0 }}>Asset</TableCell>
                                    <TableCell sx={{ border: 0 }}>Amount</TableCell>
                                    <TableCell sx={{ border: 0 }}>Value</TableCell>
                                    <TableCell sx={{ border: 0 }}>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {transactions.map((tx, index) => (
                                    <TableRow key={index} sx={{ '& td, & th': { border: 0 }}}>
                                        <TableCell>{tx.type}</TableCell>
                                        <TableCell>{tx.asset}</TableCell>
                                        <TableCell sx={{ color: tx.amount.startsWith('+') ? theme.palette.success.main : theme.palette.error.main }}>
                                            {tx.amount}
                                        </TableCell>
                                        <TableCell sx={{ color: tx.value.startsWith('+') ? theme.palette.success.main : theme.palette.error.main }}>
                                            {tx.value}
                                        </TableCell>
                                        <TableCell>{tx.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </GlassmorphicPaper>
            </TabPanel>

            {/* SETTINGS Tab */}
            <TabPanel value={tabValue} index={2}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, width: '100%' }}>
                    <GlassmorphicPaper>
                        <Typography variant="h6" gutterBottom>Notification Settings</Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Email Notifications" secondary="Receive updates via email" primaryTypographyProps={{ sx: { mb: 0.5 } }} />
                                <ListItemSecondaryAction><Switch defaultChecked /></ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Push Notifications" secondary="Get real-time alerts on your devices" primaryTypographyProps={{ sx: { mb: 0.5 } }} />
                                <ListItemSecondaryAction><Switch /></ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Price Alerts" secondary="Be notified of significant price movements" primaryTypographyProps={{ sx: { mb: 0.5 } }} />
                                <ListItemSecondaryAction><Switch defaultChecked /></ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Login Notifications" secondary="Get alerted when your account is accessed" primaryTypographyProps={{ sx: { mb: 0.5 } }} />
                                <ListItemSecondaryAction><Switch defaultChecked /></ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </GlassmorphicPaper>
                    <GlassmorphicPaper>
                        <Typography variant="h6" gutterBottom>Security Settings</Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Two-Factor Authentication" secondary="Add an extra layer of security" primaryTypographyProps={{ sx: { mb: 0.5 } }} sx={{ pr: 8 }} />
                                <ListItemSecondaryAction><Button variant="outlined" color="primary">Enable</Button></ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="API Access" secondary="Manage API keys for automated trading" primaryTypographyProps={{ sx: { mb: 0.5 } }} sx={{ pr: 8 }} />
                                <ListItemSecondaryAction><Button variant="outlined" color="primary">Manage</Button></ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </GlassmorphicPaper>
                </Box>
            </TabPanel>
        </Box>
    );
}

export default Account; 