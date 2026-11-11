import React from 'react';
import { 
  Flame, Dumbbell, Music, Bell, Shield, Activity, ListFilter, 
  Utensils, ShoppingBag, BookOpen, Play, Pause, Trophy, Smartphone, Download 
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
  onOpenApkModal?: () => void;
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
  onOpenApkModal,
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
    <header className="sticky top-0 z-40 w-full border-b-2 border-orange-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
                <Dumbbell className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-lg tracking-wider text-zinc-900">
                    GYM<span className="text-orange-600">FORGE</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 border border-orange-300">
                    TRAIN LIKE IRON
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 hidden sm:block">Minimal Gym Tracker & Audio Forge</p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('workout')}
              className={`relative px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'workout'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
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
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Exercises</span>
            </button>

            <button
              onClick={() => setActiveTab('diet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'diet'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>Diet Plan</span>
            </button>

            <button
              onClick={() => setActiveTab('shop')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'shop'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Shopping</span>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'learn'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Learning</span>
            </button>

            {/* GymForge Rewards Menu Tab */}
            <button
              onClick={() => setActiveTab('rewards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rewards'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>Rewards</span>
            </button>

            <button
              onClick={() => setActiveTab('playlist')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'playlist'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <Music className="w-3.5 h-3.5" />
              <span>Playlist</span>
              {isPlayingMusic && (
                <span className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-0.5 h-full bg-emerald-500 animate-bounce" />
                  <span className="w-0.5 h-2/3 bg-emerald-500 animate-bounce delay-75" />
                  <span className="w-0.5 h-full bg-emerald-500 animate-bounce delay-150" />
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('metrics')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'metrics'
                  ? 'bg-emerald-600 text-white shadow-sm font-bold'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-orange-50'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Metrics</span>
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* GymForge Level Box (Orange div) */}
            <button
              onClick={() => setActiveTab('rewards')}
              className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-xl bg-orange-50 hover:bg-orange-100 border border-orange-300 transition-all cursor-pointer group shadow-2xs"
              title={`Level ${currentLevel} (${totalXP} XP) - Click for Rewards Menu`}
            >
              <div className="flex flex-col items-center">
                <div className="text-[9px] font-mono font-bold text-orange-700 uppercase leading-none">
                  LVL <span className="text-zinc-900">{currentLevel}</span>
                </div>
                <div className="w-10 h-1.5 rounded-full bg-orange-200 border border-orange-300 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>
            </button>

            {/* Quick Music Mini Pill */}
            {isPlayingMusic && (
              <button
                onClick={() => setActiveTab('playlist')}
                className="hidden xl:flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-100 border border-orange-300 text-orange-900 text-xs hover:bg-orange-200 transition-colors cursor-pointer"
                title="Current gym track playing"
              >
                <Music className="w-3.5 h-3.5 text-orange-600 animate-spin" style={{ animationDuration: '4s' }} />
                <span className="font-mono truncate max-w-[90px]">{currentTrackTitle || 'Playing'}</span>
              </button>
            )}

            {/* Install APK Button */}
            {onOpenApkModal && (
              <button
                onClick={onOpenApkModal}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-xs transition-all cursor-pointer"
                title="Download / Install GymForge Android APK"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Install</span> APK
              </button>
            )}

            {/* Streak Counter Pill (Orange div) */}
            <button
              onClick={onOpenStreakModal}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 hover:bg-orange-100 border border-orange-300 transition-all text-xs sm:text-sm font-bold text-orange-800 shadow-2xs cursor-pointer"
              title="Daily Gym Streak - Click to configure notifications"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
              <span>{streak.currentStreak} <span className="hidden sm:inline">Days</span></span>
              {streak.notificationEnabled && (
                <Bell className="w-3 h-3 text-orange-600 ml-0.5" />
              )}
            </button>

            {/* Beast Mode Toggle */}
            <button
              onClick={onToggleUserMode}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300 text-xs font-semibold text-zinc-800 transition-colors cursor-pointer"
              title="Toggle workout identity mode"
            >
              <Shield className="w-3.5 h-3.5 text-orange-600" />
              <span>{getModeLabel()}</span>
            </button>

            {/* Unit Toggle kg / lbs */}
            <button
              onClick={onToggleUnit}
              className="px-2.5 py-1.5 rounded-lg bg-orange-50 hover:bg-orange-100 border border-orange-300 text-xs font-mono font-bold text-zinc-800 hover:text-zinc-950 transition-colors cursor-pointer"
              title="Toggle weight units"
            >
              {unit.toUpperCase()}
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar with scrolling support */}
        <div className="flex lg:hidden items-center gap-1 py-2 border-t border-orange-200 overflow-x-auto text-xs scrollbar-none bg-white">
          {onOpenApkModal && (
            <button
              onClick={onOpenApkModal}
              className="px-2.5 py-1 rounded whitespace-nowrap cursor-pointer bg-emerald-600 text-white font-bold flex items-center gap-1 shadow-xs"
            >
              <Smartphone className="w-3 h-3" />
              <span>APK</span>
            </button>
          )}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('workout')}
            className={`px-2.5 py-1 rounded whitespace-nowrap relative cursor-pointer ${activeTab === 'workout' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Workout
            {hasActiveWorkout && <span className="inline-block ml-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />}
          </button>
          <button
            onClick={() => setActiveTab('exercises')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'exercises' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Exercises
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'diet' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Diet Plan
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'shop' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Shopping
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'learn' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Learning
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'rewards' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            🏆 Rewards
          </button>
          <button
            onClick={() => setActiveTab('playlist')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'playlist' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Playlist
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`px-2.5 py-1 rounded whitespace-nowrap cursor-pointer ${activeTab === 'metrics' ? 'bg-emerald-600 text-white font-bold' : 'text-zinc-600'}`}
          >
            Metrics
          </button>
        </div>
      </div>
    </header>
  );
};
