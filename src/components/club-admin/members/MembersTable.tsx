'use client';

import { useState, useCallback } from 'react';
import {
  Mail,
  Bell,
  UserCog,
  MoreHorizontal,
  MoreVertical,
  Download,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ClubMember, MemberRole, MemberStatus } from '@/types/clubAdmin';
import { MemberActionTrigger } from '@/components/club-admin/ui/MemberActionMenu';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';

// ── Badge Helpers ─────────────────────────────────────────────────────────────
const roleBadgeStyles: Record<string, string> = {
  President: 'bg-amber-50 text-amber-700 border-amber-200',
  'Vice President': 'bg-purple-50 text-purple-700 border-purple-200',
  Secretary: 'bg-blue-50 text-blue-700 border-blue-200',
  Treasurer: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Technical Lead': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Design Lead': 'bg-pink-50 text-pink-700 border-pink-200',
  'Content Lead': 'bg-blue-50 text-blue-700 border-blue-200',
  'Marketing Lead': 'bg-orange-50 text-orange-700 border-orange-200',
  'Sponsorship Lead': 'bg-indigo-50 text-indigo-700 border-indigo-200',
  'Faculty Advisor': 'bg-stone-100 text-stone-600 border-stone-200',
  Member: 'bg-stone-50 text-stone-600 border-stone-200',
};

function RoleBadge({ role }: { role: MemberRole }) {
  const style = roleBadgeStyles[role] ?? 'bg-stone-50 text-stone-600 border-stone-200';
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border whitespace-nowrap',
        style
      )}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }: { status: MemberStatus }) {
  const styles: Record<MemberStatus, string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-600 border-amber-200',
    Inactive: 'bg-stone-50 text-stone-500 border-stone-200',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border',
        styles[status]
      )}
    >
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        status === 'Active' ? 'bg-emerald-500' : status === 'Pending' ? 'bg-amber-500' : 'bg-stone-400'
      )} />
      {status}
    </span>
  );
}

function AttendanceBadge({ pct }: { pct: number }) {
  const color =
    pct >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
    : pct >= 75 ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-red-50 text-red-600 border-red-200';
  return (
    <span className={cn('inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border', color)}>
      {pct}%
    </span>
  );
}

// ── Bulk Action Bar ───────────────────────────────────────────────────────────
interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearAll: () => void;
  onSendEmail?: () => void;
  onSendNotification?: () => void;
  onAssignRole?: () => void;
  onExport?: () => void;
}

function BulkActionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearAll,
  onSendEmail,
  onSendNotification,
  onAssignRole,
  onExport,
}: BulkActionBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-2.5 bg-muted border-b border-border rounded-t-xl">
      <div className="flex items-center gap-2 text-xs text-foreground">
        <span className="font-semibold">{selectedCount}</span>
        <span className="text-muted-foreground">selected</span>
        <button
          onClick={onSelectAll}
          className="ml-1 text-primary font-semibold hover:underline"
          aria-label={`Select all ${totalCount} members`}
        >
          Select all
        </button>
        <span className="text-border">|</span>
        <button
          onClick={onClearAll}
          className="text-muted-foreground hover:text-foreground font-medium"
          aria-label="Clear selection"
        >
          Clear
        </button>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        <button
          onClick={onSendEmail}
          aria-label="Send email to selected"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary text-foreground text-xs font-medium transition-all duration-200"
        >
          <Mail size={12} className="text-muted-foreground" />
          Send Email
        </button>
        <button
          onClick={onSendNotification}
          aria-label="Send notification to selected"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary text-foreground text-xs font-medium transition-all duration-200"
        >
          <Bell size={12} className="text-muted-foreground" />
          Send Notification
        </button>
        <button
          onClick={onAssignRole}
          aria-label="Assign role to selected"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary text-foreground text-xs font-medium transition-all duration-200"
        >
          <UserCog size={12} className="text-muted-foreground" />
          Assign Role
        </button>
        <button
          onClick={onExport}
          aria-label="Export selected members"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all duration-200"
        >
          <Download size={12} />
          Export
        </button>
        <button
          aria-label="More bulk actions"
          className="w-7 h-7 flex items-center justify-center rounded-lg bg-card border border-border hover:border-primary transition-all duration-200"
        >
          <MoreHorizontal size={13} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

// ── Pagination ────────────────────────────────────────────────────────────────
interface PaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (size: number) => void;
}

function Pagination({
  page,
  pageSize,
  totalCount,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const start = Math.min((page - 1) * pageSize + 1, totalCount);
  const end = Math.min(page * pageSize, totalCount);

  // Generate page buttons (max 5 visible)
  const getPageNumbers = () => {
    const pages: (number | '...')[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > 3) pages.push('...');
      const around = [page - 1, page, page + 1].filter((p) => p > 1 && p < totalPages);
      pages.push(...around);
      if (page < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-border">
      <p className="text-xs text-muted-foreground">
        Showing {start} to {end} of{' '}
        <span className="font-semibold text-foreground">{totalCount.toLocaleString()}</span> members
      </p>

      <div className="flex items-center gap-2">
        {/* Prev */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronLeft size={13} className="text-muted-foreground" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="text-xs text-muted-foreground px-1">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={cn(
                'w-7 h-7 rounded-lg border text-xs font-medium transition-colors duration-200',
                p === page
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
              )}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="w-7 h-7 rounded-lg border border-border flex items-center justify-center hover:border-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <ChevronRight size={13} className="text-muted-foreground" />
        </button>

        {/* Page size */}
        <select
          value={pageSize}
          onChange={(e) => { onPageSizeChange(Number(e.target.value)); onPageChange(1); }}
          aria-label="Rows per page"
          className="ml-2 pl-2 pr-6 py-1.5 text-xs border border-border rounded-lg text-foreground bg-card hover:border-primary focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
        >
          {[10, 20, 50].map((s) => (
            <option key={s} value={s}>
              {s} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// ── Mobile Member Row ─────────────────────────────────────────────────────────
function MobileMemberRow({
  member,
  isSelected,
  onToggle,
  onAction,
}: {
  member: ClubMember;
  isSelected: boolean;
  onToggle: () => void;
  onAction?: (member: ClubMember) => void;
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 transition-colors duration-150',
        isSelected ? 'bg-primary/5' : 'bg-card hover:bg-muted/60'
      )}
    >
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onToggle}
        aria-label={`Select ${member.name}`}
        className="w-4 h-4 rounded border-border accent-primary cursor-pointer flex-shrink-0"
      />
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-background text-xs font-bold flex-shrink-0"
        style={{ backgroundColor: member.avatarColor }}
      >
        {member.avatarInitials}
      </div>
      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">{member.name}</p>
        <p className="text-[11px] text-muted-foreground truncate">
          {member.department} · {member.year}
        </p>
        <div className="mt-1">
          <RoleBadge role={member.role} />
        </div>
      </div>
      {/* Stats */}
      <div className="text-right flex-shrink-0 mr-1">
        <p className="text-[10px] text-muted-foreground">Events</p>
        <p className="text-sm font-bold text-foreground">{member.eventsCount}</p>
        <p className="text-[10px] text-muted-foreground mt-0.5">Hours</p>
        <p className="text-sm font-bold text-foreground">{member.volunteerHours}</p>
      </div>
      <div className="flex-shrink-0">
        <AttendanceBadge pct={member.attendancePercentage} />
      </div>
      <button
        onClick={() => onAction?.(member)}
        aria-label={`Actions for ${member.name}`}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0"
      >
        <MoreVertical size={14} className="text-muted-foreground" />
      </button>
    </div>
  );
}

// ── Main Table Component ──────────────────────────────────────────────────────
interface MembersTableProps {
  /** All members on current page — sliced/filtered by parent before passing */
  members: ClubMember[];
  /** Total count in the full dataset (for pagination) — comes from API */
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (size: number) => void;
  onSendEmail?: (ids: string[]) => void;
  onSendNotification?: (ids: string[]) => void;
  onAssignRole?: (ids: string[]) => void;
  onExport?: (ids: string[]) => void;
  onExportAll?: () => void;
  // Individual row actions
  onMemberEmail?: (member: ClubMember) => void;
  onMemberView?: (member: ClubMember) => void;
  onMemberMessage?: (member: ClubMember) => void;
  onMemberAssignRole?: (member: ClubMember) => void;
  onMemberDeactivate?: (member: ClubMember) => void;
}

/**
 * Interactive members data table.
 * - Renders whatever ClubMember[] is passed — no internal data fetching.
 * - Pagination is driven by totalCount prop (from API total, not local array length).
 * - Selection state is local; selected IDs are surfaced to parent via callbacks.
 */
export default function MembersTable({
  members,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onSendEmail,
  onSendNotification,
  onAssignRole,
  onExport,
  onExportAll,
  onMemberEmail,
  onMemberView,
  onMemberMessage,
  onMemberAssignRole,
  onMemberDeactivate,
}: MembersTableProps) {
  const [openActionId, setOpenActionId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleOne = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelectedIds(new Set(members.map((m) => m.id)));
  }, [members]);

  const clearAll = useCallback(() => setSelectedIds(new Set()), []);

  const allSelected = members.length > 0 && members.every((m) => selectedIds.has(m.id));
  const someSelected = selectedIds.size > 0 && !allSelected;

  const selectedArray = Array.from(selectedIds);

  return (
    <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
      {/* Table header bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <h2 className="text-base font-bold text-foreground">All Members</h2>
        <button
          onClick={onExportAll}
          aria-label="Export all members"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
        >
          <Download size={13} />
          Export
        </button>
      </div>

      {/* Bulk action bar — visible only when rows are selected */}
      {selectedIds.size > 0 && (
        <BulkActionBar
          selectedCount={selectedIds.size}
          totalCount={totalCount}
          onSelectAll={selectAll}
          onClearAll={clearAll}
          onSendEmail={() => onSendEmail?.(selectedArray)}
          onSendNotification={() => onSendNotification?.(selectedArray)}
          onAssignRole={() => onAssignRole?.(selectedArray)}
          onExport={() => onExport?.(selectedArray)}
        />
      )}

      {/* ── Desktop Table ── */}
      <div className="hidden lg:block overflow-x-auto">
        <Table aria-label="Club members table">
          <TableHeader>
            <TableRow className="bg-muted hover:bg-muted border-border">
              <TableHead className="w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(el) => {
                    if (el) el.indeterminate = someSelected;
                  }}
                  onChange={allSelected ? clearAll : selectAll}
                  aria-label="Select all members on this page"
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
              </TableHead>
              {[
                'Member', 'Role', 'Department', 'Year',
                'Events', 'Vol. Hours', 'Attendance', 'Joined On', 'Status', 'Actions',
              ].map((col) => (
                <TableHead
                  key={col}
                  className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                >
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map((member) => {
              const isSelected = selectedIds.has(member.id);
              return (
                <TableRow
                  key={member.id}
                  className={cn(
                    'border-border transition-colors duration-150',
                    isSelected ? 'bg-primary/5' : 'hover:bg-muted/50'
                  )}
                >
                  {/* Checkbox */}
                  <TableCell>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(member.id)}
                      aria-label={`Select ${member.name}`}
                      className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                    />
                  </TableCell>
                  {/* Member */}
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-background text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: member.avatarColor }}
                      >
                        {member.avatarInitials}
                      </div>
                      <span className="font-semibold text-foreground text-sm whitespace-nowrap">
                        {member.name}
                      </span>
                    </div>
                  </TableCell>
                  {/* Role */}
                  <TableCell>
                    <RoleBadge role={member.role} />
                  </TableCell>
                  {/* Department */}
                  <TableCell className="text-sm text-foreground whitespace-nowrap">
                    {member.department}
                  </TableCell>
                  {/* Year */}
                  <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                    {member.year}
                  </TableCell>
                  {/* Events */}
                  <TableCell className="text-sm font-semibold text-foreground text-center">
                    {member.eventsCount}
                  </TableCell>
                  {/* Volunteer Hours */}
                  <TableCell className="text-sm font-semibold text-foreground text-center">
                    {member.volunteerHours}
                  </TableCell>
                  {/* Attendance */}
                  <TableCell>
                    <AttendanceBadge pct={member.attendancePercentage} />
                  </TableCell>
                  {/* Joined */}
                  <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                    {member.joinedDate}
                  </TableCell>
                  {/* Status */}
                  <TableCell>
                    <StatusBadge status={member.status} />
                  </TableCell>
                  {/* Actions */}
                  <TableCell>
                    <MemberActionTrigger
                      member={member}
                      openId={openActionId}
                      onOpen={setOpenActionId}
                      onClose={() => setOpenActionId(null)}
                      onEmail={onMemberEmail ?? (() => {})}
                      onViewProfile={onMemberView ?? (() => {})}
                      onMessage={onMemberMessage ?? (() => {})}
                      onAssignRole={onMemberAssignRole ?? (() => {})}
                      onDeactivate={onMemberDeactivate ?? (() => {})}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* ── Mobile List ── */}
      <div className="lg:hidden">
        {/* Mobile select-all header */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-muted border-b border-border">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => { if (el) el.indeterminate = someSelected; }}
            onChange={allSelected ? clearAll : selectAll}
            aria-label="Select all"
            className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
          />
          <span className="text-xs text-muted-foreground">
            {selectedIds.size === 0 ? '0 selected' : `${selectedIds.size} selected`}
          </span>
          {selectedIds.size > 0 && (
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => onSendEmail?.(selectedArray)}
                aria-label="Email selected"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-card border border-border text-[10px] text-foreground font-medium"
              >
                <Mail size={11} className="text-muted-foreground" />
                Email
              </button>
              <button
                onClick={() => onSendNotification?.(selectedArray)}
                aria-label="Notify selected"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-card border border-border text-[10px] text-foreground font-medium"
              >
                <Bell size={11} className="text-muted-foreground" />
                Notify
              </button>
              <button
                onClick={() => onAssignRole?.(selectedArray)}
                aria-label="Assign role"
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-card border border-border text-[10px] text-foreground font-medium"
              >
                <UserCog size={11} className="text-muted-foreground" />
                Role
              </button>
              <button
                aria-label="More actions"
                className="w-6 h-6 flex items-center justify-center rounded-lg bg-card border border-border"
              >
                <MoreHorizontal size={11} className="text-muted-foreground" />
              </button>
            </div>
          )}
        </div>

        {members.map((member) => (
          <MobileMemberRow
            key={member.id}
            member={member}
            isSelected={selectedIds.has(member.id)}
            onToggle={() => toggleOne(member.id)}
            onAction={onMemberView}
          />
        ))}

        {/* View all link on mobile */}
        <button
          onClick={() => onPageChange(page + 1)}
          aria-label="View more members"
          className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-semibold text-primary hover:bg-muted transition-colors border-t border-border"
        >
          <span>View all members</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Pagination */}
      <div className="hidden lg:block">
        <Pagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}
