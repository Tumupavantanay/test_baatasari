'use client';

import { useRef, useEffect, useCallback } from 'react';
import { Mail, Eye, MessageCircle, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { LeadershipMember, MemberRole } from '@/types/clubAdmin';
import { Card } from '@/components/ui/card';

// ── Role badge styling map ────────────────────────────────────────────────────
const roleBadgeStyles: Record<string, string> = {
  President: 'bg-amber-50 text-amber-700 border-amber-200',
  'Vice President': 'bg-purple-50 text-purple-700 border-purple-200',
  Secretary: 'bg-blue-50 text-blue-700 border-blue-200',
  Treasurer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Faculty Advisor': 'bg-stone-100 text-stone-600 border-stone-200',
  'Technical Lead': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Design Lead': 'bg-pink-50 text-pink-700 border-pink-200',
  'Content Lead': 'bg-blue-50 text-blue-700 border-blue-200',
  'Marketing Lead': 'bg-orange-50 text-orange-700 border-orange-200',
  'Sponsorship Lead': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  Member: 'bg-stone-50 text-stone-600 border-stone-200',
};

function getRoleBadgeClass(role: MemberRole) {
  return roleBadgeStyles[role] ?? 'bg-stone-50 text-stone-600 border-stone-200';
}

// ── Single Member Card ────────────────────────────────────────────────────────
interface MemberCardProps {
  member: LeadershipMember;
  onEmail?: (member: LeadershipMember) => void;
  onView?: (member: LeadershipMember) => void;
  onMessage?: (member: LeadershipMember) => void;
}

function MemberCard({ member, onEmail, onView, onMessage }: MemberCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapLoaded = false;
    const initGsap = async () => {
      const { gsap } = await import('gsap');
      gsapLoaded = true;
      const el = cardRef.current;
      if (!el) return;

      const enter = () => gsap.to(el, { scale: 1.015, duration: 0.2, ease: 'power1.out' });
      const leave = () => gsap.to(el, { scale: 1, duration: 0.2, ease: 'power1.out' });
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      return () => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      };
    };
    initGsap();
  }, []);

  return (
    <Card
      ref={cardRef}
      className="flex-shrink-0 w-36 lg:w-40 border-border rounded-2xl p-4 text-center shadow-sm cursor-default"
    >
      {/* Role badge */}
      <span
        className={cn(
          'inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold border mb-3 tracking-wide',
          getRoleBadgeClass(member.role)
        )}
      >
        {member.role}
      </span>

      {/* Avatar */}
      <div className="relative mx-auto mb-2 w-14 h-14">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white text-base font-bold ring-2 ring-white shadow-md"
          style={{ backgroundColor: member.avatarColor }}
        >
          {member.avatarInitials}
        </div>
        {/* Online indicator */}
        {member.isOnline && (
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" />
        )}
      </div>

      {/* Name */}
      <p className="text-xs font-bold text-foreground leading-tight mb-0.5 truncate">
        {member.name}
      </p>

      {/* Department + Year */}
      <p className="text-[10px] text-muted-foreground leading-tight truncate">
        {member.department}
      </p>
      <p className="text-[10px] text-muted-foreground mb-3 truncate">
        {member.year}
      </p>

      {/* Action icons */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => onEmail?.(member)}
          aria-label={`Email ${member.name}`}
          className="w-7 h-7 rounded-lg bg-muted hover:bg-primary/20 border border-border flex items-center justify-center transition-colors duration-200"
        >
          <Mail size={12} className="text-muted-foreground hover:text-primary" />
        </button>
        <button
          onClick={() => onView?.(member)}
          aria-label={`View ${member.name}'s profile`}
          className="w-7 h-7 rounded-lg bg-muted hover:bg-primary/20 border border-border flex items-center justify-center transition-colors duration-200"
        >
          <Eye size={12} className="text-muted-foreground hover:text-primary" />
        </button>
        <button
          onClick={() => onMessage?.(member)}
          aria-label={`Message ${member.name}`}
          className="w-7 h-7 rounded-lg bg-muted hover:bg-primary/20 border border-border flex items-center justify-center transition-colors duration-200"
        >
          <MessageCircle size={12} className="text-muted-foreground hover:text-primary" />
        </button>
      </div>
    </Card>
  );
}

// ── Carousel Section ──────────────────────────────────────────────────────────
interface MemberCarouselSectionProps {
  title: string;
  /** Fully prop-driven — render any array of LeadershipMember from API */
  members: LeadershipMember[];
  onViewAll?: () => void;
  onEmail?: (member: LeadershipMember) => void;
  onView?: (member: LeadershipMember) => void;
  onMessage?: (member: LeadershipMember) => void;
}

/**
 * Reusable horizontal scroll carousel for Leadership Team & Core Committee.
 * Accepts any LeadershipMember[] — no hardcoded length limits.
 */
export default function MemberCarouselSection({
  title,
  members,
  onViewAll,
  onEmail,
  onView,
  onMessage,
}: MemberCarouselSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // GSAP mount animation
  useEffect(() => {
    const initGsap = async () => {
      const { gsap } = await import('gsap');
      const container = sectionRef.current;
      if (!container) return;
      const cards = container.querySelectorAll('[data-card]');
      gsap.set(cards, { opacity: 0, x: 15 });
      gsap.to(cards, {
        opacity: 1,
        x: 0,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.15,
      });
    };
    initGsap();
  }, [members]);

  const scrollRight = useCallback(() => {
    scrollRef.current?.scrollBy({ left: 180, behavior: 'smooth' });
  }, []);

  if (members.length === 0) return null;

  return (
    <div ref={sectionRef}>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        <button
          onClick={onViewAll}
          aria-label={`View all ${title}`}
          className="text-xs font-semibold text-primary hover:text-primary/90 transition-colors duration-200"
        >
          View all
        </button>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
          aria-label={`${title} carousel`}
        >
          {members.map((member) => (
            <div key={member.id} data-card>
              <MemberCard
                member={member}
                onEmail={onEmail}
                onView={onView}
                onMessage={onMessage}
              />
            </div>
          ))}
        </div>

        {/* Desktop right arrow — only shows when enough members to scroll */}
        {members.length > 4 && (
          <button
            onClick={scrollRight}
            aria-label={`Scroll ${title} right`}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-card border border-border rounded-full shadow-md items-center justify-center hover:border-primary transition-all duration-200 z-10"
          >
            <ChevronRight size={15} className="text-muted-foreground" />
          </button>
        )}
      </div>
    </div>
  );
}
