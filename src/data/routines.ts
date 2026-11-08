import { RoutinePreset } from '../types/workout';

export const ROUTINE_PRESETS: RoutinePreset[] = [
  {
    id: 'chest-push-iron',
    name: 'Iron Chest & Push Foundry',
    description: 'Classic high-volume chest and tricep hypertrophy session featuring heavy presses and isolation flies.',
    category: 'Push / Chest',
    estimatedMinutes: 50,
    exerciseIds: [
      'bench-press',
      'incline-bench-press',
      'dumbbell-fly',
      'standing-cable-fly',
      'diamond-push-up',
      'push-ups'
    ],
  },
  {
    id: 'back-pull-power',
    name: 'Heavy Back & Pull Strength',
    description: 'Comprehensive posterior chain workout focusing on deadlifts, wide lat recruitment, and thick rows.',
    category: 'Pull / Back',
    estimatedMinutes: 55,
    exerciseIds: [
      'deadlift',
      'wide-grip-pull-ups',
      'bent-over-dumbbell-row',
      'lat-pulldown',
      't-bar-row',
      'back-shrugs'
    ],
  },
  {
    id: 'legs-quad-titan',
    name: 'Legs & Lower Body Engine',
    description: 'High intensity lower body workout targeting quads, hamstrings, glutes, and explosive power.',
    category: 'Legs',
    estimatedMinutes: 60,
    exerciseIds: [
      'squats',
      'leg-press',
      'dumbbell-goblet-squat',
      'lunges',
      'leg-extension',
      'standing-calf-raise'
    ],
  },
  {
    id: 'shoulders-arms-beast',
    name: 'Shoulders & Arms Beast Mode',
    description: 'Targeted deltoid sculpting, heavy overhead work, trap shrugs, and bicep/tricep pump.',
    category: 'Arms & Shoulders',
    estimatedMinutes: 45,
    exerciseIds: [
      'overhead-press',
      'dumbbell-shoulder-press',
      'spider-curl',
      'ez-bar-preacher-curl',
      'tricep-extension',
      'tricep-dips'
    ],
  },
  {
    id: 'core-cardio-hiit',
    name: 'Core & High-Octane Cardio',
    description: 'Fast-paced metabolic conditioning and abdominal core endurance routine.',
    category: 'Cardio / Core',
    estimatedMinutes: 30,
    exerciseIds: [
      'plank',
      'sit-ups',
      'mountain-climbers',
      'burpees',
      'jump-rope',
      'hiit-workout'
    ],
  },
  {
    id: 'outdoor-grit-circuit',
    name: 'Outdoor Grit & Athletics',
    description: 'Outdoor athletic agility, cardio endurance, and field games directly from GymForge.',
    category: 'Outdoor / Sports',
    estimatedMinutes: 45,
    exerciseIds: [
      'football',
      'cricket-practice',
      'badminton',
      'tennis',
      'outdoor-swim',
      'trekking'
    ],
  }
];
