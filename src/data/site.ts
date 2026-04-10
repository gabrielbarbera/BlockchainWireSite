import type { NavItem, RouteData } from "../types/site";

export const BRAND_NAME = "BlockchainWire";

export const DEFAULT_SEO = {
  title: "Media Distribution Built for Web3 Credibility | BlockchainWire",
  description:
    "Distribute Web3 announcements across trusted media channels to improve visibility, credibility, and discoverability across search and AI.",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "Products", href: "/products" },
  { label: "BeSpoke™", href: "/bespoke" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "Newsroom", href: "/resources/newsroom" },
];

export const SITEMAP: Record<string, RouteData> = {
  "/solutions": {
    title: "Solutions",
    intro: "Built for teams operating at different stages of Web3 growth.",
    sections: [
      "For Web3 Startups",
      "For Agencies",
      "For Exchanges",
      "For Public Companies",
      "For Token Launches",
      "For Events & Partnerships",
    ],
    seoTitle: "Web3 Media Distribution Solutions | BlockchainWire",
    seoDescription:
      "Distribution solutions for startups, agencies, exchanges, public companies, token launches, and partnership campaigns.",
  },
  "/products": {
    title: "Products",
    intro: "A complete distribution stack designed for credibility at scale.",
    sections: [
      "Overview",
      "Press Release Distribution",
      "Media Network",
      "AI & Search Visibility",
      "Editorial & Optimization",
      "Analytics & Reporting",
      "Custom Campaigns",
    ],
    seoTitle: "Distribution Products for Web3 Teams | BlockchainWire",
    seoDescription:
      "Press release distribution, media network access, AI visibility, editorial support, and analytics in one platform.",
  },
  "/pricing": {
    title: "Pricing",
    intro: "Transparent packages with a clear path to enterprise scale.",
    sections: ["Packages", "Add-Ons", "Enterprise / Custom"],
    seoTitle: "Web3 Press Release Pricing | BlockchainWire",
    seoDescription:
      "Explore starter, growth, and enterprise distribution packages with flexible add-ons and custom options.",
  },
  "/bespoke": {
    title: "BeSpoke™ Custom Media Solutions",
    intro: "Fully customizable media distribution for brands that need more than standard packages.",
    sections: ["Tier 1 Foundation", "Tier 2 Growth", "Tier 3 Authority", "Custom Residency"],
    seoTitle: "BeSpoke™ Custom Media Distribution | BlockchainWire",
    seoDescription:
      "Tailored media distribution with organic articles, broadcast TV, radio spots, AMAs, and multi-platform campaigns. Three tiers from $2,500 to $12,000 per month.",
  },
  "/results": {
    title: "Results",
    intro: "Proof built from placements, reporting, and market visibility.",
    sections: [
      "Case Studies",
      "Media Placements",
      "Testimonials",
      "Sample Reports",
    ],
    seoTitle: "Case Studies and Media Results | BlockchainWire",
    seoDescription:
      "Review real outcomes from Web3 distribution campaigns, including placements, visibility lift, and reporting snapshots.",
  },
  "/results/case-studies": {
    title: "Case Studies",
    intro: "See how teams use distribution to increase visibility and credibility.",
    sections: ["Objectives", "Challenges", "Solutions", "Results"],
    seoTitle: "Case Studies | BlockchainWire",
    seoDescription:
      "Explore structured distribution case studies showing placements, visibility, reach, and discoverability outcomes.",
  },
  "/results/media-placements": {
    title: "Media Placements",
    intro: "Review where announcements are published across our network.",
    sections: ["Crypto media", "Financial media", "Global syndication"],
    seoTitle: "Media Placements | BlockchainWire",
    seoDescription:
      "Review placement categories across crypto, financial, and global syndication channels.",
  },
  "/results/testimonials": {
    title: "Testimonials",
    intro: "Hear from teams using BlockchainWire.",
    sections: ["Client feedback", "Use cases", "Distribution outcomes"],
    seoTitle: "Testimonials | BlockchainWire",
    seoDescription:
      "Read client testimonials from teams using structured distribution to improve visibility and credibility.",
  },
  "/results/sample-reports": {
    title: "Sample Reports",
    intro: "Understand how performance is tracked and delivered.",
    sections: ["Placement coverage", "Reach", "Visibility indicators"],
    seoTitle: "Sample Reports | BlockchainWire",
    seoDescription:
      "View sample reporting structure for placement coverage, estimated reach, distribution footprint, and visibility indicators.",
  },
  "/resources": {
    title: "Resources",
    intro: "Educational content to improve release quality and outcomes.",
    sections: [
      "Press Release Guide",
      "Templates",
      "Best Practices",
      "Newsroom",
      "Industry News",
    ],
    seoTitle: "Press Release Resources and Templates | BlockchainWire",
    seoDescription:
      "Guides, templates, and newsroom insights to help Web3 teams launch higher-performing announcements.",
  },
  "/resources/press-release-guide": {
    title: "Press Release Guide",
    intro: "Learn how to structure and write effective announcements.",
    sections: ["Structure", "Common mistakes", "Performance impact"],
    seoTitle: "Press Release Guide | BlockchainWire",
    seoDescription:
      "Learn how to write structured press releases that improve placement quality, readability, and discoverability.",
  },
  "/resources/templates": {
    title: "Templates",
    intro: "Use proven formats for common Web3 announcements.",
    sections: [
      "Product launch template",
      "Funding announcement template",
      "Partnership template",
      "Token launch template",
      "Exchange listing template",
    ],
    seoTitle: "Press Release Templates | BlockchainWire",
    seoDescription:
      "Use structured templates for product launches, funding announcements, partnerships, token launches, and listings.",
  },
  "/resources/best-practices": {
    title: "Best Practices",
    intro: "Understand what improves visibility and placement outcomes.",
    sections: ["Clarity", "Timing", "Consistency", "Tier selection"],
    seoTitle: "Distribution Best Practices | BlockchainWire",
    seoDescription:
      "Apply distribution best practices across structure, timing, and positioning to improve visibility and discoverability.",
  },
  "/resources/newsroom": {
    title: "Newsroom",
    intro: "Stay updated with industry developments and media trends.",
    sections: ["Recent releases", "Platform updates", "Media changes"],
    seoTitle: "Newsroom | BlockchainWire",
    seoDescription:
      "Track recent announcements, media activity, and distribution updates in the BlockchainWire newsroom.",
  },
  "/resources/industry-news": {
    title: "Industry News",
    intro: "Curated updates from across crypto, finance, and media.",
    sections: ["Market trends", "Distribution shifts", "AI/search changes"],
    seoTitle: "Industry News | BlockchainWire",
    seoDescription:
      "Curated insights across crypto, finance, media, and AI/search trends shaping modern distribution strategy.",
  },
  "/company": {
    title: "Company",
    intro: "The team, network, and standards behind BlockchainWire.",
    sections: ["About", "Media Network", "Contact", "FAQ", "Legal"],
    seoTitle: "About BlockchainWire",
    seoDescription:
      "Learn about our media network, company standards, contact options, and legal information.",
  },
  "/company/about": {
    title: "About",
    intro: "Built for visibility, designed for credibility.",
    sections: ["Approach", "What we do", "Positioning"],
    seoTitle: "About BlockchainWire | Distribution Infrastructure",
    seoDescription:
      "Learn how BlockchainWire delivers structured distribution focused on placement quality, credibility, and discoverability.",
  },
  "/company/media-network": {
    title: "Media Network",
    intro: "A curated network built for reach, relevance, and credibility.",
    sections: ["Crypto media", "Financial media", "Global syndication", "Search indexing"],
    seoTitle: "Company Media Network | BlockchainWire",
    seoDescription:
      "Understand the media network behind BlockchainWire distribution across crypto, financial, and global channels.",
  },
  "/company/contact": {
    title: "Contact",
    intro: "Speak with our team about packages, campaigns, and partnerships.",
    sections: ["General inquiries", "Sales", "Custom campaigns"],
    seoTitle: "Contact BlockchainWire",
    seoDescription:
      "Contact BlockchainWire for package guidance, custom campaign planning, and partnership inquiries.",
  },
  "/company/faq": {
    title: "FAQ",
    intro: "Answers to common questions about distribution and placements.",
    sections: ["Process", "Placements", "Timing", "Customization"],
    seoTitle: "FAQ | BlockchainWire",
    seoDescription:
      "Review common questions about distribution mechanics, guaranteed placements, turnaround, and custom options.",
  },
  "/company/legal": {
    title: "Legal & Compliance",
    intro: "Important legal information regarding platform and distribution usage.",
    sections: ["Terms of Service", "Privacy Policy", "Disclaimer"],
    seoTitle: "Legal & Compliance | BlockchainWire",
    seoDescription:
      "Review terms, privacy, and legal disclaimers for BlockchainWire platform and distribution services.",
  },
  "/auth/signup": {
    title: "Sign Up",
    intro: "Create your account to begin distribution and reporting.",
    sections: [
      "Create profile",
      "Set credentials",
      "Access dashboard",
      "Start distribution",
    ],
    seoTitle: "Create Your Account | BlockchainWire",
    seoDescription:
      "Sign up to launch announcements and track placements through the BlockchainWire distribution platform.",
  },
  "/auth/login": {
    title: "Log In",
    intro: "Access your account and launch your next announcement.",
    sections: ["Secure sign-in", "Project access", "Placement tracking"],
    seoTitle: "Log In | BlockchainWire",
    seoDescription:
      "Log in to your BlockchainWire account to manage campaigns, placements, and reporting.",
  },
  "/dashboard": {
    title: "Dashboard",
    intro: "You are ready to launch your first distribution.",
    sections: [
      "Start a new distribution",
      "View pricing",
      "Explore media network",
      "Learn how it works",
    ],
    seoTitle: "Campaign Dashboard | BlockchainWire",
    seoDescription:
      "Manage active campaigns, placement data, and performance reporting in your dashboard.",
  },
  "/auth/forgot-password": {
    title: "Forgot Password",
    intro: "Receive reset instructions for account access.",
    sections: ["Email input", "Reset link request"],
    seoTitle: "Reset Password Request | BlockchainWire",
    seoDescription:
      "Request a password reset link to restore access to your BlockchainWire account.",
  },
  "/auth/reset-password": {
    title: "Reset Password",
    intro: "Set a new secure password for your account.",
    sections: ["New password", "Confirm password"],
    seoTitle: "Set New Password | BlockchainWire",
    seoDescription:
      "Set a new secure password and regain access to your BlockchainWire account.",
  },
  "/dashboard/distributions": {
    title: "Distribution Dashboard",
    intro: "Manage announcements, placements, and reports.",
    sections: ["Recent distributions", "Drafts", "Reports"],
    seoTitle: "Distribution Dashboard | BlockchainWire",
    seoDescription:
      "Manage announcements, monitor placements, and access reporting from your distribution dashboard.",
  },
  "/dashboard/submit-press-release": {
    title: "Create Press Release",
    intro: "Prepare your announcement for distribution.",
    sections: ["Basic information", "Content", "Assets", "Package selection"],
    seoTitle: "Create Press Release | BlockchainWire",
    seoDescription:
      "Create and prepare a press release for structured distribution across media channels.",
  },
  "/dashboard/confirm-distribution": {
    title: "Confirm Distribution",
    intro: "Review package and launch distribution.",
    sections: ["Package summary", "Reach estimate", "Distribution scope"],
    seoTitle: "Confirm Distribution | BlockchainWire",
    seoDescription:
      "Review selected package details and finalize your distribution submission.",
  },
  "/dashboard/distribution-submitted": {
    title: "Distribution Submitted",
    intro: "Submission confirmed and processing started.",
    sections: ["Confirmation ID", "Package", "Turnaround time", "Next steps"],
    seoTitle: "Distribution Submitted | BlockchainWire",
    seoDescription:
      "Your distribution has been submitted. Track placements and reporting progress in the dashboard.",
  },
  "/how-it-works": {
    title: "How It Works",
    intro: "Step-by-step distribution process from submission to reporting.",
    sections: ["Prepare", "Select", "Launch", "Measure"],
    seoTitle: "How Distribution Works | BlockchainWire",
    seoDescription:
      "Understand the full distribution lifecycle from submission and package selection through placement and reporting.",
  },
  "/compare-packages": {
    title: "Compare Packages",
    intro: "Compare placements, reach, turnaround, and media scope.",
    sections: ["Placements", "Reach", "Turnaround", "Media types"],
    seoTitle: "Compare Distribution Packages | BlockchainWire",
    seoDescription:
      "Compare distribution packages side-by-side to select the right placement scope and reach profile.",
  },
  "/sample-distribution": {
    title: "Sample Distribution",
    intro: "Review a representative release and placement outcomes.",
    sections: ["Sample release", "Placements", "Reach summary"],
    seoTitle: "Sample Distribution Outcome | BlockchainWire",
    seoDescription:
      "See a sample distribution including publication outcomes, coverage footprint, and reporting summary.",
  },
  "/media-database": {
    title: "Media Database",
    intro: "Explore publications by category, region, traffic, and authority.",
    sections: ["Search", "Filters", "Publication data"],
    seoTitle: "Explore Media Database | BlockchainWire",
    seoDescription:
      "Explore a searchable media database with filters for category, region, traffic profile, and authority tier.",
  },
  "/release-performance-insights": {
    title: "Release Performance Insights",
    intro: "Operational metrics beyond placement counts.",
    sections: ["Estimated impressions", "Visibility score", "Quality tier"],
    seoTitle: "Release Performance Insights | BlockchainWire",
    seoDescription:
      "Analyze release outcomes using visibility and placement-quality metrics to refine distribution strategy.",
  },
  "/editorial-guidelines": {
    title: "Editorial Guidelines",
    intro: "Submission standards for higher placement quality.",
    sections: ["Structure", "Claims policy", "Readability"],
    seoTitle: "Editorial Guidelines | BlockchainWire",
    seoDescription:
      "Follow editorial standards that improve submission quality, reduce revision cycles, and improve outcomes.",
  },
  "/turnaround-slas": {
    title: "Turnaround & Process SLAs",
    intro: "Defined windows, deadlines, and revision policy.",
    sections: ["Deadlines", "Windows", "Revision policy"],
    seoTitle: "Turnaround and Process SLAs | BlockchainWire",
    seoDescription:
      "Review submission deadlines, processing windows, and revision policy for predictable distribution delivery.",
  },
};

export const PRICING_PREVIEW = [
  {
    name: "Pro",
    price: "$295",
    subtitle: "Essential Media Distribution",
    summary:
      "Google News indexed, BizWire Express, EIN Presswire, MENAFN, and up to 15 crypto placements.",
    highlight: false,
    light: true,
  },
  {
    name: "Elite",
    price: "$395",
    subtitle: "Top-Tier Media Exposure",
    summary:
      "71M+ total reach with Associated Press, Barchart, Benzinga, Business Insider, Globe and Mail, and 20 crypto placements.",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$495",
    subtitle: "Maximum Media + Crypto Reach (Fastest turnaround)",
    summary:
      "82M+ total reach with AP, Benzinga, Business Insider, MarketWatch, Street Insider, Google News indexing, and 25+ crypto placements.",
    highlight: true,
  },
];

