import api from './api';

// 临时的本地存储模拟
const MOCK_TRADES_KEY = 'mock_trades';

// 获取模拟交易数据
const getMockTrades = () => {
  const stored = localStorage.getItem(MOCK_TRADES_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  
  // 生成初始模拟数据
  const basePrice = 63500;
  const traders = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'];
  
  const initialTrades = Array.from({ length: 15 }, (_, i) => {
    const priceVariation = (Math.random() - 0.5) * 1000;
    const isBuy = Math.random() > 0.5;
    const amount = (Math.random() * 2 + 0.1).toFixed(4);
    const price = (basePrice + priceVariation).toFixed(2);
    
    return {
      ID: i + 1,
      Type: isBuy ? 'buy' : 'sell',
      Symbol: 'BTC/USDT',
      Price: price,
      Amount: amount,
      Total: (parseFloat(price) * parseFloat(amount)).toFixed(2),
      CreatedAt: new Date(Date.now() - Math.random() * 3600000 * 24).toISOString(),
      UserID: Math.floor(Math.random() * 8) + 1,
      Status: 'completed'
    };
  });
  
  localStorage.setItem(MOCK_TRADES_KEY, JSON.stringify(initialTrades));
  return initialTrades;
};

// 保存交易数据
const saveMockTrades = (trades) => {
  localStorage.setItem(MOCK_TRADES_KEY, JSON.stringify(trades));
};

/**
 * 创建一笔新交易
 */
export const createTrade = async (tradeData) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  try {
    const existingTrades = getMockTrades();
    
    // 创建新交易对象
    const newTrade = {
      ID: Date.now(), // 使用时间戳作为唯一ID
      Type: tradeData.type,
      Symbol: tradeData.symbol,
      Price: tradeData.price.toString(),
      Amount: tradeData.amount.toString(),
      Total: (tradeData.price * tradeData.amount).toFixed(2),
      CreatedAt: new Date().toISOString(),
      UserID: 1, // 当前用户ID
      Status: 'completed'
    };
    
    // 添加到列表顶部
    const updatedTrades = [newTrade, ...existingTrades];
    saveMockTrades(updatedTrades);
    
    return {
      success: true,
      data: newTrade,
      message: 'Trade created successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create trade'
    };
  }
};

/**
 * 获取最近的交易历史
 */
export const getRecentTrades = async (symbol) => {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const trades = getMockTrades();
    // 按创建时间排序，最新的在前面
    return trades.sort((a, b) => new Date(b.CreatedAt) - new Date(a.CreatedAt));
  } catch (error) {
    console.error('Error fetching recent trades:', error);
    return [];
  }
}; 