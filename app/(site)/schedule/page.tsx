import type { Metadata } from "next";
import EventsCalendar from "@/components/EventsCalendar";
import { getCalendarEvents } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming events, board meetings, and neighborhood activities in Hollywood Heights.",
};

export const revalidate = 900; // 15 minutes

// webcal:// opens the user's calendar app and subscribes (auto-updating),
// instead of downloading a one-time .ics snapshot over https.
const CALENDAR_SUBSCRIPTIONS = [
  {
    label: "Add Neighborhood Calendar",
    href: "webcal://calendar.google.com/calendar/ical/hollywood.heights.association%40gmail.com/public/basic.ics",
  },
  {
    label: "Add Hollywood Bowl Calendar",
    href: "webcal://calendar.google.com/calendar/ical/hollywoodbowlnews%40hollywoodbowl.com/public/basic.ics",
  },
] as const;

export default async function EventsPage() {
  const events = await getCalendarEvents();

  return (
    <div>
      <section className="pt-40 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="py-3 text-5xl font-medium uppercase tracking-tight sm:text-6xl lg:text-7xl">
            Schedule
          </h1>
        </div>
      </section>

      {events.length > 0 ? (
        <section className="w-full px-8 pb-24">
          <EventsCalendar events={events} />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {CALENDAR_SUBSCRIPTIONS.map((cal) => (
              <a
                key={cal.label}
                href={cal.href}
                className="rounded-[10px] border border-cream/30 px-4 py-1.5 text-xs font-bold uppercase text-cream transition-colors duration-150 hover:border-cream/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
              >
                {cal.label}
              </a>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-cream">
            For Hollywood Boulevard street closures,{" "}
            <a
              href="https://hollywoodpartnership.com/alerts"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-cream underline-offset-4 transition-colors duration-200 hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
            >
              click here
            </a>
            .
          </p>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 pb-24">
          <div className="py-16 text-center">
            <p className="text-lg text-cream">
              No upcoming events right now. Check back soon!
            </p>
            <a
              href="https://calendar.google.com/calendar/embed?src=hollywood.heights.association%40gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-cream underline decoration-cream underline-offset-2 transition-colors duration-200 hover:decoration-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream rounded-sm"
            >
              View Google Calendar
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
