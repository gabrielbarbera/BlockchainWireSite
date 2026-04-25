import { CtaLink } from "../components/ui";
import { ArrowRight, Check, LayoutDashboard, FileText, BarChart3, Send, ShieldCheck } from "lucide-react";

// ─── Primitives ──────────────────────────────────────────────────────────────

function Field({
  label,
  type = "text",
  placeholder,
  hint,
  required,
}: {
  label: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs font-bold uppercase tracking-[0.14em] text-ink/70">
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </span>
        {hint && <span className="text-xs text-ink/70">{hint}</span>}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-ink/15 bg-white px-4 py-3 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-4 focus:ring-primary/8 placeholder:text-ink/40"
      />
    </label>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="group flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white transition-all duration-300 hover:bg-primary-dark btn-glow btn-glow-hover hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {children}
      <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
    </button>
  );
}

// ─── Split layout ─────────────────────────────────────────────────────────────

function AuthLayout({
  panel,
  children,
}: {
  panel: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen grid lg:grid-cols-[42%_1fr]">
      {/* Left — branding panel */}
      <div className="relative hidden lg:flex flex-col bg-ink text-white p-12 xl:p-16 overflow-hidden">
        {/* Backgrounds */}
        <div className="absolute inset-0 pointer-events-none noise opacity-30" />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-primary/6 blur-3xl" />

        {/* Logo */}
        <div className="relative mb-auto">
          <a href="/">
            <img
              src="/Logo Horizontal Color White.svg"
              alt="BlockchainWire"
              className="h-7 w-auto"
            />
          </a>
        </div>

        {/* Panel content */}
        <div className="relative mt-16">{panel}</div>

        {/* Footer */}
        <div className="relative mt-auto pt-12 border-t border-white/8">
          <p className="text-xs text-white/25 uppercase tracking-wider">
            &copy; {new Date().getFullYear()} BlockchainWire. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right — form panel */}
      <div className="flex flex-col items-center justify-center px-6 py-14 bg-paper min-h-screen">
        {/* Mobile logo */}
        <div className="mb-10 lg:hidden">
          <a href="/">
            <img src="/Logo Horizontal Color.svg" alt="BlockchainWire" className="h-7 w-auto" />
          </a>
        </div>

        <div className="w-full max-w-[420px]">{children}</div>
      </div>
    </main>
  );
}

// ─── Signup ───────────────────────────────────────────────────────────────────

export function SignUpPage() {
  const valueProps = [
    "Access 1200+ crypto and financial media outlets",
    "Reach up to 174M+ monthly readers per release",
    "Google News indexing on every distribution",
    "Post-campaign placement reports included",
  ];

  const stats = [
    { value: "174M+", label: "Max Monthly Reach" },
    { value: "1200+", label: "Media Outlets" },
    { value: "8", label: "Distribution Tiers" },
    { value: "2h", label: "Min. Turnaround" },
  ];

  return (
    <AuthLayout
      panel={
        <>
          <h2 className="text-3xl xl:text-4xl font-display font-black uppercase tracking-[-0.04em] leading-[0.92] mb-8">
            Distribute With<br />Authority
          </h2>
          <ul className="space-y-4 mb-10">
            {valueProps.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-primary" />
                </span>
                <span className="text-sm text-white/65 leading-snug">{item}</span>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-5 pt-8 border-t border-white/8">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-display font-black text-white">{s.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/35">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </>
      }
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-[-0.04em]">
          Create Your Account
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Set up your account to manage distributions and select packages.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full Name" placeholder="Jane Smith" required />
          <Field label="Company Name" placeholder="Company Inc." required />
        </div>
        <Field label="Email Address" type="email" placeholder="jane@company.com" required />
        <Field label="Password" type="password" hint="Min. 8 characters" required />
        <Field label="Confirm Password" type="password" required />

        <label htmlFor="terms-checkbox" className="flex items-start gap-3 cursor-pointer pt-1">
          <input
            id="terms-checkbox"
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 flex-shrink-0 rounded border-ink/20 accent-primary"
          />
          <span className="text-xs text-ink/50 leading-relaxed">
            I agree to the{" "}
            <a href="/company/legal#terms" className="text-primary hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/company/legal#privacy" className="text-primary hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <div className="pt-2">
          <SubmitButton>Create Account</SubmitButton>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-1.5 text-sm">
        <span className="text-ink/45">Already have an account?</span>
        <a href="https://admin.blockchainwire.io/signin" target="_blank" rel="noopener noreferrer" className="text-primary-dark font-medium hover:underline">
          Log In
        </a>
      </div>

      <p className="mt-4 text-xs uppercase tracking-[0.12em] text-ink/50">
        Secure setup · No commitment required
      </p>
    </AuthLayout>
  );
}

// ─── Login ────────────────────────────────────────────────────────────────────

export function LoginPage() {
  const dashboardItems = [
    { icon: <Send className="w-4 h-4" />, label: "Launch new distributions" },
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Manage active campaigns" },
    { icon: <FileText className="w-4 h-4" />, label: "Manage saved drafts" },
  ];

  return (
    <AuthLayout
      panel={
        <>
          <h2 className="text-3xl xl:text-4xl font-display font-black uppercase tracking-[-0.04em] leading-[0.92] mb-4">
            Welcome Back
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-10">
            Access your dashboard to manage distributions, track placements, and launch new announcements.
          </p>
          <ul className="space-y-4">
            {dashboardItems.map((item) => (
              <li key={item.label} className="flex items-center gap-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-primary flex-shrink-0">
                  {item.icon}
                </span>
                <span className="text-sm text-white/60">{item.label}</span>
              </li>
            ))}
          </ul>
        </>
      }
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-[-0.04em]">
          Log In
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Access your dashboard and manage distributions.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email Address" type="email" placeholder="you@company.com" required />
        <div>
          <Field label="Password" type="password" required />
          <div className="mt-2 text-right">
            <a
              href="/auth/forgot-password"
              className="text-xs text-primary-dark hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </div>

        <div className="pt-2">
          <SubmitButton>Log In</SubmitButton>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-1.5 text-sm">
        <span className="text-ink/45">Don't have an account?</span>
        <a href="https://admin.blockchainwire.io/signup" target="_blank" rel="noopener noreferrer" className="text-primary-dark font-medium hover:underline">
          Sign Up Free
        </a>
      </div>

      <div className="mt-4 flex items-center gap-2 text-xs text-ink/50 uppercase tracking-[0.12em]">
        <ShieldCheck className="w-3.5 h-3.5" />
        Secure login
      </div>
    </AuthLayout>
  );
}

// ─── Forgot Password ──────────────────────────────────────────────────────────

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      panel={
        <>
          <h2 className="text-3xl font-display font-black uppercase tracking-[-0.04em] leading-[0.92] mb-4">
            Account Security
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            We'll send a secure reset link to your registered email address. The link expires after 24 hours.
          </p>
          <ul className="space-y-3">
            {[
              "Check your inbox and spam folder",
              "Link expires after 24 hours",
              "Contact support if you need further help",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/8 flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white/50" />
                </span>
                <span className="text-sm text-white/50 leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </>
      }
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-[-0.04em]">
          Reset Password
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Enter your email and we'll send a reset link.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="Email Address" type="email" placeholder="you@company.com" required />
        <div className="pt-2">
          <SubmitButton>Send Reset Link</SubmitButton>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-1.5 text-sm">
        <span className="text-ink/45">Remember your password?</span>
        <a href="https://admin.blockchainwire.io/signin" target="_blank" rel="noopener noreferrer" className="text-primary-dark font-medium hover:underline">
          Log In
        </a>
      </div>

      <div className="mt-4 text-xs text-ink/70">
        Need help?{" "}
        <a href="/company/contact" className="text-primary-dark hover:underline">
          Contact Support
        </a>
      </div>
    </AuthLayout>
  );
}

// ─── Reset Password ───────────────────────────────────────────────────────────

export function ResetPasswordPage() {
  return (
    <AuthLayout
      panel={
        <>
          <h2 className="text-3xl font-display font-black uppercase tracking-[-0.04em] leading-[0.92] mb-4">
            Almost Done
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">
            Choose a strong, unique password. Once updated, you'll be taken to your dashboard.
          </p>
          <div className="mt-8 rounded-2xl bg-white/5 border border-white/8 p-5 space-y-2">
            {[
              "At least 8 characters",
              "Mix of letters and numbers",
              "At least one special character",
            ].map((tip) => (
              <div key={tip} className="flex items-center gap-2.5 text-sm text-white/45">
                <Check className="w-3.5 h-3.5 text-primary/60 flex-shrink-0" />
                {tip}
              </div>
            ))}
          </div>
        </>
      }
    >
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-display font-black uppercase tracking-[-0.04em]">
          Set New Password
        </h1>
        <p className="mt-2 text-sm text-ink/50">
          Choose a secure password to regain access to your account.
        </p>
      </div>

      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <Field label="New Password" type="password" hint="Min. 8 characters" required />
        <Field label="Confirm Password" type="password" required />
        <div className="pt-2">
          <SubmitButton>Update Password</SubmitButton>
        </div>
      </form>

      <div className="mt-6 flex items-center gap-2 text-xs text-ink/50 uppercase tracking-[0.12em]">
        <ShieldCheck className="w-3.5 h-3.5" />
        Encrypted and secure
      </div>
    </AuthLayout>
  );
}

// ─── Dashboard pages (unchanged) ─────────────────────────────────────────────

export function DashboardWelcomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Welcome to BlockchainWire
      </h1>
      <p className="mt-4 text-ink/70">You are ready to launch your first distribution.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <CtaLink href="/dashboard/distributions">Start a New Distribution</CtaLink>
        <CtaLink href="/pricing" variant="outline">View Pricing</CtaLink>
        <CtaLink href="/company/media-network" variant="outline">Explore Media Network</CtaLink>
        <CtaLink href="/resources/press-release-guide" variant="outline">Learn How It Works</CtaLink>
      </div>
      <article className="mt-8 rounded-2xl border border-ink/10 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="mt-4 space-y-2 text-ink/70">
          <li>Submit your press release</li>
          <li>Choose a distribution package</li>
          <li>Launch across the network</li>
          <li>Track placements and reach</li>
        </ol>
      </article>
    </main>
  );
}

export function DashboardHomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Your Distribution Dashboard
      </h1>
      <p className="mt-4 text-ink/70">
        Manage announcements, track placements, and access reporting.
      </p>
      <div className="mt-8">
        <CtaLink href="/dashboard/submit-press-release">New Press Release</CtaLink>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Recent Distributions", "Track your latest announcements"],
          ["Drafts", "Continue working on saved releases"],
          ["Reports", "View placement results and reach"],
        ].map(([title, body]) => (
          <article key={title} className="rounded-2xl border border-ink/10 bg-white p-5">
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-ink/70">{body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export function SubmitPressReleasePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Create a New Press Release
      </h1>
      <p className="mt-4 text-ink/70">
        Prepare your announcement for distribution across media channels.
      </p>
      <form className="mt-8 grid gap-6">
        <section className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-xl font-semibold">1. Basic Information</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Title" />
            <Field label="Subtitle" />
            <div className="md:col-span-2">
              <Field label="Company Name" />
            </div>
          </div>
        </section>
        <section className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-xl font-semibold">2. Content</h2>
          <label htmlFor="press-release-body" className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
              Full press release body
            </span>
            <textarea id="press-release-body" className="min-h-52 w-full rounded-xl border border-ink/15 px-4 py-3" />
          </label>
        </section>
        <section className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-xl font-semibold">3. Media / Assets (optional)</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <Field label="Images" placeholder="Link or upload reference" />
            <Field label="Links" placeholder="https://..." />
          </div>
        </section>
        <section className="rounded-2xl border border-ink/10 bg-white p-6">
          <h2 className="text-xl font-semibold">4. Distribution Selection</h2>
          <label htmlFor="package-select" className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.16em] text-ink/60">
              Choose package
            </span>
            <select id="package-select" className="w-full rounded-xl border border-ink/15 px-4 py-3 text-sm">
              <option>Copper</option>
              <option>Silver</option>
              <option>Gold</option>
              <option>Platinum</option>
              <option>Diamond</option>
              <option>Pro</option>
              <option>Elite</option>
              <option>Premium</option>
            </select>
          </label>
        </section>
        <div>
          <CtaLink href="/dashboard/confirm-distribution">Continue to Distribution</CtaLink>
        </div>
      </form>
    </main>
  );
}

export function ConfirmDistributionPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Confirm Your Distribution
      </h1>
      <p className="mt-4 text-ink/70">Review your package and finalize your submission.</p>
      <article className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-xl font-semibold">Summary</h2>
        <ul className="mt-4 space-y-2 text-ink/70">
          <li>Selected package: Premium</li>
          <li>Estimated reach: 174M+ total reach</li>
          <li>Distribution scope: Crypto + financial + indexed visibility</li>
        </ul>
      </article>
      <p className="mt-4 text-sm text-ink/65">
        Your release will be processed and distributed according to the selected package.
      </p>
      <div className="mt-6">
        <CtaLink href="/dashboard/distribution-submitted">Launch Distribution</CtaLink>
      </div>
    </main>
  );
}

export function DistributionSuccessPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl sm:text-6xl font-display font-black uppercase tracking-[-0.04em]">
        Distribution Submitted
      </h1>
      <p className="mt-4 text-ink/70">Your press release is now being processed.</p>
      <article className="mt-8 rounded-2xl border border-ink/10 bg-white p-6">
        <h2 className="text-xl font-semibold">Details</h2>
        <ul className="mt-4 space-y-2 text-ink/70">
          <li>Confirmation ID: BW-2026-0315-2981</li>
          <li>Selected package: Premium</li>
          <li>Expected turnaround time: 24 to 48 hours</li>
        </ul>
      </article>
      <article className="mt-4 rounded-2xl border border-ink/10 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold">Next Steps</h2>
        <ul className="mt-3 space-y-2 text-ink/70">
          <li>Track placements in your dashboard</li>
          <li>Access report once distribution is complete</li>
        </ul>
      </article>
      <div className="mt-6">
        <CtaLink href="/dashboard/distributions">Go to Dashboard</CtaLink>
      </div>
    </main>
  );
}
