'use client';

import { createContext, useContext, useReducer, useEffect, useCallback, useState } from 'react';
import { SEED_MESSAGES, GARDEN_PLANTS } from '../data/quests';
import { applyMoodTheme } from '../utils/theme';

const STORAGE_KEY = 'joyquest-state';

// ─── Initial State ───
const defaultState = {
  // User progress
  totalPoints: 0,
  questsCompleted: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastCompletedDate: null,

  // Garden
  gardenPlants: [],

  // Quest history
  completedQuests: [],

  // Community messages
  communityMessages: [...SEED_MESSAGES],

  // Current quest session
  currentQuest: null,
  questStartTime: null,

  // User preferences
  selectedMood: null,
  selectedTime: null,
  selectedCategory: null,

  // Settings
  apiKey: '',
  soundEnabled: true,
  theme: 'dark', // 'dark' | 'light'

  // UI state
  showConfetti: false,
  activeTab: 'quest', // quest | garden | community | stats
};

// ─── Actions ───
const ACTIONS = {
  INIT_SAVED_STATE: 'INIT_SAVED_STATE',
  SET_MOOD: 'SET_MOOD',
  SET_TIME: 'SET_TIME',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_QUEST: 'SET_QUEST',
  COMPLETE_QUEST: 'COMPLETE_QUEST',
  SKIP_QUEST: 'SKIP_QUEST',
  ADD_MESSAGE: 'ADD_MESSAGE',
  LIKE_MESSAGE: 'LIKE_MESSAGE',
  SET_API_KEY: 'SET_API_KEY',
  SET_TAB: 'SET_TAB',
  TOGGLE_SOUND: 'TOGGLE_SOUND',
  TOGGLE_THEME: 'TOGGLE_THEME',
  SET_THEME: 'SET_THEME',
  SHOW_CONFETTI: 'SHOW_CONFETTI',
  HIDE_CONFETTI: 'HIDE_CONFETTI',
  RESET_SELECTION: 'RESET_SELECTION',
};

// ─── Reducer ───
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.INIT_SAVED_STATE:
      return {
        ...state,
        ...action.payload,
        currentQuest: null,
        questStartTime: null,
        showConfetti: false,
        selectedMood: null,
        selectedTime: null,
        selectedCategory: null,
      };

    case ACTIONS.SET_MOOD:
      return { ...state, selectedMood: action.payload };

    case ACTIONS.SET_TIME:
      return { ...state, selectedTime: action.payload };

    case ACTIONS.SET_CATEGORY:
      return { ...state, selectedCategory: action.payload };

    case ACTIONS.SET_QUEST:
      return {
        ...state,
        currentQuest: action.payload,
        questStartTime: Date.now(),
      };

    case ACTIONS.COMPLETE_QUEST: {
      const quest = state.currentQuest;
      if (!quest) return state;

      const today = new Date().toDateString();
      const lastDate = state.lastCompletedDate;
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      let newStreak = state.currentStreak;
      if (lastDate === yesterday || lastDate === null) {
        newStreak += 1;
      } else if (lastDate !== today) {
        newStreak = 1;
      }

      const newQuestsCompleted = state.questsCompleted + 1;

      // Determine garden plant
      const availablePlants = GARDEN_PLANTS.filter(p => p.minQuests <= newQuestsCompleted);
      const milestonePlant = availablePlants[availablePlants.length - 1];
      const newGardenPlants = [...state.gardenPlants];
      
      if (milestonePlant && !newGardenPlants.find(p => p.name === milestonePlant.name)) {
        newGardenPlants.push({
          id: `milestone-${milestonePlant.id}-${Date.now()}`,
          icon: milestonePlant.icon,
          name: milestonePlant.name,
          species: milestonePlant.name,
          rarity: milestonePlant.rarity,
          plantedAt: Date.now(),
          questTitle: quest.title,
          category: quest.category,
          isMilestone: true,
        });
      }

      // Add botanical specimen for this completed quest
      const categoryPlant = getPlantForCategory(quest.category);
      newGardenPlants.push({
        id: `quest-plant-${Date.now()}`,
        icon: categoryPlant.icon,
        name: quest.title,
        species: categoryPlant.type,
        rarity: categoryPlant.rarity,
        plantedAt: Date.now(),
        questTitle: quest.title,
        category: quest.category,
      });

      return {
        ...state,
        totalPoints: state.totalPoints + (quest.points || 45),
        questsCompleted: newQuestsCompleted,
        currentStreak: newStreak,
        longestStreak: Math.max(state.longestStreak, newStreak),
        lastCompletedDate: today,
        gardenPlants: newGardenPlants,
        completedQuests: [
          { ...quest, completedAt: Date.now() },
          ...state.completedQuests,
        ].slice(0, 50), // Keep last 50
        currentQuest: null,
        questStartTime: null,
        showConfetti: true,
      };
    }

    case ACTIONS.SKIP_QUEST:
      return {
        ...state,
        currentQuest: null,
        questStartTime: null,
      };

    case ACTIONS.ADD_MESSAGE:
      return {
        ...state,
        communityMessages: [
          {
            text: action.payload.text,
            author: action.payload.author || 'Anonymous Questor',
            likes: 0,
            timestamp: Date.now(),
          },
          ...state.communityMessages,
        ].slice(0, 50),
      };

    case ACTIONS.LIKE_MESSAGE:
      return {
        ...state,
        communityMessages: state.communityMessages.map((msg, idx) =>
          idx === action.payload ? { ...msg, likes: msg.likes + 1 } : msg
        ),
      };

    case ACTIONS.SET_API_KEY:
      return { ...state, apiKey: action.payload };

    case ACTIONS.SET_TAB:
      return { ...state, activeTab: action.payload };

    case ACTIONS.TOGGLE_SOUND:
      return { ...state, soundEnabled: !state.soundEnabled };

    case ACTIONS.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'dark' ? 'light' : 'dark' };

    case ACTIONS.SET_THEME:
      return { ...state, theme: action.payload };

    case ACTIONS.SHOW_CONFETTI:
      return { ...state, showConfetti: true };

    case ACTIONS.HIDE_CONFETTI:
      return { ...state, showConfetti: false };

    case ACTIONS.RESET_SELECTION:
      return {
        ...state,
        selectedMood: null,
        selectedTime: null,
        selectedCategory: null,
        currentQuest: null,
        questStartTime: null,
      };

    default:
      return state;
  }
}

function getPlantForCategory(category) {
  const map = {
    creativity: { icon: 'Sparkles', type: 'Prismatic Flora', rarity: 'Exquisite' },
    movement: { icon: 'Activity', type: 'Kinetic Bloom', rarity: 'Uncommon' },
    kindness: { icon: 'Heart', type: 'Heartwood Blossom', rarity: 'Rare' },
    reflection: { icon: 'Moon', type: 'Zen Lotus', rarity: 'Rare' },
    nature: { icon: 'Leaf', type: 'Emerald Frond', rarity: 'Standard' },
    social: { icon: 'Users', type: 'Harmony Grove', rarity: 'Uncommon' },
  };
  return map[category] || { icon: 'Sprout', type: 'Silver Sprout', rarity: 'Standard' };
}

// ─── Context ───
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, defaultState);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted state on client mount (safe for Next.js SSR)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: ACTIONS.INIT_SAVED_STATE, payload: parsed });
      }
    } catch (e) {
      console.warn('Failed to load state:', e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist state (only after initial hydration)
  useEffect(() => {
    if (!isHydrated) return;
    const toSave = { ...state };
    // Don't persist transient state
    delete toSave.showConfetti;
    delete toSave.currentQuest;
    delete toSave.questStartTime;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch (e) {
      console.warn('Failed to save state:', e);
    }
  }, [state, isHydrated]);

  // Auto-hide confetti
  useEffect(() => {
    if (state.showConfetti) {
      const timer = setTimeout(() => {
        dispatch({ type: ACTIONS.HIDE_CONFETTI });
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [state.showConfetti]);

  // Sync theme and dynamic mood theme with HTML document element
  useEffect(() => {
    const currentTheme = state.theme || 'dark';
    const currentMood = state.selectedMood || 'happy';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
    applyMoodTheme(currentMood, currentTheme === 'light');
  }, [state.theme, state.selectedMood]);

  const actions = {
    setMood: useCallback((mood) => dispatch({ type: ACTIONS.SET_MOOD, payload: mood }), []),
    setTime: useCallback((time) => dispatch({ type: ACTIONS.SET_TIME, payload: time }), []),
    setCategory: useCallback((cat) => dispatch({ type: ACTIONS.SET_CATEGORY, payload: cat }), []),
    setQuest: useCallback((quest) => dispatch({ type: ACTIONS.SET_QUEST, payload: quest }), []),
    completeQuest: useCallback(() => dispatch({ type: ACTIONS.COMPLETE_QUEST }), []),
    skipQuest: useCallback(() => dispatch({ type: ACTIONS.SKIP_QUEST }), []),
    addMessage: useCallback((msg) => dispatch({ type: ACTIONS.ADD_MESSAGE, payload: msg }), []),
    likeMessage: useCallback((idx) => dispatch({ type: ACTIONS.LIKE_MESSAGE, payload: idx }), []),
    setApiKey: useCallback((key) => dispatch({ type: ACTIONS.SET_API_KEY, payload: key }), []),
    setTab: useCallback((tab) => dispatch({ type: ACTIONS.SET_TAB, payload: tab }), []),
    toggleSound: useCallback(() => dispatch({ type: ACTIONS.TOGGLE_SOUND }), []),
    toggleTheme: useCallback(() => dispatch({ type: ACTIONS.TOGGLE_THEME }), []),
    setTheme: useCallback((t) => dispatch({ type: ACTIONS.SET_THEME, payload: t }), []),
    showConfetti: useCallback(() => dispatch({ type: ACTIONS.SHOW_CONFETTI }), []),
    hideConfetti: useCallback(() => dispatch({ type: ACTIONS.HIDE_CONFETTI }), []),
    resetSelection: useCallback(() => dispatch({ type: ACTIONS.RESET_SELECTION }), []),
  };

  return (
    <AppContext.Provider value={{ state, actions }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
