'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  X,
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
  LayoutDashboard, CalendarDays, Users, UserPlus, BarChart2,
  CreditCard, FolderOpen, Settings2, Settings, LifeBuoy,
};

interface ClubAdminMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClubAdminMobileDrawer({ isOpen, onClose }: ClubAdminMobileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // GSAP slide-in
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const el = drawerRef.current;
      if (!el) return;
      if (isOpen) {
        gsap.fromTo(el, { x: '-100%' }, { x: '0%', duration: 0.28, ease: 'power2.out' });
      } else {
        gsap.to(el, { x: '-100%', duration: 0.22, ease: 'power2.in' });
      }
    };
    init();
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'lg:hidden fixed inset-0 z-[90] bg-black/40 backdrop-blur-sm transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        style={{ transform: 'translateX(-100%)' }}
        className="lg:hidden fixed left-0 top-0 bottom-0 z-[95] w-64 bg-[#0F172A] flex flex-col shadow-2xl"
        aria-label="Club admin navigation drawer"
        role="navigation"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#D97706] flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <div className="leading-tight">
              <p className="text-[8px] font-semibold tracking-widest text-[#A1BCE6]/60 uppercase">Campus Connect</p>
              <p className="text-[10px] font-bold text-white tracking-wider uppercase">by BAATASARI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X size={16} className="text-white/50" />
          </button>
        </div>

        {/* Club switcher */}
        <div className="px-3 pt-4 pb-3">
          <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/10 transition-all">
            <div className="w-7 h-7 rounded-md bg-[#D97706]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-[#D97706]">TC</span>
            </div>
            <div className="flex-1 text-left leading-tight overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{currentClub.name}</p>
              <p className="text-[10px] text-white/40 truncate">{currentClub.university}</p>
            </div>
            <ChevronDown size={13} className="text-white/30 flex-shrink-0" />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-1 overflow-y-auto">
          <ul className="space-y-0.5">
            {adminNavItems.map((item) => {
              const Icon = iconMap[item.icon] ?? LayoutDashboard;
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={item.isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative',
                      item.isActive
                        ? 'bg-[#D97706]/15 text-[#D97706]'
                        : 'text-white/45 hover:bg-white/5 hover:text-white/80'
                    )}
                  >
                    {item.isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#D97706] rounded-r-full" />
                    )}
                    <Icon size={16} className={cn('flex-shrink-0', item.isActive ? 'text-[#D97706]' : 'text-white/30')} />
                    <span className="flex-1">{item.label}</span>
                    {item.badge ? (
                      <span className="min-w-[18px] h-[18px] px-1 bg-[#D97706] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="px-3 pb-6 pt-3 border-t border-white/5 space-y-2">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-medium text-white/40 hover:text-white/70 hover:bg-white/5 transition-all group"
          >
            <ArrowLeftRight size={14} className="text-white/30 group-hover:text-white/60" />
            Switch to student view
          </Link>
          <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/5 border border-white/5">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ring-2 ring-[#D97706]/30"
              style={{ backgroundColor: adminProfile.avatarColor }}
            >
              {adminProfile.avatarInitials}
            </div>
            <div className="leading-tight flex-1 overflow-hidden">
              <p className="text-xs font-semibold text-white truncate">{adminProfile.name}</p>
              <p className="text-[10px] text-white/40">{adminProfile.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
