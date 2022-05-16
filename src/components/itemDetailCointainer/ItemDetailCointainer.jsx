import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ItemDetail from '../itemDetail/ItemDetail.jsx';
import Loader from '../Loader/Loader.jsx';

const ItemDetailCointainer = ({ codigo }) => {

 


  const [producto, setProducto] = useState(null);

  const getProductoPorId = async () => {
    try {
      const response = await axios.get('/data/productos.json')
      const productos = response.data.productos;


      const productoEncontrado = productos.find(item => item.codigo === codigo)

      setProducto(productoEncontrado)
      
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {
    setTimeout(getProductoPorId, 500);      
  }, [])  


  return (
    <div className='itemDetailContainer'>
      
        {producto ? 
            <ItemDetail producto={producto}  /> 
        : 
          <Loader/>     // spinner
        }
    </div>
  )
}

export default ItemDetailCointainer;