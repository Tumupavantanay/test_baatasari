'use client';

import { useRef } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  Zap,
  Music,
  Camera,
  Code2,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { clubsFollowed } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';
import { cn } from '@/lib/utils';

// Icon registry — maps lucideIcon string (set during club registration) to component
const CLUB_ICON_MAP: Record<string, LucideIcon> = {
  Zap,
  Music,
  Camera,
  Code2,
  Users, // fallback
};

export default function ClubsFollowedSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <SectionHeader title="Clubs You Follow" viewAllHref="/clubs" />
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
        aria-label="Clubs you follow"
      >
        {clubsFollowed.map((club) => {
          const Icon = CLUB_ICON_MAP[club.lucideIcon] ?? Users;

          return (
            <Link
              key={club.id}
              href={club.href}
              aria-label={`Go to ${club.name} club page`}
              className="flex-shrink-0 bg-white rounded-2xl border border-[#E5E7EB] p-3.5 shadow-sm hover:shadow-md hover:border-[#A1BCE6] hover:-translate-y-1 transition-all duration-200 min-w-[130px] lg:min-w-[140px] group block"
            >
              {/* Club icon — chosen at registration */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: club.bgColor }}
                aria-hidden="true"
              >
                <Icon size={22} style={{ color: club.color }} strokeWidth={2} />
              </div>

              {/* Club Name */}
              <p className="text-xs font-bold text-[#0C1E3C] mb-0.5 group-hover:text-[#A1BCE6] transition-colors duration-200">
                {club.name}
              </p>

              {/* Description */}
              <p className="text-[9px] text-[#828894] leading-tight mb-2 truncate">
                {club.description}
              </p>

              {/* Next event + active dot */}
              <div className="flex items-center gap-1.5">
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full flex-shrink-0',
                    club.isActive ? 'bg-emerald-500' : 'bg-[#E5E7EB]'
                  )}
                  aria-hidden="true"
                />
                <span
                  className={cn(
                    'text-[10px] font-semibold truncate',
                    club.isActive ? 'text-emerald-600' : 'text-[#828894]'
                  )}
                >
                  {club.nextEvent}
                </span>
              </div>

              {/* Date */}
              <p className="text-[9px] text-[#828894] mt-0.5 font-medium">{club.nextEventDate}</p>
            </Link>
          );
        })}

        {/* Scroll hint arrow */}
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 160, behavior: 'smooth' })}
          aria-label="Scroll clubs right"
          className="flex-shrink-0 self-center w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center hover:border-[#A1BCE6] hover:bg-[#EBF2FB] transition-all duration-200"
        >
          <ChevronRight size={16} className="text-[#828894]" />
        </button>
      </div>
    </div>
  );
}
