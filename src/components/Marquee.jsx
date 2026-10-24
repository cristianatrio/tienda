import { Pause, Play, Star } from "lucide-react";
import { useLayoutEffect, useState } from "react";
import { useI18n } from "../i18n.jsx";
import { MOTION_KEY, readStored, writeStored } from "../preferences.js";

const COPIES = [0, 1];

/**
 * Scrolling band of bedtime excuses. The pause button stops it and every other
 * looping animation (WCAG 2.2.2) and is remembered between visits.
 */
export function Marquee() {
  const { t } = useI18n();
  const [paused, setPaused] = useState(
    () => readStored(MOTION_KEY) === "paused",
  );
  useLayoutEffect(() => {
    const root = document.documentElement;
    if (paused) root.dataset.motion = "paused";
    else delete root.dataset.motion;
  }, [paused]);
  function toggle() {
    writeStored(MOTION_KEY, paused ? "running" : "paused");
    setPaused(!paused);
  }
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
        onClick={toggle}
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
