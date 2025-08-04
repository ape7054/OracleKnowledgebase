import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // 使用 Vite 代理
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：在每个请求发送前附加token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 (可选): 处理全局错误，例如 token 失效
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token 失效，可以在这里处理登出逻辑
      console.error('Unauthorized, redirecting to login...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // window.location.href = '/login'; // 强制刷新并跳转
    }
    return Promise.reject(error);
  }
);

export default api; 