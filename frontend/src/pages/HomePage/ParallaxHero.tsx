import { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';

import img1 from '../../assets/images/movingbackground.jpg';
import img2 from '../../assets/images/3.jpg';
import img3 from '../../assets/images/4.jpg';
import img4 from '../../assets/images/5.jpg';

const slides = [
  { img: img1, tagline: 'COZYCORNER — EST. 2010', title: ['Innovative', 'Designs'], sub: 'Furniture crafted to transform your space into a sanctuary of comfort and style.' },
  { img: img2, tagline: 'NEW ARRIVAL', title: ['Timeless', 'Elegance'], sub: 'Discover pieces that blend classic aesthetics with modern functionality.' },
  { img: img3, tagline: 'HANDCRAFTED', title: ['Artisan', 'Collection'], sub: 'Each piece tells a story of quality materials and meticulous craftsmanship.' },
  { img: img4, tagline: 'SUSTAINABLE', title: ['Eco', 'Living'], sub: 'Beautiful furniture built with respect for the environment.' },
];

// Fewer shards = better performance
const COLS = 4;
const ROWS = 3;

const ParallaxHero = () => {
  const [current, setCurrent] = useState(0);
  const [shardKey, setShardKey] = useState(0);
  const [showShards, setShowShards] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
  const textY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [1, 1, 0]);

  const goNext = useCallback(() => {
    if (showShards) return;
    setShowShards(true);
    setShardKey((k) => k + 1);

    // After shards fly away, swap to next image
    setTimeout(() => {
      setCurrent((p) => (p + 1) % slides.length);
      setShowShards(false);
    }, 800);
  }, [showShards]);

  useEffect(() => {
    timerRef.current = setInterval(goNext, 5500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [goNext]);

  const slide = slides[current];
  const nextIdx = (current + 1) % slides.length;

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '80vh', md: '92vh' },
        minHeight: 500,
        maxHeight: 900,
        overflow: 'hidden',
        bgcolor: '#0a0a0a',
      }}
    >
      {/* ── CURRENT IMAGE ── */}
      <Box
        component={motion.div}
        style={{ scale: imageScale }}
        sx={{ position: 'absolute', inset: 0 }}
      >
        <Box
          component="img"
          src={slide.img}
          alt=""
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      {/* Dark overlay */}
      <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.35)', pointerEvents: 'none' }} />

      {/* ── SHARD BREAK TRANSITION ── */}
      {showShards && (
        <Box key={shardKey} sx={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
          {/* Next image fading in behind */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ position: 'absolute', inset: 0, zIndex: 0 }}
          >
            <Box
              component="img"
              src={slides[nextIdx].img}
              alt=""
              sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.35)' }} />
          </motion.div>

          {/* Shard fragments */}
          {Array.from({ length: ROWS * COLS }).map((_, i) => {
            const row = Math.floor(i / COLS);
            const col = i % COLS;
            const delay = col * 0.05 + row * 0.03;
            const dirX = (col - (COLS - 1) / 2) * 120;
            const dirY = (row - (ROWS - 1) / 2) * 80 + 60;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: [1, 1, 0],
                  x: dirX,
                  y: dirY,
                  rotate: (Math.random() - 0.5) * 20,
                }}
                transition={{ duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  position: 'absolute',
                  top: `${(row / ROWS) * 100}%`,
                  left: `${(col / COLS) * 100}%`,
                  width: `${100 / COLS}%`,
                  height: `${100 / ROWS}%`,
                  overflow: 'hidden',
                  zIndex: 1,
                }}
              >
                <Box
                  component="img"
                  src={slide.img}
                  alt=""
                  sx={{
                    position: 'absolute',
                    top: `${-(row / ROWS) * 100}%`,
                    left: `${-(col / COLS) * 100}%`,
                    width: `${COLS * 100}%`,
                    height: `${ROWS * 100}%`,
                    objectFit: 'cover',
                    maxWidth: 'none',
                  }}
                />
              </motion.div>
            );
          })}
        </Box>
      )}

      {/* ── TEXT CONTENT ── */}
      <Container
        maxWidth="lg"
        component={motion.div}
        style={{ y: textY, opacity: textOpacity } as any}
        sx={{
          position: 'relative',
          zIndex: 5,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%' }}
          >
            <Typography
              sx={{
                letterSpacing: 5,
                fontSize: '0.78rem',
                fontWeight: 600,
                mb: 2,
                color: 'rgba(255,255,255,0.65)',
              }}
            >
              {slide.tagline}
            </Typography>

            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2.8rem', sm: '4rem', md: '5.5rem', lg: '6.5rem' },
                lineHeight: 0.95,
                mb: 3,
                letterSpacing: '-0.03em',
                textShadow: '0 2px 30px rgba(0,0,0,0.3)',
              }}
            >
              {slide.title[0]}<br />{slide.title[1]}
            </Typography>

            <Typography
              sx={{
                fontWeight: 300,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                maxWidth: 460,
                mx: 'auto',
                mb: 4,
                opacity: 0.75,
                lineHeight: 1.6,
              }}
            >
              {slide.sub}
            </Typography>

            <Button
              component={Link}
              to="/shop"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                borderRadius: 50,
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 6px 24px rgba(22,156,92,0.4)',
                '&:hover': { transform: 'translateY(-2px)', boxShadow: '0 10px 30px rgba(22,156,92,0.5)' },
                transition: 'all 0.3s',
              }}
            >
              Explore Collection
            </Button>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* ── INDICATORS ── */}
      <Box sx={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 6, display: 'flex', gap: 1.5 }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => { if (!showShards && i !== current) goNext(); }}
            sx={{
              width: i === current ? 28 : 8,
              height: 4,
              borderRadius: 2,
              bgcolor: i === current ? '#fff' : 'rgba(255,255,255,0.35)',
              cursor: 'pointer',
              transition: 'all 0.4s',
            }}
          />
        ))}
      </Box>

      {/* ── SCROLL CUE ── */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 6,
        }}
      >
        <Box sx={{ width: 1.5, height: 18, bgcolor: 'rgba(255,255,255,0.3)', borderRadius: 1 }} />
      </motion.div>
    </Box>
  );
};

export default ParallaxHero;
