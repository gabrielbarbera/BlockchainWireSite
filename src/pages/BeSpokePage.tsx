import { CtaLink, PageHero, SectionDark, Card } from "../components/ui";
import { Check, ArrowRight } from "lucide-react";

const TIERS = [
  {
    name: "Foundation Package",
    price: "$2,500",
    period: "month",
    description: "Establishes a consistent media drumbeat with press release distribution and social amplification on news media X channel. Ideal for projects building baseline visibility and brand recognition.",
    deliverables: [
      { label: "Press Releases", detail: "2 per month — professionally written, formatted, and distributed via newswire" },
      { label: "X (Twitter) Post", detail: "1 sponsored post on a X channel with 1.3M followers" },
      { label: "Distribution Network", detail: "Syndicated to 1200+ financial and blockchain news outlets" },
      { label: "Turnaround Time", detail: "24-48 hours from brief approval to publication" },
    ],
  },
  {
    name: "Growth Package",
    price: "$5,000",
    period: "month",
    description: "Layers editorial authority onto your distribution strategy. Includes organic article placements on top-tier mainstream media publication alongside amplified social reach — driving both credibility and community awareness.",
    deliverables: [
      { label: "Press Releases", detail: "2 per month — distributed via newswire" },
      { label: "Organic Article", detail: "1 per month — editorial-style, 600–900 words" },
      { label: "Article Placement", detail: "HackerNoon or Cryptopolitan (client's choice per month)" },
      { label: "X (Twitter) Post", detail: "1 sponsored post on a X channel with 1.3M followers" },
      { label: "Article Turnaround", detail: "5–7 business days from approved brief to live publication" },
    ],
  },
  {
    name: "Authority Package",
    price: "$12,000",
    period: "month",
    description: "BeSpoke™ flagship media offering — combining premium editorial placements, mainstreet financial media exposure, high-reach social amplification, and live community engagement through an AMA. This tier is engineered for projects ready to dominate the narrative.",
    deliverables: [
      { label: "Press Releases", detail: "2 per month — premium distribution including financial wire" },
      { label: "Organic Article", detail: "1 per month — editorial-style, 800–1,200 words" },
      { label: "Article Placement", detail: "HackerNoon or Cryptopolitan" },
      { label: "Investing.com Feature", detail: "1 three-tier article — News, Analysis, and Community sections" },
      { label: "X (Twitter) Posts", detail: "1 sponsored post on a X channel with 1.3M followers" },
      { label: "AMA — Crypto Clash", detail: "1 live AMA per month" },
      { label: "News Release Distribution", detail: "Extended distribution: 1200+ outlets including financial and crypto verticals" },
    ],
    featured: true,
  },
];

const COMPARISON = [
  { deliverable: "Press Releases / mo", tier1: "2", tier2: "2", tier3: "2" },
  { deliverable: "Organic Articles", tier1: "—", tier2: "1", tier3: "1" },
  { deliverable: "HackerNoon / Cryptopolitan", tier1: "—", tier2: "✓", tier3: "✓" },
  { deliverable: "Investing.com Feature", tier1: "—", tier2: "—", tier3: "✓" },
  { deliverable: "X (Twitter) Post (1.3M Followers)", tier1: "1", tier2: "1", tier3: "2" },
  { deliverable: "AMA", tier1: "—", tier2: "—", tier3: "✓" },
  { deliverable: "News Release Distribution", tier1: "✓", tier2: "✓", tier3: "✓" },
  { deliverable: "Monthly Retainer", tier1: "$2,500", tier2: "$5,000", tier3: "$12,000" },
];

export function BeSpokePage() {
  return (
    <main>
      <PageHero
        badge="BeSpoke™"
        title="Fully Customizable Media Distribution"
        subtitle="For brands looking for something beyond a standard media package, BeSpoke™ is a fully customizable alternative to our crypto and mainstream media plans."
      >
        <p className="mt-6 max-w-3xl text-white/60 text-lg leading-relaxed">
          BeSpoke™ is built for companies that want a tailored approach to visibility — combining organic article placements with a broad mix of media channels that reach audiences wherever they are. Clients gain access to broadcast TV coverage, radio and streaming placements, billboard advertising, interviews on X, AMAs, and one-on-one media interviews, all curated around their specific goals and audience.
        </p>
        <p className="mt-4 max-w-3xl text-white/60 text-base leading-relaxed">
          Unlike fixed-tier packages, BeSpoke™ is structured around your campaign — giving you the flexibility to prioritize the channels that matter most to your brand while maintaining a cohesive, multi-platform presence.
        </p>
        <p className="mt-4 max-w-3xl text-white/60 text-base leading-relaxed">
          We offer a high-impact, three-tier strategy designed to move your brand beyond the digital noise and into the national spotlight.
        </p>
      </PageHero>

      {/* Three tiers */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
              Pricing Tiers
            </span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
            Choose Your <span className="text-primary-dark">Impact Level</span>
          </h2>

          <div className="mt-12 grid gap-6 lg:gap-8 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl border p-7 sm:p-8 ${
                  tier.featured
                    ? "border-primary/40 bg-ink text-white shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)]"
                    : "border-ink/10 bg-white"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-7">
                    <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Flagship
                    </span>
                  </div>
                )}
                
                <h3 className={`text-2xl font-display font-bold ${tier.featured ? "text-white" : "text-ink"}`}>
                  {tier.name}
                </h3>
                
                <div className="mt-4 flex items-baseline gap-1">
                  <span className={`text-4xl font-display font-black ${tier.featured ? "text-white" : "text-ink"}`}>
                    {tier.price}
                  </span>
                  <span className={`text-sm ${tier.featured ? "text-white/70" : "text-ink/60"}`}>
                    /{tier.period}
                  </span>
                </div>

                <p className={`mt-4 text-sm leading-relaxed ${tier.featured ? "text-white/70" : "text-ink/60"}`}>
                  {tier.description}
                </p>

                <div className={`mt-6 space-y-3 ${tier.featured ? "text-white/70" : "text-ink/70"}`}>
                  {tier.deliverables.map((item) => (
                    <div key={item.label}>
                      <div className="text-[10px] font-bold uppercase tracking-wider opacity-60 mb-1">
                        {item.label}
                      </div>
                      <div className="text-sm font-medium">{item.detail}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <CtaLink
                    href="mailto:sales@blockchainwire.io"
                    variant={tier.featured ? "primary" : "outline"}
                    className="w-full justify-center"
                  >
                    Get Started
                  </CtaLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="bg-slate-50/50 border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
              Compare
            </span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-[-0.04em]">
            BeSpoke™ Plan <span className="text-primary-dark">Comparison</span>
          </h2>

          <div className="mt-10 overflow-hidden rounded-3xl border border-ink/10 bg-white">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
                    Deliverable
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 text-center">
                    Tier 1
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 text-center">
                    Tier 2
                  </th>
                  <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.16em] text-ink/60 text-center">
                    Tier 3
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {COMPARISON.map((row, i) => (
                  <tr key={row.deliverable} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/30"}>
                    <td className="px-5 py-4 font-medium text-ink/90">{row.deliverable}</td>
                    <td className="px-5 py-4 text-center text-ink/70">{row.tier1}</td>
                    <td className="px-5 py-4 text-center text-ink/70">{row.tier2}</td>
                    <td className="px-5 py-4 text-center font-semibold text-primary-dark">{row.tier3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Custom integrations */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
          <Card accent>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink">
              Custom Media Residency Plans
            </h2>
            <p className="mt-4 text-ink/70 leading-relaxed">
              For custom integrations—including National Broadcast TV, Radio, and Digital Billboard placements—please reach out to our team.
            </p>
            <p className="mt-3 text-ink/70 leading-relaxed">
              Custom Media Residency Plans start at <span className="font-semibold text-ink">$35,000 per month</span>.
            </p>
            <div className="mt-6">
              <CtaLink href="mailto:sales@blockchainwire.io">
                Contact sales@blockchainwire.io
              </CtaLink>
            </div>
          </Card>
        </div>
      </section>

      {/* Final CTA */}
      <SectionDark
        title="Want more? Let's talk."
        subtitle="Our BeSpoke™ solutions are tailored to your goals—explore our retainer options or choose a flexible pay-as-you-go plan."
      >
        <div className="mt-8 flex flex-wrap gap-4">
          <CtaLink href="mailto:sales@blockchainwire.io">
            Contact sales@blockchainwire.io
          </CtaLink>
          <CtaLink href="/pricing" variant="outline">
            View Standard Packages
          </CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}
