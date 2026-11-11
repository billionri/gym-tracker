import React, { useState } from 'react';
import { 
  Trophy, Flame, Dumbbell, Zap, Footprints, Check, Lock, Gift, 
  ExternalLink, Sparkles, Award, Compass, Heart, Mountain, Utensils, 
  ChevronRight, Plus, RefreshCw, Star
} from 'lucide-react';
import { 
  REWARDS_DATA, REWARD_ACTIONS, RewardItem, RewardActionInfo, 
  getLevel, getXPProgress, getLevelRank 
} from '../data/rewardsData';
import { WorkoutSession, StreakInfo } from '../types/workout';
import { storage } from '../services/storage';

interface RewardsMenuProps {
  sessions: WorkoutSession[];
  streak: StreakInfo;
  unit: 'kg' | 'lbs';
}

export const RewardsMenu: React.FC<RewardsMenuProps> = ({
  sessions,
  streak,
  unit,
}) => {
  const [claimedRewards, setClaimedRewards] = useState<Record<string, boolean>>(() => storage.getClaimedRewards());
  const [dailySteps, setDailySteps] = useState<number>(() => storage.getDailySteps());
  const [activeFilter, setActiveFilter] = useState<'all' | 'unlocked' | 'claimed' | 'locked'>('all');
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    rewardName: string;
    actionInfo: RewardActionInfo;
  } | null>(null);

  // Calculate live stats
  const totalVolumeKg = sessions.reduce((sum, s) => sum + s.totalVolumeKg, 0);
  const workoutCount = sessions.length;
  const currentStreak = streak.currentStreak;

  // Calculate total XP from claimed rewards
  const totalXP = REWARDS_DATA.reduce((sum, r) => {
    return sum + (claimedRewards[r.name] ? r.xp : 0);
  }, 0);

  const currentLevel = getLevel(totalXP);
  const xpProgress = getXPProgress(totalXP);
  const rankInfo = getLevelRank(currentLevel);

  const getMetricValue = (key: RewardItem['key']): number => {
    switch (key) {
      case 'workouts':
        return workoutCount;
      case 'streak':
        return currentStreak;
      case 'volume':
        return totalVolumeKg;
      case 'steps':
        return dailySteps;
    }
  };

  const handleClaimReward = (reward: RewardItem) => {
    if (claimedRewards[reward.name]) return;
    const updated = storage.setRewardClaimed(reward.name, true);
    setClaimedRewards({ ...updated });

    const actionInfo = REWARD_ACTIONS[reward.action] || REWARD_ACTIONS.generic;
    setActionModal({
      isOpen: true,
      rewardName: reward.name,
      actionInfo,
    });
  };

  const addSteps = (amount: number) => {
    const newSteps = Math.min(50000, dailySteps + amount);
    setDailySteps(newSteps);
    storage.setDailySteps(newSteps);
  };

  const resetSteps = () => {
    setDailySteps(0);
    storage.setDailySteps(0);
  };

  const filteredRewards = REWARDS_DATA.filter((r) => {
    const val = getMetricValue(r.key);
    const isUnlocked = val >= r.thr;
    const isClaimed = !!claimedRewards[r.name];

    if (activeFilter === 'unlocked') return isUnlocked && !isClaimed;
    if (activeFilter === 'claimed') return isClaimed;
    if (activeFilter === 'locked') return !isUnlocked;
    return true;
  });

  const claimableCount = REWARDS_DATA.filter((r) => {
    const val = getMetricValue(r.key);
    return val >= r.thr && !claimedRewards[r.name];
  }).length;

  return (
    <div className="space-y-6">
      {/* Header Banner (Orange Div) */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-100 via-orange-50 to-amber-50 border-2 border-orange-300 p-6 shadow-sm text-zinc-900">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-orange-100 border border-orange-300 text-orange-700">
                <Trophy className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-orange-800 uppercase font-mono">
                GymForge Gamification & Milestones
              </span>
            </div>
            <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
              <span>Rewards & Level Progression</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-200 text-orange-900 border border-orange-300 font-mono">
                Level {currentLevel}
              </span>
            </h2>
            <p className="text-sm text-zinc-600 mt-1 max-w-xl">
              Earn XP by breaking personal records, logging workouts, preserving streaks, and reaching 10,000 steps. Unlock lifestyle treats, restaurant outings, and travel adventures!
            </p>
          </div>

          {claimableCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-200 border-2 border-orange-400 text-orange-950 font-bold animate-pulse shadow-xs">
              <Sparkles className="w-4 h-4 text-orange-700" />
              <span className="text-xs font-bold font-mono">
                {claimableCount} Reward{claimableCount === 1 ? '' : 's'} Ready to Claim!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Level & XP Overview Box (Orange Div) */}
      <div className="rounded-2xl bg-orange-50/80 border-2 border-orange-300 p-5 sm:p-6 shadow-sm text-zinc-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-5 border-b border-orange-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border-2 border-orange-300 flex flex-col items-center justify-center flex-shrink-0 shadow-xs">
              <span className="text-2xl">{rankInfo.badge}</span>
              <span className="text-[10px] font-mono font-bold text-orange-700 uppercase">LVL {currentLevel}</span>
            </div>
            <div>
              <div className="text-[11px] font-mono text-orange-800 uppercase tracking-wider font-semibold">
                Total XP Earned
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-orange-700 font-mono tracking-tight">
                  {totalXP}
                </span>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">XP</span>
                <span className="text-xs font-bold ml-2 px-2 py-0.5 rounded-full bg-white border border-orange-200 text-orange-800 shadow-2xs">
                  {rankInfo.title}
                </span>
              </div>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="w-full sm:w-64 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-600">Level {currentLevel} → Level {currentLevel + 1}</span>
              <span className="font-mono text-orange-700 font-bold">{xpProgress} / 100 XP</span>
            </div>
            <div className="w-full h-3 rounded-full bg-orange-200 border border-orange-300 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <div className="text-[10px] text-zinc-500 text-right font-mono">
              {100 - xpProgress} XP needed for next level
            </div>
          </div>
        </div>

        {/* Live Training Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-white border border-orange-200 shadow-2xs">
            <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Workouts Logged</div>
            <div className="text-lg font-black text-zinc-900 font-mono mt-0.5">{workoutCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-orange-200 shadow-2xs">
            <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Iron Streak</div>
            <div className="text-lg font-black text-orange-600 font-mono mt-0.5">{currentStreak} Days 🔥</div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-orange-200 shadow-2xs">
            <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Total Volume</div>
            <div className="text-lg font-black text-orange-700 font-mono mt-0.5">
              {unit === 'kg' ? totalVolumeKg.toLocaleString() : Math.round(totalVolumeKg * 2.20462).toLocaleString()} {unit}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-white border border-orange-200 shadow-2xs">
            <div className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Claimed Milestones</div>
            <div className="text-lg font-black text-emerald-600 font-mono mt-0.5">
              {Object.values(claimedRewards).filter(Boolean).length} / {REWARDS_DATA.length}
            </div>
          </div>
        </div>
      </div>

      {/* DAILY STEP TRACKER (Orange Div + Green Buttons) */}
      <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 p-5 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-zinc-900">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-white border border-orange-300 flex items-center justify-center text-orange-600 flex-shrink-0 shadow-2xs">
            <Footprints className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-orange-800 font-bold">
                Daily Activity Logger
              </span>
              {dailySteps >= 10000 && (
                <span className="px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold">
                  ✓ 10K Steps Goal Met!
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-zinc-900 mt-0.5">
              Today's Step Count: <span className="font-mono text-orange-700 font-black">{dailySteps.toLocaleString()}</span> / 10,000 steps
            </h4>
            <div className="w-48 sm:w-64 h-2 rounded-full bg-orange-200 border border-orange-300 mt-2 overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (dailySteps / 10000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Add Step Buttons (Green Buttons) */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => addSteps(1000)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            +1,000 Steps
          </button>
          <button
            onClick={() => addSteps(2500)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-xs"
          >
            +2,500 Steps
          </button>
          <button
            onClick={() => addSteps(5000)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-black transition-colors cursor-pointer shadow-xs"
          >
            +5,000 Steps
          </button>
          <button
            onClick={resetSteps}
            className="p-2 rounded-lg bg-white text-zinc-600 hover:text-orange-600 border border-orange-300 transition-colors cursor-pointer shadow-2xs"
            title="Reset steps"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs (Green Buttons when active, Orange outline when inactive) */}
      <div className="flex items-center justify-between gap-3 border-b border-orange-200 pb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {([
            { id: 'all', label: 'All Rewards (10)' },
            { id: 'unlocked', label: `Ready to Claim (${claimableCount})` },
            { id: 'claimed', label: 'Claimed' },
            { id: 'locked', label: 'Locked' },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-emerald-600 text-white shadow-sm font-black'
                  : 'bg-orange-50 text-orange-800 hover:bg-orange-100 border border-orange-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <span className="text-xs text-zinc-500 font-mono hidden sm:inline">
          {filteredRewards.length} milestone{filteredRewards.length === 1 ? '' : 's'} shown
        </span>
      </div>

      {/* Rewards Grid (10 Orange Div Cards with Green Claim Buttons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredRewards.map((reward) => {
          const metricVal = getMetricValue(reward.key);
          const isUnlocked = metricVal >= reward.thr;
          const isClaimed = !!claimedRewards[reward.name];
          const progressPercent = Math.min(100, Math.round((metricVal / reward.thr) * 100));

          const getUnitLabel = () => {
            switch (reward.key) {
              case 'workouts': return 'workouts';
              case 'streak': return 'days streak';
              case 'volume': return `${unit}`;
              case 'steps': return 'steps';
            }
          };

          return (
            <div
              key={reward.name}
              className={`rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                isClaimed
                  ? 'bg-orange-50/50 border-orange-200'
                  : isUnlocked
                  ? 'bg-gradient-to-b from-orange-100/90 via-orange-50 to-white border-orange-400 shadow-md'
                  : 'bg-white border-orange-200 opacity-90'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2.5 rounded-2xl bg-white border border-orange-200 shadow-xs group-hover:scale-105 transition-transform">
                      {reward.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-zinc-900 text-base">
                          {reward.name}
                        </h4>
                        {isClaimed && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-mono font-bold">
                            Claimed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-600 mt-0.5">
                        {reward.desc}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg bg-orange-100 border border-orange-300 text-orange-800 font-mono font-bold text-xs flex-shrink-0">
                    +{reward.xp} XP
                  </span>
                </div>

                {/* Lock / Progress tracker */}
                <div className="mt-4 pt-3 border-t border-orange-200">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 text-[11px] font-mono">
                      {isUnlocked ? 'Unlocked!' : 'Requirement:'}
                    </span>
                    <span className="font-mono text-zinc-800 text-[11px] font-bold">
                      {reward.key === 'volume'
                        ? `${metricVal.toLocaleString()} / ${reward.thr.toLocaleString()} kg`
                        : `${metricVal.toLocaleString()} / ${reward.thr.toLocaleString()} ${getUnitLabel()}`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 rounded-full bg-orange-100 overflow-hidden border border-orange-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isClaimed
                          ? 'bg-emerald-500'
                          : isUnlocked
                          ? 'bg-gradient-to-r from-orange-500 to-amber-500'
                          : 'bg-orange-300'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Bottom Section */}
              <div className="mt-4 pt-3 border-t border-orange-200 flex items-center justify-between">
                <div>
                  {reward.action !== 'generic' && (
                    <span className="text-[10px] font-mono text-orange-700 flex items-center gap-1 font-semibold">
                      <Sparkles className="w-3 h-3 text-orange-600" />
                      <span>Special Lifestyle Treat</span>
                    </span>
                  )}
                </div>

                <div>
                  {isClaimed ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 px-3 py-1.5 rounded-lg bg-emerald-100 border border-emerald-300">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Claimed (+{reward.xp} XP)</span>
                    </div>
                  ) : isUnlocked ? (
                    /* Green Button for CLAIM */
                    <button
                      onClick={() => handleClaimReward(reward)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer animate-bounce duration-1000"
                    >
                      <Gift className="w-4 h-4 fill-white stroke-[2]" />
                      <span>CLAIM 🎁</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono px-3 py-1.5 rounded-lg bg-orange-50 border border-orange-200">
                      <Lock className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Locked ({progressPercent}%)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* REWARD ACTION MODAL (Orange Div + Green Buttons) */}
      {actionModal?.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-2 border-orange-400 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-500" />
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-orange-50 border-2 border-orange-300 flex items-center justify-center text-5xl mb-4 shadow-sm">
              {actionModal.actionInfo.emoji}
            </div>

            <h3 className="text-2xl font-black text-zinc-900 uppercase tracking-tight">
              {actionModal.actionInfo.title}
            </h3>

            <p className="text-sm font-bold text-orange-700 mt-1">
              {actionModal.rewardName} Unlocked!
            </p>

            <p className="text-xs text-zinc-600 mt-2 leading-relaxed max-w-sm mx-auto">
              {actionModal.actionInfo.sub}
            </p>

            {/* Interactive Green Action buttons */}
            <div className="mt-5 space-y-2.5">
              {actionModal.actionInfo.opts.map((opt, idx) => (
                <a
                  key={idx}
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <span>{opt.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}

              <button
                onClick={() => setActionModal(null)}
                className="w-full py-3 px-4 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 font-bold text-xs uppercase tracking-wider border border-orange-300 transition-colors cursor-pointer"
              >
                GOT IT, WARRIOR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
