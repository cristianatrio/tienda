import React, { createContext, useState } from 'react'

export const GlobalContext = createContext('')

const GlobalProvider = ( {children} ) => {

    // const [contextItemsCart, setContextItemsCart] = useState(0)
    // array donde se van a ir guardando
    const [contextCart, setContextCart] = useState([])

    // const cantItemsCart = () => { 
    //   console.log('contextCart.length => ', contextCart.length)
    //   return contextCart.length 
    // } 
    
    // devuelve la cantidad total de items del carrito
    const contextItemsCart = () => {
      return contextCart.reduce((accumulator, current) => accumulator + current.cantidad, 0);
    }

    // devuelve el precio total del carrito
    const precioTotalCart = () => {
      return contextCart.reduce((accumulator, current) => accumulator + 
                          Number(current.producto.precio * current.cantidad), 0);
   }
  
    // devuelve si un producto ya existe en el carrito
    const isInCart = (codigo) => {
      
      if (contextItemsCart() > 0) {
        return contextCart.findIndex(item => item.producto.codigo === codigo) >= 0
      } else {
        return false
      }
    }

    // agrega un producto al carrito y la cantidad
    const addToCart = (producto, cantidad) => {
      
      if (!isInCart(producto.codigo)) {
          // actualiza la cantidad de items total del carrito
          // setContextItemsCart(contextItemsCart + cantidad)          
          // agrega el producto y la cantidad agregada al carrito 
          setContextCart([...contextCart, { producto, cantidad } ])    
 
      } else {
          alert('El producto ya existe en el carrito')
     
      }
    }

    // elimina un producto del carrito segun su codigo
    const removeFromCart = (codigo) => {
      console.log('removeFromCart, codigo: ', codigo)
    if (codigo !== undefined) {
        // setContextItemsCart(0)
        console.log(contextCart)
        setContextCart(contextCart.filter(item => item.producto.codigo !== codigo)  )    
      }
    }
  
    // vacia el carrito
    const clearCart = () => {
      // setContextItemsCart(0)
      setContextCart([]) 
    }

  return (
    <GlobalContext.Provider value={{contextCart, contextItemsCart, precioTotalCart, 
                                    isInCart, addToCart, removeFromCart, clearCart}}>
        { children }
    </GlobalContext.Provider>
  )
}

export default GlobalProvider