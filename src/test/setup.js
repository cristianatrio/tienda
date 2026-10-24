import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
// jsdom reports en-US; the store's default audience browses in Spanish.
Object.defineProperty(window.navigator, "languages", {
  value: ["es-AR", "es"],
  configurable: true,
});
window.matchMedia ??= (query) => ({
  matches: false,
  media: query,
  addEventListener() {},
  removeEventListener() {},
});
afterEach(() => {
  cleanup();
  delete document.documentElement.dataset.theme;
  document.documentElement.lang = "";
});
