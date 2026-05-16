import type { Metadata } from 'next';
import { isBoothAuthed } from '@/lib/booth-gate';
import { BoothGate } from '@/components/BoothGate';
import {
  type Member,
  type Message,
  WhatsAppFrame,
} from '../_whatsapp/WhatsAppFrame';
import '../whatsapp/whatsapp.css';

// /booth-mockups/whatsapp-shift-swap
//
// Scenario A from the dialog-design roundtable (Sofia + Kenji + Maya):
// "Wednesday shift swap, hidden upside." Devon can't make tomorrow's shift;
// Sam volunteers; BalaBite surfaces the historical Sam+Priya upsell pattern.
// The intelligence is pattern recognition in service of the shift — surfaced
// as a fact with a number, never as a compliment about staff.

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'BalaBite — Staff chat: shift swap mockup',
  robots: { index: false, follow: false },
};

const Devon: Member = { name: 'Devon', role: 'Sushi', tone: 'sky' };
const Sam: Member = { name: 'Sam', role: 'Line', tone: 'amber' };
const Priya: Member = { name: 'Priya', role: 'FOH', tone: 'plum' };
const BalaBite: Member = { name: 'BalaBite', tone: 'forest', isBalaBite: true };
const Owner: Member = { name: 'You', tone: 'teal' };

const THREAD: Message[] = [
  {
    sender: Devon,
    time: '3:14 PM',
    body: <>can&rsquo;t make tomorrow night. dentist ran long, swelling is bad 😩</>,
  },
  {
    sender: Sam,
    time: '3:15 PM',
    body: <>i got you. i&rsquo;ll take it.</>,
  },
  {
    sender: Priya,
    time: '3:16 PM',
    body: <>ty Sam 🙏</>,
  },
  {
    sender: BalaBite,
    time: '3:16 PM',
    body: <>Updated 7shifts &mdash; Sam in for Devon, 4pm to close.</>,
    bodySoft: (
      <>
        Worth knowing &mdash; the last 5 Wednesdays Sam ran sushi with
        Priya on the floor, average check came in <strong>$6.40 higher</strong>{' '}
        than the Wednesday baseline. Mostly the omakase upsell and the
        dessert attach &mdash; Sam pushes the yuzu panna cotta, Priya
        closes it.
      </>
    ),
  },
  {
    sender: Sam,
    time: '3:17 PM',
    body: <>ok pushing the omakase &amp; panna cotta then</>,
  },
  {
    sender: Priya,
    time: '3:17 PM',
    body: <>on it. flagging the upsell to FOH</>,
  },
  {
    sender: Owner,
    time: '3:18 PM',
    body: <>appreciate it. let&rsquo;s see if it lands.</>,
    isOwner: true,
    showRead: true,
  },
];

export default async function WhatsAppShiftSwapPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string; error?: string }>;
}) {
  const sp = await searchParams;
  if (!(await isBoothAuthed(sp.key))) {
    return (
      <BoothGate
        next="/booth-mockups/whatsapp-shift-swap"
        hasError={sp.error === '1'}
      />
    );
  }
  return (
    <WhatsAppFrame
      groupName="Staff"
      subline="You, Devon, Sam, Priya, Marco, BalaBite, Maria, James, Carla, …"
      thread={THREAD}
      iosTime="3:18"
      dataTestId="booth-mockup-whatsapp-shift-swap"
    />
  );
}
