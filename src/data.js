export const categories = [
  { id: "Cortos", name: "Pijamas cortos" },
  { id: "MediaEstacion", name: "Media estación" },
  { id: "Largos", name: "Pijamas largos" },
];
export const demoProducts = [
  {
    id: "3120",
    codigo: "3120",
    tipo: "Cortos",
    nombre: "Grogu",
    descripcion:
      "Un pequeño compañero para grandes sueños. Conjunto de pijama corto con estampa de Grogu.",
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
    cantidad: 20,
    precio: 72.21,
    imagen: "strangerthings.jpeg",
  },
];
export const money = (n) =>
  new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" }).format(
    n,
  );
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
