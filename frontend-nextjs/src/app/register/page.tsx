'use client';
import React, { useState } from 'react';
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
  PersonAdd,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Home,
} from '@mui/icons-material';
import Link from 'next/link';
import { useAuth } from '@/lib/context/AuthContext';

const RegisterPageContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  background: `linear-gradient(135deg, 
    ${alpha('#001111', 0.95)} 0%, 
    ${alpha('#002211', 0.9)} 25%,
    ${alpha('#003311', 0.95)} 50%,
    ${alpha('#004411', 0.9)} 75%,
    ${alpha('#002211', 0.95)} 100%)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 136, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(136, 0, 255, 0.15) 0%, transparent 50%)',
    zIndex: 0,
  }
}));

const RegisterPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: 500,
  width: '100%',
  position: 'relative',
  zIndex: 1,
  background: `linear-gradient(135deg, 
    ${alpha('#002211', 0.9)}, 
    ${alpha('#003322', 0.95)})`,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(0, 255, 136, 0.2)',
  borderRadius: 16,
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
}));

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value,
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('请输入用户名');
      return false;
    }
    if (!formData.email.trim()) {
      setError('请输入邮箱地址');
      return false;
    }
    if (!formData.password) {
      setError('请输入密码');
      return false;
    }
    if (formData.password.length < 6) {
      setError('密码长度至少6位');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('两次输入的密码不一致');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');

    try {
      const success = await register(formData.username, formData.password, formData.email);
      if (success) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Register error:', error);
      setError('注册过程中发生错误');
    }

    setLoading(false);
  };

  return (
    <RegisterPageContainer maxWidth="sm">
      <RegisterPaper elevation={24}>
        {/* 返回首页按钮 */}
        <Box position="absolute" top={16} left={16}>
          <IconButton
            onClick={() => router.push('/')}
            sx={{ 
              color: '#00ff88',
              '&:hover': { backgroundColor: 'rgba(0, 255, 136, 0.1)' }
            }}
          >
            <Home />
          </IconButton>
        </Box>

        <Box textAlign="center" mb={4}>
          <PersonAdd 
            sx={{ 
              fontSize: 48, 
              color: '#00ff88',
              mb: 2,
            }} 
          />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #00ff88, #ffffff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1,
            }}
          >
            加入我们
          </Typography>
          <Typography variant="body2" color="text.secondary">
            创建您的 LearningStack 账户
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              mt: 1,
              px: 2,
              py: 0.5,
              background: 'rgba(0, 255, 136, 0.1)',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: 1,
              color: '#00ff88',
              fontSize: '0.75rem'
            }}
          >
            演示模式 - 无需真实邮箱
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
                  <Person sx={{ color: '#00ff88' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00ff88',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff88',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00ff88',
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="邮箱地址"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            required
            disabled={loading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email sx={{ color: '#00ff88' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00ff88',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff88',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00ff88',
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
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00ff88',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff88',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00ff88',
              },
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="确认密码"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleInputChange('confirmPassword')}
            required
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    disabled={loading}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(0, 255, 136, 0.05)',
                '&:hover fieldset': {
                  borderColor: '#00ff88',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff88',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#00ff88',
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <PersonAdd />}
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              background: 'linear-gradient(45deg, #00ff88, #00cc66)',
              '&:hover': {
                background: 'linear-gradient(45deg, #00cc66, #00ff88)',
                transform: 'translateY(-1px)',
              },
              '&:disabled': {
                background: 'rgba(0, 255, 136, 0.3)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {loading ? '注册中...' : '立即注册'}
          </Button>
        </Box>

        <Box textAlign="center" mt={3}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            已有账户？{' '}
            <Link href="/login" passHref>
              <MuiLink
                component="span"
                sx={{
                  color: '#00ff88',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                立即登录
              </MuiLink>
            </Link>
          </Typography>
          
          <Typography variant="body2" color="text.secondary">
            注册即表示您同意我们的服务条款
          </Typography>
        </Box>
      </RegisterPaper>
    </RegisterPageContainer>
  );
} 