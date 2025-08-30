import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Stack,
  Chip,
  Paper,
  Fade
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';
import { gradientShift, slideInFromRight } from './animations';
import { newsCategories } from './constants';

const CategoriesPanel = () => {
  const theme = useTheme();

  return (
    <Fade in timeout={1400}>
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
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
          borderRadius: 4,
          backdropFilter: 'blur(20px)',
          overflow: 'hidden',
          position: 'relative',
          animation: `${slideInFromRight} 0.8s ease-out 0.2s both`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
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
              background: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
              mr: 2
            }}>
              <TrendingUp sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Popular Categories
            </Typography>
          </Box>

          <Stack spacing={2}>
            {newsCategories.map((category, index) => (
              <Box key={category.name} sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 3,
                borderRadius: 3,
                background: alpha(category.color, 0.1),
                border: `1px solid ${alpha(category.color, 0.2)}`,
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: `${slideInFromRight} 0.6s ease-out ${index * 0.1}s both`,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateX(8px) scale(1.02)',
                  boxShadow: `0 8px 25px ${alpha(category.color, 0.3)}`,
                  border: `2px solid ${alpha(category.color, 0.4)}`
                }
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${category.color}, ${alpha(category.color, 0.7)})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    color: 'white',
                    fontSize: '0.9rem'
                  }}>
                    #{index + 1}
                  </Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                      {category.count} news
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Chip
                    label={`${category.trend > 0 ? '+' : ''}${category.trend}%`}
                    size="small"
                    icon={category.trend > 0 ? 
                      <TrendingUp sx={{ fontSize: 14 }} /> : 
                      category.trend < 0 ? 
                      <TrendingDown sx={{ fontSize: 14 }} /> :
                      <TrendingFlat sx={{ fontSize: 14 }} />
                    }
                    sx={{
                      bgcolor: alpha(
                        category.trend > 0 ? '#00ff88' : 
                        category.trend < 0 ? '#ff4757' : '#a4b0be', 
                        0.15
                      ),
                      color: category.trend > 0 ? '#00ff88' : 
                             category.trend < 0 ? '#ff4757' : '#a4b0be',
                      fontWeight: 600,
                      border: `1px solid ${alpha(
                        category.trend > 0 ? '#00ff88' : 
                        category.trend < 0 ? '#ff4757' : '#a4b0be', 
                        0.3
                      )}`
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Paper>
    </Fade>
  );
};

export default CategoriesPanel; 