import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useRef } from 'react';

import l1 from '../../assets/images/L1.jpg';
import l2 from '../../assets/images/L2.jpg';
import l3 from '../../assets/images/L3.jpg';
import l4 from '../../assets/images/L4.jpg';
import l5 from '../../assets/images/L5.jpg';
import l6 from '../../assets/images/L6.jpg';
import l7 from '../../assets/images/L7.jpg';
import l8 from '../../assets/images/L8.jpg';
import l9 from '../../assets/images/L9.jpg';

const lamps = [l1, l2, l3, l4, l5, l6, l7, l8, l9];

const IlluminateYourWorld = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
      scrollRef.current.style.scrollSnapType = 'none';
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };

  const handleMouseLeave = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseUp = () => {
    isDown.current = false;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
      scrollRef.current.style.scrollSnapType = 'x mandatory';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <Box sx={{ width: '100%', py: 8, bgcolor: '#fff' }}>
      <Container maxWidth="xl">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', lg: 'row' }, alignItems: 'center', gap: { xs: 4, lg: 8 } }}>
          {/* Text block */}
          <Box sx={{ flex: 1, maxWidth: { xs: '100%', lg: 350 } }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Box sx={{ display: 'inline-block', border: '1px solid #777', borderRadius: 6, px: 2, py: 0.5, mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#111', fontWeight: 600, fontSize: '0.8rem' }}>
                  Lighting
                </Typography>
              </Box>
              <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, lineHeight: 1.2, color: '#111', fontSize: { xs: '2rem', lg: '2.2rem' } }}>
                Illuminate Your World – Bright Ideas Start Here!
              </Typography>
              <Typography variant="body2" sx={{ color: '#555', fontSize: '0.95rem' }}>
                Discover our lighting collections
              </Typography>
            </motion.div>
          </Box>

          {/* Lamps Row */}
          <Box sx={{ flex: 3, position: 'relative', minWidth: 0, width: '100%' }}>
            <Box
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              sx={{
                display: 'flex',
                gap: 5,
                overflowX: 'auto',
                pt: 2,
                pb: 2,
                px: 2,
                cursor: 'grab',
                '&::-webkit-scrollbar': { display: 'none' }
              }}
            >
              {lamps.map((lampImg, idx) => (
                <motion.div key={idx} whileHover={{ y: -8 }}>
                  <Box sx={{ minWidth: 150, cursor: 'pointer', textAlign: 'center', userSelect: 'none' }}>
                    <Box sx={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={lampImg} alt={`Lamp ${idx + 1}`} draggable="false" style={{ width: '100%', height: '100%', objectFit: 'contain', pointerEvents: 'none' }} />
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IlluminateYourWorld;
