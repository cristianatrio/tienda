import React from 'react';
import { productList } from '../data/data.js';
import ItemCount from '../ItemListContainer/itemCount.jsx';

import '../styles/itemDetails.css';



const ItemDetail = ({ item }) => {
  const onAdd = (qty) => {
    alert(`Has agregado ${qty} Pijamas`);
  };

  console.log(item);
  console.log(productList)
  return (
    <article className="product-detail">
      <img src={item.thumbnail} alt="" className="product-detail__img" />
      <div className="product-detail__info">
        <h2 className="name">{item.name}</h2>
        <p className="description">{item.description}</p>
        <ul className="info-grid">
          <li>Price:</li>
          <li>${item.price}</li>
         
        </ul>
        <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
      </div>
    </article>
  );
};

export default ItemDetail;