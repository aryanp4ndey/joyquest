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
  Sun,
  Moon,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { playClickSound } from '../utils/audio';
import { JoyQuestLogo } from './JoyQuestBrand';

const NAV_ITEMS = [
  { id: 'quest', label: 'Quests', icon: Home, color: '#06b6d4' },
  { id: 'garden', label: 'Sanctuary', icon: Sprout, color: '#10b981' },
  { id: 'community', label: 'Wall', icon: MessageSquare, color: '#ec4899' },
  { id: 'stats', label: 'Metrics', icon: User, color: '#8b5cf6' },
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
    <header className="sticky top-0 z-50 px-4 pt-3 pb-2 sm:pt-4 sm:pb-3 select-none">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2.5 rounded-3xl aceternity-dock relative transition-all duration-300">
        {/* Specular Top Edge Highlight */}
        <div className="specular-highlight rounded-t-3xl" />

        {/* Official JoyQuest Logo */}
        <div className="relative z-10">
          <JoyQuestLogo
            size="md"
            onClick={() => handleTabClick('quest')}
            showTagline={true}
          />
        </div>

        {/* Center: Aceternity Floating Dock Tabs */}
        <div className="hidden md:flex items-center gap-1.5 p-1 rounded-2xl bg-black/10 dark:bg-white/[0.04] border border-white/5 relative">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = state.activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-medium tracking-tight transition-all duration-200 flex items-center gap-2 cursor-pointer border-none ${
                  isActive
                    ? 'text-[var(--color-text-primary)] font-semibold shadow-sm'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                }`}
                id={`nav-${item.id}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDockPill"
                    className="absolute inset-0 rounded-xl bg-white/15 dark:bg-white/10 backdrop-blur-md border border-white/15 shadow-[0_2px_12px_rgba(0,0,0,0.1)] -z-10"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                <Icon
                  size={15}
                  strokeWidth={isActive ? 2.4 : 1.8}
                  style={{ color: isActive ? item.color : undefined }}
                  className="transition-transform duration-200 group-hover:scale-110"
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Controls, Streak, Points & Settings */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Light / Dark Mode Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleToggleTheme}
            className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
            title={state.theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            id="nav-theme-toggle"
            aria-label="Toggle color theme"
          >
            {state.theme === 'light' ? (
              <Moon size={15} className="text-violet-500" />
            ) : (
              <Sun size={15} className="text-amber-400" />
            )}
          </motion.button>

          {/* Audio Quick Toggle */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={handleToggleSound}
            className="p-2 rounded-xl text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/10 transition-colors border border-transparent hover:border-white/10 cursor-pointer"
            title={state.soundEnabled ? 'Mute sound' : 'Enable audio cues'}
            id="nav-audio-toggle"
            aria-label="Toggle audio cues"
          >
            {state.soundEnabled ? (
              <Volume2 size={15} className="text-cyan-400" />
            ) : (
              <VolumeX size={15} className="text-[var(--color-text-dim)]" />
            )}
          </motion.button>

          {/* Streak Indicator with Flame Aura */}
          {state.currentStreak > 0 && (
            <motion.div
              className="apple-pill text-amber-400 border-amber-500/30 bg-amber-500/10 shadow-[0_0_15px_-3px_rgba(245,158,11,0.35)]"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flame size={13} strokeWidth={2.4} className="text-amber-400 fill-amber-400/20" />
              <span className="font-bold text-xs">{state.currentStreak}d</span>
            </motion.div>
          )}

          {/* XP Pill with Specular Accent */}
          <div className="apple-pill border-amber-500/20 bg-amber-500/10 shadow-[0_0_12px_-2px_rgba(245,158,11,0.15)]">
            <Trophy size={13} strokeWidth={2} className="text-amber-400" />
            <span className="font-bold text-xs text-[var(--color-text-primary)]">
              {state.totalPoints}
            </span>
            <span className="text-[0.625rem] text-amber-400/90 font-bold uppercase tracking-wider">
              XP
            </span>
          </div>

          {/* Settings Trigger */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => handleTabClick('settings')}
            className={`p-2 rounded-xl transition-all border cursor-pointer ${
              state.activeTab === 'settings'
                ? 'bg-white/15 text-[var(--color-text-primary)] border-white/20 shadow-sm'
                : 'bg-transparent text-[var(--color-text-secondary)] border-transparent hover:bg-white/10 hover:text-[var(--color-text-primary)]'
            }`}
            id="nav-settings"
            aria-label="Settings"
          >
            <Settings size={16} strokeWidth={1.8} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Bottom Floating Dock Bar */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="max-w-sm mx-auto flex items-center justify-around p-2 rounded-3xl aceternity-dock shadow-[0_16px_48px_rgba(0,0,0,0.35)]">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = state.activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl transition-all border-none cursor-pointer ${
                  isActive
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] shadow-sm font-semibold'
                    : 'bg-transparent text-[var(--color-text-muted)]'
                }`}
                id={`mobile-nav-${item.id}`}
              >
                <Icon size={16} strokeWidth={isActive ? 2.4 : 1.75} />
                {isActive && (
                  <span className="text-xs tracking-tight whitespace-nowrap">
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
