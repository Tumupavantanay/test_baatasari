'use client';

import { UserPlus, Upload, MoreHorizontal } from 'lucide-react';
import MoreOptionsMenu from '@/components/club-admin/ui/MoreOptionsMenu';
import { Button } from '@/components/ui/button';

interface MembersPageHeaderProps {
  onInvite?: () => void;
  onImport?: () => void;
  onMore?: () => void;
  showMoreMenu?: boolean;
  onCloseMoreMenu?: () => void;
}

export default function MembersPageHeader({
  onInvite,
  onImport,
  onMore,
  showMoreMenu = false,
  onCloseMoreMenu,
}: MembersPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      {/* Title block */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-foreground tracking-tight leading-tight">
          Members
        </h1>
        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
          Manage your club members, leadership team, and participation.
        </p>
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Primary: Invite Members */}
        <Button
          onClick={onInvite}
          id="invite-members-btn"
          aria-label="Invite new members"
          className="flex items-center gap-2 rounded-xl text-sm font-semibold shadow-sm active:scale-95"
        >
          <UserPlus size={16} />
          <span className="hidden sm:inline">Invite Members</span>
          <span className="sm:hidden">Invite</span>
        </Button>

        {/* Secondary: Import CSV */}
        <Button
          variant="outline"
          onClick={onImport}
          id="import-csv-btn"
          aria-label="Import members from CSV"
          className="flex items-center gap-2 rounded-xl text-sm font-medium shadow-sm active:scale-95 bg-card"
        >
          <Upload size={15} className="text-muted-foreground" />
          <span className="hidden sm:inline">Import CSV</span>
        </Button>

        {/* More options */}
        <div className="relative">
          <Button
            variant="outline"
            size="icon"
            onClick={onMore}
            id="more-options-btn"
            aria-label="More options"
            aria-haspopup="menu"
            aria-expanded={showMoreMenu}
            className="w-9 h-9 rounded-xl shadow-sm active:scale-95 bg-card"
          >
            <MoreHorizontal size={16} className="text-muted-foreground" />
          </Button>
          <MoreOptionsMenu isOpen={showMoreMenu} onClose={onCloseMoreMenu ?? (() => {})} />
        </div>
      </div>
    </div>
  );
}
