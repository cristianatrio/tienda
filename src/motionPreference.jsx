import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  MOTION_KEY,
  detectMotion,
  readStored,
  writeStored,
} from "./preferences.js";

const MotionContext = createContext({
  motion: "full",
  toggleMotion: () => {},
});

const prefersReduced = () =>
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

/**
 * Motion follows the system until the visitor chooses, like the theme.
 * html[data-motion] tells the CSS and motion.js which choreography to play.
 */
export function MotionProvider({ children }) {
  const [motion, setMotion] = useState(() =>
    detectMotion(readStored(MOTION_KEY), prefersReduced()),
  );
  useLayoutEffect(() => {
    document.documentElement.dataset.motion = motion;
  }, [motion]);
  const toggleMotion = useCallback(() => {
    const next = motion === "full" ? "calm" : "full";
    writeStored(MOTION_KEY, next);
    setMotion(next);
  }, [motion]);
  const value = useMemo(
    () => ({ motion, toggleMotion }),
    [motion, toggleMotion],
  );
  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

/** @returns {{ motion: "full" | "calm", toggleMotion: () => void }} */
export const useMotion = () => useContext(MotionContext);
