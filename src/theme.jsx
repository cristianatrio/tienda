import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";
import {
  THEME_KEY,
  detectTheme,
  readStored,
  writeStored,
} from "./preferences.js";

const BROWSER_CHROME = { day: "#1b2550", night: "#121a3a" };
const ThemeContext = createContext({ theme: "day", toggleTheme: () => {} });

const prefers = (query) => window.matchMedia?.(query).matches ?? false;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() =>
    detectTheme(readStored(THEME_KEY), prefers("(prefers-color-scheme: dark)")),
  );
  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", BROWSER_CHROME[theme]);
  }, [theme]);
  const toggleTheme = useCallback(() => {
    const next = theme === "night" ? "day" : "night";
    writeStored(THEME_KEY, next);
    // Lights fade instead of snapping where the browser supports view transitions.
    if (
      document.startViewTransition &&
      !prefers("(prefers-reduced-motion: reduce)")
    )
      document.startViewTransition(() => flushSync(() => setTheme(next)));
    else setTheme(next);
  }, [theme]);
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** @returns {{ theme: "day" | "night", toggleTheme: () => void }} */
export const useTheme = () => useContext(ThemeContext);
