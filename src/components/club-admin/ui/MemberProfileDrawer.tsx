'use client';

import { useEffect, useRef } from 'react';
import { X, Mail, MessageCircle, UserCog, UserX, CalendarDays, Clock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ClubMember } from '@/types/clubAdmin';

interface MemberProfileDrawerProps {
  member: ClubMember | null;
  onClose: () => void;
  onEmail: (m: ClubMember) => void;
  onMessage: (m: ClubMember) => void;
  onAssignRole: (m: ClubMember) => void;
  onDeactivate: (m: ClubMember) => void;
}

const statusStyle: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Inactive: 'bg-stone-50 text-stone-500 border-stone-200',
};

const roleBadge: Record<string, string> = {
  President: 'bg-amber-50 text-amber-700 border-amber-200',
  'Vice President': 'bg-purple-50 text-purple-700 border-purple-200',
  Secretary: 'bg-blue-50 text-blue-700 border-blue-200',
  Treasurer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Technical Lead': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Design Lead': 'bg-pink-50 text-pink-700 border-pink-200',
  'Content Lead': 'bg-blue-50 text-blue-700 border-blue-200',
  'Marketing Lead': 'bg-orange-50 text-orange-700 border-orange-200',
  Member: 'bg-stone-50 text-stone-600 border-stone-200',
};

export default function MemberProfileDrawer({
  member,
  onClose,
  onEmail,
  onMessage,
  onAssignRole,
  onDeactivate,
}: MemberProfileDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const isOpen = member !== null;

  // GSAP slide-in
  useEffect(() => {
    const init = async () => {
      const { gsap } = await import('gsap');
      const el = drawerRef.current;
      if (!el) return;
      if (isOpen) {
        gsap.fromTo(el, { x: '100%' }, { x: '0%', duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(el, { x: '100%', duration: 0.22, ease: 'power2.in' });
      }
    };
    init();
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[90] bg-black/30 backdrop-blur-sm transition-opacity duration-200',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{ transform: 'translateX(100%)' }}
        className="fixed right-0 top-0 bottom-0 z-[95] w-full sm:w-80 bg-card shadow-2xl flex flex-col"
        aria-label={member ? `${member.name} profile` : 'Member profile'}
        role="complementary"
      >
        {member && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
              <p className="text-sm font-bold text-foreground">Member Profile</p>
              <button onClick={onClose} aria-label="Close profile" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted transition-all">
                <X size={16} className="text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              {/* Avatar + name block */}
              <div className="px-5 py-6 text-center border-b border-border">
                <div
                  className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-background text-xl font-bold ring-4 ring-background shadow-lg mb-3"
                  style={{ backgroundColor: member.avatarColor }}
                >
                  {member.avatarInitials}
                </div>
                <h2 className="text-lg font-bold text-foreground">{member.name}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{member.email}</p>
                <div className="flex items-center justify-center gap-2 mt-2.5">
                  <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-semibold border', roleBadge[member.role] ?? 'bg-stone-50 text-stone-600 border-stone-200')}>
                    {member.role}
                  </span>
                  <span className={cn('px-2.5 py-0.5 rounded-full text-[10px] font-semibold border', statusStyle[member.status])}>
                    {member.status}
                  </span>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-3 gap-px bg-border border-b border-border">
                {[
                  { label: 'Events', value: member.eventsCount, icon: CalendarDays },
                  { label: 'Hours', value: member.volunteerHours, icon: Clock },
                  { label: 'Attendance', value: `${member.attendancePercentage}%`, icon: Award },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="bg-card px-3 py-4 text-center">
                    <Icon size={14} className="text-muted-foreground mx-auto mb-1" />
                    <p className="text-lg font-bold text-foreground">{value}</p>
                    <p className="text-[10px] text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="px-5 py-4 space-y-3">
                {[
                  { label: 'Department', value: member.department },
                  { label: 'Year', value: member.year },
                  { label: 'Joined On', value: member.joinedDate },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-muted">
                    <span className="text-xs text-muted-foreground">{label}</span>
                    <span className="text-xs font-semibold text-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-5 py-4 border-t border-border space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => { onEmail(member); onClose(); }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:border-primary text-foreground text-xs font-medium transition-all active:scale-95"
                >
                  <Mail size={13} className="text-muted-foreground" />
                  Send Email
                </button>
                <button
                  onClick={() => { onMessage(member); onClose(); }}
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border hover:border-primary text-foreground text-xs font-medium transition-all active:scale-95"
                >
                  <MessageCircle size={13} className="text-muted-foreground" />
                  Message
                </button>
              </div>
              <button
                onClick={() => { onAssignRole(member); onClose(); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all active:scale-95"
              >
                <UserCog size={13} />
                Assign Role
              </button>
              <button
                onClick={() => { onDeactivate(member); onClose(); }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-red-500 hover:bg-red-50 text-xs font-medium transition-all"
              >
                <UserX size={13} />
                Deactivate Member
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
