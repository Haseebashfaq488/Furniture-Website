import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <Box sx={{ position: 'relative', width: '100%', height: { xs: 500, md: 700 }, bgcolor: '#eaeaea', overflow: 'hidden' }}>
      {/* Absolute image placeholder taking the full width */}
      <img src="https://via.placeholder.com/1920x1080" alt="Hero Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      
      {/* Content overlay */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="xl">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <Box sx={{ maxWidth: { xs: '100%', md: 600 }, color: '#fff', p: { xs: 3, md: 0 } }}>
              <Typography variant="overline" sx={{ letterSpacing: 2, fontWeight: 600, mb: 1, display: 'block' }}>
                COZYCORNER
              </Typography>
              <Typography variant="h1" sx={{ fontWeight: 600, mb: 3, lineHeight: 1.1, fontSize: { xs: '40px', md: '70px' }, color: '#fff' }}>
                Transform Your Space with Timeless Elegance.
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, fontSize: '1.1rem', maxWidth: 450, opacity: 0.9 }}>
                Discover pieces crafted with passion. Redefine your living space.
              </Typography>
              <Button variant="contained" color="primary" sx={{ borderRadius: 30, px: 5, py: 1.5, fontSize: '1rem', fontWeight: 600, textTransform: 'none' }}>
                Shop the collection
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

export default HeroBanner;
