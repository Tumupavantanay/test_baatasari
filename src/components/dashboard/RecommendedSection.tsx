'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark, ChevronRight } from 'lucide-react';
import { recommendedEvents } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';
import { cn } from '@/lib/utils';

const badgeBgMap: Record<string, string> = {
  purple: 'bg-purple-900/80',
  blue: 'bg-blue-900/80',
  green: 'bg-emerald-900/80',
};

export default function RecommendedSection() {
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // prevent Link navigation when clicking bookmark
    e.stopPropagation();
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="relative">
      <SectionHeader title="Recommended For You" viewAllHref="/explore" />

      {/* Horizontal Scroll */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide pb-1"
        aria-label="Recommended events"
      >
        {recommendedEvents.map((event) => (
          <Link
            key={event.id}
            href={event.link}
            aria-label={`View ${event.title} by ${event.organizer}`}
            className="flex-shrink-0 w-44 lg:w-52 bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm hover:shadow-md hover:border-[#A1BCE6] hover:-translate-y-0.5 transition-all duration-200 group block"
          >
            {/* Card Image with badge */}
            <div className="relative w-full h-24 lg:h-28">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="208px"
              />
              {/* Recommend badge */}
              {event.recommendBadge && (
                <div
                  className={cn(
                    'absolute top-2 left-2 right-8 px-2 py-1 rounded-lg text-white text-[9px] font-semibold leading-tight line-clamp-2',
                    badgeBgMap[event.recommendBadgeColor ?? 'purple']
                  )}
                >
                  {event.recommendBadge}
                </div>
              )}
              {/* Bookmark */}
              <button
                onClick={(e) => toggleBookmark(e, event.id)}
                aria-label={
                  bookmarks.has(event.id)
                    ? `Remove ${event.title} from bookmarks`
                    : `Bookmark ${event.title}`
                }
                className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:bg-white transition-colors duration-200 z-10"
              >
                <Bookmark
                  size={13}
                  className={cn(
                    'transition-colors duration-200',
                    bookmarks.has(event.id)
                      ? 'fill-[#A1BCE6] text-[#A1BCE6]'
                      : 'text-[#828894]'
                  )}
                />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-3">
              <p className="text-xs font-bold text-[#0C1E3C] leading-tight mb-1 line-clamp-2 group-hover:text-[#A1BCE6] transition-colors duration-200">
                {event.title}
              </p>
              <p className="text-[10px] text-[#828894]">
                {event.organizer} • {event.date}
              </p>
            </div>
          </Link>
        ))}

        {/* Scroll hint arrow */}
        <button
          onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: 'smooth' })}
          aria-label="Scroll recommended events right"
          className="flex-shrink-0 self-center w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center hover:border-[#A1BCE6] hover:bg-[#EBF2FB] transition-all duration-200"
        >
          <ChevronRight size={16} className="text-[#828894]" />
        </button>
      </div>
    </div>
  );
}
