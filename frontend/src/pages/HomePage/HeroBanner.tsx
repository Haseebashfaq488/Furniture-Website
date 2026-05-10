import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import heroBg from '../../assets/images/1.jpg';

const HeroBanner = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 450, sm: 550, md: 700 }, bgcolor: '#eaeaea', overflow: 'hidden' }}>
      <img src={heroBg} alt="Hero Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.3)' }}>
        <Container maxWidth="xl">
          <Box sx={{ maxWidth: { xs: '100%', sm: '80%', md: 600 }, color: '#fff', p: { xs: 2, md: 0 } }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 600, mb: 1, display: 'block', fontSize: { xs: '0.8rem', md: '1rem' } }}>
              COZYCORNER
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: 600, mb: 3, lineHeight: 1.1, fontSize: { xs: '32px', sm: '48px', md: '70px' }, color: '#fff' }}>
              Transform Your Space with Timeless Elegance.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.2rem' }, maxWidth: 450, opacity: 0.9 }}>
              Discover pieces crafted with passion. Redefine your living space.
            </Typography>
            <Button 
              component={Link} 
              to="/shop" 
              variant="contained" 
              sx={{ 
                bgcolor: '#fff', 
                color: '#111', 
                borderRadius: '8px', 
                px: 5, 
                py: 1.5, 
                fontSize: '1rem', 
                fontWeight: 600, 
                textTransform: 'none',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                '&:hover': { 
                  bgcolor: '#111', 
                  color: '#fff', 
                  boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                  transform: 'translateY(-2px)'
                } 
              }}
            >
              Shop the collection
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroBanner;
