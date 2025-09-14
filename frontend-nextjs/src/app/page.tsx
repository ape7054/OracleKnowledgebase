'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  useTheme,
  Avatar,
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import {
  Article,
  Code,
  School,
  Psychology,
  ArrowForward,
  TrendingUp,
  Dashboard,
} from '@mui/icons-material';

export default function HomePage() {
  const router = useRouter();
  const theme = useTheme();

  const features = [
    {
      icon: <Code />,
      title: '技术学习',
      description: '深入学习前端、后端、区块链等技术',
      color: '#61dafb',
    },
    {
      icon: <Article />,
      title: '知识分享',
      description: '记录学习过程，分享技术见解',
      color: '#f06292',
    },
    {
      icon: <School />,
      title: '项目实践',
      description: '通过实际项目提升编程能力',
      color: '#ab47bc',
    },
    {
      icon: <Psychology />,
      title: '思维训练',
      description: '培养程序员的逻辑思维能力',
      color: '#26a69a',
    },
  ];

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          py: 8,
          background: `linear-gradient(135deg, 
            ${theme.palette.background.default} 0%, 
            rgba(0, 255, 255, 0.05) 50%, 
            ${theme.palette.background.default} 100%)`,
        }}
      >
        {/* 头部区域 */}
        <Box textAlign="center" mb={8}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #00ffff, #ff6b6b)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
            }}
          >
            LearningStack
          </Typography>
          
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            现代化的学习平台，记录技术成长之路
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 6, maxWidth: 800, mx: 'auto' }}
          >
            基于Next.js + Go的全栈学习平台，集成加密货币市场数据、实时交易模拟、技术文章分享等功能
          </Typography>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 6 }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<Dashboard />}
              endIcon={<ArrowForward />}
              onClick={() => handleNavigation('/dashboard')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                background: 'linear-gradient(45deg, #00ffff, #0099cc)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #0099cc, #00ffff)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              进入仪表板
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<TrendingUp />}
              onClick={() => handleNavigation('/trade')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: '#00ffff',
                color: '#00ffff',
                '&:hover': {
                  borderColor: '#0099cc',
                  backgroundColor: 'rgba(0, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              模拟交易
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Article />}
              onClick={() => handleNavigation('/news')}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: 3,
                borderColor: '#ff6b6b',
                color: '#ff6b6b',
                '&:hover': {
                  borderColor: '#ff5252',
                  backgroundColor: 'rgba(255, 107, 107, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
            >
              浏览资讯
            </Button>
          </Stack>
        </Box>

        {/* 功能特点 */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
            gap: 4,
            mb: 8,
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                background: 'rgba(26, 31, 46, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(0, 255, 255, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  border: '1px solid rgba(0, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 255, 255, 0.1)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2,
                    backgroundColor: feature.color,
                  }}
                >
                  {feature.icon}
                </Avatar>
                
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        {/* 项目技术栈 */}
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            background: 'rgba(26, 31, 46, 0.6)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
            技术栈
          </Typography>
          
          <Stack
            direction="row"
            flexWrap="wrap"
            spacing={1}
            justifyContent="center"
            sx={{ mb: 4 }}
          >
            {[
              'Next.js', 'React', 'TypeScript', 'Material-UI',
              'Go', 'Gin', 'MySQL', 'WebSocket',
              'Docker', 'JWT', 'CoinGecko API', 'Recharts'
            ].map((tech) => (
              <Chip
                key={tech}
                label={tech}
                variant="outlined"
                sx={{
                  borderColor: '#00ffff',
                  color: '#00ffff',
                  m: 0.5,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              />
            ))}
          </Stack>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            基于现代化技术栈构建的全栈学习平台
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            ✨ Next.js迁移版本 - 更快的加载速度，更好的SEO表现
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
} 