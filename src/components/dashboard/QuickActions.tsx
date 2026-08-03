import Link from 'next/link';
import { Compass, Calendar, Users, Award } from 'lucide-react';

const quickActions = [
  {
    id: 'explore',
    label: 'Explore',
    icon: Compass,
    href: '/explore',
    color: '#A1BCE6',
    bg: '#EBF2FB',
  },
  {
    id: 'my-events',
    label: 'My Events',
    icon: Calendar,
    href: '/my-events',
    color: '#D97706',
    bg: '#FEF3C7',
  },
  {
    id: 'clubs',
    label: 'Clubs',
    icon: Users,
    href: '/clubs',
    color: '#10B981',
    bg: '#D1FAE5',
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: Award,
    href: '/certificates',
    color: '#F59E0B',
    bg: '#FEF9C3',
  },
];

export default function QuickActions() {
  return (
    <div className="lg:hidden">
      <h2 className="text-base font-bold text-[#0C1E3C] mb-3">Quick Actions</h2>
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.id}
              href={action.href}
              aria-label={action.label}
              className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-[#E5E7EB] hover:border-[#A1BCE6] hover:shadow-sm transition-all duration-200 group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: action.bg }}
              >
                <Icon size={18} style={{ color: action.color }} />
              </div>
              <span className="text-[10px] font-semibold text-[#0C1E3C] text-center leading-tight">
                {action.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
