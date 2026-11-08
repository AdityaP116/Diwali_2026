import { DiyaWish } from '../types';

const INITIAL_COMMUNITY_DIYAS: DiyaWish[] = [
  {
    id: 'seed-1',
    name: 'Aarav & Family',
    message: 'May peace and joyful light bless everyone around the globe this year.',
    timestamp: Date.now() - 1000 * 60 * 60 * 4,
    x: 48,
    y: 36,
    intensity: 1.1,
    flameHue: 'gold',
    likes: 42,
  },
  {
    id: 'seed-2',
    name: 'Pooja Sharma',
    message: 'Wishing health, harmony and strength to every struggling soul. Happy Diwali!',
    timestamp: Date.now() - 1000 * 60 * 60 * 12,
    x: 32,
    y: 52,
    intensity: 1.0,
    flameHue: 'amber',
    likes: 29,
  },
  {
    id: 'seed-3',
    name: 'Rohan Verma',
    message: 'Light triumphing over darkness, knowledge over ignorance.',
    timestamp: Date.now() - 1000 * 60 * 60 * 24,
    x: 65,
    y: 48,
    intensity: 1.05,
    flameHue: 'sacred',
    likes: 38,
  },
  {
    id: 'seed-4',
    name: 'Ananya S.',
    message: 'May this festival bring new opportunities and endless laughter to our family.',
    timestamp: Date.now() - 1000 * 60 * 60 * 30,
    x: 22,
    y: 68,
    intensity: 0.95,
    flameHue: 'rose',
    likes: 19,
  },
  {
    id: 'seed-5',
    name: 'Devraj & Shreya',
    message: 'Celebrating love, unity and our first Diwali together.',
    timestamp: Date.now() - 1000 * 60 * 60 * 36,
    x: 76,
    y: 66,
    intensity: 1.15,
    flameHue: 'gold',
    likes: 56,
  },
  {
    id: 'seed-6',
    name: 'Grandmother Kalyani',
    message: 'God bless all children with wisdom and boundless joy. शुभ दीपावली!',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    x: 52,
    y: 78,
    intensity: 1.2,
    flameHue: 'sacred',
    likes: 84,
  },
  {
    id: 'seed-7',
    name: 'Vikram Patel',
    message: 'Sending warm festival wishes from across the seas to home.',
    timestamp: Date.now() - 1000 * 60 * 60 * 60,
    x: 15,
    y: 38,
    intensity: 0.9,
    flameHue: 'amber',
    likes: 14,
  },
  {
    id: 'seed-8',
    name: 'Meera & Kabir',
    message: 'May hope burn eternally bright like the sacred diya flame.',
    timestamp: Date.now() - 1000 * 60 * 60 * 72,
    x: 82,
    y: 32,
    intensity: 1.0,
    flameHue: 'gold',
    likes: 27,
  },
];

const STORAGE_KEY = 'diwaliverse_diyas_v1';

export function getStoredDiyas(): DiyaWish[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_COMMUNITY_DIYAS));
      return INITIAL_COMMUNITY_DIYAS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_COMMUNITY_DIYAS;
  } catch {
    return INITIAL_COMMUNITY_DIYAS;
  }
}

export function saveStoredDiyas(diyas: DiyaWish[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(diyas));
  } catch (err) {
    console.error('Failed to save diyas to localStorage', err);
  }
}

export function addDiyaWish(wish: Omit<DiyaWish, 'id' | 'timestamp' | 'likes'>): DiyaWish {
  const current = getStoredDiyas();
  const newDiya: DiyaWish = {
    ...wish,
    id: `diya-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    likes: 1,
  };
  const updated = [newDiya, ...current];
  saveStoredDiyas(updated);
  return newDiya;
}

export function toggleDiyaLike(id: string): DiyaWish[] {
  const current = getStoredDiyas();
  const updated = current.map((d) => (d.id === id ? { ...d, likes: d.likes + 1 } : d));
  saveStoredDiyas(updated);
  return updated;
}
