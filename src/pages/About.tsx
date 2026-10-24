/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const About: React.FC = () => {
  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px]">psychology</span>
          <span>PLATFORM RATIONALE &amp; CLINICAL ARCHITECTURE</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          About MindBloom: Evidence-Based Wellness Design
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          An interactive digital wellness architecture integrating autonomic biofeedback models, affective state tracking, and guilt-free mindfulness routines.
        </p>
      </section>

      {/* Platform Pillars Card */}
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Foundational Focus
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Autonomic Regulation
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Vagus nerve stimulation via paced respiration
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Cognitive Framework
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Circumplex Affect Model
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Multi-axis emotional valence &amp; arousal
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Privacy Standard
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Zero-Ad Sanctuary
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Row-level security with strict user data ownership
            </p>
          </div>

          <div className="space-y-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Domain Specialization
            </span>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Interactive Digital Health
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Psychophysiological UI &amp; Web Architectures
            </p>
          </div>
        </div>
      </div>

      {/* Problem Statement & Literature Gap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">find_in_page</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              The Digital Wellness Gap
            </h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            A comprehensive survey of modern wellness applications reveals an alarming dichotomy: platforms either operate as rigid gamified trackers (employing punitive streak counters and notification anxiety) or as sterile clinical telemetry portals with intimidating diagnostic forms.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Individuals facing high stress workloads frequently abandon these tools due to cognitive overload and privacy apprehensions regarding personal diary data leaking to ad brokers.
          </p>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px]">lightbulb</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              The MindBloom Paradigm
            </h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            MindBloom bridges this void with a unified, state-harmonized sanctuary. We combine real-time respiratory pacing (stimulating the vagus nerve), multi-axis affective mapping (inspired by Russell's circumplex affect model), and client-side encryption.
          </p>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Every component uses generous 8pt grid typography, warm cream and sage tones, and guilt-free momentum mechanics where missed days are recognized as valid rest days.
          </p>
        </div>
      </div>

      {/* 8 Core Specifications Breakdown */}
      <div className="bg-surface-container-lowest p-8 rounded-3xl shadow-sm border border-surface-container space-y-6">
        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
          8 Core Platform Specifications &amp; Design Principles
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 01 // ARCHITECTURAL UNIFICATION</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Synthesize fragmented wellness modules (breathing, journaling, affect tracking) into a synchronized client-state architecture.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 02 // AUTONOMIC RESPIRATION PACING</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Deliver SVG kinetic feedback guides executing 4-4-4-4 Box Breathing and 4-7-8 parasympathetic activation cycles.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 03 // AFFECTIVE GRANULARITY</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Capture multi-dimensional emotion tags and perceived stress scores rather than restrictive binary moods.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 04 // HEURISTIC RECOMMENDATIONS</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Transparent, rule-based recommendation service mapping current tension to micro-interventions with clear rationale.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 05 // COMPASSIONATE MOMENTUM</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Decouple habit logging from punitive streak counters; normalize rest days to reduce performance guilt.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 06 // DATA SOVEREIGNTY &amp; RLS</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Enforce Supabase PostgreSQL Row Level Security policies where users own and control their private reflections.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 07 // NON-CLINICAL THERAPEUTIC TONE</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Empathetic microcopy with clear disclaimers, avoiding psychiatric diagnosis while promoting everyday resilience.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-sm text-label-sm font-mono text-primary font-bold">SPEC 08 // RESPONSIVE PRODUCTION CODE</span>
            <p className="font-body-sm text-body-sm text-on-surface">
              Full-stack implementation in React, Tailwind CSS, Node.js Express REST API, and Recharts data visualization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
