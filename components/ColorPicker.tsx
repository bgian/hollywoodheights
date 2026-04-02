"use client";

import { useTheme, type ThemeColor } from "./ThemeProvider";
import { useState, useRef, useEffect } from "react";

const OPTIONS: { value: ThemeColor; label: string; hex: string }[] = [
  { value: "burgundy", label: "Hollywood Burgundy", hex: "#430A03" },
  { value: "blue", label: "Hollywood Blue", hex: "#2625AC" },
  { value: "canyon", label: "Hollywood Canyon", hex: "#E7E3DC" },
];

export default function ColorPicker() {
  const { themeColor, setThemeColor } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = OPTIONS.find((o) => o.value === themeColor)!;

  return (
    <div ref={ref} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-[10px] bg-cream/6 backdrop-blur-md px-4 py-2 text-xs font-bold uppercase text-cream transition-opacity duration-200 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream focus-visible:ring-offset-2 focus-visible:ring-offset-hollywood-blue"
      >
        <span
          className="inline-block h-3 w-3 shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.24)]"
          style={{ backgroundColor: current.hex }}
        />
        <span>{current.label}</span>
      </button>

      <div
        className={`absolute bottom-full left-1/2 z-50 mb-2 w-64 -translate-x-1/2 overflow-hidden rounded-[16px] backdrop-blur-md shadow-xl origin-bottom transition-all duration-300 ${
          open
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
        style={{
          backgroundColor: `color-mix(in srgb, ${current.hex} 25%, rgba(0,0,0,0.8))`,
          transitionTimingFunction: open
            ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => {
              setThemeColor(option.value);
              setOpen(false);
            }}
            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-xs font-bold uppercase transition-opacity duration-150 ${
              themeColor === option.value
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <span
              className="inline-block h-3.5 w-3.5 shrink-0 rounded-full shadow-[inset_0_0_0_1.5px_rgba(255,255,255,0.24)]"
              style={{ backgroundColor: option.hex }}
            />
            <span>{option.label}</span>
            {themeColor === option.value && (
              <svg
                className="ml-auto h-3.5 w-3.5 text-white/80"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
