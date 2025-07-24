
import { useState } from 'react';
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

// Premium animations
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
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
    
    // Complete portfolio data with all 15 assets
    const portfolioData = {
        totalBalance: 362834.00,
        totalChange24h: 8.7,
        totalChange7d: 23.4,
        assets: [
            {
                id: 'bitcoin',
                name: 'Bitcoin',
                symbol: 'BTC',
                icon: BtcIcon,
                balance: 1.26,
                value: 149244,
                price: 118424.38,
                change24h: 12.8,
                allocation: 41.1,
                sparkline: [110000, 115000, 122000, 118424, 125000, 120000, 118424]
            },
            {
                id: 'ethereum',
                name: 'Ethereum',
                symbol: 'ETH',
                icon: EthIcon,
                balance: 14.5,
                value: 54561,
                price: 3762.69,
                change24h: 8.5,
                allocation: 15.0,
                sparkline: [3400, 3550, 3820, 3763, 3900, 3650, 3763]
            },
            {
                id: 'ripple',
                name: 'XRP',
                symbol: 'XRP',
                icon: XrpIcon,
                balance: 8500,
                value: 29750,
                price: 3.50,
                change24h: 15.7,
                allocation: 8.2,
                sparkline: [2.95, 3.20, 3.80, 3.45, 3.65, 3.30, 3.50]
            },
            {
                id: 'tether',
                name: 'Tether',
                symbol: 'USDT',
                icon: UsdtIcon,
                balance: 25000,
                value: 25000,
                price: 1.00,
                change24h: 0.1,
                allocation: 6.9,
                sparkline: [1.002, 0.999, 1.001, 0.998, 1.000, 1.001, 1.000]
            },
            {
                id: 'binancecoin',
                name: 'BNB',
                symbol: 'BNB',
                icon: BnbIcon,
                balance: 32.1,
                value: 22514,
                price: 701.38,
                change24h: 11.3,
                allocation: 6.2,
                sparkline: [620, 650, 750, 690, 720, 680, 701]
            },
            {
                id: 'solana',
                name: 'Solana',
                symbol: 'SOL',
                icon: SolIcon,
                balance: 95.3,
                value: 17765,
                price: 186.49,
                change24h: 18.2,
                allocation: 4.9,
                sparkline: [155, 170, 200, 186, 210, 175, 186]
            },
            {
                id: 'usd-coin',
                name: 'USDC',
                symbol: 'USDC',
                icon: UsdcIcon,
                balance: 15000,
                value: 15000,
                price: 1.00,
                change24h: -0.1,
                allocation: 4.1,
                sparkline: [1.001, 0.999, 1.000, 0.998, 1.001, 1.000, 1.000]
            },
            {
                id: 'dogecoin',
                name: 'Dogecoin',
                symbol: 'DOGE',
                icon: DogeIcon,
                balance: 28500,
                value: 10545,
                price: 0.37,
                change24h: 24.6,
                allocation: 2.9,
                sparkline: [0.28, 0.31, 0.42, 0.37, 0.45, 0.35, 0.37]
            },
            {
                id: 'cardano',
                name: 'Cardano',
                symbol: 'ADA',
                icon: AdaIcon,
                balance: 18750,
                value: 8438,
                price: 0.45,
                change24h: -8.3,
                allocation: 2.3,
                sparkline: [0.52, 0.48, 0.42, 0.45, 0.40, 0.47, 0.45]
            },
            {
                id: 'tron',
                name: 'TRON',
                symbol: 'TRX',
                icon: TrxIcon,
                balance: 25000,
                value: 7000,
                price: 0.28,
                change24h: 9.4,
                allocation: 1.9,
                sparkline: [0.24, 0.26, 0.32, 0.28, 0.35, 0.27, 0.28]
            },
            {
                id: 'avalanche-2',
                name: 'Avalanche',
                symbol: 'AVAX',
                icon: AvaxIcon,
                balance: 145.2,
                value: 6120,
                price: 42.15,
                change24h: 14.7,
                allocation: 1.7,
                sparkline: [35.8, 40.2, 48.8, 44.3, 50.15, 38.0, 42.15]
            },
            {
                id: 'chainlink',
                name: 'Chainlink',
                symbol: 'LINK',
                icon: LinkIcon,
                balance: 185.4,
                value: 4760,
                price: 25.68,
                change24h: 19.8,
                allocation: 1.3,
                sparkline: [20.2, 22.8, 28.1, 25.9, 30.67, 24.0, 25.68]
            },
            {
                id: 'bitcoin-cash',
                name: 'Bitcoin Cash',
                symbol: 'BCH',
                icon: BchIcon,
                balance: 8.5,
                value: 4355,
                price: 512.35,
                change24h: -12.5,
                allocation: 1.2,
                sparkline: [580, 550, 490, 510, 475, 520, 512]
            },
            {
                id: 'wrapped-bitcoin',
                name: 'Wrapped Bitcoin',
                symbol: 'WBTC',
                icon: WbtcIcon,
                balance: 0.035,
                value: 4142,
                price: 118342.86,
                change24h: 12.6,
                allocation: 1.1,
                sparkline: [105000, 110000, 125000, 118400, 130000, 115000, 118343]
            },
            {
                id: 'stellar',
                name: 'Stellar',
                symbol: 'XLM',
                icon: XlmIcon,
                balance: 7500,
                value: 3600,
                price: 0.48,
                change24h: 22.1,
                allocation: 1.0,
                sparkline: [0.38, 0.42, 0.52, 0.49, 0.55, 0.45, 0.48]
            }
        ]
    };

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
                                        {balanceVisible ? `$${portfolioData.totalBalance.toLocaleString()}` : '••••••'}
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
                                label={`24h: ${portfolioData.totalChange24h > 0 ? '+' : ''}${portfolioData.totalChange24h}%`}
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
                                label={`7d: ${portfolioData.totalChange7d > 0 ? '+' : ''}${portfolioData.totalChange7d}%`}
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
                                <AssetCard
                                    sx={{
                                        animation: `${slideUp} ${0.2 * (index + 1)}s ease-out`,
                                        '&:hover': {
                                            animation: `${float} 3s ease-in-out infinite`
                                        }
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

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                            Balance
                                        </Typography>
                                        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                                            {balanceVisible ? asset.balance.toFixed(6) : '••••••'} {asset.symbol}
                                        </Typography>
                                        <Typography variant="h6" sx={{
                                            fontWeight: 600,
                                            color: theme.palette.text.secondary
                                        }}>
                                            {balanceVisible ? `$${asset.value.toLocaleString()}` : '••••••'}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                        <Typography variant="body2" color="text.secondary">
                                            ${asset.price.toLocaleString()}
                                        </Typography>
                                        <Chip
                                            size="small"
                                            label={`${asset.change24h > 0 ? '+' : ''}${asset.change24h}%`}
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
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Fade>
        </Container>
    );
}

export default AccountPremium;
