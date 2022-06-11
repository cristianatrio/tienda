import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ItemListContainer from '../components/itemListContainer/ItemListContainer.jsx';

const ProductTipo = () => {
  const location = useLocation()
  const {tipo} = useParams()


  
  return (
    <div className='productTipo'>
        <ItemListContainer titulo="Tienda airkids Pijamas" 
                           tipo={tipo} />
    </div>
  )
}

export default ProductTipo