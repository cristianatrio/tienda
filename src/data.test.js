import { describe, it, expect } from "vitest";
import { restoreCart, normalizeProduct } from "./data.js";
describe("persistencia no confiable", () => {
  it("descarta JSON corrupto y valores inválidos", () => {
    expect(restoreCart("{")).toEqual([]);
    expect(
      restoreCart(
        JSON.stringify([
          { id: "a", quantity: -1 },
          { id: "b", quantity: 1.2 },
          { id: "c", quantity: 100 },
        ]),
      ),
    ).toEqual([]);
  });
  it("deduplica productos", () =>
    expect(
      restoreCart('[{"id":"a","quantity":2},{"id":"a","quantity":3}]'),
    ).toEqual([{ id: "a", quantity: 2 }]));
  it("normaliza datos del catálogo histórico", () =>
    expect(
      normalizeProduct("a", {
        nombre: "Pijama",
        precio: " 12.50 ",
        cantidad: "3",
        imagen: "../x",
      }),
    ).toMatchObject({ precio: 12.5, cantidad: 3, imagen: "" }));
  it("rechaza precios no numéricos", () =>
    expect(() =>
      normalizeProduct("a", { nombre: "x", precio: "bad", cantidad: 3 }),
    ).toThrow());
});
