import { Box, Typography, Button, Slide, useTheme, useMediaQuery } from '@mui/material';
import { alpha } from '@mui/system';
import CoinIcon from './CoinIcon';
import PremiumSparkLine from '../charts/PremiumSparkLine';

const MarketTableView = ({ marketData, error, fetchMarketData, isRefreshing, initialLoading }) => {
  const theme = useTheme();

  // 显示错误状态
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error" gutterBottom>
          API连接失败
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button variant="contained" onClick={() => fetchMarketData(true)}>
          重新连接
        </Button>
      </Box>
    );
  }

  if (marketData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          暂无市场数据
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          请检查网络连接或稍后重试
        </Typography>
        <Button variant="contained" onClick={() => fetchMarketData(true)}>
          重新加载
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ overflow: 'hidden' }}>
      {/* 表格头部 */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
          gap: 2,
          p: 2,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.55), rgba(15, 23, 42, 0.35))'
            : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9), rgba(241, 245, 249, 0.7))',
          borderRadius: '16px 16px 0 0',
          border: `1px solid ${alpha(theme.palette.divider, 0.18)}`,
          backdropFilter: 'blur(12px)',
          boxShadow: theme.palette.mode === 'dark'
            ? `0 6px 24px ${alpha('#000', 0.35)}`
            : `0 6px 24px ${alpha('#000', 0.12)}`
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Asset
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          Price
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          24h Change
        </Typography>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: theme.palette.text.secondary, textTransform: 'uppercase', letterSpacing: '0.1em', textAlign: 'right' }}>
          24h Chart
        </Typography>
      </Box>

      {/* 表格内容 */}
      <Box>
        {marketData.map((coin, index) => {
          const isPositive = coin.change.startsWith('+') && coin.change !== '+0.0%';
          const isNegative = coin.change.startsWith('-');
          const neutralColor = theme.palette.text.secondary;

          return (
            <Slide direction="up" in timeout={600 + index * 100} key={coin.symbol}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1.5fr',
                  gap: 2,
                  p: 2.5,
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.35), rgba(15, 23, 42, 0.22))'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.7))',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.12)}`,
                  borderTop: index === 0 ? `1px solid ${alpha(theme.palette.divider, 0.12)}` : 'none',
                  borderRadius: index === marketData.length - 1 ? '0 0 16px 16px' : '0',
                  transition: 'all 0.35s ease',
                  position: 'relative',
                  overflow: 'hidden',
                  '&:hover': {
                    background: theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.45), rgba(15, 23, 42, 0.32))'
                      : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.8))',
                    border: `1px solid ${alpha(theme.palette.divider, 0.25)}`,
                    transform: 'translateX(6px) scale(1.01)',
                    boxShadow: `0 14px 36px ${alpha(theme.palette.divider, 0.18)}`
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: `linear-gradient(180deg, ${neutralColor}, ${alpha(neutralColor, 0.5)})`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease'
                  },
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
                      background: theme.palette.mode === 'dark' 
                        ? alpha(theme.palette.background.paper, 0.8)
                        : alpha('#fff', 0.95),
                      border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                      mr: 2,
                      position: 'relative',
                      color: theme.palette.text.secondary,
                      '& svg': {
                        color: 'inherit !important', 
                        fill: 'currentColor !important',
                        filter: 'none !important'
                      }
                    }}
                    className="asset-icon"
                  >
                    <CoinIcon symbol={coin.symbol} imageUrl={coin.image} />
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 800, mb: 0.25 }}>
                      {coin.name}
                    </Typography>
                    <Typography variant="caption" sx={{
                      color: theme.palette.text.secondary,
                      fontWeight: 700,
                      px: 1,
                      py: 0.25,
                      borderRadius: 1,
                      backgroundColor: alpha(theme.palette.divider, 0.08),
                      border: `1px solid ${alpha(theme.palette.divider, 0.18)}`
                    }}>
                      {coin.symbol}
                    </Typography>
                  </Box>
                </Box>

                {/* Price */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '1.15rem',
                      color: theme.palette.text.primary
                    }}
                  >
                    {coin.price}
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
                      borderRadius: '999px',
                      background: alpha(theme.palette.divider, 0.1),
                      border: `1px solid ${alpha(theme.palette.divider, 0.2)}`
                    }}
                  >
                    <Typography variant="body2" sx={{ 
                      fontWeight: 700, 
                      color: isPositive ? theme.palette.success.main : isNegative ? theme.palette.error.main : theme.palette.text.secondary 
                    }}>
                      {coin.change}
                    </Typography>
                  </Box>
                </Box>

                {/* 24h Chart */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Box sx={{ width: 140, height: 54 }}>
                    <PremiumSparkLine
                      data={coin.sparkline}
                      strokeColor={isPositive ? theme.palette.success.main : isNegative ? theme.palette.error.main : theme.palette.text.secondary}
                      trend={isPositive ? 'up' : isNegative ? 'down' : 'neutral'}
                    />
                  </Box>
                </Box>
              </Box>
            </Slide>
          );
        })}
      </Box>
    </Box>
  );
};

export default MarketTableView; 