import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled, alpha } from '@mui/system';

const StyledCard = styled(Card)(({ theme, variant = 'default' }) => ({
  position: 'relative',
  height: '160px',
  minHeight: '160px',
  borderRadius: '12px',
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
    : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
  border: theme.palette.mode === 'dark'
    ? '1px solid rgba(148, 163, 184, 0.1)'
    : '1px solid rgba(226, 232, 240, 0.8)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 1px 3px rgba(0, 0, 0, 0.3)'
    : '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 10px 25px rgba(0, 0, 0, 0.4)'
      : '0 10px 25px rgba(0, 0, 0, 0.15)',
    border: theme.palette.mode === 'dark'
      ? '1px solid rgba(148, 163, 184, 0.2)'
      : '1px solid rgba(226, 232, 240, 1)',
  }
}));

const PremiumCard = ({ title, value, icon, color, trend, subtitle }) => {
  return (
    <StyledCard>
      {/* 顶部装饰条 */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: `linear-gradient(90deg, ${color} 0%, ${alpha(color, 0.6)} 100%)`
      }} />

      <CardContent sx={{
        p: 2,
        height: 'calc(100% - 3px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        '&:last-child': { pb: 2 }
      }}>
        {/* 头部区域 */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          {/* 图标 */}
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 3px 8px ${alpha(color, 0.3)}`,
              '& svg': {
                color: '#fff',
                fontSize: '1.3rem'
              }
            }}
          >
            {icon}
          </Box>

          {/* 趋势标签 */}
          {trend && (
            <Chip
              label={trend}
              size="small"
              sx={{
                height: '22px',
                fontSize: '0.7rem',
                fontWeight: 600,
                background: trend.startsWith('+')
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#fff',
                border: 'none',
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          )}
        </Box>

        {/* 标题 */}
        <Typography
          variant="body2"
          sx={{
            color: (theme) => theme.palette.text.secondary,
            fontSize: '0.75rem',
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.3px',
            mb: 0.5,
            lineHeight: 1.2
          }}
        >
          {title}
        </Typography>

        {/* 主要数值 */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', md: '1.75rem' },
            lineHeight: 1.1,
            color: (theme) => theme.palette.text.primary,
            mb: subtitle ? 0.25 : 0
          }}
        >
          {value}
        </Typography>

        {/* 副标题 */}
        {subtitle && (
          <Typography
            variant="caption"
            sx={{
              color: (theme) => theme.palette.text.secondary,
              fontSize: '0.7rem',
              fontWeight: 400,
              opacity: 0.8,
              lineHeight: 1.2
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default PremiumCard; 