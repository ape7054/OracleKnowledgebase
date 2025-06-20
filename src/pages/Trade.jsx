import { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Select, MenuItem, Button, Slider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled, useTheme } from '@mui/system';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '24px',
    borderRadius: '16px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',

    ...(theme.palette.mode === 'dark'
      ? {
          backgroundColor: 'rgba(22, 27, 34, 0.7)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        }
      : {
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
          boxShadow: theme.shadows[5],
        }),
  
    color: theme.palette.text.primary,

    '&:hover': {
        ...(theme.palette.mode === 'dark' && {
            backgroundColor: 'rgba(22, 27, 34, 0.9)',
            boxShadow: '0 0 40px 0 rgba(0, 0, 0, 0.5)',
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
}));

const StyledSelect = styled(Select)(({ theme }) => ({
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
}));

const StyledSlider = styled(Slider)(({ theme, tradeType }) => ({
  color: tradeType === 'sell' ? theme.palette.error.main : theme.palette.success.main,
  '& .MuiSlider-thumb': {
    backgroundColor: tradeType === 'sell' ? theme.palette.error.main : theme.palette.success.main,
  },
  '& .MuiSlider-track': {
    backgroundColor: tradeType === 'sell' ? theme.palette.error.main : theme.palette.success.main,
  },
  '& .MuiSlider-rail': {
    backgroundColor: tradeType === 'sell' 
      ? theme.palette.mode === 'dark' ? 'rgba(255, 99, 71, 0.3)' : 'rgba(255, 99, 71, 0.2)'
      : theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)',
  }
}));

const OrderBook = ({ asks, bids }) => {
  const theme = useTheme();
  return (
  <GlassmorphicPaper>
    <Typography variant="h6" gutterBottom>Order Book</Typography>
    <TableContainer sx={{ maxHeight: 250 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
              <TableCell sx={{ color: theme.palette.error.main, border: 0 }}>Price (USDT)</TableCell>
              <TableCell sx={{ border: 0 }}>Amount (BTC)</TableCell>
              <TableCell sx={{ border: 0 }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks.map((ask, index) => (
            <TableRow key={index} sx={{ '& td': { border: 0 }}}>
                <TableCell sx={{ color: theme.palette.error.main }}>{ask.price}</TableCell>
              <TableCell>{ask.amount}</TableCell>
              <TableCell>{ask.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Typography variant="h6" align="center" sx={{ my: 2 }}>BTC 63500 USDT</Typography>
    <TableContainer sx={{ maxHeight: 250 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
              <TableCell sx={{ color: theme.palette.success.main, border: 0 }}>Price (USDT)</TableCell>
              <TableCell sx={{ border: 0 }}>Amount (BTC)</TableCell>
              <TableCell sx={{ border: 0 }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid, index) => (
            <TableRow key={index} sx={{ '& td': { border: 0 }}}>
                <TableCell sx={{ color: theme.palette.success.main }}>{bid.price}</TableCell>
              <TableCell>{bid.amount}</TableCell>
              <TableCell>{bid.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </GlassmorphicPaper>
);
};

const RecentTrades = ({ trades }) => {
  const theme = useTheme();
  return (
    <GlassmorphicPaper>
        <Typography variant="h6" gutterBottom>Recent Trades</Typography>
        <TableContainer sx={{ maxHeight: 'calc(100% - 48px)' }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
              <TableCell sx={{ border: 0 }}>Price (USDT)</TableCell>
              <TableCell sx={{ border: 0 }}>Amount</TableCell>
              <TableCell sx={{ border: 0 }}>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trades.map((trade, index) => (
                        <TableRow key={index} sx={{ '& td': { border: 0 }}}>
                <TableCell sx={{ color: trade.type === 'buy' ? theme.palette.success.main : theme.palette.error.main }}>{trade.price}</TableCell>
                            <TableCell>{trade.amount}</TableCell>
                            <TableCell>{trade.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </GlassmorphicPaper>
);
};

function Trade() {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [trades, setTrades] = useState([]);
    const [tradeType, setTradeType] = useState('buy');
    const [sliderValue, setSliderValue] = useState(50);
    const theme = useTheme();

    useEffect(() => {
        // Mock data fetching
        const interval = setInterval(() => {
            const newAsks = Array.from({ length: 5 }, () => ({ price: (63500 + Math.random() * 100).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 100000).toFixed(2) }));
            const newBids = Array.from({ length: 5 }, () => ({ price: (63400 - Math.random() * 100).toFixed(2), amount: (Math.random() * 2).toFixed(4), total: (Math.random() * 100000).toFixed(2) }));
            const newTrades = Array.from({ length: 10 }, () => ({ price: (63450 + (Math.random() - 0.5) * 50).toFixed(2), amount: (Math.random()).toFixed(4), time: new Date().toLocaleTimeString(), type: Math.random() > 0.5 ? 'buy' : 'sell' }));
            setAsks(newAsks);
            setBids(newBids);
            setTrades(newTrades);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    const handleTradeTypeChange = (type) => {
        setTradeType(type);
    };

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };

  return (
      <Box sx={{ width: '100%', maxWidth: '100%', minHeight: '80vh' }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
          Trade
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%', m: 0 }}>
        <Grid item xs={12} md={3}>
            <OrderBook asks={asks} bids={bids} />
        </Grid>
        <Grid item xs={12} md={6}>
            <GlassmorphicPaper>
                <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                <Button 
                  sx={{ 
                    flex: 1, 
                    borderBottom: tradeType === 'buy' ? `2px solid ${theme.palette.success.main}` : 'none',
                    borderRadius: 0,
                    color: tradeType === 'buy' ? theme.palette.success.main : theme.palette.text.secondary,
                    fontWeight: tradeType === 'buy' ? 'bold' : 'normal'
                  }}
                  onClick={() => handleTradeTypeChange('buy')}
                >
                  BUY
                </Button>
                <Button 
                  sx={{ 
                    flex: 1, 
                    borderBottom: tradeType === 'sell' ? `2px solid ${theme.palette.error.main}` : 'none',
                    borderRadius: 0,
                    color: tradeType === 'sell' ? theme.palette.error.main : theme.palette.text.secondary,
                    fontWeight: tradeType === 'sell' ? 'bold' : 'normal'
                  }}
                  onClick={() => handleTradeTypeChange('sell')}
                >
                  SELL
                </Button>
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <StyledSelect fullWidth defaultValue="BTC/USDT" variant="outlined">
                            <MenuItem value="BTC/USDT">BTC/USDT</MenuItem>
                        </StyledSelect>
                    </Grid>
                    <Grid item xs={6}>
                        <StyledSelect fullWidth defaultValue="limit" variant="outlined">
                            <MenuItem value="limit">Limit Order</MenuItem>
                        </StyledSelect>
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField fullWidth label="Price" defaultValue="63500" variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField fullWidth label="Amount" variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                    <Typography gutterBottom color="text.secondary">Use available balance</Typography>
                        <StyledSlider 
                          tradeType={tradeType}
                          value={sliderValue}
                          onChange={handleSliderChange}
                          aria-label="Balance" 
                          valueLabelDisplay="auto" 
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField fullWidth label="Total" variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                    <Button 
                      fullWidth 
                      variant="contained" 
                      color={tradeType === 'buy' ? "success" : "error"}
                      sx={{ py: 1.5 }}
                    >
                      {tradeType === 'buy' ? 'Buy BTC' : 'Sell BTC'}
                    </Button>
                    </Grid>
                </Grid>
            </GlassmorphicPaper>
        </Grid>
        <Grid item xs={12} md={3}>
           <RecentTrades trades={trades} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Trade; 