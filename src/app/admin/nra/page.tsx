import './admin-nra.css';
import type { Metadata } from 'next';
import { nraFontClass } from '@/app/nra/fonts';
import { getNraSupabase, nraSupabaseConfigured, NRA_LEADS_TABLE } from '@/lib/nra-supabase';
import type { NraLeadRow } from '@/lib/nra-types';
import { isAuthenticated } from './actions';
import AdminGate from './AdminGate';
import LeadList from './LeadList';

/**
 * /admin/nra — owner-facing capture list (Lior).
 * Passcode-gated, noindex. Reads `nra_leads` newest-first via the
 * service-role client; the gate fails closed if no passcode is configured.
 */

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'NRA Leads — BalaBite',
  robots: { index: false, follow: false },
};

async function loadLeads(): Promise<{ leads: NraLeadRow[]; error: string | null }> {
  if (!nraSupabaseConfigured()) {
    return { leads: [], error: 'not-configured' };
  }
  try {
    const supabase = getNraSupabase();
    const { data, error } = await supabase
      .from(NRA_LEADS_TABLE)
      .select('*')
      .order('created_at', { ascending: false })
      .limit(2000);
    if (error) {
      console.error('[admin/nra] loadLeads error:', error);
      return { leads: [], error: 'query-failed' };
    }
    return { leads: (data ?? []) as NraLeadRow[], error: null };
  } catch (err) {
    console.error('[admin/nra] loadLeads threw:', err);
    return { leads: [], error: 'query-failed' };
  }
}

export default async function AdminNraPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAuthenticated();

  if (!authed) {
    const params = await searchParams;
    return (
      <div className={`nra-admin-root ${nraFontClass}`}>
        <AdminGate hasError={params.error === '1'} />
      </div>
    );
  }

  const { leads, error } = await loadLeads();

  return (
    <div className={`nra-admin-root ${nraFontClass}`}>
      <div className="nra-admin-shell">
        {error === 'not-configured' ? (
          <>
            <div className="nra-admin-header">
              <h1 className="nra-serif nra-admin-title">NRA Leads</h1>
            </div>
            <div className="nra-admin-notice is-warning" style={{ marginTop: 20 }}>
              <strong>Storage isn’t connected yet.</strong> The{' '}
              <code>NRA_SUPABASE_*</code> environment variables aren’t set, so
              there’s nothing to read. Leads will appear here once they’re
              configured.
            </div>
          </>
        ) : error === 'query-failed' ? (
          <>
            <div className="nra-admin-header">
              <h1 className="nra-serif nra-admin-title">NRA Leads</h1>
            </div>
            <div className="nra-admin-notice is-warning" style={{ marginTop: 20 }}>
              <strong>Couldn’t reach the leads table.</strong> The connection
              is set but the query failed — the <code>nra_leads</code> table may
              not exist yet. Check the Supabase migration.
            </div>
          </>
        ) : (
          <LeadList leads={leads} />
        )}
      </div>
    </div>
  );
}
