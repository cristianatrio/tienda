import React from 'react'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from '../components/Layout.jsx'
import Home from '../views/Home.jsx'

import ProductDetail from '../views/ProductDetail.jsx'
import ProductTipo from './../views/ProductTipo.jsx'
import Nosotros from '../views/Nosotros.jsx'
import Cart from '../components/cart/Cart.jsx'
import Checkout from '../views/Checkout.jsx'
import Error from '../views/Error.jsx'

const Rutas = () => {
  return (
    <div className='rutas'>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}> 
                    <Route index element={<Home />} />  
                    <Switch>
                     <Route path="/productos" element={<ProductTipo />} />  
                    <Route path="/tipo/ :tipo" element={<ProductTipo />} />  
                    <Route path="/producto/:codigo" element={<ProductDetail />} />  
                    </Switch>
                    <Route path="/nosotros" element={<Nosotros />} />  
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="*" element={<Error />} />  
                </Route>
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Rutas