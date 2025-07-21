import { useState } from 'react';
import { Box, Typography, Paper, Grid, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, List, ListItem, ListItemText, ListItemSecondaryAction, Switch, Divider, Card, useMediaQuery, Fade, Slide } from '@mui/material';
import { styled, useTheme, alpha, keyframes } from '@mui/system';
import { ArrowUpward, ArrowDownward, Wallet, History, Settings as SettingsIcon, TrendingUp, CreditCard, Visibility, TrendingDown } from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Area, AreaChart, XAxis, YAxis } from 'recharts';
import React from 'react';

// Import icons from the new library
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

// 动画定义
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
`;





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





// Your Assets的高级卡片视图 - 使用Dashboard样式
const PremiumAssetsCardView = () => {
  return (
    <Grid container spacing={3}>
      {assets.map((asset, index) => {
        const theme = useTheme();
        const isPositive = asset.change.startsWith('+') && asset.change !== '+0.0%';
        const isNegative = asset.change.startsWith('-');
        const trendColor = isPositive ? theme.palette.success.main :
                          isNegative ? theme.palette.error.main :
                          theme.palette.grey[500];

        return (
          <Grid item xs={12} sm={6} lg={4} key={asset.symbol}>
            <Fade in timeout={800 + index * 100}>
              <Box
                sx={{
                  position: 'relative',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(trendColor, 0.2)}`,
                  borderRadius: '16px',
                  p: 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.02)',
                    border: `1px solid ${alpha(trendColor, 0.4)}`,
                    boxShadow: `0 20px 40px ${alpha(trendColor, 0.2)}, 0 0 0 1px ${alpha(trendColor, 0.1)}`,
                    '& .trend-indicator': {
                      transform: 'scale(1.1)',
                      boxShadow: `0 0 20px ${alpha(trendColor, 0.6)}`
                    },
                    '& .balance-text': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                {/* 背景装饰 */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -50,
                    right: -50,
                    width: 100,
                    height: 100,
                    background: `radial-gradient(circle, ${alpha(trendColor, 0.1)} 0%, transparent 70%)`,
                    borderRadius: '50%',
                    animation: `${pulse} 4s ease-in-out infinite`
                  }}
                />

                {/* 头部区域 */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.2)})`,
                        border: `2px solid ${alpha(trendColor, 0.3)}`,
                        mr: 2,
                        position: 'relative',
                        color: trendColor,
                        '& svg': {
                          color: trendColor,
                          fill: 'currentColor'
                        }
                      }}
                    >
                      {React.createElement(asset.icon, { style: { width: 32, height: 32 } })}
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          mb: 0.5
                        }}
                      >
                        {asset.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                      >
                        {asset.symbol}
                      </Typography>
                    </Box>
                  </Box>

                  {/* 趋势指示器 */}
                  <Box
                    className="trend-indicator"
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${trendColor}, ${alpha(trendColor, 0.7)})`,
                      boxShadow: `0 0 12px ${alpha(trendColor, 0.5)}`,
                      animation: `${pulse} 2s ease-in-out infinite`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                </Box>

                {/* 余额和价值区域 */}
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Balance
                  </Typography>
                  <Typography
                    variant="h5"
                    className="balance-text"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '1.5rem',
                      mb: 1,
                      transition: 'transform 0.3s ease',
                      background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${trendColor})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {asset.balance}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                    Value (USD)
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      mb: 2
                    }}
                  >
                    ${asset.value.toLocaleString()}
                  </Typography>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`,
                      border: `1px solid ${alpha(trendColor, 0.2)}`
                    }}
                  >
                    {isPositive ? (
                      <TrendingUp sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
                    ) : isNegative ? (
                      <TrendingDown sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
                    ) : null}
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: trendColor,
                        fontSize: '0.9rem'
                      }}
                    >
                      {asset.change}
                    </Typography>
                  </Box>
                </Box>

                {/* 操作按钮 */}
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, mt: 2 }}>
                  <ActionButton
                    size="small"
                    variant="outlined"
                    startIcon={<ArrowUpward />}
                    color="success"
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
                </Box>

                {/* 底部装饰线 */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${trendColor}, transparent)`,
                    opacity: 0.6
                  }}
                />
              </Box>
            </Fade>
          </Grid>
        );
      })}
    </Grid>
  );
};

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
    { name: 'Bitcoin', value: 41.1, color: '#F7931A' },
    { name: 'Ethereum', value: 15.0, color: '#627EEA' },
    { name: 'XRP', value: 8.2, color: '#23292F' },
    { name: 'Tether', value: 6.9, color: '#26A17B' },
    { name: 'BNB', value: 6.2, color: '#F3BA2F' },
    { name: 'Solana', value: 4.9, color: '#14F195' },
    { name: 'USDC', value: 4.1, color: '#2775CA' },
    { name: 'Others', value: 13.6, color: '#9CA3AF' }
];

// Portfolio performance data
const performanceData = [
    { name: 'Jan', value: 285000 },
    { name: 'Feb', value: 298000 },
    { name: 'Mar', value: 315000 },
    { name: 'Apr', value: 328000 },
    { name: 'May', value: 345000 },
    { name: 'Jun', value: 362834 },
];

const assets = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 1.26, value: 149244, icon: BtcIcon, change: '+0.3%', color: '#F7931A' },
    { name: 'Ethereum', symbol: 'ETH', balance: 14.5, value: 54561, icon: EthIcon, change: '+2.0%', color: '#627EEA' },
    { name: 'XRP', symbol: 'XRP', balance: 8500, value: 29750, icon: XrpIcon, change: '+2.4%', color: '#23292F' },
    { name: 'Tether', symbol: 'USDT', balance: 25000, value: 25000, icon: UsdtIcon, change: '-0.0%', color: '#26A17B' },
    { name: 'BNB', symbol: 'BNB', balance: 32.1, value: 22514, icon: BnbIcon, change: '+2.6%', color: '#F3BA2F' },
    { name: 'Solana', symbol: 'SOL', balance: 95.3, value: 17765, icon: SolIcon, change: '+4.7%', color: '#14F195' },
    { name: 'USDC', symbol: 'USDC', balance: 15000, value: 15000, icon: UsdcIcon, change: '-0.0%', color: '#2775CA' },
    { name: 'Dogecoin', symbol: 'DOGE', balance: 28500, value: 10545, icon: DogeIcon, change: '+7.2%', color: '#C2A633' },
    { name: 'Cardano', symbol: 'ADA', balance: 18750, value: 8438, icon: AdaIcon, change: '-0.5%', color: '#0033AD' },
    { name: 'TRON', symbol: 'TRX', balance: 25000, value: 7000, icon: TrxIcon, change: '+1.8%', color: '#FF060A' },
    { name: 'Avalanche', symbol: 'AVAX', balance: 145.2, value: 6120, icon: AvaxIcon, change: '+3.4%', color: '#E84142' },
    { name: 'Chainlink', symbol: 'LINK', balance: 185.4, value: 4760, icon: LinkIcon, change: '+5.2%', color: '#375BD2' },
    { name: 'Bitcoin Cash', symbol: 'BCH', balance: 8.5, value: 4355, icon: BchIcon, change: '-2.1%', color: '#8DC351' },
    { name: 'Wrapped Bitcoin', symbol: 'WBTC', balance: 0.035, value: 4142, icon: WbtcIcon, change: '+0.2%', color: '#F7931A' },
    { name: 'Stellar', symbol: 'XLM', balance: 7500, value: 3600, icon: XlmIcon, change: '+6.3%', color: '#7D00FF' }
];

// Mock transaction history data
const transactions = [
    { type: 'Deposit', asset: 'Bitcoin', amount: '+0.25 BTC', value: '+$15,875.00', date: '2023-06-15 14:30' },
    { type: 'Withdrawal', asset: 'Ethereum', amount: '-5.0 ETH', value: '-$21,750.00', date: '2023-06-10 09:15' },
    { type: 'Trade', asset: 'BTC/USDT', amount: '+0.15 BTC', value: '+$9,525.00', date: '2023-06-05 11:45' },
    { type: 'Trade', asset: 'ETH/BTC', amount: '-2.5 ETH', value: '-0.08 BTC', date: '2023-05-28 16:20' },
    { type: 'Deposit', asset: 'USDT', amount: '+5000 USDT', value: '+$5,000.00', date: '2023-05-20 10:30' },
];



// Your Assets的高级表格视图 - 使用Dashboard样式
const PremiumAssetsTableView = () => {
  const theme = useTheme();
  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* 表格头部 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
          gap: 2,
          p: 2,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.3))'
            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.8), rgba(241, 245, 249, 0.6))',
          borderRadius: '12px 12px 0 0',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          borderBottom: 'none'
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Asset
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          Balance
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          Value (USD)
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          24h Change
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          Actions
        </Typography>
      </Box>

      {/* 表格内容 */}
      <Box>
        {assets.map((asset, index) => {
          const isPositive = asset.change.startsWith('+') && asset.change !== '+0.0%';
          const isNegative = asset.change.startsWith('-');
          const trendColor = isPositive ? theme.palette.success.main :
                            isNegative ? theme.palette.error.main :
                            theme.palette.grey[500];

          return (
            <Slide direction="up" in timeout={600 + index * 100} key={asset.symbol}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
                  gap: 2,
                  p: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.3), rgba(15, 23, 42, 0.2))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(248, 250, 252, 0.6))',
                  backdropFilter: 'blur(10px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderTop: index === 0 ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
                  borderRadius: index === assets.length - 1 ? '0 0 12px 12px' : '0',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`
                      : `linear-gradient(135deg, ${alpha(trendColor, 0.05)}, ${alpha(trendColor, 0.02)})`,
                    border: `1px solid ${alpha(trendColor, 0.3)}`,
                    transform: 'translateX(4px)',
                    '&::before': {
                      opacity: 1
                    }
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: `linear-gradient(180deg, ${trendColor}, ${alpha(trendColor, 0.5)})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  }
                }}
              >
                {/* Asset */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: `linear-gradient(135deg, ${alpha(trendColor, 0.1)}, ${alpha(trendColor, 0.05)})`,
                      border: `2px solid ${alpha(trendColor, 0.2)}`,
                      mr: 2,
                      color: trendColor,
                      '& svg': {
                        color: trendColor,
                        fill: 'currentColor'
                      }
                    }}
                  >
                    {React.createElement(asset.icon, { style: { width: 28, height: 28 } })}
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {asset.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>
                      {asset.symbol}
                    </Typography>
                  </Box>
                </Box>

                {/* Balance */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}
                  >
                    {asset.balance}
                  </Typography>
                </Box>

                {/* Value (USD) */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 700,
                      fontSize: '1.1rem'
                    }}
                  >
                    ${asset.value.toLocaleString()}
                  </Typography>
                </Box>

                {/* 24h Change */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      px: 1.5,
                      py: 0.8,
                      borderRadius: '10px',
                      background: `linear-gradient(135deg, ${alpha(trendColor, 0.15)}, ${alpha(trendColor, 0.08)})`,
                      border: `1px solid ${alpha(trendColor, 0.25)}`
                    }}
                  >
                    {isPositive ? (
                      <TrendingUp sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
                    ) : isNegative ? (
                      <TrendingDown sx={{ fontSize: '1rem', color: trendColor, mr: 0.5 }} />
                    ) : null}
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 700,
                        color: trendColor
                      }}
                    >
                      {asset.change}
                    </Typography>
                  </Box>
                </Box>

                {/* Actions */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 1 }}>
                  <ActionButton
                    size="small"
                    variant="outlined"
                    startIcon={<ArrowUpward />}
                    color="success"
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
                </Box>
              </Box>
            </Slide>
          );
        })}
      </Box>
    </Box>
  );
};

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
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box
                    sx={{
                        width: 6,
                        height: 32,
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        borderRadius: '3px',
                    }}
                />
                <Typography variant={isMobile ? "h5" : "h4"} gutterBottom sx={{
                    fontWeight: 700,
                    mb: 0,
                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                }}>
                    Account
                </Typography>
            </Box>
            
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
                                        <Typography variant="h3" sx={{ fontWeight: 700, mt: 1, fontSize: { xs: '2.5rem', md: '3rem' } }}>$362,834.00</Typography>
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
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                                    <Box
                                        sx={{
                                            width: 4,
                                            height: 24,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            borderRadius: '2px',
                                        }}
                                    />
                                    <Typography variant="h6" sx={{
                                        fontWeight: 700,
                                        background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}>
                                        Portfolio Allocation
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {renderPieChart()}
                                </Box>
                    </GlassmorphicPaper>
                        </Grid>
                    </Grid>
                    
                    {/* Assets Table / Cards - Using Dashboard Style */}
                    <Box sx={{
                        mt: 3,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.7),
                        backdropFilter: 'blur(10px)',
                        borderRadius: 2,
                        py: 1.5,
                        px: 2,
                        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                    }}>
                        <Box
                            sx={{
                                width: 4,
                                height: 24,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                borderRadius: '2px',
                                mr: 1.5,
                            }}
                        />
                        <Wallet sx={{ mr: 1.5, color: theme.palette.primary.main }} />
                        <Typography variant="h6" sx={{
                            fontWeight: 700,
                            background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Your Assets
                        </Typography>
                    </Box>

                    <GlassmorphicPaper>
                        {isMobile ? <PremiumAssetsCardView /> : <PremiumAssetsTableView />}
                    </GlassmorphicPaper>

                </Box>
            </TabPanel>

            {/* HISTORY Tab */}
            <TabPanel value={tabValue} index={1}>
                <GlassmorphicPaper>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box
                                sx={{
                                    width: 4,
                                    height: 24,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    borderRadius: '2px',
                                }}
                            />
                            <Typography variant="h6" sx={{
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}>
                                Transaction History
                            </Typography>
                        </Box>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 24,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        borderRadius: '2px',
                                    }}
                                />
                                <Typography variant="h6" sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                    Notification Settings
                                </Typography>
                            </Box>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                                <Box
                                    sx={{
                                        width: 4,
                                        height: 24,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                        borderRadius: '2px',
                                    }}
                                />
                                <Typography variant="h6" sx={{
                                    fontWeight: 700,
                                    background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}>
                                    Security Settings
                                </Typography>
                            </Box>
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