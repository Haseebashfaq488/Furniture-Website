import { Box, Container, Typography } from '@mui/material';
import ProductSlider from './productslider';

const ShopPage = () => {
  return (
    <Box sx={{ width: '100%', py: 8, minHeight: '100vh', bgcolor: '#fff' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1, textAlign: 'center' }}>Shop Our Collection</Typography>
        <Typography variant="body1" sx={{ color: '#666', mb: 5, textAlign: 'center' }}>Discover the perfect pieces for your home.</Typography>
        
        <ProductSlider />
      </Container>
    </Box>
  );
};

export default ShopPage;
