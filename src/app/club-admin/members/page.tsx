'use client';

/**
 * /club-admin/members — Members Management Page
 *
 * Backend integration guide:
 * ──────────────────────────────────────────────────────────────────────────
 * All data currently comes from mock files in /src/data/clubMembersData.ts.
 * When the API is ready:
 *
 *   • Replace mock imports with useSWR / fetch calls, e.g.:
 *       const { data: { members, total } } = useSWR(
 *         `/api/club-admin/members?page=${page}&pageSize=${pageSize}&${qs(filters)}`
 *       );
 *
 *   • Remove the client-side `filteredMembers` useMemo block — filtering
 *     and pagination will happen server-side, so `pagedMembers` = API response directly.
 *
 *   • `totalCount` should come from the API response body (e.g. `{ data: [], total: 320 }`).
 *
 *   • Each button callback (onInvite, onExport, etc.) already maps to a logical
 *     API endpoint — see the TODO comments below.
 * ──────────────────────────────────────────────────────────────────────────
 */

import { useState, useMemo, useCallback } from 'react';
import type { MemberFilters, ClubMember, LeadershipMember } from '@/types/clubAdmin';
import type { ToastData } from '@/components/club-admin/ui/Toast';

// ── Mock data (swap with API hooks) ──────────────────────────────────────────
import {
  clubMetrics,
  leadershipTeam,
  coreCommittee,
  allMembers,
  memberActivityLog,
  departmentDistribution,
  yearDistribution,
  genderRatio,
  topSkills,
} from '@/data/clubMembersData';

// ── Components ────────────────────────────────────────────────────────────────
import MembersPageHeader from '@/components/club-admin/members/MembersPageHeader';
import MemberStatCards from '@/components/club-admin/members/MemberStatCards';
import MembersSearchBar from '@/components/club-admin/members/MembersSearchBar';
import MemberCarouselSection from '@/components/club-admin/members/MemberCarouselSection';
import MembersTable from '@/components/club-admin/members/MembersTable';
import MemberInsights from '@/components/club-admin/members/MemberInsights';
import RecentActivityFeed from '@/components/club-admin/members/RecentActivityFeed';
import InviteMembersModal from '@/components/club-admin/ui/InviteMembersModal';
import ImportCSVModal from '@/components/club-admin/ui/ImportCSVModal';
import { ToastContainer } from '@/components/club-admin/ui/Toast';
import AssignRoleModal from '@/components/club-admin/ui/AssignRoleModal';
import MemberProfileDrawer from '@/components/club-admin/ui/MemberProfileDrawer';
import MoreOptionsMenu from '@/components/club-admin/ui/MoreOptionsMenu';

// ── Constants ─────────────────────────────────────────────────────────────────
const INITIAL_FILTERS: MemberFilters = {
  role: 'All Roles',
  department: 'All Departments',
  year: 'All Years',
  status: 'All Status',
  search: '',
};

let toastCounter = 0;
function makeToast(message: string, type: ToastData['type'] = 'success'): ToastData {
  return { id: `toast-${++toastCounter}`, message, type };
}

export default function MembersPage() {
  // ── UI state ──────────────────────────────────────────────────────────────
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [assignRoleTargetIds, setAssignRoleTargetIds] = useState<string[]>([]);
  const [profileMember, setProfileMember] = useState<ClubMember | null>(null);
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // ── Filter & pagination state ─────────────────────────────────────────────
  const [filters, setFilters] = useState<MemberFilters>(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const addToast = useCallback((message: string, type: ToastData['type'] = 'success') => {
    setToasts((prev) => [...prev, makeToast(message, type)]);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ── Filter change handler ─────────────────────────────────────────────────
  const handleFiltersChange = useCallback((partial: Partial<MemberFilters>) => {
    setFilters((prev) => ({ ...prev, ...partial }));
    setPage(1);
  }, []);

  // ── Client-side filter (remove when API filtering is active) ─────────────
  const filteredMembers = useMemo(() => {
    return allMembers.filter((m) => {
      if (filters.role !== 'All Roles' && m.role !== filters.role) return false;
      if (filters.department !== 'All Departments' && m.department !== filters.department) return false;
      if (filters.year !== 'All Years' && m.year !== filters.year) return false;
      if (filters.status !== 'All Status' && m.status !== filters.status) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!m.name.toLowerCase().includes(q) && !m.role.toLowerCase().includes(q) && !m.department.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  // totalCount → from API response when backend is live
  const totalCount = filteredMembers.length;

  // pagedMembers → pre-paged by API when backend is live (remove slice then)
  const pagedMembers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredMembers.slice(start, start + pageSize);
  }, [filteredMembers, page, pageSize]);

  // ── Action handlers ───────────────────────────────────────────────────────

  // Header
  const handleInviteSent = (emails: string[]) => {
    addToast(`Invitation sent to ${emails.length} ${emails.length === 1 ? 'person' : 'people'}`, 'success');
  };
  const handleImported = (count: number) => {
    addToast(`${count} members imported successfully`, 'success');
  };

  // Carousel actions
  const handleCarouselEmail = (member: LeadershipMember) => {
    // TODO: open email client or email compose modal
    addToast(`Email drafted to ${member.name}`, 'info');
  };
  const handleCarouselView = (member: LeadershipMember) => {
    // Map LeadershipMember to a minimal ClubMember for the profile drawer
    const asMember = allMembers.find((m) => m.name === member.name) ?? {
      id: member.id,
      name: member.name,
      avatarInitials: member.avatarInitials,
      avatarColor: member.avatarColor,
      role: member.role,
      department: member.department,
      year: member.year,
      eventsCount: 0,
      volunteerHours: 0,
      attendancePercentage: 0,
      joinedDate: '—',
      status: 'Active' as const,
      email: member.email,
    };
    setProfileMember(asMember);
  };
  const handleCarouselMessage = (member: LeadershipMember) => {
    // TODO: open chat/message modal
    addToast(`Opening chat with ${member.name}...`, 'info');
  };

  // Table bulk actions
  const handleSendEmail = (ids: string[]) => {
    // TODO: POST /api/club-admin/emails { memberIds: ids }
    addToast(`Email queued for ${ids.length} member${ids.length > 1 ? 's' : ''}`, 'success');
  };
  const handleSendNotification = (ids: string[]) => {
    // TODO: POST /api/club-admin/notifications { memberIds: ids }
    addToast(`Notification sent to ${ids.length} member${ids.length > 1 ? 's' : ''}`, 'success');
  };
  const handleAssignRole = (ids: string[]) => {
    setAssignRoleTargetIds(ids);
    setShowAssignRole(true);
  };
  const handleExport = (ids: string[]) => {
    // TODO: GET /api/club-admin/members/export?ids=...
    addToast(`Exporting ${ids.length} member${ids.length > 1 ? 's' : ''}...`, 'info');
  };
  const handleExportAll = () => {
    // TODO: GET /api/club-admin/members/export
    addToast('Exporting all members...', 'info');
  };

  // Table row actions
  const handleMemberEmail = (m: ClubMember) => {
    addToast(`Email drafted to ${m.name}`, 'info');
  };
  const handleMemberView = (m: ClubMember) => {
    setProfileMember(m);
  };
  const handleMemberMessage = (m: ClubMember) => {
    addToast(`Opening chat with ${m.name}...`, 'info');
  };
  const handleMemberAssignRole = (m: ClubMember) => {
    setAssignRoleTargetIds([m.id]);
    setShowAssignRole(true);
  };
  const handleMemberDeactivate = (m: ClubMember) => {
    // TODO: PATCH /api/club-admin/members/:id { status: 'Inactive' }
    addToast(`${m.name} has been deactivated`, 'warning');
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 lg:px-6 pt-6 pb-28 lg:pb-10 space-y-6">

        {/* ── Page Header ── */}
        <MembersPageHeader
          onInvite={() => setShowInviteModal(true)}
          onImport={() => setShowImportModal(true)}
          onMore={() => setShowMoreMenu((p) => !p)}
          showMoreMenu={showMoreMenu}
          onCloseMoreMenu={() => setShowMoreMenu(false)}
        />

        {/* ── Metric Cards ── */}
        <MemberStatCards metrics={clubMetrics} />

        {/* ── Search & Filters ── */}
        <MembersSearchBar
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* ── Leadership Team ── */}
        <MemberCarouselSection
          title="Leadership Team"
          members={leadershipTeam}
          onViewAll={() => addToast('Navigating to full leadership view...', 'info')}
          onEmail={handleCarouselEmail}
          onView={handleCarouselView}
          onMessage={handleCarouselMessage}
        />

        {/* ── Core Committee ── */}
        <MemberCarouselSection
          title="Core Committee"
          members={coreCommittee}
          onViewAll={() => addToast('Navigating to full committee view...', 'info')}
          onEmail={handleCarouselEmail}
          onView={handleCarouselView}
          onMessage={handleCarouselMessage}
        />

        {/* ── All Members Table ── */}
        <MembersTable
          members={pagedMembers}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => { setPageSize(size); setPage(1); }}
          onSendEmail={handleSendEmail}
          onSendNotification={handleSendNotification}
          onAssignRole={handleAssignRole}
          onExport={handleExport}
          onExportAll={handleExportAll}
          onMemberEmail={handleMemberEmail}
          onMemberView={handleMemberView}
          onMemberMessage={handleMemberMessage}
          onMemberAssignRole={handleMemberAssignRole}
          onMemberDeactivate={handleMemberDeactivate}
        />

        {/* ── Analytics & Insights ── */}
        <MemberInsights
          departmentDistribution={departmentDistribution}
          yearDistribution={yearDistribution}
          genderRatio={genderRatio}
          topSkills={topSkills}
          onViewReport={() => addToast('Navigating to full reports...', 'info')}
        />

        {/* ── Recent Activity ── */}
        <RecentActivityFeed
          activities={memberActivityLog}
          onViewAll={() => addToast('Navigating to full activity log...', 'info')}
        />

        {/* ── Footer ── */}
        <footer className="text-center pt-2 pb-4">
          <p className="text-xs text-[#828894]">
            © 2026 Campus Connect. All rights reserved.{' '}
            <button className="hover:text-[#0C1E3C] transition-colors underline-offset-2 hover:underline">Privacy Policy</button>
            {' · '}
            <button className="hover:text-[#0C1E3C] transition-colors underline-offset-2 hover:underline">Terms of Service</button>
          </p>
        </footer>
      </div>

      {/* ── Modals & Overlays ── */}
      <InviteMembersModal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInviteSent={handleInviteSent}
      />
      <ImportCSVModal
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImported={handleImported}
      />
      <AssignRoleModal
        isOpen={showAssignRole}
        memberIds={assignRoleTargetIds}
        onClose={() => setShowAssignRole(false)}
        onAssigned={(role) => {
          addToast(`Role "${role}" assigned to ${assignRoleTargetIds.length} member${assignRoleTargetIds.length > 1 ? 's' : ''}`, 'success');
          setShowAssignRole(false);
        }}
      />
      <MemberProfileDrawer
        member={profileMember}
        onClose={() => setProfileMember(null)}
        onEmail={handleMemberEmail}
        onMessage={handleMemberMessage}
        onAssignRole={handleMemberAssignRole}
        onDeactivate={handleMemberDeactivate}
      />

      {/* ── Toast notifications ── */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
