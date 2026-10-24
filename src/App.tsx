/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { WellnessProvider } from './context/WellnessContext.tsx';

import { DashboardLayout } from './components/layout/DashboardLayout.tsx';
import { Landing } from './pages/Landing.tsx';
import { Dashboard } from './pages/Dashboard.tsx';
import { DailyCheckIn } from './pages/DailyCheckIn.tsx';
import { GuidedBreathing } from './pages/GuidedBreathing.tsx';
import { Mindfulness } from './pages/Mindfulness.tsx';
import { Relaxation } from './pages/Relaxation.tsx';
import { Journal } from './pages/Journal.tsx';
import { Activities } from './pages/Activities.tsx';
import { Recommendations } from './pages/Recommendations.tsx';
import { Progress } from './pages/Progress.tsx';
import { HelpResources } from './pages/HelpResources.tsx';
import { Settings } from './pages/Settings.tsx';
import { About } from './pages/About.tsx';
import { Technology } from './pages/Technology.tsx';
import { MoodScanner } from './pages/MoodScanner.tsx';
import { AIChat } from './pages/AIChat.tsx';
import { Login } from './pages/Login.tsx';
import { Register } from './pages/Register.tsx';
import { ForgotPassword } from './pages/ForgotPassword.tsx';
import { Onboarding } from './pages/Onboarding.tsx';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WellnessProvider>
          <Routes>
            {/* Public Entry & Auth Flows */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/onboarding" element={<Onboarding />} />

            {/* Authenticated Application Shell */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/check-in" element={<DailyCheckIn />} />
              <Route path="/mood-scanner" element={<MoodScanner />} />
              <Route path="/scan" element={<Navigate to="/mood-scanner" replace />} />
              <Route path="/chat" element={<AIChat />} />
              <Route path="/ai-companion" element={<Navigate to="/chat" replace />} />
              <Route path="/mindfulness" element={<Mindfulness />} />
              <Route path="/breathing" element={<GuidedBreathing />} />
              <Route path="/relaxation" element={<Relaxation />} />
              <Route path="/journal" element={<Journal />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/recommendations" element={<Recommendations />} />
              <Route path="/progress" element={<Progress />} />
              <Route path="/resources" element={<HelpResources />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/technology" element={<Technology />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </WellnessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
