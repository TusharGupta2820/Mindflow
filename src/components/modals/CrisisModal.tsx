/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-surface-container-lowest p-5 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-start justify-between pb-4 border-b border-surface-container-highest">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">crisis_alert</span>
            </div>
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-semibold">Immediate Assistance</span>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Emergency & Crisis Support Directory</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[22px]">close</span>
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            MindBloom is a digital wellness platform designed for everyday self-care and habit building. It does not provide medical, clinical, or emergency healthcare services. If you or someone you know is in severe distress, compassionate professional help is free and confidential 24/7.
          </p>
        </div>

        <div className="space-y-3">
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">Kiran Mental Health Helpline (India)</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Govt. of India 24/7 National Mental Health Toll-Free</span>
            </div>
            <a
              href="tel:18005990019"
              className="px-4 py-2 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md text-center hover:bg-primary transition-all"
            >
              1800-599-0019
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">Vandrevala Foundation (India)</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">24/7 Free Emotional Distress Crisis Counselors</span>
            </div>
            <a
              href="tel:+919999666555"
              className="px-4 py-2 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md text-center hover:bg-primary transition-all"
            >
              +91 9999 666 555
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">988 Suicide & Crisis Lifeline (US/Global)</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Call or Text 24/7 Confidential Support</span>
            </div>
            <a
              href="tel:988"
              className="px-4 py-2 bg-error text-on-error rounded-xl font-label-md text-label-md text-center hover:opacity-90 transition-all"
            >
              Call 988
            </a>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="font-label-lg text-label-lg text-on-surface font-semibold block">Tele-MANAS National Cell</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Comprehensive Mental Health Care in 20+ Languages</span>
            </div>
            <a
              href="tel:14416"
              className="px-4 py-2 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md text-center hover:bg-primary transition-all"
            >
              Dial 14416
            </a>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-lg text-label-lg transition-colors"
          >
            I understand, return to app
          </button>
        </div>
      </div>
    </div>
  );
};
