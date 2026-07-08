import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Membership",
  description:
    "Join the Hollywood Heights Association and support our historic neighborhood.",
};

export default function MembershipPage() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-32 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            Hollywood Heights Association
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            If you are a Hollywood Heights{" "}
            <Link
              href="/neighborhood#boundary-map"
              className="text-cream underline decoration-cream underline-offset-2 hover:decoration-cream"
            >
              resident
            </Link>
            , join Hollywood Heights Association to get involved in improving and
            advocating for our unique and historic gem of a neighborhood.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="rounded-[24px] border border-cream/18 bg-transparent p-10 text-center">
            <h2 className="text-2xl font-light tracking-wide text-cream">
              Homeowner Membership
            </h2>
            <p className="mt-4 text-4xl font-light text-cream">
              $100
              <span className="text-base text-cream"> / year per household</span>
            </p>
            <a
              href="https://www.zeffy.com/en-US/ticketing/join-hollywood-heights-association"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
            >
              Join Now
            </a>
          </div>

          <div className="rounded-[24px] border border-cream/18 bg-transparent p-10 text-center">
            <h2 className="text-2xl font-light tracking-wide text-cream">
              Renter Membership
            </h2>
            <p className="mt-4 text-4xl font-light text-cream">
              $50
              <span className="text-base text-cream"> / year per household</span>
            </p>
            <a
              href="https://www.zeffy.com/en-US/ticketing/join-hollywood-heights-association"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
            >
              Join Now
            </a>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-cream">
            You can also make a tax-deductible donation. Any amount is greatly appreciated.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-cream">
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-to-hollywood-heights-association"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream underline decoration-cream underline-offset-2 hover:decoration-cream"
            >
              Donate to Hollywood Heights Association
            </a>
          </p>
        </div>
      </section>

      {/* 2x2 Grid: Supports / Benefits / Mission / Donation */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
              Your Membership Supports
            </h2>
            <p className="mb-6 text-base leading-relaxed text-cream">
              By joining HHA, you are supporting a strong voice in your community.
            </p>
            <ul className="ml-4 space-y-3">
              {[
                "Traffic Mitigation",
                "Hollywood Bowl Issues",
                "Historic Preservation",
                "Neighborhood Beautification",
                "Parking and Safety",
                "Local and Community Events",
                "Annual Neighborhood Cleanup",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-cream">
                  <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-cream" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
              Exclusive Member Benefits
            </h2>
            <p className="mb-6 text-base leading-relaxed text-cream">
              Members also receive these exclusive benefits:
            </p>
            <ul className="ml-4 space-y-3">
              {[
                "HHA Sponsored Neighborhood Social Events throughout the year",
                "Complimentary Tickets to the Hollywood Bowl (select show offerings)",
                "Raffle entries for tickets to premiere concerts at the Hollywood Bowl and the Ford Amphitheater",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-cream">
                  <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-cream" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
              Mission &amp; Objectives
            </h2>
            <p className="mb-4 text-base leading-relaxed text-cream">
              Hollywood Heights Association was founded in 1983, to protect, preserve, and
              promote the unique, historic district called Hollywood Heights, and the special
              qualities of life it offers to residents.
            </p>
            <p className="mb-6 text-base leading-relaxed text-cream">
              Moments away from the noise and glare of Hollywood Boulevard lies a fascinating
              oasis of cultural landmarks, charming iconic homes, and historic properties.
            </p>
            <ul className="space-y-4">
              {[
                "Create opportunities for participation, enrichment, and education",
                "Promote responsible stewardship of the neighborhood and environment",
                "Maintain and increase property values for homeowners and businesses",
                "Maintain and improve the quality of life of community members",
              ].map((item, index) => (
                <li key={item} className="flex items-center gap-4 text-base text-cream">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream/15 text-sm font-medium text-cream">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
      </section>
    </div>
  );
}
