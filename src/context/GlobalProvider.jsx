import React, { createContext, useState } from 'react';
export const GlobalContext = createContext(null);
export default function GlobalProvider({ children }) {
  const [contextCart, setContextCart] = useState([]);
  const contextItemsCart = () => contextCart.reduce((sum, item) => sum + item.cantidad, 0);
  const precioTotalCart = () => contextCart.reduce((sum, item) => sum + Number(item.producto.precio) * item.cantidad, 0);
  const isInCart = codigo => contextCart.some(item => item.producto.codigo === codigo);
  const addToCart = (producto, cantidad) => {
    if (!producto || !Number.isInteger(cantidad) || cantidad <= 0 ||
        !Number.isInteger(Number(producto.cantidad)) || cantidad > Number(producto.cantidad) || !Number.isFinite(Number(producto.precio)) ||
        Number(producto.precio) < 0) return;
    setContextCart(cart => cart.some(item => item.producto.codigo === producto.codigo)
      ? cart : [...cart, { producto, cantidad }]);
  };
  const removeFromCart = codigo => setContextCart(cart => cart.filter(item => item.producto.codigo !== codigo));
  const clearCart = () => setContextCart([]);
  return <GlobalContext.Provider value={{contextCart, contextItemsCart, precioTotalCart,
    isInCart, addToCart, removeFromCart, clearCart}}>{children}</GlobalContext.Provider>;
}

