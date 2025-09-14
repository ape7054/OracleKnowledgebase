/** @type {import('next').NextConfig} */
const nextConfig = {
  // API代理配置 - 转发到Go后端
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*',
      },
      {
        source: '/ws',
        destination: 'http://localhost:8080/ws',
      },
    ];
  },
  
  // CORS处理
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  
  // 图片优化配置
  images: {
    domains: ['images.unsplash.com', 'assets.coingecko.com'],
  },
  
  // 支持Material-UI
  transpilePackages: ['@mui/material', '@mui/system', '@mui/icons-material'],
};

module.exports = nextConfig; 