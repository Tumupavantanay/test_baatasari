'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CalendarClock,
  UserCheck,
  Settings,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { recruitmentNavItems } from '@/data/recruitmentData';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  CalendarClock,
  UserCheck,
  Settings,
};

export default function RecruitmentSidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col w-56 xl:w-60 min-h-screen bg-[#F8F9FB] border-r border-[#E5E8EF] flex-shrink-0"
      aria-label="Recruitment portal navigation"
    >
      {/* Logo */}
      <div className="px-5 pt-5 pb-4 border-b border-[#E5E8EF]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#1F2937] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-black text-white tracking-tight">CC</span>
          </div>
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-[#111827] tracking-tight">Campus Connect</p>
            <p className="text-[9px] text-[#6B7280] font-medium tracking-widest uppercase">by BAATASARI</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {recruitmentNavItems.map((item) => {
            const Icon = iconMap[item.icon] ?? LayoutDashboard;
            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  aria-current={item.isActive ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 relative group',
                    item.isActive
                      ? 'bg-[#F0F2F5] text-[#111827] font-semibold'
                      : 'text-[#6B7280] hover:bg-[#F0F2F5] hover:text-[#111827]'
                  )}
                >
                  {/* Active orange indicator bar */}
                  {item.isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#F97316] rounded-r-full" />
                  )}
                  <Icon
                    size={15}
                    className={cn(
                      'flex-shrink-0 transition-colors',
                      item.isActive ? 'text-[#F97316]' : 'text-[#9CA3AF] group-hover:text-[#6B7280]'
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.badge != null && (
                    <span className="min-w-[18px] h-[18px] px-1 rounded-full bg-[#F97316] text-white text-[9px] font-bold flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help card */}
      <div className="mx-3 mb-4 p-3.5 bg-white border border-[#E5E8EF] rounded-xl shadow-sm">
        <div className="flex items-start gap-2 mb-2.5">
          <HelpCircle size={15} className="text-[#F97316] flex-shrink-0 mt-0.5" />
          <p className="text-[11px] font-semibold text-[#111827] leading-tight">Need help?</p>
        </div>
        <p className="text-[10px] text-[#6B7280] leading-relaxed mb-2.5">
          View guide to manage applications and interviews.
        </p>
        <button
          aria-label="View recruitment guide"
          className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-[#F0F2F5] hover:bg-[#E5E8EF] text-[#111827] text-[10px] font-semibold transition-colors"
        >
          <ExternalLink size={10} />
          View Guide
        </button>
      </div>
    </aside>
  );
}
