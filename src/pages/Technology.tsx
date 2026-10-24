/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Technology: React.FC = () => {
  const apiEndpoints = [
    { method: 'GET', path: '/api/health', desc: 'System health check and platform operational metadata', auth: 'Public' },
    { method: 'GET', path: '/api/profile', desc: "Fetch authenticated user's profile and wellness records", auth: 'Bearer Token' },
    { method: 'PATCH', path: '/api/profile', desc: 'Update profile information and focus preferences', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/preferences', desc: 'Retrieve user wellness goals and UI preferences', auth: 'Bearer Token' },
    { method: 'PUT', path: '/api/preferences', desc: 'Update reminder and audio cue preferences', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/moods', desc: 'Retrieve historical mood check-in records', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/moods/today', desc: "Check if today's primary check-in has been logged", auth: 'Bearer Token' },
    { method: 'POST', path: '/api/moods', desc: 'Create or update daily mood and stress metrics', auth: 'Bearer Token' },
    { method: 'DELETE', path: '/api/moods/:id', desc: 'Remove a specific mood entry', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/journal', desc: 'Retrieve private journal reflections with search/tags filter', auth: 'Bearer Token' },
    { method: 'POST', path: '/api/journal', desc: 'Save a new encrypted journal entry', auth: 'Bearer Token' },
    { method: 'PATCH', path: '/api/journal/:id', desc: 'Update existing journal content or title', auth: 'Bearer Token' },
    { method: 'DELETE', path: '/api/journal/:id', desc: 'Permanently delete private reflection', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/activities', desc: 'Fetch shared catalogue of active wellness activities', auth: 'Public' },
    { method: 'POST', path: '/api/activities/:id/complete', desc: 'Record a completed session in activity_logs', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/activity-logs', desc: 'Retrieve user completed practice session history', auth: 'Bearer Token' },
    { method: 'POST', path: '/api/activities/:id/save', desc: 'Bookmark an activity to personal favorites', auth: 'Bearer Token' },
    { method: 'DELETE', path: '/api/activities/:id/save', desc: 'Remove an activity from favorites', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/recommendations', desc: 'Run rule-based recommendation service matching current state', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/progress/summary', desc: 'Aggregate longitudinal streaks, minutes, and distributions', auth: 'Bearer Token' },
    { method: 'GET', path: '/api/goals', desc: 'Retrieve daily anchors (hydration, mindful pause, reflection)', auth: 'Bearer Token' },
    { method: 'PATCH', path: '/api/goals/:id', desc: 'Update goal progress counters', auth: 'Bearer Token' },
    { method: 'DELETE', path: '/api/account', desc: 'GDPR / sensitive erasure of all user wellness records', auth: 'Bearer Token' },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <section className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
          <span className="material-symbols-outlined text-[16px]">hub</span>
          <span>FULL-STACK SYSTEM ARCHITECTURE</span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Project Architecture &amp; Technology Stack
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
          An end-to-end full-stack web application combining a React SPA frontend, modular Node.js Express REST API, and Supabase PostgreSQL with strict Row Level Security.
        </p>
      </section>

      {/* 3-Tier Layered Architecture Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tier 1: Client Layer */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center font-bold text-xl">
            01
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-semibold">
              Client Layer
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              React SPA + Vite
            </h3>
          </div>
          <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>React Router DOM for seamless sub-second transitions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Tailwind CSS with custom 8pt therapeutic palette</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Recharts for longitudinal affect data visualization</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span>Material Symbols &amp; Lucide icons for semantic clarity</span>
            </li>
          </ul>
        </div>

        {/* Tier 2: Backend Application Layer */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center font-bold text-xl">
            02
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
              Application Layer
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Node.js + Express REST
            </h3>
          </div>
          <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Modular controllers, services, and route handlers</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Token-based authentication &amp; user context middleware</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Transparent rule-based recommendation heuristics</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>CORS &amp; sanitize input protection</span>
            </li>
          </ul>
        </div>

        {/* Tier 3: Database & Security Layer */}
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-primary flex items-center justify-center font-bold text-xl">
            03
          </div>
          <div>
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-semibold">
              Persistence Layer
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Supabase PostgreSQL + RLS
            </h3>
          </div>
          <ul className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Row Level Security policies enforce auth.uid() boundaries</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>B-Tree indexing on (user_id, entry_date, completed_at)</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Zero telemetry leak of private journal contents</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
              <span>Complete SQL migration with seeded activities</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Database Security & RLS Policy Matrix */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-surface-container space-y-6">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
            Security Enforcement
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
            Row Level Security (RLS) Policy Specifications
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Every user table enforces granular PostgreSQL RLS rules ensuring cross-tenant isolation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-md text-label-md font-semibold text-primary block">
              table: profiles
            </span>
            <code className="text-xs bg-surface-container px-2 py-0.5 rounded font-mono text-on-surface block">
              CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-md text-label-md font-semibold text-primary block">
              table: mood_entries
            </span>
            <code className="text-xs bg-surface-container px-2 py-0.5 rounded font-mono text-on-surface block">
              CREATE POLICY "Users manage own moods" ON mood_entries FOR ALL USING (auth.uid() = user_id);
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-md text-label-md font-semibold text-primary block">
              table: journal_entries
            </span>
            <code className="text-xs bg-surface-container px-2 py-0.5 rounded font-mono text-on-surface block">
              CREATE POLICY "Users isolate journal" ON journal_entries FOR ALL USING (auth.uid() = user_id);
            </code>
          </div>

          <div className="p-4 rounded-2xl bg-surface-container-low space-y-1">
            <span className="font-label-md text-label-md font-semibold text-primary block">
              table: wellness_activities
            </span>
            <code className="text-xs bg-surface-container px-2 py-0.5 rounded font-mono text-on-surface block">
              CREATE POLICY "Public catalogue view" ON wellness_activities FOR SELECT USING (is_active = TRUE);
            </code>
          </div>
        </div>
      </div>

      {/* REST API Endpoints Specification Table */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-surface-container space-y-6">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
            API Documentation
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface font-semibold">
            REST Endpoints Catalogue
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
            Comprehensive mapping of all Express routes implemented in <code className="font-mono bg-surface-container px-1 py-0.5 rounded">server/routes/api.routes.ts</code>.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-body-sm text-body-sm">
            <thead>
              <tr className="border-b border-surface-container font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                <th className="pb-3 px-3">Method</th>
                <th className="pb-3 px-3">Route Endpoint</th>
                <th className="pb-3 px-3">Description</th>
                <th className="pb-3 px-3">Auth Scope</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container">
              {apiEndpoints.map((ep, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors">
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-xs font-bold ${
                        ep.method === 'GET'
                          ? 'bg-secondary-container text-on-secondary-container'
                          : ep.method === 'POST'
                          ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                          : ep.method === 'PATCH' || ep.method === 'PUT'
                          ? 'bg-surface-container-high text-on-surface'
                          : 'bg-error-container text-error'
                      }`}
                    >
                      {ep.method}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-primary">{ep.path}</td>
                  <td className="py-2.5 px-3 text-on-surface-variant">{ep.desc}</td>
                  <td className="py-2.5 px-3">
                    <span className="font-label-sm text-xs px-2 py-0.5 rounded-full bg-surface-container text-outline">
                      {ep.auth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
