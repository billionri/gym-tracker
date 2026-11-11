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
            audioEngine.playRestBeep(true);
            setIsRestActive(false);
            return 0;
          }
          if (prev <= 4) {
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

  const triggerRestTimer = (seconds: number = 60) => {
    setRestSecondsRemaining(seconds);
    setIsRestActive(true);
  };

  const handleToggleSet = (exerciseIdx: number, setIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    const currentSet = updated.exercises[exerciseIdx].sets[setIdx];
    const willBeCompleted = !currentSet.completed;
    currentSet.completed = willBeCompleted;

    if (willBeCompleted) {
      triggerRestTimer(60);
    }

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

  const handleUpdateSet = (exerciseIdx: number, setIdx: number, field: 'weight' | 'reps', val: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    updated.exercises[exerciseIdx].sets[setIdx][field] = Math.max(0, val);

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

  const handleRemoveSet = (exerciseIdx: number, setIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    updated.exercises[exerciseIdx].sets.splice(setIdx, 1);
    updated.exercises[exerciseIdx].sets.forEach((s, idx) => {
      s.setNumber = idx + 1;
    });
    setActiveSession(updated);
  };

  const handleRemoveExercise = (exerciseIdx: number) => {
    if (!activeSession) return;
    const updated = { ...activeSession };
    updated.exercises.splice(exerciseIdx, 1);
    setActiveSession(updated);
  };

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

  const handleConfirmFinish = () => {
    if (!activeSession) return;
    const finalSession: WorkoutSession = {
      ...activeSession,
      durationMinutes: Math.max(1, Math.round(elapsedSeconds / 60)),
      rating: finishRating,
      notes: finishNotes || 'Workout Done, great session, warrior!',
    };

    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#10b981', '#f97316', '#f59e0b', '#3b82f6'],
      });
    } catch {
      // ignore
    }

    audioEngine.playCelebrationChime();
    onFinishWorkout(finalSession);
    setShowFinishModal(false);
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard this workout? Current progress will be lost.')) {
      setActiveSession(null);
      setElapsedSeconds(0);
    }
  };

  // If no active session, show quick-start dashboard
  if (!activeSession) {
    return (
      <div className="space-y-8 text-zinc-900">
        {/* Banner - Orange Div with Green Button */}
        <div className="rounded-2xl bg-orange-50 border-2 border-orange-300 p-6 md:p-8 text-center max-w-2xl mx-auto shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto mb-4 shadow-md shadow-orange-500/30">
            <Dumbbell className="w-8 h-8 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">
            Ready to Forge Iron Today?
          </h2>
          <p className="text-sm text-zinc-600 mt-2 max-w-md mx-auto">
            Log your sets, auto-track rest times, pump up today's playlist, and advance your daily gym streak!
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={startBlankWorkout}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Start Empty Workout
            </button>
            <button
              onClick={onNavigateToExercises}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white hover:bg-orange-100 text-orange-950 font-bold text-sm border-2 border-orange-200 transition-colors cursor-pointer"
            >
              Browse GymForge Vault
            </button>
          </div>
        </div>

        {/* Pre-built routine splits - Orange Divs with Green Buttons */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-zinc-900">Recommended Workout Splits</h3>
              <p className="text-xs text-zinc-500">Jump right into battle-tested GymForge routines</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROUTINE_PRESETS.map((routine) => (
              <div
                key={routine.id}
                className="rounded-2xl bg-orange-50/70 border-2 border-orange-200 hover:border-orange-400 p-5 transition-all flex flex-col justify-between group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-orange-900 border border-orange-300">
                      {routine.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-orange-600" />
                      {routine.estimatedMinutes}m
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                    {routine.name}
                  </h4>
                  <p className="text-xs text-zinc-600 mt-1 line-clamp-2 leading-relaxed">
                    {routine.description}
                  </p>
                  <div className="text-[11px] text-orange-800 font-mono font-medium mt-3">
                    {routine.exerciseIds.length} exercises programmed
                  </div>
                </div>

                <button
                  onClick={() => startRoutine(routine)}
                  className="mt-4 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
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
    <div className="space-y-6 text-zinc-900">
      {/* Active Workout Header Card - Orange Div with Green Finish Button */}
      <div className="rounded-2xl bg-orange-50 border-2 border-orange-300 p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                Active Workout in Progress
              </span>
            </div>
            <input
              type="text"
              value={activeSession.title}
              onChange={(e) => setActiveSession({ ...activeSession, title: e.target.value })}
              className="text-xl md:text-2xl font-black text-zinc-900 bg-transparent border-b-2 border-dashed border-orange-300 hover:border-orange-500 focus:border-orange-600 focus:outline-none transition-colors"
            />
          </div>

          {/* Timer & Live Volume Pill */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border-2 border-orange-200 shadow-2xs">
              <Clock className="w-4 h-4 text-orange-600" />
              <span className="font-mono text-base font-bold text-zinc-900">
                {formatTime(elapsedSeconds)}
              </span>
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-zinc-500 hover:text-zinc-800 ml-1 cursor-pointer"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-white border-2 border-orange-200 shadow-2xs">
              <div className="text-[10px] text-zinc-500 uppercase font-mono">Volume</div>
              <div className="font-mono text-base font-bold text-orange-700">
                {displayVolume.toLocaleString()} {unit}
              </div>
            </div>

            <button
              onClick={() => setShowFinishModal(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              Finish Workout
            </button>

            <button
              onClick={handleDiscard}
              className="p-2.5 rounded-xl bg-white hover:bg-red-50 text-zinc-500 hover:text-red-600 border border-orange-200 transition-colors cursor-pointer"
              title="Discard session"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Floating Rest Timer Bar if active - Orange Div with Green Button */}
        {restSecondsRemaining !== null && restSecondsRemaining > 0 && (
          <div className="mt-4 pt-4 border-t border-orange-200 flex items-center justify-between bg-orange-100 rounded-xl p-3 border-2 border-orange-300 animate-in fade-in duration-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-orange-500 animate-ping" />
              <div>
                <span className="text-xs font-bold text-orange-900 uppercase tracking-wider">
                  Rest Timer
                </span>
                <div className="font-mono text-lg font-black text-zinc-900">
                  {formatTime(restSecondsRemaining)}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setRestSecondsRemaining((prev) => (prev ? prev + 30 : 30))}
                className="px-3 py-1 rounded-lg bg-white border border-orange-300 text-xs font-mono font-bold text-zinc-800 hover:bg-orange-50 cursor-pointer"
              >
                +30s
              </button>
              <button
                onClick={() => setRestSecondsRemaining(0)}
                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-2xs cursor-pointer"
              >
                Skip Rest
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Exercises in Session - Orange Divs with Sets Table */}
      <div className="space-y-4">
        {activeSession.exercises.map((exerciseLog, exIdx) => (
          <div
            key={exerciseLog.exerciseId + '-' + exIdx}
            className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 overflow-hidden shadow-sm"
          >
            {/* Exercise Row Header */}
            {(() => {
              const exDef = EXERCISE_DATABASE.find((e) => e.id === exerciseLog.exerciseId);
              return (
                <div className="p-4 bg-orange-100/60 border-b border-orange-200 flex items-center justify-between gap-3">
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
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-orange-900 border border-orange-200">
                          {exerciseLog.category}
                        </span>
                        {exDef?.isPro && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-500 text-white">
                            PRO
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-zinc-900 text-base truncate">
                        {exerciseLog.exerciseName}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => triggerRestTimer(90)}
                      className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-orange-100 border border-orange-200 text-xs font-mono text-zinc-800 transition-colors cursor-pointer"
                      title="Quick 90s Rest Timer"
                    >
                      <Clock className="w-3 h-3 text-orange-600" />
                      <span>90s Rest</span>
                    </button>

                    <button
                      onClick={() => handleRemoveExercise(exIdx)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-600 hover:bg-white transition-colors cursor-pointer"
                      title="Remove exercise"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })()}

            {/* Sets Table */}
            <div className="p-4 overflow-x-auto bg-white">
              <table className="w-full text-left border-collapse min-w-[480px]">
                <thead>
                  <tr className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider border-b border-orange-200">
                    <th className="pb-2 w-16">SET</th>
                    <th className="pb-2 w-28">PREVIOUS</th>
                    <th className="pb-2 w-32">{unit.toUpperCase()}</th>
                    <th className="pb-2 w-32">REPS</th>
                    <th className="pb-2 w-20 text-center">DONE</th>
                    <th className="pb-2 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-orange-100">
                  {exerciseLog.sets.map((set, setIdx) => (
                    <tr
                      key={set.id}
                      className={`transition-colors ${
                        set.completed ? 'bg-emerald-50/70' : 'hover:bg-orange-50/50'
                      }`}
                    >
                      <td className="py-2.5 font-mono text-xs font-bold text-zinc-500">
                        {set.setNumber}
                      </td>
                      <td className="py-2.5 font-mono text-xs text-zinc-400">
                        {set.weight} {unit} × {set.reps}
                      </td>
                      <td className="py-2.5">
                        <input
                          type="number"
                          value={set.weight || ''}
                          onChange={(e) => handleUpdateSet(exIdx, setIdx, 'weight', Number(e.target.value))}
                          className="w-24 bg-orange-50/40 border border-orange-300 rounded-lg px-2.5 py-1 text-sm font-mono text-zinc-900 focus:outline-none focus:border-emerald-600"
                        />
                      </td>
                      <td className="py-2.5">
                        <input
                          type="number"
                          value={set.reps || ''}
                          onChange={(e) => handleUpdateSet(exIdx, setIdx, 'reps', Number(e.target.value))}
                          className="w-24 bg-orange-50/40 border border-orange-300 rounded-lg px-2.5 py-1 text-sm font-mono text-zinc-900 focus:outline-none focus:border-emerald-600"
                        />
                      </td>
                      <td className="py-2.5 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleSet(exIdx, setIdx)}
                          className={`w-7 h-7 rounded-lg inline-flex items-center justify-center transition-all cursor-pointer ${
                            set.completed
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-white text-zinc-300 hover:text-emerald-600 border border-orange-300 hover:border-emerald-500'
                          }`}
                        >
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => handleRemoveSet(exIdx, setIdx)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                          title="Remove set"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-3 pt-2 flex items-center justify-between border-t border-orange-100">
                <button
                  type="button"
                  onClick={() => handleAddSet(exIdx)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Set</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Exercise Trigger Button - Green Button */}
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Exercise from Gym Vault</span>
        </button>
      </div>

      {/* Add Exercise Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-orange-300 rounded-2xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl text-zinc-900">
            <div className="p-4 border-b border-orange-200 bg-orange-50 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-zinc-900 text-base">Select Exercise</h3>
                <p className="text-xs text-zinc-500">Choose from the GymForge movement library</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-500 hover:text-zinc-900 p-1 cursor-pointer font-bold"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto divide-y divide-orange-100 space-y-1">
              {EXERCISE_DATABASE.map((ex) => (
                <div
                  key={`${ex.id}-${ex.category}`}
                  onClick={() => handleAddExerciseToSession(ex)}
                  className="py-2.5 px-3 rounded-xl hover:bg-orange-50 cursor-pointer flex items-center justify-between gap-3 transition-colors"
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
                        <span className="text-[10px] font-bold uppercase px-1.5 py-0.2 rounded bg-orange-100 text-orange-900 border border-orange-200">
                          {ex.category}
                        </span>
                        <span className="text-sm font-semibold text-zinc-900 truncate">
                          {ex.name}
                        </span>
                        {ex.isPro && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-orange-500 text-white">
                            PRO
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5 truncate">
                        {ex.primaryMuscles.join(', ')} • {ex.equipment}
                      </div>
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex-shrink-0 cursor-pointer">
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
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-orange-300 rounded-2xl max-w-md w-full p-6 shadow-2xl text-center space-y-4 text-zinc-900">
            <div className="w-16 h-16 rounded-2xl bg-orange-500 text-white flex items-center justify-center mx-auto shadow-md shadow-orange-500/30">
              <Award className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-xl font-black text-zinc-900">
                Workout Done, Great Session, Warrior!
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Your discipline adds fuel to the iron flame.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2 text-left">
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
                <span className="text-[10px] uppercase font-mono text-zinc-500">Duration</span>
                <div className="font-mono text-lg font-bold text-zinc-900">
                  {formatTime(elapsedSeconds)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-200">
                <span className="text-[10px] uppercase font-mono text-zinc-500">Volume Moved</span>
                <div className="font-mono text-lg font-bold text-orange-700">
                  {displayVolume.toLocaleString()} {unit}
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="text-left">
              <label className="block text-xs font-semibold text-zinc-700 mb-1.5">Rate Session Intensity</label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFinishRating(star)}
                    className="p-1 text-orange-500 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= finishRating ? 'fill-orange-500 text-orange-500' : 'text-zinc-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="text-left">
              <label className="block text-xs font-semibold text-zinc-700 mb-1">Session Notes & PRs</label>
              <textarea
                rows={2}
                placeholder="e.g. Felt great on bench, clean lockouts..."
                value={finishNotes}
                onChange={(e) => setFinishNotes(e.target.value)}
                className="w-full bg-orange-50/50 border border-orange-300 rounded-xl p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowFinishModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:text-zinc-900 cursor-pointer"
              >
                Back to Session
              </button>
              <button
                type="button"
                onClick={handleConfirmFinish}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 cursor-pointer"
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
