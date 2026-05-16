import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import {
  type Member,
  type Message,
  WhatsAppFrame,
} from '../_whatsapp/WhatsAppFrame';
import '../whatsapp/whatsapp.css';

// /booth-mockups/whatsapp-complaint
//
// Scenario B from the dialog-design roundtable: guest complaint while the
// owner is away. The cofounder refuses to authorize a comp (that's the
// owner's lane) but suggests a specific dish to send out — based on
// inventory + food cost + tonight's sales velocity. Leaves a clean trail
// for the owner's morning review.

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — Staff chat: complaint mockup',
  robots: { index: false, follow: false },
};

const Priya: Member = { name: 'Priya', role: 'FOH', tone: 'plum' };
const Marco: Member = { name: 'Marco', role: 'Line', tone: 'amber' };
const BalaBite: Member = { name: 'BalaBite', tone: 'forest', isBalaBite: true };

const THREAD: Message[] = [
  {
    sender: Priya,
    time: '8:32 PM',
    body: (
      <>
        table 14 sending the branzino back. says it&rsquo;s dry. asking for
        the meal off the check.
      </>
    ),
    bodySoft: <>owner isn&rsquo;t picking up.</>,
  },
  {
    sender: Marco,
    time: '8:32 PM',
    body: <>it&rsquo;s not dry. i checked it before it went out.</>,
  },
  {
    sender: Priya,
    time: '8:33 PM',
    body: <>doesn&rsquo;t matter rn, she&rsquo;s upset</>,
  },
  {
    sender: BalaBite,
    time: '8:33 PM',
    body: (
      <span className="wa-philosophical">
        Your call on the comp &mdash; that&rsquo;s the owner&rsquo;s line,
        not mine.
      </span>
    ),
    bodySoft: (
      <>
        If it helps: the <strong>espresso panna cotta</strong> plates in
        90 seconds, <strong>24% food cost</strong>. Only{' '}
        <strong>2 sold tonight</strong> out of 12 batched &mdash; they
        don&rsquo;t hold past tomorrow. Sending one as &ldquo;the chef
        wants you to try this&rdquo; burns less margin than a 30% comp on
        the branzino.
      </>
    ),
  },
  {
    sender: Priya,
    time: '8:34 PM',
    body: <>oh that&rsquo;s good. doing that.</>,
  },
  {
    sender: Marco,
    time: '8:34 PM',
    body: <>plating one panna cotta, table 14 🫡</>,
  },
  {
    sender: Priya,
    time: '8:41 PM',
    body: (
      <>
        she asked for the chef&rsquo;s name to leave a review 😅
      </>
    ),
  },
  {
    sender: BalaBite,
    time: '8:41 PM',
    body: (
      <>
        Logged: Table 14, branzino complaint, panna cotta sent. Owner sees
        it at 7am.
      </>
    ),
    bodySoft: (
      <>
        Panna cotta count tonight: <strong>3 of 12</strong>. Still room to
        push.
      </>
    ),
  },
];

export default async function WhatsAppComplaintPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate
        next="/booth-mockups/whatsapp-complaint"
        hasError={sp.error === '1'}
      />
    );
  }
  return (
    <WhatsAppFrame
      groupName="Staff"
      subline="You, Priya, Marco, Devon, BalaBite, Sam, Maria, James, Carla, …"
      thread={THREAD}
      iosTime="8:41"
      dataTestId="booth-mockup-whatsapp-complaint"
    />
  );
}
