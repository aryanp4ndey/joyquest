'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Clock, Sparkles, RotateCcw, Award, Wind, BookOpen } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playStepSound, playClickSound, playBowlTone } from '../utils/audio';
import { triggerMiniSparkle } from '../utils/confetti';
import { CATEGORIES } from '../data/quests';
import IconRenderer from './IconRenderer';
import BreathingOrb from './BreathingOrb';
import VoiceNarrator from './VoiceNarrator';
import SpotlightCard from './ui/SpotlightCard';
import ShimmerButton from './ui/ShimmerButton';

export default function QuestCard({ quest, startTime, timeLimit, onComplete, onSkip, loading }) {
  const { state } = useApp();
  const [completedSteps, setCompletedSteps] = useState([]);
  const [elapsed, setElapsed] = useState(0);
  const [reflectionNote, setReflectionNote] = useState('');
  const [showBreathingOrb, setShowBreathingOrb] = useState(false);

  const categoryMeta = CATEGORIES.find((c) => c.id === quest.category) || CATEGORIES[0];

  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      if (startTime) {
        setElapsed(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [startTime]);

  const toggleStep = (index, e) => {
    const isNowDone = !completedSteps.includes(index);
    if (isNowDone) {
      playStepSound(state.soundEnabled);
      triggerMiniSparkle(e);
    } else {
      playClickSound(state.soundEnabled);
    }
    setCompletedSteps((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const allStepsComplete = completedSteps.length === (quest.steps?.length || 0);
  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  // Progress ring values
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const timeLimitSeconds = (timeLimit?.minutes || 5) * 60;
  const progress = Math.min(elapsed / timeLimitSeconds, 1);
  const dashOffset = circumference * (1 - progress);

  return (
    <SpotlightCard
      className="p-6 sm:p-8 relative overflow-hidden"
      spotlightColor={`${categoryMeta.color}30`}
      style={{
        boxShadow: `0 12px 42px -4px ${categoryMeta.glow}`,
      }}
    >
      {/* Top ambient banner glow */}
      <div
        className="absolute top-0 left-0 right-0 h-1.5"
        style={{
          background: `linear-gradient(90deg, ${categoryMeta.color}, #06b6d4, #10b981)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-6 pt-1">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-2.5">
            <span
              className="apple-pill text-xs font-bold"
              style={{
                backgroundColor: `${categoryMeta.color}20`,
                borderColor: `${categoryMeta.color}40`,
                color: categoryMeta.color,
              }}
            >
              <IconRenderer name={categoryMeta.icon} size={13} />
              <span>{categoryMeta.label}</span>
            </span>

            {quest.aiGenerated && (
              <span className="apple-pill text-[0.6875rem] text-violet-400 border-violet-500/30 bg-violet-500/10">
                <Sparkles size={11} className="text-violet-400" />
                <span>AI Personalized</span>
              </span>
            )}

            <span className="apple-pill text-[0.6875rem] text-amber-500 border-amber-500/30 bg-amber-500/10">
              <Award size={11} className="text-amber-500" />
              <span>+45 XP</span>
            </span>

            {/* Breathing Orb Toggle */}
            <button
              onClick={() => {
                playClickSound(state.soundEnabled);
                setShowBreathingOrb((prev) => !prev);
              }}
              className={`apple-pill text-xs font-bold cursor-pointer transition-colors ${
                showBreathingOrb
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  : 'hover:bg-[var(--color-surface-card-hover)]'
              }`}
            >
              <Wind size={12} />
              <span>{showBreathingOrb ? 'Hide Breathing Orb' : '4-7-8 Breathing'}</span>
            </button>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-2">
            {quest.title}
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-3">
            {quest.description}
          </p>

          {/* Voice Narrator — ElevenLabs TTS with language & voice selection */}
          <VoiceNarrator
            quest={quest}
            accentColor={categoryMeta.color}
            soundEnabled={state.soundEnabled}
          />
        </div>

        {/* Circular Live Timer */}
        <div className="relative flex items-center justify-center shrink-0 w-16 h-16">
          <svg width="60" height="60" viewBox="0 0 60 60" className="-rotate-90">
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke="var(--color-surface-border)"
              strokeWidth="3.5"
            />
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke={progress >= 1 ? '#f43f5e' : categoryMeta.color}
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              className="transition-all duration-300"
              style={{
                filter: `drop-shadow(0 0 6px ${categoryMeta.color}80)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Clock size={11} className="text-[var(--color-text-muted)] mb-0.5" />
            <span className="font-mono text-[0.72rem] font-bold text-[var(--color-text-primary)] tracking-tighter">
              {minutes}:{seconds.toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* 4-7-8 Breathing Visualizer Orb */}
      <AnimatePresence>
        {showBreathingOrb && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 rounded-2xl bg-[var(--color-surface-panel)] border border-[var(--color-surface-border)] overflow-hidden"
          >
            <BreathingOrb soundEnabled={state.soundEnabled} accentColor={categoryMeta.color} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actionable Steps List */}
      <div className="space-y-2.5 mb-6">
        <div className="flex items-center justify-between text-[0.6875rem] text-[var(--color-text-muted)] uppercase tracking-wider font-bold mb-1">
          <span>Action Items</span>
          <span className="font-mono text-[var(--color-text-secondary)]">
            {completedSteps.length} of {quest.steps?.length || 0} completed
          </span>
        </div>

        {quest.steps?.map((step, i) => {
          const isDone = completedSteps.includes(i);
          return (
            <motion.button
              key={i}
              onClick={(e) => toggleStep(i, e)}
              className={`w-full flex items-start gap-3 p-3.5 rounded-xl text-left transition-all border cursor-pointer select-none ${
                isDone
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-[var(--color-text-primary)] shadow-sm'
                  : 'bg-[var(--color-surface-panel)] border-[var(--color-surface-border)] hover:border-[var(--color-surface-border-strong)] text-[var(--color-text-secondary)]'
              }`}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              id={`quest-step-${i}`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                  isDone
                    ? 'bg-emerald-400 text-zinc-950 shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                    : 'border-2 border-[var(--color-text-dim)]'
                }`}
              >
                {isDone && <Check size={13} strokeWidth={3} />}
              </div>
              <span
                className={`text-xs sm:text-sm font-semibold leading-relaxed ${
                  isDone ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text-primary)]'
                }`}
              >
                {step}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Mindful Reflection Journal Input */}
      <div className="mb-6">
        <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
          <BookOpen size={13} className="text-[var(--color-text-dim)]" />
          <span>Mindful Reflection Journal (Optional)</span>
        </label>
        <textarea
          value={reflectionNote}
          onChange={(e) => setReflectionNote(e.target.value)}
          placeholder="How did this pause make you feel? One small word or thought..."
          rows={2}
          className="apple-input resize-none text-xs"
        />
      </div>

      {/* Vibrant Gradient Progress Bar */}
      <div className="mb-6">
        <div className="h-2 w-full rounded-full bg-[var(--color-surface-border)] overflow-hidden p-0.5">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: `linear-gradient(90deg, ${categoryMeta.color}, #10b981)`,
              boxShadow: `0 0 12px ${categoryMeta.color}80`,
            }}
            initial={{ width: 0 }}
            animate={{
              width: `${(completedSteps.length / (quest.steps?.length || 1)) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Reward Preview */}
      {quest.reward && (
        <div className="flex items-center gap-3 mb-6 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Award size={16} />
          </div>
          <div>
            <span className="text-[0.625rem] text-amber-500 uppercase font-bold tracking-wider block">
              Achievement Badge
            </span>
            <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] block">
              {quest.reward}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {allStepsComplete ? (
          <ShimmerButton
            onClick={onComplete}
            shimmerColor="#34d399"
            background="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            textColor="#ffffff"
            className="flex-1 py-3.5 shadow-[0_4px_24px_rgba(16,185,129,0.35)]"
            id="complete-quest-btn"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>Complete Quest &amp; Claim +45 XP</span>
          </ShimmerButton>
        ) : (
          <motion.button
            onClick={onComplete}
            disabled={true}
            className="joy-btn-primary flex-1 py-3.5 opacity-40 cursor-not-allowed"
            id="complete-quest-btn"
          >
            <Check size={16} strokeWidth={2.5} />
            <span>Complete Quest &amp; Claim +45 XP</span>
          </motion.button>
        )}

        <motion.button
          onClick={onSkip}
          disabled={loading}
          className="joy-btn-secondary px-4 py-3.5"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Regenerate alternative quest"
          id="skip-quest-btn"
        >
          {loading ? (
            <RotateCcw size={16} className="animate-spin text-[var(--color-text-muted)]" />
          ) : (
            <RotateCcw size={16} className="text-[var(--color-text-secondary)]" />
          )}
        </motion.button>
      </div>
    </SpotlightCard>
  );
}
