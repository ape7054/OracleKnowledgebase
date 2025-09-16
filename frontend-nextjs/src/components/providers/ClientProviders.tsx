'use client';
import React from 'react';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/context/AuthContext';
import { CustomThemeProvider } from '@/lib/context/ThemeContext';
import { createTheme } from '@mui/material/styles';

// 创建深色主题
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff88',
      dark: '#00cc66',
      light: '#33ff99',
    },
    secondary: {
      main: '#8800ff',
      dark: '#6600cc',
      light: '#9933ff',
    },
    background: {
      default: '#1E1E1E',
      paper: '#2a2a2a',
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#1E1E1E',
          backgroundImage: `
            radial-gradient(circle at 25% 25%, rgba(0, 255, 136, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(136, 0, 255, 0.05) 0%, transparent 50%)
          `,
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(0, 34, 17, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(0, 255, 136, 0.2)',
        },
      },
    },
  },
});

interface ClientProvidersProps {
  children: React.ReactNode;
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline enableColorScheme />
        <CustomThemeProvider>
          <AuthProvider>
            {children}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#002211',
                  color: '#ffffff',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                },
                success: {
                  iconTheme: {
                    primary: '#00ff88',
                    secondary: '#002211',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ff4444',
                    secondary: '#002211',
                  },
                },
              }}
            />
          </AuthProvider>
        </CustomThemeProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
} 