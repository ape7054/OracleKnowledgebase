import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { Dashboard as DashboardIcon, SwapHoriz as TradeIcon, AccountCircle as AccountIcon, Menu as MenuIcon } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeContext, CustomThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Account from './pages/Account';
import { styled } from '@mui/system';

const drawerWidth = 240;

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  color: theme.palette.text.primary,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '12px 16px',
  margin: '4px 8px',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  color: theme.palette.text.primary,
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
  },
  '&.active': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(0, 171, 85, 0.16)' 
      : 'rgba(0, 171, 85, 0.08)',
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
  '& .MuiListItemText-primary': {
    color: 'inherit',
  },
  '& .MuiListItemIcon-root': {
    color: theme.palette.mode === 'dark' 
      ? theme.palette.text.secondary
      : theme.palette.text.primary,
    minWidth: 40,
  },
}));

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(33, 43, 54, 0.9)' 
      : 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.mode === 'dark'
      ? '2px 0 8px 0 rgba(0, 0, 0, 0.3)'
      : '2px 0 8px 0 rgba(145, 158, 171, 0.16)',
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(33, 43, 54, 0.9)' 
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 16px 0 rgba(0, 0, 0, 0.3)'
    : '0 8px 16px 0 rgba(145, 158, 171, 0.16)',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

function AppContent() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <>
      <Toolbar sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 1.5
      }}>
        <Typography variant="h6" noWrap sx={{ 
          fontWeight: 700, 
          color: theme.palette.primary.main,
          letterSpacing: '0.5px'
        }}>
          Trading Panel
        </Typography>
      </Toolbar>
      <Box sx={{ p: 1, mt: 1 }}>
        {[
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
          { text: 'Trade', icon: <TradeIcon />, path: '/trade' },
          { text: 'Account', icon: <AccountIcon />, path: '/account' },
        ].map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <StyledNavLink to={item.path} end={item.path === '/'}>
              {({ isActive }) => (
                <StyledListItemButton className={isActive ? 'active' : ''}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: 500,
                    }} 
                  />
                </StyledListItemButton>
              )}
            </StyledNavLink>
          </ListItem>
        ))}
      </Box>
    </>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <CssBaseline />
        
        {/* App Bar - Only visible on mobile */}
        <StyledAppBar
          position="fixed"
          sx={{
            display: { md: 'none' },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ 
              flexGrow: 1, 
              color: theme.palette.primary.main,
              fontWeight: 700
            }}>
              Trading Panel
            </Typography>
            <IconButton sx={{ color: 'text.primary' }} onClick={toggleTheme}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        
        {/* Sidebar - Mobile (Temporary Drawer) */}
        <StyledDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </StyledDrawer>
        
        {/* Sidebar - Desktop (Permanent Drawer) */}
        <StyledDrawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          open
        >
          {drawerContent}
        </StyledDrawer>
        
        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
            overflow: 'auto',
            width: '100%',
            p: 3,
            pt: { xs: 8, md: 3 }, // Add padding top on mobile for the app bar
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </Box>
        
        {/* Theme Toggle Button - Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1200,
          }}
        >
          <IconButton 
            sx={{ 
              color: 'text.primary',
              backgroundColor: theme.palette.mode === 'dark' 
                ? 'rgba(33, 43, 54, 0.9)' 
                : 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: theme.palette.mode === 'dark'
                ? '0 2px 8px 0 rgba(0, 0, 0, 0.3)'
                : '0 2px 8px 0 rgba(145, 158, 171, 0.16)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' 
                  ? 'rgba(255, 255, 255, 0.08)' 
                  : 'rgba(0, 0, 0, 0.04)',
              }
            }} 
            onClick={toggleTheme}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
      </Box>
    </Router>
  );
}

function App() {
  return (
    <CustomThemeProvider>
      <AppWrapper />
    </CustomThemeProvider>
  );
}

function AppWrapper() {
  const { theme } = useContext(ThemeContext);
  return (
    <MuiThemeProvider theme={theme}>
      <AppContent />
    </MuiThemeProvider>
  );
}

export default App; 