'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Loader2, Globe, Mic, Key, Check } from 'lucide-react';
import {
  TTS_LANGUAGES,
  LANGUAGE_VOICES,
  speakText,
  stopTTS,
  isTTSPlaying,
  buildQuestNarration,
} from '../utils/elevenlabs';
import AudioVisualizer from './ui/AudioVisualizer';

/**
 * VoiceNarrator — A mindful TTS control panel for quest cards.
 * Provides authentic multilingual speech in native languages with
 * culturally localized voices (Elvira for Spanish, Swara for Hindi, Denise for French, etc.).
 */
export default function VoiceNarrator({ quest, accentColor = '#10e5aa', soundEnabled = true }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [engineBadge, setEngineBadge] = useState('Studio Neural AI');
  const [selectedLang, setSelectedLang] = useState('en');

  // Available voices for current selected language
  const availableVoices = LANGUAGE_VOICES[selectedLang] || LANGUAGE_VOICES.en;
  const [selectedVoiceId, setSelectedVoiceId] = useState(availableVoices[0].id);

  const [showPanel, setShowPanel] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [customKey, setCustomKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const panelRef = useRef(null);

  // When language changes, auto-select the default native voice of that language
  const handleLanguageChange = (newLang) => {
    setSelectedLang(newLang);
    const newVoices = LANGUAGE_VOICES[newLang] || LANGUAGE_VOICES.en;
    setSelectedVoiceId(newVoices[0].id);
    if (isPlaying) {
      stopTTS();
      setIsPlaying(false);
    }
  };

  // Load custom key from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('joyquest_elevenlabs_key');
      if (saved) setCustomKey(saved);
    } catch (e) {}
  }, []);

  // Close panel on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setShowPanel(false);
      }
    }
    if (showPanel) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showPanel]);

  // Stop playback on unmount
  useEffect(() => {
    return () => stopTTS();
  }, []);

  const currentLang = TTS_LANGUAGES.find((l) => l.id === selectedLang) || TTS_LANGUAGES[0];
  const currentVoice =
    availableVoices.find((v) => v.id === selectedVoiceId) || availableVoices[0];

  const handleSaveKey = () => {
    try {
      if (customKey.trim()) {
        localStorage.setItem('joyquest_elevenlabs_key', customKey.trim());
      } else {
        localStorage.removeItem('joyquest_elevenlabs_key');
      }
      setKeySaved(true);
      setTimeout(() => setKeySaved(false), 2000);
    } catch (e) {}
  };

  const handlePlay = async () => {
    if (!soundEnabled) return;

    // If already playing, toggle stop
    if (isPlaying || isTTSPlaying()) {
      stopTTS();
      setIsPlaying(false);
      return;
    }

    setError(null);
    setIsLoading(true);

    const narration = buildQuestNarration(quest, selectedLang);

    await speakText(narration, {
      voiceId: currentVoice.id,
      language: selectedLang,
      apiKey: customKey.trim() || undefined,
      onStart: () => {
        setIsLoading(false);
        setIsPlaying(true);
      },
      onEnd: () => {
        setIsPlaying(false);
      },
      onError: (errMsg) => {
        setIsLoading(false);
        setIsPlaying(false);
        setError(errMsg);
        setTimeout(() => setError(null), 5000);
      },
      onAudioEngine: (engine) => {
        const isEleven = engine.toLowerCase().includes('eleven');
        setEngineBadge(isEleven ? 'ElevenLabs AI' : `${currentVoice.name} (Studio Neural)`);
      },
    });
  };

  return (
    <div className="relative mt-2 mb-3" ref={panelRef}>
      {/* ─── Compact inline control row ─── */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Main Play / Stop Button */}
        <motion.button
          onClick={handlePlay}
          disabled={isLoading || !soundEnabled}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border select-none ${
            isPlaying
              ? 'text-zinc-950 border-transparent shadow-md font-extrabold'
              : 'bg-[var(--color-surface-panel)] text-[var(--color-text-secondary)] border-[var(--color-surface-border)] hover:border-[var(--color-surface-border-strong)] hover:text-[var(--color-text-primary)]'
          } ${!soundEnabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          style={isPlaying ? { backgroundColor: accentColor, boxShadow: `0 0 16px ${accentColor}50` } : undefined}
          whileHover={!isLoading && soundEnabled ? { scale: 1.02 } : {}}
          whileTap={!isLoading && soundEnabled ? { scale: 0.98 } : {}}
          id="voice-narrator-play-btn"
          aria-label={isPlaying ? 'Stop quest narration' : 'Listen to quest narration'}
        >
          {isLoading ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              <span>Translating & speaking…</span>
            </>
          ) : isPlaying ? (
            <>
              <VolumeX size={14} />
              <span>Stop Audio</span>
            </>
          ) : (
            <>
              <Volume2 size={14} />
              <span>
                Listen ({currentVoice.name}) {currentLang.flag}
              </span>
            </>
          )}
        </motion.button>

        {/* Language / Voice settings toggle */}
        <button
          onClick={() => setShowPanel((p) => !p)}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border select-none ${
            showPanel
              ? 'bg-[var(--color-surface-panel)] text-[var(--color-text-primary)] border-[var(--color-surface-border-strong)]'
              : 'bg-[var(--color-surface-card)] text-[var(--color-text-muted)] border-[var(--color-surface-border)] hover:text-[var(--color-text-secondary)]'
          }`}
          id="voice-narrator-settings-btn"
          aria-expanded={showPanel}
        >
          <Globe size={13} />
          <span>{currentLang.label}</span>
          <span className="text-[var(--color-text-dim)]">·</span>
          <Mic size={12} />
          <span>{currentVoice.name}</span>
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${showPanel ? 'rotate-180' : ''}`}
          />
        </button>

        {/* Real-time dancing audio visualizer */}
        {isPlaying && (
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] shadow-sm">
            <AudioVisualizer isPlaying={true} barCount={4} color="from-teal-400 to-cyan-400" />
            <span className="text-[0.6875rem] font-bold text-[var(--color-text-secondary)]">
              {currentVoice.name} · {currentLang.label}
            </span>
          </div>
        )}
      </div>

      {/* Engine Status Badge */}
      <AnimatePresence>
        {isPlaying && engineBadge && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-500/10 border border-teal-500/25 text-xs text-teal-300 font-semibold w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            <span>Voice: {engineBadge}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error toast */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="mt-2 px-3 py-2 rounded-lg bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-semibold"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Expandable Language & Voice Settings Panel ─── */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 10 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-2xl bg-[var(--color-surface-panel)] border border-[var(--color-surface-border)] shadow-xl"
          >
            <div className="p-4 space-y-4">
              {/* Language Selection Grid */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                    <Globe size={12} />
                    Language ({TTS_LANGUAGES.length} Options)
                  </span>
                  <span className="text-[0.625rem] text-[var(--color-text-dim)] font-medium">
                    Speaks fluently in native tongue
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {TTS_LANGUAGES.map((lang) => {
                    const isActive = selectedLang === lang.id;
                    return (
                      <button
                        key={lang.id}
                        onClick={() => handleLanguageChange(lang.id)}
                        className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer border text-center select-none ${
                          isActive
                            ? 'text-zinc-950 border-transparent shadow-sm'
                            : 'bg-[var(--color-surface-card)] text-[var(--color-text-secondary)] border-[var(--color-surface-border)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-card-hover)]'
                        }`}
                        style={isActive ? { backgroundColor: accentColor } : undefined}
                      >
                        <span className="mr-1">{lang.flag}</span>
                        {lang.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Native Voice Selection for the Selected Language */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.6875rem] font-extrabold uppercase tracking-wider text-[var(--color-text-muted)] flex items-center gap-1.5">
                    <Mic size={12} />
                    {currentLang.label} Native Speakers
                  </span>
                  <span className="text-[0.625rem] text-[var(--color-text-dim)] font-medium">
                    Tailored local voices
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {availableVoices.map((voice) => {
                    const isActive = selectedVoiceId === voice.id;
                    return (
                      <button
                        key={voice.id}
                        onClick={() => {
                          setSelectedVoiceId(voice.id);
                          if (isPlaying) {
                            stopTTS();
                            setIsPlaying(false);
                          }
                        }}
                        className={`py-2 px-2.5 rounded-lg text-left transition-all cursor-pointer border select-none ${
                          isActive
                            ? 'bg-[var(--color-surface-card)] text-[var(--color-text-primary)] border-[var(--color-surface-border-strong)] shadow-sm'
                            : 'bg-[var(--color-surface-card)] text-[var(--color-text-muted)] border-[var(--color-surface-border)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-card-hover)]'
                        }`}
                        style={isActive ? { borderColor: accentColor, boxShadow: `0 0 10px ${accentColor}25` } : undefined}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold">{voice.name}</span>
                          <span className="text-[0.5625rem] px-1.5 py-0.5 rounded bg-[var(--color-surface-panel)] text-[var(--color-text-dim)] uppercase">
                            {voice.gender}
                          </span>
                        </div>
                        <span className="text-[0.625rem] text-[var(--color-text-dim)] block mt-0.5">
                          {voice.style}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional ElevenLabs API Key Configuration */}
              <div className="pt-2 border-t border-[var(--color-surface-border)]">
                <button
                  onClick={() => setShowKeyInput((v) => !v)}
                  className="flex items-center justify-between w-full text-[0.6875rem] font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Key size={11} />
                    ElevenLabs Secret Key (starts with `sk_`)
                  </span>
                  <span className="text-[0.625rem] text-[var(--color-text-dim)]">
                    {showKeyInput ? 'Hide' : customKey ? 'Custom Key Set' : 'Configure'}
                  </span>
                </button>

                {showKeyInput && (
                  <div className="mt-2 space-y-2">
                    <p className="text-[0.625rem] text-[var(--color-text-dim)] leading-relaxed">
                      ElevenLabs secret keys start with <code className="text-teal-400 font-mono">sk_</code>. If empty, the studio neural voice engine produces real human voices automatically.
                    </p>
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        placeholder="sk_..."
                        value={customKey}
                        onChange={(e) => setCustomKey(e.target.value)}
                        className="flex-1 bg-[var(--color-surface-card)] border border-[var(--color-surface-border)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--color-text-primary)] font-mono placeholder:text-[var(--color-text-dim)] focus:outline-none focus:border-teal-400"
                      />
                      <button
                        onClick={handleSaveKey}
                        className="px-3 py-1.5 rounded-lg bg-[var(--color-surface-card)] hover:bg-[var(--color-surface-card-hover)] border border-[var(--color-surface-border)] text-xs font-bold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] flex items-center gap-1 cursor-pointer"
                      >
                        {keySaved ? <Check size={12} className="text-teal-400" /> : null}
                        <span>{keySaved ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
