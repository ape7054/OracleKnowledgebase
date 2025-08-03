import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // 如果正在加载，显示加载界面
  if (loading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        sx={{
          background: 'linear-gradient(135deg, #0a0a23, #1a1a3a)',
          color: 'white'
        }}
      >
        <CircularProgress 
          size={60} 
          sx={{ 
            color: '#00ff88',
            mb: 2 
          }} 
        />
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
          Checking authentication...
        </Typography>
      </Box>
    );
  }

  // 如果未认证，重定向到登录页面
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 如果已认证，渲染子组件
  return children;
};

export default ProtectedRoute; 