'use client';
import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '../lib/context/AuthContext';
import { CustomThemeProvider } from '../lib/context/ThemeContext';

// Material-UI暗色主题（基于原项目）
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ffff',
      dark: '#00cccc',
    },
    secondary: {
      main: '#ff6b6b',
    },
    background: {
      default: '#0a0e17',
      paper: '#1a1f2e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(26, 31, 46, 0.8)',
          backdropFilter: 'blur(10px)',
        },
      },
    },
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        <title>LearningStack - 加密货币学习交易平台</title>
        <meta name="description" content="现代化的加密货币学习和模拟交易平台" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <AuthProvider>
            <CustomThemeProvider>
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1a1f2e',
                    color: '#ffffff',
                    border: '1px solid #00ffff',
                  },
                }}
              />
            </CustomThemeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
} 