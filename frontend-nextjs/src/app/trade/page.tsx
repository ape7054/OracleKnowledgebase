'use client';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  Avatar,
  Stack,
  Tabs,
  Tab,
  Alert,
  IconButton,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Refresh,
  AccountBalanceWallet,
  ShowChart,
  BarChart,
  CallMade,
  CallReceived,
  Home,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/context/AuthContext';
import { useMarketData } from '@/lib/hooks/useMarketData';
import { useOhlcData } from '@/lib/hooks/useOhlcData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`trading-tabpanel-${index}`}
      aria-labelledby={`trading-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function TradingContent() {
  const router = useRouter();
  const { user } = useAuth();
  const { data: marketData, loading: marketLoading, refetch: refetchMarket } = useMarketData(10);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const { data: ohlcData, loading: ohlcLoading } = useOhlcData(selectedCoin, 7);
  const [tabValue, setTabValue] = useState(0);
  const [orderType, setOrderType] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [balance] = useState(50000); // 模拟账户余额

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleTradeSubmit = () => {
    // 模拟交易提交
    alert(`${orderType === 'buy' ? '买入' : '卖出'} ${amount} ${selectedCoin.toUpperCase()} @ $${price}`);
    setAmount('');
    setPrice('');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const formatChange = (change: number) => {
    const isPositive = change >= 0;
    return (
      <Chip
        size="small"
        icon={isPositive ? <TrendingUp /> : <TrendingDown />}
        label={`${isPositive ? '+' : ''}${change.toFixed(2)}%`}
        color={isPositive ? 'success' : 'error'}
        sx={{ fontWeight: 600 }}
      />
    );
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box display="flex" alignItems="center" gap={2}>
          {/* 在这里使用我们从 Figma 导出的图标 */}
          <img src="/icons/custom-wallet.svg" alt="Wallet Icon" width="40" height="40" />
          <Box>
            <Typography variant="h4" gutterBottom>
              交易中心
            </Typography>
            <Typography variant="body1" color="text.secondary">
              模拟加密货币交易 - 安全学习投资策略
            </Typography>
          </Box>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => router.push('/')}
            sx={{
              borderColor: '#00ffff',
              color: '#00ffff',
              '&:hover': {
                borderColor: '#0099cc',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
              },
            }}
          >
            返回首页
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={refetchMarket}
            disabled={marketLoading}
          >
            刷新数据
          </Button>
        </Stack>
      </Box>

      {/* Account Balance */}
      <Alert
        severity="info"
        icon={<AccountBalanceWallet />}
        sx={{ 
          mb: 4,
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
        }}
      >
        <Typography variant="h6">
          账户余额: {formatPrice(balance)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          这是模拟账户，所有交易均为演示用途
        </Typography>
      </Alert>

      <Box 
        display="flex" 
        flexDirection={{ xs: 'column', md: 'row' }}
        gap={3}
      >
        {/* 市场数据面板 */}
        <Box flex={{ xs: 1, md: 2 }}>
          <Paper
            sx={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
              borderRadius: 2,
            }}
          >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                variant="fullWidth"
                sx={{
                  '& .MuiTab-root': { color: 'text.secondary' },
                  '& .Mui-selected': { color: '#00ffff' },
                  '& .MuiTabs-indicator': { backgroundColor: '#00ffff' },
                }}
              >
                <Tab icon={<ShowChart />} label="市场概览" />
                <Tab icon={<BarChart />} label="价格图表" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              {/* 市场数据列表 */}
              <Typography variant="h6" gutterBottom>
                热门加密货币
              </Typography>
              
              {marketLoading ? (
                <Typography>加载中...</Typography>
              ) : (
                <Stack spacing={2}>
                  {marketData.map((coin) => (
                    <Card
                      key={coin.id}
                      onClick={() => setSelectedCoin(coin.id)}
                      sx={{
                        cursor: 'pointer',
                        background: selectedCoin === coin.id 
                          ? 'rgba(0, 255, 255, 0.1)' 
                          : 'rgba(26, 31, 46, 0.4)',
                        border: selectedCoin === coin.id 
                          ? '1px solid rgba(0, 255, 255, 0.5)'
                          : '1px solid rgba(255, 255, 255, 0.1)',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'scale(1.01)',
                          border: '1px solid rgba(0, 255, 255, 0.3)',
                        },
                      }}
                    >
                      <CardContent sx={{ py: 2 }}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Box display="flex" alignItems="center">
                            <Avatar
                              src={coin.image}
                              sx={{ width: 40, height: 40, mr: 2 }}
                            />
                            <Box>
                              <Typography variant="h6" fontWeight="bold">
                                {coin.symbol.toUpperCase()}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {coin.name}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box textAlign="right">
                            <Typography variant="h6" fontWeight="bold">
                              {formatPrice(coin.current_price)}
                            </Typography>
                            {formatChange(coin.price_change_percentage_24h)}
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Stack>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              {/* 价格图表 */}
              <Typography variant="h6" gutterBottom>
                {selectedCoin.toUpperCase()} 价格走势 (7天)
              </Typography>
              
              {ohlcLoading ? (
                <Typography>加载图表中...</Typography>
              ) : (
                <Paper
                  sx={{
                    p: 3,
                    background: 'rgba(26, 31, 46, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1" color="text.secondary" textAlign="center">
                    📊 图表组件将在这里显示
                  </Typography>
                  <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
                    数据点: {ohlcData.length} | 时间范围: 7天
                  </Typography>
                  {/* 简单数据展示 */}
                  <Box mt={3}>
                    <Typography variant="subtitle2" gutterBottom>
                      最新数据:
                    </Typography>
                    {ohlcData.slice(-3).map((point, index) => (
                      <Typography key={index} variant="body2" color="text.secondary">
                        {point.time}: 开盘 ${point.open} | 收盘 ${point.close} | 最高 ${point.high} | 最低 ${point.low}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              )}
            </TabPanel>
          </Paper>
        </Box>

        {/* 交易面板 */}
        <Box flex={{ xs: 1, md: 1 }}>
          <Paper
            sx={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              交易面板
            </Typography>
            
            <Stack spacing={2}>
              {/* 买入/卖出切换 */}
              <Box display="flex" gap={1}>
                <Button
                  variant={orderType === 'buy' ? 'contained' : 'outlined'}
                  fullWidth
                  startIcon={<CallMade />}
                  onClick={() => setOrderType('buy')}
                  sx={{
                    background: orderType === 'buy' 
                      ? 'linear-gradient(45deg, #4caf50, #388e3c)'
                      : 'transparent',
                    borderColor: '#4caf50',
                    color: orderType === 'buy' ? 'white' : '#4caf50',
                    '&:hover': {
                      backgroundColor: orderType === 'buy' 
                        ? 'linear-gradient(45deg, #388e3c, #4caf50)'
                        : 'rgba(76, 175, 80, 0.1)',
                    },
                  }}
                >
                  买入
                </Button>
                
                <Button
                  variant={orderType === 'sell' ? 'contained' : 'outlined'}
                  fullWidth
                  startIcon={<CallReceived />}
                  onClick={() => setOrderType('sell')}
                  sx={{
                    background: orderType === 'sell' 
                      ? 'linear-gradient(45deg, #f44336, #d32f2f)'
                      : 'transparent',
                    borderColor: '#f44336',
                    color: orderType === 'sell' ? 'white' : '#f44336',
                    '&:hover': {
                      backgroundColor: orderType === 'sell' 
                        ? 'linear-gradient(45deg, #d32f2f, #f44336)'
                        : 'rgba(244, 67, 54, 0.1)',
                    },
                  }}
                >
                  卖出
                </Button>
              </Box>

              <Divider />

              {/* 当前选择的币种 */}
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  交易对象
                </Typography>
                <Typography variant="h6" color="#00ffff">
                  {selectedCoin.toUpperCase()}/USD
                </Typography>
              </Box>

              {/* 交易表单 */}
              <TextField
                label="数量"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                fullWidth
                InputProps={{
                  endAdornment: selectedCoin.toUpperCase(),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#00ffff',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00ffff',
                  },
                }}
              />

              <TextField
                label="价格"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                fullWidth
                InputProps={{
                  startAdornment: '$',
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#00ffff',
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: '#00ffff',
                  },
                }}
              />

              {/* 交易总额 */}
              {amount && price && (
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    预计总额
                  </Typography>
                  <Typography variant="h6">
                    {formatPrice(parseFloat(amount) * parseFloat(price))}
                  </Typography>
                </Box>
              )}

              {/* 提交按钮 */}
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleTradeSubmit}
                disabled={!amount || !price}
                sx={{
                  py: 1.5,
                  background: orderType === 'buy' 
                    ? 'linear-gradient(45deg, #4caf50, #388e3c)'
                    : 'linear-gradient(45deg, #f44336, #d32f2f)',
                  '&:hover': {
                    background: orderType === 'buy' 
                      ? 'linear-gradient(45deg, #388e3c, #4caf50)'
                      : 'linear-gradient(45deg, #d32f2f, #f44336)',
                  },
                  '&:disabled': {
                    background: 'rgba(128, 128, 128, 0.3)',
                  },
                }}
              >
                {orderType === 'buy' ? '确认买入' : '确认卖出'}
              </Button>

              <Typography variant="body2" color="text.secondary" textAlign="center">
                ⚠️ 这是模拟交易，不会产生实际资金损失
              </Typography>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default function TradePage() {
  return (
    <ProtectedRoute>
      <TradingContent />
    </ProtectedRoute>
  );
} 