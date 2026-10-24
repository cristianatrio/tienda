const FLIGHT_MS = 720;
let latestTransition = 0;

/**
 * html[data-motion] is set before the first paint (index.html) and by MotionProvider.
 * "calm" keeps fades and light; only "full" moves things around.
 */
export function fullMotion() {
  return document.documentElement.dataset.motion === "full";
}

/** Scroll reveals play in both modes (calm ones only fade), so they only need the observer. */
export function canReveal() {
  return "IntersectionObserver" in window;
}

/**
 * Runs a DOM update inside a View Transition when the browser supports it.
 * html[data-vt] names the transition so the CSS can choose its choreography;
 * in calm mode the CSS keeps only the cross-fade.
 * @param {() => void} update
 * @param {"page" | "filter" | "theme"} type
 * @returns {ViewTransition | null}
 */
export function runTransition(update, type) {
  if (typeof document.startViewTransition !== "function") {
    update();
    return null;
  }
  const root = document.documentElement;
  const id = ++latestTransition;
  root.dataset.vt = type;
  const transition = document.startViewTransition(update);
  const clear = () => {
    if (id === latestTransition) delete root.dataset.vt;
  };
  transition.finished.then(clear, clear);
  return transition;
}

/**
 * View transition names must be valid CSS identifiers; product IDs come from the catalog.
 * @param {string} id
 * @returns {string}
 */
export function viewTransitionName(id) {
  return `product-${String(id).replace(/[^\w-]/g, "")}`;
}

function center(box) {
  return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
}

/**
 * Sends a copy of the product photo along an arc into the cart badge.
 * @param {HTMLElement | null} source
 */
export function flyToCart(source) {
  const target = document.querySelector(".cart-badge");
  if (
    !source ||
    !target ||
    typeof source.animate !== "function" ||
    !fullMotion()
  )
    return;
  const from = source.getBoundingClientRect();
  const start = center(from);
  const end = center(target.getBoundingClientRect());
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const clone = source.cloneNode(true);
  clone.classList.add("fly-clone");
  clone.setAttribute("aria-hidden", "true");
  clone.style.cssText = `left:${from.left}px;top:${from.top}px;width:${from.width}px;height:${from.height}px`;
  document.body.append(clone);
  const flight = clone.animate(
    [
      { transform: "translate(0, 0) scale(1) rotate(0deg)" },
      {
        transform: `translate(${dx * 0.45}px, ${dy * 0.3 - 80}px) scale(0.5) rotate(-10deg)`,
        offset: 0.5,
      },
      { transform: `translate(${dx}px, ${dy}px) scale(0.06) rotate(12deg)` },
    ],
    { duration: FLIGHT_MS, easing: "cubic-bezier(0.5, 0, 0.6, 1)" },
  );
  flight.oncancel = () => clone.remove();
  flight.onfinish = () => {
    clone.remove();
    target.parentElement?.animate(
      [{ scale: 1 }, { scale: 1.18 }, { scale: 1 }],
      { duration: 320, easing: "cubic-bezier(0.3, 1.6, 0.5, 1)" },
    );
  };
}
