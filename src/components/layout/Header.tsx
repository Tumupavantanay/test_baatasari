'use client';

import Link from 'next/link';
import { Bell, ChevronDown, Search, Zap } from 'lucide-react';
import { userProfile } from '@/data/dashboardData';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
      {/* ── Desktop Row ── */}
      <div className="hidden lg:flex items-center gap-4 px-6 py-3">
        {/* Left spacer to balance right side */}
        <div className="flex-none w-40" />

        {/* ── Centered Search Bar ── */}
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted border border-border hover:border-primary transition-colors duration-200 group w-full max-w-md">
            <Search
              size={16}
              className="text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0"
            />
            <input
              type="search"
              placeholder="Search events, clubs, people..."
              aria-label="Search events, clubs, and people"
              className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder-muted-foreground"
            />
          </div>
        </div>

        {/* ── Right: Bell + User Card ── */}
        <div className="flex items-center gap-3 flex-none">
          {/* Notification Bell */}
          <button
            aria-label={`Notifications — ${userProfile.unreadNotifications} unread`}
            className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-muted hover:bg-primary/10 border border-border hover:border-primary transition-all duration-200 group"
          >
            <Bell
              size={17}
              className="text-muted-foreground group-hover:text-primary transition-colors duration-200"
            />
            {userProfile.unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
                {userProfile.unreadNotifications}
              </span>
            )}
          </button>

          {/* ── User Profile Card ── */}
          <button
            aria-label="User profile menu"
            className="flex items-center gap-2.5 bg-card border border-border hover:border-primary shadow-sm hover:shadow-md rounded-2xl px-3 py-2 transition-all duration-200 group"
          >
            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-background text-sm font-bold flex-shrink-0 ring-2 ring-primary/30">
              {userProfile.firstName[0]}
            </div>
            {/* Name & Dept */}
            <div className="text-left leading-tight">
              <p className="text-sm font-semibold text-foreground">{userProfile.firstName}</p>
              <p className="text-[11px] text-muted-foreground">
                {userProfile.department} • {userProfile.year}
              </p>
            </div>
            <ChevronDown
              size={14}
              className="text-muted-foreground group-hover:text-foreground transition-colors duration-200 ml-1"
            />
          </button>
        </div>
      </div>

      {/* ── Mobile Row ── */}
      <div className="lg:hidden flex items-center gap-3 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-none" aria-label="Campus Connect Home">
          <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center">
            <Zap size={15} className="text-primary" />
          </div>
          <div className="leading-tight">
            <p className="text-[8px] font-semibold tracking-widest text-muted-foreground uppercase">Campus</p>
            <p className="text-[11px] font-bold text-foreground tracking-wider uppercase">Connect</p>
          </div>
        </Link>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Bell */}
        <button
          aria-label={`Notifications — ${userProfile.unreadNotifications} unread`}
          className="relative w-9 h-9 rounded-xl flex items-center justify-center bg-muted hover:bg-primary/10 border border-border transition-all duration-200"
        >
          <Bell size={17} className="text-muted-foreground" />
          {userProfile.unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] min-h-[18px] bg-destructive text-destructive-foreground text-[9px] font-bold rounded-full flex items-center justify-center px-1">
              {userProfile.unreadNotifications}
            </span>
          )}
        </button>

        {/* User avatar (compact) */}
        <button
          aria-label="User profile menu"
          className="flex items-center gap-2 bg-card border border-border rounded-xl px-2 py-1.5 transition-all duration-200 hover:border-primary"
        >
          <div className="w-7 h-7 rounded-full bg-foreground flex items-center justify-center text-background text-xs font-bold ring-2 ring-primary/30">
            {userProfile.firstName[0]}
          </div>
          <ChevronDown size={12} className="text-muted-foreground" />
        </button>
      </div>

      {/* ── Mobile Search Bar ── */}
      <div className="lg:hidden px-4 pb-3">
        <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted border border-border hover:border-primary transition-colors duration-200 group">
          <Search size={15} className="text-muted-foreground flex-shrink-0" />
          <input
            type="search"
            placeholder="Search events, clubs, people..."
            aria-label="Search events, clubs, and people"
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>
    </header>
  );
}
