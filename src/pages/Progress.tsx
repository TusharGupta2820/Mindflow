/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useWellness } from '../context/WellnessContext.tsx';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

export const Progress: React.FC = () => {
  const { moods, activityLogs, journals, summary } = useWellness();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');

  // Weekly data mapping for Recharts
  const weeklyData = [
    { day: 'Mon', score: 4, mood: 'Good', stress: 2 },
    { day: 'Tue', score: 3, mood: 'Neutral', stress: 3 },
    { day: 'Wed', score: 2, mood: 'Low', stress: 4 },
    { day: 'Thu', score: 4, mood: 'Good', stress: 2 },
    { day: 'Fri', score: 5, mood: 'Great', stress: 1 },
    { day: 'Sat', score: 4, mood: 'Good', stress: 2 },
    { day: 'Sun', score: 5, mood: 'Great', stress: 1 },
  ];

  // Mood distribution data
  const moodDistributionData = [
    { name: 'Very Low', count: 1, color: '#4D5F79' },
    { name: 'Low', count: 2, color: '#CEE1FF' },
    { name: 'Neutral', count: 4, color: '#E4E2DD' },
    { name: 'Good', count: 12, color: '#D4E7DF' },
    { name: 'Great', count: 6, color: '#087F8C' },
  ];

  const activityBreakdown = [
    { category: 'Breathing', sessions: 14, minutes: 62 },
    { category: 'Mindfulness', sessions: 6, minutes: 54 },
    { category: 'Relaxation', sessions: 5, minutes: 38 },
    { category: 'Journaling', sessions: 8, minutes: 45 },
  ];

  return (
    <div className="relative w-full max-w-7xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-semibold">
            <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
            <span>AFFECTIVE LONGITUDINAL TRAJECTORY</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Progress &amp; Wellness Analytics
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Visualize your longitudinal emotional rhythm, stress recovery velocity, and mindful practice volume over time.
          </p>
        </div>

        {/* Time range switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-surface-container-high self-start md:self-auto">
          <button
            onClick={() => setTimeRange('7d')}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              timeRange === '7d'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Past 7 Days
          </button>
          <button
            onClick={() => setTimeRange('30d')}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              timeRange === '30d'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Past Month
          </button>
          <button
            onClick={() => setTimeRange('90d')}
            className={`px-4 py-2 rounded-xl font-label-md text-label-md transition-all ${
              timeRange === '90d'
                ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Past 90 Days
          </button>
        </div>
      </section>

      {/* Top 4 Metric Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Logging Consistency
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-headline-lg font-bold text-primary">83%</span>
            <span className="font-label-sm text-label-sm text-tertiary font-semibold">+6% vs benchmark</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant block">5 check-ins recorded this week</span>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Mindful Minutes
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-headline-lg font-bold text-secondary">
              {summary?.totalMinutesPracticed || 45}m
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">total practiced</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant block">Across breathing &amp; body scans</span>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Average Stress Metric
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-headline-lg font-bold text-tertiary">2.1</span>
            <span className="font-label-sm text-label-sm text-outline">/ 5.0 (Manageable)</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant block">-18% acute tension drop</span>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-1">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Reflections Logged
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-display-lg text-headline-lg font-bold text-on-surface">
              {journals.length || 2}
            </span>
            <span className="font-label-sm text-label-sm text-primary font-semibold">Private &amp; Encrypted</span>
          </div>
          <span className="font-body-sm text-body-sm text-on-surface-variant block">Written during decompression</span>
        </div>
      </div>

      {/* Chart 1: Weekly Mood Horizon Line Chart */}
      <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-surface-container space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
              Valence Trajectory
            </span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Weekly Affect Oscillation
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary bg-primary-fixed/30 px-3 py-1 rounded-full font-semibold">
            1 = Very Low • 5 = Great
          </span>
        </div>

        <div className="w-full h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E4E2DD" />
              <XAxis dataKey="day" stroke="#6E797B" />
              <YAxis domain={[1, 5]} stroke="#6E797B" ticks={[1, 2, 3, 4, 5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  borderColor: '#E4E2DD',
                }}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#00646F"
                strokeWidth={3.5}
                activeDot={{ r: 8, fill: '#087F8C' }}
                dot={{ r: 5, fill: '#ffffff', stroke: '#00646F', strokeWidth: 2.5 }}
                name="Emotional Valence"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Visual Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 2: Practice Sessions by Category */}
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Practice Volume by Module
            </h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Minutes completed</span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activityBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E4E2DD" />
                <XAxis dataKey="category" stroke="#6E797B" />
                <YAxis stroke="#6E797B" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    borderColor: '#E4E2DD',
                  }}
                />
                <Bar dataKey="minutes" fill="#087F8C" radius={[8, 8, 0, 0]} name="Minutes" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Emotional Granularity Distribution */}
        <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-surface-container space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Affect Distribution Breakdown
            </h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Overall balance</span>
          </div>

          <div className="w-full h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="count"
                >
                  {moodDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '16px',
                    borderColor: '#E4E2DD',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-label-sm font-label-sm">
            {moodDistributionData.map((m) => (
              <div key={m.name} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: m.color }}></span>
                <span>{m.name} ({m.count})</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
