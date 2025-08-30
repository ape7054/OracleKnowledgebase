import { Paper, Typography, Box, useTheme } from '@mui/material';

const CustomTooltip = ({ active, payload, label }) => {
  const theme = useTheme();
  
  if (active && payload && payload.length) {
    return (
      <Paper sx={{
        padding: '12px',
        borderRadius: '12px',
        ...(theme.palette.mode === 'dark'
          ? {
              backgroundColor: 'rgba(33, 43, 54, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
            } : {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[4],
            }
        )
      }}>
        <Typography variant="subtitle2" sx={{ mb: 1, color: theme.palette.text.secondary }}>
          {`Time: ${label}`}
        </Typography>
        {payload.map((pld) => (
          <Box key={pld.dataKey} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <Box sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%', 
              backgroundColor: pld.stroke, 
              mr: 1.5 
            }} />
            <Typography variant="body2" sx={{ 
              color: theme.palette.text.primary, 
              fontWeight: 600, 
              minWidth: 40 
            }}>
              {`${pld.dataKey}: `}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: theme.palette.text.primary, 
              fontFamily: 'monospace', 
              ml: 0.5 
            }}>
              {`$${pld.value.toLocaleString()}`}
            </Typography>
          </Box>
        ))}
      </Paper>
    );
  }
  return null;
};

export default CustomTooltip; 