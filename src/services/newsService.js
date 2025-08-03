// 新闻服务 - 集成多个加密货币新闻API
import axios from 'axios';

// API配置
const NEWS_APIS = {
  // CryptoCompare API (免费)
  CRYPTO_COMPARE: {
    baseUrl: 'https://min-api.cryptocompare.com/data/v2/news/',
    params: {
      lang: 'EN',
      sortOrder: 'latest'
    }
  },
  
  // CoinGecko API (免费)
  COINGECKO: {
    baseUrl: 'https://api.coingecko.com/api/v3/news',
    params: {}
  },
  
  // NewsAPI (需要API密钥)
  NEWS_API: {
    baseUrl: 'https://newsapi.org/v2/everything',
    params: {
      q: 'cryptocurrency OR bitcoin OR ethereum OR blockchain',
      sortBy: 'publishedAt',
      language: 'en',
      pageSize: 20
    }
  }
};

// 情绪分析函数
const analyzeSentiment = (title, summary) => {
  const positiveWords = ['breakthrough', 'surge', 'rally', 'bullish', 'gains', 'rise', 'up', 'high', 'success', 'adoption', 'growth'];
  const negativeWords = ['crash', 'drop', 'fall', 'bearish', 'decline', 'down', 'low', 'hack', 'scam', 'regulation', 'ban'];
  
  const text = (title + ' ' + summary).toLowerCase();
  const positiveCount = positiveWords.filter(word => text.includes(word)).length;
  const negativeCount = negativeWords.filter(word => text.includes(word)).length;
  
  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
};

// 提取相关币种
const extractCoins = (title, summary) => {
  const coinKeywords = {
    'BTC': ['bitcoin', 'btc'],
    'ETH': ['ethereum', 'eth', 'ether'],
    'SOL': ['solana', 'sol'],
    'ADA': ['cardano', 'ada'],
    'DOT': ['polkadot', 'dot'],
    'MATIC': ['polygon', 'matic'],
    'AVAX': ['avalanche', 'avax'],
    'LINK': ['chainlink', 'link'],
    'UNI': ['uniswap', 'uni'],
    'AAVE': ['aave'],
    'DeFi': ['defi', 'decentralized finance'],
    'NFT': ['nft', 'non-fungible token']
  };
  
  const text = (title + ' ' + summary).toLowerCase();
  const foundCoins = [];
  
  Object.entries(coinKeywords).forEach(([coin, keywords]) => {
    if (keywords.some(keyword => text.includes(keyword))) {
      foundCoins.push(coin);
    }
  });
  
  return foundCoins.length > 0 ? foundCoins : ['CRYPTO'];
};

// 分类新闻
const categorizeNews = (title, summary) => {
  const text = (title + ' ' + summary).toLowerCase();
  
  if (text.includes('regulation') || text.includes('sec') || text.includes('government')) return 'regulation';
  if (text.includes('defi') || text.includes('yield') || text.includes('liquidity')) return 'defi';
  if (text.includes('nft') || text.includes('collectible') || text.includes('art')) return 'nft';
  if (text.includes('upgrade') || text.includes('protocol') || text.includes('blockchain')) return 'technology';
  return 'market';
};

// 从CryptoCompare获取新闻
const fetchFromCryptoCompare = async () => {
  try {
    const response = await axios.get(NEWS_APIS.CRYPTO_COMPARE.baseUrl, {
      params: NEWS_APIS.CRYPTO_COMPARE.params
    });
    
    return response.data.Data?.map((item, index) => ({
      id: `cc_${item.id || index}`,
      title: item.title,
      summary: item.body?.substring(0, 200) + '...',
      source: item.source_info?.name || 'CryptoCompare',
      sourceUrl: item.url,
      imageUrl: item.imageurl || `https://via.placeholder.com/400x250/1976d2/ffffff?text=${encodeURIComponent(item.title?.substring(0, 20) || 'News')}`,
      time: formatTime(item.published_on * 1000),
      sentiment: analyzeSentiment(item.title, item.body || ''),
      coins: extractCoins(item.title, item.body || ''),
      impact: Math.random() > 0.7 ? 'high' : 'medium',
      category: categorizeNews(item.title, item.body || ''),
      tags: item.tags?.split('|').slice(0, 3) || [],
      views: Math.floor(Math.random() * 20000) + 1000,
      likes: Math.floor(Math.random() * 500) + 10,
      dislikes: Math.floor(Math.random() * 50) + 1
    })) || [];
  } catch (error) {
    console.error('CryptoCompare API 错误:', error);
    return [];
  }
};

// 从NewsAPI获取新闻 (需要API密钥)
const fetchFromNewsAPI = async (apiKey) => {
  if (!apiKey) return [];
  
  try {
    const response = await axios.get(NEWS_APIS.NEWS_API.baseUrl, {
      params: {
        ...NEWS_APIS.NEWS_API.params,
        apiKey
      }
    });
    
    return response.data.articles?.map((item, index) => ({
      id: `na_${index}`,
      title: item.title,
      summary: item.description || item.content?.substring(0, 200) + '...',
      source: item.source?.name || 'NewsAPI',
      sourceUrl: item.url,
      time: formatTime(new Date(item.publishedAt).getTime()),
      sentiment: analyzeSentiment(item.title, item.description || ''),
      coins: extractCoins(item.title, item.description || ''),
      impact: Math.random() > 0.6 ? 'high' : 'medium',
      category: categorizeNews(item.title, item.description || ''),
      tags: [],
      views: Math.floor(Math.random() * 15000) + 500,
      likes: Math.floor(Math.random() * 300) + 5,
      dislikes: Math.floor(Math.random() * 30) + 1
    })) || [];
  } catch (error) {
    console.error('NewsAPI 错误:', error);
    return [];
  }
};

// 时间格式化
const formatTime = (timestamp) => {
  const now = Date.now();
  const diff = now - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);
  
  if (days > 0) return `${days}天前`;
  if (hours > 0) return `${hours}小时前`;
  return '刚刚';
};

// 主要的新闻获取函数
export const fetchCryptoNews = async (options = {}) => {
  const { 
    maxItems = 10, 
    useRealAPI = false, 
    newsApiKey = null 
  } = options;
  
  let allNews = [];
  
  if (useRealAPI) {
    try {
      // 并行获取多个来源的新闻
      const [cryptoCompareNews, newsApiNews] = await Promise.all([
        fetchFromCryptoCompare(),
        fetchFromNewsAPI(newsApiKey)
      ]);
      
      allNews = [...cryptoCompareNews, ...newsApiNews];
    } catch (error) {
      console.error('获取真实新闻失败:', error);
    }
  }
  
  // 如果没有获取到真实新闻，使用模拟数据
  if (allNews.length === 0) {
    allNews = getMockNews();
  }
  
  // 按时间排序并限制数量
  return allNews
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
    .slice(0, maxItems);
};

// 模拟新闻数据
const getMockNews = () => [
  {
    id: 1,
    title: "Bitcoin ETF获批推动价格突破新高",
    summary: "比特币ETF的正式获批为机构投资者提供了更便捷的投资渠道，推动BTC价格创下历史新高...",
    source: "CoinDesk",
    sourceUrl: "https://www.coindesk.com/markets/2024/01/10/bitcoin-etf-approval-drives-price-to-new-highs/",
    time: "2小时前",
    sentiment: "positive",
    coins: ["BTC"],
    impact: "high",
    category: "market",
    tags: ["ETF获批", "机构投资", "历史新高"],
    views: 15420,
    likes: 234,
    dislikes: 12
  },
  {
    id: 2,
    title: "以太坊2.0质押奖励机制优化",
    summary: "以太坊网络最新升级优化了质押奖励分配机制，提高了验证者收益并降低了网络费用...",
    source: "Ethereum.org",
    sourceUrl: "https://ethereum.org/en/roadmap/merge/",
    time: "4小时前",
    sentiment: "positive",
    coins: ["ETH"],
    impact: "medium",
    category: "technology",
    tags: ["网络升级", "质押奖励", "Gas费用"],
    views: 8930,
    likes: 156,
    dislikes: 8
  },
  {
    id: 3,
    title: "DeFi协议面临新的监管框架",
    summary: "全球监管机构正在制定针对去中心化金融协议的新监管框架，要求更高的透明度和合规性...",
    source: "CoinTelegraph",
    sourceUrl: "https://cointelegraph.com/news/defi-protocols-face-new-regulatory-challenges",
    time: "6小时前",
    sentiment: "negative",
    coins: ["DeFi"],
    impact: "high",
    category: "regulation",
    tags: ["监管政策", "合规要求", "DeFi"],
    views: 12340,
    likes: 89,
    dislikes: 45
  }
];

export default { fetchCryptoNews };
