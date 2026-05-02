import { Box, Container, Typography, Grid, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined';
import EnergySavingsLeafOutlined from '@mui/icons-material/EnergySavingsLeafOutlined';
import HandymanOutlined from '@mui/icons-material/HandymanOutlined';
import SupportAgentOutlined from '@mui/icons-material/SupportAgentOutlined';

const iconStyle = { fontSize: 40, color: 'primary.main' };
const textMuted = { color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8 };

const AboutPage = () => (
  <Box>
    {/* Hero */}
    <Box sx={{
      height: { xs: '60vh', md: '70vh' }, minHeight: 400,
      backgroundImage: 'url("/about/about_hero_bg.png")', backgroundSize: 'cover', backgroundPosition: 'center',
      display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
      '&::before': { content: '""', position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', zIndex: 1 },
    }}>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, textAlign: 'center', color: '#fff' }}>
        <Typography variant="h1" sx={{ mb: 2, fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 800 }}>Crafting Comfort</Typography>
        <Typography variant="h5" sx={{ fontWeight: 400, opacity: 0.9 }}>We believe that your home should tell the story of who you are, and be a collection of what you love.</Typography>
      </Container>
    </Box>

    {/* Our Story */}
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
      <Grid container spacing={8} sx={{ alignItems: 'center' }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="overline" sx={{ color: 'primary.main', fontWeight: 600, letterSpacing: 2 }}>OUR STORY</Typography>
          <Typography variant="h2" sx={{ my: 3, fontWeight: 700 }}>A passion for design, a commitment to quality.</Typography>
          <Typography sx={{ mb: 3, ...textMuted }}>Founded in 2010, CozyCorner started with a simple vision: to make high-quality, beautifully designed furniture accessible to everyone. We source our materials sustainably and work with skilled artisans who share our dedication to craftsmanship.</Typography>
          <Typography sx={textMuted}>Every piece in our collection is thoughtfully curated to bring warmth, character, and lasting comfort to your living spaces. We don't just sell furniture; we help you create a home.</Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box component="img" src="/about/about_story_img.png" alt="Craftsmanship" sx={{ width: '100%', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
        </Grid>
      </Grid>
    </Container>

    {/* Stats */}
    <Box sx={{ bgcolor: '#f8f9fa', py: 8 }}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {[['15+', 'Years Experience'], ['10k+', 'Happy Customers'], ['50+', 'Design Awards'], ['100%', 'Satisfaction']].map(([num, label], i) => (
            <Grid size={{ xs: 6, md: 3 }} key={i} sx={{ textAlign: 'center' }}>
              <Typography variant="h2" sx={{ color: 'primary.main', fontWeight: 800, mb: 1 }}>{num}</Typography>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary', textTransform: 'uppercase', letterSpacing: 1 }}>{label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>

    {/* Core Values */}
    <Container maxWidth="xl" sx={{ py: { xs: 8, md: 12 } }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>Our Core Values</Typography>
        <Typography sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', fontSize: '1.1rem' }}>The principles that guide everything we do, from design to delivery.</Typography>
      </Box>
      <Grid container spacing={4}>
        {[
          [<HandymanOutlined sx={iconStyle} />, 'Quality Craftsmanship', 'Built to last generations using premium materials and time-honored techniques.'],
          [<AutoAwesomeOutlined sx={iconStyle} />, 'Timeless Design', 'Aesthetics that transcend trends, ensuring your pieces remain beautiful for years.'],
          [<EnergySavingsLeafOutlined sx={iconStyle} />, 'Sustainability', 'Committed to eco-friendly practices and responsibly sourced materials.'],
          [<SupportAgentOutlined sx={iconStyle} />, 'Exceptional Service', 'Dedicated to providing a seamless, enjoyable experience from start to finish.'],
        ].map(([icon, title, desc], i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Paper elevation={0} sx={{
              p: 4, height: '100%', bgcolor: '#f8f9fa', borderRadius: 4,
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,0,0,0.08)', bgcolor: '#fff' },
            }}>
              <Box sx={{ mb: 3 }}>{icon}</Box>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>{title}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>{desc}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>

    {/* Showroom */}
    <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: '#1a1a1a', color: '#fff' }}>
      <Container maxWidth="xl">
        <Grid container spacing={6} sx={{ alignItems: 'center' }}>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
            <Box component="img" src="/about/about_interior_1.png" alt="Showroom" sx={{ width: '100%', borderRadius: 6, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 }, pl: { md: 4 } }}>
            <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>Experience CozyCorner</Typography>
            <Typography sx={{ mb: 4, color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: 1.8 }}>Step into a world of design inspiration. Our collections are designed to evoke emotion and bring comfort to your everyday life.</Typography>
            <Button component={Link} to="/shop" variant="contained" size="large"
              sx={{ px: 4, py: 1.5, borderRadius: 50, fontWeight: 600, textTransform: 'none', fontSize: '1.1rem' }}>
              Explore the Collection
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
);

export default AboutPage;
