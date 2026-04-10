import type { RouteData } from "../types/site";
import { PageHero } from "../components/ui";

export function GenericPage({ title, intro, sections }: RouteData) {
  return (
    <main>
      <PageHero title={title} subtitle={intro} />
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-6 md:grid-cols-2">
            {sections.map((section) => (
              <article key={section} className="rounded-2xl border border-ink/10 p-6">
                <h2 className="text-lg font-semibold">{section}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
