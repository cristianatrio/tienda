import { afterEach, describe, expect, it, vi } from "vitest";
import { flyToCart, runTransition, viewTransitionName } from "./motion.js";

afterEach(() => {
  delete document.startViewTransition;
  delete document.documentElement.dataset.vt;
  document.body.innerHTML = "";
});

describe("transiciones de vista", () => {
  it("aplica el cambio directamente si el navegador no las soporta", () => {
    const update = vi.fn();
    expect(runTransition(update, "page")).toBeNull();
    expect(update).toHaveBeenCalledTimes(1);
  });

  it("marca el tipo de transición mientras dura y lo limpia al terminar", async () => {
    let finish;
    const finished = new Promise((resolve) => (finish = resolve));
    document.startViewTransition = vi.fn((callback) => {
      callback();
      return { finished, ready: Promise.resolve() };
    });
    const update = vi.fn(() =>
      expect(document.documentElement.dataset.vt).toBe("page"),
    );
    runTransition(update, "page");
    expect(update).toHaveBeenCalledTimes(1);
    finish();
    await finished;
    await Promise.resolve();
    expect(document.documentElement.dataset.vt).toBeUndefined();
  });

  it("genera nombres de transición válidos a partir de IDs externos", () => {
    expect(viewTransitionName("3120")).toBe("product-3120");
    expect(viewTransitionName("a b/c")).toBe("product-abc");
  });
});

it("el vuelo al carrito no deja restos cuando no hay destino o animaciones", () => {
  const img = document.createElement("img");
  document.body.append(img);
  expect(() => flyToCart(img)).not.toThrow();
  expect(document.querySelector(".fly-clone")).toBeNull();
});
