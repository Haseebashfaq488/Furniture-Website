import { Box } from '@mui/material';
import ParallaxHero from './ParallaxHero';
import FloatingCategories from './FloatingCategories';
import ProductSpotlight from './ProductSpotlight';
import MarqueeTestimonials from './MarqueeTestimonials';
import IlluminateYourWorld from './IlluminateYourWorld';

const Home = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        zIndex: 2,
        bgcolor: '#fff',
      }}
    >
      {/* 1. Parallax Expansion Hero */}
      <ParallaxHero />

      {/* 2. Floating Grid Categories */}
      <FloatingCategories />

      {/* 3. Lighting Gallery (existing) */}
      <IlluminateYourWorld />

      {/* 4. Sticky-Scrub Product Spotlight */}
      <ProductSpotlight />

      {/* 5. Infinite Marquee Testimonials */}
      <MarqueeTestimonials />
    </Box>
  );
};

export default Home;