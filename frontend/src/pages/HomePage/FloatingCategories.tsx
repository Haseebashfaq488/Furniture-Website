import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

import accessoriesImg from '../../assets/images/accessories.png';
import cabinetsImg from '../../assets/images/cabinets.png';
import chairsImg from '../../assets/images/chairs.png';
import desksImg from '../../assets/images/desks.png';
import lightningImg from '../../assets/images/lightning.png';
import officeImg from '../../assets/images/office.png';
import tablesImg from '../../assets/images/tables.png';

const categories = [
  { name: 'Sofas', img: officeImg },
  { name: 'Armchairs', img: chairsImg },
  { name: 'Cabinets', img: cabinetsImg },
  { name: 'Tables', img: tablesImg },
  { name: 'Desks', img: desksImg },
  { name: 'Lighting', img: lightningImg },
  { name: 'Decor', img: accessoriesImg },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  },
};

const FloatingCategories = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fff' }}>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="overline"
            sx={{
              color: 'primary.main',
              letterSpacing: 4,
              fontWeight: 700,
              mb: 1,
              display: 'block',
              textAlign: 'center',
            }}
          >
            BROWSE
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              textAlign: 'center',
              mb: { xs: 5, md: 8 },
              color: '#111',
              fontSize: { xs: '2rem', md: '2.8rem' },
            }}
          >
            Shop by Category
          </Typography>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover="hovered"
              style={{ cursor: 'pointer' }}
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minWidth: { xs: 100, md: 140 },
                    p: 2,
                  }}
                >
                  {/* Image circle */}
                  <Box
                    sx={{
                      width: { xs: 100, md: 140 },
                      height: { xs: 100, md: 140 },
                      borderRadius: '20px',
                      bgcolor: '#f5f5f5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      overflow: 'hidden',
                      transition: 'all 0.4s ease',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                      '&:hover': {
                        boxShadow: '0 12px 40px rgba(22,156,92,0.15)',
                        bgcolor: '#eefbf3',
                      },
                    }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.name}
                      style={{
                        width: '75%',
                        height: '75%',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 700,
                      color: '#333',
                      fontSize: '0.95rem',
                      textAlign: 'center',
                    }}
                  >
                    {cat.name}
                  </Typography>
                </Box>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Box>
  );
};

export default FloatingCategories;
