import { Box, Container, Typography, Chip, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import pink from '../../assets/images/3.jpg';
import blue from '../../assets/images/4.jpg';
import beige from '../../assets/images/5.jpg';
import green from '../../assets/images/6.jpg';

const colorBlocks = [
  { name: 'Blue', bgcolor: '#38587d', img: blue },
  { name: 'Beige', bgcolor: '#dcd1c3', img: beige },
  { name: 'Pink', bgcolor: '#d98b8b', img: pink },
  { name: 'Green', bgcolor: '#2e4a42', img: green },
];

const colorFilters = [
  { name: 'Blue', color: '#38587d' },
  { name: 'Beige', color: '#dcd1c3' },
  { name: 'Teal', color: '#4aa09c' },
  { name: 'Pink', color: '#d98b8b' },
  { name: 'Orange', color: '#e87440' },
  { name: 'Burgundy', color: '#7a2020' },
];

const ShopByColor = () => {
  return (
    <Box sx={{ width: '100%', py: 8, bgcolor: '#fff' }}>
      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 4, color: '#111' }}>Shop by color</Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 3, mb: 5 }}>
          {colorBlocks.map((block, idx) => (

            <Box
              key={idx}
              component={Link}
              to={`/shop?color=${block.name}`}
              sx={{
                textDecoration: 'none',
                height: 450,
                borderRadius: 2,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                display: 'block',
                '&:hover .bg-img': { transform: 'scale(1.1)' }
              }}
            >
              <Box
                className="bg-img"
                sx={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: `url(${block.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'transform 0.5s ease',
                  zIndex: 0
                }}
              />
              <Box sx={{ position: 'relative', zIndex: 1, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800, letterSpacing: 1, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>{block.name}</Typography>
                  <IconButton size="small" sx={{ color: '#fff', bgcolor: 'rgba(0,0,0,0.1)', '&:hover': { bgcolor: 'rgba(0,0,0,0.3)' } }}>
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Box>

          ))}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 2, '&::-webkit-scrollbar': { display: 'none' } }}>
          {colorFilters.map((filter, idx) => (
            <Chip
              key={idx}
              component={Link}
              to={`/shop?color=${filter.name}`}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: filter.color }} />
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', color: '#333' }}>{filter.name}</Typography>
                </Box>
              }
              variant="outlined"
              sx={{
                borderRadius: '24px',
                borderColor: '#ccc',
                py: 2.5, px: 2,
                backgroundColor: 'transparent',
                textDecoration: 'none',
                '&:hover': { bgcolor: '#f9f9f9', borderColor: '#aaa' },
                cursor: 'pointer'
              }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default ShopByColor;
