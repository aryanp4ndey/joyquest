'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { MOODS } from '../../data/quests';

/**
 * BackgroundBeams — Inspired by Aceternity UI.
 * Creates an ultra-deep, atmospheric living background with
 * dynamic mood aurora beams, matrix grid, and floating zen dust particles.
 */
export default function BackgroundBeams() {
  const { state } = useApp();
  const currentMood = MOODS.find((m) => m.id === state.selectedMood) || MOODS[0];

  // Subtle floating star particles with randomized positions
  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: `${(i * 19) % 96 + 2}%`,
      y: `${(i * 29) % 94 + 3}%`,
      size: (i % 3) + 1.5,
      duration: 18 + (i % 8) * 3,
      delay: (i % 5) * 1.5,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* ── 1. Matrix Dot Grid with Radial Falloff ── */}
      <div
        className="absolute inset-0 opacity-[0.22] dark:opacity-[0.14]"
        style={{
          backgroundImage: `radial-gradient(var(--color-surface-border-strong) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, #000 40%, transparent 95%)',
        }}
      />

      {/* ── 2. Primary Atmospheric Glow Beam ── */}
      <motion.div
        animate={{
          scale: [1, 1.08, 0.96, 1],
          opacity: [0.16, 0.26, 0.18, 0.16],
          x: ['-5%', '5%', '-3%', '-5%'],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[65vw] h-[55vh] rounded-full blur-[110px]"
        style={{
          backgroundColor: currentMood.color || '#ff70b8',
        }}
      />

      {/* ── 3. Secondary Cyan/Violet Counter Glow ── */}
      <motion.div
        animate={{
          scale: [0.95, 1.1, 0.95],
          opacity: [0.12, 0.22, 0.12],
          y: ['0%', '8%', '0%'],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vh] rounded-full blur-[130px] bg-cyan-500/20"
      />

      {/* ── 4. Deep Emerald/Indigo Horizon Glow ── */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.1, 0.18, 0.1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vh] rounded-full blur-[140px] bg-emerald-500/15"
      />

      {/* ── 5. Ambient Floating Zen Dust Particles ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/40 dark:bg-white/50"
          style={{
            left: p.x,
            top: p.y,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: `0 0 8px rgba(255, 255, 255, 0.6)`,
          }}
          animate={{
            y: ['0px', '-25px', '0px'],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
