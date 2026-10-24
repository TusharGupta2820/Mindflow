/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext.tsx';

export const Relaxation: React.FC = () => {
  const { completeActivity } = useWellness();
  const [activeTab, setActiveTab] = useState<'grounding' | 'pmr'>('grounding');

  // 5-4-3-2-1 Grounding State
  const [groundingStep, setGroundingStep] = useState<number>(0);
  const [groundingCompleted, setGroundingCompleted] = useState<boolean>(false);

  const groundingSteps = [
    {
      num: 5,
      sense: 'See',
      title: 'Acknowledge 5 things you can see around you',
      prompt: 'Look at the subtle texture of your desk, the play of daylight on the wall, or an object nearby.',
      icon: 'visibility',
      example: 'A pen, the laptop screen bezel, sunlight on the floor, a bookshelf, a window frame.',
    },
    {
      num: 4,
      sense: 'Touch',
      title: 'Acknowledge 4 things you can physically feel',
      prompt: 'Notice the contact points between your feet and the ground, the texture of your clothes, or the ambient temperature.',
      icon: 'touch_app',
      example: 'Soles on the floor, fabric on shoulders, coolness of the desk, hair against forehead.',
    },
    {
      num: 3,
      sense: 'Hear',
      title: 'Acknowledge 3 subtle sounds you can hear',
      prompt: 'Listen past the obvious sounds. Can you hear a distant fan, passing leaves, or your own breath?',
      icon: 'hearing',
      example: 'Computer fan hum, birds outside the window, distant conversation in hallway.',
    },
    {
      num: 2,
      sense: 'Smell',
      title: 'Acknowledge 2 scents you can identify',
      prompt: 'Breathe softly through your nose. Notice the aroma of a warm beverage, clean linen, or fresh air.',
      icon: 'air',
      example: 'Fresh morning breeze, brewed coffee or tea aroma.',
    },
    {
      num: 1,
      sense: 'Taste',
      title: 'Acknowledge 1 sensation of taste or appreciation',
      prompt: 'Notice the lingering taste in your mouth, or simply savor a gentle breath of gratitude for your presence right now.',
      icon: 'sentiment_satisfied',
      example: 'Hint of mint, water, or deep quiet relief.',
    },
  ];

  // PMR State
  const [pmrStep, setPmrStep] = useState<number>(0);
  const [pmrPhase, setPmrPhase] = useState<'Tense' | 'Release'>('Tense');
  const [pmrTimer, setPmrTimer] = useState<number>(5);
  const [pmrActive, setPmrActive] = useState<boolean>(false);
  const [pmrDone, setPmrDone] = useState<boolean>(false);

  const pmrSteps = [
    { title: 'Feet & Toes', instructions: 'Curl your toes tightly downward. Hold tension across both feet.' },
    { title: 'Calves & Thighs', instructions: 'Tighten your calf muscles and press knees together gently.' },
    { title: 'Abdomen & Core', instructions: 'Draw your belly button inward toward your spine, tensing core muscles.' },
    { title: 'Hands & Arms', instructions: 'Clench both hands into firm fists and flex your forearms.' },
    { title: 'Shoulders & Neck', instructions: 'Shrug your shoulders upwards towards your ears, holding the tightness.' },
    { title: 'Face & Forehead', instructions: 'Scrunch up your facial muscles, furrow brows, and clench jaw softly.' },
  ];

  const handleNextGrounding = () => {
    if (groundingStep < groundingSteps.length - 1) {
      setGroundingStep((prev) => prev + 1);
    } else {
      setGroundingCompleted(true);
      completeActivity('act-004', 6, 'Completed 5-4-3-2-1 Grounding');
    }
  };

  const handleStartPmr = () => {
    setPmrActive(true);
    setPmrDone(false);
    setPmrStep(0);
    setPmrPhase('Tense');
    setPmrTimer(5);
  };

  React.useEffect(() => {
    if (!pmrActive || pmrDone) return;

    const interval = setInterval(() => {
      setPmrTimer((prev) => {
        if (prev <= 1) {
          if (pmrPhase === 'Tense') {
            setPmrPhase('Release');
            return 8; // 8s release & relax
          } else {
            if (pmrStep < pmrSteps.length - 1) {
              setPmrStep((s) => s + 1);
              setPmrPhase('Tense');
              return 5;
            } else {
              setPmrDone(true);
              setPmrActive(false);
              completeActivity('act-005', 8, 'Completed Progressive Muscle Relaxation');
              return 0;
            }
          }
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [pmrActive, pmrDone, pmrPhase, pmrStep, completeActivity]);

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px] text-primary">spa</span>
          <span>SOMATIC NERVOUS REGULATION</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Relaxation &amp; Somatic Grounding
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
          Clinical somatic techniques to interrupt anxiety feedback loops and discharge physical tension through sensory anchoring and neuromuscular release.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex items-center gap-3 p-1.5 rounded-2xl bg-surface-container-high w-fit">
        <button
          onClick={() => setActiveTab('grounding')}
          className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
            activeTab === 'grounding'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          5-4-3-2-1 Sensory Grounding
        </button>
        <button
          onClick={() => setActiveTab('pmr')}
          className={`px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all ${
            activeTab === 'pmr'
              ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          Progressive Muscle Relaxation (PMR)
        </button>
      </div>

      {/* 5-4-3-2-1 Interactive Canvas */}
      {activeTab === 'grounding' && (
        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-sm border border-surface-container space-y-8 animate-in fade-in duration-300">
          {!groundingCompleted ? (
            <div className="max-w-2xl mx-auto space-y-8 text-center">
              {/* Progress counter */}
              <div className="flex items-center justify-center gap-2">
                {groundingSteps.map((step, idx) => (
                  <div
                    key={step.num}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === groundingStep
                        ? 'w-12 bg-primary-container'
                        : idx < groundingStep
                        ? 'w-6 bg-tertiary-fixed'
                        : 'w-6 bg-surface-container-high'
                    }`}
                  ></div>
                ))}
              </div>

              {/* Step Hero */}
              <div className="w-24 h-24 mx-auto rounded-full bg-tertiary-fixed text-primary flex items-center justify-center shadow-sm">
                <span className="font-display-lg text-headline-lg font-bold">
                  {groundingSteps[groundingStep].num}
                </span>
              </div>

              <div className="space-y-3">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-semibold">
                  Step {5 - groundingSteps[groundingStep].num + 1} of 5 • {groundingSteps[groundingStep].sense}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  {groundingSteps[groundingStep].title}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
                  {groundingSteps[groundingStep].prompt}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low max-w-lg mx-auto text-left">
                <span className="font-label-sm text-label-sm text-primary font-semibold block mb-1">
                  Gentle Examples:
                </span>
                <p className="font-body-sm text-body-sm text-on-surface italic">
                  {groundingSteps[groundingStep].example}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-center gap-4">
                {groundingStep > 0 && (
                  <button
                    onClick={() => setGroundingStep((p) => p - 1)}
                    className="px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  onClick={handleNextGrounding}
                  className="px-8 py-3.5 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all flex items-center gap-2"
                >
                  <span>{groundingStep === 4 ? 'Complete Grounding' : 'I Notice This • Next'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-tertiary-fixed text-primary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[44px]">verified</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">Grounding Complete</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                You have redirected conscious attention from acute mental chatter into your tactile physical surroundings. Your nervous system is recalibrating toward calm.
              </p>
              <button
                onClick={() => {
                  setGroundingStep(0);
                  setGroundingCompleted(false);
                }}
                className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all"
              >
                Restart Grounding
              </button>
            </div>
          )}
        </div>
      )}

      {/* PMR Interactive Canvas */}
      {activeTab === 'pmr' && (
        <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-12 shadow-sm border border-surface-container space-y-8 animate-in fade-in duration-300">
          {!pmrActive && !pmrDone && (
            <div className="max-w-2xl mx-auto space-y-6 text-center">
              <div className="w-20 h-20 rounded-full bg-secondary-container text-secondary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[36px]">fitness_center</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">
                Progressive Muscle Relaxation (PMR)
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                PMR trains your nervous system to distinguish between chronic somatic tightness and true neuromuscular relaxation. You will actively tense each muscle group for 5 seconds, followed by 8 seconds of intentional complete release.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left pt-2">
                {pmrSteps.map((s, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-surface-container-low space-y-1">
                    <span className="font-label-sm text-label-sm text-primary font-semibold">0{i + 1}</span>
                    <h4 className="font-label-md text-label-md font-semibold text-on-surface">{s.title}</h4>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStartPmr}
                  className="px-8 py-3.5 rounded-2xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:bg-primary transition-all flex items-center gap-2 mx-auto"
                >
                  <span className="material-symbols-outlined text-[20px]">play_arrow</span>
                  <span>Begin Guided PMR (8 Mins)</span>
                </button>
              </div>
            </div>
          )}

          {pmrActive && (
            <div className="max-w-xl mx-auto space-y-8 text-center">
              <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                <span>Muscle Group {pmrStep + 1} of 6</span>
                <span className="font-semibold text-primary">{pmrSteps[pmrStep].title}</span>
              </div>

              {/* Animated Pacing Orb */}
              <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
                <div
                  className={`absolute inset-0 rounded-full transition-all duration-1000 ${
                    pmrPhase === 'Tense'
                      ? 'bg-error-container/40 scale-110'
                      : 'bg-tertiary-fixed scale-90'
                  }`}
                ></div>
                <div
                  className={`relative w-36 h-36 rounded-full flex flex-col items-center justify-center text-on-primary shadow-lg transition-colors ${
                    pmrPhase === 'Tense' ? 'bg-primary-container' : 'bg-primary'
                  }`}
                >
                  <span className="font-headline-sm text-headline-sm font-bold uppercase tracking-wider">
                    {pmrPhase}
                  </span>
                  <span className="font-display-lg text-display-lg font-bold leading-none mt-1">
                    {pmrTimer}s
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
                  {pmrSteps[pmrStep].title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto">
                  {pmrPhase === 'Tense'
                    ? pmrSteps[pmrStep].instructions
                    : 'Exhale completely. Let the muscles drop like heavy, warm sand. Feel the contrast.'}
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-4">
                <button
                  onClick={() => setPmrActive(false)}
                  className="px-5 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors"
                >
                  Pause Session
                </button>
              </div>
            </div>
          )}

          {pmrDone && (
            <div className="max-w-md mx-auto text-center py-8 space-y-6">
              <div className="w-20 h-20 rounded-full bg-tertiary-fixed text-primary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[44px]">done_all</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">PMR Cycle Complete</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                You’ve discharged chronic tension across all 6 core muscle groups. Allow your breathing to remain natural and unforced.
              </p>
              <button
                onClick={() => setPmrDone(false)}
                className="px-6 py-3 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary transition-all"
              >
                Return to Menu
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
