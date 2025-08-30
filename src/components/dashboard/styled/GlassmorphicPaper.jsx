import { Paper } from '@mui/material';
import { styled } from '@mui/system';

const GlassmorphicPaper = styled(Paper)(({ theme }) => ({
  padding: '24px',
  borderRadius: '16px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',

  ...(theme.palette.mode === 'dark'
    ? {
        backgroundColor: 'rgba(22, 27, 34, 0.75)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 10px 40px 0 rgba(0, 0, 0, 0.35)',
      }
    : {
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 8px 32px rgba(145, 158, 171, 0.24)',
      }),

  color: theme.palette.text.primary,

  '&:hover': {
      transform: 'translateY(-4px)',
      ...(theme.palette.mode === 'dark' && {
          backgroundColor: 'rgba(22, 27, 34, 0.85)',
          boxShadow: '0 12px 48px 0 rgba(0, 0, 0, 0.45)',
      }),
  },
}));

export default GlassmorphicPaper; 