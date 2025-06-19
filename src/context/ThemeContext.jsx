import React, { createContext, useState, useMemo } from 'react';
import { createTheme } from '@mui/material/styles';

// 创建一个 Context 对象，用于跨组件共享主题状态
export const ThemeContext = createContext();

// 亮色主题
const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

// 暗色主题
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
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