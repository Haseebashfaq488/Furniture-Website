'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface WaterFillButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    fillColor?: string;
    waveColor?: string;
    sx?: any;
}

const WaterFillButton: React.FC<WaterFillButtonProps> = ({
    children,
    onClick,
    fillColor = '#3b82f6',
    waveColor = '#60a5fa',
    sx,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                px: 8,
                py: 3.5,
                fontSize: '1.15rem',
                fontWeight: 700,
                borderRadius: '20px',
                backgroundColor: '#1e3a8a', // Base button color (empty look)
                color: '#fff',
                textTransform: 'none',
                boxShadow: '0 10px 30px rgba(30, 58, 138, 0.4)',
                '&:hover': {
                    backgroundColor: '#1e40af',
                },
                ...sx,
            }}
        >
            {/* Water Fill - From Left to Right */}
            <motion.div
                initial={{ width: '0%' }}
                animate={{ width: isHovered ? '100%' : '0%' }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    background: `linear-gradient(to right, ${fillColor}, #22d3ee)`,
                    zIndex: 1,
                }}
            />

            {/* Water Surface Wave */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{
                    x: isHovered ? ['-20%', '20%', '-20%'] : '-100%',
                }}
                transition={{
                    duration: 2.5,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'easeInOut',
                }}
                style={{
                    position: 'absolute',
                    top: '0%',
                    left: 0,
                    width: '120%',
                    height: '100%',
                    background: `linear-gradient(transparent 60%, ${waveColor}88 75%, transparent 90%)`,
                    zIndex: 2,
                    opacity: isHovered ? 0.9 : 0,
                }}
            />

            {/* Second Wave Layer */}
            <motion.div
                initial={{ x: '-100%' }}
                animate={{
                    x: isHovered ? ['-30%', '10%', '-30%'] : '-100%',
                }}
                transition={{
                    duration: 3.2,
                    repeat: isHovered ? Infinity : 0,
                    ease: 'easeInOut',
                    delay: 0.4,
                }}
                style={{
                    position: 'absolute',
                    top: '0%',
                    left: 0,
                    width: '140%',
                    height: '100%',
                    background: `linear-gradient(transparent 55%, ${waveColor}66 78%, transparent)`,
                    zIndex: 2,
                    opacity: isHovered ? 0.6 : 0,
                }}
            />

            {/* Light Highlight on Water */}
            <motion.div
                animate={{
                    x: isHovered ? ['-100%', '200%'] : '-100%',
                }}
                transition={{
                    duration: 1.8,
                    repeat: isHovered ? Infinity : 0,
                    repeatDelay: 0.8,
                }}
                style={{
                    position: 'absolute',
                    top: '20%',
                    left: 0,
                    width: '30%',
                    height: '20%',
                    background: 'rgba(255, 255, 255, 0.35)',
                    filter: 'blur(8px)',
                    zIndex: 3,
                    opacity: isHovered ? 0.6 : 0,
                }}
            />

            {/* Text Content */}
            <span style={{ position: 'relative', zIndex: 5 }}>{children}</span>
        </Button>
    );
};

export default WaterFillButton;