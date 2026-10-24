import { describe, expect, it } from "vitest";
import {
  addToCart,
  availableToAdd,
  cartCount,
  removeFromCart,
  setLineQuantity,
} from "./cart.js";

const grogu = { id: "3120", cantidad: 5 };
const lilo = { id: "3121", cantidad: 200 };

describe("reglas del carrito", () => {
  it("calcula unidades disponibles según stock, tope y cantidad ya agregada", () => {
    expect(availableToAdd([], grogu)).toBe(5);
    expect(availableToAdd([{ id: "3120", quantity: 3 }], grogu)).toBe(2);
    expect(availableToAdd([], lilo)).toBe(99);
    expect(availableToAdd([], undefined)).toBe(0);
  });

  it("agrega sin mutar el carrito original y suma líneas repetidas", () => {
    const original = [{ id: "3120", quantity: 1 }];
    const next = addToCart(original, grogu, 2);
    expect(next).toEqual([{ id: "3120", quantity: 3 }]);
    expect(original).toEqual([{ id: "3120", quantity: 1 }]);
    expect(addToCart(next, lilo, 1)).toEqual([
      { id: "3120", quantity: 3 },
      { id: "3121", quantity: 1 },
    ]);
  });

  it("rechaza cantidades inválidas, sin stock o con demasiadas líneas", () => {
    const cart = [{ id: "3120", quantity: 5 }];
    expect(addToCart(cart, grogu, 1)).toBe(cart);
    expect(addToCart([], grogu, 1.5)).toEqual([]);
    expect(addToCart([], grogu, 0)).toEqual([]);
    const full = Array.from({ length: 10 }, (_, i) => ({
      id: `x${i}`,
      quantity: 1,
    }));
    expect(addToCart(full, lilo, 1)).toBe(full);
  });

  it("actualiza la cantidad de una línea dentro del stock", () => {
    const cart = [{ id: "3120", quantity: 2 }];
    expect(setLineQuantity(cart, grogu, 4)).toEqual([
      { id: "3120", quantity: 4 },
    ]);
    expect(setLineQuantity(cart, grogu, 6)).toBe(cart);
    expect(setLineQuantity(cart, grogu, 0)).toBe(cart);
  });

  it("elimina líneas y cuenta unidades", () => {
    const cart = [
      { id: "3120", quantity: 2 },
      { id: "3121", quantity: 3 },
    ];
    expect(removeFromCart(cart, "3120")).toEqual([{ id: "3121", quantity: 3 }]);
    expect(cartCount(cart)).toBe(5);
  });
});
