import { ExternalLink, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../data/site";
import { CtaLink } from "./ui";

const TOP_BAR_LINKS = [
  { label: "Cryptobell.Live", href: "https://www.cryptobell.live/" },
  { label: "ContentSyndicate", href: "https://www.contentsyndicate.net/" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const nav = [
    ...NAV_ITEMS,
    {
      label: "Log in",
      href: "https://admin.blockchainwire.io/signin",
      external: true,
    },
  ];

  // Focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const menu = mobileMenuRef.current;
    if (!menu) return;

    // Get all focusable elements
    const focusableElements = menu.querySelectorAll(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    // Focus first element when menu opens
    if (firstElement) {
      firstElement.focus();
    }

    // Handle Tab and Escape keys
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        // Shift+Tab
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        // Return focus to toggle button
        const toggleButton = document.querySelector(
          '[aria-label="Toggle navigation menu"]',
        ) as HTMLElement;
        toggleButton?.focus();
      }
    };

    menu.addEventListener("keydown", handleTabKey);
    menu.addEventListener("keydown", handleEscapeKey);

    return () => {
      menu.removeEventListener("keydown", handleTabKey);
      menu.removeEventListener("keydown", handleEscapeKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface/90 backdrop-blur-xl border-b border-ink/5 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
        <div className="bg-ink">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-end gap-6 py-1">
            {TOP_BAR_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-base font-bold text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
                <ExternalLink className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
        <div className="px-4 sm:px-6 py-3">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-3 group">
                <img
                  src="/Logo Horizontal Color.svg"
                  alt="Blockchain Wire"
                  className="h-6 sm:h-7 w-auto transition-transform duration-300 group-hover:scale-105"
                />
              </a>

              <nav className="hidden items-center gap-1 lg:flex">
                {nav.map((item) => {
                  const isActive = window.location.pathname === item.href;
                  return (
                    <div key={item.label} className="relative">
                      <a
                        href={item.href}
                        className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                          isActive
                            ? "text-ink bg-surface-alt/50"
                            : "text-ink/85 hover:text-ink hover:bg-surface-alt/50"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {item.label}
                      </a>
                    </div>
                  );
                })}
              </nav>

              <div className="hidden lg:flex items-center gap-4">
                <CtaLink href="https://admin.blockchainwire.io/signup">
                  Get Started
                </CtaLink>
              </div>

              <button
                className="lg:hidden p-2 -mr-2 rounded-xl hover:bg-surface-alt transition-colors"
                onClick={() => setMobileOpen((value) => !value)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                {mobileOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          id="mobile-menu"
          className="lg:hidden fixed inset-0 z-50 bg-surface"
        >
          <div className="sticky top-0 px-4 sm:px-6 py-5 bg-surface/90 backdrop-blur-xl border-b border-ink/5">
            <div className="mx-auto max-w-6xl flex items-center justify-between">
              <img
                src="/Logo Horizontal Color.svg"
                alt="Blockchain Wire"
                className="h-7 w-auto"
              />
              <button
                className="p-2 -mr-2 rounded-xl hover:bg-surface-alt transition-colors"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <nav className="mx-auto max-w-6xl px-6 py-8">
            <div className="space-y-1">
              {nav.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-4 py-4 text-lg font-medium text-ink/85 hover:text-ink hover:bg-surface-alt transition-all duration-200"
                    {...(item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-ink/10">
              <CtaLink
                href="https://admin.blockchainwire.io/signup"
                className="w-full justify-center"
              >
                Get Started
              </CtaLink>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-surface section-spacing-sm">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2">
            <img
              src="/Logo Horizontal Color.svg"
              alt="Blockchain Wire"
              className="h-8 w-auto"
            />
            <p className="mt-6 text-base text-ink/60 leading-relaxed">
              Mainstream media solutions at a good price. Designed for impact.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href="https://www.facebook.com/blockchainwire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/blockchainwire.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://x.com/blockchainwire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="X"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/blockchain-wire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://t.me/Blockchain_Wire"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0a12 12 0 00-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
              <a
                href="https://api.blockchainwire.io/feed-rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink/85 hover:text-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                aria-label="RSS Feed"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.18 15.64a2.18 2.18 0 010 4.36 2.18 2.18 0 010-4.36M4 4.44A15.56 15.56 0 0119.56 20h-2.83A12.73 12.73 0 004 7.27V4.44m0 5.66a9.9 9.9 0 019.9 9.9h-2.83A7.07 7.07 0 004 12.93V10.1z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <ul className="mt-0 space-y-3">
              <li>
                <a
                  href="https://admin.blockchainwire.io/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ink/60 hover:text-ink transition-colors"
                >
                  Sign Up
                </a>
              </li>
              <li>
                <a
                  href="https://admin.blockchainwire.io/signin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-ink/60 hover:text-ink transition-colors"
                >
                  Log In
                </a>
              </li>
              <li>
                <a
                  href="/company/contact"
                  className="text-base text-ink/60 hover:text-ink transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <ul className="mt-0 space-y-3">
              <li>
                <a
                  href="/company/legal#privacy"
                  className="text-base text-ink/60 hover:text-ink transition-colors"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="/company/legal#terms"
                  className="text-base text-ink/60 hover:text-ink transition-colors"
                >
                  Terms &amp; Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <p className="text-sm text-ink/85">
            © {new Date().getFullYear()} BlockchainWire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
