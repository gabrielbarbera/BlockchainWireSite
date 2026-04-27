import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

// ==================== PAGE HERO ====================
export function PageHero({
  title,
  subtitle,
  badge,
  children,
}: {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink">
      <div className="absolute inset-0 pointer-events-none noise" />
      <div className="absolute top-10 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-primary/5 blur-3xl" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {badge && (
          <span className="inline-flex rounded-full bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            {badge}
          </span>
        )}
        <h1 className="mt-4 font-display font-black uppercase tracking-[-0.05em] leading-[0.9] text-white text-[clamp(2.25rem,6vw,5rem)]">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-3xl text-base sm:text-lg text-white/60 leading-relaxed">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}

// ==================== CTA LINK ====================
export function CtaLink({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "default" | "large";
  className?: string;
  external?: boolean;
}) {
  const baseClasses =
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold uppercase tracking-[0.1em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

  const sizeClasses =
    size === "large"
      ? "px-10 py-5 text-sm"
      : "px-7 py-3.5 text-xs";

  const variantClasses =
    variant === "primary"
      ? "bg-primary hover:bg-primary-dark text-white btn-glow btn-glow-hover hover:-translate-y-0.5"
      : variant === "outline"
      ? "border-2 border-primary text-primary hover:bg-primary hover:text-white"
      : "text-ink/70 hover:text-ink hover:bg-ink/5";

  return (
    <a 
      href={href} 
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
      {variant !== "ghost" && (
        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

// ==================== SECTION ====================
export function Section({
  heading,
  subheading,
  children,
  muted = false,
  wide = false,
  size = "default",
  className = "",
}: {
  heading: string;
  subheading?: string;
  children: ReactNode;
  muted?: boolean;
  wide?: boolean;
  size?: "default" | "large";
  className?: string;
}) {
  const headingSize = size === "large" ? "headline-section-lg" : "headline-section";
  const containerClass = wide ? "container-wide" : "mx-auto max-w-6xl";

  return (
    <section className={`${muted ? "bg-surface-alt" : "bg-surface"} section-spacing ${className}`}>
      <div className={`${containerClass} px-6`}>
        <h2 className={`${headingSize} text-ink`}>{heading}</h2>
        {subheading && <p className="mt-6 text-xl text-ink/80 max-w-3xl">{subheading}</p>}
        <div className="mt-12 space-y-6 text-lg text-ink/70">{children}</div>
      </div>
    </section>
  );
}

// ==================== DARK SECTION (INTERLUDES / CTA BANNERS) ====================
export function SectionDark({
  title,
  subtitle,
  children,
  className = "",
}: {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-ink text-white ${className}`}>
      <div className="absolute inset-0 pointer-events-none noise opacity-20" />
      <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <h2 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-[-0.04em]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-white/50">{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}

// ==================== STAT ROW ====================
export function StatRow({
  stats,
}: {
  stats: Array<{ value: string; label: string }>;
}) {
  return (
    <div className="border-b border-ink/5 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl sm:text-4xl font-display font-black text-ink">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-ink/50 uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: ReactNode;
  variant?: "default" | "accent" | "outline" | "popular";
  className?: string;
}) {
  const variantClasses = variant === "accent"
    ? "bg-primary/20 text-primary border-primary/40"
    : variant === "outline"
    ? "border-2 border-ink/20 text-ink/70"
    : variant === "popular"
    ? "bg-primary text-white"
    : "bg-surface-alt text-ink/70";

  return (
    <span className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider ${variantClasses} ${className}`}>
      {children}
    </span>
  );
}

// ==================== CARD ====================
export function Card({
  children,
  className = "",
  hover = false,
  glass = false,
  accent = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  accent?: boolean;
}) {
  const baseClasses = "rounded-3xl p-8";
  const styleClasses = accent
    ? "border border-primary/20 bg-primary/5"
    : glass
    ? "glass-card"
    : "bg-surface shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-md transition-shadow duration-300";
  const hoverClasses = hover
    ? "transition-all duration-300 hover:shadow-premium hover:-translate-y-1"
    : "";

  return (
    <div className={`${baseClasses} ${styleClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
}

// ==================== REFERRAL CODE BOX ====================
export function ReferralCodeBox({
  code = "SAVE100",
  label = "Referral Code",
}: {
  code?: string;
  label?: string;
}) {
  return (
    <div className="referral-box rounded-xl px-4 py-2 inline-flex items-center gap-3">
      <span className="text-ink/50 text-xs font-mono">{label}</span>
      <span className="font-mono text-sm font-semibold text-ink">{code}</span>
    </div>
  );
}

// ==================== COMPARISON CARD ====================
export function ComparisonCard({
  title,
  withPr,
  withoutPr,
  icon,
}: {
  title: string;
  withPr: string;
  withoutPr: string;
  icon: ReactNode;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary">
          {icon}
        </div>
        <h4 className="font-display font-semibold text-ink">{title}</h4>
      </div>
      <div className="space-y-3">
        <div className="flex items-start gap-2">
          <span className="mt-1 text-primary">✓</span>
          <div>
            <span className="text-xs text-ink/50 uppercase tracking-wider">With PR</span>
            <p className="text-sm font-medium text-ink">{withPr}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <span className="mt-1 text-ink/30">✗</span>
          <div>
            <span className="text-xs text-ink/50 uppercase tracking-wider">Without PR</span>
            <p className="text-sm text-ink/50">{withoutPr}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== TERMINAL ANIMATION ====================
import { useState, useEffect } from "react";

export function TerminalAnimation({
  title = "ai_authority_engine_v2.0.4",
  steps,
}: {
  title?: string;
  steps?: Array<{ number: string; text: string }>;
}) {
  const defaultSteps = [
    { number: "01", text: "initializing_deep_scan..." },
    { number: "02", text: "crawling: business_insider" },
    { number: "03", text: "extracting_authority_signals..." },
    { number: "04", text: "MATCH_FOUND: [HIGH_AUTHORITY_VERIFIED]" },
    { number: "05", text: "UPDATING_LLM_KNOWLEDGE_BASE..." },
  ];

  const terminalSteps = steps || defaultSteps;
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < terminalSteps.length) {
        setVisibleSteps(prev => [...prev, currentStep]);
        setCurrentStep(prev => prev + 1);
      }
    }, 800);

    return () => clearInterval(interval);
  }, [currentStep, terminalSteps.length]);

  return (
    <div className="terminal-window rounded-2xl p-6 overflow-hidden">
      <div className="terminal-text text-primary/60 text-xs mb-4 font-mono">
        {title}
      </div>
      <div className="space-y-2">
        {terminalSteps.map((step, index) => (
          <div
            key={index}
            className={`terminal-text text-sm transition-opacity duration-300 ${
              visibleSteps.includes(index) ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="text-primary/60">{step.number}</span>{" "}
            <span className="text-primary/40">[&gt;]</span>{" "}
            <span className={index === 3 ? "text-primary font-semibold" : "text-ink/70"}>
              {step.text}
            </span>
            {index === terminalSteps.length - 1 && visibleSteps.includes(index) && (
              <span className="animate-terminal-blink inline-block w-2 h-4 bg-primary ml-1 align-middle" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== LOGO MARQUEE ====================
export function LogoMarquee({
  logos,
  speed = "normal",
}: {
  logos: Array<{ name: string; src: string }>;
  speed?: "slow" | "normal";
}) {
  const animationClass = speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  const doubledLogos = [...logos, ...logos]; // Double for seamless loop

  return (
    <div className="overflow-hidden py-12 border-y border-ink/5">
      <div className={`flex ${animationClass} gap-12 items-center`}>
        {doubledLogos.map((logo, index) => (
          <div key={index} className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity">
            <img
              src={logo.src}
              alt={logo.name}
              className="h-8 w-auto grayscale hover:grayscale-0 transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ==================== PRICING CARD ====================
export function PricingCard({
  name,
  price,
  subtitle,
  features,
  highlight = false,
  popular = false,
  ctaText = "Select Package",
  ctaHref,
}: {
  name: string;
  price?: string;
  subtitle: string;
  features: string[];
  highlight?: boolean;
  popular?: boolean;
  ctaText?: string;
  ctaHref: string;
}) {
  return (
    <div className={`glass-dark rounded-3xl p-6 relative ${
      highlight ? "border-2 border-primary/40" : ""
    }`}>
      {popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant="popular">Most Popular</Badge>
        </div>
      )}
      <h3 className="text-2xl font-display font-bold text-white mt-2">{name}</h3>
      {price && <p className="mt-4 text-4xl font-display text-white">{price}</p>}
      <p className="mt-2 text-sm text-white/50">{subtitle}</p>
      <ul className="space-y-3 mt-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2 text-white/80 text-sm">
            <span className="text-primary">✓</span>
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={ctaHref}
        className={`group flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-semibold uppercase tracking-[0.1em] mt-6 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
          highlight
            ? "bg-primary hover:bg-primary-dark text-white btn-glow btn-glow-hover"
            : "border-2 border-white/20 text-white hover:border-white/50 hover:bg-white/10"
        }`}
      >
        {ctaText}
        <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </div>
  );
}

// ==================== PROCESS STEP ====================
export function ProcessStep({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon?: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary font-display font-bold text-lg">
          {number}
        </div>
      </div>
      <div className="flex-1">
        <h4 className="font-display font-semibold text-ink text-lg">{title}</h4>
        <p className="mt-2 text-ink/80 text-sm">{description}</p>
      </div>
    </div>
  );
}

// ==================== DARK HERO SECTION ====================
export function DarkHeroSection({
  badge,
  headline,
  subheadline,
  ctaText,
  ctaHref,
  referralCode,
}: {
  badge?: string;
  headline: string;
  subheadline: string[];
  ctaText: string;
  ctaHref: string;
  referralCode?: string;
}) {
  return (
    <section className="relative min-h-screen bg-ink overflow-hidden">
      <div className="noise absolute inset-0" />
      <div className="relative z-10 container-ultra-wide mx-auto px-6 py-12">
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
          {badge && <Badge variant="accent" className="mb-8">{badge}</Badge>}
          <h1 className="headline-hero font-display text-white tracking-tighter-hero">
            {headline}
          </h1>
          <div className="mt-12 max-w-3xl space-y-4">
            {subheadline.map((text, index) => (
              <p key={index} className="text-xl text-white/70 leading-relaxed">
                {text}
              </p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <CtaLink href={ctaHref} size="large" className="text-glow-strong">
              {ctaText}
            </CtaLink>
            {referralCode && <ReferralCodeBox code={referralCode} />}
          </div>
        </div>
      </div>
    </section>
  );
}

// ==================== EXTERNAL LINK ====================
export function ExternalLink({
  href,
  children,
  className,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel || (typeof children === 'string' ? `${children} (opens in new tab)` : 'Opens in new tab')}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
    </a>
  );
}
