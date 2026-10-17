'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Key,
  Volume2,
  VolumeX,
  Trash2,
  ExternalLink,
  Shield,
  Settings,
  Eye,
  EyeOff,
  Check,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playCompleteSound, playClickSound } from '../utils/audio';
import SpotlightCard from './ui/SpotlightCard';
import ShimmerButton from './ui/ShimmerButton';

export default function SettingsTab() {
  const { state, actions } = useApp();
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState(state.apiKey);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setTempKey(state.apiKey);
  }, [state.apiKey]);

  const handleSaveKey = () => {
    playClickSound(state.soundEnabled);
    actions.setApiKey(tempKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleToggleSound = () => {
    const nextState = !state.soundEnabled;
    actions.toggleSound();
    if (nextState) {
      playCompleteSound(true);
    }
  };

  const handleSelectTheme = (theme) => {
    playClickSound(state.soundEnabled);
    actions.setTheme(theme);
  };

  const handleClearData = () => {
    if (window.confirm('Reset all progress, botanical specimens, and local logs?')) {
      localStorage.removeItem('joyquest-state');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="apple-pill mb-3"
          whileHover={{ scale: 1.04 }}
        >
          <Settings size={13} className="text-[var(--color-text-muted)]" />
          <span>System Settings</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-2">
          Preferences &amp; Data
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
          Tailor intelligence models, color aesthetics, sound chimes, and privacy.
        </p>
      </div>

      <div className="space-y-4">
        {/* Section 0: Appearance / Theme */}
        <SpotlightCard
          spotlightColor="rgba(168, 85, 247, 0.2)"
          className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center text-violet-400 shrink-0 shadow-sm">
              {state.theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
            </div>
            <div>
              <span className="text-sm font-bold text-[var(--color-text-primary)] block">
                Interface Appearance
              </span>
              <span className="text-xs text-[var(--color-text-muted)] block mt-0.5">
                Select your preferred Apple &amp; Arc visual theme
              </span>
            </div>
          </div>

          <div className="inline-flex items-center p-1 rounded-xl bg-[var(--color-surface-panel)] border border-[var(--color-surface-border)] shrink-0">
            <button
              onClick={() => handleSelectTheme('light')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                state.theme === 'light'
                  ? 'bg-white text-zinc-950 shadow-sm border border-black/5'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
              id="theme-btn-light"
            >
              <Sun size={13} className="text-amber-500" />
              <span>Light Mode</span>
            </button>
            <button
              onClick={() => handleSelectTheme('dark')}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                state.theme === 'dark'
                  ? 'bg-zinc-800 text-white shadow-sm border border-white/10'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`}
              id="theme-btn-dark"
            >
              <Moon size={13} className="text-violet-400" />
              <span>Dark Mode</span>
            </button>
          </div>
        </SpotlightCard>

        {/* Section 1: AI Integration */}
        <SpotlightCard
          spotlightColor="rgba(139, 92, 246, 0.25)"
          className="p-5 sm:p-6 border-violet-500/20 bg-gradient-to-b from-violet-500/5 to-transparent shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-sm">
                <Key size={15} />
              </div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">OpenRouter AI Intelligence</h3>
            </div>
            <span className="apple-pill text-[0.6875rem] font-bold text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
              {state.apiKey ? 'Custom Key Set' : 'Active (Server Key Connected)'}
            </span>
          </div>

          <p className="text-xs text-[var(--color-text-muted)] mb-3 leading-relaxed">
            JoyQuest uses OpenRouter to synthesize unique, real-time mindful quests on the fly. Your server key is connected by default, or you can paste a custom key below to override.
          </p>

          <div className="relative mb-3">
            <input
              type={showKey ? 'text' : 'password'}
              value={tempKey}
              onChange={(e) => setTempKey(e.target.value)}
              placeholder="Paste OpenRouter API key (sk-or-v1-...)"
              className="apple-input text-xs pr-10 font-mono"
              id="api-key-input"
            />
            <button
              type="button"
              onClick={() => setShowKey(!showKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
            >
              {showKey ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <ShimmerButton
              onClick={handleSaveKey}
              shimmerColor="#a855f7"
              background="linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)"
              textColor="#ffffff"
              className="text-xs py-2 px-5 shadow-[0_2px_14px_rgba(139,92,246,0.3)]"
              id="save-api-key-btn"
            >
              {saved ? (
                <>
                  <Check size={14} strokeWidth={2.5} className="text-emerald-300" />
                  <span>Key Saved!</span>
                </>
              ) : (
                <span>Save Custom Key</span>
              )}
            </ShimmerButton>

            <a
              href="https://openrouter.ai/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[0.6875rem] text-violet-400 hover:underline font-semibold"
            >
              <span>Manage on OpenRouter</span>
              <ExternalLink size={11} />
            </a>
          </div>
        </SpotlightCard>

        {/* Section 2: Audio Preferences */}
        <SpotlightCard
          spotlightColor="rgba(6, 182, 212, 0.2)"
          className="p-5 flex items-center justify-between shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-colors shadow-sm ${
                state.soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-[var(--color-surface-panel)] text-[var(--color-text-muted)] border border-[var(--color-surface-border)]'
              }`}
            >
              {state.soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </div>
            <div>
              <span className="text-sm font-bold text-[var(--color-text-primary)] block">
                Auditory Cues &amp; Harmony Chimes
              </span>
              <span className="text-[0.6875rem] text-[var(--color-text-muted)] block">
                Harmonious synthesized chimes on action completions
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleSound}
            className={`w-12 h-6 rounded-full p-0.5 transition-colors duration-200 border relative cursor-pointer ${
              state.soundEnabled ? 'bg-cyan-500 border-cyan-400' : 'bg-zinc-700/40 border-zinc-600/40'
            }`}
            id="sound-toggle"
            aria-label="Toggle sound"
          >
            <div
              className={`w-5 h-5 rounded-full transition-transform duration-200 bg-white shadow-sm ${
                state.soundEnabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </SpotlightCard>

        {/* Section 3: Responsible AI & Privacy */}
        <SpotlightCard
          spotlightColor="rgba(16, 185, 129, 0.2)"
          className="p-5 border-emerald-500/20 bg-emerald-500/5 shadow-sm"
        >
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-9 h-9 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
              <Shield size={16} />
            </div>
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Privacy &amp; Ethics Commitment</h3>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            JoyQuest operates strictly locally. Your quests, moods, progress, and community drafts reside exclusively on your device. Prompts are safe micro-activities and never replace medical guidance.
          </p>
        </SpotlightCard>

        {/* Section 4: Data Management */}
        <SpotlightCard
          spotlightColor="rgba(244, 63, 94, 0.18)"
          className="p-5 flex items-center justify-between shadow-sm"
        >
          <div>
            <span className="text-sm font-bold text-[var(--color-text-primary)] block">
              Clear Local Storage
            </span>
            <span className="text-[0.6875rem] text-[var(--color-text-muted)] block">
              Erase all unlocked specimens, XP, and streak history
            </span>
          </div>
          <button
            onClick={handleClearData}
            className="apple-pill hover:bg-rose-500/25 hover:text-rose-400 hover:border-rose-500/40 text-rose-500 border-rose-500/25 text-xs py-2 px-3.5 cursor-pointer font-bold"
            id="clear-data-btn"
          >
            <Trash2 size={13} />
            <span>Reset Data</span>
          </button>
        </SpotlightCard>
      </div>
    </div>
  );
}
