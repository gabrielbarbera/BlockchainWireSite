import { CtaLink, PageHero, SectionDark, StatRow, Card } from "../components/ui";

type ResourcePageData = {
  path: string;
  navTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  intro: string;
  sectionTitle: string;
  sectionItems: string[];
  extraTitle?: string;
  extraItems?: string[];
  whyItMatters?: string;
  ctaTitle: string;
  ctaButton: string;
  ctaHref: string;
};

export const RESOURCE_PAGES: ResourcePageData[] = [
  {
    path: "/resources/press-release-guide",
    navTitle: "Press Release Guide",
    heroTitle: "How to Write a Press Release That Performs",
    heroSubtitle:
      "Structure your announcement for clarity, credibility, and distribution across media platforms.",
    intro:
      "A well-written press release increases the likelihood of placement, improves readability, and enhances discoverability across search and AI systems.",
    sectionTitle: "Structure",
    sectionItems: [
      "Headline: Clear, specific, and informative. Avoid vague or overly promotional language.",
      "Subheadline: Add context and expand on the core message.",
      "Opening Paragraph: Summarize the key announcement immediately.",
      "Body: Provide details, context, and supporting information.",
      "Quotes: Include statements that add credibility and perspective.",
      "Closing: Reinforce the announcement and provide next steps.",
    ],
    extraTitle: "What to Avoid",
    extraItems: [
      "Overly promotional language",
      "Lack of clear structure",
      "Missing key details",
      "Unverifiable claims",
    ],
    whyItMatters:
      "Well-structured releases perform better across media platforms, search engines, and AI-generated summaries.",
    ctaTitle: "Download a Template",
    ctaButton: "View Templates",
    ctaHref: "/resources/templates",
  },
  {
    path: "/resources/templates",
    navTitle: "Templates",
    heroTitle: "Press Release Templates for Common Use Cases",
    heroSubtitle:
      "Use structured templates designed for clarity, consistency, and distribution performance.",
    intro:
      "Templates help ensure your announcement follows a format that media platforms and readers expect.",
    sectionTitle: "Template List",
    sectionItems: [
      "Product Launch Template - For announcing new products or features.",
      "Funding Announcement Template - For venture rounds, raises, and capital events.",
      "Partnership Announcement Template - For collaborations and integrations.",
      "Token Launch Template - For TGE and public token releases.",
      "Exchange Listing Template - For listing announcements.",
    ],
    extraTitle: "How to Use",
    extraItems: [
      "Replace placeholders with your content",
      "Keep structure intact",
      "Maintain clarity and brevity",
    ],
    ctaTitle: "Use a Template for Your Next Release",
    ctaButton: "Download Templates",
    ctaHref: "/resources",
  },
  {
    path: "/resources/best-practices",
    navTitle: "Best Practices",
    heroTitle: "Best Practices for Effective Distribution",
    heroSubtitle:
      "Understand what improves placement, visibility, and long-term discoverability.",
    intro:
      "Distribution outcomes depend on more than just where your announcement is published. Structure, timing, and positioning all influence performance.",
    sectionTitle: "Key Practices",
    sectionItems: [
      "Clarity Over Hype - Clear messaging performs better than promotional language.",
      "Timing Matters - Align announcements with key events, launches, or market activity.",
      "Consistency Builds Credibility - Repeated exposure across media strengthens perception.",
      "Choose the Right Distribution Tier - Match your distribution level to the importance of the announcement.",
      "Think Beyond Immediate Reach - Consider long-term visibility across search and AI systems.",
    ],
    ctaTitle: "Apply Best Practices to Your Next Launch",
    ctaButton: "Get Started",
    ctaHref: "/auth/signup",
  },
  {
    path: "/resources/newsroom",
    navTitle: "Newsroom",
    heroTitle: "Latest Announcements and Media Activity",
    heroSubtitle:
      "Stay updated with recent distributions, platform updates, and media trends.",
    intro:
      "The media landscape evolves quickly. Our newsroom provides updates on distribution activity, new media partnerships, and relevant industry developments.",
    sectionTitle: "Content Types",
    sectionItems: [
      "Recent press releases",
      "Platform updates",
      "Distribution insights",
      "Media network changes",
    ],
    ctaTitle: "Explore Recent Activity",
    ctaButton: "View Newsroom",
    ctaHref: "/resources/newsroom",
  },
  {
    path: "/resources/industry-news",
    navTitle: "Industry News",
    heroTitle: "Insights Across Crypto, Finance, and Media",
    heroSubtitle:
      "Curated updates on the trends shaping distribution, visibility, and digital communication.",
    intro:
      "Understanding the broader landscape helps inform better distribution strategies. We track developments across crypto and Web3, financial markets, media and publishing, and search and AI systems.",
    sectionTitle: "Article Types",
    sectionItems: [
      "Market trends",
      "Media distribution changes",
      "Search and AI visibility shifts",
      "Industry analysis",
    ],
    ctaTitle: "Stay Informed",
    ctaButton: "View Articles",
    ctaHref: "/resources/industry-news",
  },
];

export function ResourcesOverviewPage() {
  return (
    <main>
      <PageHero
        badge="Resources"
        title="Resources for Better Distribution"
        subtitle="Guides, templates, and insights to help you write, launch, and optimize press releases for maximum visibility and credibility. Strong distribution starts with strong inputs."
      />

      <StatRow stats={[
        { value: "5+", label: "Guides" },
        { value: "3", label: "Templates" },
        { value: "24/7", label: "Support" },
        { value: "Free", label: "Access" },
      ]} />

      <section className="bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {RESOURCE_PAGES.map((item) => (
              <a
                key={item.path}
                href={item.path}
              >
                <Card hover className="block">
                  <h2 className="text-xl font-semibold">{item.navTitle}</h2>
                  <p className="mt-2 text-sm text-ink/70">{item.heroSubtitle}</p>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase tracking-[-0.04em]">
            Distribution Playbooks
          </h2>
          <p className="mt-3 text-ink/70">
            High-impact additions for deeper resource coverage and stronger SEO
            authority.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              "How to Launch a Token Announcement",
              "How to Announce a Partnership",
              "How to Maximize Media Coverage",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-ink/10 bg-slate-50 p-5"
              >
                <h3 className="font-semibold">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDark title="Start With the Fundamentals">
        <div className="mt-8">
          <CtaLink href="/auth/signup">Get Started</CtaLink>
        </div>
      </SectionDark>
    </main>
  );
}

export function ResourceDetailPage({ path }: { path: string }) {
  const page = RESOURCE_PAGES.find((item) => item.path === path);
  if (!page) return null;

  return (
    <main>
      <PageHero title={page.heroTitle} subtitle={page.heroSubtitle} />

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16 grid gap-6 lg:grid-cols-2">
          <article>
            <Card>
              <h2 className="text-xl font-semibold">Overview</h2>
              <p className="mt-3 text-ink/70">{page.intro}</p>
            </Card>
          </article>
          <article>
            <Card accent>
              <h2 className="text-xl font-semibold">{page.sectionTitle}</h2>
              <ul className="mt-3 space-y-2 text-ink/70">
                {page.sectionItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </article>
        </div>
      </section>

      {page.extraTitle && page.extraItems && (
        <section className="bg-slate-50 border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Card>
              <h2 className="text-xl font-semibold">{page.extraTitle}</h2>
              <ul className="mt-3 space-y-2 text-ink/70">
                {page.extraItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Card>
          </div>
        </section>
      )}

      {page.whyItMatters && (
        <section className="bg-slate-50 border-y border-ink/10">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <Card>
              <h2 className="text-xl font-semibold">Why It Matters</h2>
              <p className="mt-3 text-ink/70">{page.whyItMatters}</p>
            </Card>
          </div>
        </section>
      )}

      <section className="bg-ink text-white relative overflow-hidden">
        <div className="absolute inset-0 noise opacity-20 pointer-events-none" />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20 relative">
          <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
            {page.ctaTitle}
          </h2>
          <div className="mt-8">
            <CtaLink href={page.ctaHref}>{page.ctaButton}</CtaLink>
          </div>
        </div>
      </section>
    </main>
  );
}

