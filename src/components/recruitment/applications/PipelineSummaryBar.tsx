'use client';

import {
  Inbox,
  Eye,
  Star,
  Calendar,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CandidateStatus, PipelineMetrics } from '@/types/recruitment';

interface StatusBlock {
  status: CandidateStatus;
  label: string;
  icon: React.ElementType;
  iconColor: string;
  activeBg: string;
  activeBorder: string;
  count: number;
}

function buildBlocks(metrics: PipelineMetrics): StatusBlock[] {
  return [
    {
      status: 'new',
      label: 'New Applications',
      icon: Inbox,
      iconColor: 'text-[#F97316]',
      activeBg: 'bg-orange-50',
      activeBorder: 'border-[#F97316]',
      count: metrics.newCount,
    },
    {
      status: 'review',
      label: 'Under Review',
      icon: Eye,
      iconColor: 'text-[#3B82F6]',
      activeBg: 'bg-blue-50',
      activeBorder: 'border-[#3B82F6]',
      count: metrics.reviewCount,
    },
    {
      status: 'shortlisted',
      label: 'Shortlisted',
      icon: Star,
      iconColor: 'text-[#14B8A6]',
      activeBg: 'bg-teal-50',
      activeBorder: 'border-[#14B8A6]',
      count: metrics.shortlistCount,
    },
    {
      status: 'interview',
      label: 'Interview Scheduled',
      icon: Calendar,
      iconColor: 'text-[#8B5CF6]',
      activeBg: 'bg-purple-50',
      activeBorder: 'border-[#8B5CF6]',
      count: metrics.interviewCount,
    },
    {
      status: 'selected',
      label: 'Selected',
      icon: CheckCircle,
      iconColor: 'text-[#10B981]',
      activeBg: 'bg-emerald-50',
      activeBorder: 'border-[#10B981]',
      count: metrics.selectedCount,
    },
    {
      status: 'rejected',
      label: 'Rejected',
      icon: XCircle,
      iconColor: 'text-[#EF4444]',
      activeBg: 'bg-red-50',
      activeBorder: 'border-[#EF4444]',
      count: metrics.rejectedCount,
    },
  ];
}

interface PipelineSummaryBarProps {
  metrics: PipelineMetrics;
  activeStatus: CandidateStatus;
  onStatusChange: (status: CandidateStatus) => void;
}

export default function PipelineSummaryBar({
  metrics,
  activeStatus,
  onStatusChange,
}: PipelineSummaryBarProps) {
  const blocks = buildBlocks(metrics);

  return (
    <div
      className="bg-white border border-border rounded-2xl shadow-sm overflow-hidden mx-5 lg:mx-6"
      role="tablist"
      aria-label="Candidate pipeline stages"
    >
      <div className="grid grid-cols-3 lg:grid-cols-6 divide-x divide-[]">
        {blocks.map((block) => {
          const Icon = block.icon;
          const isActive = activeStatus === block.status;
          return (
            <button
              key={block.status}
              role="tab"
              aria-selected={isActive}
              aria-controls={`candidates-panel-${block.status}`}
              onClick={() => onStatusChange(block.status)}
              className={cn(
                'flex flex-col items-center gap-1.5 px-3 py-4 text-center transition-all duration-200 border-b-2 group',
                isActive
                  ? `${block.activeBg} ${block.activeBorder}`
                  : 'border-transparent hover:bg-[#F8F9FB]'
              )}
            >
              {/* Icon container */}
              <div
                className={cn(
                  'w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-200',
                  isActive ? 'bg-white shadow-sm' : 'bg-muted group-hover:bg-white group-hover:shadow-sm'
                )}
              >
                <Icon size={17} className={block.iconColor} />
              </div>

              {/* Label */}
              <span
                className={cn(
                  'text-[10px] font-medium leading-tight transition-colors duration-200 hidden sm:block',
                  isActive ? 'text-foreground font-semibold' : 'text-foreground'
                )}
              >
                {block.label}
              </span>

              {/* Count */}
              <span
                className={cn(
                  'text-2xl font-bold transition-colors duration-200',
                  isActive ? 'text-foreground' : 'text-foreground'
                )}
              >
                {block.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
