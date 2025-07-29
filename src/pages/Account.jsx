
import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Button, 
  Chip,
  IconButton,
  Tooltip,
  Container,
  Grid,
  Fade
} from '@mui/material';
import { styled, useTheme, alpha, keyframes } from '@mui/system';
import { 
  Visibility,
  VisibilityOff,
  Add,
  Remove,
  SwapHoriz,
  TrendingUp,
  TrendingDown,
  Star,
  StarBorder
} from '@mui/icons-material';
import { ResponsiveContainer, AreaChart, Area } from 'recharts';

// Import crypto icons
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

import { marketApi } from '@/api/marketApi.js';

// Premium animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-12px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
  50% { box-shadow: 0 0 40px rgba(99, 102, 241, 0.6); }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Premium Card Component
const PremiumCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.7)})`,
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
  borderRadius: '24px',
  padding: '32px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 20px 60px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  }
}));

// Asset Card Component
const AssetCard = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(145deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.6)})`,
  backdropFilter: 'blur(15px)',
  border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
  borderRadius: '16px',
  padding: '20px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 40px ${alpha(theme.palette.primary.main, 0.1)}`,
    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  }
}));

function AccountPremium() {
    const theme = useTheme();
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Static data representing user's holdings. In a real app, this would come from a user-specific API.
    const userHoldings = [
        { id: 'bitcoin', symbol: 'BTC', balance: 1.26, icon: BtcIcon, name: 'Bitcoin' },
        { id: 'ethereum', symbol: 'ETH', balance: 14.5, icon: EthIcon, name: 'Ethereum' },
        { id: 'ripple', symbol: 'XRP', balance: 8500, icon: XrpIcon, name: 'XRP' },
        { id: 'tether', symbol: 'USDT', balance: 25000, icon: UsdtIcon, name: 'Tether' },
        { id: 'binancecoin', symbol: 'BNB', balance: 32.1, icon: BnbIcon, name: 'BNB' },
        { id: 'solana', symbol: 'SOL', balance: 95.3, icon: SolIcon, name: 'Solana' },
        { id: 'usd-coin', symbol: 'USDC', balance: 15000, icon: UsdcIcon, name: 'USDC' },
        { id: 'dogecoin', symbol: 'DOGE', balance: 28500, icon: DogeIcon, name: 'Dogecoin' },
        { id: 'cardano', symbol: 'ADA', balance: 18750, icon: AdaIcon, name: 'Cardano' },
        { id: 'tron', symbol: 'TRX', balance: 25000, icon: TrxIcon, name: 'TRON' },
        { id: 'avalanche-2', symbol: 'AVAX', balance: 145.2, icon: AvaxIcon, name: 'Avalanche' },
        { id: 'chainlink', symbol: 'LINK', balance: 185.4, icon: LinkIcon, name: 'Chainlink' },
        { id: 'bitcoin-cash', symbol: 'BCH', balance: 8.5, icon: BchIcon, name: 'Bitcoin Cash' },
        { id: 'wrapped-bitcoin', symbol: 'WBTC', balance: 0.035, icon: WbtcIcon, name: 'Wrapped Bitcoin' },
        { id: 'stellar', symbol: 'XLM', balance: 7500, icon: XlmIcon, name: 'Stellar' }
    ];

    useEffect(() => {
        const fetchPortfolioData = async () => {
            try {
                setLoading(true);
                const coinIds = userHoldings.map(asset => asset.id);
                const marketData = await marketApi.getMultipleCoins(coinIds);

                if (!marketData || !marketData.data || !Array.isArray(marketData.data)) {
                    throw new Error('Invalid API response format');
                }

                let totalBalance = 0;
                const assets = userHoldings.map(holding => {
                    const marketInfo = marketData.data.find(coin => coin.id === holding.id);
                    if (!marketInfo) {
                        return { ...holding, value: 0, price: 0, change24h: 0, sparkline: [] };
                    }

                    const value = holding.balance * marketInfo.current_price;
                    totalBalance += value;
                    
                    // 生成sparkline数据 - 因为API可能不返回sparkline数据
                    const basePrice = marketInfo.current_price;
                    const priceChange = marketInfo.price_change_percentage_24h || 0;
                    const direction = priceChange >= 0 ? 1 : -1;
                    
                    // 生成合成的图表数据
                    const sparklineData = marketInfo.sparkline_in_7d?.price && Array.isArray(marketInfo.sparkline_in_7d.price) && marketInfo.sparkline_in_7d.price.length > 0
                        ? marketInfo.sparkline_in_7d.price
                        : [0, 1, 2, 3, 4, 5, 6].map(i => {
                            const randomVariation = direction * Math.random() * Math.abs(basePrice * priceChange / 100) * 0.2;
                            return basePrice + randomVariation;
                        });

                    return {
                        ...holding,
                        value,
                        price: marketInfo.current_price,
                        change24h: marketInfo.price_change_percentage_24h,
                        sparkline: sparklineData
                    };
                });

                const totalChange24h = assets.reduce((acc, asset) => {
                    if (asset.value > 0) {
                        return acc + (asset.value * (asset.change24h / 100));
                    }
                    return acc;
                }, 0) / totalBalance * 100;

                setPortfolioData({
                    totalBalance,
                    totalChange24h,
                    totalChange7d: 2.8, // 假设的7天变化
                    assets
                });
                setError(null);
            } catch (err) {
                console.error("Failed to fetch portfolio data:", err);
                setError("Failed to load portfolio data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchPortfolioData();
    }, []);
    
    if (loading) {
        return <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}><Typography>Loading Portfolio...</Typography></Container>;
    }
    if (error) {
        return <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}><Typography color="error">{error}</Typography></Container>;
    }
    if (!portfolioData) {
        return null;
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* Header */}
                    <Box sx={{ mb: 4 }}>
                        <Typography 
                            variant="h3" 
                            sx={{ 
                                fontWeight: 800,
                                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                mb: 1
                            }}
                        >
                            Portfolio
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Manage your digital assets with institutional-grade security
                        </Typography>
                    </Box>

                    {/* Premium Balance Card */}
                    <PremiumCard sx={{ mb: 4, animation: `${slideUp} 0.8s ease-out` }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                            <Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    Total Portfolio Value
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Typography 
                                        variant="h2" 
                                        sx={{ 
                                            fontWeight: 900,
                                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            backgroundClip: 'text',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent'
                                        }}
                                    >
                                        {balanceVisible ? `$${portfolioData.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                                    </Typography>
                                    <IconButton 
                                        onClick={() => setBalanceVisible(!balanceVisible)}
                                        sx={{ 
                                            color: theme.palette.text.secondary,
                                            '&:hover': { color: theme.palette.primary.main }
                                        }}
                                    >
                                        {balanceVisible ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <Tooltip title="Add Funds">
                                    <IconButton 
                                        sx={{ 
                                            background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                                            color: '#fff',
                                            '&:hover': { transform: 'scale(1.05)' }
                                        }}
                                    >
                                        <Add />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Withdraw">
                                    <IconButton 
                                        sx={{ 
                                            background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                                            color: '#fff',
                                            '&:hover': { transform: 'scale(1.05)' }
                                        }}
                                    >
                                        <Remove />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Trade">
                                    <IconButton 
                                        sx={{ 
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            color: '#fff',
                                            '&:hover': { transform: 'scale(1.05)' }
                                        }}
                                    >
                                        <SwapHoriz />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                        
                        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                            <Chip
                                label={`24h: ${portfolioData.totalChange24h > 0 ? '+' : ''}${portfolioData.totalChange24h.toFixed(2)}%`}
                                sx={{
                                    background: portfolioData.totalChange24h > 0 
                                        ? `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`
                                        : `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                                    color: '#fff',
                                    fontWeight: 600,
                                    animation: `${glow} 2s ease-in-out infinite`
                                }}
                            />
                            <Chip
                                label={`7d: ${portfolioData.totalChange7d > 0 ? '+' : ''}${portfolioData.totalChange7d.toFixed(2)}%`}
                                sx={{
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    color: '#fff',
                                    fontWeight: 600
                                }}
                            />
                        </Box>
                    </PremiumCard>

                    {/* Assets Grid */}
                    <Grid container spacing={3}>
                        {portfolioData.assets.map((asset, index) => (
                            <Grid item xs={12} sm={6} lg={3} key={asset.id}>
                                <Fade in timeout={500 + index * 100}>
                                    <AssetCard
                                        sx={{
                                            //animation: `${slideUp} ${0.2 * (index + 1)}s ease-out`,
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            // '&:hover': {
                                            //     animation: `${float} 3s ease-in-out infinite`
                                            // }
                                        }}
                                        onClick={() => setSelectedAsset(asset)}
                                    >
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                            <Box sx={{
                                                width: 48,
                                                height: 48,
                                                borderRadius: '50%',
                                                background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.secondary.main, 0.1)})`,
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                mr: 2,
                                                border: `2px solid ${alpha(theme.palette.primary.main, 0.2)}`
                                            }}>
                                                <asset.icon style={{ width: 28, height: 28 }} />
                                            </Box>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                                                    {asset.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {asset.symbol}
                                                </Typography>
                                            </Box>
                                            <IconButton size="small">
                                                <StarBorder />
                                            </IconButton>
                                        </Box>

                                        <Box sx={{ mb: 2, flexGrow: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                                Balance
                                            </Typography>
                                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, wordBreak: 'break-all' }}>
                                                {balanceVisible ? `${asset.balance.toFixed(6)} ${asset.symbol}` : '••••••'}
                                            </Typography>
                                            <Typography variant="h6" sx={{
                                                fontWeight: 600,
                                                color: theme.palette.text.secondary
                                            }}>
                                                {balanceVisible ? `$${asset.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : '••••••'}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                            <Typography variant="body2" color="text.secondary">
                                                ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                            </Typography>
                                            <Chip
                                                size="small"
                                                label={`${asset.change24h > 0 ? '+' : ''}${asset.change24h.toFixed(2)}%`}
                                                sx={{
                                                    background: asset.change24h > 0
                                                        ? `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`
                                                        : `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
                                                    color: '#fff',
                                                    fontWeight: 600,
                                                    fontSize: '0.75rem'
                                                }}
                                            />
                                        </Box>

                                        <Box sx={{ height: 60, mb: 2 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={asset.sparkline.map((value, index) => ({ value, index }))}>
                                                    <defs>
                                                        <linearGradient id={`gradient-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor={asset.change24h > 0 ? theme.palette.success.main : theme.palette.error.main} stopOpacity={0.3}/>
                                                            <stop offset="95%" stopColor={asset.change24h > 0 ? theme.palette.success.main : theme.palette.error.main} stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <Area
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke={asset.change24h > 0 ? theme.palette.success.main : theme.palette.error.main}
                                                        strokeWidth={2}
                                                        fill={`url(#gradient-${asset.id})`}
                                                        dot={false}
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </Box>

                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    flex: 1,
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Buy
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                sx={{
                                                    flex: 1,
                                                    borderRadius: '8px',
                                                    textTransform: 'none',
                                                    fontWeight: 600
                                                }}
                                            >
                                                Sell
                                            </Button>
                                        </Box>
                                    </AssetCard>
                                </Fade>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Fade>
        </Container>
    );
}

export default AccountPremium;
