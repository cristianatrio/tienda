import { useEffect, useRef } from "react";

const POINTER_VARS = ["--px", "--py", "--mx", "--my"];

/**
 * Writes the mouse position over an element as CSS variables, once per frame:
 * --px and --py from -1 to 1, --mx and --my as percentages. Touch input is ignored.
 */
export function usePointerVars() {
  const frame = useRef(0);
  useEffect(
    () => () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    },
    [],
  );
  function onPointerMove(event) {
    if (event.pointerType === "touch") return;
    const node = event.currentTarget;
    const { clientX, clientY } = event;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const box = node.getBoundingClientRect();
      const x = (clientX - box.left) / box.width;
      const y = (clientY - box.top) / box.height;
      node.style.setProperty("--px", (x * 2 - 1).toFixed(3));
      node.style.setProperty("--py", (y * 2 - 1).toFixed(3));
      node.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
      node.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    });
  }
  function onPointerLeave(event) {
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = 0;
    for (const name of POINTER_VARS)
      event.currentTarget.style.removeProperty(name);
  }
  return { onPointerMove, onPointerLeave };
}
