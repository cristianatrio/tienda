import { Pause, Play, Star } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { useMotion } from "../motionPreference.jsx";

const COPIES = [0, 1];

/**
 * Scrolling band of bedtime excuses. Its pause button (WCAG 2.2.2) switches the
 * whole site to calm motion, the same setting as the switch in the top bar.
 */
export function Marquee() {
  const { t } = useI18n();
  const { motion, toggleMotion } = useMotion();
  const paused = motion !== "full";
  // Each copy repeats the phrases so it is wider than the screen and the loop never shows a gap.
  const phrases = [...t.marquee.items, ...t.marquee.items];
  return (
    <div className="marquee">
      <div className="marquee-window" aria-hidden="true">
        <div className="marquee-track">
          {COPIES.map((copy) => (
            <ul key={copy}>
              {phrases.map((phrase, i) => (
                <li key={i}>
                  {phrase}
                  <Star size={18} fill="currentColor" strokeWidth={0} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      <button
        type="button"
        className="marquee-pause"
        aria-label={t.marquee.pause}
        aria-pressed={paused}
        title={t.marquee.pause}
        onClick={toggleMotion}
      >
        {paused ? (
          <Play aria-hidden="true" size={16} />
        ) : (
          <Pause aria-hidden="true" size={16} />
        )}
      </button>
    </div>
  );
}
