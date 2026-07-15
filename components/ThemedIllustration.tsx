"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

// The emblem's native color is cream (#E6E3DD); only the canyon theme needs a
// filter to darken it.
const FILTER_DARK =
  "brightness(0) sepia(1) saturate(2.5) hue-rotate(345deg) brightness(0.3)";

export default function ThemedIllustration() {
  const { themeColor } = useTheme();

  return (
    <Image
      src="/images/hollywoodheights-emblem.png"
      alt="Illustrated view of Hollywood Heights neighborhood architecture"
      width={683}
      height={678}
      className="mx-auto mt-10 h-auto w-full max-w-[320px] sm:mt-12"
      style={themeColor === "canyon" ? { filter: FILTER_DARK } : undefined}
      priority
    />
  );
}
