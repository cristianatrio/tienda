import React, { createContext, useState } from 'react'

export const GlobalContext = createContext('')

const GlobalProvider = ({ children }) => {

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

 
  const isInCart = (codigo) => {

    if (contextItemsCart() > 0) {
      return contextCart.findIndex(item => item.producto.codigo === codigo) >= 0
    } else {
      return false
    }
  }

  const addToCart = (producto, cantidad) => {

    if (!isInCart(producto.codigo)) {

      setContextCart([...contextCart, { producto, cantidad }])

    } else {
      alert('El producto ya existe en el carrito')

    }
  }


  const removeFromCart = (codigo) => {
    console.log('removeFromCart, codigo: ', codigo)
    if (codigo !== undefined) {

      console.log(contextCart)
      setContextCart(contextCart.filter(item => item.producto.codigo !== codigo))
    }
  }


  const clearCart = () => {

    setContextCart([])
  }

  return (
    <GlobalContext.Provider value={{
      contextCart, contextItemsCart, precioTotalCart,
      isInCart, addToCart, removeFromCart, clearCart
    }}>
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider