import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { LeadsDashboard } from '@/components/admin/leads-dashboard';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Lead Manager | Adkompas',
};

export default async function AdminPage() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect('/sign-in');

  const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

  return (
    <LeadsDashboard
      leads={allLeads}
      userName={session.user.name || session.user.email || 'User'}
    />
  );
}
