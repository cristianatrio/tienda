import { useEffect, useRef, useState } from "react";
import { canReveal } from "./motion.js";

const OPTIONS = { rootMargin: "0px 0px -8% 0px", threshold: 0.12 };

/**
 * Marks an element visible the first time it scrolls into view.
 * Without IntersectionObserver, or with reduced motion, content is visible from the start.
 * @returns {[import("react").RefObject<HTMLElement>, boolean]}
 */
export function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(() => !canReveal());
  useEffect(() => {
    const node = ref.current;
    if (visible || !node) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setVisible(true);
    }, OPTIONS);
    observer.observe(node);
    return () => observer.unobserve(node);
  }, [visible]);
  return [ref, visible];
}
