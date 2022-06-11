import React, { useContext } from 'react'
import { GlobalContext } from '../../context/GlobalProvider'
import { BsFillCartXFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { formatPriceNumber } from '../../utils/Utils.js'
import Formulario from './../formulario/Formulario.jsx';
import { Link } from "react-router-dom";



const Cart = () => {

    const { contextCart, contextItemsCart, precioTotalCart, 
                                 removeFromCart, clearCart } = useContext(GlobalContext); 
   
    //let imagen = '/images/'+item.producto.imagen');

    const ListadoCarrito = () => {

        return (
            <div className='cart'>
                <div className='listado'>
                    <div className="container-fluid pt-5">
                        
                        <div>
                            {contextCart.map((item, index) => (
                              
                                <div className="card p-1 m-auto mt-2 mb-2 col-11 col-md-6 col-lg-4 " key={index}>
                                    <div className="container">
                                        <div className="row m-auto col-12">
                                            
                                            <img src={'/images/'+item.producto.imagen} className="card-img-top img-fluid img1" />
                                            <div className="card-body text-center p-2">
                                                <h5 className="card-title">{item.producto.nombre}</h5>
                                                <h6 className="card-text">Cantidad: {item.cantidad}</h6>
                                                <h6 className="card-text">{formatPriceNumber((item.producto.precio))}</h6>
                                            </div>
                                            <button type="button" title="Eliminar Item"
                                                className="btn btn-primary py-1"
                                                onClick={() => removeFromCart(item.producto.codigo)}>
                                            <MdDelete />
                                        </button>
                               
                                        </div>
                                    </div>
                                </div>
                            ))
                            }  
                        </div>
                        <div className="row pieListado fw-bold pt-2" >
                            <div className="col-9 text-center">
                                {'TOTAL:'+''+formatPriceNumber(precioTotalCart())}
                            </div>
                         
                        </div>
                    </div>
                    <div className="btnVaciar py-5" >
                        <button type="button" className="btn btn-warning"
                            onClick={() => clearCart()}>
                            <BsFillCartXFill />{" "}Vaciar carrito
                        </button>
                        <Link
                                                className="btn btn-primary py-1"
                                                to={`/productos
                                                `}
                                            >
                                                Agregar más
                                            </Link>
                    </div>
                    
                </div>

                <div className="buyer container pt-5">
                    <Formulario itemsCompra={contextCart} totalCompra={precioTotalCart()} />
                </div>
            </div>
        )
    }

    return (
        <div className="cart" style={{ paddingTop: "30px" }}>
            <div className="container-fluid my-5 p-5 border">
                <h3 >
                    Cantidad total de productos:{` ${contextItemsCart()}`}
                </h3>
                { contextItemsCart() > 0 ?
                    <ListadoCarrito/>
                : 
                    <><h3>El carrito está vacio</h3><Link className="btn btn-primary p-2 col-12 col-md-6 m-2" to={`/`}> Volver a la tienda

                    </Link></>



                }
            </div>
        </div>
    )
  }
  
export default Cart