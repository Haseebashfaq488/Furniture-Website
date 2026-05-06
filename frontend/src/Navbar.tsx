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
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Person,
  FavoriteBorder,
  ShoppingBagOutlined,
  Menu as MenuIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useAuth } from './context/AuthContext';
import { useCart } from './context/CartContext';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'Shop', to: '/shop' },
  { name: '3D Configurator', to: '/configurator' },
  { name: 'About', to: '/about' },
  { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const cartItemCount = cart?.items?.reduce((t, i) => t + i.quantity, 0) || 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box sx={{ position: 'relative', zIndex: 1000 }}>
      {/* ── PROMO STRIP ── */}
      <Box sx={{ bgcolor: '#111', py: 0.8, textAlign: 'center' }}>
        <Typography sx={{ color: '#fff', fontSize: '0.8rem', fontWeight: 500, letterSpacing: 0.3 }}>
          🔥 This week only — <strong>20% off</strong> all Sofas &amp; Couches&nbsp;·&nbsp;
          <Box
            component={Link}
            to="/shop"
            sx={{ color: '#4ade80', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Shop Now →
          </Box>
        </Typography>
      </Box>

      {/* ── MAIN BAR ── */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          bgcolor: scrolled ? 'rgba(255,255,255,0.92)' : '#fff',
          backdropFilter: scrolled ? 'blur(16px) saturate(1.6)' : 'none',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'rgba(0,0,0,0.06)' : '#eaeaea',
          boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
          transition: 'background-color 0.35s, box-shadow 0.35s, border-color 0.35s',
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ py: 1.8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

            {/* LOGO */}
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, #169C5C, #22c55e)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: '0 3px 12px rgba(22,156,92,0.3)',
                  }}
                >
                  🏠
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.3rem', lineHeight: 1, letterSpacing: '-1px', color: '#1a1a1a' }}>
                    COZY
                  </Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: '1.3rem', lineHeight: 1, letterSpacing: '-1px', color: '#169C5C', mt: '-2px' }}>
                    CORNER
                  </Typography>
                </Box>
              </Box>
            </Link>

            {/* DESKTOP NAV */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navLinks.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <Link key={link.name} to={link.to} style={{ textDecoration: 'none' }}>
                    <Box
                      sx={{
                        position: 'relative',
                        px: 2,
                        py: 1,
                        borderRadius: '8px',
                        transition: 'all 0.2s',
                        '&:hover': { bgcolor: 'rgba(22,156,92,0.06)' },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '0.92rem',
                          fontWeight: active ? 700 : 500,
                          color: active ? '#169C5C' : '#444',
                          transition: 'color 0.2s',
                          '&:hover': { color: '#169C5C' },
                        }}
                      >
                        {link.name}
                      </Typography>
                      {active && (
                        <motion.div
                          layoutId="activeNav"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: '20%',
                            right: '20%',
                            height: 2.5,
                            background: 'linear-gradient(90deg, #169C5C, #22c55e)',
                            borderRadius: 2,
                          }}
                        />
                      )}
                    </Box>
                  </Link>
                );
              })}
            </Box>

            {/* RIGHT ICONS */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
              {/* Search toggle */}
              <IconButton
                onClick={() => setSearchOpen(!searchOpen)}
                sx={{ color: searchOpen ? '#169C5C' : '#444', '&:hover': { color: '#169C5C', bgcolor: 'rgba(22,156,92,0.06)' } }}
              >
                {searchOpen ? <CloseIcon /> : <Search />}
              </IconButton>

              {/* Profile */}
              <IconButton component={Link} to={isAuthenticated ? '/profile' : '/auth'} sx={{ color: '#444', '&:hover': { color: '#169C5C', bgcolor: 'rgba(22,156,92,0.06)' } }}>
                <Person />
              </IconButton>

              {/* Wishlist */}
              <IconButton sx={{ color: '#444', '&:hover': { color: '#169C5C', bgcolor: 'rgba(22,156,92,0.06)' } }}>
                <Badge badgeContent={3} color="error"><FavoriteBorder /></Badge>
              </IconButton>

              {/* Cart */}
              <IconButton component={Link} to="/cart" sx={{ color: '#444', '&:hover': { color: '#169C5C', bgcolor: 'rgba(22,156,92,0.06)' } }}>
                <Badge badgeContent={cartItemCount} color="success" invisible={cartItemCount === 0}><ShoppingBagOutlined /></Badge>
              </IconButton>

              {/* Mobile menu */}
              <IconButton sx={{ display: { md: 'none' }, color: '#333', ml: 0.5 }} onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Container>

        {/* Search dropdown */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              style={{ overflow: 'hidden', borderTop: '1px solid #eee' }}
            >
              <Container maxWidth="xl">
                <Box sx={{ py: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Search sx={{ color: '#169C5C', fontSize: 20 }} />
                  <InputBase
                    autoFocus
                    placeholder="Search furniture, styles, rooms..."
                    fullWidth
                    sx={{ fontSize: '0.95rem', color: '#222' }}
                  />
                </Box>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>

      {/* ── MOBILE DRAWER ── */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{ '& .MuiDrawer-paper': { width: 270, bgcolor: '#fafafa' } }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontWeight: 900, fontSize: '1rem', color: '#1a1a1a' }}>MENU</Typography>
            <IconButton size="small" onClick={() => setMobileOpen(false)}><CloseIcon /></IconButton>
          </Box>
          <List disablePadding>
            {navLinks.map((item) => (
              <ListItem key={item.name} disablePadding sx={{ mb: 0.5 }}>
                <Link to={item.to} style={{ textDecoration: 'none', width: '100%' }} onClick={() => setMobileOpen(false)}>
                  <Box sx={{ py: 1.5, px: 2, borderRadius: 2, bgcolor: location.pathname === item.to ? 'rgba(22,156,92,0.08)' : 'transparent', '&:hover': { bgcolor: 'rgba(22,156,92,0.06)' } }}>
                    <ListItemText primary={<Typography sx={{ fontWeight: 600, color: location.pathname === item.to ? '#169C5C' : '#333', fontSize: '1rem' }}>{item.name}</Typography>} />
                  </Box>
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