// ── Recruitment Portal — TypeScript Interfaces ────────────────────────────────
// All interfaces are decoupled from mock data.
// When the backend is ready, replace mock data imports with API calls —
// the UI components only reference these types, so no component changes needed.

export type CandidateStatus =
  | 'new'
  | 'review'
  | 'shortlisted'
  | 'interview'
  | 'selected'
  | 'rejected';

export interface DocumentFile {
  name: string;
  size: string;
  /** Icon identifier: 'pdf' | 'doc' | 'link' */
  icon: 'pdf' | 'doc' | 'link';
  /** URL to download/preview — filled by API */
  url: string;
}

export interface InterviewerAvatar {
  /** Initials to render when image is missing */
  initials: string;
  avatarColor: string;
  name: string;
}

export interface Candidate {
  id: string;
  name: string;
  /** Initials used for avatar fallback */
  avatarInitials: string;
  avatarColor: string;
  /** Optional URL for real profile photo — set by API */
  avatarUrl?: string;
  major: string;
  year: string;
  university: string;
  /** Human-readable relative time, e.g. "2 hours ago" */
  appliedTime: string;
  /** ISO timestamp for sorting/filtering — set by API */
  appliedAt?: string;
  cgpa: string;
  experience: string | null;
  location: string;
  about: string;
  documents: DocumentFile[];
  githubProfileUrl: string | null;
  portfolioUrl: string | null;
  skills: string[];
  summaryHighlights: string[];
}

export interface ReviewCandidate extends Candidate {
  status: CandidateStatus;
  /** 0–100 score assigned by reviewer */
  score?: number;
  reviewedBy?: string;
  /** ISO date string for interview */
  interviewDate?: string;
  /** Human-readable time, e.g. "02:00 PM" */
  interviewTime?: string;
  interviewers: InterviewerAvatar[];
  /** ISO date selected */
  selectedDate?: string;
  /** Label for the "Next Step" pill, e.g. "Assign Department" */
  nextStepLabel?: string;
}

export interface PipelineMetrics {
  /** Total new (unreviewed) applications */
  newCount: number;
  reviewCount: number;
  shortlistCount: number;
  interviewCount: number;
  selectedCount: number;
  rejectedCount: number;
}

export interface RecruitmentRole {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  /** Derived from candidates array — kept separate for API pre-computation */
  metrics: PipelineMetrics;
}

/** Navigation item for the recruitment sidebar */
export interface RecruitmentNavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
  isActive?: boolean;
  badge?: number;
}
