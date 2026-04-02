"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

const FILTER_LIGHT =
  "brightness(0) invert(1) sepia(0.15) saturate(0.5) hue-rotate(350deg) brightness(0.93)";
const FILTER_DARK =
  "brightness(0) sepia(1) saturate(2.5) hue-rotate(345deg) brightness(0.3)";

export default function ThemedIllustration() {
  const { themeColor } = useTheme();

  return (
    <Image
      src="/images/illustration.png"
      alt="Illustrated view of Hollywood Heights neighborhood architecture"
      width={960}
      height={810}
      className="mx-auto mt-10 h-auto w-full max-w-[320px] sm:mt-12"
      style={{ filter: themeColor === "canyon" ? FILTER_DARK : FILTER_LIGHT }}
      priority
    />
  );
}
