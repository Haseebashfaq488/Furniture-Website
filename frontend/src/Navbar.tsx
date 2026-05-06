'use client';


import {
  Box,
  Container,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Person,
  FavoriteBorder,
  ShoppingBagOutlined,
  PhoneOutlined,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { cart } = useCart();
  
  // Calculate total items in cart
  const cartItemCount = cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  return (
    <Box sx={{ bgcolor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
      {/* Top Promotion Banner */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 1, borderBottom: '1px solid #eee' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography
              variant="body2"
              sx={{
                color: '#d32f2f',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
              }}
            >
              🔥 Only this week <span style={{ color: '#d32f2f' }}>-20%</span> For all Sofas and Couches
            </Typography>
            <Link
              to="/shop"
              style={{ color: '#1976d2', fontWeight: 500, marginLeft: '8px', fontSize: '0.9rem', textDecoration: 'underline' }}
            >
              Shop Now →
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Main Navbar */}
      <Container maxWidth="xl">
        <Box sx={{ py: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo with Hover Animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring' as const, stiffness: 300 }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    bgcolor: '#1fa055',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '32px',
                    transition: 'transform 0.4s ease',
                  }}
                  component={motion.div}
                  whileHover={{ rotate: [0, -12, 12, 0] }}
                >
                  🏠
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '1.75rem',
                      lineHeight: 1,
                      letterSpacing: '-1.5px',
                      color: '#1a1a1a',
                    }}
                  >
                    COZY
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: '1.75rem',
                      lineHeight: 1,
                      letterSpacing: '-1.5px',
                      color: '#1a1a1a',
                      mt: -0.9,
                    }}
                  >
                    CORNER
                  </Typography>
                </Box>
              </Box>
            </Link>
          </motion.div>

          {/* Search Bar */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 520,
              mx: { xs: 2, md: 6 },
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '50px',
              px: 2.5,
              py: 1,
              bgcolor: '#fafafa',
              transition: 'all 0.3s',
              '&:focus-within': {
                borderColor: '#1fa055',
                boxShadow: '0 0 0 3px rgba(31, 160, 85, 0.1)',
              },
            }}
          >
            <Search sx={{ color: '#666', mr: 1.5 }} />
            <InputBase
              placeholder="Search for furniture..."
              fullWidth
              sx={{ fontSize: '0.97rem', color: '#333' }}
            />
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <PhoneOutlined sx={{ color: '#555', fontSize: 26 }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#777', display: 'block', lineHeight: 1 }}>
                  Need help?
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#1a1a1a' }}>
                  +1-202-555-0172
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
              <IconButton 
                color="inherit" 
                edge="start" 
                onClick={handleDrawerToggle}
                sx={{ display: { md: 'none' }, color: '#333' }}
              >
                <MenuIcon />
              </IconButton>

              <Link to={useAuth().isAuthenticated ? "/profile" : "/auth"}>
                <IconButton sx={{ color: '#333', '&:hover': { color: '#1fa055' } }}>
                  <Person />
                </IconButton>
              </Link>

              <IconButton sx={{ color: '#333', '&:hover': { color: '#1fa055' } }}>
                <Badge badgeContent={3} color="error">
                  <FavoriteBorder />
                </Badge>
              </IconButton>

              <Link to="/cart">
                <IconButton sx={{ color: '#333', '&:hover': { color: '#1fa055' } }}>
                  <Badge badgeContent={cartItemCount} color="success" invisible={cartItemCount === 0}>
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Bottom Navigation with Animated Underline */}
      <Box sx={{ borderTop: '1px solid #eaeaea', bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 5,
              py: 2.2,
              fontSize: '1rem',
              fontWeight: 600,
              color: '#333',
            }}
          >
            {[
              { name: 'Home', to: '/' },
              { name: 'Shop', to: '/shop' },
              { name: '3D Configurator', to: '/configurator' },
              { name: 'About', to: '/about' },
              { name: 'Contact', to: '/contact' },
            ].map((item) => (
              <motion.div
                key={item.name}
                initial="rest"
                whileHover="hover"
                animate="rest"
              >
                <Link
                  to={item.to}
                  style={{ textDecoration: 'none', position: 'relative', padding: '6px 0', display: 'block' }}
                >
                  <Box sx={{ color: '#333', transition: 'color 0.2s', '&:hover': { color: '#1fa055' } }}>
                    {item.name}
                  </Box>

                  {/* Animated Underline */}
                  <motion.div
                    variants={{
                      rest: { width: 0, opacity: 0 },
                      hover: { width: '100%', opacity: 1 }
                    }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: '3px',
                      background: 'linear-gradient(to right, #1fa055, #22c55e)',
                      borderRadius: '3px',
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ '& .MuiDrawer-paper': { width: 250, bgcolor: '#fafafa', pt: 2 } }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#1a1a1a', mb: 2 }}>MENU</Typography>
          <List>
            {[
              { name: 'Home', to: '/' },
              { name: 'Shop', to: '/shop' },
              { name: '3D Configurator', to: '/configurator' },
              { name: 'About', to: '/about' },
              { name: 'Contact', to: '/contact' },
            ].map((item) => (
              <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
                <Link 
                  to={item.to} 
                  style={{ textDecoration: 'none', width: '100%' }}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText 
                    primary={
                      <Typography sx={{ fontWeight: 600, color: '#333', fontSize: '1.1rem' }}>
                        {item.name}
                      </Typography>
                    }
                  />
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;