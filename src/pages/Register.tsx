/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';

export const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/onboarding');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1X48tiGT6qTsmHWCEzekx2iw-q6tzPvDMd-NBht49EOjm1DrzHcDe43QIXylQhqfPk_ae-F681RQDcwmN67ZdddHwPgswctATnnXixKJxtulZV-IUpQr-mcfSHq8Gj726L9iqJew39A_6lZZFhKcVO-bkwIwnak5fGVt4dQkf91ewv4TNQG0f9zsuJhlNkt3jx07eLJ6h5Qod_tSq8uSqRMsFBXLuROvmL-g7CpDT-Wskwux5IOjTH2AZM"
            alt="MindBloom Logo"
            className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
          />
          <span className="font-headline-md text-headline-md text-on-surface font-semibold">MindBloom</span>
        </Link>
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Create Your Private Sanctuary
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Personalized Digital Mental Wellness &amp; Mindfulness
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-surface-container space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-error-container text-on-error-container font-label-sm text-label-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aria Chen"
                className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

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
              <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low flex items-start gap-2.5 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">lock</span>
              <span>Your reflections remain encrypted with Row Level Security. Passwords are never stored plaintext.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Creating Sanctuary...' : 'Get Started'}</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>

          <div className="pt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
            Already have an account?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
