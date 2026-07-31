// ─────────────────────────────────────────────────────────────────────────────
// Campus Connect — Dashboard Mock Data & Typed Interfaces
// ─────────────────────────────────────────────────────────────────────────────

// ── User Profile ─────────────────────────────────────────────────────────────
export interface UserProfile {
  name: string;
  firstName: string;
  greeting: string;
  department: string;
  year: string;
  avatarUrl: string;
  unreadNotifications: number;
}

export const userProfile: UserProfile = {
  name: "Mahesh Kumar",
  firstName: "Mahesh",
  greeting: "Good Evening",
  department: "CSE",
  year: "3rd Year",
  avatarUrl: "/avatar.jpg",
  unreadNotifications: 3,
};

// ── Quick Stats ───────────────────────────────────────────────────────────────
export interface QuickStat {
  id: string;
  label: string;
  value: string | number;
  icon: "calendar" | "clock" | "users";
}

export const quickStats: QuickStat[] = [
  { id: "events-today", label: "Events today", value: 3, icon: "calendar" },
  { id: "reg-closing", label: "Registrations closing", value: 2, icon: "clock" },
  { id: "friends", label: "Friends attending", value: 12, icon: "users" },
];

// ── Event Item ────────────────────────────────────────────────────────────────
export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  categoryColor?: "red" | "amber" | "purple" | "blue" | "green" | "indigo";
  organizer: string;
  date: string;
  time: string;
  location: string;
  image: string;
  isLive?: boolean;
  isClosingSoon?: boolean;
  closingLabel?: string;
  recommendBadge?: string;
  recommendBadgeColor?: "purple" | "blue" | "green";
  link: string;
}

// ── Featured / Hero Events ────────────────────────────────────────────────────
export const featuredEvents: EventItem[] = [
  {
    id: "feat-1",
    title: "Battle of Bands 🎸",
    subtitle: "Starts in 45 mins",
    category: "Music",
    categoryColor: "red",
    organizer: "Music Club",
    date: "Wed, 29 July",
    time: "6:30 PM",
    location: "Main Auditorium",
    image: "/events/battle-of-bands.jpg",
    isLive: true,
    link: "/events/battle-of-bands",
  },
  {
    id: "feat-2",
    title: "TED Talk: Future of AI",
    subtitle: "Starting soon",
    category: "Tech",
    categoryColor: "blue",
    organizer: "IEEE Club",
    date: "Wed, 29 July",
    time: "7:00 PM",
    location: "Seminar Hall B",
    image: "/events/ted-talk.jpg",
    isLive: false,
    link: "/events/ted-talk-ai",
  },
  {
    id: "feat-3",
    title: "Startup Pitch Night",
    subtitle: "Register before 5 PM",
    category: "Entrepreneurship",
    categoryColor: "amber",
    organizer: "E-Cell",
    date: "Thu, 30 July",
    time: "5:00 PM",
    location: "Innovation Lab",
    image: "/events/startup-pitch.jpg",
    isLive: false,
    link: "/events/startup-pitch",
  },
];

// ── Closing Soon Events ───────────────────────────────────────────────────────
export const closingSoonEvents: EventItem[] = [
  {
    id: "close-1",
    title: "Smart India Hackathon",
    category: "Tech",
    categoryColor: "purple",
    organizer: "Tech Cell",
    date: "Aug 5",
    time: "12:00 AM",
    location: "CS Block",
    image: "/events/hackathon.jpg",
    isClosingSoon: true,
    closingLabel: "Closes in 3 hrs • 12:00 AM",
    link: "/events/sih",
  },
  {
    id: "close-2",
    title: "Photography Contest",
    category: "Arts",
    categoryColor: "amber",
    organizer: "Photography Club",
    date: "Tonight",
    time: "11:59 PM",
    location: "Online",
    image: "/events/photography.jpg",
    isClosingSoon: true,
    closingLabel: "Ends Tonight • 11:59 PM",
    link: "/events/photo-contest",
  },
];

// ── Recommended Events ────────────────────────────────────────────────────────
export const recommendedEvents: EventItem[] = [
  {
    id: "rec-1",
    title: "AI Bootcamp",
    category: "Tech",
    categoryColor: "purple",
    organizer: "IEEE",
    date: "Aug 2",
    time: "10:00 AM",
    location: "CS Lab",
    image: "/events/ai-bootcamp.jpg",
    recommendBadge: "Because you attended Robotics Workshop",
    recommendBadgeColor: "purple",
    link: "/events/ai-bootcamp",
  },
  {
    id: "rec-2",
    title: "Public Speaking Masterclass",
    category: "Skill",
    categoryColor: "blue",
    organizer: "Literary Club",
    date: "Jul 30",
    time: "3:00 PM",
    location: "Seminar Hall A",
    image: "/events/public-speaking.jpg",
    recommendBadge: "Based on your interests",
    recommendBadgeColor: "blue",
    link: "/events/public-speaking",
  },
  {
    id: "rec-3",
    title: "Web Dev Workshop",
    category: "Tech",
    categoryColor: "green",
    organizer: "CSI Club",
    date: "Jul 31",
    time: "11:00 AM",
    location: "IT Lab",
    image: "/events/web-dev.jpg",
    recommendBadge: "Popular in your department",
    recommendBadgeColor: "green",
    link: "/events/web-dev",
  },
  {
    id: "rec-4",
    title: "Design Thinking Sprint",
    category: "Design",
    categoryColor: "amber",
    organizer: "Design Club",
    date: "Aug 3",
    time: "2:00 PM",
    location: "Media Room",
    image: "/events/design-sprint.jpg",
    recommendBadge: "Trending on campus",
    recommendBadgeColor: "purple",
    link: "/events/design-sprint",
  },
];

// ── Friends Attending ─────────────────────────────────────────────────────────
export interface FriendItem {
  id: string;
  name: string;
  avatarUrl: string;
}

export const friendsAttending: FriendItem[] = [
  { id: "f1", name: "Arun", avatarUrl: "/avatars/arun.jpg" },
  { id: "f2", name: "Priya", avatarUrl: "/avatars/priya.jpg" },
  { id: "f3", name: "Karthik", avatarUrl: "/avatars/karthik.jpg" },
  { id: "f4", name: "Sneha", avatarUrl: "/avatars/sneha.jpg" },
];

export const friendsAttendingEvent = {
  total: 18,
  eventName: "Startup Mixer 2.0",
  date: "Tomorrow",
  time: "4:00 PM",
};

// ── Clubs You Follow ──────────────────────────────────────────────────────────
export interface ClubItem {
  id: string;
  name: string;
  icon: string;
  nextEvent?: string;
  nextEventDate?: string;
  isActive?: boolean;
  color: string;
}

export const clubsFollowed: ClubItem[] = [
  {
    id: "club-1",
    name: "IEEE",
    icon: "⚡",
    nextEvent: "Workshop",
    nextEventDate: "Tomorrow",
    isActive: false,
    color: "#A1BCE6",
  },
  {
    id: "club-2",
    name: "Music Club",
    icon: "🎵",
    nextEvent: "Battle of Bands",
    nextEventDate: "Today",
    isActive: true,
    color: "#F59E0B",
  },
  {
    id: "club-3",
    name: "Photography Club",
    icon: "📷",
    nextEvent: "2 Events",
    nextEventDate: "This Week",
    isActive: false,
    color: "#F97316",
  },
  {
    id: "club-4",
    name: "CSI Club",
    icon: "💻",
    nextEvent: "Web Dev Workshop",
    nextEventDate: "Jul 31",
    isActive: false,
    color: "#10B981",
  },
];

// ── Announcements ─────────────────────────────────────────────────────────────
export interface AnnouncementItem {
  id: string;
  source: string;
  title: string;
  timeAgo: string;
  icon: string;
  isUnread: boolean;
  iconBg: string;
}

export const announcements: AnnouncementItem[] = [
  {
    id: "ann-1",
    source: "University",
    title: "Semester Registration begins tomorrow",
    timeAgo: "2h ago",
    icon: "🏛️",
    isUnread: true,
    iconBg: "#EFF6FF",
  },
  {
    id: "ann-2",
    source: "Examination Cell",
    title: "Hall Tickets Released",
    timeAgo: "3h ago",
    icon: "📋",
    isUnread: true,
    iconBg: "#F0FDF4",
  },
];

// ── Continue Where You Left Off ───────────────────────────────────────────────
export interface ContinueItem {
  id: string;
  eventTitle: string;
  organizer: string;
  image: string;
  currentStep: number;
  totalSteps: number;
  stepLabel: string;
  link: string;
}

export const continueItem: ContinueItem = {
  id: "cont-1",
  eventTitle: "AI Workshop",
  organizer: "Organized by IEEE",
  image: "/events/ai-bootcamp.jpg",
  currentStep: 2,
  totalSteps: 4,
  stepLabel: "Personal Details",
  link: "/register/ai-workshop",
};

// ── Upcoming This Week ────────────────────────────────────────────────────────
export interface UpcomingItem {
  id: string;
  dayLabel: string;
  dayDate: string;
  eventName: string;
  time: string;
  location: string;
  dotColor: string;
}

export const upcomingThisWeek: UpcomingItem[] = [
  {
    id: "up-1",
    dayLabel: "Today",
    dayDate: "29 Jul",
    eventName: "AI Workshop",
    time: "4:30 PM",
    location: "Civil Block",
    dotColor: "#F59E0B",
  },
  {
    id: "up-2",
    dayLabel: "Tomorrow",
    dayDate: "30 Jul",
    eventName: "Dance Auditions",
    time: "10:00 AM",
    location: "Auditorium",
    dotColor: "#A1BCE6",
  },
  {
    id: "up-3",
    dayLabel: "Fri, 1 Aug",
    dayDate: "1 Aug",
    eventName: "Smart India Hackathon",
    time: "9:00 AM",
    location: "Innovation Lab",
    dotColor: "#6A95CF",
  },
];

// ── Navigation Items ──────────────────────────────────────────────────────────
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  badge?: number;
  isActive?: boolean;
}

export const navItems: NavItem[] = [
  { id: "home", label: "Home", icon: "home", href: "/", isActive: true },
  { id: "explore", label: "Explore Events", icon: "compass", href: "/explore" },
  { id: "my-events", label: "My Events", icon: "calendar", href: "/my-events" },
  { id: "clubs", label: "Clubs", icon: "users", href: "/clubs" },
  { id: "recruitment", label: "Recruitment", icon: "briefcase", href: "/recruitment" },
  { id: "notifications", label: "Notifications", icon: "bell", href: "/notifications", badge: 3 },
  { id: "certificates", label: "Certificates", icon: "award", href: "/certificates" },
  { id: "profile", label: "Profile", icon: "user", href: "/profile" },
];

// ── Campus Pulse ──────────────────────────────────────────────────────────────
export const campusPulse = {
  label: "Campus Pulse",
  status: "Campus is active 🔥",
  eventsToday: 18,
  isLive: true,
};
