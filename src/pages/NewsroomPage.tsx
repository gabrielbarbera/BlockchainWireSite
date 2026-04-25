import { useState, useEffect, useMemo } from "react";
import { CtaLink, PageHero, SectionDark } from "../components/ui";
import {
  Clock,
  ExternalLink,
  ArrowRight,
  Search,
  SlidersHorizontal,
  X,
  Radio,
  Tag,
} from "lucide-react";

const RSS_URL = "https://api.blockchainwire.io/feed-rss.xml";

type DateRange = "all" | "24h" | "7d" | "30d" | "custom";

type NewsItem = {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  description: string;
  creator: string;
  category: string;
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function stripHtml(html: string): string {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || "";
  return text.slice(0, 300).trim() + (text.length > 300 ? "..." : "");
}

function formatRelativeDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const diff = Date.now() - d.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function parseRss(xml: string): NewsItem[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xml, "text/xml");
  const items = doc.querySelectorAll("item");
  const results: NewsItem[] = [];
  items.forEach((item) => {
    const getTag = (tag: string) => item.querySelector(tag)?.textContent?.trim() || "";
    const getDcTag = (tag: string) =>
      item.getElementsByTagNameNS("http://purl.org/dc/elements/1.1/", tag)[0]?.textContent?.trim() || "";
    results.push({
      id: `bw-${results.length}`,
      title: getTag("title"),
      link: getTag("link"),
      pubDate: getTag("pubDate"),
      description: getTag("description"),
      creator: getDcTag("creator"),
      category: "Press Release",
    });
  });
  return results;
}

// ─── Badges ─────────────────────────────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-ink/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink/40">
      {category}
    </span>
  );
}

// ─── Featured card ───────────────────────────────────────────────────────────

function FeaturedNewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target={item.link === "#" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="group mb-5 flex flex-col rounded-3xl border border-ink/10 bg-white p-8 lg:p-10 transition-all duration-300 hover:shadow-lg hover:border-ink/20 lg:flex-row lg:gap-12"
    >
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CategoryBadge category={item.category} />
          <span className="ml-auto flex items-center gap-1 text-xs text-ink/35">
            <Clock className="w-3 h-3" />
            {formatRelativeDate(item.pubDate)}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink/90 leading-snug group-hover:text-ink transition-colors">
          {item.title}
        </h2>
        <p className="mt-4 text-ink/70 leading-relaxed line-clamp-3 max-w-2xl">
          {stripHtml(item.description)}
        </p>
        <div className="mt-6 flex items-center gap-3 border-t border-ink/5 pt-5">
          {item.creator && (
            <span className="text-xs text-ink/40 font-medium">via {item.creator}</span>
          )}
          <div className="ml-auto flex items-center gap-1.5 text-sm font-semibold text-primary-dark">
            Read Article
            <ExternalLink className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Regular news card ───────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <a
      href={item.link}
      target={item.link === "#" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-primary/25 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40"
    >
      <div className="mb-4 h-0.5 w-8 rounded-full bg-primary/50" />
      <div className="flex flex-wrap items-center gap-2">
        <CategoryBadge category={item.category} />
      </div>
      <h2 className="mt-3 text-[0.9375rem] font-semibold text-ink/85 leading-snug line-clamp-3 group-hover:text-ink transition-colors">
        {item.title}
      </h2>
      <p className="mt-2.5 flex-1 text-sm text-ink/48 leading-relaxed line-clamp-3">
        {stripHtml(item.description)}
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4">
        <div className="flex items-center gap-1 text-xs text-ink/35">
          <Clock className="w-3 h-3" />
          {formatRelativeDate(item.pubDate)}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary-dark">
          Read
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </a>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white p-6 animate-pulse">
      <div className="flex gap-2 mb-4">
        <div className="h-4 w-14 rounded-full bg-ink/8" />
        <div className="h-4 w-20 rounded-full bg-ink/8" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 w-full rounded bg-ink/8" />
        <div className="h-4 w-5/6 rounded bg-ink/8" />
        <div className="h-4 w-4/6 rounded bg-ink/8" />
      </div>
      <div className="space-y-1.5">
        <div className="h-3 w-full rounded bg-ink/5" />
        <div className="h-3 w-full rounded bg-ink/5" />
        <div className="h-3 w-2/3 rounded bg-ink/5" />
      </div>
      <div className="mt-4 pt-4 border-t border-ink/5 flex justify-between">
        <div className="h-3 w-16 rounded bg-ink/5" />
        <div className="h-3 w-12 rounded bg-ink/5" />
      </div>
    </div>
  );
}

// ─── Filter sidebar ──────────────────────────────────────────────────────────

function FilterSidebar({
  search,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  customFrom,
  onCustomFromChange,
  customTo,
  onCustomToChange,
  selectedCategory,
  onCategoryChange,
  availableCategories,
  resultCount,
  onReset,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  dateRange: DateRange;
  onDateRangeChange: (v: DateRange) => void;
  customFrom: string;
  onCustomFromChange: (v: string) => void;
  customTo: string;
  onCustomToChange: (v: string) => void;
  selectedCategory: string;
  onCategoryChange: (v: string) => void;
  availableCategories: string[];
  resultCount: number;
  onReset: () => void;
}) {
  const hasFilters = search || dateRange !== "all" || customFrom || customTo || selectedCategory;

  return (
    <aside className="rounded-2xl border border-ink/10 bg-white p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter
        </h3>
        {hasFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary-dark hover:text-ink transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Keyword search */}
      <div>
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40 mb-3">
          Search
        </span>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search releases, companies..."
            className="w-full rounded-xl border border-ink/15 bg-white pl-9 pr-4 py-2.5 text-sm outline-none transition focus:border-primary placeholder:text-xs placeholder:text-ink/30"
          />
        </div>
      </div>

      {/* Category filter */}
      {availableCategories.length > 1 && (
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40 mb-3 flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            Category
          </span>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => onCategoryChange("")}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                !selectedCategory
                  ? "bg-primary text-white"
                  : "bg-ink/6 text-ink/50 hover:bg-ink/10 hover:text-ink"
              }`}
            >
              All
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(selectedCategory === cat ? "" : cat)}
                className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-primary text-white"
                    : "bg-ink/6 text-ink/50 hover:bg-ink/10 hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Date filter */}
      <div>
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40 mb-3">
          Date Published
        </span>
        <div className="space-y-1">
          {(
            [
              { value: "all", label: "All time" },
              { value: "24h", label: "Past 24 hours" },
              { value: "7d", label: "Past week" },
              { value: "30d", label: "Past month" },
              { value: "custom", label: "Custom range" },
            ] as const
          ).map(({ value, label }) => (
            <button
              key={value}
              onClick={() => onDateRangeChange(value)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                dateRange === value
                  ? "bg-primary/10 text-primary-dark font-medium"
                  : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 flex-shrink-0 transition-colors ${
                  dateRange === value ? "border-primary bg-primary" : "border-ink/20"
                }`}
              >
                {dateRange === value && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              {label}
            </button>
          ))}
        </div>

        {dateRange === "custom" && (
          <div className="mt-3 space-y-2 pl-2">
            {(["From", "To"] as const).map((lbl) => {
              const val = lbl === "From" ? customFrom : customTo;
              const setter = lbl === "From" ? onCustomFromChange : onCustomToChange;
              return (
                <div key={lbl}>
                  <label className="block text-[10px] uppercase tracking-wider text-ink/40 mb-1">
                    {lbl}
                  </label>
                  <input
                    type="date"
                    value={val}
                    onChange={(e) => setter(e.target.value)}
                    className="w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm outline-none transition focus:border-primary"
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="border-t border-ink/5 pt-4">
        <p className="text-xs text-ink/40">
          <span className="font-semibold text-ink/65">{resultCount}</span>{" "}
          {resultCount === 1 ? "result" : "results"} found
        </p>
      </div>
    </aside>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function NewsroomPage() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState<DateRange>("all");
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(RSS_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch feed");
        return res.text();
      })
      .then((xml) => {
        setPosts(parseRss(xml));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const allNews = useMemo(() => posts, [posts]);

  const availableCategories = useMemo(() => {
    return [...new Set(allNews.map((n) => n.category))].sort();
  }, [allNews]);

  const filteredNews = useMemo(() => {
    let results = allNews;

    if (selectedCategory) {
      results = results.filter((n) => n.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (n) =>
          n.creator.toLowerCase().includes(q) ||
          n.title.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q),
      );
    }

    if (dateRange !== "all") {
      const now = Date.now();
      if (dateRange === "24h") {
        results = results.filter((n) => new Date(n.pubDate).getTime() >= now - 86400000);
      } else if (dateRange === "7d") {
        results = results.filter((n) => new Date(n.pubDate).getTime() >= now - 7 * 86400000);
      } else if (dateRange === "30d") {
        results = results.filter((n) => new Date(n.pubDate).getTime() >= now - 30 * 86400000);
      } else if (dateRange === "custom") {
        if (customFrom) {
          results = results.filter(
            (n) => new Date(n.pubDate).getTime() >= new Date(customFrom).getTime(),
          );
        }
        if (customTo) {
          results = results.filter(
            (n) => new Date(n.pubDate).getTime() < new Date(customTo).getTime() + 86400000,
          );
        }
      }
    }

    return results;
  }, [allNews, selectedCategory, search, dateRange, customFrom, customTo]);

  const noFiltersActive = !search && dateRange === "all" && !selectedCategory;
  const showFeatured = noFiltersActive && filteredNews.length > 0;

  const displayedNews = filteredNews.slice(0, visibleCount);
  const gridItems = showFeatured ? displayedNews.slice(1) : displayedNews;
  const hasMore = visibleCount < filteredNews.length;

  const handleReset = () => {
    setSearch("");
    setDateRange("all");
    setCustomFrom("");
    setCustomTo("");
    setSelectedCategory("");
    setVisibleCount(12);
  };

  return (
    <main>
      <PageHero
        badge="Newsroom"
        title="Latest Announcements and Industry News"
        subtitle="Live press releases distributed through BlockchainWire, alongside curated coverage from leading crypto and financial media."
      >
        <div className="mt-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary-dark">
            <Radio className="w-3 h-3 animate-pulse" />
            Live Feed
          </span>
          <span className="text-xs text-white/40">Updated continuously via RSS</span>
        </div>
      </PageHero>

      <section className="bg-slate-50/50 min-h-screen">
        <div className="mx-auto max-w-7xl px-6 py-10 sm:py-14">
          {/* Mobile filter toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mb-6 lg:hidden inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink/60 hover:bg-ink/5 transition-colors"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {sidebarOpen ? "Hide Filters" : "Show Filters"}
          </button>

          <div className="flex gap-8">
            {/* Sidebar */}
            <div className={`w-full lg:w-64 flex-shrink-0 ${sidebarOpen ? "block" : "hidden"} lg:block`}>
              <div className="lg:sticky lg:top-24">
                <FilterSidebar
                  search={search}
                  onSearchChange={(v) => { setSearch(v); setVisibleCount(12); }}
                  dateRange={dateRange}
                  onDateRangeChange={(v) => { setDateRange(v); setVisibleCount(12); }}
                  customFrom={customFrom}
                  onCustomFromChange={setCustomFrom}
                  customTo={customTo}
                  onCustomToChange={setCustomTo}
                  selectedCategory={selectedCategory}
                  onCategoryChange={(v) => { setSelectedCategory(v); setVisibleCount(12); }}
                  availableCategories={availableCategories}
                  resultCount={filteredNews.length}
                  onReset={handleReset}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Loading */}
              {loading && (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center">
                  <p className="text-ink/70 mb-4">Unable to load the live feed. Industry news is still available.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-medium text-primary-dark hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && filteredNews.length === 0 && (
                <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center">
                  <p className="text-ink/70">No results match your current filters.</p>
                  <button
                    onClick={handleReset}
                    className="mt-3 text-sm font-medium text-primary hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}

              {/* Content */}
              {!loading && !error && filteredNews.length > 0 && (
                <>
                  {showFeatured && <FeaturedNewsCard item={filteredNews[0]} />}

                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {gridItems.map((item) => (
                      <NewsCard key={item.id} item={item} />
                    ))}
                  </div>

                  {/* Result count + load more */}
                  <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="text-xs text-ink/35 tabular-nums">
                      Showing {displayedNews.length} of {filteredNews.length} items
                    </p>
                    {hasMore && (
                      <button
                        onClick={() => setVisibleCount((c) => c + 12)}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-white px-8 py-3.5 text-sm font-semibold text-ink/60 hover:text-ink hover:border-ink/25 hover:bg-white transition-all duration-300"
                      >
                        Load More
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <SectionDark
        title="Distribute Your Announcement"
        subtitle="Get your press release published across crypto, financial, and mainstream media."
      >
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
