'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
  Link as MuiLink,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Login as LoginIcon,
  Visibility,
  VisibilityOff,
  Person,
  Home,
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';

const LoginPageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${alpha('#000011', 0.95)} 0%, 
    ${alpha('#001122', 0.9)} 25%,
    ${alpha('#000033', 0.95)} 50%,
    ${alpha('#001144', 0.9)} 75%,
    ${alpha('#000022', 0.95)} 100%)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 80%, rgba(0, 255, 136, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(0, 153, 255, 0.1) 0%, transparent 50%)',
    zIndex: 0,
  }
}));

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 450,
  width: '100%',
  position: 'relative',
  zIndex: 1,
  background: `linear-gradient(135deg, 
    ${alpha('#001122', 0.9)}, 
    ${alpha('#002233', 0.95)})`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 255, 0.1)',
  borderRadius: 16,
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
}));

export default function LoginPage() {
  const router = useRouter();
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 如果已登录，重定向到仪表板
  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const success = await login(formData.username, formData.password);
      if (success) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('登录过程中发生错误');
    }

    setLoading(false);
  };

  if (user) {
    return null; // 防止闪烁
  }

  return (
    <LoginPageContainer maxWidth="sm">
      <LoginPaper elevation={24}>
        {/* 返回首页按钮 */}
        <Box position="absolute" top={16} left={16}>
          <IconButton
            onClick={() => router.push('/')}
            sx={{ 
              color: '#00ffff',
              '&:hover': { backgroundColor: 'rgba(0, 255, 255, 0.1)' }
            }}
          >
            <Home />
          </IconButton>
        </Box>

        <Box textAlign="center" mb={4}>
          <Person 
            sx={{ 
              fontSize: 48, 
              color: '#00ffff',
              mb: 2,
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00ffff, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            欢迎回来
          </Typography>
          <Typography variant="body2" color="text.secondary">
            登录到 LearningStack
          </Typography>
        </Box>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="用户名"
            value={formData.username}
            onChange={handleInputChange('username')}
            required
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{ color: '#00ffff' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 255, 255, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00ffff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ffff',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00ffff',
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="密码"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    disabled={loading}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 255, 255, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00ffff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ffff',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00ffff',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #00ffff, #0099cc)',
              '&:hover': {
                background: 'linear-gradient(45deg, #0099cc, #00ffff)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: 'rgba(0, 255, 255, 0.3)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {loading ? '登录中...' : '登录'}
          </Button>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            还没有账户？{' '}
            <Link href="/register" passHref>
              <MuiLink
                component="span"
                sx={{
                  color: '#00ffff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                立即注册
              </MuiLink>
            </Link>
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            演示账号：admin / password
          </Typography>
        </Box>
      </LoginPaper>
    </LoginPageContainer>
  );
} 