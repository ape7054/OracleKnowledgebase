import { Box, useTheme } from '@mui/material';
import { alpha } from '@mui/system';
import { ResponsiveContainer, AreaChart, Area, YAxis, Line } from 'recharts';

const PremiumSparkLine = ({ data, strokeColor, trend = 'neutral' }) => {
  const theme = useTheme();

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const chartData = data.map((value, index) => ({ x: index, y: Number(value) }));

  const defaultColors = {
    up: '#16C784',
    down: '#EA3943',
    neutral: theme.palette.text.secondary,
  };
  const resolvedColor = strokeColor || defaultColors[trend] || defaultColors.neutral;
  const areaId = `spark-area-${(resolvedColor || '').replace('#', '')}-${trend}`;

  const values = chartData.map(p => p.y);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const midVal = (minVal + maxVal) / 2 || 0;
  const rawRange = Math.max(maxVal - minVal, 0);
  const minSpan = Math.max(Math.abs(midVal) * 0.0005, 1e-6);
  const range = Math.max(rawRange, minSpan);
  const pad = Math.max(range * 0.15, 1e-8);
  const domainMin = minVal - pad;
  const domainMax = maxVal + pad;

  const renderLastDot = (props) => {
    const { cx, cy, index } = props;
    if (index !== chartData.length - 1) return null;
    return (
      <circle cx={cx} cy={cy} r={3} fill={resolvedColor} stroke={theme.palette.mode === 'dark' ? '#0B1220' : '#FFFFFF'} strokeWidth={1.25} />
    );
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 999,
        background: `linear-gradient(180deg, ${alpha(resolvedColor, 0.12)} 0%, ${alpha(resolvedColor, 0.04)} 100%)`,
        border: `1px solid ${alpha(resolvedColor, 0.22)}`,
        boxShadow: theme.palette.mode === 'dark'
          ? `inset 0 0 0 1px ${alpha('#000', 0.3)}, 0 2px 8px ${alpha(resolvedColor, 0.2)}`
          : `inset 0 0 0 1px ${alpha('#000', 0.06)}, 0 2px 10px ${alpha(resolvedColor, 0.25)}`,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 6, right: 6, bottom: 6, left: 6 }}>
          <defs>
            <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={alpha(resolvedColor, 0.28)} />
              <stop offset="100%" stopColor={alpha(resolvedColor, 0.04)} />
            </linearGradient>
          </defs>

          <YAxis type="number" hide domain={[domainMin, domainMax]} />

          <Area
            type="monotone"
            dataKey="y"
            stroke={resolvedColor}
            strokeWidth={2}
            fill={`url(#${areaId})`}
            isAnimationActive={false}
            dot={false}
            activeDot={false}
          />

          <Line
            type="monotone"
            dataKey="y"
            stroke="transparent"
            dot={renderLastDot}
            isAnimationActive={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PremiumSparkLine; 