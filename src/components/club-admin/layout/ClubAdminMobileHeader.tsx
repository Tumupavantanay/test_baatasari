'use client';

import { Menu, Bell, ChevronDown, Zap } from 'lucide-react';
import { adminProfile, currentClub } from '@/data/clubMembersData';

interface ClubAdminMobileHeaderProps {
  onMenuOpen?: () => void;
  notificationCount?: number;
}

export default function ClubAdminMobileHeader({
  onMenuOpen,
  notificationCount = 0,
}: ClubAdminMobileHeaderProps) {
  return (
    <header
      className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E7EB]"
      aria-label="Club admin mobile header"
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Hamburger */}
        <button
          onClick={onMenuOpen}
          aria-label="Open navigation menu"
          className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#F8F6F0] border border-[#E5E7EB] hover:border-[#A1BCE6] transition-all duration-200"
        >
          <Menu size={18} className="text-[#0C1E3C]" />
        </button>

        {/* Brand */}
        <div className="flex items-center gap-2 flex-none">
          <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center">
            <Zap size={15} className="text-[#D97706]" />
          </div>
          <div className="leading-tight">
            <p className="text-[8px] font-semibold tracking-widest text-[#828894] uppercase">
              Campus Connect
            </p>
            <p className="text-[11px] font-bold text-[#0C1E3C] tracking-wider uppercase">
              {currentClub.name}
            </p>
          </div>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Notification Bell */}
        <button
          aria-label={`Notifications${notificationCount > 0 ? ` — ${notificationCount} unread` : ''}`}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-[#F8F6F0] border border-[#E5E7EB] hover:border-[#A1BCE6] transition-all duration-200"
        >
          <Bell size={17} className="text-[#828894]" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center px-1">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Admin Avatar */}
        <button
          aria-label="Admin profile menu"
          className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-xl px-2 py-1.5 transition-all duration-200 hover:border-[#A1BCE6]"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ring-[#D97706]/20"
            style={{ backgroundColor: adminProfile.avatarColor }}
          >
            {adminProfile.avatarInitials}
          </div>
          <ChevronDown size={12} className="text-[#828894]" />
        </button>
      </div>
    </header>
  );
}
