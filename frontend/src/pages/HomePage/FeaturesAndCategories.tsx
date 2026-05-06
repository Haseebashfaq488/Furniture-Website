import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';


import accessoriesImg from '../../assets/images/accessories.png';
import cabinetsImg from '../../assets/images/cabinets.png';
import chairsImg from '../../assets/images/chairs.png';
import desksImg from '../../assets/images/desks.png';
import lightningImg from '../../assets/images/lightning.png';
import officeImg from '../../assets/images/office.png';
import tablesImg from '../../assets/images/tables.png';

const topCategories = [
  { name: 'Sofas', img: officeImg },
  { name: 'Armchairs', img: chairsImg },
  { name: 'Cabinets', img: cabinetsImg },
  { name: 'Tables', img: tablesImg },
  { name: 'Desks', img: desksImg },
  { name: 'Lighting', img: lightningImg },
  { name: 'Decor', img: accessoriesImg },
];
const FeaturesAndCategories = () => {
  return (
    <Box sx={{ width: '100%', bgcolor: '#fff', py: 8 }}>
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            mb: 5,
            color: '#111',
            fontSize: { xs: '1.5rem', md: '1.75rem' }
          }}
        >
          Shop by top categories
        </Typography>

        <Box
          sx={{
            display: 'flex',
            gap: { xs: 4, md: 8, lg: 12 },
            overflowX: 'auto',
            justifyContent: 'center',
            alignItems: 'center',
            pb: 3,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollSnapType: 'x mandatory',
          }}
        >
          {topCategories.map((category, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -8 }}
              transition={{ type: 'spring' as const, stiffness: 300 }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: 110,
                  cursor: 'pointer',

                }}
              >
                {/* Image Container */}
                <Box
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: '12px',
                    bgcolor: '#ffffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',

                  }}
                >
                  <img
                    src={category.img}
                    alt={category.name}
                    style={{
                      width: '85%',
                      height: '85%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>

                {/* Category Name */}
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: '#222',
                    textAlign: 'center',
                    fontSize: '0.95rem',
                  }}
                >
                  {category.name}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesAndCategories;