"use client";

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "./ThemeProvider";

const WORD_1 = "HOLLYWOOD";
const WORD_2 = "HEIGHTS";
const TOTAL_LETTERS = WORD_1.length + WORD_2.length;
const LETTER_DELAY = 110;
const HOLD_AFTER = 400;
const FLASH_DURATION = 150;

function shuffleIndices(count: number): number[] {
  const indices = Array.from({ length: count }, (_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

export default function SplashOverlay() {
  const { hex, textHex } = useTheme();
  const [revealStep, setRevealStep] = useState(0);
  const [flashed, setFlashed] = useState(false);
  const [gone, setGone] = useState(false);

  const order = useMemo(() => shuffleIndices(TOTAL_LETTERS), []);

  const revealed = useMemo(() => {
    const set = new Set<number>();
    for (let i = 0; i < revealStep; i++) {
      set.add(order[i]);
    }
    return set;
  }, [revealStep, order]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRevealStep((c) => {
        if (c >= TOTAL_LETTERS) {
          clearInterval(interval);
          return c;
        }
        return c + 1;
      });
    }, LETTER_DELAY);

    const totalRevealTime = TOTAL_LETTERS * LETTER_DELAY;

    const flashTimer = setTimeout(() => {
      setFlashed(true);
    }, totalRevealTime + HOLD_AFTER);

    const goneTimer = setTimeout(() => {
      setGone(true);
    }, totalRevealTime + HOLD_AFTER + FLASH_DURATION);

    return () => {
      clearInterval(interval);
      clearTimeout(flashTimer);
      clearTimeout(goneTimer);
    };
  }, []);

  if (gone) return null;

  const inverted = flashed;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6"
      style={{
        backgroundColor: inverted ? textHex : hex,
        color: inverted ? hex : textHex,
      }}
      aria-hidden="true"
    >
      <div
        className="text-center font-bold leading-[0.88] tracking-tight"
        style={{ fontSize: "clamp(3rem, 14vw, 12rem)" }}
      >
        <div className="flex justify-center">
          {WORD_1.split("").map((letter, i) => (
            <span
              key={`w1-${i}`}
              className={revealed.has(i) ? "opacity-100" : "opacity-0"}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="flex justify-center">
          {WORD_2.split("").map((letter, i) => {
            const globalIndex = WORD_1.length + i;
            return (
              <span
                key={`w2-${i}`}
                className={revealed.has(globalIndex) ? "opacity-100" : "opacity-0"}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
