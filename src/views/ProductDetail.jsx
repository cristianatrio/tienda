import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ItemDetailCointainer from '../components/itemDetailCointainer/ItemDetailCointainer.jsx'

const ProductDetail = () => {

  const location = useLocation()
  const {codigo} = useParams()


  
  return (
    <div className='productDetail'>
        <ItemDetailCointainer codigo={codigo} />
    </div>
  )
}

export default ProductDetail