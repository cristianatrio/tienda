import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import App from "../App.jsx";
import { demoProducts } from "../data.js";
import { loadCatalog } from "../services.js";
vi.mock("../services.js", () => ({
  isDemo: true,
  loadCatalog: vi.fn(),
  placeOrder: vi.fn(),
}));
// Its own file: React reports each invalid DOM property only once per module load.
let consoleError;
beforeEach(() => {
  localStorage.clear();
  loadCatalog.mockResolvedValue(demoProducts);
  window.scrollTo = vi.fn();
  consoleError = vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => consoleError.mockRestore());
it("pinta la portada sin advertencias de React y con la foto prioritaria", async () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  await screen.findByRole("heading", { name: "Grogu" });
  expect(consoleError).not.toHaveBeenCalled();
  expect(document.querySelector(".hero-photo img")).toHaveAttribute(
    "fetchpriority",
    "high",
  );
});
