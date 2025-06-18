// 模拟市场数据
const marketData = {
  totalMarketCap: '2.1T',
  btcDominance: '42%',
  ethDominance: '18%',
  dailyVolume: '120B',
};

// 模拟价格数据
const priceData = [
  { time: '00:00', BTC: 60000, ETH: 4000, SOL: 100 },
  { time: '04:00', BTC: 61000, ETH: 4100, SOL: 105 },
  { time: '08:00', BTC: 59500, ETH: 3950, SOL: 98 },
  { time: '12:00', BTC: 62000, ETH: 4200, SOL: 110 },
  { time: '16:00', BTC: 63000, ETH: 4300, SOL: 115 },
  { time: '20:00', BTC: 62500, ETH: 4250, SOL: 112 },
  { time: '24:00', BTC: 63500, ETH: 4350, SOL: 118 },
];

// 模拟热门币种数据
const topCoins = [
  { name: 'Bitcoin', symbol: 'BTC', price: 63500, change: 2.5 },
  { name: 'Ethereum', symbol: 'ETH', price: 4350, change: 3.2 },
  { name: 'Solana', symbol: 'SOL', price: 118, change: 5.1 },
  { name: 'Binance Coin', symbol: 'BNB', price: 520, change: -1.2 },
  { name: 'Cardano', symbol: 'ADA', price: 1.2, change: -0.5 },
];

// 模拟交易对数据
const tradingPairs = [
  { value: 'BTC/USDT', label: 'BTC/USDT', lastPrice: 63500, change: 2.5 },
  { value: 'ETH/USDT', label: 'ETH/USDT', lastPrice: 4350, change: 3.2 },
  { value: 'SOL/USDT', label: 'SOL/USDT', lastPrice: 118, change: 5.1 },
  { value: 'BNB/USDT', label: 'BNB/USDT', lastPrice: 520, change: -1.2 },
];

// 模拟订单簿数据
const orderBooks = {
  'BTC/USDT': {
    asks: [
      { price: 63600, amount: 0.5, total: 31800 },
      { price: 63550, amount: 1.2, total: 76260 },
      { price: 63500, amount: 0.8, total: 50800 },
      { price: 63450, amount: 2.0, total: 126900 },
      { price: 63400, amount: 1.5, total: 95100 },
    ],
    bids: [
      { price: 63350, amount: 1.0, total: 63350 },
      { price: 63300, amount: 1.8, total: 113940 },
      { price: 63250, amount: 0.6, total: 37950 },
      { price: 63200, amount: 2.5, total: 158000 },
      { price: 63150, amount: 1.2, total: 75780 },
    ]
  },
  'ETH/USDT': {
    asks: [
      { price: 4360, amount: 2.5, total: 10900 },
      { price: 4355, amount: 3.2, total: 13936 },
      { price: 4350, amount: 1.8, total: 7830 },
      { price: 4345, amount: 4.0, total: 17380 },
      { price: 4340, amount: 2.5, total: 10850 },
    ],
    bids: [
      { price: 4335, amount: 3.0, total: 13005 },
      { price: 4330, amount: 2.8, total: 12124 },
      { price: 4325, amount: 1.6, total: 6920 },
      { price: 4320, amount: 5.5, total: 23760 },
      { price: 4315, amount: 3.2, total: 13808 },
    ]
  }
};

// 模拟用户资产数据
const userAssets = [
  { coin: 'BTC', name: 'Bitcoin', balance: 0.85, value: 53975, icon: '₿' },
  { coin: 'ETH', name: 'Ethereum', balance: 12.5, value: 54375, icon: 'Ξ' },
  { coin: 'SOL', name: 'Solana', balance: 145.8, value: 17205.24, icon: 'S' },
  { coin: 'USDT', name: 'Tether', balance: 10500, value: 10500, icon: '$' },
  { coin: 'BNB', name: 'Binance Coin', balance: 25.4, value: 13208, icon: 'B' },
];

// 模拟交易历史数据
const transactionHistory = [
  { id: 1, type: 'buy', coin: 'BTC', amount: 0.15, price: 62500, total: 9375, time: '2023-10-15 14:30', status: 'completed' },
  { id: 2, type: 'sell', coin: 'ETH', amount: 2.5, price: 4300, total: 10750, time: '2023-10-14 09:45', status: 'completed' },
  { id: 3, type: 'buy', coin: 'SOL', amount: 50, price: 115, total: 5750, time: '2023-10-12 16:20', status: 'completed' },
  { id: 4, type: 'deposit', coin: 'USDT', amount: 5000, price: 1, total: 5000, time: '2023-10-10 11:10', status: 'completed' },
  { id: 5, type: 'withdraw', coin: 'BTC', amount: 0.05, price: 63000, total: 3150, time: '2023-10-08 15:35', status: 'processing' },
];

// 模拟 API 延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟 API 服务
export const api = {
  // 获取市场概览数据
  getMarketOverview: async () => {
    await delay(800);
    return {
      marketStats: marketData,
      priceData: priceData,
      topCoins: topCoins
    };
  },
  
  // 获取交易对列表
  getTradingPairs: async () => {
    await delay(500);
    return tradingPairs;
  },
  
  // 获取特定交易对的订单簿
  getOrderBook: async (pair) => {
    await delay(300);
    return orderBooks[pair] || orderBooks['BTC/USDT'];
  },
  
  // 获取用户资产
  getUserAssets: async () => {
    await delay(600);
    return userAssets;
  },
  
  // 获取交易历史
  getTransactionHistory: async () => {
    await delay(700);
    return transactionHistory;
  },
  
  // 模拟下单
  placeOrder: async (orderData) => {
    await delay(1000);
    const { type, pair, price, amount } = orderData;
    const total = price * amount;
    
    // 生成一个随机的订单 ID
    const orderId = Math.floor(Math.random() * 1000000);
    
    return {
      success: true,
      orderId: orderId,
      message: `${type === 'buy' ? '买入' : '卖出'}订单已提交`,
      orderDetails: {
        id: orderId,
        type,
        pair,
        price,
        amount,
        total,
        status: 'processing',
        time: new Date().toLocaleString()
      }
    };
  }
}; 