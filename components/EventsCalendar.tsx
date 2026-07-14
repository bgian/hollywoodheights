"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CalendarEvent, CalendarSource } from "@/lib/calendar";

const LA_TZ = "America/Los_Angeles";

const dayKeyFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: LA_TZ,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** LA-local YYYY-MM-DD, regardless of the viewer's timezone. */
function dayKey(date: Date): string {
  return dayKeyFormatter.format(date);
}

function laFormat(date: Date, options: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: LA_TZ }).format(date);
}

function cellKey(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function extractZoomLink(text?: string): string | null {
  if (!text) return null;
  const match = text.match(/(https?:\/\/[^\s]*zoom[^\s]*)/i);
  return match ? match[1] : null;
}

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MAX_CHIPS_PER_DAY = 3;
const POPOVER_WIDTH = 320;
const POPOVER_MARGIN = 8;

interface MonthView {
  year: number;
  monthIndex: number;
}

interface PopoverState {
  day: string;
  top: number;
  left: number;
}

/**
 * The arrow SVGs are drawn in near-black, so render them as a mask over the
 * cream theme color instead of using them directly.
 */
function ArrowIcon({ src }: { src: string }) {
  const maskStyle = {
    maskImage: `url(${src})`,
    maskRepeat: "no-repeat",
    maskPosition: "center",
    maskSize: "contain",
    WebkitMaskImage: `url(${src})`,
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    WebkitMaskSize: "contain",
  } as const;

  return <span aria-hidden="true" className="block h-4 w-4 bg-cream" style={maskStyle} />;
}

function EventDetail({ event }: { event: CalendarEvent }) {
  const time = !event.isFullDay
    ? laFormat(new Date(event.start), { hour: "numeric", minute: "2-digit", hour12: true })
    : null;
  const endTime =
    !event.isFullDay && event.end
      ? laFormat(new Date(event.end), { hour: "numeric", minute: "2-digit", hour12: true })
      : null;
  const zoomLink = extractZoomLink(event.description) || extractZoomLink(event.location);
  const location = event.location && !event.location.match(/zoom/i) ? event.location : null;

  return (
    <div className="border-b border-cream/12 py-3 last:border-0 last:pb-1">
      {event.source === "bowl" && (
        <p className="mb-1.5 inline-block rounded-full border border-cream/30 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.15em] uppercase text-cream/80">
          Hollywood Bowl
        </p>
      )}
      <h4 className="text-sm font-medium text-cream">{event.summary}</h4>

      <p className="mt-1 text-xs text-cream/80" style={{ fontVariantNumeric: "tabular-nums" }}>
        {time ? (
          <>
            {time}
            {endTime && ` \u2013 ${endTime}`}
          </>
        ) : (
          "All day"
        )}
        {location && ` \u00b7 ${location}`}
      </p>

      {event.description && (
        <p className="mt-2 line-clamp-3 whitespace-pre-line text-xs leading-relaxed text-cream/60">
          {event.description}
        </p>
      )}

      {zoomLink && (
        <a
          href={zoomLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center rounded-[10px] bg-cream px-4 py-1.5 text-xs font-bold uppercase text-hollywood-blue transition-opacity duration-200 hover:opacity-90"
        >
          Join via Zoom
        </a>
      )}
    </div>
  );
}

export default function EventsCalendar({ events }: { events: CalendarEvent[] }) {
  const todayKey = dayKey(new Date());
  const [todayYear, todayMonth] = todayKey.split("-").map(Number);
  const [view, setView] = useState<MonthView>({
    year: todayYear,
    monthIndex: todayMonth - 1,
  });
  const [popover, setPopover] = useState<PopoverState | null>(null);
  const [visibleSources, setVisibleSources] = useState<Record<CalendarSource, boolean>>({
    hha: true,
    bowl: true,
  });

  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const toggleSource = (source: CalendarSource) => {
    setPopover(null);
    setVisibleSources((current) => ({ ...current, [source]: !current[source] }));
  };

  const eventsByDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events) {
      if (!visibleSources[event.source]) continue;
      const key = dayKey(new Date(event.start));
      const existing = map.get(key) || [];
      existing.push(event);
      map.set(key, existing);
    }
    return map;
  }, [events, visibleSources]);

  const monthLabel = new Date(view.year, view.monthIndex, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const weeks = useMemo(() => {
    const leadingBlanks = new Date(view.year, view.monthIndex, 1).getDay();
    const daysInMonth = new Date(view.year, view.monthIndex + 1, 0).getDate();
    const cells: (number | null)[] = [
      ...Array.from({ length: leadingBlanks }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);

    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }
    return rows;
  }, [view.year, view.monthIndex]);

  const changeMonth = (delta: number) => {
    setPopover(null);
    setView(({ year, monthIndex }) => {
      const next = new Date(year, monthIndex + delta, 1);
      return { year: next.getFullYear(), monthIndex: next.getMonth() };
    });
  };

  // Anchor the popover below the clicked day cell, clamped to the
  // calendar's width (like the nav dropdown, but position varies per day).
  const toggleDay = (key: string, target: HTMLElement) => {
    if (popover?.day === key) {
      setPopover(null);
      return;
    }

    const cell = target.closest("[data-day]");
    const root = rootRef.current;
    if (!cell || !root) return;

    const cellRect = cell.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();
    const width = Math.min(POPOVER_WIDTH, rootRect.width - POPOVER_MARGIN * 2);
    const idealLeft = cellRect.left - rootRect.left + cellRect.width / 2 - width / 2;
    const left = Math.max(
      POPOVER_MARGIN,
      Math.min(idealLeft, rootRect.width - width - POPOVER_MARGIN)
    );

    setPopover({
      day: key,
      top: cellRect.bottom - rootRect.top + 6,
      left,
    });
  };

  useEffect(() => {
    if (!popover) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (popoverRef.current?.contains(target)) return;
      if (target.closest("[data-day]")) return;
      setPopover(null);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPopover(null);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [popover]);

  const popoverEvents = popover ? eventsByDay.get(popover.day) || [] : [];
  const popoverDate = popover ? new Date(`${popover.day}T12:00:00`) : null;

  return (
    <div ref={rootRef} className="relative">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-light tracking-wide text-cream">{monthLabel}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setPopover(null);
              setView({ year: todayYear, monthIndex: todayMonth - 1 });
            }}
            className="rounded-[10px] border border-cream/30 px-4 py-1.5 text-xs font-bold uppercase text-cream transition-colors duration-150 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            aria-label="Previous month"
            className="rounded-[10px] border border-cream/30 px-3 py-1.5 transition-colors duration-150 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <ArrowIcon src="/left-arrow.svg" />
          </button>
          <button
            type="button"
            onClick={() => changeMonth(1)}
            aria-label="Next month"
            className="rounded-[10px] border border-cream/30 px-3 py-1.5 transition-colors duration-150 hover:bg-cream/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
          >
            <ArrowIcon src="/right-arrow.svg" />
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-[24px] border border-cream/18">
        <div className="grid grid-cols-7 gap-px bg-cream/18">
          {WEEKDAY_LABELS.map((label) => (
            <div
              key={label}
              className="bg-hollywood-blue px-1 py-2 text-center text-[10px] font-bold tracking-[0.15em] uppercase text-cream/70"
            >
              {label}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIdx) => (
          <div
            key={weekIdx}
            className="grid grid-cols-7 gap-px border-t border-cream/18 bg-cream/18"
          >
            {week.map((day, dayIdx) => {
              if (day === null) {
                return <div key={`blank-${dayIdx}`} className="bg-hollywood-blue" />;
              }

              const key = cellKey(view.year, view.monthIndex, day);
              const dayEvents = eventsByDay.get(key) || [];
              const isToday = key === todayKey;
              const isSelected = key === popover?.day;
              const overflow = dayEvents.length - MAX_CHIPS_PER_DAY;

              return (
                <div
                  key={key}
                  data-day={key}
                  className={`min-h-20 p-1.5 sm:min-h-28 sm:p-2 ${
                    isSelected ? "bg-cream/10" : "bg-hollywood-blue"
                  }`}
                >
                  <p
                    className={`mb-1 text-right text-xs ${
                      isToday ? "font-bold text-hollywood-blue" : "text-cream/70"
                    }`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    <span
                      className={
                        isToday
                          ? "inline-flex h-5 w-5 items-center justify-center rounded-full bg-cream"
                          : undefined
                      }
                    >
                      {day}
                    </span>
                  </p>

                  <div className="space-y-1">
                    {dayEvents.slice(0, MAX_CHIPS_PER_DAY).map((event) => (
                      <button
                        key={event.uid}
                        type="button"
                        onClick={(e) => toggleDay(key, e.currentTarget)}
                        aria-expanded={isSelected}
                        title={event.summary}
                        className={`block w-full truncate rounded-[6px] px-1.5 py-0.5 text-left text-[10px] leading-tight transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream ${
                          event.source === "hha"
                            ? "bg-cream font-bold text-hollywood-blue"
                            : "border border-cream/30 text-cream/80"
                        }`}
                      >
                        {event.summary}
                      </button>
                    ))}
                    {overflow > 0 && (
                      <button
                        type="button"
                        onClick={(e) => toggleDay(key, e.currentTarget)}
                        aria-expanded={isSelected}
                        className="block w-full px-1.5 text-left text-[10px] text-cream/60 transition-colors duration-150 hover:text-cream focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream"
                      >
                        +{overflow} more
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {popover && popoverDate && (
        <div
          ref={popoverRef}
          role="dialog"
          aria-label={`Events on ${popoverDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}`}
          className="absolute z-50 rounded-[14px] border border-cream/18 bg-hollywood-blue p-4"
          style={{
            top: popover.top,
            left: popover.left,
            width: `min(${POPOVER_WIDTH}px, calc(100% - ${POPOVER_MARGIN * 2}px))`,
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-cream/70">
              {popoverDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <button
              type="button"
              onClick={() => setPopover(null)}
              aria-label="Close details"
              className="rounded-sm text-sm leading-none text-cream/70 transition-colors duration-150 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream"
            >
              &#x2715;
            </button>
          </div>

          <div className="mt-1 max-h-80 overflow-y-auto">
            {popoverEvents.map((event) => (
              <EventDetail key={event.uid} event={event} />
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          onClick={() => toggleSource("hha")}
          aria-pressed={visibleSources.hha}
          className={`flex items-center gap-2 rounded-[10px] px-3 py-1.5 text-xs transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream ${
            visibleSources.hha ? "text-cream" : "text-cream/40 line-through opacity-60"
          }`}
        >
          <span
            className={`inline-flex h-3.5 w-3.5 items-center justify-center rounded-[4px] ${
              visibleSources.hha ? "bg-cream" : "border border-cream/40"
            }`}
          >
            {visibleSources.hha && (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-hollywood-blue" aria-hidden="true">
                <path d="M1.5 5.5 4 8 8.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          Neighborhood
        </button>

        <button
          type="button"
          onClick={() => toggleSource("bowl")}
          aria-pressed={visibleSources.bowl}
          className={`flex items-center gap-2 rounded-[10px] px-3 py-1.5 text-xs transition-opacity duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream ${
            visibleSources.bowl ? "text-cream" : "text-cream/40 line-through opacity-60"
          }`}
        >
          <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-[4px] border border-cream/40">
            {visibleSources.bowl && (
              <svg viewBox="0 0 10 10" className="h-2.5 w-2.5 text-cream" aria-hidden="true">
                <path d="M1.5 5.5 4 8 8.5 2.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          Hollywood Bowl
        </button>
      </div>
    </div>
  );
}
