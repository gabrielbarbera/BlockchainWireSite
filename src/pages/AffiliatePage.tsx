import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CtaLink } from "../components/ui";

function Field({
  label,
  type = "text",
  placeholder,
  required = false,
  value,
  onChange,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-primary"
      />
    </label>
  );
}

export function AffiliatePage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
    telephone: "",
    telegram: "",
    linkedin: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: string) => (value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "First name is required";
    if (!form.lastName.trim()) e.lastName = "Last name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid email address";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8)
      e.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords do not match";
    if (!form.company.trim()) e.company = "Company is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <main className="bg-slate-50">
        <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
          <div className="mx-auto max-w-xl rounded-3xl border border-ink/10 bg-white p-6 sm:p-10 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-3xl text-primary">
              ✓
            </div>
            <h1 className="mt-6 text-3xl font-display font-black uppercase tracking-[-0.04em]">
              Application Submitted
            </h1>
            <p className="mt-4 text-ink/70">
              Thank you for applying to the Blockchain Wire Affiliate Program.
              Our team will review your application and get back to you within
              24–48 hours.
            </p>
            <div className="mt-8">
              <CtaLink href="/">Return Home</CtaLink>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-5">
          <article className="lg:col-span-3 rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
            <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
              Affiliate Program
            </h1>
            <p className="mt-4 max-w-2xl text-ink/70">
              Apply to Join Blockchain Wire Affiliate Program. Earn commissions
              by referring clients to the leading Web3 PR distribution platform.
            </p>

            <form onSubmit={handleSubmit} className="mt-8" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Field
                    label="First Name"
                    placeholder="Jane"
                    required
                    value={form.firstName}
                    onChange={set("firstName")}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <Field
                    label="Last Name"
                    placeholder="Smith"
                    required
                    value={form.lastName}
                    onChange={set("lastName")}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Field
                  label="Company"
                  placeholder="Company Inc."
                  required
                  value={form.company}
                  onChange={set("company")}
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                )}
              </div>

              <div className="mt-4">
                <Field
                  label="Email Address"
                  type="email"
                  placeholder="jane@company.com"
                  required
                  value={form.email}
                  onChange={set("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <Field
                    label="Password"
                    type="password"
                    placeholder="Min. 8 characters"
                    required
                    value={form.password}
                    onChange={set("password")}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <Field
                    label="Confirm Password"
                    type="password"
                    placeholder="Re-enter password"
                    required
                    value={form.confirmPassword}
                    onChange={set("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <Field
                  label="Telephone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.telephone}
                  onChange={set("telephone")}
                />
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  label="Telegram"
                  placeholder="@username"
                  value={form.telegram}
                  onChange={set("telegram")}
                />
                <Field
                  label="LinkedIn"
                  placeholder="linkedin.com/in/username"
                  value={form.linkedin}
                  onChange={set("linkedin")}
                />
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white btn-glow btn-glow-hover hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  Submit Application
                  <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>

              <p className="mt-4 text-xs text-ink/45">
                By submitting, you agree to our{" "}
                <a href="/company/legal#terms" className="text-primary-dark hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/company/legal#privacy"
                  className="text-primary-dark hover:underline"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </form>
          </article>

          <aside className="lg:col-span-2 rounded-3xl border border-ink/10 bg-ink p-6 sm:p-8 text-white">
            <h2 className="text-2xl font-display font-black uppercase tracking-tight">
              Why Join?
            </h2>
            <ul className="mt-6 space-y-4 text-sm text-white/80">
              <li className="flex gap-3">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  <strong className="text-white">Best Commissions</strong>{" "}
                  — Earn generous payouts on every referral
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  <strong className="text-white">Real-Time Tracking</strong> —
                  Monitor referrals and earnings from your dashboard
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  <strong className="text-white">Marketing Assets</strong> —
                  Access branded banners, links, and landing pages
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  <strong className="text-white">Dedicated Support</strong> —
                  Get a personal account manager to help you succeed
                </span>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 text-primary">✓</span>
                <span>
                  <strong className="text-white">Fast Payouts</strong> —
                  Receive payments within 30 days via your preferred method
                </span>
              </li>
            </ul>

            <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-display font-bold text-white">
                Program Highlights
              </h3>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Commission Rate</span>
                  <span className="font-semibold text-primary">Up to 25%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Cookie Duration</span>
                  <span className="font-semibold text-primary">90 Days</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Min. Payout</span>
                  <span className="font-semibold text-primary">$100</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
