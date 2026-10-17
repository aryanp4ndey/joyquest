'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { playBowlTone } from '../utils/audio';

/**
 * 4-7-8 Breathing Orb
 * Concentric SVG rings expanding on Inhale (4s), holding on Hold (7s),
 * and gently contracting on Exhale (8s) with synchronized harmonic sound pulses.
 */
export default function BreathingOrb({ soundEnabled = true, accentColor = '#10e5aa' }) {
  const [phase, setPhase] = useState('inhale'); // inhale (4s) | hold (7s) | exhale (8s)
  const [secondsLeft, setSecondsLeft] = useState(4);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    let timer;
    if (phase === 'inhale') {
      playBowlTone(432, soundEnabled);
      setSecondsLeft(4);
      timer = setTimeout(() => {
        setPhase('hold');
      }, 4000);
    } else if (phase === 'hold') {
      playBowlTone(528, soundEnabled);
      setSecondsLeft(7);
      timer = setTimeout(() => {
        setPhase('exhale');
      }, 7000);
    } else if (phase === 'exhale') {
      playBowlTone(396, soundEnabled);
      setSecondsLeft(8);
      timer = setTimeout(() => {
        setPhase('inhale');
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [phase, isActive, soundEnabled]);

  // Second-by-second countdown
  useEffect(() => {
    if (!isActive) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 1 ? prev - 1 : prev));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase, isActive]);

  const phaseConfig = {
    inhale: { label: 'Inhale Deeply', scale: 1.25, duration: 4, sub: 'Breathe in peace' },
    hold: { label: 'Hold Still', scale: 1.25, duration: 7, sub: 'Rest in awareness' },
    exhale: { label: 'Slowly Exhale', scale: 0.88, duration: 8, sub: 'Release all tension' },
  };

  const current = phaseConfig[phase];

  return (
    <div className="flex flex-col items-center justify-center p-6 select-none">
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
        {/* Outer Glow Halo */}
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl opacity-40 pointer-events-none"
          style={{ backgroundColor: accentColor }}
          animate={{ scale: current.scale * 1.1 }}
          transition={{ duration: current.duration, ease: 'easeInOut' }}
        />

        {/* Outer Concentric SVG Ring */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 200 200"
          animate={{ scale: current.scale }}
          transition={{ duration: current.duration, ease: 'easeInOut' }}
        >
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke={accentColor}
            strokeWidth="1.5"
            strokeDasharray="4 6"
            opacity="0.35"
          />
          <circle
            cx="100"
            cy="100"
            r="72"
            fill="none"
            stroke={accentColor}
            strokeWidth="2"
            opacity="0.55"
          />
          <circle
            cx="100"
            cy="100"
            r="56"
            fill={`${accentColor}18`}
            stroke={accentColor}
            strokeWidth="1.5"
          />
        </motion.svg>

        {/* Center Orb Core */}
        <motion.div
          className="relative z-10 w-24 h-24 rounded-full flex flex-col items-center justify-center text-center shadow-lg border border-white/20 backdrop-blur-md"
          style={{
            background: `radial-gradient(circle, ${accentColor} 0%, rgba(10,10,12,0.85) 100%)`,
          }}
          animate={{ scale: current.scale }}
          transition={{ duration: current.duration, ease: 'easeInOut' }}
        >
          <span className="text-xl sm:text-2xl font-black text-white tracking-tighter">
            {secondsLeft}s
          </span>
          <span className="text-[0.625rem] font-bold uppercase tracking-wider text-white/80">
            {phase}
          </span>
        </motion.div>
      </div>

      <div className="text-center mt-4">
        <span className="text-sm sm:text-base font-bold text-[var(--color-text-primary)] block">
          {current.label}
        </span>
        <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
          {current.sub}
        </span>
      </div>
    </div>
  );
}
