import { useState, useMemo } from "react";
import { Clock, ArrowRight, ArrowUpRight, Newspaper, SlidersHorizontal, X } from "lucide-react";

const PAGE_SIZE = 12;
import { CtaLink, PageHero, SectionDark } from "../components/ui";
import { useIndustryFeed } from "../hooks/useIndustryFeed";
import type { IndustryNewsItem, IndustryNewsSource } from "../types/newsroom";

// ─── Helpers ─────────────────────────────────────────────────────────────────

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

// ─── Filter sidebar ───────────────────────────────────────────────────────────

function FilterSidebar({
  sources,
  selected,
  onSelect,
  resultCount,
  onReset,
}: {
  sources: IndustryNewsSource[];
  selected: string;
  onSelect: (id: string) => void;
  resultCount: number;
  onReset: () => void;
}) {
  return (
    <aside className="rounded-2xl border border-ink/10 bg-white p-5 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-ink/50">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filter
        </h3>
        {selected && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary-dark hover:text-ink transition-colors"
          >
            <X className="w-3 h-3" />
            Clear all
          </button>
        )}
      </div>

      {/* Source filter */}
      <div>
        <span className="block text-[10px] font-bold uppercase tracking-[0.18em] text-ink/40 mb-3">
          Source
        </span>
        <div className="space-y-1">
          {/* All option */}
          <button
            onClick={() => onSelect("")}
            className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
              !selected
                ? "bg-primary/10 text-primary-dark font-medium"
                : "text-ink/70 hover:bg-ink/5 hover:text-ink"
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 flex-shrink-0 transition-colors ${
                !selected ? "border-primary bg-primary" : "border-ink/20"
              }`}
            >
              {!selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
            </span>
            All Industry News
          </button>

          {sources.map((src) => (
            <button
              key={src.id}
              onClick={() => onSelect(selected === src.id ? "" : src.id)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-all duration-200 ${
                selected === src.id
                  ? "bg-primary/10 text-primary-dark font-medium"
                  : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border-2 flex-shrink-0 transition-colors ${
                  selected === src.id ? "border-primary bg-primary" : "border-ink/20"
                }`}
              >
                {selected === src.id && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              {src.name}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-ink/5 pt-4">
        <p className="text-xs text-ink/40" aria-live="polite" aria-atomic="true">
          <span className="font-semibold text-ink/65">{resultCount}</span>{" "}
          {resultCount === 1 ? "result" : "results"} found
        </p>
      </div>
    </aside>
  );
}

// ─── News card ────────────────────────────────────────────────────────────────

function IndustryCard({ item }: { item: IndustryNewsItem }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = item.image && !imgFailed;

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-ink/8 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
    >
      <div className="aspect-video w-full bg-slate-50 overflow-hidden border-b border-ink/5">
        {showImage ? (
          <img
            src={item.image!}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/6 to-slate-100 flex items-center justify-center">
            {item.feedDefaultImage ? (
              <img src={item.feedDefaultImage} alt={item.feedTitle} className="h-8 w-auto max-w-[120px] object-contain opacity-40" />
            ) : (
              <Newspaper className="w-8 h-8 text-ink/15" />
            )}
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5">
        {item.categories.length > 0 && (
          <span className="inline-block mb-2.5 text-[10px] font-semibold uppercase tracking-wider text-ink/35">
            {item.categories[0]}
          </span>
        )}

        <h2 className="text-[0.9375rem] font-semibold text-ink/85 leading-snug line-clamp-3 group-hover:text-ink transition-colors">
          {item.title}
        </h2>

        <p className="mt-2 flex-1 text-sm text-ink/45 leading-relaxed line-clamp-2">
          {item.contentSnippet}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3.5">
          <div className="flex items-center gap-1 text-xs text-ink/35">
            <Clock className="w-3 h-3" />
            {formatRelativeDate(item.isoDate)}
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-dark">
            Read
            <ArrowUpRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-ink/8 bg-white overflow-hidden animate-pulse">
      <div className="aspect-video w-full bg-ink/6" />
      <div className="p-5">
        <div className="h-4 w-20 rounded-full bg-ink/8 mb-3" />
        <div className="space-y-2 mb-3">
          <div className="h-4 w-full rounded bg-ink/8" />
          <div className="h-4 w-5/6 rounded bg-ink/8" />
          <div className="h-4 w-3/4 rounded bg-ink/8" />
        </div>
        <div className="space-y-1.5 mb-4">
          <div className="h-3 w-full rounded bg-ink/5" />
          <div className="h-3 w-4/5 rounded bg-ink/5" />
        </div>
        <div className="pt-3.5 border-t border-ink/5 flex justify-between">
          <div className="h-3 w-16 rounded bg-ink/5" />
          <div className="h-3 w-10 rounded bg-ink/5" />
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function IndustryNewsPage() {
  const { items, sources, loading, error } = useIndustryFeed();
  const [selectedSource, setSelectedSource] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredItems = useMemo(() => {
    if (!selectedSource) return items;
    const src = sources.find((s) => s.id === selectedSource);
    if (!src) return items;
    return items.filter((item) => item.feedDefaultImage === src.image);
  }, [items, sources, selectedSource]);

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleReset = () => { setSelectedSource(""); setVisibleCount(PAGE_SIZE); };
  const handleSourceSelect = (id: string) => { setSelectedSource(id); setVisibleCount(PAGE_SIZE); };

  return (
    <main>
      <PageHero
        badge="Industry News"
        title="Crypto & Blockchain News"
        subtitle="Curated coverage from leading industry sources — Coin Journal, Crypto Breaking, and Globe Newswire."
      />

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
                  sources={sources}
                  selected={selectedSource}
                  onSelect={handleSourceSelect}
                  resultCount={filteredItems.length}
                  onReset={handleReset}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 min-w-0">
              {/* Loading */}
              {loading && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <SkeletonCard key={i} />
                  ))}
                </div>
              )}

              {/* Error */}
              {error && (
                <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center">
                  <p className="text-ink/70 mb-4">Unable to load industry news.</p>
                  <button
                    onClick={() => window.location.reload()}
                    className="text-sm font-medium text-primary-dark hover:underline"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Empty state */}
              {!loading && !error && filteredItems.length === 0 && (
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
              {!loading && !error && filteredItems.length > 0 && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {visibleItems.map((item, i) => (
                      <IndustryCard key={item.link ?? i} item={item} />
                    ))}
                  </div>

                  <div className="mt-10 flex flex-col items-center gap-4">
                    <p className="text-xs text-ink/35 tabular-nums">
                      Showing {visibleItems.length} of {filteredItems.length}
                    </p>
                    {hasMore && (
                      <button
                        onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                        className="inline-flex items-center gap-2 rounded-full border-2 border-ink/15 bg-white px-8 py-3.5 text-sm font-semibold text-ink/60 hover:text-ink hover:border-ink/25 transition-all duration-300"
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
