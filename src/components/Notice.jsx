import { Moon, Star } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { usePageTitle } from "../usePageTitle.js";
import { TransitionLink } from "./TransitionLink.jsx";

const BURST = 12;
const SNORES = ["z", "z", "Z"];

/** Decoration only: a sleepy moon for dead ends, a burst of stars for a finished order. */
function NoticeArt({ mood }) {
  if (mood === "party")
    return (
      <div className="notice-art burst" aria-hidden="true">
        {Array.from({ length: BURST }, (_, i) => (
          <Star
            key={i}
            size={i % 2 ? 14 : 22}
            fill="currentColor"
            strokeWidth={0}
            style={{ "--angle": `${(360 / BURST) * i}deg`, "--i": i }}
          />
        ))}
        <Moon size={56} fill="currentColor" strokeWidth={1.5} />
      </div>
    );
  return (
    <div className="notice-art sleep" aria-hidden="true">
      <Moon size={56} fill="currentColor" strokeWidth={1.5} />
      {SNORES.map((letter, i) => (
        <span key={i} style={{ "--i": i }}>
          {letter}
        </span>
      ))}
    </div>
  );
}

export function Notice({ title, mood = "sleep", children }) {
  const { t } = useI18n();
  usePageTitle(title);
  return (
    <section className="notice enter">
      <NoticeArt mood={mood} />
      <h1>{title}</h1>
      {children}
      <TransitionLink className="button" to="/">
        {t.status.browse}
      </TransitionLink>
    </section>
  );
}
