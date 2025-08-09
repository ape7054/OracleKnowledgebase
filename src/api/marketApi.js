import axios from 'axios';

// API基础配置
const API_BASE_URL = '/api';

// 创建axios实例
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 35000, // 增加超时时间到35秒，适应CoinGecko API响应时间
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the auth token for all subsequent requests
const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status || 'No response', error.message);
    
    // 只在有response的情况下检查状态码
    if (error.response?.status === 401) {
      // For example, redirect to login page
      console.error('Unauthorized, redirecting to login');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 市场数据API
export const marketApi = {
  // 获取市场数据
  async getMarketData(limit = 50) {
    try {
      const response = await apiClient.get(`/market/data?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      throw error;
    }
  },

  // 获取特定币种详情
  async getCoinDetails(coinId) {
    try {
      const response = await apiClient.get(`/market/coins/${coinId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch coin details for ${coinId}:`, error);
      throw error;
    }
  },

  // 获取历史价格数据
  async getHistoricalData(coinId, days = 7) {
    try {
      const response = await apiClient.get(`/market/coins/${coinId}/history?days=${days}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch historical data for ${coinId}:`, error);
      throw error;
    }
  },

  // 获取OHLC数据（K线图）
  async getOhlcData(coinId, vs_currency = 'usd', days = '7') {
    try {
      const response = await apiClient.get(`/market/coins/${coinId}/ohlc`, {
        params: {
          vs_currency,
          days
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch OHLC data for ${coinId}:`, error);
      throw error;
    }
  },

  // 获取多个币种数据
  async getMultipleCoins(coinIds) {
    try {
      const params = {
        ids: coinIds.join(','),
        sparkline: true
      };
      // 使用正确的API路径，与后端router.go文件中定义的一致
      const response = await apiClient.get('/market/coins', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch multiple coins data:', error);
      throw error;
    }
  },

  // 检查API连接状态
  async pingApi() {
    try {
      const response = await apiClient.get('/market/ping');
      return response.data;
    } catch (error) {
      console.error('Failed to ping API:', error);
      throw error;
    }
  },

  // 健康检查
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  // 登录
  async login(username, password) {
    try {
      const response = await apiClient.post('/auth/login', { username, password });
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token);
        setAuthToken(token);
      }
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },

  // 注册
  async register(username, password) {
    try {
      const response = await apiClient.post('/auth/register', { username, password });
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  // 创建交易
  async createTrade(tradeData) {
    try {
      const response = await apiClient.post('/trades', tradeData);
      return response.data;
    } catch (error) {
      console.error('Failed to create trade:', error);
      throw error;
    }
  },

  // 设置认证token
  setAuthToken: setAuthToken
};

// On initial load, check if a token exists and set it
const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}

// 数据转换工具函数
export const dataTransformers = {
  // 转换CoinGecko数据为前端需要的格式
  transformCoinData(coinData) {
    return {
      id: coinData.id,
      name: coinData.name,
      symbol: coinData.symbol.toUpperCase(),
      price: coinData.current_price,
      change: coinData.price_change_percentage_24h,
      marketCap: coinData.market_cap,
      volume: coinData.total_volume,
      rank: coinData.market_cap_rank,
      lastUpdated: coinData.last_updated,
      image: coinData.image // expose image URL for icon rendering
    };
  },

  // 转换历史价格数据为图表格式
  transformHistoricalData(historicalData) {
    return historicalData.map(item => ({
      timestamp: item.timestamp,
      time: new Date(item.timestamp).toLocaleTimeString('zh-CN', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }),
      price: item.price,
      date: new Date(item.timestamp).toLocaleDateString('zh-CN')
    }));
  },

  // 转换OHLC数据为图表格式
  transformOhlcData(ohlcData) {
    if (!ohlcData || !Array.isArray(ohlcData)) return [];
    return ohlcData.map(d => ({
      time: d[0] / 1000, // lightweight-charts需要Unix时间戳(秒)
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4]
    }));
  },

  // 转换市场数据为仪表板格式
  transformMarketSummary(marketData) {
    if (!marketData || marketData.length === 0) {
      return {
        totalMarketCap: '0',
        btcDominance: '0%',
        ethDominance: '0%',
        dailyVolume: '0'
      };
    }

    const totalMarketCap = marketData.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const totalVolume = marketData.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
    
    const btcData = marketData.find(coin => coin.symbol === 'btc');
    const ethData = marketData.find(coin => coin.symbol === 'eth');
    
    const btcDominance = btcData ? ((btcData.market_cap / totalMarketCap) * 100).toFixed(1) : '0';
    const ethDominance = ethData ? ((ethData.market_cap / totalMarketCap) * 100).toFixed(1) : '0';

    return {
      totalMarketCap: this.formatLargeNumber(totalMarketCap),
      btcDominance: `${btcDominance}%`,
      ethDominance: `${ethDominance}%`,
      dailyVolume: this.formatLargeNumber(totalVolume)
    };
  },

  // 格式化大数字
  formatLargeNumber(num) {
    if (num >= 1e12) {
      return (num / 1e12).toFixed(1) + 'T';
    } else if (num >= 1e9) {
      return (num / 1e9).toFixed(1) + 'B';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(1) + 'M';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(1) + 'K';
    }
    return num.toFixed(2);
  },

  // 格式化价格
  formatPrice(price) {
    if (price >= 1) {
      return price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    } else {
      return price.toFixed(6);
    }
  },

  // 格式化百分比变化
  formatPercentage(percentage) {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }
};

// 缓存管理
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 300000; // 5分钟缓存，避免频繁刷新
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.cacheTimeout;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  clear() {
    this.cache.clear();
  }
}

export const cacheManager = new CacheManager();

// 带缓存的API调用
export const cachedMarketApi = {
  async getMarketData(limit = 50) {
    const cacheKey = `market-data-${limit}`;
    const cached = cacheManager.get(cacheKey);
    
    if (cached) {
      console.log('Using cached market data');
      return cached;
    }

    const data = await marketApi.getMarketData(limit);
    cacheManager.set(cacheKey, data);
    return data;
  },

  async getCoinDetails(coinId) {
    const cacheKey = `coin-details-${coinId}`;
    const cached = cacheManager.get(cacheKey);
    
    if (cached) {
      console.log(`Using cached coin details for ${coinId}`);
      return cached;
    }

    const data = await marketApi.getCoinDetails(coinId);
    cacheManager.set(cacheKey, data);
    return data;
  },

  async getOhlcData(coinId, vs_currency = 'usd', days = '7') {
    const cacheKey = `ohlc-${coinId}-${vs_currency}-${days}`;
    const cached = cacheManager.get(cacheKey);

    if (cached) {
      console.log(`Using cached OHLC data for ${coinId}`);
      return cached;
    }

    const data = await marketApi.getOhlcData(coinId, vs_currency, days);
    cacheManager.set(cacheKey, data);
    return data;
  }
};

export default marketApi;
