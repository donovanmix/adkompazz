'use server';

import { auth } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

const LEAD_STATUSES = ['new', 'contacted', 'qualified', 'closed'] as const;

async function requireUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) throw new Error('Unauthorized');
  return session.user;
}

export async function getLeads() {
  await requireUser();
  return db.select().from(leads).orderBy(desc(leads.createdAt));
}

export async function updateLeadStatus(id: number, status: string) {
  await requireUser();
  if (!LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    throw new Error('Invalid status');
  }
  await db
    .update(leads)
    .set({ status, updatedAt: new Date() })
    .where(eq(leads.id, id));
  revalidatePath('/admin');
}

export async function updateLeadNotes(id: number, notes: string) {
  await requireUser();
  await db
    .update(leads)
    .set({ notes: notes.slice(0, 2000), updatedAt: new Date() })
    .where(eq(leads.id, id));
  revalidatePath('/admin');
}

export async function deleteLead(id: number) {
  await requireUser();
  await db.delete(leads).where(eq(leads.id, id));
  revalidatePath('/admin');
}
