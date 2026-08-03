'use client';

import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';
import type { MemberFilters } from '@/types/clubAdmin';

interface FilterOption {
  label: string;
  value: string;
}

interface MembersSearchBarProps {
  filters: MemberFilters;
  onFiltersChange: (updated: Partial<MemberFilters>) => void;
  /** Role options come from the API/data layer — not hardcoded */
  roleOptions?: FilterOption[];
  /** Department options come from the API/data layer */
  departmentOptions?: FilterOption[];
  /** Year options come from the API/data layer */
  yearOptions?: FilterOption[];
  /** Status options */
  statusOptions?: FilterOption[];
}

const defaultRoleOptions: FilterOption[] = [
  { label: 'All Roles', value: 'All Roles' },
  { label: 'President', value: 'President' },
  { label: 'Vice President', value: 'Vice President' },
  { label: 'Secretary', value: 'Secretary' },
  { label: 'Treasurer', value: 'Treasurer' },
  { label: 'Technical Lead', value: 'Technical Lead' },
  { label: 'Design Lead', value: 'Design Lead' },
  { label: 'Content Lead', value: 'Content Lead' },
  { label: 'Marketing Lead', value: 'Marketing Lead' },
  { label: 'Member', value: 'Member' },
];

const defaultDepartmentOptions: FilterOption[] = [
  { label: 'All Departments', value: 'All Departments' },
  { label: 'CSE', value: 'CSE' },
  { label: 'ECE', value: 'ECE' },
  { label: 'IT', value: 'IT' },
  { label: 'ME', value: 'ME' },
  { label: 'Civil', value: 'Civil' },
];

const defaultYearOptions: FilterOption[] = [
  { label: 'All Years', value: 'All Years' },
  { label: '1st Year', value: '1st Year' },
  { label: '2nd Year', value: '2nd Year' },
  { label: '3rd Year', value: '3rd Year' },
  { label: '4th Year', value: '4th Year' },
];

const defaultStatusOptions: FilterOption[] = [
  { label: 'All Status', value: 'All Status' },
  { label: 'Active', value: 'Active' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Inactive', value: 'Inactive' },
];

function FilterSelect({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string;
  options: FilterOption[];
  onChange: (val: string) => void;
  ariaLabel: string;
}) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="appearance-none pl-3 pr-7 py-2 text-xs font-medium text-foreground bg-card border border-border rounded-lg hover:border-primary focus:outline-none focus:border-primary transition-colors duration-200 cursor-pointer"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={12}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
    </div>
  );
}

/**
 * Search + filter bar.
 * All filter options are props so the parent/page can load them from the API.
 * Filter state is fully controlled — parent owns it via onFiltersChange.
 */
export default function MembersSearchBar({
  filters,
  onFiltersChange,
  roleOptions = defaultRoleOptions,
  departmentOptions = defaultDepartmentOptions,
  yearOptions = defaultYearOptions,
  statusOptions = defaultStatusOptions,
}: MembersSearchBarProps) {
  return (
    <div className="space-y-3">
      {/* Row 1: Search bar (desktop full row, mobile standalone) */}
      <div className="flex items-center gap-2 lg:gap-3">
        {/* Search Input */}
        <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-card border border-border hover:border-primary focus-within:border-primary transition-colors duration-200 group">
          <Search
            size={15}
            className="text-muted-foreground group-focus-within:text-primary transition-colors flex-shrink-0"
          />
          <input
            type="search"
            placeholder="Search members..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            aria-label="Search members by name, role, or department"
            className="flex-1 text-sm bg-transparent outline-none text-foreground placeholder-muted-foreground"
          />
        </div>

        {/* Desktop filter dropdowns — hidden on mobile */}
        <div className="hidden lg:flex items-center gap-2">
          <FilterSelect
            value={filters.role}
            options={roleOptions}
            onChange={(val) => onFiltersChange({ role: val as MemberFilters['role'] })}
            ariaLabel="Filter by role"
          />
          <FilterSelect
            value={filters.department}
            options={departmentOptions}
            onChange={(val) => onFiltersChange({ department: val })}
            ariaLabel="Filter by department"
          />
          <FilterSelect
            value={filters.year}
            options={yearOptions}
            onChange={(val) => onFiltersChange({ year: val })}
            ariaLabel="Filter by year"
          />
          <FilterSelect
            value={filters.status}
            options={statusOptions}
            onChange={(val) => onFiltersChange({ status: val as MemberFilters['status'] })}
            ariaLabel="Filter by status"
          />

          {/* Filters toggle */}
          <button
            aria-label="Toggle advanced filters"
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-card border border-border hover:border-primary text-foreground text-xs font-medium transition-all duration-200"
          >
            <SlidersHorizontal size={13} className="text-muted-foreground" />
            Filters
          </button>
        </div>

        {/* Mobile: compact filters button */}
        <button
          aria-label="More filters"
          className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl bg-card border border-border hover:border-primary text-foreground text-xs font-medium transition-all duration-200 flex-shrink-0"
        >
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          <span>Filters</span>
        </button>
      </div>

      {/* Mobile filter row */}
      <div className="flex lg:hidden items-center gap-2 overflow-x-auto scrollbar-hide pb-0.5">
        <FilterSelect
          value={filters.role}
          options={roleOptions}
          onChange={(val) => onFiltersChange({ role: val as MemberFilters['role'] })}
          ariaLabel="Filter by role"
        />
        <FilterSelect
          value={filters.department}
          options={departmentOptions}
          onChange={(val) => onFiltersChange({ department: val })}
          ariaLabel="Filter by department"
        />
      </div>
    </div>
  );
}
