import { StreakInfo, AchievementBadge, WorkoutSession } from '../types/workout';
import { storage } from './storage';

export interface StreakAlert {
  id: string;
  type: 'streak_danger' | 'streak_extended' | 'milestone_unlocked' | 'daily_reminder';
  title: string;
  message: string;
  timestamp: number;
}

class StreakNotificationManager {
  private listeners: ((alert: StreakAlert) => void)[] = [];

  // Check if browser notifications are supported
  public isNotificationSupported(): boolean {
    return 'Notification' in window;
  }

  // Request browser permission
  public async requestPermission(): Promise<NotificationPermission> {
    if (!this.isNotificationSupported()) return 'denied';
    const permission = await Notification.requestPermission();
    const streak = storage.getStreak();
    streak.notificationEnabled = permission === 'granted';
    storage.updateStreak(streak);
    return permission;
  }

  public getPermissionStatus(): NotificationPermission {
    if (!this.isNotificationSupported()) return 'denied';
    return Notification.permission;
  }

  // Send native or in-app notification
  public sendNotification(title: string, body: string, type: StreakAlert['type'] = 'daily_reminder') {
    const alert: StreakAlert = {
      id: 'alert-' + Date.now(),
      type,
      title,
      message: body,
      timestamp: Date.now(),
    };

    // Broadcast to in-app listeners
    this.listeners.forEach((fn) => fn(alert));

    // Try system native notification if permitted
    if (this.isNotificationSupported() && Notification.permission === 'granted') {
      try {
        new Notification(title, {
          body,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
        });
      } catch {
        // Fallback or ignore in unsupported iframe environment
      }
    }
  }

  // Trigger workout completion streak advance
  public onWorkoutCompleted(session: WorkoutSession): { streak: StreakInfo; newlyUnlockedBadges: AchievementBadge[] } {
    const streak = storage.getStreak();
    const todayStr = new Date().toISOString().split('T')[0];

    const isFirstToday = streak.lastActiveDate !== todayStr;
    if (isFirstToday) {
      streak.currentStreak += 1;
      if (streak.currentStreak > streak.longestStreak) {
        streak.longestStreak = streak.currentStreak;
      }
      streak.lastActiveDate = todayStr;
      streak.hasTrainedToday = true;
      storage.updateStreak(streak);

      this.sendNotification(
        '🔥 Streak Maintained!',
        `Sensational lift! You are on a ${streak.currentStreak}-day gym streak! Keep forging iron!`,
        'streak_extended'
      );
    }

    // Check badges
    const badges = storage.getBadges();
    const sessions = storage.getSessions();
    const newlyUnlocked: AchievementBadge[] = [];

    const totalVolume = sessions.reduce((acc, s) => acc + s.totalVolumeKg, 0) + session.totalVolumeKg;

    badges.forEach((b) => {
      if (!b.unlockedAt) {
        if (b.id === 'badge-first') {
          b.unlockedAt = todayStr;
          newlyUnlocked.push(b);
        } else if (b.id === 'badge-streak-7' && streak.currentStreak >= 7) {
          b.unlockedAt = todayStr;
          newlyUnlocked.push(b);
        } else if (b.id === 'badge-volume-5k' && totalVolume >= 5000) {
          b.unlockedAt = todayStr;
          newlyUnlocked.push(b);
        } else if (b.id === 'badge-month-strong' && streak.currentStreak >= 30) {
          b.unlockedAt = todayStr;
          newlyUnlocked.push(b);
        }
      }
    });

    if (newlyUnlocked.length > 0) {
      storage.updateBadges(badges);
      newlyUnlocked.forEach((ub) => {
        this.sendNotification(
          `🏆 Badge Unlocked: ${ub.name}!`,
          ub.description,
          'milestone_unlocked'
        );
      });
    }

    return { streak, newlyUnlockedBadges: newlyUnlocked };
  }

  // Trigger test streak reminder
  public triggerTestReminder() {
    const streak = storage.getStreak();
    this.sendNotification(
      '🔥 GymForge Streak Reminder',
      `You're on a ${streak.currentStreak}-day streak! Time to hit the iron today before your streak expires.`,
      'daily_reminder'
    );
  }

  // Subscribe to in-app alerts
  public subscribe(cb: (alert: StreakAlert) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((fn) => fn !== cb);
    };
  }
}

export const streakManager = new StreakNotificationManager();
