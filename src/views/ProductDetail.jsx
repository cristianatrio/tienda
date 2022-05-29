import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ItemDetailCointainer from '../components/itemDetailCointainer/ItemDetailCointainer.jsx'

const ProductDetail = () => {

  const location = useLocation()
  
  const {id} = useParams()


  
  return (
    <div className='productDetail'>
       
        <ItemDetailCointainer id={id} />
    </div>
  )
}

export default ProductDetail