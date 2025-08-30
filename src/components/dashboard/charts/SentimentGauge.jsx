import { Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';
import {
  SentimentVeryDissatisfiedIcon,
  SentimentNeutralIcon,
  SentimentVerySatisfiedIcon,
} from '@mui/icons-material';

const SentimentGauge = ({ value, size = 180 }) => {
  const theme = useTheme();
  const data = [{ value: 100, fill: 'url(#sentimentGradient)' }];
  const startAngle = 180;
  const endAngle = 0;
  
  // 获取情绪描述和颜色
  const getSentimentInfo = (value) => {
    if (value <= 20) return { 
      text: 'Extreme Fear', 
      color: theme.palette.error.main, 
      gradient: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
      icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.error.main }} /> 
    };
    if (value <= 40) return { 
      text: 'Fear', 
      color: theme.palette.error.light, 
      gradient: `linear-gradient(135deg, ${theme.palette.error.light}, ${theme.palette.error.main})`,
      icon: <SentimentVeryDissatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.error.light }} /> 
    };
    if (value <= 60) return { 
      text: 'Neutral', 
      color: theme.palette.warning.main, 
      gradient: `linear-gradient(135deg, ${theme.palette.warning.light}, ${theme.palette.warning.dark})`,
      icon: <SentimentNeutralIcon sx={{ fontSize: '1.75rem', color: theme.palette.warning.main }} /> 
    };
    if (value <= 80) return { 
      text: 'Greed', 
      color: theme.palette.success.light, 
      gradient: `linear-gradient(135deg, ${theme.palette.success.light}, ${theme.palette.success.main})`,
      icon: <SentimentVerySatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.success.light }} /> 
    };
    return { 
      text: 'Extreme Greed', 
      color: theme.palette.success.main, 
      gradient: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
      icon: <SentimentVerySatisfiedIcon sx={{ fontSize: '1.75rem', color: theme.palette.success.main }} /> 
    };
  };
  
  const sentimentInfo = getSentimentInfo(value);
  const angle = startAngle - (value / 100) * (startAngle - endAngle);

  // 生成细小刻度线数据
  const generateTicks = () => {
    const ticks = [];
    for (let i = 0; i <= 100; i += 5) {
      const tickAngle = startAngle - (i / 100) * (startAngle - endAngle);
      const isMainTick = i % 25 === 0;
      const tickLength = isMainTick ? 10 : 5;
      const tickWidth = isMainTick ? 2 : 1;
      const tickOpacity = isMainTick ? 0.8 : 0.4;
      const x1 = 50 - Math.cos(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22));
      const y1 = 100 - Math.sin(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22));
      const x2 = 50 - Math.cos(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22) + tickLength);
      const y2 = 100 - Math.sin(tickAngle * Math.PI / 180) * (size/2 - (isMainTick ? 22 : 22) + tickLength);
      
      ticks.push({ x1: `${x1}%`, y1: `${y1}%`, x2: `${x2}%`, y2: `${y2}%`, width: tickWidth, opacity: tickOpacity });
    }
    return ticks;
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* 仪表盘容器 */}
      <Box sx={{ 
        position: 'relative', 
        width: size, 
        height: size/1.8, 
        mb: 1 
      }}>
        {/* 渐变背景层 */}
        <Box sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50% 50% 0 0',
          overflow: 'hidden',
          background: theme.palette.mode === 'dark' 
            ? 'linear-gradient(135deg, rgba(22, 28, 36, 0.8), rgba(10, 14, 25, 0.8))'
            : 'linear-gradient(135deg, rgba(255, 255, 255, 0.6), rgba(240, 245, 250, 0.6))',
          boxShadow: theme.palette.mode === 'dark'
            ? 'inset 0 -10px 20px -10px rgba(255, 255, 255, 0.1), 0 8px 16px rgba(0, 0, 0, 0.3)'
            : 'inset 0 -10px 20px -10px rgba(145, 158, 171, 0.2), 0 8px 16px rgba(145, 158, 171, 0.12)',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 'calc(100% - 10px)',
            height: 'calc(100% - 5px)',
            top: '5px',
            left: '5px',
            borderRadius: '50% 50% 0 0',
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(180deg, rgba(30, 40, 50, 0.7), rgba(20, 25, 40, 0.7))'
              : 'linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(250, 252, 255, 0.9))',
            backdropFilter: 'blur(8px)',
          }
        }} />
        
        {/* 仪表盘图表 */}
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="100%" 
            innerRadius={size/2 - 20} 
            outerRadius={size/2}
            startAngle={startAngle} 
            endAngle={endAngle}
            barSize={12}
            data={data}
          >
            <defs>
              <linearGradient id="sentimentGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={theme.palette.error.main} />
                <stop offset="25%" stopColor={theme.palette.error.main} />
                <stop offset="50%" stopColor={theme.palette.warning.main} />
                <stop offset="75%" stopColor={theme.palette.success.light} />
                <stop offset="100%" stopColor={theme.palette.success.main} />
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
              </filter>
              <linearGradient id="needleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={alpha(sentimentInfo.color, 0.8)} />
                <stop offset="100%" stopColor={alpha(sentimentInfo.color, 1)} />
              </linearGradient>
            </defs>
            
            <RadialBar 
              dataKey="value"
              cornerRadius={6}
              fill="rgba(255,255,255,0.08)"
              background={{ 
                fill: theme.palette.mode === 'dark' ? 
                  'rgba(255,255,255,0.06)' : 
                  'rgba(0,0,0,0.03)'
              }}
            />
            
            <RadialBar 
              dataKey="value"
              cornerRadius={6}
              fill="url(#sentimentGradient)"
              style={{ filter: 'url(#glow)' }}
            />
            
            {generateTicks().map((tick, i) => (
              <line 
                key={`tick-${i}`}
                x1={tick.x1} 
                y1={tick.y1} 
                x2={tick.x2} 
                y2={tick.y2} 
                stroke={theme.palette.mode === 'dark' ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)"}
                strokeWidth={tick.width}
                strokeOpacity={tick.opacity}
              />
            ))}
            
            <g filter="url(#shadow)">
              <circle 
                cx="50%" 
                cy="100%" 
                r={8} 
                fill={theme.palette.mode === 'dark' ? '#2a2f3a' : '#e0e4e9'}
                stroke={sentimentInfo.color}
                strokeWidth={2}
              />
              <circle 
                cx="50%" 
                cy="100%" 
                r={4}
                fill="url(#needleGradient)"
              />
              
              <path
                d={`
                  M ${50 - 3} 100 
                  L ${50 - Math.cos(angle * Math.PI / 180) * 48} ${100 - Math.sin(angle * Math.PI / 180) * 48} 
                  L ${50 + 3} 100
                  Z
                `}
                fill="url(#needleGradient)"
                style={{ transformOrigin: '50% 100%', transformBox: 'fill-box' }}
              />
              
              <circle 
                cx={50 - Math.cos(angle * Math.PI / 180) * 48} 
                cy={100 - Math.sin(angle * Math.PI / 180) * 48} 
                r={3}
                fill="url(#needleGradient)"
              />
            </g>
          </RadialBarChart>
        </ResponsiveContainer>
      </Box>
      
      {/* 情绪指标值和状态 */}
      <Box 
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 3,
          background: alpha(sentimentInfo.color, theme.palette.mode === 'dark' ? 0.15 : 0.08),
          px: 4,
          py: 1.5,
          borderRadius: 2,
          backdropFilter: 'blur(4px)',
          boxShadow: `0 4px 12px ${alpha(sentimentInfo.color, 0.15)}`
        }}
      >
        <Typography 
          variant="h3" 
          sx={{ 
            fontWeight: 700, 
            mb: 0.5,
            background: sentimentInfo.gradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.15))'
          }}
        >
          {value}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {sentimentInfo.icon}
          <Typography 
            variant="button" 
            sx={{ 
              fontSize: '1rem', 
              color: sentimentInfo.color, 
              fontWeight: 600,
              letterSpacing: '0.03em'
            }}
          >
            {sentimentInfo.text}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SentimentGauge; 