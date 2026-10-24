import { ArrowUpRight } from "lucide-react";
import { useI18n } from "../i18n.jsx";
import { usePageTitle } from "../usePageTitle.js";

const REPOSITORY = "https://github.com/cristianatrio/tienda";
const PROFILE = "https://github.com/cristianatrio";
const STACK = [
  "React 18",
  "React Router",
  "Vite",
  "Firebase",
  "Vitest",
  "Testing Library",
  "Playwright",
  "axe-core",
];

export function About() {
  const { t } = useI18n();
  usePageTitle(t.nav.project);
  return (
    <article className="about">
      <header className="about-intro">
        <h1>
          <span>{t.about.titleStart}</span> <span>{t.about.titleEnd}</span>
        </h1>
        <p className="about-lead">{t.about.intro}</p>
        <p>{t.about.demo}</p>
      </header>
      <section aria-labelledby="built-title">
        <h2 id="built-title">{t.about.builtTitle}</h2>
        <dl className="built-list">
          {t.about.built.map((item) => (
            <div key={item.term}>
              <dt>{item.term}</dt>
              <dd>{item.text}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section aria-labelledby="stack-title" className="stack">
        <h2 id="stack-title">{t.about.stackTitle}</h2>
        <ul>
          {STACK.map((tool) => (
            <li key={tool}>{tool}</li>
          ))}
        </ul>
      </section>
      <div className="about-links">
        <a className="button" href={REPOSITORY}>
          {t.about.code}
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
        <a className="text-link" href={PROFILE}>
          {t.about.profile}
        </a>
      </div>
    </article>
  );
}
