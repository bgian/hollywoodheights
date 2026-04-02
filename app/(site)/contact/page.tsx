import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact the Hollywood Heights Association board of directors or sign up for our newsletter.",
};

const BOARD_EXECUTIVE = [
  { name: "Lesley Holmes", role: "President", email: "president@hollywoodheights.org", photo: "/assets/board/lesley-holmes.png" },
  { name: "Kelly O\u2019Brien", role: "Vice President", email: "vp@hollywoodheights.org", photo: "/assets/board/kelly-obrien.png" },
  { name: "Scott Peake", role: "Co-Treasurer", email: "treasurer@hollywoodheights.org", photo: "/assets/board/scott-peake.png" },
  { name: "Richard Trenz", role: "Co-Treasurer", email: "treasurer@hollywoodheights.org", photo: "/assets/board/richard-trenz.png" },
  { name: "Tim Grant", role: "Secretary", email: "bod@hollywoodheights.org", photo: "/assets/board/tim-grant.png" },
] as const;

const BOARD_MEMBERS = [
  "Fredrica Cooper",
  "Joyce Dyrector",
  "Rick Foulkes",
  "Stef Garden",
  "Che Johnson",
  "Richard Loyd",
  "Paul Norling",
  "Nicola Phillips",
  "Bronni Stein",
];

export default function ContactPage() {
  return (
    <div>
      <section className="pt-32 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            Contact
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            Reach out to the Hollywood Heights Association
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
              Get in Touch
            </h2>
            <p className="mb-6 text-base leading-relaxed text-cream">
              To contact the board of directors of the Hollywood Heights Association:
            </p>
            <a
              href="mailto:info@hollywoodheights.org"
              className="text-lg text-cream underline decoration-cream underline-offset-4 transition-colors duration-200 hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
            >
              info@hollywoodheights.org
            </a>

            <form className="mt-10 space-y-5" action="https://formspree.io/f/placeholder" method="POST">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm tracking-wider text-cream">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  autoComplete="name"
                  required
                  placeholder="Your name..."
                  className="w-full rounded-[16px] border border-cream/18 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream focus:border-cream focus:outline-none focus:ring-1 focus:ring-cream"
                />
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
                  placeholder="you@example.com"
                  className="w-full rounded-[16px] border border-cream/18 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream focus:border-cream focus:outline-none focus:ring-1 focus:ring-cream"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm tracking-wider text-cream">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="How can we help..."
                  className="w-full rounded-[16px] resize-y border border-cream/18 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream focus:border-cream focus:outline-none focus:ring-1 focus:ring-cream"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
              >
                Send Letter
              </button>
            </form>
          </div>

          <div>
            <div id="newsletter" style={{ scrollMarginTop: "6rem" }}>
              <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
                Newsletter
              </h2>
              <p className="text-base leading-relaxed text-cream">
                For the latest news about Hollywood Heights, sign up for our email newsletter.
                We send updates on neighborhood issues, events, and community happenings.
              </p>
              <a
                href="mailto:info@hollywoodheights.org?subject=Newsletter%20Signup"
                className="mt-6 inline-flex items-center justify-center rounded-[16px] bg-cream px-8 py-3 text-sm font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
              >
                Sign Up
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
                        className="h-8 w-8 rounded-full object-cover"
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

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
          Unhoused Response
        </h2>
        <p className="mb-5 text-base leading-relaxed text-cream">
          Finding clear guidance on how to respond to situations involving unhoused citizens in our neighborhood can be tricky. There are multiple city and county agencies that deal with support for the unhoused and it can be hard to know how to find a compassionate and appropriate response.
        </p>
        <p className="mb-8 text-base leading-relaxed text-cream">
          Thankfully the Hollywood area is served by the Mayor&apos;s CIRCLE team. CIRCLE, which stands for Crisis and Incident Response through Community-led Engagement, is a 24/7 unarmed response program that deploys trained teams to address non-urgent LAPD calls related to unhoused individuals.
        </p>
        <a
          href="tel:+18772755273"
          className="block rounded-[16px] bg-cream/6 px-6 py-5 transition-opacity duration-200 hover:opacity-90"
        >
          <p className="text-xs tracking-[0.15em] uppercase text-cream">
            Non-Emergency Police Line
          </p>
          <p className="mt-1 text-2xl font-light tracking-wide text-cream">
            877-ASK-LAPD
          </p>
          <p className="mt-1 text-sm text-cream">Ask for CIRCLE when appropriate</p>
        </a>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <h2 className="mb-6 text-2xl font-light tracking-wide text-cream">
          Emergency
        </h2>

        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium text-cream">Life Threatening Emergency</h3>
            <p className="mt-2 text-base leading-relaxed text-cream">
              If you see fire, experience a destructive earthquake, a crime being committed or any person experiencing trauma or harm, <strong>call 911.</strong>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-cream">Medical Emergency</h3>
            <p className="mt-2 text-base leading-relaxed text-cream">
              If a person is unresponsive, in extreme pain, bleeding profusely, unable to move, confused, or asking for medical assistance, <strong>call 911.</strong>
            </p>
            <p className="mt-2 text-base leading-relaxed text-cream">
              If you suspect a medical emergency but are unsure of the severity, call Non-Emergency Fire Paramedics:{" "}
              <a href="tel:+18006888000" className="underline decoration-cream underline-offset-4 hover:opacity-70">1-800-688-8000</a>
            </p>
            <p className="mt-2 text-base leading-relaxed text-cream">
              <strong>Stay with the injured party until help arrives.</strong> If your own safety is compromised, leave the person and try to maintain visual contact.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-cream">Earthquake</h3>
            <ul className="mt-2 space-y-1 text-base leading-relaxed text-cream">
              <li><strong>Drop — Cover — Hold</strong></li>
              <li>Inside: Avoid windows and unsecured furniture</li>
              <li>Outside: Move to a clear area, away from poles and wires</li>
              <li>When the shaking stops, remain in place and survey your situation</li>
              <li>Assemble at the Hollywood Bowl parking lots or Highland Camrose Park</li>
              <li>Use text communication rather than telephone communication</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium text-cream">Evacuation Point</h3>
            <p className="mt-2 text-base leading-relaxed text-cream">
              You are encouraged to make a communication and evacuation plan from your home or business. If you have not made a plan, please assemble at the parking lots of The Hollywood Bowl. If the Bowl is unsafe, assemble at Highland Camrose Park. Await further instruction from emergency personnel.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium text-cream">Stay Informed</h3>
            <div className="mt-3 flex flex-wrap gap-4">
              <a
                href="https://emergency.lacity.gov/notifyla"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
              >
                NotifyLA
              </a>
              <a
                href="https://alert.lacounty.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
              >
                Alert LA County
              </a>
              <a
                href="https://ready.lacounty.gov"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
              >
                ReadyLA
              </a>
              <a
                href="https://lacounty.gov/emergency"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-[10px] bg-cream/6 px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90"
              >
                LA County Emergency
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
