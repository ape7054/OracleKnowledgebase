import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccessTime,
  Refresh,
  OpenInNew
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import NewsDetail from './NewsDetail';

// 模拟新闻数据
const mockNewsData = [
  {
    id: 1,
    title: "Bitcoin突破$70,000大关，创历史新高",
    summary: "比特币价格在机构投资者大量买入的推动下突破70,000美元...",
    source: "CryptoNews",
    time: "2小时前",
    sentiment: "positive",
    coins: ["BTC"],
    impact: "high",
    category: "market",
    tags: ["价格突破", "机构投资", "历史新高"],
    views: 15420,
    likes: 234,
    dislikes: 12
  },
  {
    id: 2,
    title: "以太坊升级进展顺利，质押奖励增加",
    summary: "以太坊网络的最新升级带来了更高的质押奖励和更低的gas费用...",
    source: "CoinDesk",
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
    title: "DeFi协议面临新的监管挑战",
    summary: "监管机构对去中心化金融协议提出了新的合规要求...",
    source: "Reuters",
    time: "6小时前",
    sentiment: "negative",
    coins: ["DeFi"],
    impact: "high",
    category: "regulation",
    tags: ["监管政策", "合规要求", "DeFi"],
    views: 12340,
    likes: 89,
    dislikes: 45
  },
  {
    id: 4,
    title: "Solana生态系统持续扩张",
    summary: "Solana区块链上的新项目数量持续增长，TVL达到新高...",
    source: "The Block",
    time: "8小时前",
    sentiment: "positive",
    coins: ["SOL"],
    impact: "medium",
    category: "defi",
    tags: ["生态扩张", "TVL增长", "新项目"],
    views: 6780,
    likes: 123,
    dislikes: 5
  },
  {
    id: 5,
    title: "NFT市场迎来新一轮创新浪潮",
    summary: "多个知名品牌宣布进入NFT领域，推出限量数字藏品...",
    source: "NFT News",
    time: "10小时前",
    sentiment: "positive",
    coins: ["NFT"],
    impact: "medium",
    category: "nft",
    tags: ["品牌合作", "数字藏品", "市场创新"],
    views: 9450,
    likes: 178,
    dislikes: 15
  },
  {
    id: 6,
    title: "Layer 2解决方案获得重大突破",
    summary: "新的Layer 2技术显著提升了交易速度并降低了成本...",
    source: "Tech Crypto",
    time: "12小时前",
    sentiment: "positive",
    coins: ["ETH", "MATIC"],
    impact: "high",
    category: "technology",
    tags: ["Layer 2", "扩容方案", "技术突破"],
    views: 11200,
    likes: 201,
    dislikes: 9
  }
];

// 情绪指示器组件
const SentimentIndicator = ({ sentiment }) => {
  const getSentimentConfig = () => {
    switch (sentiment) {
      case 'positive':
        return { 
          icon: <TrendingUp sx={{ fontSize: 14 }} />, 
          color: '#00ff88',
          label: '利好'
        };
      case 'negative':
        return { 
          icon: <TrendingDown sx={{ fontSize: 14 }} />, 
          color: '#ff4757',
          label: '利空'
        };
      default:
        return { 
          icon: <AccessTime sx={{ fontSize: 14 }} />, 
          color: '#a4b0be',
          label: '中性'
        };
    }
  };

  const config = getSentimentConfig();

  return (
    <Chip
      icon={config.icon}
      label={config.label}
      size="small"
      sx={{
        backgroundColor: alpha(config.color, 0.1),
        color: config.color,
        border: `1px solid ${alpha(config.color, 0.3)}`,
        '& .MuiChip-icon': {
          color: config.color
        }
      }}
    />
  );
};

// 新闻项组件
const NewsItem = ({ news, isLast, onNewsClick }) => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                lineHeight: 1.3,
                mb: 1,
                cursor: 'pointer',
                '&:hover': {
                  color: theme.palette.primary.main
                }
              }}
              onClick={() => onNewsClick(news)}
            >
              {news.title}
            </Typography>
            
            <Typography 
              variant="body2" 
              color="text.secondary" 
              sx={{ mb: 2, lineHeight: 1.5 }}
            >
              {news.summary}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
              <SentimentIndicator sentiment={news.sentiment} />

              <Typography variant="caption" color="text.secondary">
                {news.source} • {news.time}
              </Typography>

              {news.coins.map(coin => (
                <Chip
                  key={coin}
                  label={coin}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 20,
                    fontSize: 11,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1)
                    }
                  }}
                />
              ))}

              {news.impact === 'high' && (
                <Chip
                  label="高影响"
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: 11,
                    backgroundColor: alpha('#ff4757', 0.1),
                    color: '#ff4757'
                  }}
                />
              )}
            </Box>

            {/* 标签和分类 */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
              {/* 分类标签 */}
              <Chip
                label={
                  news.category === 'market' ? '市场' :
                  news.category === 'technology' ? '技术' :
                  news.category === 'regulation' ? '监管' :
                  news.category === 'defi' ? 'DeFi' :
                  news.category === 'nft' ? 'NFT' : '其他'
                }
                size="small"
                color="primary"
                variant="filled"
                sx={{
                  height: 18,
                  fontSize: 10,
                  fontWeight: 600
                }}
              />

              {/* 标签 */}
              {news.tags?.slice(0, 2).map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  variant="outlined"
                  sx={{
                    height: 18,
                    fontSize: 10,
                    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                    borderColor: alpha(theme.palette.secondary.main, 0.2),
                    color: theme.palette.secondary.main,
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.secondary.main, 0.1)
                    }
                  }}
                />
              ))}

              {news.tags?.length > 2 && (
                <Typography variant="caption" color="text.secondary">
                  +{news.tags.length - 2}
                </Typography>
              )}
            </Box>
          </Box>

          <IconButton
            size="small"
            sx={{ opacity: 0.7, '&:hover': { opacity: 1 } }}
            onClick={() => onNewsClick(news)}
          >
            <OpenInNew sx={{ fontSize: 16 }} />
          </IconButton>
        </Box>
      </Box>
      
      {!isLast && <Divider sx={{ opacity: 0.3 }} />}
    </Box>
  );
};

// 主要新闻组件
const CryptoNews = ({ maxItems = 4, showHeader = true }) => {
  const theme = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [newsDetailOpen, setNewsDetailOpen] = useState(false);

  useEffect(() => {
    // 模拟加载新闻数据
    setNews(mockNewsData.slice(0, maxItems));
  }, [maxItems]);

  const handleRefresh = () => {
    setLoading(true);
    // 模拟刷新延迟
    setTimeout(() => {
      setNews([...mockNewsData].sort(() => Math.random() - 0.5).slice(0, maxItems));
      setLoading(false);
    }, 1000);
  };

  const handleNewsClick = (newsItem) => {
    setSelectedNews(newsItem);
    setNewsDetailOpen(true);
  };

  const handleCloseNewsDetail = () => {
    setNewsDetailOpen(false);
    setSelectedNews(null);
  };

  return (
    <Card sx={{
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* 头部 */}
      {showHeader && (
        <CardContent sx={{ pb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
              📰 Crypto News
            </Typography>
            <IconButton 
              size="small" 
              onClick={handleRefresh} 
              disabled={loading}
              sx={{
                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                '&:hover': {
                  backgroundColor: alpha(theme.palette.primary.main, 0.2)
                }
              }}
            >
              <Refresh sx={{ 
                fontSize: 16,
                animation: loading ? 'spin 1s linear infinite' : 'none',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' }
                }
              }} />
            </IconButton>
          </Box>
        </CardContent>
      )}

      {/* 新闻列表 */}
      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        {news.map((item, index) => (
          <NewsItem
            key={item.id}
            news={item}
            isLast={index === news.length - 1}
            onNewsClick={handleNewsClick}
          />
        ))}
      </Box>

      {/* 新闻详情弹窗 */}
      <NewsDetail
        open={newsDetailOpen}
        onClose={handleCloseNewsDetail}
        newsItem={selectedNews}
      />

      {/* 底部 */}
      <Box sx={{ p: 2, pt: 1, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
        <Button
          fullWidth
          size="small"
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            color: theme.palette.primary.main
          }}
        >
          查看更多新闻 →
        </Button>
      </Box>
    </Card>
  );
};

export default CryptoNews;
