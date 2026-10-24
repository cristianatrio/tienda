import { expect, it } from "vitest";
import en from "./en.js";
import es from "./es.js";

function shape(value, path = "") {
  if (typeof value === "function") return [`${path}()${value.length}`];
  if (typeof value === "string") return [path];
  return Object.keys(value)
    .sort()
    .flatMap((key) => shape(value[key], `${path}.${key}`));
}

function strings(value) {
  if (typeof value === "string") return [value];
  if (typeof value === "function") return [];
  return Object.values(value).flatMap(strings);
}

it("español e inglés tienen exactamente las mismas claves", () => {
  expect(shape(en)).toEqual(shape(es));
});

it("ninguna traducción queda vacía", () => {
  for (const text of [...strings(es), ...strings(en)])
    expect(text.trim()).not.toBe("");
});

it("los textos con variables producen frases distintas por idioma", () => {
  expect(es.catalog.count(1)).toBe("1 diseño");
  expect(es.catalog.count(3)).toBe("3 diseños");
  expect(en.catalog.count(1)).toBe("1 design");
  expect(en.catalog.count(3)).toBe("3 designs");
});
