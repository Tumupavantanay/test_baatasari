import { Calendar, Clock, Users } from 'lucide-react';
import { userProfile, quickStats } from '@/data/dashboardData';

const iconMap = {
  calendar: Calendar,
  clock: Clock,
  users: Users,
};

export default function GreetingBanner() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="w-full">
      {/* ── Greeting Row ── */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        {/* Left: greeting + date */}
        <div>
          <h1 className="text-xl lg:text-2xl font-extrabold text-[#0C1E3C] tracking-tight leading-tight">
            {userProfile.greeting}, {userProfile.firstName}
          </h1>
          <p className="text-sm text-[#828894] mt-0.5 font-medium">{today}</p>
        </div>

        {/* Right: Quick stats row */}
        <div className="flex gap-2 lg:gap-4 overflow-x-auto scrollbar-hide pb-1">
          {quickStats.map((stat) => {
            const Icon = iconMap[stat.icon] ?? Calendar;
            return (
              <div
                key={stat.id}
                className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-[#E5E7EB] shadow-sm flex-shrink-0"
              >
                <div className="w-7 h-7 rounded-lg bg-[#EBF2FB] flex items-center justify-center flex-shrink-0">
                  <Icon size={14} className="text-[#A1BCE6]" />
                </div>
                <div className="leading-tight">
                  <p className="text-base font-extrabold text-[#0C1E3C] leading-none">{stat.value}</p>
                  <p className="text-[11px] text-[#828894] whitespace-nowrap mt-0.5">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
