import { flushSync } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { runTransition } from "./motion.js";

const isPlainClick = (event) =>
  !event.defaultPrevented &&
  event.button === 0 &&
  !(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);

/**
 * Click handler for router links that animates the route change with a View Transition.
 * BrowserRouter runs with useTransitions={false} so flushSync renders the new page
 * inside the transition callback. Modified clicks keep the browser's default behavior.
 * @param {string} to
 * @param {{ type?: "page" | "filter", onStart?: () => void }} [options]
 */
export function useTransitionClick(to, { type = "page", onStart } = {}) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (event) => {
    if (!isPlainClick(event)) return;
    event.preventDefault();
    onStart?.();
    runTransition(
      () => flushSync(() => navigate(to, { replace: pathname === to })),
      type,
    );
  };
}
