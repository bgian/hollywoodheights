"use client";

import { useRef, useState, useCallback, useEffect } from "react";

interface FilmLinkProps {
  title: string;
  imdb: string;
  poster: string;
}

export default function FilmLink({ title, imdb, poster }: FilmLinkProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState<"above" | "below">("above");
  const linkRef = useRef<HTMLAnchorElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const show = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (linkRef.current) {
      const rect = linkRef.current.getBoundingClientRect();
      setPosition(rect.top > 200 ? "above" : "below");
    }
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(false), 150);
  }, []);

  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return (
    <span className="relative inline-block">
      <a
        ref={linkRef}
        href={imdb}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-cream/40 underline-offset-2 transition-colors hover:decoration-cream"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {title}
      </a>

      <span
        role="tooltip"
        onMouseEnter={show}
        onMouseLeave={hide}
        className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 transition-all duration-200 ${
          position === "above" ? "bottom-full mb-2" : "top-full mt-2"
        } ${
          visible
            ? "pointer-events-auto scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
      >
        <span className="block aspect-[2/3] w-[90px] overflow-hidden rounded-lg bg-hollywood-blue/80 shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={`${title} poster`}
            loading="lazy"
            className="block h-full w-full object-cover"
          />
        </span>
      </span>
    </span>
  );
}
