import Link from 'next/link';
import { upcomingThisWeek } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';

export default function UpcomingThisWeek() {
  return (
    <div>
      <SectionHeader title="Upcoming This Week" viewAllHref="/my-events" />
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-sm overflow-hidden">
        {upcomingThisWeek.map((item, index) => (
          <Link
            key={item.id}
            href={`/events/${item.id}`}
            aria-label={`${item.eventName} — ${item.dayLabel} at ${item.time}`}
            className={`flex items-center gap-3 px-4 py-3.5 hover:bg-[#EBF2FB] transition-colors duration-150 cursor-pointer group ${
              index < upcomingThisWeek.length - 1 ? 'border-b border-[#E5E7EB]' : ''
            }`}
          >
            {/* Day label */}
            <div className="w-16 flex-shrink-0 text-right">
              <p className="text-[11px] font-bold text-[#0C1E3C] leading-none">{item.dayLabel}</p>
              {item.dayLabel !== 'Today' && item.dayLabel !== 'Tomorrow' && (
                <p className="text-[9px] text-[#828894] mt-0.5">{item.dayDate}</p>
              )}
            </div>

            {/* Colored dot */}
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: item.dotColor }}
              aria-hidden="true"
            />

            {/* Event info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[#0C1E3C] truncate group-hover:text-[#A1BCE6] transition-colors duration-150">
                {item.eventName}
              </p>
              <p className="text-[10px] text-[#828894]">
                {item.time} • {item.location}
              </p>
            </div>

            {/* Arrow hint */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#E5E7EB] group-hover:text-[#A1BCE6] transition-colors duration-150 flex-shrink-0"
              aria-hidden="true"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
