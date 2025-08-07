import React, { useContext, useState } from 'react';
import { Routes, Route, NavLink, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { Box, CssBaseline, AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton, useTheme, useMediaQuery, Avatar, Menu, MenuItem, Divider, Chip } from '@mui/material';
import { Dashboard as DashboardIcon, SwapHoriz as TradeIcon, AccountCircle as AccountIcon, Menu as MenuIcon, TrendingUp, Home as HomeIcon, Article as NewsIcon, Logout, Settings, Person } from '@mui/icons-material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import { ThemeContext } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import News from './pages/News';
import Trade from './pages/Trade';
import Login from './pages/Login';
import Register from './pages/Register';
import { styled } from '@mui/system';
import { Toaster } from 'react-hot-toast';

// Define the width of the navigation drawer
const drawerWidth = 240;

// Create a styled NavLink component to remove default text decoration
// and ensure it takes up the full width of its container.
const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
  color: theme.palette.text.primary,
}));

// Create a styled ListItemButton for the navigation links.
// This component handles the visual styling for normal, hover, and active states.
const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  padding: '12px 16px',
  margin: '4px 8px',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  color: theme.palette.text.primary,
  // Style for when the mouse hovers over the button
  '&:hover': {
    backgroundColor: theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.08)' 
      : 'rgba(0, 0, 0, 0.04)',
  },
  // Style for when the link is active (the current page)
  '&.active': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(0, 171, 85, 0.16)'
      : 'rgba(0, 171, 85, 0.08)',
    color: theme.palette.primary.main,
    // Change the icon color when the link is active
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
    // Ensure active text color is correct
    '& .MuiListItemText-primary': {
      color: theme.palette.primary.main,
    },
  },
  // Ensure the text color is correct for both themes
  '& .MuiListItemText-primary': {
    color: theme.palette.mode === 'dark'
      ? theme.palette.text.primary
      : theme.palette.text.primary,
  },
  // Style for the icons in the list
  '& .MuiListItemIcon-root': {
    color: theme.palette.mode === 'dark' 
      ? theme.palette.text.secondary
      : theme.palette.text.primary,
    minWidth: 40,
  },
}));

// Create a styled Drawer (the sidebar) with a glassmorphic effect.
// It has different background colors and effects for light and dark modes.
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(22, 28, 36, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    // Apply a gradient background for a more modern look
    backgroundImage: theme.palette.mode === 'dark'
      ? 'linear-gradient(to bottom, rgba(26, 32, 48, 0.95), rgba(8, 11, 25, 0.95))'
      : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(240, 244, 248, 0.95))',
    // Apply a blur effect to the background
    backdropFilter: 'blur(20px)',
    borderRight: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.palette.mode === 'dark'
      ? '2px 0 20px 0 rgba(0, 0, 0, 0.4)'
      : '2px 0 20px 0 rgba(145, 158, 171, 0.2)',
    // Ensure text color is correct for both themes
    color: theme.palette.text.primary,
  },
}));

// Create a styled AppBar (the top navigation bar on mobile) with a glassmorphic effect.
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(22, 28, 36, 0.95)' 
    : 'rgba(255, 255, 255, 0.95)',
  backgroundImage: theme.palette.mode === 'dark'
    ? 'linear-gradient(to right, rgba(26, 32, 48, 0.95), rgba(8, 11, 25, 0.95))'
    : 'linear-gradient(to right, rgba(255, 255, 255, 0.95), rgba(240, 244, 248, 0.95))',
  backdropFilter: 'blur(20px)',
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 16px 0 rgba(0, 0, 0, 0.4)'
    : '0 8px 16px 0 rgba(145, 158, 171, 0.2)',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

// Create a styled component for the brand logo in the sidebar and app bar.
const BrandLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  // Styles for the icon container of the logo
  '& .logo-icon': {
    background: theme.palette.mode === 'dark'
      ? 'linear-gradient(135deg, #5C6BC0 0%, #3F51B5 50%, #303F9F 100%)'
      : 'linear-gradient(135deg, #42A5F5 0%, #2196F3 50%, #1976D2 100%)',
    borderRadius: '8px',
    padding: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 2px 8px rgba(0,0,0,0.5)'
      : '0 2px 8px rgba(33,150,243,0.3)',
  }
}));

// User profile component for the sidebar
const UserProfile = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
  };

  if (!isAuthenticated) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Chip
          label="Not Logged In"
          variant="outlined"
          size="small"
          sx={{
            color: 'text.secondary',
            borderColor: alpha(theme.palette.text.secondary, 0.3),
          }}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Box
        onClick={handleMenuOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 1,
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          background: alpha(theme.palette.primary.main, 0.1),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.3)}`,
          '&:hover': {
            background: alpha(theme.palette.primary.main, 0.15),
            transform: 'translateY(-2px)',
          },
        }}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            background: 'linear-gradient(135deg, #00ff88, #0099ff)',
            fontSize: '0.9rem',
            fontWeight: 'bold',
          }}
        >
          {user?.username?.charAt(0).toUpperCase() || 'U'}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.username || 'User'}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: 'text.secondary',
              fontSize: '0.7rem',
            }}
          >
            Online
          </Typography>
        </Box>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
            background: theme.palette.mode === 'dark'
              ? 'rgba(22, 28, 36, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  );
};

// This is the main content component that holds the entire UI.
function AppContent() {
  // Get theme mode ('light' or 'dark') and the function to toggle it from context.
  const { mode, toggleTheme } = useContext(ThemeContext);
  // State to manage whether the mobile drawer is open or closed.
  const [mobileOpen, setMobileOpen] = useState(false);
  // Get the full theme object from Material-UI.
  const theme = useTheme();
  // A media query hook that returns true if the screen width is 'md' (medium) or smaller.
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Function to toggle the mobile drawer's open/closed state.
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // ANALOGY: The 'drawerContent' is like the "Elevator Panel" in our building.
  // It is defined once and contains the buttons for all the "floors" (pages) of the application.
  // This panel will be displayed inside the sidebar.
  const drawerContent = (
    <>
      {/* Top section of the drawer with the logo and brand name. */}
      <Toolbar sx={{ 
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2
      }}>
        <BrandLogo>
          <Box className="logo-icon">
            <TrendingUp sx={{ color: '#fff', fontSize: '1.2rem' }} />
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h6" noWrap sx={{ 
              fontWeight: 700, 
              // Apply a gradient to the text for a modern look
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(to right, #9C96FF, #76C4FF)'
                : 'linear-gradient(to right, #3366FF, #00CCFF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '0.5px',
              lineHeight: 1.2
            }}>
              MarketPulse
            </Typography>
            <Typography variant="caption" sx={{ 
              fontSize: '0.65rem', 
              opacity: 0.8, 
              letterSpacing: '0.05rem',
              color: theme.palette.text.secondary
            }}>
              MARKET INTELLIGENCE PLATFORM
            </Typography>
          </Box>
        </BrandLogo>
      </Toolbar>
      
      {/* User Profile Section */}
      <UserProfile />
      
      {/* Container for the navigation list items. */}
      <Box sx={{ p: 1, mt: 1 }}>
        {[
          { text: 'Home', icon: <HomeIcon />, path: '/' },
          { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
          { text: 'News', icon: <NewsIcon />, path: '/news' },
          { text: 'Trade', icon: <TradeIcon />, path: '/trade' },
          { text: 'Account', icon: <AccountIcon />, path: '/account' },
        ].map((item) => (
          // Each item is a "button" on our "Elevator Panel".
          // It's a <StyledNavLink> which is a styled version of React Router's NavLink.
          // When you click this, you are telling the "Elevator System" (React Router) which "floor" (URL) to go to.
          // It does NOT directly call any code in the page components like Account.jsx.
          <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
            <StyledNavLink to={item.path} end={item.path === '/'}>
              {/* Use a render prop to get the 'isActive' state from NavLink. */}
              {({ isActive }) => (
                <StyledListItemButton 
                  // Pass the active state to the styled component for styling.
                  className={isActive ? 'active' : ''}
                  sx={{
                    // Apply different styles when the link is active.
                    background: isActive ? 
                      theme.palette.mode === 'dark' ?
                        'linear-gradient(90deg, rgba(45, 55, 72, 0.5), rgba(45, 55, 72, 0.2))' : 
                        'linear-gradient(90deg, rgba(229, 246, 253, 1), rgba(229, 246, 253, 0.5))'
                      : 'transparent',
                    boxShadow: isActive ? 
                      theme.palette.mode === 'dark' ? 
                        'inset 4px 0 0 0 #3366FF' : 
                        'inset 4px 0 0 0 #2196F3'
                      : 'none',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em'
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

  // ANALOGY: This return statement describes the entire "Building Layout".
  // It includes the sidebar (for desktop) or app bar (for mobile) and the main content area.
  return (
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        {/* CssBaseline normalizes styles across browsers. */}
        <CssBaseline />
        
        {/* App Bar (Top Navigation Bar) - Only visible on mobile screens. */}
        <StyledAppBar
          position="fixed"
          sx={{
            display: { md: 'none' }, // Hide on medium screens and larger
          }}
        >
          <Toolbar>
            {/* Menu icon to open the mobile drawer. */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, color: 'text.primary', '&:focus': { outline: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            {/* Show the brand logo in the mobile app bar. */}
            <BrandLogo>
              <Box className="logo-icon">
                <TrendingUp sx={{ color: '#fff', fontSize: '1.2rem' }} />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" noWrap sx={{ 
                  fontWeight: 700, 
                  background: theme.palette.mode === 'dark'
                    ? 'linear-gradient(to right, #9C96FF, #76C4FF)'
                    : 'linear-gradient(to right, #3366FF, #00CCFF)', 
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '0.5px',
                  lineHeight: 1.2
                }}>
                  MarketPulse
                </Typography>
                <Typography variant="caption" sx={{ 
                  fontSize: '0.6rem', 
                  opacity: 0.8, 
                  letterSpacing: '0.05rem',
                  color: theme.palette.text.secondary
                }}>
                  MARKET INTELLIGENCE PLATFORM
                </Typography>
              </Box>
            </BrandLogo>
            <Box sx={{ flexGrow: 1 }} />
            {/* Theme toggle button for mobile. */}
            <IconButton sx={{ color: 'text.primary', '&:focus': { outline: 'none' } }} onClick={toggleTheme}>
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </StyledAppBar>
        
        {/* Sidebar - Mobile Version (Temporary Drawer) */}
        <StyledDrawer
          variant="temporary" // This drawer can be opened and closed.
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better for performance on mobile.
          sx={{
            display: { xs: 'block', md: 'none' }, // Show only on extra-small screens.
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </StyledDrawer>
        
        {/* Sidebar - Desktop Version (Permanent Drawer) */}
        {/* This is the permanent sidebar for larger screens. It holds our "Elevator Panel" (drawerContent). */}
        <StyledDrawer
          variant="permanent" // This drawer is always visible.
          sx={{
            display: { xs: 'none', md: 'block' }, // Show only on medium screens and larger.
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
        
        {/* Main Content Area */}
        {/* ANALOGY: This is the large open space in our "Lobby". */}
        {/* The "Elevator Controller" (<Routes>) sits here and decides which "floor" (Component) to display. */}
        <Box
          component="main"
          sx={{
            flexGrow: 1, // This allows the content area to take up the remaining space.
            // bgcolor: 'background.default', // Removed to allow page-specific backgrounds
            overflow: 'auto', // Add a scrollbar if content overflows.
            width: '100%',
            p: 3, // Padding on all sides.
            pt: { xs: 8, md: 3 }, // Add padding top on mobile to avoid being hidden by the app bar.
          }}
        >
          {/* ANALOGY: This is the "Elevator Controller" (the brains of the system). */}
          {/* It looks at the current URL (the "floor" you requested) and renders the correct component. */}
          {/* For example, if the URL is '/account', it will render the <Account /> component below. */}
          <Routes>
                                                    <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route path="/news" element={<News />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Box>
        
        {/* Theme Toggle Button - Desktop Version */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' }, // Show only on desktop.
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1200, // Make sure it's on top of other content.
          }}
        >
          <IconButton 
            sx={{ 
              color: 'text.primary',
              // Apply a glassmorphic effect to the button.
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
              },
              '&:focus': {
                outline: 'none',
              },
            }} 
            onClick={toggleTheme}
          >
            {/* Show the correct icon based on the current theme mode. */}
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Toaster 
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            // Define default options
            className: '',
            style: {
              margin: '40px',
              background: '#363636',
              color: '#fff',
              zIndex: 1,
            },
            duration: 5000,
            // Default options for specific types
            success: {
              duration: 3000,
              theme: {
                primary: 'green',
                secondary: 'black',
              },
            },
            error: {
              duration: 5000,
            },
          }}
        />
      </Box>
  );
}

// The root 'App' component. Its only job is to provide the theme context.
function App() {
  return (
    <AuthProvider>
      <AppWrapper />
    </AuthProvider>
  );
}

// A wrapper component that consumes the theme from our context.
function AppWrapper() {
  // Get the theme object from our custom ThemeContext.
  const { theme } = useContext(ThemeContext);
  return (
    // Apply the theme to all Material-UI components within AppContent.
    <MuiThemeProvider theme={theme}>
      <AppContent />
    </MuiThemeProvider>
  );
}

export default App; 