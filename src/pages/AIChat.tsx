/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, Shield, HeartHandshake, Compass } from 'lucide-react';
import { DashboardChatbot } from '../components/chat/DashboardChatbot.tsx';

export const AIChat: React.FC = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto space-y-4 sm:space-y-space-md pb-28 lg:pb-16 px-1 sm:px-0">
      {/* Ambient background glow */}
      <div className="absolute -top-10 right-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-64 -left-10 w-64 h-64 sm:w-80 sm:h-80 bg-tertiary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Header Banner */}
      <header className="space-y-1.5 max-w-2xl px-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/30 text-on-primary-container font-label-sm text-xs sm:text-sm">
          <Sparkles size={14} className="text-primary animate-pulse shrink-0" />
          <span>Gemini 3.6 Flash Active</span>
        </div>
        <h1 className="text-2xl sm:text-3xl lg:text-headline-lg font-bold text-on-surface tracking-tight leading-tight">
          AI Wellness Companion
        </h1>
        <p className="text-xs sm:text-sm lg:text-body-md text-on-surface-variant leading-relaxed">
          A judgment-free, compassionate conversation partner trained to guide you through somatic grounding, mindful awareness, and emotional regulation.
        </p>
      </header>

      {/* Full Dedicated Chatbot Surface */}
      <div className="w-full">
        <DashboardChatbot className="h-[74vh] sm:h-[680px] max-h-[780px]" />
      </div>

      {/* Helpful Guidance Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container/60 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5">
            <HeartHandshake size={16} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">Emotional Grounding</h4>
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5 leading-snug">
              Ask for 5-4-3-2-1 sensory awareness or physiological sigh breathwork.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container/60 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 mt-0.5">
            <Compass size={16} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">Cognitive Reframing</h4>
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5 leading-snug">
              Unpack academic overwhelm, social tension, or bedtime racing thoughts.
            </p>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-surface-container-lowest border border-surface-container/60 flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0 mt-0.5">
            <Shield size={16} />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-on-surface">Private &amp; Secure</h4>
            <p className="text-[11px] sm:text-xs text-on-surface-variant mt-0.5 leading-snug">
              Empathetic personal assistant designed for everyday mental wellness.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
