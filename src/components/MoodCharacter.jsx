'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playClickSound } from '../utils/audio';

/**
 * Handcrafted SVG Mood Characters inspired by the whimsical, friendly
 * wellbeing illustration style in the design reference.
 * Enhanced with cursor tracking, tactile click bounce physics, and interactive voice notes.
 */

const MOOD_MESSAGES = {
  happy: ['Radiating sunshine! ☀️', 'Feeling delightful today! ✨', 'Spreading warmth to others 💛'],
  calm: ['Inhale peace, exhale noise 🍃', 'Present in this gentle moment 🌊', 'Still waters run deep 🌿'],
  energetic: ['Sparked and ready to roll! ⚡', 'Bursting with playful momentum 🚀', 'Let’s make magic today! 🔥'],
  reflective: ['Quiet wonder taking root 🔮', 'Exploring inner wisdom 🌙', 'A peaceful pause to ponder 💭'],
  stressed: ['Deep breaths, you’ve got this 🌸', 'Gentle pauses heal the mind 🍵', 'One mindful breath at a time 🤍'],
  grateful: ['My heart is full and thankful 💖', 'Treasuring tiny everyday miracles ✨', 'Thank you for this day 🌷'],
  creative: ['A spark of wonder is blooming! 💡', 'Imagination knows no boundaries 🎨', 'Creating from the heart 🌈'],
  lonely: ['You are deeply seen and valued 🌿', 'Connected by invisible starlight 💫', 'Sending a warm embrace 🫂'],
};

export function MoodCharacter({ moodId, size = 200, soundEnabled = true, className = '' }) {
  const mood = MOOD_CHARACTER_DATA[moodId] || MOOD_CHARACTER_DATA.happy;
  const containerRef = useRef(null);

  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isBouncing, setIsBouncing] = useState(false);
  const [messageIdx, setMessageIdx] = useState(0);
  const [showMessage, setShowMessage] = useState(false);

  // Mathematical cursor eye tracking with 0.12 damping factor per frame
  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId;

    const handlePointerMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const dist = Math.min(Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 30, 7); // max 7px offset
      targetX = Math.cos(angle) * dist;
      targetY = Math.sin(angle) * dist;
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setEyeOffset({ x: currentX, y: currentY });
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Tap / Click interaction: scale(0.92) -> scale(1.08) -> scale(1.0)
  const handleFaceClick = () => {
    playClickSound(soundEnabled);
    setIsBouncing(true);
    setShowMessage(true);
    setMessageIdx((prev) => (prev + 1) % (MOOD_MESSAGES[moodId]?.length || 3));

    setTimeout(() => {
      setIsBouncing(false);
    }, 450);

    setTimeout(() => {
      setShowMessage(false);
    }, 2800);
  };

  const currentMessage = MOOD_MESSAGES[moodId]?.[messageIdx] || 'Mindful & present ✨';

  return (
    <div
      ref={containerRef}
      onClick={handleFaceClick}
      className={`relative flex items-center justify-center rounded-[2rem] p-4 sm:p-6 transition-colors duration-500 overflow-hidden cursor-pointer select-none group ${className}`}
      style={{
        backgroundColor: mood.cardBg,
        minHeight: '190px',
      }}
      title="Click me for a friendly reaction!"
    >
      {/* Background subtle decorative doodles */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-25 transition-opacity duration-300 group-hover:opacity-35"
        viewBox="0 0 400 300"
      >
        <circle cx="40" cy="50" r="18" fill={mood.circleColor} />
        <circle cx="360" cy="240" r="26" fill={mood.circleColor} />
        <path
          d="M 20 220 Q 35 200 50 220 T 80 220"
          fill="none"
          stroke="#111218"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 330 60 Q 345 40 360 60 T 390 60"
          fill="none"
          stroke="#111218"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>

      {/* Floating Interactive Speech Bubble */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ type: 'spring', damping: 20, stiffness: 350 }}
            className="absolute top-4 z-20 px-3.5 py-1.5 rounded-full bg-white text-zinc-950 text-xs font-bold shadow-[0_6px_20px_rgba(0,0,0,0.18)] border border-black/5 pointer-events-none"
          >
            {currentMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Character SVG with Bouncy Physics */}
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="relative z-10"
        initial={{ scale: 0.85, opacity: 0 }}
        animate={
          isBouncing
            ? {
                scale: [1, 1.14, 0.92, 1.05, 1],
                rotate: [0, -4, 4, -2, 0],
                opacity: 1,
              }
            : {
                scale: 1,
                rotate: 0,
                opacity: 1,
              }
        }
        transition={
          isBouncing
            ? { duration: 0.55, ease: 'easeOut' }
            : { type: 'spring', damping: 18, stiffness: 220 }
        }
      >
        {/* Main Colored Circular Head */}
        <motion.circle
          cx="100"
          cy="110"
          r="68"
          fill={mood.circleColor}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Dynamic Facial Features by Mood with Eye Offset */}
        {renderFaceFeatures(moodId, eyeOffset)}
      </motion.svg>

      {/* Interactive Micro-hint at bottom */}
      <div className="absolute bottom-3 text-[0.6875rem] font-bold text-zinc-800/60 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        Tap to interact &bull; Eyes follow cursor
      </div>
    </div>
  );
}

function renderFaceFeatures(moodId, eyeOffset = { x: 0, y: 0 }) {
  const stroke = '#111218';
  const strokeWidth = 3.8;

  switch (moodId) {
    case 'happy':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Whimsical hair loop on head */}
          <motion.path
            d="M 100 42 C 90 26, 120 18, 104 36 C 96 46, 102 46, 100 44"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '100px 42px' }}
          />

          {/* Happy Eyes with smooth tracking */}
          <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
            <circle cx="82" cy="102" r="3.6" fill={stroke} stroke="none" />
            <circle cx="118" cy="102" r="3.6" fill={stroke} stroke="none" />
          </g>

          {/* Cute Nose */}
          <path d="M 99 108 Q 103 115 98 118" />

          {/* Big Joyful Smile */}
          <path d="M 76 122 Q 100 146 124 122" />
          <path d="M 73 120 Q 75 124 78 122" />
          <path d="M 127 120 Q 125 124 122 122" />
        </g>
      );

    case 'calm':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Whimsical curved hair strands */}
          <motion.path
            d="M 85 45 C 92 32, 115 32, 120 48"
            animate={{ rotate: [0, -3, 3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '100px 45px' }}
          />

          {/* Peaceful crescent eyes that subtly sway */}
          <g transform={`translate(${eyeOffset.x * 0.5}, ${eyeOffset.y * 0.5})`}>
            <path d="M 74 100 Q 84 94 94 100" />
            <path d="M 106 100 Q 116 94 126 100" />
          </g>

          {/* Serene nose */}
          <path d="M 100 102 L 98 118 L 105 118" />

          {/* Gentle resting smile */}
          <path d="M 88 134 Q 100 137 112 134" />
        </g>
      );

    case 'energetic':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Dynamic energetic hair spikes */}
          <motion.path
            d="M 92 44 L 98 24 L 105 40 L 114 26 L 115 45"
            animate={{ scaleY: [1, 1.12, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '100px 45px' }}
          />

          {/* Left Star Eye & Right Winking Eye with offset */}
          <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
            <path d="M 82 96 L 82 108 M 76 102 L 88 102" strokeWidth="3" />
            <circle cx="82" cy="102" r="2.5" fill={stroke} />
            <path d="M 112 103 Q 120 97 126 104" />
          </g>

          {/* Nose */}
          <path d="M 100 108 Q 104 114 100 116" />

          {/* Excited Open Smile */}
          <path d="M 78 122 Q 100 148 122 122 Z" fill="#ffffff" />
          <path d="M 88 134 Q 100 144 112 134" fill="#ff708a" stroke="none" />
        </g>
      );

    case 'reflective':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Whimsical thoughtful curl */}
          <motion.path
            d="M 102 44 C 110 30, 90 22, 100 18 C 112 24, 114 38, 105 45"
            animate={{ rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformOrigin: '100px 45px' }}
          />

          {/* Eyebrows angled in contemplation */}
          <g transform={`translate(${eyeOffset.x * 0.6}, ${eyeOffset.y * 0.6})`}>
            <path d="M 75 92 Q 85 90 94 94" />
            <path d="M 106 94 Q 115 90 125 92" />
            <circle cx="85" cy="102" r="3.6" fill={stroke} stroke="none" />
            <circle cx="115" cy="102" r="3.6" fill={stroke} stroke="none" />
          </g>

          {/* Nose */}
          <path d="M 100 106 Q 104 115 98 118" />

          {/* Thoughtful slight half-smile */}
          <path d="M 88 130 Q 102 132 116 126" />
        </g>
      );

    case 'stressed':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Gentle wavy soothing hair */}
          <motion.path
            d="M 90 44 Q 96 32 104 38 T 116 45"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />

          {/* Concerned, gentle eyebrows & empathetic soft eyes */}
          <g transform={`translate(${eyeOffset.x * 0.8}, ${eyeOffset.y * 0.8})`}>
            <path d="M 75 93 Q 85 96 93 93" />
            <path d="M 107 93 Q 115 96 125 93" />
            <circle cx="83" cy="103" r="3.4" fill={stroke} stroke="none" />
            <circle cx="117" cy="103" r="3.4" fill={stroke} stroke="none" />
          </g>

          {/* Nose */}
          <path d="M 100 108 L 99 117" />

          {/* Soft squiggly mouth needing comfort */}
          <path d="M 84 130 Q 92 126 100 129 T 116 128" />
        </g>
      );

    case 'grateful':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Sweet double halo loop */}
          <motion.path
            d="M 88 44 C 84 28, 116 28, 112 44"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ transformOrigin: '100px 44px' }}
          />

          {/* Warm crescent happy eyes */}
          <g transform={`translate(${eyeOffset.x * 0.6}, ${eyeOffset.y * 0.6})`}>
            <path d="M 75 102 Q 83 94 92 102" />
            <path d="M 108 102 Q 117 94 125 102" />
          </g>

          {/* Heart blush cheeks */}
          <path
            d="M 72 114 C 70 110, 75 108, 77 111 C 79 108, 84 110, 82 114 L 77 119 Z"
            fill="#f43f5e"
            stroke="none"
          />
          <path
            d="M 118 114 C 116 110, 121 108, 123 111 C 125 108, 130 110, 128 114 L 123 119 Z"
            fill="#f43f5e"
            stroke="none"
          />

          {/* Nose */}
          <path d="M 100 108 Q 102 114 99 116" />

          {/* Sweet wide smile */}
          <path d="M 82 126 Q 100 142 118 126" />
        </g>
      );

    case 'creative':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Whimsical antenna / idea spark curl */}
          <motion.path
            d="M 100 44 L 100 24 M 94 20 L 106 20 M 100 14 L 100 24"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ transformOrigin: '100px 44px' }}
          />

          {/* One wide curious eye, one round eye with cursor tracking */}
          <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
            <path d="M 74 88 Q 80 82 88 88" />
            <path d="M 114 92 Q 120 90 126 92" />
            <circle cx="80" cy="100" r="4.5" fill={stroke} stroke="none" />
            <circle cx="120" cy="100" r="3.2" fill={stroke} stroke="none" />
          </g>

          {/* Nose */}
          <path d="M 100 106 Q 107 114 98 118" />

          {/* Playful smirk */}
          <path d="M 84 128 Q 104 136 122 122" />
        </g>
      );

    case 'lonely':
      return (
        <g stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Gentle single curl */}
          <motion.path
            d="M 100 45 C 92 34, 110 32, 102 44"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />

          {/* Warm caring eyes looking towards user */}
          <g transform={`translate(${eyeOffset.x * 0.7}, ${eyeOffset.y * 0.7})`}>
            <circle cx="83" cy="103" r="3.5" fill={stroke} stroke="none" />
            <circle cx="117" cy="103" r="3.5" fill={stroke} stroke="none" />
          </g>

          {/* Nose */}
          <path d="M 100 107 L 98 116" />

          {/* Sweet gentle mouth */}
          <path d="M 88 128 Q 100 134 112 128" />
        </g>
      );

    default:
      return null;
  }
}

export const MOOD_CHARACTER_DATA = {
  happy: {
    id: 'happy',
    label: 'Happy',
    circleColor: '#ff70b8',
    cardBg: '#ffe8f3',
    pillColor: '#ff70b8',
    pillText: '#111218',
  },
  calm: {
    id: 'calm',
    label: 'Calm',
    circleColor: '#10e5aa',
    cardBg: '#dffaf3',
    pillColor: '#10e5aa',
    pillText: '#111218',
  },
  energetic: {
    id: 'energetic',
    label: 'Energetic',
    circleColor: '#ff9233',
    cardBg: '#fff0e5',
    pillColor: '#ff9233',
    pillText: '#111218',
  },
  reflective: {
    id: 'reflective',
    label: 'Reflective',
    circleColor: '#a78bfa',
    cardBg: '#f3e8ff',
    pillColor: '#a78bfa',
    pillText: '#111218',
  },
  stressed: {
    id: 'stressed',
    label: 'Stressed',
    circleColor: '#fb7185',
    cardBg: '#ffe4e6',
    pillColor: '#fb7185',
    pillText: '#111218',
  },
  grateful: {
    id: 'grateful',
    label: 'Grateful',
    circleColor: '#f59e0b',
    cardBg: '#fef3c7',
    pillColor: '#f59e0b',
    pillText: '#111218',
  },
  creative: {
    id: 'creative',
    label: 'Creative',
    circleColor: '#c084fc',
    cardBg: '#fae8ff',
    pillColor: '#c084fc',
    pillText: '#111218',
  },
  lonely: {
    id: 'lonely',
    label: 'Lonely',
    circleColor: '#38bdf8',
    cardBg: '#e0f2fe',
    pillColor: '#38bdf8',
    pillText: '#111218',
  },
};
