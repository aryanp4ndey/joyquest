'use client';

import { useRef } from 'react';

/**
 * SpotlightCard — Inspired by ReactBits & Aceternity UI.
 * Creates an interactive spotlight effect where a subtle radial glow
 * illuminates both the card surface and the borders as the mouse moves over it.
 * Uses direct DOM style updates to ensure 60fps performance without React re-rendering,
 * guaranteeing clicks and interactions are 100% reliable.
 */
export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.12)',
  tilt = false,
  onClick,
  style = {},
  id,
  role,
  tabIndex,
  ...props
}) {
  const divRef = useRef(null);
  const spotlightRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current || !spotlightRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    spotlightRef.current.style.opacity = '1';
    spotlightRef.current.style.background = `radial-gradient(550px circle at ${x}px ${y}px, ${spotlightColor}, transparent 65%)`;

    if (tilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      div.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseEnter = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0';
    }
    if (divRef.current && tilt) {
      divRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      id={id}
      role={onClick ? (role || 'button') : role}
      tabIndex={onClick ? (tabIndex ?? 0) : tabIndex}
      style={{
        transition: 'transform 0.15s ease-out, box-shadow 0.25s ease',
        ...style,
      }}
      className={`relative rounded-3xl overflow-hidden border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] transition-colors duration-300 ${
        onClick ? 'cursor-pointer select-none' : ''
      } ${className}`}
      {...props}
    >
      {/* Dynamic Cursor Spotlight Overlay */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(550px circle at 50% 50%, ${spotlightColor}, transparent 65%)`,
        }}
      />

      {/* Top subtle inner border glow highlight (Apple/Arc specular shine) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />

      {/* Card Content */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}
