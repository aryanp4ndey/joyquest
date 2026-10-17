/**
 * JoyQuest Adaptive Rem-Grid Scaler
 * Mirrors the Lumora / Arc proportional layout system.
 * Handles display scaling smoothly for ultra-wide (>1920px) screens.
 */

export function applyAdaptiveGrid() {
  if (typeof window === 'undefined') return;
  const FONT_BASE = 16;
  const BASE_WIDTH = 1920;
  const COEF = 0.6666;
  const w = window.innerWidth;

  if (w > BASE_WIDTH) {
    const widthExcess = ((w - BASE_WIDTH) / BASE_WIDTH) * 100;
    const size = FONT_BASE + (FONT_BASE * (widthExcess * COEF)) / 100;
    document.documentElement.style.fontSize = `${size}px`;
  } else {
    document.documentElement.style.removeProperty('font-size');
  }
}

/**
 * Scroll Lock Controller
 * Controls Lenis and native viewport scroll locking for modals & overlays.
 */
let scrollLocked = false;

export function stopScroll() {
  if (typeof window === 'undefined') return;
  scrollLocked = true;
  document.documentElement.style.position = 'relative';
  document.documentElement.style.overflow = 'hidden';
  document.documentElement.style.height = '100%';
  if (window.__lenis) {
    try {
      window.__lenis.stop();
    } catch (e) {}
  }
}

export function startScroll() {
  if (typeof window === 'undefined') return;
  scrollLocked = false;
  document.documentElement.style.removeProperty('position');
  document.documentElement.style.removeProperty('overflow');
  document.documentElement.style.removeProperty('height');
  if (window.__lenis) {
    try {
      window.__lenis.start();
    } catch (e) {}
  }
}
