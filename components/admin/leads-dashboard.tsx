'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { authClient } from '@/lib/auth/client';
import { updateLeadStatus, updateLeadNotes, deleteLead } from '@/app/actions/leads';
import type { Lead } from '@/lib/db/schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Download,
  Trash2,
  LogOut,
  Users,
  UserPlus,
  PhoneCall,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'closed', label: 'Closed' },
];

const STATUS_STYLES: Record<string, string> = {
  new: 'bg-blue-50 text-blue-700 border-blue-200',
  contacted: 'bg-amber-50 text-amber-700 border-amber-200',
  qualified: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  closed: 'bg-gray-100 text-gray-600 border-gray-200',
};

interface LeadsDashboardProps {
  leads: Lead[];
  userName: string;
}

export function LeadsDashboard({ leads, userName }: LeadsDashboardProps) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [noteDrafts, setNoteDrafts] = useState<Record<number, string>>({});
  const [isPending, startTransition] = useTransition();

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter((lead) => {
      if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
      if (!q) return true;
      return [lead.name, lead.companyName, lead.email, lead.phone, lead.services]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [leads, search, statusFilter]);

  const stats = useMemo(
    () => ({
      total: leads.length,
      newCount: leads.filter((l) => l.status === 'new').length,
      contacted: leads.filter((l) => l.status === 'contacted').length,
      qualified: leads.filter((l) => l.status === 'qualified').length,
    }),
    [leads]
  );

  const exportUrl = (format: 'csv' | 'xlsx') => {
    const params = new URLSearchParams({ format });
    if (statusFilter !== 'all') params.set('status', statusFilter);
    if (search.trim()) params.set('q', search.trim());
    return `/api/leads/export?${params.toString()}`;
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/sign-in');
    router.refresh();
  };

  const handleStatusChange = (id: number, status: string) => {
    startTransition(async () => {
      await updateLeadStatus(id, status);
      router.refresh();
    });
  };

  const handleSaveNotes = (id: number) => {
    const notes = noteDrafts[id] ?? '';
    startTransition(async () => {
      await updateLeadNotes(id, notes);
      router.refresh();
    });
  };

  const handleDelete = (id: number) => {
    if (!window.confirm('Delete this lead? This cannot be undone.')) return;
    startTransition(async () => {
      await deleteLead(id);
      router.refresh();
    });
  };

  const formatDate = (d: Date) =>
    new Date(d).toLocaleString('en-MY', {
      timeZone: 'Asia/Kuala_Lumpur',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/kompas-logo-transparent.png"
              alt="Adkompas"
              width={36}
              height={36}
            />
            <div>
              <h1 className="text-base font-bold text-gray-900 leading-tight">Lead Manager</h1>
              <p className="text-xs text-gray-500">Adkompas</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500 hidden sm:block">{userName}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="gap-2 border-gray-200 bg-transparent"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col gap-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'Total Leads', value: stats.total, icon: Users },
            { label: 'New', value: stats.newCount, icon: UserPlus },
            { label: 'Contacted', value: stats.contacted, icon: PhoneCall },
            { label: 'Qualified', value: stats.qualified, icon: CheckCircle2 },
          ].map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
                <p className="text-xs text-gray-500">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, company, email, phone..."
              className="pl-9 bg-white border-gray-200"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40 bg-white border-gray-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button asChild variant="outline" size="sm" className="gap-2 border-gray-200 bg-white">
              <a href={exportUrl('csv')} download>
                <Download className="w-4 h-4" />
                CSV
              </a>
            </Button>
            <Button asChild size="sm" className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
              <a href={exportUrl('xlsx')} download>
                <Download className="w-4 h-4" />
                Excel
              </a>
            </Button>
          </div>
        </div>

        {/* Leads table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-sm">
                {leads.length === 0
                  ? 'No leads yet. Leads appear here when the WhatsApp form is submitted.'
                  : 'No leads match your search or filter.'}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left">
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Lead</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden md:table-cell">
                      Contact
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden lg:table-cell">
                      Services
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase hidden sm:table-cell">
                      Date
                    </th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((lead) => (
                    <LeadRows
                      key={lead.id}
                      lead={lead}
                      expanded={expandedId === lead.id}
                      onToggle={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                      noteDraft={noteDrafts[lead.id] ?? lead.notes}
                      onNoteChange={(v) =>
                        setNoteDrafts((prev) => ({ ...prev, [lead.id]: v }))
                      }
                      onSaveNotes={() => handleSaveNotes(lead.id)}
                      onStatusChange={(s) => handleStatusChange(lead.id, s)}
                      onDelete={() => handleDelete(lead.id)}
                      disabled={isPending}
                      formatDate={formatDate}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 text-center">
          Showing {filtered.length} of {leads.length} lead{leads.length === 1 ? '' : 's'}
        </p>
      </div>
    </main>
  );
}

interface LeadRowsProps {
  lead: Lead;
  expanded: boolean;
  onToggle: () => void;
  noteDraft: string;
  onNoteChange: (v: string) => void;
  onSaveNotes: () => void;
  onStatusChange: (s: string) => void;
  onDelete: () => void;
  disabled: boolean;
  formatDate: (d: Date) => string;
}

function LeadRows({
  lead,
  expanded,
  onToggle,
  noteDraft,
  onNoteChange,
  onSaveNotes,
  onStatusChange,
  onDelete,
  disabled,
  formatDate,
}: LeadRowsProps) {
  return (
    <>
      <tr className="border-b border-gray-100 hover:bg-gray-50/60 transition-colors">
        <td className="px-4 py-3">
          <p className="font-medium text-gray-900">{lead.name}</p>
          <p className="text-xs text-gray-500">{lead.companyName}</p>
        </td>
        <td className="px-4 py-3 hidden md:table-cell">
          <p className="text-gray-700">{lead.email}</p>
          <p className="text-xs text-gray-500">{lead.phone}</p>
        </td>
        <td className="px-4 py-3 hidden lg:table-cell max-w-[220px]">
          <p className="text-gray-700 truncate" title={lead.services}>
            {lead.services}
          </p>
        </td>
        <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-xs whitespace-nowrap">
          {formatDate(lead.createdAt)}
        </td>
        <td className="px-4 py-3">
          <Select
            value={lead.status}
            onValueChange={onStatusChange}
            disabled={disabled}
          >
            <SelectTrigger
              className={`h-7 w-[120px] text-xs border rounded-full px-3 ${STATUS_STYLES[lead.status] ?? STATUS_STYLES.new}`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center justify-end gap-1">
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-label={expanded ? 'Hide details' : 'Show details'}
              className="w-8 h-8 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-500 transition-colors"
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            <button
              type="button"
              onClick={onDelete}
              disabled={disabled}
              aria-label="Delete lead"
              className="w-8 h-8 rounded-md hover:bg-red-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-gray-100 bg-gray-50/40">
          <td colSpan={6} className="px-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2 text-sm">
                <p className="text-xs font-semibold text-gray-500 uppercase">Full Details</p>
                <p>
                  <span className="text-gray-500">Email: </span>
                  <a href={`mailto:${lead.email}`} className="text-emerald-700 hover:underline">
                    {lead.email}
                  </a>
                </p>
                <p>
                  <span className="text-gray-500">Phone: </span>
                  <span className="text-gray-800">{lead.phone}</span>
                </p>
                <p>
                  <span className="text-gray-500">Services: </span>
                  <span className="text-gray-800">{lead.services}</span>
                </p>
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-1 text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Reply on WhatsApp
                </a>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Notes</p>
                <textarea
                  value={noteDraft}
                  onChange={(e) => onNoteChange(e.target.value)}
                  rows={3}
                  placeholder="Add internal notes about this lead..."
                  className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-emerald-400 resize-none"
                />
                <div className="flex justify-end">
                  <Button
                    size="sm"
                    onClick={onSaveNotes}
                    disabled={disabled}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    Save Notes
                  </Button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
