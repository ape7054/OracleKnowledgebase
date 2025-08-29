import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  Avatar,
  Stack,
  Chip,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Fab
} from '@mui/material';
import {
  Article,
  Code,
  School,
  Psychology,
  GitHub,
  Email,
  Palette,
  ArrowForward,
  PlayArrow
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedStyle, setSelectedStyle] = useState('minimal');

  // 风格1：极简学者风 📚
  const MinimalStyle = () => (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* 简洁的个人信息 */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Avatar 
                sx={{
            width: 120, 
            height: 120, 
            mx: 'auto', 
            mb: 3,
            bgcolor: '#1976d2',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          LS
        </Avatar>
        
        <Typography variant="h3" sx={{ fontWeight: 300, mb: 2, color: theme.palette.text.primary }}>
          LearningStack
              </Typography>
        
        <Typography variant="h6" sx={{ color: theme.palette.text.secondary, mb: 4, fontWeight: 400 }}>
          全栈开发者 • 技术学习者 • 经验分享者
              </Typography>
        
        <Typography variant="body1" sx={{ 
          maxWidth: 600, 
                mx: 'auto',
                lineHeight: 1.8,
          color: theme.palette.text.secondary,
          mb: 4
        }}>
          专注于现代Web开发技术，记录学习过程中的思考与实践。
          在这里分享技术文章、项目经验和成长心得。
            </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button
                variant="contained"
            startIcon={<Article />}
            onClick={() => navigate('/news')}
            sx={{ borderRadius: '8px' }}
          >
            阅读文章
              </Button>
              <Button
                variant="outlined"
            startIcon={<GitHub />}
            sx={{ borderRadius: '8px' }}
          >
            GitHub
              </Button>
            </Stack>
      </Box>

      {/* 简洁的统计 */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        {[
          { value: '50+', label: '技术文章', icon: <Article /> },
          { value: '12+', label: '项目经验', icon: <Code /> },
          { value: '365', label: '学习天数', icon: <School /> },
          { value: '10+', label: '技术栈', icon: <Psychology /> }
        ].map((stat, index) => (
          <Grid item xs={6} md={3} key={index}>
            <Paper sx={{ 
              p: 3, 
              textAlign: 'center', 
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: 'none'
            }}>
              <Box sx={{ color: theme.palette.primary.main, mb: 1 }}>
                      {stat.icon}
                    </Box>
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                      {stat.value}
                    </Typography>
              <Typography variant="body2" color="text.secondary">
                      {stat.label}
                    </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* 最新文章预览 */}
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 300 }}>
        最新文章
      </Typography>
      <Grid container spacing={3}>
        {[
          { title: 'React Hooks 实战指南', desc: '深入理解React Hooks的工作原理和最佳实践', tags: ['React', '前端'] },
          { title: 'Go语言并发编程', desc: 'goroutine和channel的使用技巧和性能优化', tags: ['Go', '后端'] },
          { title: 'Docker容器化最佳实践', desc: '从开发到生产环境的Docker使用经验分享', tags: ['DevOps', 'Docker'] }
        ].map((article, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Card sx={{ 
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
              transition: 'box-shadow 0.3s ease'
            }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {article.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {article.desc}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {article.tags.map(tag => (
                    <Chip key={tag} label={tag} size="small" />
                  ))}
                </Stack>
              </CardContent>
            </Card>
                </Grid>
              ))}
            </Grid>
    </Container>
  );

  // 风格2：温暖个人风 🏠
  const WarmStyle = () => (
    <Box sx={{
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
        : 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      minHeight: '100vh',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* 温暖的欢迎区域 */}
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          background: theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.05)'
            : 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          p: 6,
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="h2" sx={{ 
            fontWeight: 700, 
            background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
            mb: 2
          }}>
            👋 你好，我是小李
          </Typography>
          
          <Typography variant="h5" sx={{ 
            color: theme.palette.text.secondary, 
            fontWeight: 300,
            mb: 4
          }}>
            一个热爱学习的程序员
              </Typography>

          <Typography variant="body1" sx={{ 
            fontSize: '1.1rem',
            lineHeight: 1.8,
                  color: theme.palette.text.secondary,
            maxWidth: 600,
                  mx: 'auto',
            mb: 4
          }}>
            🌱 每天都在学习新东西 <br/>
            💻 用代码记录成长轨迹 <br/>
            📝 分享路上的点点滴滴
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
            <Button 
              variant="contained" 
              size="large"
              onClick={() => navigate('/news')}
              sx={{ 
                borderRadius: '50px',
                px: 4,
                background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
                boxShadow: '0 4px 15px rgba(255,107,107,0.3)'
              }}
            >
              看看我的文章 📖
            </Button>
            <Button 
              variant="outlined" 
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{ borderRadius: '50px', px: 4 }}
            >
              了解更多 🤔
            </Button>
          </Stack>
            </Box>

        {/* 可爱的特色卡片 */}
        <Grid container spacing={4}>
          {[
            { title: '💡 学习笔记', desc: '记录每天的学习收获和思考', color: '#ff6b6b' },
            { title: '🚀 项目实战', desc: '分享开发经验和踩坑记录', color: '#4ecdc4' },
            { title: '🎯 技能成长', desc: '追踪技术能力提升轨迹', color: '#45b7d1' }
          ].map((item, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{
                borderRadius: '20px',
                    background: theme.palette.mode === 'dark'
                  ? 'rgba(255,255,255,0.05)'
                  : 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(10px)',
                border: `2px solid ${item.color}20`,
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                    '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: `0 12px 24px ${item.color}30`
                }
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
                    {item.title}
                      </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {item.desc}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
      </Container>
          </Box>
  );

  // 风格3：技术极客风 ⚡
  const GeekStyle = () => (
    <Box sx={{
      background: 'linear-gradient(135deg, #0c1421 0%, #1a1a2e 100%)',
      color: '#e0e0e0',
      minHeight: '100vh',
      position: 'relative'
    }}>
      {/* 科技感背景 */}
      <Box sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300ffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        opacity: 0.3
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', py: 8 }}>
        {/* 极客风格标题 */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h6" sx={{ 
            color: '#00ffff', 
            fontFamily: 'monospace',
            mb: 2 
          }}>
            {'> whoami'}
                      </Typography>

          <Typography variant="h1" sx={{ 
            fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '4rem' },
            background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            fontFamily: 'monospace'
          }}>
            ./learning_stack
                      </Typography>

          <Typography variant="h5" sx={{ 
            color: '#a0a0a0',
            fontFamily: 'monospace',
            mb: 4
          }}>
            Full-Stack Developer & Tech Enthusiast
                          </Typography>

          <Box sx={{ 
            background: 'rgba(0,255,255,0.1)', 
            border: '1px solid #00ffff40',
            borderRadius: '8px',
            p: 3,
            fontFamily: 'monospace',
            mb: 4
          }}>
            <Typography variant="body1" sx={{ color: '#00ffff' }}>
              {'$ cat about.txt'}<br/>
              {'> 专注全栈开发，热爱开源技术'}<br/>
              {'> 用代码改变世界，用文字记录成长'}<br/>
              {'> console.log("Hello World!");'}
                          </Typography>
                        </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button 
              variant="outlined" 
              onClick={() => navigate('/news')}
              sx={{ 
                borderColor: '#00ffff',
                color: '#00ffff',
                fontFamily: 'monospace',
                '&:hover': {
                  backgroundColor: '#00ffff20',
                  boxShadow: '0 0 20px #00ffff40'
                }
              }}
            >
              git clone articles
            </Button>
            <Button 
              variant="outlined"
              onClick={() => navigate('/account')}
                          sx={{
                borderColor: '#ff00ff',
                color: '#ff00ff',
                fontFamily: 'monospace',
                            '&:hover': {
                  backgroundColor: '#ff00ff20',
                  boxShadow: '0 0 20px #ff00ff40'
                            }
                          }}
                        >
              npm run skills
            </Button>
          </Stack>
                      </Box>

        {/* 代码风格的状态面板 */}
        <Grid container spacing={3}>
          {[
            { key: 'articles', value: '50+', unit: 'posts', color: '#00ffff' },
            { key: 'projects', value: '12+', unit: 'repos', color: '#ff6b35' },
            { key: 'commits', value: '365', unit: 'days', color: '#45b7d1' },
            { key: 'skills', value: '10+', unit: 'techs', color: '#ff00ff' }
          ].map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Paper sx={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${stat.color}40`,
                borderRadius: '12px',
                p: 3,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: `0 8px 32px ${stat.color}30`,
                  transform: 'translateY(-4px)'
                }
              }}>
                <Typography variant="h6" sx={{ 
                  color: stat.color,
                  fontFamily: 'monospace',
                  fontSize: '0.9rem',
                  mb: 1
                }}>
                  {stat.key}:
                </Typography>
                <Typography variant="h3" sx={{ 
                  color: '#ffffff',
                  fontWeight: 800,
                  mb: 1
                }}>
                  {stat.value}
                </Typography>
                <Typography variant="caption" sx={{ 
                  color: '#a0a0a0',
                  fontFamily: 'monospace'
                }}>
                  {stat.unit}
                </Typography>
              </Paper>
                </Grid>
              ))}
            </Grid>
      </Container>
    </Box>
  );

  const renderStyle = () => {
    switch (selectedStyle) {
      case 'warm': return <WarmStyle />;
      case 'geek': return <GeekStyle />;
      default: return <MinimalStyle />;
    }
  };

  return (
    <>
      {/* 风格切换控制器 */}
      <Fab
        sx={{
          position: 'fixed',
          bottom: 80,
          right: 24,
          zIndex: 1000,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        onClick={() => {
          const styles = ['minimal', 'warm', 'geek'];
          const currentIndex = styles.indexOf(selectedStyle);
          const nextIndex = (currentIndex + 1) % styles.length;
          setSelectedStyle(styles[nextIndex]);
        }}
      >
        <Palette />
      </Fab>

      {/* 风格标识 */}
      <Box sx={{
        position: 'fixed',
        top: 120,
        right: 24,
        zIndex: 1000,
      }}>
        <Chip 
          label={
            selectedStyle === 'minimal' ? '📚 极简风格' :
            selectedStyle === 'warm' ? '🏠 温暖风格' : '⚡ 极客风格'
          }
          sx={{
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(10px)',
            fontWeight: 600,
          }}
        />
      </Box>

      {renderStyle()}
    </>
  );
};

export default Home;