import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Card, useMediaQuery, Tabs, Tab } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import { cachedMarketApi } from '../api/marketApi';

// Import icons
import BtcIcon from 'cryptocurrency-icons/svg/color/btc.svg?react';
import EthIcon from 'cryptocurrency-icons/svg/color/eth.svg?react';
import SolIcon from 'cryptocurrency-icons/svg/color/sol.svg?react';
import UsdtIcon from 'cryptocurrency-icons/svg/color/usdt.svg?react';
import BnbIcon from 'cryptocurrency-icons/svg/color/bnb.svg?react';
import AdaIcon from 'cryptocurrency-icons/svg/color/ada.svg?react';
import TrxIcon from 'cryptocurrency-icons/svg/color/trx.svg?react';
import XlmIcon from 'cryptocurrency-icons/svg/color/xlm.svg?react';
import LinkIcon from 'cryptocurrency-icons/svg/color/link.svg?react';
import BchIcon from 'cryptocurrency-icons/svg/color/bch.svg?react';
import AvaxIcon from 'cryptocurrency-icons/svg/color/avax.svg?react';
import XrpIcon from 'cryptocurrency-icons/svg/color/xrp.svg?react';
import WbtcIcon from 'cryptocurrency-icons/svg/color/wbtc.svg?react';
import UsdcIcon from 'cryptocurrency-icons/svg/color/usdc.svg?react';
import DogeIcon from 'cryptocurrency-icons/svg/color/doge.svg?react';

// Static assets data
const staticAssets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 1.26, value: 149244, icon: BtcIcon, change: '+0.3%', color: '#10B981', apiId: 'bitcoin' },
    { name: 'Ethereum', symbol: 'ETH', balance: 14.5, value: 54561, icon: EthIcon, change: '+2.0%', color: '#10B981', apiId: 'ethereum' },
    { name: 'XRP', symbol: 'XRP', balance: 8500, value: 29750, icon: XrpIcon, change: '+2.4%', color: '#10B981', apiId: 'ripple' },
    { name: 'Tether', symbol: 'USDT', balance: 25000, value: 25000, icon: UsdtIcon, change: '-0.0%', color: '#EF4444', apiId: 'tether' },
    { name: 'BNB', symbol: 'BNB', balance: 32.1, value: 22514, icon: BnbIcon, change: '+2.6%', color: '#10B981', apiId: 'binancecoin' },
    { name: 'Solana', symbol: 'SOL', balance: 95.3, value: 17765, icon: SolIcon, change: '+4.7%', color: '#10B981', apiId: 'solana' },
    { name: 'USDC', symbol: 'USDC', balance: 15000, value: 15000, icon: UsdcIcon, change: '-0.0%', color: '#EF4444', apiId: 'usd-coin' },
    { name: 'Dogecoin', symbol: 'DOGE', balance: 28500, value: 10545, icon: DogeIcon, change: '+7.2%', color: '#10B981', apiId: 'dogecoin' },
    { name: 'Cardano', symbol: 'ADA', balance: 18750, value: 8438, icon: AdaIcon, change: '-0.5%', color: '#EF4444', apiId: 'cardano' },
    { name: 'TRON', symbol: 'TRX', balance: 25000, value: 7000, icon: TrxIcon, change: '+1.8%', color: '#10B981', apiId: 'tron' },
    { name: 'Avalanche', symbol: 'AVAX', balance: 145.2, value: 6120, icon: AvaxIcon, change: '+3.4%', color: '#10B981', apiId: 'avalanche-2' },
    { name: 'Chainlink', symbol: 'LINK', balance: 185.4, value: 4760, icon: LinkIcon, change: '+5.2%', color: '#10B981', apiId: 'chainlink' },
    { name: 'Bitcoin Cash', symbol: 'BCH', balance: 8.5, value: 4355, icon: BchIcon, change: '-2.1%', color: '#EF4444', apiId: 'bitcoin-cash' },
    { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.035, value: 4142, icon: WbtcIcon, change: '+0.2%', color: '#10B981', apiId: 'wrapped-bitcoin' },
    { name: 'Stellar', symbol: 'XLM', balance: 7500, value: 3600, icon: XlmIcon, change: '+6.3%', color: '#10B981', apiId: 'stellar' }
];

// Styled components
const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' 
    ? 'rgba(22, 28, 36, 0.8)' 
    : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  padding: theme.spacing(3),
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
    : '0 8px 32px 0 rgba(145, 158, 171, 0.24)',
  border: `1px solid ${theme.palette.divider}`,
}));

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function AccountMinimal() {
  const [tabValue, setTabValue] = useState(0);
  const [marketData, setMarketData] = useState(staticAssets);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fetch market data
  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const response = await cachedMarketApi.getMarketData(15);
      
      if (response.success && response.data) {
        const updatedAssets = staticAssets.map(asset => {
          const apiData = response.data.find(coin => coin.id === asset.apiId);
          if (apiData) {
            const value = asset.balance * apiData.current_price;
            return {
              ...asset,
              value: value,
              change: `${apiData.price_change_percentage_24h >= 0 ? '+' : ''}${apiData.price_change_percentage_24h?.toFixed(1)}%`,
              color: apiData.price_change_percentage_24h >= 0 ? '#10B981' : '#EF4444'
            };
          }
          return asset;
        });
        setMarketData(updatedAssets);
      }
    } catch (err) {
      console.error('Failed to fetch market data:', err);
      setError('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);

  const totalValue = marketData.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
        Account Overview
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
        <Tab label="Assets" />
        <Tab label="Activity" />
        <Tab label="Settings" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
              Your Assets
            </Typography>

            <GlassmorphicPaper>
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Total Value
                </Typography>
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  ${totalValue.toLocaleString()}
                </Typography>
              </Box>

              {loading ? (
                <Typography>Loading...</Typography>
              ) : error ? (
                <Typography color="error">{error}</Typography>
              ) : (
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Asset</TableCell>
                        <TableCell align="right">Balance</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">24h Change</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marketData.map((asset) => (
                        <TableRow key={asset.symbol} hover>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <Box sx={{ mr: 1.5 }}>
                                <asset.icon style={{ width: 24, height: 24 }} />
                              </Box>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                  {asset.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {asset.symbol}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell align="right">{asset.balance}</TableCell>
                          <TableCell align="right">${asset.value.toLocaleString()}</TableCell>
                          <TableCell align="right">
                            <Typography sx={{ color: asset.color, fontWeight: 500 }}>
                              {asset.change}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </GlassmorphicPaper>
          </Grid>
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6">Activity tab content</Typography>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6">Settings tab content</Typography>
      </TabPanel>
    </Box>
  );
}

export default AccountMinimal;
