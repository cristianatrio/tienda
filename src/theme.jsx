import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { flushSync } from "react-dom";
import { runTransition } from "./motion.js";
import {
  THEME_KEY,
  detectTheme,
  readStored,
  writeStored,
} from "./preferences.js";

const BROWSER_CHROME = { day: "#1b2550", night: "#121a3a" };
const ThemeContext = createContext({ theme: "day", toggleTheme: () => {} });

const prefers = (query) => window.matchMedia?.(query).matches ?? false;

/** Center of the pressed switch, and the radius that reaches the farthest corner from it. */
function switchOrigin(event) {
  const box = event?.currentTarget?.getBoundingClientRect?.();
  const x = box ? box.left + box.width / 2 : window.innerWidth / 2;
  const y = box ? box.top + box.height / 2 : 0;
  const r = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );
  return { x, y, r };
}

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
  const toggleTheme = useCallback(
    (event) => {
      const next = theme === "night" ? "day" : "night";
      writeStored(THEME_KEY, next);
      // The new lighting spreads in a circle from the switch that was pressed.
      const origin = switchOrigin(event);
      const root = document.documentElement.style;
      root.setProperty("--vt-x", `${origin.x}px`);
      root.setProperty("--vt-y", `${origin.y}px`);
      root.setProperty("--vt-r", `${origin.r}px`);
      runTransition(() => flushSync(() => setTheme(next)), "theme");
    },
    [theme],
  );
  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** @returns {{ theme: "day" | "night", toggleTheme: (event?: import("react").MouseEvent) => void }} */
export const useTheme = () => useContext(ThemeContext);
