import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <Box sx={{ width: '100%', py: 10, bgcolor: '#f2f5f3' }}>
      <Container maxWidth="xl">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Box sx={{ textAlign: 'center', maxWidth: 800, mx: 'auto' }}>
            <Typography variant="h5" sx={{ color: '#169C5C', mb: 3, letterSpacing: 4 }}>★★★★★</Typography>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, lineHeight: 1.2 }}>
              "I recently purchased my first pieces from CozyCorner, and I must say, the experience exceeded all my expectations!"
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
              AMANDA M.
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>Verified Buyer</Typography>
            
            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#169C5C' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ccc' }} />
              <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ccc' }} />
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials;
