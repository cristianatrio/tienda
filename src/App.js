import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import Barra from './components/navegacion/navbar'
import ItemDetailContainer from './components/itemDetailContainer/itemDetailContainer.jsx';
import ItemListContainer from './components/ItemListContainer/ItemListContainer.jsx';

import './components/paginas/Styles.css'

function App() {
  return (
    <div className="App">
      <Router>
      <Barra></Barra>
    </Router>
     <ItemListContainer />

     <ItemDetailContainer id={3} />
   
    
     



    </div>
  );
}

export default App;

