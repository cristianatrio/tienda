import React, { useState, useEffect } from 'react';
import Item from '../item/Item.jsx';


const ItemList = ({ productos, tipo }) => {



  const [productosFiltrados, setProductosFiltrados] = useState([]);


  useEffect(() => {
    if (tipo === undefined) {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(productos.filter(item => item.tipo === tipo));
    }
  }, [tipo])


 console.log(`Productos filtrados ==> `, productosFiltrados);
  return (
    <div className='itemList'>
      <h3 className='subtitulo'>
        {
          { 
            'cortos': 'Cortos',
            'largos': 'Largos',
            'mediaestacion': 'MediaEstacion',
            undefined: 'Todos los Productos'
          }[tipo]
        }
      </h3>
      <div className="container">
        <div className="row">
          {
            productosFiltrados.map((producto, index) => (
              <div className="col-lg-4 col-sm-6 col-xs-12" key={index} >
                <Item index={index} producto={producto} />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
};

export default ItemList;