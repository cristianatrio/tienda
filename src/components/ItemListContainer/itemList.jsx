import React, { useEffect, useState } from 'react';
import Item from './item.jsx';
import { getAllProductsFromDB } from '../data/getData.js';

import '../styles/stylesList.css';

const ItemList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProductsFromDB(setProducts);
  }, []);

  return (
    <div className="product-list-container">
      {products.length ? (
        <>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <Item
                  name={product.name}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  stock={product.stock}
                  id={product.id}
                />
              </div>
            );
          })}
        </>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
};

export default ItemList;

