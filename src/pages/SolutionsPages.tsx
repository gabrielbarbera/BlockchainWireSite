import { CtaLink, PageHero, SectionDark, Card } from "../components/ui";
import { Rocket, Users, Building2, Landmark, Zap, Megaphone, Check } from "lucide-react";

type SolutionData = {
  id: string;
  navTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  problem: string;
  solutionItems: string[];
  useCasesTitle: string;
  useCases: string[];
  outcome: string;
  icon: React.ReactNode;
};

const SOLUTIONS: SolutionData[] = [
  {
    id: "startups",
    navTitle: "Web3 Startups",
    heroTitle: "Launch With Credibility From Day One",
    heroSubtitle:
      "Get your project featured across trusted crypto and financial media—so you're seen beyond your immediate network from the moment you launch.",
    problem:
      "Most Web3 startups rely heavily on social channels and paid promotion. While effective for short-term attention, these channels don't establish long-term credibility with investors, media, or potential partners who discover you through independent sources.",
    solutionItems: [
      "Distribute announcements across recognized crypto and financial media platforms",
      "Build trust with investors and partners through earned media coverage",
      "Improve discoverability across search engines and AI systems",
      "Establish a consistent, indexed public presence that persists over time",
    ],
    useCasesTitle: "Use Cases",
    useCases: [
      "Product launches",
      "Funding announcements",
      "Ecosystem updates",
      "Partnership announcements",
    ],
    outcome:
      "Move from visibility to credibility to traction. Media placements on recognized publications establish trust that social posts and paid ads can't replicate—helping you attract investors, partners, and users who discover you through trusted, independent sources rather than through channels you control.",
    icon: <Rocket className="w-6 h-6" />,
  },
  {
    id: "agencies",
    navTitle: "Agencies",
    heroTitle: "Scale Client Distribution Without Friction",
    heroSubtitle:
      "Deliver high-quality media placements for your clients with predictable outcomes, structured pricing, and repeatable workflows.",
    problem:
      "Managing PR distribution manually across multiple clients is time-consuming, inconsistent, and difficult to scale. Different clients have different needs, timelines, and quality expectations—making standardization nearly impossible without the right infrastructure.",
    solutionItems: [
      "Standardize distribution workflows across all client accounts",
      "Deliver consistent placement quality regardless of announcement type",
      "Reduce operational overhead with structured package tiers",
      "Maintain control over timelines, outputs, and client expectations",
    ],
    useCasesTitle: "Features",
    useCases: [
      "Multiple campaign management",
      "Repeatable distribution workflows",
      "Clear package structure",
      "Optional BeSpoke™ campaigns",
    ],
    outcome:
      "Operate PR distribution as a scalable service—not a manual process. Standardized workflows let you onboard new clients faster, deliver consistent quality across accounts, and grow your distribution offering without proportionally growing your team or operational overhead.",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "exchanges",
    navTitle: "Exchanges",
    heroTitle: "Announce Listings With Authority",
    heroSubtitle:
      "Ensure your listings, integrations, and platform updates reach the media channels that traders, investors, and industry analysts actually follow.",
    problem:
      "Exchange announcements too often stay within existing platform audiences—reaching users who already know you, rather than the traders, investors, and media figures who don't. Listings and updates that don't reach broader financial media fail to generate the awareness that drives real volume.",
    solutionItems: [
      "Distribute listing announcements across crypto and financial media simultaneously",
      "Increase visibility among traders and investors beyond your existing user base",
      "Strengthen brand perception and credibility with industry media",
      "Build indexed coverage that continues attracting attention after launch",
    ],
    useCasesTitle: "Use Cases",
    useCases: [
      "Token listings",
      "Platform updates",
      "Strategic partnerships",
      "Expansion announcements",
    ],
    outcome:
      "Turn routine announcements into market-visible events. When listings and platform updates appear across crypto and financial media, they reach audiences far beyond your existing users—generating awareness that translates into trading volume, new account registrations, and lasting brand authority in the market.",
    icon: <Building2 className="w-6 h-6" />,
  },
  {
    id: "public-companies",
    navTitle: "Public Companies",
    heroTitle: "Structured Distribution for Investor Communications",
    heroSubtitle:
      "Support investor relations with reliable media exposure across financial, crypto, and mainstream channels—where analysts and institutional investors look.",
    problem:
      "Investor communications require credibility, structure, and reach across recognized media platforms. Niche crypto channels alone are insufficient when your audience includes financial analysts, institutional investors, and mainstream market observers who rely on trusted publications for their due diligence.",
    solutionItems: [
      "Distribution across financial media including Associated Press and Business Insider",
      "Structured announcement delivery with consistent formatting and timing",
      "Increased visibility for investor-facing updates and strategic news",
      "Coverage that supports credibility in public markets and with analysts",
    ],
    useCasesTitle: "Use Cases",
    useCases: [
      "Strategic announcements",
      "Partnership and expansion news",
      "Market positioning updates",
      "Crypto treasury disclosures",
    ],
    outcome:
      "Strengthen visibility with investors, analysts, and financial media. Structured distribution ensures your announcements reach the right audiences through channels they already trust—supporting the credibility that public markets require and reinforcing your narrative with the institutional audiences that matter most.",
    icon: <Landmark className="w-6 h-6" />,
  },
  {
    id: "token-launches",
    navTitle: "Token Launches",
    heroTitle: "Maximize Visibility at Launch",
    heroSubtitle:
      "Reach the audiences that matter during your most critical growth window—and generate indexed coverage that outlasts the launch cycle.",
    problem:
      "Token launches are time-sensitive. Without broad distribution, even well-funded projects fail to gain visibility beyond their immediate community. Hype generated within your existing channels doesn't create the external, independent coverage that builds lasting credibility with new investors.",
    solutionItems: [
      "Distribute across 36+ crypto-native media outlets for community reach",
      "Expand into financial and mainstream outlets for broader investor visibility",
      "Generate Google News-indexed coverage for sustained discoverability",
      "Build momentum during launch windows with coordinated distribution",
    ],
    useCasesTitle: "Use Cases",
    useCases: [
      "Token generation events (TGE)",
      "Public launches",
      "Pre-sale announcements",
      "Exchange listings",
    ],
    outcome:
      "Create sustained visibility—not just short-term hype. Well-distributed launch coverage generates indexed content across recognized media that continues attracting attention, driving search traffic, and building credibility long after your launch window closes—compounding in value with every subsequent announcement.",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "events-partnerships",
    navTitle: "Events & Partnerships",
    heroTitle: "Amplify Key Announcements",
    heroSubtitle:
      "Ensure your partnerships, events, and collaborations reach relevant media channels—not just your existing audience.",
    problem:
      "Strategic announcements—partnerships, event appearances, and ecosystem collaborations—are often underserved by existing distribution. Posted in-house, they reach current followers. Distributed through media, they reach new audiences, generate independent coverage, and create indexed content that surfaces long after the initial announcement.",
    solutionItems: [
      "Wide distribution across crypto and financial media simultaneously",
      "Increased visibility for strategic collaborations and ecosystem partnerships",
      "Coverage that extends your narrative beyond your existing audience",
      "Indexed placements that surface in search and AI discovery systems",
    ],
    useCasesTitle: "Use Cases",
    useCases: [
      "Event announcements",
      "Strategic partnerships",
      "Ecosystem collaborations",
      "Conference participation",
    ],
    outcome:
      "Extend the impact of every announcement. Distribution across recognized media creates lasting indexed coverage—not just a moment of attention that disappears from feeds within hours. Strategic partnerships and events deserve audiences beyond your existing community, and media distribution delivers exactly that.",
    icon: <Megaphone className="w-6 h-6" />,
  },
];

export function SolutionsPage() {
  return (
    <main>
      <PageHero
        badge="Solutions"
        title="Solutions Built for Modern Media Distribution"
        subtitle="From early-stage Web3 startups to public companies, BlockchainWire provides structured distribution across crypto, financial, and global media. Different teams have different distribution needs—but all require credibility, reach, and discoverability."
      >
        <nav className="mt-8 flex flex-wrap gap-2">
          {SOLUTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              {s.navTitle}
            </a>
          ))}
        </nav>
      </PageHero>

      {SOLUTIONS.map((s, i) => (
        <section
          key={s.id}
          id={s.id}
          className={`scroll-mt-24 relative ${i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className={`absolute ${i % 2 === 0 ? "-top-24 -right-24" : "-top-24 -left-24"} h-80 w-80 rounded-full bg-primary/[0.04] blur-3xl`}
            />
          </div>

          <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
            {/* Section header */}
            <div className="mb-12">
              <div className="flex items-center gap-4 mb-5">
                <span className="font-mono text-6xl font-black text-ink/[0.04] select-none leading-none tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary border border-primary/30 rounded-full px-3 py-1.5">
                  {s.navTitle}
                </span>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {s.icon}
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-black uppercase tracking-[-0.04em] leading-[0.9]">
                    {s.heroTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink/55 text-base sm:text-lg leading-relaxed">
                    {s.heroSubtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* 3-col content cards */}
            <div className="grid gap-5 md:grid-cols-3">
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  The Challenge
                </h3>
                <p className="text-sm text-ink/65 leading-relaxed">{s.problem}</p>
              </Card>
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  How We Help
                </h3>
                <ul className="space-y-3">
                  {s.solutionItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink/65 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  {s.useCasesTitle}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {s.useCases.map((uc) => (
                    <span
                      key={uc}
                      className="rounded-full bg-slate-100 border border-ink/[0.06] px-3.5 py-1.5 text-sm font-medium text-ink/60"
                    >
                      {uc}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            {/* Outcome — dark banner */}
            <div className="mt-5 rounded-3xl bg-ink p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none noise opacity-20" />
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Outcome
                </span>
                <p className="mt-4 text-xl sm:text-2xl font-display font-bold text-white leading-snug max-w-3xl">
                  {s.outcome}
                </p>
              </div>
            </div>
          </div>

          {i === 2 && (
            <SectionDark
              title="Built for Every Stage of Growth"
              subtitle="Whether you're launching your first token or managing investor communications as a public company, the distribution infrastructure adapts to your needs."
              className="!py-14 sm:!py-16"
            />
          )}
        </section>
      ))}

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none noise opacity-20" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center">
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-6">
            Ready to get started
          </p>

          {/* Headline */}
          <h2
            className="font-display font-black text-white leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Find the Right{" "}
            <span className="text-primary">Distribution Strategy</span>
            <br className="hidden sm:block" /> for Your Team
          </h2>

          {/* Supporting copy */}
          <p className="mt-8 text-lg text-white/50 max-w-2xl mx-auto leading-relaxed">
            Whether you're a startup building credibility or an exchange managing global announcements, there's a package designed for your stage and goals.
          </p>

          {/* CTA buttons */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <CtaLink href="/auth/signup">Get Started</CtaLink>
              <span className="text-xs text-white/50">No commitment required</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <CtaLink href="/pricing" variant="outline">View Pricing</CtaLink>
              <span className="text-xs text-white/50">From $295 per release</span>
            </div>
          </div>

          {/* Trust signals */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { stat: "24h", label: "Standard turnaround" },
              { stat: "1200+", label: "Media outlets" },
              { stat: "174M+", label: "Total monthly reach" },
              { stat: "Google News", label: "Indexed on every plan" },
            ].map(({ stat, label }) => (
              <div key={stat} className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-primary">{stat}</span>
                <span className="text-xs text-white/55 uppercase tracking-wider">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
