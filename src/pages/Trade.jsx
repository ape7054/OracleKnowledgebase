import { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Select, MenuItem, Button, Slider, Paper } from '@mui/material';
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
    boxShadow: 'none',
    '&:hover, &.Mui-focusVisible': {
        boxShadow: `0 0 0 8px ${tradeType === 'sell' ? 'rgba(239, 83, 80, 0.16)' : 'rgba(46, 125, 50, 0.16)'}`,
    },
  },
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-rail': {
    backgroundColor: tradeType === 'sell' 
      ? theme.palette.mode === 'dark' ? 'rgba(255, 99, 71, 0.3)' : 'rgba(255, 99, 71, 0.2)'
      : theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.3)' : 'rgba(76, 175, 80, 0.2)',
  }
}));

const OrderBookRow = ({ side, price, amount, total, maxTotal }) => {
    const theme = useTheme();
    const isAsk = side === 'asks';
    const percentage = (total / maxTotal) * 100;
    
    const rowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '2px 8px',
        fontSize: '0.8rem',
        position: 'relative',
        cursor: 'pointer',
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
        backgroundColor: isAsk ? 'rgba(239, 83, 80, 0.15)' : 'rgba(46, 125, 50, 0.15)',
        zIndex: 1,
        transition: 'width 0.3s ease-in-out',
    };

    return (
        <Box sx={rowStyle}>
            <Box sx={backgroundStyle} />
            <Typography variant="body2" sx={{ flex: 1, color: isAsk ? theme.palette.error.main : theme.palette.success.main, zIndex: 2 }}>
                {price}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', zIndex: 2 }}>
                {amount}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', zIndex: 2 }}>
                {total}
            </Typography>
        </Box>
    );
};

const OrderBook = ({ asks, bids }) => {
  const theme = useTheme();
  const maxAsksTotal = Math.max(...asks.map(a => a.total), 0);
  const maxBidsTotal = Math.max(...bids.map(b => b.total), 0);
  const maxTotal = Math.max(maxAsksTotal, maxBidsTotal);

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    fontWeight: 'bold',
  };

  return (
    <GlassmorphicPaper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Order Book</Typography>
      
      <Box sx={headerStyle}>
          <Typography variant="caption" sx={{ flex: 1 }}>Price (USDT)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Amount (BTC)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Total</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column-reverse' }}>
          {asks.slice(0, 7).reverse().map((ask, index) => (
              <OrderBookRow key={index} side="asks" {...ask} maxTotal={maxTotal} />
          ))}
      </Box>

      <Typography variant="h5" align="center" sx={{ my: 2, color: theme.palette.primary.main, fontWeight: 'bold' }}>
          63500.50
      </Typography>

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

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '2px 8px',
    fontSize: '0.8rem',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    fontSize: '0.75rem',
    fontWeight: 'bold',
  };

  return (
    <GlassmorphicPaper sx={{ p: 2, height: '100%' }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>Recent Trades</Typography>
      <Box sx={headerStyle}>
          <Typography variant="caption" sx={{ flex: 1 }}>Price (USDT)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Amount</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Time</Typography>
      </Box>
      <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
        {trades.slice(0, 15).map((trade, index) => (
          <Box key={index} sx={rowStyle}>
            <Typography variant="body2" sx={{ flex: 1, color: trade.type === 'buy' ? theme.palette.success.main : theme.palette.error.main }}>
              {trade.price}
            </Typography>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'right' }}>{trade.amount}</Typography>
            <Typography variant="body2" sx={{ flex: 1, textAlign: 'right', color: theme.palette.text.secondary }}>{trade.time}</Typography>
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
        <Grid container spacing={3} sx={{ width: '100%', m: 0 }}>
            <Grid item xs={12} md={5} lg={4}>
                <GlassmorphicPaper>
                    <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Button 
                      sx={{ 
                        flex: 1,
                        py: 1.5,
                        borderRadius: 0,
                        backgroundColor: tradeType === 'buy' ? 'success.main' : 'transparent',
                        color: tradeType === 'buy' ? 'white' : 'text.secondary',
                      }}
                      onClick={() => handleTradeTypeChange('buy')}
                    >
                      BUY
                    </Button>
                    <Button 
                      sx={{ 
                        flex: 1,
                        py: 1.5,
                        borderRadius: 0,
                        backgroundColor: tradeType === 'sell' ? 'error.main' : 'transparent',
                        color: tradeType === 'sell' ? 'white' : 'text.secondary',
                      }}
                      onClick={() => handleTradeTypeChange('sell')}
                    >
                      SELL
                    </Button>
                    </Box>

                    <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <StyledTextField label="Price" variant="standard" defaultValue="Market" />
                        <StyledTextField label="Amount" variant="standard" />
                        <StyledSlider 
                          value={sliderValue} 
                          onChange={handleSliderChange} 
                          aria-labelledby="input-slider" 
                          marks={[{value: 0}, {value: 25}, {value: 50}, {value: 75}, {value: 100}]}
                          tradeType={tradeType}
                        />
                        <Typography variant="body2" align="center">Total: 1,200 USDT</Typography>
                        <Button
                          variant="contained"
                          color={tradeType === 'sell' ? 'error' : 'success'}
                          size="large"
                          sx={{ mt: 2 }}
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
                <RecentTrades trades={trades} />
            </Grid>
        </Grid>
      </Box>
  );
}

export default Trade; 