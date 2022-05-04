import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Barra from './components/navegacion/navbar'
import inicio from './components/paginas/incio'
import productos from './components/paginas/productos'
import Card from './components/Cards/Cards.jsx'
import ItemList from './components/ItemListContainer/itemList.jsx'
import './components/paginas/Styles.css'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
function App() {
  return (
    <div className="App">
 
     
      
   
    <Router>
      <Barra></Barra>
    </Router>
     

      <ItemListContainer/>

    </div>
  );
}

export default App;

