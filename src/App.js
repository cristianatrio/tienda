
import './App.css';
import React, { Component } from 'react';
import CartProvider from './Context/cartContext.js';
import AppRouter from './components/routing/Routing.jsx';
import './components/paginas/Styles.css'
import { CartContext } from './Context/cartContext.js';
function App() {
  return (
    <div className="App">
   
   <CartContext></CartContext>
   <CartProvider> </CartProvider> 

    <AppRouter />

  
   
     



    </div>
  );
}

export default App;

