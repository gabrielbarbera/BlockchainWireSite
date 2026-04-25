import { CtaLink, PageHero, SectionDark, StatRow, Card } from "../components/ui";
import { CheckCircle, BarChart3, Quote, FileSearch } from "lucide-react";

type ResultsPageData = {
  path: string;
  navTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  sectionsTitle: string;
  sections: string[];
  whyItMatters?: string;
  ctaTitle: string;
  ctaButton: string;
  ctaHref: string;
};

export const RESULTS_PAGES: ResultsPageData[] = [
  {
    path: "/results/case-studies",
    navTitle: "Case Studies",
    heroTitle: "Distribution That Drives Visibility",
    heroSubtitle:
      "Explore how teams use BlockchainWire to extend reach, improve credibility, and increase discoverability.",
    intro:
      "Each announcement has a different objective-launch, funding, partnership, or market positioning. Our distribution system is designed to support each of these moments with structured, measurable outcomes.",
    sectionsTitle: "Case Structure",
    sections: [
      "[Project Name]",
      "Objective: Launch a new product, announce funding, or expand visibility",
      "Challenge: Limited reach beyond existing audience and low visibility in media and search",
      "Solution: Distribution across crypto and financial circuits with placement across high-authority publications",
      "Results: 120+ media placements",
      "Results: Coverage across crypto and financial outlets",
      "Results: Indexed visibility across Google News",
      "Results: Increased discoverability across search and AI",
    ],
    ctaTitle: "Launch Your Own Distribution Campaign",
    ctaButton: "Get Started",
    ctaHref: "https://admin.blockchainwire.io/signup",
  },
  {
    path: "/results/media-placements",
    navTitle: "Media Placements",
    heroTitle: "Where Your Announcements Appear",
    heroSubtitle:
      "A curated network of crypto, financial, and global media platforms.",
    intro:
      "Placement matters. Your announcement is distributed across platforms that shape perception-ranging from crypto-native publications to financial media and global syndication channels.",
    sectionsTitle: "Placement Categories",
    sections: [
      "Crypto Media: Cryptopolitan, HackerNoon, AMB Crypto, The Defiant, DailyCoin",
      "Financial Media: Benzinga, MarketWatch, Business Insider, Barchart",
      "Global Syndication: Associated Press, Google News indexed platforms, EIN Presswire, MENAFN",
      "All placements are based on selected distribution circuits and package configuration.",
    ],
    ctaTitle: "View Distribution Packages",
    ctaButton: "View Pricing",
    ctaHref: "/pricing",
  },
  {
    path: "/results/testimonials",
    navTitle: "Testimonials",
    heroTitle: "Trusted by Teams Across Web3",
    heroSubtitle:
      "From early-stage startups to established platforms, teams rely on BlockchainWire for structured distribution.",
    intro:
      "Distribution is only valuable if it delivers consistent results. Our clients use BlockchainWire to ensure their announcements are seen, indexed, and positioned in the right environments.",
    sectionsTitle: "Client Feedback",
    sections: [
      '[Client Name / Company] "BlockchainWire helped us extend our reach beyond our core audience. The placements gave us visibility across both crypto and financial media."',
      '[Client Name / Company] "The process was structured and predictable. We knew exactly what to expect, and the distribution delivered as promised."',
      '[Client Name / Company] "Our announcements gained significantly more visibility compared to previous campaigns."',
    ],
    ctaTitle: "Start Your First Distribution",
    ctaButton: "Get Started",
    ctaHref: "https://admin.blockchainwire.io/signup",
  },
  {
    path: "/results/sample-reports",
    navTitle: "Sample Reports",
    heroTitle: "Clear Reporting. Measurable Outcomes.",
    heroSubtitle:
      "Understand how your announcement performs across placements, reach, and visibility.",
    intro:
      "Every distribution includes structured reporting designed to give you visibility into where your announcement appeared and how it performed.",
    sectionsTitle: "What's Included",
    sections: [
      "Placement Coverage: List of publications where your release was distributed",
      "Estimated Reach: Combined audience exposure across placements",
      "Distribution Footprint: Overview of media categories (crypto, financial, syndication)",
      "Visibility Indicators: Signals related to indexing and discoverability",
      "Optional UI modules: sample report screenshot, dashboard preview, placement list",
    ],
    whyItMatters:
      "Measurement enables improvement. Understanding performance helps refine future distribution strategies and optimize outcomes.",
    ctaTitle: "View a Sample Report",
    ctaButton: "Download / View",
    ctaHref: "/results",
  },
];

export function ResultsOverviewPage() {
  return (
    <main>
      <PageHero
        badge="Results"
        title="Proof of Visibility, Not Promises"
        subtitle="Explore real distribution outcomes across crypto, financial, and global media-designed to increase visibility, strengthen credibility, and expand reach. Effective distribution is measurable. From media placements to reach and visibility across search and AI systems, BlockchainWire provides structured outcomes that go beyond simple publication."
      />

      <StatRow stats={[
        { value: "1200+", label: "Media Outlets" },
        { value: "50M+", label: "Total Reach" },
        { value: "2h", label: "Min. Turnaround" },
        { value: "100%", label: "Guaranteed Placements" },
      ]} />

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-4 md:grid-cols-2">
            {RESULTS_PAGES.map((item) => (
              <a key={item.path} href={item.path}>
                <Card hover className="block">
                  <h2 className="text-2xl font-semibold">{item.navTitle}</h2>
                  <p className="mt-2 text-sm text-ink/70">
                    {item.heroSubtitle}
                  </p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-[-0.04em]">
            Recent Announcements
          </h2>
          <p className="mt-3 text-ink/70">
            Curated examples showing ongoing distribution activity.
          </p>
          <div className="mt-6 overflow-hidden rounded-3xl border border-ink/10">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.18em] text-ink/70">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Sample Placement</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Product Launch Update", "Project Alpha", "2026-03-08", "Benzinga"],
                  ["Ecosystem Partnership", "NodeWorks", "2026-03-05", "Cryptopolitan"],
                  ["Expansion Announcement", "ChainAxis", "2026-03-02", "Business Insider"],
                ].map(([title, company, date, placement]) => (
                  <tr key={`${title}-${company}`} className="border-t border-ink/10">
                    <td className="px-4 py-3 font-medium">{title}</td>
                    <td className="px-4 py-3 text-ink/70">{company}</td>
                    <td className="px-4 py-3 text-ink/70">{date}</td>
                    <td className="px-4 py-3">{placement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <SectionDark title="See How Distribution Performs">
        <div className="mt-8">
          <CtaLink href="https://admin.blockchainwire.io/signup">Get Started</CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}

export function ResultDetailPage({ path }: { path: string }) {
  const page = RESULTS_PAGES.find((item) => item.path === path);
  if (!page) return null;

  return (
    <main>
      <PageHero title={page.heroTitle} subtitle={page.heroSubtitle} />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-6 lg:grid-cols-2">
          <Card className="shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-ink/70">{page.intro}</p>
          </Card>
          <Card className="shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl font-semibold">{page.sectionsTitle}</h2>
            <ul className="mt-3 space-y-2 text-ink/70">
              {page.sections.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {page.whyItMatters && (
        <section className="bg-slate-50 border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Card className="shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
              <h2 className="text-xl font-semibold">Why It Matters</h2>
              <p className="mt-3 text-ink/70">{page.whyItMatters}</p>
            </Card>
          </div>
        </section>
      )}

      <SectionDark title={page.ctaTitle}>
        <div className="mt-8">
          <CtaLink href={page.ctaHref}>{page.ctaButton}</CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}

