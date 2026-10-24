import React from 'react';
import { NavLink } from 'react-router-dom';

export const MobileBottomNav: React.FC = () => {
  const navItems = [
    { to: '/dashboard', label: 'Home', icon: 'dashboard' },
    { to: '/check-in', label: 'Check-In', icon: 'favorite' },
    { to: '/breathing', label: 'Breathe', icon: 'air' },
    { to: '/journal', label: 'Journal', icon: 'edit_note' },
    { to: '/activities', label: 'Explore', icon: 'spa' },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container shadow-[0_-4px_20px_rgba(21,40,63,0.06)] px-2 py-1.5 flex items-center justify-around"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
      aria-label="Mobile Navigation"
    >
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-200 select-none ${
              isActive
                ? 'text-primary font-bold scale-105'
                : 'text-on-surface-variant hover:text-on-surface opacity-75'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className={`w-9 h-7 rounded-full flex items-center justify-center transition-colors ${
                  isActive ? 'bg-primary-container/20 text-primary' : ''
                }`}
              >
                <span className={`material-symbols-outlined text-[22px]`}>{item.icon}</span>
              </div>
              <span className="text-[11px] font-medium tracking-tight mt-0.5 leading-none">
                {item.label}
              </span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
