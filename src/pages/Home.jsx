import React from 'react';
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
  Chip
} from '@mui/material';
import {
  TrendingUp,
  Security,
  Speed,
  Analytics,
  ArrowForward,
  Dashboard as DashboardIcon,
  SwapHoriz as TradeIcon,
  AccountCircle as AccountIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Analytics sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Real-time Analytics',
      description: 'Advanced market sentiment analysis with live data feeds and comprehensive insights.'
    },
    {
      icon: <Security sx={{ fontSize: 40, color: theme.palette.success.main }} />,
      title: 'Secure Trading',
      description: 'Bank-level security with multi-factor authentication and encrypted transactions.'
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: theme.palette.secondary.main }} />,
      title: 'Lightning Fast',
      description: 'Ultra-low latency trading execution with real-time order book updates.'
    }
  ];

  const quickActions = [
    {
      title: 'Dashboard',
      description: 'View market overview and portfolio',
      icon: <DashboardIcon />,
      path: '/dashboard',
      color: theme.palette.primary.main
    },
    {
      title: 'Start Trading',
      description: 'Access advanced trading tools',
      icon: <TradeIcon />,
      path: '/trade',
      color: theme.palette.success.main
    },
    {
      title: 'Account',
      description: 'Manage your portfolio and settings',
      icon: <AccountIcon />,
      path: '/account',
      color: theme.palette.secondary.main
    }
  ];

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)}, ${alpha(theme.palette.primary.dark, 0.1)})`
        : `linear-gradient(135deg, ${alpha(theme.palette.background.default, 0.95)}, ${alpha(theme.palette.primary.light, 0.1)})`,
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8, mt: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Chip
              label="v1.0.2"
              size="small"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                color: '#fff',
                fontWeight: 600,
                mb: 2
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Box
              sx={{
                width: 8,
                height: 60,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '4px',
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.02em'
              }}
            >
              MarketPulse
            </Typography>
          </Box>

          <Typography
            variant="h5"
            sx={{
              color: theme.palette.text.secondary,
              mb: 4,
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6
            }}
          >
            Professional cryptocurrency trading platform with advanced market intelligence and real-time analytics
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              onClick={() => navigate('/trade')}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                  boxShadow: `0 12px 24px ${alpha(theme.palette.primary.main, 0.5)}`,
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Start Trading
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/dashboard')}
              sx={{
                py: 1.5,
                px: 4,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                '&:hover': {
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.1)}, ${alpha(theme.palette.primary.main, 0.05)})`,
                  borderColor: theme.palette.primary.main,
                }
              }}
            >
              View Dashboard
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 6 }}>
            <Box
              sx={{
                width: 6,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '3px',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Why Choose MarketPulse?
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card sx={{
                  height: '100%',
                  background: theme.palette.mode === 'dark'
                    ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.4)})`
                    : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.6)})`,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                  borderRadius: '16px',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? `0 20px 40px ${alpha(theme.palette.primary.main, 0.2)}`
                      : `0 20px 40px ${alpha(theme.palette.primary.main, 0.15)}`,
                  }
                }}>
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Quick Actions Section */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 6 }}>
            <Box
              sx={{
                width: 6,
                height: 32,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '3px',
              }}
            />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${theme.palette.primary.main})`,
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center'
              }}
            >
              Quick Access
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  onClick={() => navigate(action.path)}
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    background: theme.palette.mode === 'dark'
                      ? `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.4)})`
                      : `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.paper, 0.6)})`,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${alpha(action.color, 0.2)}`,
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 12px 24px ${alpha(action.color, 0.3)}`,
                      borderColor: action.color,
                    }
                  }}
                >
                  <CardContent sx={{ p: 3, textAlign: 'center' }}>
                    <Box
                      sx={{
                        mb: 2,
                        color: action.color,
                        '& svg': { fontSize: 32 }
                      }}
                    >
                      {action.icon}
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {action.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {action.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', py: 4, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}` }}>
          <Typography variant="body2" color="text.secondary">
            © 2024 MarketPulse. Professional cryptocurrency trading platform.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;