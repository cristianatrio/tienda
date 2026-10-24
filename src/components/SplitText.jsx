import { Fragment } from "react";
import { useReveal } from "../useReveal.js";

/**
 * Heading whose words rise one by one when it scrolls into view.
 * The words are hidden from assistive technology; the heading keeps the full text as its name.
 */
export function SplitText({ as = "h2", lines, className = "", ...props }) {
  const Tag = as;
  const [ref, visible] = useReveal();
  const split = lines.map((line) => line.split(" "));
  const offsets = split.map((_, i) =>
    split.slice(0, i).reduce((count, words) => count + words.length, 0),
  );
  return (
    <Tag
      ref={ref}
      className={`split ${className}${visible ? " is-visible" : ""}`.trim()}
      aria-label={lines.join(" ")}
      {...props}
    >
      {split.map((words, line) => (
        <Fragment key={line}>
          {line > 0 && " "}
          <span className="line" aria-hidden="true">
            {words.map((word, i) => (
              <Fragment key={i}>
                {i > 0 && " "}
                <span className="word">
                  <span style={{ "--i": offsets[line] + i }}>{word}</span>
                </span>
              </Fragment>
            ))}
          </span>
        </Fragment>
      ))}
    </Tag>
  );
}
