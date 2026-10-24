export function validateRequest(data) {
  if (
    !data ||
    typeof data.requestId !== "string" ||
    !/^[\w-]{16,64}$/.test(data.requestId)
  )
    throw new Error("Solicitud inválida.");
  const buyer = data.buyer;
  if (
    !buyer ||
    ["nombre", "apellido", "telefono", "email"].some(
      (k) =>
        typeof buyer[k] !== "string" ||
        !buyer[k].trim() ||
        buyer[k].length > (k === "email" ? 254 : 100),
    ) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(buyer.email)
  )
    throw new Error("Datos del comprador inválidos.");
  if (
    !Array.isArray(data.items) ||
    !data.items.length ||
    data.items.length > 10 ||
    data.items.some(
      (x) =>
        !x ||
        typeof x.id !== "string" ||
        !x.id ||
        x.id.length > 128 ||
        x.id.includes("/") ||
        !Number.isInteger(x.quantity) ||
        x.quantity < 1 ||
        x.quantity > 99,
    ) ||
    new Set(data.items.map((x) => x.id)).size !== data.items.length
  )
    throw new Error("Productos inválidos.");
  return {
    buyer: Object.fromEntries(
      ["nombre", "apellido", "telefono", "email"].map((k) => [
        k,
        buyer[k].trim(),
      ]),
    ),
    items: data.items.map((x) => ({ id: x.id, quantity: x.quantity })),
    requestId: data.requestId,
  };
}
export function buildOrder(items, products) {
  let totalCents = 0;
  const lines = items.map((item, i) => {
    const p = products[i];
    const stock = Number(p?.cantidad),
      price = Number(p?.precio);
    if (
      !p ||
      typeof p.nombre !== "string" ||
      !Number.isInteger(stock) ||
      stock < item.quantity ||
      !Number.isFinite(price) ||
      price < 0 ||
      price > 10000000
    )
      throw new Error("Producto sin stock o precio inválido.");
    const cents = Math.round(price * 100);
    totalCents += cents * item.quantity;
    return {
      id: item.id,
      nombre: p.nombre,
      quantity: item.quantity,
      unitPrice: cents / 100,
      remaining: stock - item.quantity,
    };
  });
  return { lines, total: totalCents / 100 };
}
