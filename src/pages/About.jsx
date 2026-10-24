import { ArrowUpRight } from "lucide-react";
import { Reveal } from "../components/Reveal.jsx";
import { SplitText } from "../components/SplitText.jsx";
import { useI18n } from "../i18n.jsx";
import { usePageTitle } from "../usePageTitle.js";

const REPOSITORY = "https://github.com/cristianatrio/tienda";
const PROFILE = "https://github.com/cristianatrio";
const COLUMN_DELAY_MS = 140;
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
        <SplitText as="h1" lines={[t.about.titleStart, t.about.titleEnd]} />
        <Reveal as="p" className="about-lead" delay={350}>
          {t.about.intro}
        </Reveal>
        <Reveal as="p" delay={450}>
          {t.about.demo}
        </Reveal>
      </header>
      <section aria-labelledby="built-title">
        <Reveal as="h2" id="built-title">
          {t.about.builtTitle}
        </Reveal>
        <dl className="built-list">
          {t.about.built.map((item, i) => (
            <Reveal key={item.term} delay={(i % 2) * COLUMN_DELAY_MS}>
              <dt>{item.term}</dt>
              <dd>{item.text}</dd>
            </Reveal>
          ))}
        </dl>
      </section>
      <section aria-labelledby="stack-title" className="stack">
        <Reveal as="h2" id="stack-title">
          {t.about.stackTitle}
        </Reveal>
        <Reveal as="ul" className="pop-list">
          {STACK.map((tool, i) => (
            <li key={tool} style={{ "--i": i }}>
              {tool}
            </li>
          ))}
        </Reveal>
      </section>
      <Reveal className="about-links">
        <a className="button" href={REPOSITORY}>
          {t.about.code}
          <ArrowUpRight aria-hidden="true" size={18} />
        </a>
        <a className="text-link" href={PROFILE}>
          {t.about.profile}
        </a>
      </Reveal>
    </article>
  );
}
