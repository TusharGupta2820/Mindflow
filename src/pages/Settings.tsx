/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.tsx';
import { useWellness } from '../context/WellnessContext.tsx';

export const Settings: React.FC = () => {
  const { profile, preferences, updateProfile, updatePreferences, deleteAccount } = useAuth();
  const { moods, journals, activityLogs } = useWellness();

  const [fullName, setFullName] = useState<string>(profile?.full_name || 'Aria Chen');
  const [department, setDepartment] = useState<string>(
    profile?.department || 'Focus & Cognitive Resilience'
  );
  const [preferredDuration, setPreferredDuration] = useState<number>(
    preferences?.preferred_session_duration || 5
  );
  const [reminders, setReminders] = useState<boolean>(preferences?.reminders_enabled ?? true);
  const [audioCues, setAudioCues] = useState<boolean>(preferences?.audio_cues_enabled ?? true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(preferences?.reduced_motion ?? false);

  const [savedNotice, setSavedNotice] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({ full_name: fullName, department });
    await updatePreferences({
      preferred_session_duration: preferredDuration,
      reminders_enabled: reminders,
      audio_cues_enabled: audioCues,
      reduced_motion: reducedMotion,
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleExportData = () => {
    const exportBundle = {
      userProfile: profile,
      preferences,
      moodHistory: moods,
      journalReflections: journals,
      activityLogs,
      exportedAt: new Date().toISOString(),
      platform: 'MindBloom Digital Wellness Sanctuary',
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportBundle, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mindbloom_wellness_export_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleConfirmDelete = async () => {
    await deleteAccount();
    window.location.href = '/';
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto space-y-8 pb-16">
      <section className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px]">settings</span>
          <span>CONFIGURATION &amp; PRIVACY</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Settings &amp; Data Sovereignty
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Control your wellness preferences, customize your user profile, and manage data sovereignty.
        </p>
      </section>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span>Preferences and profile updated successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container space-y-6">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold pb-2 border-b border-surface-container">
          User Profile
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block">
              Role / Wellness Focus
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>
        </div>

        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold pt-4 pb-2 border-b border-surface-container">
          Practice &amp; Accessibility Preferences
        </h3>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">
                Preferred Practice Duration
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Default timer length for breathing cycles and audio meditations
              </span>
            </div>
            <select
              value={preferredDuration}
              onChange={(e) => setPreferredDuration(Number(e.target.value))}
              className="p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value={1}>1 Minute (Micro-Reset)</option>
              <option value={3}>3 Minutes (Standard)</option>
              <option value={5}>5 Minutes (Deep Breath)</option>
              <option value={10}>10 Minutes (Full Scan)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">
                Gentle Midday Reminders
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Optional encouragement prompt before afternoon lectures (no guilt streaks)
              </span>
            </div>
            <input
              type="checkbox"
              checked={reminders}
              onChange={(e) => setReminders(e.target.checked)}
              className="w-5 h-5 accent-primary rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">
                Audio Cues &amp; Ambient Rain
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Soothing background white noise during guided breathing
              </span>
            </div>
            <input
              type="checkbox"
              checked={audioCues}
              onChange={(e) => setAudioCues(e.target.checked)}
              className="w-5 h-5 accent-primary rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">
                Reduced Motion Mode
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Replaces pulsating concentric scaling with text-only sensory cues
              </span>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              className="w-5 h-5 accent-primary rounded cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all"
          >
            Save Preferences
          </button>
        </div>
      </form>

      {/* Data Sovereignty & Export */}
      <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container space-y-6">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold pb-2 border-b border-surface-container">
          Data Sovereignty &amp; Privacy Control
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low">
          <div>
            <span className="font-label-lg text-label-lg text-on-surface font-semibold block">
              Export All Personal Reflections &amp; History
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Download complete JSON archive of mood logs, diary entries, and practice stats
            </span>
          </div>
          <button
            onClick={handleExportData}
            className="px-5 py-2.5 rounded-xl bg-surface-container-highest hover:bg-surface-variant text-on-surface font-label-md text-label-md transition-colors flex items-center gap-1.5 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Archive</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-error-container/20 border border-error/20">
          <div>
            <span className="font-label-lg text-label-lg text-error font-semibold block">
              Permanently Erase All Data
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Wipe all private mood checks, journal entries, and personal preferences from the system
            </span>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="px-5 py-2.5 rounded-xl bg-error text-on-error font-label-md text-label-md hover:opacity-90 transition-opacity shrink-0"
          >
            Erase Account &amp; Data
          </button>
        </div>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-3xl bg-surface-container-lowest p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-full bg-error-container text-error mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Erase all wellness data?
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              This will irreversibly delete all private journals, mood records, and account settings.
            </p>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-error text-on-error font-label-md text-label-md"
              >
                Yes, Erase All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
