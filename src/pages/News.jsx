import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Link,
  Divider,
  Chip,
  Paper,
  Avatar,
  IconButton,
  useMediaQuery,
  TextField,
  InputAdornment,
  Button,
  ButtonGroup,
  Stack,
  Badge,
  Fade,
  Slide
} from '@mui/material';
import { useTheme, alpha, keyframes } from '@mui/material/styles';
import {
  Newspaper,
  AccessTime,
  BookmarkBorder,
  Share,
  ArrowUpward,
  Refresh,
  Visibility,
  Search,
  TrendingUp,
  TrendingDown,
  FilterList,
  Notifications,
  Star,
  Timeline,
  Assessment,
  FiberManualRecord,
  OpenInNew
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// 模拟市场情绪数据
const sentimentData = [
  { name: '7/15', bitcoin: 65, ethereum: 45, overall: 55 },
  { name: '7/16', bitcoin: 70, ethereum: 50, overall: 60 },
  { name: '7/17', bitcoin: 60, ethereum: 55, overall: 58 },
  { name: '7/18', bitcoin: 75, ethereum: 60, overall: 68 },
  { name: '7/19', bitcoin: 80, ethereum: 70, overall: 75 },
  { name: '7/20', bitcoin: 85, ethereum: 75, overall: 80 },
  { name: '7/21', bitcoin: 90, ethereum: 80, overall: 85 },
];

// 模拟从 RSS 获取的新闻数据
const mockNewsData = [
  {
    title: "Bitcoin突破$250,000大关，创历史新高",
    link: "#",
    pubDate: "2小时前",
    description: "比特币价格在大型金融机构和主权基金持续买入的推动下突破25万美元，创下历史新高...",
    source: "CoinDesk",
    impact: "高",
    sentiment: "正面",
    views: 5420,
    category: "市场"
  },
  {
    title: "以太坊 3.0 升级成功完成，交易速度提升10倍",
    link: "#",
    pubDate: "4小时前",
    description: "以太坊网络完成了期待已久的3.0升级，交易处理能力大幅提升，同时能耗降低了95%...",
    source: "CoinDesk",
    impact: "高",
    sentiment: "正面",
    views: 4230,
    category: "技术"
  },
  {
    title: "中国央行数字货币试点扩大至全国范围",
    link: "#",
    pubDate: "6小时前",
    description: "中国人民银行宣布数字人民币试点将扩大至全国范围，标志着全球最大规模的CBDC项目进入新阶段...",
    source: "CoinDesk",
    impact: "中",
    sentiment: "中性",
    views: 3150,
    category: "监管"
  },
  {
    title: "Solana生态系统TVL突破1万亿美元",
    link: "#",
    pubDate: "8小时前",
    description: "Solana区块链上锁定的总价值突破1万亿美元大关，成为DeFi领域增长最快的生态系统...",
    source: "CoinDesk",
    impact: "中",
    sentiment: "正面",
    views: 2840,
    category: "DeFi"
  },
  {
    title: "元宇宙土地销售创下新记录，单笔交易达8500万美元",
    link: "#",
    pubDate: "10小时前",
    description: "随着大型科技公司和娱乐巨头加速布局元宇宙，虚拟土地价格再创新高，单块地块售价达8500万美元...",
    source: "CoinDesk",
    impact: "低",
    sentiment: "正面",
    views: 2320,
    category: "NFT"
  },
  {
    title: "美联储推出数字美元试点项目，与私营稳定币并行",
    link: "#",
    pubDate: "12小时前",
    description: "美联储正式启动数字美元试点项目，采用双层分发模式，并表示将与现有的私营稳定币生态系统共存...",
    source: "CoinDesk",
    impact: "高",
    sentiment: "中性",
    views: 3980,
    category: "监管"
  },
  {
    title: "Layer 3解决方案推动Web3应用用户体验突破",
    link: "#",
    pubDate: "14小时前",
    description: "新一代Layer 3扩容技术使区块链应用的用户体验首次接近传统Web2应用，交易确认时间降至毫秒级...",
    source: "CoinDesk",
    impact: "中",
    sentiment: "正面",
    views: 1890,
    category: "技术"
  }
];

// 获取影响力标签颜色
const getImpactColor = (impact) => {
  switch (impact) {
    case '高':
      return { bg: 'rgba(255, 72, 66, 0.16)', color: '#FF4842' };
    case '中':
      return { bg: 'rgba(255, 193, 7, 0.16)', color: '#FFC107' };
    case '低':
      return { bg: 'rgba(54, 179, 126, 0.16)', color: '#36B37E' };
    default:
      return { bg: 'rgba(145, 158, 171, 0.16)', color: '#919EAB' };
  }
};

// 获取情绪标签颜色
const getSentimentColor = (sentiment) => {
  switch (sentiment) {
    case '正面':
      return { bg: 'rgba(54, 179, 126, 0.16)', color: '#36B37E' };
    case '负面':
      return { bg: 'rgba(255, 72, 66, 0.16)', color: '#FF4842' };
    case '中性':
      return { bg: 'rgba(24, 144, 255, 0.16)', color: '#1890FF' };
    default:
      return { bg: 'rgba(145, 158, 171, 0.16)', color: '#919EAB' };
  }
};

// 新闻项组件
const NewsItem = ({ news }) => {
  const theme = useTheme();
  const impactStyle = getImpactColor(news.impact);
  const sentimentStyle = getSentimentColor(news.sentiment);
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        mb: 2, 
        p: 2, 
        borderRadius: 2,
        transition: 'transform 0.3s, box-shadow 0.3s',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: `0 8px 24px 0 ${alpha(theme.palette.mode === 'dark' ? '#000' : '#919EAB', 0.2)}`
        }
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            sx={{ 
              width: 24, 
              height: 24, 
              bgcolor: theme.palette.primary.main,
              fontSize: '0.75rem'
            }}
          >
            {news.source.charAt(0)}
          </Avatar>
          <Typography variant="caption" color="text.secondary">
            {news.source}
          </Typography>
          <AccessTime sx={{ fontSize: 12, color: theme.palette.text.secondary, ml: 1 }} />
          <Typography variant="caption" color="text.secondary">
            {news.pubDate}
          </Typography>
        </Box>
        <Box>
          <IconButton size="small" sx={{ ml: 1 }}>
            <BookmarkBorder fontSize="small" />
          </IconButton>
          <IconButton size="small" sx={{ ml: 0.5 }}>
            <Share fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      
      <Link 
        href={news.link}
        sx={{ 
          color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
          textDecoration: 'none',
          fontWeight: 700,
          fontSize: '1.1rem',
          display: 'block',
          mb: 1,
          '&:hover': {
            textDecoration: 'underline'
          }
        }}
      >
        {news.title}
      </Link>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {news.description}
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Chip 
          label={news.category} 
          size="small"
          sx={{ 
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            color: theme.palette.primary.main,
            fontWeight: 500
          }}
        />
        <Chip 
          label={`影响力: ${news.impact}`}
          size="small"
          sx={{ 
            backgroundColor: impactStyle.bg,
            color: impactStyle.color,
            fontWeight: 500
          }}
        />
        <Chip 
          label={`情绪: ${news.sentiment}`}
          size="small"
          sx={{ 
            backgroundColor: sentimentStyle.bg,
            color: sentimentStyle.color,
            fontWeight: 500
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Visibility sx={{ fontSize: 14, color: theme.palette.text.secondary, mr: 0.5 }} />
          <Typography variant="caption" color="text.secondary">
            {news.views.toLocaleString()}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

// 市场情绪分析组件
const NewsImpactAnalysis = () => {
  const theme = useTheme();
  
  return (
    <Paper
      elevation={0}
      sx={{ 
        p: 2, 
        borderRadius: 2,
        mb: 3,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          市场情绪分析
        </Typography>
        <IconButton size="small">
          <Refresh fontSize="small" />
        </IconButton>
      </Box>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ textAlign: 'center', p: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            比特币情绪指数
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#36B37E' }}>
              90
            </Typography>
            <ArrowUpward sx={{ color: '#36B37E', ml: 0.5 }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#36B37E' }}>
            +5% 今日
          </Typography>
        </Box>
        
        <Divider orientation="vertical" flexItem />
        
        <Box sx={{ textAlign: 'center', p: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            以太坊情绪指数
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#36B37E' }}>
              80
            </Typography>
            <ArrowUpward sx={{ color: '#36B37E', ml: 0.5 }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#36B37E' }}>
            +5% 今日
          </Typography>
        </Box>
        
        <Divider orientation="vertical" flexItem />
        
        <Box sx={{ textAlign: 'center', p: 1 }}>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            整体市场情绪
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700, color: '#36B37E' }}>
              85
            </Typography>
            <ArrowUpward sx={{ color: '#36B37E', ml: 0.5 }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#36B37E' }}>
            +7% 今日
          </Typography>
        </Box>
      </Box>
      
      <Box sx={{ height: 200, mt: 3 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={sentimentData}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
            <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
            <YAxis stroke={theme.palette.text.secondary} />
            <RechartsTooltip 
              contentStyle={{ 
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`
              }} 
            />
            <Line 
              type="monotone" 
              dataKey="bitcoin" 
              stroke="#FF9500" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="ethereum" 
              stroke="#627EEA" 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line 
              type="monotone" 
              dataKey="overall" 
              stroke={theme.palette.primary.main} 
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

const News = () => {
  const theme = useTheme();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 模拟从 CoinDesk RSS 获取新闻
  useEffect(() => {
    // 在实际应用中，这里应该是一个真实的 API 调用
    setTimeout(() => {
      setNews(mockNewsData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Box sx={{
      minHeight: '100vh',
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.8) 50%, rgba(51, 65, 85, 0.7) 100%)'
        : 'linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 50%, rgba(226, 232, 240, 0.7) 100%)',
      position: 'relative'
    }}>
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 4 }}>
        {/* 页面标题 */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)'
                : 'linear-gradient(135deg, #1e293b 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Crypto News Center
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
          >
            实时加密货币新闻和市场分析，掌握最新市场动态
          </Typography>
        </Box>

        {/* 市场情绪分析 */}
        <NewsImpactAnalysis />

        <Grid container spacing={3}>
          {/* 左侧新闻列表 */}
          <Grid item xs={12} md={8}>
            {/* 新闻列表标题 */}
            <Paper
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                mb: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Newspaper sx={{ mr: 1, color: theme.palette.primary.main }} />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  CoinDesk 最新新闻
                </Typography>
              </Box>
            </Paper>
            
            {/* 新闻列表 */}
            <Box>
              {loading ? (
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  height: 400
                }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                  {news.map((item, index) => (
                    <NewsItem key={index} news={item} />
                  ))}
                </>
              )}
            </Box>
          </Grid>
          
          {/* 右侧边栏 */}
          <Grid item xs={12} md={4}>
            {/* 热门标签 */}
            <Paper
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                mb: 3,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                热门标签
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {['比特币', '以太坊', 'DeFi', 'NFT', '元宇宙', '监管', '中国', '美联储', 'Layer 2', 'Solana'].map((tag, index) => (
                  <Chip 
                    key={index}
                    label={tag}
                    clickable
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: alpha(theme.palette.primary.main, 0.2),
                      }
                    }}
                  />
                ))}
              </Box>
            </Paper>
            
            {/* 功能列表 */}
            <Paper
              elevation={0}
              sx={{ 
                p: 2, 
                borderRadius: 2,
                border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                功能列表
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  '✅ 新闻搜索和高级筛选',
                  '✅ 新闻影响力分析面板',
                  '✅ 新闻详情页面开发',
                  '✅ 实时新闻推送功能',
                  '✅ 新闻分类和标签系统',
                  '✅ 个性化新闻推荐'
                ].map((feature, index) => (
                  <Card key={index} sx={{
                    p: 1,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(0, 255, 136, 0.1)'
                      : 'rgba(0, 255, 136, 0.05)',
                    border: '1px solid rgba(0, 255, 136, 0.2)',
                    borderRadius: 1
                  }}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {feature}
                    </Typography>
                  </Card>
                ))}
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default News;
