import { createChart, ColorType, LineStyle } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Chip, useTheme, CircularProgress, Backdrop } from '@mui/material';
import { alpha } from '@mui/material/styles';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const TradingViewChart = ({ data, colors }) => {
    const theme = useTheme();
    const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });
    const [currentPrice, setCurrentPrice] = useState(0);
    const [chartError, setChartError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [fadeIn, setFadeIn] = useState(false);
    
    const {
        backgroundColor = 'transparent',
        textColor = theme.palette.text.primary,
        lineColor = theme.palette.primary.main,
        areaTopColor = theme.palette.primary.main,
        areaBottomColor = alpha(theme.palette.primary.main, 0.1),
    } = colors || {};

    const chartContainerRef = useRef(null);
    const chartRef = useRef(null);
    const seriesRef = useRef(null);

    // 初始化图表（仅一次）
    useEffect(() => {
        if (!chartContainerRef.current || chartRef.current) return;

        try {
            const chart = createChart(chartContainerRef.current, {
                layout: {
                    backgroundColor: backgroundColor,
                    textColor: textColor,
                    fontSize: 12,
                    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                },
                width: chartContainerRef.current.clientWidth,
                height: 350,
                grid: {
                    vertLines: { color: alpha(textColor, 0.1), style: LineStyle.Solid, visible: true },
                    horzLines: { color: alpha(textColor, 0.1), style: LineStyle.Solid, visible: true },
                },
                crosshair: {
                    mode: 1,
                    vertLine: { color: alpha(theme.palette.primary.main, 0.8), width: 1, style: LineStyle.Solid, labelBackgroundColor: theme.palette.primary.main },
                    horzLine: { color: alpha(theme.palette.primary.main, 0.8), width: 1, style: LineStyle.Solid, labelBackgroundColor: theme.palette.primary.main },
                },
                priceScale: { borderColor: alpha(textColor, 0.2), textColor: textColor, autoScale: true, scaleMargins: { top: 0.1, bottom: 0.1 } },
                timeScale: { borderColor: alpha(textColor, 0.2), textColor: textColor, timeVisible: true, secondsVisible: false },
                watermark: { visible: false },
                handleScroll: { 
                    mouseWheel: false, 
                    pressedMouseMove: false, 
                    horzTouchDrag: false, 
                    vertTouchDrag: false 
                },
                handleScale: { 
                    axisPressedMouseMove: { time: false, price: false }, 
                    axisDoubleClickReset: false, 
                    mouseWheel: false, 
                    pinch: false 
                },
            });

            const areaSeries = chart.addAreaSeries({
                lineColor: lineColor,
                topColor: areaTopColor,
                bottomColor: areaBottomColor,
                lineWidth: 3,
                lineStyle: LineStyle.Solid,
                priceLineVisible: true,
                priceLineColor: lineColor,
                priceLineWidth: 2,
                priceLineStyle: LineStyle.Dashed,
                lastValueVisible: true,
            });
            
            chartRef.current = chart;
            seriesRef.current = areaSeries;

            const handleResize = () => {
                if (chartRef.current && chartContainerRef.current) {
                    chartRef.current.applyOptions({ width: chartContainerRef.current.clientWidth, height: 350 });
                }
            };
            window.addEventListener('resize', handleResize);

            setLoading(false);
            setTimeout(() => setFadeIn(true), 50);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (chartRef.current) {
                    chartRef.current.remove();
                    chartRef.current = null;
                    seriesRef.current = null;
                }
            };
        } catch (e) {
            setChartError(true);
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 当颜色主题变化时，更新样式（不重建）
    useEffect(() => {
        if (!chartRef.current || !seriesRef.current) return;
        chartRef.current.applyOptions({
            layout: { backgroundColor, textColor, fontSize: 12, fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" },
            grid: { vertLines: { color: alpha(textColor, 0.1) }, horzLines: { color: alpha(textColor, 0.1) } },
            priceScale: { borderColor: alpha(textColor, 0.2), textColor },
            timeScale: { borderColor: alpha(textColor, 0.2) }
        });
        seriesRef.current.applyOptions({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor, priceLineColor: lineColor });
    }, [backgroundColor, textColor, lineColor, areaTopColor, areaBottomColor]);

    // 数据变化时，仅更新序列数据（避免重建造成闪烁）
    useEffect(() => {
        if (!seriesRef.current) return;

        // 处理空数据或无效数据的情况
        if (!Array.isArray(data) || data.length === 0) {
            setCurrentPrice(0);
            setPriceChange({ value: 0, percentage: 0 });
            if (seriesRef.current) {
                seriesRef.current.setData([]);
            }
            return;
        }

        try {
            const firstPrice = data[0]?.close ?? data[0]?.value ?? 0;
            const lastPrice = data[data.length - 1]?.close ?? data[data.length - 1]?.value ?? 0;
            const change = lastPrice - firstPrice;
            const percentage = firstPrice ? (change / firstPrice) * 100 : 0;
            setPriceChange({ value: change, percentage });
            setCurrentPrice(lastPrice);

            const areaData = data.map((item) => {
                let value = 0; let time = 0;
                if (typeof item.close !== 'undefined') { value = item.close; time = item.time; }
                else if (typeof item.value !== 'undefined') { value = item.value; time = item.time; }
                else if (typeof item.price !== 'undefined') { value = item.price; time = item.time || item.timestamp; }
                if (time > 1e12) time = Math.floor(time / 1000);
                return { time, value: Number(value) || 0 };
            }).filter(Boolean);

            seriesRef.current.setData(areaData);
            if (areaData.length > 0) {
                seriesRef.current.setMarkers([{ time: areaData[areaData.length - 1].time, position: 'inBar', color: percentage >= 0 ? '#26a69a' : '#ef5350', shape: 'circle', text: `$${lastPrice.toLocaleString()}` }]);
            }
            chartRef.current?.timeScale().fitContent();
            // 小幅淡入，增强丝滑感
            setFadeIn(false);
            requestAnimationFrame(() => setFadeIn(true));
        } catch (e) {
            setChartError(true);
        }
    }, [data]);

    const isPositive = priceChange.percentage >= 0;

    const SimpleFallbackChart = () => {
        if (!data || data.length === 0) return null;
        const values = data.map(item => item.close || item.value || 0);
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue;
        return (
            <Box sx={{ position: 'absolute', bottom: 60, left: 0, right: 0, height: 200, display: 'flex', alignItems: 'end', px: 2, gap: 0.5 }}>
                {values.map((value, index) => {
                    const height = range > 0 ? ((value - minValue) / range) * 180 + 20 : 100;
                    return (
                        <Box key={index} sx={{ flex: 1, height: `${height}px`, background: `linear-gradient(to top, ${areaBottomColor}, ${areaTopColor})`, borderRadius: '2px 2px 0 0', opacity: 0.8, transition: 'all 0.3s ease', '&:hover': { opacity: 1, transform: 'scaleY(1.05)' } }} />
                    );
                })}
            </Box>
        );
    };

    return (
        <Box sx={{ position: 'relative', width: '100%', height: '100%', background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.4)})`, backdropFilter: 'blur(10px)', borderRadius: 2, border: `1px solid ${alpha(theme.palette.divider, 0.1)}`, overflow: 'hidden', transition: 'opacity .25s ease', opacity: fadeIn ? 1 : 0.4, '&::before': { content: '""', position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`, zIndex: 1 } }}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute', backdropFilter: 'blur(2px)' }} open={loading}>
                <CircularProgress color="inherit" size={28} thickness={4} />
            </Backdrop>

            {/* 数据为空时的错误提示 */}
            {!loading && (!data || data.length === 0) && (
                <Box sx={{ 
                    position: 'absolute', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    textAlign: 'center',
                    zIndex: 2
                }}>
                    <Typography variant="h6" sx={{ 
                        color: theme.palette.error.main, 
                        mb: 1,
                        fontWeight: 600 
                    }}>
                        API连接失败
                    </Typography>
                    <Typography variant="body2" sx={{ 
                        color: alpha(theme.palette.text.secondary, 0.8),
                        mb: 2
                    }}>
                        无法获取实时价格数据
                    </Typography>
                    <Chip 
                        label="请检查网络连接" 
                        size="small"
                        color="error"
                        variant="outlined"
                        sx={{ 
                            backdropFilter: 'blur(10px)',
                            backgroundColor: alpha(theme.palette.error.main, 0.1)
                        }}
                    />
                </Box>
            )}

            <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: theme.palette.text.primary, textShadow: `0 2px 8px ${alpha(theme.palette.background.default, 0.8)}`, fontSize: { xs: '1.5rem', sm: '2rem' }, transition: 'color .2s ease' }}>
                    ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </Typography>
                <Chip icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />} label={`${isPositive ? '+' : ''}${priceChange.percentage.toFixed(2)}%`} size="small" sx={{ backgroundColor: isPositive ? alpha('#26a69a', 0.2) : alpha('#ef5350', 0.2), color: isPositive ? '#26a69a' : '#ef5350', border: `1px solid ${isPositive ? alpha('#26a69a', 0.3) : alpha('#ef5350', 0.3)}`, fontWeight: 600, '& .MuiChip-icon': { color: 'inherit' }, backdropFilter: 'blur(10px)' }} />
            </Box>

            <Box ref={chartContainerRef} sx={{ width: '100%', height: '100%', position: 'relative', display: chartError ? 'none' : 'block', '&::after': { content: '""', position: 'absolute', bottom: 0, left: 0, right: 0, height: '60px', background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.8)}, transparent)`, pointerEvents: 'none' } }} />
            {chartError && <SimpleFallbackChart />}
            <Box sx={{ position: 'absolute', top: -50, right: -50, width: 100, height: 100, borderRadius: '50%', background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`, pointerEvents: 'none' }} />
        </Box>
    );
}; 