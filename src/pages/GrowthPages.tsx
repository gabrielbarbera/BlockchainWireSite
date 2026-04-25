import {
  FileText,
  Layers,
  Send,
  BarChart3,
  Check,
  Clock,
  ArrowRight,
} from "lucide-react";
import { CtaLink, PageHero, SectionDark, Card } from "../components/ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const PHASES = [
  {
    id: "prepare",
    number: "01",
    title: "Prepare Your Release",
    subtitle: "Write your announcement and structure it for media consumption.",
    icon: <FileText className="w-6 h-6" />,
    youDo: [
      "Write your press release using standard journalism structure",
      "Include a clear headline, dateline, body, and boilerplate",
      "Add quotes, supporting links, and contact details",
    ],
    weDo: [
      "Validate submission completeness before processing",
      "Flag structural issues that may affect placement quality",
      "Confirm the release is ready for circuit deployment",
    ],
    outcome:
      "A well-structured release ready for distribution—one that meets media platform standards and is optimized for search indexing and AI discoverability.",
  },
  {
    id: "select",
    number: "02",
    title: "Select Your Distribution Circuit",
    subtitle: "Choose the reach profile and outlet mix that fits your announcement.",
    icon: <Layers className="w-6 h-6" />,
    youDo: [
      "Choose between Crypto Circuits (Copper → Diamond) or Media Circuits (Pro → Premium)",
      "Review estimated reach and outlet categories for your chosen tier",
      "Submit your order through the platform",
    ],
    weDo: [
      "Confirm package scope and outlet availability",
      "Assign the release to the correct distribution queue",
      "Prepare targeting parameters for circuit deployment",
      "Set turnaround window based on selected package",
    ],
    outcome:
      "A confirmed distribution plan matched to your goals—whether targeted crypto-native reach, broad financial media exposure, or a custom combination through BeSpoke™.",
  },
  {
    id: "launch",
    number: "03",
    title: "Launch Across the Network",
    subtitle: "Your release is deployed across selected outlets within 2 hours.",
    icon: <Send className="w-6 h-6" />,
    youDo: [
      "Finalize and submit your release through the dashboard",
      "Confirm package selection",
      "Receive submission confirmation with estimated turnaround",
      "No further action required—distribution runs automatically",
    ],
    weDo: [
      "Deploy to all outlets in your selected circuit simultaneously",
      "Confirm placements as each outlet publishes your release",
      "Ensure Google News indexing is triggered for all applicable placements",
      "Monitor distribution progress and resolve any placement issues",
    ],
    outcome:
      "Your announcement published across 25+ to 1200+ media outlets—depending on your circuit—with Google News indexing active and coverage accumulating within 2 hours of submission.",
  },
  {
    id: "measure",
    number: "04",
    title: "Measure Your Coverage",
    subtitle: "Receive a structured post-campaign report within 48 hours of full distribution.",
    icon: <BarChart3 className="w-6 h-6" />,
    youDo: [
      "Access your post-campaign report sent via email",
      "Review confirmed placements and estimated reach by outlet",
      "Share coverage links internally or with stakeholders",
      "Use insights to plan your next distribution",
    ],
    weDo: [
      "Compile confirmed placement data across all distributed outlets",
      "Calculate estimated audience reach by channel and circuit",
      "Summarize the full distribution footprint",
      "Deliver the structured report within 48 hours of completion",
    ],
    outcome:
      "A documented record of where your release was published, the estimated audience reached, and your total distribution footprint—giving you concrete coverage data for investor updates, stakeholder reporting, and future campaign planning.",
  },
];

const LIFECYCLE = [
  { step: "Submission", detail: "Release received and queued", timing: "0h" },
  { step: "Review", detail: "Our team checks every release for structure, factual accuracy, and content integrity", timing: "0–2h" },
  { step: "Deployment", detail: "Circuit distribution begins", timing: "2–4h" },
  { step: "Placements", detail: "Outlets publish and confirm", timing: "4–24h" },
  { step: "Report", detail: "Post-campaign report delivered", timing: "24–48h" },
];

const FAQS = [
  {
    q: "How long does distribution take?",
    a: "Most releases are fully distributed within 2 hours of submission. Post-campaign reports are delivered within 48 hours of full distribution completion.",
  },
  {
    q: "Which outlets will my release appear on?",
    a: "Outlets depend on your chosen circuit. Crypto Circuits cover 25–36 crypto-native publications. Media Circuits add top-tier financial outlets including Associated Press, Business Insider, MarketWatch, and Benzinga.",
  },
  {
    q: "Can I edit my release after submitting?",
    a: "Edits can be requested before deployment begins. Once distribution is underway, changes cannot be applied to already-published placements.",
  },
  {
    q: "What's included in the post-campaign report?",
    a: "Every report includes confirmed placement links, estimated audience reach by outlet, a full distribution footprint summary, and Google News indexing confirmation.",
  },
  {
    q: "What's the difference between Crypto and Media Circuits?",
    a: "Crypto Circuits target Web3-native audiences across dedicated blockchain and crypto publications. Media Circuits extend reach into mainstream financial media, adding outlets like AP News and Business Insider alongside Google News indexing.",
  },
  {
    q: "Do you offer custom campaigns?",
    a: "Yes. BeSpoke™ offers fully customizable media distribution with organic article placements, broadcast TV coverage, radio spots, and AMAs. Three tiers available from $2,500 to $12,000 per month.",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HowItWorksPage() {
  return (
    <main>
      <PageHero
        badge="How It Works"
        title="From Submission to Coverage in 2 Hours"
        subtitle="A clear, four-phase process—prepare your release, select your circuit, launch across the network, and measure your coverage. No guesswork, no hidden steps."
      />

      {/* ── Lifecycle timeline ─────────────────────────────────────────── */}
      <section className="bg-white border-b border-ink/8">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {LIFECYCLE.map((item, i) => (
              <div key={item.step} className="relative flex flex-col">
                {/* Connector line */}
                {i < LIFECYCLE.length - 1 && (
                  <div className="absolute top-4 left-[calc(50%+16px)] right-0 hidden h-px bg-ink/8 md:block" />
                )}
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary z-10">
                    {i + 1}
                  </div>
                  <p className="mt-3 text-sm font-semibold text-ink">{item.step}</p>
                  <p className="mt-1 text-xs text-ink/45 leading-snug">{item.detail}</p>
                  <div className="mt-2 flex items-center gap-1 text-[10px] font-mono text-primary/60">
                    <Clock className="w-3 h-3" />
                    {item.timing}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4 phases ───────────────────────────────────────────────────── */}
      {PHASES.map((phase, i) => (
        <section
          key={phase.id}
          id={phase.id}
          className={`scroll-mt-24 relative ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className={`absolute ${i % 2 === 0 ? "-top-24 -right-24" : "-top-24 -left-24"} h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl`}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
            {/* Header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-6xl font-black text-ink/[0.04] select-none leading-none tabular-nums">
                  {phase.number}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1.5">
                  Phase {phase.number}
                </span>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {phase.icon}
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-black uppercase tracking-[-0.04em] leading-[0.9]">
                    {phase.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink/70 text-base sm:text-lg leading-relaxed">
                    {phase.subtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Two-col: you do / we do */}
            <div className="grid gap-5 lg:grid-cols-2">
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  What You Do
                </h3>
                <ul className="space-y-3">
                  {phase.youDo.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <ArrowRight className="w-4 h-4 text-ink/25 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink/65 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  What We Do
                </h3>
                <ul className="space-y-3">
                  {phase.weDo.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink/65 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Outcome banner */}
            <div className="mt-5 rounded-3xl bg-ink p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none noise opacity-20" />
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Phase Outcome
                </span>
                <p className="mt-4 text-xl sm:text-2xl font-display font-bold text-white leading-snug max-w-3xl">
                  {phase.outcome}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ── FAQ ────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50/50 relative">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Common Questions
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-display font-black uppercase tracking-[-0.04em]">
              Distribution FAQ
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {FAQS.map((faq) => (
              <Card key={faq.q}>
                <h3 className="font-semibold text-ink leading-snug">{faq.q}</h3>
                <p className="mt-3 text-sm text-ink/70 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      <SectionDark title="Ready to Launch Your First Distribution?">
        <p className="mt-4 max-w-xl text-white/70">
          The process takes minutes. Your coverage starts within 2 hours.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink href="https://admin.blockchainwire.io/signup">Get Started</CtaLink>
          <CtaLink href="/pricing" variant="outline">View Pricing</CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}

export function ComparePackagesPage() {
  return (
    <main>
      <PageHero
        badge="Compare Packages"
        title="Compare Distribution Packages"
        subtitle="Compare placements, reach, turnaround, and media scope to select the right distribution tier for your announcement."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="overflow-hidden rounded-3xl border border-ink/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-ink/60">
                <tr>
                  <th className="px-4 py-3">Package</th>
                  <th className="px-4 py-3">Placements</th>
                  <th className="px-4 py-3">Reach</th>
                  <th className="px-4 py-3">Turnaround</th>
                  <th className="px-4 py-3">Media Types</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Copper", "Crypto circuit", "300k+", "Standard", "Crypto"],
                  ["Gold", "Crypto circuit", "4.1M+", "Standard", "Crypto"],
                  ["Diamond", "Crypto circuit", "17.4M+", "Priority", "Crypto"],
                  ["Pro", "Media + crypto", "Expanded", "Standard", "Financial + Crypto"],
                  ["Premium", "Media + crypto", "174M+", "Fastest", "Financial + Crypto + Indexed"],
                ].map((row) => (
                  <tr key={row[0]} className="border-t border-ink/10">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex gap-3">
            <CtaLink href="/pricing">View Pricing</CtaLink>
            <CtaLink href="/company/contact" variant="outline">Contact Sales</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}

export function SampleDistributionPage() {
  return (
    <main>
      <PageHero
        badge="Sample"
        title="Sample Distribution"
        subtitle="Review a sample release, placement outcomes, and summary reporting to understand exactly what distribution delivers."
      />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-6 lg:grid-cols-2">
          <article className="rounded-2xl border border-ink/10 p-6">
            <h2 className="text-xl font-semibold">Sample Press Release</h2>
            <p className="mt-3 text-ink/70">
              Project Alpha announces a new cross-chain product launch with
              structured ecosystem milestones and partner support.
            </p>
          </article>
          <article className="rounded-2xl border border-ink/10 p-6">
            <h2 className="text-xl font-semibold">Placement Results</h2>
            <ul className="mt-3 space-y-2 text-ink/70">
              <li>Benzinga</li>
              <li>Business Insider</li>
              <li>Cryptopolitan</li>
              <li>Google News indexed platforms</li>
            </ul>
          </article>
          <article className="rounded-2xl border border-ink/10 p-6 lg:col-span-2">
            <h2 className="text-xl font-semibold">Reach Summary</h2>
            <p className="mt-3 text-ink/70">
              Estimated combined reach, placement footprint by channel type, and
              distribution completion timeline.
            </p>
          </article>
        </div>
      </section>
      <section className="bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 relative">
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
            Launch Your Own Distribution
          </h2>
          <div className="mt-8">
          <CtaLink href="https://admin.blockchainwire.io/signup">Get Started</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}

export function MediaDatabasePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Explore the Media Network
      </h1>
      <p className="mt-4 text-ink/70">
        Search and filter publications by category, region, and traffic profile.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <input className="rounded-xl border border-ink/15 px-4 py-3 md:col-span-2" placeholder="Search publication" />
        <select className="rounded-xl border border-ink/15 px-4 py-3"><option>Category</option><option>Crypto</option><option>Finance</option></select>
        <select className="rounded-xl border border-ink/15 px-4 py-3"><option>Region</option><option>Global</option><option>US</option><option>EU</option></select>
      </div>
      <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-[0.16em] text-ink/60">
            <tr>
              <th className="px-4 py-3">Publication</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Region</th>
              <th className="px-4 py-3">Monthly Traffic</th>
              <th className="px-4 py-3">Authority Tier</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Benzinga", "Finance", "US", "24M+", "Tier 1"],
              ["Cryptopolitan", "Crypto", "Global", "2M+", "Tier 2"],
              ["Business Insider", "Finance", "Global", "80M+", "Tier 1"],
            ].map((row) => (
              <tr key={row[0]} className="border-t border-ink/10">
                {row.map((cell) => <td key={cell} className="px-4 py-3">{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export function ReleasePerformanceInsightsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Release Performance Insights
      </h1>
      <p className="mt-4 text-ink/70">
        Analyze announcement outcomes with operational metrics beyond basic placement counts.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Estimated Impressions", "2.4M"],
          ["Visibility Score", "87 / 100"],
          ["Placement Quality Tier", "Tier 1 + Tier 2 mix"],
        ].map(([label, value]) => (
          <article key={label} className="rounded-2xl border border-ink/10 bg-white p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-ink/70">{label}</p>
            <p className="mt-2 text-2xl font-bold">{value}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export function EditorialGuidelinesPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Editorial Guidelines
      </h1>
      <p className="mt-4 text-ink/70">
        Submission standards that improve placement quality and reduce revision cycles.
      </p>
      <ul className="mt-8 space-y-3 text-ink/70">
        <li>Use verifiable claims and source-backed statements.</li>
        <li>Keep headlines specific and descriptive.</li>
        <li>Maintain a clear structure with contextual opening paragraphs.</li>
        <li>Avoid unsupported performance guarantees.</li>
      </ul>
    </main>
  );
}

export function TurnaroundSlasPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Turnaround & Process SLAs
      </h1>
      <p className="mt-4 text-ink/70">
        Submission deadlines, processing windows, and revision policy for predictable delivery.
      </p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Submission Deadlines", "Business-day cutoffs for same-day processing"],
          ["Distribution Windows", "Package-based timing with priority options"],
          ["Revision Policy", "Defined revision scope before deployment"],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-ink/10 bg-white p-5">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-ink/70">{body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

