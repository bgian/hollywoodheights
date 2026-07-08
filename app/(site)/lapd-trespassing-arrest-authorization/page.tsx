import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "LAPD Trespassing Arrest Authorization",
  description:
    "How Hollywood Heights property owners can post a compliant no trespassing sign, notarize the LAPD Trespass Arrest Authorization Form, and file it with LAPD Hollywood Division.",
};

const FORM_URL =
  "https://drive.google.com/file/d/1oq7X9_y_RRmz7WquipVbaGlF1lWDeV6o/view?usp=sharing";

const link = (href: string, children: ReactNode) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline decoration-cream underline-offset-4 hover:opacity-70"
  >
    {children}
  </a>
);

const STEPS: { n: number; title: string; points: ReactNode[] }[] = [
  {
    n: 1,
    title: "Post a Compliant No Trespassing Sign",
    points: [
      "Your sign must comply with Los Angeles Municipal Code Sec. 41.24.",
      "Post at every walkway and driveway entrance, and at minimum every 50 feet along an unfenced boundary.",
      "At least one sign must be visible and readable from each entrance.",
      "Custom aluminum signs (12\u2033 \u00d7 18\u2033) compliant with LAMC are available from HHA for $30.",
    ],
  },
  {
    n: 2,
    title: "Complete & Notarize the Arrest Authorization Form",
    points: [
      <>A copy of the Trespass Arrest Authorization Form can be {link(FORM_URL, "downloaded here")}.</>,
      "Fill in all required fields: property address, owner information, and description of the property.",
      <>Take the completed form to a Notary Public for signature and seal. UPS stores, banks, and many offices offer notary services. Online notaries such as {link("https://www.office.fedex.com/default/online-notary", "FedEx")}, {link("https://www.notarize.com/", "Notarize.com")}, and {link("https://docusign.onenotary.us/acts/no_account/d7128fb7-9531-4ce9-9eeb-055eceac1c8b", "DocuSign")} are also available.</>,
      "You do not need a police officer present when completing the form.",
      "The form is only valid for 12 months \u2014 you must repeat this process every year.",
    ],
  },
  {
    n: 3,
    title: "Deliver to LAPD Hollywood Division",
    points: [
      "Bring your notarized form in person to the LAPD Hollywood Community Police Station \u2014 1358 N. Wilcox Ave., Los Angeles, CA 90028.",
      "No appointment needed \u2014 drop off at the front desk during station hours.",
      "Keep a copy of the notarized form for your records.",
    ],
  },
];

export default function LapdTrespassingPage() {
  return (
    <div>
      <section className="pt-32 pb-6">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            LAPD Trespassing Arrest Authorization
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            How to authorize LAPD to enforce trespassing on your Hollywood Heights property
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-8 pb-24">
        <div className="mb-12 rounded-[24px] border border-cream/18 p-8 text-center">
          <p className="text-xs tracking-[0.15em] uppercase text-cream/60">No Trespassing Sign</p>
          <p className="mt-4 text-2xl font-light tracking-wide text-cream">
            This Property Closed to the Public
          </p>
          <p className="mt-2 text-lg font-light text-cream">No Entry Without Permission</p>
          <p className="mt-4 text-xs tracking-[0.2em] uppercase text-cream/60">L.A.M.C. Sec. 41.24</p>
        </div>

        <div className="space-y-6">
          {STEPS.map((step) => (
            <div key={step.n} className="rounded-[24px] border border-cream/18 p-8">
              <div className="flex items-center gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream/15 text-sm font-medium text-cream">
                  {step.n}
                </span>
                <h2 className="text-xl font-light tracking-wide text-cream sm:text-2xl">
                  {step.title}
                </h2>
              </div>
              <ul className="mt-5 ml-1 space-y-3">
                {step.points.map((point, pi) => (
                  <li key={pi} className="flex items-start gap-3 text-base leading-relaxed text-cream">
                    <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-cream" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {step.n === 1 && (
                <div className="mt-6 ml-1">
                  <a
                    href="https://www.zeffy.com/en-US/ticketing/hollywood-heights-associations-shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-[10px] bg-cream px-4 py-2 text-xs font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90"
                  >
                    Buy a No Trespassing Sign
                  </a>
                </div>
              )}
              {step.n === 2 && (
                <div className="mt-6 ml-1">
                  <a
                    href={FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
                  >
                    Download the Form
                  </a>
                </div>
              )}
              {step.n === 3 && (
                <p className="mt-5 ml-1 text-base leading-relaxed text-cream">
                  Phone:{" "}
                  <a
                    href="tel:+12139722971"
                    className="underline decoration-cream underline-offset-4 hover:opacity-70"
                  >
                    (213) 972-2971
                  </a>
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[24px] bg-cream/6 p-8 text-center">
          <p className="text-xs tracking-[0.15em] uppercase text-cream/60">Annual Renewal Required</p>
          <p className="mt-3 text-base leading-relaxed text-cream">
            The Arrest Authorization Form expires after 12 months. Mark your calendar and repeat Steps 2 &amp; 3 each year to maintain LAPD enforcement authority on your property.
          </p>
        </div>

        <p className="mt-10 text-center text-base leading-relaxed text-cream">
          Questions? Contact your Hollywood Heights Association at{" "}
          <a
            href="mailto:bod@hollywoodheights.org"
            className="underline decoration-cream underline-offset-4 hover:opacity-70"
          >
            bod@hollywoodheights.org
          </a>{" "}
          or LAPD Hollywood Division at{" "}
          <a
            href="tel:+12139722971"
            className="underline decoration-cream underline-offset-4 hover:opacity-70"
          >
            (213) 972-2971
          </a>
          .
        </p>
      </section>
    </div>
  );
}
