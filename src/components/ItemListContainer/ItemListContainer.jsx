import { useState, useEffect } from 'react';
import ItemList from '../itemList/ItemList.jsx';
// import axios from 'axios';
import Loader from '../Loader/Loader.jsx';

// Firebase
import { db } from '../../services/firebase'
import { collection, getDocs, query, where, orderBy } from "firebase/firestore"

const ItemListContainer = ( {titulo, tipo} ) => {

  

  const [productos, setProductos] = useState([]);

  
  const getProductos = async (tipo) => {

    const coleccion = collection(db, 'productos')

    try {

      if (tipo === undefined) {         
        
        var q = query(coleccion, orderBy("tipo"), orderBy("subtipo"), orderBy("codigo"))
      } else {                       
        var q = query(coleccion, where("tipo", "==", tipo), orderBy("subtipo"), orderBy("codigo"))
      }

      const data = await getDocs(q)
              
     
      setProductos(data.docs.map(doc => doc = {id: doc.id, ...doc.data()}))

    } catch (error) {
      console.log(error);
    }
  };

  
  useEffect(() => {
 
    getProductos(tipo);  
  }, [tipo])  
    



  return (
    <div className='itemListContainer container pt-5'>
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