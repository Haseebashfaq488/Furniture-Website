import { useState, Suspense, useRef, useEffect, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { Box, Typography, IconButton, Tooltip, Chip, Slider } from '@mui/material';
import { Add, Remove, ViewInAr, ThreeDRotation, Height } from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// Import GLB paths
import standsGlb from '../../assets/blender/stands.glb?url';
import tabletopGlb from '../../assets/blender/tabletop.glb?url';

/* ─── 3D Model Components ─── */

/**
 * StandModel – renders the stand GLB, anchored to the ground (Y=0).
 *
 * How it works:
 *  1. Compute the raw (unscaled) bounding box of the model once.
 *  2. When heightScale changes, the bottom of the model would move to
 *     `originalMinY * heightScale`. To keep it at Y=0, we translate the
 *     outer group by `-originalMinY * heightScale`.
 *  3. Report the world-space top-Y so the tabletop can sit on it.
 */
function StandModel({ heightScale, onHeightComputed }: { heightScale: number; onHeightComputed: (topY: number) => void }) {
  const { scene } = useGLTF(standsGlb);
  const outerRef = useRef<THREE.Group>(null);

  // Clone the scene once
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Compute the original (unscaled) bounding box once
  const originalBounds = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    return { minY: box.min.y, maxY: box.max.y };
  }, [clonedScene]);

  // Y-offset to keep bottom at ground level after scaling
  const groundOffset = -originalBounds.minY * heightScale;

  // Report the top-Y in world space whenever scale changes
  useEffect(() => {
    const worldTopY = originalBounds.maxY * heightScale + groundOffset;
    onHeightComputed(worldTopY);
  }, [heightScale, originalBounds, groundOffset, onHeightComputed]);

  return (
    <group ref={outerRef} position={[0, groundOffset, 0]}>
      <group scale={[1, heightScale, 1]}>
        <primitive object={clonedScene} />
      </group>
    </group>
  );
}

/**
 * TabletopModel – renders the tabletop GLB, anchored at its bottom.
 *
 * offsetY is the world-space top-Y of the stand (or 0 when shown alone).
 * We also anchor the tabletop's own bottom to that offset so it
 * sits flush on the stand rather than floating.
 */
function TabletopModel({ offsetY }: { offsetY: number }) {
  const { scene } = useGLTF(tabletopGlb);

  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Compute the tabletop's own bottom so we can anchor it
  const tabletopMinY = useMemo(() => {
    const box = new THREE.Box3().setFromObject(clonedScene);
    return box.min.y;
  }, [clonedScene]);

  // Position: move up by offsetY, then compensate for the tabletop's own bottom
  const posY = offsetY - tabletopMinY;

  return (
    <group position={[0, posY, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

// Preload models
useGLTF.preload(standsGlb);
useGLTF.preload(tabletopGlb);

/* ─── Loading Spinner ─── */
function Loader() {
  return (
    <Html center>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          style={{
            width: 48,
            height: 48,
            border: '4px solid rgba(31, 160, 85, 0.2)',
            borderTop: '4px solid #1fa055',
            borderRadius: '50%',
          }}
        />
        <Typography sx={{ color: '#666', fontWeight: 500, fontSize: 14 }}>
          Loading models…
        </Typography>
      </Box>
    </Html>
  );
}

/* ─── Main Page Component ─── */
const ConfiguratorPage = () => {
  const [showStand, setShowStand] = useState(false);
  const [showTabletop, setShowTabletop] = useState(false);
  const [heightScale, setHeightScale] = useState(1); // 0.5x to 2x
  const [standTopY, setStandTopY] = useState(0); // computed from bounding box
  const controlsRef = useRef<any>(null);

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  // The tabletop offset: sits on top of stand if both visible, otherwise at Y=0
  const tabletopOffsetY = showStand ? standTopY : 0;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(145deg, #0f0f13 0%, #1a1a2e 40%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(31, 160, 85, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header Section */}
      <Box
        sx={{
          pt: { xs: 4, md: 6 },
          pb: 2,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 2,
              px: 3,
              py: 1,
              borderRadius: '50px',
              border: '1px solid rgba(31, 160, 85, 0.3)',
              background: 'rgba(31, 160, 85, 0.08)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <ViewInAr sx={{ color: '#1fa055', fontSize: 20 }} />
            <Typography
              sx={{
                color: '#1fa055',
                fontWeight: 600,
                fontSize: '0.85rem',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
              }}
            >
              3D Configurator
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
        >
          <Typography
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
            }}
          >
            Design Your <span style={{ color: '#1fa055' }}>Table</span>
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              color: 'rgba(255,255,255,0.5)',
              fontSize: '1rem',
              fontWeight: 400,
              maxWidth: 460,
              mx: 'auto',
            }}
          >
            Add or remove components to visualize your perfect furniture piece in real-time 3D
          </Typography>
        </motion.div>
      </Box>

      {/* Main Content: 3D Viewer + Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          pb: 6,
          gap: 3,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* 3D Viewport */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ flex: 1 }}
        >
          <Box
            sx={{
              height: { xs: '50vh', md: '70vh' },
              borderRadius: '24px',
              overflow: 'hidden',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              position: 'relative',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            <Canvas
              shadows
              camera={{ position: [3, 3, 3], fov: 45 }}
              gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
              style={{ touchAction: 'none' }}
            >
              <color attach="background" args={['#141420']} />

              {/* Lighting */}
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[5, 8, 3]}
                intensity={1.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
              />
              <directionalLight position={[-3, 4, -2]} intensity={0.3} color="#8888ff" />
              <pointLight position={[0, 3, 0]} intensity={0.5} color="#1fa055" />

              <Suspense fallback={<Loader />}>
                {/* Models */}
                {showStand && (
                  <StandModel
                    heightScale={heightScale}
                    onHeightComputed={setStandTopY}
                  />
                )}
                {showTabletop && <TabletopModel offsetY={tabletopOffsetY} />}

                {/* Show a placeholder grid when nothing is loaded */}
                {!showStand && !showTabletop && (
                  <Html center style={{ pointerEvents: 'none' }}>
                    <Box sx={{ textAlign: 'center', userSelect: 'none', pointerEvents: 'none' }}>
                      <Typography
                        sx={{
                          color: 'rgba(255,255,255,0.25)',
                          fontSize: '1.1rem',
                          fontWeight: 500,
                        }}
                      >
                        Add components →
                      </Typography>
                    </Box>
                  </Html>
                )}

                <Environment preset="city" />
                <ContactShadows
                  position={[0, -0.01, 0]}
                  opacity={0.5}
                  scale={10}
                  blur={2}
                  far={4}
                />
              </Suspense>

              {/* Grid helper */}
              <gridHelper args={[10, 20, '#2a2a3a', '#1a1a28']} />

              <OrbitControls
                ref={controlsRef}
                makeDefault
                enablePan={true}
                enableZoom={true}
                enableRotate={true}
                enableDamping={true}
                dampingFactor={0.1}
                minDistance={1}
                maxDistance={15}
                autoRotate={!showStand && !showTabletop}
                autoRotateSpeed={1}
              />
            </Canvas>

            {/* Camera reset button */}
            <Tooltip title="Reset Camera" placement="left">
              <IconButton
                onClick={handleResetCamera}
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  bgcolor: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    bgcolor: 'rgba(31, 160, 85, 0.2)',
                    color: '#1fa055',
                    border: '1px solid rgba(31, 160, 85, 0.3)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                <ThreeDRotation />
              </IconButton>
            </Tooltip>

            {/* Active components indicator */}
            <Box
              sx={{
                position: 'absolute',
                top: 16,
                left: 16,
                display: 'flex',
                gap: 1,
              }}
            >
              <AnimatePresence>
                {showStand && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                  >
                    <Chip
                      label="Stand"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(31, 160, 85, 0.15)',
                        color: '#1fa055',
                        border: '1px solid rgba(31, 160, 85, 0.3)',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </motion.div>
                )}
                {showTabletop && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                  >
                    <Chip
                      label="Tabletop"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(99, 102, 241, 0.15)',
                        color: '#818cf8',
                        border: '1px solid rgba(99, 102, 241, 0.3)',
                        fontWeight: 600,
                        backdropFilter: 'blur(10px)',
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </motion.div>

        {/* Right Controls Panel */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
        >
          <Box
            sx={{
              width: { xs: '100%', md: 320 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            {/* Panel Title */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  mb: 1,
                }}
              >
                Components
              </Typography>
              <Typography
                sx={{
                  color: '#fff',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                }}
              >
                Table Parts
              </Typography>
            </Box>

            {/* Stand Control Card */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderRadius: '20px',
                background: showStand
                  ? 'linear-gradient(135deg, rgba(31, 160, 85, 0.12) 0%, rgba(31, 160, 85, 0.04) 100%)'
                  : 'rgba(255,255,255,0.03)',
                border: showStand
                  ? '1px solid rgba(31, 160, 85, 0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                '&:hover': {
                  border: '1px solid rgba(31, 160, 85, 0.4)',
                  background: showStand
                    ? 'linear-gradient(135deg, rgba(31, 160, 85, 0.18) 0%, rgba(31, 160, 85, 0.06) 100%)'
                    : 'rgba(255,255,255,0.05)',
                },
              }}
              onClick={() => setShowStand(!showStand)}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      background: showStand
                        ? 'linear-gradient(135deg, #1fa055, #15803d)'
                        : 'rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: showStand ? '0 4px 15px rgba(31, 160, 85, 0.3)' : 'none',
                    }}
                  >
                    <Typography sx={{ fontSize: '1.4rem' }}>🦿</Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    >
                      Stand
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.8rem',
                        fontWeight: 400,
                      }}
                    >
                      Table leg structure
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: showStand
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(31, 160, 85, 0.15)',
                    border: showStand
                      ? '1px solid rgba(239, 68, 68, 0.3)'
                      : '1px solid rgba(31, 160, 85, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {showStand ? (
                    <Remove sx={{ color: '#ef4444', fontSize: 20 }} />
                  ) : (
                    <Add sx={{ color: '#1fa055', fontSize: 20 }} />
                  )}
                </Box>
              </Box>
            </Box>

            {/* Height Adjustment Slider – only visible when stand is active */}
            <AnimatePresence>
              {showStand && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <Box
                    sx={{
                      px: 3,
                      py: 2.5,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08) 0%, rgba(251, 191, 36, 0.02) 100%)',
                      border: '1px solid rgba(251, 191, 36, 0.2)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Height sx={{ color: '#fbbf24', fontSize: 20 }} />
                        <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem' }}>
                          Stand Height
                        </Typography>
                      </Box>
                      <Chip
                        label={`${heightScale.toFixed(1)}x`}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(251, 191, 36, 0.15)',
                          color: '#fbbf24',
                          border: '1px solid rgba(251, 191, 36, 0.3)',
                          fontWeight: 700,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                    <Slider
                      value={heightScale}
                      onChange={(_, val) => setHeightScale(val as number)}
                      min={0.5}
                      max={2}
                      step={0.1}
                      sx={{
                        color: '#fbbf24',
                        '& .MuiSlider-thumb': {
                          width: 16,
                          height: 16,
                          bgcolor: '#fbbf24',
                          boxShadow: '0 2px 8px rgba(251, 191, 36, 0.4)',
                          '&:hover': { boxShadow: '0 2px 12px rgba(251, 191, 36, 0.6)' },
                        },
                        '& .MuiSlider-track': {
                          background: 'linear-gradient(90deg, #f59e0b, #fbbf24)',
                          border: 'none',
                        },
                        '& .MuiSlider-rail': {
                          bgcolor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>Short (0.5x)</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>Tall (2x)</Typography>
                    </Box>
                    {standTopY > 0 && (
                      <Typography sx={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', mt: 1, textAlign: 'center' }}>
                        Top Y: {standTopY.toFixed(3)} units
                      </Typography>
                    )}
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tabletop Control Card */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderRadius: '20px',
                background: showTabletop
                  ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(99, 102, 241, 0.04) 100%)'
                  : 'rgba(255,255,255,0.03)',
                border: showTabletop
                  ? '1px solid rgba(99, 102, 241, 0.3)'
                  : '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                '&:hover': {
                  border: '1px solid rgba(99, 102, 241, 0.4)',
                  background: showTabletop
                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.18) 0%, rgba(99, 102, 241, 0.06) 100%)'
                    : 'rgba(255,255,255,0.05)',
                },
              }}
              onClick={() => setShowTabletop(!showTabletop)}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: '14px',
                      background: showTabletop
                        ? 'linear-gradient(135deg, #6366f1, #4f46e5)'
                        : 'rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                      boxShadow: showTabletop ? '0 4px 15px rgba(99, 102, 241, 0.3)' : 'none',
                    }}
                  >
                    <Typography sx={{ fontSize: '1.4rem' }}>🪵</Typography>
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}
                    >
                      Tabletop
                    </Typography>
                    <Typography
                      sx={{
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: '0.8rem',
                        fontWeight: 400,
                      }}
                    >
                      Surface panel
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: showTabletop
                      ? 'rgba(239, 68, 68, 0.15)'
                      : 'rgba(99, 102, 241, 0.15)',
                    border: showTabletop
                      ? '1px solid rgba(239, 68, 68, 0.3)'
                      : '1px solid rgba(99, 102, 241, 0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {showTabletop ? (
                    <Remove sx={{ color: '#ef4444', fontSize: 20 }} />
                  ) : (
                    <Add sx={{ color: '#6366f1', fontSize: 20 }} />
                  )}
                </Box>
              </Box>
            </Box>

            {/* Quick Actions */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  mb: 2,
                }}
              >
                Quick Actions
              </Typography>

              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Box
                  onClick={() => {
                    setShowStand(true);
                    setShowTabletop(true);
                  }}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(31, 160, 85, 0.1)',
                    border: '1px solid rgba(31, 160, 85, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(31, 160, 85, 0.2)',
                      border: '1px solid rgba(31, 160, 85, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: '#1fa055',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    Add All
                  </Typography>
                </Box>

                <Box
                  onClick={() => {
                    setShowStand(false);
                    setShowTabletop(false);
                  }}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    borderRadius: '12px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(239, 68, 68, 0.2)',
                      border: '1px solid rgba(239, 68, 68, 0.4)',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: '#ef4444',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                    }}
                  >
                    Remove All
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Instructions */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderRadius: '20px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.4)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  mb: 1.5,
                }}
              >
                Controls
              </Typography>
              {[
                { icon: '🖱️', label: 'Left click + drag to rotate' },
                { icon: '🔍', label: 'Scroll to zoom in/out' },
                { icon: '✋', label: 'Right click + drag to pan' },
              ].map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    mb: i < 2 ? 1 : 0,
                  }}
                >
                  <Typography sx={{ fontSize: '0.9rem' }}>{item.icon}</Typography>
                  <Typography
                    sx={{
                      color: 'rgba(255,255,255,0.35)',
                      fontSize: '0.8rem',
                      fontWeight: 400,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default ConfiguratorPage;
