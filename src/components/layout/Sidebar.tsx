/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';
import { Logo } from '../ui/Logo.tsx';

interface SidebarProps {
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const { user, profile, logout } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-space-sm px-space-sm py-2.5 rounded-xl transition-all ${
      isActive
        ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_4px_14px_rgba(8,127,140,0.2)]'
        : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`;

  return (
    <aside className="h-full w-72 bg-surface-container-low shadow-[0_1px_8px_rgba(21,40,63,0.04)] flex flex-col justify-between overflow-y-auto">
      <div className="p-space-lg">
        {/* Brand Header */}
        <div className="flex items-center justify-between pb-space-lg">
          <Link to="/" onClick={handleNavClick} className="flex items-center gap-space-sm group focus:outline-none">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <Logo size={32} />
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary leading-tight font-semibold">MindBloom</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Interactive Wellness Suite</span>
            </div>
          </Link>
          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
        </div>

        {/* Section 1: Daily Practice */}
        <div className="mt-space-xs">
          <p className="px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Daily Practice
          </p>
          <nav className="space-y-1 mt-space-xs">
            <NavLink to="/dashboard" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Overview</span>
            </NavLink>
            <NavLink to="/check-in" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">mood</span>
              <span>Daily Check-In</span>
            </NavLink>
            <NavLink to="/mood-scanner" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
              <div className="flex items-center justify-between flex-1">
                <span>AI Mood Scanner</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-bold uppercase">
                  AI
                </span>
              </div>
            </NavLink>
            <NavLink to="/chat" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
              <div className="flex items-center justify-between flex-1">
                <span>AI Chatbot</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-bold uppercase">
                  AI
                </span>
              </div>
            </NavLink>
            <NavLink to="/mindfulness" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">self_improvement</span>
              <span>Mindfulness &amp; Meditation</span>
            </NavLink>
            <NavLink to="/breathing" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">air</span>
              <span>Guided Breathing</span>
            </NavLink>
            <NavLink to="/relaxation" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">spa</span>
              <span>Relaxation Exercises</span>
            </NavLink>
            <NavLink to="/journal" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">edit_note</span>
              <span>Journal &amp; Reflection</span>
            </NavLink>
            <NavLink to="/activities" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">vital_signs</span>
              <span>Wellness &amp; Habits</span>
            </NavLink>
            <NavLink to="/recommendations" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">psychology_alt</span>
              <span>Recommendations</span>
            </NavLink>
            <NavLink to="/progress" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">insights</span>
              <span>Progress &amp; Analytics</span>
            </NavLink>
          </nav>
        </div>

        {/* Section 2: Platform & Research */}
        <div className="mt-space-lg">
          <p className="px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Platform &amp; Research
          </p>
          <nav className="space-y-1 mt-space-xs">
            <NavLink to="/technology" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">hub</span>
              <span>Platform Architecture</span>
            </NavLink>
            <NavLink to="/about" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
              <span>Clinical Rationale &amp; Survey</span>
            </NavLink>
          </nav>
        </div>

        {/* Section 3: Support & System */}
        <div className="mt-space-lg">
          <p className="px-space-sm py-space-xs font-label-sm text-label-sm uppercase tracking-wider text-outline font-semibold">
            Support &amp; System
          </p>
          <nav className="space-y-1 mt-space-xs">
            <NavLink to="/resources" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">support</span>
              <span>Help &amp; Resources</span>
            </NavLink>
            <NavLink to="/settings" onClick={handleNavClick} className={navItemClass}>
              <span className="material-symbols-outlined text-[20px]">settings</span>
              <span>Settings</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* User Profile Card at Bottom */}
      <div className="p-space-md m-space-sm rounded-xl bg-surface-container">
        <div className="flex items-center justify-between">
          <Link to="/settings" className="flex items-center gap-space-sm min-w-0 group">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center shrink-0 text-sm">
                {(profile?.full_name || user?.full_name || 'A')[0]}
              </div>
            )}
            <div className="flex flex-col min-w-0">
              <span className="font-label-lg text-label-lg text-on-surface truncate group-hover:text-primary transition-colors">
                {profile?.full_name || user?.full_name || 'Aria Chen'}
              </span>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant truncate">
                  Feeling Balanced
                </span>
              </div>
            </div>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            title="Sign Out / Switch Session"
            className="p-1.5 text-on-surface-variant hover:text-error hover:bg-surface-container-high rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
