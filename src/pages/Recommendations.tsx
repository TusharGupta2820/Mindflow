/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useWellness } from '../context/WellnessContext.tsx';

export const Recommendations: React.FC = () => {
  const { recommendations, todayMood } = useWellness();

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      <section className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px] text-primary">psychology_alt</span>
          <span>TRANSPARENT HEURISTIC ADAPTATION</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Personalized Wellness Recommendations
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Non-clinical heuristic suggestions dynamically matched to your latest affective check-in, perceived stress level, and diurnal biological rhythm.
        </p>
      </section>

      {/* State context chip */}
      <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">
            {todayMood?.mood === 'Great'
              ? '✨'
              : todayMood?.mood === 'Good'
              ? '🌿'
              : todayMood?.mood === 'Neutral'
              ? '🌤️'
              : todayMood?.mood === 'Low'
              ? '⛅'
              : '🌧️'}
          </span>
          <div>
            <span className="font-label-sm text-label-sm text-primary font-semibold block uppercase">
              Current Registered Baseline
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {todayMood ? `${todayMood.mood} (Stress ${todayMood.stress_level}/5)` : 'Good (Grounded Baseline)'}
            </span>
          </div>
        </div>
        <Link
          to="/check-in"
          className="text-primary font-label-md text-label-md font-semibold hover:underline"
        >
          Update Current State →
        </Link>
      </div>

      {/* Recommendations Cards */}
      <div className="space-y-6">
        {recommendations.map((rec, index) => {
          const act = rec.activity;
          if (!act) return null;
          return (
            <div
              key={act.id || index}
              className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-0.5 rounded-full font-label-sm text-label-sm font-semibold uppercase ${
                      rec.priority === 'high'
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-secondary-container text-on-secondary-container'
                    }`}
                  >
                    {rec.priority} Priority
                  </span>
                  <span className="text-outline text-sm">•</span>
                  <span className="font-label-sm text-label-sm text-primary font-semibold">
                    {Math.round(rec.confidence * 100)}% Match Confidence
                  </span>
                </div>

                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  {act.title}
                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant">
                  {act.description}
                </p>

                {/* Justification Box */}
                <div className="p-3.5 rounded-xl bg-surface-container-low border-l-3 border-primary flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface">
                    <strong>Why this is suggested:</strong> {rec.reason}
                  </p>
                </div>
              </div>

              <div className="flex sm:flex-col lg:flex-row items-center gap-3 shrink-0">
                {act.category === 'Breathing' ? (
                  <Link
                    to="/breathing"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                    <span>Begin Practice</span>
                  </Link>
                ) : act.category === 'Relaxation' ? (
                  <Link
                    to="/relaxation"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">spa</span>
                    <span>Open Routine</span>
                  </Link>
                ) : (
                  <Link
                    to="/mindfulness"
                    className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[20px]">self_improvement</span>
                    <span>Start Session</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
