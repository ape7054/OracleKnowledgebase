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
    
    const {
        backgroundColor = 'transparent',
        textColor = theme.palette.text.primary,
        lineColor = theme.palette.primary.main,
        areaTopColor = theme.palette.primary.main,
        areaBottomColor = alpha(theme.palette.primary.main, 0.1),
    } = colors || {};

    const chartContainerRef = useRef(null);

    useEffect(() => {
        setLoading(true);

        if (!chartContainerRef.current || !data || data.length === 0) {
            console.log('TradingViewChart: Skipping render - no data or container');
            setLoading(false);
            return;
        }

        console.log('TradingViewChart: Start rendering, data sample:', data.slice(0, 2));

        try {
            setChartError(false);
            
            // 计算价格变化
            if (data.length >= 2) {
                const firstPrice = data[0].close || data[0].value || 0;
                const lastPrice = data[data.length - 1].close || data[data.length - 1].value || 0;
                const change = lastPrice - firstPrice;
                const changePercentage = firstPrice !== 0 ? (change / firstPrice) * 100 : 0;
                
                setPriceChange({ value: change, percentage: changePercentage });
                setCurrentPrice(lastPrice);
            }

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
                    vertLines: {
                        color: alpha(textColor, 0.1),
                        style: LineStyle.Solid,
                        visible: true,
                    },
                    horzLines: {
                        color: alpha(textColor, 0.1),
                        style: LineStyle.Solid,
                        visible: true,
                    },
                },
                crosshair: {
                    mode: 1, // Normal crosshair
                    vertLine: {
                        color: alpha(theme.palette.primary.main, 0.8),
                        width: 1,
                        style: LineStyle.Solid,
                        labelBackgroundColor: theme.palette.primary.main,
                    },
                    horzLine: {
                        color: alpha(theme.palette.primary.main, 0.8),
                        width: 1,
                        style: LineStyle.Solid,
                        labelBackgroundColor: theme.palette.primary.main,
                    },
                },
                priceScale: {
                    borderColor: alpha(textColor, 0.2),
                    textColor: textColor,
                    autoScale: true,
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.1,
                    },
                },
                timeScale: {
                    borderColor: alpha(textColor, 0.2),
                    textColor: textColor,
                    timeVisible: true,
                    secondsVisible: false,
                },
                watermark: {
                    visible: false,
                },
                handleScroll: {
                    mouseWheel: true,
                    pressedMouseMove: true,
                    horzTouchDrag: true,
                    vertTouchDrag: true,
                },
                handleScale: {
                    axisPressedMouseMove: {
                        time: true,
                        price: true,
                    },
                    axisDoubleClickReset: true,
                    mouseWheel: true,
                    pinch: true,
                },
            });

            // 使用lightweight-charts v3的API创建面积图系列
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
            
            // 转换数据格式
            const areaData = data.map(item => {
                // 优先级：close > value > 兼容其他格式
                let value = 0;
                let time = 0;
                
                if (typeof item.close !== 'undefined') {
                    // OHLC数据格式：{time, open, high, low, close}
                    value = item.close;
                    time = item.time;
                } else if (typeof item.value !== 'undefined') {
                    // 简单价格数据格式：{time, value}
                    value = item.value;
                    time = item.time;
                } else if (typeof item.price !== 'undefined') {
                    // 历史价格数据格式：{time, price}
                    value = item.price;
                    time = item.time || item.timestamp;
                } else {
                    // 兼容其他格式
                    console.warn('TradingViewChart: 未知的数据格式', item);
                    return null;
                }
                
                // 确保时间格式正确（Unix时间戳秒）
                if (time > 1e12) {
                    time = Math.floor(time / 1000); // 转换毫秒到秒
                }
                
                return { 
                    time: time, 
                    value: Number(value) || 0 
                };
            }).filter(item => item !== null); // 过滤掉无效数据
            
            console.log('TradingViewChart: 转换后的数据样本', areaData.slice(0, 3));
            
            if (areaData.length === 0) {
                console.warn('TradingViewChart: 转换后数据为空');
                return;
            }
            
            areaSeries.setData(areaData);
            
            // 添加价格线标记
            if (areaData.length > 0) {
                const markers = [{
                    time: areaData[areaData.length - 1].time,
                    position: 'inBar',
                    color: priceChange.percentage >= 0 ? '#26a69a' : '#ef5350',
                    shape: 'circle',
                    text: `$${currentPrice.toLocaleString()}`,
                }];
                areaSeries.setMarkers(markers);
            }

            chart.timeScale().fitContent();

            const handleResize = () => {
                if (chart && chartContainerRef.current) {
                    chart.applyOptions({ 
                        width: chartContainerRef.current.clientWidth,
                        height: 350 
                    });
                }
            };

            window.addEventListener('resize', handleResize);

            // 图表创建成功，停止加载动画
            setLoading(false);

            return () => {
                window.removeEventListener('resize', handleResize);
                if (chart) {
                    chart.remove();
                }
            };
        } catch (error) {
            console.error('TradingViewChart error:', error);
            setChartError(true);
            setLoading(false);
        }
    }, [data, backgroundColor, textColor, lineColor, areaTopColor, areaBottomColor, theme]);

    const isPositive = priceChange.percentage >= 0;

    // 简单的CSS图表作为后备方案
    const SimpleFallbackChart = () => {
        if (!data || data.length === 0) return null;
        
        const values = data.map(item => item.close || item.value || 0);
        const maxValue = Math.max(...values);
        const minValue = Math.min(...values);
        const range = maxValue - minValue;
        
        return (
            <Box sx={{ 
                position: 'absolute',
                bottom: 60,
                left: 0,
                right: 0,
                height: 200,
                display: 'flex',
                alignItems: 'end',
                px: 2,
                gap: 0.5,
            }}>
                {values.map((value, index) => {
                    const height = range > 0 ? ((value - minValue) / range) * 180 + 20 : 100;
                    return (
                        <Box
                            key={index}
                            sx={{
                                flex: 1,
                                height: `${height}px`,
                                background: `linear-gradient(to top, ${areaBottomColor}, ${areaTopColor})`,
                                borderRadius: '2px 2px 0 0',
                                opacity: 0.8,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    opacity: 1,
                                    transform: 'scaleY(1.05)',
                                }
                            }}
                        />
                    );
                })}
            </Box>
        );
    };

    return (
        <Box sx={{ 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.8)}, ${alpha(theme.palette.background.paper, 0.4)})`,
            backdropFilter: 'blur(10px)',
            borderRadius: 2,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            overflow: 'hidden',
            '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '1px',
                background: `linear-gradient(90deg, transparent, ${alpha(theme.palette.primary.main, 0.5)}, transparent)`,
                zIndex: 1,
            }
        }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {/* 价格信息覆盖层 */}
            <Box sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                zIndex: 2,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
            }}>
                <Typography 
                    variant="h4" 
                    sx={{ 
                        fontWeight: 700,
                        color: theme.palette.text.primary,
                        textShadow: `0 2px 8px ${alpha(theme.palette.background.default, 0.8)}`,
                        fontSize: { xs: '1.5rem', sm: '2rem' }
                    }}
                >
                    ${currentPrice.toLocaleString(undefined, { 
                        minimumFractionDigits: 2, 
                        maximumFractionDigits: 2 
                    })}
                </Typography>
                
                <Chip
                    icon={isPositive ? <TrendingUpIcon /> : <TrendingDownIcon />}
                    label={`${isPositive ? '+' : ''}${priceChange.percentage.toFixed(2)}%`}
                    size="small"
                    sx={{
                        backgroundColor: isPositive 
                            ? alpha('#26a69a', 0.2) 
                            : alpha('#ef5350', 0.2),
                        color: isPositive ? '#26a69a' : '#ef5350',
                        border: `1px solid ${isPositive ? alpha('#26a69a', 0.3) : alpha('#ef5350', 0.3)}`,
                        fontWeight: 600,
                        '& .MuiChip-icon': {
                            color: 'inherit',
                        },
                        backdropFilter: 'blur(10px)',
                    }}
                />
            </Box>

            {/* 图表容器 */}
            <Box 
                ref={chartContainerRef} 
                sx={{ 
                    width: '100%', 
                    height: '100%',
                    position: 'relative',
                    display: chartError ? 'none' : 'block',
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '60px',
                        background: `linear-gradient(to top, ${alpha(theme.palette.background.paper, 0.8)}, transparent)`,
                        pointerEvents: 'none',
                    }
                }} 
            />
            
            {/* 后备图表 */}
            {chartError && <SimpleFallbackChart />}
            
            {/* 装饰性光效 */}
            <Box sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent)`,
                pointerEvents: 'none',
            }} />
        </Box>
    );
}; 