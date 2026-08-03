'use client';

import Link from 'next/link';
import {
  Home,
  Compass,
  Calendar,
  Users,
  Briefcase,
  Bell,
  Award,
  User,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { navItems, campusPulse } from '@/data/dashboardData';

const iconMap: Record<string, React.ElementType> = {
  home: Home,
  compass: Compass,
  calendar: Calendar,
  users: Users,
  briefcase: Briefcase,
  bell: Bell,
  award: Award,
  user: User,
};

export default function Sidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-[#0F172A] sticky top-0 h-screen overflow-y-auto">
      {/* ── Logo ── */}
      <div className="px-6 pt-6 pb-4 border-b border-white/5">
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

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-4" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] ?? Home;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-label={item.label}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative',
                    item.isActive
                      ? 'bg-[#D97706]/15 text-[#D97706]'
                      : 'text-white/45 hover:bg-white/5 hover:text-white/80'
                  )}
                >
                  {item.isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#D97706] rounded-r-full" />
                  )}
                  <Icon
                    size={18}
                    className={cn(
                      'transition-colors duration-200 flex-shrink-0',
                      item.isActive ? 'text-[#D97706]' : 'text-white/30 group-hover:text-white/60'
                    )}
                  />
                  <span className="flex-1 text-[13px]">{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto min-w-[20px] h-5 px-1.5 bg-[#D97706] text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* ── Campus Pulse Widget ── */}
      <div className="mx-3 mb-4 p-4 rounded-xl bg-white/5 border border-white/5 text-white shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full bg-[#D97706]"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          <span className="text-xs font-semibold tracking-wide text-[#D97706] uppercase">
            {campusPulse.label}
          </span>
          <span className="ml-auto text-[10px] font-bold bg-[#D97706] text-white px-1.5 py-0.5 rounded-full">
            LIVE
          </span>
        </div>
        <p className="text-xs text-white/60 mb-2">{campusPulse.status}</p>
        <p className="text-3xl font-extrabold tracking-tight leading-none mb-0.5 text-white">
          {campusPulse.eventsToday}
        </p>
        <p className="text-xs text-white/40 mb-3">events today</p>
        <Link
          href="/explore"
          aria-label="View today's events"
          className="flex items-center gap-1 text-xs font-semibold text-[#D97706] hover:text-[#D97706]/80 transition-colors duration-200 group"
        >
          View Today's Events
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* ── Footer ── */}
      <div className="px-6 pb-5 pt-2 border-t border-white/5">
        <div className="flex items-center gap-2 mb-1.5 mt-3">
          <div className="w-6 h-6 rounded-lg bg-[#D97706] flex items-center justify-center shadow-sm">
            <Zap size={12} className="text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-[8px] font-semibold tracking-widest text-[#A1BCE6]/60 uppercase">Campus</p>
            <p className="text-[10px] font-bold text-white tracking-wider uppercase">Connect</p>
          </div>
        </div>
        <p className="text-[10px] text-white/30">© 2025 All rights reserved.</p>
      </div>
    </aside>
  );
}
