import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { BrandMark } from "./BrandMark.jsx";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link className="brand" to="/" aria-label={t.nav.home}>
            <BrandMark />
          </Link>
          <p>{t.footer.tagline}</p>
        </div>
        <div className="footer-meta">
          <p>{t.footer.credit}</p>
          <a href="https://github.com/cristianatrio/tienda">{t.footer.code}</a>
        </div>
      </div>
    </footer>
  );
}
