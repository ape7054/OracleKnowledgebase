import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  PersonalVideo,
  TrendingUp,
  Star,
  Bookmark,
  Share,
  ThumbUp,
  Visibility,
  AutoAwesome,
  Psychology
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

// 个性化新闻推荐组件
const PersonalizedNews = () => {
  const theme = useTheme();
  const [userPreferences, setUserPreferences] = useState({
    favoriteCoins: ['BTC', 'ETH', 'SOL'],
    interests: ['DeFi', 'NFT', '技术分析'],
    readingHistory: ['market', 'technology', 'defi'],
    sentimentPreference: 'balanced' // positive, negative, balanced
  });

  const [recommendedNews, setRecommendedNews] = useState([]);
  const [recommendationScore, setRecommendationScore] = useState(0);

  // 模拟个性化推荐算法
  useEffect(() => {
    const generateRecommendations = () => {
      const mockRecommendations = [
        {
          id: 1,
          title: 'Bitcoin技术分析：突破关键阻力位',
          summary: '基于您对BTC和技术分析的关注，这篇文章分析了比特币的最新价格走势...',
          source: 'TechAnalysis',
          time: '1小时前',
          relevanceScore: 95,
          reasons: ['关注BTC', '喜欢技术分析', '相似阅读历史'],
          sentiment: 'positive',
          category: 'market',
          coins: ['BTC'],
          readTime: '3分钟'
        },
        {
          id: 2,
          title: 'DeFi协议创新：新的流动性挖矿机制',
          summary: '根据您对DeFi的兴趣，推荐这个关于创新流动性挖矿的深度分析...',
          source: 'DeFi Pulse',
          time: '2小时前',
          relevanceScore: 88,
          reasons: ['关注DeFi', '相关标签匹配'],
          sentiment: 'positive',
          category: 'defi',
          coins: ['DeFi'],
          readTime: '5分钟'
        },
        {
          id: 3,
          title: 'Solana生态最新发展动态',
          summary: '基于您对SOL的关注，为您推荐Solana生态系统的最新项目和发展...',
          source: 'Solana News',
          time: '3小时前',
          relevanceScore: 82,
          reasons: ['关注SOL', '生态发展'],
          sentiment: 'positive',
          category: 'technology',
          coins: ['SOL'],
          readTime: '4分钟'
        },
        {
          id: 4,
          title: 'NFT市场趋势分析报告',
          summary: '根据您对NFT的兴趣，这份详细的市场分析报告值得关注...',
          source: 'NFT Insider',
          time: '4小时前',
          relevanceScore: 76,
          reasons: ['关注NFT', '市场分析'],
          sentiment: 'neutral',
          category: 'nft',
          coins: ['NFT'],
          readTime: '6分钟'
        }
      ];

      setRecommendedNews(mockRecommendations);
      
      // 计算整体推荐分数
      const avgScore = mockRecommendations.reduce((sum, news) => sum + news.relevanceScore, 0) / mockRecommendations.length;
      setRecommendationScore(avgScore);
    };

    generateRecommendations();
  }, [userPreferences]);

  const getRelevanceColor = (score) => {
    if (score >= 90) return '#00ff88';
    if (score >= 80) return '#ffa502';
    if (score >= 70) return '#ff6b6b';
    return '#a4b0be';
  };

  const handleUpdatePreferences = (type, value) => {
    setUserPreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  return (
    <Card sx={{
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)',
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
      height: 'fit-content'
    }}>
      <CardContent>
        {/* 头部 */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <AutoAwesome sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="h6" sx={{ fontWeight: 600, flex: 1 }}>
            为您推荐
          </Typography>
          <Tooltip title="推荐准确度">
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Psychology sx={{ fontSize: 16, color: theme.palette.secondary.main }} />
              <Typography variant="caption" color="text.secondary">
                {Math.round(recommendationScore)}%
              </Typography>
            </Box>
          </Tooltip>
        </Box>

        {/* 用户偏好快速设置 */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            关注的代币
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {userPreferences.favoriteCoins.map(coin => (
              <Chip
                key={coin}
                label={coin}
                size="small"
                color="primary"
                variant="filled"
                onDelete={() => {
                  handleUpdatePreferences('favoriteCoins', 
                    userPreferences.favoriteCoins.filter(c => c !== coin)
                  );
                }}
              />
            ))}
            <Button size="small" variant="outlined" sx={{ height: 24, minWidth: 'auto' }}>
              +
            </Button>
          </Box>

          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            兴趣标签
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {userPreferences.interests.map(interest => (
              <Chip
                key={interest}
                label={interest}
                size="small"
                color="secondary"
                variant="outlined"
                onDelete={() => {
                  handleUpdatePreferences('interests', 
                    userPreferences.interests.filter(i => i !== interest)
                  );
                }}
              />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* 推荐新闻列表 */}
        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            个性化推荐
          </Typography>
          <List sx={{ p: 0 }}>
            {recommendedNews.map((news, index) => (
              <Box key={news.id}>
                <ListItem sx={{ px: 0, py: 1.5, alignItems: 'flex-start' }}>
                  <ListItemAvatar>
                    <Avatar sx={{ 
                      bgcolor: alpha(getRelevanceColor(news.relevanceScore), 0.2),
                      color: getRelevanceColor(news.relevanceScore),
                      width: 32,
                      height: 32
                    }}>
                      <Star sx={{ fontSize: 16 }} />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box>
                        <Typography variant="body2" sx={{ 
                          fontWeight: 600, 
                          mb: 0.5,
                          cursor: 'pointer',
                          '&:hover': { color: theme.palette.primary.main }
                        }}>
                          {news.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                          {news.summary}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <Box>
                        {/* 推荐原因 */}
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
                            推荐理由：
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {news.reasons.map((reason, idx) => (
                              <Chip
                                key={idx}
                                label={reason}
                                size="small"
                                sx={{
                                  height: 16,
                                  fontSize: 9,
                                  backgroundColor: alpha(theme.palette.info.main, 0.1),
                                  color: theme.palette.info.main
                                }}
                              />
                            ))}
                          </Box>
                        </Box>

                        {/* 相关性分数 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="caption" color="text.secondary">
                            相关性：
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={news.relevanceScore}
                            sx={{
                              flex: 1,
                              height: 4,
                              borderRadius: 2,
                              backgroundColor: alpha(theme.palette.divider, 0.2),
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: getRelevanceColor(news.relevanceScore)
                              }
                            }}
                          />
                          <Typography variant="caption" sx={{ 
                            color: getRelevanceColor(news.relevanceScore),
                            fontWeight: 600,
                            minWidth: 30
                          }}>
                            {news.relevanceScore}%
                          </Typography>
                        </Box>

                        {/* 元信息 */}
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="caption" color="text.secondary">
                              {news.source} • {news.time} • {news.readTime}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <IconButton size="small" sx={{ width: 24, height: 24 }}>
                              <Bookmark sx={{ fontSize: 12 }} />
                            </IconButton>
                            <IconButton size="small" sx={{ width: 24, height: 24 }}>
                              <Share sx={{ fontSize: 12 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < recommendedNews.length - 1 && <Divider sx={{ opacity: 0.3 }} />}
              </Box>
            ))}
          </List>
        </Box>

        {/* 底部操作 */}
        <Box sx={{ mt: 2, pt: 2, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Button
            fullWidth
            size="small"
            variant="outlined"
            startIcon={<PersonalVideo />}
            sx={{ textTransform: 'none' }}
          >
            调整推荐偏好
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PersonalizedNews;
