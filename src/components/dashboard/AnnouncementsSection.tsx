import Link from 'next/link';
import { announcements } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';

export default function AnnouncementsSection() {
  return (
    <div>
      <SectionHeader title="Announcements" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {announcements.map((ann) => (
          <Link
            key={ann.id}
            href={`/announcements/${ann.id}`}
            aria-label={`View announcement: ${ann.title}`}
            className="flex items-start gap-3 bg-white rounded-2xl p-4 border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#A1BCE6] hover:-translate-y-0.5 transition-all duration-200 group block"
          >

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[11px] font-semibold text-[#A1BCE6] uppercase tracking-wide">
                  {ann.source}
                </p>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span className="text-[10px] text-[#828894]">{ann.timeAgo}</span>
                  {ann.isUnread && (
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-red-500"
                      aria-label="Unread"
                    />
                  )}
                </div>
              </div>
              <p className="text-xs font-semibold text-[#0C1E3C] mt-1 leading-snug group-hover:text-[#A1BCE6] transition-colors duration-200">
                {ann.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
