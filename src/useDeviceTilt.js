import { useEffect } from "react";
import { fullMotion } from "./motion.js";

// Degrees of tilt, from where the phone was first held, that move the stickers all the way.
const TILT_RANGE = 25;

const clamp = (value) => Math.min(1, Math.max(-1, value));

/**
 * The phone version of usePointerVars: tilting a touch device writes --px and --py
 * (-1 to 1) on the element. iOS only reports orientation after a permission prompt,
 * which a decoration does not justify; no events arrive there and the stickers stay still.
 * @param {import("react").RefObject<HTMLElement>} ref
 */
export function useDeviceTilt(ref) {
  useEffect(() => {
    const node = ref.current;
    const coarse = window.matchMedia?.("(pointer: coarse)").matches;
    if (!node || !coarse) return undefined;
    let rest = null;
    let frame = 0;
    function onTilt({ beta, gamma }) {
      if (beta == null || gamma == null || !fullMotion()) return;
      rest ??= { beta, gamma };
      const x = clamp((gamma - rest.gamma) / TILT_RANGE);
      const y = clamp((beta - rest.beta) / TILT_RANGE);
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        node.style.setProperty("--px", x.toFixed(3));
        node.style.setProperty("--py", y.toFixed(3));
      });
    }
    window.addEventListener("deviceorientation", onTilt);
    return () => {
      window.removeEventListener("deviceorientation", onTilt);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref]);
}
