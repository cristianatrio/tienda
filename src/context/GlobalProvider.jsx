import React, { createContext, useState } from 'react'

export const GlobalContext = createContext('')

const GlobalProvider = ( {children} ) => {

    const [contextItemsCart, setContextItemsCart] = useState(0)
   
    const [contextCart, setContextCart] = useState([])

  
  
    const isInCart = (codigo) => {
      if (contextItemsCart > 0) {
        return contextCart.findIndex(item => item.producto.codigo === codigo) >= 0
      } else {
        return false
      }
    }

  
    const addToCart = (producto, cantidad) => {
      console.log(isInCart(producto.codigo))
      if (!isInCart(producto.codigo)) {
        
          setContextItemsCart(contextItemsCart + cantidad)          
        
          setContextCart([...contextCart, { producto, cantidad } ])    
          const mensaje = `Se agregaron ${JSON.stringify(cantidad)} items del producto` + 
                          `${producto.codigo} - ${producto.nombre} al carrito`
          console.log(mensaje)
     
      } else {
          alert('El producto ya existe en el carrito')
        
      }
    }

  
    const removeToCart = (codigo) => {
      setContextCart(contextCart.filter(item => item.producto.codigo !== codigo)  )    
    }
  
   
    const clearCart = () => setContextCart([]) 

  return (
    <GlobalContext.Provider value={{contextItemsCart, contextCart,  
                                    isInCart, addToCart, removeToCart, clearCart}}>
        { children }
    </GlobalContext.Provider>
  )
}

export default GlobalProvider