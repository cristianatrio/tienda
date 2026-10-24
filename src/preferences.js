// The inline script in index.html mirrors these rules to avoid a flash before React loads.
export const LANGUAGES = ["es", "en"];
export const THEMES = ["day", "night"];
export const MOTIONS = ["full", "calm"];
export const LANGUAGE_KEY = "airkids-lang";
export const THEME_KEY = "airkids-theme";
export const MOTION_KEY = "airkids-motion";

/**
 * Stored choice first; otherwise Spanish for Spanish-speaking browsers and English for everyone else.
 * @param {string | null} stored
 * @param {readonly string[]} browserLanguages
 * @returns {"es" | "en"}
 */
export function detectLanguage(stored, browserLanguages) {
  if (LANGUAGES.includes(stored)) return stored;
  const primary = browserLanguages[0];
  if (!primary) return "es";
  return primary.toLowerCase().startsWith("es") ? "es" : "en";
}

/**
 * @param {string | null} stored
 * @param {boolean} prefersDark
 * @returns {"day" | "night"}
 */
export function detectTheme(stored, prefersDark) {
  if (THEMES.includes(stored)) return stored;
  return prefersDark ? "night" : "day";
}

// The first motion layer stored a pause switch; keep honoring it.
const LEGACY_MOTION = { running: "full", paused: "calm" };

/**
 * "calm" keeps fades and light, without movement or loops.
 * @param {string | null} stored
 * @param {boolean} prefersReduced
 * @returns {"full" | "calm"}
 */
export function detectMotion(stored, prefersReduced) {
  if (MOTIONS.includes(stored)) return stored;
  if (Object.hasOwn(LEGACY_MOTION, stored ?? "")) return LEGACY_MOTION[stored];
  return prefersReduced ? "calm" : "full";
}

/**
 * Storage can throw in private browsing or when blocked; preferences are a convenience only.
 * @param {string} key
 * @returns {string | null}
 */
export function readStored(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

/**
 * @param {string} key
 * @param {string} value
 */
export function writeStored(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* Storage may be unavailable in private browsing. */
  }
}
