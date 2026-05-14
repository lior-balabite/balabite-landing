import { redirect } from 'next/navigation';

// /NRA-booklet — the QR target printed in the NRA booklet.
// Resolves straight through to the booth page, tagged so booklet scans
// are attributable.
export default function NraBookletRedirect() {
  redirect('/booth-8332?src=booklet');
}
