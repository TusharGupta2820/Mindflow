/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar.tsx';
import { DashboardHeader } from './DashboardHeader.tsx';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen">
      {/* Desktop Fixed Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-72 z-50">
        <Sidebar />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-on-surface/40 backdrop-blur-xs"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          <div className="relative z-10 w-72 h-full bg-surface-container-low shadow-2xl">
            <Sidebar onCloseMobile={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Top Fixed Header */}
      <DashboardHeader onToggleSidebar={() => setMobileSidebarOpen(true)} />

      {/* Main App Content */}
      <div className="pl-0 lg:pl-72 pt-16">
        <main className="p-space-md lg:p-space-lg min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
