'use client';

import { useMemo, useState } from 'react';
import { signOut, updateNote } from './actions';
import type { NraLeadRow } from '@/lib/nra-types';

type FitFilter = 'all' | 'strong' | 'medium' | 'weak';
type SourceFilter = 'all' | 'booth' | 'booklet';

/* --- CSV export ------------------------------------------------------ */

const CSV_COLUMNS: { key: string; label: string }[] = [
  { key: 'created_at', label: 'Captured' },
  { key: 'full_name', label: 'Name' },
  { key: 'restaurant_name', label: 'Restaurant' },
  { key: 'role', label: 'Role' },
  { key: 'email', label: 'Email' },
  { key: 'phone', label: 'Phone' },
  { key: 'city', label: 'City' },
  { key: 'location_count', label: 'Locations' },
  { key: 'source', label: 'Source' },
  { key: 'fit_signal', label: 'Fit' },
  { key: 'fit_score', label: 'Fit score' },
  { key: 'fit_reason', label: 'Fit reason' },
  { key: 'cuisine', label: 'Cuisine (enriched)' },
  { key: 'locality', label: 'Locality (enriched)' },
  { key: 'region', label: 'Region (enriched)' },
  { key: 'note', label: 'Note' },
];

function csvCell(value: unknown): string {
  const s = value == null ? '' : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function buildCsv(leads: NraLeadRow[]): string {
  const header = CSV_COLUMNS.map((c) => csvCell(c.label)).join(',');
  const rows = leads.map((lead) => {
    const flat: Record<string, unknown> = {
      ...lead,
      cuisine: lead.enrichment?.cuisine ?? '',
      locality: lead.enrichment?.locality ?? '',
      region: lead.enrichment?.region ?? '',
    };
    return CSV_COLUMNS.map((c) => csvCell(flat[c.key])).join(',');
  });
  return [header, ...rows].join('\r\n');
}

function downloadCsv(leads: NraLeadRow[]) {
  const csv = buildCsv(leads);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nra-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* --- Per-lead note editor ------------------------------------------- */

function LeadNote({ lead }: { lead: NraLeadRow }) {
  const [value, setValue] = useState(lead.note ?? '');
  const [saved, setSaved] = useState(lead.note ?? '');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const dirty = value !== saved;

  async function handleSave() {
    setStatus('saving');
    const result = await updateNote(lead.id, value);
    if (result.ok) {
      setSaved(value);
      setStatus('saved');
    } else {
      setStatus('error');
    }
  }

  return (
    <div className="nra-lead-note">
      <div className="nra-lead-note-label">
        <span>Note</span>
        {status === 'saved' && !dirty && (
          <span className="nra-lead-note-saved">Saved ✓</span>
        )}
        {status === 'error' && (
          <span className="nra-lead-note-failed">Couldn’t save — retry</span>
        )}
      </div>
      <textarea
        value={value}
        placeholder="Who they are, what they said, why they matter…"
        onChange={(e) => {
          setValue(e.target.value);
          if (status !== 'idle') setStatus('idle');
        }}
      />
      <div className="nra-lead-note-actions">
        <button
          type="button"
          className="nra-lead-note-save"
          disabled={!dirty || status === 'saving'}
          onClick={handleSave}
        >
          {status === 'saving' ? 'Saving…' : 'Save note'}
        </button>
      </div>
    </div>
  );
}

/* --- Lead card ------------------------------------------------------- */

function LeadCard({ lead }: { lead: NraLeadRow }) {
  const signal = lead.fit_signal ?? 'weak';
  const enrichBits = lead.enrichment
    ? [lead.enrichment.cuisine, lead.enrichment.locality, lead.enrichment.region]
        .filter(Boolean)
        .join(' · ')
    : '';

  return (
    <article className="nra-lead-card">
      <div className="nra-lead-top">
        <div>
          <h2 className="nra-lead-restaurant">{lead.restaurant_name}</h2>
          <p className="nra-lead-person">
            {lead.full_name}
            {lead.role ? ` · ${lead.role}` : ''}
          </p>
        </div>
        <span className={`nra-fit-badge is-${signal}`}>
          {signal}
          {typeof lead.fit_score === 'number' ? ` ${lead.fit_score}` : ''}
        </span>
      </div>

      <div className="nra-lead-divider" />

      <dl className="nra-lead-grid">
        <div className="nra-lead-row">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${lead.email}`}>{lead.email}</a>
          </dd>
        </div>
        <div className="nra-lead-row">
          <dt>Phone</dt>
          <dd>
            {lead.phone ? <a href={`tel:${lead.phone}`}>{lead.phone}</a> : '—'}
          </dd>
        </div>
        <div className="nra-lead-row">
          <dt>City</dt>
          <dd>{lead.city || '—'}</dd>
        </div>
        <div className="nra-lead-row">
          <dt>Locations</dt>
          <dd>{lead.location_count || '—'}</dd>
        </div>
        <div className="nra-lead-row">
          <dt>Source</dt>
          <dd>
            <span className="nra-source-badge">{lead.source}</span>
          </dd>
        </div>
        <div className="nra-lead-row">
          <dt>Captured</dt>
          <dd>
            <time dateTime={lead.created_at} suppressHydrationWarning>
              {new Date(lead.created_at).toLocaleString(undefined, {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
            </time>
          </dd>
        </div>
      </dl>

      {enrichBits && (
        <div className="nra-lead-enrich">
          <span className="nra-lead-enrich-label">Enriched</span>
          {enrichBits}
        </div>
      )}

      {lead.fit_reason && (
        <p className="nra-lead-fitreason">{lead.fit_reason}</p>
      )}

      <LeadNote lead={lead} />
    </article>
  );
}

/* --- List ------------------------------------------------------------ */

export default function LeadList({ leads }: { leads: NraLeadRow[] }) {
  const [fitFilter, setFitFilter] = useState<FitFilter>('all');
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>('all');

  const counts = useMemo(() => {
    return {
      strong: leads.filter((l) => l.fit_signal === 'strong').length,
      medium: leads.filter((l) => l.fit_signal === 'medium').length,
      weak: leads.filter((l) => l.fit_signal === 'weak').length,
      booth: leads.filter((l) => l.source === 'booth').length,
      booklet: leads.filter((l) => l.source === 'booklet').length,
    };
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (fitFilter !== 'all' && l.fit_signal !== fitFilter) return false;
      if (sourceFilter !== 'all' && l.source !== sourceFilter) return false;
      return true;
    });
  }, [leads, fitFilter, sourceFilter]);

  const fitFilters: { key: FitFilter; label: string }[] = [
    { key: 'all', label: `All ${leads.length}` },
    { key: 'strong', label: `Strong ${counts.strong}` },
    { key: 'medium', label: `Medium ${counts.medium}` },
    { key: 'weak', label: `Weak ${counts.weak}` },
  ];
  const sourceFilters: { key: SourceFilter; label: string }[] = [
    { key: 'booth', label: `Booth ${counts.booth}` },
    { key: 'booklet', label: `Booklet ${counts.booklet}` },
  ];

  return (
    <>
      <div className="nra-admin-header">
        <div>
          <h1 className="nra-serif nra-admin-title">NRA Leads</h1>
          <p className="nra-admin-subtitle">
            {leads.length} captured · newest first
          </p>
        </div>
        <form action={signOut}>
          <button type="submit" className="nra-admin-signout">
            Sign out
          </button>
        </form>
      </div>

      <div className="nra-admin-toolbar">
        <div className="nra-admin-filters">
          {fitFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className="nra-admin-filter"
              aria-pressed={fitFilter === f.key}
              onClick={() => setFitFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
          {sourceFilters.map((f) => (
            <button
              key={f.key}
              type="button"
              className="nra-admin-filter"
              aria-pressed={sourceFilter === f.key}
              onClick={() =>
                setSourceFilter(sourceFilter === f.key ? 'all' : f.key)
              }
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="nra-admin-export"
          disabled={filtered.length === 0}
          onClick={() => downloadCsv(filtered)}
        >
          Export CSV
        </button>
      </div>

      {leads.length === 0 ? (
        <div className="nra-admin-notice">
          No leads yet. They’ll land here the moment the first prospect signs
          up at the booth.
        </div>
      ) : filtered.length === 0 ? (
        <div className="nra-admin-notice">
          No leads match this filter.
        </div>
      ) : (
        <div className="nra-lead-list">
          {filtered.map((lead) => (
            <LeadCard key={lead.id} lead={lead} />
          ))}
        </div>
      )}
    </>
  );
}
