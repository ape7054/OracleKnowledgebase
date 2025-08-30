import { useState, useEffect, useRef } from 'react';
import { cachedMarketApi, dataTransformers, cacheManager, marketApi } from '../api/marketApi';

export const useMarketData = () => {
  const [marketData, setMarketData] = useState([]);
  const [marketSummary, setMarketSummary] = useState({
    totalMarketCap: '0',
    btcDominance: '0%',
    ethDominance: '0%',
    dailyVolume: '0'
  });
  const [initialLoading, setInitialLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * 将后端标准化的币种数据转换为列表所需结构
   */
  const transformApiDataForDashboard = (apiData, sparkMetaByIdMap) => {
    if (!apiData || !Array.isArray(apiData)) return [];

    const hourBucket = lastUpdated ? Math.floor(lastUpdated.getTime() / 3600000) : Math.floor(Date.now() / 3600000);
    const makeSeededRandom = (seedPrefix) => (i) => {
      let hash = 0;
      const str = `${seedPrefix}-${i}`;
      for (let j = 0; j < str.length; j++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(j);
        hash |= 0;
      }
      const x = Math.sin(hash) * 10000;
      return x - Math.floor(x);
    };
    
    const stableSet = new Set(['USDT','USDC','DAI','BUSD','TUSD','FDUSD','PYUSD','USDD','SUSD','SUSDE','USDE']);
    const isStable = (sym) => stableSet.has(String(sym || '').toUpperCase());
    
    return apiData.map(coin => {
      const basePrice = Number(coin.price) || 1;
      const changePercent = Number(coin.change) || 0;
      const rand = makeSeededRandom(`${coin.symbol}-${hourBucket}`);

      // 优先使用真实 sparkline，否则回退模拟
      let sparklineData = [];
      const meta = sparkMetaByIdMap?.get?.(coin.id);
      if (meta && Array.isArray(meta.sparkline) && meta.sparkline.length > 0) {
        sparklineData = meta.sparkline.map(n => Number(n) || 0);
      } else {
        const points = 24;
        const amplitude = Math.max(Math.abs(changePercent) / 100, 0.02);
        sparklineData = Array.from({ length: points }, (_, i) => {
          const t = i / (points - 1);
          const wave = Math.sin(Math.PI * 2 * t) * amplitude * basePrice * 1.2;
          const trend = (changePercent / 100) * basePrice * 1.5 * (t - 0.5);
          const noise = (rand(i) - 0.5) * amplitude * basePrice * 0.35;
          const price = Math.max(0, basePrice + wave + trend + noise);
          return Number(price.toFixed(6));
        });
      }
      
      // 稳定币：强制使用平直曲线
      if (isStable(coin.symbol) && sparklineData.length > 0) {
        const flat = new Array(sparklineData.length).fill(basePrice);
        sparklineData = flat;
      }
      
      const imageUrl = coin.image || meta?.image || '';

      return {
        name: coin.name || 'Unknown',
        symbol: (coin.symbol || 'UNKNOWN').toUpperCase(),
        price: `$${basePrice.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`,
        change: `${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}%`,
        image: imageUrl,
        sparkline: sparklineData,
        marketCap: Number(coin.marketCap) || 0,
        rank: Number(coin.rank) || Infinity,
        volume: Number(coin.volume) || 0,
        id: coin.id,
      };
    });
  };

  // 获取市场数据
  const fetchMarketData = async (forceRefresh = false) => {
    let doingInitial = initialLoading;
    
    try {
      setError(null);
      if (forceRefresh) {
        try { cacheManager.clear(); } catch {}
      }
      if (doingInitial) {
        setInitialLoading(true);
      } else {
        setIsRefreshing(true);
      }

      const response = await cachedMarketApi.getMarketData(50);
      if (response.success && response.data && response.data.length > 0) {
        const standardData = response.data.map(dataTransformers.transformCoinData);
        
        // 规范化币种ID
        const normalizeId = (id, name, symbol) => {
          const source = (id && !/\s/.test(id) ? id : (name || id || symbol || '')).toString().trim().toLowerCase();
          const slug = source
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '-')
            .replace(/-+/g, '-');
          const overrides = { bnb: 'binancecoin', xrp: 'ripple' };
          return overrides[slug] || slug;
        };
        
        const topIds = Array.from(new Set(
          standardData
            .slice(0, 40)
            .map(c => normalizeId(c.id, c.name, c.symbol))
            .filter(Boolean)
        ).add('tether'));

        let sparkMetaById = new Map();

        try {
          if (topIds.length > 0) {
            const sparkRes = await marketApi.getMultipleCoins(topIds);
            if (sparkRes?.success && Array.isArray(sparkRes.data)) {
              sparkMetaById = new Map(
                sparkRes.data.map(item => [
                  item.id,
                  {
                    sparkline: Array.isArray(item?.sparkline_in_7d?.price) ? item.sparkline_in_7d.price : [],
                    image: typeof item?.image === 'string' ? item.image : ''
                  }
                ])
              );
            }
          }
        } catch (e) {
          console.warn('获取真实 sparkline 失败，将使用回退模拟数据:', e);
        }

        const dashboardAll = transformApiDataForDashboard(standardData, sparkMetaById);
        const bySymbol = new Map(dashboardAll.map(c => [c.symbol, c]));
        const ensureSymbols = ['BTC', 'ETH', 'USDT', 'USDC'];
        const ensured = [...dashboardAll];
        ensureSymbols.forEach(sym => {
          const found = bySymbol.get(sym);
          if (!ensured.find(c => c.symbol === sym) && found) {
            ensured.push(found);
          }
        });

        const safeCap = (v) => {
          const n = Number(v);
          return Number.isFinite(n) && n > 0 ? n : -1;
        };
        
        const sorted = ensured.sort((a, b) => {
          const aVal = safeCap(a.marketCap);
          const bVal = safeCap(b.marketCap);
          
          if (aVal > 0 && bVal <= 0) return -1;
          if (bVal > 0 && aVal <= 0) return 1;
          if (aVal > 0 && bVal > 0) return bVal - aVal;
          return (a.rank || Infinity) - (b.rank || Infinity);
        });

        const dashboardData = sorted.slice(0, 40);
        setMarketData(dashboardData);

        const summary = dataTransformers.transformMarketSummary(response.data);
        setMarketSummary(summary);
      } else {
        setError('市场数据暂时不可用，请稍后重试');
        setMarketData([]);
      }

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Market data fetch error:', err);
      setError(`API连接失败：${err.message || '网络连接失败'}`);
      setMarketData([]);
    } finally {
      if (doingInitial) {
        setInitialLoading(false);
      } else {
        setIsRefreshing(false);
      }
    }
  };

  // 初始化数据加载
  useEffect(() => {
    let isMounted = true;
    
    const loadInitialData = async () => {
      if (isMounted) {
        console.log('Dashboard初次加载，获取市场数据...');
        await fetchMarketData();
      }
    };

    loadInitialData();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    marketData,
    marketSummary,
    initialLoading,
    isRefreshing,
    error,
    lastUpdated,
    fetchMarketData,
    transformApiDataForDashboard
  };
}; 