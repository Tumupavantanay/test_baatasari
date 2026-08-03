'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronDown, Bell } from 'lucide-react';

interface RecruitmentTopBarProps {
  backLabel?: string;
  backHref?: string;
  clubName?: string;
  userRole?: string;
  userInitials?: string;
  userAvatarColor?: string;
}

export default function RecruitmentTopBar({
  backLabel = 'Back to Roles & Recruitment',
  backHref = '/recruitment/roles',
  clubName = 'Tech Club',
  userRole = 'Club Lead',
  userInitials = 'RV',
  userAvatarColor = '#1F2937',
}: RecruitmentTopBarProps) {
  return (
    <div className="flex items-center justify-between px-5 lg:px-6 py-3 border-b border-[#E5E8EF] bg-white sticky top-0 z-30">
      {/* Breadcrumb */}
      <Link
        href={backHref}
        className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#111827] font-medium transition-colors group"
        aria-label={backLabel}
      >
        <ArrowLeft
          size={13}
          className="group-hover:-translate-x-0.5 transition-transform duration-200"
        />
        {backLabel}
      </Link>

      {/* Right: user + club */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button
          aria-label="View notifications"
          className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-[#F0F2F5] transition-colors relative"
        >
          <Bell size={16} className="text-[#6B7280]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#F97316]" />
        </button>

        {/* Club + role dropdown */}
        <button
          aria-haspopup="true"
          aria-label={`${clubName} — ${userRole}`}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl hover:bg-[#F0F2F5] border border-transparent hover:border-[#E5E8EF] transition-all"
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
            style={{ backgroundColor: userAvatarColor }}
          >
            {userInitials}
          </div>
          <div className="text-left leading-tight hidden sm:block">
            <p className="text-xs font-semibold text-[#111827]">{clubName}</p>
            <p className="text-[10px] text-[#6B7280]">{userRole}</p>
          </div>
          <ChevronDown size={13} className="text-[#9CA3AF] flex-shrink-0" />
        </button>
      </div>
    </div>
  );
}
