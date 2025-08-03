import React, { createContext, useContext, useState, useEffect } from 'react';
import { marketApi } from '../api/marketApi';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 初始化时检查localStorage中的token
  useEffect(() => {
    const initializeAuth = () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
        marketApi.setAuthToken(storedToken);
        
        // TODO: 这里可以添加验证token有效性的API调用
        // 暂时先设置一个默认用户信息
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        if (userData.username) {
          setUser(userData);
        } else {
          // 如果没有用户数据，设置默认用户信息
          setUser({ 
            id: 1, 
            username: localStorage.getItem('username') || 'User',
            email: 'user@example.com'
          });
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  // 登录函数
  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await marketApi.login(username, password);
      
      if (response.token) {
        const { token } = response;
        setToken(token);
        setIsAuthenticated(true);
        localStorage.setItem('authToken', token);
        localStorage.setItem('username', username);
        
        // 设置用户信息
        const userData = {
          id: response.user?.id || 1,
          username: username,
          email: response.user?.email || `${username}@example.com`
        };
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        
        marketApi.setAuthToken(token);
        return { success: true };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Login failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // 注册函数
  const register = async (username, password) => {
    try {
      setLoading(true);
      const response = await marketApi.register(username, password);
      return { success: true, message: 'Registration successful!' };
    } catch (error) {
      console.error('Registration failed:', error);
      return { 
        success: false, 
        error: error.response?.data?.error || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // 登出函数
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('username');
    marketApi.setAuthToken(null);
  };

  // 检查是否已认证
  const checkAuth = () => {
    return isAuthenticated && token && user;
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 