/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flame } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.tsx';
import { CrisisModal } from '../modals/CrisisModal.tsx';

interface DashboardHeaderProps {
  onToggleSidebar?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onToggleSidebar }) => {
  const { user, profile } = useAuth();
  const [showCrisisModal, setShowCrisisModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const firstName = (profile?.full_name || user?.full_name || 'Aria').split(' ')[0];

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(21,40,63,0.04)] z-40 px-3 sm:px-space-md lg:px-space-lg flex items-center justify-between border-b border-surface-container/60">
        <div className="flex items-center gap-2 sm:gap-space-md min-w-0">
          {/* Mobile hamburger toggle */}
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container shrink-0"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-[24px]">menu</span>
          </button>

          <div className="flex flex-col min-w-0">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight truncate">
              Good morning, {firstName}
            </span>
            <span className="hidden sm:inline font-label-sm text-label-sm text-on-surface-variant truncate">
              Wednesday, Oct 24 • Daily Sanctuary
            </span>
          </div>

          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm shadow-xs shrink-0">
            <Flame className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span className="font-semibold">5 Day Streak</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-space-md shrink-0">
          {/* Immediate Support Crisis Action */}
          <button
            onClick={() => setShowCrisisModal(true)}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-error-container text-on-error-container font-label-sm text-label-sm hover:opacity-95 transition-opacity active:scale-95 shadow-xs"
            type="button"
          >
            <span className="material-symbols-outlined text-[16px] text-error">crisis_alert</span>
            <span className="hidden sm:inline font-semibold text-error">Immediate Support</span>
            <span className="sm:hidden font-semibold text-error text-xs">Support</span>
          </button>

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="p-2 rounded-xl text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary-container"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-surface-container-lowest p-4 shadow-xl border border-surface-container-high z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <span className="font-label-md text-label-md font-semibold text-on-surface">Notifications</span>
                  <span className="font-label-sm text-label-sm text-primary">Mark read</span>
                </div>
                <div className="space-y-3 pt-3">
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-primary-container mt-1.5 shrink-0"></span>
                    <div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium leading-snug">
                        Midday Mindful Pause reminder
                      </p>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Recommended for your afternoon reset</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
                    <div>
                      <p className="font-body-sm text-body-sm text-on-surface font-medium leading-snug">
                        5-Day streak milestone reached!
                      </p>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Gentle consistency without pressure</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile Quick Link */}
          <Link to="/settings" className="flex items-center gap-space-xs group">
            {user?.avatar_url ? (
              <img
                src={user.avatar_url}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover group-hover:ring-2 group-hover:ring-primary/40 transition-all"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center shrink-0 text-sm group-hover:ring-2 group-hover:ring-primary/40 transition-all">
                {firstName[0] || 'A'}
              </div>
            )}
            <span className="hidden lg:inline font-label-md text-label-md text-on-surface group-hover:text-primary transition-colors font-medium">
              {firstName}
            </span>
          </Link>
        </div>
      </header>

      <CrisisModal isOpen={showCrisisModal} onClose={() => setShowCrisisModal(false)} />
    </>
  );
};
