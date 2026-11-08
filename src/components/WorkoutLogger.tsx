import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, Plus, Trash2, Check, Clock, Dumbbell, Sparkles, 
  RotateCcw, Award, Star, AlertCircle, ChevronRight, X 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  WorkoutSession, WorkoutExerciseLog, WorkoutSet, Exercise, RoutinePreset 
} from '../types/workout';
import { EXERCISE_DATABASE } from '../data/exercises';
import { ROUTINE_PRESETS } from '../data/routines';
import { audioEngine } from '../services/audioPlayer';
import { ExerciseMedia } from './ExerciseMedia';

interface WorkoutLoggerProps {
  activeSession: WorkoutSession | null;
  setActiveSession: React.Dispatch<React.SetStateAction<WorkoutSession | null>>;
  onFinishWorkout: (session: WorkoutSession) => void;
  unit: 'kg' | 'lbs';
  onNavigateToExercises: () => void;
  userMode: 'beast' | 'queen' | 'iron';
}

export const WorkoutLogger: React.FC<WorkoutLoggerProps> = ({
  activeSession,
  setActiveSession,
  onFinishWorkout,
  unit,
  onNavigateToExercises,
  userMode,
}) => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [finishRating, setFinishRating] = useState(5);
  const [finishNotes, setFinishNotes] = useState('');
  
  // Rest Timer state
  const [restSecondsRemaining, setRestSecondsRemaining] = useState<number | null>(null);
  const [isRestActive, setIsRestActive] = useState(false);

  // Active workout timer tick
  useEffect(() => {
    let interval: number | null = null;
    if (activeSession && isTimerRunning) {
      interval = window.setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [activeSession, isTimerRunning]);

  // Rest Timer countdown tick
  useEffect(() => {
    let timer: number | null = null;
    if (isRestActive && restSecondsRemaining !== null && restSecondsRemaining > 0) {
      timer = window.setInterval(() => {
        setRestSecondsRemaining((prev) => {
          if (prev === null) return null;
          if (prev <= 1) {
            // Beep at zero!
            audioEngine.playRestBeep(true);
            setIsRestActive(false);
            return 0;
          }
          if (prev <= 4) {
            // Beep countdown 3, 2, 1
            audioEngine.playRestBeep(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRestActive, restSecondsRemaining]);

  const formatTime = (secs: number) => {
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Start new blank session
  const startBlankWorkout = () => {
    const newSession: WorkoutSession = {
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
            { id: 's-' + Date.now() + '-1', setNumber: 1, weight: 60, reps: 10, completed: false },
            { id: 's-' + Date.now() + '-2', setNumber: 2, weight: 70, reps: 8, completed: false },
            { id: 's-' + Date.now() + '-3', setNumber: 3, weight: 80, reps: 6, completed: false },
          ],
        },
      ],
    };
    setActiveSession(newSession);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  // Start from a pre-built routine preset
  const startRoutine = (routine: RoutinePreset) => {
    const exercises: WorkoutExerciseLog[] = routine.exerciseIds.map((id) => {
      const ex = EXERCISE_DATABASE.find((e) => e.id === id);
      const name = ex ? ex.name : 'Exercise';
      const category = ex ? ex.category : 'Chest';
      const defaultSets = ex?.defaultSets || 3;
      const defaultReps = ex?.defaultReps || 10;

      const sets: WorkoutSet[] = Array.from({ length: defaultSets }).map((_, idx) => ({
        id: `s-${id}-${idx}-${Date.now()}`,
        setNumber: idx + 1,
        weight: 40,
        reps: defaultReps,
        completed: false,
      }));

      return {
        exerciseId: id,
        exerciseName: name,
        category,
        sets,
      };
    });

    const newSession: WorkoutSession = {
      id: 'session-' + Date.now(),
      title: routine.name,
      date: new Date().toISOString(),
      durationMinutes: 0,
      totalVolumeKg: 0,
      exercises,
    };

    setActiveSession(newSession);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
  };

  // Trigger Rest Timer
  const triggerRestTimer = (seconds: number = 60) => {
    setRestSecondsRemaining(seconds);
    setIsRestActive(true);
  };

  // Toggle set completion
  const handleToggleSet = (exerciseIdx: number, setIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    const currentSet = updated.exercises[exerciseIdx].sets[setIdx];
    const willBeCompleted = !currentSet.completed;
    currentSet.completed = willBeCompleted;

    if (willBeCompleted) {
      // Auto trigger 60s rest timer
      triggerRestTimer(60);
    }

    // Recalculate total volume
    let vol = 0;
    updated.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          vol += (s.weight || 0) * (s.reps || 0);
        }
      });
    });
    updated.totalVolumeKg = vol;

    setActiveSession(updated);
  };

  // Update set weight or reps
  const handleUpdateSet = (exerciseIdx: number, setIdx: number, field: 'weight' | 'reps', val: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    updated.exercises[exerciseIdx].sets[setIdx][field] = Math.max(0, val);

    // Update volume
    let vol = 0;
    updated.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        if (s.completed) {
          vol += (s.weight || 0) * (s.reps || 0);
        }
      });
    });
    updated.totalVolumeKg = vol;

    setActiveSession(updated);
  };

  // Add a set to an exercise
  const handleAddSet = (exerciseIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    const sets = updated.exercises[exerciseIdx].sets;
    const lastSet = sets[sets.length - 1];
    const newSet: WorkoutSet = {
      id: 's-' + Date.now(),
      setNumber: sets.length + 1,
      weight: lastSet ? lastSet.weight : 50,
      reps: lastSet ? lastSet.reps : 10,
      completed: false,
    };
    sets.push(newSet);
    setActiveSession(updated);
  };

  // Remove set
  const handleRemoveSet = (exerciseIdx: number, setIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    updated.exercises[exerciseIdx].sets.splice(setIdx, 1);
    // Renumber
    updated.exercises[exerciseIdx].sets.forEach((s, idx) => {
      s.setNumber = idx + 1;
    });
    setActiveSession(updated);
  };

  // Remove exercise from session
  const handleRemoveExercise = (exerciseIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    updated.exercises.splice(exerciseIdx, 1);
    setActiveSession(updated);
  };

  // Add exercise from picker
  const handleAddExerciseToSession = (ex: Exercise) => {
    if (!activeSession) return;
    const newLog: WorkoutExerciseLog = {
      exerciseId: ex.id,
      exerciseName: ex.name,
      category: ex.category,
      sets: [
        { id: 's-' + Date.now() + '-1', setNumber: 1, weight: 40, reps: ex.defaultReps || 10, completed: false },
        { id: 's-' + Date.now() + '-2', setNumber: 2, weight: 40, reps: ex.defaultReps || 10, completed: false },
        { id: 's-' + Date.now() + '-3', setNumber: 3, weight: 40, reps: ex.defaultReps || 10, completed: false },
      ],
    };
    setActiveSession({
      ...activeSession,
      exercises: [...activeSession.exercises, newLog],
    });
    setShowAddModal(false);
  };

  // Finish Workout
  const handleConfirmFinish = () => {
    if (!activeSession) return;
    const finalSession: WorkoutSession = {
      ...activeSession,
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      rating: finishRating,
      notes: finishNotes || 'Workout Done, great session, warrior!',
    };

    // Confetti explosion
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#f97316', '#10b981', '#3b82f6'],
      });
    } catch {
      // ignore
    }

    audioEngine.playCelebrationChime();
    onFinishWorkout(finalSession);
    setShowFinishModal(false);
  };

  // Discard workout
  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard this workout? Current progress will be lost.')) {
      setActiveSession(null);
      setElapsedSeconds(0);
    }
  };

  // If no active session, show quick-start dashboard
  if (!activeSession) {
    return (
      <div className="space-y-8">
        {/* Banner */}
        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 md:p-8 text-center max-w-2xl mx-auto shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/20">
            <Dumbbell className="w-8 h-8 text-zinc-950 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Ready to Forge Iron Today?
          </h2>
          <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            Log your sets, auto-track rest times, pump up today's playlist, and advance your daily gym streak!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={startBlankWorkout}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-zinc-950 font-black text-sm uppercase tracking-wider hover:brightness-110 shadow-lg shadow-amber-500/25 transition-all cursor-pointer"
            >
              Start Empty Workout
            </button>
            <button
              onClick={onNavigateToExercises}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm border border-zinc-700 transition-colors"
            >
              Browse GymForge Vault
            </button>
          </div>
        </div>

        {/* Pre-built routine splits */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-white">Recommended Workout Splits</h3>
              <p className="text-xs text-zinc-400">Jump right into battle-tested GymForge routines</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROUTINE_PRESETS.map((routine) => (
              <div
                key={routine.id}
                className="rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 p-5 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {routine.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {routine.estimatedMinutes}m
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                    {routine.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {routine.description}
                  </p>
                  <div className="text-[11px] text-zinc-500 font-mono mt-3">
                    {routine.exerciseIds.length} exercises programmed
                  </div>
                </div>

                <button
                  onClick={() => startRoutine(routine)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-zinc-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Start This Routine</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate live volume
  const totalVolume = activeSession.exercises.reduce((acc, ex) => {
    return acc + ex.sets.reduce((sAcc, s) => s.completed ? sAcc + (s.weight * s.reps) : sAcc, 0);
  }, 0);

  const displayVolume = unit === 'kg' ? totalVolume : Math.round(totalVolume * 2.20462);

  return (
    <div className="space-y-6">
      {/* Active Workout Header Card */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider font-mono">
                Active Workout in Progress
              </span>
            </div>
            <input
              type="text"
              value={activeSession.title}
              onChange={(e) => setActiveSession({ ...activeSession, title: e.target.value })}
              className="text-xl md:text-2xl font-black text-white bg-transparent border-b border-dashed border-zinc-700 hover:border-amber-500 focus:border-amber-500 focus:outline-none transition-colors"
            />
          </div>

          {/* Timer & Live Volume Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <Clock className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-base font-bold text-white">
                {formatTime(elapsedSeconds)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-zinc-500 hover:text-zinc-300 ml-1"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-zinc-950 border border-zinc-800">
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Volume</div>
              <div className="font-mono text-base font-bold text-amber-400">
                {displayVolume.toLocaleString()} {unit}
              </div>
            </div>

            <button
              onClick={() => setShowFinishModal(true)}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-zinc-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
            >
              Finish Workout
            </button>

            <button
              onClick={handleDiscard}
              className="p-2.5 rounded-xl bg-zinc-800 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 border border-zinc-700 transition-colors"
              title="Discard session"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Rest Timer Bar if active */}
        {restSecondsRemaining !== null && restSecondsRemaining > 0 && (
          <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center justify-between bg-amber-500/10 rounded-xl p-3 border border-amber-500/30 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-amber-400 animate-ping" />
              <div>
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Rest Timer
                </span>
                <div className="font-mono text-lg font-black text-white">
                  {formatTime(restSecondsRemaining)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRestSecondsRemaining((prev) => (prev ? prev + 30 : 30))}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white"
              >
                +30s
              </button>
              <button
                onClick={() => setRestSecondsRemaining(0)}
                className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-bold text-zinc-400 hover:text-white"
              >
                Skip Rest
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercises in Session */}
      <div className="space-y-4">
        {activeSession.exercises.map((exerciseLog, exIdx) => (
          <div
            key={exerciseLog.exerciseId + '-' + exIdx}
            className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-lg"
          >
            {/* Exercise Row Header */}
            {(() => {
              const exDef = EXERCISE_DATABASE.find((e) => e.id === exerciseLog.exerciseId);
              return (
                <div className="p-4 bg-zinc-950/60 border-b border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {exDef && (
                      <div className="w-12 h-12 flex-shrink-0">
                        <ExerciseMedia
                          exercise={exDef}
                          userMode={userMode}
                          heightClass="h-12 w-12"
                        />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {exerciseLog.category}
                        </span>
                        {exDef?.isPro && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            PRO
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-white text-base truncate">
                        {exerciseLog.exerciseName}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerRestTimer(90)}
                      className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-mono text-zinc-300 transition-colors"
                      title="Quick 90s Rest Timer"
                    >
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>90s Rest</span>
                    </button>

                    <button
                      onClick={() => handleRemoveExercise(exIdx)}
                      className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                      title="Remove exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Sets Table */}
            <div className="p-4 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                  <tr className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider border-b border-zinc-800/80">
                    <th className="pb-2 w-16">SET</th>
                    <th className="pb-2 w-28">PREVIOUS</th>
                    <th className="pb-2 w-32">{unit.toUpperCase()}</th>
                    <th className="pb-2 w-32">REPS</th>
                    <th className="pb-2 w-20 text-center">DONE</th>
                    <th className="pb-2 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/40">
                  {exerciseLog.sets.map((set, setIdx) => (
                    <tr
                      key={set.id}
                      className={`transition-colors ${
                        set.completed ? 'bg-emerald-500/5' : 'hover:bg-zinc-800/20'
                      }`}
                    >
                      <td className="py-2.5 font-mono text-xs font-bold text-zinc-400">
                        {set.setNumber}
                      </td>
                      <td className="py-2.5 font-mono text-xs text-zinc-500">
                        {set.weight} {unit} × {set.reps}
                      </td>
                      <td className="py-2.5">
                        <input
                          type="number"
                          value={set.weight || ''}
                          onChange={(e) => handleUpdateSet(exIdx, setIdx, 'weight', Number(e.target.value))}
                          className="w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </td>
                      <td className="py-2.5">
                        <input
                          type="number"
                          value={set.reps || ''}
                          onChange={(e) => handleUpdateSet(exIdx, setIdx, 'reps', Number(e.target.value))}
                          className="w-24 bg-zinc-950 border border-zinc-800 rounded-lg px-2.5 py-1 text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                        />
                      </td>
                      <td className="py-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleSet(exIdx, setIdx)}
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all ${
                            set.completed
                              ? 'bg-emerald-500 text-zinc-950 shadow-md'
                              : 'bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:text-white border border-zinc-700'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => handleRemoveSet(exIdx, setIdx)}
                          className="text-zinc-600 hover:text-red-400 transition-colors p-1"
                          title="Remove set"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-3 pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleAddSet(exIdx)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Set</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exercise Trigger Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-zinc-900 hover:bg-zinc-800 border border-dashed border-zinc-700 hover:border-amber-500/80 text-sm font-bold text-zinc-200 hover:text-white transition-all shadow-md"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Exercise from Gym Vault</span>
        </button>
      </div>

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-white text-base">Select Exercise</h3>
                <p className="text-xs text-zinc-400">Choose from the GymForge movement library</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto divide-y divide-zinc-800/60 space-y-1">
              {EXERCISE_DATABASE.map((ex) => (
                <div
                  key={`${ex.id}-${ex.category}`}
                  onClick={() => handleAddExerciseToSession(ex)}
                  className="py-2.5 px-3 rounded-xl hover:bg-zinc-800/60 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 flex-shrink-0">
                      <ExerciseMedia
                        exercise={ex}
                        userMode={userMode}
                        heightClass="h-12 w-12"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                          {ex.category}
                        </span>
                        <span className="text-sm font-semibold text-white truncate">
                          {ex.name}
                        </span>
                        {ex.isPro && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                            PRO
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-400 mt-0.5 truncate">
                        {ex.primaryMuscles.join(', ')} • {ex.equipment}
                      </div>
                    </div>
                  </div>
                  <button className="px-2.5 py-1 rounded-lg bg-zinc-800 text-xs font-semibold text-amber-400 flex-shrink-0">
                    Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Finish Workout Summary Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
              <Award className="w-8 h-8 text-zinc-950 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                Workout Done, Great Session, Warrior!
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Your discipline adds fuel to the iron flame.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-left">
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] uppercase font-mono text-zinc-500">Duration</span>
                <div className="font-mono text-lg font-bold text-white">
                  {formatTime(elapsedSeconds)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] uppercase font-mono text-zinc-500">Volume Moved</span>
                <div className="font-mono text-lg font-bold text-amber-400">
                  {displayVolume.toLocaleString()} {unit}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="text-left">
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Rate Session Intensity</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFinishRating(star)}
                    className="p-1 text-amber-400 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= finishRating ? 'fill-amber-400 text-amber-400' : 'text-zinc-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="text-left">
              <label className="block text-xs font-semibold text-zinc-300 mb-1">Session Notes & PRs</label>
              <textarea
                rows={2}
                placeholder="e.g. Felt great on bench, clean lockouts..."
                value={finishNotes}
                onChange={(e) => setFinishNotes(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white"
              >
                Back to Session
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-zinc-950 font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-lg shadow-emerald-500/20"
              >
                Save & Advance Streak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
