'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Play,
  Loader2,
  Award,
  Sprout,
  Check,
  Clock,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  MOODS,
  TIME_OPTIONS,
  CATEGORIES,
  ACTIVITY_MODES,
  WORRY_TAGS,
  CURATED_PRACTICES,
  generateQuest,
} from '../data/quests';
import { MoodCharacter } from './MoodCharacter';
import QuestCard from './QuestCard';
import { playClickSound, playCompleteSound } from '../utils/audio';
import { triggerQuestConfetti } from '../utils/confetti';

export default function QuestTab() {
  const { state, actions } = useApp();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(state.currentQuest ? 'active' : 'mood'); // mood | needs | active | complete
  const [selectedMoodId, setSelectedMoodId] = useState(state.selectedMood || 'happy');
  const [selectedModes, setSelectedModes] = useState(['reflection']);
  const [selectedTags, setSelectedTags] = useState(['anxiety']);
  const [selectedTimeId, setSelectedTimeId] = useState('5min');

  const currentMood = MOODS.find((m) => m.id === selectedMoodId) || MOODS[0];

  const handleMoodSelect = (moodId) => {
    playClickSound(state.soundEnabled);
    setSelectedMoodId(moodId);
    actions.setMood(moodId);
  };

  const handleTagToggle = (tagId) => {
    playClickSound(state.soundEnabled);
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleTimeSelect = (timeId) => {
    playClickSound(state.soundEnabled);
    setSelectedTimeId(timeId);
    const timeObj = TIME_OPTIONS.find((t) => t.id === timeId);
    actions.setTime(timeObj);
  };

  const handleNextToNeeds = () => {
    playClickSound(state.soundEnabled);
    setStep('needs');
  };

  const handleGenerateQuest = useCallback(async () => {
    playClickSound(state.soundEnabled);
    setLoading(true);

    const activeTagObj = WORRY_TAGS.find((t) => selectedTags.includes(t.id));
    const targetCategory = activeTagObj ? activeTagObj.category : 'reflection';
    actions.setCategory(targetCategory);

    const timeObj = TIME_OPTIONS.find((t) => t.id === selectedTimeId) || TIME_OPTIONS[1];
    actions.setTime(timeObj);

    try {
      const quest = await generateQuest(
        selectedMoodId,
        timeObj,
        targetCategory,
        state.apiKey || null
      );
      actions.setQuest(quest);
      setStep('active');
    } catch (err) {
      console.error('Quest generation error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedMoodId, selectedTags, selectedTimeId, state.apiKey, state.soundEnabled, actions]);

  const handleQuickPractice = async (practice) => {
    playClickSound(state.soundEnabled);
    setLoading(true);
    actions.setMood('calm');
    const timeObj = TIME_OPTIONS.find((t) => t.minutes === parseInt(practice.duration)) || TIME_OPTIONS[1];
    actions.setTime(timeObj);
    actions.setCategory(practice.category);

    try {
      const quest = await generateQuest(
        'calm',
        timeObj,
        practice.category,
        state.apiKey || null
      );
      actions.setQuest(quest);
      setStep('active');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = useCallback(() => {
    playCompleteSound(state.soundEnabled);
    triggerQuestConfetti();
    actions.completeQuest();
    setStep('complete');
  }, [state.soundEnabled, actions]);

  const handleSkip = useCallback(async () => {
    playClickSound(state.soundEnabled);
    setLoading(true);
    const timeObj = TIME_OPTIONS.find((t) => t.id === selectedTimeId) || TIME_OPTIONS[1];
    try {
      const quest = await generateQuest(
        selectedMoodId,
        timeObj,
        state.selectedCategory || 'reflection',
        state.apiKey || null
      );
      actions.setQuest(quest);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [selectedMoodId, selectedTimeId, state.selectedCategory, state.apiKey, state.soundEnabled, actions]);

  const handleNewQuest = useCallback(() => {
    playClickSound(state.soundEnabled);
    actions.resetSelection();
    setStep('mood');
  }, [state.soundEnabled, actions]);

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {/* ─── Screen 1: "How do you feel today?" Studio Hero Layout ─── */}
        {step === 'mood' && (
          <motion.div
            key="mood-screen"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            {/* Top Bar indicator */}
            <div className="flex items-center justify-between mb-5 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                  Daily Wellbeing Check-in
                </span>
              </div>
              <span className="apple-pill text-xs">Step 1 of 2</span>
            </div>

            {/* Laptop / Desktop Responsive Studio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column (Character -> Mood Selector Grid -> Heading -> Next CTA) */}
              <div className="md:col-span-7 flex flex-col">
                {/* Giant Whimsical Mood Character Card with Hover tracking */}
                <div className="mb-4 rounded-[1.75rem] overflow-hidden shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-[var(--color-surface-border)] max-w-[480px] w-full mx-auto">
                  <MoodCharacter
                    moodId={selectedMoodId}
                    size={200}
                    soundEnabled={state.soundEnabled}
                  />
                </div>

                {/* Mood Selection: Balanced 4x2 Grid with vibrant signature colors */}
                <div className="mb-4 max-w-[480px] w-full mx-auto">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[0.6875rem] font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Select Current Mood
                    </span>
                    <span className="text-xs font-bold text-[var(--color-text-secondary)]">
                      Active: <span className="text-[var(--color-text-primary)] capitalize">{currentMood.label}</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-2">
                    {MOODS.map((mood) => {
                      const isSelected = selectedMoodId === mood.id;
                      return (
                        <button
                          key={mood.id}
                          onClick={() => handleMoodSelect(mood.id)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border select-none ${
                            isSelected
                              ? 'shadow-sm scale-102 font-extrabold text-zinc-950'
                              : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] border-[var(--color-surface-border)] hover:bg-[var(--color-surface-card-hover)] hover:text-[var(--color-text-primary)]'
                          }`}
                          style={{
                            backgroundColor: isSelected ? mood.color : undefined,
                            borderColor: isSelected ? mood.color : undefined,
                            boxShadow: isSelected ? `0 0 14px ${mood.color}60` : undefined,
                          }}
                          id={`mood-pill-${mood.id}`}
                        >
                          {mood.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Main Prominent Heading (matching reference) */}
                <div className="mb-4 max-w-[480px] w-full mx-auto">
                  <h2 className="text-2xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-1">
                    How do you feel today?
                  </h2>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                    Tap any emotion above or click the character to check in. Your entire theme personalizes in harmony.
                  </p>
                </div>

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between pt-1 max-w-[480px] w-full mx-auto">
                  <button
                    onClick={handleNextToNeeds}
                    className="joy-btn-ghost text-xs"
                  >
                    Skip to Focus
                  </button>

                  <motion.button
                    onClick={handleNextToNeeds}
                    className="joy-btn-primary py-2.5 px-6 text-xs"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    id="next-step-btn"
                  >
                    <span>Continue to Focus</span>
                    <ChevronRight size={15} strokeWidth={2.6} />
                  </motion.button>
                </div>
              </div>

              {/* Right Column: Curated Practices & Special for You */}
              <div className="md:col-span-5 flex flex-col gap-4">
                {/* Special for You Banner Card */}
                <div className="apple-card p-5 border-cyan-500/25 bg-gradient-to-br from-cyan-500/12 via-transparent to-transparent">
                  <div className="flex items-center justify-between mb-3">
                    <span className="apple-pill text-[0.6875rem] text-cyan-400 border-cyan-500/30 bg-cyan-500/10">
                      Special for You
                    </span>
                    <span className="text-xs text-[var(--color-text-muted)] font-mono">Today&apos;s Highlight</span>
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--color-text-primary)] mb-1">
                    Morning Gratitude &amp; Wonder
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)] mb-4 leading-relaxed">
                    A short intentional practice designed to anchor your mind in clarity, ease, and appreciation.
                  </p>
                  <button
                    onClick={() => handleQuickPractice(CURATED_PRACTICES[2])}
                    className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-zinc-950 font-bold text-xs flex items-center justify-between transition-colors shadow-sm cursor-pointer"
                  >
                    <span>Begin Morning Gratitude</span>
                    <Play size={13} className="fill-current" />
                  </button>
                </div>

                {/* Recommended Micro-Pauses */}
                <div>
                  <div className="flex items-center justify-between mb-3 px-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Curated Micro-Pauses
                    </span>
                    <span className="text-xs text-cyan-400 font-semibold cursor-pointer hover:underline">
                      Quick Start
                    </span>
                  </div>

                  <div className="space-y-3">
                    {CURATED_PRACTICES.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleQuickPractice(item)}
                        className="w-full p-4 rounded-2xl flex items-center justify-between text-left transition-all hover:scale-[1.01] shadow-sm cursor-pointer border border-[var(--color-surface-border)]"
                        style={{
                          backgroundColor: item.color,
                          color: item.textColor,
                        }}
                      >
                        <div>
                          <span className="text-sm font-bold block leading-snug">
                            {item.title}
                          </span>
                          <span className="text-xs font-semibold opacity-75 mt-0.5 block">
                            {item.duration} &bull; {item.category}
                          </span>
                        </div>
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-zinc-950 shrink-0 ml-3"
                          style={{ backgroundColor: item.playColor }}
                        >
                          <Play size={12} className="fill-current ml-0.5" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mindful Tip Card */}
                <div className="apple-card p-4 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--color-text-primary)] block">
                      Micro-Moment Wisdom
                    </span>
                    <p className="text-[0.6875rem] text-[var(--color-text-muted)] mt-0.5">
                      Even a 2-minute mindful pause can calm cortisol levels and restore creative focus.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Screen 2: "What's worrying you?" Needs & Duration Grid ─── */}
        {step === 'needs' && (
          <motion.div
            key="needs-screen"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            {/* Top Bar indicator */}
            <div className="flex items-center justify-between mb-5 px-1">
              <button
                onClick={() => setStep('mood')}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <ChevronLeft size={16} /> Back to Check-in
              </button>
              <span className="apple-pill text-xs font-semibold">
                ● Intentional Focus — Step 2 of 2
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column: Summary of Mood & Circular Time Dial Selection */}
              <div className="md:col-span-5 flex flex-col gap-4">
                <div className="apple-card p-6 flex flex-col items-center text-center">
                  <div className="w-24 h-24 mb-3 rounded-2xl overflow-hidden shadow-md">
                    <MoodCharacter moodId={selectedMoodId} size={96} soundEnabled={state.soundEnabled} />
                  </div>
                  <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-bold mb-1">
                    Current Mood
                  </span>
                  <span className="text-lg font-bold text-[var(--color-text-primary)] capitalize">
                    {currentMood.label}
                  </span>
                  <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                    Personalizing quest guidance to restore ease, focus, and emotional harmony.
                  </p>
                </div>

                {/* 4 Circular Dial Buttons for Time */}
                <div className="apple-card p-5">
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Time Dial
                    </span>
                    <span className="text-[0.6875rem] font-mono text-[var(--color-text-dim)]">
                      Select duration
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {TIME_OPTIONS.map((time) => {
                      const isSelected = selectedTimeId === time.id;
                      return (
                        <button
                          key={time.id}
                          onClick={() => handleTimeSelect(time.id)}
                          className={`p-3.5 rounded-2xl text-left transition-all border cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                            isSelected
                              ? 'bg-[var(--mood-btn-bg,#ffffff)] text-[var(--mood-btn-text,#09090b)] border-transparent shadow-[0_4px_20px_var(--mood-glow,rgba(255,112,184,0.25))]'
                              : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] border-[var(--color-surface-border)] hover:border-[var(--color-surface-border-strong)]'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-base font-black tracking-tight">
                              {time.label}
                            </span>
                            <div
                              className={`w-2.5 h-2.5 rounded-full ${
                                isSelected ? 'bg-current animate-ping' : 'bg-[var(--color-text-dim)]'
                              }`}
                            />
                          </div>
                          <span
                            className={`text-[0.6875rem] font-semibold leading-tight block ${
                              isSelected ? 'opacity-90' : 'text-[var(--color-text-muted)]'
                            }`}
                          >
                            {time.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right Column: Activity Mode Chips & Generation Action */}
              <div className="md:col-span-7 flex flex-col">
                <div className="mb-6">
                  <span className="apple-pill text-[0.6875rem] text-[var(--mood-accent,#ff70b8)] border-[var(--mood-card-border)] bg-[var(--mood-glow)] mb-2 inline-flex">
                    Curated Pacing
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[var(--color-text-primary)] mb-2">
                    Choose Your Focus Areas
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--color-text-muted)] leading-relaxed">
                    Select your preferred modalities. JoyQuest will synthesize a bite-sized mindful practice tailored to your present state.
                  </p>
                </div>

                {/* Multi-select Activity Mode Chips */}
                <div className="mb-5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2.5">
                    Activity Modalities
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {ACTIVITY_MODES.map((mode) => {
                      const isSelected = selectedModes.includes(mode.id);
                      return (
                        <motion.button
                          key={mode.id}
                          onClick={() => {
                            playClickSound(state.soundEnabled);
                            setSelectedModes((prev) =>
                              prev.includes(mode.id)
                                ? (prev.length > 1 ? prev.filter((m) => m !== mode.id) : prev)
                                : [...prev, mode.id]
                            );
                          }}
                          className={`p-3.5 rounded-xl text-left transition-all border cursor-pointer select-none flex items-center justify-between ${
                            isSelected
                              ? 'bg-[var(--color-surface-panel)] text-[var(--color-text-primary)] border-[var(--mood-accent,#ff70b8)] shadow-sm'
                              : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] border-[var(--color-surface-border)] hover:bg-[var(--color-surface-card-hover)]'
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center gap-2.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: mode.color }}
                            />
                            <span className="text-xs sm:text-sm font-bold">
                              {mode.label}
                            </span>
                          </div>
                          {isSelected && (
                            <Check size={14} className="text-[var(--mood-accent,#ff70b8)]" strokeWidth={3} />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Emotional Resonance Needs Chips */}
                <div className="mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block mb-2.5">
                    Present Emotion / Need
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {WORRY_TAGS.slice(0, 8).map((tag) => {
                      const isSelected = selectedTags.includes(tag.id);
                      return (
                        <motion.button
                          key={tag.id}
                          onClick={() => handleTagToggle(tag.id)}
                          className={`py-2 px-2.5 rounded-xl text-[0.6875rem] font-bold transition-all text-center cursor-pointer border select-none ${
                            isSelected
                              ? 'text-zinc-950 border-transparent shadow-sm'
                              : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] border-[var(--color-surface-border)] hover:text-[var(--color-text-primary)]'
                          }`}
                          style={{
                            backgroundColor: isSelected ? tag.color : undefined,
                          }}
                          whileTap={{ scale: 0.96 }}
                        >
                          {tag.label}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Actions Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--color-surface-border)]">
                  <button
                    onClick={() => setStep('mood')}
                    className="joy-btn-ghost text-xs"
                  >
                    Back to Check-in
                  </button>

                  <motion.button
                    onClick={handleGenerateQuest}
                    disabled={loading}
                    className="joy-btn-primary py-3 px-7 text-xs font-bold"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    id="begin-quest-btn"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Synthesizing Quest...</span>
                      </>
                    ) : (
                      <>
                        <span>Generate My Quest</span>
                        <Sparkles size={16} />
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── Screen 3: Active Quest Card ─── */}
        {step === 'active' && state.currentQuest && (
          <motion.div
            key="active-screen"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-between mb-5 px-1">
              <button
                onClick={() => setStep('mood')}
                className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] flex items-center gap-1 font-semibold cursor-pointer"
              >
                <ChevronLeft size={16} /> Back to Check-in
              </button>
              <span className="apple-pill text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                Active Mindful Quest
              </span>
            </div>

            <QuestCard
              quest={state.currentQuest}
              startTime={state.questStartTime}
              timeLimit={state.selectedTime}
              onComplete={handleComplete}
              onSkip={handleSkip}
              loading={loading}
            />
          </motion.div>
        )}

        {/* ─── Screen 4: Completion Fanfare & Confetti ─── */}
        {step === 'complete' && (
          <motion.div
            key="complete-screen"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="max-w-xl mx-auto p-8 sm:p-12 text-center rounded-[2rem] apple-card shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
          >
            {/* Victory Badge */}
            <motion.div
              className="w-20 h-20 rounded-3xl bg-[#10e5aa] mx-auto flex items-center justify-center text-zinc-950 mb-6 shadow-[0_0_30px_rgba(16,229,170,0.5)]"
              animate={{ rotate: [0, -6, 6, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
            >
              <Award size={40} strokeWidth={2.4} />
            </motion.div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-2">
              Quest Complete!
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto leading-relaxed">
              You showed up for your calm today. You earned{' '}
              <span className="text-[#10e5aa] font-bold">
                +{state.completedQuests[0]?.points || 15} XP
              </span>{' '}
              and a new botanical bloom.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-bold text-emerald-400 mb-8">
              <Sprout size={15} />
              <span>A new specimen bloomed in your sanctuary</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <motion.button
                onClick={handleNewQuest}
                className="joy-btn-primary w-full sm:w-auto"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id="new-quest-btn"
              >
                <span>New Mood Check-in</span>
              </motion.button>
              <motion.button
                onClick={() => {
                  actions.setTab('garden');
                  handleNewQuest();
                }}
                className="joy-btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                id="view-garden-btn"
              >
                <Sprout size={16} className="text-emerald-400" />
                <span>Visit Sanctuary</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
