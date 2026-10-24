/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useWellness } from '../context/WellnessContext.tsx';
import { MoodType } from '../types/index.ts';

export const DailyCheckIn: React.FC = () => {
  const { moods, todayMood, logMood } = useWellness();

  const [selectedMood, setSelectedMood] = useState<MoodType>(todayMood?.mood || 'Good');
  const [selectedNuances, setSelectedNuances] = useState<string[]>(
    todayMood?.emotion_tags || ['Calm', 'Tired', 'Grateful']
  );
  const [stressLevel, setStressLevel] = useState<number>(todayMood?.stress_level || 2);
  const [reflection, setReflection] = useState<string>(
    todayMood?.reflection ||
      'Finished my afternoon priorities, feeling relieved but a bit physically tired.'
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [draftSaved, setDraftSaved] = useState<boolean>(false);

  const nuancesList = [
    'Stressed',
    'Anxious',
    'Calm',
    'Motivated',
    'Tired',
    'Happy',
    'Overwhelmed',
    'Grateful',
    'Restless',
    'Hopeful',
  ];

  const stressLabels: Record<number, string> = {
    1: 'Level 1 • Peaceful & Relaxed',
    2: 'Level 2 • Mild, manageable tension',
    3: 'Level 3 • Noticeable pressure',
    4: 'Level 4 • High stress',
    5: 'Level 5 • Overwhelming',
  };

  const handleToggleNuance = (tag: string) => {
    setSelectedNuances((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await logMood({
      mood: selectedMood,
      emotion_tags: selectedNuances,
      stress_level: stressLevel,
      reflection,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handleReset = () => {
    setSelectedMood('Good');
    setSelectedNuances([]);
    setStressLevel(2);
    setReflection('');
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-space-xl pb-16">
      {/* Top Editorial Header & Atmospheric Welcome */}
      <section className="relative pt-space-xs pb-space-sm flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm mb-space-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span>MindBloom Emotional Pulse • Module 02</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Daily Emotional Check-In
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1.5 leading-relaxed">
            There are no right or wrong feelings. Pausing to name your state is the first step toward grounded self-awareness.
          </p>
        </div>

        {/* Quick Status Snapshot */}
        <div className="flex items-center gap-space-sm bg-surface-container-low px-space-md py-space-sm rounded-xl shadow-sm">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
              Logging Consistency
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">5-Day Flow • 83%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          </div>
        </div>
      </section>

      {/* Main Grid: Interactive Check-In & Supportive Adaptive Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Check-In Interactive Workspace (8 Cols) */}
        <div className="lg:col-span-8 space-y-space-lg">
          <form
            onSubmit={handleSave}
            className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-space-xl shadow-[0_4px_24px_rgba(21,40,63,0.04)] space-y-space-xl"
          >
            {/* Step 1: Overall Mood Selection */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                    Step 01
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">
                    How are you feeling right this moment?
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
                  Single select
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-space-xs">
                {(
                  [
                    { mood: 'Very Low', icon: '🌧️', sub: 'Depleted' },
                    { mood: 'Low', icon: '⛅', sub: 'Heavy' },
                    { mood: 'Neutral', icon: '🌤️', sub: 'Balanced' },
                    { mood: 'Good', icon: '🌿', sub: 'Steady' },
                    { mood: 'Great', icon: '✨', sub: 'Vibrant' },
                  ] as const
                ).map((item) => {
                  const isActive = selectedMood === item.mood;
                  return (
                    <button
                      key={item.mood}
                      type="button"
                      onClick={() => setSelectedMood(item.mood)}
                      className={`mood-btn group flex flex-col items-center justify-center p-space-sm rounded-xl transition-all duration-200 ${
                        isActive
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed shadow-[0_4px_18px_rgba(8,127,140,0.18)]'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      <span className="text-3xl mb-1.5 transform group-hover:scale-110 transition-transform">
                        {item.icon}
                      </span>
                      <span className="font-label-lg text-label-lg font-semibold">{item.mood}</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                        {item.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Nuanced Emotional Nuances */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                    Step 02
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Emotional Nuances</h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Select all that describe your thoughts
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 pt-space-xs">
                {nuancesList.map((tag) => {
                  const isSelected = selectedNuances.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleNuance(tag)}
                      className={`nuance-chip px-4 py-2 rounded-full font-label-md text-label-md transition-all ${
                        isSelected
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed font-semibold shadow-sm'
                          : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Perceived Stress Level Slider */}
            <div className="space-y-space-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                    Step 03
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Perceived Stress Metric</h2>
                </div>
                <span
                  className={`font-label-lg text-label-lg px-3 py-1 rounded-full font-semibold ${
                    stressLevel >= 4
                      ? 'bg-error-container text-on-error-container'
                      : stressLevel === 3
                      ? 'bg-surface-container-highest text-on-surface'
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}
                >
                  {stressLabels[stressLevel]}
                </span>
              </div>

              <div className="pt-space-xs space-y-3">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={stressLevel}
                  onChange={(e) => setStressLevel(Number(e.target.value))}
                  className="w-full h-2.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                />
                <div className="grid grid-cols-5 text-center font-label-sm text-label-sm text-on-surface-variant">
                  <div className="flex flex-col items-start text-left">
                    <span className="font-semibold text-on-surface">1</span>
                    <span className="text-[11px] leading-tight text-on-surface-variant">Peaceful</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="font-semibold text-primary">2</span>
                    <span className="text-[11px] leading-tight text-on-surface font-medium">Manageable</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="font-semibold text-on-surface">3</span>
                    <span className="text-[11px] leading-tight text-on-surface-variant">Noticeable</span>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <span className="font-semibold text-on-surface">4</span>
                    <span className="text-[11px] leading-tight text-on-surface-variant">High Stress</span>
                  </div>
                  <div className="flex flex-col items-end text-right">
                    <span className="font-semibold text-on-surface">5</span>
                    <span className="text-[11px] leading-tight text-on-surface-variant">Overwhelming</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Free-form Mindful Notes / Reflection */}
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                    Step 04
                  </span>
                  <label htmlFor="mindfulNotes" className="font-headline-sm text-headline-sm text-on-surface block">
                    What is contributing to how you feel today?
                  </label>
                </div>
                <span className="font-label-sm text-label-sm text-outline">Optional &amp; Private</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Naming context anchors our nervous system. Everything entered here remains client-side &amp; encrypted.
              </p>
              <textarea
                id="mindfulNotes"
                rows={4}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="E.g., Finished my engineering lab report, feeling relieved but a bit physically tired."
                className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:outline-none transition-all placeholder:text-outline-variant resize-none"
              ></textarea>
            </div>

            {/* Form Actions */}
            <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container">
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-space-md py-3 rounded-xl text-on-surface-variant hover:bg-surface-container font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[18px]">restart_alt</span>
                <span>Reset Selection</span>
              </button>

              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors"
                >
                  {draftSaved ? 'Draft Saved ✓' : 'Save Draft'}
                </button>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-7 py-3 rounded-xl bg-primary-container hover:opacity-95 text-on-primary font-label-lg text-label-lg shadow-[0_4px_14px_rgba(8,127,140,0.25)] flex items-center justify-center gap-2 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>{savedSuccess ? 'Check-In Saved!' : 'Save Check-In'}</span>
                </button>
              </div>
            </div>
          </form>

          {/* Supportive Post-Submission Preview Card */}
          <div className="bg-tertiary-fixed/30 rounded-xl p-space-md md:p-space-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md shadow-sm transition-all duration-300">
            <div className="flex items-start gap-space-sm">
              <div className="w-10 h-10 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[22px]">spa</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-primary">
                    Micro-Intervention Match
                  </span>
                  <span className="w-1 h-1 rounded-full bg-outline"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Wednesday, Oct 24</span>
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-1">
                  Check-in saved for Wednesday, Oct 24. Since you noted feeling a bit tired, we recommend a{' '}
                  <strong className="font-semibold text-primary">3-minute Guided Mindful Stretch</strong> to restore circulation.
                </p>
              </div>
            </div>
            <Link
              to="/relaxation"
              className="w-full md:w-auto whitespace-nowrap px-space-md py-2.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:opacity-90 shadow-sm transition-all flex items-center justify-center gap-1.5 shrink-0"
            >
              <span className="material-symbols-outlined text-[18px]">play_arrow</span>
              <span>Start Recommended Stretch</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Data Analytics & Calendar Heatmap (4 Cols) */}
        <div className="lg:col-span-4 space-y-space-lg">
          {/* Monthly Heatmap Calendar */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-[0_4px_20px_-2px_rgba(21,40,63,0.04)] space-y-space-md">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
                  Longitudinal Trajectory
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">October 2024</h3>
              </div>
              <div className="flex items-center gap-1 text-on-surface-variant">
                <button className="p-1 rounded-lg hover:bg-surface-container transition-colors" type="button">
                  <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                </button>
                <button className="p-1 rounded-lg hover:bg-surface-container transition-colors" type="button">
                  <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            {/* Heatmap Day grid */}
            <div className="space-y-2">
              <div className="grid grid-cols-7 text-center font-label-sm text-label-sm text-outline-variant pb-1">
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
              </div>

              {/* 31 days representation matching Stitch */}
              <div className="grid grid-cols-7 gap-1.5">
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-transparent"></span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-transparent"></span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-surface-container-low" title="Oct 1: Neutral">1</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 2: Good">2</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 3: Good">3</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-primary bg-primary-container font-semibold" title="Oct 4: Great">4</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-secondary-container" title="Oct 5: Low">5</span>

                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 6: Good">6</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-primary bg-primary-container font-semibold" title="Oct 7: Great">7</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-surface-container-low" title="Oct 8: Neutral">8</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 9: Good">9</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 10: Good">10</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-primary bg-primary-container font-semibold" title="Oct 11: Great">11</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 12: Good">12</span>

                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-surface-container-low" title="Oct 13: Neutral">13</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-secondary-container" title="Oct 14: Low">14</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 15: Good">15</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 16: Good">16</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-primary bg-primary-container font-semibold" title="Oct 17: Great">17</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-surface-container-low" title="Oct 18: Neutral">18</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 19: Good">19</span>

                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed" title="Oct 20: Good">20</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-primary bg-primary-container font-semibold" title="Oct 21: Great">21</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-tertiary-fixed font-semibold" title="Oct 22: Good">22</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-on-surface bg-surface-container-low font-semibold" title="Oct 23: Neutral">23</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs font-bold text-on-surface bg-tertiary-fixed shadow-[0_0_0_2px_#087f8c]" title="Oct 24: Today (Good)">24</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">25</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">26</span>

                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">27</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">28</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">29</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">30</span>
                <span className="h-8 flex items-center justify-center rounded-lg text-xs text-outline-variant bg-surface-container-low/50">31</span>
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-between pt-space-xs text-[11px] font-label-sm text-on-surface-variant">
                <span>Heatmap Legend:</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded bg-secondary-container" title="Low"></span>
                  <span className="w-2.5 h-2.5 rounded bg-surface-container-low" title="Neutral"></span>
                  <span className="w-2.5 h-2.5 rounded bg-tertiary-fixed" title="Good"></span>
                  <span className="w-2.5 h-2.5 rounded bg-primary-container" title="Great"></span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Check-In Logs */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-[0_4px_20px_-2px_rgba(21,40,63,0.04)] space-y-space-md">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Recent Check-In Logs</h3>
              <span className="font-label-sm text-label-sm text-primary font-semibold">Last 3 Entries</span>
            </div>

            <div className="space-y-space-sm">
              {moods.slice(0, 3).map((m) => (
                <div
                  key={m.id}
                  className="p-space-sm rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">
                        {m.mood === 'Great'
                          ? '✨'
                          : m.mood === 'Good'
                          ? '🌿'
                          : m.mood === 'Neutral'
                          ? '🌤️'
                          : m.mood === 'Low'
                          ? '⛅'
                          : '🌧️'}
                      </span>
                      <div>
                        <span className="font-label-lg text-label-lg text-on-surface block leading-tight font-semibold">
                          {m.entry_date === '2024-10-24'
                            ? 'Today'
                            : m.entry_date === '2024-10-23'
                            ? 'Yesterday'
                            : m.entry_date}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {m.entry_date}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        Stress: {m.stress_level}/5
                      </span>
                    </div>
                  </div>

                  {m.emotion_tags && m.emotion_tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {m.emotion_tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-label-sm text-[11px]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {m.reflection && (
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic">
                      “{m.reflection}”
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Stress Mini Trend */}
          <div className="bg-surface-container-low rounded-xl p-space-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Weekly Stress Trend
              </span>
              <span className="font-label-sm text-label-sm text-primary font-semibold">-18% vs Last Week</span>
            </div>

            <div className="w-full h-16 relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 240 60">
                <line className="text-surface-variant" stroke="currentColor" strokeDasharray="2,4" strokeWidth="1" x1="0" x2="240" y1="15" y2="15"></line>
                <line className="text-surface-variant" stroke="currentColor" strokeDasharray="2,4" strokeWidth="1" x1="0" x2="240" y1="45" y2="45"></line>
                <defs>
                  <linearGradient id="stressGrad" x1="0%" x2="0%" y1="0%" y2="100%">
                    <stop offset="0%" stopColor="#087f8c" stopOpacity="0.3"></stop>
                    <stop offset="100%" stopColor="#087f8c" stopOpacity="0.0"></stop>
                  </linearGradient>
                </defs>
                <path d="M 0,38 Q 40,48 80,45 T 160,25 T 200,32 T 240,28 L 240,60 L 0,60 Z" fill="url(#stressGrad)"></path>
                <path d="M 0,38 Q 40,48 80,45 T 160,25 T 200,32 T 240,28" fill="none" stroke="#087f8c" strokeLinecap="round" strokeWidth="2.5"></path>
                <circle className="fill-surface-container-lowest stroke-primary" cx="0" cy="38" r="3.5" strokeWidth="2"></circle>
                <circle className="fill-surface-container-lowest stroke-primary" cx="80" cy="45" r="3.5" strokeWidth="2"></circle>
                <circle className="fill-surface-container-lowest stroke-primary" cx="160" cy="25" r="3.5" strokeWidth="2"></circle>
                <circle className="fill-surface-container-lowest stroke-primary" cx="200" cy="32" r="3.5" strokeWidth="2"></circle>
                <circle className="fill-primary stroke-surface-container-lowest" cx="240" cy="28" r="4.5" strokeWidth="2"></circle>
              </svg>
            </div>
            <div className="flex items-center justify-between text-[11px] font-label-sm text-outline">
              <span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span>
              <span className="font-semibold text-primary">Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Non-Clinical Wellness Disclaimer Footer */}
      <footer className="pt-space-md pb-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-outline">verified_user</span>
          <span>MindBloom Wellness Suite • Interactive Emotional Regulation</span>
        </div>
        <p className="text-outline text-center sm:text-right">
          This tracker is designed for self-reflection and habit building, not psychological diagnosis.
        </p>
      </footer>
    </div>
  );
};
