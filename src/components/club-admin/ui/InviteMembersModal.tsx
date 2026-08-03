'use client';

import { useState, useEffect, useRef } from 'react';
import { X, UserPlus, Mail, Copy, Link } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InviteMembersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInviteSent?: (emails: string[]) => void;
}

export default function InviteMembersModal({
  isOpen,
  onClose,
  onInviteSent,
}: InviteMembersModalProps) {
  const [tab, setTab] = useState<'email' | 'link'>('email');
  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [role, setRole] = useState('Member');
  const [sending, setSending] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const addEmail = () => {
    const trimmed = emailInput.trim();
    if (!trimmed || emails.includes(trimmed)) return;
    setEmails((prev) => [...prev, trimmed]);
    setEmailInput('');
  };

  const removeEmail = (e: string) => setEmails((prev) => prev.filter((x) => x !== e));

  const handleKeyDown = (ev: React.KeyboardEvent) => {
    if (ev.key === 'Enter' || ev.key === ',') { ev.preventDefault(); addEmail(); }
  };

  const handleSend = async () => {
    const list = emailInput.trim() ? [...emails, emailInput.trim()] : emails;
    if (list.length === 0) return;
    setSending(true);
    // TODO: replace with API call → POST /api/club-admin/invitations
    await new Promise((r) => setTimeout(r, 1000));
    setSending(false);
    onInviteSent?.(list);
    setEmails([]);
    setEmailInput('');
    onClose();
  };

  const handleCopyLink = () => {
    // TODO: replace with actual invite link from API
    navigator.clipboard.writeText('https://campusconnect.app/invite/tc-tech-club?token=abc123');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-label="Invite members"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="relative bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md mx-0 sm:mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <UserPlus size={18} className="text-primary" />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Invite Members</h2>
              <p className="text-xs text-muted-foreground">Send invitations to join your club</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close invite modal"
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted border border-transparent hover:border-border transition-all"
          >
            <X size={16} className="text-muted-foreground" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-1 mx-5 mt-4 p-1 bg-muted rounded-xl">
          {(['email', 'link'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              aria-selected={tab === t}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition-all duration-200',
                tab === t
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {t === 'email' ? <Mail size={13} /> : <Link size={13} />}
              {t === 'email' ? 'By Email' : 'Share Link'}
            </button>
          ))}
        </div>

        <div className="px-5 py-4 space-y-4">
          {tab === 'email' ? (
            <>
              {/* Email chips */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  Email addresses
                </label>
                <div className="min-h-[80px] p-2.5 border border-border rounded-xl bg-card focus-within:border-primary transition-colors">
                  <div className="flex flex-wrap gap-1.5 mb-1.5">
                    {emails.map((e) => (
                      <span
                        key={e}
                        className="flex items-center gap-1 px-2.5 py-0.5 bg-primary/20 text-foreground text-xs rounded-full border border-primary/30"
                      >
                        {e}
                        <button
                          onClick={() => removeEmail(e)}
                          aria-label={`Remove ${e}`}
                          className="ml-0.5 hover:text-red-500 transition-colors"
                        >
                          <X size={10} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    ref={firstInputRef}
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addEmail}
                    placeholder="Type email and press Enter..."
                    aria-label="Enter email address"
                    className="w-full text-sm bg-transparent outline-none text-foreground placeholder-muted-foreground"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Separate multiple emails with Enter or comma</p>
              </div>

              {/* Role select */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2" htmlFor="invite-role">
                  Assign role
                </label>
                <select
                  id="invite-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {['Member', 'Technical Lead', 'Design Lead', 'Content Lead', 'Marketing Lead', 'Secretary', 'Treasurer'].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              {/* Personal note */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2" htmlFor="invite-note">
                  Personal note <span className="text-muted-foreground font-normal">(optional)</span>
                </label>
                <textarea
                  id="invite-note"
                  rows={2}
                  placeholder="Add a personal message to your invitation..."
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSend}
                  disabled={sending || (emails.length === 0 && !emailInput.trim())}
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground text-sm font-semibold transition-all active:scale-95"
                >
                  {sending ? 'Sending...' : `Send Invite${emails.length > 0 ? ` (${emails.length})` : ''}`}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Share link */}
              <div>
                <label className="block text-xs font-semibold text-foreground mb-2">
                  Invite link
                </label>
                <div className="flex gap-2">
                  <div className="flex-1 px-3 py-2.5 border border-border rounded-xl bg-muted text-xs text-muted-foreground truncate">
                    campusconnect.app/invite/tc-tech-club?token=abc123
                  </div>
                  <button
                    onClick={handleCopyLink}
                    aria-label="Copy invite link"
                    className={cn(
                      'px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5',
                      linkCopied
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        : 'bg-card border-border text-foreground hover:border-primary'
                    )}
                  >
                    <Copy size={13} />
                    {linkCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Anyone with this link can request to join. Requests still need admin approval.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-foreground mb-2" htmlFor="link-role">
                  Default role for link joins
                </label>
                <select
                  id="link-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm border border-border rounded-xl bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                  {['Member', 'Technical Lead', 'Design Lead'].map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:border-primary hover:text-foreground transition-all"
              >
                Done
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
