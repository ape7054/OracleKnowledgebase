import React, { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery, Container } from '@mui/material';
import { Dashboard as DashboardIcon, SwapHoriz as TradeIcon, AccountCircle as AccountIcon, Menu as MenuIcon } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeContext, CustomThemeProvider } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Account from './pages/Account';

const drawerWidth = 240;

function AppContent() {
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <div>
          <Toolbar>
        <Typography variant="h6">
              Trading Panel
            </Typography>
          </Toolbar>
          <List>
            {[
              { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
              { text: 'Trade', icon: <TradeIcon />, path: '/trade' },
              { text: 'Account', icon: <AccountIcon />, path: '/account' },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  end={item.path === '/'}
                  sx={{
                color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.active': {
                  color: 'text.primary',
                  backgroundColor: 'action.selected',
                  borderRight: '3px solid',
                  borderColor: 'primary.main',
                      '& .MuiListItemIcon-root': {
                    color: 'text.primary',
                      },
                    },
                    '& .MuiListItemIcon-root': {
                  color: 'text.secondary',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
    </div>
  );

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { md: `${drawerWidth}px` },
            bgcolor: 'background.paper',
            boxShadow: 'none',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
              Trading Panel
            </Typography>
            <IconButton sx={{ ml: 1, color: 'text.primary' }} onClick={toggleTheme}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                bgcolor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            {drawerContent}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                boxSizing: 'border-box', 
                width: drawerWidth,
                bgcolor: 'background.paper',
                borderRight: '1px solid',
                borderColor: 'divider',
              },
            }}
            open
          >
            {drawerContent}
        </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
              flexGrow: 1,
            bgcolor: 'background.default',
              height: '100vh',
            overflowY: 'scroll',
            width: { md: `calc(100% - ${drawerWidth}px)` },
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Toolbar />
          <Container maxWidth={false} sx={{ p: 3, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Container>
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