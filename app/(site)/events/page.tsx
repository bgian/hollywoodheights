import type { Metadata } from "next";
import { getCalendarEvents, type CalendarEvent } from "@/lib/calendar";

export const metadata: Metadata = {
  title: "Schedule",
  description:
    "Upcoming events, board meetings, and neighborhood activities in Hollywood Heights.",
};

export const revalidate = 900; // 15 minutes

function extractZoomLink(text?: string): string | null {
  if (!text) return null;
  const match = text.match(/(https?:\/\/[^\s]*zoom[^\s]*)/i);
  return match ? match[1] : null;
}

function EventCard({ event }: { event: CalendarEvent }) {
  const dayOfWeek = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(event.start);
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(event.start);
  const day = event.start.getDate();
  const year = event.start.getFullYear();

  const hasTime = event.start.getHours() !== 0 || event.start.getMinutes() !== 0;
  const time = hasTime
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(event.start)
    : null;

  const endTime =
    hasTime && event.end
      ? new Intl.DateTimeFormat("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(event.end)
      : null;

  const zoomLink = extractZoomLink(event.description) || extractZoomLink(event.location);

  return (
    <article
      id={`event-${event.uid}`}
      className="flex gap-8 py-12 scroll-mt-24"
    >
      <div
        className="flex w-20 shrink-0 flex-col items-center justify-center rounded-[16px] bg-cream/6 px-4 py-4 text-center"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        <span className="text-xs tracking-[0.15em] uppercase text-cream">
          {dayOfWeek}
        </span>
        <span className="text-4xl font-light text-cream">{day}</span>
        <span className="text-xs tracking-wider uppercase text-cream">
          {month} {year}
        </span>
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-xl font-light tracking-wide text-cream">{event.summary}</h3>

        {time && (
          <p className="mt-3 text-sm text-cream" style={{ fontVariantNumeric: "tabular-nums" }}>
            {time}
            {endTime && ` \u2013 ${endTime}`}
          </p>
        )}
        {event.location && !event.location.match(/zoom/i) && (
          <p className="mt-1 text-sm text-cream">{event.location}</p>
        )}

        {zoomLink && (
          <a
            href={zoomLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center rounded-[10px] bg-cream px-5 py-2 text-xs font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90"
          >
            Join via Zoom
          </a>
        )}
      </div>
    </article>
  );
}

function groupEventsByMonth(events: CalendarEvent[]) {
  const groups: Map<string, CalendarEvent[]> = new Map();

  for (const event of events) {
    const key = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(event.start);

    const existing = groups.get(key) || [];
    existing.push(event);
    groups.set(key, existing);
  }

  return groups;
}

export default async function EventsPage() {
  const events = await getCalendarEvents();
  const grouped = groupEventsByMonth(events);

  return (
    <div>
      <section className="pt-32 pb-14">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="text-4xl font-light tracking-wide sm:text-5xl lg:text-6xl">
            Schedule
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-cream">
            Board meetings, socials &amp; neighborhood happenings
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        {events.length > 0 ? (
          <div className="space-y-12">
            {Array.from(grouped.entries()).map(([monthYear, monthEvents]) => (
              <div key={monthYear}>
                <h2 className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-cream">
                  {monthYear}
                </h2>
                <div>
                  {monthEvents.map((event, idx) => (
                    <EventCard key={`${event.uid}-${idx}`} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
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
        )}
      </section>
    </div>
  );
}
