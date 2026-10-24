import { Moon, ShoppingBag, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n.jsx";
import { isDemo } from "../services.js";
import { useTheme } from "../theme.jsx";
import { BrandMark } from "./BrandMark.jsx";
import { TransitionLink } from "./TransitionLink.jsx";

const LANGUAGE_OPTIONS = [
  { code: "es", short: "ES", name: "Español" },
  { code: "en", short: "EN", name: "English" },
];

function LanguageSwitch() {
  const { lang, setLanguage, t } = useI18n();
  return (
    <div className="language-switch" role="group" aria-label={t.nav.language}>
      {LANGUAGE_OPTIONS.map((option) => (
        <button
          key={option.code}
          type="button"
          lang={option.code}
          aria-pressed={lang === option.code}
          onClick={() => setLanguage(option.code)}
        >
          {/* Only one label is displayed per breakpoint, so the accessible name always matches it. */}
          <span className="lang-full">{option.name}</span>
          <span className="lang-short">{option.short}</span>
        </button>
      ))}
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const night = theme === "night";
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={t.nav.night}
      aria-pressed={night}
      title={night ? t.hero.lightsOn : t.hero.lightsOff}
      onClick={toggleTheme}
    >
      {night ? (
        <Sun aria-hidden="true" size={20} />
      ) : (
        <Moon aria-hidden="true" size={20} />
      )}
    </button>
  );
}

export function Header({ cartCount }) {
  const { t } = useI18n();
  return (
    <>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <div className="demo-bar" role="region" aria-label={t.demoBar.label}>
        <p>
          {isDemo ? t.demoBar.demo : t.demoBar.live}{" "}
          <TransitionLink to="/nosotros">{t.demoBar.more}</TransitionLink>
        </p>
      </div>
      <header className="site-header">
        <TransitionLink className="brand" to="/" aria-label={t.nav.home}>
          <BrandMark />
        </TransitionLink>
        <nav className="main-nav" aria-label={t.nav.label}>
          <TransitionLink as={NavLink} to="/" end>
            {t.nav.collection}
          </TransitionLink>
          <TransitionLink as={NavLink} to="/nosotros">
            {t.nav.project}
          </TransitionLink>
        </nav>
        <div className="header-tools">
          <LanguageSwitch />
          <ThemeToggle />
          <TransitionLink as={NavLink} className="cart-link" to="/cart">
            <ShoppingBag aria-hidden="true" size={20} />
            <span className="cart-label">{t.nav.cart}</span>{" "}
            <span className="cart-badge" key={cartCount}>
              {cartCount}
            </span>
            <span className="sr-only"> {t.nav.cartUnits(cartCount)}</span>
          </TransitionLink>
        </div>
      </header>
    </>
  );
}
