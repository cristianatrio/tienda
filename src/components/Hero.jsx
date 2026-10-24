import { Moon, Sun } from "lucide-react";
import { useRef } from "react";
import { useI18n } from "../i18n.jsx";
import { useTheme } from "../theme.jsx";
import { useDeviceTilt } from "../useDeviceTilt.js";
import { usePointerVars } from "../usePointerVars.js";
import { GlowStars } from "./GlowStars.jsx";
import { SplitText } from "./SplitText.jsx";

export function Hero() {
  const { t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const pointer = usePointerVars();
  const hero = useRef(null);
  useDeviceTilt(hero);
  const night = theme === "night";
  return (
    <section
      ref={hero}
      className="hero"
      aria-labelledby="hero-title"
      {...pointer}
    >
      <GlowStars />
      <span className="shooting-star" aria-hidden="true" />
      <div className="hero-copy">
        <SplitText
          as="h1"
          id="hero-title"
          lines={[t.hero.titleStart, t.hero.titleEnd]}
        />
        <p className="hero-lead intro" style={{ "--delay": "450ms" }}>
          {t.hero.lead}
        </p>
        <div className="hero-actions intro" style={{ "--delay": "600ms" }}>
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
        <p className="hero-note intro" style={{ "--delay": "750ms" }}>
          {t.hero.note}
        </p>
      </div>
      <figure className="hero-photo">
        <img
          src="/images/airkids-bedroom.png"
          alt={t.hero.photoAlt}
          fetchPriority="high"
          width="1536"
          height="1024"
        />
        <figcaption>{t.hero.photoNote}</figcaption>
      </figure>
    </section>
  );
}
