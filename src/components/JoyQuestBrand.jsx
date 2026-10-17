'use client';

import { useApp } from '../context/AppContext';

/**
 * JoyQuest Official Brand Assets & Components
 * Uses the authentic Gemini-generated JoyQuest logo with transparent background,
 * responsive sizing, dark/light theme awareness, and micro-interactions.
 */

export function JoyQuestIcon({ size = 32, className = '', glow = false }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src="/icon.png"
        alt="JoyQuest Brand Icon"
        width={size}
        height={size}
        className={`w-full h-full object-contain select-none transition-transform duration-300 ${
          glow ? 'drop-shadow-[0_4px_16px_rgba(255,112,184,0.4)]' : 'drop-shadow-sm'
        }`}
      />
    </div>
  );
}

export function JoyQuestLogo({
  size = 'md',
  variant = 'badge', // 'badge' (icon + theme typography) | 'image' (exact extracted logo PNG)
  showTagline = true,
  className = '',
  onClick,
}) {
  const { state } = useApp();
  const isLight = state?.theme === 'light';

  // Dimension presets
  const sizeMap = {
    xs: { icon: 22, height: 26, text: 'text-xs', tagline: 'text-[0.5625rem]' },
    sm: { icon: 28, height: 32, text: 'text-sm', tagline: 'text-[0.625rem]' },
    md: { icon: 34, height: 40, text: 'text-base sm:text-lg', tagline: 'text-[0.625rem]' },
    lg: { icon: 46, height: 54, text: 'text-xl sm:text-2xl', tagline: 'text-xs' },
    xl: { icon: 60, height: 70, text: 'text-2xl sm:text-3xl', tagline: 'text-sm' },
  };

  const currentSize = typeof size === 'string' ? sizeMap[size] || sizeMap.md : {
    icon: size,
    height: Math.round(size * 1.15),
    text: 'text-base',
    tagline: 'text-[0.625rem]',
  };

  if (variant === 'image') {
    const logoSrc = isLight ? '/logo.png' : '/logo-white.png';
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center select-none ${
          onClick ? 'cursor-pointer group' : ''
        } ${className}`}
      >
        <img
          src={logoSrc}
          alt="JoyQuest"
          style={{ height: currentSize.height, width: 'auto' }}
          className="object-contain transition-transform duration-300 group-hover:scale-102"
        />
      </div>
    );
  }

  // Default 'badge' variant: crisp transparent sprout icon + styled typographic wordmark
  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Official Sprout "J" Icon */}
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        <img
          src="/icon.png"
          alt="JoyQuest"
          width={currentSize.icon}
          height={currentSize.icon}
          className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(255,112,184,0.3)]"
        />
      </div>

      {/* Typography: Wordmark + Tagline */}
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight text-[var(--color-text-primary)] ${currentSize.text}`}
            style={{ fontFamily: 'var(--font-onest), sans-serif' }}
          >
            JoyQuest
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full inline-block animate-ping"
            style={{ backgroundColor: 'var(--mood-accent, #10e5aa)' }}
          />
        </div>
        {showTagline && (
          <span
            className={`text-[var(--color-text-muted)] font-bold tracking-wider uppercase mt-1 ${currentSize.tagline}`}
          >
            Intentional Wellbeing
          </span>
        )}
      </div>
    </div>
  );
}

export default JoyQuestLogo;

