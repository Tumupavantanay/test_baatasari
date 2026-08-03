'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  Link2,
  Globe,
  X,
  Eye,
  Star,
  ExternalLink,
  MapPin,
  BookOpen,
  Briefcase,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReviewCandidate } from '@/types/recruitment';

// ── Skill Tag ─────────────────────────────────────────────────────────────────
function SkillTag({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 bg-[] text-[] text-[11px] font-medium rounded-lg border border-[]">
      {label}
    </span>
  );
}

// ── Stat Row ──────────────────────────────────────────────────────────────────
function StatRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string | null;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-[] last:border-0">
      <div className="flex items-center gap-2 text-xs text-[]">
        <Icon size={13} className="flex-shrink-0" />
        <span>{label}</span>
      </div>
      <span className="text-xs font-semibold text-[]">
        {value ?? <span className="text-[]">—</span>}
      </span>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
interface NewApplicationsCarouselProps {
  candidates: ReviewCandidate[];
  onMarkAllReviewed?: () => void;
  onReject?: (candidate: ReviewCandidate) => void;
  onMoveToReview?: (candidate: ReviewCandidate) => void;
  onShortlist?: (candidate: ReviewCandidate) => void;
  onViewFull?: (candidate: ReviewCandidate) => void;
}

export default function NewApplicationsCarousel({
  candidates,
  onMarkAllReviewed,
  onReject,
  onMoveToReview,
  onShortlist,
  onViewFull,
}: NewApplicationsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const total = candidates.length;
  const current = candidates[currentIndex];

  // ── GSAP slide animation ──────────────────────────────────────────────────
  const animateTo = useCallback(
    async (nextIndex: number, direction: 'left' | 'right') => {
      if (animating || nextIndex === currentIndex) return;
      setAnimating(true);
      setSlideDir(direction);

      const { gsap } = await import('gsap');
      const card = cardRef.current;
      if (!card) { setAnimating(false); return; }

      const xOut = direction === 'right' ? -40 : 40;
      const xIn = direction === 'right' ? 40 : -40;

      await gsap.to(card, { x: xOut, opacity: 0, duration: 0.2, ease: 'power2.in' });
      setCurrentIndex(nextIndex);
      gsap.fromTo(card, { x: xIn, opacity: 0 }, { x: 0, opacity: 1, duration: 0.25, ease: 'power2.out' });
      setAnimating(false);
      setSlideDir(null);
    },
    [animating, currentIndex]
  );

  const goNext = useCallback(() => {
    if (total === 0) return;
    animateTo((currentIndex + 1) % total, 'right');
  }, [animateTo, currentIndex, total]);

  const goPrev = useCallback(() => {
    if (total === 0) return;
    animateTo((currentIndex - 1 + total) % total, 'left');
  }, [animateTo, currentIndex, total]);

  // ── Keyboard navigation ───────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Only when no modal / input is focused
      if (document.activeElement?.tagName === 'INPUT') return;
      if (document.activeElement?.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  if (total === 0) return null;

  return (
    <div className="mx-5 lg:mx-6 bg-white border border-[] rounded-2xl shadow-sm overflow-hidden">
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[]">
        <div>
          <h2 className="text-sm font-bold text-[]">
            New Applications{' '}
            <span className="text-[#F97316]">({total})</span>
          </h2>
          <p className="text-[11px] text-[] mt-0.5">
            {total} students waiting for your review.
          </p>
        </div>
        <button
          onClick={onMarkAllReviewed}
          aria-label="Mark all new applications as reviewed"
          className="text-xs font-medium text-[] border border-[] hover:border-[#D1D5DB] hover:bg-[] px-3.5 py-2 rounded-xl transition-all active:scale-95"
        >
          Mark all as reviewed
        </button>
      </div>

      {/* Card body with arrow navigation */}
      <div className="relative flex items-stretch">
        {/* Left Arrow */}
        <button
          onClick={goPrev}
          aria-label="Previous candidate"
          disabled={animating}
          className="flex-shrink-0 w-10 flex items-center justify-center border-r border-[] hover:bg-[#F8F9FB] transition-colors disabled:opacity-40 group"
        >
          <ChevronLeft size={18} className="text-[] group-hover:text-[] transition-colors" />
        </button>

        {/* Main card */}
        <div ref={cardRef} className="flex-1 min-w-0 grid grid-cols-1 lg:grid-cols-3 gap-0">
          {/* ── Left pane: Meta ── */}
          <div className="px-5 py-5 border-b lg:border-b-0 lg:border-r border-[]">
            {/* Avatar */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-sm"
                style={{ backgroundColor: current.avatarColor }}
              >
                {current.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-bold text-[]">{current.name}</p>
                <p className="text-xs text-[]">
                  {current.major} • {current.year}
                </p>
                <p className="text-xs text-[]">{current.university}</p>
              </div>
            </div>

            <p className="text-[10px] text-[] mb-4">{current.appliedTime}</p>

            {/* Stats */}
            <div className="space-y-0.5">
              <StatRow icon={BookOpen} label="CGPA" value={current.cgpa} />
              <StatRow icon={Briefcase} label="Experience" value={current.experience} />
              <StatRow icon={MapPin} label="Location" value={current.location} />
            </div>
          </div>

          {/* ── Right pane: Detail ── */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-0">
            {/* About + Skills */}
            <div className="px-5 py-5 border-b md:border-b-0 md:border-r border-[]">
              <h3 className="text-[11px] font-semibold text-[] uppercase tracking-wider mb-2">
                About
              </h3>
              <p className="text-xs text-[] leading-relaxed mb-4">{current.about}</p>

              <h3 className="text-[11px] font-semibold text-[] uppercase tracking-wider mb-2">
                Top Skills
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {current.skills.map((s) => (
                  <SkillTag key={s} label={s} />
                ))}
              </div>
            </div>

            {/* Documents + Links */}
            <div className="px-5 py-5 border-b md:border-b-0 md:border-r border-[]">
              <h3 className="text-[11px] font-semibold text-[] uppercase tracking-wider mb-2">
                Documents
              </h3>
              <div className="space-y-2 mb-4">
                {current.documents.map((doc) => (
                  <a
                    key={doc.name}
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${doc.name}`}
                    className="flex items-center gap-2 group"
                  >
                    <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center flex-shrink-0">
                      <FileText size={11} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-medium text-[] group-hover:text-[#F97316] transition-colors leading-tight truncate max-w-[140px]">
                        {doc.name}
                      </p>
                      <p className="text-[9px] text-[]">{doc.size}</p>
                    </div>
                  </a>
                ))}
              </div>

              {current.githubProfileUrl && (
                <div className="mb-2">
                  <h3 className="text-[11px] font-semibold text-[] uppercase tracking-wider mb-1.5">
                    Github Profile
                  </h3>
                  <a
                    href={`https://${current.githubProfileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#3B82F6] hover:underline"
                  >
                    <Link2 size={11} />
                    {current.githubProfileUrl}
                  </a>
                </div>
              )}

              {current.portfolioUrl && (
                <div>
                  <h3 className="text-[11px] font-semibold text-[] uppercase tracking-wider mb-1.5">
                    /Portfolio
                  </h3>
                  <a
                    href={`https://${current.portfolioUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#3B82F6] hover:underline"
                  >
                    <Globe size={11} />
                    {current.portfolioUrl}
                  </a>
                </div>
              )}
            </div>

            {/* Quick Summary */}
            <div className="px-5 py-5">
              <h3 className="text-[11px] font-semibold text-[] uppercase tracking-wider mb-2">
                Quick Summary
              </h3>
              <ul className="space-y-1.5">
                {current.summaryHighlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-xs text-[]">
                    <span className="mt-1 w-1 h-1 rounded-full bg-[#F97316] flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={goNext}
          aria-label="Next candidate"
          disabled={animating}
          className="flex-shrink-0 w-10 flex items-center justify-center border-l border-[] hover:bg-[#F8F9FB] transition-colors disabled:opacity-40 group"
        >
          <ChevronRight size={18} className="text-[] group-hover:text-[] transition-colors" />
        </button>
      </div>

      {/* Action Bar */}
      <div className="flex items-center justify-between px-5 py-3.5 border-t border-[] gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {/* Reject */}
          <button
            onClick={() => onReject?.(current)}
            aria-label={`Reject ${current.name}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#FCA5A5] bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition-all active:scale-95"
          >
            <X size={13} />
            Reject
          </button>

          {/* Move to Review */}
          <button
            onClick={() => onMoveToReview?.(current)}
            aria-label={`Move ${current.name} to review`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#BFDBFE] bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-all active:scale-95"
          >
            <Eye size={13} />
            Move to Review
          </button>

          {/* Shortlist */}
          <button
            onClick={() => onShortlist?.(current)}
            aria-label={`Shortlist ${current.name}`}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1F2937] hover:bg-[] text-white text-xs font-semibold transition-all active:scale-95 shadow-sm"
          >
            <Star size={13} />
            Shortlist
          </button>
        </div>

        {/* View Full Application */}
        <button
          onClick={() => onViewFull?.(current)}
          aria-label={`View full application for ${current.name}`}
          className="flex items-center gap-1 text-xs font-medium text-[] hover:text-[] transition-colors"
        >
          View Full Application
          <ExternalLink size={11} />
        </button>
      </div>

      {/* Pagination dots */}
      <div
        className="flex items-center justify-center gap-2 pb-3.5"
        role="tablist"
        aria-label="Candidate navigation"
      >
        {candidates.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`Candidate ${i + 1} of ${total}`}
            onClick={() => animateTo(i, i > currentIndex ? 'right' : 'left')}
            className={cn(
              'rounded-full transition-all duration-200',
              i === currentIndex
                ? 'w-4 h-2 bg-[#F97316]'
                : 'w-2 h-2 bg-[#D1D5DB] hover:bg-[]'
            )}
          />
        ))}
      </div>
    </div>
  );
}
