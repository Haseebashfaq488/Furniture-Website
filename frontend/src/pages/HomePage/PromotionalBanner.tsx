import { Box, Container, Typography } from '@mui/material';

const PromotionalBanner = () => {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ width: '100%', height: { xs: 80, md: 60 }, bgcolor: '#e4ebe6', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', px: 2, textAlign: 'center' }}>
        <Typography sx={{ fontWeight: 700, color: '#169c5c', letterSpacing: 0.5, fontSize: { xs: '0.85rem', md: '1rem' } }}>
          Save on free delivery, buy what you need! <Box component="span" sx={{ cursor: 'pointer', textDecoration: 'underline', ml: 1, color: '#333' }}>Shop Now</Box>
        </Typography>
      </Box>
    </Container>
  );
};

export default PromotionalBanner;
