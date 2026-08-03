'use client';

import { useEffect, useRef } from 'react';
import { Mail, Eye, MessageCircle, UserCog, UserX, UserCheck, MoreVertical } from 'lucide-react';
import type { ClubMember } from '@/types/clubAdmin';

interface MemberActionMenuProps {
  member: ClubMember;
  isOpen: boolean;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  onEmail: (member: ClubMember) => void;
  onViewProfile: (member: ClubMember) => void;
  onMessage: (member: ClubMember) => void;
  onAssignRole: (member: ClubMember) => void;
  onDeactivate: (member: ClubMember) => void;
}

const menuItems = [
  { id: 'view', label: 'View Profile', icon: Eye },
  { id: 'email', label: 'Send Email', icon: Mail },
  { id: 'message', label: 'Send Message', icon: MessageCircle },
  { id: 'role', label: 'Assign Role', icon: UserCog },
  { id: 'deactivate', label: 'Deactivate Member', icon: UserX, destructive: true },
];

export default function MemberActionMenu({
  member,
  isOpen,
  anchorRef,
  onClose,
  onEmail,
  onViewProfile,
  onMessage,
  onAssignRole,
  onDeactivate,
}: MemberActionMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click or Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        anchorRef.current &&
        !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  const handleAction = (id: string) => {
    onClose();
    switch (id) {
      case 'view': onViewProfile(member); break;
      case 'email': onEmail(member); break;
      case 'message': onMessage(member); break;
      case 'role': onAssignRole(member); break;
      case 'deactivate': onDeactivate(member); break;
    }
  };

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label={`Actions for ${member.name}`}
      className="absolute right-0 top-full mt-1 z-[80] w-44 bg-popover border border-border rounded-xl shadow-xl py-1 animate-in fade-in-0 zoom-in-95 duration-150"
    >
      <div className="px-3 py-2 border-b border-border mb-1">
        <p className="text-xs font-semibold text-foreground truncate">{member.name}</p>
        <p className="text-[10px] text-muted-foreground truncate">{member.role}</p>
      </div>
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            role="menuitem"
            onClick={() => handleAction(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium transition-colors duration-150 ${
              item.destructive
                ? 'text-red-500 hover:bg-red-50/50'
                : 'text-foreground hover:bg-muted'
            }`}
          >
            <Icon size={13} className={item.destructive ? 'text-red-400' : 'text-muted-foreground'} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

// ── Trigger button — used in MembersTable rows ────────────────────────────────
interface ActionTriggerProps {
  member: ClubMember;
  openId: string | null;
  onOpen: (id: string) => void;
  onClose: () => void;
  onEmail: (member: ClubMember) => void;
  onViewProfile: (member: ClubMember) => void;
  onMessage: (member: ClubMember) => void;
  onAssignRole: (member: ClubMember) => void;
  onDeactivate: (member: ClubMember) => void;
}

export function MemberActionTrigger({
  member,
  openId,
  onOpen,
  onClose,
  onEmail,
  onViewProfile,
  onMessage,
  onAssignRole,
  onDeactivate,
}: ActionTriggerProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const isOpen = openId === member.id;

  return (
    <div className="relative">
      <button
        ref={btnRef}
        onClick={() => (isOpen ? onClose() : onOpen(member.id))}
        aria-label={`Actions for ${member.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted border border-transparent hover:border-border transition-all duration-200"
      >
        <MoreVertical size={14} className="text-muted-foreground" />
      </button>
      <MemberActionMenu
        member={member}
        isOpen={isOpen}
        anchorRef={btnRef}
        onClose={onClose}
        onEmail={onEmail}
        onViewProfile={onViewProfile}
        onMessage={onMessage}
        onAssignRole={onAssignRole}
        onDeactivate={onDeactivate}
      />
    </div>
  );
}
