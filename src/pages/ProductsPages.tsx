import { CtaLink, PageHero, SectionDark, Card, StatRow } from "../components/ui";
import { Send, Globe2, Search, FileText, BarChart3, Settings2, Check } from "lucide-react";

type ProductData = {
  id: string;
  navTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  listTitle: string;
  listItems: string[];
  whyItMatters: string;
  icon: React.ReactNode;
};

const PRODUCTS: ProductData[] = [
  {
    id: "press-release-distribution",
    navTitle: "Press Release Distribution",
    heroTitle: "Launch Your Announcement With Precision",
    heroSubtitle:
      "Distribute your press release across a structured network of crypto, financial, and mainstream media outlets—guaranteed placements, predictable delivery.",
    overview:
      "BlockchainWire provides a streamlined distribution system designed to deliver consistent, high-quality placements across relevant publications. Each release is deployed across curated circuits—ranging from targeted crypto-native networks to broad financial and mainstream channels—ensuring your announcement reaches the audiences that matter.",
    listTitle: "What You Get",
    listItems: [
      "Guaranteed placement across your selected media circuit",
      "Distribution across crypto-native platforms, financial outlets, and syndication networks",
      "Google News indexing included with every distribution",
      "Structured delivery aligned with your chosen package tier",
      "Fast turnaround—most releases distributed within 2 hours",
    ],
    whyItMatters:
      "Distribution is not just about publishing—it's about placement in environments that signal credibility. A release on a recognized platform carries inherent authority that self-published content and social posts simply cannot replicate. That authority compounds over time as indexed coverage continues to surface in search and AI results.",
    icon: <Send className="w-6 h-6" />,
  },
  {
    id: "media-network",
    navTitle: "Media Network",
    heroTitle: "A Network Built for Reach and Credibility",
    heroSubtitle:
      "Access a curated ecosystem spanning 1200+ crypto, financial, and global media platforms—from targeted niche publications to outlets reaching 174M+ monthly readers.",
    overview:
      "BlockchainWire connects your announcements to a structured media network designed to maximize visibility across relevant audiences. Circuits range from focused crypto-native placements to high-authority financial and mainstream outlets. Every outlet in the network is vetted for relevance, credibility, and indexing quality.",
    listTitle: "Network Categories",
    listItems: [
      "Crypto Media — 36+ crypto-native sites including BitcoinWorld, CoinChapter, AMB Crypto, Cryptopolitan",
      "Financial Media — Associated Press, Benzinga, Business Insider, MarketWatch, Street Insider",
      "Syndication Channels — EIN Presswire, BizWire Express, MENAFN, and aggregated networks",
      "Search Indexing — Google News indexing across all distributed placements",
    ],
    whyItMatters:
      "Where your announcement appears shapes how it is perceived. Placement on recognized platforms reinforces credibility and extends reach beyond your immediate audience—creating indexed impressions that persist long after the initial publish date and continue surfacing in search and AI-generated responses.",
    icon: <Globe2 className="w-6 h-6" />,
  },
  {
    id: "ai-search-visibility",
    navTitle: "AI & Search Visibility",
    heroTitle: "Be Seen Where Search and AI Look",
    heroSubtitle:
      "Improve discoverability across search engines and AI systems—both of which increasingly rely on authoritative, indexed media sources.",
    overview:
      "Modern discovery is no longer limited to search engines. AI systems increasingly rely on structured, authoritative content to generate responses and surface information. BlockchainWire ensures your announcements are distributed through the trusted publications these systems reference—giving your content a structural advantage over content published in isolation.",
    listTitle: "Key Benefits",
    listItems: [
      "Google News indexing across all distributed placements",
      "Greater likelihood of appearing in AI-generated responses and summaries",
      "Long-term discoverability that extends well beyond your launch date",
      "Content distributed through high-authority sources AI systems actively reference",
    ],
    whyItMatters:
      "Visibility is no longer just about impressions—it's about presence in the systems that shape perception and decision-making. As AI tools increasingly cite authoritative media sources when generating answers, content placed through recognized outlets has a compounding structural advantage over content that exists only on owned channels.",
    icon: <Search className="w-6 h-6" />,
  },
  {
    id: "editorial-optimization",
    navTitle: "Editorial & Optimization",
    heroTitle: "Refine Your Message Before It's Distributed",
    heroSubtitle:
      "Ensure your press release is clear, structured, and built to perform—both with media editors and the algorithms that determine discoverability.",
    overview:
      "Well-written announcements perform better with media platforms, search systems, and readers. BlockchainWire's editorial support improves clarity, structure, and positioning before your release is distributed. Available as an add-on to any distribution package, it's particularly valuable for complex announcements, non-native English content, or time-sensitive releases where quality cannot be compromised.",
    listTitle: "What We Focus On",
    listItems: [
      "Headline clarity and positioning for maximum editorial impact",
      "Structure and readability aligned with media publication standards",
      "Messaging alignment with your brand voice and announcement objectives",
      "Optimization for search indexing and AI discoverability",
      "Boilerplate and quote review for tone and accuracy",
    ],
    whyItMatters:
      "Even strong announcements can underperform if not structured correctly. Optimization ensures your message is understood, retained, and amplified—both by human readers scanning headlines and the algorithms that determine whether your content surfaces in search results and AI-generated responses.",
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: "analytics-reporting",
    navTitle: "Analytics & Reporting",
    heroTitle: "Track What Matters",
    heroSubtitle:
      "Measure placements, reach, and distribution footprint with structured post-campaign reporting—delivered after every release.",
    overview:
      "Understanding how your announcement performs is critical to refining your distribution strategy over time. BlockchainWire provides a structured post-campaign report for every distribution, covering placement confirmation, estimated audience reach, and channel-by-channel visibility—giving you a clear, documented record of your distribution footprint.",
    listTitle: "What You Can Track",
    listItems: [
      "Confirmed placement list across all distributed outlets",
      "Estimated audience reach by circuit and channel",
      "Media distribution footprint with outlet-level breakdown",
      "Google News and search indexing confirmation",
      "Delivered as a structured report within 48 hours of distribution",
    ],
    whyItMatters:
      "Distribution without measurement limits your ability to improve. Clear post-campaign reporting enables better decisions—helping you identify which circuits drive the most visibility, compare performance across releases, and build a distribution strategy that compounds over time rather than starting fresh with every announcement.",
    icon: <BarChart3 className="w-6 h-6" />,
  },
  {
    id: "custom-campaigns",
    navTitle: "Custom Campaigns",
    heroTitle: "Build a Custom Distribution Strategy",
    heroSubtitle:
      "Tailor your media distribution based on specific audience, geography, and announcement type—when standard packages aren't the right fit.",
    overview:
      "Not every announcement fits into a predefined circuit. BeSpoke™ allows you to build a custom distribution strategy designed around your specific objectives—selecting media outlets, geographies, and coverage types based on what your announcement actually requires. Ideal for high-stakes launches, international campaigns, or announcements that need combined crypto and financial coverage.",
    listTitle: "Options Include",
    listItems: [
      "Custom media outlet selection by niche, audience, or geography",
      "Targeted regional and international distribution circuits",
      "Combined crypto + financial coverage bundles",
      "High-authority placement prioritization",
      "Dedicated campaign coordination and timeline management",
    ],
    whyItMatters:
      "Complex announcements require precision—not generic distribution. BeSpoke™ campaigns are built around your specific objectives, audience, and geography—delivering placements that standard packages simply cannot achieve. For major launches, acquisitions, or international expansion announcements, the difference between standard and custom distribution is measurable.",
    icon: <Settings2 className="w-6 h-6" />,
  },
];

export function ProductsPage() {
  return (
    <main>
      <PageHero
        badge="Products"
        title="A Distribution System Built for Modern Media"
        subtitle="From distribution to discoverability, BlockchainWire provides the infrastructure needed to launch, amplify, and measure your announcements across crypto, financial, and global media."
      >
        <nav className="mt-8 flex flex-wrap gap-2">
          {PRODUCTS.map((p) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all duration-200"
            >
              {p.navTitle}
            </a>
          ))}
        </nav>
      </PageHero>

      <StatRow
        stats={[
          { value: "174M+", label: "Max Monthly Reach" },
          { value: "1200+", label: "Media Outlets" },
          { value: "8", label: "Distribution Tiers" },
          { value: "2h", label: "Min. Turnaround" },
        ]}
      />

      {PRODUCTS.map((p, i) => (
        <section
          key={p.id}
          id={p.id}
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
                  {p.navTitle}
                </span>
              </div>
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {p.icon}
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-display font-black uppercase tracking-[-0.04em] leading-[0.9]">
                    {p.heroTitle}
                  </h2>
                  <p className="mt-4 max-w-2xl text-ink/55 text-base sm:text-lg leading-relaxed">
                    {p.heroSubtitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Content cards */}
            <div className="grid gap-5 lg:grid-cols-2">
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  Overview
                </h3>
                <p className="text-ink/65 leading-relaxed text-[0.9375rem]">{p.overview}</p>
              </Card>
              <Card>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-ink/35 mb-4">
                  {p.listTitle}
                </h3>
                <ul className="space-y-3">
                  {p.listItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink/65 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Why It Matters — dark banner */}
            <div className="mt-5 rounded-3xl bg-ink p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none noise opacity-20" />
              <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative">
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Why It Matters
                </span>
                <p className="mt-4 text-xl sm:text-2xl font-display font-bold text-white leading-snug max-w-3xl">
                  {p.whyItMatters}
                </p>
              </div>
            </div>
          </div>

          {i === 2 && (
            <SectionDark
              title="One Platform. Complete Visibility."
              subtitle="Distribution, media access, editorial support, analytics, and custom campaigns—all in one integrated system."
              className="!py-14 sm:!py-16"
            />
          )}
        </section>
      ))}

      <SectionDark title="Explore the Platform">
        <div className="mt-8 flex flex-wrap gap-3">
          <CtaLink href="https://admin.blockchainwire.io/signup">Get Started</CtaLink>
          <CtaLink href="/pricing" variant="outline">
            View Pricing
          </CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}
