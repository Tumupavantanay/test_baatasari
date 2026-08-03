import Link from 'next/link';
import { ArrowRight, Code2, Camera } from 'lucide-react';
import { closingSoonEvents } from '@/data/dashboardData';
import SectionHeader from './SectionHeader';

const eventIcons: Record<string, React.ElementType> = {
  'close-1': Code2,
  'close-2': Camera,
};

export default function ClosingSoonSection() {
  return (
    <div>
      <SectionHeader title="Registrations Closing Soon" viewAllHref="/explore" />
      <div className="space-y-3">
        {closingSoonEvents.map((event) => {
          const Icon = eventIcons[event.id] ?? Code2;
          return (
            <Link
              key={event.id}
              href={event.link}
              aria-label={`View ${event.title} — registration closing soon`}
              className="flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-[#E5E7EB] shadow-sm hover:shadow-md hover:border-[#A1BCE6] hover:-translate-y-0.5 transition-all duration-200 group block"
            >
              {/* Icon thumbnail */}
              <div className="w-11 h-11 rounded-xl bg-[#0C1E3C] group-hover:bg-[#1a3362] flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                <Icon size={20} className="text-[#A1BCE6]" />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#0C1E3C] truncate group-hover:text-[#A1BCE6] transition-colors duration-200">
                  {event.title}
                </p>
                <p className="text-xs font-medium text-amber-600 mt-0.5 truncate">
                  {event.closingLabel}
                </p>
              </div>

              {/* Register pill */}
              <span className="flex items-center gap-1.5 bg-red-50 group-hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-2 rounded-xl border border-red-100 group-hover:border-red-200 transition-all duration-200 flex-shrink-0 whitespace-nowrap">
                Register
                <ArrowRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
