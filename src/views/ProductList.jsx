import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ItemListContainer from '../components/itemListContainer/ItemListContainer.jsx';


const ProductList = () => {

  
  return (
    <div className='productDetail'>
        <ItemListContainer titulo="tienda Airkids" />
    </div>
  )
}

export default ProductList