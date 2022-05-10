import React from 'react';
import { useParams } from 'react-router-dom';
import ItemDetailContainer from './itemDetailContainer/itemDetailContainer.jsx';

const Products = () => {
  let { id } = useParams();
  return (
    <main>
      <ItemDetailContainer id={id} />
    </main>
  );
};

export default Products;
