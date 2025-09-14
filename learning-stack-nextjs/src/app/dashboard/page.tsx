'use client';
import React from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Paper,
  Avatar,
  Stack,
  Chip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp,
  AccountBalanceWallet,
  Assessment,
  Logout,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/lib/context/AuthContext';

function DashboardContent() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const stats = [
    { title: '总资产', value: '$12,345', icon: <AccountBalanceWallet />, color: '#00ffff' },
    { title: '今日盈亏', value: '+$234', icon: <TrendingUp />, color: '#4caf50' },
    { title: '交易次数', value: '156', icon: <Assessment />, color: '#ff6b6b' },
    { title: '成功率', value: '78%', icon: <DashboardIcon />, color: '#ff9800' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" gutterBottom>
            仪表板
          </Typography>
          <Typography variant="body1" color="text.secondary">
            欢迎回来，{user?.username}！这里是您的交易概览
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => router.push('/trade')}
            sx={{
              borderColor: '#00ffff',
              color: '#00ffff',
              '&:hover': {
                borderColor: '#0099cc',
                backgroundColor: 'rgba(0, 255, 255, 0.1)',
              },
            }}
          >
            开始交易
          </Button>
          
          <Button
            variant="outlined"
            startIcon={<Logout />}
            onClick={logout}
            sx={{
              borderColor: '#ff6b6b',
              color: '#ff6b6b',
              '&:hover': {
                borderColor: '#f44336',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
              },
            }}
          >
            退出登录
          </Button>
        </Stack>
      </Box>

      {/* Stats Grid */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 3,
          mb: 4,
        }}
      >
        {stats.map((stat, index) => (
          <Card
            key={index}
            sx={{
              background: 'rgba(26, 31, 46, 0.6)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(0, 255, 255, 0.1)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                border: '1px solid rgba(0, 255, 255, 0.3)',
              },
            }}
          >
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar
                  sx={{
                    backgroundColor: stat.color,
                    mr: 2,
                    width: 48,
                    height: 48,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Quick Actions */}
      <Paper
        sx={{
          p: 4,
          background: 'rgba(26, 31, 46, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 255, 0.1)',
          mb: 4,
        }}
      >
        <Typography variant="h5" gutterBottom>
          快速操作
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          选择您想要执行的操作
        </Typography>
        
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
          <Button
            variant="contained"
            size="large"
            onClick={() => router.push('/trade')}
            sx={{
              background: 'linear-gradient(45deg, #00ffff, #0099cc)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0099cc, #00ffff)',
              },
            }}
          >
            模拟交易
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/news')}
            sx={{
              borderColor: '#ff6b6b',
              color: '#ff6b6b',
              '&:hover': {
                borderColor: '#f44336',
                backgroundColor: 'rgba(255, 107, 107, 0.1)',
              },
            }}
          >
            查看新闻
          </Button>
          
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/account')}
            sx={{
              borderColor: '#4caf50',
              color: '#4caf50',
              '&:hover': {
                borderColor: '#388e3c',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
              },
            }}
          >
            账户设置
          </Button>
        </Stack>
      </Paper>

      {/* Status */}
      <Paper
        sx={{
          p: 4,
          background: 'rgba(26, 31, 46, 0.6)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 255, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography variant="h6" gutterBottom>
          系统状态
        </Typography>
        
        <Stack 
          direction="row" 
          spacing={1} 
          justifyContent="center"
          flexWrap="wrap"
          sx={{ mb: 2 }}
        >
          <Chip 
            label="Next.js ✓" 
            color="success" 
            variant="outlined" 
            size="small"
          />
          <Chip 
            label="Go后端 ✓" 
            color="success" 
            variant="outlined" 
            size="small"
          />
          <Chip 
            label="数据库 ✓" 
            color="success" 
            variant="outlined" 
            size="small"
          />
          <Chip 
            label="WebSocket 待连接" 
            color="warning" 
            variant="outlined" 
            size="small"
          />
        </Stack>
        
        <Typography variant="body2" color="text.secondary">
          🎉 Next.js迁移完成！系统运行正常
        </Typography>
      </Paper>
    </Container>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
} 