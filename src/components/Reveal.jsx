import { useReveal } from "../useReveal.js";

/** Fades and lifts its content the first time it scrolls into view. */
export function Reveal({
  as = "div",
  className = "",
  delay = 0,
  style,
  children,
  ...props
}) {
  const Tag = as;
  const [ref, visible] = useReveal();
  return (
    <Tag
      ref={ref}
      className={`reveal ${className}${visible ? " is-visible" : ""}`.trim()}
      style={delay ? { ...style, "--delay": `${delay}ms` } : style}
      {...props}
    >
      {children}
    </Tag>
  );
}
