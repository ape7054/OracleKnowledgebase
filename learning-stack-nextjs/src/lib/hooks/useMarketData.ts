'use client';
import { useState, useEffect } from 'react';

export interface MarketData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image: string;
  last_updated: string;
}

interface UseMarketDataReturn {
  data: MarketData[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useMarketData = (limit: number = 50): UseMarketDataReturn => {
  const [data, setData] = useState<MarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/market/coins?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch market data');
      // 设置模拟数据作为后备
      setData(generateMockData(limit));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // 设置定时刷新 (每30秒)
    const interval = setInterval(fetchMarketData, 30000);
    
    return () => clearInterval(interval);
  }, [limit]);

  const refetch = () => {
    fetchMarketData();
  };

  return { data, loading, error, refetch };
};

// 模拟数据生成器 (用于开发和后备)
const generateMockData = (limit: number): MarketData[] => {
  const mockCoins = [
    { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png' },
    { id: 'ethereum', symbol: 'eth', name: 'Ethereum', image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png' },
    { id: 'binancecoin', symbol: 'bnb', name: 'BNB', image: 'https://assets.coingecko.com/coins/images/825/small/bnb-icon2_2x.png' },
    { id: 'cardano', symbol: 'ada', name: 'Cardano', image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png' },
    { id: 'solana', symbol: 'sol', name: 'Solana', image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png' },
    { id: 'polkadot', symbol: 'dot', name: 'Polkadot', image: 'https://assets.coingecko.com/coins/images/12171/small/polkadot.png' },
    { id: 'dogecoin', symbol: 'doge', name: 'Dogecoin', image: 'https://assets.coingecko.com/coins/images/5/small/dogecoin.png' },
    { id: 'avalanche-2', symbol: 'avax', name: 'Avalanche', image: 'https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png' },
  ];

  return mockCoins.slice(0, limit).map((coin, index) => ({
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    current_price: Math.random() * 50000 + 100,
    price_change_percentage_24h: (Math.random() - 0.5) * 20,
    market_cap: Math.random() * 1000000000 + 1000000,
    total_volume: Math.random() * 100000000 + 1000000,
    image: coin.image,
    last_updated: new Date().toISOString(),
  }));
}; 