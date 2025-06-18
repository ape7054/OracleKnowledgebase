import { useState, useEffect } from 'react';
import { Box, Grid, Typography, TextField, Select, MenuItem, Button, Slider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { styled } from '@mui/system';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
    padding: '20px',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    borderRadius: '15px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    height: '100%',
}));

const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    color: 'white',
    '&:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.7)',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottomColor: 'white',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255, 255, 255, 0.7)',
  },
});

const StyledSelect = styled(Select)({
    color: 'white',
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255, 255, 255, 0.7)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiSvgIcon-root': {
        color: 'white',
    },
});

const OrderBook = ({ asks, bids }) => (
  <GlassmorphicPaper>
    <Typography variant="h6" gutterBottom>Order Book</Typography>
    <TableContainer sx={{ maxHeight: 250 }}>
      <Table stickyHeader size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: '#f44336', border: 0 }}>Price (USDT)</TableCell>
            <TableCell sx={{ color: 'white', border: 0 }}>Amount (BTC)</TableCell>
            <TableCell sx={{ color: 'white', border: 0 }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {asks.map((ask, index) => (
            <TableRow key={index} sx={{ '& td': { border: 0 }}}>
              <TableCell sx={{ color: '#f44336' }}>{ask.price}</TableCell>
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
            <TableCell sx={{ color: '#4caf50', border: 0 }}>Price (USDT)</TableCell>
            <TableCell sx={{ color: 'white', border: 0 }}>Amount (BTC)</TableCell>
            <TableCell sx={{ color: 'white', border: 0 }}>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bids.map((bid, index) => (
            <TableRow key={index} sx={{ '& td': { border: 0 }}}>
              <TableCell sx={{ color: '#4caf50' }}>{bid.price}</TableCell>
              <TableCell>{bid.amount}</TableCell>
              <TableCell>{bid.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </GlassmorphicPaper>
);

const RecentTrades = ({ trades }) => (
    <GlassmorphicPaper>
        <Typography variant="h6" gutterBottom>Recent Trades</Typography>
        <TableContainer sx={{ maxHeight: 'calc(100% - 48px)' }}>
            <Table stickyHeader size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: 'white', border: 0 }}>Price (USDT)</TableCell>
                        <TableCell sx={{ color: 'white', border: 0 }}>Amount</TableCell>
                        <TableCell sx={{ color: 'white', border: 0 }}>Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {trades.map((trade, index) => (
                        <TableRow key={index} sx={{ '& td': { border: 0 }}}>
                            <TableCell sx={{ color: trade.type === 'buy' ? '#4caf50' : '#f44336' }}>{trade.price}</TableCell>
                            <TableCell>{trade.amount}</TableCell>
                            <TableCell>{trade.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </GlassmorphicPaper>
);

function Trade() {
    const [asks, setAsks] = useState([]);
    const [bids, setBids] = useState([]);
    const [trades, setTrades] = useState([]);

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

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
            <OrderBook asks={asks} bids={bids} />
        </Grid>
        <Grid item xs={12} md={6}>
            <GlassmorphicPaper>
                <Box sx={{ display: 'flex', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Button sx={{ color: 'white', flex: 1, borderBottom: '2px solid #4caf50', borderRadius: 0 }}>Buy</Button>
                    <Button sx={{ color: 'rgba(255,255,255,0.7)', flex: 1 }}>Sell</Button>
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
                        <Typography gutterBottom sx={{ color: 'rgba(255,255,255,0.7)' }}>Use available balance</Typography>
                        <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField fullWidth label="Total" variant="standard" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button fullWidth variant="contained" color="success" sx={{ py: 1.5 }}>Buy BTC</Button>
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