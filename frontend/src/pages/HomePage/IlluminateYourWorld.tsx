import { Box, Container, Typography, Button } from '@mui/material';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import l1 from '../../assets/images/L1.jpg';
import l2 from '../../assets/images/L2.jpg';
import l3 from '../../assets/images/L3.jpg';
import l4 from '../../assets/images/L4.jpg';
import l5 from '../../assets/images/L5.jpg';
import l6 from '../../assets/images/L6.jpg';
import l7 from '../../assets/images/L7.jpg';
import l8 from '../../assets/images/L8.jpg';
import l9 from '../../assets/images/L9.jpg';

const lamps = [
  { img: l1, name: 'Aurora Pendant', price: '$189' },
  { img: l2, name: 'Solstice Floor Lamp', price: '$329' },
  { img: l3, name: 'Zenith Table Lamp', price: '$149' },
  { img: l4, name: 'Nova Sconce', price: '$219' },
  { img: l5, name: 'Eclipse Desk Lamp', price: '$179' },
  { img: l6, name: 'Orbit Chandelier', price: '$499' },
  { img: l7, name: 'Crescent Arc Lamp', price: '$389' },
  { img: l8, name: 'Halo Pendant', price: '$259' },
  { img: l9, name: 'Prism Table Lamp', price: '$199' },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const lampVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

const IlluminateYourWorld = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax movement for the background glow
  const glowX = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Drag-to-scroll handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grabbing';
      startX.current = e.pageX - scrollRef.current.offsetLeft;
      scrollLeft.current = scrollRef.current.scrollLeft;
    }
  };
  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab';
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current) * 2;
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        py: { xs: 10, md: 14 },
        overflow: 'hidden',
        bgcolor: '#fafbfc',
      }}
    >
      {/* Floating gradient orb */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          left: glowX as any,
          width: '40vw',
          height: '40vw',
          maxWidth: 500,
          maxHeight: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22,156,92,0.07) 0%, transparent 70%)',
          opacity: bgOpacity as any,
          pointerEvents: 'none',
        } as any}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: { xs: 'flex-start', lg: 'center' },
            gap: { xs: 4, lg: 8 },
          }}
        >
          {/* ── LEFT: HEADER ── */}
          <Box sx={{ flex: '0 0 auto', maxWidth: { lg: 320 } }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7 }}
            >
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  bgcolor: 'rgba(22,156,92,0.08)',
                  borderRadius: '10px',
                  px: 2,
                  py: 0.6,
                  mb: 3,
                }}
              >
                <Box sx={{ fontSize: '1rem' }}>💡</Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#169C5C', letterSpacing: 1 }}>
                  LIGHTING
                </Typography>
              </Box>

              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  mb: 2,
                  lineHeight: 1.15,
                  color: '#111',
                  fontSize: { xs: '1.8rem', lg: '2.4rem' },
                }}
              >
                Illuminate Your
                <br />
                <Box component="span" sx={{ color: '#169C5C' }}>World</Box>
              </Typography>
              <Typography
                sx={{
                  color: '#666',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  mb: 3,
                }}
              >
                Bright ideas start here — discover designer lighting that transforms every room.
              </Typography>
              <Button
                component={Link}
                to="/shop"
                variant="outlined"
                sx={{
                  borderRadius: 50,
                  borderColor: '#169C5C',
                  color: '#169C5C',
                  fontWeight: 600,
                  textTransform: 'none',
                  px: 3,
                  '&:hover': {
                    bgcolor: '#169C5C',
                    color: '#fff',
                    borderColor: '#169C5C',
                  },
                  transition: 'all 0.3s',
                }}
              >
                View All Lighting →
              </Button>
            </motion.div>
          </Box>

          {/* ── RIGHT: SCROLLABLE LAMP GALLERY ── */}
          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-50px' }}
            >
              <Box
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                sx={{
                  display: 'flex',
                  gap: 3,
                  overflowX: 'auto',
                  pb: 2,
                  cursor: 'grab',
                  scrollSnapType: 'x proximity',
                  '&::-webkit-scrollbar': { display: 'none' },
                  msOverflowStyle: 'none',
                }}
              >
                {lamps.map((lamp, idx) => (
                  <motion.div key={idx} variants={lampVariants}>
                    <motion.div
                      whileHover={{ y: -12, scale: 1.03 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <Box
                        sx={{
                          minWidth: 180,
                          maxWidth: 180,
                          textAlign: 'center',
                          userSelect: 'none',
                          cursor: 'pointer',
                          scrollSnapAlign: 'start',
                        }}
                      >
                        {/* Image container with hover glow */}
                        <Box
                          sx={{
                            height: 220,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: '#fff',
                            borderRadius: '16px',
                            mb: 2,
                            p: 2,
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                            transition: 'all 0.4s ease',
                            '&:hover': {
                              boxShadow: '0 12px 40px rgba(22,156,92,0.12)',
                              '& .lamp-glow': {
                                opacity: 1,
                              },
                            },
                          }}
                        >
                          {/* Glow effect on hover */}
                          <Box
                            className="lamp-glow"
                            sx={{
                              position: 'absolute',
                              bottom: 0,
                              left: '50%',
                              transform: 'translateX(-50%)',
                              width: '80%',
                              height: '40%',
                              background: 'radial-gradient(ellipse, rgba(255,200,50,0.15) 0%, transparent 70%)',
                              opacity: 0,
                              transition: 'opacity 0.4s ease',
                              pointerEvents: 'none',
                            }}
                          />
                          <img
                            src={lamp.img}
                            alt={lamp.name}
                            draggable="false"
                            style={{
                              width: '85%',
                              height: '85%',
                              objectFit: 'contain',
                              pointerEvents: 'none',
                              transition: 'transform 0.4s ease',
                            }}
                          />
                        </Box>

                        {/* Label */}
                        <Typography
                          sx={{
                            fontWeight: 600,
                            fontSize: '0.88rem',
                            color: '#222',
                            mb: 0.3,
                          }}
                        >
                          {lamp.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            color: '#169C5C',
                          }}
                        >
                          {lamp.price}
                        </Typography>
                      </Box>
                    </motion.div>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default IlluminateYourWorld;
