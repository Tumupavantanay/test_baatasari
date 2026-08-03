'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';

interface ClubAdminShellProps {
  children: React.ReactNode;
}

export default function ClubAdminShell({ children }: ClubAdminShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Universal Desktop Sidebar */}
      <Sidebar />

      {/* Main column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Universal Top Header */}
        <Header />

        {/* Page content */}
        <main id="club-admin-main" className="flex-1 overflow-y-auto" aria-label="Club admin content">
          {children}
        </main>
      </div>

      {/* Universal Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
