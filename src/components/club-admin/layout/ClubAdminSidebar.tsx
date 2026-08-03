'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserPlus,
  BarChart2,
  CreditCard,
  FolderOpen,
  Settings2,
  Settings,
  LifeBuoy,
  ChevronDown,
  Zap,
  ArrowLeftRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { adminNavItems, adminProfile, currentClub } from '@/data/clubMembersData';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  CalendarDays,
  Users,
  UserPlus,
  BarChart2,
  CreditCard,
  FolderOpen,
  Settings2,
  Settings,
  LifeBuoy,
};

export default function ClubAdminSidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col w-60 min-h-screen bg-[#0F172A] sticky top-0 h-screen overflow-y-auto"
      aria-label="Club admin navigation"
    >
      {/* ── Brand Header ── */}
      <div className="px-5 pt-6 pb-4 border-b border-white/5">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Campus Connect Home">
          <div className="w-8 h-8 rounded-lg bg-[#D97706] flex items-center justify-center shadow-md">
            <Zap size={16} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-[8px] font-semibold tracking-widest text-[#A1BCE6]/60 uppercase">
              Campus Connect
            </p>
            <p className="text-[10px] font-bold text-white tracking-wider uppercase">
              by BAATASARI
            </p>
          </div>
        </Link>
      </div>

      {/* ── Club Switcher ── */}
      <div className="px-3 pt-4 pb-3">
        <button
          aria-label="Switch club"
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="w-7 h-7 rounded-md bg-[#D97706]/20 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[#D97706]">TC</span>
          </div>
          <div className="flex-1 text-left leading-tight overflow-hidden">
            <p className="text-xs font-semibold text-white truncate">{currentClub.name}</p>
            <p className="text-[10px] text-white/40 truncate">{currentClub.university}</p>
          </div>
          <ChevronDown size={13} className="text-white/30 group-hover:text-white/60 transition-colors flex-shrink-0" />
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-1" aria-label="Club admin main navigation">
        <ul className="space-y-0.5">
          {adminNavItems.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={item.isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                    item.isActive
                      ? 'bg-[#D97706]/15 text-[#D97706]'
                      : 'text-white/45 hover:bg-white/5 hover:text-white/80'
                  )}
                >
                  {item.isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#D97706] rounded-r-full" />
                  )}
                  <Icon
                    size={16}
                    className={cn(
                      'transition-colors duration-200 flex-shrink-0',
                      item.isActive ? 'text-[#D97706]' : 'text-white/30 group-hover:text-white/60'
                    )}
                  />
                  <span className="flex-1 text-[13px]">{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto min-w-[18px] h-[18px] px-1 bg-[#D97706] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Bottom Utilities ── */}
      <div className="px-3 pb-5 pt-3 border-t border-white/5 space-y-2.5">
        {/* Switch to Student View */}
        <Link
          href="/"
          aria-label="Switch to student view"
          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200 group"
        >
          <ArrowLeftRight size={14} className="text-white/30 group-hover:text-white/60 transition-colors" />
          Switch to student view
        </Link>

        {/* Admin Profile Card */}
        <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ring-2 ring-[#D97706]/30"
            style={{ backgroundColor: adminProfile.avatarColor }}
          >
            {adminProfile.avatarInitials}
          </div>
          <div className="leading-tight overflow-hidden flex-1">
            <p className="text-xs font-semibold text-white truncate">{adminProfile.name}</p>
            <p className="text-[10px] text-white/40">{adminProfile.role}</p>
          </div>
          <ChevronDown size={12} className="text-white/20 flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}
