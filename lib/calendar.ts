const CALENDAR_URL =
  "https://calendar.google.com/calendar/ical/hollywood.heights.association%40gmail.com/public/basic.ics";

export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end?: Date;
}

function parseICSDate(dateStr: string): Date {
  // ICS dates can be YYYYMMDD or YYYYMMDDTHHmmssZ or YYYYMMDDTHHMMSS
  const cleaned = dateStr.replace(/[^0-9TZ]/g, "");

  if (cleaned.length === 8) {
    const year = parseInt(cleaned.slice(0, 4));
    const month = parseInt(cleaned.slice(4, 6)) - 1;
    const day = parseInt(cleaned.slice(6, 8));
    return new Date(year, month, day);
  }

  const year = parseInt(cleaned.slice(0, 4));
  const month = parseInt(cleaned.slice(4, 6)) - 1;
  const day = parseInt(cleaned.slice(6, 8));
  const hour = parseInt(cleaned.slice(9, 11)) || 0;
  const minute = parseInt(cleaned.slice(11, 13)) || 0;
  const second = parseInt(cleaned.slice(13, 15)) || 0;

  if (cleaned.endsWith("Z")) {
    return new Date(Date.UTC(year, month, day, hour, minute, second));
  }

  return new Date(year, month, day, hour, minute, second);
}

function unfoldICS(text: string): string {
  return text.replace(/\r?\n[ \t]/g, "");
}

function unescapeICSValue(value: string): string {
  return value
    .replace(/\\n/g, "\n")
    .replace(/\\,/g, ",")
    .replace(/\\;/g, ";")
    .replace(/\\\\/g, "\\");
}

export async function getCalendarEvents(): Promise<CalendarEvent[]> {
  try {
    const res = await fetch(CALENDAR_URL, {
      next: { revalidate: 900 }, // 15 minutes
    });

    if (!res.ok) return [];

    const icsText = unfoldICS(await res.text());
    const events: CalendarEvent[] = [];

    const eventBlocks = icsText.split("BEGIN:VEVENT");

    for (let i = 1; i < eventBlocks.length; i++) {
      const block = eventBlocks[i].split("END:VEVENT")[0];
      const lines = block.split(/\r?\n/);

      let uid = "";
      let summary = "";
      let description = "";
      let location = "";
      let startStr = "";
      let endStr = "";

      for (const line of lines) {
        const colonIndex = line.indexOf(":");
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex);
        const value = unescapeICSValue(line.slice(colonIndex + 1));
        const baseKey = key.split(";")[0];

        switch (baseKey) {
          case "UID":
            uid = value;
            break;
          case "SUMMARY":
            summary = value;
            break;
          case "DESCRIPTION":
            description = value;
            break;
          case "LOCATION":
            location = value;
            break;
          case "DTSTART":
            startStr = value;
            break;
          case "DTEND":
            endStr = value;
            break;
        }
      }

      if (summary && startStr) {
        const start = parseICSDate(startStr);
        const end = endStr ? parseICSDate(endStr) : undefined;

        events.push({
          uid: uid || `event-${i}`,
          summary,
          description: description || undefined,
          location: location || undefined,
          start,
          end,
        });
      }
    }

    const now = new Date();
    return events
      .filter((e) => e.start >= now)
      .sort((a, b) => a.start.getTime() - b.start.getTime());
  } catch {
    return [];
  }
}
