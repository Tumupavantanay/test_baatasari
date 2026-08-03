'use client';

import { useState, useEffect } from 'react';
import { X, UserCog } from 'lucide-react';

interface AssignRoleModalProps {
  isOpen: boolean;
  memberIds: string[];
  onClose: () => void;
  onAssigned: (role: string) => void;
}

const ROLES = [
  'Member',
  'Technical Lead',
  'Design Lead',
  'Content Lead',
  'Marketing Lead',
  'Sponsorship Lead',
  'Secretary',
  'Treasurer',
  'Vice President',
  'President',
];

export default function AssignRoleModal({ isOpen, memberIds, onClose, onAssigned }: AssignRoleModalProps) {
  const [selected, setSelected] = useState('Member');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) { setSelected('Member'); setSaving(false); }
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleSave = async () => {
    setSaving(true);
    // TODO: PATCH /api/club-admin/members/bulk-role { memberIds, role: selected }
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    onAssigned(selected);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center" aria-modal="true" role="dialog" aria-label="Assign role">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-sm mx-0 sm:mx-4">
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
              <UserCog size={18} className="text-purple-600" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0C1E3C]">Assign Role</h2>
              <p className="text-xs text-[#828894]">
                {memberIds.length === 1 ? '1 member selected' : `${memberIds.length} members selected`}
              </p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[#F8F6F0] transition-all">
            <X size={16} className="text-[#828894]" />
          </button>
        </div>

        <div className="px-5 py-4 space-y-3">
          <p className="text-xs font-semibold text-[#0C1E3C]">Select a role</p>
          <div className="grid grid-cols-2 gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setSelected(r)}
                aria-pressed={selected === r}
                className={`px-3 py-2.5 rounded-xl border text-xs font-medium text-left transition-all duration-150 ${
                  selected === r
                    ? 'bg-[#D97706]/10 border-[#D97706] text-[#D97706]'
                    : 'bg-white border-[#E5E7EB] text-[#0C1E3C] hover:border-[#A1BCE6]'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-[#E5E7EB] text-sm font-medium text-[#828894] hover:border-[#A1BCE6] transition-all">
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-2.5 rounded-xl bg-[#D97706] hover:bg-[#B45309] disabled:opacity-50 text-white text-sm font-semibold transition-all active:scale-95"
            >
              {saving ? 'Saving...' : 'Assign Role'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
