// ─────────────────────────────────────────────────────────────────────────────
// Campus Connect — Club Admin Portal Type Definitions
// ─────────────────────────────────────────────────────────────────────────────

// ── Role Definitions ──────────────────────────────────────────────────────────
export type MemberRole =
  | 'President'
  | 'Vice President'
  | 'Secretary'
  | 'Treasurer'
  | 'Technical Lead'
  | 'Design Lead'
  | 'Content Lead'
  | 'Marketing Lead'
  | 'Sponsorship Lead'
  | 'Faculty Advisor'
  | 'Member';

export type MemberStatus = 'Active' | 'Pending' | 'Inactive';

export type ActivityType = 'promotion' | 'achievement' | 'join' | 'request' | 'event';

// ── Core Member Interface ─────────────────────────────────────────────────────
export interface ClubMember {
  id: string;
  name: string;
  /** Initials or URL — use initials for mock data, swap for real avatars from API */
  avatarInitials: string;
  /** Optional avatar image URL — takes priority over initials */
  avatarUrl?: string;
  /** Hex color for the avatar background */
  avatarColor: string;
  role: MemberRole;
  department: string;
  year: string;
  eventsCount: number;
  volunteerHours: number;
  attendancePercentage: number;
  joinedDate: string;
  status: MemberStatus;
  email: string;
}

// ── Leadership / Core Committee Card ─────────────────────────────────────────
export interface LeadershipMember {
  id: string;
  name: string;
  role: MemberRole;
  department: string;
  year: string;
  avatarInitials: string;
  avatarColor: string;
  avatarUrl?: string;
  email: string;
  /** Whether member is currently online/active */
  isOnline?: boolean;
}

// ── Club Summary Metrics ──────────────────────────────────────────────────────
export interface ClubMetrics {
  totalMembers: number;
  newThisSemester: number;
  coreCommitteeCount: number;
  pendingRequestsCount: number;
  activeMembersCount: number;
}

// ── Activity Log ──────────────────────────────────────────────────────────────
export interface MemberActivityLog {
  id: string;
  description: string;
  timestamp: string;
  type: ActivityType;
  /** Optional sub-label (e.g. event name) */
  meta?: string;
}

// ── Analytics ────────────────────────────────────────────────────────────────
export interface DepartmentDistribution {
  department: string;
  percentage: number;
  color: string;
}

export interface YearDistribution {
  year: string;
  percentage: number;
}

export interface GenderRatio {
  label: string;
  percentage: number;
  color: string;
}

export interface SkillTag {
  id: string;
  label: string;
  count: number;
}

// ── Filter/Sort State ─────────────────────────────────────────────────────────
export interface MemberFilters {
  role: MemberRole | 'All Roles';
  department: string | 'All Departments';
  year: string | 'All Years';
  status: MemberStatus | 'All Status';
  search: string;
}

// ── Admin Profile ─────────────────────────────────────────────────────────────
export interface AdminProfile {
  name: string;
  role: string;
  avatarInitials: string;
  avatarColor: string;
}

// ── Club Info ─────────────────────────────────────────────────────────────────
export interface ClubInfo {
  id: string;
  name: string;
  university: string;
}
