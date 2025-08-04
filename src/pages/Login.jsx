import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
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
  Fade,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Login as LoginIcon, Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

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
    ${alpha('#002233', 0.8)})`,
  border: `2px solid ${alpha('#00ff88', 0.3)}`,
  borderRadius: 20,
  backdropFilter: 'blur(20px)',
  boxShadow: '0 20px 60px rgba(0, 255, 136, 0.2)',
}));

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();

  const from = location.state?.from?.pathname || '/account';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const result = await login(username, password);
    
    if (result.success) {
      // 成功登录后重定向到原来要访问的页面或账户页面
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <LoginPageContainer>
      <Fade in timeout={1000}>
        <LoginPaper elevation={24}>
          <Box textAlign="center" mb={4}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00ff88, #0099ff)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
              }}
            >
              <LoginIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom 
              sx={{
                color: '#00ff88',
                fontWeight: 'bold',
                textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                mb: 1,
              }}
            >
              Welcome Back
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 300,
              }}
            >
              Sign in to your MarketPulse account
        </Typography>
          </Box>

          {error && (
            <Fade in>
              <Alert 
                severity="error" 
                sx={{ 
                  mb: 3,
                  backgroundColor: alpha('#ff4444', 0.1),
                  border: '1px solid #ff4444',
                  color: '#ff4444',
                }}
              >
                {error}
              </Alert>
            </Fade>
          )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: alpha('#ffffff', 0.05),
                  '& fieldset': {
                    borderColor: alpha('#00ff88', 0.3),
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ff88',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff88',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#00ff88',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white',
                },
              }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
              type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: alpha('#ffffff', 0.05),
                  '& fieldset': {
                    borderColor: alpha('#00ff88', 0.3),
                  },
                  '&:hover fieldset': {
                    borderColor: '#00ff88',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#00ff88',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  '&.Mui-focused': {
                    color: '#00ff88',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white',
                },
              }}
            />
            
          <Button
            type="submit"
            fullWidth
            variant="contained"
              disabled={loading}
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #00ff88, #0099ff)',
                borderRadius: 3,
                boxShadow: '0 10px 30px rgba(0, 255, 136, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0099ff, #00ff88)',
                  boxShadow: '0 15px 40px rgba(0, 255, 136, 0.4)',
                  transform: 'translateY(-2px)',
                },
                '&:disabled': {
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? (
                <Box display="flex" alignItems="center">
                  <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                  Signing In...
                </Box>
              ) : (
                'Sign In'
              )}
          </Button>
            
            <Box textAlign="center">
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Don't have an account?{' '}
                <MuiLink 
                  component={Link}
                  to="/register"
                  sx={{ 
                    color: '#00ff88',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: '#0099ff',
                    },
                  }}
                >
                  Create Account
            </MuiLink>
          </Typography>
            </Box>
        </Box>
      </LoginPaper>
      </Fade>
    </LoginPageContainer>
  );
}

export default Login; 