import { 
  Flame, Dumbbell, Play, Pause, ChevronRight, Activity, Clock, 
  Sparkles, Award, Bell, Shield, ArrowUpRight, Zap, Utensils, ShoppingBag, BookOpen, Trophy, Gift,
  Smartphone, Download
} from 'lucide-react';
import { WorkoutSession, StreakInfo, BodyMeasurement, TrackItem } from '../types/workout';
import { ROUTINE_PRESETS } from '../data/routines';
import { EXERCISE_DATABASE } from '../data/exercises';
import { audioEngine } from '../services/audioPlayer';
import { storage } from '../services/storage';
import { REWARDS_DATA, getLevel, getXPProgress } from '../data/rewardsData';
import { ExerciseMedia } from './ExerciseMedia';

import { NavTab } from './Navbar';

interface DashboardProps {
  streak: StreakInfo;
  onOpenStreakModal: () => void;
  onOpenApkModal?: () => void;
  sessions: WorkoutSession[];
  measurements: BodyMeasurement[];
  currentTrack: TrackItem;
  isPlayingMusic: boolean;
  setIsPlayingMusic: (playing: boolean) => void;
  onStartRoutine: (routineId: string) => void;
  onStartBlankWorkout: () => void;
  onNavigateToTab: (tab: NavTab) => void;
  unit: 'kg' | 'lbs';
  userMode: 'beast' | 'queen' | 'iron';
}

export const Dashboard: React.FC<DashboardProps> = ({
  streak,
  onOpenStreakModal,
  onOpenApkModal,
  sessions,
  measurements,
  currentTrack,
  isPlayingMusic,
  setIsPlayingMusic,
  onStartRoutine,
  onStartBlankWorkout,
  onNavigateToTab,
  unit,
  userMode,
}) => {
  const suggestedRoutine = ROUTINE_PRESETS[0]; // Chest & Push Foundry
  const latestMeasurement = measurements[0] || null;

  const totalVolumeKg = sessions.reduce((acc, s) => acc + s.totalVolumeKg, 0);
  const displayTotalVolume = unit === 'kg' ? totalVolumeKg : Math.round(totalVolumeKg * 2.20462);

  const toggleMusic = () => {
    if (isPlayingMusic) {
      audioEngine.pause();
      setIsPlayingMusic(false);
    } else {
      audioEngine.start(currentTrack.synthTheme, currentTrack.bpm);
      setIsPlayingMusic(true);
    }
  };

  const claimedRewards = storage.getClaimedRewards();
  const totalXP = REWARDS_DATA.reduce((sum, r) => sum + (claimedRewards[r.name] ? r.xp : 0), 0);
  const currentLevel = getLevel(totalXP);
  const xpProgress = getXPProgress(totalXP);

  return (
    <div className="space-y-6">
      {/* Streak Alert Hero Banner (Orange Div + Green Button) */}
      {!streak.hasTrainedToday ? (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-100 via-orange-50 to-amber-50 border-2 border-orange-300 p-5 shadow-sm text-zinc-900">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/20">
                <Flame className="w-6 h-6 text-white fill-white animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-700 font-mono">
                    Daily Streak At Stake
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-200 text-orange-900 border border-orange-300 font-bold">
                    Day {streak.currentStreak} 🔥
                  </span>
                </div>
                <h3 className="text-lg font-black text-zinc-900 mt-0.5">
                  Keep Your Iron Streak Alive!
                </h3>
                <p className="text-xs text-zinc-600">
                  Recommended for today: <span className="text-orange-700 font-bold">{suggestedRoutine.name}</span>.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              {/* Green Button */}
              <button
                onClick={() => onStartRoutine(suggestedRoutine.id)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Start Today's Workout
              </button>
              <button
                onClick={onOpenStreakModal}
                className="p-2.5 rounded-xl bg-white hover:bg-orange-100 text-orange-700 border-2 border-orange-300 transition-colors cursor-pointer"
                title="Streak Reminder Settings"
              >
                <Bell className="w-4 h-4 text-orange-600" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl bg-orange-50 border-2 border-emerald-500/40 p-4.5 flex items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center flex-shrink-0">
              <Flame className="w-5 h-5 text-emerald-600 fill-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-700 uppercase tracking-wider font-mono">
                Day {streak.currentStreak} Secured
              </div>
              <h4 className="text-sm font-bold text-zinc-900">
                Great session today, warrior! Flame is protected.
              </h4>
            </div>
          </div>
          <button
            onClick={onOpenStreakModal}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <span>Streak Stats</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Install APK / Android Mobile App Banner (Orange Div with Green Button) */}
      {onOpenApkModal && (
        <div className="rounded-2xl bg-orange-50 border-2 border-orange-300 p-4.5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-900">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-500/25">
              <Smartphone className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-black text-sm text-zinc-900 tracking-tight">
                  GymForge Android APK & Mobile Installation
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold uppercase font-mono">
                  APK Ready
                </span>
              </div>
              <p className="text-xs text-zinc-600 mt-0.5">
                Install as a standalone native app on Android, scan via QR code, or download signed .apk package.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenApkModal}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all cursor-pointer whitespace-nowrap"
          >
            <Download className="w-4 h-4" />
            <span>Install / Download APK</span>
          </button>
        </div>
      )}

      {/* Top 4 Minimal Metric Cards (Orange Divs) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak Card */}
        <div
          onClick={onOpenStreakModal}
          className="rounded-2xl bg-orange-50/70 border-2 border-orange-200 hover:border-orange-400 p-4.5 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-800 font-semibold">Current Streak</span>
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">
            {streak.currentStreak} <span className="text-sm font-medium text-zinc-500">days</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-600 mt-2 font-mono">
            <span>Best: {streak.longestStreak} days</span>
            <span className="text-orange-700 font-bold flex items-center">
              Alerts ON
            </span>
          </div>
        </div>

        {/* Total Volume (Orange Div) */}
        <div className="rounded-2xl bg-orange-50/70 border-2 border-orange-200 hover:border-orange-400 p-4.5 transition-all shadow-2xs">
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-800 font-semibold">Total Volume</span>
            <Dumbbell className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-orange-700 font-mono">
            {displayTotalVolume.toLocaleString()}
          </div>
          <div className="text-[11px] text-zinc-600 mt-2 font-mono">
            {unit.toUpperCase()} moved all-time
          </div>
        </div>

        {/* Sessions Completed (Orange Div) */}
        <div
          onClick={() => onNavigateToTab('workout')}
          className="rounded-2xl bg-orange-50/70 border-2 border-orange-200 hover:border-orange-400 p-4.5 transition-all cursor-pointer group shadow-2xs"
        >
          <div className="flex items-center justify-between text-zinc-500 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-800 font-semibold">Workouts</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-zinc-900 font-mono">
            {sessions.length}
          </div>
          <div className="text-[11px] text-zinc-600 mt-2 flex items-center justify-between">
            <span>Logged sessions</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-orange-600 transition-colors" />
          </div>
        </div>

        {/* Workout Music Widget (Orange Div + Green Play Button) */}
        <div className="rounded-2xl bg-orange-50/70 border-2 border-orange-200 hover:border-orange-400 p-4.5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-zinc-500">
            <span className="text-[11px] font-mono uppercase tracking-wider text-orange-800 font-semibold">Workout Audio</span>
            <span className="text-[10px] font-mono font-bold text-orange-700">{currentTrack.bpm} BPM</span>
          </div>
          <div className="my-1">
            <div className="font-bold text-zinc-900 text-sm truncate">
              {currentTrack.title}
            </div>
            <div className="text-xs text-zinc-600 truncate">
              {currentTrack.genre} • {currentTrack.vibe}
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            {/* Green button */}
            <button
              onClick={toggleMusic}
              className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
            >
              {isPlayingMusic ? <Pause className="w-3 h-3 fill-white" /> : <Play className="w-3 h-3 fill-white" />}
              <span>{isPlayingMusic ? 'Pause' : 'Play Beat'}</span>
            </button>
            <button
              onClick={() => onNavigateToTab('playlist')}
              className="text-xs font-semibold text-orange-700 hover:text-orange-900 transition-colors cursor-pointer"
            >
              Forge Playlist
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Suggested Routine & Quick Launcher + Recent Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): Today's Routine & Vault Quickstart (Orange Divs) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Today's Suggested Routine Card (Orange Div) */}
          <div className="rounded-2xl bg-orange-50/70 border-2 border-orange-300 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-orange-200 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600" />
                <h3 className="font-bold text-zinc-900 text-base">Today's Recommended Routine</h3>
              </div>
              <span className="text-xs font-mono font-bold text-orange-800">
                {suggestedRoutine.estimatedMinutes} MIN SESSION
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-orange-200 text-orange-900 border border-orange-300 font-mono">
                  {suggestedRoutine.category}
                </span>
              </div>
              <h4 className="text-xl font-black text-zinc-900">
                {suggestedRoutine.name}
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                {suggestedRoutine.description}
              </p>

              {/* Exercises Included container */}
              <div className="mt-4 p-3 rounded-xl bg-white border border-orange-200">
                <span className="text-[11px] font-bold text-orange-800 uppercase tracking-wider block mb-2.5">
                  Exercises Included ({suggestedRoutine.exerciseIds.length})
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {suggestedRoutine.exerciseIds.map((exId) => {
                    const ex = EXERCISE_DATABASE.find((e) => e.id === exId);
                    if (!ex) return null;
                    return (
                      <div
                        key={`${ex.id}-${ex.category}`}
                        className="p-2 rounded-xl bg-orange-50/60 border border-orange-200 flex items-center gap-2"
                      >
                        <div className="w-9 h-9 flex-shrink-0">
                          <ExerciseMedia
                            exercise={ex}
                            userMode={userMode}
                            heightClass="h-9 w-9"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-zinc-900 truncate">
                            {ex.name}
                          </div>
                          <div className="text-[10px] text-zinc-500 font-mono truncate">
                            {ex.category}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Green Button */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  onClick={() => onStartRoutine(suggestedRoutine.id)}
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Start This Workout</span>
                </button>

                <button
                  onClick={onStartBlankWorkout}
                  className="px-4 py-3 rounded-xl bg-white hover:bg-orange-100 text-zinc-800 font-bold text-xs border-2 border-orange-300 transition-colors cursor-pointer"
                >
                  Custom Session
                </button>
              </div>
            </div>
          </div>

          {/* Quick Body Composition Status (Orange Div) */}
          {latestMeasurement && (
            <div className="rounded-2xl bg-orange-50/70 border-2 border-orange-300 p-5 shadow-2xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600 flex-shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-orange-800 uppercase font-bold">Latest Physique Entry</div>
                  <div className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                    <span>
                      {unit === 'kg' ? `${latestMeasurement.weightKg} kg` : `${(latestMeasurement.weightKg * 2.20462).toFixed(1)} lbs`}
                    </span>
                    {latestMeasurement.bodyFatPercent && (
                      <span className="text-orange-700 font-mono text-xs font-bold">
                        ({latestMeasurement.bodyFatPercent}% BF)
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    Chest {latestMeasurement.chestCm}cm • Waist {latestMeasurement.waistCm}cm • Arms {latestMeasurement.armsCm}cm
                  </div>
                </div>
              </div>

              <button
                onClick={() => onNavigateToTab('metrics')}
                className="text-xs font-bold text-orange-700 hover:text-orange-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Metrics</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Right Column (5 cols): Recent Workout History (Orange Divs) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-2xl bg-orange-50/70 border-2 border-orange-300 p-5 shadow-2xs">
            <div className="flex items-center justify-between pb-3 border-b border-orange-200 mb-3">
              <h3 className="font-bold text-zinc-900 text-base">Recent Workouts</h3>
              <button
                onClick={() => onNavigateToTab('workout')}
                className="text-xs text-orange-700 hover:text-orange-900 font-bold cursor-pointer"
              >
                View Logger
              </button>
            </div>

            <div className="space-y-3">
              {sessions.slice(0, 4).map((s) => (
                <div
                  key={s.id}
                  className="p-3.5 rounded-xl bg-white border border-orange-200 hover:border-orange-300 transition-colors shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-zinc-900">
                        {s.title}
                      </h4>
                      <div className="text-xs text-zinc-500 font-mono mt-0.5">
                        {new Date(s.date).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                        })} • {s.durationMinutes} mins
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-xs font-bold text-orange-700">
                        {unit === 'kg' ? s.totalVolumeKg.toLocaleString() : Math.round(s.totalVolumeKg * 2.20462).toLocaleString()} {unit}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">
                        {s.exercises.length} movements
                      </div>
                    </div>
                  </div>

                  {s.notes && (
                    <p className="text-[11px] text-zinc-600 italic mt-2 line-clamp-1 border-t border-orange-100 pt-1.5">
                      "{s.notes}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Jump to Exercises (Orange Div) */}
          <div
            onClick={() => onNavigateToTab('exercises')}
            className="rounded-2xl bg-orange-100/70 border-2 border-orange-300 p-4.5 hover:border-orange-400 cursor-pointer transition-all flex items-center justify-between group shadow-2xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-zinc-900 group-hover:text-orange-700 transition-colors">
                  Explore Gym Vault (Original Movements)
                </h4>
                <p className="text-xs text-zinc-600">
                  Chest, Back, Legs, Core, Cardio & PRO tier movements
                </p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-orange-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>

      {/* GymForge Modules: Rewards, Custom Diet Plan, Shopping Section, Learning & Anatomy (Orange Divs) */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-zinc-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              <span>GymForge Knowledge & Architecture</span>
            </h3>
            <p className="text-xs text-zinc-600">
              Gamified rewards, nutrition blueprints, gear checklists, and human anatomy reference
            </p>
          </div>
        </div>

        {/* 4 Orange Div Cards Grid with Green Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Rewards Menu & XP Progression (Orange Div) */}
          <div
            onClick={() => onNavigateToTab('rewards')}
            className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 hover:border-orange-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600 group-hover:scale-105 transition-transform">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 rounded-full bg-orange-200 text-orange-900 border border-orange-300 text-[10px] font-mono font-bold">
                  LVL {currentLevel} • {totalXP} XP
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold block mb-1">
                Gamification & Milestones
              </span>
              <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                Rewards Menu 🏆
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Unlock 10 challenges, claim lifestyle treats, restaurants, trekking adventures, and level up with XP.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Open Rewards Menu</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </div>
          </div>

          {/* Custom Diet Plan (Orange Div) */}
          <div
            onClick={() => onNavigateToTab('diet')}
            className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 hover:border-orange-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-105 transition-transform">
                <Utensils className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold block mb-1">
                Nutrition Blueprint
              </span>
              <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                Custom Diet Plan
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                6-meal daily schedule, protein target calculation, macro breakdown, and 8-glass water hydration logger.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Build Diet Plan</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </div>
          </div>

          {/* Shopping Section & Images (Orange Div) */}
          <div
            onClick={() => onNavigateToTab('shop')}
            className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 hover:border-orange-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-105 transition-transform">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold block mb-1">
                Gear & Groceries • In ₹ (Rs)
              </span>
              <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                Shopping & Dumbbells
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Budget home gym dumbbells from <span className="text-orange-700 font-bold">₹399</span>, lifting straps, whey isolate, and grocery checklists in Rupees.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>View Dumbbell Deals & Store</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </div>
          </div>

          {/* Learning Section & Anatomy (Orange Div) */}
          <div
            onClick={() => onNavigateToTab('learn')}
            className="p-5 rounded-2xl bg-orange-50 border-2 border-orange-300 hover:border-orange-500 cursor-pointer transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600 mb-3 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold block mb-1">
                Study Topics Vault
              </span>
              <h4 className="text-base font-bold text-zinc-900 group-hover:text-orange-700 transition-colors">
                Learning & Anatomy Map
              </h4>
              <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                Human body muscular anatomy map with fullscreen zoom, BMR/TDEE, Body Fat %, and Box Breathing.
              </p>
            </div>
            <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:translate-x-1 transition-transform">
              <span>Open Learning Topics</span>
              <ChevronRight className="w-4 h-4 ml-0.5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
