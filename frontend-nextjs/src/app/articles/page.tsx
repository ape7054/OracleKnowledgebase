/**
 * Articles Page - 技术文章页面
 * 
 * 性能优化措施:
 * 1. ✅ 移除1.2秒故意延迟
 * 2. ✅ 使用按需导入Material-UI组件
 * 3. ✅ 添加loading.tsx使用LoadingPage组件
 * 4. ✅ 添加预加载支持
 * 5. ✅ 简化数据加载逻辑
 */
'use client';
import React, { useState, useEffect } from 'react';
// 优化导入：按需导入Material-UI组件
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import Article from '@mui/icons-material/Article';
import Schedule from '@mui/icons-material/Schedule';
import Visibility from '@mui/icons-material/Visibility';
import ThumbUp from '@mui/icons-material/ThumbUp';
import Share from '@mui/icons-material/Share';
import Bookmark from '@mui/icons-material/Bookmark';
import Search from '@mui/icons-material/Search';
import Home from '@mui/icons-material/Home';
import Edit from '@mui/icons-material/Edit';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/common/LoadingPage';

interface ArticleItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  tags: string[];
  category: string;
  featured: boolean;
}

export default function ArticlesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // 模拟文章数据
  const [articles, setArticles] = useState<ArticleItem[]>([]);

  // 模拟页面加载
  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      
      // 移除故意延迟，提升用户体验
      
      const mockArticles: ArticleItem[] = [
    {
      id: '1',
      title: 'Next.js 14 应用路由器完全指南',
      excerpt: '深入探讨 Next.js 14 的新特性，包括应用路由器、服务端组件、以及性能优化策略。本文将带您从基础到高级，全面掌握现代 React 开发。',
      content: '详细内容...',
      author: '前端开发者',
      publishedAt: new Date().toISOString(),
      readTime: 8,
          views: 1234,
      likes: 89,
          tags: ['Next.js', 'React', 'Web开发'],
          category: '前端开发',
      featured: true
    },
    {
      id: '2',
          title: 'TypeScript 高级类型系统深度解析',
          excerpt: '探索 TypeScript 的高级特性，包括条件类型、映射类型、模板字面量类型等。通过实际案例学习如何构建类型安全的应用程序。',
      content: '详细内容...',
          author: '全栈工程师',
      publishedAt: new Date(Date.now() - 86400000).toISOString(),
      readTime: 12,
          views: 987,
      likes: 67,
      tags: ['TypeScript', '类型系统', '编程'],
          category: '编程语言',
      featured: false
    },
      ];
      
      setArticles(mockArticles);
      setLoading(false);
    };

    loadArticles();
  }, []);

  // 使用新的LoadingPage组件
  if (loading) {
    return (
      <LoadingPage 
        variant="default"
      />
    );
  }

  const categories = ['all', '技术教程', '技术深度', '新兴技术', '前端设计'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  const handleArticleClick = (articleId: string) => {
    alert(`跳转到文章详情页: ${articleId}`);
    // 这里可以导航到文章详情页
    // router.push(`/articles/${articleId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            技术文章
          </Typography>
          <Typography variant="body1" color="text.secondary">
            分享编程经验、技术见解和学习心得
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
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
          
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => alert('写文章功能开发中...')}
            sx={{
              background: 'linear-gradient(45deg, #00ffff, #0099cc)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0099cc, #00ffff)',
              },
            }}
          >
            写文章
          </Button>
        </Stack>
      </Box>

      {/* Search and Filter */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: 'rgba(26, 31, 46, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 255, 0.1)',
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} alignItems="center">
          <TextField
            placeholder="搜索文章..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ flex: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: '#00ffff' }} />
                </InputAdornment>
              ),
            }}
          />
          
          <Stack direction="row" spacing={1}>
            {categories.map((category) => (
              <Chip
                key={category}
                label={category === 'all' ? '全部' : category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                sx={{
                  borderColor: selectedCategory === category ? '#00ffff' : 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: selectedCategory === category ? '#00ffff' : 'transparent',
                  color: selectedCategory === category ? '#000' : '#fff',
                  '&:hover': {
                    backgroundColor: selectedCategory === category ? '#00cccc' : 'rgba(0, 255, 255, 0.1)',
                  },
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Paper>

      {/* Featured Article */}
      {filteredArticles.find(article => article.featured) && (
        <Paper
          sx={{
            mb: 4,
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 255, 0.3)',
          }}
        >
          <Box p={4}>
            <Box display="flex" alignItems="center" mb={2}>
              <Chip
                label="精选文章"
                sx={{
                  backgroundColor: '#00ffff',
                  color: '#000',
                  fontWeight: 600,
                }}
              />
            </Box>
            
            {(() => {
              const featured = filteredArticles.find(article => article.featured)!;
              return (
                <Box
                  onClick={() => handleArticleClick(featured.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <Typography variant="h5" fontWeight="bold" gutterBottom>
                    {featured.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                    {featured.excerpt}
                  </Typography>

                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" alignItems="center" spacing={2}>
                      <Avatar sx={{ width: 32, height: 32 }}>
                        {featured.author[0]}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" fontWeight="500">
                          {featured.author}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatTimeAgo(featured.publishedAt)}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={3}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Schedule sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {featured.readTime} 分钟阅读
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Visibility sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {featured.views}
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <ThumbUp sx={{ fontSize: 16 }} />
                        <Typography variant="caption">
                          {featured.likes}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Box>
              );
            })()}
          </Box>
        </Paper>
      )}

      {/* Articles List */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gap: 3,
        }}
      >
        {filteredArticles.filter(article => !article.featured).map((article) => (
          <Card
            key={article.id}
            onClick={() => handleArticleClick(article.id)}
            sx={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
              transition: 'all 0.3s ease-in-out',
              cursor: 'pointer',
              '&:hover': {
                transform: 'translateY(-4px)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Chip
                  label={article.category}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0, 255, 255, 0.2)',
                    color: '#00ffff',
                    border: '1px solid rgba(0, 255, 255, 0.3)',
                  }}
                />
                <Typography variant="caption" color="text.secondary">
                  {formatTimeAgo(article.publishedAt)}
                </Typography>
              </Box>

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {article.title}
              </Typography>

              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mb: 2, 
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {article.excerpt}
              </Typography>

              <Stack direction="row" spacing={1} mb={2}>
                {article.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    size="small"
                    variant="outlined"
                    sx={{
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                      color: 'text.secondary',
                      fontSize: '0.7rem',
                    }}
                  />
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar sx={{ width: 24, height: 24, fontSize: '0.8rem' }}>
                    {article.author[0]}
                  </Avatar>
                  <Typography variant="caption" color="text.secondary">
                    {article.author}
                  </Typography>
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Schedule sx={{ fontSize: 14 }} />
                    <Typography variant="caption" color="text.secondary">
                      {article.readTime}分钟
                    </Typography>
                  </Stack>
                  
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Visibility sx={{ fontSize: 14 }} />
                    <Typography variant="caption" color="text.secondary">
                      {article.views}
                    </Typography>
                  </Stack>

                  <IconButton 
                    size="small" 
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('收藏功能开发中...');
                    }}
                  >
                    <Bookmark sx={{ fontSize: 16 }} />
                  </IconButton>

                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      alert('分享功能开发中...');
                    }}
                  >
                    <Share sx={{ fontSize: 16 }} />
                  </IconButton>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {filteredArticles.length === 0 && (
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'rgba(26, 31, 46, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            未找到相关文章
          </Typography>
          <Typography variant="body2" color="text.secondary">
            请尝试调整搜索关键词或选择其他分类
          </Typography>
        </Paper>
      )}
    </Container>
  );
} 