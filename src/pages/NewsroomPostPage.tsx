import { useEffect, useState } from "react";
import { ArrowLeft, Calendar, Building, Newspaper, ExternalLink, Clock } from "lucide-react";
import { CtaLink, SectionDark } from "../components/ui";
import { useNewsroomFeed } from "../hooks/useNewsroomFeed";
import type { NewsItem } from "../types/newsroom";

function hasHtmlTags(content: string): boolean {
  return /<\/?[a-z][\s\S]*>/i.test(content);
}

function moveMediaBeforeText(content: string): string {
  if (typeof window === "undefined") return content;

  try {
    const doc = new DOMParser().parseFromString(content, "text/html");
    const media = Array.from(doc.body.querySelectorAll("img, video, iframe"));

    if (media.length === 0) {
      return content;
    }

    const mediaHtml = media
      .map((element) => {
        const wrapper = element.closest("figure, picture, p, div");
        const html = wrapper?.outerHTML || element.outerHTML;

        if (wrapper && wrapper.textContent?.trim() === "") {
          wrapper.remove();
        } else {
          element.remove();
        }

        return html;
      })
      .join("");

    return `${mediaHtml}${doc.body.innerHTML}`;
  } catch {
    return content;
  }
}

function renderPlainTextContent(content: string) {
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph, idx) => <p key={idx}>{paragraph}</p>);
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
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

function findPost(slug: string, posts: NewsItem[]): NewsItem | null {
  return (
    posts.find((p) => p.slug === slug) ||
    posts.find((p) => p.id === slug) ||
    posts.find((p) => {
      const titleSlug = p.title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return titleSlug === slug;
    }) ||
    null
  );
}

export function NewsroomPostPage({ path }: { path: string }) {
  const slug = path.replace(/^\/press-release\//, "").replace(/\/$/, "");
  const { data: posts, loading, error } = useNewsroomFeed();
  const [post, setPost] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (posts && posts.length > 0) {
      setPost(findPost(slug, posts));
    }
  }, [slug, posts]);

  // Update SEO meta tags for the post
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | BlockchainWire Newsroom`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", post.description);
      }
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute("href", post.link);
      }
    }
  }, [post]);

  if (loading) {
    return (
      <main>
        <section className="bg-ink text-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <div className="h-8 w-32 bg-white/10 rounded-full animate-pulse mb-6" />
            <div className="h-12 bg-white/10 rounded animate-pulse mb-4" />
            <div className="h-12 w-3/4 bg-white/10 rounded animate-pulse" />
          </div>
        </section>
        <section className="bg-paper py-16">
          <div className="mx-auto max-w-3xl px-6">
            <div className="space-y-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-4 bg-ink/5 rounded animate-pulse" />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main>
        <section className="bg-ink text-white py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
              <Newspaper className="w-3 h-3" />
              Newsroom
            </span>
            <h1 className="font-display font-black uppercase tracking-[-0.05em] leading-[0.9] text-white text-[clamp(2rem,5vw,3.5rem)]">
              Article Not Found
            </h1>
            <p className="mt-6 text-white/60">
              This press release may have been removed or the link is incorrect.
            </p>
            <div className="mt-8">
              <CtaLink href="/resources/newsroom" variant="outline">
                <ArrowLeft className="w-4 h-4" />
                Back to Newsroom
              </CtaLink>
            </div>
          </div>
        </section>
      </main>
    );
  }

  const content = post.content || post.description;
  const isHtml = hasHtmlTags(content);
  const formattedHtml = isHtml ? moveMediaBeforeText(content) : "";

  // Find related posts (same category or recent posts)
  const relatedPosts = posts
    ? posts
        .filter((p) => p.id !== post.id)
        .slice(0, 3)
    : [];

  return (
    <main>
      {/* Hero header */}
      <section className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 pointer-events-none noise" />
        <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative mx-auto max-w-5xl px-6 py-12 sm:py-16">
          <a
            href="/resources/newsroom"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/45 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Newsroom
          </a>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-primary">
              <Newspaper className="w-3 h-3" />
              {post.category}
            </span>
            {post.creator && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/50">
                <Building className="w-3 h-3" />
                {post.creator}
              </span>
            )}
          </div>

          <h1 className="font-display font-black uppercase tracking-[-0.04em] leading-[1.05] text-white text-[clamp(1.75rem,4.5vw,3.75rem)] max-w-4xl">
            {post.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/55">
            <time dateTime={post.pubDate} className="inline-flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-primary/70" />
              {formatDate(post.pubDate)}
            </time>
            <span className="inline-flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary/70" />
              {formatRelativeDate(post.pubDate)}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section className="bg-paper">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <article className="newsroom-prose">
            {isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: formattedHtml }} />
            ) : (
              renderPlainTextContent(content)
            )}
          </article>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark hover:underline"
            >
              View on BlockchainWire
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a
              href="/resources/newsroom"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              All Articles
            </a>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-slate-50/50">
          <div className="mx-auto max-w-7xl px-6 py-14">
            <h2 className="text-2xl font-display font-bold text-ink mb-8">More Industry News</h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedPosts.map((p) => (
                <a
                  key={p.id}
                  href={`/press-release/${p.slug}`}
                  className="group flex flex-col rounded-2xl border border-primary/25 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-primary/40"
                >
                  <div className="mb-4 h-0.5 w-8 rounded-full bg-primary/50" />
                  <span className="inline-flex items-center rounded-full border border-ink/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink/40 self-start">
                    {p.category}
                  </span>
                  <h3 className="mt-3 text-[0.9375rem] font-semibold text-ink/85 leading-snug line-clamp-3 group-hover:text-ink transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm text-ink/48 leading-relaxed line-clamp-3">
                    {p.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-4">
                    <div className="flex items-center gap-1 text-xs text-ink/35">
                      <Clock className="w-3 h-3" />
                      {formatRelativeDate(p.pubDate)}
                    </div>
                    <span className="text-xs font-semibold text-primary-dark">Read</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

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
