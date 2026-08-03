'use client';

import { TrendingUp, Award, UserCheck, Users, CalendarCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { MemberActivityLog, ActivityType } from '@/types/clubAdmin';
import { Card } from '@/components/ui/card';

// ── Activity type → icon + color map ─────────────────────────────────────────
const activityConfig: Record<
  ActivityType,
  { icon: React.ElementType; bg: string; iconColor: string }
> = {
  promotion: { icon: TrendingUp, bg: 'bg-amber-50', iconColor: 'text-amber-600' },
  achievement: { icon: Award, bg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
  join: { icon: UserCheck, bg: 'bg-blue-50', iconColor: 'text-blue-600' },
  request: { icon: Users, bg: 'bg-purple-50', iconColor: 'text-purple-600' },
  event: { icon: CalendarCheck, bg: 'bg-cyan-50', iconColor: 'text-cyan-600' },
};

interface RecentActivityFeedProps {
  /** Fully prop-driven — pass any MemberActivityLog[] from API */
  activities: MemberActivityLog[];
  onViewAll?: () => void;
}

/**
 * Chronological activity feed.
 * Renders whatever activities array is passed — no hardcoded items or limits.
 * When the API is ready, replace the mock array with a fetch/useSWR result.
 */
export default function RecentActivityFeed({
  activities,
  onViewAll,
}: RecentActivityFeedProps) {
  if (activities.length === 0) return null;

  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Recent Member Activity</h2>
        <button
          onClick={onViewAll}
          aria-label="View all member activity"
          className="text-xs font-semibold text-primary hover:text-primary/90 transition-colors duration-200"
        >
          View all
        </button>
      </div>

      {/* Activity list */}
      <ul aria-label="Recent member activity" className="divide-y divide-border">
        {activities.map((activity) => {
          const config = activityConfig[activity.type];
          const Icon = config.icon;

          return (
            <li
              key={activity.id}
              className="flex items-center gap-4 px-5 py-3.5 hover:bg-muted/50 transition-colors duration-150"
            >
              {/* Icon */}
              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0',
                  config.bg
                )}
              >
                <Icon size={16} className={config.iconColor} />
              </div>

              {/* Description */}
              <p className="flex-1 text-sm text-foreground leading-snug">
                {activity.description}
                {activity.meta && (
                  <span className="text-muted-foreground"> — {activity.meta}</span>
                )}
              </p>

              {/* Timestamp */}
              <time
                dateTime={activity.timestamp}
                className="text-xs text-muted-foreground whitespace-nowrap flex-shrink-0"
              >
                {activity.timestamp}
              </time>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
