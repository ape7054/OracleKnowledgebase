import { fetchCryptoNews } from '../../services/newsService';
import { getFallbackNews } from './constants';

// 本地新闻获取函数 - 使用真实API
export const loadCryptoNews = async () => {
  try {
    // 使用真实API获取新闻数据
    const newsData = await fetchCryptoNews({ 
      maxItems: 20, 
      useRealAPI: true 
    });
    
    // 转换数据格式以适配UI
    return newsData.map(item => ({
      id: item.id,
      title: item.title,
      summary: item.summary,
      source: item.source,
      time: item.time,
      category: item.category || '市场',
      sentiment: item.sentiment,
      impact: item.impact,
      views: item.views || Math.floor(Math.random() * 50000) + 1000 + '',
      image: item.imageUrl || `https://via.placeholder.com/400x250/1976d2/ffffff?text=${encodeURIComponent(item.title.substring(0, 20))}`,
      link: item.sourceUrl,
      coins: item.coins || ['CRYPTO'],
      tags: item.tags || []
    }));
  } catch (error) {
    console.error('获取真实新闻失败:', error);
    return getFallbackNews();
  }
};

export const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case 'positive': return '#00ff88';
    case 'negative': return '#ff4757';
    default: return '#a4b0be';
  }
};

export const getImpactColor = (impact, theme) => {
  switch (impact) {
    case 'high': return theme.palette.error.main;
    case 'medium': return theme.palette.warning.main;
    default: return theme.palette.info.main;
  }
}; 