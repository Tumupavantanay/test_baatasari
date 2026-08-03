'use client';

import Link from 'next/link';
import { Home, Compass, Calendar, Users, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const bottomNavItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/', isActive: true },
  { id: 'explore', label: 'Explore', icon: Compass, href: '/explore' },
  { id: 'my-events', label: 'My Events', icon: Calendar, href: '/my-events' },
  { id: 'clubs', label: 'Clubs', icon: Users, href: '/clubs' },
  { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
];

export default function BottomNav() {
  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-card/95 backdrop-blur-md border-t border-border pb-safe"
      aria-label="Mobile navigation"
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
                  item.isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <div
                  className={cn(
                    'w-10 h-6 rounded-lg flex items-center justify-center transition-all duration-200',
                    item.isActive ? 'bg-primary/20' : ''
                  )}
                >
                  <Icon
                    size={18}
                    className={cn(
                      'transition-colors duration-200',
                      item.isActive ? 'text-primary' : ''
                    )}
                  />
                </div>
                <span
                  className={cn(
                    'text-[10px] font-medium leading-none',
                    item.isActive ? 'font-semibold text-foreground' : ''
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
