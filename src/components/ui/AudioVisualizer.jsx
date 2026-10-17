'use client';

import { motion } from 'framer-motion';

/**
 * AudioVisualizer — Inspired by ReactBits audio components.
 * Renders dynamic, glowing equalizer frequency bars that react to playing state.
 */
export default function AudioVisualizer({
  isPlaying = false,
  barCount = 5,
  color = 'from-violet-500 to-pink-500',
  className = '',
}) {
  const bars = Array.from({ length: barCount }, (_, i) => i);

  return (
    <div
      className={`flex items-center justify-center gap-1 h-6 px-2 py-1 rounded-full bg-black/20 dark:bg-white/10 backdrop-blur-md border border-white/10 ${className}`}
      title={isPlaying ? 'Audio Playing' : 'Voice Paused'}
    >
      {bars.map((bar) => {
        // Different random-looking peak heights for organic feel
        const heights = isPlaying
          ? [
              '6px',
              `${14 + (bar % 3) * 6}px`,
              `${8 + (bar % 4) * 4}px`,
              `${20 - (bar % 2) * 8}px`,
              '6px',
            ]
          : ['4px', '4px', '4px', '4px', '4px'];

        return (
          <motion.span
            key={bar}
            className={`w-[3px] rounded-full bg-gradient-to-t ${color} transition-all duration-300`}
            animate={
              isPlaying
                ? {
                    height: heights,
                  }
                : { height: '4px' }
            }
            transition={
              isPlaying
                ? {
                    duration: 0.8 + (bar * 0.15) % 0.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    repeatType: 'mirror',
                    delay: bar * 0.1,
                  }
                : { duration: 0.3 }
            }
          />
        );
      })}
    </div>
  );
}
