'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type {
  DepartmentDistribution,
  YearDistribution,
  GenderRatio,
  SkillTag,
} from '@/types/clubAdmin';
import { Card } from '@/components/ui/card';

// ── Sub-components ────────────────────────────────────────────────────────────

function DonutChart({ segments }: { segments: DepartmentDistribution[] }) {
  const total = segments.reduce((s, d) => s + d.percentage, 0);
  let cumulativeAngle = -90;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const cx = 50;
  const cy = 50;
  const r = 36;
  const innerR = 22;

  const arcs = segments.map((seg) => {
    const angle = (seg.percentage / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = startAngle + angle;
    cumulativeAngle = endAngle;

    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;

    const d = `
      M ${x1} ${y1}
      A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
      L ${ix2} ${iy2}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}
      Z
    `;
    return { d, color: seg.color, department: seg.department, percentage: seg.percentage };
  });

  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28 lg:w-32 lg:h-32 flex-shrink-0">
      {arcs.map((arc) => (
        <path
          key={arc.department}
          d={arc.d}
          fill={arc.color}
          stroke="white"
          strokeWidth="1.5"
          className="transition-opacity hover:opacity-80"
        />
      ))}
      {/* Center hole */}
      <circle cx={cx} cy={cy} r={innerR - 1} fill="white" />
    </svg>
  );
}

interface YearBarChartProps {
  years: YearDistribution[];
}

function YearBarChart({ years }: YearBarChartProps) {
  const barsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        const { gsap } = await import('gsap');
        const bars = barsRef.current?.querySelectorAll('[data-bar]');
        if (!bars) return;
        bars.forEach((bar) => {
          const target = (bar as HTMLElement).dataset.width ?? '0';
          gsap.fromTo(bar, { width: '0%' }, {
            width: target,
            duration: 0.8,
            ease: 'power2.out',
            delay: 0.1,
          });
        });
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    if (barsRef.current) observer.observe(barsRef.current);
    return () => observer.disconnect();
  }, [years]);

  return (
    <div ref={barsRef} className="space-y-2.5">
      {years.map((y) => (
        <div key={y.year}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-foreground font-medium">{y.year}</span>
            <span className="text-xs font-semibold text-primary">{y.percentage}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden border border-border">
            <div
              data-bar
              data-width={`${y.percentage}%`}
              className="h-full rounded-full bg-primary"
              style={{ width: '0%' }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function GenderRingChart({ ratios }: { ratios: GenderRatio[] }) {
  const total = ratios.reduce((s, r) => s + r.percentage, 0);
  let cumulativeAngle = -90;
  const cx = 50;
  const cy = 50;
  const r = 38;
  const innerR = 24;
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const arcs = ratios.map((ratio) => {
    const angle = (ratio.percentage / total) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = startAngle + angle;
    cumulativeAngle = endAngle;

    const x1 = cx + r * Math.cos(toRad(startAngle));
    const y1 = cy + r * Math.sin(toRad(startAngle));
    const x2 = cx + r * Math.cos(toRad(endAngle));
    const y2 = cy + r * Math.sin(toRad(endAngle));
    const ix1 = cx + innerR * Math.cos(toRad(startAngle));
    const iy1 = cy + innerR * Math.sin(toRad(startAngle));
    const ix2 = cx + innerR * Math.cos(toRad(endAngle));
    const iy2 = cy + innerR * Math.sin(toRad(endAngle));
    const largeArc = angle > 180 ? 1 : 0;

    const d = `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1} Z`;
    return { d, color: ratio.color, label: ratio.label, percentage: ratio.percentage };
  });

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 100 100" className="w-24 h-24 flex-shrink-0">
        {arcs.map((arc) => (
          <path key={arc.label} d={arc.d} fill={arc.color} stroke="white" strokeWidth="1.5" />
        ))}
        <circle cx={cx} cy={cy} r={innerR - 1} fill="white" />
      </svg>
      <div className="space-y-1.5">
        {ratios.map((r) => (
          <div key={r.label} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: r.color }} />
            <span className="text-xs text-foreground font-medium">{r.label}</span>
            <span className="text-xs font-semibold text-muted-foreground ml-auto">{r.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillPills({ skills }: { skills: SkillTag[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <button
          key={skill.id}
          aria-label={skill.count > 0 ? `${skill.label} — ${skill.count} members` : skill.label}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200',
            skill.count === 0
              ? 'bg-muted text-muted-foreground border-border hover:border-primary'
              : 'bg-card text-foreground border-border hover:bg-primary/10 hover:border-primary hover:text-foreground'
          )}
        >
          {skill.label}
          {skill.count > 0 && (
            <span className="ml-1.5 text-[10px] text-muted-foreground">{skill.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ── Main Insights Component ───────────────────────────────────────────────────
interface MemberInsightsProps {
  /** All data fully prop-driven — swap with API response */
  departmentDistribution: DepartmentDistribution[];
  yearDistribution: YearDistribution[];
  genderRatio: GenderRatio[];
  topSkills: SkillTag[];
  onViewReport?: () => void;
}

/**
 * Analytics & Insights widget — 4-panel grid.
 * Progress bars animate from 0 → target on scroll into view.
 * Accepts any dataset — no hardcoded counts or segment limits.
 */
export default function MemberInsights({
  departmentDistribution,
  yearDistribution,
  genderRatio,
  topSkills,
  onViewReport,
}: MemberInsightsProps) {
  return (
    <Card className="rounded-2xl shadow-sm overflow-hidden bg-card">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <h2 className="text-base font-bold text-foreground">Member Insights</h2>
        <button
          onClick={onViewReport}
          aria-label="View full analytics report"
          className="text-xs font-semibold text-primary hover:text-primary/90 transition-colors duration-200"
        >
          View full report
        </button>
      </div>

      {/* 4-panel grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-border">
        {/* Panel 1: Department Distribution */}
        <div className="p-4 lg:p-5 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Department Distribution
          </h3>
          <div className="flex items-start gap-3">
            <DonutChart segments={departmentDistribution} />
            <div className="space-y-1.5 pt-1">
              {departmentDistribution.map((d) => (
                <div key={d.department} className="flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: d.color }}
                  />
                  <span className="text-[11px] text-foreground font-medium">{d.department}</span>
                  <span className="text-[11px] text-muted-foreground ml-auto">{d.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Year Distribution */}
        <div className="p-4 lg:p-5 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Year Distribution
          </h3>
          <YearBarChart years={yearDistribution} />
        </div>

        {/* Panel 3: Gender Ratio */}
        <div className="p-4 lg:p-5 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Gender Ratio
          </h3>
          <GenderRingChart ratios={genderRatio} />
        </div>

        {/* Panel 4: Top Skills */}
        <div className="p-4 lg:p-5 space-y-3">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Top Skills
          </h3>
          <SkillPills skills={topSkills} />
        </div>
      </div>
    </Card>
  );
}
