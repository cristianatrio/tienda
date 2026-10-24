import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { usePageTitle } from "../usePageTitle.js";

export function Notice({ title, children }) {
  const { t } = useI18n();
  usePageTitle(title);
  return (
    <section className="notice">
      <h1>{title}</h1>
      {children}
      <Link className="button" to="/">
        {t.status.browse}
      </Link>
    </section>
  );
}
