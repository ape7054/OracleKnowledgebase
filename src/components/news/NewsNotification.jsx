import React, { useState, useEffect } from 'react';
import {
  Snackbar,
  Alert,
  Box,
  Typography,
  Chip,
  IconButton,
  Slide,
  Paper
} from '@mui/material';
import {
  Close,
  TrendingUp,
  TrendingDown,
  Notifications,
  NotificationsActive
} from '@mui/icons-material';
import { useTheme, alpha } from '@mui/material/styles';

// 实时新闻推送组件
const NewsNotification = () => {
  const theme = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // 模拟WebSocket连接
  useEffect(() => {
    // 模拟连接状态
    setIsConnected(true);

    // 模拟实时新闻推送
    const interval = setInterval(() => {
      const mockNews = [
        {
          id: Date.now(),
          title: 'Bitcoin突破新阻力位',
          summary: 'BTC价格突破$72,000，创下新的历史高点',
          sentiment: 'positive',
          priority: 'high',
          coins: ['BTC']
        },
        {
          id: Date.now() + 1,
          title: '以太坊网络升级完成',
          summary: 'ETH 2.0升级成功，gas费用大幅降低',
          sentiment: 'positive',
          priority: 'medium',
          coins: ['ETH']
        },
        {
          id: Date.now() + 2,
          title: 'DeFi协议遭受攻击',
          summary: '某知名DeFi协议发现安全漏洞，损失约$50M',
          sentiment: 'negative',
          priority: 'high',
          coins: ['DeFi']
        }
      ];

      // 随机推送新闻
      const randomNews = mockNews[Math.floor(Math.random() * mockNews.length)];
      randomNews.id = Date.now();
      
      setNotifications(prev => [randomNews, ...prev.slice(0, 4)]); // 保持最多5条通知
    }, 15000); // 每15秒推送一条新闻

    return () => clearInterval(interval);
  }, []);

  const handleCloseNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  return (
    <Box sx={{ position: 'fixed', top: 80, right: 20, zIndex: 1300, width: 350 }}>
      {/* 连接状态指示器 */}
      <Paper sx={{
        p: 1,
        mb: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: alpha(theme.palette.background.paper, 0.9),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
      }}>
        {isConnected ? (
          <NotificationsActive sx={{ 
            color: '#00ff88', 
            fontSize: 16,
            animation: 'pulse 2s infinite'
          }} />
        ) : (
          <Notifications sx={{ color: 'text.secondary', fontSize: 16 }} />
        )}
        <Typography variant="caption" color="text.secondary">
          {isConnected ? '实时新闻已连接' : '连接中...'}
        </Typography>
      </Paper>

      {/* 新闻通知列表 */}
      {notifications.map((notification, index) => (
        <Slide
          key={notification.id}
          direction="left"
          in={true}
          timeout={300}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <Paper sx={{
            p: 2,
            mb: 1,
            backgroundColor: alpha(theme.palette.background.paper, 0.95),
            backdropFilter: 'blur(10px)',
            border: `1px solid ${alpha(
              notification.sentiment === 'positive' ? '#00ff88' : 
              notification.sentiment === 'negative' ? '#ff4757' : 
              theme.palette.primary.main, 0.3
            )}`,
            borderLeft: `4px solid ${
              notification.sentiment === 'positive' ? '#00ff88' : 
              notification.sentiment === 'negative' ? '#ff4757' : 
              theme.palette.primary.main
            }`,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateX(-5px)',
              boxShadow: theme.shadows[8]
            }
          }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
              <Box sx={{ flex: 1 }}>
                {/* 优先级和情绪指示器 */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  {notification.priority === 'high' && (
                    <Chip
                      label="重要"
                      size="small"
                      color="error"
                      variant="filled"
                      sx={{ height: 18, fontSize: 10 }}
                    />
                  )}
                  <Chip
                    icon={notification.sentiment === 'positive' ? <TrendingUp /> : <TrendingDown />}
                    label={notification.sentiment === 'positive' ? '利好' : '利空'}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: 10,
                      backgroundColor: alpha(
                        notification.sentiment === 'positive' ? '#00ff88' : '#ff4757', 0.1
                      ),
                      color: notification.sentiment === 'positive' ? '#00ff88' : '#ff4757',
                      '& .MuiChip-icon': {
                        fontSize: 12,
                        color: notification.sentiment === 'positive' ? '#00ff88' : '#ff4757'
                      }
                    }}
                  />
                  {notification.coins.map(coin => (
                    <Chip
                      key={coin}
                      label={coin}
                      size="small"
                      variant="outlined"
                      sx={{ height: 18, fontSize: 10 }}
                    />
                  ))}
                </Box>

                {/* 标题 */}
                <Typography variant="subtitle2" sx={{ 
                  fontWeight: 600, 
                  mb: 0.5,
                  lineHeight: 1.2
                }}>
                  {notification.title}
                </Typography>

                {/* 摘要 */}
                <Typography variant="caption" color="text.secondary" sx={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  lineHeight: 1.3
                }}>
                  {notification.summary}
                </Typography>

                {/* 时间戳 */}
                <Typography variant="caption" color="text.secondary" sx={{ 
                  display: 'block', 
                  mt: 0.5,
                  opacity: 0.7
                }}>
                  刚刚
                </Typography>
              </Box>

              {/* 关闭按钮 */}
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseNotification(notification.id);
                }}
                sx={{ 
                  opacity: 0.5, 
                  '&:hover': { opacity: 1 },
                  width: 24,
                  height: 24
                }}
              >
                <Close sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          </Paper>
        </Slide>
      ))}

      {/* CSS动画 */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Box>
  );
};

export default NewsNotification;
