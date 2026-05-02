import { Box } from '@mui/material';
import HeroBanner from './HeroBanner';
import FeaturesAndCategories from './FeaturesAndCategories';
import ShopByColor from './ShopByColor';
import IlluminateYourWorld from './IlluminateYourWorld';
import PromotionalBanner from './PromotionalBanner';
import SustainabilitySection from './SustainabilitySection';
import Testimonials from './Testimonials';
import { HeroSection, FeaturesSection } from './cozycorner';


const Home = () => {
  return (
    <Box>
      <HeroBanner />
      <FeaturesAndCategories />
      <ShopByColor />
      <IlluminateYourWorld />
      <PromotionalBanner />
      <SustainabilitySection />
      <Testimonials />
      <HeroSection />
      <FeaturesSection />
    </Box>
  );
};

export default Home;