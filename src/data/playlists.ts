import { PlaylistPreset, TrackItem } from '../types/workout';

export const ALL_WORKOUT_TRACKS: TrackItem[] = [
  {
    id: 'track-1',
    title: 'Iron Pulse',
    artist: 'GymForge SoundLab',
    genre: 'Phonk',
    bpm: 132,
    vibe: 'PR Beast',
    durationSeconds: 195,
    synthTheme: 'phonk',
  },
  {
    id: 'track-2',
    title: 'Heavy Foundry Drive',
    artist: 'Titan Beat Collective',
    genre: 'Heavy Bass',
    bpm: 138,
    vibe: 'Heavy Focus',
    durationSeconds: 210,
    synthTheme: 'bass',
  },
  {
    id: 'track-3',
    title: 'Adrenaline Overload',
    artist: 'Valkyrie Overdrive',
    genre: 'HIIT Electro',
    bpm: 145,
    vibe: 'Cardio Rush',
    durationSeconds: 180,
    synthTheme: 'electro',
  },
  {
    id: 'track-4',
    title: 'Midnight Pump',
    artist: 'Dark District',
    genre: 'Trap',
    bpm: 126,
    vibe: 'Heavy Focus',
    durationSeconds: 204,
    synthTheme: 'trap',
  },
  {
    id: 'track-5',
    title: 'Cybernetic Grind',
    artist: 'Synth Forge',
    genre: 'Synthwave',
    bpm: 130,
    vibe: 'High Energy',
    durationSeconds: 225,
    synthTheme: 'synthwave',
  },
  {
    id: 'track-6',
    title: 'Steel Impact',
    artist: 'Iron Core Protocol',
    genre: 'Industrial Metal',
    bpm: 140,
    vibe: 'PR Beast',
    durationSeconds: 190,
    synthTheme: 'metal',
  },
  {
    id: 'track-7',
    title: 'Endurance Ignition',
    artist: 'Pulse Velocity',
    genre: 'HIIT Electro',
    bpm: 148,
    vibe: 'Cardio Rush',
    durationSeconds: 215,
    synthTheme: 'electro',
  },
  {
    id: 'track-8',
    title: 'Pre-Workout Mindset',
    artist: 'Focus Arc',
    genre: 'Lo-Fi Chill',
    bpm: 118,
    vibe: 'Warmup Flow',
    durationSeconds: 175,
    synthTheme: 'phonk',
  },
];

export const WORKOUT_PLAYLIST_PRESETS: PlaylistPreset[] = [
  {
    id: 'today-daily-mix',
    name: "Today's Ultimate Workout Mix",
    description: 'Dynamic power curve: warm-up groove, escalating tempo for heavy sets, and climax for final supersets.',
    targetWorkout: 'Full Session',
    tracks: [
      ALL_WORKOUT_TRACKS[0], // Iron Pulse
      ALL_WORKOUT_TRACKS[1], // Heavy Foundry Drive
      ALL_WORKOUT_TRACKS[5], // Steel Impact
      ALL_WORKOUT_TRACKS[2], // Adrenaline Overload
      ALL_WORKOUT_TRACKS[4], // Cybernetic Grind
    ],
  },
  {
    id: 'heavy-iron-pr',
    name: 'Heavy Iron & PR Smasher',
    description: 'Crushing basslines and aggressive industrial rhythm built for maximum 1RM deadlifts and heavy presses.',
    targetWorkout: 'Chest & Back Heavy',
    tracks: [
      ALL_WORKOUT_TRACKS[1],
      ALL_WORKOUT_TRACKS[5],
      ALL_WORKOUT_TRACKS[0],
      ALL_WORKOUT_TRACKS[3],
    ],
  },
  {
    id: 'hiit-cardio-burn',
    name: '145+ BPM Cardio Turbo',
    description: 'Fast BPM electronic cadence to keep your heart rate locked in peak fat-burning and endurance zones.',
    targetWorkout: 'HIIT & Running',
    tracks: [
      ALL_WORKOUT_TRACKS[2],
      ALL_WORKOUT_TRACKS[6],
      ALL_WORKOUT_TRACKS[0],
      ALL_WORKOUT_TRACKS[4],
    ],
  },
  {
    id: 'night-pump-trap',
    name: 'Midnight Gym Sessions (Phonk & Trap)',
    description: 'Moody, intense drift phonk and heavy 808 subs for hyper-focused evening lifting.',
    targetWorkout: 'Arms & Shoulders',
    tracks: [
      ALL_WORKOUT_TRACKS[0],
      ALL_WORKOUT_TRACKS[3],
      ALL_WORKOUT_TRACKS[4],
      ALL_WORKOUT_TRACKS[7],
    ],
  },
];
