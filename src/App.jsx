'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import QuestTab from './components/QuestTab';
import GardenTab from './components/GardenTab';
import CommunityTab from './components/CommunityTab';
import StatsTab from './components/StatsTab';
import SettingsTab from './components/SettingsTab';
import BackgroundBeams from './components/ui/BackgroundBeams';
import { applyAdaptiveGrid } from './utils/adaptiveGrid';

function AppContent() {
  const { state } = useApp();

  useEffect(() => {
    applyAdaptiveGrid();
    window.addEventListener('resize', applyAdaptiveGrid);

    // Initialize Lenis smooth scroll
    let rafId = null;
    let lenis = null;

    const initLenis = async () => {
      try {
        const module = await import('https://unpkg.com/lenis@1.3.23/dist/lenis.mjs');
        const Lenis = module.default;
        lenis = new Lenis({
          smoothWheel: true,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        window.__lenis = lenis;

        function raf(time) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
        rafId = requestAnimationFrame(raf);
      } catch (e) {
        // Fallback to standard browser smooth scrolling
      }
    };

    initLenis();

    return () => {
      window.removeEventListener('resize', applyAdaptiveGrid);
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        try {
          lenis.destroy();
        } catch (e) {}
      }
    };
  }, []);

  const renderTab = () => {
    switch (state.activeTab) {
      case 'quest':
        return <QuestTab />;
      case 'garden':
        return <GardenTab />;
      case 'community':
        return <CommunityTab />;
      case 'stats':
        return <StatsTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <QuestTab />;
    }
  };

  return (
    <>
      {/* Aceternity Living Background Matrix & Beams */}
      <BackgroundBeams />

      {/* Floating Navigation */}
      <Navbar />

      {/* Main Container */}
      <main className="page-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={state.activeTab}
            initial={{ opacity: 0, y: 12, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-[var(--color-surface-border)] mt-16">
        <div className="max-w-md mx-auto px-4">
          <p className="text-xs text-[var(--color-text-secondary)] font-medium tracking-tight">
            JoyQuest AI &middot; Intentional Wellbeing
          </p>
          <p className="text-[0.6875rem] text-[var(--color-text-muted)] mt-1.5">
            Transforming micro-moments into lasting vitality. Client-side privacy guaranteed.
          </p>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
