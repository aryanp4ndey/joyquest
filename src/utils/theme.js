/**
 * JoyQuest Dynamic Mood Themes
 * Production-ready Palette Matrix matching the Master Engineering Specification.
 * Embodying Apple, Arc, and Teenage Engineering precision.
 */

export const MOOD_THEMES = {
  happy: {
    id: 'happy',
    name: 'Happy',
    accent: '#ff70b8',
    accentSecondary: '#ffa5d4',
    tagline: 'Radiant & Joyful',
    solfeggio: 528,
    solfeggioMeaning: 'Transformation & Clarity',
    // Living Ambient Aurora Lights
    orb1: 'rgba(255, 112, 184, 0.28)',
    orb2: 'rgba(255, 182, 193, 0.22)',
    orb3: 'rgba(254, 215, 170, 0.18)',
    // Dark mode palette
    dark: {
      canvas: '#0f0913',
      card: 'rgba(28, 17, 30, 0.72)',
      cardHover: 'rgba(38, 24, 42, 0.88)',
      border: 'rgba(255, 112, 184, 0.18)',
      borderStrong: 'rgba(255, 112, 184, 0.36)',
      glow: 'rgba(255, 112, 184, 0.25)',
      textPrimary: '#fff0f6',
      textSecondary: '#fbcfe8',
      navBg: 'rgba(24, 15, 26, 0.82)',
      btnPrimaryBg: '#ff70b8',
      btnPrimaryText: '#180812',
    },
    // Light mode palette
    light: {
      canvas: '#fff5f9',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(255, 112, 184, 0.18)',
      borderStrong: 'rgba(255, 112, 184, 0.35)',
      glow: 'rgba(255, 112, 184, 0.12)',
      textPrimary: '#4a0e2e',
      textSecondary: '#831843',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#ff70b8',
      btnPrimaryText: '#180812',
    },
  },

  calm: {
    id: 'calm',
    name: 'Calm',
    accent: '#10e5aa',
    accentSecondary: '#5eead4',
    tagline: 'Serene & Peaceful',
    solfeggio: 432,
    solfeggioMeaning: 'Natural Harmonic Serenity',
    orb1: 'rgba(16, 229, 170, 0.26)',
    orb2: 'rgba(6, 182, 212, 0.22)',
    orb3: 'rgba(52, 211, 153, 0.16)',
    dark: {
      canvas: '#06120e',
      card: 'rgba(13, 30, 24, 0.72)',
      cardHover: 'rgba(20, 44, 35, 0.88)',
      border: 'rgba(16, 229, 170, 0.18)',
      borderStrong: 'rgba(16, 229, 170, 0.36)',
      glow: 'rgba(16, 229, 170, 0.25)',
      textPrimary: '#f0fdf4',
      textSecondary: '#a7f3d0',
      navBg: 'rgba(10, 24, 19, 0.82)',
      btnPrimaryBg: '#10e5aa',
      btnPrimaryText: '#042118',
    },
    light: {
      canvas: '#f2fcf8',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(16, 229, 170, 0.18)',
      borderStrong: 'rgba(16, 229, 170, 0.35)',
      glow: 'rgba(16, 229, 170, 0.12)',
      textPrimary: '#064e3b',
      textSecondary: '#047857',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#10e5aa',
      btnPrimaryText: '#042118',
    },
  },

  energetic: {
    id: 'energetic',
    name: 'Energetic',
    accent: '#ff9f43',
    accentSecondary: '#fbbf24',
    tagline: 'Dynamic & Driven',
    solfeggio: 639,
    solfeggioMeaning: 'Vitality & Connection',
    orb1: 'rgba(255, 159, 67, 0.28)',
    orb2: 'rgba(245, 158, 11, 0.22)',
    orb3: 'rgba(251, 191, 36, 0.16)',
    dark: {
      canvas: '#140d06',
      card: 'rgba(32, 20, 10, 0.72)',
      cardHover: 'rgba(46, 28, 14, 0.88)',
      border: 'rgba(255, 159, 67, 0.18)',
      borderStrong: 'rgba(255, 159, 67, 0.36)',
      glow: 'rgba(255, 159, 67, 0.25)',
      textPrimary: '#fff7ed',
      textSecondary: '#fed7aa',
      navBg: 'rgba(26, 16, 8, 0.82)',
      btnPrimaryBg: '#ff9f43',
      btnPrimaryText: '#260d00',
    },
    light: {
      canvas: '#fff8f0',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(255, 159, 67, 0.18)',
      borderStrong: 'rgba(255, 159, 67, 0.35)',
      glow: 'rgba(255, 159, 67, 0.12)',
      textPrimary: '#431407',
      textSecondary: '#9a3412',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#ff9f43',
      btnPrimaryText: '#260d00',
    },
  },

  reflective: {
    id: 'reflective',
    name: 'Reflective',
    accent: '#a78bfa',
    accentSecondary: '#c084fc',
    tagline: 'Deep & Introspective',
    solfeggio: 741,
    solfeggioMeaning: 'Intuition & Awakening',
    orb1: 'rgba(167, 139, 250, 0.28)',
    orb2: 'rgba(192, 132, 252, 0.22)',
    orb3: 'rgba(129, 140, 248, 0.16)',
    dark: {
      canvas: '#0c0a17',
      card: 'rgba(22, 18, 36, 0.72)',
      cardHover: 'rgba(32, 26, 52, 0.88)',
      border: 'rgba(167, 139, 250, 0.18)',
      borderStrong: 'rgba(167, 139, 250, 0.36)',
      glow: 'rgba(167, 139, 250, 0.25)',
      textPrimary: '#f5f3ff',
      textSecondary: '#ddd6fe',
      navBg: 'rgba(18, 14, 30, 0.82)',
      btnPrimaryBg: '#a78bfa',
      btnPrimaryText: '#100826',
    },
    light: {
      canvas: '#f7f5ff',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(167, 139, 250, 0.18)',
      borderStrong: 'rgba(167, 139, 250, 0.35)',
      glow: 'rgba(167, 139, 250, 0.12)',
      textPrimary: '#2e1065',
      textSecondary: '#5b21b6',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#a78bfa',
      btnPrimaryText: '#100826',
    },
  },

  stressed: {
    id: 'stressed',
    name: 'Stressed',
    accent: '#38bdf8',
    accentSecondary: '#818cf8',
    tagline: 'Grounded & Soothing',
    solfeggio: 396,
    solfeggioMeaning: 'Release Fear & Tension',
    orb1: 'rgba(56, 189, 248, 0.26)',
    orb2: 'rgba(129, 140, 248, 0.20)',
    orb3: 'rgba(59, 130, 246, 0.16)',
    dark: {
      canvas: '#061017',
      card: 'rgba(12, 26, 38, 0.72)',
      cardHover: 'rgba(18, 38, 56, 0.88)',
      border: 'rgba(56, 189, 248, 0.18)',
      borderStrong: 'rgba(56, 189, 248, 0.36)',
      glow: 'rgba(56, 189, 248, 0.25)',
      textPrimary: '#f0f9ff',
      textSecondary: '#bae6fd',
      navBg: 'rgba(9, 21, 30, 0.82)',
      btnPrimaryBg: '#38bdf8',
      btnPrimaryText: '#021826',
    },
    light: {
      canvas: '#f0f9ff',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(56, 189, 248, 0.18)',
      borderStrong: 'rgba(56, 189, 248, 0.35)',
      glow: 'rgba(56, 189, 248, 0.12)',
      textPrimary: '#082f49',
      textSecondary: '#0284c7',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#38bdf8',
      btnPrimaryText: '#021826',
    },
  },

  grateful: {
    id: 'grateful',
    name: 'Grateful',
    accent: '#fbbf24',
    accentSecondary: '#f59e0b',
    tagline: 'Warm & Abundant',
    solfeggio: 852,
    solfeggioMeaning: 'Spiritual Order & Radiance',
    orb1: 'rgba(251, 191, 36, 0.28)',
    orb2: 'rgba(245, 158, 11, 0.22)',
    orb3: 'rgba(253, 230, 138, 0.16)',
    dark: {
      canvas: '#130f06',
      card: 'rgba(31, 24, 11, 0.72)',
      cardHover: 'rgba(44, 34, 16, 0.88)',
      border: 'rgba(251, 191, 36, 0.18)',
      borderStrong: 'rgba(251, 191, 36, 0.36)',
      glow: 'rgba(251, 191, 36, 0.25)',
      textPrimary: '#fffbeb',
      textSecondary: '#fde68a',
      navBg: 'rgba(24, 19, 9, 0.82)',
      btnPrimaryBg: '#fbbf24',
      btnPrimaryText: '#261a02',
    },
    light: {
      canvas: '#fffdf0',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(251, 191, 36, 0.18)',
      borderStrong: 'rgba(251, 191, 36, 0.35)',
      glow: 'rgba(251, 191, 36, 0.12)',
      textPrimary: '#451a03',
      textSecondary: '#b45309',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#fbbf24',
      btnPrimaryText: '#261a02',
    },
  },

  creative: {
    id: 'creative',
    name: 'Creative',
    accent: '#c084fc',
    accentSecondary: '#ec4899',
    tagline: 'Expressive & Inspired',
    solfeggio: 963,
    solfeggioMeaning: 'Awakening & Pure Creation',
    orb1: 'rgba(192, 132, 252, 0.28)',
    orb2: 'rgba(236, 72, 153, 0.22)',
    orb3: 'rgba(168, 85, 247, 0.18)',
    dark: {
      canvas: '#110818',
      card: 'rgba(27, 14, 38, 0.72)',
      cardHover: 'rgba(38, 20, 54, 0.88)',
      border: 'rgba(192, 132, 252, 0.18)',
      borderStrong: 'rgba(192, 132, 252, 0.36)',
      glow: 'rgba(192, 132, 252, 0.25)',
      textPrimary: '#faf5ff',
      textSecondary: '#f3e8ff',
      navBg: 'rgba(22, 11, 31, 0.82)',
      btnPrimaryBg: '#c084fc',
      btnPrimaryText: '#1a0426',
    },
    light: {
      canvas: '#faf5ff',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(192, 132, 252, 0.18)',
      borderStrong: 'rgba(192, 132, 252, 0.35)',
      glow: 'rgba(192, 132, 252, 0.12)',
      textPrimary: '#3b0764',
      textSecondary: '#7e22ce',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#c084fc',
      btnPrimaryText: '#1a0426',
    },
  },

  lonely: {
    id: 'lonely',
    name: 'Lonely',
    accent: '#60a5fa',
    accentSecondary: '#818cf8',
    tagline: 'Gentle & Welcoming',
    solfeggio: 417,
    solfeggioMeaning: 'Facilitating Connection',
    orb1: 'rgba(96, 165, 250, 0.26)',
    orb2: 'rgba(129, 140, 248, 0.20)',
    orb3: 'rgba(56, 189, 248, 0.16)',
    dark: {
      canvas: '#070c18',
      card: 'rgba(14, 21, 38, 0.72)',
      cardHover: 'rgba(20, 30, 54, 0.88)',
      border: 'rgba(96, 165, 250, 0.18)',
      borderStrong: 'rgba(96, 165, 250, 0.36)',
      glow: 'rgba(96, 165, 250, 0.25)',
      textPrimary: '#eff6ff',
      textSecondary: '#bfdbfe',
      navBg: 'rgba(11, 16, 30, 0.82)',
      btnPrimaryBg: '#60a5fa',
      btnPrimaryText: '#08172d',
    },
    light: {
      canvas: '#f4f8ff',
      card: 'rgba(255, 255, 255, 0.90)',
      cardHover: 'rgba(255, 255, 255, 0.98)',
      border: 'rgba(96, 165, 250, 0.18)',
      borderStrong: 'rgba(96, 165, 250, 0.35)',
      glow: 'rgba(96, 165, 250, 0.12)',
      textPrimary: '#1e3a5f',
      textSecondary: '#2563eb',
      navBg: 'rgba(255, 255, 255, 0.85)',
      btnPrimaryBg: '#60a5fa',
      btnPrimaryText: '#08172d',
    },
  },
};

/**
 * Apply the mood theme variables to document root
 */
export function applyMoodTheme(moodId = 'happy', isLight = false) {
  if (typeof document === 'undefined') return;
  const mood = MOOD_THEMES[moodId] || MOOD_THEMES.happy;
  const palette = isLight ? mood.light : mood.dark;
  const root = document.documentElement;

  root.style.setProperty('--mood-canvas-bg', palette.canvas);
  root.style.setProperty('--mood-orb-1', mood.orb1);
  root.style.setProperty('--mood-orb-2', mood.orb2);
  root.style.setProperty('--mood-orb-3', mood.orb3);

  root.style.setProperty('--mood-accent', mood.accent);
  root.style.setProperty('--mood-accent-secondary', mood.accentSecondary);

  root.style.setProperty('--mood-card-bg', palette.card);
  root.style.setProperty('--mood-card-hover', palette.cardHover);
  root.style.setProperty('--mood-card-border', palette.border);
  root.style.setProperty('--mood-card-border-strong', palette.borderStrong);
  root.style.setProperty('--mood-glow', palette.glow);

  root.style.setProperty('--mood-text-primary', palette.textPrimary);
  root.style.setProperty('--mood-text-secondary', palette.textSecondary);

  root.style.setProperty('--mood-nav-bg', palette.navBg);
  root.style.setProperty('--mood-btn-bg', palette.btnPrimaryBg);
  root.style.setProperty('--mood-btn-text', palette.btnPrimaryText);

  root.setAttribute('data-mood', mood.id);
  root.setAttribute('data-theme', isLight ? 'light' : 'dark');
}
