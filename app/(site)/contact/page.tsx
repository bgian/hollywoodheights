import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Sign up for the Hollywood Heights Association newsletter or contact the board of directors.",
};

const BOARD_EXECUTIVE = [
  { name: "Lesley Holmes", role: "President", email: "president@hollywoodheights.org", photo: "/assets/board/lesley-holmes.png" },
  { name: "Kelly O\u2019Brien", role: "Vice President", email: "vp@hollywoodheights.org", photo: "/assets/board/kelly-obrien.png" },
  { name: "Scott Peake", role: "Co-Treasurer", email: "treasurer@hollywoodheights.org", photo: "/assets/board/scott-peake.png" },
  { name: "Tim Grant", role: "Secretary", email: "bod@hollywoodheights.org", photo: "/assets/board/tim-grant.png" },
] as const;

const BOARD_MEMBERS = [
  "Joyce Dyrector",
  "Rick Foulkes",
  "Stef Garden",
  "Bobby Giangeruso",
  "Che Johnson",
  "Richard Loyd",
  "Paul Norling",
  "Nicola Phillips",
  "Bronni Stein",
  "Luke Walker",
];

export default function ContactPage() {
  return (
    <div>
      <section className="pt-32 pb-6">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="py-3 text-5xl font-medium uppercase tracking-tight sm:text-6xl lg:text-7xl">
            Contact
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            Reach out to the Hollywood Heights Association
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pt-8 pb-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div id="newsletter" style={{ scrollMarginTop: "6rem" }}>
            <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
              Join Newsletter
            </h2>
            <p className="mb-6 text-base leading-relaxed text-cream">
              For the latest news about Hollywood Heights, sign up for our email newsletter.
              We send updates on neighborhood issues, events, and community happenings.
            </p>

            <form className="mt-10 space-y-5" action="https://formspree.io/f/placeholder" method="POST">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first-name" className="mb-1 block text-sm tracking-wider text-cream">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first-name"
                    name="first_name"
                    autoComplete="given-name"
                    required
                    placeholder="First name"
                    className="w-full rounded-[16px] border border-cream/18 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream focus:border-cream focus:outline-none focus:ring-1 focus:ring-cream"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="mb-1 block text-sm tracking-wider text-cream">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last-name"
                    name="last_name"
                    autoComplete="family-name"
                    required
                    placeholder="Last name"
                    className="w-full rounded-[16px] border border-cream/18 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream focus:border-cream focus:outline-none focus:ring-1 focus:ring-cream"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm tracking-wider text-cream">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  spellCheck={false}
                  placeholder="your@email.com"
                  className="w-full rounded-[16px] border border-cream/18 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream focus:border-cream focus:outline-none focus:ring-1 focus:ring-cream"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div>
            <div>
              <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
                Get in Touch
              </h2>
              <p className="mb-4 text-base leading-relaxed text-cream">
                To contact the board of directors of the Hollywood Heights Association:
              </p>
              <a
                href="mailto:info@hollywoodheights.org"
                className="text-lg text-cream underline decoration-cream underline-offset-4 transition-colors duration-200 hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
              >
                info@hollywoodheights.org
              </a>
            </div>

            <div className="mt-14 border-t border-cream/18 pt-10">
              <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
                Board of Directors
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-cream">
                The board is composed of local volunteers residing within Hollywood Heights,
                elected by the membership annually. We meet on the first Tuesday of the month.
              </p>

              <div className="space-y-4">
                {BOARD_EXECUTIVE.map((member) => (
                  <div key={member.name} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={32}
                        height={32}
                        className="h-8 w-8 rounded-full object-cover grayscale sepia-[.35]"
                      />
                      <div>
                        <p className="text-sm font-medium text-cream">{member.name}</p>
                        <p className="text-xs text-cream">{member.role}</p>
                      </div>
                    </div>
                    <a
                      href={`mailto:${member.email}`}
                      className="shrink-0 text-xs text-cream underline decoration-cream underline-offset-2 hover:text-cream hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
                    >
                      Email
                    </a>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-xs tracking-[0.1em] uppercase text-cream">
                  Board Members
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream">
                  {BOARD_MEMBERS.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
