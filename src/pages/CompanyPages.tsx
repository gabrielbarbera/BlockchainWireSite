import { CtaLink, PageHero, SectionDark, StatRow, Card } from "../components/ui";

type CompanyPageData = {
  path: string;
  navTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  sectionTitle: string;
  sectionItems: string[];
  extraTitle?: string;
  extraText?: string;
  ctaTitle?: string;
  ctaButton?: string;
  ctaHref?: string;
};

export const COMPANY_PAGES: CompanyPageData[] = [
  {
    path: "/company/about",
    navTitle: "About",
    heroTitle: "Built for Visibility, Designed for Credibility",
    heroSubtitle:
      "A distribution platform focused on connecting announcements with the media channels that matter.",
    intro:
      "BlockchainWire was created to address a gap in the market. Many distribution platforms prioritize volume over placement quality, resulting in announcements that are published but not truly seen. We take a different approach-focusing on structured distribution, targeted reach, and credible placement environments.",
    sectionTitle: "What We Do",
    sectionItems: [
      "Distribution across curated media circuits",
      "Access to crypto, financial, and mainstream platforms",
      "Structured delivery aligned with announcement goals",
      "Visibility across search and AI-driven systems",
    ],
    extraTitle: "Positioning",
    extraText:
      "We are not a traditional PR agency. BlockchainWire operates as a distribution infrastructure layer-enabling organizations to publish, position, and track their announcements with clarity and consistency.",
    ctaTitle: "Explore Our Products",
    ctaButton: "View Products",
    ctaHref: "/products",
  },
  {
    path: "/company/media-network",
    navTitle: "Media Network",
    heroTitle: "A Curated Media Network",
    heroSubtitle:
      "Your announcements are distributed across platforms that influence markets, media, and discovery systems.",
    intro:
      "Our network is structured to balance reach, relevance, and credibility. It includes crypto-native publications, financial media, and global syndication channels.",
    sectionTitle: "Network Breakdown",
    sectionItems: [
      "Crypto Media - Focused exposure within the digital asset ecosystem.",
      "Financial Media - Access to investor-facing and market-oriented platforms.",
      "Global Syndication - Broad distribution across international media channels.",
      "Search & Indexing - Visibility across Google News and other discovery systems.",
    ],
    extraTitle: "Why It Matters",
    extraText:
      "Distribution is not just about reach-it is about where your message appears. Placement in recognized environments strengthens credibility and increases long-term visibility.",
    ctaTitle: "View Distribution Packages",
    ctaButton: "Pricing",
    ctaHref: "/pricing",
  },
  {
    path: "/company/contact",
    navTitle: "Contact",
    heroTitle: "Get in Touch",
    heroSubtitle:
      "Speak with our team about distribution packages, custom campaigns, or partnership opportunities.",
    intro:
      "Whether you are launching your first announcement or managing ongoing distribution, we are here to support your needs.",
    sectionTitle: "Contact Options",
    sectionItems: [
      "General Inquiries: Questions about packages and process",
      "Sales & Distribution: Guidance on selecting the right package",
      "Custom Campaign: Ask about BeSpoke™",
    ],
  },
  {
    path: "/company/faq",
    navTitle: "FAQ",
    heroTitle: "Frequently Asked Questions",
    heroSubtitle:
      "Answers to common questions about distribution, placements, and process.",
    intro:
      "Review common operational questions from teams evaluating structured distribution and placement options.",
    sectionTitle: "Questions",
    sectionItems: [
      "How does distribution work? Your press release is distributed across selected media circuits based on the package you choose.",
      "Are placements guaranteed? Yes. Each package includes guaranteed placement across specified media outlets.",
      "How long does distribution take? Turnaround time varies by package, with premium options offering faster delivery.",
      "Can I customize my distribution? Yes. BeSpoke™ allows for tailored distribution strategies.",
      "Will my release appear on Google News? Select packages include Google News indexing as part of distribution.",
      "Do you offer international distribution? Yes. International circuits are available upon request.",
      "Can I choose specific publications? In standard packages, placements are predefined. Custom options allow more control.",
    ],
    ctaTitle: "Still Have Questions?",
    ctaButton: "Contact Us",
    ctaHref: "/company/contact",
  },
  {
    path: "/company/legal",
    navTitle: "Legal",
    heroTitle: "Legal & Compliance",
    heroSubtitle:
      "Important information regarding the use of our platform and services.",
    intro:
      "Review foundational legal and compliance information related to platform usage and distribution operations.",
    sectionTitle: "Sections",
    sectionItems: [
      "Terms of Service - Defines usage of the platform and distribution services.",
      "Privacy Policy - Explains how user data is collected and managed.",
      "Disclaimer - Outlines limitations of liability and content responsibility.",
    ],
    extraTitle: "Note",
    extraText:
      "All press releases are provided by clients. BlockchainWire does not verify the accuracy of submitted content.",
  },
];

export function CompanyOverviewPage() {
  return (
    <main>
      <PageHero
        badge="Company"
        title="Infrastructure for Modern Media Distribution"
        subtitle="BlockchainWire provides structured distribution across crypto, financial, and global media-helping organizations increase visibility, strengthen credibility, and improve discoverability. As digital markets evolve, the way information is distributed-and discovered-has fundamentally changed. BlockchainWire was built to support this shift."
      />

      <StatRow stats={[
        { value: "2024", label: "Founded" },
        { value: "1200+", label: "Media Partners" },
        { value: "50+", label: "Countries" },
        { value: "2h", label: "Min. Turnaround" },
      ]} />

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-[-0.04em]">
            Core Principles
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Structured Distribution",
                "Clear, predictable placement across defined media circuits.",
              ],
              [
                "Credibility First",
                "Focus on environments that reinforce trust and authority.",
              ],
              [
                "Discoverability",
                "Optimized for search engines and AI-driven systems.",
              ],
              [
                "Consistency",
                "Reliable outcomes across announcements and campaigns.",
              ],
            ].map(([title, body]) => (
              <Card key={title}>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-ink/70">{body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {COMPANY_PAGES.map((item) => (
              <Card key={item.path} hover className="block">
                <a href={item.path}>
                  <h3 className="text-xl font-semibold">{item.navTitle}</h3>
                  <p className="mt-2 text-sm text-ink/70">{item.heroSubtitle}</p>
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDark title="Learn More About Our Network">
        <div className="mt-8">
          <CtaLink href="/company/contact">Contact Us</CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}

export function CompanyDetailPage({ path }: { path: string }) {
  const page = COMPANY_PAGES.find((item) => item.path === path);
  if (!page) return null;

  return (
    <main>
      <PageHero title={page.heroTitle} subtitle={page.heroSubtitle} />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-6 lg:grid-cols-2">
          <Card>
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-3 text-ink/70">{page.intro}</p>
          </Card>
          <Card>
            <h2 className="text-xl font-semibold">{page.sectionTitle}</h2>
            <ul className="mt-3 space-y-2 text-ink/70">
              {page.sectionItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {path === "/company/contact" && (
        <section className="bg-slate-50 border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
              <Card>
               <h2 className="text-xl font-semibold">Inquiry Form</h2>
               <form className="mt-4 grid gap-4 md:grid-cols-2">
                 <input className="rounded-xl border border-ink/15 px-4 py-3" placeholder="Name" />
                 <input className="rounded-xl border border-ink/15 px-4 py-3" placeholder="Email" />
                 <input className="rounded-xl border border-ink/15 px-4 py-3" placeholder="Company" />
                 <input className="rounded-xl border border-ink/15 px-4 py-3" placeholder="Inquiry Type" />
                 <textarea
                   className="rounded-xl border border-ink/15 px-4 py-3 md:col-span-2 min-h-28"
                   placeholder="Message"
                 />
                 <div className="md:col-span-2">
                   <CtaLink href="mailto:info@blockchainwire.io">Send Inquiry</CtaLink>
                 </div>
               </form>
             </Card>
          </div>
        </section>
      )}

      {page.extraTitle && page.extraText && (
        <section className="bg-slate-50 border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Card accent>
              <h2 className="text-xl font-semibold">{page.extraTitle}</h2>
              <p className="mt-3 text-ink/70">{page.extraText}</p>
            </Card>
          </div>
        </section>
      )}

      {page.ctaTitle && page.ctaButton && page.ctaHref && (
        <SectionDark title={page.ctaTitle}>
          <div className="mt-8">
            <CtaLink href={page.ctaHref}>{page.ctaButton}</CtaLink>
          </div>
        </SectionDark>
      )}
    </main>
  );
}

