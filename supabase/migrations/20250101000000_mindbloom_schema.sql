-- ====================================================================
-- MINDBLOOM - INTERACTIVE THERAPY & MENTAL WELLNESS TOOLS
-- EVIDENCE-BASED DIGITAL SANCTUARY & WELLNESS PLATFORM
-- PRODUCTION POSTGRESQL & SUPABASE MIGRATION
-- ====================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create Profiles Table (Linked to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  student_id TEXT,
  department TEXT DEFAULT 'Mindfulness & Cognitive Resilience',
  institution TEXT DEFAULT 'MindBloom Digital Sanctuary',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create User Preferences Table
CREATE TABLE IF NOT EXISTS public.user_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wellness_goals JSONB DEFAULT '["stress_relief", "better_focus", "emotional_balance"]'::jsonb,
  preferred_activities JSONB DEFAULT '["box_breathing", "mindful_reflection", "somatic_grounding"]'::jsonb,
  preferred_session_duration INTEGER DEFAULT 5,
  reminders_enabled BOOLEAN DEFAULT TRUE,
  audio_cues_enabled BOOLEAN DEFAULT TRUE,
  reduced_motion BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_preferences UNIQUE (user_id)
);

-- 4. Create Mood Entries Table
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood TEXT NOT NULL CHECK (mood IN ('Very Low', 'Low', 'Neutral', 'Good', 'Great')),
  emotion_tags JSONB DEFAULT '[]'::jsonb,
  stress_level INTEGER CHECK (stress_level >= 1 AND stress_level <= 5),
  reflection TEXT,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Journal Entries Table
CREATE TABLE IF NOT EXISTS public.journal_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  mood TEXT,
  tags JSONB DEFAULT '[]'::jsonb,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Create Wellness Activities Catalogue Table
CREATE TABLE IF NOT EXISTS public.wellness_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Breathing', 'Mindfulness', 'Relaxation', 'Somatic', 'Journaling')),
  duration_minutes INTEGER NOT NULL DEFAULT 5,
  difficulty TEXT NOT NULL CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  benefits JSONB DEFAULT '[]'::jsonb,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Create Activity Logs Table
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID REFERENCES public.wellness_activities(id) ON DELETE SET NULL,
  activity_title TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 5,
  status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'interrupted', 'paused')),
  feedback TEXT,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Create Saved Activities Table
CREATE TABLE IF NOT EXISTS public.saved_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  activity_id UUID NOT NULL REFERENCES public.wellness_activities(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_user_saved_activity UNIQUE (user_id, activity_id)
);

-- 9. Create Wellness Goals Table
CREATE TABLE IF NOT EXISTS public.wellness_goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_frequency INTEGER DEFAULT 1,
  current_progress INTEGER DEFAULT 0,
  unit TEXT DEFAULT 'times/day',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- PERFORMANCE INDEXES
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_mood_entries_user_date ON public.mood_entries (user_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_journal_entries_user_date ON public.journal_entries (user_id, entry_date DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user_completed ON public.activity_logs (user_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_activities_user ON public.saved_activities (user_id);
CREATE INDEX IF NOT EXISTS idx_wellness_goals_user ON public.wellness_goals (user_id, is_active);

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_goals ENABLE ROW LEVEL SECURITY;

-- 1. Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- 2. User Preferences Policies
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences FOR UPDATE
  USING (auth.uid() = user_id);

-- 3. Mood Entries Policies
CREATE POLICY "Users can view their own mood logs"
  ON public.mood_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood logs"
  ON public.mood_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood logs"
  ON public.mood_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood logs"
  ON public.mood_entries FOR DELETE
  USING (auth.uid() = user_id);

-- 4. Journal Entries Policies
CREATE POLICY "Users can view their own private journal"
  ON public.journal_entries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own private journal"
  ON public.journal_entries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own private journal"
  ON public.journal_entries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own private journal"
  ON public.journal_entries FOR DELETE
  USING (auth.uid() = user_id);

-- 5. Wellness Activities Policies (Public catalogue for authenticated users)
CREATE POLICY "Anyone can view active activities catalogue"
  ON public.wellness_activities FOR SELECT
  USING (is_active = TRUE);

-- 6. Activity Logs Policies
CREATE POLICY "Users can view their own activity history"
  ON public.activity_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can log their completed sessions"
  ON public.activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. Saved Activities Policies
CREATE POLICY "Users can view their saved activities"
  ON public.saved_activities FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save an activity"
  ON public.saved_activities FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove a saved activity"
  ON public.saved_activities FOR DELETE
  USING (auth.uid() = user_id);

-- 8. Wellness Goals Policies
CREATE POLICY "Users can view their wellness goals"
  ON public.wellness_goals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their wellness goals"
  ON public.wellness_goals FOR ALL
  USING (auth.uid() = user_id);

-- ====================================================================
-- SEED DATA: SHARED WELLNESS ACTIVITIES CATALOGUE
-- ====================================================================
INSERT INTO public.wellness_activities (id, title, description, category, duration_minutes, difficulty, instructions, benefits)
VALUES
  (
    'a1000000-0000-0000-0000-000000000001',
    'Box Breathing for Midday Focus',
    'Equalized 4-4-4-4 diaphragmatic breathing pattern to calm sympathetic nervous arousal and restore mental clarity.',
    'Breathing',
    4,
    'Beginner',
    '["Inhale slowly through the nose for 4 counts", "Hold lungs full with gentle stillness for 4 counts", "Exhale smoothly through the mouth for 4 counts", "Rest with empty lungs for 4 counts before repeating"]'::jsonb,
    '["Reduces cortisol levels", "Enhances working memory", "Stabilizes heart rate variability (HRV)"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000002',
    '4-7-8 Relaxing Respiration',
    'Natural tranquilizer for the nervous system using prolonged exhalation to activate vagal parasympathetic response.',
    'Breathing',
    5,
    'Beginner',
    '["Exhale completely through mouth with a gentle whoosh", "Inhale quietly through nose for 4 counts", "Hold breath comfortably for 7 counts", "Exhale audibly through mouth for 8 counts"]'::jsonb,
    '["Reduces acute anxiety", "Aids restful sleep onset", "Soothes physiological tension"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000003',
    'Resonant Coherence (5.5s Pace)',
    'Rhythmic continuous respiration calibrated to approximately 6 breaths per minute for optimal cardiovascular synchrony.',
    'Breathing',
    5,
    'Intermediate',
    '["Inhale smoothly without pause for 5.5 seconds", "Exhale continuously without pause for 5.5 seconds", "Maintain a fluid, circular breathing loop"]'::jsonb,
    '["Maximizes Heart Rate Variability", "Synchronizes baroreflex response", "Balances emotional reactivity"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000004',
    '5-4-3-2-1 Sensory Grounding',
    'Multisensory orientation exercise designed to de-escalate anxiety and pull consciousness into immediate present reality.',
    'Relaxation',
    6,
    'Beginner',
    '["Notice 5 things you can see around your room", "Acknowledge 4 things you can physically touch or feel", "Listen for 3 distinct sounds in your environment", "Identify 2 things you can smell or appreciate", "Notice 1 thing you can taste or feel grateful for"]'::jsonb,
    '["Interrupts rumination cycles", "Directs focus away from panic", "Grounds spatial orientation"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000005',
    'Progressive Muscle Relaxation (PMR)',
    'Systematic tension and intentional release sequence across major muscle groups from toes to forehead.',
    'Relaxation',
    8,
    'Beginner',
    '["Tense your feet and calf muscles for 5 seconds", "Exhale and completely release tension, feeling warmth", "Move upward to thighs, abdomen, shoulders, and jaw", "Contrast the sensations of tension versus deep ease"]'::jsonb,
    '["Dissolves psychosomatic stiffness", "Lowers systolic blood pressure", "Improves bodily awareness"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000006',
    'Head-to-Toe Mindful Body Scan',
    'Gentle curiosity scan bringing compassionate attention to bodily sensations without judgment or need to fix.',
    'Mindfulness',
    10,
    'Intermediate',
    '["Find a comfortable seat or recline softly", "Direct awareness to the soles of your feet resting on the ground", "Slowly traverse upward through knees, pelvis, spine, and chest", "Notice any tension without critique and breathe ease into the space"]'::jsonb,
    '["Enhances interoceptive awareness", "Prevents burnout accumulation", "Cultivates non-judgmental presence"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000007',
    'Cognitive Reframing & Unburdening',
    'Guided reflective inquiry to unpack catastrophic thinking and rewrite intrusive narratives with balanced perspectives.',
    'Journaling',
    7,
    'Beginner',
    '["Write down the automatic stressful thought exactly as it arrived", "Identify what facts support this thought vs what assumptions exist", "Draft an alternative, compassionate perspective a trusted friend would offer", "Record one gentle action step you can take today"]'::jsonb,
    '["Reduces cognitive distortions", "Fosters psychological resilience", "Anchors pragmatic problem-solving"]'::jsonb
  ),
  (
    'a1000000-0000-0000-0000-000000000008',
    'Gratitude & Small Wins Reflection',
    'Micro-journaling practice acknowledging everyday moments of micro-beauty, relief, and interpersonal kindness.',
    'Journaling',
    4,
    'Beginner',
    '["Reflect on one sensory delight from today (a warm beverage, sunlight, music)", "Acknowledge one small obstacle you navigated with patience", "Express silent appreciation for someone in your academic or personal circle"]'::jsonb,
    '["Promotes positive affect retention", "Strengthens baseline contentment", "Counters negativity bias"]'::jsonb
  )
ON CONFLICT (id) DO NOTHING;
