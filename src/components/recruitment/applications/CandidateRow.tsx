'use client';

import {
  Eye,
  Star,
  Calendar,
  MoreVertical,
  UserPlus,
  CheckSquare,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReviewCandidate, CandidateStatus } from '@/types/recruitment';

// ── Shared sub-components ─────────────────────────────────────────────────────

function Avatar({ candidate }: { candidate: ReviewCandidate }) {
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm"
      style={{ backgroundColor: candidate.avatarColor }}
    >
      {candidate.avatarInitials}
    </div>
  );
}

function SkillBadge({ label }: { label: string }) {
  return (
    <span className="px-2 py-0.5 bg-muted text-foreground text-[10px] font-medium rounded-md border border-border">
      {label}
    </span>
  );
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 85 ? 'text-emerald-700 bg-emerald-50 border-emerald-200'
    : score >= 70 ? 'text-blue-700 bg-blue-50 border-blue-200'
    : 'text-amber-700 bg-amber-50 border-amber-200';
  return (
    <span className={cn('px-2.5 py-1 rounded-lg border text-xs font-bold', color)}>
      {score} / 100
    </span>
  );
}

function InterviewerAvatars({ interviewers }: { interviewers: ReviewCandidate['interviewers'] }) {
  const shown = interviewers.slice(0, 3);
  const extra = interviewers.length - shown.length;
  return (
    <div className="flex items-center">
      {shown.map((iv, i) => (
        <div
          key={i}
          title={iv.name}
          className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white -ml-1.5 first:ml-0"
          style={{ backgroundColor: iv.avatarColor }}
        >
          {iv.initials}
        </div>
      ))}
      {extra > 0 && (
        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-muted text-foreground text-[9px] font-bold border-2 border-white -ml-1.5">
          +{extra}
        </div>
      )}
    </div>
  );
}

// ── Row variants by status ────────────────────────────────────────────────────

interface CandidateRowProps {
  candidate: ReviewCandidate;
  onView?: (c: ReviewCandidate) => void;
  onSchedule?: (c: ReviewCandidate) => void;
  onShortlist?: (c: ReviewCandidate) => void;
  onMore?: (c: ReviewCandidate) => void;
  onAssign?: (c: ReviewCandidate) => void;
}

export default function CandidateRow({
  candidate,
  onView,
  onSchedule,
  onShortlist,
  onMore,
  onAssign,
}: CandidateRowProps) {
  const s = candidate.status;

  return (
    <div className="flex items-center gap-3 px-5 py-3.5 hover:bg-muted transition-colors border-b border-border last:border-0">
      {/* Avatar */}
      <Avatar candidate={candidate} />

      {/* Name + meta */}
      <div className="flex-shrink-0 w-28 xl:w-36">
        <p className="text-xs font-semibold text-foreground leading-tight truncate">{candidate.name}</p>
        <p className="text-[10px] text-foreground truncate">
          {candidate.major} • {candidate.year}
        </p>
        {s === 'review' && (
          <p className="text-[10px] text-foreground mt-0.5">{candidate.appliedTime.replace('Applied ', '')}</p>
        )}
      </div>

      {/* Applied time (review/shortlisted) */}
      {(s === 'review' || s === 'shortlisted') && (
        <div className="hidden sm:block flex-shrink-0 w-20">
          <p className="text-[10px] text-foreground">Applied</p>
          <p className="text-[10px] font-medium text-foreground">
            {candidate.appliedTime.replace('Applied ', '')}
          </p>
        </div>
      )}

      {/* Interview info */}
      {s === 'interview' && candidate.interviewDate && (
        <div className="hidden sm:block flex-shrink-0 w-28">
          <p className="text-[10px] text-foreground">Interview on</p>
          <p className="text-[10px] font-semibold text-foreground">
            {candidate.interviewDate}, {candidate.interviewTime}
          </p>
        </div>
      )}

      {/* Interviewers */}
      {s === 'interview' && (
        <div className="hidden sm:flex flex-col flex-shrink-0">
          <p className="text-[10px] text-foreground mb-1">Interviewers</p>
          <InterviewerAvatars interviewers={candidate.interviewers} />
        </div>
      )}

      {/* Selected date */}
      {s === 'selected' && candidate.selectedDate && (
        <div className="hidden sm:block flex-shrink-0 w-28">
          <p className="text-[10px] text-foreground">Selected on</p>
          <p className="text-[10px] font-semibold text-foreground">{candidate.selectedDate}</p>
        </div>
      )}

      {/* Next step pill */}
      {s === 'selected' && candidate.nextStepLabel && (
        <div className="hidden sm:flex flex-col flex-shrink-0">
          <p className="text-[10px] text-foreground mb-1">Next Step</p>
          <button
            onClick={() => onAssign?.(candidate)}
            className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors"
          >
            {candidate.nextStepLabel}
          </button>
        </div>
      )}

      {/* Skills */}
      {(s === 'review' || s === 'shortlisted') && (
        <div className="flex-1 hidden sm:flex items-center gap-1 flex-wrap min-w-0">
          <p className="text-[10px] text-foreground w-full mb-0.5">Top Skills</p>
          {candidate.skills.slice(0, 3).map((skill) => (
            <SkillBadge key={skill} label={skill} />
          ))}
        </div>
      )}

      {/* Reviewer attribution */}
      {s === 'review' && candidate.reviewedBy && (
        <div className="hidden lg:block flex-shrink-0">
          <p className="text-[10px] text-foreground">Reviewed by</p>
          <p className="text-[10px] font-semibold text-foreground">{candidate.reviewedBy}</p>
        </div>
      )}

      {/* Score badge (shortlisted) */}
      {s === 'shortlisted' && candidate.score != null && (
        <div className="hidden sm:flex flex-col items-end flex-shrink-0">
          <p className="text-[10px] text-foreground mb-1">Score</p>
          <ScoreBadge score={candidate.score} />
        </div>
      )}

      {/* Interview status badge */}
      {s === 'interview' && (
        <div className="flex-1" />
      )}
      {s === 'interview' && (
        <div className="hidden sm:flex flex-col flex-shrink-0">
          <p className="text-[10px] text-foreground mb-1">Status</p>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            Scheduled
          </span>
        </div>
      )}

      {/* Spacer for other statuses */}
      {(s === 'rejected') && <div className="flex-1" />}

      {/* Action icons */}
      <div className="flex items-center gap-1.5 flex-shrink-0 ml-auto">
        {/* Schedule (shortlisted, interview) */}
        {(s === 'shortlisted' || s === 'interview') && (
          <button
            onClick={() => onSchedule?.(candidate)}
            aria-label={`Schedule interview for ${candidate.name}`}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all"
          >
            <Calendar size={13} className="text-foreground" />
          </button>
        )}

        {/* Assign (selected) */}
        {s === 'selected' && (
          <button
            onClick={() => onAssign?.(candidate)}
            aria-label={`Assign ${candidate.name}`}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all"
          >
            <UserPlus size={13} className="text-foreground" />
          </button>
        )}

        {/* Shortlist (review) */}
        {s === 'review' && (
          <button
            onClick={() => onShortlist?.(candidate)}
            aria-label={`Shortlist ${candidate.name}`}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all"
          >
            <Star size={13} className="text-foreground" />
          </button>
        )}

        {/* View */}
        <button
          onClick={() => onView?.(candidate)}
          aria-label={`View ${candidate.name}'s profile`}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all"
        >
          <Eye size={13} className="text-foreground" />
        </button>

        {/* More */}
        <button
          onClick={() => onMore?.(candidate)}
          aria-label={`More actions for ${candidate.name}`}
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all"
        >
          <MoreVertical size={13} className="text-foreground" />
        </button>
      </div>
    </div>
  );
}
