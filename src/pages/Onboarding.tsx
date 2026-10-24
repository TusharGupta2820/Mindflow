/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export const Onboarding: React.FC = () => {
  const { updatePreferences } = useAuth();
  const navigate = useNavigate();

  const [goals, setGoals] = useState<string[]>(['stress_relief', 'exam_calm']);
  const [preferredActs, setPreferredActs] = useState<string[]>(['box_breathing', 'reflective_journaling']);
  const [duration, setDuration] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const goalOptions = [
    { id: 'stress_relief', label: 'Stress Mitigation', icon: 'spa' },
    { id: 'exam_calm', label: 'Pressure & Stress Composure', icon: 'psychology' },
    { id: 'focus_enhancement', label: 'Midday Cognitive Focus', icon: 'center_focus_strong' },
    { id: 'emotional_regulation', label: 'Emotional Balance & Affect', icon: 'mood' },
    { id: 'somatic_ease', label: 'Somatic Muscle Release', icon: 'accessibility_new' },
  ];

  const activityOptions = [
    { id: 'box_breathing', label: '4-4-4-4 Box Respiration', icon: 'air' },
    { id: 'relaxing_478', label: '4-7-8 Parasympathetic Vagal Breath', icon: 'bedtime' },
    { id: 'reflective_journaling', label: 'Cognitive Reframing Diary', icon: 'edit_note' },
    { id: 'somatic_grounding', label: '5-4-3-2-1 Sensory Grounding', icon: 'touch_app' },
    { id: 'pmr_relaxation', label: 'Progressive Muscle Relaxation', icon: 'fitness_center' },
  ];

  const toggleGoal = (id: string) => {
    setGoals((prev) => (prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]));
  };

  const toggleActivity = (id: string) => {
    setPreferredActs((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  };

  const handleFinish = async () => {
    setLoading(true);
    try {
      await updatePreferences({
        wellness_goals: goals,
        preferred_activities: preferredActs,
        preferred_session_duration: duration,
        reminders_enabled: true,
      });
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-surface-container-lowest rounded-3xl p-6 sm:p-10 shadow-sm border border-surface-container space-y-8">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-primary mx-auto flex items-center justify-center">
            <span className="material-symbols-outlined text-[28px]">spa</span>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-semibold uppercase tracking-wider">
            Personalize Your Sanctuary
          </span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Tailor Your Wellness Rhythm
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
            Select your preferences so MindBloom can tailor gentle recommendations to your daily lifestyle rhythm.
          </p>
        </div>

        {/* Step 1: Goals */}
        <div className="space-y-3">
          <span className="font-label-md text-label-md font-semibold text-on-surface block">
            1. What areas would you like to nurture?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {goalOptions.map((g) => {
              const isSelected = goals.includes(g.id);
              return (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => toggleGoal(g.id)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-tertiary-fixed/60 border-primary text-on-surface shadow-xs font-semibold'
                      : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-primary text-[20px]">{g.icon}</span>
                  <span className="font-label-md text-label-md">{g.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Preferred Exercises */}
        <div className="space-y-3">
          <span className="font-label-md text-label-md font-semibold text-on-surface block">
            2. Preferred mindfulness modalities:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {activityOptions.map((a) => {
              const isSelected = preferredActs.includes(a.id);
              return (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleActivity(a.id)}
                  className={`p-3.5 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-secondary-container/60 border-secondary text-on-surface shadow-xs font-semibold'
                      : 'bg-surface-container-low border-transparent text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  <span className="material-symbols-outlined text-secondary text-[20px]">{a.icon}</span>
                  <span className="font-label-md text-label-md">{a.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Preferred Duration */}
        <div className="space-y-3">
          <span className="font-label-md text-label-md font-semibold text-on-surface block">
            3. Ideal micro-session length:
          </span>
          <div className="grid grid-cols-3 gap-3">
            {[1, 3, 5].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDuration(d)}
                className={`py-3 px-4 rounded-xl text-center font-label-md text-label-md transition-all ${
                  duration === d
                    ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {d} {d === 1 ? 'Minute' : 'Minutes'}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleFinish}
          disabled={loading}
          className="w-full py-4 px-6 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all flex items-center justify-center gap-2"
        >
          <span>{loading ? 'Saving Preferences...' : 'Enter MindBloom'}</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
