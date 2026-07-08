import Link from "next/link";

const QUICK_LINKS = [
  { href: "/neighborhood", label: "Neighborhood" },
  { href: "/residents", label: "Residents" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
  { href: "/membership", label: "Membership" },
] as const;

export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center bg-hollywood-blue px-6 py-16 text-center text-cream">
      <div className="flex w-full max-w-[560px] flex-col items-center">
        <p className="text-7xl font-light tracking-[0.1em] sm:text-8xl">404</p>

        <h1 className="mt-4 text-2xl font-light tracking-wide sm:text-3xl">
          This street isn&apos;t on the map
        </h1>

        <p className="mt-4 max-w-md text-base leading-relaxed text-cream/80">
          The page you&apos;re looking for wandered off into the Hollywood Hills.
          Let&apos;s get you back to familiar ground.
        </p>

        <Link
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
        >
          Return Home
        </Link>

        <nav aria-label="Site sections" className="mt-12">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wide text-cream/80 underline decoration-cream/40 underline-offset-4 transition-colors duration-200 hover:text-cream hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue rounded-sm"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
