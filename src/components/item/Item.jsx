import React from 'react';
import { Link } from 'react-router-dom';
import { formatGoogleSharedUrl } from '../../utils/Utils.js'

const Item = ({ producto }) => {

  const blank = '\u00A0';

  let nombre = producto.nombre === undefined ? `${blank}` : producto.nombre 
  let descripcion = producto.descripcion;
  // let titulo = producto.titulo; 
  // let imagen = '/images/' + ( producto.imagen === undefined ? 'imagen_no_disponible.jpg' : producto.imagen);
  //let imagen = ( producto.url === undefined ? '/images/imagen_no_disponible.jpg' 
                                          //  : formatGoogleSharedUrl(producto.url));
  // let stock = producto.cantidad;
  let imagen = producto.url;
  return (
    <div className="item" style={{ display: "block", padding: 30, alignItems: "center" }}>
      <div className="card text-center w-100" border="info" >
        <div className="card-header" style={{ fontWeight: 500 }}>
            {nombre}
        </div>
        <img variant="card-img-top" src={producto.url} style={{ padding: 20 }} />        
        <div className="card-body">
          <div className="card-text" style={{ height: "3rem" }}>
            {descripcion}
          </div>
        </div>
        <div className="card-footer text-muted">
          {/* <Link to={`/producto/${producto.codigo}`} className="btn btn-primary"> */}
          <Link to={`/producto/${producto.id}`} className="btn btn-primary">
              Ver detalle
          </Link>    {/* link a vista ProductDetail  */}
        </div> 
      </div> 
    </div>
  )
  
};

export default Item;