export type MuscleCategory = 
  | 'Chest'
  | 'Back'
  | 'Legs'
  | 'Shoulders'
  | 'Arms'
  | 'Core'
  | 'Cardio'
  | 'Flexibility'
  | 'Pilates'
  | 'Strength'
  | 'Outdoor';

export type EquipmentType = 
  | 'Barbell'
  | 'Dumbbell'
  | 'Cable'
  | 'Machine'
  | 'Bodyweight'
  | 'Kettlebell'
  | 'Cardio Machine'
  | 'Mat / None'
  | 'Sport / Outdoors';

export interface Exercise {
  id: string;
  name: string;
  category: MuscleCategory;
  primaryMuscles: string[];
  secondaryMuscles?: string[];
  equipment: EquipmentType;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string;
  tips?: string;
  isPro?: boolean; // GymForge PRO tag
  defaultSets?: number;
  defaultReps?: number;
  imageFilename?: string;
  imageUrl?: string; // e.g. https://gym-tracker.infinityfreeapp.com/images/...
  femaleImageUrl?: string; // e.g. https://gym-tracker.infinityfreeapp.com/images/female/...
  icon?: string; // Outdoor emoji icon e.g. 🏏, ⚽, 🏸
  isVideo?: boolean; // if .mp4 / .webm video
}

export interface WorkoutSet {
  id: string;
  setNumber: number;
  weight: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion (1-10)
  completed: boolean;
  isWarmup?: boolean;
}

export interface WorkoutExerciseLog {
  exerciseId: string;
  exerciseName: string;
  category: MuscleCategory;
  sets: WorkoutSet[];
  notes?: string;
  imageUrl?: string;
  icon?: string;
}

export interface WorkoutSession {
  id: string;
  title: string;
  date: string; // ISO date string
  durationMinutes: number;
  totalVolumeKg: number;
  exercises: WorkoutExerciseLog[];
  notes?: string;
  rating?: number; // 1 to 5 stars
}

export interface RoutinePreset {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedMinutes: number;
  exerciseIds: string[];
}

export interface TrackItem {
  id: string;
  title: string;
  artist: string;
  genre: 'Phonk' | 'Heavy Bass' | 'Synthwave' | 'Trap' | 'Industrial Metal' | 'HIIT Electro' | 'Lo-Fi Chill';
  bpm: number;
  vibe: 'High Energy' | 'Heavy Focus' | 'Cardio Rush' | 'PR Beast' | 'Warmup Flow';
  durationSeconds: number;
  synthTheme: 'phonk' | 'bass' | 'synthwave' | 'metal' | 'electro' | 'trap';
}

export interface PlaylistPreset {
  id: string;
  name: string;
  description: string;
  targetWorkout: string;
  tracks: TrackItem[];
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  bodyFatPercent?: number;
  chestCm?: number;
  waistCm?: number;
  hipsCm?: number;
  armsCm?: number;
  thighsCm?: number;
}

export interface StreakInfo {
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
  hasTrainedToday: boolean;
  freezeCount: number;
  notificationEnabled: boolean;
  reminderTime: string; // "18:00"
}

export interface AchievementBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: string | null;
}
