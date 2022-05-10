import React from 'react';
import ItemList from './itemList.jsx';


const ItemListContainer = () => {
  return (
    <section className="item-list-container">
      <h2 className="item-list-container__title">Nuestro Catalogo</h2>

      <ItemList />
    </section>
  );
};

export default ItemListContainer;