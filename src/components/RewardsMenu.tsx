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
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-amber-950/40 border border-zinc-800 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Trophy className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold tracking-wider text-amber-400 uppercase font-mono">
                GymForge Gamification & Milestones
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Rewards & Level Progression</span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Level {currentLevel}
              </span>
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl">
              Earn XP by breaking personal records, logging workouts, preserving streaks, and reaching 10,000 steps. Unlock lifestyle treats, restaurant outings, and travel adventures!
            </p>
          </div>

          {claimableCount > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/40 text-amber-400 animate-pulse">
              <Sparkles className="w-4 h-4" />
              <span className="text-xs font-bold font-mono">
                {claimableCount} Reward{claimableCount === 1 ? '' : 's'} Ready to Claim!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Level & XP Overview Box (Replicating GymForge #totalXP & level progress) */}
      <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 sm:p-6 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 pb-5 border-b border-zinc-800/80">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-2xl">{rankInfo.badge}</span>
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase">LVL {currentLevel}</span>
            </div>
            <div>
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Total XP Earned
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                  {totalXP}
                </span>
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">XP</span>
                <span className={`text-xs font-bold ml-2 px-2 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 ${rankInfo.color}`}>
                  {rankInfo.title}
                </span>
              </div>
            </div>
          </div>

          {/* Progress to next level */}
          <div className="w-full sm:w-64 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-zinc-400">Level {currentLevel} → Level {currentLevel + 1}</span>
              <span className="font-mono text-amber-400 font-bold">{xpProgress} / 100 XP</span>
            </div>
            <div className="w-full h-3 rounded-full bg-zinc-950 border border-zinc-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 rounded-full transition-all duration-700 ease-out"
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
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">Workouts Logged</div>
            <div className="text-lg font-black text-white font-mono mt-0.5">{workoutCount}</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">Iron Streak</div>
            <div className="text-lg font-black text-orange-400 font-mono mt-0.5">{currentStreak} Days 🔥</div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">Total Volume</div>
            <div className="text-lg font-black text-amber-400 font-mono mt-0.5">
              {unit === 'kg' ? totalVolumeKg.toLocaleString() : Math.round(totalVolumeKg * 2.20462).toLocaleString()} {unit}
            </div>
          </div>
          <div className="p-3 rounded-xl bg-zinc-950/60 border border-zinc-800/80">
            <div className="text-[10px] font-mono text-zinc-500 uppercase">Claimed Milestones</div>
            <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">
              {Object.values(claimedRewards).filter(Boolean).length} / {REWARDS_DATA.length}
            </div>
          </div>
        </div>
      </div>

      {/* DAILY STEP TRACKER (Supports 10K Steps reward) */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0">
            <Footprints className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 font-bold">
                Daily Activity Logger
              </span>
              {dailySteps >= 10000 && (
                <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  ✓ 10K Steps Goal Met!
                </span>
              )}
            </div>
            <h4 className="text-base font-bold text-white mt-0.5">
              Today's Step Count: <span className="font-mono text-sky-400">{dailySteps.toLocaleString()}</span> / 10,000 steps
            </h4>
            <div className="w-48 sm:w-64 h-2 rounded-full bg-zinc-950 border border-zinc-800 mt-2 overflow-hidden">
              <div
                className="h-full bg-sky-400 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (dailySteps / 10000) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Add Step Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={() => addSteps(1000)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
          >
            +1,000 Steps
          </button>
          <button
            onClick={() => addSteps(2500)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold border border-zinc-700 transition-colors cursor-pointer"
          >
            +2,500 Steps
          </button>
          <button
            onClick={() => addSteps(5000)}
            className="flex-1 sm:flex-none px-3 py-1.5 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 text-xs font-bold border border-sky-500/40 transition-colors cursor-pointer"
          >
            +5,000 Steps
          </button>
          <button
            onClick={resetSteps}
            className="p-2 rounded-lg bg-zinc-950 text-zinc-500 hover:text-zinc-300 border border-zinc-800 transition-colors cursor-pointer"
            title="Reset steps"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between gap-3 border-b border-zinc-800 pb-3">
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
                  ? 'bg-amber-500 text-zinc-950 shadow-md font-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
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

      {/* Rewards Grid (10 Original Items from gym-tracker.infinityfreeapp.com) */}
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
              className={`rounded-2xl border p-5 flex flex-col justify-between transition-all duration-200 relative overflow-hidden group ${
                isClaimed
                  ? 'bg-zinc-900/60 border-zinc-800/80'
                  : isUnlocked
                  ? 'bg-gradient-to-b from-amber-500/10 via-zinc-900 to-zinc-900 border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-zinc-900/90 border-zinc-800/90 opacity-80'
              }`}
            >
              {/* Radial glow for unlocked items */}
              {isUnlocked && !isClaimed && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              )}

              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-2.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow-inner group-hover:scale-105 transition-transform">
                      {reward.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-base">
                          {reward.name}
                        </h4>
                        {isClaimed && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                            Claimed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {reward.desc}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold text-xs flex-shrink-0">
                    +{reward.xp} XP
                  </span>
                </div>

                {/* Lock / Progress tracker */}
                <div className="mt-4 pt-3 border-t border-zinc-800/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-zinc-500 text-[11px] font-mono">
                      {isUnlocked ? 'Unlocked!' : 'Requirement:'}
                    </span>
                    <span className="font-mono text-zinc-300 text-[11px] font-bold">
                      {reward.key === 'volume'
                        ? `${metricVal.toLocaleString()} / ${reward.thr.toLocaleString()} kg`
                        : `${metricVal.toLocaleString()} / ${reward.thr.toLocaleString()} ${getUnitLabel()}`}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-zinc-950 overflow-hidden border border-zinc-800/60">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isClaimed
                          ? 'bg-emerald-500'
                          : isUnlocked
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                          : 'bg-zinc-700'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Action Bottom Section */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between">
                <div>
                  {reward.action !== 'generic' && (
                    <span className="text-[10px] font-mono text-amber-400/80 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Special Lifestyle Treat</span>
                    </span>
                  )}
                </div>

                <div>
                  {isClaimed ? (
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Claimed (+{reward.xp} XP)</span>
                    </div>
                  ) : isUnlocked ? (
                    <button
                      onClick={() => handleClaimReward(reward)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:brightness-110 text-zinc-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all cursor-pointer animate-bounce duration-1000"
                    >
                      <Gift className="w-4 h-4 fill-zinc-950 stroke-[2]" />
                      <span>CLAIM 🎁</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Locked ({progressPercent}%)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* REWARD ACTION MODAL (Replicating GymForge #rewardActionModal) */}
      {actionModal?.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-amber-500/40 rounded-3xl max-w-md w-full p-6 text-center shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400" />
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-5xl mb-4 shadow-lg shadow-amber-500/10">
              {actionModal.actionInfo.emoji}
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tight">
              {actionModal.actionInfo.title}
            </h3>

            <p className="text-sm font-semibold text-amber-400 mt-1">
              {actionModal.rewardName} Unlocked!
            </p>

            <p className="text-xs text-zinc-300 mt-2 leading-relaxed max-w-sm mx-auto">
              {actionModal.actionInfo.sub}
            </p>

            {/* Interactive Action buttons (e.g. Find restaurants near me) */}
            <div className="mt-5 space-y-2.5">
              {actionModal.actionInfo.opts.map((opt, idx) => (
                <a
                  key={idx}
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-500 hover:from-purple-500 hover:to-violet-400 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-500/20 transition-all"
                >
                  <span>{opt.label}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}

              <button
                onClick={() => setActionModal(null)}
                className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider border border-zinc-700 transition-colors cursor-pointer"
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
