import { Box } from '@mui/material';
import HeroBanner from './HeroBanner';
import FeaturesAndCategories from './FeaturesAndCategories';
import ShopByColor from './ShopByColor';
import IlluminateYourWorld from './IlluminateYourWorld';
import PromotionalBanner from './PromotionalBanner';
import SustainabilitySection from './SustainabilitySection';
import WhyCozyCorner from './WhyCozyCorner';
import Testimonials from './Testimonials';

const Home = () => {
  return (
    <Box>
      <HeroBanner />
      <FeaturesAndCategories />
      <ShopByColor />
      <IlluminateYourWorld />
      <PromotionalBanner />
      <SustainabilitySection />
      <WhyCozyCorner />
      <Testimonials />
    </Box>
  );
};

export default Home;