'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Layout
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';

// Dashboard sections
import GreetingBanner from '@/components/dashboard/GreetingBanner';
import HeroCarousel from '@/components/dashboard/HeroCarousel';
import QuickActions from '@/components/dashboard/QuickActions';
import ClosingSoonSection from '@/components/dashboard/ClosingSoonSection';
import RecommendedSection from '@/components/dashboard/RecommendedSection';
import FriendsAttendingSection from '@/components/dashboard/FriendsAttendingSection';
import ClubsFollowedSection from '@/components/dashboard/ClubsFollowedSection';
import AnnouncementsSection from '@/components/dashboard/AnnouncementsSection';
import ContinueRegistration from '@/components/dashboard/ContinueRegistration';
import UpcomingThisWeek from '@/components/dashboard/UpcomingThisWeek';

export default function DashboardPage() {
  const sectionsRef = useRef<HTMLDivElement>(null);

  // GSAP entrance stagger animation
  useEffect(() => {
    let gsapInstance: typeof import('gsap').gsap | null = null;

    const initGSAP = async () => {
      const { gsap } = await import('gsap');
      gsapInstance = gsap;

      const container = sectionsRef.current;
      if (!container) return;

      const sections = container.querySelectorAll('[data-animate]');
      if (!sections.length) return;

      gsap.set(sections, { opacity: 0, y: 20 });
      gsap.to(sections, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 0.1,
      });
    };

    initGSAP();

    return () => {
      if (gsapInstance) {
        gsapInstance.killTweensOf('[data-animate]');
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#F8F6F0]">
      {/* ── Left Sidebar (desktop) ── */}
      <Sidebar />

      {/* ── Main Column ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Sticky Header */}
        <Header />

        {/* ── Scrollable Content ── */}
        <main
          className="flex-1 overflow-y-auto"
          id="main-content"
          aria-label="Dashboard main content"
        >
          <div
            ref={sectionsRef}
            className="max-w-screen-xl mx-auto px-4 lg:px-6 pt-5 pb-28 lg:pb-8 space-y-6"
          >
            {/* ── Greeting Banner ── */}
            <div data-animate>
              <GreetingBanner />
            </div>

            {/* ── Hero Carousel ── */}
            <div data-animate>
              <h2 className="text-base font-bold text-[#0C1E3C] mb-3">
                What&apos;s Happening Right Now
              </h2>
              <HeroCarousel />
            </div>

            {/* ── Quick Actions (mobile only) ── */}
            <div data-animate>
              <QuickActions />
            </div>

            {/* ── Registrations Closing Soon ── */}
            <div data-animate>
              <ClosingSoonSection />
            </div>

            {/* ── Recommended For You ── */}
            <div data-animate>
              <RecommendedSection />
            </div>

            {/* ── Friends Attending + Clubs (2-col on lg+) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-animate>
              <FriendsAttendingSection />
              <ClubsFollowedSection />
            </div>

            {/* ── Announcements ── */}
            <div data-animate>
              <AnnouncementsSection />
            </div>

            {/* ── Continue Registration + Upcoming (2-col on lg+) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" data-animate>
              <ContinueRegistration />
              <UpcomingThisWeek />
            </div>
          </div>
        </main>
      </div>

      {/* ── Bottom Nav (mobile) ── */}
      <BottomNav />
    </div>
  );
}
