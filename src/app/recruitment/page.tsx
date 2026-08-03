'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft, BarChart2, Download, Bell, ChevronDown,
  LayoutDashboard, Users, Briefcase, FileText, CalendarClock, UserCheck,
  Settings, HelpCircle, ExternalLink, Inbox, Eye, Star, Calendar,
  CheckCircle, XCircle, ChevronLeft, ChevronRight, Link2, Globe,
  MoreVertical, UserPlus, Lightbulb, X, Menu
} from 'lucide-react';
import type { CandidateStatus, ReviewCandidate, PipelineMetrics } from '@/types/recruitment';
import {
  currentRole, allCandidates, recruitmentNavItems
} from '@/data/recruitmentData';

// ── Utility ───────────────────────────────────────────────────────────────────
function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ');
}

// ── Toast ─────────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'info' | 'error';
interface Toast { message: string; type: ToastType }

function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const show = (message: string, type: ToastType = 'success') => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, type });
    timer.current = setTimeout(() => setToast(null), 3200);
  };
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  return { toast, show };
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
const NAV_ICONS: Record<string, React.ElementType> = {
  LayoutDashboard, Users, Briefcase, FileText, CalendarClock, UserCheck, Settings
};

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={onClose} />
      )}

      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 w-60 bg-foreground border-r border-border flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 lg:z-auto lg:flex-shrink-0',
        open ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3.5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-black text-white">CC</span>
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-bold text-background">Campus Connect</p>
              <p className="text-[9px] text-muted font-medium tracking-widest uppercase">by BAATASARI</p>
            </div>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-lg hover:bg-white/10">
            <X size={16} className="text-muted" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {recruitmentNavItems.map((item) => {
              const Icon = NAV_ICONS[item.icon] ?? LayoutDashboard;
              return (
                <li key={item.id}>
                  <Link href={item.href} onClick={onClose} aria-current={item.isActive ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative group',
                      item.isActive ? 'bg-white/10 text-background font-semibold' : 'text-muted hover:bg-white/5 hover:text-background'
                    )}>
                    {item.isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full" />}
                    <Icon size={15} className={cn('flex-shrink-0', item.isActive ? 'text-primary' : 'text-muted group-hover:text-primary')} />
                    <span className="flex-1">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help card */}
        <div className="mx-3 mb-4 p-3.5 bg-white/5 border border-white/10 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 mb-1.5">
            <HelpCircle size={14} className="text-primary flex-shrink-0" />
            <p className="text-[11px] font-semibold text-background">Need help?</p>
          </div>
          <p className="text-[10px] text-muted leading-relaxed mb-2.5">
            View guide to manage applications and interviews.
          </p>
          <button className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-[10px] font-semibold transition-colors">
            <ExternalLink size={10} /> View Guide
          </button>
        </div>
      </aside>
    </>
  );
}

// ── TopBar ────────────────────────────────────────────────────────────────────
function TopBar({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div className="flex items-center justify-between px-4 lg:px-6 py-3 border-b border-border bg-white sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onMenuOpen} className="lg:hidden p-1.5 rounded-xl hover:bg-muted transition-colors" aria-label="Open menu">
          <Menu size={18} className="text-foreground" />
        </button>
        <Link href="/recruitment" className="flex items-center gap-1.5 text-xs text-foreground hover:text-foreground font-medium transition-colors group">
          <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          <span className="hidden sm:inline">Back to Roles &amp; Recruitment</span>
          <span className="sm:hidden">Back</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="Notifications" className="relative w-8 h-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
          <Bell size={16} className="text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-muted" />
        </button>
        <button className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-muted border border-transparent hover:border-border transition-all">
          <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-white text-[10px] font-bold">RV</div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-semibold text-foreground">Tech Club</p>
            <p className="text-[10px] text-foreground">Club Lead</p>
          </div>
          <ChevronDown size={12} className="text-foreground hidden sm:block" />
        </button>
      </div>
    </div>
  );
}

// ── Pipeline Bar ──────────────────────────────────────────────────────────────
const PIPELINE_CONFIG: { status: CandidateStatus; label: string; shortLabel: string; icon: React.ElementType; iconColor: string; activeBg: string; activeBorder: string }[] = [
  { status: 'new', label: 'New Applications', shortLabel: 'New', icon: Inbox, iconColor: 'text-foreground', activeBg: 'bg-orange-50', activeBorder: 'border-b-[]' },
  { status: 'review', label: 'Under Review', shortLabel: 'Review', icon: Eye, iconColor: 'text-[#3B82F6]', activeBg: 'bg-blue-50', activeBorder: 'border-b-[#3B82F6]' },
  { status: 'shortlisted', label: 'Shortlisted', shortLabel: 'Shortlist', icon: Star, iconColor: 'text-[#14B8A6]', activeBg: 'bg-teal-50', activeBorder: 'border-b-[#14B8A6]' },
  { status: 'interview', label: 'Interview Scheduled', shortLabel: 'Interview', icon: Calendar, iconColor: 'text-[#8B5CF6]', activeBg: 'bg-purple-50', activeBorder: 'border-b-[#8B5CF6]' },
  { status: 'selected', label: 'Selected', shortLabel: 'Selected', icon: CheckCircle, iconColor: 'text-[#10B981]', activeBg: 'bg-emerald-50', activeBorder: 'border-b-[#10B981]' },
  { status: 'rejected', label: 'Rejected', shortLabel: 'Rejected', icon: XCircle, iconColor: 'text-[#EF4444]', activeBg: 'bg-red-50', activeBorder: 'border-b-[#EF4444]' },
];

function PipelineBar({ metrics, active, onChange }: { metrics: PipelineMetrics; active: CandidateStatus; onChange: (s: CandidateStatus) => void }) {
  const counts: Record<CandidateStatus, number> = {
    new: metrics.newCount, review: metrics.reviewCount, shortlisted: metrics.shortlistCount,
    interview: metrics.interviewCount, selected: metrics.selectedCount, rejected: metrics.rejectedCount,
  };
  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden" role="tablist">
      <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-[]">
        {PIPELINE_CONFIG.map((cfg) => {
          const Icon = cfg.icon;
          const isActive = active === cfg.status;
          return (
            <button key={cfg.status} role="tab" aria-selected={isActive} onClick={() => onChange(cfg.status)}
              className={cn('flex flex-col items-center gap-1 px-2 py-3.5 text-center transition-all duration-200 border-b-2 group',
                isActive ? `${cfg.activeBg} ${cfg.activeBorder}` : 'border-b-transparent hover:bg-muted')}>
              <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center transition-colors', isActive ? 'bg-white shadow-sm' : 'bg-muted')}>
                <Icon size={15} className={cfg.iconColor} />
              </div>
              <span className={cn('text-[10px] font-medium leading-tight transition-colors', isActive ? 'text-foreground font-semibold' : 'text-foreground')}>
                <span className="hidden lg:inline">{cfg.label}</span>
                <span className="lg:hidden">{cfg.shortLabel}</span>
              </span>
              <span className={cn('text-xl font-bold', isActive ? 'text-foreground' : 'text-foreground')}>{counts[cfg.status]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Carousel ──────────────────────────────────────────────────────────────────
function Carousel({
  candidates, onReject, onMoveToReview, onShortlist, onViewFull, onMarkAll
}: {
  candidates: ReviewCandidate[];
  onReject: (c: ReviewCandidate) => void;
  onMoveToReview: (c: ReviewCandidate) => void;
  onShortlist: (c: ReviewCandidate) => void;
  onViewFull: (c: ReviewCandidate) => void;
  onMarkAll: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const total = candidates.length;
  const cur = candidates[idx] ?? candidates[0];

  const go = useCallback(async (nextIdx: number, dir: 'left' | 'right') => {
    if (animating || !candidates[nextIdx]) return;
    setAnimating(true);
    const { gsap } = await import('gsap');
    const card = cardRef.current;
    if (!card) { setAnimating(false); return; }
    await gsap.to(card, { x: dir === 'right' ? -30 : 30, opacity: 0, duration: 0.18, ease: 'power2.in' });
    setIdx(nextIdx);
    gsap.fromTo(card, { x: dir === 'right' ? 30 : -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.22, ease: 'power2.out' });
    setAnimating(false);
  }, [animating, candidates]);

  const goNext = () => go((idx + 1) % total, 'right');
  const goPrev = () => go((idx - 1 + total) % total, 'left');

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [goNext, goPrev]);

  if (!cur) return null;

  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-border">
        <div>
          <h2 className="text-sm font-bold text-foreground">New Applications <span className="text-foreground">({total})</span></h2>
          <p className="text-[11px] text-foreground mt-0.5">{total} students waiting for your review.</p>
        </div>
        <button onClick={onMarkAll} className="text-xs font-medium text-foreground border border-border hover:bg-muted px-3 py-2 rounded-xl transition-all active:scale-95 whitespace-nowrap">
          Mark all as reviewed
        </button>
      </div>

      {/* Card + arrows */}
      <div className="flex items-stretch">
        {/* Prev arrow */}
        <button onClick={goPrev} disabled={animating} aria-label="Previous candidate"
          className="w-8 sm:w-10 flex items-center justify-center border-r border-border hover:bg-muted transition-colors disabled:opacity-40 flex-shrink-0">
          <ChevronLeft size={16} className="text-foreground" />
        </button>

        {/* Content */}
        <div ref={cardRef} className="flex-1 min-w-0">
          {/* Mobile stacked / Desktop 3-col */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
            {/* Left: meta */}
            <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow"
                  style={{ backgroundColor: cur.avatarColor }}>
                  {cur.avatarInitials}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">{cur.name}</p>
                  <p className="text-xs text-foreground">{cur.major} • {cur.year}</p>
                  <p className="text-xs text-foreground truncate">{cur.university}</p>
                </div>
              </div>
              <p className="text-[10px] text-foreground mb-3">{cur.appliedTime}</p>
              <div className="space-y-1">
                {[['CGPA', cur.cgpa], ['Experience', cur.experience ?? '—'], ['Location', cur.location]].map(([l, v]) => (
                  <div key={l} className="flex items-center justify-between py-1 border-b border-border last:border-0">
                    <span className="text-[11px] text-foreground">{l}</span>
                    <span className="text-[11px] font-semibold text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center: about + skills + docs */}
            <div className="p-4 sm:p-5 border-b md:border-b-0 md:border-r border-border">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-1.5">About</p>
              <p className="text-xs text-foreground leading-relaxed mb-3">{cur.about}</p>

              <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-1.5">Top Skills</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {cur.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 bg-muted text-foreground text-[11px] font-medium rounded-lg border border-border">{s}</span>
                ))}
              </div>

              {/* Docs */}
              <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-1.5">Documents</p>
              {cur.documents.map(d => (
                <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 mb-1.5 group">
                  <div className="w-6 h-6 rounded bg-red-50 flex items-center justify-center flex-shrink-0">
                    <FileText size={11} className="text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-foreground group-hover:text-foreground truncate">{d.name}</p>
                    <p className="text-[9px] text-foreground">{d.size}</p>
                  </div>
                </a>
              ))}

              {/* Links */}
              {cur.githubProfileUrl && (
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-1">Github Profile</p>
                  <a href={`https://${cur.githubProfileUrl}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#3B82F6] hover:underline">
                    <Link2 size={11} /> {cur.githubProfileUrl}
                  </a>
                </div>
              )}
              {cur.portfolioUrl && (
                <div className="mt-2">
                  <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-1">/Portfolio</p>
                  <a href={`https://${cur.portfolioUrl}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] text-[#3B82F6] hover:underline">
                    <Globe size={11} /> {cur.portfolioUrl}
                  </a>
                </div>
              )}
            </div>

            {/* Right: summary */}
            <div className="p-4 sm:p-5">
              <p className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-2">Quick Summary</p>
              <ul className="space-y-1.5">
                {cur.summaryHighlights.map(h => (
                  <li key={h} className="flex items-start gap-2 text-xs text-foreground">
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-muted flex-shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-t border-border flex-wrap gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <button onClick={() => onReject(cur)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 text-xs font-semibold transition-all active:scale-95">
                <X size={12} /> Reject
              </button>
              <button onClick={() => onMoveToReview(cur)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 text-xs font-semibold transition-all active:scale-95">
                <Eye size={12} /> Move to Review
              </button>
              <button onClick={() => onShortlist(cur)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted text-white text-xs font-semibold transition-all active:scale-95 shadow-sm">
                <Star size={12} /> Shortlist
              </button>
            </div>
            <button onClick={() => onViewFull(cur)}
              className="flex items-center gap-1 text-xs font-medium text-foreground hover:text-foreground transition-colors">
              View Full Application <ExternalLink size={10} />
            </button>
          </div>
        </div>

        {/* Next arrow */}
        <button onClick={goNext} disabled={animating} aria-label="Next candidate"
          className="w-8 sm:w-10 flex items-center justify-center border-l border-border hover:bg-muted transition-colors disabled:opacity-40 flex-shrink-0">
          <ChevronRight size={16} className="text-foreground" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 py-3">
        {candidates.map((_, i) => (
          <button key={i} onClick={() => go(i, i > idx ? 'right' : 'left')} aria-label={`Candidate ${i + 1}`}
            className={cn('rounded-full transition-all duration-200', i === idx ? 'w-4 h-2 bg-muted' : 'w-2 h-2 bg-[#D1D5DB] hover:bg-muted')} />
        ))}
      </div>
    </div>
  );
}

// ── Candidate Row ─────────────────────────────────────────────────────────────
function CandidateRow({ c, onView, onShortlist, onSchedule, onMore, onAssign }: {
  c: ReviewCandidate;
  onView: (c: ReviewCandidate) => void;
  onShortlist?: (c: ReviewCandidate) => void;
  onSchedule?: (c: ReviewCandidate) => void;
  onMore: (c: ReviewCandidate) => void;
  onAssign?: (c: ReviewCandidate) => void;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    let alive = true;
    import('gsap').then(({ gsap }) => {
      if (!alive || !rowRef.current) return;
      gsap.fromTo(rowRef.current, { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', clearProps: 'transform,opacity' });
    });
    return () => { alive = false; };
  }, []);

  return (
    <div id={`row-${c.id}`} ref={rowRef} onClick={() => onView(c)} className="flex items-center gap-3 px-4 sm:px-5 py-3.5 hover:bg-muted transition-colors border-b border-border last:border-0 cursor-pointer overflow-hidden">
      {/* Avatar */}
      <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-sm"
        style={{ backgroundColor: c.avatarColor }}>
        {c.avatarInitials}
      </div>

      {/* Name + meta */}
      <div className="min-w-0 flex-shrink-0 w-24 sm:w-32">
        <p className="text-xs font-semibold text-foreground truncate">{c.name}</p>
        <p className="text-[10px] text-foreground truncate">{c.major} • {c.year}</p>
      </div>

      {/* Applied time */}
      {(c.status === 'review' || c.status === 'shortlisted') && (
        <div className="hidden sm:block flex-shrink-0 w-16">
          <p className="text-[10px] text-foreground">Applied</p>
          <p className="text-[10px] font-medium text-foreground leading-tight">{c.appliedTime.replace('Applied ', '')}</p>
        </div>
      )}

      {/* Skills (review / shortlisted) */}
      {(c.status === 'review' || c.status === 'shortlisted') && (
        <div className="hidden md:flex flex-1 flex-wrap gap-1 items-center min-w-0">
          <p className="text-[10px] text-foreground w-full mb-0.5">Top Skills</p>
          {c.skills.slice(0, 3).map(s => (
            <span key={s} className="px-2 py-0.5 bg-muted text-[10px] font-medium text-foreground rounded-md border border-border">{s}</span>
          ))}
        </div>
      )}

      {/* Reviewer */}
      {c.status === 'review' && c.reviewedBy && (
        <div className="hidden lg:block flex-shrink-0">
          <p className="text-[10px] text-foreground">Reviewed by</p>
          <p className="text-[10px] font-semibold text-foreground">{c.reviewedBy}</p>
        </div>
      )}

      {/* Score */}
      {c.status === 'shortlisted' && c.score != null && (
        <div className="hidden sm:flex flex-col flex-shrink-0 items-end ml-auto mr-2">
          <p className="text-[10px] text-foreground mb-1">Score</p>
          <span className={cn('px-2.5 py-0.5 rounded-lg text-xs font-bold border',
            c.score >= 85 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
            : c.score >= 70 ? 'bg-blue-50 text-blue-700 border-blue-200'
            : 'bg-amber-50 text-amber-700 border-amber-200')}>
            {c.score} / 100
          </span>
        </div>
      )}

      {/* Interview info */}
      {c.status === 'interview' && (
        <>
          <div className="hidden sm:block flex-shrink-0 w-24">
            <p className="text-[10px] text-foreground">Interview on</p>
            <p className="text-[10px] font-semibold text-foreground">{c.interviewDate}, {c.interviewTime}</p>
          </div>
          <div className="hidden md:flex flex-col flex-shrink-0">
            <p className="text-[10px] text-foreground mb-1">Interviewers</p>
            <div className="flex items-center">
              {c.interviewers.slice(0, 3).map((iv, i) => (
                <div key={i} title={iv.name} className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-white -ml-1.5 first:ml-0"
                  style={{ backgroundColor: iv.avatarColor }}>{iv.initials}</div>
              ))}
              {c.interviewers.length > 3 && (
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-muted text-foreground text-[9px] font-bold border-2 border-white -ml-1.5">
                  +{c.interviewers.length - 3}
                </div>
              )}
            </div>
          </div>
          <div className="flex-1" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 flex-shrink-0">
            Scheduled
          </span>
        </>
      )}

      {/* Selected */}
      {c.status === 'selected' && (
        <>
          <div className="hidden sm:block flex-shrink-0 w-24">
            <p className="text-[10px] text-foreground">Selected on</p>
            <p className="text-[10px] font-semibold text-foreground">{c.selectedDate}</p>
          </div>
          {c.nextStepLabel && (
            <div className="hidden sm:flex flex-col flex-shrink-0">
              <p className="text-[10px] text-foreground mb-1">Next Step</p>
              <button onClick={e => { e.stopPropagation(); onAssign?.(c); }}
                className="px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-amber-50 border border-amber-200 text-amber-700 hover:bg-amber-100 transition-colors">
                {c.nextStepLabel}
              </button>
            </div>
          )}
          <div className="flex-1" />
        </>
      )}

      {c.status === 'rejected' && <div className="flex-1" />}

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
        {(c.status === 'shortlisted' || c.status === 'interview') && (
          <button onClick={e => { e.stopPropagation(); onSchedule?.(c); }} aria-label="Schedule"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all">
            <Calendar size={13} className="text-foreground" />
          </button>
        )}
        {c.status === 'review' && (
          <button onClick={e => { e.stopPropagation(); onShortlist?.(c); }} aria-label="Shortlist"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all">
            <Star size={13} className="text-foreground" />
          </button>
        )}
        {c.status === 'selected' && (
          <button onClick={e => { e.stopPropagation(); onAssign?.(c); }} aria-label="Assign"
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all">
            <UserPlus size={13} className="text-foreground" />
          </button>
        )}
        <button onClick={e => { e.stopPropagation(); onView(c); }} aria-label="View"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all">
          <Eye size={13} className="text-foreground" />
        </button>
        <button onClick={e => { e.stopPropagation(); onMore(c); }} aria-label="More"
          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all">
          <MoreVertical size={13} className="text-foreground" />
        </button>
      </div>
    </div>
  );
}

// ── Status Section Accordion ──────────────────────────────────────────────────
const STATUS_META: Record<CandidateStatus, { label: string; icon: React.ElementType; iconColor: string; badgeColor: string; desc: string }> = {
  new:         { label: 'New Applications',     icon: Inbox,        iconColor: 'text-foreground', badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',  desc: 'waiting for review.' },
  review:      { label: 'Under Review',         icon: Eye,          iconColor: 'text-[#3B82F6]', badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',        desc: 'being reviewed by your team.' },
  shortlisted: { label: 'Shortlisted',          icon: Star,         iconColor: 'text-[#14B8A6]', badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',        desc: 'shortlisted for interview.' },
  interview:   { label: 'Interview Scheduled',  icon: Calendar,     iconColor: 'text-[#8B5CF6]', badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',  desc: 'interviews are scheduled.' },
  selected:    { label: 'Selected',             icon: CheckCircle,  iconColor: 'text-[#10B981]', badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200', desc: 'selected for the role.' },
  rejected:    { label: 'Rejected',             icon: XCircle,      iconColor: 'text-[#EF4444]', badgeColor: 'bg-red-50 text-red-700 border-red-200',           desc: 'not proceeding further.' },
};

function StatusSection({ status, candidates, totalCount, defaultOpen = true, onView, onShortlist, onSchedule, onMore, onAssign, onViewAll }: {
  status: CandidateStatus; candidates: ReviewCandidate[]; totalCount: number;
  defaultOpen?: boolean;
  onView: (c: ReviewCandidate) => void;
  onShortlist?: (c: ReviewCandidate) => void;
  onSchedule?: (c: ReviewCandidate) => void;
  onMore: (c: ReviewCandidate) => void;
  onAssign?: (c: ReviewCandidate) => void;
  onViewAll?: (s: CandidateStatus) => void;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [animating, setAnimating] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const m = STATUS_META[status];
  const Icon = m.icon;

  const toggle = async () => {
    if (animating) return;
    setAnimating(true);
    const { gsap } = await import('gsap');
    const body = bodyRef.current;
    if (!body) { setOpen(p => !p); setAnimating(false); return; }
    if (open) {
      await gsap.to(body, { height: 0, opacity: 0, duration: 0.25, ease: 'power2.inOut' });
      setOpen(false);
    } else {
      setOpen(true);
      // height: auto trick
      const h = body.scrollHeight;
      gsap.fromTo(body, { height: 0, opacity: 0 }, { height: h, opacity: 1, duration: 0.28, ease: 'power2.out', onComplete: () => { gsap.set(body, { height: 'auto' }); } });
    }
    setAnimating(false);
  };

  return (
    <div className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Accordion header — uses a div so "View all" button isn't nested inside another button */}
      <div className="flex items-center justify-between px-4 sm:px-5 hover:bg-muted transition-colors">
        {/* Left: clickable toggle area */}
        <div
          role="button"
          tabIndex={0}
          aria-expanded={open}
          onClick={toggle}
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && toggle()}
          className="flex-1 flex items-center gap-3 py-4 cursor-pointer min-w-0 text-left"
        >
          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
            <Icon size={15} className={m.iconColor} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-foreground">{m.label}</h2>
              <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold border', m.badgeColor)}>{totalCount}</span>
            </div>
            <p className="text-[11px] text-foreground mt-0.5">{totalCount} {m.desc}</p>
          </div>
        </div>

        {/* Right: View all (real button) + chevron toggle */}
        <div className="flex items-center gap-2 flex-shrink-0 py-4">
          <button
            onClick={e => { e.stopPropagation(); onViewAll?.(status); }}
            className="hidden sm:flex items-center gap-1 text-xs text-foreground hover:text-foreground font-medium transition-colors"
          >
            View all ({totalCount}) <ChevronDown size={11} />
          </button>
          <div
            role="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={toggle}
            className="w-7 h-7 flex items-center justify-center rounded-lg bg-muted cursor-pointer"
          >
            <ChevronDown size={13} className={cn("text-foreground transition-transform duration-200", open ? "rotate-180" : "")} />
          </div>
        </div>
      </div>

      <div ref={bodyRef} className={cn('border-t border-border overflow-hidden', !open && 'hidden')} style={{ height: open ? 'auto' : 0 }}>
        {candidates.length === 0
          ? <p className="px-5 py-8 text-center text-sm text-foreground">No candidates in this stage yet.</p>
          : <>
            {candidates.map(c => (
              <CandidateRow key={c.id} c={c} onView={onView} onShortlist={onShortlist}
                onSchedule={onSchedule} onMore={onMore} onAssign={onAssign} />
            ))}
            {totalCount > candidates.length && (
              <div className="px-5 py-3 border-t border-border flex justify-center">
                <button onClick={() => onViewAll?.(status)} className="text-xs font-medium text-foreground hover:text-[#EA580C] transition-colors">
                  View all {totalCount} →
                </button>
              </div>
            )}
          </>
        }
      </div>
    </div>
  );
}

// ── Candidate Profile Drawer (Modal) ──────────────────────────────────────────
function CandidateProfileDrawer({ candidate, onClose }: { candidate: ReviewCandidate | null; onClose: () => void }) {
  const [animating, setAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!candidate) return;
    let alive = true;
    import('gsap').then(({ gsap }) => {
      if (!alive) return;
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.2 });
      gsap.fromTo(panelRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' });
    });
    return () => { alive = false; };
  }, [candidate]);

  const handleClose = async () => {
    if (animating) return;
    setAnimating(true);
    const { gsap } = await import('gsap');
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    await gsap.to(panelRef.current, { y: 50, opacity: 0, duration: 0.2, ease: 'power2.in' });
    onClose();
    setAnimating(false);
  };

  if (!candidate) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-4">
      <div ref={overlayRef} className="absolute inset-0 bg-muted/40 backdrop-blur-sm" onClick={handleClose} />
      
      <div ref={panelRef} className="relative w-full h-full sm:h-auto sm:max-h-[90vh] sm:max-w-2xl bg-white sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-md"
              style={{ backgroundColor: candidate.avatarColor }}>
              {candidate.avatarInitials}
            </div>
            <div>
              <h2 className="text-lg font-bold text-foreground">{candidate.name}</h2>
              <p className="text-sm text-foreground font-medium">{candidate.major} • {candidate.year}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-50 text-blue-700 border border-blue-200">
                  {candidate.status}
                </span>
                <span className="text-[11px] text-foreground">{candidate.appliedTime}</span>
              </div>
            </div>
          </div>
          <button onClick={handleClose} className="p-2 rounded-xl hover:bg-muted transition-colors text-foreground">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[
              ['CGPA', candidate.cgpa],
              ['Experience', candidate.experience ?? '—'],
              ['Location', candidate.location],
              ['University', candidate.university]
            ].map(([l, v]) => (
              <div key={l} className="bg-muted p-3 rounded-xl border border-border">
                <p className="text-[10px] text-foreground uppercase tracking-wider font-semibold mb-1">{l}</p>
                <p className="text-xs font-bold text-foreground truncate" title={v as string}>{v}</p>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">About</h3>
            <p className="text-sm text-foreground leading-relaxed bg-muted p-4 rounded-xl border border-[#F0F2F5]">{candidate.about}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {candidate.skills.map(s => (
                  <span key={s} className="px-2.5 py-1 bg-[#F0F2F5] text-[#374151] text-xs font-medium rounded-lg border border-border">{s}</span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Links</h3>
              <div className="space-y-2">
                {candidate.githubProfileUrl && (
                  <a href={`https://${candidate.githubProfileUrl}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted group-hover:text-white transition-colors">
                      <Link2 size={14} className="text-foreground group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-foreground">Github</p>
                      <p className="text-xs font-medium text-[#3B82F6] truncate">{candidate.githubProfileUrl}</p>
                    </div>
                  </a>
                )}
                {candidate.portfolioUrl && (
                  <a href={`https://${candidate.portfolioUrl}`} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl hover:bg-muted transition-colors group">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center group-hover:bg-muted group-hover:text-white transition-colors">
                      <Globe size={14} className="text-foreground group-hover:text-white" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-semibold text-foreground">Portfolio</p>
                      <p className="text-xs font-medium text-[#3B82F6] truncate">{candidate.portfolioUrl}</p>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2">Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {candidate.documents.map(d => (
                <a key={d.name} href={d.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-border hover:shadow-sm transition-all group bg-white">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <FileText size={14} className="text-red-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground group-hover:text-foreground truncate transition-colors">{d.name}</p>
                    <p className="text-[10px] font-medium text-foreground mt-0.5">{d.size}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-border bg-muted flex items-center justify-end gap-2">
          <button onClick={handleClose}
            className="px-4 py-2 text-xs font-bold text-foreground hover:bg-muted rounded-xl transition-colors">
            Close
          </button>
          <a href={`mailto:hello@campusconnect.edu`}
            className="flex items-center gap-1.5 px-5 py-2 bg-muted text-white text-xs font-bold rounded-xl shadow-sm hover:bg-muted/90 transition-all active:scale-95">
            Contact Candidate
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
/**
 * BACKEND INTEGRATION GUIDE
 * ─────────────────────────────────────────────────────────────────────────────
 * All data is currently sourced from local mock data.
 * When the API is ready:
 *
 *  1. Replace `allCandidates` import with a data-fetching hook:
 *       const { data, mutate } = useSWR(`/api/recruitment/roles/${roleId}/candidates`);
 *
 *  2. Replace local `setCandidates` mutations with optimistic API calls:
 *       await fetch(`/api/recruitment/candidates/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
 *       mutate(); // revalidate SWR cache
 *
 *  3. `metrics` (pipeline counts) should come from the API response, not be
 *     computed client-side:
 *       const metrics = data.metrics;  // PipelineMetrics from API
 *
 *  4. Accordion preview count (`preview`) is a UI concern — keep it here.
 *     Pass `totalCount` from `metrics` so it always reflects server data.
 *
 *  5. `currentRole` should come from:
 *       const { role } = await fetchRecruitmentRole(roleId);
 *     Pass `roleId` from `params` (this page is currently static).
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function RecruitmentPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeStatus, setActiveStatus] = useState<CandidateStatus>('new');
  const router = useRouter();

  // TODO: Replace with useSWR/useQuery hook:
  //   const { candidates, isLoading } = useRecruitmentCandidates(roleId);
  const [candidates, setCandidates] = useState<ReviewCandidate[]>(allCandidates);

  const { toast, show: showToast } = useToast();
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP mount animation
  useEffect(() => {
    let alive = true;
    import('gsap').then(({ gsap }) => {
      if (!alive || !containerRef.current) return;
      const els = containerRef.current.querySelectorAll('[data-a]');
      gsap.fromTo(els, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.07, ease: 'power2.out', clearProps: 'transform,opacity' });
    });
    return () => { alive = false; };
  }, []);

  // Derive filtered lists from local state.
  // TODO: When paginating server-side, replace `by()` with the API response per-status.
  const by = (s: CandidateStatus) => candidates.filter(c => c.status === s);

  // TODO: Replace with metrics from API response when backend is connected.
  //   const metrics: PipelineMetrics = apiResponse.metrics;
  const metrics: PipelineMetrics = {
    newCount: by('new').length,
    reviewCount: by('review').length,
    shortlistCount: by('shortlisted').length,
    interviewCount: by('interview').length,
    selectedCount: by('selected').length,
    rejectedCount: by('rejected').length,
  };

  // Typed helper — avoids string template hacks for metric key lookup.
  const getCount = (s: CandidateStatus): number => {
    switch (s) {
      case 'new':         return metrics.newCount;
      case 'review':      return metrics.reviewCount;
      case 'shortlisted': return metrics.shortlistCount;
      case 'interview':   return metrics.interviewCount;
      case 'selected':    return metrics.selectedCount;
      case 'rejected':    return metrics.rejectedCount;
    }
  };

  // Local optimistic mutation — wraps setCandidates with exit animation
  // TODO: Replace body with: await patchCandidateStatus(id, status);
  const mutate = (id: string, status: CandidateStatus) => {
    const el = document.getElementById(`row-${id}`);
    if (el) {
      import('gsap').then(({ gsap }) => {
        gsap.to(el, { opacity: 0, height: 0, margin: 0, padding: 0, duration: 0.25, ease: 'power2.in', onComplete: () => {
          setCandidates(p => p.map(c => c.id === id ? { ...c, status } : c));
        }});
      });
    } else {
      setCandidates(p => p.map(c => c.id === id ? { ...c, status } : c));
    }
  };

  // ── Action handlers ─────────────────────────────────────────────────────────
  // Each has a TODO showing the exact API call to make when backend is ready.

  // TODO: POST /api/recruitment/candidates/:id/reject
  const handleReject = (c: ReviewCandidate) => {
    mutate(c.id, 'rejected');
    showToast(`${c.name} rejected.`, 'error');
  };

  // TODO: PATCH /api/recruitment/candidates/:id/status { status: 'review' }
  const handleMoveToReview = (c: ReviewCandidate) => {
    mutate(c.id, 'review');
    showToast(`${c.name} moved to Under Review.`, 'info');
  };

  // TODO: PATCH /api/recruitment/candidates/:id/status { status: 'shortlisted' }
  const handleShortlist = (c: ReviewCandidate) => {
    mutate(c.id, 'shortlisted');
    showToast(`${c.name} shortlisted!`, 'success');
  };

  // TODO: POST /api/recruitment/roles/:roleId/candidates/bulk-review
  const handleMarkAll = () => {
    setCandidates(p => p.map(c => c.status === 'new' ? { ...c, status: 'review' as CandidateStatus } : c));
    showToast('All new applications moved to Under Review.', 'info');
  };

  // TODO: navigate to /recruitment/applications/:roleId/candidates/:id
  const handleViewFull = (c: ReviewCandidate) => router.push('/recruitment/candidate');

  // TODO: open ScheduleInterviewModal — POST /api/recruitment/interviews
  const handleSchedule = (c: ReviewCandidate) => showToast(`Schedule interview for ${c.name} — modal coming soon.`, 'info');

  // TODO: open AssignDepartmentModal — PATCH /api/recruitment/candidates/:id/department
  const handleAssign = (c: ReviewCandidate) => showToast(`Assign department for ${c.name} — modal coming soon.`, 'info');

  // TODO: open CandidateProfileDrawer
  const handleView = (c: ReviewCandidate) => router.push('/recruitment/candidate');

  // TODO: open CandidateContextMenu
  const handleMore = (c: ReviewCandidate) => showToast(`More actions for ${c.name}.`, 'info');

  // TODO: navigate to paginated /recruitment/applications/:roleId?status=:s
  const handleViewAll = (s: CandidateStatus) => showToast(`View all ${s} candidates — navigation coming soon.`, 'info');

  // TODO: trigger GET /api/recruitment/roles/:roleId/candidates/export.csv
  const handleExport = () => showToast('Generating export… (coming soon)', 'info');

  // TODO: navigate to /recruitment/analytics/:roleId
  const handleViewAnalytics = () => showToast('Analytics page coming soon.', 'info');

  const newList = by('new');

  return (
    <div className="flex min-h-screen bg-muted">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar onMenuOpen={() => setSidebarOpen(true)} />

        <main ref={containerRef} className="flex-1 overflow-y-auto">
          {/* Toast */}
          {toast && (
            <div role="alert" aria-live="polite"
              className={cn('fixed top-4 right-4 z-[999] px-4 py-3 rounded-xl shadow-xl text-sm font-medium text-white max-w-xs',
                toast.type === 'success' ? 'bg-emerald-600' : toast.type === 'error' ? 'bg-red-500' : 'bg-muted')}>
              {toast.message}
            </div>
          )}

          {/* Page Header */}
          <div data-a className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 px-4 sm:px-6 pt-5 pb-4">
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight tracking-tight">
                {currentRole.title}
              </h1>
              <p className="text-sm font-semibold text-foreground mt-0.5">{currentRole.subtitle}</p>
              <p className="text-xs text-foreground mt-1 hidden sm:block">{currentRole.description}</p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={handleExport}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white border border-border hover:border-[#D1D5DB] text-foreground text-xs sm:text-sm font-medium shadow-sm hover:shadow-md transition-all active:scale-95">
                <Download size={13} className="text-foreground" /> Export
              </button>
              <button onClick={handleViewAnalytics}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-foreground hover:bg-foreground/90 text-background text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-all active:scale-95">
                <BarChart2 size={13} /> <span className="hidden sm:inline">View Analytics</span><span className="sm:hidden">Analytics</span>
              </button>
            </div>
          </div>

          {/* Pipeline Bar */}
          <div data-a className="px-4 sm:px-6 mb-4">
            <PipelineBar metrics={metrics} active={activeStatus} onChange={setActiveStatus} />
          </div>

          {/* Carousel */}
          {newList.length > 0 && (
            <div data-a className="px-4 sm:px-6 mb-4">
              <Carousel candidates={newList} onReject={handleReject} onMoveToReview={handleMoveToReview}
                onShortlist={handleShortlist} onViewFull={handleViewFull} onMarkAll={handleMarkAll} />
            </div>
          )}

          {/* Accordion Sections — pipeline stages below the carousel
              preview: how many rows to show before "View all" link appears.
              totalCount: always comes from metrics (API-derived when connected). */}
          {([
            { status: 'review'      as const, preview: 3, open: true  },
            { status: 'shortlisted' as const, preview: 2, open: true  },
            { status: 'interview'   as const, preview: 2, open: true  },
            { status: 'selected'    as const, preview: 2, open: true  },
            { status: 'rejected'    as const, preview: 1, open: false },
          ]).map(({ status, preview, open }) => (
            <div data-a key={status} className="px-4 sm:px-6 mb-3">
              <StatusSection
                status={status}
                // Pass only the preview slice; totalCount tells the section how many exist in total
                candidates={by(status).slice(0, preview)}
                // getCount() is type-safe — no template-literal hacks
                totalCount={getCount(status)}
                defaultOpen={open}
                onView={handleView}
                onShortlist={status === 'review'      ? handleShortlist : undefined}
                onSchedule={ status === 'shortlisted' || status === 'interview' ? handleSchedule : undefined}
                onMore={handleMore}
                onAssign={status === 'selected'       ? handleAssign    : undefined}
                onViewAll={handleViewAll}
              />
            </div>
          ))}

          {/* Tip Banner */}
          <div data-a className="px-4 sm:px-6 mb-6">
            <div className="flex items-center gap-3 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={13} className="text-amber-600" />
              </div>
              <p className="text-xs text-amber-800 font-medium">
                <span className="font-bold">Tip:</span> Use arrow keys{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-[10px] font-mono">←</kbd>{' '}
                <kbd className="px-1.5 py-0.5 rounded bg-amber-100 border border-amber-300 text-[10px] font-mono">→</kbd>{' '}
                to move between candidates quickly.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
