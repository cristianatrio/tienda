import React from 'react';
import { Link } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { formatGoogleSharedUrl } from '../../utils/Utils.js'

const Item = ({ producto }) => {

  const blank = '\u00A0';

  let nombre = producto.nombre === undefined ? `${blank}` : producto.nombre 
  let descripcion = producto.descripcion;
  
   let imagen = '/images/' + ( producto.imagen === undefined ? 'imagen_no_disponible.jpg' : producto.imagen);


  return (
    <div className="item" style={{ display: "flex", padding: 30, alignItems: "center" }}>
      <div className="card text-center w-100" border="info" >
        <div className="card-header" style={{ fontWeight: 500 }}>
            {nombre}
        </div>
        <img variant="card-img-top " src={imagen} style={{ padding: 20 }}  />        
        <div className="card-body">
          <div className="card-text text-capitalize " style={{ height: "3rem" }}>
            {descripcion}
          </div>
        </div>
        <div className="card-footer text-muted">
          {/* <Link to={`/producto/${producto.codigo}`} className="btn btn-primary"> */}
          <Link to={`/producto/${producto.id}`} className="btn btn-primary">
              <BsSearch/>{" "}Ver detalle
          </Link>    {/* link a vista ProductDetail  */}
        </div> 
      </div> 
    </div>
  )

};

export default Item;