"use client";

import { useEffect, useState, useCallback, useRef } from "react";

export interface TimelineItem {
  id: string;
  label: string;
}

export default function SideTimeline({ items }: { items: TimelineItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
    );

    elements.forEach((el) => observerRef.current!.observe(el));

    return () => observerRef.current?.disconnect();
  }, [items]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Page timeline"
      className="hidden lg:flex fixed left-8 top-0 bottom-0 z-40 items-center"
    >
      <div className="flex flex-col gap-2.5">
        {items.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              aria-label={item.label}
              className="group relative flex flex-col items-start gap-1.5 before:absolute before:-inset-x-2 before:-inset-y-2 before:content-['']"
            >
              {isActive && (
                <span className="max-w-[140px] text-left text-sm font-light uppercase tracking-[0.1em] leading-tight text-cream">
                  {item.label}
                </span>
              )}
              <span
                className={`block rounded-[1px] transition-all duration-200 ${
                  isActive
                    ? "w-10 bg-cream"
                    : "w-6 bg-cream/40 group-hover:w-8 group-hover:bg-cream/60"
                }`}
                style={{ height: "2px" }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
