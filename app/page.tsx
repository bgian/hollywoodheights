import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/Logo";
import SocialIcons from "@/components/SocialIcons";
import SplashOverlay from "@/components/SplashOverlay";

const NAV_LINKS = [
  { href: "/landmarks", label: "Neighborhood" },
  { href: "/history", label: "Culture" },
  { href: "/events", label: "Schedule" },
  { href: "/news", label: "News" },
  { href: "/contact", label: "Contact" },
  { href: "/membership", label: "Membership" },
] as const;

export default function HomePage() {
  return (
    <>
      <SplashOverlay />

      <main className="flex min-h-dvh flex-col items-center justify-between bg-hollywood-blue px-6 py-12 text-cream sm:py-16">
        <div className="flex w-full max-w-[680px] flex-col items-center">
          <p className="mb-5 text-center text-base tracking-wide sm:mb-6 sm:text-lg">
            Intimate &amp; Hidden
          </p>

          <Logo className="w-full max-w-[400px]" />

          <p className="mt-5 text-center text-base uppercase sm:mt-6 sm:text-lg">
            Since 1983
          </p>
        </div>

        <div className="flex w-full flex-col items-center py-8 sm:py-12">
          <Image
            src="/images/illustration.png"
            alt="Illustrated view of Hollywood Heights neighborhood architecture"
            width={960}
            height={810}
            className="mx-auto h-auto w-full max-w-[320px]"
            style={{ filter: "brightness(0) invert(1) sepia(0.15) saturate(0.5) hue-rotate(350deg) brightness(0.93)" }}
            priority
          />
          <p className="mt-6 max-w-[368px] text-center text-lg leading-[24px] text-cream sm:mt-8">
            Hollywood Heights Association was founded in 1983, to protect, preserve, and
            promote the unique, historic district called Hollywood Heights, and the special
            qualities of life it offers to residents.
          </p>
        </div>

        <div className="flex w-full flex-col items-center gap-6 sm:gap-8">
          <nav aria-label="Main navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-lg uppercase text-cream underline decoration-cream underline-offset-4 transition-colors duration-200 hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <SocialIcons fill="#E7E3DC" />
        </div>
      </main>
    </>
  );
}
