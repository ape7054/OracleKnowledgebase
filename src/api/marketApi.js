/**
 * marketApi.js
 * 用途：集中封装前端访问后端的 HTTP API、数据转换工具、以及简单的内存缓存。
 * 主要结构：
 * - axios 实例 + 拦截器 + token 注入
 * - marketApi：直连后端的原始 API（不带缓存）
 * - dataTransformers：将后端/第三方数据转换为前端更易用的结构
 * - CacheManager/cachedMarketApi：基于内存的简单缓存包装，减少重复请求
 *
 * 提示：
 * - 本文件仅做“调用与转换”的薄封装，不包含复杂业务逻辑。
 * - 若需要强制刷新数据，可调用 cacheManager.clear() 或在页面中触发“强制刷新”。
 */

import axios from 'axios';

// API 基础路径（由本地开发代理或生产 Nginx 反向代理转发到 Go 后端）
const API_BASE_URL = '/api';

// 创建 axios 实例：统一设置 baseURL、超时与默认请求头
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 35000, // 增加超时时间到35秒，适应CoinGecko API响应时间
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 为所有后续请求设置/移除 Authorization 头
 * - 登录成功后注入 Bearer token
 * - 登出或 token 失效时清除
 */
const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};

// 请求拦截器：打印请求日志；如需可在此统一注入额外头信息
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

// 响应拦截器：统一日志与错误处理；401 时清理并跳登录
apiClient.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status || 'No response', error.message);
    // 仅在存在后端响应时根据状态码处理
    if (error.response?.status === 401) {
      // 示例：未授权，清理 token 并跳转登录页
      console.error('Unauthorized, redirecting to login');
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 市场数据 API（原始调用，不带缓存）。约定后端返回 { success, data, ... }
export const marketApi = {
  /**
   * 获取市场列表数据
   * GET /market/data?limit=
   * @param {number} limit - 拉取的币种数量上限
   */
  async getMarketData(limit = 50) {
    try {
      const response = await apiClient.get(`/market/data?limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      throw error;
    }
  },

  /**
   * 获取单个币种详情
   * GET /market/coins/:coinId
   * @param {string} coinId - 币种 ID（例如 bitcoin、ethereum）
   */
  async getCoinDetails(coinId) {
    try {
      const response = await apiClient.get(`/market/coins/${coinId}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch coin details for ${coinId}:`, error);
      throw error;
    }
  },

  /**
   * 获取历史价格数据（非 OHLC，适合折线图）
   * GET /market/coins/:coinId/history?days=
   * @param {string} coinId - 币种 ID
   * @param {number} days - 天数（如 7、30）
   */
  async getHistoricalData(coinId, days = 7) {
    try {
      const response = await apiClient.get(`/market/coins/${coinId}/history?days=${days}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch historical data for ${coinId}:`, error);
      throw error;
    }
  },

  /**
   * 获取 OHLC（开高低收）数据，适合 K 线图
   * GET /market/coins/:coinId/ohlc
   * @param {string} coinId - 币种 ID
   * @param {string} vs_currency - 计价货币（默认 usd）
   * @param {string|number} days - 天数（如 '1' | '7' | '30'）
   */
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

  /**
   * 批量获取多个币种数据（可包含 sparkline）
   * GET /market/coins?ids=bitcoin,ethereum&sparkline=true
   * 用途：用于小趋势线（sparklines）和官方图标 image
   */
  async getMultipleCoins(coinIds) {
    try {
      const params = {
        ids: coinIds.join(','),
        sparkline: true
      };
      // 路径需与后端 router 定义一致
      const response = await apiClient.get('/market/coins', { params });
      return response.data;
    } catch (error) {
      console.error('Failed to fetch multiple coins data:', error);
      throw error;
    }
  },

  /**
   * API 连通性检查（后端转发第三方 ping）
   */
  async pingApi() {
    try {
      const response = await apiClient.get('/market/ping');
      return response.data;
    } catch (error) {
      console.error('Failed to ping API:', error);
      throw error;
    }
  },

  /**
   * 健康检查（后端健康状态）
   */
  async healthCheck() {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  },

  /**
   * 登录：成功后持久化 token 并注入到 axios 默认头
   */
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

  /**
   * 注册账号
   */
  async register(username, password) {
    try {
      const response = await apiClient.post('/auth/register', { username, password });
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },

  /**
   * 创建交易（示例）
   */
  async createTrade(tradeData) {
    try {
      const response = await apiClient.post('/trades', tradeData);
      return response.data;
    } catch (error) {
      console.error('Failed to create trade:', error);
      throw error;
    }
  },

  // 暴露设置认证 token 的方法，便于外部手动注入/清除
  setAuthToken: setAuthToken
};

// 页面刷新后，如果本地已有 token，自动注入到 axios
const token = localStorage.getItem('authToken');
if (token) {
  setAuthToken(token);
}

// 数据转换工具：将第三方/后端数据标准化为前端所需格式
export const dataTransformers = {
  /**
   * 转换 CoinGecko 风格的数据为前端使用的统一结构
   * 输入字段示例：
   * - id, name, symbol, current_price, price_change_percentage_24h,
   *   market_cap, total_volume, market_cap_rank, last_updated, image
   */
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
      image: coinData.image // 暴露官方图标 URL，便于前端展示
    };
  },

  /**
   * 转换“历史价格”数组为图表需要的格式
   * 预期输入：[{ timestamp, price }, ...]
   */
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

  /**
   * 转换 OHLC 列表为 lightweight-charts 需要的结构
   * 预期输入：[[ms, open, high, low, close], ...]
   */
  transformOhlcData(ohlcData) {
    if (!ohlcData || !Array.isArray(ohlcData)) return [];
    return ohlcData.map(d => ({
      time: d[0] / 1000, // lightweight-charts 需要 Unix 秒级时间戳
      open: d[1],
      high: d[2],
      low: d[3],
      close: d[4]
    }));
  },

  /**
   * 根据市场数据计算总市值、BTC/ETH 主导率与 24h 总成交额
   * 注意：内部使用 this.formatLargeNumber 做数值缩写
   */
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

  /**
   * 数字缩写（K/M/B/T），用于大额显示
   */
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

  /**
   * 价格格式化：>=1 保留 2 位小数；<1 保留 6 位
   */
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

  /**
   * 百分比格式化：带正负号与两位小数
   */
  formatPercentage(percentage) {
    const sign = percentage >= 0 ? '+' : '';
    return `${sign}${percentage.toFixed(2)}%`;
  }
};

/**
 * 简易内存缓存（页面级）：
 * - 使用 Map 保存 { data, timestamp }
 * - 默认缓存时长 5 分钟（页面关闭/刷新即清空）
 * - 仅用于 GET 类读取请求，避免写操作被旧数据污染
 */
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 300000; // 5分钟缓存，避免频繁刷新
  }

  // 保存数据到缓存
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // 读取缓存；过期则返回 null 并删除
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

  // 清空全部缓存（用于“强制刷新”场景）
  clear() {
    this.cache.clear();
  }
}

export const cacheManager = new CacheManager();

/**
 * 带缓存的 API 包装：对常用读接口添加 5 分钟内存缓存
 * - 若命中缓存则直接返回，未命中则发起请求并写入缓存
 * - cacheKey 需包含关键参数，避免交叉污染
 */
export const cachedMarketApi = {
  /**
   * 获取市场数据（带缓存）
   * cacheKey: market-data-${limit}
   */
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

  /**
   * 获取单币详情（带缓存）
   * cacheKey: coin-details-${coinId}
   */
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

  /**
   * 获取 OHLC 数据（带缓存）
   * cacheKey: ohlc-${coinId}-${vs_currency}-${days}
   */
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
