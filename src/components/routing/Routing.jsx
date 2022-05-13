import React from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../navegacion/navbar.js'
import DetailPage from "../paginas/DetailPage.jsx";
import Home from "../paginas/index.js";
import Products from "../paginas/products.js";
import Page404 from "../paginas/Page404.jsx";
import CartPage from "../paginas/CartPage.jsx";
import Layout from '../Layout/Layout.jsx';
import { CartContext } from '../../Context/cartContext.js';
const AppRouter = () => {
  return (

    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="item-detail/:id" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>




  );
};

export default AppRouter;
