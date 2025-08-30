import { useState, useEffect, useRef } from 'react';
import { cachedMarketApi, dataTransformers } from '../api/marketApi';

export const useOhlcData = (selectedCoin, timeframe) => {
  const [ohlcData, setOhlcData] = useState([]);
  const [ohlcLoading, setOhlcLoading] = useState(false);
  const fetchTimeoutRef = useRef(null);
  const requestIdRef = useRef(0);

  // 获取K线图数据
  useEffect(() => {
    let isMounted = true;
    
    const fetchOhlcData = async () => {
      if (!isMounted) return;
      
      const currentId = ++requestIdRef.current;
      const startAt = Date.now();
      setOhlcLoading(true);
        
      try {
        // 币种ID映射
        const coinIdMap = { BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana' };
        const coinId = coinIdMap[selectedCoin.toUpperCase()] || 'bitcoin';
        const days = timeframe.replace('d', '');

        const response = await cachedMarketApi.getOhlcData(coinId, 'usd', days);
        if (!isMounted || currentId !== requestIdRef.current) return;

        const data = response.success && response.data
          ? dataTransformers.transformOhlcData(response.data)
          : [];

        setOhlcData(data);
      } catch (err) {
        if (!isMounted || currentId !== requestIdRef.current) return;
        console.error('OHLC数据获取失败:', err);
        setOhlcData([]);
      } finally {
        if (!isMounted || currentId !== requestIdRef.current) return;
        const elapsed = Date.now() - startAt;
        const remain = Math.max(0, 300 - elapsed);
        setTimeout(() => isMounted && setOhlcLoading(false), remain);
      }
    };

    if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    fetchTimeoutRef.current = setTimeout(fetchOhlcData, 150);
    
    return () => {
      isMounted = false;
      if (fetchTimeoutRef.current) clearTimeout(fetchTimeoutRef.current);
    };
  }, [selectedCoin, timeframe]);

  return {
    ohlcData,
    ohlcLoading
  };
}; 