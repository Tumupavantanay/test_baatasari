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
    <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-card border-r border-border sticky top-0 h-screen overflow-y-auto">
      {/* ── Logo ── */}
      <div className="px-6 pt-6 pb-4">
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Campus Connect Home">
          <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center shadow-md group-hover:bg-primary transition-colors duration-200">
            <Zap size={18} className="text-primary group-hover:text-foreground transition-colors duration-200" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Campus</p>
            <p className="text-sm font-bold text-foreground tracking-wider uppercase">Connect</p>
          </div>
        </Link>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 px-3 py-2" aria-label="Main navigation">
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
                      ? 'bg-primary/20 text-foreground font-semibold'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  )}
                >
                  {item.isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
                  )}
                  <Icon
                    size={18}
                    className={cn(
                      'transition-colors duration-200',
                      item.isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge ? (
                    <span className="ml-auto min-w-[20px] h-5 px-1.5 bg-destructive text-destructive-foreground text-xs font-bold rounded-full flex items-center justify-center">
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
      <div className="mx-3 mb-4 p-4 rounded-2xl bg-foreground text-background">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="w-2 h-2 rounded-full bg-primary"
            style={{ animation: 'pulse-dot 2s ease-in-out infinite' }}
          />
          <span className="text-xs font-semibold tracking-wide text-primary uppercase">
            {campusPulse.label}
          </span>
          <span className="ml-auto text-[10px] font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full">
            LIVE
          </span>
        </div>
        <p className="text-xs text-primary/80 mb-2">{campusPulse.status}</p>
        <p className="text-3xl font-extrabold tracking-tight leading-none mb-0.5">
          {campusPulse.eventsToday}
        </p>
        <p className="text-xs text-background/60 mb-3">events today</p>
        <Link
          href="/explore"
          aria-label="View today's events"
          className="flex items-center gap-1 text-xs font-semibold text-primary hover:text-background transition-colors duration-200 group"
        >
          View Today's Events
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </Link>
      </div>

      {/* ── Footer ── */}
      <div className="px-6 pb-5">
        <div className="flex items-center gap-2 mb-1.5">
          <div className="w-6 h-6 rounded-lg bg-foreground flex items-center justify-center">
            <Zap size={12} className="text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">Campus</p>
            <p className="text-[10px] font-bold text-foreground tracking-wider uppercase">Connect</p>
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground">© 2025 All rights reserved.</p>
      </div>
    </aside>
  );
}
