'use client';

import { Download, BarChart2 } from 'lucide-react';

interface CandidatePageHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  onExport?: () => void;
  onViewAnalytics?: () => void;
}

export default function CandidatePageHeader({
  title,
  subtitle,
  description,
  onExport,
  onViewAnalytics,
}: CandidatePageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 px-5 lg:px-6 pt-6 pb-4">
      {/* Left: Title */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-[] leading-tight tracking-tight">
          {title}
        </h1>
        <p className="text-base font-semibold text-[] mt-0.5">{subtitle}</p>
        {description && (
          <p className="text-sm text-[] mt-1">{description}</p>
        )}
      </div>

      {/* Right: CTAs */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        {/* Export — secondary */}
        <button
          id="export-candidates-btn"
          onClick={onExport}
          aria-label="Export candidates"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[] hover:border-[#D1D5DB] text-[] text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
        >
          <Download size={14} className="text-[]" />
          Export
        </button>

        {/* View Analytics — primary dark */}
        <button
          id="view-analytics-btn"
          onClick={onViewAnalytics}
          aria-label="View analytics"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1F2937] hover:bg-[] text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
        >
          <BarChart2 size={14} />
          View Analytics
        </button>
      </div>
    </div>
  );
}
