'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sprout, Lock, ArrowUpRight, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GARDEN_PLANTS } from '../data/quests';
import IconRenderer from './IconRenderer';
import { playClickSound, playBowlTone } from '../utils/audio';

export default function GardenTab() {
  const { state, actions } = useApp();
  const plants = state.gardenPlants;
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [filter, setFilter] = useState('all'); // all | unlocked | rare
  const [wateredId, setWateredId] = useState(null);

  const handleWaterPlant = (slotId) => {
    playBowlTone(528, state.soundEnabled);
    setWateredId(slotId);
    setTimeout(() => {
      setWateredId(null);
    }, 1200);
  };

  const handlePlantClick = (plant) => {
    playClickSound(state.soundEnabled);
    setSelectedPlant(plant);
  };

  const filteredPlants = GARDEN_PLANTS.filter((plant) => {
    const isUnlocked = state.questsCompleted >= plant.minQuests;
    if (filter === 'unlocked') return isUnlocked;
    if (filter === 'rare') return ['Rare', 'Flourishing', 'Sanctuary', 'Legendary'].includes(plant.rarity);
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-xs font-semibold text-emerald-400 mb-3 shadow-[0_0_20px_-3px_rgba(16,185,129,0.2)]"
          whileHover={{ scale: 1.04 }}
        >
          <Sprout size={14} className="text-emerald-400" />
          <span>Botanical Sanctuary</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-2">
          Your Living Botanical Collection
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
          Every positive action nurtures a living specimen. Click any plant to inspect its botanical lore.
        </p>
      </div>

      {/* ─── 6-Slot Zen Terrarium Garden (4 Growth Stages: Seed -> Sprout -> Bud -> Blossom) ─── */}
      <div className="apple-card p-6 sm:p-7 mb-8 border-[var(--mood-card-border)] bg-[var(--mood-card-bg)] shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)] block">
              Living Terrarium Slots
            </span>
            <span className="text-sm font-extrabold text-[var(--color-text-primary)]">
              Interactive Soil &bull; Click any plant to water
            </span>
          </div>
          <span className="apple-pill text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
            {state.questsCompleted} Quests Completed
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { id: 'bonsai-calm', name: 'Bonsai of Calm', icon: 'TreePine', color: '#10e5aa', req: 1 },
            { id: 'rose-joy', name: 'Rose of Joy', icon: 'Flower2', color: '#ff70b8', req: 3 },
            { id: 'sunflower-energy', name: 'Sunflower of Energy', icon: 'Sun', color: '#ff9f43', req: 5 },
            { id: 'lotus-reflection', name: 'Lotus of Reflection', icon: 'Sparkles', color: '#a78bfa', req: 7 },
            { id: 'bamboo-resilience', name: 'Bamboo of Resilience', icon: 'Leaf', color: '#38bdf8', req: 9 },
            { id: 'orchid-grace', name: 'Orchid of Grace', icon: 'Heart', color: '#c084fc', req: 12 },
          ].map((slot) => {
            const completed = state.questsCompleted;
            let stage = 'Seed';
            let stageNum = 1;
            if (completed >= slot.req + 5) {
              stage = 'Blossom';
              stageNum = 4;
            } else if (completed >= slot.req + 2) {
              stage = 'Bud';
              stageNum = 3;
            } else if (completed >= slot.req) {
              stage = 'Sprout';
              stageNum = 2;
            }

            const isWatered = wateredId === slot.id;

            return (
              <motion.button
                key={slot.id}
                onClick={() => handleWaterPlant(slot.id)}
                className="p-3.5 rounded-2xl bg-[var(--color-surface-panel)] border border-[var(--color-surface-border)] hover:border-[var(--color-surface-border-strong)] flex flex-col items-center text-center cursor-pointer relative overflow-hidden transition-all group"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
              >
                {/* Water droplet ripple on click */}
                {isWatered && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="absolute inset-0 rounded-full bg-cyan-400 pointer-events-none"
                  />
                )}

                <div
                  className="w-12 h-12 rounded-xl mb-2.5 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm relative"
                  style={{
                    backgroundColor: `${slot.color}20`,
                    color: slot.color,
                  }}
                >
                  <IconRenderer name={slot.icon} size={22} strokeWidth={2} />
                  {stage === 'Blossom' && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  )}
                </div>

                <span className="text-xs font-bold text-[var(--color-text-primary)] truncate w-full block">
                  {slot.name}
                </span>

                <div className="flex items-center gap-1 mt-1">
                  <span
                    className="text-[0.625rem] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md"
                    style={{ backgroundColor: `${slot.color}18`, color: slot.color }}
                  >
                    {stage}
                  </span>
                </div>

                <div className="w-full bg-[var(--color-surface-border)] h-1 rounded-full mt-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(stageNum / 4) * 100}%`,
                      backgroundColor: slot.color,
                    }}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Sanctuary Metrics */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        <div className="apple-card p-4 text-center border-emerald-500/20 bg-emerald-500/5">
          <span className="text-[0.6875rem] text-emerald-500 uppercase font-bold tracking-wider block mb-1">
            Planted Specimens
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            {plants.length}
          </span>
        </div>
        <div className="apple-card p-4 text-center border-amber-500/20 bg-amber-500/5">
          <span className="text-[0.6875rem] text-amber-500 uppercase font-bold tracking-wider block mb-1">
            Species Discovered
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            {GARDEN_PLANTS.filter((p) => p.minQuests <= state.questsCompleted).length}
            <span className="text-xs text-[var(--color-text-muted)] font-normal"> / {GARDEN_PLANTS.length}</span>
          </span>
        </div>
        <div className="apple-card p-4 text-center border-violet-500/20 bg-violet-500/5">
          <span className="text-[0.6875rem] text-violet-400 uppercase font-bold tracking-wider block mb-1">
            Sanctuary Rank
          </span>
          <span className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-primary)] tracking-tight">
            {plants.length >= 15 ? 'Venerable' : plants.length >= 8 ? 'Flourishing' : plants.length >= 3 ? 'Sprouting' : 'Nascent'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="apple-segmented-track">
          {[
            { id: 'all', label: 'All Species' },
            { id: 'unlocked', label: 'My Blooms' },
            { id: 'rare', label: 'Rare & Above' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playClickSound(state.soundEnabled);
                setFilter(tab.id);
              }}
              className={`apple-segmented-item ${filter === tab.id ? 'active' : ''}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <span className="text-xs text-[var(--color-text-muted)] font-mono">
          {filteredPlants.length} plants displayed
        </span>
      </div>

      {/* Archive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3.5 mb-8">
        {filteredPlants.map((plant) => {
          const isUnlocked = state.questsCompleted >= plant.minQuests;
          return (
            <motion.button
              key={plant.id}
              onClick={() => handlePlantClick({ ...plant, isUnlocked })}
              className={`apple-card p-4 flex flex-col items-center text-center relative overflow-hidden group cursor-pointer ${
                isUnlocked
                  ? 'border-[var(--color-surface-border)] hover:border-[var(--color-surface-border-strong)]'
                  : 'opacity-40 border-dashed border-zinc-500/30'
              }`}
              style={{
                boxShadow: isUnlocked ? `0 4px 20px -2px ${plant.color}30` : undefined,
              }}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <div
                className="w-12 h-12 rounded-xl mb-3 flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm"
                style={{
                  backgroundColor: isUnlocked ? `${plant.color}25` : 'var(--color-surface-panel)',
                  color: isUnlocked ? plant.color : 'var(--color-text-dim)',
                  boxShadow: isUnlocked ? `0 0 16px -2px ${plant.color}45` : undefined,
                }}
              >
                {isUnlocked ? (
                  <IconRenderer name={plant.icon} size={22} strokeWidth={2} />
                ) : (
                  <Lock size={16} />
                )}
              </div>

              <span className="text-xs font-bold text-[var(--color-text-primary)] truncate w-full block">
                {plant.name}
              </span>
              <span
                className="text-[0.625rem] font-bold mt-0.5 block"
                style={{ color: isUnlocked ? plant.color : 'var(--color-text-dim)' }}
              >
                {isUnlocked ? plant.rarity : `Unlock at ${plant.minQuests} quests`}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Specimen Detail Modal */}
      <AnimatePresence>
        {selectedPlant && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              className="apple-card p-6 sm:p-8 max-w-md w-full relative overflow-hidden border-2"
              style={{
                borderColor: selectedPlant.isUnlocked ? selectedPlant.color : 'var(--color-surface-border-strong)',
                boxShadow: `0 0 40px ${selectedPlant.color || '#fff'}40`,
              }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <button
                onClick={() => setSelectedPlant(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-[var(--color-surface-panel)] hover:bg-[var(--color-surface-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="text-center mb-6">
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg"
                  style={{
                    backgroundColor: `${selectedPlant.color || '#10b981'}25`,
                    color: selectedPlant.color || '#10b981',
                    boxShadow: `0 0 30px ${selectedPlant.color || '#10b981'}50`,
                  }}
                >
                  <IconRenderer name={selectedPlant.icon} size={38} strokeWidth={2.2} />
                </div>

                <span
                  className="apple-pill text-xs font-bold mb-2"
                  style={{
                    color: selectedPlant.color,
                    borderColor: `${selectedPlant.color}40`,
                    backgroundColor: `${selectedPlant.color}15`,
                  }}
                >
                  {selectedPlant.rarity} Specimen
                </span>

                <h3 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-2">
                  {selectedPlant.name}
                </h3>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-xs mx-auto">
                  {selectedPlant.lore}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[var(--color-surface-panel)] border border-[var(--color-surface-border)] text-xs space-y-2 mb-6">
                <div className="flex items-center justify-between text-[var(--color-text-muted)]">
                  <span>Requirement</span>
                  <span className="font-bold text-[var(--color-text-primary)]">{selectedPlant.minQuests} Quests Completed</span>
                </div>
                <div className="flex items-center justify-between text-[var(--color-text-muted)]">
                  <span>Status</span>
                  <span className={`font-bold ${selectedPlant.isUnlocked ? 'text-emerald-500' : 'text-amber-500'}`}>
                    {selectedPlant.isUnlocked ? 'Flourishing in Sanctuary' : 'Locked in Archive'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedPlant(null)}
                className="joy-btn-primary w-full"
              >
                Close Specimen Card
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Quest Cultivation History */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-muted)]">
            Planted History ({plants.length})
          </h3>
          {plants.length === 0 && (
            <button
              onClick={() => actions.setTab('quest')}
              className="text-xs text-amber-500 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              Start first quest <ArrowUpRight size={13} />
            </button>
          )}
        </div>

        {plants.length === 0 ? (
          <div className="apple-card p-10 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto mb-4 flex items-center justify-center text-emerald-400">
              <Sprout size={28} />
            </div>
            <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-1">
              Your botanical sanctuary is ready
            </h4>
            <p className="text-xs text-[var(--color-text-muted)] max-w-xs mx-auto mb-5">
              Complete a short quest to cultivate your very first living specimen.
            </p>
            <motion.button
              onClick={() => actions.setTab('quest')}
              className="joy-btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Sprout size={15} />
              <span>Cultivate First Specimen</span>
            </motion.button>
          </div>
        ) : (
          <div className="space-y-2">
            {plants.slice().reverse().map((plant, i) => (
              <motion.div
                key={plant.id || i}
                className="apple-card p-3.5 flex items-center justify-between gap-3 hover:bg-[var(--color-surface-card-hover)] transition-all"
                whileHover={{ x: 2 }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 shrink-0">
                    <IconRenderer name={plant.icon || 'Leaf'} size={17} />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs sm:text-sm font-bold text-[var(--color-text-primary)] block truncate">
                      {plant.name || plant.questTitle}
                    </span>
                    <span className="text-[0.6875rem] text-[var(--color-text-muted)] block truncate">
                      {plant.species || plant.category || 'Mindful Bloom'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {plant.rarity && (
                    <span className="apple-pill text-[0.625rem] text-amber-500 border-amber-500/20 bg-amber-500/10 font-bold">
                      {plant.rarity}
                    </span>
                  )}
                  <span className="text-[0.6875rem] text-[var(--color-text-dim)] font-mono">
                    {plant.plantedAt
                      ? new Date(plant.plantedAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Today'}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
