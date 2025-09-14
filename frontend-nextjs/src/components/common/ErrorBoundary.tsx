'use client';
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="50vh"
          p={3}
        >
          <Paper
            elevation={8}
            sx={{
              p: 4,
              textAlign: 'center',
              maxWidth: 500,
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.1), rgba(244, 67, 54, 0.05))',
              border: '1px solid rgba(244, 67, 54, 0.3)',
            }}
          >
            <ErrorOutline 
              sx={{ 
                fontSize: 64, 
                color: 'error.main',
                mb: 2 
              }} 
            />
            <Typography variant="h5" gutterBottom color="error">
              哎呀，出错了！
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              页面遇到了一个意外错误。这可能是暂时的问题。
            </Typography>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  fontFamily: 'monospace',
                  background: 'rgba(0, 0, 0, 0.1)',
                  p: 2,
                  borderRadius: 1,
                  mb: 2,
                  fontSize: '0.75rem'
                }}
              >
                {this.state.error.message}
              </Typography>
            )}
            <Button
              variant="contained"
              startIcon={<Refresh />}
              onClick={() => window.location.reload()}
              sx={{
                background: 'linear-gradient(45deg, #00ff88, #00cc66)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #00cc66, #00ff88)',
                },
              }}
            >
              刷新页面
            </Button>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 