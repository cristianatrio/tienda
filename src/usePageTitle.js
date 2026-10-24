import { useEffect } from "react";
import { useI18n } from "./i18n.jsx";

/** Sets a translated document title; omit the name for the storefront title. */
export function usePageTitle(name) {
  const { t } = useI18n();
  useEffect(() => {
    document.title = name ? t.meta.page(name) : t.meta.title;
  }, [name, t]);
}
