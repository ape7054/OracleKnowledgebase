import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, SwapHoriz as TradeIcon, AccountCircle as AccountIcon } from '@mui/icons-material';
import Dashboard from './pages/Dashboard';
import Trade from './pages/Trade';
import Account from './pages/Account';

const drawerWidth = 240;

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
            backgroundColor: '#171c28',
            boxShadow: 'none',
            borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
          }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Trading Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              backgroundColor: '#171c28',
              borderRight: '1px solid rgba(255, 255, 255, 0.12)',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar>
            <Typography variant="h6" sx={{ color: 'white' }}>
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
                    color: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    },
                    '&.active': {
                      backgroundColor: 'rgba(67, 122, 255, 0.2)',
                      color: 'white',
                      borderRight: '3px solid #437AFF',
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'rgba(255, 255, 255, 0.7)',
                    },
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
              flexGrow: 1,
              background: 'linear-gradient(135deg, #1d2333 0%, #171c28 100%)',
              height: '100vh',
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column'
          }}
        >
          <Toolbar />
          <Box sx={{ p: 3, flexGrow: 1 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trade" element={<Trade />} />
              <Route path="/account" element={<Account />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App; 