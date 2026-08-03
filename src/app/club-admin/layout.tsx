import type { Metadata } from 'next';
import ClubAdminShell from '@/components/club-admin/layout/ClubAdminShell';

export const metadata: Metadata = {
  title: 'Club Admin — Campus Connect',
  description: 'Manage your club members, events, and operations from the Campus Connect admin portal.',
};

/**
 * Club Admin layout — Server Component for metadata.
 * All /club-admin/* pages inherit the dark-sidebar shell via ClubAdminShell.
 * Add server-side auth check here when backend is ready.
 */
export default function ClubAdminLayout({ children }: { children: React.ReactNode }) {
  return <ClubAdminShell>{children}</ClubAdminShell>;
}
