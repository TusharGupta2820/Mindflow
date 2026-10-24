/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  MoodEntry,
  JournalEntry,
  WellnessActivity,
  ActivityLog,
  WellnessGoal,
  Recommendation,
  ProgressSummary,
} from '../types/index.ts';
import { api } from '../services/api.ts';

interface WellnessContextType {
  moods: MoodEntry[];
  todayMood: MoodEntry | null;
  journals: JournalEntry[];
  activities: WellnessActivity[];
  savedActivities: WellnessActivity[];
  activityLogs: ActivityLog[];
  goals: WellnessGoal[];
  recommendations: Recommendation[];
  summary: ProgressSummary | null;
  loading: boolean;
  refreshAll: () => Promise<void>;
  logMood: (data: {
    mood: string;
    emotion_tags?: string[];
    stress_level?: number;
    reflection?: string;
  }) => Promise<MoodEntry>;
  createJournal: (data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
  }) => Promise<JournalEntry>;
  updateJournal: (id: string, data: Partial<JournalEntry>) => Promise<JournalEntry>;
  deleteJournal: (id: string) => Promise<void>;
  completeActivity: (id: string, duration_minutes?: number, feedback?: string) => Promise<ActivityLog>;
  toggleSaveActivity: (id: string) => Promise<void>;
  incrementGoal: (goalId: string) => Promise<void>;
}

const WellnessContext = createContext<WellnessContextType | undefined>(undefined);

export const WellnessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [todayMood, setTodayMood] = useState<MoodEntry | null>(null);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [activities, setActivities] = useState<WellnessActivity[]>([]);
  const [savedActivities, setSavedActivities] = useState<WellnessActivity[]>([]);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [goals, setGoals] = useState<WellnessGoal[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const refreshAll = async () => {
    try {
      const [
        fetchedMoods,
        fetchedToday,
        fetchedJournals,
        fetchedActs,
        fetchedSaved,
        fetchedLogs,
        fetchedGoals,
        fetchedRecs,
        fetchedSummary,
      ] = await Promise.all([
        api.getMoods().catch(() => []),
        api.getTodayMood().catch(() => ({ mood: null })),
        api.getJournals().catch(() => []),
        api.getActivities().catch(() => []),
        api.getSavedActivities().catch(() => []),
        api.getActivityLogs().catch(() => []),
        api.getGoals().catch(() => []),
        api.getRecommendations().catch(() => []),
        api.getProgressSummary().catch(() => null),
      ]);

      setMoods(fetchedMoods);
      setTodayMood(fetchedToday.mood);
      setJournals(fetchedJournals);
      setActivities(fetchedActs);
      setSavedActivities(fetchedSaved);
      setActivityLogs(fetchedLogs);
      setGoals(fetchedGoals);
      setRecommendations(fetchedRecs);
      setSummary(fetchedSummary);
    } catch (err) {
      console.error('Error refreshing wellness data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshAll();
  }, []);

  const logMood = async (data: {
    mood: string;
    emotion_tags?: string[];
    stress_level?: number;
    reflection?: string;
  }) => {
    const saved = await api.logMood(data);
    setTodayMood(saved);
    await refreshAll();
    return saved;
  };

  const createJournal = async (data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
  }) => {
    const created = await api.createJournal(data);
    setJournals((prev) => [created, ...prev]);
    await refreshAll();
    return created;
  };

  const updateJournal = async (id: string, data: Partial<JournalEntry>) => {
    const updated = await api.updateJournal(id, data);
    setJournals((prev) => prev.map((j) => (j.id === id ? updated : j)));
    return updated;
  };

  const deleteJournal = async (id: string) => {
    await api.deleteJournal(id);
    setJournals((prev) => prev.filter((j) => j.id !== id));
    await refreshAll();
  };

  const completeActivity = async (id: string, duration_minutes?: number, feedback?: string) => {
    const log = await api.completeActivity(id, duration_minutes, feedback);
    setActivityLogs((prev) => [log, ...prev]);
    await refreshAll();
    return log;
  };

  const toggleSaveActivity = async (id: string) => {
    const isSaved = savedActivities.some((a) => a.id === id);
    if (isSaved) {
      await api.unsaveActivity(id);
      setSavedActivities((prev) => prev.filter((a) => a.id !== id));
    } else {
      await api.saveActivity(id);
      const act = activities.find((a) => a.id === id);
      if (act) {
        setSavedActivities((prev) => [...prev, act]);
      }
    }
  };

  const incrementGoal = async (goalId: string) => {
    const target = goals.find((g) => g.id === goalId);
    if (!target) return;
    const newProgress = Math.min(target.current_progress + 1, target.target_frequency + 5);
    const updated = await api.updateGoal(goalId, { current_progress: newProgress });
    setGoals((prev) => prev.map((g) => (g.id === goalId ? updated : g)));
  };

  return (
    <WellnessContext.Provider
      value={{
        moods,
        todayMood,
        journals,
        activities,
        savedActivities,
        activityLogs,
        goals,
        recommendations,
        summary,
        loading,
        refreshAll,
        logMood,
        createJournal,
        updateJournal,
        deleteJournal,
        completeActivity,
        toggleSaveActivity,
        incrementGoal,
      }}
    >
      {children}
    </WellnessContext.Provider>
  );
};

export const useWellness = () => {
  const context = useContext(WellnessContext);
  if (!context) {
    throw new Error('useWellness must be used within a WellnessProvider');
  }
  return context;
};
