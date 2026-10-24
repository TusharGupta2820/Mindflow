/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { useWellness } from '../context/WellnessContext.tsx';
import { MoodType } from '../types/index.ts';
import { QuickResetModal } from '../components/modals/QuickResetModal.tsx';
import { CrisisModal } from '../components/modals/CrisisModal.tsx';
import { MoodIcon } from '../components/ui/MoodIcon.tsx';
import { DashboardChatbot } from '../components/chat/DashboardChatbot.tsx';
import { Sparkles, MessageSquare, X } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { profile, user } = useAuth();
  const { todayMood, logMood, goals, incrementGoal, toggleSaveActivity } = useWellness();
  const navigate = useNavigate();

  const [selectedMood, setSelectedMood] = useState<MoodType>(todayMood?.mood || 'Good');
  const [selectedTags, setSelectedTags] = useState<string[]>(
    todayMood?.emotion_tags || ['Calm', 'Motivated']
  );
  const [stressLevel, setStressLevel] = useState<number>(todayMood?.stress_level || 2);
  const [logSuccess, setLogSuccess] = useState<boolean>(false);
  const [showQuickReset, setShowQuickReset] = useState<boolean>(false);
  const [showCrisisModal, setShowCrisisModal] = useState<boolean>(false);
  const [showFloatingChat, setShowFloatingChat] = useState<boolean>(false);

  const availableTags = [
    'Stressed',
    'Anxious',
    'Calm',
    'Motivated',
    'Tired',
    'Happy',
    'Overwhelmed',
  ];

  const stressLabels: Record<number, string> = {
    1: 'Stress level: 1/5 (Very calm & serene)',
    2: 'Stress level: 2/5 (Mild, manageable)',
    3: 'Stress level: 3/5 (Moderate pressure)',
    4: 'Stress level: 4/5 (Noticeable tension)',
    5: 'Stress level: 5/5 (High sensory load)',
  };

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleLogMood = async () => {
    await logMood({
      mood: selectedMood,
      emotion_tags: selectedTags,
      stress_level: stressLevel,
      reflection: 'Logged via Quick Pulse on Dashboard',
    });
    setLogSuccess(true);
    setTimeout(() => setLogSuccess(false), 3500);
  };

  const firstName = (profile?.full_name || user?.full_name || 'Aria').split(' ')[0];

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-space-xl pb-16">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute -top-12 right-1/4 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-48 -left-12 w-80 h-80 bg-tertiary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* 1. Header Welcome Greeting & Instant Reset Bar */}
      <section className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span>MindBloom Sanctuary • Psychophysiological Wellness</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Good morning, {firstName}. Take a moment for yourself today.
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Wednesday, October 24 • You've completed 4 mindful sessions this week.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-space-sm self-start lg:self-auto">
          <Link
            to="/mood-scanner"
            className="inline-flex items-center gap-space-xs px-5 py-3 rounded-2xl bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg shadow-sm transition-all active:scale-[0.98] border border-surface-container"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">
              center_focus_strong
            </span>
            <span>AI Mood Scanner</span>
          </Link>

          <button
            onClick={() => setShowQuickReset(true)}
            className="relative group inline-flex items-center gap-space-xs px-5 py-3 rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary/90 transition-all active:scale-[0.98]"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-45">
              self_improvement
            </span>
            <span>Quick 2-Min Reset</span>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-fixed"></span>
            </span>
          </button>
        </div>
      </section>

      {/* 2. Daily Mood Check-In Widget (Hero Interactive Surface) */}
      <section className="relative z-10">
        <div className="bg-surface-container-lowest rounded-3xl p-space-lg lg:p-space-xl shadow-[0_4px_24px_-2px_rgba(21,40,63,0.06)]">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-sm pb-space-md mb-space-md">
            <div className="space-y-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                Self Reflection Pulse
              </span>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                How is your mind feeling right now?
              </h2>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm bg-surface-container-low px-3 py-1.5 rounded-full">
              <span className="material-symbols-outlined text-[16px] text-primary">lock_clock</span>
              <span>Private • Encrypted strictly on device</span>
            </div>
          </div>

          {/* 5 Mood Spectrum Buttons */}
          <div className="grid grid-cols-5 gap-space-xs sm:gap-space-sm mb-space-lg">
            {(
              [
                { mood: 'Very Low', sub: 'Heavy' },
                { mood: 'Low', sub: 'Subdued' },
                { mood: 'Neutral', sub: 'Balanced' },
                { mood: 'Good', sub: 'Grounded' },
                { mood: 'Great', sub: 'Energized' },
              ] as const
            ).map((item) => {
              const isActive = selectedMood === item.mood;
              return (
                <button
                  key={item.mood}
                  onClick={() => setSelectedMood(item.mood)}
                  className={`mood-pill group flex flex-col items-center justify-center p-space-sm rounded-2xl transition-all text-center ${
                    isActive
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-sm'
                      : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                  }`}
                  type="button"
                >
                  <div className="h-8 mb-1 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                    <MoodIcon mood={item.mood} size={24} />
                  </div>
                  <span className="font-label-md text-label-md font-semibold">{item.mood}</span>
                  <span className="font-label-sm text-label-sm opacity-80 hidden sm:inline">{item.sub}</span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            {/* Emotion Badges */}
            <div className="lg:col-span-7 space-y-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                Identify contextual factors (select all that resonate)
              </span>
              <div className="flex flex-wrap gap-2 pt-1">
                {availableTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className={`emotion-chip px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                        isSelected
                          ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                          : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'
                      }`}
                      type="button"
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stress Level Slider */}
            <div className="lg:col-span-5 bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between gap-space-sm">
              <div className="flex items-center justify-between">
                <span className="font-label-md text-label-md text-on-surface font-semibold">Stress Spectrum</span>
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface">
                  {stressLabels[stressLevel]}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="5"
                value={stressLevel}
                onChange={(e) => setStressLevel(Number(e.target.value))}
                className="w-full accent-primary h-2 bg-surface-variant rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between font-label-sm text-label-sm text-outline">
                <span>1 Gentle</span>
                <span>3 Moderate</span>
                <span>5 Overwhelming</span>
              </div>
            </div>
          </div>

          <div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container">
            <p className="font-body-sm text-body-sm text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">
                {logSuccess ? 'verified' : 'favorite'}
              </span>
              <span>
                {logSuccess
                  ? 'Your mood check-in has been saved securely to database!'
                  : 'Thank you for checking in. Would you like a 3-minute calming breath?'}
              </span>
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Link
                to="/check-in"
                className="px-4 py-2.5 rounded-xl text-on-surface-variant hover:bg-surface-container text-label-md font-label-md transition-colors"
              >
                Full Check-In Form
              </Link>
              <button
                onClick={handleLogMood}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:opacity-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Log Mood</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Today's Recommended Wellness Activity (Personalized Highlight Card) */}
      <section className="relative z-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-container via-primary to-surface-tint text-on-primary p-space-lg lg:p-space-xl shadow-xl">
          {/* Abstract Botanical Decorative Aura */}
          <svg
            className="absolute -right-16 -bottom-16 w-80 h-80 text-on-primary/10 pointer-events-none"
            fill="currentColor"
            viewBox="0 0 200 200"
          >
            <circle cx="100" cy="100" r="80"></circle>
            <path
              d="M100 20 Q120 70 170 80 Q120 100 100 160 Q80 100 30 80 Q80 70 100 20 Z"
              opacity="0.4"
            ></path>
          </svg>
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
            <div className="space-y-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-on-primary/15 backdrop-blur-md text-on-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[16px]">psychology</span>
                <span>Based on your 'Slightly Busy' morning check-in</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg tracking-tight text-on-primary">
                Box Breathing for Midday Focus
              </h3>
              <p className="font-body-md text-body-md text-on-primary/90 max-w-xl">
                Regulate your autonomic nervous system using a balanced 4-4-4-4 rhythm. Scientifically proven to reduce acute cortisol spikes before study blocks.
              </p>
              <div className="flex flex-wrap items-center gap-space-md pt-2 font-label-md text-label-md text-on-primary/80">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">schedule</span> 4 minutes
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">verified</span> Beginner friendly
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px]">graphic_eq</span> Soft Ambient Audio
                </span>
              </div>
            </div>
            <div className="flex sm:flex-col lg:flex-row items-center gap-space-sm shrink-0">
              <Link
                to="/breathing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-lg hover:bg-surface-container-low transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">play_circle</span>
                <span>Begin Exercise</span>
              </Link>
              <button
                onClick={() => toggleSaveActivity('act-001')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-on-primary/10 hover:bg-on-primary/20 text-on-primary font-label-lg text-label-lg backdrop-blur-sm transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">bookmark</span>
                <span>Save for Later</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick-Access Wellness Tools Grid */}
      <section className="relative z-10">
        <div className="flex items-center justify-between mb-space-md">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              Core Practice Modules
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Explore Daily Sanctuary Tools</h3>
          </div>
          <Link to="/activities" className="font-label-md text-label-md text-primary font-semibold hover:underline">
            View Library
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Card 1: Guided Breathing */}
          <Link
            to="/breathing"
            className="group bg-surface-container-lowest rounded-3xl p-space-md flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(21,40,63,0.05)] hover:-translate-y-1 transition-all"
          >
            <div className="space-y-space-sm">
              <div className="w-full h-36 rounded-2xl bg-primary-container/15 p-space-sm flex flex-col justify-between relative overflow-hidden group-hover:bg-primary-container/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-primary flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">air</span>
                    <span>1-5 min</span>
                  </div>
                  <span className="material-symbols-outlined text-primary text-[22px]">air</span>
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">Parasympathetic Pace</span>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Box Breathing &amp; 4-7-8 Rhythm</p>
                </div>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Guided Breathing</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Box Breathing &amp; 4-7-8 relaxing cadences for quick physical and nervous de-escalation.
                </p>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline">Vagal Reset</span>
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Card 2: Mindfulness & Meditation */}
          <Link
            to="/mindfulness"
            className="group bg-surface-container-lowest rounded-3xl p-space-md flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(21,40,63,0.05)] hover:-translate-y-1 transition-all"
          >
            <div className="space-y-space-sm">
              <div className="w-full h-36 rounded-2xl bg-secondary-container/20 p-space-sm flex flex-col justify-between relative overflow-hidden group-hover:bg-secondary-container/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">self_improvement</span>
                    <span>5-12 min</span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[22px]">self_improvement</span>
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-secondary font-semibold uppercase tracking-wider">Present Awareness</span>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Mindful Audio &amp; Sensory Grounding</p>
                </div>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Mindfulness &amp; Stillness</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Head-to-toe body scan, mindful gratitude breaks, and sensory orientation scripts.
                </p>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline">Guided Audio</span>
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Reflective Journaling */}
          <Link
            to="/journal"
            className="group bg-surface-container-lowest rounded-3xl p-space-md flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(21,40,63,0.05)] hover:-translate-y-1 transition-all"
          >
            <div className="space-y-space-sm">
              <div className="w-full h-36 rounded-2xl bg-secondary-container/40 p-space-sm flex flex-col justify-between relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm font-semibold">
                    Prompt of the Day
                  </span>
                  <span className="material-symbols-outlined text-secondary text-[20px]">lightbulb</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-secondary-container italic font-medium">
                  “What brought an unexpected smile to your face today?”
                </p>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Reflective Journaling</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Unpack cognitive load using guided prompts, cognitive reframing, and stream-of-thought writing.
                </p>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline">Prompt Ready</span>
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </div>
            </div>
          </Link>

          {/* Card 4: Relaxation Exercises */}
          <Link
            to="/relaxation"
            className="group bg-surface-container-lowest rounded-3xl p-space-md flex flex-col justify-between shadow-[0_4px_20px_-2px_rgba(21,40,63,0.05)] hover:-translate-y-1 transition-all"
          >
            <div className="space-y-space-sm">
              <div className="w-full h-36 rounded-2xl bg-tertiary-fixed/40 p-space-sm flex flex-col justify-between relative overflow-hidden group-hover:bg-tertiary-fixed/60 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-tertiary flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">spa</span>
                    <span>8 min</span>
                  </div>
                  <span className="material-symbols-outlined text-tertiary text-[22px]">spa</span>
                </div>
                <div className="space-y-1">
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold uppercase tracking-wider">Somatic Release</span>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">Progressive Muscle Relaxation (PMR)</p>
                </div>
              </div>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface mb-1">Relaxation Exercises</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                  Progressive Muscle Relaxation (PMR) and 5-Senses Grounding exercises for physical tension.
                </p>
              </div>
            </div>
            <div className="mt-space-md pt-space-xs flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-outline">Somatic Release</span>
              <div className="w-9 h-9 rounded-full bg-surface-container-low flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-on-tertiary transition-colors">
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* 5. MindBloom AI Companion Chatbot (Gemini 3.6 Flash) */}
      <section className="relative z-10 space-y-space-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              AI Emotional Resonance
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              MindBloom AI Chatbot (Gemini 3.6 Flash)
            </h3>
          </div>
          <Link
            to="/mood-scanner"
            className="inline-flex items-center gap-1.5 text-label-md font-label-md text-primary font-semibold hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">center_focus_strong</span>
            <span>Analyze Face Mood with Live Camera</span>
          </Link>
        </div>

        <DashboardChatbot />
      </section>

      {/* 6. Progress & Consistency Row */}
      <section className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Left Column: Weekly Mood Trend Line Chart */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-space-lg shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Longitudinal Trajectory
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Weekly Mood Horizon</h3>
              </div>
              <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm bg-primary-fixed/30 px-3 py-1 rounded-full font-semibold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                <span>+18% Stability vs Last Week</span>
              </div>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
              Mon: Good • Tue: Neutral • Wed: Low • Thu: Good • Fri: Great • Sat: Good • Sun: Great
            </p>

            {/* Inline SVG Mood Horizon Graph */}
            <div className="w-full h-48 py-2 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 560 160">
                <defs>
                  <linearGradient id="moodGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#087F8C" stopOpacity="0.25"></stop>
                    <stop offset="100%" stopColor="#087F8C" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <line stroke="#E4E2DD" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="560" y1="20" y2="20"></line>
                <line stroke="#E4E2DD" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="560" y1="65" y2="65"></line>
                <line stroke="#E4E2DD" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="560" y1="110" y2="110"></line>
                <line stroke="#E4E2DD" strokeWidth="1" x1="0" x2="560" y1="145" y2="145"></line>

                <path
                  d="M 20 50 Q 100 85 105 85 T 190 120 T 275 50 T 360 25 T 445 50 T 530 25 L 530 145 L 20 145 Z"
                  fill="url(#moodGradient)"
                ></path>
                <path
                  d="M 20 50 Q 100 85 105 85 T 190 120 T 275 50 T 360 25 T 445 50 T 530 25"
                  fill="none"
                  stroke="#00646F"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                ></path>

                <circle cx="20" cy="50" fill="#FFFFFF" r="5" stroke="#00646F" strokeWidth="3"></circle>
                <circle cx="105" cy="85" fill="#FFFFFF" r="5" stroke="#00646F" strokeWidth="3"></circle>
                <circle cx="190" cy="120" fill="#087F8C" r="6" stroke="#FFFFFF" strokeWidth="3"></circle>
                <circle cx="275" cy="50" fill="#FFFFFF" r="5" stroke="#00646F" strokeWidth="3"></circle>
                <circle cx="360" cy="25" fill="#FFFFFF" r="5" stroke="#00646F" strokeWidth="3"></circle>
                <circle cx="445" cy="50" fill="#FFFFFF" r="5" stroke="#00646F" strokeWidth="3"></circle>
                <circle cx="530" cy="25" fill="#FFFFFF" r="5" stroke="#00646F" strokeWidth="3"></circle>
              </svg>

              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-2">
                <span className="w-8 text-center">Mon</span>
                <span className="w-8 text-center">Tue</span>
                <span className="w-8 text-center font-bold text-primary">Wed (Today)</span>
                <span className="w-8 text-center">Thu</span>
                <span className="w-8 text-center">Fri</span>
                <span className="w-8 text-center">Sat</span>
                <span className="w-8 text-center">Sun</span>
              </div>
            </div>
          </div>

          <div className="mt-space-md p-space-sm rounded-2xl bg-surface-container flex items-start gap-3">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">analytics</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              You recorded your mood on <strong>6 days</strong> this week. Notice how evening walks and journal entries correlated with calmer morning check-ins.
            </p>
          </div>
        </div>

        {/* Right Column: Wellness Habit Consistency */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl p-space-lg shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-space-md">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Daily Anchors
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Habit Consistency</h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px] text-tertiary">spa</span>
                <span>5-Day Bloom</span>
              </div>
            </div>

            <div className="space-y-space-sm">
              {/* Habit 1: Hydration Goal */}
              <div className="p-space-sm rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                    <span className="material-symbols-outlined text-[20px]">water_drop</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold block">Hydration Goal</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {goals.find((g) => g.id === 'goal-001')?.current_progress || 5} of 8 glasses logged
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => incrementGoal('goal-001')}
                  className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors text-sm font-bold active:scale-95"
                  title="Add glass of water"
                  type="button"
                >
                  +
                </button>
              </div>

              {/* Habit 2: Midday Mindful Pause */}
              <div className="p-space-sm rounded-2xl bg-tertiary-fixed/30 flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold block">Midday Mindful Pause</span>
                    <span className="font-body-sm text-body-sm text-tertiary font-medium">Completed at 11:15 AM</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-primary px-2.5 py-1 rounded-full bg-surface-container-lowest">
                  Done
                </span>
              </div>

              {/* Habit 3: Evening Reflection */}
              <div className="p-space-sm rounded-2xl bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-sm">
                  <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-outline">
                    <span className="material-symbols-outlined text-[20px]">bedtime</span>
                  </div>
                  <div>
                    <span className="font-label-md text-label-md text-on-surface font-semibold block">Evening Reflection</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended after 8:00 PM</span>
                  </div>
                </div>
                <Link
                  to="/journal"
                  className="font-label-sm text-label-sm text-primary px-2.5 py-1 rounded-full bg-surface-container hover:bg-surface-variant transition-colors"
                >
                  Open
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-tertiary">eco</span>
              <span>Progress nurtures gently • Missed days are rest days</span>
            </span>
            <Link to="/activities" className="font-semibold text-primary hover:underline">
              Adjust Habits
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Recent Journal Snippet */}
      <section className="relative z-10">
        <div className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-[0_4px_24px_-2px_rgba(21,40,63,0.05)] flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md">
          <div className="flex items-start gap-space-md">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed/50 flex items-center justify-center text-secondary shrink-0 mt-1">
              <span className="material-symbols-outlined text-[24px]">menu_book</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">
                  Yesterday • Oct 23
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-outline">
                  <span className="material-symbols-outlined text-[14px]">lock</span>
                  <span>Private Entry</span>
                </span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">
                “Finding quiet in the library before exams...”
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1 max-w-2xl">
                I sat by the tall north window. The light made everything feel slower. Stepped away from group study chatter for fifteen minutes just to breathe...
              </p>
            </div>
          </div>
          <div className="shrink-0 self-end md:self-center">
            <Link
              to="/journal"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
            >
              <span>Open Journal</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Supportive Non-Clinical Academic Disclaimer Banner */}
      <footer className="relative z-10">
        <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant shrink-0">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-3xl">
              <strong className="font-semibold text-on-surface">Wellness Notice:</strong> MindBloom is a personal digital wellness companion designed to support emotional regulation and mindfulness. Not intended for psychiatric diagnosis or emergency care. If you are experiencing acute distress, please reach out to qualified mental healthcare providers or 24/7 crisis support.
            </p>
          </div>
          <button
            onClick={() => setShowCrisisModal(true)}
            className="shrink-0 font-label-sm text-label-sm text-primary font-semibold hover:underline"
            type="button"
          >
            View Crisis Directory
          </button>
        </div>
      </footer>

      {/* Floating AI Chat Trigger on Bottom Right */}
      <div className="fixed bottom-20 lg:bottom-8 right-5 z-40">
        <button
          onClick={() => setShowFloatingChat((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-primary text-on-primary shadow-2xl hover:bg-primary/95 hover:scale-105 active:scale-95 transition-all"
          title="Open AI Chatbot"
          type="button"
        >
          {showFloatingChat ? <X size={18} /> : <Sparkles size={18} className="animate-pulse" />}
          <span className="font-label-md text-label-md font-semibold hidden sm:inline">
            {showFloatingChat ? 'Close Chat' : 'Ask AI Companion'}
          </span>
        </button>
      </div>

      {/* Floating Chatbot Overlay */}
      {showFloatingChat && (
        <div className="fixed bottom-32 lg:bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[420px] shadow-2xl animate-fade-in">
          <DashboardChatbot />
        </div>
      )}

      {/* Modals */}
      <QuickResetModal isOpen={showQuickReset} onClose={() => setShowQuickReset(false)} />
      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
    </div>
  );
};
