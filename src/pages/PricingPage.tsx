import { useState } from "react";
import { CtaLink, PageHero } from "../components/ui";

type CircuitCard = {
  name: string;
  price: string;
  subtitle: string;
  reach: string;
  placements: string;
  includes: string;
  bestFor: string;
  cta: string;
  highlighted?: boolean;
  light?: boolean;
};

const cryptoCards: CircuitCard[] = [
  {
    name: "Copper",
    price: "$495",
    subtitle: "Premier Crypto Visibility",
    reach: "300k+ monthly reach",
    placements: "Placement on 36 crypto sites",
    includes:
      "BitcoinWorld, Binance, CoinChapter, CoinMarketCap, Coinpress, and more",
    bestFor: "Best for early-stage projects",
    cta: "Launch with Copper",
    light: true,
  },
  {
    name: "Silver",
    price: "$1,195",
    subtitle: "Expanded Crypto Distribution",
    reach: "730k monthly reach",
    placements: "25+ crypto sites",
    includes: "Cryptopolitan, HackerNoon, TheBitTimes, and more",
    bestFor: "Best for growth-stage momentum",
    cta: "Launch with Silver",
  },
  {
    name: "Gold",
    price: "$2,195",
    subtitle: "Mid-Tier Authority Coverage",
    reach: "4.1M+ monthly reach",
    placements: "25+ crypto sites",
    includes: "Captain Altcoin, Cryptopolitan, HackerNoon, Mpost, and more",
    bestFor: "Best for product launches",
    cta: "Launch with Gold",
  },
  {
    name: "Platinum",
    price: "$3,295",
    subtitle: "High-Impact Crypto Distribution",
    reach: "7.9M+ monthly reach",
    placements: "25+ crypto sites",
    includes: "Dailycoin, Invezz, The Defiant, and more",
    bestFor: "Best for high-visibility campaigns",
    cta: "Launch with Platinum",
  },
  {
    name: "Diamond",
    price: "$5,295",
    subtitle: "Maximum Crypto Authority Reach",
    reach: "17.4M+ monthly reach",
    placements: "28+ crypto sites",
    includes: "AMB Crypto, Blockchain.news, Cryptotimes.io, HackerNoon, and more",
    bestFor: "Best for major announcements",
    cta: "Launch with Diamond",
    highlighted: true,
  },
];

const mediaCards: CircuitCard[] = [
  {
    name: "Pro",
    price: "$295",
    subtitle: "Essential Media Distribution",
    reach: "Google News indexed",
    placements: "up to 10 crypto placements",
    includes: "BizWire Express, EIN Presswire, MENAFN, and more",
    bestFor: "Best for foundational visibility",
    cta: "Launch with Pro",
    light: true,
  },
  {
    name: "Elite",
    price: "$395",
    subtitle: "Top-Tier Media Exposure",
    reach: "71M+ total reach",
    placements: "up to 20 crypto placements",
    includes: "Associated Press, Barchart, Benzinga, Business Insider and more",
    bestFor: "Best for multi-channel distribution",
    cta: "Launch with Elite",
  },
  {
    name: "Premium",
    price: "$495",
    subtitle: "Maximum Media + Crypto Reach (Fastest turnaround)",
    reach: "174M+ total reach",
    placements: "up to 20 crypto placements",
    includes: "Associated Press, Benzinga, Business Insider, Market Watch, Street Insider, and more",
    bestFor: "Best for maximum visibility",
    cta: "Launch with Premium",
    highlighted: true,
  },
];

function PricingCard({ card }: { card: CircuitCard }) {
  const className = card.highlighted
    ? "border-primary/40 bg-ink text-white shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5)]"
    : card.light
      ? "border-ink/10 bg-white"
      : "border-ink/15 bg-white";

  return (
    <article className={`rounded-3xl border p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-2xl font-display font-black uppercase tracking-tight">
          {card.name}
        </h3>
        <span className="rounded-full bg-primary/15 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
          {card.bestFor}
        </span>
      </div>
      <p className="mt-3 text-3xl font-black">{card.price}</p>
      <p className={`${card.highlighted ? "text-white/80" : "text-ink/75"} mt-2 text-sm`}>
        {card.subtitle}
      </p>
      <ul className={`mt-4 space-y-2 text-sm ${card.highlighted ? "text-white/70" : "text-ink/70"}`}>
        <li>{card.reach}</li>
        <li>{card.placements}</li>
        <li>{card.includes}</li>
      </ul>
      <div className="mt-6">
        <CtaLink href="https://admin.blockchainwire.io/signup" variant={card.highlighted ? "primary" : "outline"}>
          {card.cta}
        </CtaLink>
      </div>
    </article>
  );
}

export function PricingPage() {
  const [view, setView] = useState<"crypto" | "media">("crypto");
  const visible = view === "crypto" ? cryptoCards : mediaCards;

  return (
    <main>
      <PageHero
        badge="Most selected package: Gold"
        title="Distribution Packages Built for Reach and Credibility"
        subtitle="Choose from curated crypto circuits, premium media placements, and top-tier financial distribution designed to maximize visibility and authority."
      >
        <p className="mt-6 text-xs uppercase tracking-[0.18em] text-white/30">
          Crypto Circuits (Copper to Diamond)  |  Media + Financial Circuits
          (Pro to Premium)  |  Premium Placements  |  Custom
        </p>
      </PageHero>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Crypto Distribution Circuits
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
            Launch Across the Core Web3 Media Network
          </h2>
          <p className="mt-4 max-w-3xl text-ink/70">
            Our crypto circuits are designed to give your announcement immediate
            exposure across high-traffic blockchain and digital asset
            publications.
          </p>

          <div className="mt-7 inline-flex rounded-full border border-ink/10 bg-slate-50 p-1">
            <button
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                view === "crypto" ? "bg-primary text-white" : "text-ink/60"
              }`}
              onClick={() => setView("crypto")}
            >
              Crypto Circuits
            </button>
            <button
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] ${
                view === "media" ? "bg-primary text-white" : "text-ink/60"
              }`}
              onClick={() => setView("media")}
            >
              Media Circuits
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((card) => (
              <PricingCard key={card.name} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Mainstream + Financial Distribution
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
            Extend Beyond Crypto Into Global Media
          </h2>
          <p className="mt-4 max-w-3xl text-ink/70">
            Reach investors, institutions, and broader audiences through
            top-tier financial and mainstream publications.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {mediaCards.map((card) => (
              <PricingCard key={`media-${card.name}`} card={card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Direct Placements
          </p>
          <h2 className="mt-3 text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
            Secure Placement on High-Authority Publications
          </h2>
          <div className="mt-7 overflow-hidden rounded-3xl border border-ink/10">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-ink/55">
                <tr>
                  <th className="px-5 py-4">Publication</th>
                  <th className="px-5 py-4">Monthly Visitors</th>
                  <th className="px-5 py-4">Price</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ["CoinTelegraph", "9.4M+", "$7,250"],
                  ["CoinTelegraph Lite", "9.4M+", "$4,250"],
                  ["BeinCrypto", "3.6M+", "$1,650"],
                  ["Bitcoin.com", "1.8M+", "$1,750"],
                ].map(([name, visitors, price]) => (
                  <tr key={name} className="border-t border-ink/10">
                    <td className="px-5 py-4 font-semibold">{name}</td>
                    <td className="px-5 py-4 text-ink/70">{visitors}</td>
                    <td className="px-5 py-4 font-semibold">{price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="rounded-3xl border border-primary/25 bg-primary/8 p-8 sm:p-10">
            <h2 className="text-3xl sm:text-4xl font-display font-black tracking-tight">
              Want more? Let's talk.
            </h2>
            <p className="mt-4 max-w-3xl text-ink/75">
              Our BeSpoke™ solutions are tailored to your goals—explore our retainer options or choose a flexible pay-as-you-go plan. Contact sales@blockchainwire.io
            </p>
            <div className="mt-6">
              <CtaLink href="/bespoke">Explore BeSpoke™</CtaLink>
            </div>
            </div>
        </div>
      </section>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="absolute inset-0 pointer-events-none noise opacity-20" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 py-24 sm:py-32 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary mb-6">
            Start today
          </p>

          <h2
            className="font-display font-black text-white leading-[0.92] tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Ready to{" "}
            <span className="text-primary">Go Live in as Little as 2 Hours</span>
          </h2>

          <p className="mt-8 text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Create an account, pick a package, and submit your announcement. Our team handles editorial review, distribution, and reporting.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-1.5">
              <CtaLink href="https://admin.blockchainwire.io/signup">Get Started</CtaLink>
              <span className="text-xs text-white/50">Free account, no commitment</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <CtaLink href="https://admin.blockchainwire.io/signin" variant="outline">Log In</CtaLink>
              <span className="text-xs text-white/50">Already have an account</span>
            </div>
          </div>

          <div className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {[
              { stat: "2hrs", label: "Minimum Turnaround Time" },
              { stat: "1200+", label: "Media outlets" },
              { stat: "From $295", label: "Per release" },
              { stat: "Google News", label: "Every plan" },
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

