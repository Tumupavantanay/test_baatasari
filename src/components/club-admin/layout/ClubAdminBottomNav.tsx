'use client';

import Link from 'next/link';
import { LayoutDashboard, CalendarDays, Users, UserPlus, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BottomNavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  isActive?: boolean;
}

const bottomNavItems: BottomNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/club-admin' },
  { id: 'events', label: 'Events', icon: CalendarDays, href: '/club-admin/events' },
  { id: 'members', label: 'Members', icon: Users, href: '/club-admin/members', isActive: true },
  { id: 'recruitment', label: 'Recruitment', icon: UserPlus, href: '/club-admin/recruitment' },
  { id: 'more', label: 'More', icon: MoreHorizontal, href: '/club-admin/more' },
];

export default function ClubAdminBottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white/97 backdrop-blur-md border-t border-[#E5E7EB]"
      aria-label="Club admin mobile navigation"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 8px)' }}
    >
      <ul className="flex items-center justify-around px-2 pt-2 pb-1">
        {bottomNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id} className="flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={item.isActive ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center gap-1 py-1 rounded-xl transition-all duration-200 w-full',
                  item.isActive ? 'text-[#D97706]' : 'text-[#828894] hover:text-[#0C1E3C]'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-6 rounded-lg flex items-center justify-center transition-all duration-200',
                    item.isActive ? 'bg-[#D97706]/10' : ''
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      'transition-colors duration-200',
                      item.isActive ? 'text-[#D97706]' : ''
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium leading-none',
                    item.isActive ? 'font-semibold text-[#D97706]' : ''
                  )}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
