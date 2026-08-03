import Link from 'next/link';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  title: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  className?: string;
}

export default function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel = 'View all',
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between mb-3', className)}>
      <h2 className="text-base font-bold text-[#0C1E3C] tracking-tight">{title}</h2>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          aria-label={`${viewAllLabel} — ${title}`}
          className="text-sm font-semibold text-[#A1BCE6] hover:text-[#6A95CF] transition-colors duration-200"
        >
          {viewAllLabel}
        </Link>
      )}
    </div>
  );
}
