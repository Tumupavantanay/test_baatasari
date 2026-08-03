'use client';

import { useEffect, useRef } from 'react';
import { Download, RefreshCw, Settings, HelpCircle } from 'lucide-react';

interface MoreOptionsMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const options = [
  { id: 'export-all', label: 'Export All Members', icon: Download },
  { id: 'refresh', label: 'Refresh Data', icon: RefreshCw },
  { id: 'settings', label: 'Member Settings', icon: Settings },
  { id: 'help', label: 'Help & Docs', icon: HelpCircle },
];

export default function MoreOptionsMenu({ isOpen, onClose }: MoreOptionsMenuProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    const keyHandler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', handler);
    document.addEventListener('keydown', keyHandler);
    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('keydown', keyHandler);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      role="menu"
      aria-label="More options"
      className="absolute right-0 top-full mt-1 z-[80] w-48 bg-popover border border-border rounded-xl shadow-xl py-1 animate-in fade-in-0 zoom-in-95 duration-150"
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        return (
          <button
            key={opt.id}
            role="menuitem"
            onClick={() => { onClose(); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors duration-150"
          >
            <Icon size={13} className="text-muted-foreground" />
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
