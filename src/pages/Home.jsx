import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  useTheme,
  alpha,
  Chip,
  Avatar,
  Stack,
  Divider,
  IconButton,
  Fade,
  Slide
} from '@mui/material';
import {
  TrendingUp,
  Security,
  Speed,
  Analytics,
  ArrowForward,
  Dashboard as DashboardIcon,
  SwapHoriz as TradeIcon,
  AccountCircle as AccountIcon,
  ShowChart,
  AutoGraph,
  Insights,
  Timeline,
  CandlestickChart,
  PlayArrow,
  Star,
  Verified,
  Bolt,
  Shield
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: <AutoGraph sx={{ fontSize: 48 }} />,
      title: 'AI-Powered Analytics',
      description: 'Advanced machine learning algorithms analyze market patterns and predict trends with 95% accuracy.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      stats: '95% Accuracy'
    },
    {
      icon: <Shield sx={{ fontSize: 48 }} />,
      title: 'Military-Grade Security',
      description: 'Multi-layer encryption, cold storage, and biometric authentication protect your assets.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      stats: 'Zero Breaches'
    },
    {
      icon: <Bolt sx={{ fontSize: 48 }} />,
      title: 'Lightning Execution',
      description: 'Sub-millisecond order execution with direct market access and institutional-grade infrastructure.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      stats: '<1ms Latency'
    }
  ];

  const quickActions = [
    {
      title: 'Portfolio Dashboard',
      description: 'Real-time portfolio tracking with advanced analytics',
      icon: <Insights sx={{ fontSize: 32 }} />,
      path: '/dashboard',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      value: '$2.4M+',
      label: 'Assets Managed'
    },
    {
      title: 'Advanced Trading',
      description: 'Professional trading tools with AI assistance',
      icon: <CandlestickChart sx={{ fontSize: 32 }} />,
      path: '/trade',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      value: '50ms',
      label: 'Avg Execution'
    },
    {
      title: 'Smart Account',
      description: 'Intelligent portfolio management and automation',
      icon: <Timeline sx={{ fontSize: 32 }} />,
      path: '/account',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      value: '24/7',
      label: 'Monitoring'
    }
  ];

  const stats = [
    { value: '$2.4B+', label: 'Trading Volume', icon: <TrendingUp /> },
    { value: '150K+', label: 'Active Traders', icon: <AccountIcon /> },
    { value: '99.9%', label: 'Uptime', icon: <Verified /> },
    { value: '0.01%', label: 'Trading Fees', icon: <Star /> }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'radial-gradient(ellipse at top, rgba(16, 185, 129, 0.15) 0%, rgba(0, 0, 0, 0.9) 50%), linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
        : 'radial-gradient(ellipse at top, rgba(59, 130, 246, 0.1) 0%, rgba(255, 255, 255, 0.9) 50%), linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Elements */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme.palette.primary.main.slice(1)}' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        animation: 'float 20s ease-in-out infinite'
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Hero Section */}
        <Fade in timeout={1000}>
          <Box sx={{ textAlign: 'center', pt: 8, pb: 6 }}>
            {/* Status Badge */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
              <Chip
                icon={<Verified sx={{ fontSize: 16 }} />}
                label="Professional Trading Platform • v2.0"
                sx={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: '#fff',
                  fontWeight: 600,
                  px: 2,
                  py: 1,
                  fontSize: '0.9rem',
                  boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              />
            </Box>

            {/* Main Title */}
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.9,
                  mb: 2,
                  textShadow: '0 0 40px rgba(102, 126, 234, 0.3)'
                }}
              >
                MarketPulse
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 300,
                  color: theme.palette.text.secondary,
                  fontSize: { xs: '1.2rem', md: '1.8rem' },
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  opacity: 0.8
                }}
              >
                Professional Trading Platform
              </Typography>
            </Box>

            {/* Subtitle */}
            <Typography
              variant="h5"
              sx={{
                color: theme.palette.text.secondary,
                mb: 6,
                fontWeight: 400,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.8,
                fontSize: { xs: '1.1rem', md: '1.4rem' }
              }}
            >
              Harness the power of AI-driven analytics, institutional-grade security, and lightning-fast execution
              to dominate the cryptocurrency markets like never before.
            </Typography>

            {/* CTA Buttons */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center" sx={{ mb: 8 }}>
              <Button
                variant="contained"
                size="large"
                endIcon={<PlayArrow />}
                onClick={() => navigate('/trade')}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                  borderRadius: '50px',
                  textTransform: 'none',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
                    boxShadow: '0 16px 50px rgba(102, 126, 234, 0.6)',
                    transform: 'translateY(-3px)',
                  }
                }}
              >
                Start Trading Now
              </Button>

              <Button
                variant="outlined"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  py: 2,
                  px: 6,
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  borderRadius: '50px',
                  borderWidth: 2,
                  borderColor: 'transparent',
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))',
                  backdropFilter: 'blur(20px)',
                  color: theme.palette.text.primary,
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#667eea',
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2), rgba(118, 75, 162, 0.2))',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                View Dashboard
              </Button>
            </Stack>

            {/* Stats Row */}
            <Grid container spacing={4} justifyContent="center" sx={{ maxWidth: '800px', mx: 'auto' }}>
              {stats.map((stat, index) => (
                <Grid item xs={6} sm={3} key={index}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Box sx={{
                      color: '#667eea',
                      mb: 1,
                      '& svg': { fontSize: 24 }
                    }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5, color: theme.palette.text.primary }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontSize: '0.9rem' }}>
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Features Section */}
        <Slide direction="up" in timeout={1500}>
          <Box sx={{ py: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Why Professionals Choose Us
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: '600px',
                  mx: 'auto',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Experience the next generation of cryptocurrency trading with cutting-edge technology
                and institutional-grade infrastructure.
              </Typography>
            </Box>

            <Grid container spacing={6}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card sx={{
                    height: '100%',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(15, 23, 42, 0.8)'
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.02)',
                      boxShadow: '0 32px 64px rgba(102, 126, 234, 0.3)',
                      '&::before': {
                        opacity: 1,
                      }
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: feature.gradient,
                      opacity: 0,
                      transition: 'opacity 0.4s ease',
                      zIndex: -1
                    }
                  }}>
                    <CardContent sx={{ p: 5, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <Box sx={{
                        mb: 4,
                        p: 2,
                        borderRadius: '50%',
                        background: feature.gradient,
                        display: 'inline-flex',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                      }}>
                        {feature.icon}
                      </Box>

                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
                        {feature.title}
                      </Typography>

                      <Typography variant="body1" sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.7,
                        mb: 3,
                        fontSize: '1rem'
                      }}>
                        {feature.description}
                      </Typography>

                      <Chip
                        label={feature.stats}
                        sx={{
                          background: feature.gradient,
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Slide>

        {/* Quick Actions Section */}
        <Fade in timeout={2000}>
          <Box sx={{ py: 10 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3
                }}
              >
                Launch Your Trading Journey
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: theme.palette.text.secondary,
                  maxWidth: '600px',
                  mx: 'auto',
                  fontWeight: 400,
                  lineHeight: 1.6
                }}
              >
                Access professional-grade tools and insights designed for serious traders and investors.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Card
                    onClick={() => navigate(action.path)}
                    sx={{
                      height: '100%',
                      cursor: 'pointer',
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(15, 23, 42, 0.8)'
                        : 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '24px',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        transform: 'translateY(-8px) scale(1.02)',
                        boxShadow: '0 24px 48px rgba(240, 147, 251, 0.3)',
                        '&::before': {
                          opacity: 0.1,
                        }
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: action.gradient,
                        opacity: 0,
                        transition: 'opacity 0.4s ease',
                        zIndex: 0
                      }
                    }}
                  >
                    <CardContent sx={{ p: 5, textAlign: 'center', position: 'relative', zIndex: 1 }}>
                      <Box sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: '50%',
                        background: action.gradient,
                        display: 'inline-flex',
                        color: 'white',
                        boxShadow: '0 8px 32px rgba(240, 147, 251, 0.3)'
                      }}>
                        {action.icon}
                      </Box>

                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: theme.palette.text.primary }}>
                        {action.title}
                      </Typography>

                      <Typography variant="body1" sx={{
                        color: theme.palette.text.secondary,
                        lineHeight: 1.6,
                        mb: 3
                      }}>
                        {action.description}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
                            {action.value}
                          </Typography>
                          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>
                            {action.label}
                          </Typography>
                        </Box>
                        <IconButton
                          sx={{
                            background: action.gradient,
                            color: 'white',
                            '&:hover': {
                              background: action.gradient,
                              transform: 'scale(1.1)'
                            }
                          }}
                        >
                          <ArrowForward />
                        </IconButton>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Footer */}
        <Box sx={{
          textAlign: 'center',
          py: 8,
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.5)'
            : 'rgba(248, 250, 252, 0.5)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px 24px 0 0',
          mt: 8
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: theme.palette.text.primary }}>
            MarketPulse
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: '500px', mx: 'auto' }}>
            Empowering traders worldwide with cutting-edge technology and institutional-grade infrastructure.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            © 2024 MarketPulse. Professional cryptocurrency trading platform. All rights reserved.
          </Typography>
        </Box>
      </Container>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </Box>
  );
};

export default Home;