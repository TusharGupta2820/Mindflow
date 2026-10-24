/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role?: string;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
  membership_id?: string;
  student_id?: string;
  department: string;
  institution: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  wellness_goals: string[];
  preferred_activities: string[];
  preferred_session_duration: number;
  reminders_enabled: boolean;
  audio_cues_enabled: boolean;
  reduced_motion: boolean;
  created_at: string;
  updated_at: string;
}

export type MoodType = 'Very Low' | 'Low' | 'Neutral' | 'Good' | 'Great';

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: MoodType;
  emotion_tags: string[];
  stress_level: number;
  reflection?: string;
  entry_date: string;
  created_at: string;
  updated_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title: string;
  content: string;
  mood?: string;
  tags: string[];
  entry_date: string;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface WellnessActivity {
  id: string;
  title: string;
  description: string;
  category: 'Breathing' | 'Mindfulness' | 'Relaxation' | 'Somatic' | 'Journaling';
  duration_minutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  instructions: string[];
  benefits: string[];
  is_active: boolean;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_id?: string;
  activity_title: string;
  duration_minutes: number;
  status: 'completed' | 'interrupted' | 'paused';
  feedback?: string;
  completed_at: string;
}

export interface WellnessGoal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_frequency: number;
  current_progress: number;
  unit: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Recommendation {
  activity: WellnessActivity;
  reason: string;
  confidence: number;
  priority: 'high' | 'medium' | 'low';
}

export interface ProgressSummary {
  totalMoodCheckIns: number;
  currentStreakDays: number;
  totalMindfulSessions: number;
  totalMinutesPracticed: number;
  totalJournalEntries: number;
  moodDistribution: Record<MoodType, number>;
  weeklyStabilityRate: number;
  stressAverage: number;
}

export interface AIMoodAnalysisResult {
  detectedMood: MoodType;
  moodTag: string;
  valenceScore: number;
  energyLevel: 'Low' | 'Moderate' | 'High';
  expressionAnalysis: string;
  activities: Array<{
    title: string;
    duration: string;
    category: string;
    description: string;
  }>;
  songs: Array<{
    title: string;
    artist: string;
    genre: string;
    moodVibe: string;
  }>;
  yogaPoses: Array<{
    englishName: string;
    sanskritName: string;
    difficulty: string;
    targetBenefit: string;
    instructions: string[];
  }>;
  breathingTechnique: {
    name: string;
    pattern: string;
    guidance: string;
  };
}
