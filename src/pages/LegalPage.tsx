import { PRIVACY_POLICY, TERMS_AND_CONDITIONS } from "../constants/legal";

export function LegalPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-display font-bold sm:text-5xl">Legal</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-xl font-semibold">Privacy Policy</h2>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm text-ink/70">
            {PRIVACY_POLICY}
          </pre>
        </article>
        <article className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-xl font-semibold">Terms & Conditions</h2>
          <pre className="mt-4 whitespace-pre-wrap font-sans text-sm text-ink/70">
            {TERMS_AND_CONDITIONS}
          </pre>
        </article>
      </div>
    </main>
  );
}

