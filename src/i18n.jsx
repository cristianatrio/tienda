import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import en from "./locales/en.js";
import es from "./locales/es.js";
import {
  LANGUAGE_KEY,
  detectLanguage,
  readStored,
  writeStored,
} from "./preferences.js";

const dictionaries = { es, en };

function createValue(lang, setLanguage) {
  const t = dictionaries[lang];
  const currency = new Intl.NumberFormat(t.meta.locale, {
    style: "currency",
    currency: "ARS",
  });
  return { lang, t, setLanguage, money: (n) => currency.format(n) };
}

const I18nContext = createContext(createValue("es", () => {}));

function initialLanguage() {
  const browser = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];
  return detectLanguage(readStored(LANGUAGE_KEY), browser);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(initialLanguage);
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLanguage = useCallback((next) => {
    if (!dictionaries[next]) return;
    setLang(next);
    writeStored(LANGUAGE_KEY, next);
  }, []);
  const value = useMemo(
    () => createValue(lang, setLanguage),
    [lang, setLanguage],
  );
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** @returns {{ lang: "es" | "en", t: typeof es, setLanguage: (lang: string) => void, money: (n: number) => string }} */
export const useI18n = () => useContext(I18nContext);
