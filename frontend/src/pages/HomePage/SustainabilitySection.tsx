import { Box, Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import backgroundimage from '../../assets/images/movingbackground.jpg';

const SustainabilitySection = () => {
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      minHeight: { xs: 450, md: 650 },
      bgcolor: '#111',
      mt: 4,
      display: 'flex',
      alignItems: 'center',
      backgroundImage: `linear-gradient(rgba(17, 17, 17, 0.6), rgba(17, 17, 17, 0.6)), url(${backgroundimage})`,
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundSize: 'cover'
    }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: { xs: '100%', md: 800 }, p: { xs: 2, md: 0 } }}>
          <Typography variant="overline" sx={{ letterSpacing: 2, color: '#aaa', fontWeight: 600, mb: 1, display: 'block', fontSize: { xs: '0.8rem', md: '1rem' } }}>
            SUSTAINABILITY
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 4, lineHeight: 1.3, color: '#fff', fontSize: { xs: '22px', sm: '32px', md: '40px' } }}>
            When creating our furniture, we care about the environment. <Typography component="span" variant="h2" sx={{ color: '#169C5C', fontWeight: 800, fontSize: 'inherit' }}>We do not produce</Typography> waste that ends up in landfills. We use even the smallest residues during production.
          </Typography>
          <Button
            component={Link}
            to="/about"
            sx={{
              bgcolor: '#169C5C',
              color: '#fff',
              borderRadius: '8px',
              px: { xs: 4, md: 5 },
              py: 1.5,
              fontWeight: 700,
              fontSize: '1rem',
              textTransform: 'none',
              boxShadow: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#12824C',
                color: '#fff',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                transform: 'translateY(-2px)'
              }
            }}
          >
            Discover More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SustainabilitySection;
