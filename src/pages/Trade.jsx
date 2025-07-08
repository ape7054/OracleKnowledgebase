import { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, TextField, MenuItem, Button, Slider, Paper, Divider, Chip } from '@mui/material';
import { styled, useTheme, alpha } from '@mui/system';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '24px',
    borderRadius: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',

    ...(theme.palette.mode === 'dark'
      ? {
          backgroundColor: 'rgba(22, 27, 34, 0.85)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.45)',
        }
      : {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[8],
        }),
  
    color: theme.palette.text.primary,

    '&:hover': {
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.55)',
        }),
    },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: theme.palette.text.primary,
    '&:before': {
      borderBottomColor: theme.palette.divider,
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: theme.palette.text.primary,
    },
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.text.secondary,
  },
  '& .MuiOutlinedInput-root:focus, & .MuiOutlinedInput-root:focus-within': {
    outline: 'none',
  },
  '& .MuiInputBase-root:focus, & .MuiInputBase-root:focus-within': {
    outline: 'none',
  },
}));

const StyledSelect = styled(TextField)(({ theme }) => ({
    color: theme.palette.text.primary,
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.divider,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.text.primary,
    },
    '& .MuiSvgIcon-root': {
        color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root:focus, & .MuiOutlinedInput-root:focus-within': {
        outline: 'none',
    },
    '& .MuiSelect-select:focus': {
        outline: 'none',
        background: 'transparent',
    },
}));

const StyledSlider = styled(Slider)(({ theme, tradeType }) => ({
  color: tradeType === 'sell' ? theme.palette.error.main : theme.palette.success.main,
  height: 6,
  '& .MuiSlider-thumb': {
    height: 18,
    width: 18,
    boxShadow: 'none',
    '&:hover, &.Mui-focusVisible': {
        boxShadow: `0 0 0 8px ${tradeType === 'sell' ? 'rgba(239, 83, 80, 0.16)' : 'rgba(46, 125, 50, 0.16)'}`,
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
    height: 6,
  },
  '& .MuiSlider-rail': {
    height: 6,
    backgroundColor: tradeType === 'sell' 
      ? theme.palette.mode === 'dark' ? 'rgba(255, 99, 71, 0.3)' : 'rgba(255, 99, 71, 0.2)'
      : theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)',
    opacity: 1,
  },
  '& .MuiSlider-mark': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
    height: 8,
    width: 1,
    marginTop: -1,
  },
}));

const OrderBookRow = ({ side, price, amount, total, maxTotal }) => {
    const theme = useTheme();
    const isAsk = side === 'asks';
    const percentage = (total / maxTotal) * 100;
    
    const rowStyle = {
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '4px',
        my: 0.3,
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        [isAsk ? 'right' : 'left']: 0,
        width: `${percentage}%`,
        backgroundColor: isAsk 
          ? 'rgba(239, 83, 80, 0.15)'
          : 'rgba(46, 125, 50, 0.15)',
        borderRadius: '4px',
    };

    return (
        <Box sx={rowStyle}>
            <Box sx={backgroundStyle} />
            <Grid container spacing={0} sx={{ p: 0.5, position: 'relative', zIndex: 2 }}>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box component="span" sx={{ display: 'inline-flex', mr: 0.5 }}>
                        {isAsk ? (
                            <TrendingDownIcon 
                                fontSize="small" 
                                sx={{ color: theme.palette.error.main }} 
                            />
                        ) : (
                            <TrendingUpIcon 
                                fontSize="small" 
                                sx={{ color: theme.palette.success.main }} 
                            />
                        )}
                    </Box>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            color: isAsk ? theme.palette.error.main : theme.palette.success.main,
                            fontWeight: 600,
                            fontFamily: 'monospace',
                        }}
                    >
                        {price}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            textAlign: 'right', 
                            fontFamily: 'monospace' 
                        }}
                    >
                        {amount}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            textAlign: 'right', 
                            fontFamily: 'monospace', 
                            color: theme.palette.text.secondary 
                        }}
                    >
                        {total}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

const OrderBook = ({ asks, bids }) => {
  const theme = useTheme();
  const maxAsksTotal = Math.max(...asks.map(a => parseFloat(a.total)), 0);
  const maxBidsTotal = Math.max(...bids.map(b => parseFloat(b.total)), 0);
  const maxTotal = Math.max(maxAsksTotal, maxBidsTotal);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 8px',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    mb: 1,
  };

  return (
    <GlassmorphicPaper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Order Book</Typography>
        <Chip 
          label="BTC/USDT" 
          size="small" 
          sx={{ 
            backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.primary.main, 0.2) : alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 600
          }} 
        />
      </Box>
      
      <Box sx={headerStyle}>
          <Typography variant="caption" sx={{ flex: 1 }}>Price (USDT)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Amount (BTC)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Total</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse', mb: 2 }}>
          {asks.slice(0, 7).reverse().map((ask, index) => (
              <OrderBookRow key={index} side="asks" {...ask} maxTotal={maxTotal} />
          ))}
      </Box>

      <Box sx={{ 
        textAlign: 'center', 
        py: 1.5, 
        backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.7),
        borderRadius: '8px',
        mb: 2,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}>
        <Typography variant="h5" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
            <Box component="span" sx={{ fontSize: '0.9rem', color: theme.palette.text.secondary }}>$</Box>
            63,500.50
        </Typography>
        <Typography variant="caption" sx={{ color: theme.palette.success.main, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
          <TrendingUpIcon fontSize="small" />
          +2.4%
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {bids.slice(0, 7).map((bid, index) => (
              <OrderBookRow key={index} side="bids" {...bid} maxTotal={maxTotal} />
          ))}
      </Box>
    </GlassmorphicPaper>
  );
};

const RecentTrades = ({ trades }) => {
  const theme = useTheme();
  const [filter, setFilter] = useState('All');

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const filteredTrades = trades.filter(trade => {
    if (filter === 'All') return true;
    if (filter === 'Buy') return trade.type === 'buy';
    if (filter === 'Sell') return trade.type === 'sell';
    return true;
  });

  const headerStyle = {
    padding: '10px 8px',
    borderBottom: `1px solid ${alpha(theme.palette.divider, 0.8)}`,
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    fontWeight: 'bold',
    mb: 1,
  };

  return (
    <GlassmorphicPaper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Recent Trades</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Chip 
            label="All" 
            size="small" 
            clickable
            onClick={() => handleFilterChange('All')}
            sx={{ 
              backgroundColor: filter === 'All' ? theme.palette.primary.main : (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.3) : alpha(theme.palette.background.paper, 0.7)),
              color: filter === 'All' ? '#fff' : theme.palette.text.secondary,
              fontWeight: 600,
              transition: 'all 0.3s',
            }} 
          />
          <Chip 
            label="Buy" 
            size="small" 
            clickable
            onClick={() => handleFilterChange('Buy')}
            sx={{ 
              backgroundColor: filter === 'Buy' ? theme.palette.success.main : (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.3) : alpha(theme.palette.background.paper, 0.7)),
              color: filter === 'Buy' ? '#fff' : theme.palette.text.secondary,
              fontWeight: 600,
              transition: 'all 0.3s',
            }} 
          />
          <Chip 
            label="Sell" 
            size="small" 
            clickable
            onClick={() => handleFilterChange('Sell')}
            sx={{ 
              backgroundColor: filter === 'Sell' ? theme.palette.error.main : (theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.3) : alpha(theme.palette.background.paper, 0.7)),
              color: filter === 'Sell' ? '#fff' : theme.palette.text.secondary,
              fontWeight: 600,
              transition: 'all 0.3s',
            }} 
          />
        </Box>
      </Box>
      
      <Grid container spacing={0} sx={headerStyle}>
        <Grid item xs={4}>
          <Typography variant="caption">Price (USDT)</Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          <Typography variant="caption">Amount</Typography>
        </Grid>
        <Grid item xs={4} sx={{ textAlign: 'right' }}>
          <Typography variant="caption">Time</Typography>
        </Grid>
      </Grid>

      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {filteredTrades.slice(0, 15).map((trade) => (
          <Box
            key={trade.id}
            sx={{ 
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '4px',
              my: 0.3,
              '&:hover': {
                backgroundColor: theme.palette.action.hover,
              },
            }}
          >
            <Grid container spacing={0} sx={{ p: 0.5 }}>
              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box component="span" sx={{ display: 'inline-flex', mr: 0.5 }}>
                  {trade.type === 'buy' ? (
                    <TrendingUpIcon 
                      fontSize="small" 
                      sx={{ color: theme.palette.success.main }} 
                    />
                  ) : (
                    <TrendingDownIcon 
                      fontSize="small" 
                      sx={{ color: theme.palette.error.main }} 
                    />
                  )}
                </Box>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: trade.type === 'buy' ? theme.palette.success.main : theme.palette.error.main,
                    fontWeight: 600,
                    fontFamily: 'monospace',
                  }}
                >
                  {trade.price}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'right', 
                    fontFamily: 'monospace' 
                  }}
                >
                  {trade.amount}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography 
                  variant="body2" 
                  sx={{ 
                    textAlign: 'right', 
                    color: theme.palette.text.secondary 
                  }}
                >
                  {trade.time}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ))}
      </Box>
    </GlassmorphicPaper>
  );
};

function Trade() {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [trades, setTrades] = useState([]);
    const [tradeType, setTradeType] = useState('buy');
    const [priceType, setPriceType] = useState('market');
    
    const [price, setPrice] = useState('');
    const [amount, setAmount] = useState('');
    
    const [sliderValue, setSliderValue] = useState(50);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(20);
    const [totalRecords, setTotalRecords] = useState(0);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();

    const fetchTrades = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/trades?page=${page}&limit=${limit}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            setTrades(data.data || []);
            setTotalRecords(data.total_records || 0);
            if(isLoading) setIsLoading(false);
        } catch (err) {
            console.error('Error fetching trades:', err);
            setError(err.message);
            if(isLoading) setIsLoading(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const mockOrderBook = () => {
             const newAsks = Array.from({ length: 7 }, () => ({ price: (63500 + Math.random() * 100).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 100000).toFixed(2) }));
             const newBids = Array.from({ length: 7 }, () => ({ price: (63400 - Math.random() * 100).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 100000).toFixed(2) }));
             setAsks(newAsks);
             setBids(newBids);
        };

        fetchTrades();
        mockOrderBook();

        // --- WebSocket 连接 ---
        const socket = new WebSocket('ws://localhost:8080/ws/trades');

        socket.onopen = () => {
            console.log('WebSocket 连接已建立');
        };

        socket.onmessage = (event) => {
            try {
                const newTrade = JSON.parse(event.data);
                // 将新交易添加到列表的开头
                setTrades(prevTrades => [newTrade, ...prevTrades]);
            } catch (error) {
                console.error('无法解析收到的交易数据:', error);
            }
        };

        socket.onclose = () => {
            console.log('WebSocket 连接已关闭');
        };

        socket.onerror = (error) => {
            console.error('WebSocket 错误:', error);
        };
        
        // 订单簿仍然使用轮询
        const orderBookInterval = setInterval(mockOrderBook, 2000);
        
        // --- 清理 ---
        return () => {
            socket.close(); // 组件卸载时关闭 WebSocket 连接
            clearInterval(orderBookInterval);
        };
    }, []);

    const handleCreateTrade = async () => {
        if (!price || !amount) {
            alert('Price and Amount cannot be empty.');
            return;
        }

        const newTrade = {
            price: price,
            amount: amount,
            type: tradeType,
        };

        try {
            const response = await fetch('http://localhost:8080/api/trades', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTrade),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to create trade.');
            }

            setPrice('');
            setAmount('');
            // 成功创建交易后，我们不再需要手动刷新列表。
            // 后端会通过 WebSocket 自动将新交易广播回来。
            // fetchTrades(); 

        } catch (error) {
            console.error('Error creating trade:', error);
            alert('Error creating trade: ' + error.message);
        }
    };

    const handleTradeTypeChange = (type) => {
        setTradeType(type);
    };

    const handlePriceTypeChange = (event) => {
        setPriceType(event.target.value);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

  return (
      <Box sx={{ width: '100%', maxWidth: '100%', minHeight: '80vh' }}>
        <style jsx global>{`
          button:focus, [role="button"]:focus, .MuiButtonBase-root:focus, .MuiButtonBase-root.MuiButton-root:focus {
            outline: none !important;
            box-shadow: none !important;
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
        `}</style>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 3,
          position: { md: 'relative' },
          zIndex: { md: 1100 },
          pr: { md: '60px' }
        }}>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Trade
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip 
              label="BTC/USDT" 
              sx={{ 
                backgroundColor: theme.palette.primary.main, 
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2.5
              }} 
            />
            <Chip 
              icon={<TrendingUpIcon />} 
              label="+2.4%" 
              sx={{ 
                backgroundColor: alpha(theme.palette.success.main, 0.15), 
                color: theme.palette.success.main,
                fontWeight: 'bold',
                py: 2.5
              }} 
            />
          </Box>
        </Box>
        
        <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
            <Grid item xs={12} md={5} lg={4}>
                <GlassmorphicPaper>
                    <Box sx={{ 
                      display: 'flex', 
                      borderBottom: 1, 
                      borderColor: 'divider', 
                      mb: 3,
                      borderRadius: '8px',
                      overflow: 'hidden'
                    }}>
                    <Button 
                      sx={{ 
                        flex: 1, py: 2, borderRadius: 0, transition: 'all 0.3s',
                        backgroundColor: tradeType === 'buy' ? 'success.main' : 'transparent',
                        color: tradeType === 'buy' ? 'white' : 'text.secondary',
                        fontWeight: 'bold', fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: tradeType === 'buy' ? 'success.dark' : (theme.palette.mode === 'dark' ? alpha(theme.palette.success.main, 0.2) : alpha(theme.palette.success.main, 0.08)),
                        }
                      }}
                      onClick={() => handleTradeTypeChange('buy')}
                    >
                      BUY
                    </Button>
                    <Button 
                      sx={{ 
                        flex: 1, py: 2, borderRadius: 0, transition: 'all 0.3s',
                        backgroundColor: tradeType === 'sell' ? 'error.main' : 'transparent',
                        color: tradeType === 'sell' ? 'white' : 'text.secondary',
                        fontWeight: 'bold', fontSize: '1rem',
                        '&:hover': {
                          backgroundColor: tradeType === 'sell' ? 'error.dark' : (theme.palette.mode === 'dark' ? alpha(theme.palette.error.main, 0.2) : alpha(theme.palette.error.main, 0.08)),
                        }
                      }}
                      onClick={() => handleTradeTypeChange('sell')}
                    >
                      SELL
                    </Button>
                    </Box>

                    <Box sx={{ px: 3, py: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <StyledTextField
                          label="Price"
                          variant="standard"
                          select
                          value={priceType}
                          onChange={handlePriceTypeChange}
                          fullWidth
                        >
                            <MenuItem value="market">Market (Not implemented)</MenuItem>
                            <MenuItem value="limit">Limit</MenuItem>
                        </StyledTextField>
                        
                        <StyledTextField
                           label={"Limit Price"}
                           variant="standard"
                           type="number"
                           placeholder="0.00"
                           value={price}
                           onChange={(e) => setPrice(e.target.value)}
                           InputLabelProps={{ shrink: true }}
                           fullWidth
                           InputProps={{
                             endAdornment: <Typography variant="body2" color="text.secondary">USDT</Typography>
                           }}
                        />

                         <StyledTextField 
                           label="Amount" 
                           variant="standard" 
                           type="number"
                           placeholder="0.00"
                           value={amount}
                           onChange={(e) => setAmount(e.target.value)}
                           fullWidth
                           InputProps={{
                             endAdornment: <Typography variant="body2" color="text.secondary">BTC</Typography>
                           }}
                         />
                         
                         <Box sx={{ px: 1, pt: 2 }}>
                           <StyledSlider 
                             value={sliderValue} 
                             onChange={handleSliderChange} 
                             aria-labelledby="input-slider" 
                             marks={[{value: 0, label: '0%'}, {value: 25, label: '25%'}, {value: 50, label: '50%'}, {value: 75, label: '75%'}, {value: 100, label: '100%'}]}
                             tradeType={tradeType}
                           />
                         </Box>
                         
                         <Box sx={{ 
                           backgroundColor: theme.palette.mode === 'dark' ? alpha(theme.palette.background.paper, 0.4) : alpha(theme.palette.background.paper, 0.7),
                           p: 2, borderRadius: '8px', border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, mt: 1
                         }}>
                           <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Total:</Typography>
                           <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'monospace' }}>
                             { (price && amount) ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : '0.00' } USDT
                           </Typography>
                         </Box>
                         
                         <Button
                           variant="contained"
                           color={tradeType === 'sell' ? 'error' : 'success'}
                           size="large"
                           onClick={handleCreateTrade}
                           sx={{ 
                             mt: 2, py: 1.5, fontWeight: 'bold', fontSize: '1rem',
                             boxShadow: tradeType === 'sell' ? '0 8px 16px rgba(239, 83, 80, 0.24)' : '0 8px 16px rgba(46, 125, 50, 0.24)'
                           }}
                         >
                           {tradeType === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                         </Button>
                    </Box>
                </GlassmorphicPaper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <OrderBook asks={asks} bids={bids} />
            </Grid>
            <Grid item xs={12} md={3} lg={4}>
                {error ? (
                    <GlassmorphicPaper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="error" align="center">
                            无法加载交易数据: {error}
                        </Typography>
                    </GlassmorphicPaper>
                ) : isLoading ? (
                    <GlassmorphicPaper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography>加载交易数据中...</Typography>
                    </GlassmorphicPaper>
                ) : (
                    <RecentTrades trades={trades} />
                )}
            </Grid>
        </Grid>
      </Box>
  );
}

export default Trade;