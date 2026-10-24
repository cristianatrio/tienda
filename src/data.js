// Display names live in src/locales; Firestore stores these ids in "tipo".
export const categoryIds = ["Cortos", "MediaEstacion", "Largos"];
export const demoProducts = [
  {
    id: "3120",
    codigo: "3120",
    tipo: "Cortos",
    nombre: "Grogu",
    descripcion:
      "Un pequeño compañero para grandes sueños. Conjunto de pijama corto con estampa de Grogu.",
    descripcionEn:
      "A small companion for big dreams. Two-piece set with a Grogu print.",
    cantidad: 20,
    precio: 67.52,
    imagen: "grogu.jpeg",
  },
  {
    id: "3121",
    codigo: "3121",
    tipo: "Largos",
    nombre: "Lilo",
    descripcion:
      "Noches de películas y mañanas sin apuro. Pijama largo con una estampa llena de personalidad.",
    descripcionEn:
      "Movie nights and slow mornings. Long pajamas with a print full of personality.",
    cantidad: 20,
    precio: 67.52,
    imagen: "lilo.jpeg",
  },
  {
    id: "3122",
    codigo: "3122",
    tipo: "MediaEstacion",
    nombre: "Stranger Things",
    descripcion:
      "Para quienes sueñan con otras dimensiones. Un conjunto para acompañar las noches de media estación.",
    descripcionEn:
      "For kids who dream of other dimensions. A set for in-between-season nights.",
    cantidad: 20,
    precio: 72.21,
    imagen: "strangerthings.jpeg",
  },
];
/**
 * English copy is optional per product; Spanish remains the source of truth.
 * @param {{ descripcion?: string, descripcionEn?: string }} product
 * @param {"es" | "en"} lang
 * @returns {string}
 */
export const localizedDescription = (product, lang) =>
  (lang === "en" && product.descripcionEn) || product.descripcion || "";
export function normalizeProduct(id, data) {
  const price = Number(data.precio),
    stock = Number(data.cantidad);
  if (
    !id ||
    typeof data.nombre !== "string" ||
    !Number.isFinite(price) ||
    price < 0 ||
    !Number.isInteger(stock) ||
    stock < 0
  )
    throw new Error("El catálogo contiene un producto inválido.");
  return {
    ...data,
    id,
    precio: price,
    cantidad: stock,
    imagen: /^[\w.-]+$/.test(data.imagen || "") ? data.imagen : "",
    descripcion: typeof data.descripcion === "string" ? data.descripcion : "",
    descripcionEn:
      typeof data.descripcionEn === "string" ? data.descripcionEn : "",
  };
}
export function restoreCart(value) {
  try {
    const rows = JSON.parse(value);
    return Array.isArray(rows)
      ? rows
          .filter(
            (x) =>
              x &&
              typeof x.id === "string" &&
              Number.isInteger(x.quantity) &&
              x.quantity > 0 &&
              x.quantity <= 99,
          )
          .filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i)
          .slice(0, 10)
      : [];
  } catch {
    return [];
  }
}
