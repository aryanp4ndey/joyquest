/**
 * Quest data, fallback activities, and the quest generation engine.
 * Provides structured quest recommendations based on mood, time, and category.
 */

// ─── Mood Definitions matching Reference Palette ───
export const MOODS = [
  {
    id: 'happy',
    icon: 'Sun',
    label: 'Happy',
    tagline: 'Radiant & Joyful',
    color: '#ff70b8',
    cardBg: '#ffe8f3',
    glow: 'rgba(255, 112, 184, 0.35)',
    border: 'hover:border-pink-400',
    selectedBorder: 'border-pink-500',
    selectedGlow: '0 0 24px -4px rgba(255, 112, 184, 0.5)',
  },
  {
    id: 'calm',
    icon: 'Waves',
    label: 'Calm',
    tagline: 'Serene & Peaceful',
    color: '#10e5aa',
    cardBg: '#dffaf3',
    glow: 'rgba(16, 229, 170, 0.35)',
    border: 'hover:border-teal-400',
    selectedBorder: 'border-teal-400',
    selectedGlow: '0 0 24px -4px rgba(16, 229, 170, 0.5)',
  },
  {
    id: 'energetic',
    icon: 'Zap',
    label: 'Energetic',
    tagline: 'Dynamic & Driven',
    color: '#ff9233',
    cardBg: '#fff0e5',
    glow: 'rgba(255, 146, 51, 0.35)',
    border: 'hover:border-orange-400',
    selectedBorder: 'border-orange-400',
    selectedGlow: '0 0 24px -4px rgba(255, 146, 51, 0.5)',
  },
  {
    id: 'reflective',
    icon: 'Moon',
    label: 'Reflective',
    tagline: 'Deep & Introspective',
    color: '#a78bfa',
    cardBg: '#f3e8ff',
    glow: 'rgba(167, 139, 250, 0.35)',
    border: 'hover:border-violet-400',
    selectedBorder: 'border-violet-400',
    selectedGlow: '0 0 24px -4px rgba(167, 139, 250, 0.5)',
  },
  {
    id: 'stressed',
    icon: 'Feather',
    label: 'Stressed',
    tagline: 'Seeking Gentle Relief',
    color: '#fb7185',
    cardBg: '#ffe4e6',
    glow: 'rgba(251, 113, 133, 0.35)',
    border: 'hover:border-rose-400',
    selectedBorder: 'border-rose-400',
    selectedGlow: '0 0 24px -4px rgba(251, 113, 133, 0.5)',
  },
  {
    id: 'grateful',
    icon: 'Heart',
    label: 'Grateful',
    tagline: 'Full & Appreciative',
    color: '#f59e0b',
    cardBg: '#fef3c7',
    glow: 'rgba(245, 158, 11, 0.35)',
    border: 'hover:border-amber-400',
    selectedBorder: 'border-amber-400',
    selectedGlow: '0 0 24px -4px rgba(245, 158, 11, 0.5)',
  },
  {
    id: 'creative',
    icon: 'Sparkles',
    label: 'Creative',
    tagline: 'Curious & Inspired',
    color: '#c084fc',
    cardBg: '#fae8ff',
    glow: 'rgba(192, 132, 252, 0.35)',
    border: 'hover:border-purple-400',
    selectedBorder: 'border-purple-400',
    selectedGlow: '0 0 24px -4px rgba(192, 132, 252, 0.5)',
  },
  {
    id: 'lonely',
    icon: 'Users',
    label: 'Lonely',
    tagline: 'Reaching for Warmth',
    color: '#38bdf8',
    cardBg: '#e0f2fe',
    glow: 'rgba(56, 189, 248, 0.35)',
    border: 'hover:border-sky-400',
    selectedBorder: 'border-sky-400',
    selectedGlow: '0 0 24px -4px rgba(56, 189, 248, 0.5)',
  },
];

// ─── Worry / Need Selection Tags (matching "What's worrying you?" screen) ───
export const WORRY_TAGS = [
  { id: 'anxiety', label: 'Anxiety', color: '#67e8f9', category: 'reflection' },
  { id: 'stress', label: 'Stress', color: '#ff70b8', category: 'movement' },
  { id: 'sleepiness', label: 'Sleepiness', color: '#a78bfa', category: 'reflection' },
  { id: 'sadness', label: 'Sadness', color: '#60a5fa', category: 'kindness' },
  { id: 'loneliness', label: 'Loneliness', color: '#38bdf8', category: 'social' },
  { id: 'insomnia', label: 'Insomnia', color: '#c084fc', category: 'reflection' },
  { id: 'anger', label: 'Anger', color: '#f87171', category: 'movement' },
  { id: 'apathy', label: 'Apathy', color: '#7eeded', category: 'creativity' },
  { id: 'overthinking', label: 'Overthinking', color: '#facc15', category: 'nature' },
  { id: 'burnout', label: 'Burnout', color: '#fb7185', category: 'reflection' },
  { id: 'envy', label: 'Envy', color: '#fbbf24', category: 'kindness' },
  { id: 'other', label: 'Other', color: '#a3e635', category: 'creativity' },
];

// ─── Time Ranges (Matching Master Specification) ───
export const TIME_OPTIONS = [
  { id: '3min', label: '3 min', minutes: 3, icon: 'Zap', desc: 'Micro-breath', color: '#f59e0b' },
  { id: '5min', label: '5 min', minutes: 5, icon: 'Clock', desc: 'Quick reset', color: '#06b6d4' },
  { id: '10min', label: '10 min', minutes: 10, icon: 'Timer', desc: 'Deep pause', color: '#8b5cf6' },
  { id: '15min', label: '15 min', minutes: 15, icon: 'Hourglass', desc: 'Transformative quest', color: '#10b981' },
];

// ─── Activity Mode Chips (Multi-select) ───
export const ACTIVITY_MODES = [
  { id: 'reflection', label: 'Mindfulness', icon: 'Feather', color: '#10e5aa' },
  { id: 'movement', label: 'Physical Stretch', icon: 'Zap', color: '#ff9f43' },
  { id: 'kindness', label: 'Kindness Outreach', icon: 'Heart', color: '#ff70b8' },
  { id: 'creativity', label: 'Creative Flow', icon: 'Sparkles', color: '#c084fc' },
  { id: 'nature', label: 'Nature Connection', icon: 'Leaf', color: '#38bdf8' },
];

// ─── Curated Practices (Matching the Center Home Screen in Reference) ───
export const CURATED_PRACTICES = [
  {
    id: 'emotional-balance',
    title: 'Emotional Balance',
    description: 'Ground yourself in emotional steadiness through slow rhythmic breathing and gentle self-compassion.',
    steps: [
      'Take 3 slow abdominal breaths: inhale for 4 seconds, exhale for 6 seconds',
      'Notice any tension in your shoulders or forehead, and gently soften those areas',
      'Silently acknowledge your present state: "It is okay to pause and be right here"',
      'Place a hand over your heart and rest in steady, calm awareness for 1 minute',
    ],
    reward: 'Centered Soul',
    points: 25,
    duration: '15 min',
    category: 'reflection',
    color: '#0e1017',
    textColor: '#ffffff',
    playColor: '#67e8f9',
    type: 'dark',
  },
  {
    id: 'calm-relaxation',
    title: 'Calm Relaxation',
    description: 'Unwind mental tension and let your nervous system transition into tranquil rest and ease.',
    steps: [
      'Soften your gaze or close your eyes and listen to the subtle room sounds around you',
      'Inhale deeply through your nose, feeling the cool breath expand your ribs',
      'Exhale slowly through your mouth, letting heavy thoughts melt away',
      'Repeat 5 mindful breathing cycles, savoring the stillness between each breath',
    ],
    reward: 'Tranquil Mind',
    points: 20,
    duration: '12 min',
    category: 'nature',
    color: '#ffffff',
    textColor: '#111218',
    playColor: '#10e5aa',
    type: 'light',
  },
  {
    id: 'morning-gratitude',
    title: 'Morning Gratitude & Wonder',
    description: 'Anchor your awareness in warmth and ease by honoring 3 specific blessings right now.',
    steps: [
      'Name 1 simple physical comfort you enjoyed today (warm water, a cozy bed, morning air)',
      'Recall 1 person whose presence, kindness, or memory brings ease to your heart',
      'Acknowledge 1 small effort or strength you displayed recently',
      'Take 3 slow breaths, allowing quiet appreciation to settle into your body',
    ],
    reward: 'Morning Light',
    points: 25,
    duration: '5 min',
    period: 'Morning',
    category: 'kindness',
    bg: '#7eeded',
    color: '#0891b2',
    textColor: '#ffffff',
    playColor: '#111218',
  },
  {
    id: 'serenity-before-sleep',
    title: 'Serenity Before Sleep',
    description: 'Release the day completely and invite restorative, peaceful rest for your body and mind.',
    steps: [
      'Disconnect from screens and sit or lie in a comfortable, relaxed position',
      'Take 4 deep cleansing breaths, extending each exhale longer than the inhale',
      'Mentally release today’s unfinished tasks: "Today is complete, tomorrow is a new canvas"',
      'Close your eyes and focus on the quiet heaviness of your resting body',
    ],
    reward: 'Starlight Peace',
    points: 20,
    duration: '10 min',
    period: 'Evening',
    category: 'reflection',
    bg: '#ffffff',
    textColor: '#111218',
    playColor: '#7eeded',
  },
];

// ─── Quest Categories ───
export const CATEGORIES = [
  {
    id: 'creativity',
    label: 'Creativity',
    icon: 'Palette',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.25)',
    accentBg: 'bg-pink-500/15',
    accentText: 'text-pink-300',
    desc: 'Creative expression & spontaneous art',
  },
  {
    id: 'movement',
    label: 'Movement',
    icon: 'Activity',
    color: '#f97316',
    glow: 'rgba(249, 115, 22, 0.25)',
    accentBg: 'bg-orange-500/15',
    accentText: 'text-orange-300',
    desc: 'Gentle physical stretch & kinetic burst',
  },
  {
    id: 'kindness',
    label: 'Kindness',
    icon: 'HeartHandshake',
    color: '#f43f5e',
    glow: 'rgba(244, 63, 94, 0.25)',
    accentBg: 'bg-rose-500/15',
    accentText: 'text-rose-300',
    desc: 'Spreading sincere warmth & uplifting others',
  },
  {
    id: 'reflection',
    label: 'Reflection',
    icon: 'BookOpen',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.25)',
    accentBg: 'bg-violet-500/15',
    accentText: 'text-violet-300',
    desc: 'Breathwork, presence & mindful grounding',
  },
  {
    id: 'nature',
    label: 'Nature',
    icon: 'Leaf',
    color: '#10b981',
    glow: 'rgba(16, 185, 129, 0.25)',
    accentBg: 'bg-emerald-500/15',
    accentText: 'text-emerald-300',
    desc: 'Natural observation & sensory awareness',
  },
  {
    id: 'social',
    label: 'Social',
    icon: 'MessageSquare',
    color: '#0ea5e9',
    glow: 'rgba(14, 165, 233, 0.25)',
    accentBg: 'bg-sky-500/15',
    accentText: 'text-sky-300',
    desc: 'Meaningful human exchange & listening',
  },
];

// ─── Garden Plants (Botanical Sanctuary with Rich Lore) ───
export const GARDEN_PLANTS = [
  {
    id: 'sprout',
    name: 'Silver Sprout',
    icon: 'Sprout',
    minQuests: 0,
    rarity: 'Common',
    color: '#10b981',
    lore: 'The initial shoot of mindfulness. A tiny, resilient green sprout that marks the beginning of intentional living.',
  },
  {
    id: 'bloom',
    name: 'Cherry Blossom',
    icon: 'Flower2',
    minQuests: 2,
    rarity: 'Common',
    color: '#f472b6',
    lore: 'Symbolizes the fleeting beauty of the present moment and the gentle power of slowing down.',
  },
  {
    id: 'sunflower',
    name: 'Solar Bloom',
    icon: 'Sun',
    minQuests: 4,
    rarity: 'Uncommon',
    color: '#fbbf24',
    lore: 'Follows internal light and vitality. Unlocks when you cultivate daily kinetic energy and warmth.',
  },
  {
    id: 'rose',
    name: 'Crimson Rose',
    icon: 'Flower',
    minQuests: 6,
    rarity: 'Uncommon',
    color: '#fb7185',
    lore: 'Nurtured by acts of kindness toward others. Its crimson leaves radiate empathy.',
  },
  {
    id: 'lotus',
    name: 'Zen Lotus',
    icon: 'Sparkles',
    minQuests: 8,
    rarity: 'Rare',
    color: '#c084fc',
    lore: 'Rises above everyday mental chatter to bloom in pristine stillness. A badge of tranquil reflection.',
  },
  {
    id: 'foliage',
    name: 'Emerald Frond',
    icon: 'Leaf',
    minQuests: 10,
    rarity: 'Rare',
    color: '#34d399',
    lore: 'Found only in sanctuaries that respect the natural rhythm of day and night.',
  },
  {
    id: 'bamboo',
    name: 'Golden Bamboo',
    icon: 'Trees',
    minQuests: 12,
    rarity: 'Flourishing',
    color: '#f59e0b',
    lore: 'Bends gracefully in turbulent winds without breaking. An emblem of mental flexibility.',
  },
  {
    id: 'pine',
    name: 'Evergreen Pine',
    icon: 'TreePine',
    minQuests: 15,
    rarity: 'Flourishing',
    color: '#059669',
    lore: 'Stands vibrant through all seasons. Represents consistency that outlasts fluctuating motivation.',
  },
  {
    id: 'oak',
    name: 'Great Oak',
    icon: 'Trees',
    minQuests: 20,
    rarity: 'Sanctuary',
    color: '#d97706',
    lore: 'Deep roots anchored in gratitude. Provides shelter, shade, and grounded calm.',
  },
  {
    id: 'celestial',
    name: 'Celestial Orchid',
    icon: 'Sparkles',
    minQuests: 25,
    rarity: 'Legendary',
    color: '#818cf8',
    lore: 'A mythical bloom radiating cosmic violet hues. Flourishes only in minds that practice daily joy.',
  },
];

// ─── Fallback Quest Database ───
const FALLBACK_QUESTS = {
  creativity: {
    happy: [
      {
        title: 'Doodle Your Joy',
        description: 'Draw something that makes you smile — no artistic skill needed! It can be abstract, silly, or a memory.',
        steps: ['Grab a pen and paper (or open a drawing app)', 'Set a 2-minute timer', 'Draw whatever comes to mind — no erasing!', 'Give your doodle a funny name'],
        reward: 'Creative Spark',
        points: 15,
      },
      {
        title: 'Happiness Haiku',
        description: 'Write a tiny haiku (5-7-5 syllables) about what\'s making you happy right now.',
        steps: ['Think of one thing making you happy', 'Write a 3-line poem: 5 syllables, 7 syllables, 5 syllables', 'Read it aloud with a smile'],
        reward: 'Word Weaver',
        points: 15,
      },
    ],
    calm: [
      {
        title: 'Peaceful Pattern',
        description: 'Draw repetitive, soothing patterns — circles, waves, or spirals. Let your hand flow.',
        steps: ['Find paper or a drawing surface', 'Start with a simple shape', 'Repeat it, varying size and spacing', 'Fill the page at your own pace'],
        reward: 'Pattern Master',
        points: 15,
      },
    ],
    energetic: [
      {
        title: 'Speed Sketch Challenge',
        description: 'Draw 5 things around you in 30 seconds each. Quick, messy, and fun!',
        steps: ['Look around and pick 5 objects', 'Set a 30-second timer for each', 'Sketch fast — imperfection is the point!', 'Compare your sketches and laugh'],
        reward: 'Speed Artist',
        points: 20,
      },
    ],
    reflective: [
      {
        title: 'Memory Mandala',
        description: 'Create a simple mandala with symbols representing meaningful moments from your week.',
        steps: ['Draw a circle in the center of your paper', 'Think of 4-6 moments from this week', 'Add a symbol for each around the circle', 'Connect them with patterns'],
        reward: 'Mandala Maker',
        points: 20,
      },
    ],
    stressed: [
      {
        title: 'Tear & Create',
        description: 'Tear paper into pieces, then arrange them into something beautiful. Transform tension into art.',
        steps: ['Grab scrap paper or old magazine pages', 'Tear them into pieces (yes, it\'s satisfying!)', 'Arrange the pieces into a collage', 'Step back and admire your creation'],
        reward: 'Stress Transformer',
        points: 20,
      },
    ],
    grateful: [
      {
        title: 'Thank-You Sketch',
        description: 'Draw a small illustration of something you\'re grateful for today.',
        steps: ['Think of something you appreciate', 'Sketch it, adding colorful details', 'Write one sentence about why it matters', 'Share it with someone or keep it as a reminder'],
        reward: 'Gratitude Artist',
        points: 15,
      },
    ],
    creative: [
      {
        title: 'Exquisite Corpse Solo',
        description: 'Fold your paper into 3 sections. Draw a head, fold, draw a body, fold, draw legs — then reveal!',
        steps: ['Fold paper into thirds', 'Draw a head on the top section', 'Fold it over and draw a body', 'Fold again, draw legs, then unfold!'],
        reward: 'Surrealist',
        points: 20,
      },
    ],
    lonely: [
      {
        title: 'Letter Doodle',
        description: 'Draw a decorative border on a letter or message to someone you haven\'t talked to in a while.',
        steps: ['Think of someone you miss', 'Write them a short, heartfelt note', 'Decorate the borders with doodles', 'Send it or keep it as a reminder to reach out'],
        reward: 'Connection Creator',
        points: 20,
      },
    ],
  },
  movement: {
    happy: [
      {
        title: 'Victory Dance',
        description: 'Put on your favorite song and dance like nobody\'s watching for 2 minutes straight!',
        steps: ['Pick a song that makes you move', 'Clear a small space', 'Dance freely for the full song', 'End with a power pose!'],
        reward: 'Dance Champion',
        points: 15,
      },
    ],
    calm: [
      {
        title: 'Gentle Stretches',
        description: 'Do 5 slow, intentional stretches. Hold each for 30 seconds and breathe deeply.',
        steps: ['Stand up and take a deep breath', 'Reach for the sky, then touch your toes', 'Do gentle neck rolls in both directions', 'Stretch your arms across your chest', 'Finish with a full-body shake-out'],
        reward: 'Flexibility Flow',
        points: 15,
      },
    ],
    energetic: [
      {
        title: 'Power Burst',
        description: '10 jumping jacks, 10 squats, 10 high knees — repeat twice. Feel the energy!',
        steps: ['Warm up with arm circles', '10 jumping jacks', '10 bodyweight squats', '10 high knees', 'Repeat the set once more!'],
        reward: 'Energy Burst',
        points: 25,
      },
    ],
    stressed: [
      {
        title: 'Tension Release Walk',
        description: 'Take a short walk — even around your room. With each step, imagine releasing one worry.',
        steps: ['Stand up and take 3 deep breaths', 'Walk slowly and deliberately', 'With each step, name a tension and let it go', 'End by standing still and feeling lighter'],
        reward: 'Calm Walker',
        points: 20,
      },
    ],
    reflective: [
      {
        title: 'Mindful Movement',
        description: 'Move very slowly through simple motions, paying attention to every muscle.',
        steps: ['Stand with feet hip-width apart', 'Slowly raise your arms overhead (10 seconds)', 'Slowly lower them (10 seconds)', 'Repeat 3 times, noticing every sensation'],
        reward: 'Mindful Mover',
        points: 15,
      },
    ],
    grateful: [
      {
        title: 'Gratitude Walk',
        description: 'Walk for 5 minutes. With each minute, think of something different you\'re grateful for.',
        steps: ['Start walking at a comfortable pace', 'Minute 1: grateful for your body', 'Minute 2: grateful for a person', 'Minute 3: grateful for a recent experience', 'Minute 4: grateful for something simple', 'Minute 5: grateful for this moment'],
        reward: 'Thankful Trekker',
        points: 20,
      },
    ],
    creative: [
      {
        title: 'Dance Storytelling',
        description: 'Tell a story through movement — act out your day so far using only your body!',
        steps: ['Think about your day so far', 'Choose 3 key moments', 'Express each through movement', 'End with a bow!'],
        reward: 'Movement Storyteller',
        points: 20,
      },
    ],
    lonely: [
      {
        title: 'Mirror Dance Party',
        description: 'Dance in front of a mirror. Make yourself laugh with silly moves!',
        steps: ['Find a mirror', 'Put on an upbeat song', 'Make the silliest dance moves you can', 'Try to make yourself laugh out loud!'],
        reward: 'Solo Star',
        points: 15,
      },
    ],
  },
  kindness: {
    happy: [
      {
        title: 'Compliment Drop',
        description: 'Send 3 genuine compliments to 3 different people. Spread the happiness!',
        steps: ['Think of 3 people in your life', 'Write a specific, genuine compliment for each', 'Send them via text, note, or in person', 'Notice how it feels to brighten their day'],
        reward: 'Joy Spreader',
        points: 20,
      },
    ],
    calm: [
      {
        title: 'Silent Helper',
        description: 'Do one small, quiet act of kindness — tidy something, leave a nice note, or hold a door.',
        steps: ['Look around for something helpful you can do', 'Do it quietly, without seeking recognition', 'Notice the calm satisfaction it brings', 'Smile to yourself'],
        reward: 'Silent Hero',
        points: 15,
      },
    ],
    energetic: [
      {
        title: 'Kindness Blitz',
        description: 'Do as many small kind acts as you can in 5 minutes. Hold doors, smile, compliment, help!',
        steps: ['Set a 5-minute timer', 'Look for every opportunity to be kind', 'Smile at everyone you see', 'Help with anything you notice'],
        reward: 'Kindness Tornado',
        points: 25,
      },
    ],
    stressed: [
      {
        title: 'Self-Kindness Letter',
        description: 'Write a short, kind letter to yourself as if you were your own best friend.',
        steps: ['Grab paper or open a notes app', 'Start with "Dear friend..."', 'Acknowledge what you\'re going through', 'Write what a loving friend would say', 'Read it back to yourself gently'],
        reward: 'Self-Compassion',
        points: 20,
      },
    ],
    reflective: [
      {
        title: 'Kindness Memory',
        description: 'Recall 3 times someone was kind to you. Write down how each one made you feel.',
        steps: ['Close your eyes and think back', 'Remember a moment of unexpected kindness', 'Write down what happened and how you felt', 'Repeat for 2 more memories'],
        reward: 'Kindness Keeper',
        points: 15,
      },
    ],
    grateful: [
      {
        title: 'Thank-You Message',
        description: 'Write and send a heartfelt thank-you to someone who made a difference in your life.',
        steps: ['Think of someone who helped you recently', 'Write a specific, detailed thank-you', 'Mention exactly what they did and why it mattered', 'Send it!'],
        reward: 'Gratitude Messenger',
        points: 25,
      },
    ],
    creative: [
      {
        title: 'Kindness Coupon Book',
        description: 'Create 3 "kindness coupons" for someone — things like "one hug," "I\'ll cook dinner," etc.',
        steps: ['Cut paper into coupon-sized pieces', 'Write a kind offer on each one', 'Decorate them with doodles', 'Give the coupon book to someone special'],
        reward: 'Coupon Creator',
        points: 20,
      },
    ],
    lonely: [
      {
        title: 'Reach Out Challenge',
        description: 'Send a "thinking of you" message to someone you haven\'t spoken to recently.',
        steps: ['Think of someone you\'ve lost touch with', 'Write a warm, no-pressure message', 'Share a good memory you have with them', 'Hit send and feel the connection'],
        reward: 'Bridge Builder',
        points: 20,
      },
    ],
  },
  reflection: {
    happy: [
      {
        title: 'Joy Snapshot',
        description: 'Write down 5 specific things that contributed to your happiness today. Be detailed!',
        steps: ['Pause and take a deep breath', 'Think about your day so far', 'Write 5 specific happy moments', 'For each, note WHY it made you happy'],
        reward: 'Joy Collector',
        points: 15,
      },
    ],
    calm: [
      {
        title: 'Breath Counting',
        description: 'Sit quietly and count 20 breaths. If you lose count, gently start over.',
        steps: ['Find a comfortable seated position', 'Close your eyes or soften your gaze', 'Breathe naturally and count each exhale', 'Reach 20, then sit in silence for a moment'],
        reward: 'Breath Master',
        points: 15,
      },
    ],
    energetic: [
      {
        title: 'Energy Audit',
        description: 'List 5 things that give you energy and 5 that drain it. Plan to do more of the first!',
        steps: ['Draw two columns: "Gives Energy" and "Drains Energy"', 'Fill each with 5 items', 'Circle one energy-giver you can do today', 'Make a plan to do it!'],
        reward: 'Energy Strategist',
        points: 20,
      },
    ],
    stressed: [
      {
        title: 'Worry Release',
        description: 'Write your top 3 worries, then write what you CAN control about each. Let go of the rest.',
        steps: ['Write down 3 things worrying you', 'For each, ask: "What can I control?"', 'Write one small action for each', 'Crumple the paper as a symbolic release'],
        reward: 'Worry Warrior',
        points: 20,
      },
    ],
    reflective: [
      {
        title: 'Future Self Letter',
        description: 'Write a letter to yourself 1 year from now. What do you hope? What advice would you give?',
        steps: ['Start with "Dear Future Me..."', 'Describe where you are now', 'Share your hopes and dreams', 'Give yourself one piece of advice', 'Seal it and set a reminder to read it later'],
        reward: 'Time Traveler',
        points: 25,
      },
    ],
    grateful: [
      {
        title: 'Gratitude Deep Dive',
        description: 'Pick ONE thing you\'re grateful for and write about it for 5 minutes. Go deep!',
        steps: ['Choose something you\'re truly grateful for', 'Set a 5-minute timer', 'Write about why it matters, how it affects you', 'Don\'t stop writing until the timer ends'],
        reward: 'Deep Gratitude',
        points: 20,
      },
    ],
    creative: [
      {
        title: 'Dream Journal',
        description: 'Write about a dream or daydream you\'ve had recently. What might it mean?',
        steps: ['Recall a recent dream or daydream', 'Write it out in vivid detail', 'Note any feelings or symbols', 'Reflect on what it might be telling you'],
        reward: 'Dream Explorer',
        points: 15,
      },
    ],
    lonely: [
      {
        title: 'Connection Map',
        description: 'Draw a map of people who care about you. You might be surprised how many there are.',
        steps: ['Write your name in the center', 'Add names of people who care about you', 'Draw lines connecting you to each person', 'For each, write one reason they matter to you'],
        reward: 'Connection Mapper',
        points: 20,
      },
    ],
  },
  nature: {
    happy: [
      {
        title: 'Sky Gazing',
        description: 'Look at the sky for 2 minutes. Find shapes in clouds or admire the colors.',
        steps: ['Go outside or look through a window', 'Look up at the sky', 'Find 3 interesting shapes or patterns', 'Take a deep breath and smile'],
        reward: 'Sky Watcher',
        points: 10,
      },
    ],
    calm: [
      {
        title: 'Nature Sounds',
        description: 'Sit quietly and identify 5 different natural sounds around you.',
        steps: ['Find a quiet spot, preferably outdoors', 'Close your eyes', 'Listen for 2 minutes', 'Identify and name 5 different sounds'],
        reward: 'Sound Spotter',
        points: 15,
      },
    ],
    energetic: [
      {
        title: 'Nature Scavenger Hunt',
        description: 'Find 5 things: something smooth, something rough, something colorful, something tiny, something beautiful.',
        steps: ['Head outside or look around your space', 'Find something smooth', 'Find something rough', 'Find something colorful, tiny, and beautiful', 'Arrange your findings into a mini display'],
        reward: 'Nature Hunter',
        points: 20,
      },
    ],
    stressed: [
      {
        title: 'Grounding Walk',
        description: 'Walk barefoot on grass, sand, or earth for 5 minutes. Feel connected to the ground.',
        steps: ['Find a safe natural surface', 'Remove your shoes', 'Walk slowly, feeling each step', 'Notice the textures and temperature'],
        reward: 'Earth Walker',
        points: 20,
      },
    ],
    reflective: [
      {
        title: 'Tree Meditation',
        description: 'Find a tree and observe it for 3 minutes. Notice every detail — bark, leaves, movement.',
        steps: ['Find a tree you can sit or stand near', 'Observe it from trunk to crown', 'Notice textures, colors, and movement', 'Think about how long it\'s been growing'],
        reward: 'Tree Whisperer',
        points: 15,
      },
    ],
    grateful: [
      {
        title: 'Nature Thank You',
        description: 'Write 5 things in nature you\'re grateful for and one reason for each.',
        steps: ['Think about the natural world around you', 'List 5 elements of nature you appreciate', 'Write one reason each matters to you', 'Spend a moment feeling that gratitude'],
        reward: 'Nature Thanker',
        points: 15,
      },
    ],
    creative: [
      {
        title: 'Nature Art',
        description: 'Create art using only natural materials — leaves, sticks, stones, flowers.',
        steps: ['Gather natural materials around you', 'Arrange them into a pattern or picture', 'Take a photo of your creation', 'Leave it for others to discover'],
        reward: 'Nature Artist',
        points: 20,
      },
    ],
    lonely: [
      {
        title: 'Plant Connection',
        description: 'Spend time with a plant — water it, talk to it, or just sit with it.',
        steps: ['Find a plant — indoor or outdoor', 'Give it some care (water, pruning, sunlight)', 'Spend a quiet moment appreciating it', 'Name it if you haven\'t already!'],
        reward: 'Plant Friend',
        points: 15,
      },
    ],
  },
  social: {
    happy: [
      {
        title: 'Share the Joy',
        description: 'Tell someone about something great that happened to you today. Celebrate together!',
        steps: ['Think of your happiest moment today', 'Find someone to share it with', 'Tell them with enthusiasm!', 'Ask about their day too'],
        reward: 'Joy Sharer',
        points: 15,
      },
    ],
    calm: [
      {
        title: 'Listening Gift',
        description: 'Ask someone how they\'re really doing and listen — truly listen — without interrupting.',
        steps: ['Choose someone you care about', 'Ask: "How are you really doing?"', 'Listen without planning your response', 'Thank them for sharing with you'],
        reward: 'Deep Listener',
        points: 20,
      },
    ],
    energetic: [
      {
        title: 'Game Time',
        description: 'Challenge someone to a quick game — rock-paper-scissors, thumb war, or a riddle!',
        steps: ['Find a willing participant', 'Choose a quick game', 'Play at least 3 rounds', 'Congratulate the winner (even if it\'s you!)'],
        reward: 'Game Master',
        points: 15,
      },
    ],
    stressed: [
      {
        title: 'Vent & Validate',
        description: 'Share one thing stressing you with someone you trust. Let them validate your feelings.',
        steps: ['Choose someone you trust', 'Share one specific stress (keep it focused)', 'Let them respond without defending', 'Thank them for listening'],
        reward: 'Vulnerability Victor',
        points: 20,
      },
    ],
    reflective: [
      {
        title: 'Deep Question',
        description: 'Ask someone a meaningful question: "What\'s something you\'re proud of this week?"',
        steps: ['Choose a person you\'d like to connect with', 'Ask a thoughtful, open-ended question', 'Listen to their full answer', 'Share your own answer too'],
        reward: 'Deep Connector',
        points: 20,
      },
    ],
    grateful: [
      {
        title: 'Appreciation Circle',
        description: 'Tell 3 people one specific thing you appreciate about them.',
        steps: ['Think of 3 people', 'Identify something specific you appreciate', 'Tell each person directly', 'Notice their reaction and your own feelings'],
        reward: 'Appreciation Ambassador',
        points: 25,
      },
    ],
    creative: [
      {
        title: 'Story Swap',
        description: 'Take turns telling a story with someone — each person adds one sentence at a time!',
        steps: ['Find a storytelling partner', 'One person starts with a sentence', 'Take turns adding sentences', 'Try to make the story as wild as possible!'],
        reward: 'Story Spinner',
        points: 15,
      },
    ],
    lonely: [
      {
        title: 'First Step',
        description: 'Send a message to someone you\'d like to be closer to. Start small — a meme, a song, a question.',
        steps: ['Think of someone you\'d like to connect with', 'Choose something small to share (a meme, song, or question)', 'Send it with a brief, warm message', 'Don\'t worry about the response — you made the effort!'],
        reward: 'Brave Connector',
        points: 20,
      },
    ],
  },
};

/**
 * Get a fallback quest based on mood and category.
 * If no exact match found, picks a random quest from the category.
 */
export function getFallbackQuest(mood, category) {
  const categoryQuests = FALLBACK_QUESTS[category];
  if (!categoryQuests) {
    // Pick random category
    const cats = Object.keys(FALLBACK_QUESTS);
    const randomCat = cats[Math.floor(Math.random() * cats.length)];
    return getFallbackQuest(mood, randomCat);
  }

  const moodQuests = categoryQuests[mood];
  if (moodQuests && moodQuests.length > 0) {
    return { ...moodQuests[Math.floor(Math.random() * moodQuests.length)], category };
  }

  // Fallback: pick a quest from any mood in this category
  const allMoods = Object.keys(categoryQuests);
  const randomMood = allMoods[Math.floor(Math.random() * allMoods.length)];
  const quests = categoryQuests[randomMood];
  return { ...quests[Math.floor(Math.random() * quests.length)], category };
}

/**
 * Generate a quest by trying AI first, falling back to curated quests.
 * The AI integration is optional and can be swapped for any provider.
 */
export async function generateQuest(mood, timeOption, category, apiKey = null) {
  try {
    const response = await fetch('/api/generate-quest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mood,
        timeOption,
        category,
        apiKey: apiKey || undefined,
      }),
      signal: AbortSignal.timeout(3500),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success && data.quest) {
        return data.quest;
      }
    }
  } catch (err) {
    console.warn('AI quest generation failed, using curated quest:', err.message);
  }

  // Fallback to curated quest
  return getFallbackQuest(mood, category);
}

// ─── Community Messages (fallback / seed data) ───
export const SEED_MESSAGES = [
  { text: "Did a two-minute stretch routine and immediately felt the tension melt away.", author: "Elena Vance", likes: 18, timestamp: Date.now() - 3600000, category: 'movement' },
  { text: "Sketched a miniature cup of coffee. Simple, but it completely cleared my afternoon mental fog.", author: "Marcus Chen", likes: 14, timestamp: Date.now() - 7200000, category: 'creativity' },
  { text: "Sent a brief note of gratitude to an old mentor. Reconnecting felt effortless and warm.", author: "Sarah Jenkins", likes: 32, timestamp: Date.now() - 10800000, category: 'kindness' },
  { text: "Took 20 deep diaphragmatic breaths during lunch. First quiet pause all week.", author: "David Vance", likes: 21, timestamp: Date.now() - 14400000, category: 'reflection' },
  { text: "Went on a tech-free walk around the block and actually listened to the birds.", author: "Maya Patel", likes: 45, timestamp: Date.now() - 18000000, category: 'nature' },
  { text: "Called my brother just to share one pleasant thing from today.", author: "Lucas Scott", likes: 16, timestamp: Date.now() - 21600000, category: 'social' },
  { text: "Left a sincere compliment on a coworker's desk before leaving the studio.", author: "Rachel Kim", likes: 27, timestamp: Date.now() - 25200000, category: 'kindness' },
  { text: "Cultivated my fifth botanical sanctuary specimen. This quiet habit has become my favorite ritual.", author: "Jordan Brooks", likes: 22, timestamp: Date.now() - 28800000, category: 'nature' },
];

// ─── Motivational Quotes ───
export const QUOTES = [
  "Small, deliberate steps compound into meaningful tranquility.",
  "You showed up with presence today. That is what counts.",
  "Kindness offered to anyone ripples further than you know.",
  "Clarity begins with a single intentional breath.",
  "Celebrate quiet victories as fiercely as the visible ones.",
  "True connection is built in unhurried moments.",
  "Creativity flourishes when you release the need for perfection.",
  "A tranquil mind is the ultimate luxury you can cultivate.",
];
