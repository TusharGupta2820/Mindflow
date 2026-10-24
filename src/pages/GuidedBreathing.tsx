/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWellness } from '../context/WellnessContext.tsx';

interface TechniqueConfig {
  title: string;
  badge: string;
  desc: string;
  phases: {
    name: 'INHALE' | 'HOLD' | 'EXHALE' | 'REST';
    duration: number;
    cue: string;
    scale: number;
  }[];
}

const techniques: Record<string, TechniqueConfig> = {
  box: {
    title: 'Box Breathing',
    badge: '4-4-4-4',
    desc: 'Focus, alertness & acute stress down-regulation.',
    phases: [
      { name: 'INHALE', duration: 4, cue: 'Inhale gently through your nose... expanding your belly.', scale: 1.4 },
      { name: 'HOLD', duration: 4, cue: 'Gently hold full breath. Keep shoulders relaxed.', scale: 1.4 },
      { name: 'EXHALE', duration: 4, cue: 'Smoothly exhale through mouth, relaxing completely.', scale: 1.0 },
      { name: 'REST', duration: 4, cue: 'Savor the quiet emptiness before next breath.', scale: 1.0 },
    ],
  },
  relax: {
    title: '4-7-8 Relaxing Breath',
    badge: 'Sleep / Calm',
    desc: 'Deep parasympathetic tone & rapid anxiety relief.',
    phases: [
      { name: 'INHALE', duration: 4, cue: 'Quietly inhale air through the nose to a count of 4.', scale: 1.4 },
      { name: 'HOLD', duration: 7, cue: 'Hold the breath completely steady for 7 seconds.', scale: 1.4 },
      { name: 'EXHALE', duration: 8, cue: 'Make a gentle whoosh sound exhaling for 8 seconds.', scale: 1.0 },
    ],
  },
  resonant: {
    title: 'Resonant Coherence',
    badge: '5.5s Cycle',
    desc: 'Heart rate variability (HRV) sync & emotional balance.',
    phases: [
      { name: 'INHALE', duration: 5, cue: 'Smooth, continuous 5-second inflow into the chest.', scale: 1.35 },
      { name: 'EXHALE', duration: 5, cue: 'Seamless 5-second outflow without any pause.', scale: 1.0 },
    ],
  },
};

export const GuidedBreathing: React.FC = () => {
  const { completeActivity } = useWellness();
  const navigate = useNavigate();

  const [techniqueKey, setTechniqueKey] = useState<'box' | 'relax' | 'resonant'>('box');
  const [targetMinutes, setTargetMinutes] = useState<number>(3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [isAudioOn, setIsAudioOn] = useState<boolean>(true);

  const [phaseIndex, setPhaseIndex] = useState<number>(0);
  const [phaseCountdown, setPhaseCountdown] = useState<number>(4);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(75);
  const [breathsCount, setBreathsCount] = useState<number>(8);
  const [showCompletion, setShowCompletion] = useState<boolean>(false);

  const totalTargetSeconds = targetMinutes * 60;
  const currentTech = techniques[techniqueKey];
  const currentPhase = currentTech.phases[phaseIndex];

  // Tick loop
  useEffect(() => {
    if (!isPlaying || showCompletion) return;

    const timer = setInterval(() => {
      setElapsedSeconds((prev) => {
        if (prev + 1 >= totalTargetSeconds) {
          setShowCompletion(true);
          completeActivity('act-001', targetMinutes, `Completed ${currentTech.title}`);
          return totalTargetSeconds;
        }
        return prev + 1;
      });

      setPhaseCountdown((prev) => {
        if (prev <= 1) {
          setPhaseIndex((currIdx) => {
            const nextIdx = (currIdx + 1) % currentTech.phases.length;
            if (nextIdx === 0) {
              setBreathsCount((b) => b + 1);
            }
            return nextIdx;
          });
          return currentTech.phases[(phaseIndex + 1) % currentTech.phases.length].duration;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, showCompletion, phaseIndex, currentTech, totalTargetSeconds, targetMinutes, completeActivity]);

  const handleSelectTechnique = (key: 'box' | 'relax' | 'resonant') => {
    setTechniqueKey(key);
    setPhaseIndex(0);
    setPhaseCountdown(techniques[key].phases[0].duration);
  };

  const handleRestart = () => {
    setElapsedSeconds(0);
    setPhaseIndex(0);
    setPhaseCountdown(currentTech.phases[0].duration);
    setIsPlaying(true);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // SVG circumference for r=148 is 2 * pi * 148 = 930
  const circumference = 930;
  const progressOffset = circumference - Math.min(elapsedSeconds / totalTargetSeconds, 1) * circumference;

  // Scale calculations for orb
  const orbScale = isReducedMotion
    ? 1
    : currentPhase.scale === 1.4
    ? 1.35
    : currentPhase.scale === 1.35
    ? 1.25
    : 0.95;

  return (
    <div className="flex flex-col w-full pb-16 max-w-7xl mx-auto space-y-8">
      {/* Top Header & Technique Selector */}
      <header className="flex flex-col gap-y-6 pt-2">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm mb-3">
              <span className="material-symbols-outlined text-[16px]">air</span>
              <span>AUTONOMIC REGULATION PROTOCOL</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Guided Breathing Space
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Regulate your autonomic nervous system with rhythmic, calming respiration patterns grounded in clinical psychophysiology.
            </p>
          </div>

          {/* Duration Selector Pills */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-container-high self-start md:self-auto">
            {[1, 3, 5].map((m) => (
              <button
                key={m}
                onClick={() => {
                  setTargetMinutes(m);
                  setElapsedSeconds(0);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${
                  targetMinutes === m
                    ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
                type="button"
              >
                {m} {m === 1 ? 'Min' : 'Mins'}
              </button>
            ))}
          </div>
        </div>

        {/* Breathing Technique Selector Horizontal Deck */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {(['box', 'relax', 'resonant'] as const).map((key) => {
            const item = techniques[key];
            const isActive = techniqueKey === key;
            return (
              <button
                key={key}
                onClick={() => handleSelectTechnique(key)}
                className={`text-left p-4 rounded-2xl transition-all relative overflow-hidden ${
                  isActive
                    ? 'bg-surface-container-lowest shadow-sm'
                    : 'bg-surface-container-low hover:bg-surface-container-lowest'
                }`}
                type="button"
              >
                <div
                  className={`absolute top-0 left-0 bottom-0 w-1.5 ${
                    isActive ? 'bg-primary-container' : 'bg-transparent'
                  }`}
                ></div>
                <div className="flex items-center justify-between mb-1 pl-2">
                  <span
                    className={`font-label-lg text-label-lg font-semibold ${
                      isActive ? 'text-primary' : 'text-on-surface'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span
                    className={`font-label-sm text-label-sm px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-highest text-on-surface-variant'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant pl-2">{item.desc}</p>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Content Mosaic */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Central Interactive Arena (8 Columns on desktop) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Primary Breathing Visualizer Canvas */}
          <div className="relative rounded-3xl bg-gradient-to-b from-surface-container-lowest via-tertiary-fixed/20 to-surface-container p-8 md:p-12 overflow-hidden shadow-sm flex flex-col items-center justify-between min-h-[500px]">
            {/* Ambient Background Rings */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-secondary-fixed/25 blur-3xl pointer-events-none"></div>

            {/* Session Status Sub-bar */}
            <div className="w-full flex items-center justify-between z-10 text-on-surface-variant">
              <div className="flex items-center gap-2 font-label-md text-label-md">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-semibold text-primary">{isPlaying ? 'In Rhythm' : 'Paused'}</span>
                <span className="text-outline">/</span>
                <span>{currentTech.title}</span>
              </div>
              <div className="flex items-center gap-2 bg-surface-container-lowest/80 px-3 py-1.5 rounded-full font-label-sm text-label-sm text-on-surface shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-primary">timelapse</span>
                <span>{formatTime(elapsedSeconds)}</span>
                <span className="text-outline">/</span>
                <span>{formatTime(totalTargetSeconds)}</span>
              </div>
            </div>

            {/* Kinetic Breathing Orb & Progress Rings */}
            <div className="relative my-8 flex items-center justify-center">
              {/* Outer Elapsed Session Progress SVG */}
              <svg className="w-72 h-72 md:w-88 md:h-88 -rotate-90 pointer-events-none" viewBox="0 0 320 320">
                <circle className="stroke-surface-container-highest fill-none" cx="160" cy="160" r="148" strokeWidth="4"></circle>
                <circle
                  className="stroke-primary fill-none transition-all duration-500 ease-linear"
                  cx="160"
                  cy="160"
                  r="148"
                  strokeDasharray={circumference}
                  strokeDashoffset={progressOffset}
                  strokeLinecap="round"
                  strokeWidth="4"
                ></circle>
              </svg>

              {/* Dynamic Concentric Pulsing Circles */}
              <div
                style={{ transform: `scale(${orbScale})` }}
                className="absolute w-56 h-56 md:w-68 md:h-68 rounded-full bg-primary-fixed/30 transition-transform duration-1000 ease-in-out flex items-center justify-center pointer-events-none"
              >
                <div
                  style={{ transform: `scale(${orbScale})` }}
                  className="w-44 h-44 md:w-52 md:h-52 rounded-full bg-primary-container/20 transition-transform duration-1000 ease-in-out flex items-center justify-center"
                >
                  <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-surface-container-lowest shadow-md flex items-center justify-center"></div>
                </div>
              </div>

              {/* Typography Core */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none z-10 pointer-events-none">
                <span className="font-headline-lg text-headline-lg text-primary tracking-widest uppercase transition-all duration-300 font-bold">
                  {currentPhase.name}
                </span>
                <span className="font-display-lg text-display-lg text-on-surface font-bold leading-none mt-1">
                  {phaseCountdown}
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant mt-1">
                  Seconds
                </span>
              </div>
            </div>

            {/* Dynamic Sensory Instruction Banner */}
            <div className="w-full max-w-md z-10 text-center">
              <div className="px-5 py-3 rounded-2xl bg-surface-container-lowest/90 shadow-sm backdrop-blur-sm transition-all duration-500">
                <p className="font-body-md text-body-md text-on-surface font-medium">{currentPhase.cue}</p>
              </div>
            </div>
          </div>

          {/* Controls & Accessibility Panel */}
          <div className="rounded-2xl bg-surface-container-lowest p-6 shadow-sm flex flex-col gap-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Reset Button */}
                <button
                  onClick={handleRestart}
                  className="p-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors"
                  title="Restart Session"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[24px]">replay</span>
                </button>

                {/* Primary Play / Pause Toggle Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-3 px-8 py-3.5 rounded-2xl bg-primary-container text-on-primary shadow-md hover:bg-primary transition-all active:scale-95"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[26px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                  <span className="font-label-lg text-label-lg font-semibold">
                    {isPlaying ? 'Pause Practice' : 'Resume Practice'}
                  </span>
                </button>

                {/* Finish Early Button */}
                <button
                  onClick={() => setShowCompletion(true)}
                  className="px-5 py-3 rounded-2xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
                  type="button"
                >
                  Finish Early
                </button>
              </div>

              {/* Quick Toggles */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAudioOn(!isAudioOn)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                    isAudioOn
                      ? 'bg-surface-container-low text-on-surface'
                      : 'bg-surface-container text-outline opacity-70'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {isAudioOn ? 'volume_up' : 'volume_off'}
                  </span>
                  <span className="font-label-md text-label-md">Gentle Rain</span>
                </button>

                <button
                  onClick={() => setIsReducedMotion(!isReducedMotion)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                    isReducedMotion
                      ? 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                  title="Reduce visual scaling pulses"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">motion_sensor_idle</span>
                  <span className="font-label-md text-label-md hidden sm:inline">Text Cue Only</span>
                </button>
              </div>
            </div>

            {/* Safety Disclaimer Callout */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px] text-outline mt-0.5">info</span>
              <p className="font-body-sm text-body-sm leading-relaxed">
                Never force breath holds. If you feel dizzy or lightheaded at any moment, pause the session and return to your natural rhythm immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Side Analytical & Educational Rail (4 Columns on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Live Real-Time Bio-Metrics Card */}
          <div className="rounded-3xl bg-surface-container-lowest p-6 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                Session Vitality Data
              </span>
              <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-semibold">
                Active Telemetry
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Breaths Done
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-headline-md text-headline-md font-bold text-primary">
                    {breathsCount}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">cycles</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  HR Coherence
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-headline-md text-headline-md font-bold text-tertiary">0.86</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">High</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Today's Total
                </span>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="font-headline-md text-headline-md font-bold text-on-surface">+11</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">mins</span>
                </div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface-container-low flex flex-col justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Nervous State
                </span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Vagal Tone</span>
                </div>
              </div>
            </div>

            {/* Coherence Wave Sparkline */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-on-surface-variant mb-1.5 font-label-sm text-label-sm">
                <span>Rhythm Regularity</span>
                <span className="text-primary font-medium">Synchronized</span>
              </div>
              <svg className="w-full h-12 text-primary" fill="none" viewBox="0 0 280 48">
                <path
                  d="M0 24 C 20 24, 30 6, 50 24 C 70 42, 80 6, 100 24 C 120 42, 130 6, 150 24 C 170 42, 180 6, 200 24 C 220 42, 230 6, 250 24 C 265 38, 275 24, 280 24"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                ></path>
              </svg>
            </div>
          </div>

          {/* Scientific Rationale Card */}
          <div className="rounded-3xl bg-surface-container-low p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">psychology_alt</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Neurobiological Mechanism
              </h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Box breathing (sama vritti pranayama) engages the vagus nerve through prolonged, paced diaphragmatic excursions. Equalized inspiration and retention down-modulate sympathetic adrenal outflow, moderating systemic epinephrine concentrations within three minutes.
            </p>
            <div className="p-4 rounded-2xl bg-surface-container-lowest">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline block mb-1 font-semibold">
                Clinical Psychophysiology Reference
              </span>
              <p className="font-body-sm text-body-sm text-on-surface font-medium">
                Protocol verified against physiological benchmarks for real-time Heart Rate Variability (HRV) spectral power stabilization.
              </p>
            </div>

            {/* Atmospheric Visual Card */}
            <div className="relative rounded-2xl overflow-hidden h-36 bg-gradient-to-br from-primary-container/30 via-tertiary-fixed/30 to-secondary-container/30 p-4 flex flex-col justify-between border border-surface-container">
              <div className="flex items-center justify-between">
                <span className="w-8 h-8 rounded-lg bg-surface/80 backdrop-blur-sm flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">air</span>
                </span>
                <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface/80 backdrop-blur-sm text-primary font-semibold">
                  Acoustic Pacing
                </span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface font-semibold block">
                  MindBloom Sensory Studio
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Coherent vagal resonance cycles
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post-Session Completion Modal */}
      {showCompletion && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-lg rounded-3xl bg-surface-container-lowest p-8 shadow-xl flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-primary-fixed flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-[40px] text-primary">spa</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">Session Complete</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">
              Take a moment to notice how your shoulders and jaw feel right now. You’ve successfully reset your vagal baseline.
            </p>

            <div className="grid grid-cols-3 gap-2 w-full my-6 p-4 rounded-2xl bg-surface-container-low">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Time</span>
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  {formatTime(elapsedSeconds)}
                </span>
              </div>
              <div className="flex flex-col border-x border-surface-container-high">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Rounds</span>
                <span className="font-label-lg text-label-lg text-primary font-bold">{breathsCount} Cycles</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">State</span>
                <span className="font-label-lg text-label-lg text-tertiary font-bold">Grounded</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <button
                onClick={() => {
                  setShowCompletion(false);
                  navigate('/journal');
                }}
                className="flex-1 py-3.5 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-semibold hover:bg-primary transition-all"
                type="button"
              >
                Write in Journal
              </button>
              <button
                onClick={() => {
                  setShowCompletion(false);
                  handleRestart();
                }}
                className="flex-1 py-3.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-all"
                type="button"
              >
                Return to Deck
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
