'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Paper,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Stack,
  InputAdornment,
  TextField,
  Tab,
  Tabs,
  Avatar,
  Skeleton,
} from '@mui/material';
import {
  Article,
  Search,
  Home,
  AccessTime,
  Visibility,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  author: string;
  publishedAt: string;
  category: string;
  readTime: number;
  views: number;
  tags: string[];
  sentiment?: 'positive' | 'negative' | 'neutral';
}

export default function NewsPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);

  const categories = ['全部', '市场分析', '技术解读', '政策动态', '行业趋势'];

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockNews: NewsItem[] = [
        {
          id: '1',
          title: 'Bitcoin突破50000美元大关，市场情绪回暖',
          description: '比特币价格在经历数月低迷后重新突破重要阻力位，分析师认为牛市可能正在到来...',
          image: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400',
          author: '加密分析师',
          publishedAt: new Date().toISOString(),
          category: '市场分析',
          readTime: 3,
          views: 1254,
          tags: ['Bitcoin', '价格', '突破'],
          sentiment: 'positive'
        },
        {
          id: '2',
          title: '以太坊2.0升级完成，网络性能大幅提升',
          description: '以太坊完成重大升级，交易速度提升10倍，gas费用显著降低...',
          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400',
          author: '技术专家',
          publishedAt: new Date(Date.now() - 86400000).toISOString(),
          category: '技术解读',
          readTime: 5,
          views: 892,
          tags: ['Ethereum', '升级', 'ETH2.0'],
          sentiment: 'positive'
        }
      ];
      
      setNews(mockNews);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 0 || item.category === categories[selectedCategory];
    return matchesSearch && matchesCategory;
  });

  const getSentimentColor = (sentiment: string | undefined) => {
    switch (sentiment) {
      case 'positive': return '#4caf50';
      case 'negative': return '#f44336';
      default: return '#ff9800';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}天前`;
    if (hours > 0) return `${hours}小时前`;
    return '刚刚';
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            加密资讯
          </Typography>
          <Typography variant="body1" color="text.secondary">
            获取最新的区块链和加密货币资讯
          </Typography>
        </Box>
        
        <Button
          variant="outlined"
          startIcon={<Home />}
          onClick={() => router.push('/')}
          sx={{
            borderColor: '#00ffff',
            color: '#00ffff',
            '&:hover': {
              borderColor: '#0099cc',
              backgroundColor: 'rgba(0, 255, 255, 0.1)',
            },
          }}
        >
          返回首页
        </Button>
      </Box>

      <Paper sx={{ p: 3, mb: 4, background: 'rgba(26, 31, 46, 0.6)', backdropFilter: 'blur(10px)' }}>
        <TextField
          placeholder="搜索新闻..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: '#00ffff' }} />
              </InputAdornment>
            ),
          }}
        />
        
        <Box mt={2}>
          <Tabs
            value={selectedCategory}
            onChange={(_, newValue) => setSelectedCategory(newValue)}
            sx={{
              '& .Mui-selected': { color: '#00ffff' },
              '& .MuiTabs-indicator': { backgroundColor: '#00ffff' },
            }}
          >
            {categories.map((category, index) => (
              <Tab key={index} label={category} />
            ))}
          </Tabs>
        </Box>
      </Paper>

      {loading ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Card key={index} sx={{ background: 'rgba(26, 31, 46, 0.6)' }}>
              <Skeleton variant="rectangular" height={200} />
              <CardContent>
                <Skeleton variant="text" height={40} />
                <Skeleton variant="text" height={60} />
              </CardContent>
            </Card>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
          }}
        >
          {filteredNews.map((item) => (
            <Card
              key={item.id}
              sx={{
                height: '100%',
                background: 'rgba(26, 31, 46, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                },
              }}
            >
                {item.image && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                )}
                
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    <Chip
                      size="small"
                      label={item.category}
                      sx={{
                        backgroundColor: getSentimentColor(item.sentiment),
                        color: 'white',
                      }}
                    />
                    <Box flexGrow={1} />
                    <Typography variant="caption" color="text.secondary">
                      {formatTimeAgo(item.publishedAt)}
                    </Typography>
                  </Box>

                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {item.description}
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Avatar sx={{ width: 24, height: 24 }}>
                        {item.author[0]}
                      </Avatar>
                      <Typography variant="caption" color="text.secondary">
                        {item.author}
                      </Typography>
                    </Stack>

                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <AccessTime sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {item.readTime}分钟
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Visibility sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {item.views}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </CardContent>
            </Card>
          ))}
        </Box>
      )}

      {filteredNews.length === 0 && !loading && (
        <Paper sx={{ p: 6, textAlign: 'center', background: 'rgba(26, 31, 46, 0.6)' }}>
          <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            未找到相关新闻
          </Typography>
        </Paper>
      )}
    </Container>
  );
} 