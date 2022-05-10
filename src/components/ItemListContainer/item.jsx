import React from 'react';
import ItemCount from '../ItemListContainer/itemCount.jsx';

import '../styles/stylesItem.css';

const Item = (item) => {
  const onAdd = (qty) => {
    alert(`Has agregado ${qty} pijamas`);
  };

  return (
    <article className="product-card">
      <img className="product-card__image" src={item.thumbnail} alt="" />

      <h3 className="product-card__name">{item.name}</h3>

      <span className="product-card__name">${item.price}</span>

      <ItemCount stock={item.stock} onAdd={onAdd} initial={1} />
    </article>
  );
};

export default Item;
