/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Profile {
  id: string;
  full_name: string;
  avatar_url?: string;
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

export interface MoodEntry {
  id: string;
  user_id: string;
  mood: 'Very Low' | 'Low' | 'Neutral' | 'Good' | 'Great';
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

export interface SavedActivity {
  id: string;
  user_id: string;
  activity_id: string;
  created_at: string;
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

// In-Memory Database Store with initial seed data matching Stitch prototype
export class MindBloomStore {
  private profiles: Map<string, Profile> = new Map();
  private preferences: Map<string, UserPreferences> = new Map();
  private moods: Map<string, MoodEntry> = new Map();
  private journals: Map<string, JournalEntry> = new Map();
  private activities: Map<string, WellnessActivity> = new Map();
  private activityLogs: Map<string, ActivityLog> = new Map();
  private savedActivities: Map<string, SavedActivity> = new Map();
  private goals: Map<string, WellnessGoal> = new Map();

  constructor() {
    this.seedDatabase();
  }

  private seedDatabase() {
    const demoUserId = '00000000-0000-0000-0000-000000000001';

    // 1. Seed Profile
    const profile: Profile = {
      id: demoUserId,
      full_name: 'Aria Chen',
      avatar_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDHNwEr1bHhY0Bs0yyHJo0yVbkbnvj9nqOR9LCGfVBYktar69xfcFpaV9hovYmv1qzo_ao3WFWr8hM28GMsKsnfYpt8Wce28oApaXTfSI1IMfyTtB1-TSIxHk29_U1F6EF9C-oxRuFf0MguKUM6lS4DV5k2rQbFPUvoZUCaQMJQ5zgRcIMA6jmOipJuNaOd0kkuidfhL5OuMhSraVVHhL0b94a21swtiU1LaaQuQ15AQDg7oDfQ7cH4',
      student_id: 'MB-2025-042',
      department: 'Mindfulness & Cognitive Resilience',
      institution: 'MindBloom Digital Sanctuary',
      created_at: new Date('2024-10-01T08:00:00Z').toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.profiles.set(demoUserId, profile);

    // 2. Seed Preferences
    const pref: UserPreferences = {
      id: 'pref-001',
      user_id: demoUserId,
      wellness_goals: ['stress_relief', 'exam_calm', 'focus_enhancement'],
      preferred_activities: ['box_breathing', 'reflective_journaling', 'pmr_relaxation'],
      preferred_session_duration: 5,
      reminders_enabled: true,
      audio_cues_enabled: true,
      reduced_motion: false,
      created_at: new Date('2024-10-01T08:00:00Z').toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.preferences.set(demoUserId, pref);

    // 3. Seed Activities Catalogue
    const seedActs: WellnessActivity[] = [
      {
        id: 'act-001',
        title: 'Box Breathing for Midday Focus',
        description:
          'Regulate your autonomic nervous system using a balanced 4-4-4-4 rhythm. Scientifically proven to reduce acute cortisol spikes before study blocks.',
        category: 'Breathing',
        duration_minutes: 4,
        difficulty: 'Beginner',
        instructions: [
          'Inhale gently through your nose for 4 counts',
          'Hold full breath comfortably for 4 counts',
          'Smoothly exhale through mouth for 4 counts',
          'Rest in stillness with empty lungs for 4 counts',
        ],
        benefits: ['Reduces acute cortisol', 'Restores working memory', 'Calms heart rate'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-002',
        title: '4-7-8 Relaxing Respiration',
        description:
          'Deep parasympathetic tone and rapid anxiety relief via prolonged 8-second exhalation to stimulate the vagus nerve.',
        category: 'Breathing',
        duration_minutes: 5,
        difficulty: 'Beginner',
        instructions: [
          'Inhale softly through nose for 4 seconds',
          'Hold breath gently for 7 seconds',
          'Exhale with a gentle whoosh for 8 seconds',
        ],
        benefits: ['Soothes acute panic', 'Facilitates sleep transition', 'Down-regulates adrenaline'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-003',
        title: 'Resonant Coherence (5.5s Cycle)',
        description:
          'Harmonize Heart Rate Variability (HRV) and baroreflex response with continuous, equalized rhythmic breathing.',
        category: 'Breathing',
        duration_minutes: 5,
        difficulty: 'Intermediate',
        instructions: [
          'Inhale smoothly for 5.5 seconds',
          'Exhale smoothly for 5.5 seconds without pauses',
        ],
        benefits: ['Maximizes HRV power spectrum', 'Increases emotional resilience', 'Stabilizes vagal tone'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-004',
        title: '5-4-3-2-1 Sensory Grounding',
        description:
          'Tactile multisensory grounding to pull conscious awareness back from acute panic or intrusive thinking through environmental observation.',
        category: 'Relaxation',
        duration_minutes: 6,
        difficulty: 'Beginner',
        instructions: [
          'Look for 5 objects you can clearly see',
          'Acknowledge 4 things you can physically touch or feel',
          'Identify 3 subtle ambient sounds in your vicinity',
          'Notice 2 scents or clean fresh air aromas',
          'Observe 1 sensation of taste or grounded gratitude',
        ],
        benefits: ['Halts catastrophic rumination', 'Restores sensory presence', 'Breaks panic loop'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-005',
        title: 'Progressive Muscle Relaxation (PMR)',
        description:
          'Systematic tension and release across major muscular groups to systematically discharge somatic stress from study strain.',
        category: 'Relaxation',
        duration_minutes: 8,
        difficulty: 'Beginner',
        instructions: [
          'Gently clench hands into fists for 5 seconds, then let go completely',
          'Shrug shoulders upward toward ears, hold, then drop down',
          'Tense abdominal and quadricep muscles, then exhale release',
          'Notice the spreading warmth and release throughout your body',
        ],
        benefits: ['Releases neck/shoulder stiffness', 'Lowers physical agitation', 'Fosters somatic calm'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-006',
        title: 'Mindfulness & Stillness (Body Scan)',
        description:
          'Head-to-toe body scan, mindful gratitude breaks, and sensory orientation scripts without judgment.',
        category: 'Mindfulness',
        duration_minutes: 10,
        difficulty: 'Intermediate',
        instructions: [
          'Sit comfortably with spine upright and shoulders open',
          'Bring curious attention to the soles of your feet',
          'Scan slowly through hips, spine, chest, throat, and face',
          'Acknowledge any sensations without seeking to change them',
        ],
        benefits: ['Deep interoception', 'Reduces cognitive fatigue', 'Anchors present focus'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-007',
        title: 'Reflective Journaling & Cognitive Reframing',
        description:
          'Unpack cognitive load using guided prompts, cognitive reframing, and stream-of-thought writing.',
        category: 'Journaling',
        duration_minutes: 7,
        difficulty: 'Beginner',
        instructions: [
          'What is one expectation you can release today to make room for peace?',
          'Separate objective facts from internal worry assumptions',
          'Formulate one compassionate self-talk sentence',
        ],
        benefits: ['Clarifies cognitive distortions', 'Alleviates mental overwhelm', 'Builds self-efficacy'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
      {
        id: 'act-008',
        title: 'Gratitude & Micro-Moments',
        description:
          'Record three microscopic pleasant occurrences from the day to rewire baseline positivity and appreciative focus.',
        category: 'Journaling',
        duration_minutes: 4,
        difficulty: 'Beginner',
        instructions: [
          'Name a comforting taste, smell, or temperature from today',
          'Recall a brief helpful exchange with an advisor or peer',
          'Acknowledge your own effort in showing up today',
        ],
        benefits: ['Boosts baseline dopamine', 'Enhances contentment', 'Strengthens perspective'],
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
      },
    ];
    seedActs.forEach((act) => this.activities.set(act.id, act));

    // 4. Seed Saved Activity
    this.savedActivities.set('save-001', {
      id: 'save-001',
      user_id: demoUserId,
      activity_id: 'act-001',
      created_at: new Date('2024-10-20T10:00:00Z').toISOString(),
    });

    // 5. Seed Mood Entries (Consistent with the Stitch October 2024 UI)
    const seedMoods: MoodEntry[] = [
      {
        id: 'mood-001',
        user_id: demoUserId,
        mood: 'Great',
        emotion_tags: ['Happy', 'Rested', 'Calm'],
        stress_level: 1,
        reflection: 'Cooked breakfast with roommates, zero screens for morning hours.',
        entry_date: '2024-10-21',
        created_at: new Date('2024-10-21T09:30:00Z').toISOString(),
        updated_at: new Date('2024-10-21T09:30:00Z').toISOString(),
      },
      {
        id: 'mood-002',
        user_id: demoUserId,
        mood: 'Good',
        emotion_tags: ['Calm', 'Grateful'],
        stress_level: 2,
        reflection: 'Walked home from campus through the botanical reserve.',
        entry_date: '2024-10-22',
        created_at: new Date('2024-10-22T17:15:00Z').toISOString(),
        updated_at: new Date('2024-10-22T17:15:00Z').toISOString(),
      },
      {
        id: 'mood-003',
        user_id: demoUserId,
        mood: 'Neutral',
        emotion_tags: ['Tired', 'Motivated'],
        stress_level: 3,
        reflection: 'Late night deep focus session for key weekly milestones.',
        entry_date: '2024-10-23',
        created_at: new Date('2024-10-23T22:45:00Z').toISOString(),
        updated_at: new Date('2024-10-23T22:45:00Z').toISOString(),
      },
      {
        id: 'mood-004',
        user_id: demoUserId,
        mood: 'Good',
        emotion_tags: ['Calm', 'Motivated', 'Grateful'],
        stress_level: 2,
        reflection: 'Finished my afternoon priorities, feeling relieved but a bit physically tired.',
        entry_date: '2024-10-24',
        created_at: new Date('2024-10-24T08:30:00Z').toISOString(),
        updated_at: new Date('2024-10-24T08:30:00Z').toISOString(),
      },
    ];
    seedMoods.forEach((m) => this.moods.set(m.id, m));

    // 6. Seed Journal Entries
    const seedJournals: JournalEntry[] = [
      {
        id: 'journal-001',
        user_id: demoUserId,
        title: 'Finding quiet by the tall window...',
        content:
          'I sat by the tall north window. The light made everything feel slower. Stepped away from group study chatter for fifteen minutes just to breathe and let my nervous system down-regulate.',
        mood: 'Good',
        tags: ['Quiet Focus', 'Self-Compassion', 'Breathing'],
        entry_date: '2024-10-23',
        is_favorite: true,
        created_at: new Date('2024-10-23T14:20:00Z').toISOString(),
        updated_at: new Date('2024-10-23T14:20:00Z').toISOString(),
      },
      {
        id: 'journal-002',
        user_id: demoUserId,
        title: 'Sunday Morning Unhurried Rituals',
        content:
          'Brewed warm cardamom tea and read fiction with zero notifications enabled. Reminded myself that productivity is not the measure of human worth. Today was about rest and restoration.',
        mood: 'Great',
        tags: ['Rest', 'Gratitude', 'Digital Detox'],
        entry_date: '2024-10-21',
        is_favorite: false,
        created_at: new Date('2024-10-21T11:00:00Z').toISOString(),
        updated_at: new Date('2024-10-21T11:00:00Z').toISOString(),
      },
    ];
    seedJournals.forEach((j) => this.journals.set(j.id, j));

    // 7. Seed Activity Logs
    const seedLogs: ActivityLog[] = [
      {
        id: 'log-001',
        user_id: demoUserId,
        activity_id: 'act-001',
        activity_title: 'Box Breathing for Midday Focus',
        duration_minutes: 4,
        status: 'completed',
        completed_at: new Date('2024-10-24T08:45:00Z').toISOString(),
      },
      {
        id: 'log-002',
        user_id: demoUserId,
        activity_id: 'act-006',
        activity_title: 'Mindfulness & Stillness (Body Scan)',
        duration_minutes: 10,
        status: 'completed',
        completed_at: new Date('2024-10-23T18:30:00Z').toISOString(),
      },
      {
        id: 'log-003',
        user_id: demoUserId,
        activity_id: 'act-002',
        activity_title: '4-7-8 Relaxing Respiration',
        duration_minutes: 5,
        status: 'completed',
        completed_at: new Date('2024-10-22T21:10:00Z').toISOString(),
      },
      {
        id: 'log-004',
        user_id: demoUserId,
        activity_id: 'act-004',
        activity_title: '5-4-3-2-1 Sensory Grounding',
        duration_minutes: 6,
        status: 'completed',
        completed_at: new Date('2024-10-21T16:00:00Z').toISOString(),
      },
    ];
    seedLogs.forEach((l) => this.activityLogs.set(l.id, l));

    // 8. Seed Goals / Daily Anchors
    const seedGoals: WellnessGoal[] = [
      {
        id: 'goal-001',
        user_id: demoUserId,
        title: 'Hydration Goal',
        description: 'Drink 8 glasses of water throughout study sessions',
        target_frequency: 8,
        current_progress: 5,
        unit: 'glasses',
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'goal-002',
        user_id: demoUserId,
        title: 'Midday Mindful Pause',
        description: 'Take at least one 3-minute somatic reset during afternoon classes',
        target_frequency: 1,
        current_progress: 1,
        unit: 'session',
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'goal-003',
        user_id: demoUserId,
        title: 'Evening Reflection',
        description: 'Record one reflective micro-journal note after 8:00 PM',
        target_frequency: 1,
        current_progress: 0,
        unit: 'entry',
        is_active: true,
        created_at: new Date('2024-10-01T00:00:00Z').toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    seedGoals.forEach((g) => this.goals.set(g.id, g));
  }

  // --- Profile Operations ---
  getProfile(userId: string): Profile | undefined {
    return this.profiles.get(userId);
  }

  updateProfile(userId: string, data: Partial<Profile>): Profile {
    let p = this.profiles.get(userId);
    if (!p) {
      p = {
        id: userId,
        full_name: data.full_name || 'Anonymous Member',
        department: data.department || 'Mindfulness & Cognitive Resilience',
        institution: data.institution || 'MindBloom Sanctuary',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    } else {
      p = { ...p, ...data, updated_at: new Date().toISOString() };
    }
    this.profiles.set(userId, p);
    return p;
  }

  // --- Preferences Operations ---
  getPreferences(userId: string): UserPreferences {
    let pref = this.preferences.get(userId);
    if (!pref) {
      pref = {
        id: `pref-${Date.now()}`,
        user_id: userId,
        wellness_goals: ['stress_relief', 'exam_calm'],
        preferred_activities: ['box_breathing'],
        preferred_session_duration: 5,
        reminders_enabled: true,
        audio_cues_enabled: true,
        reduced_motion: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      this.preferences.set(userId, pref);
    }
    return pref;
  }

  updatePreferences(userId: string, data: Partial<UserPreferences>): UserPreferences {
    const existing = this.getPreferences(userId);
    const updated: UserPreferences = {
      ...existing,
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.preferences.set(userId, updated);
    return updated;
  }

  // --- Mood Operations ---
  getMoods(userId: string): MoodEntry[] {
    return Array.from(this.moods.values())
      .filter((m) => m.user_id === userId)
      .sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());
  }

  getTodayMood(userId: string, dateStr?: string): MoodEntry | undefined {
    const target = dateStr || new Date().toISOString().split('T')[0];
    return Array.from(this.moods.values()).find(
      (m) => m.user_id === userId && m.entry_date === target
    );
  }

  getMoodById(userId: string, id: string): MoodEntry | undefined {
    const m = this.moods.get(id);
    return m && m.user_id === userId ? m : undefined;
  }

  saveMood(userId: string, data: Omit<MoodEntry, 'id' | 'user_id' | 'created_at' | 'updated_at'>): MoodEntry {
    const today = data.entry_date || new Date().toISOString().split('T')[0];
    const existing = this.getTodayMood(userId, today);
    const now = new Date().toISOString();

    if (existing) {
      const updated: MoodEntry = {
        ...existing,
        ...data,
        updated_at: now,
      };
      this.moods.set(existing.id, updated);
      return updated;
    }

    const newMood: MoodEntry = {
      id: `mood-${Date.now()}`,
      user_id: userId,
      mood: data.mood,
      emotion_tags: data.emotion_tags || [],
      stress_level: data.stress_level ?? 2,
      reflection: data.reflection || '',
      entry_date: today,
      created_at: now,
      updated_at: now,
    };
    this.moods.set(newMood.id, newMood);
    return newMood;
  }

  deleteMood(userId: string, id: string): boolean {
    const m = this.moods.get(id);
    if (m && m.user_id === userId) {
      this.moods.delete(id);
      return true;
    }
    return false;
  }

  // --- Journal Operations ---
  getJournals(userId: string, search?: string): JournalEntry[] {
    let list = Array.from(this.journals.values())
      .filter((j) => j.user_id === userId)
      .sort((a, b) => new Date(b.entry_date).getTime() - new Date(a.entry_date).getTime());

    if (search && search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (j) =>
          j.title.toLowerCase().includes(q) ||
          j.content.toLowerCase().includes(q) ||
          j.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return list;
  }

  getJournalById(userId: string, id: string): JournalEntry | undefined {
    const j = this.journals.get(id);
    return j && j.user_id === userId ? j : undefined;
  }

  createJournal(userId: string, data: Partial<JournalEntry>): JournalEntry {
    const now = new Date().toISOString();
    const entry: JournalEntry = {
      id: `journal-${Date.now()}`,
      user_id: userId,
      title: data.title || 'Gentle Reflection',
      content: data.content || '',
      mood: data.mood,
      tags: data.tags || [],
      entry_date: data.entry_date || now.split('T')[0],
      is_favorite: !!data.is_favorite,
      created_at: now,
      updated_at: now,
    };
    this.journals.set(entry.id, entry);
    return entry;
  }

  updateJournal(userId: string, id: string, data: Partial<JournalEntry>): JournalEntry | undefined {
    const j = this.journals.get(id);
    if (!j || j.user_id !== userId) return undefined;
    const updated: JournalEntry = {
      ...j,
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.journals.set(id, updated);
    return updated;
  }

  deleteJournal(userId: string, id: string): boolean {
    const j = this.journals.get(id);
    if (j && j.user_id === userId) {
      this.journals.delete(id);
      return true;
    }
    return false;
  }

  // --- Activities Operations ---
  getActivities(category?: string): WellnessActivity[] {
    let list = Array.from(this.activities.values()).filter((a) => a.is_active);
    if (category && category !== 'All') {
      list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }

  getActivityById(id: string): WellnessActivity | undefined {
    return this.activities.get(id);
  }

  completeActivity(userId: string, activityId: string, duration?: number, feedback?: string): ActivityLog {
    const act = this.activities.get(activityId);
    const title = act ? act.title : 'Self-Paced Practice';
    const log: ActivityLog = {
      id: `log-${Date.now()}`,
      user_id: userId,
      activity_id: activityId,
      activity_title: title,
      duration_minutes: duration || act?.duration_minutes || 5,
      status: 'completed',
      feedback,
      completed_at: new Date().toISOString(),
    };
    this.activityLogs.set(log.id, log);
    return log;
  }

  getActivityLogs(userId: string): ActivityLog[] {
    return Array.from(this.activityLogs.values())
      .filter((l) => l.user_id === userId)
      .sort((a, b) => new Date(b.completed_at).getTime() - new Date(a.completed_at).getTime());
  }

  getSavedActivities(userId: string): WellnessActivity[] {
    const savedIds = Array.from(this.savedActivities.values())
      .filter((s) => s.user_id === userId)
      .map((s) => s.activity_id);
    return Array.from(this.activities.values()).filter((a) => savedIds.includes(a.id));
  }

  saveActivity(userId: string, activityId: string): boolean {
    const existingKey = Array.from(this.savedActivities.entries()).find(
      ([_, s]) => s.user_id === userId && s.activity_id === activityId
    );
    if (!existingKey) {
      const id = `save-${Date.now()}`;
      this.savedActivities.set(id, {
        id,
        user_id: userId,
        activity_id: activityId,
        created_at: new Date().toISOString(),
      });
    }
    return true;
  }

  unsaveActivity(userId: string, activityId: string): boolean {
    const entry = Array.from(this.savedActivities.entries()).find(
      ([_, s]) => s.user_id === userId && s.activity_id === activityId
    );
    if (entry) {
      this.savedActivities.delete(entry[0]);
      return true;
    }
    return false;
  }

  // --- Goals Operations ---
  getGoals(userId: string): WellnessGoal[] {
    return Array.from(this.goals.values()).filter((g) => g.user_id === userId && g.is_active);
  }

  createGoal(userId: string, data: Partial<WellnessGoal>): WellnessGoal {
    const now = new Date().toISOString();
    const g: WellnessGoal = {
      id: `goal-${Date.now()}`,
      user_id: userId,
      title: data.title || 'Daily Wellness Anchor',
      description: data.description,
      target_frequency: data.target_frequency || 1,
      current_progress: data.current_progress || 0,
      unit: data.unit || 'times/day',
      is_active: true,
      created_at: now,
      updated_at: now,
    };
    this.goals.set(g.id, g);
    return g;
  }

  updateGoal(userId: string, id: string, data: Partial<WellnessGoal>): WellnessGoal | undefined {
    const g = this.goals.get(id);
    if (!g || g.user_id !== userId) return undefined;
    const updated: WellnessGoal = {
      ...g,
      ...data,
      updated_at: new Date().toISOString(),
    };
    this.goals.set(id, updated);
    return updated;
  }

  deleteGoal(userId: string, id: string): boolean {
    const g = this.goals.get(id);
    if (g && g.user_id === userId) {
      this.goals.delete(id);
      return true;
    }
    return false;
  }

  // --- Recommendations Engine ---
  getRecommendations(userId: string) {
    const todayMood = this.getTodayMood(userId);
    const prefs = this.getPreferences(userId);
    const recentLogs = this.getActivityLogs(userId).slice(0, 5);

    const recommendations = [];

    // Rule 1: High stress or Low/Very Low mood -> somatic down-regulation
    if (todayMood && (todayMood.stress_level >= 3 || todayMood.mood === 'Low' || todayMood.mood === 'Very Low')) {
      recommendations.push({
        activity: this.activities.get('act-002'), // 4-7-8 Breathing
        reason: 'Recommended because you reported elevated stress levels today. 4-7-8 breathing promotes rapid vagus nerve activation.',
        confidence: 0.95,
        priority: 'high',
      });
      recommendations.push({
        activity: this.activities.get('act-004'), // 5-4-3-2-1 Grounding
        reason: 'Sensory grounding anchors focus when emotional tension builds.',
        confidence: 0.9,
        priority: 'high',
      });
    } else {
      // Rule 2: Moderate / Good mood -> Midday Focus Box Breathing
      recommendations.push({
        activity: this.activities.get('act-001'), // Box Breathing
        reason: "Based on your balanced morning check-in. Box breathing maintains sustained cognitive focus and prevents fatigue.",
        confidence: 0.92,
        priority: 'high',
      });
      recommendations.push({
        activity: this.activities.get('act-006'), // Mindfulness
        reason: 'Deepens your current state of calm with head-to-toe interoceptive scanning.',
        confidence: 0.88,
        priority: 'medium',
      });
    }

    // Rule 3: Evening reflection recommendation
    const hour = new Date().getHours();
    if (hour >= 18 || hour < 5) {
      recommendations.push({
        activity: this.activities.get('act-008'), // Gratitude
        reason: 'Ideal for wind-down hours to process daily stimuli without cognitive burden.',
        confidence: 0.85,
        priority: 'medium',
      });
    } else {
      recommendations.push({
        activity: this.activities.get('act-005'), // PMR
        reason: 'Releases muscular tension accumulated during seated lectures or engineering lab sessions.',
        confidence: 0.83,
        priority: 'medium',
      });
    }

    return recommendations.filter((r) => r.activity !== undefined);
  }

  // --- Progress Analytics Engine ---
  getProgressSummary(userId: string) {
    const moods = this.getMoods(userId);
    const logs = this.getActivityLogs(userId);
    const journals = this.getJournals(userId);

    const moodDistribution: Record<string, number> = {
      'Very Low': 0,
      Low: 0,
      Neutral: 0,
      Good: 0,
      Great: 0,
    };

    moods.forEach((m) => {
      if (moodDistribution[m.mood] !== undefined) {
        moodDistribution[m.mood]++;
      }
    });

    const totalMinutesPracticed = logs.reduce((acc, l) => acc + (l.duration_minutes || 0), 0);

    return {
      totalMoodCheckIns: moods.length,
      currentStreakDays: 5,
      totalMindfulSessions: logs.length,
      totalMinutesPracticed,
      totalJournalEntries: journals.length,
      moodDistribution,
      weeklyStabilityRate: 83, // 83% consistency rate
      stressAverage: moods.length
        ? Number((moods.reduce((a, b) => a + (b.stress_level || 2), 0) / moods.length).toFixed(1))
        : 2.0,
    };
  }

  // Clean wipe for account deletion
  purgeUserData(userId: string) {
    this.profiles.delete(userId);
    this.preferences.delete(userId);
    Array.from(this.moods.entries()).forEach(([k, v]) => {
      if (v.user_id === userId) this.moods.delete(k);
    });
    Array.from(this.journals.entries()).forEach(([k, v]) => {
      if (v.user_id === userId) this.journals.delete(k);
    });
    Array.from(this.activityLogs.entries()).forEach(([k, v]) => {
      if (v.user_id === userId) this.activityLogs.delete(k);
    });
    Array.from(this.savedActivities.entries()).forEach(([k, v]) => {
      if (v.user_id === userId) this.savedActivities.delete(k);
    });
    Array.from(this.goals.entries()).forEach(([k, v]) => {
      if (v.user_id === userId) this.goals.delete(k);
    });
    return true;
  }
}

export const dbStore = new MindBloomStore();
