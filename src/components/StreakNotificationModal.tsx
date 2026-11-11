import React, { useState } from 'react';
import { 
  Flame, Bell, BellRing, Shield, Clock, CheckCircle2, Award, 
  Sparkles, X, AlertTriangle, Send 
} from 'lucide-react';
import { StreakInfo, AchievementBadge } from '../types/workout';
import { streakManager } from '../services/streakNotifications';
import { storage } from '../services/storage';

interface StreakNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  streak: StreakInfo;
  setStreak: React.Dispatch<React.SetStateAction<StreakInfo>>;
  badges: AchievementBadge[];
}

export const StreakNotificationModal: React.FC<StreakNotificationModalProps> = ({
  isOpen,
  onClose,
  streak,
  setStreak,
  badges,
}) => {
  const [testSent, setTestSent] = useState(false);
  const [selectedTime, setSelectedTime] = useState(streak.reminderTime || '18:00');

  if (!isOpen) return null;

  const handleRequestPush = async () => {
    const permission = await streakManager.requestPermission();
    if (permission === 'granted') {
      const updated = { ...streak, notificationEnabled: true };
      setStreak(updated);
      storage.updateStreak(updated);
      streakManager.sendNotification(
        '🔥 GymForge Notifications Activated!',
        'You will now receive daily streak alerts so your training momentum never dies.',
        'streak_extended'
      );
    }
  };

  const handleTestReminder = () => {
    streakManager.triggerTestReminder();
    setTestSent(true);
    setTimeout(() => setTestSent(false), 3000);
  };

  const handleUpdateTime = (time: string) => {
    setSelectedTime(time);
    const updated = { ...streak, reminderTime: time };
    setStreak(updated);
    storage.updateStreak(updated);
  };

  const handleUseFreeze = () => {
    if (streak.freezeCount <= 0) return;
    const updated = {
      ...streak,
      freezeCount: streak.freezeCount - 1,
      hasTrainedToday: true,
    };
    setStreak(updated);
    storage.updateStreak(updated);
    streakManager.sendNotification(
      '❄️ Streak Freeze Activated!',
      'Your streak is protected for today. Recover well, warrior!',
      'daily_reminder'
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-orange-300 rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200 text-zinc-900">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-900 p-1 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Streak Section - Orange Div */}
        <div className="text-center pb-4 border-b border-orange-200">
          <div className="relative inline-block mb-3">
            <div className="w-20 h-20 rounded-3xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 mx-auto">
              <Flame className="w-10 h-10 fill-white animate-pulse" />
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-white border border-orange-300 text-[10px] font-mono font-bold text-orange-800 whitespace-nowrap shadow-2xs">
              DAY {streak.currentStreak}
            </span>
          </div>

          <h3 className="text-2xl font-black text-zinc-900 tracking-tight">
            Iron Streak Engine
          </h3>
          <p className="text-xs text-zinc-600 mt-1">
            {streak.hasTrainedToday
              ? '🔥 You have forged iron today! Flame is secured.'
              : '⚡ You haven’t logged a workout yet today. Don’t let your streak break!'}
          </p>

          <div className="grid grid-cols-2 gap-3 mt-4 text-left">
            <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold">Current Streak</span>
              <div className="text-xl font-black text-orange-700 font-mono">
                {streak.currentStreak} Days
              </div>
            </div>
            <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200">
              <span className="text-[10px] font-mono uppercase text-zinc-500 font-semibold">Personal Best</span>
              <div className="text-xl font-black text-zinc-900 font-mono">
                {streak.longestStreak} Days
              </div>
            </div>
          </div>
        </div>

        {/* Streak Notification Settings */}
        <div className="py-4 space-y-4 border-b border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
                <BellRing className="w-4 h-4 text-orange-600" />
                <span>Daily Streak Notifications</span>
              </h4>
              <p className="text-xs text-zinc-500">
                Receive proactive reminders before your gym streak expires.
              </p>
            </div>

            <button
              onClick={handleRequestPush}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                streak.notificationEnabled
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-400 font-black'
                  : 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-xs'
              }`}
            >
              {streak.notificationEnabled ? 'Enabled' : 'Enable Push'}
            </button>
          </div>

          {/* Time Picker & Test Alert */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-orange-50 p-3 rounded-xl border border-orange-200">
              <label className="block text-[11px] font-bold text-orange-950 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-orange-600" />
                Reminder Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => handleUpdateTime(e.target.value)}
                className="w-full bg-white border border-orange-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900 focus:outline-none focus:border-emerald-600 font-mono font-medium"
              >
                <option value="07:00">07:00 AM (Morning Wakeup)</option>
                <option value="12:00">12:00 PM (Midday Session)</option>
                <option value="17:00">05:00 PM (After Work)</option>
                <option value="18:00">06:00 PM (Evening Prime)</option>
                <option value="20:00">08:00 PM (Night Forge)</option>
              </select>
            </div>

            <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-orange-950 uppercase tracking-wider mb-1">
                Test In-App Alert
              </span>
              <button
                type="button"
                onClick={handleTestReminder}
                className="w-full py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{testSent ? 'Alert Dispatched!' : 'Send Test Alert'}</span>
              </button>
            </div>
          </div>

          {/* Streak Freeze Protector */}
          <div className="bg-orange-50 p-3 rounded-2xl border border-orange-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-sky-100 border border-sky-300 flex items-center justify-center flex-shrink-0 text-sky-700">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                  <span>Streak Freeze Guard</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-100 text-sky-800 font-bold">
                    {streak.freezeCount} Available
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Protect your streak if you need a planned recovery day.
                </p>
              </div>
            </div>

            <button
              onClick={handleUseFreeze}
              disabled={streak.freezeCount <= 0 || streak.hasTrainedToday}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white border border-orange-300 text-zinc-700 hover:text-zinc-900 hover:bg-orange-100 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              Use Freeze
            </button>
          </div>
        </div>

        {/* Milestone Badges Section (GymForge milestones) */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-orange-600" />
              <span>GymForge Milestone Badges</span>
            </h4>
            <span className="text-xs text-zinc-500 font-mono">
              {badges.filter((b) => b.unlockedAt).length} / {badges.length} Unlocked
            </span>
          </div>

          <div className="space-y-2">
            {badges.map((b) => {
              const isUnlocked = !!b.unlockedAt;
              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    isUnlocked
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-zinc-50 border-zinc-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isUnlocked
                          ? 'bg-orange-500 text-white font-bold shadow-xs'
                          : 'bg-zinc-200 text-zinc-400'
                      }`}
                    >
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                        <span>{b.name}</span>
                        {isUnlocked && (
                          <span className="text-[10px] text-emerald-700 font-mono font-bold">
                            ✓ Unlocked
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-zinc-500">{b.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
