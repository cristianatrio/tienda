import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ItemListContainer from './../components/itemListContainer/ItemListContainer.jsx';

const ProductTipo = () => {
  const location = useLocation()
  const {tipo} = useParams()

  console.log('location => ', location)
  console.log('tipo => ', tipo)
  
  return (
    <div className='tienda Airkids'>
        <ItemListContainer titulo="Tienda Airkids" 
                           tipo={tipo} />
    </div>
  )
}

export default ProductTipo