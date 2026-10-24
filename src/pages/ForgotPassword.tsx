/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../components/ui/Logo.tsx';

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link to="/" className="inline-flex items-center gap-2 group">
          <Logo size={40} className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <span className="font-headline-md text-headline-md text-on-surface font-semibold">MindBloom</span>
        </Link>
        <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Password Recovery
        </h2>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Enter your registered email address to receive recovery instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-surface-container-lowest py-8 px-6 shadow-sm rounded-3xl sm:px-10 border border-surface-container space-y-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant block mb-1">
                  Registered Email
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

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-sm hover:bg-primary transition-all flex items-center justify-center gap-2"
              >
                <span>Send Recovery Link</span>
                <span className="material-symbols-outlined text-[18px]">mail</span>
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4 py-4">
              <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-primary mx-auto flex items-center justify-center">
                <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Recovery Email Dispatched
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                If an account exists for <strong>{email}</strong>, a secure one-time recovery link has been sent. Check your inbox and spam folder.
              </p>
            </div>
          )}

          <div className="pt-2 text-center font-label-sm text-label-sm text-on-surface-variant">
            Remembered your password?{' '}
            <Link to="/login" className="text-primary font-semibold hover:underline">
              Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
