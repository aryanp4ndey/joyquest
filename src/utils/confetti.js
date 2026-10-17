'use client';

import confetti from 'canvas-confetti';

export function triggerQuestConfetti() {
  if (typeof window === 'undefined') return;

  // Multi-phase particle celebration
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#f59e0b', '#ec4899', '#06b6d4', '#10b981', '#8b5cf6', '#f43f5e', '#3b82f6'],
    zIndex: 9999,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    shapes: ['star'],
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

export function triggerMiniSparkle(event) {
  if (typeof window === 'undefined' || !event) return;

  const rect = event.currentTarget?.getBoundingClientRect();
  const x = rect ? (rect.left + rect.width / 2) / window.innerWidth : 0.5;
  const y = rect ? (rect.top + rect.height / 2) / window.innerHeight : 0.5;

  confetti({
    particleCount: 20,
    spread: 45,
    startVelocity: 20,
    origin: { x, y },
    colors: ['#f59e0b', '#10b981', '#ec4899', '#6366f1'],
    ticks: 60,
    zIndex: 9999,
  });
}
