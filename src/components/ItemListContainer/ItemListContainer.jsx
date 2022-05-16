import { useState, useEffect } from 'react';
import ItemList from '../itemList/ItemList.jsx';
import axios from 'axios';
import Loader from '../Loader/Loader.jsx';


const ItemListContainer = ( {titulo, tipo} ) => {

  

  const [productos, setProductos] = useState([]);


  const getProductos = async () => {
    try {
      const response = await axios.get('/data/productos.json')
      setProductos(response.data.productos)
      
    } catch (error) {
      console.error(error);
    }
  };

 
  useEffect(() => {
    setTimeout(getProductos, 800);  
  
  }, [])  

 

  return (
   
    <div className='itemListContainer'>
        <h1 style={{ padding: (0, 20) }} >{titulo}</h1>
        { productos.length > 0 ? 
          <ItemList productos={productos} tipo={tipo} />
        : 
            <Loader/>     
        }
    </div>
  )
};

export default ItemListContainer;