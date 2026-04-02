import Link from "next/link";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="bg-hollywood-blue text-cream">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-cream/50">
              Location
            </h3>
            <p className="text-sm leading-relaxed text-cream/80">
              Hollywood Heights
              <br />
              Los Angeles, CA
              <br />
              Above the Hollywood Bowl
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-cream/50">
              Navigate
            </h3>
            <ul className="flex flex-col gap-2">
              {[
                { href: "/schedule", label: "Schedule" },
                { href: "/culture", label: "Culture" },
                { href: "/contact", label: "Contact" },
                { href: "/membership", label: "Membership" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream/70 transition-opacity duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-cream/50">
              Connect
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a
                  href="mailto:info@hollywoodheights.org"
                  className="text-sm text-cream/70 transition-opacity duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 rounded-sm"
                >
                  info@hollywoodheights.org
                </a>
              </li>
              <li>
                <Link
                  href="/contact#newsletter"
                  className="text-sm text-cream/70 transition-opacity duration-200 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50 rounded-sm"
                >
                  Newsletter
                </Link>
              </li>
            </ul>
            <div className="mt-4">
              <SocialIcons fill="#E7E3DC" />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-semibold tracking-[0.2em] uppercase text-cream/50">
              Association
            </h3>
            <p className="text-sm leading-relaxed text-cream/70">
              Founded in 1983 to protect, preserve, and promote our unique, historic
              neighborhood.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-cream/18 pt-8">
          <p className="text-center text-xs tracking-wider text-cream/40">
            &copy; {new Date().getFullYear()} Hollywood Heights Association
          </p>
        </div>
      </div>
    </footer>
  );
}
