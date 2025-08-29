import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  IconButton,
  Button,
  Stack,
  Avatar,
  Paper,
  Divider,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Terminal,
  Code,
  Schedule,
  Visibility,
  Comment,
  Search,
  FilterList,
  Refresh,
  Edit,
  Star,
  TrendingUp,
  GitHub,
  Launch
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Articles = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 模拟文章数据 - 后续可以从API获取
  const mockArticles = [
    {
      id: 1,
      title: 'React Hooks 深度解析：从基础到进阶',
      summary: '详细介绍React Hooks的工作原理，包括useState、useEffect等常用Hook的最佳实践。',
      content: '# React Hooks 深度解析...',
      category: '前端开发',
      tags: ['React', 'JavaScript', 'Hooks'],
      author: 'Learning Walker',
      readTime: 8,
      views: 234,
      comments: 12,
      likes: 45,
      publishDate: '2024-12-20',
      status: 'published',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'Go语言并发编程：goroutine与channel实战',
      summary: '通过实际案例学习Go语言的并发特性，掌握goroutine和channel的使用技巧。',
      content: '# Go并发编程...',
      category: '后端开发',
      tags: ['Go', '并发编程', '后端'],
      author: 'Learning Walker',
      readTime: 12,
      views: 189,
      comments: 8,
      likes: 32,
      publishDate: '2024-12-18',
      status: 'published',
      difficulty: 'advanced'
    },
    {
      id: 3,
      title: 'Docker容器化最佳实践：从开发到生产',
      summary: '分享Docker在实际项目中的使用经验，包括镜像优化、容器编排等核心技能。',
      content: '# Docker最佳实践...',
      category: 'DevOps',
      tags: ['Docker', '容器化', 'DevOps'],
      author: 'Learning Walker',
      readTime: 10,
      views: 156,
      comments: 6,
      likes: 28,
      publishDate: '2024-12-15',
      status: 'published',
      difficulty: 'intermediate'
    },
    {
      id: 4,
      title: 'MySQL性能优化实战指南',
      summary: '深入MySQL查询优化、索引设计、表结构优化等性能调优技巧。',
      content: '# MySQL优化...',
      category: '数据库',
      tags: ['MySQL', '性能优化', '数据库'],
      author: 'Learning Walker',
      readTime: 15,
      views: 298,
      comments: 15,
      likes: 67,
      publishDate: '2024-12-12',
      status: 'published',
      difficulty: 'advanced'
    },
    {
      id: 5,
      title: '从零搭建全栈项目：Learning Stack 开发日记',
      summary: '记录本博客系统的完整开发过程，包括技术选型、架构设计、功能实现等。',
      content: '# 项目开发日记...',
      category: '项目实战',
      tags: ['全栈开发', 'React', 'Go', '项目管理'],
      author: 'Learning Walker',
      readTime: 20,
      views: 445,
      comments: 23,
      likes: 89,
      publishDate: '2024-12-10',
      status: 'published',
      difficulty: 'intermediate'
    }
  ];

  const categories = ['all', '前端开发', '后端开发', '数据库', 'DevOps', '项目实战', '学习心得'];

  const filteredArticles = mockArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#00ff88';
      case 'intermediate': return '#ffa500';
      case 'advanced': return '#ff4757';
      default: return '#a4b0be';
    }
  };

  const getCommandPrefix = (category) => {
    switch (category) {
      case '前端开发': return 'npm run';
      case '后端开发': return 'go run';
      case '数据库': return 'mysql>';
      case 'DevOps': return 'docker';
      default: return 'cat';
    }
  };

  return (
    <Box sx={{
      background: 'linear-gradient(135deg, #0c1421 0%, #1a1a2e 100%)',
      minHeight: '100vh',
      color: '#e0e0e0',
      position: 'relative'
    }}>
      {/* 科技感背景网格 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h30v30H0zM30 30h30v30H30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.2
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* 终端风格标题 */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ 
            color: '#00ffff', 
            fontFamily: 'monospace',
            mb: 1
          }}>
            {'> ls -la ./articles/'}
          </Typography>
          
          <Typography variant="h3" sx={{ 
            fontWeight: 800,
            background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: 'monospace',
            mb: 2
          }}>
            技术文章档案库
          </Typography>

          <Typography variant="body1" sx={{ 
            color: '#a0a0a0',
            fontFamily: 'monospace',
            mb: 4
          }}>
            {'# 记录技术学习的每一步足迹，分享实战经验和踩坑心得'}
          </Typography>

          {/* 终端风格的搜索和筛选 */}
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 4 }}>
            <TextField
              placeholder="搜索文章标题或内容..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: '#00ffff' }} />
                  </InputAdornment>
                ),
                sx: {
                  background: 'rgba(0,255,255,0.05)',
                  border: '1px solid #00ffff40',
                  borderRadius: '8px',
                  color: '#e0e0e0',
                  fontFamily: 'monospace',
                  '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                  '&:hover': {
                    boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)'
                  }
                }
              }}
              sx={{ flex: 1, maxWidth: 400 }}
            />

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
              {categories.map(category => (
                <Chip
                  key={category}
                  label={category === 'all' ? 'all' : category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'filled' : 'outlined'}
                  sx={{
                    fontFamily: 'monospace',
                    border: '1px solid #00ffff40',
                    color: selectedCategory === category ? '#000' : '#00ffff',
                    backgroundColor: selectedCategory === category ? '#00ffff' : 'transparent',
                    '&:hover': {
                      boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                    }
                  }}
                />
              ))}
            </Stack>
          </Stack>

          {/* 统计信息 */}
          <Paper sx={{
            background: 'rgba(0,255,255,0.05)',
            border: '1px solid #00ffff40',
            borderRadius: '12px',
            p: 3,
            mb: 4
          }}>
            <Stack direction="row" spacing={4} sx={{ fontFamily: 'monospace' }}>
              <Box>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  total_articles:
                </Typography>
                <Typography variant="h6" sx={{ color: '#00ffff', fontWeight: 800 }}>
                  {filteredArticles.length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  total_views:
                </Typography>
                <Typography variant="h6" sx={{ color: '#ff6b35', fontWeight: 800 }}>
                  {mockArticles.reduce((sum, article) => sum + article.views, 0)}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ color: '#a0a0a0' }}>
                  total_likes:
                </Typography>
                <Typography variant="h6" sx={{ color: '#ff00ff', fontWeight: 800 }}>
                  {mockArticles.reduce((sum, article) => sum + article.likes, 0)}
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>

        {/* 文章列表 */}
        <Grid container spacing={3}>
          {filteredArticles.map((article, index) => (
            <Grid item xs={12} md={6} lg={4} key={article.id}>
              <Card sx={{
                background: 'rgba(255,255,255,0.02)',
                backdropFilter: 'blur(10px)',
                border: '1px solid #333',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  border: '1px solid #00ffff60',
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.15)',
                  transform: 'translateY(-4px)',
                  '& .article-title': {
                    color: '#00ffff'
                  }
                }
              }}>
                <CardContent sx={{ p: 3 }}>
                  {/* 文章头部信息 */}
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
                    <Typography variant="caption" sx={{ 
                      color: '#a0a0a0',
                      fontFamily: 'monospace'
                    }}>
                      {getCommandPrefix(article.category)} {article.category.toLowerCase()}
                    </Typography>
                    
                    <Chip 
                      label={article.difficulty}
                      size="small"
                      sx={{
                        background: getDifficultyColor(article.difficulty) + '20',
                        color: getDifficultyColor(article.difficulty),
                        border: `1px solid ${getDifficultyColor(article.difficulty)}40`,
                        fontFamily: 'monospace',
                        fontSize: '0.7rem'
                      }}
                    />
                  </Stack>

                  {/* 文章标题 */}
                  <Typography 
                    variant="h6" 
                    className="article-title"
                    sx={{ 
                      fontWeight: 600, 
                      mb: 2, 
                      color: '#e0e0e0',
                      transition: 'color 0.3s ease',
                      lineHeight: 1.4
                    }}
                  >
                    {article.title}
                  </Typography>

                  {/* 文章摘要 */}
                  <Typography variant="body2" sx={{ 
                    color: '#a0a0a0',
                    mb: 3,
                    lineHeight: 1.6,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.summary}
                  </Typography>

                  {/* 标签 */}
                  <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                    {article.tags.map(tag => (
                      <Chip 
                        key={tag}
                        label={`#${tag}`}
                        size="small"
                        sx={{
                          background: 'rgba(0,255,255,0.1)',
                          color: '#00ffff',
                          fontFamily: 'monospace',
                          fontSize: '0.7rem',
                          border: '1px solid #00ffff30',
                          '&:hover': {
                            background: 'rgba(0,255,255,0.2)'
                          }
                        }}
                      />
                    ))}
                  </Stack>

                  <Divider sx={{ borderColor: '#333', mb: 2 }} />

                  {/* 文章统计 */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Stack direction="row" spacing={3}>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Schedule sx={{ fontSize: 16, color: '#a0a0a0' }} />
                        <Typography variant="caption" sx={{ 
                          color: '#a0a0a0',
                          fontFamily: 'monospace'
                        }}>
                          {article.readTime}min
                        </Typography>
                      </Stack>
                      
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Visibility sx={{ fontSize: 16, color: '#a0a0a0' }} />
                        <Typography variant="caption" sx={{ 
                          color: '#a0a0a0',
                          fontFamily: 'monospace'
                        }}>
                          {article.views}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Star sx={{ fontSize: 16, color: '#ffa500' }} />
                        <Typography variant="caption" sx={{ 
                          color: '#a0a0a0',
                          fontFamily: 'monospace'
                        }}>
                          {article.likes}
                        </Typography>
                      </Stack>
                    </Stack>

                    <IconButton 
                      size="small"
                      sx={{ 
                        color: '#00ffff',
                        border: '1px solid #00ffff40',
                        '&:hover': {
                          background: 'rgba(0,255,255,0.1)',
                          boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)'
                        }
                      }}
                    >
                      <Launch fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 底部操作栏 */}
        <Box sx={{
          mt: 8,
          p: 3,
          background: 'rgba(0,255,255,0.05)',
          border: '1px solid #00ffff40',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
            <Typography variant="body1" sx={{ 
              color: '#a0a0a0',
              fontFamily: 'monospace'
            }}>
              $ echo "想要发布新文章吗？"
            </Typography>
            
            <Button
              variant="outlined"
              startIcon={<Edit />}
              onClick={() => navigate('/trade')}
              sx={{
                borderColor: '#00ffff',
                color: '#00ffff',
                fontFamily: 'monospace',
                '&:hover': {
                  backgroundColor: 'rgba(0,255,255,0.1)',
                  boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
                }
              }}
            >
              new article.md
            </Button>
            
            <Button
              variant="outlined"
              startIcon={<GitHub />}
              sx={{
                borderColor: '#ff00ff',
                color: '#ff00ff',
                fontFamily: 'monospace',
                '&:hover': {
                  backgroundColor: 'rgba(255,0,255,0.1)',
                  boxShadow: '0 0 15px rgba(255, 0, 255, 0.3)'
                }
              }}
            >
              git push origin
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Articles; 