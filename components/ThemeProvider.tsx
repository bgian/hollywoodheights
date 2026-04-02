"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type ThemeColor = "burgundy" | "blue" | "canyon";

interface ThemeTokens {
  bg: string;
  text: string;
  textDark: string;
}

const THEME_MAP: Record<ThemeColor, ThemeTokens> = {
  burgundy: { bg: "#430A03", text: "#E7E3DC", textDark: "#D4D0C8" },
  blue: { bg: "#2625AC", text: "#E7E3DC", textDark: "#D4D0C8" },
  canyon: { bg: "#E7E3DC", text: "#430A03", textDark: "#3A3A3A" },
};

const STORAGE_KEY = "hh-theme-color";

interface ThemeContextValue {
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  hex: string;
  textHex: string;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeColor: "burgundy",
  setThemeColor: () => {},
  hex: THEME_MAP.burgundy.bg,
  textHex: THEME_MAP.burgundy.text,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColorState] = useState<ThemeColor>("burgundy");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemeColor | null;
    if (stored && stored in THEME_MAP) {
      setThemeColorState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const tokens = THEME_MAP[themeColor];

    let styleEl = document.getElementById("hh-theme-override") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "hh-theme-override";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `:root, :host {
      --color-hollywood-blue: ${tokens.bg};
      --color-cream: ${tokens.text};
      --color-cream-dark: ${tokens.textDark};
    }`;

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", tokens.bg);
  }, [themeColor, mounted]);

  const setThemeColor = useCallback((color: ThemeColor) => {
    setThemeColorState(color);
    localStorage.setItem(STORAGE_KEY, color);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ themeColor, setThemeColor, hex: THEME_MAP[themeColor].bg, textHex: THEME_MAP[themeColor].text }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
