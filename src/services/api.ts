/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Profile,
  UserPreferences,
  MoodEntry,
  JournalEntry,
  WellnessActivity,
  ActivityLog,
  WellnessGoal,
  Recommendation,
  ProgressSummary,
  AIMoodAnalysisResult,
} from '../types/index.ts';

const API_BASE = (import.meta.env.VITE_API_BASE_URL ? (import.meta.env.VITE_API_BASE_URL as string).replace(/\/$/, '') : '') + '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('mindbloom_token') || 'demo-token';
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    ...getAuthHeader(),
    ...(options.headers || {}),
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(errorData.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Health
  checkHealth: () => request<{ status: string; project: string }>('/health'),

  // Profile
  getProfile: () => request<Profile>('/profile'),
  updateProfile: (data: Partial<Profile>) =>
    request<Profile>('/profile', { method: 'PATCH', body: JSON.stringify(data) }),

  // Preferences
  getPreferences: () => request<UserPreferences>('/preferences'),
  updatePreferences: (data: Partial<UserPreferences>) =>
    request<UserPreferences>('/preferences', { method: 'PUT', body: JSON.stringify(data) }),

  // Moods
  getMoods: () => request<MoodEntry[]>('/moods'),
  getTodayMood: (date?: string) => request<{ mood: MoodEntry | null }>(`/moods/today${date ? `?date=${date}` : ''}`),
  logMood: (data: {
    mood: string;
    emotion_tags?: string[];
    stress_level?: number;
    reflection?: string;
    entry_date?: string;
  }) => request<MoodEntry>('/moods', { method: 'POST', body: JSON.stringify(data) }),
  deleteMood: (id: string) => request<{ success: boolean }>(`/moods/${id}`, { method: 'DELETE' }),

  // Journal
  getJournals: (search?: string) =>
    request<JournalEntry[]>(`/journal${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  getJournalById: (id: string) => request<JournalEntry>(`/journal/${id}`),
  createJournal: (data: {
    title: string;
    content: string;
    mood?: string;
    tags?: string[];
    entry_date?: string;
  }) => request<JournalEntry>('/journal', { method: 'POST', body: JSON.stringify(data) }),
  updateJournal: (id: string, data: Partial<JournalEntry>) =>
    request<JournalEntry>(`/journal/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteJournal: (id: string) => request<{ success: boolean }>(`/journal/${id}`, { method: 'DELETE' }),

  // Activities
  getActivities: (category?: string) =>
    request<WellnessActivity[]>(`/activities${category ? `?category=${encodeURIComponent(category)}` : ''}`),
  getActivityById: (id: string) => request<WellnessActivity>(`/activities/${id}`),
  completeActivity: (id: string, duration_minutes?: number, feedback?: string) =>
    request<ActivityLog>(`/activities/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ duration_minutes, feedback }),
    }),
  getActivityLogs: () => request<ActivityLog[]>('/activity-logs'),
  getSavedActivities: () => request<WellnessActivity[]>('/saved-activities'),
  saveActivity: (id: string) => request<{ success: boolean }>(`/activities/${id}/save`, { method: 'POST' }),
  unsaveActivity: (id: string) => request<{ success: boolean }>(`/activities/${id}/save`, { method: 'DELETE' }),

  // Recommendations
  getRecommendations: () => request<Recommendation[]>('/recommendations'),

  // Progress
  getProgressSummary: () => request<ProgressSummary>('/progress/summary'),
  getProgressMoods: () => request<MoodEntry[]>('/progress/moods'),
  getProgressActivities: () => request<ActivityLog[]>('/progress/activities'),

  // Goals
  getGoals: () => request<WellnessGoal[]>('/goals'),
  createGoal: (data: Partial<WellnessGoal>) =>
    request<WellnessGoal>('/goals', { method: 'POST', body: JSON.stringify(data) }),
  updateGoal: (id: string, data: Partial<WellnessGoal>) =>
    request<WellnessGoal>(`/goals/${id}`, { method: 'PATCH', body: JSON.stringify(data) }),
  deleteGoal: (id: string) => request<{ success: boolean }>(`/goals/${id}`, { method: 'DELETE' }),

  // Account
  deleteAccount: () => request<{ success: boolean }>('/account', { method: 'DELETE' }),

  // Gemini 3.6 Flash AI Features
  aiChat: (message: string, history?: Array<{ role: 'user' | 'model'; content: string }>) =>
    request<{ reply: string }>('/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    }),

  aiAnalyzeMood: (imageBase64: string) =>
    request<AIMoodAnalysisResult>('/ai/analyze-mood', {
      method: 'POST',
      body: JSON.stringify({ image: imageBase64 }),
    }),
};
