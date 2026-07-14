import ical, { type VEvent } from "node-ical";

export type CalendarSource = "hha" | "bowl";

export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end?: Date;
  isFullDay: boolean;
  source: CalendarSource;
}

interface Feed {
  source: CalendarSource;
  url: string;
  /** How far ahead to expand events, in days. */
  windowDays: number;
}

const FEEDS: Feed[] = [
  {
    source: "hha",
    url: "https://calendar.google.com/calendar/ical/hollywood.heights.association%40gmail.com/public/basic.ics",
    windowDays: 180,
  },
  {
    // Shorter window than HHA: the Bowl has a concert nearly every night in
    // season, but 90 days keeps the month-grid calendar useful ahead.
    source: "bowl",
    url: "https://calendar.google.com/calendar/ical/hollywoodbowlnews%40hollywoodbowl.com/public/basic.ics",
    windowDays: 90,
  },
];

const REVALIDATE_SECONDS = 900; // 15 minutes

/** node-ical values may be plain strings or { params, val } objects. */
function asString(value: unknown): string {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "val" in value) {
    return String((value as { val: unknown }).val);
  }
  return "";
}

async function fetchFeed(feed: Feed): Promise<CalendarEvent[]> {
  try {
    const res = await fetch(feed.url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];

    const parsed = ical.sync.parseICS(await res.text());
    const from = new Date();
    const to = new Date(from.getTime() + feed.windowDays * 24 * 60 * 60 * 1000);

    const events: CalendarEvent[] = [];
    for (const component of Object.values(parsed)) {
      if (!component || component.type !== "VEVENT") continue;
      const vevent = component as VEvent;

      // Expands RRULEs (honoring EXDATE and RECURRENCE-ID overrides) and
      // passes single events through unchanged.
      for (const instance of ical.expandRecurringEvent(vevent, { from, to })) {
        const summary = asString(instance.summary);
        if (!summary) continue;

        events.push({
          uid: `${vevent.uid}-${instance.start.getTime()}`,
          summary,
          description: asString(vevent.description) || undefined,
          location: asString(vevent.location) || undefined,
          start: instance.start,
          end: instance.end,
          isFullDay: instance.isFullDay,
          source: feed.source,
        });
      }
    }
    return events;
  } catch (error) {
    console.error(`Failed to load ${feed.source} calendar feed:`, error);
    return [];
  }
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  const results = await Promise.all(FEEDS.map(fetchFeed));
  return results
    .flat()
    .sort((a, b) => a.start.getTime() - b.start.getTime());
}
