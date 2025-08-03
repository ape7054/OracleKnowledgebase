
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Fade,
  Stack,
  Card,
  CardContent,
  Avatar,
  Divider
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
  StarBorder,
  Verified,
  Security,
  FileDownload,
  Refresh,
  Logout,
  Person,
  Email
} from '@mui/icons-material';
import { ResponsiveContainer, AreaChart, Area, LineChart, Line, YAxis } from 'recharts';
import { useAuth } from '../context/AuthContext';

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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
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

// User Profile Card Component
const UserProfileCard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Card
      sx={{
        mb: 4,
        background: `linear-gradient(135deg, 
          ${alpha('#00ff88', 0.1)}, 
          ${alpha('#0099ff', 0.1)})`,
        border: `2px solid ${alpha('#00ff88', 0.3)}`,
        borderRadius: 4,
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)',
          zIndex: 0,
        }
      }}
    >
      <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography
            variant="h5"
            sx={{
              color: '#00ff88',
              fontWeight: 'bold',
              textShadow: '0 0 20px rgba(0, 255, 136, 0.3)',
            }}
          >
            Account Information
          </Typography>
          <Chip
            icon={<Verified />}
            label="Authenticated"
            sx={{
              background: 'linear-gradient(135deg, #00ff88, #0099ff)',
              color: 'white',
              fontWeight: 'bold',
              '& .MuiChip-icon': {
                color: 'white',
              },
            }}
          />
        </Box>

        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={8}>
            <Box display="flex" alignItems="center" gap={3}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  background: 'linear-gradient(135deg, #00ff88, #0099ff)',
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
                }}
              >
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </Avatar>
              
              <Box>
                <Box display="flex" alignItems="center" gap={2} mb={1}>
                  <Person sx={{ color: '#0099ff', fontSize: 20 }} />
                  <Typography
                    variant="h6"
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {user?.username || 'User'}
                  </Typography>
                </Box>
                
                <Box display="flex" alignItems="center" gap={2} mb={2}>
                  <Email sx={{ color: '#0099ff', fontSize: 20 }} />
                  <Typography
                    variant="body1"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.8)',
                    }}
                  >
                    {user?.email || 'user@example.com'}
                  </Typography>
                </Box>

                <Box display="flex" gap={2}>
                  <Chip
                    label={`User ID: ${user?.id || '1'}`}
                    size="small"
                    variant="outlined"
                    sx={{
                      color: 'rgba(255, 255, 255, 0.7)',
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                  />
                  <Chip
                    label="Premium Member"
                    size="small"
                    sx={{
                      background: alpha('#ffaa00', 0.2),
                      color: '#ffaa00',
                      border: '1px solid #ffaa00',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection="column" gap={2} alignItems="flex-end">
              <Button
                variant="outlined"
                startIcon={<Person />}
                sx={{
                  color: '#0099ff',
                  borderColor: '#0099ff',
                  '&:hover': {
                    backgroundColor: alpha('#0099ff', 0.1),
                    borderColor: '#0099ff',
                  },
                }}
              >
                Edit Profile
              </Button>
              
              <Button
                variant="contained"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{
                  background: 'linear-gradient(135deg, #ff4444, #ff6666)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #ff6666, #ff4444)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Logout
              </Button>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(255, 255, 255, 0.6)',
            textAlign: 'center',
          }}
        >
          Welcome to your MarketPulse account dashboard. Manage your portfolio and preferences below.
        </Typography>
      </CardContent>
    </Card>
  );
};

function AccountPremium() {
    const theme = useTheme();

    // Step 1: Initialization
    // We use `useState` hooks to create and manage the component's internal state.
    // - `balanceVisible`: controls whether sensitive financial numbers are shown or hidden.
    // - `selectedAsset`: tracks which asset card the user clicks on.
    // - `portfolioData`: will store all the calculated data for the portfolio.
    // - `loading`: a boolean (true/false) to show a loading indicator while fetching data.
    // - `error`: will store an error message if data fetching fails.
    const [balanceVisible, setBalanceVisible] = useState(true);
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // This is static (静态的) data. In a real application, you would fetch this 
    // user-specific data from your backend server.
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

    // Step 3: Data Fetching Logic
    // This `async` function is responsible for getting all the data from the crypto API.
    const fetchPortfolioData = async () => {
        try {
            // Set loading to true at the beginning of the fetch.
            setLoading(true);
            const coinIds = userHoldings.map(asset => asset.id);

            // Step 4: API Call
            // We call `getMultipleCoins` to make the network request (网络请求).
            // `await` pauses the function until the data is received from the API.
            const marketData = await marketApi.getMultipleCoins(coinIds);

            if (!marketData || !marketData.data || !Array.isArray(marketData.data)) {
                throw new Error('Invalid API response format');
            }

            // Step 5: Data Processing
            // After receiving the data, we process it to calculate values 
            // and prepare it for display in the UI.
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
                    : generateExaggeratedSparkline(basePrice, priceChange, direction, holding.symbol);

                return {
                    ...holding,
                    value,
                    price: marketInfo.current_price,
                    change24h: marketInfo.price_change_percentage_24h,
                    sparkline: sparklineData
                };
            });

            // 生成夸张的波动数据
            function generateExaggeratedSparkline(basePrice, priceChange, direction, symbol) {
                const pointCount = 24;
                const isStablecoin = symbol === 'USDT' || symbol === 'USDC';

                if (isStablecoin) {
                    // 对稳定币，返回带有极小噪音的平线
                    const noise = basePrice * 0.0005; // 0.05% 的噪音
                    return Array.from({ length: pointCount }, () => basePrice + (Math.random() - 0.5) * noise);
                }

                // 对所有其他高波动币种
                const volatilityFactor = 0.30; // 30% 的基础波动率
                const volatilityRange = basePrice * volatilityFactor;

                const data = [];
                data.push(basePrice);

                for (let i = 1; i < pointCount; i++) {
                    const progress = i / (pointCount - 1);
                    
                    // 趋势
                    const trend = (priceChange / 100) * basePrice * progress;
                    
                    // 季节性/周期性波动
                    const seasonal = Math.sin(progress * Math.PI * 2.5) * volatilityRange * 0.4;
                    
                    // 随机噪音
                    const noise = (Math.random() - 0.5) * volatilityRange * 0.6;
                    
                    const newPrice = basePrice + trend + seasonal + noise;
                    data.push(Math.max(0, newPrice)); // 确保价格不为负
                }
                return data;
            }

            const totalChange24h = assets.reduce((acc, asset) => {
                if (asset.value > 0) {
                    return acc + (asset.value * (asset.change24h / 100));
                }
                return acc;
            }, 0) / totalBalance * 100;

            // Step 6: State Update
            // We update the component's state with the newly fetched and processed data.
            // Calling a `set` function like `setPortfolioData` tells React to re-render the component.
            setPortfolioData({
                totalBalance,
                totalChange24h,
                totalChange7d: 2.8, // Assumed 7-day change, for demonstration
                assets
            });
            setError(null); // Clear any previous errors.
        } catch (err) {
            // If any part of the `try` block fails, we catch the error here.
            console.error("Failed to fetch portfolio data:", err);
            setError("Failed to load portfolio data. Please try again later.");
        } finally {
            // This `finally` block runs whether the fetch succeeded or failed.
            // We set `loading` to false to hide the loading indicator.
            setLoading(false);
        }
    };

    // Step 2: Triggering the Data Fetch
    // The `useEffect` hook runs after the component's first render.
    // The empty dependency array `[]` means it will only run once when the component "mounts" (挂载).
    useEffect(() => {
        fetchPortfolioData();
    }, []);
    
    // Step 2a: Conditional Rendering (条件渲染)
    // Before we have data, we show a loading message. This is the first thing the user sees.
    if (loading) {
        return <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}><Typography>Loading Portfolio...</Typography></Container>;
    }
    // If an error occurred during the fetch, we show the error message.
    if (error) {
        return <Container maxWidth="xl" sx={{ py: 4, textAlign: 'center' }}><Typography color="error">{error}</Typography></Container>;
    }
    // If for some reason we have no data and no error, render nothing.
    if (!portfolioData) {
        return null;
    }

    // Step 7: Final Render
    // Once `loading` is false and `portfolioData` has data, React renders this main JSX.
    // This is the complete UI for the portfolio page.
    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Fade in timeout={800}>
                <Box>
                    {/* User Profile Card */}
                    <UserProfileCard />
                    
                    {/* Header */}
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 4
                    }}>
                        <Box>
                            <Typography
                                variant="h2"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    mb: 1,
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                Digital Asset Portfolio
                            </Typography>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: theme.palette.text.secondary,
                                    fontWeight: 400,
                                    mb: 2
                                }}
                            >
                                A complete overview of your crypto holdings and performance.
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Chip
                                    icon={<Security sx={{ fontSize: 16 }} />}
                                    label="Institutional-grade Security"
                                    sx={{
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        fontWeight: 600,
                                        animation: `${pulse} 2s ease-in-out infinite`
                                    }}
                                />
                                <Chip
                                    icon={<Verified sx={{ fontSize: 16 }} />}
                                    label="Real-time Valuations"
                                    variant="outlined"
                                    sx={{
                                        borderColor: theme.palette.primary.main,
                                        color: theme.palette.primary.main
                                    }}
                                />
                            </Stack>
                        </Box>

                        <Stack direction="row" spacing={1.5}>
                            <Tooltip title="Refresh Data">
                                <IconButton
                                    onClick={fetchPortfolioData}
                                    sx={{
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(102, 126, 234, 0.2)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                                        }
                                    }}
                                >
                                    <Refresh />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Export Report (CSV)">
                                <IconButton
                                    sx={{
                                        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                                        backdropFilter: 'blur(20px)',
                                        border: '1px solid rgba(102, 126, 234, 0.2)',
                                        '&:hover': {
                                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                                        }
                                    }}
                                >
                                    <FileDownload />
                                </IconButton>
                            </Tooltip>
                        </Stack>
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

                                        <Box sx={{ height: 100, mb: 2 }}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <LineChart 
                                                    data={asset.sparkline.map((value, index) => ({ value, index }))}
                                                    margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
                                                    >
                                                    <defs>
                                                        <linearGradient id={`gradient-${asset.id}`} x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor={asset.change24h > 0 ? theme.palette.success.main : theme.palette.error.main} stopOpacity={0.5}/>
                                                            <stop offset="95%" stopColor={asset.change24h > 0 ? theme.palette.success.main : theme.palette.error.main} stopOpacity={0}/>
                                                        </linearGradient>
                                                    </defs>
                                                    <Line
                                                        type="monotone"
                                                        dataKey="value"
                                                        stroke={asset.change24h > 0 ? theme.palette.success.main : theme.palette.error.main}
                                                        strokeWidth={2.5} // 线条宽度
                                                        animationDuration={800}
                                                        animationEasing="ease-in-out"
                                                        isAnimationActive={true}
                                                        dot={false}
                                                    />
                                                    <YAxis 
                                                        hide={true} 
                                                        domain={
                                                            asset.symbol === 'USDT' || asset.symbol === 'USDC'
                                                                ? [0.995, 1.005] // 对稳定币使用固定的Y轴范围，强制其看起来平坦
                                                                : [dataMin => (dataMin * 0.9), dataMax => (dataMax * 1.1)] // 对其他币种使用动态范围，增加10%的上下边距
                                                        }
                                                    />
                                                </LineChart>
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
