import { WorkoutSession, BodyMeasurement, StreakInfo, AchievementBadge, TrackItem } from '../types/workout';
import { ALL_WORKOUT_TRACKS } from '../data/playlists';

const STORAGE_KEYS = {
  SESSIONS: 'gymforge_sessions_v1',
  MEASUREMENTS: 'gymforge_measurements_v1',
  STREAK: 'gymforge_streak_v1',
  BADGES: 'gymforge_badges_v1',
  USER_MODE: 'gymforge_user_mode_v1', // 'beast' | 'queen' | 'iron'
  UNIT_SYSTEM: 'gymforge_unit_v1', // 'kg' | 'lbs'
  CURRENT_PLAYLIST: 'gymforge_playlist_v1',
  CLAIMED_REWARDS: 'gymforge_claimed_rewards_v1',
  DAILY_STEPS: 'gymforge_daily_steps_v1',
};

const INITIAL_STREAK: StreakInfo = {
  currentStreak: 4,
  longestStreak: 12,
  lastActiveDate: new Date(Date.now() - 86400000).toISOString().split('T')[0], // yesterday
  hasTrainedToday: false,
  freezeCount: 1,
  notificationEnabled: true,
  reminderTime: '18:00',
};

const INITIAL_BADGES: AchievementBadge[] = [
  {
    id: 'badge-first',
    name: 'First Workout',
    description: 'Log your very first training session in GymForge.',
    icon: 'Trophy',
    unlockedAt: '2026-10-15',
  },
  {
    id: 'badge-streak-7',
    name: 'Iron Streak',
    description: 'Crush 7 consecutive days of discipline and gains.',
    icon: 'Flame',
    unlockedAt: '2026-10-22',
  },
  {
    id: 'badge-volume-5k',
    name: 'Heavy Lifter',
    description: 'Move over 5,000 kg total volume across your sessions.',
    icon: 'Dumbbell',
    unlockedAt: '2026-10-29',
  },
  {
    id: 'badge-power-week',
    name: 'Power Week',
    description: 'Complete 5 demanding workouts within 7 days.',
    icon: 'Zap',
    unlockedAt: null,
  },
  {
    id: 'badge-month-strong',
    name: 'Month Strong',
    description: 'Maintain a 30-day streak of relentless training.',
    icon: 'Crown',
    unlockedAt: null,
  },
];

const INITIAL_MEASUREMENTS: BodyMeasurement[] = [
  {
    id: 'm-1',
    date: '2026-10-01',
    weightKg: 82.5,
    bodyFatPercent: 17.5,
    chestCm: 104,
    waistCm: 84,
    hipsCm: 99,
    armsCm: 38,
    thighsCm: 60,
  },
  {
    id: 'm-2',
    date: '2026-10-18',
    weightKg: 81.8,
    bodyFatPercent: 16.8,
    chestCm: 105,
    waistCm: 83,
    hipsCm: 98.5,
    armsCm: 38.5,
    thighsCm: 60.5,
  },
  {
    id: 'm-3',
    date: '2026-11-01',
    weightKg: 81.2,
    bodyFatPercent: 16.2,
    chestCm: 106,
    waistCm: 81.5,
    hipsCm: 98,
    armsCm: 39,
    thighsCm: 61,
  },
];

const INITIAL_SESSIONS: WorkoutSession[] = [
  {
    id: 'session-demo-1',
    title: 'Chest & Tricep Hypertrophy',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
    durationMinutes: 48,
    totalVolumeKg: 4620,
    rating: 5,
    notes: 'Hit clean PR on flat bench press, great mind-muscle pump.',
    exercises: [
      {
        exerciseId: 'barbell-bench-press',
        exerciseName: 'Barbell Bench Press',
        category: 'Chest',
        sets: [
          { id: 's1', setNumber: 1, weight: 80, reps: 10, completed: true },
          { id: 's2', setNumber: 2, weight: 90, reps: 8, completed: true },
          { id: 's3', setNumber: 3, weight: 95, reps: 6, completed: true },
          { id: 's4', setNumber: 4, weight: 100, reps: 4, completed: true },
        ],
      },
      {
        exerciseId: 'incline-bench-press',
        exerciseName: 'Incline Bench Press',
        category: 'Chest',
        sets: [
          { id: 's5', setNumber: 1, weight: 60, reps: 10, completed: true },
          { id: 's6', setNumber: 2, weight: 70, reps: 8, completed: true },
          { id: 's7', setNumber: 3, weight: 70, reps: 8, completed: true },
        ],
      },
      {
        exerciseId: 'tricep-rope-pushdown',
        exerciseName: 'Tricep Rope Pushdown',
        category: 'Arms',
        sets: [
          { id: 's8', setNumber: 1, weight: 25, reps: 15, completed: true },
          { id: 's9', setNumber: 2, weight: 30, reps: 12, completed: true },
        ],
      },
    ],
  },
  {
    id: 'session-demo-2',
    title: 'Heavy Back & Pull Strength',
    date: new Date(Date.now() - 86400000).toISOString(),
    durationMinutes: 52,
    totalVolumeKg: 5880,
    rating: 5,
    notes: 'Strong deadlift lockout. Traps and lats felt locked in.',
    exercises: [
      {
        exerciseId: 'deadlift',
        exerciseName: 'Barbell Deadlift',
        category: 'Back',
        sets: [
          { id: 's10', setNumber: 1, weight: 120, reps: 6, completed: true },
          { id: 's11', setNumber: 2, weight: 140, reps: 5, completed: true },
          { id: 's12', setNumber: 3, weight: 150, reps: 3, completed: true },
        ],
      },
      {
        exerciseId: 'wide-grip-pull-ups',
        exerciseName: 'Wide Grip Pull-Ups',
        category: 'Back',
        sets: [
          { id: 's13', setNumber: 1, weight: 0, reps: 12, completed: true },
          { id: 's14', setNumber: 2, weight: 0, reps: 10, completed: true },
          { id: 's15', setNumber: 3, weight: 0, reps: 8, completed: true },
        ],
      },
      {
        exerciseId: 'bent-over-db-row',
        exerciseName: 'Bent-Over Dumbbell Row',
        category: 'Back',
        sets: [
          { id: 's16', setNumber: 1, weight: 32, reps: 10, completed: true },
          { id: 's17', setNumber: 2, weight: 36, reps: 8, completed: true },
        ],
      },
    ],
  },
];

export const storage = {
  getSessions(): WorkoutSession[] {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(INITIAL_SESSIONS));
      return INITIAL_SESSIONS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_SESSIONS;
    }
  },

  saveSession(session: WorkoutSession): WorkoutSession[] {
    const sessions = this.getSessions();
    const updated = [session, ...sessions];
    localStorage.setItem(STORAGE_KEYS.SESSIONS, JSON.stringify(updated));
    return updated;
  },

  getMeasurements(): BodyMeasurement[] {
    const raw = localStorage.getItem(STORAGE_KEYS.MEASUREMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(INITIAL_MEASUREMENTS));
      return INITIAL_MEASUREMENTS;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_MEASUREMENTS;
    }
  },

  saveMeasurement(measurement: BodyMeasurement): BodyMeasurement[] {
    const list = this.getMeasurements();
    const updated = [measurement, ...list];
    localStorage.setItem(STORAGE_KEYS.MEASUREMENTS, JSON.stringify(updated));
    return updated;
  },

  getStreak(): StreakInfo {
    const raw = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(INITIAL_STREAK));
      return INITIAL_STREAK;
    }
    try {
      const data: StreakInfo = JSON.parse(raw);
      // Auto compute hasTrainedToday based on today's local date
      const todayStr = new Date().toISOString().split('T')[0];
      data.hasTrainedToday = data.lastActiveDate === todayStr;
      return data;
    } catch {
      return INITIAL_STREAK;
    }
  },

  updateStreak(streak: StreakInfo) {
    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streak));
  },

  getBadges(): AchievementBadge[] {
    const raw = localStorage.getItem(STORAGE_KEYS.BADGES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(INITIAL_BADGES));
      return INITIAL_BADGES;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return INITIAL_BADGES;
    }
  },

  updateBadges(badges: AchievementBadge[]) {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  },

  getUserMode(): 'beast' | 'queen' | 'iron' {
    return (localStorage.getItem(STORAGE_KEYS.USER_MODE) as 'beast' | 'queen' | 'iron') || 'beast';
  },

  setUserMode(mode: 'beast' | 'queen' | 'iron') {
    localStorage.setItem(STORAGE_KEYS.USER_MODE, mode);
  },

  getUnitSystem(): 'kg' | 'lbs' {
    return (localStorage.getItem(STORAGE_KEYS.UNIT_SYSTEM) as 'kg' | 'lbs') || 'kg';
  },

  setUnitSystem(unit: 'kg' | 'lbs') {
    localStorage.setItem(STORAGE_KEYS.UNIT_SYSTEM, unit);
  },

  getCurrentPlaylist(): TrackItem[] {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_PLAYLIST);
    if (!raw) {
      return ALL_WORKOUT_TRACKS.slice(0, 5);
    }
    try {
      return JSON.parse(raw);
    } catch {
      return ALL_WORKOUT_TRACKS.slice(0, 5);
    }
  },

  saveCurrentPlaylist(tracks: TrackItem[]) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_PLAYLIST, JSON.stringify(tracks));
  },

  getClaimedRewards(): Record<string, boolean> {
    const raw = localStorage.getItem(STORAGE_KEYS.CLAIMED_REWARDS);
    if (!raw) {
      // Default: First Workout claimed initially as a welcome bonus
      const initial: Record<string, boolean> = { 'First Workout': true };
      localStorage.setItem(STORAGE_KEYS.CLAIMED_REWARDS, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  },

  setRewardClaimed(rewardName: string, claimed: boolean = true): Record<string, boolean> {
    const current = this.getClaimedRewards();
    current[rewardName] = claimed;
    localStorage.setItem(STORAGE_KEYS.CLAIMED_REWARDS, JSON.stringify(current));
    return current;
  },

  getDailySteps(): number {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_STEPS);
    if (!raw) {
      return 6540; // realistic default steps
    }
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) ? 6540 : parsed;
  },

  setDailySteps(steps: number) {
    localStorage.setItem(STORAGE_KEYS.DAILY_STEPS, steps.toString());
  },
};
