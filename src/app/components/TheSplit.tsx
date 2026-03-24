'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── THREE ANGLES — same format, different lens ── */

interface SplitAngle {
  id: string;
  tab: string;
  leftSub: string;
  rightSub: string;
  moments: { time: string; without: string; with: string }[];
  tagline: string;
}

const anglesUnsorted: SplitAngle[] = [
  {
    id: 'shift',
    tab: 'Your Day',
    leftSub: 'Your Tuesday.',
    rightSub: 'Also your Tuesday.',
    tagline: 'You already know which side you\u2019re on.',
    moments: [
      {
        time: '6:12 AM',
        without: 'Your sous chef texts: "can\'t come in." You\'re still in bed. Your day just broke before it started.',
        with: 'Your sous chef texts: "can\'t come in." Team Brain already flagged low coverage and suggested two available staff. You approve one from bed. Back to sleep.',
      },
      {
        time: '11:47 AM',
        without: 'Tomato delivery is 30 kilos short. Lunch service starts in 73 minutes. You\'re calling three suppliers while prepping mise en place.',
        with: 'Tomato delivery is 30 kilos short. Kitchen Brain caught the discrepancy when you scanned the invoice and auto-sent a top-up order to your backup supplier. You\'re tasting the soup.',
      },
      {
        time: '2:33 PM',
        without: 'You realize the cost on the new lamb dish is 41%, not the 29% you pitched to your partner. You\'ve been bleeding money for two weeks and didn\'t know.',
        with: 'Menu Brain flagged the lamb dish cost on day three. You adjusted the portion in Menu Arena, updated the recipe card. The last eleven days ran at 28%. You\'re having coffee.',
      },
      {
        time: '5:15 PM',
        without: 'Saturday\'s private event for 45 — you still haven\'t confirmed headcount, adjusted the prep list, or told your team they\'re losing their day off.',
        with: 'Saturday\'s event: headcount confirmed, prep list auto-adjusted by Kitchen Brain, team notified last Thursday. One of them swapped shifts voluntarily through the app. You didn\'t touch it.',
      },
      {
        time: '9:48 PM',
        without: 'Service is over. You sit down for the first time in 14 hours. You still need to count inventory, close the register, and reconcile Thursday\'s numbers.',
        with: 'Service is over. Finance Brain reconciled the register against POS data. Inventory tracked from scanned invoices and waste logs. Thursday\'s discrepancy was a voided check — already flagged and resolved.',
      },
      {
        time: '11:55 PM',
        without: 'You\'re in bed doing tomorrow\'s schedule on your phone. Your partner asks if you\'re coming to sleep. You say "two minutes." It\'s been two minutes for three years.',
        with: 'You\'re in bed. Team Brain built tomorrow\'s schedule on Sunday. You\'re watching something dumb on TV with your partner. Your phone is charging in the other room.',
      },
    ],
  },
  // ── 5 NEW "YOUR DAY" VERSIONS ──
  {
    id: 'guests',
    tab: 'Your Guests',
    leftSub: 'Your Friday night.',
    rightSub: 'The one where 212 guests didn\u2019t need to wait for a menu.',
    tagline: 'They don\u2019t remember the food. They remember how it felt.',
    moments: [
      {
        time: '5:45 PM',
        without: 'A couple sits down. They wait four minutes before anyone drops menus. She\u2019s already checking Google for "restaurants near me" \u2014 again.',
        with: 'They sit, scan the QR code, and the AI Waiter opens a full interactive menu on her phone. She\u2019s browsing your appetizers before she\u2019s taken her coat off.',
      },
      {
        time: '6:20 PM',
        without: 'A table of six tourists from Lyon are squinting at your English-only menu. Three of them order the salmon because it\u2019s the only word they recognize. Average ticket: $61/head.',
        with: 'The AI Waiter detects their phone language and serves the entire menu in French. They order the short rib, the lamb shank, and the burrata. Average ticket: $94/head.',
      },
      {
        time: '7:10 PM',
        without: 'A woman at table 9 tells the server she has a tree nut allergy. The server says "I think the pesto is fine?" It isn\u2019t. The pesto has pine nuts. You find out when she\u2019s already eaten half of it.',
        with: 'She taps "tree nut allergy" once in the AI Waiter. Every dish with pine nuts, walnuts, almonds, or cashews vanishes from her menu entirely. She never sees the pesto. She orders the romesco chicken \u2014 which is safe \u2014 and loves it.',
      },
      {
        time: '8:00 PM',
        without: 'Table 14 finishes their mains. Nobody offers dessert because the server is drowning. They ask for the check. You just lost $46 in tiramisu and after-dinner drinks.',
        with: 'As they finish, the AI Waiter nudges: "Guests who enjoyed the osso buco also loved the affogato \u2014 espresso over vanilla gelato, $12." Two of four order it. One adds an Amaro. That\u2019s $38 you didn\u2019t chase.',
      },
      {
        time: '9:15 PM',
        without: 'A regular walks in. 11th visit. New server doesn\u2019t know him. Asks if he\u2019s been here before. He orders his usual, but only because he told the server what it was. He feels like a stranger in his favorite place.',
        with: 'Guest Brain recognizes him. The AI Waiter opens with: "Welcome back. Your usual Negroni and the pappardelle? Or try tonight\u2019s special \u2014 the wild boar rag\u00f9 pairs with the Barolo you liked in January." He taps "Yes."',
      },
      {
        time: '11:30 PM',
        without: 'You\u2019re home. Google alert: new 2-star review. "Food was good but service was scattered and they couldn\u2019t accommodate my allergy. Won\u2019t be back." You stare at the ceiling.',
        with: 'Guest Brain summary: "94% positive sentiment. 2 new guest profiles saved. No allergy incidents. Marcus is due for a birthday comp next week \u2014 suggested: complimentary old fashioned." You put your phone down.',
      },
    ],
  },
  {
    id: 'menu-money',
    tab: 'Your Menu',
    leftSub: 'Your Tuesday.',
    rightSub: 'The one where you found $4,100 hiding in your own menu.',
    tagline: 'The money was always there. You just couldn\u2019t see it.',
    moments: [
      {
        time: '7:30 AM',
        without: 'Produce delivery. Invoice says tomatoes at $3.10/lb. Was it $2.80 last week? You don\u2019t remember. You sign and move on.',
        with: 'You snap the invoice. Finance Brain flags it: "Heirloom tomatoes up 10.7% from last delivery. Affects 4 dishes. Your burrata salad food cost just went from 26% to 31%." You know before lunch.',
      },
      {
        time: '9:00 AM',
        without: 'You look at your menu. The rib-eye "sells well." The sea bass doesn\u2019t. You think about dropping the sea bass. Gut feeling.',
        with: 'Menu Arena shows the matrix. Rib-eye: Workhorse \u2014 everyone orders it, but 14% margin. Sea bass: Puzzle \u2014 hardly ordered, but 68% margin. You don\u2019t drop it. You move it to position two.',
      },
      {
        time: '11:15 AM',
        without: 'You priced the mushroom risotto at $19 two years ago. Arborio rice up 22%. Porcini up 40%. You\u2019re still charging $19. You\u2019re making $1.60 on a dish that takes 25 minutes to cook.',
        with: 'Menu Arena flagged it red: food cost 71%. You run a what-if: "$23." Similar dishes in your area average $24. At $23, food cost drops to 59%, monthly margin on that dish goes up $410. You change it before lunch.',
      },
      {
        time: '2:30 PM',
        without: 'Fish guy calls with halibut at "a great price." You say sure. You don\u2019t realize it\u2019s $1.20/lb more than the last vendor three weeks ago.',
        with: 'You snap the quote into Finance Brain. "Last halibut: $14.80/lb from Pacific Seafood. This quote: $16.00/lb. That\u2019s 8.1% higher." You negotiate. He comes down to $15.10. $27 saved on one order.',
      },
      {
        time: '6:00 PM',
        without: 'Your $36 smoked duck breast is your second most ordered dish. You feel good. You don\u2019t know the Amarena cherries in the gastrique put your actual food cost at 39%.',
        with: 'Menu Arena told you this morning. You tested a swap \u2014 house-made cherry compote. What-if showed food cost dropping to $10.60/plate. That\u2019s $64.80/day. $1,944/month. One ingredient.',
      },
      {
        time: '10:45 PM',
        without: 'You close. Revenue looks fine. $8,400. You feel okay but you know money is leaking somewhere. You\u2019ve been meaning to dig into it for three months. You pour a drink and tell yourself Sunday.',
        with: 'Finance Brain: food cost today 28.3%, down from 32.1% last month. The risotto re-price, the halibut negotiation, the duck swap \u2014 $4,100 in recovered monthly margin from decisions you made before noon. You pour a drink because you want to.',
      },
    ],
  },
  {
    id: 'kitchen',
    tab: 'Your Kitchen',
    leftSub: 'Your Saturday.',
    rightSub: 'The one where 188 covers ran and nobody shouted.',
    tagline: 'Your kitchen ran on information, not chaos.',
    moments: [
      {
        time: '10:30 AM',
        without: 'Prep is done. The printer is already acting up \u2014 jamming every fourth ticket. Your line cook hits it with his palm. It works. For now.',
        with: 'No printer. Orders from the AI Waiter land on the KDS screen the moment a guest taps "confirm." No paper. No ink. No jams. No palm strikes.',
      },
      {
        time: '5:50 PM',
        without: 'Six tickets print at once. One has a handwritten note: "ALLRGY \u2014 no dairy??" The actual allergy is eggs. The server\u2019s handwriting is terrible. The plate goes out with b\u00e9arnaise. The guest catches it. Barely.',
        with: 'The KDS shows the order exactly as the guest entered it: "Egg allergy." Bold red. Impossible to miss. The b\u00e9arnaise is flagged before the cook touches a pan. The dish goes out with chimichurri instead.',
      },
      {
        time: '7:00 PM',
        without: 'Table 22 ordered apps and mains together. The grill cook fires the rib-eye immediately. Apps haven\u2019t left the pass. The steak sits under heat for nine minutes. Goes out medium-well. They ordered medium-rare. Re-fire. $17 wasted.',
        with: 'The KDS holds the mains in queue. Apps move to "Ready." Only when apps clear does the KDS release main course tickets to grill. Rib-eye fires at the right time. Goes out medium-rare. No waste. No re-fire.',
      },
      {
        time: '8:15 PM',
        without: '14 active tables. Tickets piling up. Three fell on the floor behind the printer. One order lost entirely. Table 11 waits 35 minutes. "Did you forget about us?"',
        with: 'KDS Kanban: 6 in "New," 5 in "Preparing," 3 in "Ready." Nothing falls on the floor. Table 11\u2019s order visible with a timestamp. When it hits 18 minutes, the cook bumps it up. Goes out at 21.',
      },
      {
        time: '9:30 PM',
        without: 'Saut\u00e9 station is slammed. Grill is light. No way to see that from the pass. You shuffle cooks around too late. Three tables waited an extra 12 minutes.',
        with: 'KDS shows station load. Saut\u00e9: 9 items queued. Grill: 2. You reassign two flex items to saut\u00e9 and move the grill cook to support. Bottleneck clears in eight minutes.',
      },
      {
        time: '11:00 PM',
        without: '188 covers. Two remakes. One allergy near-miss. Four lost tickets. Your expo lost his voice. Kitchen ran on adrenaline and luck. Tomorrow you do it again and hope the printer holds.',
        with: '188 covers. Zero remakes. Zero allergy incidents. Zero lost orders. Expo didn\u2019t shout once. Average ticket time: 17 minutes. Tomorrow, you don\u2019t hope. You just open.',
      },
    ],
  },
  {
    id: 'greatest-hits',
    tab: 'All Together',
    leftSub: 'Your Wednesday.',
    rightSub: 'The one where every part of the restaurant was talking to every other part.',
    tagline: 'Your restaurant isn\u2019t just running. It\u2019s thinking.',
    moments: [
      {
        time: '8:00 AM',
        without: 'You open your laptop. Square, a spreadsheet, an inventory notebook. Three sources, three stories. 40 minutes trying to figure out if you made money last night.',
        with: 'Dashboard already has it. Yesterday: $6,230 across 94 covers. Top seller: pan-seared salmon (19 orders). Menu Arena flags the salmon as a Workhorse \u2014 food cost crept to 38% because your fishmonger raised prices. You see this before your first coffee.',
      },
      {
        time: '10:15 AM',
        without: 'Produce delivery. You sign the invoice and toss it in the folder with 40 others. You\u2019ll enter them at month-end. You always say that.',
        with: 'You snap the invoice. Finance Brain logs every line item. Flags the chanterelles: up 20%. "Your Wild Mushroom Tagliatelle food cost is now 41%." You know before lunch.',
      },
      {
        time: '12:30 PM',
        without: 'A woman with celiac asks what\u2019s gluten-free. The server says "I think the risotto is safe?" Nobody mentions the soy sauce in the glaze. She orders it. She\u2019s fine \u2014 the soy sauce happens to be tamari. But nobody actually knew that. It was luck.',
        with: 'She taps "celiac" in the AI Waiter. Anything with wheat, barley, or rye disappears. The risotto stays \u2014 because you built the recipe in BalaBite and it knows the tamari is gluten-free. It\u2019s not luck. It\u2019s data.',
      },
      {
        time: '6:45 PM',
        without: 'A four-top orders two apps, four mains. Server scribbles it, walks to the POS, punches it in, ticket prints. Elapsed time from order to kitchen: 3 minutes 40 seconds.',
        with: 'Guests tap their orders on the AI Waiter. Order hits the KDS in under 2 seconds. Kitchen sees apps queued before the guests put their phones down. Mains held until apps clear the pass.',
      },
      {
        time: '8:30 PM',
        without: 'A regular couple comes in for their anniversary. Host doesn\u2019t recognize them. Seated at a two-top by the kitchen. They order the same thing they always order. Nobody acknowledges they\u2019ve been here before. They don\u2019t come back next year.',
        with: 'Guest Brain flags them: 8th visit, last here Feb 14th, always orders the tasting menu, prefers the corner booth. AI Waiter: "Happy anniversary. This year\u2019s tasting menu has a new wagyu course \u2014 want to see it?" They tell their friends.',
      },
      {
        time: '10:30 PM',
        without: 'You close out. Revenue was good. Kitchen was hectic. Food costs? You\u2019ll check eventually. The invoices are in the folder. The menu hasn\u2019t changed in five months. You\u2019re running blind and hoping the math works.',
        with: 'Revenue: $7,810. Food cost today: 27.4%. KDS logged zero remakes, 16-min average ticket. The tagliatelle you repriced after this morning\u2019s chanterelle alert sold 11 times at 34% food cost instead of 41%. Your restaurant isn\u2019t just running. It\u2019s thinking.',
      },
    ],
  },
  {
    id: 'emotional',
    tab: 'Your Why',
    leftSub: 'Your Monday.',
    rightSub: 'The one where you remembered why you opened this place.',
    tagline: 'BalaBite didn\u2019t cook a single dish. It just gave you your restaurant back.',
    moments: [
      {
        time: '6:30 AM',
        without: 'Alarm goes off. You\u2019re already thinking about invoices, menu prices, the server who called in sick. You lie there six minutes doing math in your head. You can feel your chest tighten. This is how every Monday starts.',
        with: 'You open BalaBite with your coffee. Finance Brain processed Friday\u2019s invoices \u2014 you snapped them as they came in. Menu Arena shows weekend numbers: your Stars are holding, the burger you repositioned jumped 15% in orders. You know where you stand before you leave the house. The chest thing doesn\u2019t happen.',
      },
      {
        time: '11:00 AM',
        without: 'Olive oil is $6 more per case. You don\u2019t notice because you\u2019re on the phone with the linen company. That $6 is now silently eating the margin on every dish that touches a saut\u00e9 pan. It\u2019ll show up at month-end as a number you can\u2019t explain.',
        with: 'Your prep cook snaps the invoice. Finance Brain flags it: "Olive oil up $6/case (11.2%). Affects 14 dishes." You see the alert on your phone. You don\u2019t have to choose which problem to pay attention to. The system caught the one you couldn\u2019t.',
      },
      {
        time: '1:15 PM',
        without: 'A mother comes in with her 7-year-old son. Severe peanut allergy. She asks the server three times if the pad Thai is safe. Kitchen says yes. But someone subbed in peanut oil last week. She smells it and sends it back. This time. You can\u2019t sleep that night.',
        with: 'He scans the QR with her phone. She taps "peanut allergy." The pad Thai disappears \u2014 because when the kitchen subbed in peanut oil, the recipe was updated in BalaBite. The AI Waiter knows. He orders the chicken teriyaki bowl. He loves it. She doesn\u2019t have to ask three times.',
      },
      {
        time: '5:00 PM',
        without: 'You\u2019re at the pass before dinner. That familiar dread. You don\u2019t know if tonight is 60 covers or 120. You don\u2019t know if the rib-eye makes money. You opened this restaurant to cook food you believe in. Somewhere it became a guessing game you play six nights a week.',
        with: 'Dashboard shows 42 reservations plus typical walk-in projections. Food cost this week: 27.8%. Rib-eye: 31% food cost, $44 ticket contribution. Menu Arena shows it all. You know. You actually know. And knowing is the difference between dread and calm.',
      },
      {
        time: '8:45 PM',
        without: 'An older Italian couple comes in. They don\u2019t speak English well. Your server talks loudly and slowly. They point at things. They end up with two Caesar salads. They came for the handmade pappardelle and the braised lamb shoulder. They just couldn\u2019t read the menu.',
        with: 'The AI Waiter opens in Italian. They see everything \u2014 the pappardelle, the agnello brasato, the tiramisu. The gentleman tears up when he reads "ricetta della nonna." They stay two hours. They spend $127. They leave a handwritten note on the napkin. You translate it later: "This reminded us of home."',
      },
      {
        time: '11:15 PM',
        without: 'Restaurant\u2019s closed. You\u2019re sitting in the empty dining room with wine. You love this place. You built it with your hands. But most nights it feels like it\u2019s running you. You think about selling, maybe twice a month now. You don\u2019t tell anyone.',
        with: 'You\u2019re sitting in the empty dining room with wine. But tonight you\u2019re not staring at the wall. Invoices tracked. Menu optimized. Kitchen ran clean. A little boy with a peanut allergy ate safely tonight. An Italian couple found a piece of home. You didn\u2019t open this place to fight spreadsheets. You opened it for nights like this.',
      },
    ],
  },
  {
    id: 'money',
    tab: 'Your Money',
    leftSub: 'Your month-end.',
    rightSub: 'Your month-end, found.',
    tagline: 'The money was always there. You just couldn\u2019t see it.',
    moments: [
      {
        time: 'Monday 9 AM',
        without: 'You sit down with a shoebox of invoices and three spreadsheets. Your "food cost" is whatever number your chef mumbles. Last month: "around 30." It\'s been 34.2% for six months. You just didn\'t know.',
        with: 'Finance Brain scanned every invoice the day it arrived. Your Pulse card reads: "Food cost: 33.1%, up 1.4 pts. Top driver: salmon vendor raised price 18%. You didn\'t adjust menu price. Bleed so far: $2,340." One card. One problem. One number.',
      },
      {
        time: 'Monday 11 AM',
        without: 'You open your menu and try to figure out what\'s making money. The chicken parm "sells great." But you\'ve never calculated the margin. It sells 40/week at $19 with a $7.80 plate cost. Your $28 short rib sells 12/week at $6.40 cost. You\'re pushing the wrong dish.',
        with: 'Menu Brain has it mapped in Menu Arena. Chicken parm: "Workhorse" — high volume, low margin. Short rib: "Star" — strong margin, under-ordered. Suggestion: move short rib to position 2, test a $1 chicken parm bump. Projected impact: +$1,800/month.',
      },
      {
        time: 'Tuesday 2 PM',
        without: 'Produce invoice: $3,100. Last week: $2,850. Price change? Quantity error? You don\'t have time to check 47 line items. You sign it. You\'ve been signing invoices you don\'t understand for three years.',
        with: 'You snap a photo. Finance Brain parses every line and flags: "Roma tomatoes up 22% vs. last delivery — market moved 6%. Mozzarella: 40 lbs delivered, usage suggests 32 lbs needed." Two flags. $260 saved this week. $13,500 annualized — on one vendor.',
      },
      {
        time: 'Wednesday 6 PM',
        without: 'Dinner service. Your servers aren\'t upselling — they\'re surviving. Nobody mentions the wine pairing. Nobody suggests dessert. Average check: $42 for eight months straight. You\'ve accepted it as a ceiling.',
        with: 'AI Waiter handles the moments your staff can\'t. After entree selection: "Guests who ordered the lamb also loved the Côtes du Rhône — $14/glass." Before the check: a dessert suggestion. Average check this month: $47.60. Same menu. Same staff. +$5,040 you were leaving on the table.',
      },
      {
        time: 'Thursday 10 AM',
        without: 'A friend pays $1.80/lb less for the same chicken thighs, same distributor. You call your rep. He says your pricing is "competitive." You don\'t have the data to argue. You hang up and eat the margin.',
        with: 'Finance Brain cross-references your scanned invoices: "Chicken thigh cost 12% above pattern for your volume." You forward the data to your rep. He calls back with a new price. $0.90/lb saved. $4,200/year on one protein.',
      },
      {
        time: 'Friday midnight',
        without: 'You pull up the weekly POS report. Revenue: $38K. Looks okay. But actual profit? You\'ll know in two months when your accountant sends the P&L. By then it\'s history. You can\'t fix history.',
        with: 'Finance Brain closes the week: "Revenue $38,400. COGS 31.0%. Labor 29.0%. Gross profit $15,350 — up $1,200 vs last week. Biggest win: menu repositioning. Biggest risk: weekend overtime pushed labor 1.2 pts." You know where you stand. Every week. Not every quarter.',
      },
    ],
  },
  {
    id: 'life',
    tab: 'Your Life',
    leftSub: 'Your week.',
    rightSub: 'Your week back.',
    tagline: 'You didn\u2019t open a restaurant to miss your life.',
    moments: [
      {
        time: 'Monday 6 AM',
        without: 'Your alarm goes off. 14 texts overnight — cooler alarm, two callouts, a shorted fish order. You\'re solving problems from the passenger seat while your partner drives the kids to school. You said you\'d stop doing this. That was six months ago.',
        with: 'Pulse hits at 6:30 with three cards. "Cooler resolved — auto-reset at 2 AM, holding at 36\u00b0F. Miguel confirmed for Carlos\'s shift. Fish order short: alternate vendor quote attached, approve Y/N?" You tap Y over coffee and drive the kids yourself.',
      },
      {
        time: 'Wednesday 2 PM',
        without: 'You\'re doing "admin." Which means: fixing the schedule, arguing with the linen company, re-counting inventory, answering the phone because the host called out. You haven\'t worked ON the business in months. You\'re a $150K/year line cook slash HR clerk.',
        with: 'Schedule was done Monday. Finance Brain reconciled inventory. Voice Brain handled 11 calls today. You spent Wednesday afternoon reviewing Menu Arena\'s pricing scenarios for your spring menu. You made three decisions worth more than your linen bill costs all year.',
      },
      {
        time: 'Thursday 7 PM',
        without: 'Dinner rush. You\'re expo, server, busser, host — whatever hole needs filling. You eat a handful of fries at 9:30. That\'s dinner. Your partner texted at 6 asking if you\'d be home before 11. You haven\'t responded because you already know the answer.',
        with: 'You\'re on the floor because you chose to be. Not filling holes — greeting regulars, coaching the new server. Kitchen Brain feeds the KDS, tickets are flowing. Guest Brain pings: "Table 7 — second visit, loved the tasting menu." You stop by their table. You text your partner at 8: "Home by 10:30."',
      },
      {
        time: 'Friday 11 PM',
        without: 'Closing. Drawer is $66 off. Theft? Miscounts? Comps not rung in? You write it in the same notebook you\'ve been writing discrepancies in for two years. Nobody has ever looked at that notebook, including you.',
        with: 'Finance Brain reconciles automatically. POS: $4,812. Cash count confirmed with photo. Variance: $66. "3 comps totaling $58 applied without manager override. Remaining $8 within tolerance." Mystery solved. Pattern tracked.',
      },
      {
        time: 'Saturday 4 PM',
        without: 'Your daughter\'s recital is at 5. You promised. But the prep cook is behind, the bartender texted "running late," and you haven\'t approved orders. You call your partner: "I\'m going to try to make it." You both know what that means. She doesn\'t say anything. Which is worse.',
        with: 'Kitchen Brain sent the prep timeline Monday. It\'s on track. Team Brain staged a backup bartender — confirmed at 3:30. Finance Brain auto-approved the standing orders. You leave at 4:15. Third row, phone on silent, by 4:50. She sees you. She waves. That\'s the whole point of all of this.',
      },
      {
        time: 'Sunday',
        without: 'You go in "just to check." Seven hours later: payroll, a leaking faucet, a no-show interview, prepping Monday\'s special yourself. You drive home at 6. Your week starts again tomorrow. You can\'t remember your last full day off. You love this business. You\'re not sure it loves you back.',
        with: 'Pulse sends your Sunday summary at 9 AM: "Revenue $41,200 (+4%). Labor 28.8%. Food cost down 0.9 pts. 3 action items for Monday. No critical flags. Enjoy your Sunday." You read it on the patio. You do not go in. You take your kids to the park. You grill in the backyard. You go to bed without setting an alarm.',
      },
    ],
  },
];

// Tab order: emotional hook first, then broad, then specific, then life
const tabOrder = ['emotional', 'shift', 'guests', 'menu-money', 'kitchen', 'greatest-hits', 'money', 'life'];
const angles = tabOrder.map(id => anglesUnsorted.find(a => a.id === id)!);

export default function TheSplit() {
  const splitRef = useRef<HTMLDivElement>(null);
  const [activeAngle, setActiveAngle] = useState(0);
  const [dividerPos, setDividerPos] = useState(50);
  const isDragging = useRef(false);
  const angle = angles[activeAngle];

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging.current || !splitRef.current) return;
    const rect = splitRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setDividerPos(Math.max(20, Math.min(80, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onUp = () => { isDragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handleMove]);

  return (
    <section className="relative bg-cream-100 py-20 md:py-28">
      {/* Heading */}
      <motion.div
        className="text-center mb-8 md:mb-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-900">
          Same restaurant. Same day.
        </h2>
      </motion.div>

      {/* Angle tabs */}
      <div className="flex justify-center gap-2 mb-8 md:mb-12 px-6">
        {angles.map((a, i) => (
          <button
            key={a.id}
            onClick={() => { setActiveAngle(i); setDividerPos(50); }}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              i === activeAngle
                ? 'bg-primary-900 text-cream-100'
                : 'bg-cream-200/60 text-cream-600 hover:bg-cream-200 hover:text-cream-800'
            }`}
          >
            {a.tab}
          </button>
        ))}
      </div>

      {/* Split container */}
      <motion.div
        className="relative mx-auto max-w-[92rem] px-3 sm:px-4"
        layout
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={angle.id}
            ref={splitRef}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, layout: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }}
            className="relative rounded-2xl overflow-hidden shadow-xl border border-cream-200/50 select-none"
          >
            {/* ── LEFT LAYER: WITHOUT — uses grid, content in col 1 only ── */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - dividerPos}% 0 0)` }}
            >
              <div className="grid grid-cols-2 h-full">
                <div className="bg-[#1a1a2e] text-white/90 p-6 sm:p-8 md:p-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-red-400/80">Without</span>
                  <p className="text-sm text-white/40 italic mt-1 mb-6">{angle.leftSub}</p>
                  <div className="space-y-5">
                    {angle.moments.map((m) => (
                      <div key={`wo-${m.time}`} className="flex gap-4">
                        <span className="text-[11px] font-mono text-red-400/60 whitespace-nowrap pt-0.5 min-w-[5.5rem] shrink-0">
                          {m.time}
                        </span>
                        <p className="text-[13px] leading-relaxed text-white/70">{m.without}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-[#1a1a2e]" />
              </div>
            </div>

            {/* ── RIGHT LAYER: WITH BALABITE — uses grid, content in col 2 only ── */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 0 0 ${dividerPos}%)` }}
            >
              <div className="grid grid-cols-2 h-full">
                <div className="bg-[#FDF8F0]" />
                <div className="bg-[#FDF8F0] p-6 sm:p-8 md:p-10">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-green-600/80">With BalaBite</span>
                  <p className="text-sm text-cream-500 italic mt-1 mb-6">{angle.rightSub}</p>
                  <div className="space-y-5">
                    {angle.moments.map((m) => (
                      <div key={`wi-${m.time}`} className="flex gap-4">
                        <span className="text-[11px] font-mono text-green-600/50 whitespace-nowrap pt-0.5 min-w-[5.5rem] shrink-0">
                          {m.time}
                        </span>
                        <p className="text-[13px] leading-relaxed text-cream-700">{m.with}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── DRAGGABLE DIVIDER ── */}
            <div
              className="absolute top-0 bottom-0 z-10 flex items-center"
              style={{ left: `${dividerPos}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute inset-y-0 w-px bg-white/30" />
              <div
                className="relative w-10 h-10 rounded-full bg-white shadow-lg border border-cream-300 flex items-center justify-center cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                onMouseDown={() => { isDragging.current = true; }}
                onTouchStart={() => { isDragging.current = true; }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-cream-500">
                  <path d="M5 3L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8 3L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M11 3L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Invisible sizer — gives the container height from the current tab's longest side */}
            <div className="invisible grid grid-cols-2" aria-hidden>
              <div className="p-6 sm:p-8 md:p-10">
                <div className="mb-8" />
                <div className="space-y-5">
                  {angle.moments.map((m) => (
                    <div key={`szl-${m.time}`} className="flex gap-4">
                      <span className="min-w-[5.5rem] shrink-0 text-[11px]">{m.time}</span>
                      <p className="text-[13px] leading-relaxed">{m.without}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6 sm:p-8 md:p-10">
                <div className="mb-8" />
                <div className="space-y-5">
                  {angle.moments.map((m) => (
                    <div key={`szr-${m.time}`} className="flex gap-4">
                      <span className="min-w-[5.5rem] shrink-0 text-[11px]">{m.time}</span>
                      <p className="text-[13px] leading-relaxed">{m.with}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Tagline */}
      <AnimatePresence mode="wait">
        <motion.p
          key={angle.id}
          className="text-center mt-10 md:mt-14 text-lg sm:text-xl text-cream-600 px-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {angle.tagline}
        </motion.p>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <button
          onClick={() => document.getElementById('final-cta')?.scrollIntoView({ behavior: 'smooth' })}
          className="rounded-full bg-primary-900 px-8 py-3.5 text-sm font-semibold text-cream-100 transition-all hover:bg-primary-800 active:scale-[0.97]"
        >
          Put AI to Work
        </button>
      </motion.div>
    </section>
  );
}
