import { useState } from 'react';
import { Box, Grid, Typography, Paper, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Switch } from '@mui/material';
import { styled } from '@mui/system';
import { ArrowUpward, ArrowDownward, Wallet, History, Settings as SettingsIcon } from '@mui/icons-material';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    width: '100%'
}));

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (<Box sx={{ pt: 3 }}><Grid container>{children}</Grid></Box>)}
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

function Account() {
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                Account
            </Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={tabValue} onChange={handleTabChange} textColor="inherit" indicatorColor="primary" variant="fullWidth">
                    <Tab icon={<Wallet />} iconPosition="start" label="Assets" />
                    <Tab icon={<History />} iconPosition="start" label="History" />
                    <Tab icon={<SettingsIcon />} iconPosition="start" label="Settings" />
                </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
                <Grid item xs={12}>
                    <GlassmorphicPaper sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.7)' }}>Total Estimated Balance</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>$149,263.24</Typography>
                    </GlassmorphicPaper>
                    <GlassmorphicPaper>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ color: 'white', border: 0 }}>Asset</TableCell>
                                        <TableCell sx={{ color: 'white', border: 0 }}>Balance</TableCell>
                                        <TableCell sx={{ color: 'white', border: 0 }}>Value (USD)</TableCell>
                                        <TableCell sx={{ color: 'white', border: 0 }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {assets.map((asset) => (
                                        <TableRow key={asset.symbol} sx={{ '& td': { border: 0 }}}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Avatar sx={{ bgcolor: '#333', mr: 2 }}>{asset.icon}</Avatar>
                                                    <Box>
                                                        <Typography>{asset.name}</Typography>
                                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>{asset.symbol}</Typography>
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell>{asset.balance}</TableCell>
                                            <TableCell>${asset.value.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Button startIcon={<ArrowUpward />} sx={{ color: '#4caf50' }}>Deposit</Button>
                                                <Button startIcon={<ArrowDownward />} sx={{ color: '#f44336' }}>Withdraw</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </GlassmorphicPaper>
                </Grid>
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
                <Grid item xs={12}>
                    <GlassmorphicPaper>
                        <Typography variant="h6">Notification Settings</Typography>
                        <List>
                            <ListItem>
                                <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
                                <ListItemSecondaryAction>
                                    <Switch defaultChecked />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText primary="Push Notifications" secondary="Get real-time alerts on your devices" />
                                <ListItemSecondaryAction>
                                    <Switch />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </GlassmorphicPaper>
                </Grid>
            </TabPanel>
        </Box>
    );
}

export default Account; 