import { useState, useEffect, useCallback, useRef } from 'react';
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

    // 使用ref来直接操作DOM，避免React重新渲染导致的跳跃
    const backgroundRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (backgroundRef.current) {
            if (!isInitialized) {
                // 首次渲染，直接设置宽度，不需要动画
                backgroundRef.current.style.width = `${percentage}%`;
                backgroundRef.current.style.transition = 'width 2s ease-out';
                setIsInitialized(true);
            } else {
                // 后续更新，使用平滑动画
                backgroundRef.current.style.width = `${percentage}%`;
            }
        }
    }, [percentage, isInitialized]);
    
    const rowStyle = {
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '6px',
        my: 0.2,
        transition: 'background-color 0.3s ease',
        '&:hover': {
            backgroundColor: alpha(theme.palette.action.hover, 0.4),
        },
    };

    const backgroundStyle = {
        position: 'absolute',
        top: 0,
        bottom: 0,
        [isAsk ? 'right' : 'left']: 0,
        width: '0%', // 初始宽度，会通过ref动态设置
        backgroundColor: isAsk
          ? alpha(theme.palette.error.main, 0.12)
          : alpha(theme.palette.success.main, 0.12),
        borderRadius: '6px',
        transition: 'width 2s ease-out, background-color 0.3s ease',
    };

    return (
        <Box sx={rowStyle}>
            <Box ref={backgroundRef} sx={backgroundStyle} />
            <Grid container spacing={0} sx={{ p: 0.8, position: 'relative', zIndex: 2 }}>
                <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                        component="span"
                        sx={{
                            display: 'inline-flex',
                            mr: 0.8,
                            p: 0.3,
                            borderRadius: '4px',
                            backgroundColor: alpha(
                                isAsk ? theme.palette.error.main : theme.palette.success.main,
                                0.1
                            ),
                            transition: 'background-color 0.2s ease',
                        }}
                    >
                        {isAsk ? (
                            <TrendingDownIcon
                                fontSize="small"
                                sx={{
                                    color: theme.palette.error.main,
                                    fontSize: '0.9rem'
                                }}
                            />
                        ) : (
                            <TrendingUpIcon
                                fontSize="small"
                                sx={{
                                    color: theme.palette.success.main,
                                    fontSize: '0.9rem'
                                }}
                            />
                        )}
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{
                            color: isAsk ? theme.palette.error.main : theme.palette.success.main,
                            fontWeight: 600,
                            fontFamily: 'monospace',
                            fontSize: '0.875rem',
                            transition: 'color 0.3s ease',
                        }}
                    >
                        {parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'right',
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            color: theme.palette.text.primary,
                        }}
                    >
                        {parseFloat(amount).toFixed(4)}
                    </Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: 'right',
                            fontFamily: 'monospace',
                            color: theme.palette.text.secondary,
                            fontWeight: 500,
                            fontSize: '0.8rem',
                        }}
                    >
                        {parseFloat(total).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 4,
              height: 24,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Order Book
          </Typography>
        </Box>
        <Chip
          label="BTC/USDT"
          size="small"
          sx={{
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            color: '#fff',
            fontWeight: 600,
            boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
          }}
        />
      </Box>
      
      <Box sx={headerStyle}>
          <Typography variant="caption" sx={{ flex: 1 }}>Price (USDT)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Amount (BTC)</Typography>
          <Typography variant="caption" sx={{ flex: 1, textAlign: 'right' }}>Total</Typography>
      </Box>
      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        mb: 2,
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.divider, 0.1),
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '2px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}>
          {asks.slice(0, 7).reverse().map((ask, index) => (
              <OrderBookRow
                key={`ask-${index}`}
                side="asks"
                {...ask}
                maxTotal={maxTotal}
              />
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

      <Box sx={{
        flexGrow: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '4px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.divider, 0.1),
          borderRadius: '2px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '2px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}>
          {bids.slice(0, 7).map((bid, index) => (
              <OrderBookRow
                key={`bid-${index}`}
                side="bids"
                {...bid}
                maxTotal={maxTotal}
              />
          ))}
      </Box>
    </GlassmorphicPaper>
  );
};

const RecentTrades = ({ trades, page, totalPages, handlePrevPage, handleNextPage }) => {
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
    padding: '16px 12px 12px 12px',
    borderBottom: `2px solid ${alpha(theme.palette.divider, 0.12)}`,
    color: theme.palette.text.secondary,
    fontSize: '0.7rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.8px',
    background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.default, 0.4)})`,
    backdropFilter: 'blur(10px)',
    mb: 1,
  };

  return (
    <GlassmorphicPaper sx={{ p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 4,
              height: 24,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: '2px',
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
            }}
          >
            Recent Trades
          </Typography>
        </Box>
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
        <Grid item xs={3.5} sm={3.5} md={3.5}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            Price (USDT)
          </Typography>
        </Grid>
        <Grid item xs={2.5} sm={2.5} md={2.5} sx={{ textAlign: 'right' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            Amount
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            Trader
          </Typography>
        </Grid>
        <Grid item xs={3} sm={3} md={3} sx={{ textAlign: 'right' }}>
          <Typography variant="caption" sx={{ fontWeight: 700, letterSpacing: '0.5px' }}>
            Time
          </Typography>
        </Grid>
      </Grid>

      <Box sx={{
        overflowY: 'auto',
        flexGrow: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: alpha(theme.palette.divider, 0.1),
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: alpha(theme.palette.primary.main, 0.3),
          borderRadius: '3px',
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.5),
          },
        },
      }}>
        {filteredTrades.length === 0 ? (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
            opacity: 0.7,
          }}>
            <Typography variant="h6" sx={{
              color: theme.palette.text.secondary,
              mb: 1,
              fontWeight: 600,
            }}>
              No trades found
            </Typography>
            <Typography variant="body2" sx={{
              color: alpha(theme.palette.text.secondary, 0.7),
              textAlign: 'center',
            }}>
              Trade history will appear here once transactions are made
            </Typography>
          </Box>
        ) : (
          filteredTrades.map((trade, index) => (
          <Box
            key={trade.id}
            sx={{
              position: 'relative',
              cursor: 'pointer',
              borderRadius: '8px',
              my: 0.5,
              mx: 0.5,
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
              background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.6)}, ${alpha(theme.palette.background.default, 0.3)})`,
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor: alpha(theme.palette.action.hover, 0.8),
                transform: 'translateY(-1px)',
                boxShadow: `0 4px 20px ${alpha(theme.palette.common.black, 0.1)}`,
                border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
              },
              '&:active': {
                transform: 'translateY(0px)',
              },
            }}
          >
            <Grid container spacing={0} sx={{ p: { xs: 1, sm: 1.5 } }}>
              <Grid item xs={3.5} sm={3.5} md={3.5} sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                  component="span"
                  sx={{
                    display: 'inline-flex',
                    mr: 1,
                    p: 0.5,
                    borderRadius: '50%',
                    backgroundColor: alpha(
                      trade.type === 'buy' ? theme.palette.success.main : theme.palette.error.main,
                      0.1
                    ),
                  }}
                >
                  {trade.type === 'buy' ? (
                    <TrendingUpIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.success.main,
                        fontSize: '1rem'
                      }}
                    />
                  ) : (
                    <TrendingDownIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.error.main,
                        fontSize: '1rem'
                      }}
                    />
                  )}
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: trade.type === 'buy' ? theme.palette.success.main : theme.palette.error.main,
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      fontSize: '0.875rem',
                      lineHeight: 1.2,
                    }}
                  >
                    ${parseFloat(trade.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: alpha(theme.palette.text.secondary, 0.7),
                      fontSize: '0.65rem',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                      letterSpacing: '0.5px'
                    }}
                  >
                    {trade.type}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={2.5} sm={2.5} md={2.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    color: theme.palette.text.primary,
                    lineHeight: 1.2,
                  }}
                >
                  {parseFloat(trade.amount).toFixed(4)}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                    fontSize: '0.65rem',
                    fontWeight: 500,
                  }}
                >
                  BTC
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3} md={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    textAlign: 'center',
                    px: 1,
                    py: 0.5,
                    borderRadius: '6px',
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                  }}
                >
                  {trade.user_name || 'Anonymous'}
                </Typography>
              </Grid>
              <Grid item xs={3} sm={3} md={3} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.2,
                  }}
                >
                  {trade.time}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: alpha(theme.palette.text.secondary, 0.7),
                    fontSize: '0.65rem',
                    fontWeight: 500,
                  }}
                >
                  Today
                </Typography>
              </Grid>
            </Grid>
          </Box>
          ))
        )}
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pt: 3,
        mt: 'auto',
        borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.4)}, ${alpha(theme.palette.background.default, 0.2)})`,
        backdropFilter: 'blur(8px)',
        borderRadius: '0 0 12px 12px',
        mx: -3,
        px: 3,
        py: 2,
      }}>
        <Button
          onClick={handlePrevPage}
          disabled={page <= 1}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            minWidth: '80px',
            '&:disabled': {
              opacity: 0.5,
            }
          }}
        >
          Previous
        </Button>
        <Box sx={{
          mx: 3,
          px: 2,
          py: 1,
          borderRadius: '8px',
          background: alpha(theme.palette.primary.main, 0.1),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        }}>
          <Typography variant="body2" sx={{
            fontFamily: 'monospace',
            fontWeight: 600,
            color: theme.palette.primary.main,
          }}>
            Page {page} of {totalPages}
          </Typography>
        </Box>
        <Button
          onClick={handleNextPage}
          disabled={page >= totalPages}
          variant="outlined"
          size="small"
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 600,
            minWidth: '80px',
            '&:disabled': {
              opacity: 0.5,
            }
          }}
        >
          Next
        </Button>
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
        fetchTrades();
    }, [page, limit]);

    useEffect(() => {
        let basePrice = 63500;
        let previousAsks = [];
        let previousBids = [];

        const mockOrderBook = () => {
             // 更平滑的价格变化，使用更小的波动范围
             const priceVariation = (Math.random() - 0.5) * 8; // ±4的变化，更小的波动
             basePrice = Math.max(63200, Math.min(63800, basePrice + priceVariation));

             // 生成新的订单数据，但保持一定的连续性
             const newAsks = Array.from({ length: 7 }, (_, i) => {
                 const baseAskPrice = basePrice + (i + 1) * (3 + Math.random() * 6);
                 const prevAsk = previousAsks[i];

                 // 如果有之前的数据，让价格变化更平滑
                 const smoothedPrice = prevAsk ?
                     (parseFloat(prevAsk.price) * 0.7 + baseAskPrice * 0.3) :
                     baseAskPrice;

                 return {
                     price: smoothedPrice.toFixed(2),
                     amount: (0.2 + Math.random() * 1.6).toFixed(4),
                     total: (15000 + Math.random() * 75000).toFixed(2)
                 };
             });

             const newBids = Array.from({ length: 7 }, (_, i) => {
                 const baseBidPrice = basePrice - (i + 1) * (3 + Math.random() * 6);
                 const prevBid = previousBids[i];

                 // 如果有之前的数据，让价格变化更平滑
                 const smoothedPrice = prevBid ?
                     (parseFloat(prevBid.price) * 0.7 + baseBidPrice * 0.3) :
                     baseBidPrice;

                 return {
                     price: smoothedPrice.toFixed(2),
                     amount: (0.2 + Math.random() * 1.6).toFixed(4),
                     total: (15000 + Math.random() * 75000).toFixed(2)
                 };
             });

             // 保存当前数据作为下次的参考
             previousAsks = newAsks;
             previousBids = newBids;

             setAsks(newAsks);
             setBids(newBids);
        };

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
        
        // 订单簿使用更平滑的轮询间隔，让动画有足够时间完成
        const orderBookInterval = setInterval(mockOrderBook, 4000);
        
        // --- 清理 ---
        return () => {
            socket.close(); // 组件卸载时关闭 WebSocket 连接
            clearInterval(orderBookInterval);
        };
    }, []);

    const totalPages = Math.ceil(totalRecords / limit);

    const handleNextPage = () => {
      if (page < totalPages) {
        setPage(prevPage => prevPage + 1);
      }
    };

    const handlePrevPage = () => {
      if (page > 1) {
        setPage(prevPage => prevPage - 1);
      }
    };

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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box
              sx={{
                width: 6,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '3px',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Trade
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Chip
              label="BTC/USDT"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                fontWeight: 'bold',
                fontSize: '1rem',
                py: 2.5,
                boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
              }}
            />
            <Chip
              icon={<TrendingUpIcon />}
              label="+2.4%"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                color: '#fff',
                fontWeight: 'bold',
                py: 2.5,
                boxShadow: `0 4px 12px ${alpha(theme.palette.success.main, 0.3)}`,
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
                        background: tradeType === 'buy'
                          ? `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`
                          : 'transparent',
                        color: tradeType === 'buy' ? 'white' : 'text.secondary',
                        fontWeight: 'bold', fontSize: '1rem',
                        boxShadow: tradeType === 'buy' ? `0 4px 12px ${alpha(theme.palette.success.main, 0.3)}` : 'none',
                        '&:hover': {
                          background: tradeType === 'buy'
                            ? `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`
                            : `linear-gradient(135deg, ${alpha(theme.palette.success.main, 0.1)}, ${alpha(theme.palette.success.main, 0.05)})`,
                          boxShadow: `0 6px 16px ${alpha(theme.palette.success.main, 0.4)}`,
                        }
                      }}
                      onClick={() => handleTradeTypeChange('buy')}
                    >
                      BUY
                    </Button>
                    <Button
                      sx={{
                        flex: 1, py: 2, borderRadius: 0, transition: 'all 0.3s',
                        background: tradeType === 'sell'
                          ? `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`
                          : 'transparent',
                        color: tradeType === 'sell' ? 'white' : 'text.secondary',
                        fontWeight: 'bold', fontSize: '1rem',
                        boxShadow: tradeType === 'sell' ? `0 4px 12px ${alpha(theme.palette.error.main, 0.3)}` : 'none',
                        '&:hover': {
                          background: tradeType === 'sell'
                            ? `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`
                            : `linear-gradient(135deg, ${alpha(theme.palette.error.main, 0.1)}, ${alpha(theme.palette.error.main, 0.05)})`,
                          boxShadow: `0 6px 16px ${alpha(theme.palette.error.main, 0.4)}`,
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
                            <MenuItem value="market">Market Price</MenuItem>
                            <MenuItem value="limit">Limit Price</MenuItem>
                        </StyledTextField>
                        
                        <StyledTextField
                           label={"Price"}
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
                           size="large"
                           onClick={handleCreateTrade}
                           sx={{
                             mt: 2, py: 1.5, fontWeight: 'bold', fontSize: '1rem',
                             background: tradeType === 'sell'
                               ? `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`
                               : `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
                             boxShadow: tradeType === 'sell'
                               ? `0 8px 20px ${alpha(theme.palette.error.main, 0.4)}`
                               : `0 8px 20px ${alpha(theme.palette.success.main, 0.4)}`,
                             '&:hover': {
                               background: tradeType === 'sell'
                                 ? `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`
                                 : `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
                               boxShadow: tradeType === 'sell'
                                 ? `0 12px 24px ${alpha(theme.palette.error.main, 0.5)}`
                                 : `0 12px 24px ${alpha(theme.palette.success.main, 0.5)}`,
                               transform: 'translateY(-2px)',
                             }
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
                    <RecentTrades 
                      trades={trades}
                      page={page}
                      totalPages={totalPages}
                      handlePrevPage={handlePrevPage}
                      handleNextPage={handleNextPage}
                    />
                )}
            </Grid>
        </Grid>
      </Box>
  );
}

export default Trade;