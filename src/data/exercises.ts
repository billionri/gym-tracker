import { Exercise } from '../types/workout';

export const EXERCISE_DATABASE: Exercise[] = [
  {
    "id": "push-ups",
    "name": "Push-Ups",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Triceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pushups.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pushups.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pushups.jpg",
    "isVideo": false
  },
  {
    "id": "shrugs",
    "name": "Shrugs",
    "category": "Shoulders",
    "primaryMuscles": [
      "Traps",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "shrugs.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/shrugs.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/shrugs.webp",
    "isVideo": false
  },
  {
    "id": "dumbbell-pullover",
    "name": "Dumbbell Pullover",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Lats",
      "Serratus"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "dumbbell-pullover.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/dumbbell-pullover.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/dumbbell-pullover.jpg",
    "isVideo": false
  },
  {
    "id": "wide-grip-pull-ups",
    "name": "Wide Grip Pull-Ups",
    "category": "Back",
    "primaryMuscles": [
      "Back",
      "Biceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pullups.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pullups.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pullups.jpg",
    "isVideo": false
  },
  {
    "id": "dumbbell-goblet-squat",
    "name": "Dumbbell Goblet Squat",
    "category": "Legs",
    "primaryMuscles": [
      "Quadriceps",
      "Glutes",
      "Hamstrings",
      "Core"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "dumbbell-goblet-squat.png",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/dumbbell-goblet-squat.png",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/dumbbell-goblet-squat.png",
    "isVideo": false
  },
  {
    "id": "bent-over-dumbbell-row",
    "name": "Bent-Over Dumbbell Row",
    "category": "Back",
    "primaryMuscles": [
      "Back",
      "Lats",
      "Rhomboids",
      "Biceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "best_dumbbell_back_exercises.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/best_dumbbell_back_exercises.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/best_dumbbell_back_exercises.jpg",
    "isVideo": false
  },
  {
    "id": "bench-press",
    "name": "Bench Press",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Triceps"
    ],
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "bench_press.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/bench_press.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/bench_press.jpg",
    "isVideo": false
  },
  {
    "id": "incline-bench-press",
    "name": "Incline Bench Press",
    "category": "Chest",
    "primaryMuscles": [
      "Upper Chest",
      "Triceps"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "incline_bench.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/incline_bench.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/incline_bench.jpg",
    "isVideo": false
  },
  {
    "id": "push-up-handles",
    "name": "Push-Up Handles",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Triceps",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "push-up-handles.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/push-up-handles.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/push-up-handles.gif",
    "isVideo": false
  },
  {
    "id": "dumbbell-fly",
    "name": "Dumbbell Fly",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "dumbbell_fly.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/dumbbell_fly.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/dumbbell_fly.jpg",
    "isVideo": false
  },
  {
    "id": "upward-fly",
    "name": "Upward Fly",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Front Delts"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "dumbbell-upward-fly.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/dumbbell-upward-fly.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/dumbbell-upward-fly.jpg",
    "isVideo": false
  },
  {
    "id": "seated-pec-fly",
    "name": "Seated Pec Fly",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": "Machine",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "seated_pec_fly.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/seated_pec_fly.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/seated_pec_fly.jpg",
    "isVideo": false
  },
  {
    "id": "standing-cable-fly",
    "name": "Standing Cable Fly",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Shoulders"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "standing_incline_cable.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/standing_incline_cable.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/standing_incline_cable.jpg",
    "isVideo": false
  },
  {
    "id": "plyo-push-up",
    "name": "Plyo Push-Up",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Explosive Power"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "plyo-push-up-muscles.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/plyo-push-up-muscles.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/plyo-push-up-muscles.webp",
    "isVideo": false
  },
  {
    "id": "diamond-push-up",
    "name": "Diamond Push-Up",
    "category": "Chest",
    "primaryMuscles": [
      "Triceps",
      "Inner Chest"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "diamond-pushup.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/diamond-pushup.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/diamond-pushup.gif",
    "isVideo": false
  },
  {
    "id": "sphinx-push-up",
    "name": "Sphinx Push-Up",
    "category": "Chest",
    "primaryMuscles": [
      "Triceps",
      "Core"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "sphinx-push-up.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/sphinx-push-up.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/sphinx-push-up.gif",
    "isVideo": false
  },
  {
    "id": "shoulder-tap-push-up",
    "name": "Shoulder Tap Push-Up",
    "category": "Chest",
    "primaryMuscles": [
      "Core",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "shoulder-tap-push-up.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/shoulder-tap-push-up.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/shoulder-tap-push-up.gif",
    "isVideo": false
  },
  {
    "id": "barbell-incline-wide-reverse-grip-bench-press",
    "name": "Barbell Incline Wide Reverse Grip Bench Press",
    "category": "Chest",
    "primaryMuscles": [
      "Chest"
    ],
    "equipment": "Barbell",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "chest/Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/chest/Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/chest/Barbell-Incline-Wide-Reverse-grip-Bench-Press_Chest.jpg",
    "isVideo": false
  },
  {
    "id": "wall-push-ups",
    "name": "Wall Push-Ups",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Beginners"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "wall-push-ups.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/wall-push-ups.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/wall-push-ups.gif",
    "isVideo": false
  },
  {
    "id": "flat-dumbbell-fly-inward-tilted-grip",
    "name": "Flat Dumbbell Fly (Inward/Tilted Grip)",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Intermediate"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "flat-dumbbell-fly-inward-grip.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/flat-dumbbell-fly-inward-grip.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/flat-dumbbell-fly-inward-grip.jpg",
    "isVideo": false
  },
  {
    "id": "incline-push-up",
    "name": "Incline Push-Up",
    "category": "Chest",
    "primaryMuscles": [
      "Lower Chest",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "incline-push-up-muscles.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/incline-push-up-muscles.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/incline-push-up-muscles.webp",
    "isVideo": false
  },
  {
    "id": "incline-push-up-bench",
    "name": "Incline Push-Up Bench",
    "category": "Chest",
    "primaryMuscles": [
      "Lower Chest",
      "Stability"
    ],
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "incline-push-up-bench.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/incline-push-up-bench.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/incline-push-up-bench.gif",
    "isVideo": false
  },
  {
    "id": "decline-barbell-bench-press",
    "name": "Decline Barbell Bench Press",
    "category": "Chest",
    "primaryMuscles": [
      "Lower Chest",
      "Pectorals"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "chest/decline_barbell_bench_press.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/chest/decline_barbell_bench_press.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/chest/decline_barbell_bench_press.jpg",
    "isVideo": false
  },
  {
    "id": "knuckle-push-ups",
    "name": "Knuckle Push-Ups",
    "category": "Chest",
    "primaryMuscles": [
      "Chest",
      "Triceps",
      "Wrists"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "knuckle-push-ups.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/knuckle-push-ups.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/knuckle-push-ups.gif",
    "isVideo": false
  },
  {
    "id": "deadlift",
    "name": "Deadlift",
    "category": "Back",
    "primaryMuscles": [
      "Back",
      "Hamstrings"
    ],
    "equipment": "Barbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "deadlift.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/deadlift.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/deadlift.jpg",
    "isVideo": false
  },
  {
    "id": "back-reverse-hyperextension-bench",
    "name": "Back Reverse Hyperextension Bench",
    "category": "Back",
    "primaryMuscles": [
      "Lower Back",
      "Glutes",
      "Hamstrings"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "back-reverse-hypertension-bench.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/back-reverse-hypertension-bench.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/back-reverse-hypertension-bench.jpg",
    "isVideo": false
  },
  {
    "id": "t-bar-row",
    "name": "T-Bar Row",
    "category": "Back",
    "primaryMuscles": [
      "Back",
      "Lats"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "t-bar-rows.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/t-bar-rows.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/t-bar-rows.gif",
    "isVideo": false
  },
  {
    "id": "rowing",
    "name": "Rowing",
    "category": "Back",
    "primaryMuscles": [
      "Back",
      "Biceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "rowing.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/rowing.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/rowing.jpg",
    "isVideo": false
  },
  {
    "id": "lat-pulldown",
    "name": "Lat Pulldown",
    "category": "Back",
    "primaryMuscles": [
      "Back",
      "Biceps"
    ],
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "lat_pulldown.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/lat_pulldown.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/lat_pulldown.jpg",
    "isVideo": false
  },
  {
    "id": "incline-rear-raise",
    "name": "Incline Rear Raise",
    "category": "Back",
    "primaryMuscles": [
      "Rear Delts",
      "Upper Back"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "dumbbell_incline_rear_lateral_raise.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/dumbbell_incline_rear_lateral_raise.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/dumbbell_incline_rear_lateral_raise.jpg",
    "isVideo": false
  },
  {
    "id": "machine-rear-delt-fly",
    "name": "Machine Rear Delt Fly",
    "category": "Back",
    "primaryMuscles": [
      "Rear Delts"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "machine_rear_delt_fly.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/machine_rear_delt_fly.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/machine_rear_delt_fly.jpg",
    "isVideo": false
  },
  {
    "id": "back-shrugs",
    "name": "Shrugs",
    "category": "Back",
    "primaryMuscles": [
      "Traps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "shrugs.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/shrugs.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/shrugs.jpg",
    "isVideo": false
  },
  {
    "id": "squats",
    "name": "Squats",
    "category": "Legs",
    "primaryMuscles": [
      "Quads",
      "Glutes"
    ],
    "equipment": "Barbell",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "squats.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/squats.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/squats.jpg",
    "isVideo": false
  },
  {
    "id": "leg-press",
    "name": "Leg Press",
    "category": "Legs",
    "primaryMuscles": [
      "Quads",
      "Glutes"
    ],
    "equipment": "Machine",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "leg_press.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/leg_press.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/leg_press.jpg",
    "isVideo": false
  },
  {
    "id": "lunges",
    "name": "Lunges",
    "category": "Legs",
    "primaryMuscles": [
      "Quads",
      "Glutes"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "lunges.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/lunges.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/lunges.jpg",
    "isVideo": false
  },
  {
    "id": "leg-extension",
    "name": "Leg Extension",
    "category": "Legs",
    "primaryMuscles": [
      "Quads"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "leg_extension.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/leg_extension.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/leg_extension.jpg",
    "isVideo": false
  },
  {
    "id": "standing-calf-raise",
    "name": "Standing Calf Raise",
    "category": "Legs",
    "primaryMuscles": [
      "Calves"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "calf_raise.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/calf_raise.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/calf_raise.jpg",
    "isVideo": false
  },
  {
    "id": "seated-calf-raise",
    "name": "Seated Calf Raise",
    "category": "Legs",
    "primaryMuscles": [
      "Calves"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "seated_calf_raises.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/seated_calf_raises.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/seated_calf_raises.jpg",
    "isVideo": false
  },
  {
    "id": "bent-knee-calf-raise",
    "name": "Bent Knee Calf Raise",
    "category": "Legs",
    "primaryMuscles": [
      "Calves"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "Best_Calf_Exercises_Bent_Knee_Calf_Raises.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/Best_Calf_Exercises_Bent_Knee_Calf_Raises.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/Best_Calf_Exercises_Bent_Knee_Calf_Raises.jpg",
    "isVideo": false
  },
  {
    "id": "lever-reverse-hyperextension",
    "name": "Lever Reverse Hyperextension",
    "category": "Legs",
    "primaryMuscles": [
      "Quads"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "lever-reverse-hyperextension.png",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/lever-reverse-hyperextension.png",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/lever-reverse-hyperextension.png",
    "isVideo": false
  },
  {
    "id": "overhead-press",
    "name": "Overhead Press",
    "category": "Shoulders",
    "primaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "overhead_press.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/overhead_press.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/overhead_press.jpg",
    "isVideo": false
  },
  {
    "id": "dumbbell-shoulder-press",
    "name": "Dumbbell Shoulder Press",
    "category": "Shoulders",
    "primaryMuscles": [
      "Shoulders"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "shoulder_dumbell.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/shoulder_dumbell.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/shoulder_dumbell.jpg",
    "isVideo": false
  },
  {
    "id": "sitting-dumbbell-shoulder-press",
    "name": "Sitting Dumbbell Shoulder Press",
    "category": "Shoulders",
    "primaryMuscles": [
      "Shoulders"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "shoulders/sitting_dunbell_shoulder_press.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/shoulders/sitting_dunbell_shoulder_press.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/shoulders/sitting_dunbell_shoulder_press.jpg",
    "isVideo": false
  },
  {
    "id": "handstand-push-up",
    "name": "Handstand Push-Up",
    "category": "Shoulders",
    "primaryMuscles": [
      "Shoulders",
      "Triceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "handstand-pushup.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/handstand-pushup.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/handstand-pushup.gif",
    "isVideo": false
  },
  {
    "id": "decline-pike-push-up",
    "name": "Decline Pike Push-Up",
    "category": "Shoulders",
    "primaryMuscles": [
      "Shoulders",
      "Upper Body"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "decline-pike-push-up.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/decline-pike-push-up.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/decline-pike-push-up.gif",
    "isVideo": false
  },
  {
    "id": "shoulder-push-ups",
    "name": "Shoulder Push-Ups",
    "category": "Shoulders",
    "primaryMuscles": [
      "Shoulders",
      "Core"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "shoulder-pushups.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/shoulder-pushups.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/shoulder-pushups.gif",
    "isVideo": false
  },
  {
    "id": "drag-curl",
    "name": "Drag Curl",
    "category": "Arms",
    "primaryMuscles": [
      "Biceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "dumbbell_drag_curl.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/dumbbell_drag_curl.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/dumbbell_drag_curl.jpg",
    "isVideo": false
  },
  {
    "id": "spider-curl",
    "name": "Spider Curl",
    "category": "Arms",
    "primaryMuscles": [
      "Biceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "spider_curl_biceps.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/spider_curl_biceps.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/spider_curl_biceps.jpg",
    "isVideo": false
  },
  {
    "id": "tricep-extension",
    "name": "Tricep Extension",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "tricep_extension.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/tricep_extension.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/tricep_extension.jpg",
    "isVideo": false
  },
  {
    "id": "dumbbell-one-arm-shoulder-press",
    "name": "Dumbbell One Arm Shoulder Press",
    "category": "Arms",
    "primaryMuscles": [
      "Shoulders"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/Dumbbell-One-Arm-Shoulder-Press.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/Dumbbell-One-Arm-Shoulder-Press.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/Dumbbell-One-Arm-Shoulder-Press.webp",
    "isVideo": false
  },
  {
    "id": "cable-single-arm-triceps-pushdown-rope-attachment",
    "name": "Cable Single Arm Triceps Pushdown (Rope Attachment)",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Cable",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/cable-single-arm-triceps-pushdown-rope-attachment.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/cable-single-arm-triceps-pushdown-rope-attachment.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/cable-single-arm-triceps-pushdown-rope-attachment.webp",
    "isVideo": false
  },
  {
    "id": "leverage-incline-chest-press",
    "name": "Leverage Incline Chest Press",
    "category": "Chest",
    "primaryMuscles": [
      "Chest"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "chest/Leverage-Incline-Chest-Press_Chest_max-scaled.jpeg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/chest/Leverage-Incline-Chest-Press_Chest_max-scaled.jpeg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/chest/Leverage-Incline-Chest-Press_Chest_max-scaled.jpeg",
    "isVideo": false
  },
  {
    "id": "low-cable-fly",
    "name": "Low Cable Fly",
    "category": "Chest",
    "primaryMuscles": [
      "Upper Chest"
    ],
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "chest/low_cable_flies_chest.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/chest/low_cable_flies_chest.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/chest/low_cable_flies_chest.webp",
    "isVideo": false
  },
  {
    "id": "cable-front-raise",
    "name": "Cable Front Raise",
    "category": "Chest",
    "primaryMuscles": [
      "Upper Chest"
    ],
    "equipment": "Cable",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "chest/chest_cable_raise.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/chest/chest_cable_raise.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/chest/chest_cable_raise.webp",
    "isVideo": false
  },
  {
    "id": "cable-fly-machine",
    "name": "Cable Fly Machine",
    "category": "Chest",
    "primaryMuscles": [
      "Chest"
    ],
    "equipment": "Cable",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "chest/cable_flys_machine.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/chest/cable_flys_machine.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/chest/cable_flys_machine.webp",
    "isVideo": false
  },
  {
    "id": "cable-triceps-kickback",
    "name": "Cable Triceps Kickback",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/kickbacks-kabelzug.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/kickbacks-kabelzug.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/kickbacks-kabelzug.webp",
    "isVideo": false
  },
  {
    "id": "ez-bar-preacher-curl",
    "name": "EZ Bar Preacher Curl",
    "category": "Arms",
    "primaryMuscles": [
      "Biceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/ez-barbell-preacher-curl.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/ez-barbell-preacher-curl.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/ez-barbell-preacher-curl.webp",
    "isVideo": false
  },
  {
    "id": "seated-dumbbell-bicep-curl",
    "name": "Seated Dumbbell Bicep Curl",
    "category": "Arms",
    "primaryMuscles": [
      "Biceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/sitting_bicep.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/sitting_bicep.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/sitting_bicep.webp",
    "isVideo": false
  },
  {
    "id": "dumbbell-one-arm-tricep",
    "name": "Dumbbell One Arm Tricep",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/Dumbbell-One-Arm-Tricep.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/Dumbbell-One-Arm-Tricep.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/Dumbbell-One-Arm-Tricep.webp",
    "isVideo": false
  },
  {
    "id": "reverse-tricep-pushdown",
    "name": "Reverse Tricep Pushdown",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "reverse_triceps_pushdown.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/reverse_triceps_pushdown.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/reverse_triceps_pushdown.jpg",
    "isVideo": false
  },
  {
    "id": "two-arm-dumbbell-extension",
    "name": "Two-Arm Dumbbell Extension",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "two_arm_dumbbell_extension.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/two_arm_dumbbell_extension.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/two_arm_dumbbell_extension.jpg",
    "isVideo": false
  },
  {
    "id": "tricep-dips",
    "name": "Tricep Dips",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "tricep-dips.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/tricep-dips.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/tricep-dips.webp",
    "isVideo": false
  },
  {
    "id": "best-inner-chest-exercises",
    "name": "Best Inner Chest Exercises",
    "category": "Chest",
    "primaryMuscles": [
      "Inner Chest",
      "Pectorals"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/best_inner_chest_exercises.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/best_inner_chest_exercises.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/best_inner_chest_exercises.webp",
    "isVideo": false
  },
  {
    "id": "medial-head-tricep-exercises",
    "name": "Medial Head Tricep Exercises",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps (Medial Head)"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/medial_head_exercises.png",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/medial_head_exercises.png",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/medial_head_exercises.png",
    "isVideo": false
  },
  {
    "id": "cable-standing-one-arm-tricep-pushdown",
    "name": "Cable Standing One Arm Tricep Pushdown",
    "category": "Arms",
    "primaryMuscles": [
      "Triceps"
    ],
    "equipment": "Cable",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/cable-standing-one-arm-tricep-pushdown-overhand-grip_upper-arms_max.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/cable-standing-one-arm-tricep-pushdown-overhand-grip_upper-arms_max.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/cable-standing-one-arm-tricep-pushdown-overhand-grip_upper-arms_max.jpg",
    "isVideo": false
  },
  {
    "id": "ez-bar-wide-grip-upright-row",
    "name": "EZ Bar Wide Grip Upright Row",
    "category": "Arms",
    "primaryMuscles": [
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/ez_bar_wide_grip_upright_row_exercise.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/ez_bar_wide_grip_upright_row_exercise.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/ez_bar_wide_grip_upright_row_exercise.jpg",
    "isVideo": false
  },
  {
    "id": "two-arm-dumbbell-curl",
    "name": "Two Arm Dumbbell Curl",
    "category": "Arms",
    "primaryMuscles": [
      "Biceps"
    ],
    "equipment": "Dumbbell",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/two_arm_dumbbell_curl_exercise.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/two_arm_dumbbell_curl_exercise.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/two_arm_dumbbell_curl_exercise.jpg",
    "isVideo": false
  },
  {
    "id": "standing-barbell-concentration-curl",
    "name": "Standing Barbell Concentration Curl",
    "category": "Arms",
    "primaryMuscles": [
      "Biceps"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "arms/standing_barbell_concentration_curl.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/arms/standing_barbell_concentration_curl.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/arms/standing_barbell_concentration_curl.jpg",
    "isVideo": false
  },
  {
    "id": "plank",
    "name": "Plank",
    "category": "Core",
    "primaryMuscles": [
      "Core"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "plank.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/plank.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/plank.jpg",
    "isVideo": false
  },
  {
    "id": "sit-ups",
    "name": "Sit-Ups",
    "category": "Core",
    "primaryMuscles": [
      "Core",
      "Abs"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "situps.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/situps.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/situps.jpg",
    "isVideo": false
  },
  {
    "id": "mountain-climbers",
    "name": "Mountain Climbers",
    "category": "Core",
    "primaryMuscles": [
      "Core",
      "Cardio"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "mountain_climbers.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/mountain_climbers.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/mountain_climbers.jpg",
    "isVideo": false
  },
  {
    "id": "decline-crunch",
    "name": "Decline Crunch",
    "category": "Core",
    "primaryMuscles": [
      "Core",
      "Cardio"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "core/Decline-Crunch.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/core/Decline-Crunch.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/core/Decline-Crunch.webp",
    "isVideo": false
  },
  {
    "id": "stretching",
    "name": "Stretching",
    "category": "Core",
    "primaryMuscles": [
      "Flexibility"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "stretching.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/stretching.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/stretching.jpg",
    "isVideo": false
  },
  {
    "id": "yoga",
    "name": "Yoga",
    "category": "Core",
    "primaryMuscles": [
      "Flexibility",
      "Core"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "yoga_pose.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/yoga_pose.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/yoga_pose.jpg",
    "isVideo": false
  },
  {
    "id": "burpees",
    "name": "Burpees",
    "category": "Cardio",
    "primaryMuscles": [
      "Full Body"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "burpees.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/burpees.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/burpees.jpg",
    "isVideo": false
  },
  {
    "id": "high-knees",
    "name": "High Knees",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Core"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "high_knees.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/high_knees.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/high_knees.jpg",
    "isVideo": false
  },
  {
    "id": "jump-rope",
    "name": "Jump Rope",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Calves"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "jump_rope.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/jump_rope.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/jump_rope.jpg",
    "isVideo": false
  },
  {
    "id": "cycling",
    "name": "Cycling",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Legs"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "cycling.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/cycling.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/cycling.jpg",
    "isVideo": false
  },
  {
    "id": "treadmill",
    "name": "Treadmill",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "treadmill.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/treadmill.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/treadmill.jpg",
    "isVideo": false
  },
  {
    "id": "walk-cycle",
    "name": "Walk Cycle",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Legs"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "walk_cycle_machine.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/walk_cycle_machine.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/walk_cycle_machine.jpg",
    "isVideo": false
  },
  {
    "id": "surya-namaskar",
    "name": "Surya Namaskar",
    "category": "Flexibility",
    "primaryMuscles": [
      "Full Body",
      "Flexibility"
    ],
    "equipment": "Mat / None",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "surya-namaskar.webp",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/surya-namaskar.webp",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/surya-namaskar.webp",
    "isVideo": false
  },
  {
    "id": "running",
    "name": "Running",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Legs"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "cardio_images/running.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/cardio_images/running.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/cardio_images/running.jpg",
    "isVideo": false
  },
  {
    "id": "hiit-workout",
    "name": "HIIT Workout",
    "category": "Cardio",
    "primaryMuscles": [
      "Full Body",
      "Cardio"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "cardio_images/High-Knee-Skips_Cardio.gif",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/cardio_images/High-Knee-Skips_Cardio.gif",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/cardio_images/High-Knee-Skips_Cardio.gif",
    "isVideo": false
  },
  {
    "id": "boxing",
    "name": "Boxing",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Upper Body"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "cardio_images/boxing.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/cardio_images/boxing.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/cardio_images/boxing.jpg",
    "isVideo": false
  },
  {
    "id": "jump-squat",
    "name": "Jump Squat",
    "category": "Cardio",
    "primaryMuscles": [
      "Cardio",
      "Legs"
    ],
    "equipment": "Cardio Machine",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 20,
    "imageFilename": "cardio_images/jump-squat.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/cardio_images/jump-squat.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/cardio_images/jump-squat.jpg",
    "isVideo": false
  },
  {
    "id": "teaser-pilates",
    "name": "Teaser Pilates",
    "category": "Pilates",
    "primaryMuscles": [
      "Core"
    ],
    "equipment": "Mat / None",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pilates_images/teaser-pilates.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pilates_images/teaser-pilates.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pilates_images/teaser-pilates.jpg",
    "isVideo": false
  },
  {
    "id": "side-bridge-hip-abduction",
    "name": "Side Bridge Hip Abduction",
    "category": "Pilates",
    "primaryMuscles": [
      "Glutes",
      "Core"
    ],
    "equipment": "Mat / None",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pilates_images/side-bridge-hip-abduction.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pilates_images/side-bridge-hip-abduction.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pilates_images/side-bridge-hip-abduction.jpg",
    "isVideo": false
  },
  {
    "id": "dead-bug",
    "name": "Dead Bug",
    "category": "Pilates",
    "primaryMuscles": [
      "Core"
    ],
    "equipment": "Mat / None",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pilates_images/dead-bug.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pilates_images/dead-bug.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pilates_images/dead-bug.jpg",
    "isVideo": false
  },
  {
    "id": "banded-glute-bridge",
    "name": "Banded Glute Bridge",
    "category": "Pilates",
    "primaryMuscles": [
      "Glutes"
    ],
    "equipment": "Mat / None",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pilates_images/banded-glute-bridge.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pilates_images/banded-glute-bridge.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pilates_images/banded-glute-bridge.jpg",
    "isVideo": false
  },
  {
    "id": "swiss-ball-rollout",
    "name": "Swiss Ball Rollout",
    "category": "Pilates",
    "primaryMuscles": [
      "Core"
    ],
    "equipment": "Mat / None",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "pilates_images/swiss-ball-rollout.jpg",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/pilates_images/swiss-ball-rollout.jpg",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/pilates_images/swiss-ball-rollout.jpg",
    "isVideo": false
  },
  {
    "id": "wide-grip-chest-dip-on-high-parallel-bars",
    "name": "Wide-Grip Chest Dip on High Parallel Bars",
    "category": "Strength",
    "primaryMuscles": [
      "Chest",
      "Triceps",
      "Shoulders"
    ],
    "equipment": "Bodyweight",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "wide-grip-chest-dip-on-high-parallel-bars-exercise-video.mp4",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/wide-grip-chest-dip-on-high-parallel-bars-exercise-video.mp4",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/wide-grip-chest-dip-on-high-parallel-bars-exercise-video.mp4",
    "isVideo": true
  },
  {
    "id": "barbell-side-bent-version-2",
    "name": "Barbell Side Bent (Version 2)",
    "category": "Strength",
    "primaryMuscles": [
      "Obliques",
      "Core"
    ],
    "equipment": "Barbell",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": true,
    "defaultSets": 3,
    "defaultReps": 10,
    "imageFilename": "barbell-side-bent-version-2.png",
    "imageUrl": "https://gym-tracker.infinityfreeapp.com/images/barbell-side-bent-version-2.png",
    "femaleImageUrl": "https://gym-tracker.infinityfreeapp.com/images/female/barbell-side-bent-version-2.png",
    "isVideo": false
  },
  {
    "id": "cricket-practice",
    "name": "Cricket Practice",
    "category": "Outdoor",
    "primaryMuscles": [
      "Full Body",
      "Agility"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🏏",
    "isVideo": false
  },
  {
    "id": "football",
    "name": "Football",
    "category": "Outdoor",
    "primaryMuscles": [
      "Cardio",
      "Legs",
      "Agility"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "⚽",
    "isVideo": false
  },
  {
    "id": "badminton",
    "name": "Badminton",
    "category": "Outdoor",
    "primaryMuscles": [
      "Cardio",
      "Reflexes"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🏸",
    "isVideo": false
  },
  {
    "id": "basketball",
    "name": "Basketball",
    "category": "Outdoor",
    "primaryMuscles": [
      "Cardio",
      "Full Body"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🏀",
    "isVideo": false
  },
  {
    "id": "outdoor-swim",
    "name": "Outdoor Swim",
    "category": "Outdoor",
    "primaryMuscles": [
      "Full Body",
      "Endurance"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🏊",
    "isVideo": false
  },
  {
    "id": "outdoor-cycling",
    "name": "Outdoor Cycling",
    "category": "Outdoor",
    "primaryMuscles": [
      "Legs",
      "Cardio"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Intermediate",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🚴",
    "isVideo": false
  },
  {
    "id": "trekking",
    "name": "Trekking",
    "category": "Outdoor",
    "primaryMuscles": [
      "Legs",
      "Endurance"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Advanced",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🥾",
    "isVideo": false
  },
  {
    "id": "tennis",
    "name": "Tennis",
    "category": "Outdoor",
    "primaryMuscles": [
      "Full Body",
      "Reflexes"
    ],
    "equipment": "Sport / Outdoors",
    "difficulty": "Beginner",
    "instructions": "Focus on deliberate mind-muscle connection. Control eccentric descent, pause briefly at peak stretch, and contract powerfully through the concentric phase.",
    "tips": "Breathe out on exertion and keep core braced.",
    "isPro": false,
    "defaultSets": 3,
    "defaultReps": 10,
    "icon": "🎾",
    "isVideo": false
  }
];

export function getExerciseMediaSrc(exercise: Exercise, userMode: 'beast' | 'queen' | 'iron'): string | undefined {
  if (userMode === 'queen' && exercise.femaleImageUrl) {
    return exercise.femaleImageUrl;
  }
  return exercise.imageUrl;
}
