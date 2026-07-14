import type { Metadata } from "next";
import EventsCalendar from "@/components/EventsCalendar";
import { getCalendarEvents } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming events, board meetings, and neighborhood activities in Hollywood Heights.",
};

export const revalidate = 900; // 15 minutes

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
