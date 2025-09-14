'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface User {
  id: number;
  username: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (username: string, password: string, email?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 检查本地存储的token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // 验证token有效性
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // 检查响应是否为 JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.log('后端服务不可用，跳过 token 验证');
        setLoading(false);
        return;
      }

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // 检查响应是否为 JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        // 演示模式：允许特定的测试账号登录
        return handleDemoLogin(username, password);
      }

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        toast.success('登录成功！');
        return true;
      } else {
        toast.error(data.message || '登录失败');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      // 如果网络错误，尝试演示登录
      return handleDemoLogin(username, password);
    }
  };

  // 演示模式登录处理
  const handleDemoLogin = (username: string, password: string): boolean => {
    const demoAccounts = [
      { username: 'admin', password: 'password', id: 1, name: '管理员' },
      { username: 'demo', password: 'demo123', id: 2, name: '演示用户' },
      { username: 'test', password: 'test123', id: 3, name: '测试用户' },
      { username: 'user', password: '123456', id: 4, name: '普通用户' },
    ];

    const account = demoAccounts.find(
      acc => acc.username === username && acc.password === password
    );

    if (account) {
      const mockUser = {
        id: account.id,
        username: account.username,
        email: `${account.username}@demo.com`,
      };
      
      const mockToken = `demo_token_${account.id}_${Date.now()}`;
      
      localStorage.setItem('token', mockToken);
      setUser(mockUser);
      toast.success(`演示模式登录成功！欢迎 ${account.name}`);
      return true;
    } else {
      toast.error('演示模式：用户名或密码错误');
      return false;
    }
  };

  const register = async (username: string, password: string, email?: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      // 检查响应是否为 JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('后端服务不可用，当前为演示模式');
      }

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success('注册成功！请登录');
        return true;
      } else {
        toast.error(data.message || '注册失败');
        return false;
      }
    } catch (error) {
      console.error('Register error:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('注册服务暂时不可用，当前为演示模式');
      }
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('已退出登录');
    router.push('/login');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 