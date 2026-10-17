'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Send, MessageSquare, Plus, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { playClickSound, playStepSound } from '../utils/audio';
import { triggerMiniSparkle } from '../utils/confetti';
import { CATEGORIES } from '../data/quests';

export default function CommunityTab() {
  const { state, actions } = useApp();
  const [newMessage, setNewMessage] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [selectedCat, setSelectedCat] = useState('kindness');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [heartBursts, setHeartBursts] = useState([]); // Array of { id, msgIndex, particles: [...] }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    playStepSound(state.soundEnabled);
    triggerMiniSparkle(e);

    actions.addMessage({
      text: newMessage.trim(),
      author: authorName.trim() || 'Anonymous Questor',
      category: selectedCat,
    });

    setNewMessage('');
    setShowForm(false);
  };

  const handleLike = (index, e) => {
    playStepSound(state.soundEnabled);
    triggerMiniSparkle(e);
    actions.likeMessage(index);

    // Spawn 6 floating heart particles that spring upward and fade
    const burstId = Date.now();
    const particles = Array.from({ length: 6 }, (_, pIdx) => ({
      id: `${burstId}-${pIdx}`,
      x: (Math.random() - 0.5) * 48,
      y: -(35 + Math.random() * 35),
      scale: 0.7 + Math.random() * 0.5,
      rotate: (Math.random() - 0.5) * 30,
    }));

    setHeartBursts((prev) => [...prev, { burstId, msgIndex: index, particles }]);
    setTimeout(() => {
      setHeartBursts((prev) => prev.filter((b) => b.burstId !== burstId));
    }, 1200);
  };

  const formatTime = (timestamp) => {
    const diff = Date.now() - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const filteredMessages = state.communityMessages.filter((msg) => {
    if (activeFilter === 'all') return true;
    return msg.category === activeFilter;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-xs font-semibold text-cyan-400 mb-3 shadow-[0_0_20px_-3px_rgba(6,182,212,0.2)]"
          whileHover={{ scale: 1.04 }}
        >
          <MessageSquare size={13} className="text-cyan-400" />
          <span>Joy Community Wall</span>
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--color-text-primary)] mb-2">
          Shared Human Moments
        </h2>
        <p className="text-xs sm:text-sm text-[var(--color-text-muted)] max-w-sm mx-auto">
          Read genuine sparks of peace and encouragement left by fellow questors.
        </p>
      </div>

      {/* Composer Trigger / Form */}
      <div className="mb-6">
        <AnimatePresence mode="wait">
          {showForm ? (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="apple-card p-5 sm:p-6 border-cyan-500/30 shadow-[0_8px_30px_rgba(6,182,212,0.12)]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">
                  Post a Thought to the Wall
                </span>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="p-1 rounded-full text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-border)] cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3.5 mb-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share a small action that gave you energy or peace today..."
                  rows={3}
                  maxLength={240}
                  className="apple-input resize-none"
                  id="message-input"
                  autoFocus
                />

                {/* Category Tags in Composer */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[0.6875rem] text-[var(--color-text-muted)] mr-1">Tag:</span>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCat(cat.id)}
                      className={`px-2.5 py-1 rounded-full text-[0.6875rem] font-bold transition-all border cursor-pointer ${
                        selectedCat === cat.id
                          ? 'text-zinc-950 border-transparent shadow-sm'
                          : 'text-[var(--color-text-muted)] border-[var(--color-surface-border)] hover:text-[var(--color-text-primary)]'
                      }`}
                      style={{
                        backgroundColor: selectedCat === cat.id ? cat.color : 'transparent',
                      }}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Your name or handle (optional)"
                    maxLength={24}
                    className="apple-input max-w-[240px] text-xs py-2"
                    id="author-input"
                  />
                  <span className="text-[0.6875rem] text-[var(--color-text-dim)] font-mono">
                    {newMessage.length}/240
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[var(--color-surface-border)]">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="joy-btn-ghost text-xs"
                >
                  Cancel
                </button>
                <motion.button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="joy-btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  id="send-message-btn"
                >
                  <Send size={14} />
                  <span>Share Note</span>
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.button
              onClick={() => {
                playClickSound(state.soundEnabled);
                setShowForm(true);
              }}
              className="apple-card-interactive w-full p-4 flex items-center justify-between text-left group border-cyan-500/25 bg-cyan-500/5 hover:border-cyan-500/40"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              id="show-message-form-btn"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 transition-transform group-hover:scale-110">
                  <Plus size={18} />
                </div>
                <div>
                  <span className="text-sm font-bold text-[var(--color-text-primary)] block">
                    Leave a joyful reflection or note
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)] block">
                    No account required &bull; Inspire a fellow human today
                  </span>
                </div>
              </div>
              <span className="joy-btn-primary text-xs py-1.5 px-3.5">
                Leave a Ripple
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        <button
          onClick={() => {
            playClickSound(state.soundEnabled);
            setActiveFilter('all');
          }}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] border-transparent shadow-sm'
              : 'bg-[var(--color-surface-panel)] text-[var(--color-text-muted)] border-[var(--color-surface-border)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          All Notes ({state.communityMessages.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              playClickSound(state.soundEnabled);
              setActiveFilter(cat.id);
            }}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              activeFilter === cat.id
                ? 'text-zinc-950 border-transparent shadow-sm'
                : 'bg-[var(--color-surface-panel)] text-[var(--color-text-muted)] border-[var(--color-surface-border)] hover:text-[var(--color-text-primary)]'
            }`}
            style={{
              backgroundColor: activeFilter === cat.id ? cat.color : undefined,
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Messages Feed in 2-Column Responsive Grid on Desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredMessages.map((msg, i) => {
          const cat = CATEGORIES.find((c) => c.id === msg.category) || CATEGORIES[2];
          const activeBurst = heartBursts.find((b) => b.msgIndex === i);

          return (
            <motion.div
              key={i}
              className="apple-card p-4 sm:p-5 flex flex-col justify-between group hover:bg-[var(--color-surface-card-hover)] transition-all relative overflow-visible"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <div>
                <div className="flex items-center gap-2 mb-2.5">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[0.625rem] font-bold text-white shadow-sm shrink-0"
                    style={{ backgroundColor: cat.color }}
                  >
                    {msg.author ? msg.author[0].toUpperCase() : 'Q'}
                  </div>
                  <span className="text-xs font-bold text-[var(--color-text-primary)] truncate max-w-[140px]">{msg.author}</span>
                  <span className="text-[0.6875rem] text-[var(--color-text-dim)] font-mono">
                    &bull; {formatTime(msg.timestamp)}
                  </span>
                  <span
                    className="apple-pill text-[0.625rem] font-bold ml-auto"
                    style={{
                      color: cat.color,
                      borderColor: `${cat.color}35`,
                      backgroundColor: `${cat.color}15`,
                    }}
                  >
                    {cat.label}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed font-normal mb-4">
                  &ldquo;{msg.text}&rdquo;
                </p>
              </div>

              <div className="flex items-center justify-end pt-2 border-t border-[var(--color-surface-border-subtle)] relative">
                {/* Floating 6-Heart Burst Particles */}
                {activeBurst && (
                  <div className="absolute right-4 bottom-8 pointer-events-none z-30">
                    {activeBurst.particles.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 1, x: 0, y: 0, scale: p.scale }}
                        animate={{ opacity: 0, x: p.x, y: p.y, rotate: p.rotate }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute text-rose-500 font-bold"
                      >
                        <Heart size={14} className="fill-current text-rose-500" />
                      </motion.div>
                    ))}
                  </div>
                )}

                <motion.button
                  onClick={(e) => handleLike(i, e)}
                  className="apple-pill hover:bg-rose-500/20 active:scale-90 transition-all cursor-pointer border border-rose-500/25 bg-rose-500/10 text-rose-400 py-1 px-2.5 relative"
                  whileTap={{ scale: 1.25 }}
                  id={`like-btn-${i}`}
                  title="Resonate with this reflection"
                >
                  <Heart
                    size={13}
                    strokeWidth={2.4}
                    className={msg.likes > 0 ? 'text-rose-500 fill-rose-500' : 'text-[var(--color-text-muted)]'}
                  />
                  <span className="font-mono text-xs font-bold">{msg.likes}</span>
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
