const http = require('http');

// 模拟交易数据
const mockTrades = [
  { id: 1, price: "29384.50", amount: "0.1253", time: "10:15:30", type: "buy" },
  { id: 2, price: "29380.75", amount: "0.0532", time: "10:15:25", type: "sell" },
  { id: 3, price: "29385.00", amount: "0.2100", time: "10:15:20", type: "buy" },
  { id: 4, price: "29379.25", amount: "0.1750", time: "10:15:15", type: "sell" },
  { id: 5, price: "29382.50", amount: "0.0825", time: "10:15:10", type: "buy" }
];

console.log('模拟服务器正在初始化...');

// 创建 HTTP 服务器
const server = http.createServer((req, res) => {
  console.log(`收到请求: ${req.method} ${req.url}`);
  
  // 设置 CORS 头，允许前端访问
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // 处理 OPTIONS 请求（CORS 预检）
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    console.log('处理了 OPTIONS 请求');
    return;
  }
  
  // 解析 URL 路径
  const url = req.url;
  
  // 健康检查 API
  if (url === '/api/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const response = { status: 'ok', version: '1.0.2-mock' };
    res.end(JSON.stringify(response));
    console.log('健康检查响应:', response);
    return;
  }
  
  // 获取交易记录 API
  if (url === '/api/trades' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(mockTrades));
    console.log('返回交易记录:', mockTrades.length, '条');
    return;
  }
  
  // 创建交易记录 API
  if (url === '/api/trades' && req.method === 'POST') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        console.log('收到的 POST 数据:', body);
        const trade = JSON.parse(body);
        trade.id = mockTrades.length + 1;
        trade.time = new Date().toLocaleTimeString('en-US', { hour12: false });
        mockTrades.unshift(trade);
        
        res.writeHead(201, { 'Content-Type': 'application/json' });
        const response = { status: '交易记录已创建' };
        res.end(JSON.stringify(response));
        
        console.log('新交易已添加:', trade);
      } catch (error) {
        console.error('处理 POST 请求时出错:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: '无效的请求数据' }));
      }
    });
    
    return;
  }
  
  // WebSocket 相关 API 的模拟响应
  if (url === '/ws/trades' && req.method === 'GET') {
    // 由于我们不能真正实现 WebSocket，所以返回一个友好的错误消息
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket 服务在模拟服务器中不可用。请使用 HTTP API 代替。');
    console.log('尝试访问 WebSocket 端点');
    return;
  }
  
  // 未找到的路由
  console.log('未找到路由:', req.url);
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: '未找到请求的资源' }));
});

// 启动服务器
const PORT = 8080;
server.on('error', (error) => {
  console.error('服务器错误:', error);
});

try {
  server.listen(PORT, () => {
    console.log(`模拟后端服务器运行在 http://localhost:${PORT}`);
    console.log('提供的 API:');
    console.log('- GET /api/health - 健康检查');
    console.log('- GET /api/trades - 获取交易记录');
    console.log('- POST /api/trades - 创建交易记录');
    console.log('- GET /ws/trades - WebSocket 端点 (仅提供占位符响应)');
  });
} catch (error) {
  console.error('启动服务器时出错:', error);
} 