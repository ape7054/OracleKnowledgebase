/** @type {import('next').NextConfig} */
const nextConfig = {
  // 优化性能配置
  experimental: {
    // optimizeCss: true, // 暂时禁用，避免critters依赖问题
  },
  
  // 编译器优化
  compiler: {
    // 移除 console.log (生产环境)
    removeConsole: process.env.NODE_ENV === 'production',
    // 启用 SWC 压缩
    styledComponents: true,
  },

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
      // 添加安全和性能头部
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
  
  // 图片优化配置
  images: {
    domains: ['images.unsplash.com', 'assets.coingecko.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // 支持Material-UI和优化包转换
  transpilePackages: [
    '@mui/material', 
    '@mui/system', 
    '@mui/icons-material',
    '@mui/material-nextjs'
  ],

  // 性能优化
  poweredByHeader: false,
  generateEtags: false,
  
  // 静态资源优化
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
};

module.exports = nextConfig; 