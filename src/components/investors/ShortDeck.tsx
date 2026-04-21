'use client';

import { useEffect, useRef, useState } from 'react';
import { Cite } from './Cite';

// ————————————————————————————————————————————————————————————
// ShortDeck — 11-slide scroll-snap pre-seed memo
//
// Philosophy: skimmable in 4 minutes (the 2026 avg investor attention
// budget per deck). One idea per slide. Earn the next scroll.
//
// Format: vertical scroll-snap web deck with keyboard nav + print
// stylesheet for clean PDF export via Cmd+P.
// ————————————————————————————————————————————————————————————

const TOTAL_SLIDES = 11;

export function ShortDeck() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(1);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);

  // Lightbox ESC handler
  useEffect(() => {
    if (!lightboxSrc) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxSrc(null);
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [lightboxSrc]);

  // Keyboard navigation: ↓ / Space / PageDown → next; ↑ / PageUp → prev
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const scrollToSlide = (n: number) => {
      const idx = Math.max(1, Math.min(TOTAL_SLIDES, n));
      const target = c.querySelector(`[data-slide="${idx}"]`);
      if (target instanceof HTMLElement) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const onKey = (e: KeyboardEvent) => {
      // Don't hijack keys when lightbox is open
      if (lightboxSrc) return;
      if (['ArrowDown', 'PageDown', ' ', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
        scrollToSlide(active + 1);
      } else if (['ArrowUp', 'PageUp', 'ArrowLeft'].includes(e.key)) {
        e.preventDefault();
        scrollToSlide(active - 1);
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSlide(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSlide(TOTAL_SLIDES);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  // Track which slide is in view for the progress indicator
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    const slides = c.querySelectorAll('[data-slide]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const n = Number((entry.target as HTMLElement).dataset.slide);
            if (n) setActive(n);
          }
        });
      },
      { root: c, threshold: [0.5] }
    );
    slides.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="short-deck-root">
      <ProgressIndicator current={active} total={TOTAL_SLIDES} />
      <NavHelper />

      <div className="short-deck-container" ref={containerRef}>
        {/* ————————————— 01. TITLE ————————————— */}
        <Slide n={1}>
          <div className="short-slide-center">
            <Eyebrow>BalaBite &middot; Pre-seed memo &middot; April 2026</Eyebrow>

            <h1 className="short-slide1-pain">
              Too many fires.<br />
              Too many fixes.<br />
              Can&rsquo;t get to them.
            </h1>

            <p className="short-slide1-insight">
              <i>The role outgrew the human.</i>
            </p>

            <p className="short-slide1-answer">
              BalaBite is the partner that{' '}
              <span className="amber">owns the rest</span>.
            </p>

            <Footer>
              AI business partner for independent restaurants &middot; Live since February
            </Footer>
          </div>
        </Slide>

        {/* ————————————— 02. PROBLEM ————————————— */}
        <Slide n={2}>
          <div>
            <Eyebrow>01 &middot; The problem</Eyebrow>
            <H1>
              Why the role <i>broke.</i>
            </H1>

            {/* Block 1: the role, then and now */}
            <Body>
              Running a restaurant used to mean the kitchen and the cash drawer.
            </Body>
            <Body>
              Now it&rsquo;s that plus reviews, delivery at 30%, marketing, tech,
              compliance, vendor wars &mdash; and a dozen more.
            </Body>
            <Body>
              <strong>The role grew. Nobody opens a restaurant for any of this.</strong>
            </Body>

            {/* Block 2: the math — 2.8% reveal with integration-layer punch */}
            <Body>
              A typical independent restaurant grosses $1M&ndash;$2M a year. On{' '}
              <Cite
                source="NRA Operational Realities, 2025"
                url="https://restaurant.org/research-and-media/media/press-releases/new-resource-from-national-restaurant-association-provides-insights-into-operational-realities/"
                claim="Median full-service restaurant pre-tax income: 2.8% of sales."
              >
                2.8% pre-tax margin
              </Cite>
              , that&rsquo;s <strong>$28K&ndash;$56K</strong> in profit. Defended across a
              dozen+ software tools that don&rsquo;t fully talk to each other.
            </Body>
            <Body>
              <strong>
                The owner is the only integration layer. Alone.
              </strong>
            </Body>

            {/* Block 3: the structural break */}
            <Body>
              <strong>
                And the math doesn&rsquo;t pay for the team that would carry the rest.
              </strong>
            </Body>
          </div>
        </Slide>

        {/* ————————————— 03. SOLUTION ————————————— */}
        <Slide n={3}>
          <div>
            <Eyebrow>02 &middot; The solution</Eyebrow>
            <H1>
              BalaBite runs <i>the rest.</i>
            </H1>

            <div className="short-pair-stack">
              <Pair
                pain="The bok choy you ordered that never showed."
                action="Reordered it before Friday&rsquo;s delivery."
              />
              <Pair
                pain="The hurricane Wednesday."
                action="Pushed a delivery promo before the storm killed dine-in."
              />
              <Pair
                pain="The new coffee spot two doors down."
                action="Benchmarked their pricing. Flagged your slipping morning regulars."
              />
              <Pair
                pain="The catering inquiry sitting in your inbox since Monday."
                action="Drafted the quote. Held the date."
              />
              <Pair
                pain="The whiteboard you haven&rsquo;t touched in months."
                action="Shipped three items off it."
              />
              <Pair
                pain="Prime cost drifting 58% &rarr; 63%."
                action="Found the leak &mdash; the fish supplier."
              />
            </div>

            <div className="short-exhale">While you slept.</div>

            <div className="short-moat-line">
              <p>Your POS&rsquo;s AI is every competitor&rsquo;s AI.</p>
              <p className="short-moat-punch">
                BalaBite is <strong>yours alone</strong>.
              </p>
            </div>
          </div>
        </Slide>

        {/* ————————————— 04. HOW IT SEES ————————————— */}
        <Slide n={4}>
          <div>
            <Eyebrow>03 &middot; How it sees</Eyebrow>
            <H1 size="md">
              The real work happens <i>outside the software.</i>
            </H1>

            <Body>
              <strong>BalaBite sits wherever the real work happens.</strong>{' '}
              And you can show it anything.
            </Body>

            <div className="short-how-list">
              <div className="short-how-line">
                <strong>Anything you hand it</strong> &mdash; screenshots,
                photos of the broken ice machine, voice memos from the
                line, the text from your produce guy.
              </div>
              <div className="short-how-line">
                <strong>Your staff WhatsApp</strong> &mdash; 86s,
                callouts, prep decisions in real time.
              </div>
              <div className="short-how-line">
                <strong>Your whiteboard</strong> &mdash; the tasks
                you&rsquo;ve been meaning to ship for months.
              </div>
              <div className="short-how-line">
                <strong>Your inbox</strong> &mdash; the catering from
                Monday, the vendor quote you haven&rsquo;t opened, the
                DM you forgot to reply to.
              </div>
              <div className="short-how-line short-how-line-muted">
                <strong>Your POS, payroll, invoices, reviews</strong>{' '}
                &mdash; the usual data plane.
              </div>
            </div>

            <div className="short-how-vignette">
              <div className="short-how-timestamp">
                8:47pm &middot; Staff chat
              </div>
              <div className="short-how-chat-bubble">86 salmon</div>
              <p className="short-how-vignette-body">
                By 8:48 BalaBite has it off the POS, off the online
                menus, and on tomorrow&rsquo;s prep sheet.
              </p>
              <p className="short-how-vignette-punch">
                The server at table 6 never has to apologize.
              </p>
              <div className="short-how-vignette-scale-row">
                Catches like this &mdash; every service, every day.
              </div>
            </div>

            <p className="short-how-humility">
              <em>Sometimes it asks. Mostly it acts.</em>
            </p>

            <div className="short-how-moat">
              <p>Their AI lives <i>inside the software.</i></p>
              <p className="short-how-moat-punch">
                Ours lives in <strong>your restaurant.</strong>
              </p>
            </div>
          </div>
        </Slide>

        {/* ————————————— 05. PRODUCT ————————————— */}
        <Slide n={5}>
          <div>
            <Eyebrow>04 &middot; The product</Eyebrow>
            <H1 size="md">
              This is what lives in <i>your restaurant.</i>
            </H1>
            <p className="short-product-subhead">
              The Partner you just read about &mdash; already built, already running.
            </p>

            <div className="short-product-triptych">
              <div className="short-product-panel short-product-panel-hero">
                <div className="short-product-label">The Pulse</div>
                <button
                  type="button"
                  className="short-product-img-btn"
                  onClick={() => setLightboxSrc('/investors/pulse-hero.png')}
                  aria-label="Enlarge The Pulse screenshot"
                >
                  <img
                    src="/investors/pulse-hero.png"
                    alt="BalaBite Pulse: morning briefing with health score, six domain-brain scores, narrative, and a reprice decision waiting for approval."
                    className="short-product-panel-img"
                  />
                  <span className="short-product-img-hint" aria-hidden>Click to enlarge</span>
                </button>
                <p className="short-product-panel-caption">
                  The day, at a glance.
                </p>
              </div>
              <div className="short-product-supporting">
                <div className="short-product-panel">
                  <div className="short-product-label">Running in background</div>
                  <button
                    type="button"
                    className="short-product-img-btn"
                    onClick={() => setLightboxSrc('/investors/pulse-background.png')}
                    aria-label="Enlarge background workflows screenshot"
                  >
                    <img
                      src="/investors/pulse-background.png"
                      alt="BalaBite running in the background: six active workflows, five queued, with tasks like cost data entry, server pairing, menu descriptions, and re-engagement emails."
                      className="short-product-panel-img"
                    />
                    <span className="short-product-img-hint" aria-hidden>Click to enlarge</span>
                  </button>
                  <p className="short-product-panel-caption">The Partner doesn&rsquo;t sleep.</p>
                </div>
                <div className="short-product-panel">
                  <div className="short-product-label">This week&rsquo;s record</div>
                  <button
                    type="button"
                    className="short-product-img-btn"
                    onClick={() => setLightboxSrc('/investors/pulse-record.png')}
                    aria-label="Enlarge weekly record screenshot"
                  >
                    <img
                      src="/investors/pulse-record.png"
                      alt="BalaBite's weekly record: what worked, still working on, didn't land (happy hour reverted), and what's on the horizon."
                      className="short-product-panel-img"
                    />
                    <span className="short-product-img-hint" aria-hidden>Click to enlarge</span>
                  </button>
                  <p className="short-product-panel-caption">What worked. What didn&rsquo;t.</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* ————————————— 06. TRACTION ————————————— */}
        <Slide n={6}>
          <div>
            <Eyebrow>05 &middot; Already live</Eyebrow>
            <H1 size="md">
              Built in. <i>Every day.</i>
            </H1>
            <p className="short-traction-subhead">
              The engineer reading the Pulse is the engineer shipping it.
              One Miami independent. Live since February 2026.
            </p>

            <Body>
              BalaBite runs on real data &mdash; a live Square POS, the full
              menu, 3+ years of orders and guests going back to 2022. Not
              staging. Not synthetic.
            </Body>
            <Body>
              Every catch, every failure, every reprice &mdash; back into the
              product the same day.
            </Body>
            <Body>
              <strong>Not a vendor they installed. A partner they built in.</strong>
            </Body>

            <div className="short-traction-forward">
              <span className="short-traction-forward-label">Next</span>
              Five more Miami independents through Q3 2026.
            </div>
          </div>
        </Slide>

        {/* ————————————— 07. COMPETITION ————————————— */}
        <Slide n={7}>
          <div>
            <Eyebrow>06 &middot; How we differ</Eyebrow>
            <h1 className="short-h1 short-comp-h1 serif">
              They ship one AI to thousands.<br />
              <i>We build in for one.</i>
            </h1>
            <p className="short-comp-subhead">
              Every Toast restaurant gets the same Toast IQ. Every Square seller
              gets the same Square AI. Same intelligence, same playbook, for
              your competitor next door.
            </p>

            <div className="short-comp-grid">
              <div className="short-comp-grid-header">
                <span className="short-comp-row-name">Competitor</span>
                <span className="short-comp-row-detail">AI product &amp; scale</span>
                <span className="short-comp-row-adj">Other stuff they sell</span>
              </div>
              <CompRowNew name="Toast IQ" detail="164K+ locations · conversational AI inside Toast POS" adj={8} />
              <CompRowNew name="Square" detail="Millions of sellers · Managerbot AI agent · restaurant vertical 16% YoY" adj={7} />
              <CompRowNew name="Tabit" detail="45% Israel share · Miami US HQ · BI + reporting AI" adj={5} />
              <CompRowNew name="Owner.com" detail="$1B valuation, 10K+ restaurants · marketing + ordering AI" adj={4} />
              <CompRowNew name="Nory" detail="$63M raised, US HQ Mar 2026 · labor/ops AI for chains" adj={1} />
              <CompRowNew name="Zavo (YC F25)" detail="400+ merchants · AI-POS bundle, locked stack" adj={2} />
              <CompRowNew name="Restoke.ai" detail="10K+ users · 9 POS integrations · BOH AI copilot" adj={1} />
              <CompRowNew name="BalaBite" detail="One subscription. Everything included. Nothing else to sell." adj={0} ours />
            </div>

            <div className="short-comp-moat">
              <div className="short-comp-moat-row">
                <div className="short-comp-moat-label">Aligned</div>
                <div className="short-comp-moat-body">
                  No POS, payments, loyalty, or delivery to defend.
                  Toast can&rsquo;t tell you to switch off Toast.
                  Square can&rsquo;t suggest shopping processors. <strong>We can.</strong>
                </div>
              </div>

              <div className="short-comp-moat-row">
                <div className="short-comp-moat-label">Yours alone</div>
                <div className="short-comp-moat-body">
                  Built for your restaurant. <strong>Not your competitor&rsquo;s.</strong>
                </div>
              </div>

              <div className="short-comp-moat-row">
                <div className="short-comp-moat-label">Built by an owner</div>
                <div className="short-comp-moat-body">
                  When the Pulse misses something, the person who fixes it
                  is the person who reads it. <strong>Same day.</strong>
                </div>
              </div>
            </div>

            <p className="short-comp-dovi">
              Toast has a POS to defend. Nory has a narrow lane.
              We have a restaurant to serve.
              <br />
              <span className="short-comp-dovi-punch">
                That&rsquo;s not a product decision &mdash; it&rsquo;s an identity.
              </span>
            </p>

            <p className="short-comp-closer">
              One AI fits all.{' '}
              Or <strong>a partner for each.</strong>
            </p>
          </div>
        </Slide>

        {/* ————————————— 08. BUSINESS MODEL ————————————— */}
        <Slide n={8}>
          <div>
            <Eyebrow>07 &middot; Business model</Eyebrow>
            <H1 size="md">
              <span className="amber">1%</span> of the restaurant.<br />
              <i>Partner economics &mdash; not software pricing.</i>
            </H1>
            <p className="short-pricing-frame">
              $299/mo floor, then 1% of sales &mdash; collected through POS
              integration on day one, so the number moves with theirs.{' '}
              <em>When they grow, we grow.</em>
            </p>
            <p className="short-pricing-frame short-pricing-frame-b">
              <strong>They&rsquo;re already spending it.</strong> Independents
              pay{' '}
              <Cite
                source="Restaurant365, Toast, 7shifts, Resy, Popmenu — published 2026 pricing"
                url="https://www.restaurant365.com/pricing/"
                claim="A well-equipped indie stack: POS $70–$165 + scheduling $40–$100 + Restaurant365 $499 + reservations $199–$375 + marketing $129–$199 + loyalty $25–$99 + payroll $80–$150 ≈ $1,040–$1,580/mo before delivery aggregators, gift-card, or add-ons."
              >
                <strong>$1,000&ndash;$2,500/mo</strong>
              </Cite>{' '}
              for fragmented tools they only half-use &mdash; the{' '}
              <em>shelfware tax.</em> BalaBite consolidates enough of them to
              be a net budget reduction &mdash; and shows up every morning so
              it can&rsquo;t be ignored.
            </p>

            <div className="short-scale-ladder">
              <ScaleRung restaurants="15 restaurants" arr="$150K ARR" label="the proof — end of this round" />
              <ScaleRung restaurants="150 restaurants" arr="$1.5M ARR" label="the Series A story" />
              <ScaleRung restaurants="1,500 restaurants" arr="$15M ARR" label="the Series B — still <0.3% of US TAM" />
              <ScaleRung
                restaurants="10,000 restaurants"
                arr="$100M ARR"
                label="2% of US independent-restaurant market — the horizon"
                highlight
              />
            </div>

            <div className="short-pricing-econ">
              <div className="short-pricing-econ-item">
                <div className="short-pricing-econ-num serif">70<span className="short-pricing-econ-unit">%</span></div>
                <div className="short-pricing-econ-label">Revenue left after direct costs</div>
                <div className="short-pricing-econ-sub">Blended steady-state &middot; Year 1 ~50% during founder onboarding</div>
              </div>
              <div className="short-pricing-econ-item">
                <div className="short-pricing-econ-num serif">5.1<span className="short-pricing-econ-unit">mo</span></div>
                <div className="short-pricing-econ-label">To recover acquisition spend</div>
                <div className="short-pricing-econ-sub">Founder-led at $3K CAC &middot; drops to ~2mo at $1K scale CAC</div>
              </div>
              <div className="short-pricing-econ-item">
                <div className="short-pricing-econ-num serif">4.7<span className="short-pricing-econ-unit">×</span></div>
                <div className="short-pricing-econ-label">Lifetime return per $1 spent on sales</div>
                <div className="short-pricing-econ-sub">24-mo retention (restaurant SaaS: 18&ndash;36mo) &middot; scales to 14×</div>
              </div>
            </div>

            <p className="short-pricing-tailwind">
              AI is our biggest cost &mdash; and our biggest moat. We buy{' '}
              <Cite
                source="OpenAI & Anthropic pricing pages (2023–2026); Epoch AI inference-cost analysis"
                url="https://openai.com/api/pricing/"
                claim="GPT-4 (Mar 2023) $30/$60 per MTok → GPT-4o (May 2024) $5/$15 = 83% cheaper input in 14 months. Claude 3 Opus ($15) → Sonnet 4.6 ($3) = 80% cheaper for better capability. Epoch AI: inference cost per equal-capability falls ~10× per year."
              >
                <span className="amber-deep">frontier capability at frontier prices</span>
              </Cite>{' '}
              &mdash; and sell it back as partner economics.
            </p>
          </div>
        </Slide>

        {/* ————————————— 09. TEAM ————————————— */}
        <Slide n={9}>
          <div>
            <Eyebrow>08 &middot; Why me</Eyebrow>
            <H1 size="md">
              I&rsquo;m both the engineer and the operator.<br />
              <i>That&rsquo;s rare.</i>
            </H1>
            <div className="short-bio-split">
              <div>
                <div className="short-bio-split-label">Engineer</div>
                <div className="short-bio-line">Unit 8200 signals intelligence</div>
                <div className="short-bio-line">Early data engineer at QuadPay (acquired by Zip, 2020)</div>
                <div className="short-bio-line">CTO of a 20-location healthcare group</div>
              </div>
              <div>
                <div className="short-bio-split-label">Operator</div>
                <div className="short-bio-line">Washed dishes at 16</div>
                <div className="short-bio-line highlight">Embedded partner at a Miami independent since Jan 2026</div>
                <div className="short-bio-line">Kitchen · POS · vendors · payroll. Not a visit &mdash; a job.</div>
              </div>
            </div>
            <div className="short-bio-proof">
              <div className="short-bio-proof-eyebrow">~100 days embedded</div>
              <div className="short-bio-proof-row">
                <div className="short-bio-proof-label">The deal</div>
                <div className="short-bio-proof-body">
                  Toast &rarr; Square migration:{' '}
                  <strong>~$1,000/mo</strong> recurring saved (processing +
                  iPad menus + software consolidation) &middot;{' '}
                  <strong>~$8K</strong> off a merchant cash advance (22% &rarr;
                  15% fee) &middot; new hardware included
                </div>
              </div>
              <div className="short-bio-proof-row">
                <div className="short-bio-proof-label">Built from scratch</div>
                <div className="short-bio-proof-body">
                  <strong>In-house procedures + tips software shipped</strong>{' '}
                  &middot; Inventory built &middot; Recipes documented &middot;
                  Food photography upgraded
                </div>
              </div>
              <div className="short-bio-proof-closer">
                <em>The partner, before the product shipped.</em>
              </div>
            </div>
            <Body>
              <strong>Why I noticed.</strong> I&rsquo;ve been the engineer watching
              operators drown in decisions, and the operator watching software fail to
              help. BalaBite is the thing I needed on both sides.
            </Body>
            <Body>
              <em>If BalaBite were taken from me tomorrow, I&rsquo;d be back in
              the kitchen on Monday with a notebook, building it again.</em>
            </Body>
            <div className="short-bio-attribution">&mdash; Lior Brik, founder</div>
          </div>
        </Slide>

        {/* ————————————— 10. RISKS / WHAT WE'RE NOT ————————————— */}
        <Slide n={10}>
          <div>
            <Eyebrow>09 &middot; Honest constraints + real risks</Eyebrow>
            <H1 size="md">
              What we&rsquo;re <i>not.</i>
            </H1>
            <div className="short-notlist">
              <NotRow
                label="Not a POS"
                body="Toast, Square, and Tabit own the counter. We connect to theirs &mdash; strategically."
              />
              <NotRow
                label="Not chasing chains"
                body="Independents first. That&rsquo;s where the partnership fit is tightest."
              />
              <NotRow
                label="Not cheap"
                body="1% of sales, $299 floor &mdash; because the Partner replaces owner thinking, not a spreadsheet."
              />
            </div>

            <div className="short-risks-header">
              Risks we&rsquo;re actually watching.
            </div>
            <div className="short-riskslist">
              <RiskRow
                label="Trust risk"
                body="One bad recommendation destroys trust."
                mitigation="Guardrails, measured outcomes, and the Partner saying &lsquo;I&rsquo;m not sure&rsquo; when it isn&rsquo;t."
              />
              <RiskRow
                label="Incumbent risk"
                body="Toast IQ is improving fast."
                mitigation="Toast can&rsquo;t switch Toast off. Square can&rsquo;t suggest other processors. We can."
              />
              <RiskRow
                label="Adoption risk"
                body="Restaurants are slow to try new software."
                mitigation="Founder embedded at a working indie since Jan 2026 &mdash; reference ready, 2-week shadow deploy."
              />
            </div>
          </div>
        </Slide>

        {/* ————————————— 11. ASK ————————————— */}
        <Slide n={11}>
          <div className="short-ask-wrap">
            <Eyebrow>10 &middot; The ask</Eyebrow>

            <div className="short-ask-hero">
              <div className="short-ask-hero-num serif">
                <span className="amber">$1M</span>{' '}
                <span className="short-ask-hero-word">pre-seed</span>
              </div>
            </div>

            <div className="short-ask-grid">
              <AskCell num="18 mo" label="runway" />
              <AskCell num="10–15" label="paying Miami restaurants" />
              <AskCell num="~$150K" label="ARR target" />
            </div>

            <div className="short-ask-funds">
              <div className="short-ask-funds-label">What it buys</div>
              <div className="short-ask-funds-body">
                Senior engineering contractor &middot; founding generalist
                &middot; GTM budget to grow from our embedded foothold to the
                first ten to fifteen restaurants.
              </div>
            </div>

            <div className="short-ask-closer">
              Seed raised against <em>momentum</em>, not runway.
            </div>

            <div className="short-cta-row">
              <a href="mailto:lior@balabite.ai" className="short-cta-primary">
                Book a call with Lior &rarr;
              </a>
            </div>
          </div>
        </Slide>
      </div>

      {lightboxSrc && (
        <div
          className="short-lightbox"
          role="dialog"
          aria-label="Enlarged image"
          onClick={() => setLightboxSrc(null)}
        >
          <button
            type="button"
            className="short-lightbox-close"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxSrc(null);
            }}
            aria-label="Close"
          >
            &times;
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="short-lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="short-lightbox-hint" aria-hidden>
            Click outside or press <kbd>ESC</kbd> to close
          </div>
        </div>
      )}
    </div>
  );
}

// ————————————————————————————————————————————————————————————
// Helper components
// ————————————————————————————————————————————————————————————

function Slide({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <div className="short-slide" data-slide={n} role="region" aria-label={`Slide ${n} of ${TOTAL_SLIDES}`}>
      <div className="short-slide-inner">{children}</div>
    </div>
  );
}

function ProgressIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="short-progress" aria-hidden>
      <span className="short-progress-current">{String(current).padStart(2, '0')}</span>
      <span className="short-progress-sep">/</span>
      <span className="short-progress-total">{String(total).padStart(2, '0')}</span>
    </div>
  );
}

function NavHelper() {
  return (
    <div className="short-navhelper" aria-hidden>
      <span>↑ ↓ &middot; space &middot; scroll</span>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="short-eyebrow">{children}</div>;
}

function H1({
  children,
  size = 'lg',
}: {
  children: React.ReactNode;
  size?: 'md' | 'lg' | 'xl';
}) {
  return <h1 className={`short-h1 short-h1-${size} serif`}>{children}</h1>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <p className="short-body">{children}</p>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return <div className="short-footer">{children}</div>;
}

function Beat({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="short-beat">
      <div className="short-beat-num serif">{num}</div>
      <div className="short-beat-title serif">{title}</div>
      <div className="short-beat-body">{body}</div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="short-stat">
      <div className="short-stat-value serif">{value}</div>
      <div className="short-stat-label">{label}</div>
    </div>
  );
}

function CompRow({ name, is, highlight = false }: { name: string; is: string; highlight?: boolean }) {
  return (
    <div className={`short-comp-row${highlight ? ' highlight' : ''}`}>
      <div className="short-comp-name serif">{name}</div>
      <div
        className="short-comp-is"
        dangerouslySetInnerHTML={{ __html: `= ${is}` }}
      />
    </div>
  );
}

function CompRowNew({
  name,
  detail,
  adj,
  ours = false,
}: {
  name: string;
  detail: string;
  adj: number;
  ours?: boolean;
}) {
  return (
    <div className={`short-comp-row-item${ours ? ' short-comp-row-ours' : ''}`}>
      <span className="short-comp-row-name">{name}</span>
      <span className="short-comp-row-detail">{detail}</span>
      <span className="short-comp-row-adj">
        <span className="short-comp-row-adj-num">{ours ? adj : `+${adj}`}</span>
      </span>
    </div>
  );
}

function Pair({ pain, action }: { pain: string; action: string }) {
  return (
    <div className="short-pair">
      <div className="short-pair-pain" dangerouslySetInnerHTML={{ __html: pain }} />
      <div className="short-pair-action" dangerouslySetInnerHTML={{ __html: action }} />
    </div>
  );
}

function NotRow({ label, body }: { label: string; body: string }) {
  return (
    <div className="short-notrow">
      <div className="short-notrow-label serif" dangerouslySetInnerHTML={{ __html: label }} />
      <div className="short-notrow-body" dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  );
}

function AskCell({ num, label }: { num: string; label: string }) {
  return (
    <div className="short-ask-cell">
      <div className="short-ask-num serif">{num}</div>
      <div className="short-ask-label">{label}</div>
    </div>
  );
}

function LaneGroup({
  title,
  children,
  highlight = false,
}: {
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className={`short-lane-group${highlight ? ' highlight' : ''}`}>
      <div className="short-lane-label">{title}</div>
      {children}
    </div>
  );
}

function LaneItem({
  name,
  detail,
  highlight = false,
}: {
  name: string;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div className={`short-lane-item${highlight ? ' highlight' : ''}`}>
      <span className="short-lane-item-name serif">{name}</span>
      <span className="short-lane-item-detail" dangerouslySetInnerHTML={{ __html: ` — ${detail}` }} />
    </div>
  );
}

function ScaleRung({
  restaurants,
  arr,
  label,
  highlight = false,
}: {
  restaurants: string;
  arr: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <div className={`short-scale-rung${highlight ? ' highlight' : ''}`}>
      <div className="short-scale-restaurants serif">{restaurants}</div>
      <div className="short-scale-arr serif">{arr}</div>
      <div className="short-scale-label">{label}</div>
    </div>
  );
}

function RiskRow({
  label,
  body,
  mitigation,
}: {
  label: string;
  body: string;
  mitigation: string;
}) {
  return (
    <div className="short-riskrow">
      <div className="short-riskrow-label serif">{label}</div>
      <div>
        <div className="short-riskrow-body" dangerouslySetInnerHTML={{ __html: body }} />
        <div className="short-riskrow-mitigation" dangerouslySetInnerHTML={{ __html: mitigation }} />
      </div>
    </div>
  );
}
