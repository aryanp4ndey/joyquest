'use client';

import { motion } from 'framer-motion';

/**
 * ShimmerButton — Inspired by Aceternity UI & MagicUI.
 * Features an animated glowing gradient border beam that sweeps continuously,
 * creating an iconic, state-of-the-art CTA button.
 */
export default function ShimmerButton({
  children,
  onClick,
  disabled = false,
  className = '',
  shimmerColor = '#ffffff',
  shimmerSize = '0.08em',
  shimmerDuration = '2.5s',
  background = 'var(--btn-primary-bg)',
  textColor = 'var(--btn-primary-text)',
  style = {},
  id,
  type = 'button',
  ...props
}) {
  return (
    <motion.button
      type={type}
      id={id}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      className={`group relative isolate flex items-center justify-center overflow-hidden rounded-2xl p-[1px] font-bold text-sm transition-all duration-300 cursor-pointer select-none ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      style={style}
      {...props}
    >
      {/* Rotating Conic Shimmer Beam */}
      <span
        className="absolute inset-[-100%] animate-[shimmer-spin_3s_linear_infinite]"
        style={{
          background: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, transparent 80deg, ${shimmerColor} 180deg, transparent 280deg, transparent 360deg)`,
        }}
      />

      {/* Button Interior */}
      <span
        className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 transition-colors duration-200"
        style={{
          backgroundColor: background,
          color: textColor,
        }}
      >
        {children}
      </span>
    </motion.button>
  );
}
