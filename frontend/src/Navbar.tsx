import {
  Box,
  Container,
  Typography,
  IconButton,
  InputBase,
  Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  Search,
  Person,
  FavoriteBorder,
  ShoppingBagOutlined,
  PhoneOutlined,
} from '@mui/icons-material';

const Navbar = () => {
  return (
    <Box sx={{ bgcolor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
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
              Shop Sofas and Couches →
            </Link>
          </Box>
        </Container>
      </Box>

      {/* Main Navbar */}
      <Container maxWidth="xl">
        <Box sx={{ py: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                bgcolor: '#1fa055',
                borderRadius: 1.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <Typography sx={{ fontSize: '28px', fontWeight: 800, lineHeight: 1 }}>🏠</Typography>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: '1.65rem',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                  color: '#1a1a1a',
                }}
              >
                COZY
              </Typography>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: '1.65rem',
                  lineHeight: 1,
                  letterSpacing: '-1px',
                  color: '#1a1a1a',
                  mt: -0.8,
                }}
              >
                CORNER
              </Typography>
            </Box>
          </Box>

          {/* Search Bar */}
          <Box
            sx={{
              flex: 1,
              maxWidth: 520,
              mx: 6,
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              border: '1px solid #e0e0e0',
              borderRadius: '50px',
              px: 2.5,
              py: 1,
              bgcolor: '#fafafa',
            }}
          >
            <Search sx={{ color: '#666', mr: 1.5 }} />
            <InputBase
              placeholder="Search for products..."
              fullWidth
              sx={{ fontSize: '0.95rem', color: '#333' }}
            />
          </Box>

          {/* Right Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {/* Phone */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 1.5 }}>
              <PhoneOutlined sx={{ color: '#555', fontSize: 26 }} />
              <Box>
                <Typography variant="caption" sx={{ color: '#777', display: 'block', lineHeight: 1 }}>
                  Need help?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 700, color: '#1a1a1a' }}
                >
                  +1-202-555-0172
                </Typography>
              </Box>
            </Box>

            {/* Icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <IconButton sx={{ color: '#333' }}>
                <Person />
              </IconButton>

              <IconButton sx={{ color: '#333' }}>
                <Badge badgeContent={0} color="error">
                  <FavoriteBorder />
                </Badge>
              </IconButton>

              <IconButton sx={{ color: '#333' }}>
                <Badge
                  badgeContent={0}
                  color="success"
                  sx={{
                    '& .MuiBadge-badge': {
                      backgroundColor: '#1fa055',
                    },
                  }}
                >
                  <ShoppingBagOutlined />
                </Badge>
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Bottom Navigation */}
      <Box sx={{ borderTop: '1px solid #eaeaea', bgcolor: '#fff' }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 4,
              py: 2,
              fontSize: '0.95rem',
              fontWeight: 600,
              color: '#333',
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Home
            </Link>
            <Link
              to="/shop"
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              Shop
            </Link>
            <Link
              to="/configurator"
              style={{
                textDecoration: 'none',
                color: '#333',
                fontWeight: 600,
                whiteSpace: 'nowrap',
              }}
            >
              3D Configurator
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Navbar;