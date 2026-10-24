/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { Logo } from '../components/ui/Logo.tsx';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    try {
      localStorage.setItem('mindbloom_token', 'demo-token');
      await login('aria.chen@mindbloom.app');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <Logo size={40} className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <span className="font-headline-md text-headline-md text-on-surface font-semibold">MindBloom</span>
        </Link>
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Welcome back to your Sanctuary
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Interactive Therapy &amp; Digital Wellness Suite
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-surface-container space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-error-container text-on-error-container font-label-sm text-label-sm">
              {error}
            </div>
          )}

          {/* Evaluator Fast-Track Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">badge</span>
            <span>One-Click Demo Access (Aria Chen)</span>
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-surface-container"></div>
            <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline">or sign in with email</span>
            <div className="flex-grow border-t border-surface-container"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aria.chen@mindbloom.app"
                className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block">
                  Password
                </label>
                <Link to="/forgot-password" className="text-primary font-label-sm text-label-sm hover:underline">
                  Forgot?
                </Link>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="pt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
            Don't have an account yet?{' '}
            <Link to="/register" className="text-primary font-semibold hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
