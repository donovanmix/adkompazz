import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import * as XLSX from 'xlsx';

export const dynamic = 'force-dynamic';

const HEADERS = [
  'ID',
  'Name',
  'Company',
  'Email',
  'Phone',
  'Services',
  'Status',
  'Notes',
  'Created At',
];

function formatDate(d: Date) {
  return new Date(d).toLocaleString('en-MY', {
    timeZone: 'Asia/Kuala_Lumpur',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export async function GET(request: Request) {
  const { data: session } = await auth.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(request.url);
  const format = url.searchParams.get('format') === 'xlsx' ? 'xlsx' : 'csv';
  const status = url.searchParams.get('status');
  const q = url.searchParams.get('q')?.trim().toLowerCase();

  let rows = await db.select().from(leads).orderBy(desc(leads.createdAt));

  if (status) {
    rows = rows.filter((r) => r.status === status);
  }
  if (q) {
    rows = rows.filter((r) =>
      [r.name, r.companyName, r.email, r.phone, r.services]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }

  const data = rows.map((r) => [
    r.id,
    r.name,
    r.companyName,
    r.email,
    r.phone,
    r.services,
    r.status,
    r.notes,
    formatDate(r.createdAt),
  ]);

  const dateStamp = new Date().toISOString().slice(0, 10);

  if (format === 'xlsx') {
    const worksheet = XLSX.utils.aoa_to_sheet([HEADERS, ...data]);
    worksheet['!cols'] = [
      { wch: 6 },
      { wch: 20 },
      { wch: 24 },
      { wch: 28 },
      { wch: 18 },
      { wch: 40 },
      { wch: 12 },
      { wch: 40 },
      { wch: 22 },
    ];
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    return new NextResponse(buffer, {
      headers: {
        'Content-Type':
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="adkompas-leads-${dateStamp}.xlsx"`,
      },
    });
  }

  const escapeCsv = (value: unknown) => {
    const s = String(value ?? '');
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const csv = [HEADERS, ...data]
    .map((row) => row.map(escapeCsv).join(','))
    .join('\n');

  return new NextResponse(`\uFEFF${csv}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="adkompas-leads-${dateStamp}.csv"`,
    },
  });
}
