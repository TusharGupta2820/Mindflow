/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWellness } from '../context/WellnessContext.tsx';
import { WellnessActivity } from '../types/index.ts';

export const Mindfulness: React.FC = () => {
  const { activities, completeActivity, toggleSaveActivity, savedActivities } = useWellness();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSession, setActiveSession] = useState<WellnessActivity | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const categories = ['All', 'Body Scan', 'Stillness', 'Sensory', 'Gratitude'];

  const mindfulnessActivities = activities.filter(
    (a) => a.category === 'Mindfulness' || a.category === 'Relaxation'
  );

  const filtered =
    selectedCategory === 'All'
      ? mindfulnessActivities
      : mindfulnessActivities.filter((a) =>
          a.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
          a.description.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && activeSession) {
      timer = setInterval(() => {
        setSessionSeconds((prev) => {
          if (prev + 1 >= activeSession.duration_minutes * 60) {
            setIsPlaying(false);
            setCompleted(true);
            completeActivity(activeSession.id, activeSession.duration_minutes, 'Completed mindful session');
            return activeSession.duration_minutes * 60;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, activeSession, completeActivity]);

  const startSession = (act: WellnessActivity) => {
    setActiveSession(act);
    setSessionSeconds(0);
    setIsPlaying(true);
    setCompleted(false);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px] text-primary">self_improvement</span>
          <span>PRESENT-MOMENT RECENTERING</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Mindfulness &amp; Stillness Sanctuary
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Scientifically structured grounding audio, non-judgmental somatic body scans, and gratitude practices designed to cultivate mental spaciousness.
        </p>
      </section>

      {/* Active Session Audio Player Bar */}
      {activeSession && (
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-md border border-primary/20 animate-in fade-in duration-300 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed text-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[32px]">
                  {isPlaying ? 'graphic_eq' : 'self_improvement'}
                </span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
                  Active Guided Practice
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {activeSession.title}
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {formatTimer(sessionSeconds)} / {activeSession.duration_minutes}:00 mins
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
                <span>{isPlaying ? 'Pause' : 'Resume'}</span>
              </button>
              <button
                onClick={() => {
                  completeActivity(activeSession.id, Math.max(1, Math.round(sessionSeconds / 60)));
                  setActiveSession(null);
                  setIsPlaying(false);
                }}
                className="px-4 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
              >
                Finish Early
              </button>
            </div>
          </div>

          {/* Audio progress bar */}
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary-container h-full transition-all duration-500 rounded-full"
              style={{
                width: `${Math.min((sessionSeconds / (activeSession.duration_minutes * 60)) * 100, 100)}%`,
              }}
            ></div>
          </div>

          {/* Stepped instructions */}
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-2">
            <span className="font-label-sm text-label-sm text-primary font-semibold block">Practice Cue:</span>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 font-body-sm text-body-sm text-on-surface">
              {activeSession.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-surface-container-highest flex items-center justify-center font-bold text-xs text-primary shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Categories Filter Chips */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              selectedCategory === cat
                ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((act) => {
          const isSaved = savedActivities.some((s) => s.id === act.id);
          return (
            <div
              key={act.id}
              className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                    {act.duration_minutes} Mins • {act.difficulty}
                  </span>
                  <button
                    onClick={() => toggleSaveActivity(act.id)}
                    className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                    title={isSaved ? 'Saved to bookmarks' : 'Save for later'}
                  >
                    <span
                      className={`material-symbols-outlined text-[20px] ${isSaved ? 'text-primary' : ''}`}
                    >
                      {isSaved ? 'bookmark' : 'bookmark_border'}
                    </span>
                  </button>
                </div>

                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {act.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {act.description}
                </p>

                {act.benefits && act.benefits.length > 0 && (
                  <div className="pt-1 flex flex-wrap gap-1.5">
                    {act.benefits.map((b, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-[11px]"
                      >
                        ✓ {b}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-surface-container">
                <span className="font-label-sm text-label-sm text-outline">Clinical Soundscape</span>
                <button
                  onClick={() => startSession(act)}
                  className="px-4 py-2 bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                  <span>Begin</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
