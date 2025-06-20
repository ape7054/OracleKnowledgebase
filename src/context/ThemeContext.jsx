import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// 创建一个 Context 对象，用于跨组件共享主题状态
export const ThemeContext = createContext();

// 亮色主题
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00AB55',
      light: '#5BE584',
      dark: '#007B55',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3366FF',
      light: '#84A9FF',
      dark: '#1939B7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#f4f6f8',
      paper: '#ffffff',
    },
    text: {
      primary: '#212B36',
      secondary: '#637381',
    },
    divider: 'rgba(145, 158, 171, 0.24)',
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(145, 158, 171, 0.16)',
    // 其他阴影级别保持默认
  ],
});

// 暗色主题
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AB55',
      light: '#5BE584',
      dark: '#007B55',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#3366FF',
      light: '#84A9FF',
      dark: '#1939B7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#161C24',
      paper: '#212B36',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#919EAB',
    },
    divider: 'rgba(145, 158, 171, 0.24)',
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.4)',
    // 其他阴影级别保持默认
  ],
});

export const CustomThemeProvider = ({ children }) => {
  const [mode, setMode] = useState('light');

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // useMemo 用于缓存主题对象，避免不必要的重新计算
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 