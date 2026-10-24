/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useWellness } from '../context/WellnessContext.tsx';
import { WellnessActivity } from '../types/index.ts';

export const Activities: React.FC = () => {
  const {
    activities,
    savedActivities,
    activityLogs,
    goals,
    incrementGoal,
    toggleSaveActivity,
    completeActivity,
  } = useWellness();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'catalogue' | 'saved' | 'history'>('catalogue');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedActivityModal, setSelectedActivityModal] = useState<WellnessActivity | null>(null);

  const categories = ['All', 'Breathing', 'Mindfulness', 'Relaxation', 'Journaling'];

  const filtered =
    selectedCategory === 'All'
      ? activities
      : activities.filter((a) => a.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleQuickComplete = (act: WellnessActivity) => {
    completeActivity(act.id, act.duration_minutes, 'Completed from Activities Catalogue');
    setSelectedActivityModal(null);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px]">vital_signs</span>
          <span>HABIT CONSISTENCY &amp; WELLNESS ROUTINES</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Wellness Activities &amp; Daily Anchors
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
          Nurture positive behavioral loops without guilt metrics. Every mindful action stabilizes the autonomic nervous system.
        </p>
      </section>

      {/* Daily Anchors Habit Consistency Row */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Daily Practice Anchors
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Today's Gentle Momentum
            </h3>
          </div>
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold w-fit">
            <span className="material-symbols-outlined text-[18px] text-tertiary">spa</span>
            <span>5-Day Bloom Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Habit 1: Hydration */}
          <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span className="material-symbols-outlined text-[22px]">water_drop</span>
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
              className="w-9 h-9 rounded-xl bg-surface-container-highest flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-all text-base font-bold shadow-xs active:scale-95"
              title="Add water glass"
            >
              +
            </button>
          </div>

          {/* Habit 2: Midday Mindful Pause */}
          <div className="p-4 rounded-2xl bg-tertiary-fixed/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">check_circle</span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface font-semibold block">Midday Mindful Pause</span>
                <span className="font-body-sm text-body-sm text-tertiary font-medium">Completed at 11:15 AM ✓</span>
              </div>
            </div>
            <span className="font-label-sm text-label-sm font-semibold text-primary px-3 py-1 rounded-full bg-surface-container-lowest shadow-xs">
              Done
            </span>
          </div>

          {/* Habit 3: Evening Reflection */}
          <div className="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-outline">
                <span className="material-symbols-outlined text-[22px]">bedtime</span>
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface font-semibold block">Evening Reflection</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Recommended after 8:00 PM</span>
              </div>
            </div>
            <Link
              to="/journal"
              className="font-label-sm text-label-sm text-primary font-semibold px-3 py-1 rounded-full bg-surface-container hover:bg-surface-variant transition-colors"
            >
              Open
            </Link>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-tertiary">eco</span>
            <span>Compassionate habit loop: missed days do not reset progress or induce shame.</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface-container-high">
          <button
            onClick={() => setActiveTab('catalogue')}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              activeTab === 'catalogue'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All Activities ({activities.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              activeTab === 'saved'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Saved Bookmarks ({savedActivities.length})
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              activeTab === 'history'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Completed History ({activityLogs.length})
          </button>
        </div>

        {activeTab === 'catalogue' && (
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 rounded-xl font-label-sm text-label-sm transition-all ${
                  selectedCategory === c
                    ? 'bg-primary-container text-on-primary font-semibold'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Content depending on tab */}
      {activeTab === 'catalogue' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((act) => {
            const isSaved = savedActivities.some((s) => s.id === act.id);
            return (
              <div
                key={act.id}
                className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      {act.category} • {act.duration_minutes} Mins
                    </span>
                    <button
                      onClick={() => toggleSaveActivity(act.id)}
                      className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary transition-colors"
                      title={isSaved ? 'Remove bookmark' : 'Bookmark activity'}
                    >
                      <span className={`material-symbols-outlined text-[20px] ${isSaved ? 'text-primary' : ''}`}>
                        {isSaved ? 'bookmark' : 'bookmark_border'}
                      </span>
                    </button>
                  </div>

                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    {act.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                    {act.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">{act.difficulty}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedActivityModal(act)}
                      className="px-3 py-1.5 bg-surface-container text-on-surface font-label-sm text-label-sm rounded-xl hover:bg-surface-container-high transition-colors"
                    >
                      Details
                    </button>
                    {act.category === 'Breathing' ? (
                      <Link
                        to="/breathing"
                        className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-xl hover:bg-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        <span>Start</span>
                      </Link>
                    ) : act.category === 'Journaling' ? (
                      <Link
                        to="/journal"
                        className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-xl hover:bg-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                        <span>Write</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleQuickComplete(act)}
                        className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-xl hover:bg-primary transition-colors flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                        <span>Practice</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedActivities.length === 0 ? (
            <div className="p-12 text-center bg-surface-container-lowest rounded-3xl space-y-3">
              <span className="material-symbols-outlined text-4xl text-outline">bookmark_border</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                No saved activities yet
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm mx-auto">
                Click the bookmark icon on any wellness activity to curate your personal routine list.
              </p>
              <button
                onClick={() => setActiveTab('catalogue')}
                className="px-5 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md"
              >
                Browse Catalogue
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedActivities.map((act) => (
                <div
                  key={act.id}
                  className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      {act.category} • {act.duration_minutes} Mins
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {act.title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{act.description}</p>
                  </div>
                  <div className="pt-2 flex justify-between items-center border-t border-surface-container">
                    <button
                      onClick={() => toggleSaveActivity(act.id)}
                      className="text-error font-label-sm text-label-sm hover:underline"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleQuickComplete(act)}
                      className="px-4 py-1.5 bg-primary-container text-on-primary font-label-sm text-label-sm rounded-xl hover:bg-primary transition-colors"
                    >
                      Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'history' && (
        <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm">
              <thead>
                <tr className="border-b border-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  <th className="pb-3 px-4">Activity</th>
                  <th className="pb-3 px-4">Duration</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Completed At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {activityLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-surface-container-low transition-colors">
                    <td className="py-3 px-4 font-semibold text-on-surface">{log.activity_title}</td>
                    <td className="py-3 px-4 text-on-surface-variant">{log.duration_minutes} mins</td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-xs font-semibold">
                        {log.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant">
                      {new Date(log.completed_at).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Activity Details Modal */}
      {selectedActivityModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl bg-surface-container-lowest p-6 md:p-8 shadow-2xl space-y-6">
            <div className="flex items-start justify-between pb-3 border-b border-surface-container">
              <div>
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-semibold">
                  {selectedActivityModal.category} • {selectedActivityModal.duration_minutes} Mins
                </span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-2">
                  {selectedActivityModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedActivityModal(null)}
                className="p-1 rounded-lg text-on-surface-variant hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              {selectedActivityModal.description}
            </p>

            <div className="space-y-2">
              <span className="font-label-md text-label-md font-semibold text-primary block">Instructions:</span>
              <ul className="space-y-1.5 font-body-sm text-body-sm text-on-surface">
                {selectedActivityModal.instructions.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="font-bold text-primary">{i + 1}.</span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                onClick={() => setSelectedActivityModal(null)}
                className="px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Close
              </button>
              <button
                onClick={() => handleQuickComplete(selectedActivityModal)}
                className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary transition-all shadow-sm"
              >
                Mark as Practiced
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
