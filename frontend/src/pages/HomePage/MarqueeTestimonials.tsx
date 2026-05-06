import { useRef, useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

const testimonials = [
  '"Absolutely stunning craftsmanship — exceeded all expectations!" — Amanda M.',
  '"The sofa transformed our living room into a luxury retreat." — James K.',
  '"CozyCorner pieces are built to last. Worth every penny." — Sarah L.',
  '"Best furniture shopping experience I\'ve ever had." — Michael T.',
  '"The attention to detail is incredible. Museum-quality pieces." — Elena R.',
  '"Our guests always ask where we got our furniture. Thank you!" — David W.',
  '"Sustainable, beautiful, and incredibly comfortable." — Lisa P.',
  '"From order to delivery, the experience was flawless." — Robert J.',
];

const row1 = testimonials.slice(0, 4);
const row2 = testimonials.slice(4, 8);

const MarqueeTestimonials = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 400, damping: 90 });
  
  // Map scroll velocity to extra speed multiplier
  const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [3, 0, 3]);

  const [baseSpeed] = useState(0.5);
  const [offset1, setOffset1] = useState(0);
  const [offset2, setOffset2] = useState(0);
  const animRef = useRef<number>(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const unsub = velocityFactor.on('change', (v) => {
      velocityRef.current = v;
    });
    return unsub;
  }, [velocityFactor]);

  useEffect(() => {
    const animate = () => {
      const speed = baseSpeed + velocityRef.current * 0.3;
      setOffset1((prev) => prev - speed);
      setOffset2((prev) => prev + speed);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [baseSpeed]);

  return (
    <Box
      ref={containerRef}
      sx={{
        py: { xs: 8, md: 12 },
        bgcolor: '#f8faf8',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Section header */}
      <Typography
        variant="overline"
        sx={{
          display: 'block',
          textAlign: 'center',
          letterSpacing: 4,
          fontWeight: 700,
          color: 'primary.main',
          mb: 1,
        }}
      >
        TESTIMONIALS
      </Typography>
      <Typography
        variant="h2"
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          mb: { xs: 5, md: 8 },
          color: '#111',
          fontSize: { xs: '2rem', md: '2.8rem' },
        }}
      >
        What Our Customers Say
      </Typography>

      {/* Row 1: Moves left */}
      <MarqueeRow items={row1} offset={offset1} />

      {/* Row 2: Moves right */}
      <Box sx={{ mt: 3 }}>
        <MarqueeRow items={row2} offset={offset2} />
      </Box>

      {/* Fade edges */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 120,
          background: 'linear-gradient(to right, #f8faf8, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: 120,
          background: 'linear-gradient(to left, #f8faf8, transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

const MarqueeRow = ({ items, offset }: { items: string[]; offset: number }) => {
  // Duplicate items for seamless loop
  const doubled = [...items, ...items, ...items];

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 3,
        transform: `translateX(${offset % (items.length * 420)}px)`,
        willChange: 'transform',
      }}
    >
      {doubled.map((text, i) => (
        <Box
          key={i}
          sx={{
            minWidth: 400,
            maxWidth: 400,
            p: 4,
            bgcolor: '#fff',
            borderRadius: 3,
            border: '1px solid #eaeaea',
            boxShadow: '0 2px 16px rgba(0,0,0,0.03)',
            flexShrink: 0,
            transition: 'box-shadow 0.3s, transform 0.3s',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              transform: 'translateY(-4px)',
            },
          }}
        >
          <Box sx={{ display: 'flex', mb: 2, gap: 0.5 }}>
            {[...Array(5)].map((_, j) => (
              <Typography key={j} sx={{ color: '#169C5C', fontSize: '1rem' }}>★</Typography>
            ))}
          </Box>
          <Typography
            sx={{
              fontSize: '0.95rem',
              fontWeight: 500,
              color: '#333',
              lineHeight: 1.6,
              fontStyle: 'italic',
            }}
          >
            {text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default MarqueeTestimonials;
