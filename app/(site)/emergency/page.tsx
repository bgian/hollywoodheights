import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency",
  description:
    "Emergency preparedness and response guidance for the Hollywood Heights neighborhood -- life threatening and medical emergencies, earthquakes, evacuation points, and how to stay informed.",
};

export default function EmergencyPage() {
  return (
    <div>
      <section className="pt-32 pb-6">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            Emergency
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            How to prepare for and respond to emergencies in Hollywood Heights
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 pt-8 pb-24">
        <div className="space-y-12">
          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              Life Threatening Emergency
            </h2>
            <p className="text-base leading-relaxed text-cream">
              If you see fire, experience a destructive earthquake, a crime being committed, or any person experiencing trauma or harm, <strong>call 911.</strong>
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              Medical Emergency
            </h2>
            <p className="text-base leading-relaxed text-cream">If a person is any of the following:</p>
            <ul className="mt-3 ml-4 space-y-2">
              {[
                "Unresponsive",
                "In extreme pain",
                "Bleeding profusely",
                "Unable to move",
                "Confused or unable to state their name or location",
                "Asking for medical assistance",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-cream">
                  <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-cream" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-relaxed text-cream">
              <strong>Call 911.</strong>
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream">
              If you suspect a medical emergency but are unsure of the severity, please call the Non-Emergency Fire Paramedics:{" "}
              <a href="tel:+18006888000" className="underline decoration-cream underline-offset-4 hover:opacity-70">
                1-800-688-8000
              </a>
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream">
              <strong>Stay with the injured party until help arrives.</strong> If your own safety is compromised, leave the person and try to maintain visual contact.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              Earthquake
            </h2>
            <ul className="ml-4 space-y-2">
              {[
                "Drop — Cover — Hold",
                "Inside: Avoid windows and unsecured furniture",
                "Outside: Move to a clear area, away from poles and wires",
                "When the shaking stops, remain in place and survey your situation",
                "If your building or home appears to be unsafe, begin evacuation if it is safe to do so",
                "Assemble at your designated meeting point or the Hollywood Bowl parking lots",
                "Use text communication rather than telephone communication",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-cream">
                  <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-cream" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              Evacuation Point
            </h2>
            <p className="text-base leading-relaxed text-cream">
              You are encouraged to make a communication and evacuation plan from your home or business.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream">
              If you have not made a plan or are unable to carry it out, please assemble at the parking lots of The Hollywood Bowl. If the Bowl is unsafe, please assemble at the Highland Camrose Park.
            </p>
            <p className="mt-4 text-base leading-relaxed text-cream">
              Await further instruction from emergency personnel and staff.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              Non-Emergency Contacts
            </h2>
            <p className="text-base leading-relaxed text-cream">
              If you have a non-emergency, please refer to the numbers and websites listed on our{" "}
              <a href="tel:+18772755273" className="underline decoration-cream underline-offset-4 hover:opacity-70">
                Non-Emergency Police Line (877-ASK-LAPD)
              </a>
              .
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              Stay Informed
            </h2>
            <p className="text-base leading-relaxed text-cream">
              You can sign up for alerts from the City and County of Los Angeles.
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
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
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-2xl font-light tracking-wide text-cream">
              For More Information
            </h2>
            <p className="text-base leading-relaxed text-cream">
              For more information on planning for emergencies and training:
            </p>
            <div className="mt-4 flex flex-wrap gap-4">
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
