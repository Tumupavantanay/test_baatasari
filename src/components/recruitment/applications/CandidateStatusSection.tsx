'use client';

import { useState, useRef, useCallback } from 'react';
import {
  Eye,
  Star,
  Calendar,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReviewCandidate, CandidateStatus } from '@/types/recruitment';
import CandidateRow from './CandidateRow';

// ── Status config ─────────────────────────────────────────────────────────────
interface StatusConfig {
  label: string;
  icon: React.ElementType;
  iconColor: string;
  badgeBg: string;
  description: string;
}

const STATUS_CONFIG: Record<CandidateStatus, StatusConfig> = {
  new: {
    label: 'New Applications',
    icon: Eye,
    iconColor: 'text-[#F97316]',
    badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
    description: 'New applications waiting for review.',
  },
  review: {
    label: 'Under Review',
    icon: Eye,
    iconColor: 'text-[#3B82F6]',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'candidates are being reviewed by your team.',
  },
  shortlisted: {
    label: 'Shortlisted',
    icon: Star,
    iconColor: 'text-[#14B8A6]',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
    description: 'candidates shortlisted for interview.',
  },
  interview: {
    label: 'Interview Scheduled',
    icon: Calendar,
    iconColor: 'text-[#8B5CF6]',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
    description: 'interviews are scheduled.',
  },
  selected: {
    label: 'Selected',
    icon: CheckCircle,
    iconColor: 'text-[#10B981]',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    description: 'candidates selected for the role.',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    iconColor: 'text-[#EF4444]',
    badgeBg: 'bg-red-50 text-red-700 border-red-200',
    description: 'candidates not proceeding further.',
  },
};

// ── Props ─────────────────────────────────────────────────────────────────────
interface CandidateStatusSectionProps {
  status: CandidateStatus;
  /**
   * Preview candidates to show in the accordion.
   * Pass the first N rows for the collapsed preview.
   * Pass all rows when "View all" is clicked (or use pagination).
   */
  candidates: ReviewCandidate[];
  /**
   * Total count for this status — comes from API PipelineMetrics.
   * May be larger than candidates.length when pagination is active.
   */
  totalCount: number;
  /** Initial expanded state */
  defaultExpanded?: boolean;
  /** Callbacks — wired to page-level toast / navigation */
  onView?: (c: ReviewCandidate) => void;
  onShortlist?: (c: ReviewCandidate) => void;
  onSchedule?: (c: ReviewCandidate) => void;
  onMore?: (c: ReviewCandidate) => void;
  onAssign?: (c: ReviewCandidate) => void;
  /** Called when "View all (n)" is clicked — navigate or load all */
  onViewAll?: (status: CandidateStatus) => void;
}

export default function CandidateStatusSection({
  status,
  candidates,
  totalCount,
  defaultExpanded = true,
  onView,
  onShortlist,
  onSchedule,
  onMore,
  onAssign,
  onViewAll,
}: CandidateStatusSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cfg = STATUS_CONFIG[status];
  const Icon = cfg.icon;

  // ── GSAP accordion animation ──────────────────────────────────────────────
  const toggle = useCallback(async () => {
    const body = bodyRef.current;
    if (!body) { setExpanded((p) => !p); return; }

    const { gsap } = await import('gsap');

    if (expanded) {
      // Collapse
      gsap.to(body, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.inOut',
        onComplete: () => setExpanded(false),
      });
    } else {
      // Expand
      setExpanded(true);
      gsap.fromTo(
        body,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [expanded]);

  return (
    <div className="mx-5 lg:mx-6 bg-white border border-[] rounded-2xl shadow-sm overflow-hidden">
      {/* Accordion Header */}
      <button
        onClick={toggle}
        aria-expanded={expanded}
        aria-controls={`status-body-${status}`}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-[] transition-colors duration-150 text-left"
      >
        {/* Left: icon + title */}
        <div className="flex items-center gap-3">
          <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center', `bg-[]`)}>
            <Icon size={16} className={cfg.iconColor} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[]">{cfg.label}</h2>
              <span
                className={cn(
                  'px-2 py-0.5 rounded-full text-[10px] font-bold border',
                  cfg.badgeBg
                )}
              >
                {totalCount}
              </span>
            </div>
            <p className="text-[11px] text-[] mt-0.5">
              {totalCount} {cfg.description}
            </p>
          </div>
        </div>

        {/* Right: View all + chevron */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewAll?.(status);
            }}
            aria-label={`View all ${totalCount} ${cfg.label}`}
            className="hidden sm:flex items-center gap-1 text-xs text-[] hover:text-[] font-medium transition-colors"
          >
            View all ({totalCount})
            <ChevronDown size={12} />
          </button>

          <div className="w-7 h-7 flex items-center justify-center rounded-lg bg-[]">
            {expanded ? (
              <ChevronUp size={14} className="text-[]" />
            ) : (
              <ChevronDown size={14} className="text-[]" />
            )}
          </div>
        </div>
      </button>

      {/* Accordion Body */}
      <div
        ref={bodyRef}
        id={`status-body-${status}`}
        className={cn(
          'border-t border-[] overflow-hidden transition-none',
          !expanded && 'hidden'
        )}
      >
        {candidates.length === 0 ? (
          <div className="px-5 py-8 text-center">
            <p className="text-sm text-[]">No candidates in this stage yet.</p>
          </div>
        ) : (
          <div>
            {candidates.map((c) => (
              <CandidateRow
                key={c.id}
                candidate={c}
                onView={onView}
                onShortlist={onShortlist}
                onSchedule={onSchedule}
                onMore={onMore}
                onAssign={onAssign}
              />
            ))}

            {/* Show "View all" footer if there are more than shown */}
            {totalCount > candidates.length && (
              <div className="px-5 py-3 border-t border-[] flex items-center justify-center">
                <button
                  onClick={() => onViewAll?.(status)}
                  className="text-xs font-medium text-[#F97316] hover:text-[#EA580C] transition-colors"
                >
                  View all {totalCount} {cfg.label} →
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
