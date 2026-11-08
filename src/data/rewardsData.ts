export interface RewardItem {
  icon: string;
  name: string;
  desc: string;
  xp: number;
  thr: number;
  key: 'workouts' | 'streak' | 'volume' | 'steps';
  action: 'generic' | 'restaurant' | 'trekking' | 'hillstation' | 'dating';
}

export interface RewardActionOption {
  label: string;
  url: string;
}

export interface RewardActionInfo {
  emoji: string;
  title: string;
  sub: string;
  opts: RewardActionOption[];
}

// 10 Exact rewards from gym-tracker.infinityfreeapp.com
export const REWARDS_DATA: RewardItem[] = [
  {
    icon: '🔥',
    name: 'First Workout',
    desc: 'Log your first session',
    xp: 50,
    thr: 1,
    key: 'workouts',
    action: 'generic',
  },
  {
    icon: '💪',
    name: 'Iron Streak',
    desc: '7 days in a row',
    xp: 100,
    thr: 7,
    key: 'streak',
    action: 'generic',
  },
  {
    icon: '🏋️',
    name: 'Heavy Lifter',
    desc: '5,000 kg volume',
    xp: 150,
    thr: 5000,
    key: 'volume',
    action: 'generic',
  },
  {
    icon: '🚀',
    name: '10K Steps',
    desc: 'Walk 10,000 steps',
    xp: 75,
    thr: 10000,
    key: 'steps',
    action: 'generic',
  },
  {
    icon: '⚡',
    name: 'Power Week',
    desc: 'Complete 5 workouts',
    xp: 200,
    thr: 5,
    key: 'workouts',
    action: 'generic',
  },
  {
    icon: '🏆',
    name: 'Month Strong',
    desc: 'Train 20 days',
    xp: 500,
    thr: 20,
    key: 'workouts',
    action: 'generic',
  },
  {
    icon: '🍽️',
    name: 'Restaurant Treat',
    desc: 'Unlock after 10 workouts',
    xp: 120,
    thr: 10,
    key: 'workouts',
    action: 'restaurant',
  },
  {
    icon: '🏕️',
    name: 'Trekking Trip',
    desc: '30,000 kg volume',
    xp: 300,
    thr: 30000,
    key: 'volume',
    action: 'trekking',
  },
  {
    icon: '🌄',
    name: 'Hill Escape',
    desc: 'Complete 20 workouts',
    xp: 400,
    thr: 20,
    key: 'workouts',
    action: 'hillstation',
  },
  {
    icon: '💕',
    name: 'Date Night',
    desc: '14 day streak',
    xp: 250,
    thr: 14,
    key: 'streak',
    action: 'dating',
  },
];

// Exact action modals from gym-tracker.infinityfreeapp.com
export const REWARD_ACTIONS: Record<string, RewardActionInfo> = {
  restaurant: {
    emoji: '🍽️',
    title: 'TREAT UNLOCKED!',
    sub: "You've earned it — go enjoy a meal out.",
    opts: [
      {
        label: '🍽️ Find restaurants near me',
        url: 'https://www.google.com/maps/search/restaurants+near+me',
      },
    ],
  },
  trekking: {
    emoji: '🏕️',
    title: 'TRIP UNLOCKED!',
    sub: "That's serious volume. Time to get outdoors.",
    opts: [
      {
        label: '🥾 Find trekking trails near me',
        url: 'https://www.google.com/maps/search/trekking+trails+near+me',
      },
    ],
  },
  hillstation: {
    emoji: '🌄',
    title: 'ESCAPE UNLOCKED!',
    sub: "20 workouts done — you've earned a getaway.",
    opts: [
      {
        label: '🚗 Search hill stations near me',
        url: 'https://www.google.com/maps/search/hill+stations+near+me',
      },
    ],
  },
  dating: {
    emoji: '💕',
    title: 'DATE NIGHT UNLOCKED!',
    sub: '14-day streak — treat yourself to a night out.',
    opts: [
      {
        label: '🍷 Find romantic restaurants near me',
        url: 'https://www.google.com/maps/search/romantic+restaurants+near+me',
      },
    ],
  },
  generic: {
    emoji: '🏆',
    title: 'REWARD CLAIMED!',
    sub: 'Great work, warrior. Keep the streak alive.',
    opts: [],
  },
};

export function getLevel(xp: number): number {
  return Math.floor(xp / 100) + 1;
}

export function getXPProgress(xp: number): number {
  return xp % 100;
}

export function getLevelRank(level: number): { title: string; color: string; badge: string } {
  if (level >= 10) return { title: 'Iron God', color: 'text-purple-400', badge: '👑' };
  if (level >= 7) return { title: 'Titan Champion', color: 'text-amber-400', badge: '⚡' };
  if (level >= 5) return { title: 'Forge Beast', color: 'text-orange-400', badge: '🔥' };
  if (level >= 3) return { title: 'Iron Lifter', color: 'text-blue-400', badge: '💪' };
  if (level >= 2) return { title: 'Iron Initiate', color: 'text-emerald-400', badge: '🌱' };
  return { title: 'Novice Warrior', color: 'text-zinc-400', badge: '🛡️' };
}
