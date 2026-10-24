// The inline script in index.html mirrors these rules to avoid a flash before React loads.
export const LANGUAGES = ["es", "en"];
export const THEMES = ["day", "night"];
export const LANGUAGE_KEY = "airkids-lang";
export const THEME_KEY = "airkids-theme";

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
