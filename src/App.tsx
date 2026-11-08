import React, { useState, useEffect } from 'react';
import { 
  Flame, Bell, X, Play, Pause, SkipForward, Music, AlertCircle, 
  CheckCircle2, Award 
} from 'lucide-react';
import { 
  WorkoutSession, StreakInfo, BodyMeasurement, AchievementBadge, 
  TrackItem, Exercise 
} from './types/workout';
import { storage } from './services/storage';
import { streakManager, StreakAlert } from './services/streakNotifications';
import { audioEngine } from './services/audioPlayer';
import { ROUTINE_PRESETS } from './data/routines';
import { EXERCISE_DATABASE } from './data/exercises';
import { ALL_WORKOUT_TRACKS } from './data/playlists';

import { Navbar, NavTab } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { WorkoutLogger } from './components/WorkoutLogger';
import { ExerciseLibrary } from './components/ExerciseLibrary';
import { PlaylistPlayer } from './components/PlaylistPlayer';
import { BodyMetricsModal } from './components/BodyMetricsModal';
import { StreakNotificationModal } from './components/StreakNotificationModal';
import { DietPlan } from './components/DietPlan';
import { ShoppingSection } from './components/ShoppingSection';
import { LearningSection } from './components/LearningSection';
import { RewardsMenu } from './components/RewardsMenu';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  
  // Storage state
  const [streak, setStreak] = useState<StreakInfo>(() => storage.getStreak());
  const [sessions, setSessions] = useState<WorkoutSession[]>(() => storage.getSessions());
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(() => storage.getMeasurements());
  const [badges, setBadges] = useState<AchievementBadge[]>(() => storage.getBadges());
  const [userMode, setUserMode] = useState<'beast' | 'queen' | 'iron'>(() => storage.getUserMode());
  const [unit, setUnit] = useState<'kg' | 'lbs'>(() => storage.getUnitSystem());

  // Active workout
  const [activeSession, setActiveSession] = useState<WorkoutSession | null>(null);

  // Audio / Playlist state
  const [playlist, setPlaylist] = useState<TrackItem[]>(() => storage.getCurrentPlaylist());
  const [currentTrack, setCurrentTrack] = useState<TrackItem>(() => playlist[0] || ALL_WORKOUT_TRACKS[0]);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Modals & In-App Alerts
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false);
  const [currentAlert, setCurrentAlert] = useState<StreakAlert | null>(null);

  // Subscribe to streak notifications
  useEffect(() => {
    const unsubscribe = streakManager.subscribe((alert) => {
      setCurrentAlert(alert);
      // Auto dismiss after 6 seconds
      setTimeout(() => {
        setCurrentAlert((cur) => (cur?.id === alert.id ? null : cur));
      }, 6000);
    });
    return unsubscribe;
  }, []);

  // Sync playlist changes
  useEffect(() => {
    storage.saveCurrentPlaylist(playlist);
  }, [playlist]);

  // Handle unit toggle
  const handleToggleUnit = () => {
    const next = unit === 'kg' ? 'lbs' : 'kg';
    setUnit(next);
    storage.setUnitSystem(next);
  };

  // Handle user mode toggle
  const handleToggleUserMode = () => {
    const modes: ('beast' | 'queen' | 'iron')[] = ['beast', 'queen', 'iron'];
    const currentIdx = modes.indexOf(userMode);
    const nextMode = modes[(currentIdx + 1) % modes.length];
    setUserMode(nextMode);
    storage.setUserMode(nextMode);
  };

  // Start specific routine
  const handleStartRoutine = (routineId: string) => {
    const routine = ROUTINE_PRESETS.find((r) => r.id === routineId) || ROUTINE_PRESETS[0];
    const exercises = routine.exerciseIds.map((id) => {
      const ex = EXERCISE_DATABASE.find((e) => e.id === id);
      return {
        exerciseId: id,
        exerciseName: ex ? ex.name : 'Exercise',
        category: ex ? ex.category : 'Chest',
        sets: [
          { id: `s-${id}-1-${Date.now()}`, setNumber: 1, weight: 50, reps: 10, completed: false },
          { id: `s-${id}-2-${Date.now()}`, setNumber: 2, weight: 55, reps: 8, completed: false },
          { id: `s-${id}-3-${Date.now()}`, setNumber: 3, weight: 60, reps: 6, completed: false },
        ],
      };
    });

    setActiveSession({
      id: 'session-' + Date.now(),
      title: routine.name,
      date: new Date().toISOString(),
      durationMinutes: 0,
      totalVolumeKg: 0,
      exercises,
    });
    setActiveTab('workout');
  };

  // Start blank workout
  const handleStartBlank = () => {
    setActiveSession({
      id: 'session-' + Date.now(),
      title: 'Iron Strength Session',
      date: new Date().toISOString(),
      durationMinutes: 0,
      totalVolumeKg: 0,
      exercises: [
        {
          exerciseId: 'barbell-bench-press',
          exerciseName: 'Barbell Bench Press',
          category: 'Chest',
          sets: [
            { id: 's-1-' + Date.now(), setNumber: 1, weight: 60, reps: 10, completed: false },
            { id: 's-2-' + Date.now(), setNumber: 2, weight: 70, reps: 8, completed: false },
          ],
        },
      ],
    });
    setActiveTab('workout');
  };

  // Add exercise directly to active workout
  const handleAddExerciseToWorkout = (exercise: Exercise) => {
    if (!activeSession) {
      // Start a new session with this exercise!
      setActiveSession({
        id: 'session-' + Date.now(),
        title: `${exercise.category} Workout`,
        date: new Date().toISOString(),
        durationMinutes: 0,
        totalVolumeKg: 0,
        exercises: [
          {
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            category: exercise.category,
            sets: [
              { id: 's-1-' + Date.now(), setNumber: 1, weight: 40, reps: exercise.defaultReps || 10, completed: false },
              { id: 's-2-' + Date.now(), setNumber: 2, weight: 40, reps: exercise.defaultReps || 10, completed: false },
              { id: 's-3-' + Date.now(), setNumber: 3, weight: 40, reps: exercise.defaultReps || 10, completed: false },
            ],
          },
        ],
      });
      setActiveTab('workout');
    } else {
      // Append to active session
      setActiveSession({
        ...activeSession,
        exercises: [
          ...activeSession.exercises,
          {
            exerciseId: exercise.id,
            exerciseName: exercise.name,
            category: exercise.category,
            sets: [
              { id: 's-1-' + Date.now(), setNumber: 1, weight: 40, reps: exercise.defaultReps || 10, completed: false },
              { id: 's-2-' + Date.now(), setNumber: 2, weight: 40, reps: exercise.defaultReps || 10, completed: false },
            ],
          },
        ],
      });
    }
  };

  // On workout completed
  const handleFinishWorkout = (session: WorkoutSession) => {
    const updatedSessions = storage.saveSession(session);
    setSessions(updatedSessions);
    setActiveSession(null);

    // Advance streak and evaluate milestone achievements
    const { streak: updatedStreak, newlyUnlockedBadges } = streakManager.onWorkoutCompleted(session);
    setStreak(updatedStreak);
    if (newlyUnlockedBadges.length > 0) {
      setBadges(storage.getBadges());
    }

    setActiveTab('dashboard');
  };

  // Quick toggle music from persistent floating dock
  const toggleDockMusic = () => {
    if (isPlayingMusic) {
      audioEngine.pause();
      setIsPlayingMusic(false);
    } else {
      audioEngine.start(currentTrack.synthTheme, currentTrack.bpm);
      setIsPlayingMusic(true);
    }
  };

  const handleDockNext = () => {
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    const nextTrack = playlist[nextIndex];
    setCurrentTrack(nextTrack);
    if (isPlayingMusic) {
      audioEngine.start(nextTrack.synthTheme, nextTrack.bpm);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans pb-24 md:pb-16 selection:bg-amber-500/30 selection:text-amber-200">
      {/* In-App Floating Streak / Milestone Alert Toast */}
      {currentAlert && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full bg-zinc-900 border border-amber-500/60 rounded-2xl p-4 shadow-2xl animate-in slide-in-from-top-4 duration-300 flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center flex-shrink-0 text-amber-400">
            {currentAlert.type === 'milestone_unlocked' ? (
              <Award className="w-5 h-5 text-amber-400" />
            ) : (
              <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {currentAlert.title}
            </h4>
            <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
              {currentAlert.message}
            </p>
          </div>
          <button
            onClick={() => setCurrentAlert(null)}
            className="text-zinc-500 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={streak}
        onOpenStreakModal={() => setIsStreakModalOpen(true)}
        userMode={userMode}
        onToggleUserMode={handleToggleUserMode}
        unit={unit}
        onToggleUnit={handleToggleUnit}
        hasActiveWorkout={!!activeSession}
        isPlayingMusic={isPlayingMusic}
        currentTrackTitle={currentTrack.title}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && (
          <Dashboard
            streak={streak}
            onOpenStreakModal={() => setIsStreakModalOpen(true)}
            sessions={sessions}
            measurements={measurements}
            currentTrack={currentTrack}
            isPlayingMusic={isPlayingMusic}
            setIsPlayingMusic={setIsPlayingMusic}
            onStartRoutine={handleStartRoutine}
            onStartBlankWorkout={handleStartBlank}
            onNavigateToTab={setActiveTab}
            unit={unit}
            userMode={userMode}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutLogger
            activeSession={activeSession}
            setActiveSession={setActiveSession}
            onFinishWorkout={handleFinishWorkout}
            unit={unit}
            onNavigateToExercises={() => setActiveTab('exercises')}
            userMode={userMode}
          />
        )}

        {activeTab === 'exercises' && (
          <ExerciseLibrary
            onAddToWorkout={handleAddExerciseToWorkout}
            onQuickStartSingle={handleAddExerciseToWorkout}
            userMode={userMode}
          />
        )}

        {activeTab === 'diet' && (
          <DietPlan
            onNavigateToShop={() => setActiveTab('shop')}
            weightKg={measurements[0]?.weightKg || 81}
          />
        )}

        {activeTab === 'shop' && (
          <ShoppingSection />
        )}

        {activeTab === 'learn' && (
          <LearningSection />
        )}

        {activeTab === 'rewards' && (
          <RewardsMenu
            sessions={sessions}
            streak={streak}
            unit={unit}
          />
        )}

        {activeTab === 'playlist' && (
          <PlaylistPlayer
            currentTrack={currentTrack}
            setCurrentTrack={setCurrentTrack}
            playlist={playlist}
            setPlaylist={setPlaylist}
            isPlaying={isPlayingMusic}
            setIsPlaying={setIsPlayingMusic}
            onStartWorkoutWithPlaylist={() => {
              if (!activeSession) handleStartBlank();
              setActiveTab('workout');
            }}
          />
        )}

        {activeTab === 'metrics' && (
          <BodyMetricsModal
            measurements={measurements}
            setMeasurements={setMeasurements}
            unit={unit}
          />
        )}
      </main>

      {/* Persistent Bottom Floating Audio Mini-Dock (visible on all tabs when playlist has tracks) */}
      {activeTab !== 'playlist' && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 max-w-xl w-[92%] sm:w-auto bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2 shadow-2xl flex items-center justify-between gap-4">
          <div
            onClick={() => setActiveTab('playlist')}
            className="flex items-center gap-3 cursor-pointer min-w-0"
          >
            <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Music className={`w-4 h-4 ${isPlayingMusic ? 'animate-bounce' : ''}`} />
            </div>
            <div className="min-w-0 pr-2">
              <div className="text-xs font-bold text-white truncate max-w-[140px] sm:max-w-[200px]">
                {currentTrack.title}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono truncate">
                {currentTrack.bpm} BPM • {currentTrack.genre}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleDockMusic}
              className="w-8 h-8 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 flex items-center justify-center transition-all shadow"
            >
              {isPlayingMusic ? (
                <Pause className="w-4 h-4 fill-zinc-950" />
              ) : (
                <Play className="w-4 h-4 fill-zinc-950 ml-0.5" />
              )}
            </button>
            <button
              onClick={handleDockNext}
              className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center justify-center transition-colors"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('playlist')}
              className="text-[11px] font-semibold text-amber-400 hover:underline px-2 hidden sm:inline"
            >
              Forge Mix
            </button>
          </div>
        </div>
      )}

      {/* Streak & Notification Modal */}
      <StreakNotificationModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        streak={streak}
        setStreak={setStreak}
        badges={badges}
      />
    </div>
  );
}
