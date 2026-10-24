import { useCallback, useEffect, useMemo, useState } from "react";
import {
  addToCart,
  cartCount,
  removeFromCart,
  setLineQuantity,
} from "./cart.js";
import { restoreCart } from "./data.js";
import { readStored, writeStored } from "./preferences.js";

const CART_KEY = "airkids-cart-v1";

/**
 * Persistent cart that stores only product ids and quantities.
 * @param {{ id: string, cantidad: number }[]} products
 */
export function useCart(products) {
  const [cart, setCart] = useState(() => restoreCart(readStored(CART_KEY)));
  useEffect(() => writeStored(CART_KEY, JSON.stringify(cart)), [cart]);
  const find = useCallback(
    (id) => products.find((product) => product.id === id),
    [products],
  );
  return useMemo(
    () => ({
      cart,
      count: cartCount(cart),
      add: (id, quantity) =>
        setCart((current) => addToCart(current, find(id), quantity)),
      setQuantity: (id, quantity) =>
        setCart((current) => setLineQuantity(current, find(id), quantity)),
      remove: (id) => setCart((current) => removeFromCart(current, id)),
      clear: () => setCart([]),
    }),
    [cart, find],
  );
}
