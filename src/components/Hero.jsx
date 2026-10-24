import { Moon, Sun } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { useTheme } from "../theme.jsx";
import { GlowStars } from "./GlowStars.jsx";

export function Hero() {
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const night = theme === "night";
  return (
    <section className="hero" aria-labelledby="hero-title">
      <GlowStars />
      <div className="hero-copy">
        <h1 id="hero-title">
          <span>{t.hero.titleStart}</span> <span>{t.hero.titleEnd}</span>
        </h1>
        <p className="hero-lead">{t.hero.lead}</p>
        <div className="hero-actions">
          <a className="button" href="#coleccion">
            {t.hero.shop}
          </a>
          <button
            type="button"
            className="button button-quiet"
            onClick={toggleTheme}
          >
            {night ? (
              <Sun aria-hidden="true" size={18} />
            ) : (
              <Moon aria-hidden="true" size={18} />
            )}
            {night ? t.hero.lightsOn : t.hero.lightsOff}
          </button>
        </div>
        <p className="hero-note">{t.hero.note}</p>
      </div>
      <figure className="hero-photo">
        <img
          src="/images/airkids-bedroom.png"
          alt={t.hero.photoAlt}
          fetchpriority="high"
          width="1536"
          height="1024"
        />
        <figcaption>{t.hero.photoNote}</figcaption>
      </figure>
    </section>
  );
}
