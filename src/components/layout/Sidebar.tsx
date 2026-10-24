/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.tsx';

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
        <Link to="/" className="flex items-center gap-space-sm pb-space-lg group focus:outline-none">
          <img
            src="https://lh3.googleusercontent.com/aida/AEtjO1X48tiGT6qTsmHWCEzekx2iw-q6tzPvDMd-NBht49EOjm1DrzHcDe43QIXylQhqfPk_ae-F681RQDcwmN67ZdddHwPgswctATnnXixKJxtulZV-IUpQr-mcfSHq8Gj726L9iqJew39A_6lZZFhKcVO-bkwIwnak5fGVt4dQkf91ewv4TNQG0f9zsuJhlNkt3jx07eLJ6h5Qod_tSq8uSqRMsFBXLuROvmL-g7CpDT-Wskwux5IOjTH2AZM"
            alt="MindBloom Logo"
            className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary leading-tight font-semibold">MindBloom</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Interactive Wellness Suite</span>
          </div>
        </Link>

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
            <img
              src={
                user?.avatar_url ||
                'https://lh3.googleusercontent.com/aida-public/AB6AXuDHNwEr1bHhY0Bs0yyHJo0yVbkbnvj9nqOR9LCGfVBYktar69xfcFpaV9hovYmv1qzo_ao3WFWr8hM28GMsKsnfYpt8Wce28oApaXTfSI1IMfyTtB1-TSIxHk29_U1F6EF9C-oxRuFf0MguKUM6lS4DV5k2rQbFPUvoZUCaQMJQ5zgRcIMA6jmOipJuNaOd0kkuidfhL5OuMhSraVVHhL0b94a21swtiU1LaaQuQ15AQDg7oDfQ7cH4'
              }
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover shrink-0"
            />
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
