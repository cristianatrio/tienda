import { afterEach, describe, expect, it, vi } from "vitest";
import { flyToCart, runTransition, viewTransitionName } from "./motion.js";

afterEach(() => {
  delete document.startViewTransition;
  delete document.documentElement.dataset.vt;
  delete document.documentElement.dataset.motion;
  delete HTMLElement.prototype.animate;
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

  it("también funde las pantallas en modo calmo; el CSS quita el desplazamiento", () => {
    document.documentElement.dataset.motion = "calm";
    document.startViewTransition = vi.fn((callback) => {
      callback();
      return { finished: Promise.resolve(), ready: Promise.resolve() };
    });
    runTransition(vi.fn(), "page");
    expect(document.startViewTransition).toHaveBeenCalledTimes(1);
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

describe("vuelo al carrito", () => {
  function setup(motion) {
    document.documentElement.dataset.motion = motion;
    document.body.innerHTML =
      '<span><span class="cart-badge">0</span></span><div id="photo"></div>';
    HTMLElement.prototype.animate = vi.fn(() => ({}));
    return document.getElementById("photo");
  }

  it("lanza una copia de la foto con animaciones completas", () => {
    const photo = setup("full");
    flyToCart(photo);
    expect(document.querySelector(".fly-clone")).not.toBeNull();
    expect(HTMLElement.prototype.animate).toHaveBeenCalledTimes(1);
  });

  it("no mueve nada en modo calmo", () => {
    const photo = setup("calm");
    flyToCart(photo);
    expect(document.querySelector(".fly-clone")).toBeNull();
    expect(HTMLElement.prototype.animate).not.toHaveBeenCalled();
  });
});
