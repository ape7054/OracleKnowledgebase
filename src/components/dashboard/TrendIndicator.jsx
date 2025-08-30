import { Chip, useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import {
  TrendingUpIcon,
  TrendingDownIcon,
  TimelineIcon,
} from '@mui/icons-material';

const TrendIndicator = ({ direction, strength }) => {
  const theme = useTheme();
  
  const getColor = () => {
    if (direction === 'up') {
      return theme.palette.success.main;
    } else if (direction === 'down') {
      return theme.palette.error.main;
    }
    return theme.palette.text.secondary;
  };
  
  const getIcon = () => {
    if (direction === 'up') {
      return <TrendingUpIcon sx={{ fontSize: '1.2rem' }} />;
    } else if (direction === 'down') {
      return <TrendingDownIcon sx={{ fontSize: '1.2rem' }} />;
    }
    return <TimelineIcon sx={{ fontSize: '1.2rem' }} />;
  };

  return (
    <Chip 
      icon={getIcon()}
      label={`${direction === 'neutral' ? 'Neutral' : direction === 'up' ? 'Bullish' : 'Bearish'} ${strength}`}
      sx={{
        backgroundColor: alpha(getColor(), 0.1),
        color: getColor(),
        fontWeight: 600,
        '& .MuiChip-icon': {
          color: getColor()
        }
      }}
    />
  );
};

export default TrendIndicator; 