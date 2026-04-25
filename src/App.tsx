import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Footer, Header } from "./components/layout";
import { LoadingScreen } from "./components/LoadingScreen";
import { CtaLink, ReferralCodeBox } from "./components/ui";
import { SITEMAP } from "./data/site";
import { applySeo } from "./lib/seo";
import { AffiliatePage } from "./pages/AffiliatePage";
import {
  ConfirmDistributionPage,
  DashboardHomePage,
  DashboardWelcomePage,
  DistributionSuccessPage,
  ForgotPasswordPage,
  LoginPage,
  ResetPasswordPage,
  SignUpPage,
  SubmitPressReleasePage,
} from "./pages/AuthPages";
import { CompanyDetailPage, CompanyOverviewPage } from "./pages/CompanyPages";
import { GenericPage } from "./pages/GenericPage";
import { HomePage } from "./pages/HomePage";
import {
  ComparePackagesPage,
  EditorialGuidelinesPage,
  HowItWorksPage,
  MediaDatabasePage,
  ReleasePerformanceInsightsPage,
  SampleDistributionPage,
  TurnaroundSlasPage,
} from "./pages/GrowthPages";
import { BeSpokePage } from "./pages/BeSpokePage";
import { PricingPage } from "./pages/PricingPage";
import { NewsroomPage } from "./pages/NewsroomPage";
import { ProductsPage } from "./pages/ProductsPages";
import { ResultDetailPage, ResultsOverviewPage } from "./pages/ResultsPages";
import { ResourceDetailPage, ResourcesOverviewPage } from "./pages/ResourcesPages";
import { SolutionsPage } from "./pages/SolutionsPages";

type TransitionPhase = "idle" | "out" | "in";

const EXIT_MS = 180;
const ENTER_MS = 320;

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [displayedPath, setDisplayedPath] = useState(window.location.pathname);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [isLoading, setIsLoading] = useState(true);
  const [showFloatingCTA, setShowFloatingCTA] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Handle page transitions: wait for exit animation to finish before swapping out content
  // and triggering the enter animation. This gives it a polished, native app feel.
  useEffect(() => {
    if (path === displayedPath) return;

    setPhase("out");

    let enterTimer: ReturnType<typeof setTimeout>;
    const exitTimer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
      setDisplayedPath(path);
      setPhase("in");
      enterTimer = setTimeout(() => setPhase("idle"), ENTER_MS);
    }, EXIT_MS);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(enterTimer!);
    };
  }, [path, displayedPath]);

  useEffect(() => {
    const onNavigation = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onNavigation);

    const onClick = (event: MouseEvent) => {
      const element = event.target as HTMLElement;
      const link = element.closest("a[href]") as HTMLAnchorElement | null;
      if (!link) return;

      const url = new URL(link.href, window.location.origin);
      const isInternal = url.origin === window.location.origin;
      if (!isInternal || event.metaKey || event.ctrlKey || event.shiftKey) {
        return;
      }

      event.preventDefault();
      if (url.pathname !== window.location.pathname) {
        window.history.pushState({}, "", url.pathname + url.hash);
        setPath(url.pathname + url.hash);
      } else if (url.hash) {
        window.history.pushState({}, "", url.pathname + url.hash);
        const el = document.getElementById(url.hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("popstate", onNavigation);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // Update SEO metadata as soon as the path changes so crawlers and browser history see it immediately.
  useEffect(() => {
    applySeo(path);
    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    }
  }, [path]);

  // We resolve the page component against the `displayedPath` instead of the actual `path`.
  // This keeps the old content visible on screen while the exit animation is playing.
  const content = useMemo(() => {
    if (displayedPath === "/") return <HomePage />;
    if (displayedPath === "/affiliate") return <AffiliatePage />;
    if (displayedPath === "/auth/signup") return <SignUpPage />;
    if (displayedPath === "/auth/login") return <LoginPage />;
    if (displayedPath === "/auth/forgot-password") return <ForgotPasswordPage />;
    if (displayedPath === "/auth/reset-password") return <ResetPasswordPage />;
    if (displayedPath === "/how-it-works") return <HowItWorksPage />;
    if (displayedPath === "/compare-packages") return <ComparePackagesPage />;
    if (displayedPath === "/sample-distribution") return <SampleDistributionPage />;
    if (displayedPath === "/media-database") return <MediaDatabasePage />;
    if (displayedPath === "/release-performance-insights") return <ReleasePerformanceInsightsPage />;
    if (displayedPath === "/editorial-guidelines") return <EditorialGuidelinesPage />;
    if (displayedPath === "/turnaround-slas") return <TurnaroundSlasPage />;
    if (displayedPath === "/dashboard") return <DashboardWelcomePage />;
    if (displayedPath === "/dashboard/distributions") return <DashboardHomePage />;
    if (displayedPath === "/dashboard/submit-press-release") return <SubmitPressReleasePage />;
    if (displayedPath === "/dashboard/confirm-distribution") return <ConfirmDistributionPage />;
    if (displayedPath === "/dashboard/distribution-submitted") return <DistributionSuccessPage />;
    if (displayedPath === "/pricing") return <PricingPage />;
    if (displayedPath === "/bespoke") return <BeSpokePage />;
    if (displayedPath === "/products") return <ProductsPage />;
    if (displayedPath === "/results") return <ResultsOverviewPage />;
    if (displayedPath.startsWith("/results/")) return <ResultDetailPage path={displayedPath} />;
    if (displayedPath === "/resources") return <ResourcesOverviewPage />;
    if (displayedPath === "/resources/newsroom") return <NewsroomPage />;
    if (displayedPath.startsWith("/resources/")) return <ResourceDetailPage path={displayedPath} />;
    if (displayedPath === "/company") return <CompanyOverviewPage />;
    if (displayedPath.startsWith("/company/")) return <CompanyDetailPage path={displayedPath} />;
    if (displayedPath === "/solutions") return <SolutionsPage />;

    const route = SITEMAP[displayedPath];
    if (route) return <GenericPage {...route} />;

    return (
      <main className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-4xl font-display font-bold">Page Not Found</h1>
        <p className="mt-4 text-ink/70">
          This route is ready for future expansion.
        </p>
        <div className="mt-8">
          <CtaLink href="/">Return Home</CtaLink>
        </div>
      </main>
    );
  }, [displayedPath]);

  const transitionClass =
    phase === "out" ? "animate-page-exit" :
    phase === "in"  ? "animate-page-enter" :
    "";

  return (
    <div className="min-h-screen bg-paper text-ink antialiased">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg">
        Skip to main content
      </a>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Navigation progress bar */}
      {phase !== "idle" && (
        <div
          key={path}
          className="animate-nav-progress fixed top-0 left-0 z-[9998] h-[2px] bg-primary"
        />
      )}

      <Header />

      <main id="main-content">
        <div
          className={transitionClass}
          style={phase !== "idle" ? { willChange: "opacity, transform" } : undefined}
        >
          {content}
        </div>
      </main>

      {showFloatingCTA && !path.startsWith("/dashboard") && (
        <a
          href="https://admin.blockchainwire.io/signup"
          target="_blank"
          rel="noopener noreferrer"
          className="group fixed bottom-6 right-6 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.1em] text-white btn-glow btn-glow-hover hover:-translate-y-0.5 transition-all duration-300 animate-pulse-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Submit Press Release
          <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
      )}

      <Footer />
    </div>
  );
}

