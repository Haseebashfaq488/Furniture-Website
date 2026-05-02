import { Box, Container, Typography } from '@mui/material';
import WaterFillButton from '../ShopPage/AnimatedButton';
import { motion } from 'framer-motion';
import backgroundimage from '../../assets/images/movingbackground.jpg';

const SustainabilitySection = () => {
  return (
    <Box sx={{
      position: 'relative',
      width: '100%',
      height: { xs: 500, md: 650 },
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
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ maxWidth: 800 }}>
            <Typography variant="overline" sx={{ letterSpacing: 2, color: '#aaa', fontWeight: 600, mb: 1, display: 'block' }}>
              SUSTAINABILITY
            </Typography>
            <Typography variant="h2" sx={{ fontWeight: 800, mb: 3, lineHeight: 1.2, color: '#fff' }}>
              When creating our furniture, we care about the environment. <Typography component="span" variant="h2" sx={{ color: '#169C5C', fontWeight: 800 }}>We do not produce</Typography> waste that ends up in landfills. We use even the smallest residues during production.
            </Typography>
            <WaterFillButton
              fillColor="#169C5C"
              waveColor="#34d399"
              sx={{
                bgcolor: '#fff',
                color: '#111',
                borderRadius: 30,
                px: 4,
                py: 1.5,
                fontWeight: 700,
                '&:hover': { bgcolor: '#eee' }
              }}
            >
              Discover More
            </WaterFillButton>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SustainabilitySection;
