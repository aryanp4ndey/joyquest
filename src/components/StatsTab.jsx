'use client';

import { motion } from 'framer-motion';
import {
  Trophy,
  Flame,
  Target,
  TrendingUp,
  Award,
  Clock,
  Settings,
  Globe,
  Sparkles,
  Sprout,
  Heart,
  Sun,
  Wind,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playClickSound } from '../utils/audio';
import SpotlightCard from './ui/SpotlightCard';

const BADGE_VAULT = [
  {
    id: 'first-step',
    name: 'First Step',
    desc: 'Completed your first mindful pause',
    icon: Sparkles,
    color: '#ff70b8',
    isUnlocked: (s) => s.questsCompleted >= 1,
  },
  {
    id: '7-day-serenity',
    name: '7-Day Serenity',
    desc: 'Maintained a 7-day mindful streak',
    icon: Flame,
    color: '#ff9f43',
    isUnlocked: (s) => s.currentStreak >= 7 || s.longestStreak >= 7,
  },
  {
    id: 'deep-breather',
    name: 'Deep Breather',
    desc: 'Practiced 4-7-8 breathing pauses',
    icon: Wind,
    color: '#10e5aa',
    isUnlocked: (s) => s.questsCompleted >= 2,
  },
  {
    id: 'ripple-kindness',
    name: 'Ripple of Kindness',
    desc: 'Shared warmth on the Community Wall',
    icon: Heart,
    color: '#38bdf8',
    isUnlocked: (s) => s.communityMessages.length >= 1,
  },
  {
    id: 'garden-master',
    name: 'Garden Master',
    desc: 'Cultivated 5 living botanical species',
    icon: Sprout,
    color: '#c084fc',
    isUnlocked: (s) => s.gardenPlants.length >= 3,
  },
  {
    id: 'mindful-dawn',
    name: 'Mindful Dawn',
    desc: 'Anchored the morning with gratitude',
    icon: Sun,
    color: '#fbbf24',
    isUnlocked: (s) => s.questsCompleted >= 3,
  },
];

const MOOD_DISTRIBUTION = [
  { name: 'Happy', pct: 28, color: '#ff70b8' },
  { name: 'Calm', pct: 22, color: '#10e5aa' },
  { name: 'Energetic', pct: 16, color: '#ff9f43' },
  { name: 'Reflective', pct: 14, color: '#a78bfa' },
  { name: 'Grateful', pct: 8, color: '#fbbf24' },
  { name: 'Creative', pct: 6, color: '#c084fc' },
  { name: 'Stressed', pct: 4, color: '#38bdf8' },
  { name: 'Lonely', pct: 2, color: '#60a5fa' },
];

export default function StatsTab() {
  const { state, actions } = useApp();

  const mindfulMinutes = Math.max(15, state.questsCompleted * 5);
  const innerBalanceScore = Math.min(99, 82 + state.questsCompleted * 2);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 2-Column Responsive Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Profile Card, 4 Metrics, Navigation */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* User Profile Header Card */}
          <SpotlightCard
            spotlightColor="rgba(255, 112, 184, 0.25)"
            className="p-6 text-center border-[var(--mood-card-border)] bg-[var(--mood-card-bg)] shadow-[0_12px_40px_rgba(0,0,0,0.18)]"
          >
            <div className="relative inline-block mb-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#ff70b8] via-[#10e5aa] to-[#a78bfa] p-0.5 shadow-md">
                <div className="w-full h-full rounded-full bg-[var(--color-surface-panel)] flex items-center justify-center text-[var(--color-text-primary)] text-xl font-bold">
                  JQ
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#10e5aa] text-zinc-950 flex items-center justify-center text-xs font-bold shadow-md">
                ✓
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[var(--color-text-primary)] tracking-tight">
              Mindful Adventurer
            </h2>
            <span className="text-xs text-[var(--color-text-muted)] font-medium block mt-0.5">
              Inner Balance {innerBalanceScore}% &bull; {state.questsCompleted} pauses logged
            </span>

            {/* Dynamic Mood Status Pill */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="apple-pill text-xs font-bold capitalize">
                <span className="w-2 h-2 rounded-full bg-[var(--mood-accent,#ff70b8)] animate-pulse" />
                <span>Active: {state.selectedMood}</span>
              </span>
              <span className="apple-pill text-xs font-bold">
                <Flame size={12} className="text-amber-500 fill-amber-500" />
                <span>{state.currentStreak}d Streak</span>
              </span>
            </div>
          </SpotlightCard>

          {/* 4 Core Metrics Dashboard Tiles with Aceternity Tilt */}
          <div className="grid grid-cols-2 gap-3">
            <SpotlightCard
              spotlightColor="rgba(6, 182, 212, 0.25)"
              tilt={true}
              className="p-4 text-center shadow-sm"
            >
              <Clock size={16} className="text-cyan-400 mx-auto mb-1.5" />
              <span className="text-2xl font-black text-[var(--color-text-primary)] block">
                {mindfulMinutes}m
              </span>
              <span className="text-[0.6875rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mt-0.5">
                Mindful Minutes
              </span>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(16, 185, 129, 0.25)"
              tilt={true}
              className="p-4 text-center shadow-sm"
            >
              <Target size={16} className="text-emerald-400 mx-auto mb-1.5" />
              <span className="text-2xl font-black text-[var(--color-text-primary)] block">
                {state.questsCompleted}
              </span>
              <span className="text-[0.6875rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mt-0.5">
                Quests Completed
              </span>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(255, 159, 67, 0.25)"
              tilt={true}
              className="p-4 text-center shadow-sm"
            >
              <Flame size={16} className="text-[#ff9f43] mx-auto mb-1.5" />
              <span className="text-2xl font-black text-[#ff9f43] block">
                {state.currentStreak}d
              </span>
              <span className="text-[0.6875rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mt-0.5">
                Current Streak
              </span>
            </SpotlightCard>

            <SpotlightCard
              spotlightColor="rgba(168, 85, 247, 0.25)"
              tilt={true}
              className="p-4 text-center shadow-sm"
            >
              <TrendingUp size={16} className="text-violet-400 mx-auto mb-1.5" />
              <span className="text-2xl font-black text-violet-400 block">
                {innerBalanceScore}%
              </span>
              <span className="text-[0.6875rem] font-bold text-[var(--color-text-muted)] uppercase tracking-wider block mt-0.5">
                Inner Balance
              </span>
            </SpotlightCard>
          </div>

          {/* Quick Hub Links */}
          <div className="apple-card divide-y divide-[var(--color-surface-border)] overflow-hidden">
            <button
              onClick={() => {
                playClickSound(state.soundEnabled);
                actions.setTab('garden');
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--color-surface-card-hover)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Sprout size={16} className="text-emerald-400" />
                <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Botanical Sanctuary ({state.gardenPlants.length} blooms)
                </span>
              </div>
              <span className="text-xs text-[var(--color-text-dim)] font-mono">&rarr;</span>
            </button>

            <button
              onClick={() => {
                playClickSound(state.soundEnabled);
                actions.setTab('community');
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--color-surface-card-hover)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Globe size={16} className="text-pink-400" />
                <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Community Wall of Kindness
                </span>
              </div>
              <span className="text-xs text-[var(--color-text-dim)] font-mono">&rarr;</span>
            </button>

            <button
              onClick={() => {
                playClickSound(state.soundEnabled);
                actions.setTab('settings');
              }}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-[var(--color-surface-card-hover)] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <Settings size={16} className="text-[var(--color-text-muted)]" />
                <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)]">
                  Sound Engine &amp; Theme Studio
                </span>
              </div>
              <span className="text-xs text-[var(--color-text-dim)] font-mono">&rarr;</span>
            </button>
          </div>
        </div>

        {/* Right Column: Emotional Distribution Chart & Badge Vault */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          {/* Emotional Distribution Chart (Horizontal Stacked Pill) */}
          <SpotlightCard
            spotlightColor="rgba(168, 85, 247, 0.2)"
            className="p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-3.5">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                Emotional Distribution
              </span>
              <span className="apple-pill text-xs text-violet-400 border-violet-500/30 bg-violet-500/10 font-mono">
                Last 30 Days
              </span>
            </div>

            <p className="text-xs text-[var(--color-text-muted)] mb-3">
              Distribution of intentional check-ins across the 8 signature emotional states.
            </p>

            {/* Horizontal Stacked Pill Bar */}
            <div className="h-4 w-full rounded-full bg-[var(--color-surface-panel)] overflow-hidden flex p-0.5 border border-[var(--color-surface-border)] mb-4">
              {MOOD_DISTRIBUTION.map((item) => (
                <div
                  key={item.name}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all hover:opacity-90 cursor-pointer"
                  style={{
                    width: `${item.pct}%`,
                    backgroundColor: item.color,
                  }}
                  title={`${item.name}: ${item.pct}%`}
                />
              ))}
            </div>

            {/* Legend Grid */}
            <div className="grid grid-cols-4 gap-2 text-[0.6875rem]">
              {MOOD_DISTRIBUTION.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-[var(--color-text-secondary)] font-medium truncate">
                    {item.name} <span className="font-mono text-[var(--color-text-dim)]">{item.pct}%</span>
                  </span>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* Illuminated Badge Vault */}
          <SpotlightCard
            spotlightColor="rgba(245, 158, 11, 0.2)"
            className="p-6 shadow-md"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
                  Mindful Achievements
                </span>
                <span className="text-base font-extrabold text-[var(--color-text-primary)]">
                  Illuminated Badge Vault
                </span>
              </div>
              <span className="apple-pill text-xs text-amber-400 border-amber-500/30 bg-amber-500/10 font-bold">
                {BADGE_VAULT.filter((b) => b.isUnlocked(state)).length} / {BADGE_VAULT.length} Unlocked
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BADGE_VAULT.map((badge) => {
                const unlocked = badge.isUnlocked(state);
                const Icon = badge.icon;

                return (
                  <motion.div
                    key={badge.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3 relative overflow-hidden ${
                      unlocked
                        ? 'bg-[var(--color-surface-panel)] border-[var(--color-surface-border)]'
                        : 'bg-[var(--color-surface-card)] opacity-40 border-dashed border-zinc-600/30'
                    }`}
                    style={{
                      boxShadow: unlocked ? `0 0 20px -4px ${badge.color}35` : undefined,
                    }}
                    whileHover={unlocked ? { scale: 1.02 } : {}}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                      style={{
                        backgroundColor: unlocked ? `${badge.color}25` : 'var(--color-surface-card)',
                        color: unlocked ? badge.color : 'var(--color-text-dim)',
                      }}
                    >
                      {unlocked ? <Icon size={20} strokeWidth={2.2} /> : <Lock size={16} />}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[var(--color-text-primary)] truncate">
                          {badge.name}
                        </span>
                        {unlocked && (
                          <CheckCircle2 size={12} className="text-emerald-400 shrink-0" />
                        )}
                      </div>
                      <span className="text-[0.6875rem] text-[var(--color-text-muted)] block truncate mt-0.5">
                        {badge.desc}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SpotlightCard>
        </div>
      </div>
    </div>
  );
}
