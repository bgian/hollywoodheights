"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

interface NavLink {
  href: string;
  label: string;
  sections?: { href: string; label: string }[];
}

const NAV_LINKS: NavLink[] = [
  { href: "/neighborhood", label: "Neighborhood" },
  {
    href: "/residents",
    label: "Residents",
    sections: [
      { href: "/residents#hollywood-bowl", label: "Hollywood Bowl" },
      { href: "/residents#pinehurst-park", label: "Pinehurst Park" },
      { href: "/residents#hiho-pets", label: "HiHo Community Pet Network" },
      { href: "/residents#unhoused-response", label: "Unhoused Response" },
      { href: "/residents#emergency", label: "Emergency" },
    ],
  },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
  { href: "/membership", label: "Membership" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobile();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileOpen, closeMobile]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ background: "linear-gradient(to bottom, var(--color-hollywood-blue) 0%, var(--color-hollywood-blue) 30%, transparent 100%)" }}>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:bg-cream focus:px-4 focus:py-2 focus:text-ink focus:outline-none"
      >
        Skip to content
      </a>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          aria-label="Hollywood Heights - Home"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
        >
          <Logo className="h-8 w-auto sm:h-10" />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className={`text-sm font-bold uppercase text-cream transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue rounded-sm ${
                      isActive ? "underline underline-offset-4 decoration-cream" : "hover:opacity-70"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.sections && (
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-4 opacity-0 transition-opacity duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="min-w-[240px] rounded-[14px] border border-cream/18 bg-hollywood-blue p-2">
                        {link.sections.map((section) => (
                          <li key={section.href}>
                            <Link
                              href={section.href}
                              className="block rounded-[8px] px-3 py-2 text-xs font-bold uppercase tracking-wide text-cream/75 transition-colors duration-150 hover:bg-cream/10 hover:text-cream focus-visible:outline-none focus-visible:bg-cream/10 focus-visible:text-cream"
                            >
                              {section.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className="relative z-50 flex h-10 w-10 items-center justify-center md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
        >
          <div className="flex flex-col items-center justify-center gap-[5px]">
            <span
              className={`block h-[1.5px] w-5 bg-cream transition-transform duration-300 ${
                mobileOpen ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-cream transition-opacity duration-300 ${
                mobileOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-5 bg-cream transition-transform duration-300 ${
                mobileOpen ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-hollywood-blue md:hidden overscroll-contain"
        >
          <ul className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <li key={link.href} className="flex flex-col items-center gap-3">
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`text-2xl font-bold uppercase text-cream transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm ${
                      isActive ? "underline underline-offset-8 decoration-cream" : "hover:opacity-70"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.sections && (
                    <ul className="flex flex-col items-center gap-2">
                      {link.sections.map((section) => (
                        <li key={section.href}>
                          <Link
                            href={section.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-sm font-bold uppercase tracking-wide text-cream/70 transition-opacity duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
                          >
                            {section.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
