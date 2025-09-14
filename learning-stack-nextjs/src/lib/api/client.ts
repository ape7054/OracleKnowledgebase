import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

// API客户端类
export class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string = '/api') {
    this.client = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.client.interceptors.request.use(
      (config) => {
        // 添加认证token
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.client.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        // 统一错误处理
        if (error.response) {
          const { status, data } = error.response;
          
          switch (status) {
            case 401:
              // 未授权，清除token并跳转登录
              localStorage.removeItem('token');
              toast.error('登录已过期，请重新登录');
              window.location.href = '/login';
              break;
            case 403:
              toast.error('权限不足');
              break;
            case 404:
              toast.error('请求的资源不存在');
              break;
            case 500:
              toast.error('服务器错误，请稍后重试');
              break;
            default:
              toast.error(data?.message || '请求失败');
          }
        } else if (error.request) {
          toast.error('网络错误，请检查网络连接');
        } else {
          toast.error('请求配置错误');
        }
        
        return Promise.reject(error);
      }
    );
  }

  // GET请求
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.get(url, config);
  }

  // POST请求
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post(url, data, config);
  }

  // PUT请求
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put(url, data, config);
  }

  // DELETE请求
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config);
  }

  // PATCH请求
  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.patch(url, data, config);
  }
}

// 创建默认的API客户端实例
export const apiClient = new ApiClient();

// 认证API
export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    apiClient.post('/auth/login', credentials),
  
  register: (userData: { username: string; password: string; email?: string }) =>
    apiClient.post('/auth/register', userData),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  verify: () =>
    apiClient.get('/auth/verify'),
  
  refreshToken: () =>
    apiClient.post('/auth/refresh'),
};

// 市场数据API
export const marketApi = {
  getCoins: (params?: { limit?: number; page?: number }) =>
    apiClient.get('/market/coins', { params }),
  
  getCoinData: (coinId: string) =>
    apiClient.get(`/market/coins/${coinId}`),
  
  getOhlcData: (coinId: string, params?: { days?: number }) =>
    apiClient.get(`/market/ohlc/${coinId}`, { params }),
  
  getMarketOverview: () =>
    apiClient.get('/market/overview'),
};

// 交易API
export const tradeApi = {
  createTrade: (tradeData: {
    symbol: string;
    type: 'buy' | 'sell';
    amount: number;
    price: number;
  }) => apiClient.post('/trades', tradeData),
  
  getTrades: (params?: { page?: number; limit?: number }) =>
    apiClient.get('/trades', { params }),
  
  getTradeById: (tradeId: string) =>
    apiClient.get(`/trades/${tradeId}`),
  
  cancelTrade: (tradeId: string) =>
    apiClient.patch(`/trades/${tradeId}/cancel`),
};

// 用户API
export const userApi = {
  getProfile: () =>
    apiClient.get('/user/profile'),
  
  updateProfile: (profileData: any) =>
    apiClient.put('/user/profile', profileData),
  
  changePassword: (passwordData: {
    currentPassword: string;
    newPassword: string;
  }) => apiClient.put('/user/password', passwordData),
  
  getSettings: () =>
    apiClient.get('/user/settings'),
  
  updateSettings: (settings: any) =>
    apiClient.put('/user/settings', settings),
};

// 新闻API
export const newsApi = {
  getNews: (params?: {
    category?: string;
    limit?: number;
    page?: number;
    search?: string;
  }) => apiClient.get('/news', { params }),
  
  getNewsById: (newsId: string) =>
    apiClient.get(`/news/${newsId}`),
  
  getCategories: () =>
    apiClient.get('/news/categories'),
};

// 文章API
export const articleApi = {
  getArticles: (params?: {
    category?: string;
    limit?: number;
    page?: number;
    search?: string;
  }) => apiClient.get('/articles', { params }),
  
  getArticleById: (articleId: string) =>
    apiClient.get(`/articles/${articleId}`),
  
  createArticle: (articleData: any) =>
    apiClient.post('/articles', articleData),
  
  updateArticle: (articleId: string, articleData: any) =>
    apiClient.put(`/articles/${articleId}`, articleData),
  
  deleteArticle: (articleId: string) =>
    apiClient.delete(`/articles/${articleId}`),
};

export default apiClient; 