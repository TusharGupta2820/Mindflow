/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useWellness } from '../../context/WellnessContext.tsx';

interface QuickResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickResetModal: React.FC<QuickResetModalProps> = ({ isOpen, onClose }) => {
  const { completeActivity } = useWellness();
  const [phase, setPhase] = useState<'INHALE' | 'HOLD' | 'EXHALE' | 'REST'>('INHALE');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(4);
  const [totalSeconds, setTotalSeconds] = useState<number>(120); // 2 minutes
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setIsActive(true);
      setIsCompleted(false);
      setTotalSeconds(120);
      setPhase('INHALE');
      setSecondsRemaining(4);
      return;
    }

    if (!isActive || isCompleted) return;

    const timer = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          setIsCompleted(true);
          completeActivity('act-001', 2, 'Completed 2-minute quick reset');
          return 0;
        }
        return prev - 1;
      });

      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setPhase((currentPhase) => {
            switch (currentPhase) {
              case 'INHALE':
                return 'HOLD';
              case 'HOLD':
                return 'EXHALE';
              case 'EXHALE':
                return 'REST';
              case 'REST':
                return 'INHALE';
            }
          });
          return 4;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isActive, isCompleted, completeActivity]);

  if (!isOpen) return null;

  const getCue = () => {
    switch (phase) {
      case 'INHALE':
        return 'Inhale slowly through your nose... expanding lungs.';
      case 'HOLD':
        return 'Hold softly with relaxed shoulders.';
      case 'EXHALE':
        return 'Gently exhale all tension through your mouth.';
      case 'REST':
        return 'Rest in peaceful quiet stillness.';
    }
  };

  const getScale = () => {
    switch (phase) {
      case 'INHALE':
      case 'HOLD':
        return 'scale-125';
      case 'EXHALE':
      case 'REST':
        return 'scale-95';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-lowest p-5 sm:p-8 shadow-2xl flex flex-col items-center text-center space-y-6">
        <div className="w-full flex items-center justify-between pb-3 border-b border-surface-container-highest">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
            <span className="font-label-md text-label-md font-semibold text-primary">2-Minute Mindful Reset</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {!isCompleted ? (
          <>
            <div className="relative w-48 h-48 my-4 flex items-center justify-center">
              <div
                className={`absolute w-44 h-44 rounded-full bg-primary-fixed/30 transition-transform duration-1000 ease-in-out ${getScale()}`}
              ></div>
              <div
                className={`absolute w-36 h-36 rounded-full bg-primary-container/20 transition-transform duration-1000 ease-in-out ${getScale()}`}
              ></div>
              <div className="relative w-28 h-28 rounded-full bg-primary-container text-on-primary flex flex-col items-center justify-center shadow-lg z-10">
                <span className="font-label-md text-label-md font-bold uppercase tracking-wider">{phase}</span>
                <span className="font-display-lg text-headline-lg font-bold leading-none mt-1">{secondsRemaining}s</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-surface-container-low w-full max-w-sm">
              <p className="font-body-md text-body-md text-on-surface font-medium">{getCue()}</p>
            </div>

            <div className="flex items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
              <span>Time remaining: {Math.floor(totalSeconds / 60)}:{(totalSeconds % 60).toString().padStart(2, '0')}</span>
              <span>•</span>
              <button
                onClick={() => setIsActive(!isActive)}
                className="text-primary hover:underline font-semibold"
              >
                {isActive ? 'Pause' : 'Resume'}
              </button>
            </div>
          </>
        ) : (
          <div className="py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-primary mx-auto flex items-center justify-center">
              <span className="material-symbols-outlined text-[36px]">check_circle</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Reset Complete</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xs">
              Notice the gentle release in your jaw, neck, and shoulders. You took 2 mindful minutes for your wellness today.
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all"
            >
              Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
