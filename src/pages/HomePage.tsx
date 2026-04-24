import { useState, useEffect } from "react";
import {
  Radio,
  CheckCircle2,
  Search,
  BarChart3,
  Rocket,
  Building2,
  ArrowLeftRight,
  TrendingUp,
  Coins,
  Gem,
  Zap,
  Globe2,
  Shield,
  X,
  Check,
  ArrowRight,
  Send,
} from "lucide-react";
import { Badge, CtaLink, StatRow } from "../components/ui";

// ─── Data ─────────────────────────────────────────────────────────────────────

const CRYPTO_CIRCUITS = [
  {
    name: "Copper",
    price: "$495",
    subtitle: "Premier Crypto Visibility",
    summary: "300k+ monthly reach across 36 crypto sites including BitcoinWorld, Binance, CoinChapter.",
    highlight: false,
  },
  {
    name: "Silver",
    price: "$1,195",
    subtitle: "Expanded Crypto Distribution",
    summary: "730k monthly reach across 25+ crypto sites including Cryptopolitan, HackerNoon, TheBitTimes.",
    highlight: false,
  },
  {
    name: "Gold",
    price: "$2,195",
    subtitle: "Mid-Tier Authority Coverage",
    summary: "4.1M+ monthly reach across 25+ crypto sites including Captain Altcoin, Cryptopolitan, HackerNoon.",
    highlight: false,
    popular: true,
  },
  {
    name: "Platinum",
    price: "$3,295",
    subtitle: "High-Impact Crypto Distribution",
    summary: "7.9M+ monthly reach across 25+ crypto sites including Dailycoin, Invezz, The Defiant.",
    highlight: false,
  },
  {
    name: "Diamond",
    price: "$5,295",
    subtitle: "Maximum Crypto Authority Reach",
    summary: "17.4M+ monthly reach across 28+ crypto sites including AMB Crypto, Blockchain.news, Cryptotimes.",
    highlight: true,
  },
];

const MEDIA_CIRCUITS = [
  {
    name: "Pro",
    price: "$295",
    subtitle: "Essential Media Distribution",
    summary: "Google News indexed with up to 10 crypto placements including BizWire Express, EIN Presswire, MENAFN.",
    highlight: false,
  },
  {
    name: "Elite",
    price: "$395",
    subtitle: "Top-Tier Media Exposure",
    summary: "71M+ total reach including Associated Press, Barchart, Benzinga, Business Insider and more.",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$495",
    subtitle: "Maximum Media + Crypto Reach",
    summary: "174M+ total reach with Associated Press, Benzinga, Business Insider, MarketWatch, Street Insider, and more.",
    highlight: true,
  },
];

const PARTNERS = [
  { src: "/partners/benzinga.svg", name: "Benzinga" },
  { src: "/partners/marketwatch.svg", name: "MarketWatch" },
  { src: "/partners/bi-logo.svg", name: "Business Insider" },
  { src: "/partners/ap news.svg", name: "AP News" },
  { src: "/partners/Google News.svg", name: "Google News" },

  { src: "/partners/bing.svg", name: "Bing News" },
  { src: "/partners/Bitcoinist.svg", name: "Bitcoinist" },
  { src: "/partners/Newsbtc.svg", name: "NewsBTC" },
  { src: "/partners/cryptopolitan.svg", name: "Cryptopolitan" },
  { src: "/partners/Menafn.svg", name: "MENAFN" },
  { src: "/partners/digital journal.svg", name: "Digital Journal" },
];

// ─── Hero distribution card ───────────────────────────────────────────────────

const OUTLETS = [
  { name: "AP News",           logo: "/partners/ap news.svg",    label: "Published" },
  { name: "Business Insider",  logo: "/partners/bi-logo.svg",    label: "Published" },
  { name: "MarketWatch",       logo: "/partners/marketwatch.svg", label: "Published" },
  { name: "Benzinga",          logo: "/partners/benzinga.svg",    label: "Published" },
  { name: "Google News",       logo: "/partners/Google News.svg", label: "Indexed"   },
];

const REACH_STEPS = ["—", "16M+", "38M+", "54M+", "71M+", "174M+"];

function DistributionCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Animate in each outlet, then hold, then loop
    if (step < OUTLETS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), step === 0 ? 900 : 650);
      return () => clearTimeout(t);
    }
    // Hold 2.8s, then reset and replay
    const t = setTimeout(() => setStep(0), 2800);
    return () => clearTimeout(t);
  }, [step]);

  const progress = step / OUTLETS.length;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
        <div className="flex items-center gap-2">
          <Send className="w-3.5 h-3.5 text-primary" />
          <span className="font-mono text-xs text-white/50 tracking-wide">
            Active Distribution
          </span>
        </div>
        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Live
        </span>
      </div>

      {/* Submitted row */}
      <div className="border-b border-white/5 px-5 py-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">Press release submitted</span>
          <span className="text-xs font-mono text-white/45">just now</span>
        </div>
      </div>

      {/* Outlet rows */}
      <div className="divide-y divide-white/[0.04] px-2 py-1">
        {OUTLETS.map((outlet, i) => (
          <div
            key={outlet.name}
            className={`flex items-center justify-between px-3 py-3 transition-all duration-500 ${
              i < step ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-white/8">
                <img
                  src={outlet.logo}
                  alt={outlet.name}
                  className="h-4 w-auto brightness-0 invert opacity-80"
                />
              </div>
              <span className="text-sm text-white/65">{outlet.name}</span>
            </div>
            <span
              className={`flex items-center gap-1.5 text-[11px] font-semibold ${
                outlet.label === "Indexed" ? "text-primary/80" : "text-emerald-400"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              {outlet.label}
            </span>
          </div>
        ))}

      </div>

      {/* Footer — reach */}
      <div className="border-t border-white/8 bg-primary/[0.06] px-5 py-4">
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs uppercase tracking-wider text-white/50">
            Estimated reach
          </span>
          <span
            className={`font-display text-xl font-black text-white transition-all duration-500 ${
              step > 0 ? "opacity-100" : "opacity-0"
            }`}
          >
            {REACH_STEPS[step]}
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        {step === OUTLETS.length && (
          <p className="mt-2 text-xs text-white/50">
            +295 more outlets distributing…
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomePage() {
  const [pricingView, setPricingView] = useState<"crypto" | "media">("crypto");
  const pricingOptions = pricingView === "crypto" ? CRYPTO_CIRCUITS : MEDIA_CIRCUITS;

  return (
    <>
      {/* ── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 pointer-events-none noise" />
        <div className="absolute top-20 right-0 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative container-ultra-wide mx-auto px-6 py-16 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left — copy */}
            <div>
              <Badge variant="accent">Web3 PR Distribution</Badge>

              <h1 className="mt-6 font-display font-black text-white tracking-[-0.05em] leading-[0.9] text-[clamp(2.8rem,7.5vw,6.5rem)]">
                <span className="block">
                  Start Dominating{" "}
                  <span className="whitespace-nowrap">
                    the <span className="text-primary text-glow-subtle">Narrative</span>
                  </span>
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-xl font-semibold leading-relaxed text-white/60">
                Mainstream Media for Modern Brands
              </p>

              <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/60">
                Your announcements deserve more than social media posts. Get featured on
                AP News, Business Insider, Yahoo Finance, and 1200+ outlets that signal
                real authority to investors, partners, and markets.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-white/55">
                <span className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  Google News Indexed
                </span>
                <span className="flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  Fast Turnaround
                </span>
                <span className="flex items-center gap-2">
                  <Globe2 className="w-3.5 h-3.5 text-primary" />
                  Global Syndication
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <CtaLink href="https://admin.blockchainwire.io/signup" size="large">
                  Submit Press Release
                </CtaLink>
                <CtaLink href="/pricing" variant="outline" size="large">
                  View Solutions
                </CtaLink>
              </div>
            </div>

            {/* Right — distribution card */}
            <div className="hidden lg:block">
              <DistributionCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Partner marquee (seamless dark strip) ─────────────────────── */}
      <div className="overflow-hidden border-t border-white/5 bg-ink py-10">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-white/20">
          As Featured In
        </p>
        <div className="flex animate-marquee items-center gap-16">
          {[...PARTNERS, ...PARTNERS].map((logo, i) => (
            <img
              key={i}
              src={logo.src}
              alt={logo.name}
              className="h-7 w-auto flex-shrink-0 opacity-30 brightness-0 invert transition-opacity hover:opacity-70"
            />
          ))}
        </div>
      </div>

      {/* ── 3. Stats strip ───────────────────────────────────────────────── */}
      <StatRow
        stats={[
          { value: "174M+", label: "Max Monthly Reach" },
          { value: "1200+", label: "Media Outlets" },
          { value: "8", label: "Distribution Tiers" },
          { value: "2h", label: "Min. Turnaround" },
        ]}
      />

      {/* ── 4. Problem → Solution ────────────────────────────────────────── */}
      <section className="relative">
        <div className="container-wide px-6 section-spacing">
          <div className="grid overflow-hidden rounded-3xl border border-ink/10 lg:grid-cols-2">
            {/* Left — problem */}
            <div className="bg-surface p-10 lg:p-14">
              <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
                The Problem
              </span>
              <h2 className="headline-section mt-5 text-ink">
                Visibility isn't{" "}
                <span className="text-primary-dark">enough</span>
              </h2>
              <div className="mt-8 space-y-5">
                <p className="text-lg leading-relaxed text-ink/65">
                  In Web3, attention is temporary. Trust is permanent. Projects that rely
                  solely on social channels and paid promotion struggle to build lasting
                  credibility with investors and partners.
                </p>
                <p className="text-base leading-relaxed text-ink/45">
                  Media placements create third-party validation that compounds over time,
                  signaling legitimacy to anyone who discovers your project.
                </p>
              </div>
            </div>

            {/* Right — before/after */}
            <div className="bg-ink p-10 lg:p-14 flex flex-col justify-center gap-8">
              <div>
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/30">
                  <X className="w-3.5 h-3.5" />
                  Without media distribution
                </div>
                <ul className="space-y-3">
                  {[
                    "Announcements disappear within 24 hours",
                    "Credibility limited to your existing audience",
                    "No presence in search or AI discovery systems",
                    "Trust has to be earned from scratch every time",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/40">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-white/6">
                        <X className="w-2.5 h-2.5" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="h-px bg-white/8" />

              <div>
                <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">
                  <Check className="w-3.5 h-3.5" />
                  With BlockchainWire
                </div>
                <ul className="space-y-3">
                  {[
                    "Indexed coverage that compounds for months",
                    "Third-party validation across 1200+ outlets",
                    "Visibility in search, Google News, and AI responses",
                    "Authority that travels with every new announcement",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                      <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Platform — 4-step feature grid ───────────────────────────── */}
      <section className="bg-surface-alt section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none noise" />
        <div className="absolute -top-24 right-0 h-[500px] w-[500px] rounded-full bg-primary/8 blur-3xl" />

        <div className="relative container-wide px-6">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
              The Platform
            </span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
          <h2 className="headline-section-lg text-ink">
            Built for{" "}
            <span className="text-primary-dark">credibility</span>
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Distribute",
                description:
                  "Launch your announcement across a curated network of crypto, financial, and mainstream media outlets with guaranteed placements.",
                icon: <Radio className="w-7 h-7" />,
              },
              {
                number: "02",
                title: "Validate",
                description:
                  "Appear in environments that signal legitimacy — AP News, Business Insider, MarketWatch — the outlets investors and partners trust.",
                icon: <CheckCircle2 className="w-7 h-7" />,
              },
              {
                number: "03",
                title: "Get Discovered",
                description:
                  "Improve visibility across Google News, search engines, and AI systems trained on authoritative indexed sources.",
                icon: <Search className="w-7 h-7" />,
              },
              {
                number: "04",
                title: "Measure",
                description:
                  "Track placements, estimated reach, and distribution footprint with a structured post-campaign report for every release.",
                icon: <BarChart3 className="w-7 h-7" />,
              },
            ].map((item) => (
              <div key={item.number} className="group">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  {item.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-ink group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/55">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 flex items-center gap-4">
            <CtaLink href="/products">Explore the Platform</CtaLink>
            <CtaLink href="/how-it-works" variant="ghost">
              How It Works <ArrowRight className="ml-1 w-3.5 h-3.5 inline" />
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ── 6. Who We Serve ──────────────────────────────────────────────── */}
      <section className="bg-surface section-spacing-sm">
        <div className="container-wide px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_2fr]">
            <div className="lg:sticky lg:top-28">
              <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
                Who We Serve
              </span>
              <h2 className="headline-section mt-4 text-ink">
                Built for every stage of Web3
              </h2>
              <p className="mt-5 text-ink/55 leading-relaxed">
                From early-stage startups to public companies, BlockchainWire adapts to
                your distribution needs and audience.
              </p>
              <a
                href="/solutions"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:gap-3 transition-all"
              >
                View all solutions <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                {
                  name: "Web3 Startups",
                  icon: <Rocket className="w-5 h-5" />,
                  desc: "Launch with credibility from day one",
                  href: "/solutions#startups",
                },
                {
                  name: "Agencies",
                  icon: <Building2 className="w-5 h-5" />,
                  desc: "Scale client distribution without friction",
                  href: "/solutions#agencies",
                },
                {
                  name: "Exchanges",
                  icon: <ArrowLeftRight className="w-5 h-5" />,
                  desc: "Announce listings with authority",
                  href: "/solutions#exchanges",
                },
                {
                  name: "Public Companies",
                  icon: <TrendingUp className="w-5 h-5" />,
                  desc: "Structured investor communications",
                  href: "/solutions#public-companies",
                },
                {
                  name: "Token Launches",
                  icon: <Coins className="w-5 h-5" />,
                  desc: "Maximize visibility at launch",
                  href: "/solutions#token-launches",
                },
                {
                  name: "Events & Partnerships",
                  icon: <Gem className="w-5 h-5" />,
                  desc: "Amplify key announcements",
                  href: "/solutions#events-partnerships",
                },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group rounded-2xl border border-ink/10 bg-white p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold text-ink group-hover:text-primary transition-colors text-sm">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-xs text-ink/45 leading-snug">{item.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Pricing preview ───────────────────────────────────────────── */}
      <section className="bg-surface-alt section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none noise" />
        <div className="container-wide px-6 relative">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-mono text-xs uppercase tracking-widest text-primary/60">
              Pricing
            </span>
            <div className="h-px flex-1 bg-ink/8" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <h2 className="headline-section text-ink">
              Distribution packages{" "}
              <span className="text-primary-dark">for every stage</span>
            </h2>
            {/* Toggle */}
            <div className="inline-flex flex-shrink-0 rounded-2xl border border-ink/10 bg-surface p-1">
              <button
                onClick={() => setPricingView("crypto")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                  pricingView === "crypto"
                    ? "bg-ink text-white shadow-subtle"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                Crypto Circuits
              </button>
              <button
                onClick={() => setPricingView("media")}
                className={`rounded-xl px-5 py-2.5 text-xs font-bold uppercase tracking-wide transition-all duration-200 ${
                  pricingView === "media"
                    ? "bg-ink text-white shadow-subtle"
                    : "text-ink/50 hover:text-ink"
                }`}
              >
                Media Circuits
              </button>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pricingOptions.map((plan) =>
              plan.highlight ? (
                /* Highlighted card — dark */
                <div
                  key={plan.name}
                  className="relative rounded-3xl bg-ink p-7 border-2 border-primary/40"
                >
                  <div className="absolute -top-3 left-7">
                    <span className="rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                      Best Value
                    </span>
                  </div>
                  <h3 className="mt-2 text-xl font-display font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="mt-4 text-4xl font-display font-black text-white">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-white/30">
                    {plan.subtitle}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-white/55">
                    {plan.summary}
                  </p>
                  <div className="mt-7">
                    <CtaLink href="/pricing" className="w-full justify-center">
                      Select Package
                    </CtaLink>
                  </div>
                </div>
              ) : (
                /* Standard card — light */
                <div
                  key={plan.name}
                  className="relative rounded-3xl border border-ink/10 bg-white p-7 transition-shadow hover:shadow-md"
                >
                  {(plan as any).popular && (
                    <div className="absolute -top-3 left-7">
                      <span className="rounded-full border border-ink/15 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-ink/60">
                        Popular
                      </span>
                    </div>
                  )}
                  <h3 className="text-xl font-display font-bold text-ink">{plan.name}</h3>
                  <p className="mt-4 text-4xl font-display font-black text-ink">
                    {plan.price}
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-ink/35">
                    {plan.subtitle}
                  </p>
                  <p className="mt-5 text-sm leading-relaxed text-ink/55">{plan.summary}</p>
                  <div className="mt-7">
                    <CtaLink href="/pricing" variant="outline" className="w-full justify-center">
                      Select Package
                    </CtaLink>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-ink/40">
              Also available:{" "}
              <a href="/bespoke" className="font-medium text-ink/60 hover:text-primary-dark transition-colors">
                BeSpoke™ custom campaigns for tailored distribution →
              </a>
            </p>
            <a href="/pricing" className="text-sm font-semibold text-primary-dark hover:underline">
              Compare all packages →
            </a>
          </div>
        </div>
      </section>

      {/* ── 8. Stats + CTA (dark, combined) ──────────────────────────────── */}
      <section className="bg-ink section-spacing relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none noise opacity-25" />
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />

        <div className="relative container-wide px-6">
          {/* Stats */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-b border-white/8 pb-20">
            {[
              { value: "174M+", label: "Max Monthly Reach", desc: "Premium circuit audience" },
              { value: "1200+", label: "Media Outlets", desc: "Across crypto & finance" },
              { value: "100%", label: "Search Indexed", desc: "Google News guaranteed" },
              { value: "2h", label: "Min. Turnaround", desc: "From submission to live" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="headline-section text-primary text-glow-subtle">
                  {stat.value}
                </div>
                <div className="mt-3 text-base font-semibold text-white">{stat.label}</div>
                <div className="mt-1 text-xs text-white/35 uppercase tracking-wider">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-20 text-center">
            <h2 className="headline-cta text-white">
              Ready to be seen—and{" "}
              <span className="text-primary text-glow-subtle">trusted</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/50">
              Start distributing your announcements through a network built for
              visibility, credibility, and lasting discovery.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <CtaLink href="https://admin.blockchainwire.io/signup" size="large">
                Get Started
              </CtaLink>
              <CtaLink href="/pricing" variant="outline" size="large">
                View Pricing
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
