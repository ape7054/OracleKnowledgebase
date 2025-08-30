// 增强的市场情绪数据
export const sentimentData = [
  { time: '00:00', sentiment: 65, volume: 120, fear: 25, greed: 75 },
  { time: '04:00', sentiment: 70, volume: 150, fear: 20, greed: 80 },
  { time: '08:00', sentiment: 75, volume: 180, fear: 15, greed: 85 },
  { time: '12:00', sentiment: 80, volume: 200, fear: 12, greed: 88 },
  { time: '16:00', sentiment: 85, volume: 220, fear: 10, greed: 90 },
  { time: '20:00', sentiment: 90, volume: 250, fear: 8, greed: 92 },
  { time: '24:00', sentiment: 88, volume: 240, fear: 10, greed: 90 }
];

// 恐惧贪婪指数数据
export const fearGreedData = [
  { name: 'Extreme Fear', value: 10, fill: '#e74c3c' },
  { name: 'Fear', value: 15, fill: '#f39c12' },
  { name: 'Neutral', value: 10, fill: '#95a5a6' },
  { name: 'Greed', value: 25, fill: '#3498db' },
  { name: 'Extreme Greed', value: 40, fill: '#27ae60' }
];

// 新闻分类数据
export const newsCategories = [
  { name: 'Bitcoin', count: 156, color: '#f7931e', trend: 12 },
  { name: 'Ethereum', count: 134, color: '#627eea', trend: 8 },
  { name: 'DeFi', count: 98, color: '#9c27b0', trend: -3 },
  { name: 'NFT', count: 87, color: '#ff5722', trend: 15 },
  { name: '监管', count: 76, color: '#795548', trend: -5 },
  { name: '安全', count: 65, color: '#f44336', trend: 7 }
];

// 回退新闻数据
export const getFallbackNews = () => [
  {
    id: 1,
    title: "Why Michael Saylor Calls Strategy's STRC Preferred Stock His Firm's 'iPhone Moment'",
    summary: "Michael Saylor likens Strategy's latest Bitcoin-backed preferred stock to Apple's iPhone, calling STRC a breakthrough in corporate finance with massive market potential...",
    source: "CoinDesk",
    time: "10 hours ago",
    category: "Bitcoin",
    sentiment: "positive",
    impact: "high",
    views: "28.7K",
    image: "https://via.placeholder.com/400x250/f7931e/ffffff?text=Bitcoin+Strategy"
  },
  {
    id: 2,
    title: "Arthur Hayes Dumps Millions in Crypto Amid Bearish Bet on U.S. Tariff Impact",
    summary: "Hayes suggested that markets will be impacted by President Trump's tariffs and a weaker-than-expected US jobs report, predicting a bearish scenario for crypto...",
    source: "CoinDesk",
    time: "13 hours ago",
    category: "市场",
    sentiment: "negative",
    impact: "medium",
    views: "48.4K",
    image: "https://via.placeholder.com/400x250/e74c3c/ffffff?text=Market+Analysis"
  }
]; 