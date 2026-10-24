/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { Logo } from '../ui/Logo.tsx';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-surface-container-low/90 backdrop-blur-md sticky top-0 z-50 border-b border-surface-container transition-all">
      {/* Top Wellness Announcement Bar */}
      <div className="w-full bg-primary-container px-3 sm:px-space-md py-1.5 flex items-center justify-between text-on-primary text-label-sm font-label-sm overflow-hidden">
        <div className="flex items-center gap-2 truncate">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed animate-pulse shrink-0"></span>
          <span className="truncate">MindBloom Sanctuary • Interactive tools for mindful respiration &amp; restorative health</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 opacity-90 shrink-0">
          <span>Private &amp; Secure</span>
          <span>•</span>
          <span className="tracking-wider uppercase font-semibold">Client-Side Sovereignty</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-space-md lg:px-space-lg py-3 flex items-center justify-between">
        {/* Brand Logo + Identity */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <Logo size={40} />
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm tracking-tight text-on-surface leading-tight">MindBloom</span>
            <span className="font-label-sm text-label-sm text-primary tracking-wide font-semibold">Interactive Wellness</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7 text-label-lg font-label-lg text-on-surface-variant">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <a href="/#pillars" className="hover:text-primary transition-colors">Core Pillars</a>
          <a href="/#research-gap" className="hover:text-primary transition-colors">Research Gap</a>
          <a href="/#tools" className="hover:text-primary transition-colors">Wellness Tools</a>
          <Link to="/about" className="hover:text-primary transition-colors">About Project</Link>
          <Link to="/technology" className="hover:text-primary transition-colors">Architecture</Link>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link
              to="/dashboard"
              className="px-5 py-2.5 bg-primary-container text-on-primary hover:bg-primary text-label-lg font-label-lg rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Go to App</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex px-4 py-2 text-label-lg font-label-lg text-primary hover:bg-surface-variant rounded-xl transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/dashboard"
                className="px-5 py-2.5 bg-primary-container text-on-primary hover:bg-primary text-label-lg font-label-lg rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center gap-1.5"
              >
                <span>Live Demo</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-on-surface-variant hover:text-on-surface rounded-xl hover:bg-surface-container transition-colors"
            aria-label="Toggle Navigation"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-surface-container-lowest border-t border-surface-container px-space-md py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface font-label-lg text-label-lg hover:text-primary"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface font-label-lg text-label-lg hover:text-primary"
          >
            About &amp; Research
          </Link>
          <Link
            to="/technology"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface font-label-lg text-label-lg hover:text-primary"
          >
            Project Architecture
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-primary font-label-lg text-label-lg font-semibold"
          >
            Wellness Dashboard
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-on-surface-variant font-label-lg text-label-lg"
          >
            Sign In / Register
          </Link>
        </div>
      )}
    </header>
  );
};
