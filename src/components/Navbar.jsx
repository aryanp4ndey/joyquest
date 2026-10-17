'use client';

import {
  Home,
  Sprout,
  User,
  MessageSquare,
  Settings,
  Flame,
  Trophy,
  Volume2,
  VolumeX,
  Sparkles,
  Sun,
  Moon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/audio';
import { JoyQuestLogo } from './JoyQuestBrand';

const NAV_ITEMS = [
  { id: 'quest', label: 'Home', icon: Home, color: '#06b6d4' },
  { id: 'garden', label: 'Sanctuary', icon: Sprout, color: '#10b981' },
  { id: 'community', label: 'Wall', icon: MessageSquare, color: '#ec4899' },
  { id: 'stats', label: 'Profile', icon: User, color: '#8b5cf6' },
];

export default function Navbar() {
  const { state, actions } = useApp();

  const handleTabClick = (id) => {
    playClickSound(state.soundEnabled);
    actions.setTab(id);
  };

  const handleToggleSound = () => {
    actions.toggleSound();
    playClickSound(!state.soundEnabled);
  };

  const handleToggleTheme = () => {
    playClickSound(state.soundEnabled);
    actions.toggleTheme();
  };

  return (
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 sm:pt-4 sm:pb-3">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-[var(--mood-nav-bg,var(--nav-glass-bg))] backdrop-blur-2xl border border-[var(--mood-card-border,var(--nav-glass-border))] shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-colors duration-500">
        {/* Official JoyQuest Logo */}
        <JoyQuestLogo
          size="md"
          onClick={() => handleTabClick('quest')}
          showTagline={true}
        />

        {/* Center: Interactive Segmented Pill Navigation */}
        <div className="hidden md:flex items-center apple-segmented-track relative">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = state.activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`apple-segmented-item relative z-10 ${isActive ? 'active' : ''}`}
                id={`nav-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 rounded-full bg-[var(--segmented-item-active-bg)] border border-[var(--segmented-item-active-border)] -z-10 shadow-sm"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon
                  size={14}
                  strokeWidth={isActive ? 2.2 : 1.75}
                  style={{ color: isActive ? item.color : undefined }}
                />
                <span className={isActive ? 'font-bold' : ''}>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Theme Toggle, Sound Toggle, Metrics & Settings */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={handleToggleTheme}
            className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-border)] transition-colors border border-transparent hover:border-[var(--color-surface-border)] cursor-pointer"
            title={state.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            id="nav-theme-toggle"
            aria-label="Toggle color theme"
          >
            {state.theme === 'light' ? (
              <Moon size={15} className="text-violet-600" />
            ) : (
              <Sun size={15} className="text-amber-400" />
            )}
          </button>

          {/* Audio Quick Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-1.5 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-border)] transition-colors border border-transparent hover:border-[var(--color-surface-border)] cursor-pointer"
            title={state.soundEnabled ? 'Mute sound' : 'Enable audio cues'}
            id="nav-audio-toggle"
            aria-label="Toggle audio cues"
          >
            {state.soundEnabled ? (
              <Volume2 size={15} className="text-cyan-500" />
            ) : (
              <VolumeX size={15} className="text-[var(--color-text-dim)]" />
            )}
          </button>

          {/* Streak Indicator */}
          {state.currentStreak > 0 && (
            <motion.div
              className="apple-pill text-amber-500 border-amber-500/30 bg-amber-500/10 shadow-[0_0_12px_-2px_rgba(245,158,11,0.2)]"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Flame size={13} strokeWidth={2.4} className="text-amber-500 fill-amber-500/20" />
              <span className="font-bold text-xs">{state.currentStreak}d</span>
            </motion.div>
          )}

          {/* Points Pill */}
          <div className="apple-pill border-amber-500/25 bg-amber-500/10">
            <Trophy size={13} strokeWidth={2} className="text-amber-500" />
            <span className="font-bold text-xs text-[var(--color-text-primary)]">{state.totalPoints}</span>
            <span className="text-[0.625rem] text-amber-500/80 font-bold">XP</span>
          </div>

          {/* Settings Trigger */}
          <button
            onClick={() => handleTabClick('settings')}
            className={`p-2 rounded-xl transition-all border cursor-pointer ${
              state.activeTab === 'settings'
                ? 'bg-[var(--btn-secondary-hover-bg)] text-[var(--color-text-primary)] border-[var(--color-surface-border-strong)]'
                : 'bg-transparent text-[var(--color-text-secondary)] border-transparent hover:bg-[var(--color-surface-border)] hover:text-[var(--color-text-primary)]'
            }`}
            id="nav-settings"
            aria-label="Settings"
          >
            <Settings size={16} strokeWidth={1.8} />
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Dock Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-around p-1.5 rounded-full bg-[var(--nav-glass-bg)] backdrop-blur-2xl border border-[var(--color-surface-border-strong)] shadow-[0_12px_40px_rgba(0,0,0,0.25)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = state.activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-full transition-all border-none cursor-pointer ${
                  isActive
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm'
                    : 'bg-transparent text-[var(--color-text-muted)]'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 1.75} />
                {isActive && (
                  <span className="text-xs font-bold whitespace-nowrap">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
