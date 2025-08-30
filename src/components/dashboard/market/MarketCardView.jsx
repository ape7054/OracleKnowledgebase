import { Box, Typography, Button, Grid, Fade, useTheme } from '@mui/material';
import { alpha, keyframes } from '@mui/system';
import { TrendingUpIcon, TrendingDownIcon } from '@mui/icons-material';
import GlassmorphicPaper from '../styled/GlassmorphicPaper';
import CoinIcon from './CoinIcon';
import PremiumSparkLine from '../charts/PremiumSparkLine';

// 动画定义
const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

const MarketCardView = ({ marketData, error, fetchMarketData, isRefreshing }) => {
  const theme = useTheme();

  // 显示错误状态
  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="error" gutterBottom>
          API连接失败
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {error}
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => fetchMarketData(true)}
          disabled={isRefreshing}
        >
          重新连接
        </Button>
      </Box>
    );
  }

  if (marketData.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          暂无市场数据
        </Typography>
        <Button 
          variant="outlined" 
          onClick={() => fetchMarketData(true)}
          disabled={isRefreshing}
        >
          重新加载
        </Button>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {marketData.map((coin, index) => {
        const isPositive = coin.change.startsWith('+') && coin.change !== '+0.0%';
        const isNegative = coin.change.startsWith('-');
        const isNeutral = coin.change === '+0.0%';
        const neutralColor = theme.palette.text.secondary;

        return (
          <Grid item xs={12} sm={6} lg={4} key={coin.symbol}>
            <Fade in timeout={800 + index * 100}>
              <Box
                sx={{
                  position: 'relative',
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
                    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
                  borderRadius: '16px',
                  p: 3,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-4px) scale(1.02)',
                    border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                    boxShadow: `0 20px 40px ${alpha(theme.palette.divider, 0.2)}`
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
                    background: `radial-gradient(circle, ${alpha(neutralColor, 0.1)} 0%, transparent 70%)`,
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
                          filter: 'grayscale(100%) contrast(0.8) !important'
                        }
                      }}
                      className="asset-icon"
                    >
                      <CoinIcon symbol={coin.symbol} imageUrl={coin.image} />
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
                        {coin.name}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.secondary,
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }}
                      >
                        {coin.symbol}
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
                      background: `radial-gradient(circle, ${neutralColor}, ${alpha(neutralColor, 0.7)})`,
                      boxShadow: `0 0 12px ${alpha(neutralColor, 0.5)}`,
                      animation: `${pulse} 2s ease-in-out infinite`,
                      transition: 'all 0.3s ease'
                    }}
                  />
                </Box>

                {/* 价格区域 */}
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="h4"
                    className="price-text"
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 800,
                      fontSize: '1.8rem',
                      mb: 1,
                      transition: 'transform 0.3s ease',
                      background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${neutralColor})`,
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {coin.price}
                  </Typography>

                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      px: 2,
                      py: 1,
                      borderRadius: '12px',
                      background: `linear-gradient(135deg, ${alpha(neutralColor, 0.1)}, ${alpha(neutralColor, 0.05)})`,
                      border: `1px solid ${alpha(neutralColor, 0.2)}`
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        color: neutralColor,
                        fontSize: '0.9rem'
                      }}
                    >
                      {coin.change}
                    </Typography>
                  </Box>
                </Box>

                {/* 图表区域 */}
                <Box sx={{ height: 80, mb: 2 }}>
                  <PremiumSparkLine
                    data={coin.sparkline}
                    strokeColor={neutralColor}
                    trend={isPositive ? 'up' : isNegative ? 'down' : 'neutral'}
                  />
                </Box>

                {/* 底部装饰线 */}
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: `linear-gradient(90deg, transparent, ${neutralColor}, transparent)`,
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

export default MarketCardView; 