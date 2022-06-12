import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsFillCartPlusFill, BsFillCartCheckFill, BsFillCartFill } from 'react-icons/bs';
import { GlobalContext } from '../../context/GlobalProvider.jsx';
import ItemCount from '../itemCount/ItemCount.jsx';
import { formatPriceNumber } from '../../utils/Utils.js'
import './ItemDetail.css';

const ItemDetail = ( { producto } ) => {



  const blank = '\u00A0';

  const { addToCart, isInCart } = useContext(GlobalContext); 
  

  const [cantidad, setCantidad] = useState(0);

  let nombre = producto.nombre === undefined ? `${blank}` : producto.nombre 
  let imagen = '/images/' + ( producto.imagen === undefined ? 'imagen_no_disponible.jpg' : producto.imagen);

  let stock = producto.cantidad;


  const onAdd = (cantidad) => {

    setCantidad(cantidad);
  };

  const agregarAlCarrito = (cantidad) => {


    addToCart(producto, cantidad)

  };

  const goToCart = () => {
    const mensaje = `Se finaliza la compra, redirecciona al carrito...`;

  };

  const volver = () => {

    window.history.back()
  }

  const Botones = () => {
    return (
      <div className='botones container d-flex justify-content-center gap-4 my-2'>
        <div className="boton">
     
            { !isInCart(producto.codigo) ? 
              <div className="btnAdd" > 
                <button type="button" className="btn btn-primary btn-sm" 
                        
                        onClick={() => agregarAlCarrito(cantidad)}>
                    <BsFillCartPlusFill />{" "}Agregar al carrito
                </button>
              </div>
            : 
              <div className="btnCart" > 
                <Link to={`/cart`} className="btn btn-warning btn-sm"
                        onClick={() => goToCart()}>
                    <BsFillCartCheckFill />{" "}Finalizar compra
                </Link>   
              </div>
            }
        </div>
        <div className="boton">
          <button className="btn btn-secondary" onClick={volver} >
            <BsFillCartFill/>{" "}Seguir comprando
          </button>
        </div>
      </div>
    )
  }

  return (

      <div className='itemDetail m-2 p-1 container-fluid col-md-6 mx-auto d-block'>
        <div className="content">
          {/* Header */}
          <div className="modal-header">
            <p className="modal-title fw-bold fs-4" id="staticBackdropLabel">{nombre}</p>
            <button type="button" className="close" onClick={volver}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          {/* Body */}
          <div className="modal-body" >
            <div className="row centrado d-flex align-items-center" >
              {/* Imagen producto */}
              <div className="col-md-4">
                <img  src={imagen} class="img-fluid" />
              </div>
              {/* Detalle producto */}
              <div className="col-md-8 p-4">
                <p className="titulo fw-bold fs-4">{producto.titulo}</p> <br />
                <p className="descripcion fw-bold fs-5">Código: {` ${producto.codigo}`}</p>
                <p className="descripcion fs-5">{producto.descripcion}</p>
                <p className="precio fw-bold fs-4">{formatPriceNumber(producto.precio)}</p> <br />

                {/* contador cantidad producto */}
                <ItemCount initial={1} stock={stock} onAdd={onAdd} />
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="modal-footer">
            <Botones/>
          </div>

        </div>
      </div>
    );
  };

export default ItemDetail;