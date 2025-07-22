# MarketPulse 技术架构文档

## 🏗️ 项目架构

### 目录结构
```
market-pulse/
├── src/
│   ├── components/          # 可复用组件
│   │   ├── CryptoNews.jsx
│   │   ├── NewsDetail.jsx
│   │   ├── NewsNotification.jsx
│   │   └── PersonalizedNews.jsx
│   ├── pages/              # 页面组件
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── News.jsx
│   │   ├── Trade.jsx
│   │   └── Account.jsx
│   ├── context/            # React Context
│   │   └── ThemeContext.jsx
│   ├── api/               # API服务
│   │   └── marketApi.js
│   ├── assets/            # 静态资源
│   └── App.jsx            # 主应用组件
├── public/                # 公共资源
└── package.json          # 项目配置
```

### 核心技术栈
- **React 18**: 现代化前端框架
- **Vite**: 快速构建工具
- **Material-UI**: UI组件库
- **Recharts**: 数据可视化
- **React Router**: 路由管理

## 🎨 设计系统

### 主题配置
```javascript
// ThemeContext.jsx
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#2196F3' },
    secondary: { main: '#FF4081' },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    }
  }
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3366FF' },
    secondary: { main: '#FF6B9D' },
    background: {
      default: '#0F1419',
      paper: '#1A1F2E'
    }
  }
});
```

### 样式系统
- **CSS-in-JS**: 使用Material-UI的sx属性
- **渐变背景**: 专业的视觉效果
- **毛玻璃效果**: backdrop-filter实现
- **响应式设计**: breakpoints适配

## 📊 数据管理

### API服务架构
```javascript
// marketApi.js
export const marketApi = {
  async getMarketData(limit = 50) {
    const response = await apiClient.get(`/market/data?limit=${limit}`);
    return response.data;
  }
};

// 缓存机制
export const cachedMarketApi = {
  cache: new Map(),
  cacheTimeout: 30000, // 30秒缓存
  
  async getMarketData(limit = 50) {
    const cacheKey = `market-data-${limit}`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    
    const data = await marketApi.getMarketData(limit);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
};
```

### 数据转换器
```javascript
export const dataTransformers = {
  transformCoinData(coin) {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol?.toUpperCase(),
      price: parseFloat(coin.current_price || 0),
      change24h: parseFloat(coin.price_change_percentage_24h || 0),
      marketCap: parseFloat(coin.market_cap || 0),
      volume: parseFloat(coin.total_volume || 0)
    };
  },
  
  transformMarketSummary(data) {
    const totalMarketCap = data.reduce((sum, coin) => sum + (coin.market_cap || 0), 0);
    const totalVolume = data.reduce((sum, coin) => sum + (coin.total_volume || 0), 0);
    
    return {
      totalMarketCap: `$${(totalMarketCap / 1e12).toFixed(2)}T`,
      dailyVolume: `$${(totalVolume / 1e9).toFixed(1)}B`,
      btcDominance: '42.3%',
      ethDominance: '18.7%'
    };
  }
};
```

## 🔧 核心组件

### 新闻中心组件
```javascript
// News.jsx - 主要功能
const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSentiment, setSelectedSentiment] = useState('all');
  
  // 搜索和筛选逻辑
  const filteredNews = useMemo(() => {
    return newsData.filter(news => {
      const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
      const matchesSentiment = selectedSentiment === 'all' || news.sentiment === selectedSentiment;
      
      return matchesSearch && matchesCategory && matchesSentiment;
    });
  }, [searchTerm, selectedCategory, selectedSentiment]);
  
  return (
    // JSX结构
  );
};
```

### 仪表板组件
```javascript
// Dashboard.jsx - 数据获取
const Dashboard = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchMarketData = async () => {
    try {
      setLoading(true);
      const response = await cachedMarketApi.getMarketData(20);
      
      if (response.success && response.data) {
        const transformedData = response.data.map(dataTransformers.transformCoinData);
        setMarketData(transformedData);
      }
    } catch (err) {
      setError('Failed to load market data');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    // JSX结构
  );
};
```

## 🎯 性能优化

### 代码分割
```javascript
// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const News = lazy(() => import('./pages/News'));

// 使用Suspense包装
<Suspense fallback={<Loading />}>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/news" element={<News />} />
  </Routes>
</Suspense>
```

### 缓存策略
- API响应缓存（30秒）
- 图片懒加载
- 组件状态优化

### 响应式设计
```javascript
// 断点使用
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

// 响应式样式
sx={{
  display: { xs: 'none', md: 'block' },
  width: { xs: '100%', md: '50%' },
  padding: { xs: 2, md: 4 }
}}
```

## 🔐 错误处理

### API错误处理
```javascript
// 统一错误处理
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.status, error.message);
    
    if (error.response?.status === 429) {
      // 处理限流
      return new Promise(resolve => {
        setTimeout(() => resolve(apiClient.request(error.config)), 1000);
      });
    }
    
    return Promise.reject(error);
  }
);
```

### 组件错误边界
```javascript
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Component Error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    
    return this.props.children;
  }
}
```

## 📱 移动端适配

### 响应式导航
- 桌面端：永久侧边栏
- 移动端：可收缩抽屉式导航
- 自适应图标和文字大小

### 触摸优化
- 适当的点击区域大小
- 滑动手势支持
- 触摸反馈效果

---

**维护说明**: 代码结构清晰，组件职责分明，易于维护和扩展。遵循React最佳实践和Material-UI设计规范。
