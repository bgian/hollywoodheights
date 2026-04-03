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

    const faviconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 27.8391C6.27539 27.185 6.61962 25.636 6.61962 22.6067V9.38812C6.61962 6.35886 6.37866 4.80981 6 4.15576V3.94922H11.3356V4.15576C10.957 4.80981 10.716 6.35886 10.716 9.38812V14.0697H21.284V9.38812C21.284 6.35886 21.043 4.80981 20.6644 4.15576V3.94922H26V4.15576C25.6213 4.80981 25.3804 6.35886 25.3804 9.38812V22.6067C25.3804 25.636 25.6213 27.185 26 27.8391V28.0456H20.6644V27.8391C20.9398 27.185 21.284 25.636 21.284 22.6067V17.3055H10.716V22.6067C10.716 25.636 10.957 27.185 11.3356 27.8391V28.0456H6V27.8391Z" fill="${tokens.text}"/></svg>`;
    let favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement | null;
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.type = "image/svg+xml";
    favicon.href = `data:image/svg+xml,${encodeURIComponent(faviconSvg)}`;
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
