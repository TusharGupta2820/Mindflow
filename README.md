# MindBloom — Interactive Therapy and Mental Wellness Tools

**Domain:** Evidence-Based Digital Health & Cognitive-Emotional Web Architectures  
**Platform:** Production-Ready Full-Stack Web Application  

---

## 1. Project Overview

MindBloom is a compassionate digital wellness web application designed to help students and individuals record daily emotional valence, engage in autonomic nervous system down-regulation, maintain encrypted private journals, complete somatic grounding exercises, and track compassionate habit consistency.

The interface is built to mirror the design created in Google Stitch with pixel-level precision, using warm cream, sage green, and deep teal tones designed to prevent optical and cognitive fatigue.

---

## 2. Key Features

- **Daily Affective Check-In:** 5-point spectrum (Very Low, Low, Neutral, Good, Great), multi-axis contextual nuance chips (Stressed, Anxious, Calm, Motivated, Tired, Happy, Overwhelmed), perceived stress gauge (1–5), and October 2024 longitudinal calendar heatmap.
- **Guided Breathing Suite:** Visual SVG kinetic orb with real-time countdowns for Box Breathing (4-4-4-4), 4-7-8 Parasympathetic Vagal Breath, and Resonant Coherence (5.5s cycle). Real-time telemetry: Breaths done, HRV Coherence, and Vagal Tone status.
- **Thought Journaling & Prompts:** Encrypted reflection space with cognitive reframing prompts ("What is one expectation you can release today to make room for peace?"), mood tagging, and full CRUD search.
- **Somatic Grounding & PMR:** Interactive 5-4-3-2-1 Sensory Grounding stepper and Progressive Muscle Relaxation (PMR) sequence with tension-contrast timers.
- **Daily Practice Anchors:** Non-punitive habit consistency (Hydration counter, Midday Mindful Pause, Evening Reflection). Missed days are celebrated as rest days.
- **Heuristic Recommendations:** Rule-based algorithm matching user stress score, time of day, and history with transparent justifications.
- **Progress & Analytics:** Recharts interactive curves for weekly mood oscillations, practice volume by module, and affect distributions.
- **Crisis & Emergency Directory:** Instant access to 24/7 verified lifelines: 988 (USA), Kiran 1800-599-0019 (India), Vandrevala Foundation (+91 9999 666 555), Tele-MANAS (14416).

---

## 3. Technology Stack

- **Frontend:** React 19, Vite, React Router DOM, Tailwind CSS (Custom 8pt therapeutic palette), Recharts, Lucide Icons, Material Symbols Outlined.
- **Backend:** Node.js, Express.js REST API architecture, modular routes, controllers, services, and authentication middleware.
- **Database & Security:** Supabase PostgreSQL database schema (`supabase/migrations/20250101000000_mindbloom_schema.sql`), Row Level Security (RLS) policies, and high-fidelity local in-memory fallback store for offline and demo environments.

---

## 4. Setup & Installation

### Prerequisites
- Node.js 18+
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables (optional, fallback defaults included)
cp .env.example .env

# 3. Start full-stack development server
npm run dev
```

Visit `http://localhost:3000` to interact with MindBloom.

---

## 5. Supabase Database Migration

To run the migrations on your Supabase PostgreSQL instance:
1. Copy the contents of `supabase/migrations/20250101000000_mindbloom_schema.sql`.
2. Open the Supabase Dashboard -> **SQL Editor**.
3. Paste and run the migration script.
4. All tables (`profiles`, `user_preferences`, `mood_entries`, `journal_entries`, `wellness_activities`, `activity_logs`, `saved_activities`, `wellness_goals`) and their RLS policies and seed activities will be created automatically.

---

## 6. Platform Architecture & Design Standards

MindBloom is designed with strict psychophysiological principles, empathetic non-clinical microcopy, and privacy-first data sovereignty.
