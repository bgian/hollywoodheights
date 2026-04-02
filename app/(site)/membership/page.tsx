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
              href="/landmarks#boundary-map"
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
              href="https://checkout.square.site/merchant/CK6390TQX6W55/checkout/I7YIKW5IGU2XG462B7IBTD6N"
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
              href="https://checkout.square.site/merchant/CK6390TQX6W55/checkout/ZXY5KDJAU5YB4V6LLDU3TRSI"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
            >
              Join Now
            </a>
          </div>
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

          <div>
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
            <ul className="ml-4 space-y-3">
              {[
                "Create opportunities for participation, enrichment, and education",
                "Promote responsible stewardship of the neighborhood and environment",
                "Maintain and increase property values for homeowners and businesses",
                "Maintain and improve the quality of life of community members",
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
              Donation
            </h2>
            <p className="mb-6 text-base leading-relaxed text-cream">
              A tax deductible donation of any amount is greatly appreciated.
            </p>
            <a
              href="https://www.paypal.com/donate/?hosted_button_id=TVQB8FZTN5CFW"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[16px] bg-cream/6 px-8 py-3 text-sm font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
            >
              Donate
            </a>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="text-center">
          <p className="text-sm text-cream">
            Questions?{" "}
            <Link
              href="/contact"
              className="text-cream underline decoration-cream underline-offset-2 hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
            >
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
