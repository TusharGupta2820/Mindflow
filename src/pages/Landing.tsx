/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Search, Heart, Target, Zap, Clock, TrendingUp } from 'lucide-react';
import { Navbar } from '../components/layout/Navbar.tsx';
import { CrisisModal } from '../components/modals/CrisisModal.tsx';
import { Logo } from '../components/ui/Logo.tsx';
import { MoodIcon } from '../components/ui/MoodIcon.tsx';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<{ key: string; title: string; feedback: string }>({
    key: 'good',
    title: 'Good',
    feedback: 'You are grounded and growing. A gentle journal reflection can seal in this equilibrium.',
  });

  // Breathing simulation state for the hero sandbox
  const [breathRunning, setBreathRunning] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);
  const [showCrisis, setShowCrisis] = useState(false);

  useEffect(() => {
    if (!breathRunning) return;

    const interval = setInterval(() => {
      setBreathTimer((prev) => {
        if (prev <= 1) {
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 7;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 8;
          } else {
            setBreathPhase('Inhale');
            return 4;
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [breathRunning, breathPhase]);

  const moodsList = [
    {
      key: 'sad',
      mood: 'Very Low',
      label: 'Sad',
      feedback: 'It takes strength to acknowledge feeling down. Let us ground your thoughts with gentle breathwork.',
    },
    {
      key: 'low',
      mood: 'Low',
      label: 'Low',
      feedback: 'Feeling heavy or depleted is normal. Take off any pressure to perform right now.',
    },
    {
      key: 'good',
      mood: 'Good',
      label: 'Good',
      feedback: 'You are grounded and growing. A gentle journal reflection can seal in this equilibrium.',
    },
    {
      key: 'happy',
      mood: 'Great',
      label: 'Happy',
      feedback: 'Embrace this radiant energy! Channel it into gratitude to carry you forward.',
    },
  ];

  return (
    <div className="w-full bg-surface text-on-surface antialiased min-h-screen flex flex-col">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full pt-8 pb-16 lg:pb-24 px-space-md lg:px-space-lg overflow-hidden" id="home">
        {/* Subtle ambient background gradients */}
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Editorial Column */}
          <div className="flex-1 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
              <span className="material-symbols-outlined text-[16px] text-primary">psychology_alt</span>
              <span>Therapeutic Multimodal Digital Toolkit</span>
            </div>

            <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight max-w-2xl">
              A Healthier Mind. <br />
              <span className="text-primary-container">A Brighter Tomorrow.</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Your personal space to pause, reflect, build healthy habits, and nurture emotional well-being. Built as an integrated wellness platform combining interactive tools in one unified, non-clinical sanctuary.
            </p>

            {/* CTA Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto">
              <Link
                to="/dashboard"
                className="px-6 py-3.5 bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2"
              >
                <span>Start Your Wellness Journey</span>
                <span className="material-symbols-outlined text-[20px]">spa</span>
              </Link>
              <a
                href="#tools"
                className="px-6 py-3.5 bg-surface-container-lowest text-primary font-label-lg text-label-lg rounded-xl shadow-sm hover:bg-surface-container-high transition-all text-center"
              >
                Explore Wellness Tools
              </a>
            </div>

            {/* Clinical Evidence Microcard */}
            <div className="pt-6 flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center font-bold text-xs border-2 border-surface">
                  HRV
                </div>
                <div className="w-8 h-8 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center font-bold text-xs border-2 border-surface">
                  PMR
                </div>
                <div className="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs border-2 border-surface">
                  478
                </div>
              </div>
              <p>
                Grounded in <strong className="text-on-surface">Psychophysiological Research</strong>
                <br />
                Vagus nerve stimulation, affective granularity &amp; non-clinical somatic calm.
              </p>
            </div>
          </div>

          {/* Right Interactive Preview & Interactive Mood Widget */}
          <div className="flex-1 w-full max-w-lg lg:max-w-none flex flex-col gap-6">
            {/* Interactive Mood Check-In Widget */}
            <div className="w-full bg-surface-container-lowest p-6 rounded-2xl shadow-md" id="mood-checkin">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Immediate Check-In</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">How are you feeling right now?</h3>
                </div>
                <span className="material-symbols-outlined text-primary-container text-2xl">sentiment_satisfied</span>
              </div>

              {/* 4 Mood Cards */}
              <div className="grid grid-cols-4 gap-2.5 sm:gap-3 my-4">
                {moodsList.map((m) => {
                  const isSelected = selectedMood.key === m.key;
                  return (
                    <button
                      key={m.key}
                      onClick={() => setSelectedMood({ key: m.key, title: m.label, feedback: m.feedback })}
                      className={`mood-btn flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl transition-all text-center group ${
                        isSelected
                          ? 'ring-2 ring-primary-container bg-tertiary-fixed shadow-sm'
                          : 'bg-surface-container hover:bg-secondary-container/40'
                      }`}
                    >
                      <div className="mb-1 group-hover:scale-110 transition-transform flex items-center justify-center h-8">
                        <MoodIcon mood={m.mood} size={26} />
                      </div>
                      <span className="font-label-md text-label-md text-on-surface">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Supportive Feedback Box */}
              <div className="p-3.5 rounded-xl bg-tertiary-fixed/60 flex items-start gap-3 transition-all duration-300">
                <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">favorite</span>
                <p className="font-body-sm text-body-sm text-on-surface">
                  <strong>{selectedMood.title}:</strong> {selectedMood.feedback}
                </p>
              </div>

              <div className="mt-4 pt-2 flex justify-end">
                <Link
                  to="/check-in"
                  className="inline-flex items-center gap-1.5 text-label-md text-primary font-semibold hover:underline"
                >
                  <span>Open Full Emotional Affect Check-In</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Live Application Preview Card (Guided Breathing, Streak, Journal) */}
            <div className="w-full bg-surface-container-lowest p-6 rounded-2xl shadow-md space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container-highest">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary-container animate-pulse"></span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Active Session Sandbox</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                  Interactive Demo
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Breathing Exercise Ring Preview */}
                <div className="bg-surface-container-low p-4 rounded-xl flex flex-col items-center justify-center text-center">
                  <div className="relative w-28 h-28 flex items-center justify-center my-2">
                    <div
                      className={`absolute w-24 h-24 rounded-full bg-primary/20 transition-all duration-1000 ${
                        breathRunning
                          ? breathPhase === 'Inhale' || breathPhase === 'Hold'
                            ? 'scale-125'
                            : 'scale-90'
                          : 'scale-100'
                      }`}
                    ></div>
                    <div className="w-16 h-16 rounded-full bg-primary-container text-on-primary flex flex-col items-center justify-center z-10 shadow-sm">
                      <span className="font-label-sm text-label-sm font-bold uppercase">{breathRunning ? breathPhase : 'Breathe'}</span>
                      <span className="font-label-sm text-label-sm">{breathRunning ? `${breathTimer}s` : '4s'}</span>
                    </div>
                  </div>
                  <span className="font-label-md text-label-md font-semibold text-on-surface mt-1">4-7-8 Breathing Guide</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant mb-2">Parasympathetic activation</span>
                  <button
                    onClick={() => setBreathRunning(!breathRunning)}
                    className="px-3 py-1 bg-surface-container hover:bg-surface-container-high text-primary font-label-sm text-label-sm rounded-lg transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {breathRunning ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{breathRunning ? 'Pause' : 'Test Cycle'}</span>
                  </button>
                </div>

                {/* Side Widgets: Streak & Micro Journal */}
                <div className="flex flex-col justify-between gap-3">
                  {/* Habit Streak */}
                  <div className="p-3.5 bg-surface-container-low rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Mindful Momentum</span>
                      <div className="font-headline-sm text-headline-sm text-on-surface">5 Days Gentle</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-primary-container">
                      <span className="material-symbols-outlined">local_fire_department</span>
                    </div>
                  </div>

                  {/* Quick Reflective Snippet */}
                  <div className="p-3.5 bg-surface-container-low rounded-xl">
                    <div className="flex items-center gap-1.5 text-primary font-label-sm text-label-sm font-semibold mb-1">
                      <span className="material-symbols-outlined text-[16px]">draw</span>
                      <span>Daily Micro-Journal</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic truncate">
                      "Letting go of what I cannot control today..."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE PILLAR BENEFIT CARDS */}
      <section className="w-full py-16 px-space-md lg:px-space-lg bg-surface-container-low" id="pillars">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="font-label-md text-label-md font-semibold uppercase tracking-wider text-primary">Foundational Architecture</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Four Pillars of Restorative Health</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Engineered to support the cognitive-emotional feedback loop through clinically informed, self-paced interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1: Mindfulness */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Mindfulness</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Scientifically structured grounding audio, body scans, and meditation exercises that anchor focus to the present moment without spiritual dogma.
                </p>
              </div>
              <Link to="/mindfulness" className="pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1 hover:underline">
                <span>Sensory Grounding</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            {/* Pillar 2: Self-Awareness */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center">
                  <Search className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Self-Awareness</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Nuanced multi-axis mood tracking with trigger tagging, contextual journaling, and emotional granularity inspired by psychological affect models.
                </p>
              </div>
              <Link to="/check-in" className="pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1 hover:underline">
                <span>Affect Mapping</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            {/* Pillar 3: Emotional Well-Being */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-error-container flex items-center justify-center">
                  <Heart className="w-6 h-6 text-error" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Emotional Well-Being</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Biofeedback-simulating pacing rings for 4-7-8 and Box breathing coupled with somatic progressive muscle relaxation to decrease heart rate.
                </p>
              </div>
              <Link to="/breathing" className="pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1 hover:underline">
                <span>Vagal Stimulation</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            {/* Pillar 4: Healthy Habits */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Healthy Habits</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Gentle consistency building without guilt-driven streaks, toxic urgency notifications, or gamified shame loops. Progress measured by compassion.
                </p>
              </div>
              <Link to="/activities" className="pt-2 text-label-sm font-label-sm text-primary font-semibold flex items-center gap-1 hover:underline">
                <span>Shame-Free Logging</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM & LITERATURE GAP / 8 PROJECT OBJECTIVES */}
      <section className="w-full py-20 px-space-md lg:px-space-lg bg-surface" id="research-gap">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="max-w-3xl space-y-4">
            <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-wider">Academic Inquiry &amp; Rationale</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">
              Why MindBloom? The Research Gap in Digital Mental Wellness
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Current mobile applications frequently treat wellness as either a mechanical habit tracker or an intimidating clinical tele-health portal. Our department's research identifies a missing third space: compassionate, client-side, interactive engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Conventional Wellness Apps */}
            <div className="p-8 bg-surface-container-high rounded-2xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-error-container text-error flex items-center justify-center">
                  <span className="material-symbols-outlined">cancel</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Current Market Deficiencies</h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Literature survey of 40+ wellness tools</span>
                </div>
              </div>
              <ul className="space-y-4 font-body-sm text-body-sm text-on-surface-variant">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-[20px] mt-0.5">close</span>
                  <span><strong>Fragmented Architecture:</strong> Users are forced to shuffle between separate meditation apps, habit trackers, and unencrypted journals.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-[20px] mt-0.5">close</span>
                  <span><strong>Gamified Shame Metrics:</strong> Punitive broken streak alerts instill guilt rather than resilience when life disrupts daily logging.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-[20px] mt-0.5">close</span>
                  <span><strong>Clinical Intimidation:</strong> Sterile terminology, DSM-derived forms, and predatory paywalls cause heightened user apprehension.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-[20px] mt-0.5">close</span>
                  <span><strong>Data Exploitation:</strong> Sensitive emotional disclosures frequently leak to third-party ad brokers and analytics aggregates.</span>
                </li>
              </ul>
            </div>

            {/* The MindBloom Paradigm */}
            <div className="p-8 bg-surface-container-lowest rounded-2xl shadow-md space-y-6 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-primary-fixed/20 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined">check_circle</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">The MindBloom Paradigm</h3>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">Evidence-Based Digital Sanctuary</span>
                </div>
              </div>
              <ul className="space-y-4 font-body-sm text-body-sm text-on-surface">
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">done</span>
                  <span><strong>Harmonized Synthesis:</strong> Audio breathing pacing, journal prompts, and affect metrics reside in a single state-synced container.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">done</span>
                  <span><strong>Gentle Continuum Habits:</strong> Micro-milestones and graceful recovery mechanisms celebrate any presence without penalties.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">done</span>
                  <span><strong>Warm Therapeutic Aesthetic:</strong> Warm cream surfaces, organic rounded geometry, and ambient motion calibrated for nervous system calm.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary-container text-[20px] mt-0.5">done</span>
                  <span><strong>Client-First Sovereignty:</strong> Local client caching with strictly sanitized privacy barriers guarantees emotional safety.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 8 Core Platform Objectives */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-surface-container-highest pb-4">
              <div>
                <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">Formal Specifications</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">8 Core Platform Objectives</h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Cognitive &amp; Somatic Design Standards</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">01 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Unified Platform</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Synthesize fragmented tools into one responsive, coherent cognitive environment.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">02 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Interactive Real-Time</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Live visual and auditory guides executing synchronous breathing oscillations.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">03 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Nuanced Reflection</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Granular multi-dimensional emotion tagging moving beyond basic binary moods.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">04 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Gentle Engine</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Heuristic matching of state inputs with low-cognitive-load grounding exercises.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">05 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Shame-Free Habits</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Decouple wellness tracking from punishing streak counters to minimize anxiety.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">06 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Data Sovereignty</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Zero unauthorized telemetry; reflective inputs stored securely on client devices.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">07 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Non-Clinical Tone</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Empathetic microcopy removing diagnostic pressure while ensuring accessibility.</p>
              </div>
              <div className="p-4 bg-surface-container-low rounded-xl space-y-1.5">
                <span className="font-label-sm text-label-sm text-primary font-mono font-bold">08 // OBJ</span>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Responsive Code</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Fluid mobile-first CSS architecture adhering to strict 8pt grid typography rules.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELLNESS TOOLS SHOWCASE */}
      <section className="w-full py-20 px-space-md lg:px-space-lg bg-surface-container-low" id="tools">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-wider">Functional Modules</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">MindBloom Wellness Toolkit</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
              Self-paced, client-side tools designed for immediate nervous system de-escalation and clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Tool 1: Guided Breathing */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Respiration Coach</span>
                  <span className="material-symbols-outlined text-primary-container">air</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Guided Breathing</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Visual pacing protocols designed to stimulate the vagus nerve. Choose between 4-7-8 Deep Sleep, Box Breathing for sharp focus, or 5-5 Coherent Balance.
                </p>
              </div>
              <div className="p-6 bg-surface-container-low rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-label-md text-label-md font-semibold text-primary block">Box 4x4 &amp; 4-7-8 Calming</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Synchronized visual orb + audio timer</span>
                </div>
                <Link
                  to="/breathing"
                  className="px-4 py-2 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-xl hover:bg-primary transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  <span>Open Space</span>
                </Link>
              </div>
            </div>

            {/* Tool 2: Daily Mood Check-In */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Granular Affect</span>
                  <span className="material-symbols-outlined text-primary-container">mood</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Daily Mood Check-In</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Beyond "good" or "bad". Map complex feelings with energy and pleasantness sliders, multi-axis emotion tags, and contextual environmental notes.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">Grateful</span>
                  <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">Overwhelmed</span>
                  <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">Reflective</span>
                  <span className="px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">Calm</span>
                </div>
              </div>
              <div className="flex justify-end">
                <Link
                  to="/check-in"
                  className="px-4 py-2 bg-surface-container text-on-surface font-label-sm text-label-sm rounded-xl hover:bg-surface-variant transition-colors"
                >
                  Start Check-In
                </Link>
              </div>
            </div>

            {/* Tool 3: Private Thought Journaling */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">Reflective Space</span>
                  <span className="material-symbols-outlined text-primary-container">edit_note</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Thought Journaling &amp; Prompts</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  A gentle, unmonitored sanctuary for untangling brain fog. Built-in cognitive reframing prompts help transform catastrophic thoughts into balanced perspectives.
                </p>
                <div className="p-4 bg-surface-container-low rounded-xl border-l-4 border-primary">
                  <span className="font-label-sm text-label-sm text-primary font-semibold block mb-1">Today's Gentle Prompt</span>
                  <p className="font-body-sm text-body-sm text-on-surface italic">
                    "What is one expectation you can release today to make room for peace?"
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">lock</span>
                  Local encryption enabled
                </span>
                <Link
                  to="/journal"
                  className="px-4 py-2 bg-surface-container text-on-surface font-label-sm text-label-sm rounded-xl hover:bg-surface-variant transition-colors"
                >
                  Open Journal
                </Link>
              </div>
            </div>

            {/* Tool 4: Relaxation & Grounding */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">Somatic Protocol</span>
                  <span className="material-symbols-outlined text-primary-container">accessibility_new</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Relaxation &amp; Grounding (5-4-3-2-1)</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tactile multisensory grounding to pull conscious awareness back from acute panic or intrusive thinking through environmental observation.
                </p>
                <div className="grid grid-cols-5 gap-2 text-center pt-2">
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">5</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">See</span>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">4</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Touch</span>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">3</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Hear</span>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">2</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Smell</span>
                  </div>
                  <div className="p-2 bg-surface-container-low rounded-lg">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">1</span>
                    <span className="block font-label-sm text-label-sm text-on-surface-variant">Taste</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Progressive Muscle Relaxation included</span>
                <Link
                  to="/relaxation"
                  className="px-4 py-2 bg-surface-container text-on-surface font-label-sm text-label-sm rounded-xl hover:bg-surface-variant transition-colors"
                >
                  Begin 5-4-3-2-1
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full py-20 px-space-md lg:px-space-lg bg-surface" id="how-it-works">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-label-md text-label-md font-semibold text-primary uppercase tracking-wider">A Gentle Routine</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">How MindBloom Works</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              No mandatory 60-minute obligations. Built to fit seamlessly into micro-breaks throughout your day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center font-headline-md text-headline-md text-primary font-bold shadow-sm">
                01
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Check In</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Take under 30 seconds to log current emotional valence, primary energy state, and contextual tags without overthinking.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Quick 30-sec prompt</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container flex items-center justify-center font-headline-md text-headline-md text-secondary font-bold shadow-sm">
                02
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Choose an Activity</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Receive personalized non-intrusive activity suggestions based on your state: breathwork, audio grounding, or freeform writing.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <Target className="w-4 h-4 text-primary shrink-0" />
                <span>Tailored recommendations</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed flex items-center justify-center font-headline-md text-headline-md text-primary-container font-bold shadow-sm">
                03
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Reflect &amp; Reset</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Engage with interactive feedback cues designed for rapid somatic stabilization and cognitive recentering.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                <span>2 to 5 minutes total</span>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-highest flex items-center justify-center font-headline-md text-headline-md text-on-surface font-bold shadow-sm">
                04
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Track Compassion</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Review your longitudinal emotional rhythm. Spot wellness triggers and recovery velocity without guilt metrics.
              </p>
              <div className="p-3 bg-surface-container-low rounded-xl text-label-sm font-label-sm text-on-surface-variant flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Private personal trend lines</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRIVACY & RESPONSIBLE USE BANNER */}
      <section className="w-full py-12 px-space-md lg:px-space-lg bg-surface-container">
        <div className="max-w-7xl mx-auto rounded-2xl bg-surface-container-lowest p-8 lg:p-10 shadow-sm space-y-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px] text-primary">security</span>
                <span>Responsible Wellness &amp; Safety Notice</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Important Platform Notice</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                MindBloom is a digital wellness platform developed for stress mitigation, mindfulness, and healthy habit building. <strong>It is NOT a medical diagnostic tool, psychiatric intervention service, or clinical emergency hotline.</strong>
              </p>
            </div>
            <div className="p-4 bg-tertiary-fixed/40 rounded-xl flex items-center gap-3 w-full lg:w-auto">
              <span className="material-symbols-outlined text-primary text-3xl">verified_user</span>
              <div>
                <span className="font-label-md text-label-md font-semibold text-on-surface block">Zero Commercial Tracking</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">All reflections remain stored client-side.</span>
              </div>
            </div>
          </div>

          {/* Immediate Crisis Hotline Bar */}
          <div className="p-4 rounded-xl bg-error-container/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-error">emergency</span>
              <span className="font-body-sm text-body-sm text-on-surface font-medium">In immediate emotional crisis or distress? Free professional support is available 24/7.</span>
            </div>
            <div className="flex items-center gap-3">
              <a className="px-4 py-2 bg-error text-on-error rounded-xl font-label-sm text-label-sm hover:opacity-90 transition-opacity" href="tel:988">
                Call/Text 988 (USA)
              </a>
              <a className="px-4 py-2 bg-surface-container-highest text-on-surface rounded-xl font-label-sm text-label-sm hover:bg-surface-variant transition-colors" href="tel:18005990019">
                Kiran: 1800-599-0019 (India)
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FOOTER */}
      <footer className="w-full bg-surface-container-low border-t border-surface-container-highest pt-16 pb-12 px-space-md lg:px-space-lg mt-auto">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm">
                  <Logo size={36} />
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">MindBloom</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
                A modern digital health sanctuary integrating nervous system regulation paradigms with responsive, tactile web architectures.
              </p>
              <div className="p-3 bg-surface-container rounded-xl text-label-sm font-label-sm text-on-surface-variant space-y-1">
                <div className="font-semibold text-on-surface">MindBloom Digital Health &amp; Wellness Platform</div>
                <div>Interactive Psychophysiology, Respiration &amp; Affective Journaling</div>
                <div className="text-primary font-medium">Privacy-First Architecture</div>
              </div>
            </div>

            <div className="space-y-3">
              <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider">Navigation</span>
              <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-primary transition-colors" to="/">Home Canvas</Link></li>
                <li><a className="hover:text-primary transition-colors" href="#pillars">Core Pillars</a></li>
                <li><a className="hover:text-primary transition-colors" href="#research-gap">Literature Gap</a></li>
                <li><a className="hover:text-primary transition-colors" href="#tools">Wellness Toolkit</a></li>
                <li><a className="hover:text-primary transition-colors" href="#how-it-works">How It Works</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider">Wellness Modules</span>
              <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-primary transition-colors" to="/breathing">4-7-8 Breathing Guide</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/breathing">Box Respiration</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/check-in">Affective Mood Logging</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/relaxation">5-4-3-2-1 Somatic Grounding</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/journal">Reflective Prompts</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="font-label-md text-label-md font-semibold text-on-surface uppercase tracking-wider">Privacy &amp; Resources</span>
              <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <li><Link className="hover:text-primary transition-colors" to="/about">Clinical Rationale</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/technology">Platform Architecture &amp; RLS</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/resources">Crisis Hotlines</Link></li>
                <li><button onClick={() => setShowCrisis(true)} className="hover:text-error text-left transition-colors">Immediate Support</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-surface-container-highest flex flex-col sm:flex-row items-center justify-between gap-4 font-label-sm text-label-sm text-on-surface-variant">
            <div>
              © 2025 MindBloom. All rights reserved. Built for compassionate everyday wellness.
            </div>
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                Encrypted Client-Side Storage
              </span>
              <a className="hover:text-primary flex items-center gap-1" href="#home">
                <span>Back to top</span>
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      <CrisisModal isOpen={showCrisis} onClose={() => setShowCrisis(false)} />
    </div>
  );
};
