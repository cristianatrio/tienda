import { test } from "node:test";
import assert from "node:assert/strict";
import { validateRequest, buildOrder } from "./order.js";
const valid = {
  requestId: "1234567890abcdef",
  buyer: {
    nombre: "Demo",
    apellido: "Test",
    email: "demo@example.com",
    telefono: "123",
  },
  items: [{ id: "a", quantity: 2 }],
};
test("acepta solicitud y elimina campos inesperados", () =>
  assert.equal(
    validateRequest({ ...valid, buyer: { ...valid.buyer, admin: true } }).buyer
      .admin,
    undefined,
  ));
test("rechaza cantidad negativa, fraccional y duplicados", () => {
  for (const items of [
    [{ id: "a", quantity: -1 }],
    [{ id: "a", quantity: 1.5 }],
    [
      { id: "a", quantity: 1 },
      { id: "a", quantity: 1 },
    ],
  ])
    assert.throws(() => validateRequest({ ...valid, items }));
});
test("rechaza emails inválidos y rutas en IDs", () => {
  assert.throws(() =>
    validateRequest({ ...valid, buyer: { ...valid.buyer, email: "bad" } }),
  );
  assert.throws(() =>
    validateRequest({ ...valid, items: [{ id: "a/b", quantity: 1 }] }),
  );
});
test("calcula precio exclusivamente desde catálogo y evita errores de centavos", () => {
  const result = buildOrder(
    [{ id: "a", quantity: 3, precio: 0 }],
    [{ nombre: "A", cantidad: "10", precio: "0.10" }],
  );
  assert.equal(result.total, 0.3);
  assert.equal(result.lines[0].remaining, 7);
});
test("rechaza stock insuficiente y productos eliminados", () => {
  assert.throws(() =>
    buildOrder(valid.items, [{ nombre: "A", cantidad: 1, precio: 1 }]),
  );
  assert.throws(() => buildOrder(valid.items, [null]));
});
