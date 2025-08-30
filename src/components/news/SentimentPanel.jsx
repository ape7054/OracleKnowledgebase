import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Paper,
  Fade
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Assessment,
  TrendingFlat
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { gradientShift, slideInFromRight } from './animations';
import { sentimentData } from './constants';

const SentimentPanel = () => {
  const theme = useTheme();

  return (
    <Fade in timeout={1200}>
      <Paper
        elevation={0}
        sx={{
          background: theme.palette.mode === 'dark'
            ? `linear-gradient(135deg, 
                ${alpha('#1e293b', 0.95)} 0%, 
                ${alpha('#334155', 0.9)} 50%, 
                ${alpha('#475569', 0.85)} 100%)`
            : `linear-gradient(135deg, 
                ${alpha('#ffffff', 0.95)} 0%, 
                ${alpha('#f8fafc', 0.9)} 50%, 
                ${alpha('#e2e8f0', 0.85)} 100%)`,
          border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
          borderRadius: 4,
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          position: 'relative',
          animation: `${slideInFromRight} 0.8s ease-out`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, #00ff88, #10b981, #059669)`,
            backgroundSize: '200% 100%',
            animation: `${gradientShift} 2s ease infinite`
          }
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Box sx={{
              p: 1.5,
              borderRadius: '50%',
              background: `linear-gradient(135deg, #00ff88, #10b981)`,
              mr: 2
            }}>
              <Assessment sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Market Sentiment Index
            </Typography>
          </Box>

          {/* 大型情绪指数显示 */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Typography variant="h1" sx={{
                fontWeight: 900,
                fontSize: '4rem',
                background: 'linear-gradient(135deg, #00ff88, #10b981)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
                textShadow: '0 0 20px rgba(0, 255, 136, 0.3)'
              }}>
                85
              </Typography>
              <Typography variant="h6" sx={{
                color: '#00ff88',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}>
                Extremely Positive
              </Typography>
            </Box>
          </Box>

          {/* 增强的情绪图表 */}
          <Box sx={{ height: 200, mb: 3 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sentimentData}>
                <defs>
                  <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00ff88" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00ff88" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.text.primary, 0.1)} />
                <XAxis 
                  dataKey="time" 
                  stroke={theme.palette.text.secondary} 
                  fontSize={11}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <YAxis 
                  stroke={theme.palette.text.secondary} 
                  fontSize={11}
                  tick={{ fill: theme.palette.text.secondary }}
                />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: alpha(theme.palette.background.paper, 0.9),
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
                    borderRadius: 8,
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sentiment"
                  stroke="#00ff88"
                  strokeWidth={3}
                  fill="url(#sentimentGradient)"
                  dot={{ fill: '#00ff88', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#00ff88', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>

          {/* 情绪分析指标 */}
          <Grid container spacing={2}>
            {[
              { label: 'Bullish', value: 24, color: '#00ff88', icon: TrendingUp },
              { label: 'Bearish', value: 3, color: '#ff4757', icon: TrendingDown },
              { label: 'Neutral', value: 8, color: '#a4b0be', icon: TrendingFlat }
            ].map((item, index) => (
              <Grid item xs={4} key={index}>
                <Box sx={{ 
                  textAlign: 'center',
                  p: 2,
                  borderRadius: 2,
                  background: alpha(item.color, 0.1),
                  border: `1px solid ${alpha(item.color, 0.2)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: `0 8px 25px ${alpha(item.color, 0.2)}`
                  }
                }}>
                  <item.icon sx={{ fontSize: 20, color: item.color, mb: 1 }} />
                  <Typography variant="h6" sx={{ color: item.color, fontWeight: 700 }}>
                    {item.value}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    {item.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Paper>
    </Fade>
  );
};

export default SentimentPanel; 