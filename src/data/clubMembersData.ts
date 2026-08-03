// ─────────────────────────────────────────────────────────────────────────────
// Campus Connect — Club Admin Mock Data (swap with API hooks when ready)
// ─────────────────────────────────────────────────────────────────────────────

import type {
  ClubMember,
  LeadershipMember,
  ClubMetrics,
  MemberActivityLog,
  DepartmentDistribution,
  YearDistribution,
  GenderRatio,
  SkillTag,
  AdminProfile,
  ClubInfo,
} from '@/types/clubAdmin';

// ── Admin Profile ─────────────────────────────────────────────────────────────
export const adminProfile: AdminProfile = {
  name: 'Rohit Varma',
  role: 'Club Lead',
  avatarInitials: 'RV',
  avatarColor: '#D97706',
};

// ── Current Club ─────────────────────────────────────────────────────────────
export const currentClub: ClubInfo = {
  id: 'tc-tech-club',
  name: 'TC Tech Club',
  university: 'GITAM University',
};

// ── Club Metrics ──────────────────────────────────────────────────────────────
export const clubMetrics: ClubMetrics = {
  totalMembers: 320,
  newThisSemester: 24,
  coreCommitteeCount: 18,
  pendingRequestsCount: 12,
  activeMembersCount: 210,
};

// ── Leadership Team ───────────────────────────────────────────────────────────
export const leadershipTeam: LeadershipMember[] = [
  {
    id: 'l1',
    name: 'Rahul Sharma',
    role: 'President',
    department: 'Computer Science',
    year: '4th Year',
    avatarInitials: 'RS',
    avatarColor: '#1E40AF',
    email: 'rahul.sharma@gitam.edu',
    isOnline: true,
  },
  {
    id: 'l2',
    name: 'Ananya Reddy',
    role: 'Vice President',
    department: 'Electronics Engg.',
    year: '3rd Year',
    avatarInitials: 'AR',
    avatarColor: '#7C3AED',
    email: 'ananya.reddy@gitam.edu',
    isOnline: true,
  },
  {
    id: 'l3',
    name: 'Karthik R.',
    role: 'Secretary',
    department: 'Computer Science',
    year: '3rd Year',
    avatarInitials: 'KR',
    avatarColor: '#0369A1',
    email: 'karthik.r@gitam.edu',
    isOnline: false,
  },
  {
    id: 'l4',
    name: 'Megha Iyer',
    role: 'Treasurer',
    department: 'Information Tech.',
    year: '3rd Year',
    avatarInitials: 'MI',
    avatarColor: '#047857',
    email: 'megha.iyer@gitam.edu',
    isOnline: false,
  },
  {
    id: 'l5',
    name: 'Dr. K. Senthil',
    role: 'Faculty Advisor',
    department: 'Professor',
    year: 'Advisor',
    avatarInitials: 'KS',
    avatarColor: '#92400E',
    email: 'k.senthil@gitam.edu',
    isOnline: true,
  },
];

// ── Core Committee ────────────────────────────────────────────────────────────
export const coreCommittee: LeadershipMember[] = [
  {
    id: 'c1',
    name: 'Abhinav P.',
    role: 'Technical Lead',
    department: 'CSE',
    year: '4th Year',
    avatarInitials: 'AP',
    avatarColor: '#0E7490',
    email: 'abhinav.p@gitam.edu',
  },
  {
    id: 'c2',
    name: 'Sneha M.',
    role: 'Design Lead',
    department: 'IT',
    year: '3rd Year',
    avatarInitials: 'SM',
    avatarColor: '#BE185D',
    email: 'sneha.m@gitam.edu',
  },
  {
    id: 'c3',
    name: 'Vivek S.',
    role: 'Content Lead',
    department: 'CSE',
    year: '3rd Year',
    avatarInitials: 'VS',
    avatarColor: '#1D4ED8',
    email: 'vivek.s@gitam.edu',
  },
  {
    id: 'c4',
    name: 'Pooja K.',
    role: 'Marketing Lead',
    department: 'ECE',
    year: '3rd Year',
    avatarInitials: 'PK',
    avatarColor: '#D97706',
    email: 'pooja.k@gitam.edu',
  },
  {
    id: 'c5',
    name: 'Arjun D.',
    role: 'Sponsorship Lead',
    department: 'ME',
    year: '4th Year',
    avatarInitials: 'AD',
    avatarColor: '#4338CA',
    email: 'arjun.d@gitam.edu',
  },
];

// ── All Members (Table Data) ──────────────────────────────────────────────────
export const allMembers: ClubMember[] = [
  {
    id: 'm1',
    name: 'Rahul Sharma',
    avatarInitials: 'RS',
    avatarColor: '#1E40AF',
    role: 'President',
    department: 'CSE',
    year: '4th Year',
    eventsCount: 18,
    volunteerHours: 52,
    attendancePercentage: 98,
    joinedDate: '12 Jan 2024',
    status: 'Active',
    email: 'rahul.sharma@gitam.edu',
  },
  {
    id: 'm2',
    name: 'Ananya Reddy',
    avatarInitials: 'AR',
    avatarColor: '#7C3AED',
    role: 'Vice President',
    department: 'ECE',
    year: '3rd Year',
    eventsCount: 15,
    volunteerHours: 40,
    attendancePercentage: 95,
    joinedDate: '18 Feb 2024',
    status: 'Active',
    email: 'ananya.reddy@gitam.edu',
  },
  {
    id: 'm3',
    name: 'Karthik R.',
    avatarInitials: 'KR',
    avatarColor: '#0369A1',
    role: 'Secretary',
    department: 'CSE',
    year: '3rd Year',
    eventsCount: 12,
    volunteerHours: 36,
    attendancePercentage: 92,
    joinedDate: '20 Jan 2024',
    status: 'Active',
    email: 'karthik.r@gitam.edu',
  },
  {
    id: 'm4',
    name: 'Megha Iyer',
    avatarInitials: 'MI',
    avatarColor: '#047857',
    role: 'Treasurer',
    department: 'IT',
    year: '3rd Year',
    eventsCount: 10,
    volunteerHours: 28,
    attendancePercentage: 90,
    joinedDate: '15 Feb 2024',
    status: 'Active',
    email: 'megha.iyer@gitam.edu',
  },
  {
    id: 'm5',
    name: 'Abhinav P.',
    avatarInitials: 'AP',
    avatarColor: '#0E7490',
    role: 'Technical Lead',
    department: 'CSE',
    year: '4th Year',
    eventsCount: 16,
    volunteerHours: 45,
    attendancePercentage: 96,
    joinedDate: '10 Jan 2024',
    status: 'Active',
    email: 'abhinav.p@gitam.edu',
  },
  {
    id: 'm6',
    name: 'Sneha M.',
    avatarInitials: 'SM',
    avatarColor: '#BE185D',
    role: 'Design Lead',
    department: 'IT',
    year: '3rd Year',
    eventsCount: 9,
    volunteerHours: 22,
    attendancePercentage: 88,
    joinedDate: '22 Mar 2024',
    status: 'Active',
    email: 'sneha.m@gitam.edu',
  },
  {
    id: 'm7',
    name: 'Vivek S.',
    avatarInitials: 'VS',
    avatarColor: '#1D4ED8',
    role: 'Content Lead',
    department: 'CSE',
    year: '3rd Year',
    eventsCount: 11,
    volunteerHours: 30,
    attendancePercentage: 91,
    joinedDate: '25 Feb 2024',
    status: 'Active',
    email: 'vivek.s@gitam.edu',
  },
  {
    id: 'm8',
    name: 'Pooja K.',
    avatarInitials: 'PK',
    avatarColor: '#D97706',
    role: 'Marketing Lead',
    department: 'ECE',
    year: '3rd Year',
    eventsCount: 8,
    volunteerHours: 20,
    attendancePercentage: 87,
    joinedDate: '13 Mar 2024',
    status: 'Active',
    email: 'pooja.k@gitam.edu',
  },
];

// ── Member Activity Log ───────────────────────────────────────────────────────
export const memberActivityLog: MemberActivityLog[] = [
  {
    id: 'a1',
    description: 'Rahul Sharma was promoted to President',
    timestamp: '10 Apr 2026',
    type: 'promotion',
  },
  {
    id: 'a2',
    description: 'Pooja K. completed 10 volunteer hours for Annual Tech-Fest 2026',
    timestamp: '08 Apr 2026',
    type: 'achievement',
  },
  {
    id: 'a3',
    description: 'Sneha M. joined the club',
    timestamp: '06 Apr 2026',
    type: 'join',
  },
  {
    id: 'a4',
    description: '25 new member requests received',
    timestamp: '03 Apr 2026',
    type: 'request',
  },
  {
    id: 'a5',
    description: 'Karthik R. organised "AI Workshop"',
    timestamp: '01 Apr 2026',
    type: 'event',
  },
];

// ── Analytics Data ────────────────────────────────────────────────────────────
export const departmentDistribution: DepartmentDistribution[] = [
  { department: 'CSE', percentage: 40, color: '#1E40AF' },
  { department: 'ECE', percentage: 25, color: '#D97706' },
  { department: 'IT', percentage: 15, color: '#047857' },
  { department: 'ME', percentage: 10, color: '#7C3AED' },
  { department: 'Others', percentage: 10, color: '#6B7280' },
];

export const yearDistribution: YearDistribution[] = [
  { year: '1st Year', percentage: 25 },
  { year: '2nd Year', percentage: 28 },
  { year: '3rd Year', percentage: 32 },
  { year: '4th Year', percentage: 15 },
];

export const genderRatio: GenderRatio[] = [
  { label: 'Male', percentage: 68, color: '#1E40AF' },
  { label: 'Female', percentage: 30, color: '#BE185D' },
  { label: 'Other', percentage: 2, color: '#6B7280' },
];

export const topSkills: SkillTag[] = [
  { id: 's1', label: 'Programming', count: 128 },
  { id: 's2', label: 'UI/UX Design', count: 64 },
  { id: 's3', label: 'Photography', count: 48 },
  { id: 's4', label: 'Video Editing', count: 36 },
  { id: 's5', label: 'Public Speaking', count: 30 },
  { id: 's6', label: '+6 more', count: 0 },
];

// ── Admin Nav Items ────────────────────────────────────────────────────────────
export interface AdminNavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
  isActive?: boolean;
}

export const adminNavItems: AdminNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/club-admin' },
  { id: 'events', label: 'Events', icon: 'CalendarDays', href: '/club-admin/events' },
  { id: 'members', label: 'Members', icon: 'Users', href: '/club-admin/members', isActive: true },
  { id: 'recruitment', label: 'Recruitment', icon: 'UserPlus', href: '/club-admin/recruitment', badge: 12 },
  { id: 'reports', label: 'Reports', icon: 'BarChart2', href: '/club-admin/reports' },
  { id: 'payments', label: 'Payments', icon: 'CreditCard', href: '/club-admin/payments' },
  { id: 'resources', label: 'Resources', icon: 'FolderOpen', href: '/club-admin/resources' },
  { id: 'operations', label: 'Operations', icon: 'Settings2', href: '/club-admin/operations' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/club-admin/settings' },
  { id: 'support', label: 'Support', icon: 'LifeBuoy', href: '/club-admin/support' },
];
