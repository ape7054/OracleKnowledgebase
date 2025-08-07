import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { CustomThemeProvider } from './context/ThemeContext';

// 过滤开发环境中的非关键警告
if (process.env.NODE_ENV === 'development') {
  const originalWarn = console.warn;
  const originalError = console.error;
  
  console.warn = (...args) => {
    const message = args.join(' ');
    // 过滤Material-UI/Emotion的属性警告
    if (message.includes('non-boolean attribute') || 
        message.includes('jsx') || 
        message.includes('global') ||
        message.includes('React DevTools')) {
      return;
    }
    originalWarn.apply(console, args);
  };

  console.error = (...args) => {
    const message = args.join(' ');
    // 过滤React开发工具相关错误
    if (message.includes('non-boolean attribute') ||
        message.includes('jsx="true"') ||
        message.includes('global="true"')) {
      return;
    }
    originalError.apply(console, args);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <CustomThemeProvider>
        <App />
      </CustomThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
