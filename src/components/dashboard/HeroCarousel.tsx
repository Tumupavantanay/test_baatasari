'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { featuredEvents } from '@/data/dashboardData';
import { cn } from '@/lib/utils';

const badgeColorMap: Record<string, string> = {
  red: 'bg-red-600',
  amber: 'bg-amber-500',
  blue: 'bg-blue-600',
  purple: 'bg-purple-700',
  green: 'bg-emerald-600',
  indigo: 'bg-indigo-600',
};

// Phase of the content animation between slides
type ContentPhase = 'visible' | 'fadeOut' | 'fadeIn';

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  // Separate index for rendering content so it lags behind the bg swap
  const [contentIndex, setContentIndex] = useState(0);
  const [contentPhase, setContentPhase] = useState<ContentPhase>('visible');
  const [isLocked, setIsLocked] = useState(false);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);
  const total = featuredEvents.length;

  // Reset autoplay whenever user manually navigates
  const resetAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(() => {
      triggerNext();
    }, 7000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const triggerNext = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  // Watch `current` — animate content out, swap, animate in
  useEffect(() => {
    if (current === contentIndex) return; // first render or no-op

    setIsLocked(true);

    // Phase 1 — fade content out quickly (180ms)
    setContentPhase('fadeOut');

    const fadeOutTimer = setTimeout(() => {
      // Phase 2 — swap content silently while invisible
      setContentIndex(current);
      setContentPhase('fadeIn');

      // Phase 3 — fade + slide content back in (380ms)
      const fadeInTimer = setTimeout(() => {
        setContentPhase('visible');
        setIsLocked(false);
      }, 380);

      return () => clearTimeout(fadeInTimer);
    }, 200);

    return () => clearTimeout(fadeOutTimer);
  }, [current, contentIndex]);

  const goTo = useCallback(
    (index: number) => {
      if (isLocked) return;
      const target = (index + total) % total;
      if (target === current) return;
      setCurrent(target);
      resetAutoplay();
    },
    [isLocked, current, total, resetAutoplay]
  );

  const prev = useCallback(() => goTo(current - 1), [current, goTo]);
  const next = useCallback(() => goTo(current + 1), [current, goTo]);

  // Initial autoplay
  useEffect(() => {
    autoplayRef.current = setInterval(triggerNext, 7000);
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [triggerNext]);

  const displayEvent = featuredEvents[contentIndex];

  // Content transition styles derived from phase
  const contentStyle: React.CSSProperties =
    contentPhase === 'fadeOut'
      ? {
          opacity: 0,
          transform: 'translateY(6px)',
          transition: 'opacity 180ms cubic-bezier(0.4, 0, 1, 1), transform 180ms cubic-bezier(0.4, 0, 1, 1)',
        }
      : contentPhase === 'fadeIn'
      ? {
          opacity: 0,
          transform: 'translateY(12px)',
          // no transition yet — jump to start position instantly
        }
      : {
          opacity: 1,
          transform: 'translateY(0px)',
          transition: 'opacity 380ms cubic-bezier(0.0, 0, 0.2, 1), transform 380ms cubic-bezier(0.0, 0, 0.2, 1)',
        };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg group" style={{ minHeight: 220 }}>

      {/* ── Background Images — slow 1000ms cross-fade ── */}
      {featuredEvents.map((ev, i) => (
        <div
          key={ev.id}
          className="absolute inset-0"
          style={{
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1000ms cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: i === current ? 1 : 0,
          }}
        >
          <Image
            src={ev.image}
            alt={ev.title}
            fill
            className="object-cover"
            priority={i === 0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}

      {/* ── Content — layered above backgrounds ── */}
      <div
        className="relative flex flex-col justify-end h-full p-5 lg:p-8 min-h-[220px] lg:min-h-[340px]"
        style={{ zIndex: 10 }}
      >
        {/* Inner content wrapper — animated */}
        <div style={contentStyle}>
          {/* Live / Category Badge */}
          <div className="flex items-center gap-2 mb-3">
            {displayEvent.isLive ? (
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-white"
                  style={{ animation: 'pulse-dot 1.5s ease-in-out infinite' }}
                />
                LIVE NOW
              </span>
            ) : (
              <span
                className={cn(
                  'text-white text-xs font-bold px-2.5 py-1 rounded-lg',
                  badgeColorMap[displayEvent.categoryColor ?? 'blue']
                )}
              >
                {displayEvent.category}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-white leading-tight tracking-tight mb-1 text-xl lg:text-3xl">
            {displayEvent.title}
          </h3>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/80 text-xs lg:text-sm font-medium mb-4">
            {displayEvent.subtitle && (
              <span className="flex items-center gap-1">
                <Clock size={13} />
                {displayEvent.subtitle}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {displayEvent.time}
            </span>
            <span className="flex items-center gap-1">
              <Users size={13} />
              {displayEvent.organizer}
            </span>
            <span className="hidden lg:flex items-center gap-1">
              <MapPin size={13} />
              {displayEvent.location}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              aria-label={`Register for ${displayEvent.title}`}
              className="flex items-center gap-2 bg-[#D97706] hover:bg-[#B45309] text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg shadow-amber-900/30"
            >
              Register Now
              <ArrowRight size={15} />
            </button>
            <button
              aria-label={`View details for ${displayEvent.title}`}
              className="text-sm font-semibold text-white/90 hover:text-white px-4 py-2.5 rounded-xl border border-white/30 hover:border-white/60 backdrop-blur-sm transition-all duration-200"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      {/* ── Pagination Dots ── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
        {featuredEvents.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="rounded-full"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              backgroundColor: i === current ? '#ffffff' : 'rgba(255,255,255,0.45)',
              transition: 'width 400ms cubic-bezier(0.4, 0, 0.2, 1), background-color 400ms ease',
            }}
          />
        ))}
      </div>

      {/* ── Arrow Nav (visible on desktop hover) ── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
