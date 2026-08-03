import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { friendsAttending, friendsAttendingEvent } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';

const AVATAR_COLORS = [
  'from-[#A1BCE6] to-[#6A95CF]',
  'from-[#6EE7B7] to-[#059669]',
  'from-[#FCA5A5] to-[#DC2626]',
  'from-[#FDE68A] to-[#D97706]',
];

export default function FriendsAttendingSection() {
  return (
    <div>
      <SectionHeader title="Friends Attending" viewAllHref="/my-events" />
      <div className="bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm">
        <div className="flex items-center gap-3">
          {/* Avatar Stack */}
          <div className="flex -space-x-2.5 flex-shrink-0">
            {friendsAttending.map((friend, i) => (
              <div
                key={friend.id}
                className={`w-9 h-9 rounded-full bg-gradient-to-br ${AVATAR_COLORS[i % AVATAR_COLORS.length]} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}
                title={friend.name}
                aria-label={friend.name}
              >
                {friend.name[0]}
              </div>
            ))}
            {/* +12 overflow */}
            <div
              className="w-9 h-9 rounded-full bg-[#0C1E3C] border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
              aria-label={`+${friendsAttendingEvent.total - friendsAttending.length} more friends`}
            >
              +{friendsAttendingEvent.total - friendsAttending.length}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#828894] font-medium">
              {friendsAttendingEvent.total} friends are attending
            </p>
            <p className="text-sm font-bold text-[#0C1E3C] truncate">
              {friendsAttendingEvent.eventName}
            </p>
            <p className="text-xs font-semibold text-[#A1BCE6] mt-0.5">
              {friendsAttendingEvent.date} • {friendsAttendingEvent.time}
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/my-events"
            aria-label="View all attendees"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#0C1E3C] bg-[#F8F6F0] hover:bg-[#EBF2FB] border border-[#E5E7EB] hover:border-[#A1BCE6] px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0"
          >
            View Attendees
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
