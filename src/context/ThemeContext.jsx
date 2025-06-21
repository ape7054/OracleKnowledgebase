import React, { createContext, useState, useMemo } from 'react';
import { createTheme, alpha } from '@mui/material/styles';

// 创建一个 Context 对象，用于跨组件共享主题状态
export const ThemeContext = createContext();

// 基础主题配置
const baseThemeOptions = {
  typography: {
    fontFamily: "'Inter', 'Roboto', 'Helvetica Neue', sans-serif",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontWeight: 700,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      letterSpacing: '0em',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.1rem',
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 500,
      lineHeight: 1.57,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
    },
    button: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.75,
      textTransform: 'none',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.5px',
      lineHeight: 2.5,
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: ({ theme }) => ({
          boxShadow: 'none',
          '&:hover': {
            boxShadow: theme.shadows[2],
          },
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          overflow: 'hidden',
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
};

// 亮色主题
const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      lighter: '#E3F2FD',
      light: '#42A5F5',
      main: '#2196F3',
      dark: '#1976D2',
      darker: '#0D47A1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#EDE7F6',
      light: '#9575CD',
      main: '#673AB7',
      dark: '#5E35B1',
      darker: '#4527A0',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#E9FCD4',
      light: '#AAF27F',
      main: '#54D62C',
      dark: '#229A16',
      darker: '#08660D',
    },
    warning: {
      lighter: '#FFF7CD',
      light: '#FFE16A',
      main: '#FFC107',
      dark: '#B78103',
      darker: '#7A4F01',
    },
    error: {
      lighter: '#FFE7D9',
      light: '#FFA48D',
      main: '#FF4842',
      dark: '#B72136',
      darker: '#7A0C2E',
    },
    info: {
      lighter: '#D0F2FF',
      light: '#74CAFF',
      main: '#1890FF',
      dark: '#0C53B7',
      darker: '#04297A',
    },
    background: {
      default: '#F8FAFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
    },
    divider: 'rgba(145, 158, 171, 0.2)',
    action: {
      active: '#637381',
      hover: 'rgba(145, 158, 171, 0.08)',
      selected: 'rgba(33, 150, 243, 0.08)',
      disabled: 'rgba(145, 158, 171, 0.5)',
      disabledBackground: 'rgba(145, 158, 171, 0.1)',
    },
  },
  shadows: [
    'none',
    '0px 2px 4px 0px rgba(145, 158, 171, 0.08)',
    '0px 4px 8px 0px rgba(145, 158, 171, 0.12)',
    '0px 6px 12px 0px rgba(145, 158, 171, 0.14)',
    '0px 8px 16px 0px rgba(145, 158, 171, 0.16)',
    '0px 10px 20px 0px rgba(145, 158, 171, 0.18)',
    '0px 12px 24px -4px rgba(145, 158, 171, 0.20)',
    '0px 14px 32px -4px rgba(145, 158, 171, 0.24)',
    '0px 18px 42px -8px rgba(145, 158, 171, 0.28)',
    '0px 24px 60px -12px rgba(145, 158, 171, 0.32)',
  ],
});

// 暗色主题
const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      lighter: '#132F4C',
      light: '#5090D3',
      main: '#2196F3',
      dark: '#0A6FD7',
      darker: '#042E69',
      contrastText: '#FFFFFF',
    },
    secondary: {
      lighter: '#312C4B',
      light: '#9889E9',
      main: '#673AB7',
      dark: '#5947B1',
      darker: '#352A6E',
      contrastText: '#FFFFFF',
    },
    success: {
      lighter: '#1B3B27',
      light: '#75CF6D',
      main: '#54D62C',
      dark: '#21A912',
      darker: '#1E773D',
    },
    warning: {
      lighter: '#352D12',
      light: '#FFDA6A',
      main: '#FFC107',
      dark: '#DE9C00',
      darker: '#725615',
    },
    error: {
      lighter: '#351A21',
      light: '#FF6C70',
      main: '#FF4842',
      dark: '#DE2D3A',
      darker: '#751D32',
    },
    info: {
      lighter: '#0E2A5A',
      light: '#64B6FF',
      main: '#1890FF',
      dark: '#0077E5',
      darker: '#003C72',
    },
    background: {
      default: '#0B1217',
      paper: '#171C24',
    },
    text: {
      primary: '#EFEFEF',
      secondary: '#B0B7C3',
    },
    divider: 'rgba(145, 158, 171, 0.24)',
    action: {
      active: '#B0B7C3',
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(33, 150, 243, 0.16)',
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
    },
  },
  shadows: [
    'none',
    '0px 2px 4px 0px rgba(0, 0, 0, 0.2)',
    '0px 4px 8px 0px rgba(0, 0, 0, 0.24)',
    '0px 6px 12px 0px rgba(0, 0, 0, 0.3)',
    '0px 8px 16px 0px rgba(0, 0, 0, 0.32)',
    '0px 10px 20px 0px rgba(0, 0, 0, 0.35)',
    '0px 12px 24px -4px rgba(0, 0, 0, 0.4)',
    '0px 14px 32px -4px rgba(0, 0, 0, 0.44)',
    '0px 18px 42px -8px rgba(0, 0, 0, 0.48)',
    '0px 24px 60px -12px rgba(0, 0, 0, 0.52)',
  ],
});

export const CustomThemeProvider = ({ children }) => {
  // 尝试从localStorage获取保存的主题模式
  const savedMode = localStorage.getItem('themeMode') || 'light';
  const [mode, setMode] = useState(savedMode);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    // 保存用户的主题偏好
    localStorage.setItem('themeMode', newMode);
  };

  // useMemo 用于缓存主题对象，避免不必要的重新计算
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 