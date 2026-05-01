import { Box, Container, Typography } from '@mui/material';
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

const features = [
  { icon: <HandymanOutlinedIcon color="primary" fontSize="large" />, title: 'Craftsmanship', desc: 'Focus on durability and functional traditional techniques.' },
  { icon: <EnergySavingsLeafOutlinedIcon color="primary" fontSize="large" />, title: 'Sustainability', desc: 'Eco-friendly materials and responsible forestry choices.' },
  { icon: <SupportAgentOutlinedIcon color="primary" fontSize="large" />, title: 'Dedicated Support', desc: 'Expert assistance provided for all your requests.' },
  { icon: <VerifiedUserOutlinedIcon color="primary" fontSize="large" />, title: 'Durability Guaranteed', desc: 'Built robustly from the very best solid wood.' },
];

const WhyCozyCorner = () => {
  return (
    <Box sx={{ width: '100%', py: 10, bgcolor: '#fff' }}>
      <Container maxWidth="xl">
        <Typography variant="h5" sx={{ fontWeight: 800, mb: 6 }}>Why CozyCorner?</Typography>
        
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 8, mb: 8 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Box sx={{ width: 4, height: 40, bgcolor: '#169C5C', mr: 2 }} />
              <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                Specializes in artisanal, handcrafted furniture, blending traditional woodworking techniques!
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#555', mb: 4, maxWidth: 500 }}>
              We pride ourselves on an approach to sustainability that is respectful of the planet, ensuring everything we build is made to last forever.
            </Typography>
            <Box sx={{ bgcolor: '#111', color: '#fff', borderRadius: 30, px: 4, py: 1.5, display: 'inline-block', fontWeight: 600, cursor: 'pointer' }}>
              Read More
            </Box>
          </Box>
          <Box>
            {/* Image Placeholder */}
            <Box sx={{ width: '100%', height: 350, bgcolor: '#f4f4f4', borderRadius: 2 }} />
          </Box>
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 4 }}>
          {features.map((feat, idx) => (
            <Box key={idx}>
              <Box sx={{ mb: 2 }}>{feat.icon}</Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>{feat.title}</Typography>
              <Typography variant="body2" sx={{ color: '#666', lineHeight: 1.5 }}>{feat.desc}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default WhyCozyCorner;
