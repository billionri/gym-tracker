import React from 'react';
import { 
  Flame, Dumbbell, Music, Bell, Shield, Activity, ListFilter, 
  Utensils, ShoppingBag, BookOpen, Play, Pause, Trophy 
} from 'lucide-react';
import { StreakInfo } from '../types/workout';
import { audioEngine } from '../services/audioPlayer';
import { storage } from '../services/storage';
import { REWARDS_DATA, getLevel, getXPProgress } from '../data/rewardsData';

export type NavTab = 'dashboard' | 'workout' | 'exercises' | 'diet' | 'shop' | 'learn' | 'rewards' | 'playlist' | 'metrics';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  streak: StreakInfo;
  onOpenStreakModal: () => void;
  userMode: 'beast' | 'queen' | 'iron';
  onToggleUserMode: () => void;
  unit: 'kg' | 'lbs';
  onToggleUnit: () => void;
  hasActiveWorkout: boolean;
  isPlayingMusic: boolean;
  currentTrackTitle?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streak,
  onOpenStreakModal,
  userMode,
  onToggleUserMode,
  unit,
  onToggleUnit,
  hasActiveWorkout,
  isPlayingMusic,
  currentTrackTitle,
}) => {
  const getModeLabel = () => {
    switch (userMode) {
      case 'beast':
        return 'Beast: ON';
      case 'queen':
        return 'Queen: ON';
      case 'iron':
        return 'Iron: ON';
    }
  };

  const claimedRewards = storage.getClaimedRewards();
  const totalXP = REWARDS_DATA.reduce((sum, r) => sum + (claimedRewards[r.name] ? r.xp : 0), 0);
  const currentLevel = getLevel(totalXP);
  const xpProgress = getXPProgress(totalXP);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5 text-zinc-950 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-wider text-white">
                    GYM<span className="text-amber-500">FORGE</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-zinc-800 text-amber-400 border border-amber-500/20">
                    TRAIN LIKE IRON
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 hidden sm:block">Minimal Gym Tracker & Audio Forge</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-zinc-800 text-white shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('workout')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'workout'
                  ? 'bg-zinc-800 text-amber-400 shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <span>Workout</span>
              {hasActiveWorkout && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('exercises')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'exercises'
                  ? 'bg-zinc-800 text-white shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5 text-zinc-400" />
              <span>Exercises</span>
            </button>

            <button
              onClick={() => setActiveTab('diet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'diet'
                  ? 'bg-zinc-800 text-amber-400 shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              <span>Diet Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-zinc-800 text-amber-400 shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>Shopping</span>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'learn'
                  ? 'bg-zinc-800 text-amber-400 shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Learning</span>
            </button>

            {/* GymForge Rewards Menu Tab */}
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rewards'
                  ? 'bg-zinc-800 text-amber-400 shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Rewards</span>
            </button>

            <button
              onClick={() => setActiveTab('playlist')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'playlist'
                  ? 'bg-zinc-800 text-amber-400 shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Music className="w-3.5 h-3.5 text-amber-400" />
              <span>Playlist</span>
              {isPlayingMusic && (
                <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-0.5 h-full bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-2/3 bg-amber-400 animate-bounce delay-75" />
                  <span className="w-0.5 h-full bg-amber-400 animate-bounce delay-150" />
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-zinc-800 text-white shadow-inner font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-zinc-400" />
              <span>Metrics</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* GymForge Level Box (from original app) */}
            <button
              onClick={() => setActiveTab('rewards')}
              className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 transition-all cursor-pointer group"
              title={`Level ${currentLevel} (${totalXP} XP) - Click for Rewards Menu`}
            >
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-mono font-bold text-amber-400 uppercase leading-none">
                  LVL <span className="text-white">{currentLevel}</span>
                </div>
                <div className="w-10 h-1 rounded-full bg-zinc-950 border border-zinc-800 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Quick Music Mini Pill */}
            {isPlayingMusic && (
              <button
                onClick={() => setActiveTab('playlist')}
                className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs hover:bg-amber-500/20 transition-colors cursor-pointer"
                title="Current gym track playing"
              >
                <Music className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-mono truncate max-w-[90px]">{currentTrackTitle || 'Playing'}</span>
              </button>
            )}

            {/* Streak Counter Pill */}
            <button
              onClick={onOpenStreakModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 hover:border-amber-500/60 transition-all text-xs sm:text-sm font-semibold text-amber-400 shadow-sm cursor-pointer"
              title="Daily Gym Streak - Click to configure notifications"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{streak.currentStreak} <span className="hidden sm:inline">Days</span></span>
              {streak.notificationEnabled && (
                <Bell className="w-3 h-3 text-amber-400 ml-0.5" />
              )}
            </button>

            {/* Beast Mode Toggle (from GymForge UI) */}
            <button
              onClick={onToggleUserMode}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-semibold text-zinc-300 transition-colors cursor-pointer"
              title="Toggle workout identity mode"
            >
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>{getModeLabel()}</span>
            </button>

            {/* Unit Toggle kg / lbs */}
            <button
              onClick={onToggleUnit}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:text-white transition-colors cursor-pointer"
              title="Toggle weight units"
            >
              {unit.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar with scrolling support */}
        <div className="flex lg:hidden items-center gap-1 py-2 border-t border-zinc-800/60 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'dashboard' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`px-2.5 py-1 rounded whitespace-nowrap relative cursor-pointer ${activeTab === 'workout' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Workout
            {hasActiveWorkout && <span className="inline-block ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'exercises' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Exercises
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'diet' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Diet Plan
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'shop' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Shopping
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'learn' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Learning
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'rewards' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            🏆 Rewards
          </button>
          <button
            onClick={() => setActiveTab('playlist')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'playlist' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Playlist
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'metrics' ? 'text-amber-400 font-bold bg-zinc-900' : 'text-zinc-400'}`}
          >
            Metrics
          </button>
        </div>
      </div>
    </header>
  );
};
