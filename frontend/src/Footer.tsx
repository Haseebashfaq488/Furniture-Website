import { Box, Container, Typography, IconButton, Link, Divider, InputBase, Button } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#fff', color: '#333', pt: 8, pb: 2, borderTop: '1px solid #eaeaea' }}>
      <Container maxWidth="xl">
        {/* Instagram Row */}
        <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Follow us on Instagram <span style={{ fontWeight: 400 }}>@CozyCorner</span></Typography>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', mb: 8, '&::-webkit-scrollbar': { display: 'none' } }}>
          {[1, 2, 3, 4, 5].map((item) => (
            <Box key={item} sx={{ minWidth: 200, height: 200, bgcolor: '#f2f2f2', borderRadius: 2 }} />
          ))}
        </Box>

        {/* Newsletter Row */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', mb: 8, gap: 4 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#333' }}>
            Join our newsletter and <span style={{ color: '#1fa055' }}>get $20 discount</span> for your first order!
          </Typography>
          <Box sx={{ display: 'flex', border: '1px solid #ccc', borderRadius: 30, overflow: 'hidden', pl: 2, maxWidth: 400, width: '100%' }}>
            <InputBase placeholder="Enter your email address" fullWidth sx={{ fontSize: '0.9rem' }} />
            <Button variant="contained" sx={{ bgcolor: '#111', color: '#fff', borderRadius: 30, px: 4, py: 1.5, '&:hover': { bgcolor: '#333' } }}>
              Subscribe
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 8 }} />

        {/* Links Columns */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.5fr 1fr 1fr 1fr 1fr' }, gap: 6, mb: 6 }}>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
              <Box sx={{ width: 30, height: 30, bgcolor: '#1fa055', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 1 }}>
                <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', lineHeight: 1 }}>C</Typography>
              </Box>
              <Typography sx={{ fontWeight: 900, lineHeight: 1, fontSize: '1rem', letterSpacing: '-0.5px' }}>COZY<br/>CORNER</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#666', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              Toll free: <strong style={{ color: '#111' }}>+1 234 567 890</strong>
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 2 }}>
              7859 NW 23rd St, Miami, Florida, United States
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', textDecoration: 'underline', cursor: 'pointer' }}>support@cozycorner.com</Typography>
          </Box>
          
          <Box>
             <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Profiles</Typography>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>My account</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Checkout</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Order tracking</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Help & Support</Link>
          </Box>
          <Box>
             <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Useful links</Typography>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>About us</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Blog</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Contact</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Our team</Link>
          </Box>
          <Box>
             <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Pages</Typography>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Shop</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Sale</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Lookbook</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Privacy Policy</Link>
          </Box>
          <Box>
             <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 3 }}>Our store</Typography>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>New York</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>London SF</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Cockfosters BP</Link>
             <Link href="#" underline="hover" sx={{ display: 'block', color: '#666', mb: 1.5, fontSize: '0.9rem' }}>Los Angeles</Link>
          </Box>
        </Box>
        
        <Divider sx={{ mb: 4 }} />
        
        {/* Bottom Banner */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="body2" sx={{ color: '#aaa', fontSize: '0.8rem' }}>
            &copy; {new Date().getFullYear()} CozyCorner. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
             <IconButton size="small" sx={{ color: '#666' }}><InstagramIcon fontSize="small" /></IconButton>
             <IconButton size="small" sx={{ color: '#666' }}><FacebookIcon fontSize="small" /></IconButton>
             <IconButton size="small" sx={{ color: '#666' }}><TwitterIcon fontSize="small" /></IconButton>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default Footer;
