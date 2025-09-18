'use client';
import { useState, useEffect } from 'react';

export interface OhlcDataPoint {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface UseOhlcDataReturn {
  data: OhlcDataPoint[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useOhlcData = (
  coinId: string = 'bitcoin', 
  days: number = 30
): UseOhlcDataReturn => {
  const [data, setData] = useState<OhlcDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOhlcData = async () => {
    // 优化：如果days为0，不发起请求
    if (days === 0) {
      setData([]);
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/market/ohlc/${coinId}?days=${days}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching OHLC data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch OHLC data');
      // 设置模拟数据作为后备，减少外部依赖
      setData(generateMockOhlcData(days));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOhlcData();
  }, [coinId, days]);

  const refetch = () => {
    fetchOhlcData();
  };

  return { data, loading, error, refetch };
};

// 模拟OHLC数据生成器
const generateMockOhlcData = (days: number): OhlcDataPoint[] => {
  const data: OhlcDataPoint[] = [];
  const now = new Date();
  let basePrice = 45000; // 起始价格

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    // 生成随机价格波动
    const volatility = 0.02; // 2%波动率
    const change = (Math.random() - 0.5) * 2 * volatility;
    const open = basePrice * (1 + change);
    const close = open * (1 + (Math.random() - 0.5) * 2 * volatility);
    const high = Math.max(open, close) * (1 + Math.random() * volatility);
    const low = Math.min(open, close) * (1 - Math.random() * volatility);
    const volume = Math.random() * 10000000000 + 1000000000;

    data.push({
      time: date.toISOString().split('T')[0], // YYYY-MM-DD format
      open: Number(open.toFixed(2)),
      high: Number(high.toFixed(2)),
      low: Number(low.toFixed(2)),
      close: Number(close.toFixed(2)),
      volume: Number(volume.toFixed(0)),
    });

    basePrice = close; // 下一天的基准价格
  }

  return data;
}; 