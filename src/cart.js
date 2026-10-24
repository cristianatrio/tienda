/** @typedef {{ id: string, quantity: number }} CartLine */
/** @typedef {{ id: string, cantidad: number }} StockedProduct */

export const MAX_UNITS_PER_LINE = 99;
export const MAX_LINES = 10;

/**
 * Units of a product that can still be added without exceeding stock or limits.
 * @param {CartLine[]} cart
 * @param {StockedProduct | undefined} product
 * @returns {number}
 */
export function availableToAdd(cart, product) {
  if (!product) return 0;
  const inCart = cart.find((line) => line.id === product.id)?.quantity || 0;
  return Math.max(0, Math.min(MAX_UNITS_PER_LINE, product.cantidad) - inCart);
}

const isPositiveInteger = (n) => Number.isInteger(n) && n > 0;

/**
 * Returns a new cart with the units added, or the same cart when the change is not allowed.
 * @param {CartLine[]} cart
 * @param {StockedProduct | undefined} product
 * @param {number} quantity
 * @returns {CartLine[]}
 */
export function addToCart(cart, product, quantity) {
  if (!product || !isPositiveInteger(quantity)) return cart;
  if (quantity > availableToAdd(cart, product)) return cart;
  const existing = cart.find((line) => line.id === product.id);
  if (existing)
    return cart.map((line) =>
      line.id === product.id
        ? { ...line, quantity: line.quantity + quantity }
        : line,
    );
  if (cart.length >= MAX_LINES) return cart;
  return [...cart, { id: product.id, quantity }];
}

/**
 * Replaces the quantity of an existing line, staying within stock.
 * @param {CartLine[]} cart
 * @param {StockedProduct | undefined} product
 * @param {number} quantity
 * @returns {CartLine[]}
 */
export function setLineQuantity(cart, product, quantity) {
  if (!product || !isPositiveInteger(quantity)) return cart;
  if (quantity > Math.min(MAX_UNITS_PER_LINE, product.cantidad)) return cart;
  if (!cart.some((line) => line.id === product.id)) return cart;
  return cart.map((line) =>
    line.id === product.id ? { ...line, quantity } : line,
  );
}

/**
 * @param {CartLine[]} cart
 * @param {string} id
 * @returns {CartLine[]}
 */
export const removeFromCart = (cart, id) =>
  cart.filter((line) => line.id !== id);

/**
 * @param {CartLine[]} cart
 * @returns {number}
 */
export const cartCount = (cart) =>
  cart.reduce((sum, line) => sum + line.quantity, 0);
