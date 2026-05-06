import { useRef, useState } from 'react';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import sofaImg from '../../assets/images/Whycozycorner.jpg';

const specs = [
  {
    id: 'frame',
    label: 'Solid Oak Frame',
    detail: 'Kiln-dried hardwood frame, FSC-certified sustainable sourcing. Built to last generations.',
    icon: '🪵',
    top: '25%',
    left: '15%',
  },
  {
    id: 'cushion',
    label: 'Memory Foam Core',
    detail: 'High-density 45kg/m³ foam. CertiPUR-US certified, breathable and hypoallergenic.',
    icon: '☁️',
    top: '58%',
    left: '48%',
  },
  {
    id: 'fabric',
    label: 'Italian Linen Blend',
    detail: '65% linen, 35% cotton. Stain-resistant Crypton finish — 100k+ double rubs.',
    icon: '🧵',
    top: '32%',
    left: '82%',
  },
];

const features = ['Handcrafted', 'Eco-Friendly', '10yr Warranty', 'Free Shipping'];

const ProductSpotlight = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSpec, setActiveSpec] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  // Image entrance + rotation
  const imgRotateY = useTransform(smooth, [0.15, 0.4], [0, 12]);
  const imgRotateX = useTransform(smooth, [0.15, 0.4], [0, -3]);
  const imgScale = useTransform(smooth, [0.05, 0.25, 0.5], [0.85, 1.02, 1]);

  // Hotspot visibility
  const hotspotOpacity = useTransform(smooth, [0.5, 0.65], [0, 1]);

  // Text entrance
  const titleOpacity = useTransform(smooth, [0.05, 0.2], [0, 1]);
  const titleX = useTransform(smooth, [0.05, 0.2], [-60, 0]);

  return (
    <Box
      ref={sectionRef}
      sx={{ position: 'relative', height: '400vh' }}
    >
      {/* Sticky viewport */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
        }}
      >
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: 'center',
              gap: { xs: 4, md: 6, lg: 10 },
            }}
          >
            {/* ── LEFT: TEXT ── */}
            <Box
              component={motion.div}
              style={{ opacity: titleOpacity, x: titleX } as any}
              sx={{ flex: 1, maxWidth: { md: 450 }, zIndex: 3 }}
            >
              <Chip
                label="✦ SPOTLIGHT"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(22,156,92,0.12)',
                  color: '#169C5C',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  letterSpacing: 2,
                  borderRadius: '8px',
                  height: 30,
                }}
              />
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  lineHeight: 1.05,
                  fontSize: { xs: '2.2rem', md: '3.2rem' },
                  mb: 2,
                  color: '#111',
                }}
              >
                The Artisan
                <br />
                <Box component="span" sx={{ color: '#169C5C' }}>Collection</Box>
              </Typography>
              <Typography
                sx={{
                  fontSize: '1.05rem',
                  lineHeight: 1.75,
                  maxWidth: 400,
                  mb: 3,
                  color: '#555',
                }}
              >
                Scroll to explore the craftsmanship behind our signature piece.
                Click the hotspots to discover materials and construction details.
              </Typography>

              {/* Feature tags */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 }}>
                {features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                  >
                    <Chip
                      label={f}
                      variant="outlined"
                      size="small"
                      sx={{
                        borderColor: 'rgba(22,156,92,0.3)',
                        color: '#555',
                        fontWeight: 600,
                        fontSize: '0.78rem',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: 'rgba(22,156,92,0.08)',
                          borderColor: '#169C5C',
                        },
                      }}
                    />
                  </motion.div>
                ))}
              </Box>

              <Button
                component={Link}
                to="/shop"
                variant="contained"
                color="primary"
                sx={{
                  borderRadius: 50,
                  px: 4,
                  py: 1.4,
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: '0.95rem',
                  boxShadow: '0 6px 24px rgba(22,156,92,0.35)',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 30px rgba(22,156,92,0.45)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                Shop This Collection
              </Button>
            </Box>

            {/* ── RIGHT: IMAGE + HOTSPOTS ── */}
            <Box sx={{ flex: 1.5, position: 'relative', zIndex: 2 }}>
              <Box
                component={motion.div}
                style={{
                  rotateY: imgRotateY,
                  rotateX: imgRotateX,
                  scale: imgScale,
                }}
                sx={{ perspective: 1200, transformStyle: 'preserve-3d' }}
              >
                <Box
                  component="img"
                  src={sofaImg}
                  alt="Artisan Collection"
                  sx={{
                    width: '100%',
                    maxWidth: 680,
                    borderRadius: '20px',
                    boxShadow: '0 30px 80px rgba(0,0,0,0.12)',
                    display: 'block',
                    mx: 'auto',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />

                {/* Hotspots */}
                <Box
                  component={motion.div}
                  style={{ opacity: hotspotOpacity }}
                  sx={{ position: 'absolute', inset: 0, zIndex: 3 }}
                >
                  {specs.map((spec) => (
                    <Box
                      key={spec.id}
                      sx={{
                        position: 'absolute',
                        top: spec.top,
                        left: spec.left,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Pulse ring */}
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                          position: 'absolute',
                          inset: -6,
                          borderRadius: '50%',
                          border: '2px solid rgba(22,156,92,0.4)',
                        }}
                      />
                      <motion.div whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.9 }}>
                        <Box
                          onClick={() => setActiveSpec(activeSpec === spec.id ? null : spec.id)}
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            bgcolor: '#fff',
                            border: '2px solid #169C5C',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            transition: 'all 0.2s',
                            '&:hover': { bgcolor: '#169C5C' },
                          }}
                        >
                          <span>{spec.icon}</span>
                        </Box>
                      </motion.div>

                      <AnimatePresence>
                        {activeSpec === spec.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 8, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <Box
                              sx={{
                                mt: 1.5,
                                p: 2.5,
                                minWidth: 230,
                                maxWidth: 270,
                                bgcolor: 'rgba(10,10,10,0.92)',
                                backdropFilter: 'blur(16px)',
                                borderRadius: '12px',
                                color: '#fff',
                                boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Box sx={{ fontSize: '1.1rem' }}>{spec.icon}</Box>
                                <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: '#4ade80' }}>
                                  {spec.label}
                                </Typography>
                              </Box>
                              <Typography sx={{ fontSize: '0.8rem', lineHeight: 1.6, opacity: 0.8 }}>
                                {spec.detail}
                              </Typography>
                            </Box>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ProductSpotlight;
