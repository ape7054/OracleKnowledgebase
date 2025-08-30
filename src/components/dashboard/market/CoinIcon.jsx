import { useState, useMemo, useRef, useCallback } from 'react';
import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/system';

// 图片图标组件
const CoinImageIcon = ({ imageUrl, symbol, fallbackIcon }) => {
  const [hasError, setHasError] = useState(false);
  const initialSrc = useMemo(() => {
    const url = imageUrl || '';
    if (typeof url === 'string' && (url.includes('assets.coingecko.com') || url.includes('coin-images.coingecko.com'))) {
      const noScheme = url.replace(/^https?:\/\//, '');
      return `https://images.weserv.nl/?url=${encodeURIComponent(noScheme)}`;
    }
    return url;
  }, [imageUrl]);
  const [src, setSrc] = useState(initialSrc);
  const triedAltHostRef = useRef(false);
  const triedProxyRef = useRef(false);
  
  if (hasError || !src) {
    return fallbackIcon;
  }
  
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt={symbol}
        referrerPolicy="no-referrer"
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
        onError={() => {
          if (!triedAltHostRef.current && typeof src === 'string' && src.includes('assets.coingecko.com')) {
            triedAltHostRef.current = true;
            const alt = src.replace('assets.coingecko.com', 'coin-images.coingecko.com');
            setSrc(alt);
            return;
          }
          if (!triedProxyRef.current && typeof src === 'string') {
            triedProxyRef.current = true;
            const noScheme = src.replace(/^https?:\/\//, '');
            const proxy = `https://images.weserv.nl/?url=${encodeURIComponent(noScheme)}`;
            setSrc(proxy);
            return;
          }
          setHasError(true);
        }}
      />
    </Box>
  );
};

// 统一的图标容器组件
const IconWrapper = ({ children }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        filter: 'grayscale(100%) contrast(0.8)',
        '& > *': {
          width: '28px !important',
          height: '28px !important',
          color: 'inherit !important',
          fill: 'currentColor !important'
        },
        '& svg': {
          color: 'inherit !important',
          fill: 'currentColor !important'
        }
      }}
    >
      {children}
    </Box>
  );
};

// 占位符图标组件
const PlaceholderIcon = ({ symbol }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: theme.palette.mode === 'dark' 
          ? alpha(theme.palette.background.paper, 0.8)
          : alpha('#fff', 0.95),
        border: `1px solid ${alpha(theme.palette.divider, 0.3)}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.text.secondary,
        fontSize: '12px',
        fontWeight: 'bold',
        fontFamily: 'monospace'
      }}
    >
      {symbol ? symbol.slice(0, 2).toUpperCase() : '?'}
    </Box>
  );
};

// 主要的CoinIcon组件
const CoinIcon = ({ symbol, imageUrl }) => {
  const theme = useTheme();
  
  // 图标映射：使用已有的React组件图标
  const iconMap = useMemo(() => ({
    BTC: <IconWrapper><Box sx={{fontSize: '12px', fontWeight: 800, color: 'inherit'}}>₿</Box></IconWrapper>,
    ETH: <IconWrapper><Box sx={{fontSize: '12px', fontWeight: 800, color: 'inherit'}}>Ξ</Box></IconWrapper>,
    BNB: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>BNB</Box></IconWrapper>,
    SOL: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>SOL</Box></IconWrapper>,
    XRP: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>XRP</Box></IconWrapper>,
    USDT: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>USDT</Box></IconWrapper>,
    USDC: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>USDC</Box></IconWrapper>,
    ADA: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>ADA</Box></IconWrapper>,
    DOGE: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>DOGE</Box></IconWrapper>,
    TRX: <IconWrapper><Box sx={{fontSize: '10px', fontWeight: 800, color: 'inherit'}}>TRX</Box></IconWrapper>,
    AVAX: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>AVAX</Box></IconWrapper>,
    LINK: <IconWrapper><Box sx={{fontSize: '9px', fontWeight: 800, color: 'inherit'}}>LINK</Box></IconWrapper>,
    DEFAULT: (symbol) => <IconWrapper><Box sx={{fontSize: '8px', fontWeight: 800, color: 'inherit', textAlign: 'center'}}>{symbol.slice(0,4)}</Box></IconWrapper>
  }), []);

  const getIcon = useCallback((symbol, imageUrl) => {
    const upperSymbol = (symbol || '').toUpperCase();
    const fallbackIcon = iconMap[upperSymbol] || iconMap.DEFAULT(upperSymbol);
    
    if (imageUrl) {
      return <CoinImageIcon imageUrl={imageUrl} symbol={symbol} fallbackIcon={fallbackIcon} />;
    }
    
    return fallbackIcon;
  }, [iconMap]);

  return getIcon(symbol, imageUrl);
};

export default CoinIcon;
export { CoinImageIcon, IconWrapper, PlaceholderIcon }; 