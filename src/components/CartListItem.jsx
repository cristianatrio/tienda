import React, { useContext } from 'react';
import { CartContext } from '../Context/cartContext.js';
import CartWidget from './cartWidget/cartWidget';


import './styles/cartListemItem.css';

const CartListItem = () => {
  const cartContext = useContext(CartContext);
  const { cart, deleteCartById, deleteCart } = cartContext;

  console.log(cart);

  return (
    <section className="list-cart-container">
      {cart ? (
        cart.map((product) => {
          return (
            <CartWidget
              key={product.id}
              item={product}
              deleteCartById={deleteCartById}
            />
          );
        })
      ) : (
        <p>cargando productos</p>
      )}
      {cart.length ? (
        <button className="button-primary button-padding" onClick={deleteCart}>
          Vaciar Carrito
        </button>
      ) : (
        <p>No hay productos en el carrito</p>
      )}
    </section>
  );
};

export default CartListItem;
