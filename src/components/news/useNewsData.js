import { useState, useEffect, useRef } from 'react';
import { loadCryptoNews } from './utils';
import { getFallbackNews } from './constants';

export const useNewsData = () => {
  const [loading, setLoading] = useState(true);
  const [news, setNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [newArticleId, setNewArticleId] = useState(null);
  const ws = useRef(null);

  const handleRefreshNews = async () => {
    setRefreshing(true);
    try {
      const newsData = await loadCryptoNews();
      setNews(newsData);
    } catch (error) {
      console.error('刷新新闻失败:', error);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      try {
        const newsData = await loadCryptoNews();
        setNews(newsData);
      } catch (error) {
        console.error('加载新闻失败:', error);
        setNews(getFallbackNews());
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  return {
    loading,
    news,
    refreshing,
    newArticleId,
    handleRefreshNews
  };
}; 