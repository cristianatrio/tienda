import React, { useState, useEffect } from 'react';
import Item from '../item/Item.jsx';

const ItemList = ( {productos, tipo} ) => {
  
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
            productos.map((producto, index) => (
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