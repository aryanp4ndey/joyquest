'use client';

/**
 * JoyQuest Procedural Web Audio API Sound Engine
 * Zero external audio files. Pure procedural harmonic synthesis.
 * Built with Apple / Teenage Engineering precision.
 */

let audioCtx = null;
let currentDrone = null;

export function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * 1. Tactile Click (playHapticTap)
 * Single short sine burst (800 Hz down to 220 Hz over 28ms, exponential decay gain).
 */
export function playHapticTap(soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.028);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch (e) {
    // Audio context may be restricted by browser policy before user interaction
  }
}

/**
 * 2. Tibetan Singing Bowl Bell (playBowlTone)
 * Fundamental frequency sine wave with harmonic overtones at f * 2.76 and f * 5.4.
 * Gain decay over 4.5 seconds with a gentle LFO tremolo (frequency: 4 Hz, depth: 0.08).
 */
export function playBowlTone(freq = 432, soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const duration = 4.5;

    // Master bowl bus
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.22, now + 0.04);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // LFO Tremolo (4 Hz, depth: 0.08)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(4, now);
    lfoGain.gain.setValueAtTime(0.08, now);
    lfo.connect(lfoGain.gain);
    lfo.start(now);
    lfo.stop(now + duration);

    // Fundamental + Overtones
    const harmonics = [
      { freq: freq, gainVal: 0.6, type: 'sine' },
      { freq: freq * 2.76, gainVal: 0.25, type: 'sine' },
      { freq: freq * 5.4, gainVal: 0.12, type: 'sine' },
    ];

    harmonics.forEach(({ freq: f, gainVal, type }) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(f, now);
      g.gain.setValueAtTime(gainVal, now);
      osc.connect(g);
      g.connect(masterGain);
      osc.start(now);
      osc.stop(now + duration);
    });

    masterGain.connect(ctx.destination);
  } catch (e) {}
}

/**
 * 3. Completion Fanfare (playSuccessFanfare)
 * Three-tone arpeggio in the mood's pentatonic scale (C5 -> E5 -> G5 -> C6) with soft low-pass filtering.
 */
export function playSuccessFanfare(soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, now);
    filter.connect(ctx.destination);

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = now + i * 0.09;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.42);

      osc.connect(gain);
      gain.connect(filter);

      osc.start(startTime);
      osc.stop(startTime + 0.45);
    });
  } catch (e) {}
}

/**
 * 4. Binaural Ambient Drone (startMoodDrone / stopMoodDrone)
 * Dual oscillator setup routed to stereo panner: left ear f, right ear f + 4.5 Hz (4.5 Hz theta wave).
 */
const MOOD_DRONE_FREQS = {
  happy: 528,      // Transformation & miracles
  calm: 432,       // Natural harmonic serenity
  energetic: 639,  // Connecting relationships & vitality
  reflective: 741, // Intuition & awakening
  stressed: 396,   // Liberating guilt & fear
  grateful: 852,   // Pure spiritual order
  creative: 963,   // Higher consciousness & insight
  lonely: 417,     // Facilitating change & connection
};

export function startMoodDrone(moodId = 'calm', soundEnabled = true) {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopMoodDrone();

    const rawFreq = MOOD_DRONE_FREQS[moodId] || 432;
    // Lower frequency to a gentle grounding octave (between 100Hz - 220Hz)
    let f = rawFreq;
    while (f > 220) f /= 2;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(0.025, now + 1.2); // Gentle, subtle background cushion

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(320, now);
    master.connect(lowpass);
    lowpass.connect(ctx.destination);

    // Left ear (f)
    const oscL = ctx.createOscillator();
    const pannerL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(f, now);
    if (pannerL) {
      pannerL.pan.setValueAtTime(-0.85, now);
      oscL.connect(pannerL);
      pannerL.connect(master);
    } else {
      oscL.connect(master);
    }
    oscL.start(now);

    // Right ear (f + 4.5Hz theta beat)
    const oscR = ctx.createOscillator();
    const pannerR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(f + 4.5, now);
    if (pannerR) {
      pannerR.pan.setValueAtTime(0.85, now);
      oscR.connect(pannerR);
      pannerR.connect(master);
    } else {
      oscR.connect(master);
    }
    oscR.start(now);

    currentDrone = { master, oscL, oscR, ctx };
  } catch (e) {}
}

export function stopMoodDrone() {
  if (!currentDrone) return;
  try {
    const { master, oscL, oscR, ctx } = currentDrone;
    const now = ctx.currentTime;
    master.gain.linearRampToValueAtTime(0.0001, now + 0.6);
    setTimeout(() => {
      try {
        oscL.stop();
        oscR.stop();
      } catch (e) {}
    }, 650);
  } catch (e) {}
  currentDrone = null;
}

// Aliases for seamless component compatibility
export const playClickSound = playHapticTap;
export const playStepSound = (enabled) => playBowlTone(528, enabled);
export const playCompleteSound = playSuccessFanfare;
