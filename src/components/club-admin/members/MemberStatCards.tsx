'use client';

import { useEffect, useRef } from 'react';
import { Users, Star, Clock, Flame, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ClubMetrics } from '@/types/clubAdmin';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  id: string;
  label: string;
  value: number;
  subLabel: string;
  subValue: string;
  icon: React.ElementType;
  isPositiveTrend?: boolean;
}

function StatCard({
  label,
  value,
  subLabel,
  subValue,
  icon: Icon,
  isPositiveTrend,
}: StatCardProps) {
  return (
    <Card
      className="p-4 lg:p-5 shadow-sm hover:shadow-md transition-shadow duration-200 cursor-default border-border bg-card"
      data-stat-card
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary/20 text-primary">
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <p className="text-2xl lg:text-3xl font-bold text-foreground leading-none">
          {value.toLocaleString()}
        </p>
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      </div>
      <div className="flex items-center gap-1">
        {isPositiveTrend !== undefined && (
          <TrendingUp
            size={11}
            className={cn(
              isPositiveTrend ? 'text-emerald-500' : 'text-red-400'
            )}
          />
        )}
        <span
          className={cn(
            'text-[11px] font-medium',
            isPositiveTrend !== undefined
              ? isPositiveTrend
                ? 'text-emerald-600'
                : 'text-red-500'
              : 'text-muted-foreground'
          )}
        >
          {subValue}
        </span>
        <span className="text-[11px] text-muted-foreground">{subLabel}</span>
      </div>
    </Card>
  );
}

interface MemberStatCardsProps {
  metrics: ClubMetrics;
}

/**
 * 4-card metrics grid.
 * Props-driven — swap `metrics` with API-fetched data when backend is ready.
 */
export default function MemberStatCards({ metrics }: MemberStatCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const initGsap = async () => {
      const { gsap } = await import('gsap');
      if (!isMounted) return;
      const container = containerRef.current;
      if (!container) return;

      const cards = container.querySelectorAll('[data-stat-card]');
      gsap.set(cards, { opacity: 0, y: 18 });
      gsap.to(cards, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.1,
      });

      // Hover scale via GSAP
      cards.forEach((card) => {
        const el = card as HTMLElement;
        const enter = () => gsap.to(el, { scale: 1.015, duration: 0.2, ease: 'power1.out' });
        const leave = () => gsap.to(el, { scale: 1, duration: 0.2, ease: 'power1.out' });
        el.addEventListener('mouseenter', enter);
        el.addEventListener('mouseleave', leave);
      });
    };

    initGsap();
    return () => {
      isMounted = false;
    };
  }, []);

  const cards: StatCardProps[] = [
    {
      id: 'total-members',
      label: 'Total Members',
      value: metrics.totalMembers,
      subLabel: 'this semester',
      subValue: `+${metrics.newThisSemester}`,
      icon: Users,
      isPositiveTrend: true,
    },
    {
      id: 'core-committee',
      label: 'Core Committee',
      value: metrics.coreCommitteeCount,
      subLabel: 'Leadership Team',
      subValue: '',
      icon: Star,
    },
    {
      id: 'pending-requests',
      label: 'Pending Requests',
      value: metrics.pendingRequestsCount,
      subLabel: 'Awaiting Approval',
      subValue: '',
      icon: Clock,
    },
    {
      id: 'active-members',
      label: 'Active Members',
      value: metrics.activeMembersCount,
      subLabel: 'Participated this semester',
      subValue: '',
      icon: Flame,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4"
      aria-label="Club member statistics"
    >
      {cards.map((card) => (
        <StatCard key={card.id} {...card} />
      ))}
    </div>
  );
}
